const { chromium, executablePath } = require('./pw');
const ROOT = require('path').resolve(__dirname, '..', '..');
const URL = p => 'file://' + ROOT + '/' + p;
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const dir = ROOT + '/components/';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();
  const bad = {};
  for (const f of files) {
    const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
    await pg.addInitScript(() => localStorage.setItem('mglsk-fx', 'off'));
    const errs = [];
    pg.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
    pg.on('console', m => { if (m.type() === 'error' && !/favicon/.test(m.text())) errs.push('CONSOLE ' + m.text()); });
    pg.on('requestfailed', r => { if (!/missing\.png/.test(r.url())) errs.push('REQFAIL ' + r.url()); });
    await pg.goto('file://' + dir + f); await pg.waitForTimeout(250);
    const empties = await pg.evaluate(() => [...document.querySelectorAll('i[data-icon]')].map(i => i.dataset.icon));
    if (empties.length) errs.push('UNRENDERED ICONS ' + empties.join(','));
    if (errs.length) bad[f] = errs;
    await pg.close();
  }
  console.log(files.length, 'pages;', Object.keys(bad).length, 'with problems');
  for (const k in bad) console.log(k, bad[k]);
  await b.close();
})();
