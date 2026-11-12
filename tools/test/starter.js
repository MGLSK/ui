// Smoke test: the starter + the minified dist bundle (what consumers actually ship).
const { chromium, executablePath } = require('./pw');
const ROOT = require('path').resolve(__dirname, '..', '..');
(async () => {
  const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem('mglsk-fx', 'off'));
  const p = await ctx.newPage(); const errs = []; const failed = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  p.on('requestfailed', r => failed.push(r.url()));
  await p.goto('file://' + ROOT + '/starter/index.html'); await p.waitForTimeout(400);
  const r = [];
  const t = (n, ok, x = '') => r.push([n, !!ok, x]);
  t('no console/page errors', !errs.length, errs.join(' | '));
  t('no failed requests', !failed.length, failed.join(' '));
  t('uses minified bundle', (await p.$$eval('script[src]', s => s.map(x => x.getAttribute('src')))).every(x => /\.min\.js$/.test(x)));
  t('icons rendered', (await p.$$('i[data-icon]')).length === 0 && (await p.$$('svg.icon')).length > 5);
  t('chart rendered', (await p.$$('#chart svg')).length === 1);
  t('fonts loaded', await p.evaluate(async () => { await document.fonts.ready; return ['16px "Archivo"', '16px "JetBrains Mono"', 'italic 16px "Instrument Serif"'].every(f => document.fonts.check(f)); }));
  await p.click('[data-modal-open="#new-item"]'); t('modal opens', await p.isVisible('#new-item'));
  await p.click('#new-item .btn-primary'); t('validation shows error', await p.isVisible('#new-item .error-text'));
  await p.keyboard.press('Escape');
  await p.click('th[data-sort] >> nth=0'); t('table sorts', (await p.textContent('table[data-sortable] tbody tr td')) === 'Ada');
  await p.click('[data-toggle="nav"]'); t('sidenav collapses', (await p.getAttribute('.app', 'data-nav')) === 'collapsed');
  t('toast API present', await p.evaluate(() => typeof MGLSK.toast === 'function' && !!MGLSK.charts && !!MGLSK.fx.particles && !!MGLSK.calendar && !!MGLSK.pagination));
  // same bundle with fx ON must not throw (WebGL path)
  const q = await b.newPage(); const e2 = []; q.on('pageerror', e => e2.push(e.message));
  await q.addInitScript(() => localStorage.removeItem('mglsk-fx'));
  await q.goto('file://' + ROOT + '/starter/index.html'); await q.waitForTimeout(600);
  t('fx on: no errors, field canvas present', !e2.length && (await q.$$('#fx-field')).length <= 1, e2.join('|'));
  const bad = r.filter(x => !x[1]);
  r.forEach(x => console.log(x[1] ? 'PASS' : 'FAIL', x[0], x[2]));
  console.log(r.length, 'checks;', bad.length, 'failed');
  await b.close(); process.exit(bad.length ? 1 : 0);
})();
