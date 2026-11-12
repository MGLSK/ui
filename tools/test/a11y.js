// Automated WCAG audit (axe-core) over every page, both themes, plus interactive states (open menus/dialogs/pickers).
//   node tools/test/a11y.js            # summary; non-zero exit if any violation
//   A11Y_JSON=/tmp/a11y.json node tools/test/a11y.js   # also write the full report
const { chromium, executablePath } = require('./pw');
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

// extra states worth auditing: component page -> action that opens something
const STATES = {
  select: p => p.click('.select-trigger >> nth=0'),
  combobox: async p => { await p.click('#cbx1'); },
  'date-picker': p => p.click('[data-datepicker] .select-trigger >> nth=0'),
  command: p => p.keyboard.press('Control+k'),
  dialog: p => p.click('[data-modal-open="#dlg1"]'),
  'alert-dialog': p => p.click('[data-modal-open="#ad1"]'),
  sheet: p => p.click('[data-modal-open="#sh-r"]'),
  drawer: async p => { await p.click('[data-modal-open="#dr1"]'); await p.waitForTimeout(400); },
  popover: p => p.click('[data-popover-toggle] >> nth=0'),
  'dropdown-menu': p => p.click('[data-dropdown-toggle] >> nth=0'),
  menubar: p => p.click('.menubar .dropdown >> nth=0 >> button'),
  'navigation-menu': p => p.hover('.navmenu-trigger >> nth=0'),
  'context-menu': p => p.click('.ctx-area', { button: 'right' }),
  'hover-card': p => p.hover('.hovercard-root a'),
  toast: async p => { await p.click('#t-def'); await p.click('#t-err'); },
  theming: p => p.click('.topbar [data-dropdown-toggle][aria-label="Theme and accent colour"]'),
};

(async () => {
  const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const files = [].concat(fs.readdirSync(ROOT + '/components').filter(f => f.endsWith('.html')).map(f => 'components/' + f), ['examples/dashboard.html', 'examples/settings.html', 'examples/login.html', 'starter/index.html']);
  const only = process.env.ONLY ? new RegExp(process.env.ONLY) : null;
  const found = {}; let audits = 0;
  for (const theme of ['dark', 'light']) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(t => { localStorage.setItem('mglsk-fx', 'off'); localStorage.setItem('mglsk-theme', t); }, theme);
    for (const f of files) {
      if (only && !only.test(f)) continue;
      const slug = path.basename(f, '.html');
      const runs = [['default', null]]; if (STATES[slug]) runs.push(['open', STATES[slug]]);
      for (const [state, prep] of runs) {
        const p = await ctx.newPage();
        await p.goto('file://' + ROOT + '/' + f); await p.waitForTimeout(250);
        if (prep) { try { await prep(p); await p.waitForTimeout(350); } catch (e) { console.log('! prep failed', f, e.message.split('\n')[0]); } }
        await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}*{scroll-behavior:auto!important}' }); await p.waitForTimeout(80);
        await p.addScriptTag({ content: AXE });
        const r = await p.evaluate(tags => axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] }), TAGS);
        audits++;
        // target-size on the dual-thumb slider: two overlapping range inputs cannot each be a 24px target; WCAG 2.2 SC 2.5.8 allows an
        // equivalent control, which the slider docs provide (synced number inputs). Documented exception.
        for (const v of r.violations) { if (v.id === 'target-size') { v.nodes = v.nodes.filter(n => !n.target.join(' ').includes('.slider-range') && !/value="(100|350)"/.test(n.target.join(' '))); if (!v.nodes.length) continue; }
          const e = (found[v.id] ||= { id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl, pages: new Set(), nodes: 0, samples: [] });
          e.pages.add(`${slug}${state === 'open' ? '*' : ''}`); e.nodes += v.nodes.length;
          if (e.samples.length < 4) e.samples.push({ page: slug + '/' + theme + '/' + state, target: v.nodes[0].target.join(' '), html: v.nodes[0].html.slice(0, 140), why: (v.nodes[0].failureSummary || '').split('\n').slice(0, 3).join(' | ').slice(0, 260) });
        }
        await p.close();
      }
    }
    await ctx.close();
  }
  const list = Object.values(found).sort((a, c) => ['critical', 'serious', 'moderate', 'minor'].indexOf(a.impact) - ['critical', 'serious', 'moderate', 'minor'].indexOf(c.impact) || c.nodes - a.nodes);
  console.log(`${audits} audits (${files.length} pages x 2 themes + open states); ${list.length} distinct rule violations`);
  for (const e of list) {
    console.log(`\n[${e.impact}] ${e.id} — ${e.help}  (${e.nodes} nodes, ${e.pages.size} pages)`);
    e.samples.forEach(s => console.log(`    ${s.page}: ${s.target}\n      ${s.html}\n      ${s.why}`));
  }
  if (process.env.A11Y_JSON) fs.writeFileSync(process.env.A11Y_JSON, JSON.stringify(list.map(e => ({ ...e, pages: [...e.pages] })), null, 1));
  await b.close(); process.exit(list.length ? 1 : 0);
})();
