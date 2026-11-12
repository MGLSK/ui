// Theming: mode switching, persistence, auto/OS, accents, custom colours, and a WCAG contrast matrix on the live tokens.
const { chromium, executablePath } = require('./pw');
const ROOT = require('path').resolve(__dirname, '..', '..');
const URL = p => 'file://' + ROOT + '/' + p;
const rgbOf = s => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
(async () => {
  const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('_k')) { localStorage.clear(); sessionStorage.setItem('_k', '1'); localStorage.setItem('mglsk-fx', 'off'); } });
  const res = []; const t = (n, ok, x = '') => res.push([n, !!ok, x]);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const css = (sel, prop) => p.evaluate(([s, pr]) => getComputedStyle(document.querySelector(s))[pr], [sel, prop]);
  const tok = name => p.evaluate(n => getComputedStyle(document.documentElement).getPropertyValue(n).trim(), name);
  const colour = async name => { const v = await p.evaluate(n => { const e = document.createElement('i'); e.style.color = `var(${n})`; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; }, name); return rgbOf(v); };
  const lum = c => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); };
  const ratio = (a, c) => { const x = lum(a), y = lum(c); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };

  await p.goto(URL('components/theming.html')); await p.waitForTimeout(300);
  t('default is dark/green', (await p.getAttribute('html', 'data-theme-resolved')) === 'dark' && /rgb\(5, 8, 7\)/.test(await css('body', 'backgroundColor')));

  // --- mode
  await p.evaluate(() => MGLSK.setTheme('light')); await p.waitForTimeout(450);
  t('light mode applies', (await p.getAttribute('html', 'data-theme-resolved')) === 'light' && /rgb\(243, 246, 244\)/.test(await css('body', 'backgroundColor')), await css('body', 'backgroundColor'));
  t('light text is dark', rgbOf(await css('body', 'color')).every(v => v < 40));
  await p.reload(); await p.waitForTimeout(300);
  t('light persists across reload (early snippet)', (await p.getAttribute('html', 'data-theme-resolved')) === 'light');
  t('control state synced', (await p.getAttribute('[data-theme-set="light"] >> nth=0', 'aria-pressed')) === 'true');

  // --- auto follows the OS live
  await p.evaluate(() => MGLSK.setTheme('auto')); await p.emulateMedia({ colorScheme: 'dark' }); await p.waitForTimeout(100);
  t('auto + OS dark -> dark', (await p.getAttribute('html', 'data-theme-resolved')) === 'dark');
  await p.emulateMedia({ colorScheme: 'light' }); await p.waitForTimeout(100);
  t('auto follows OS change live -> light', (await p.getAttribute('html', 'data-theme-resolved')) === 'light');
  await p.emulateMedia({ colorScheme: 'dark' });

  // --- accents
  await p.evaluate(() => MGLSK.setTheme('dark')); await p.evaluate(() => MGLSK.setAccent('orange')); await p.waitForTimeout(450);
  t('orange accent (dark)', (await colour('--accent')).join() === '255,159,28', (await colour('--accent')).join());
  await p.evaluate(() => MGLSK.setTheme('light')); await p.waitForTimeout(450);
  t('orange accent (light) is darkened', (await colour('--accent')).join() === '144,72,0', (await colour('--accent')).join());
  await p.reload(); await p.waitForTimeout(300);
  t('accent persists', (await p.getAttribute('html', 'data-accent')) === 'orange' && (await colour('--accent')).join() === '144,72,0');
  await p.evaluate(() => MGLSK.setAccent('magenta')); await p.evaluate(() => MGLSK.setTheme('dark')); await p.waitForTimeout(450);
  t('magenta accent swaps the glitch colour', (await colour('--glitch')).join() !== '255,43,214', (await colour('--glitch')).join());
  t('invalid accent rejected', (await p.evaluate(() => MGLSK.setAccent('not-a-colour'))) === false);

  // --- custom colour: contrast corrected in both modes
  const customs = ['#ffee00', '#7c3aed', '#0a0a0a', '#ffffff', '#1e90ff'];
  for (const hex of customs) {
    await p.evaluate(h => MGLSK.setAccent(h), hex); await p.evaluate(() => MGLSK.setTheme('dark')); await p.waitForTimeout(400);
    const accD = await colour('--accent'), onD = await colour('--on-accent');
    await p.evaluate(() => MGLSK.setTheme('light')); await p.waitForTimeout(400);
    const accL = await colour('--accent'), onL = await colour('--on-accent');
    const ok = ratio(accD, [5, 8, 7]) >= 4.5 && ratio(accD, onD) >= 4.5 && ratio(accL, [255, 255, 255]) >= 4.5 && ratio(accL, onL) >= 4.5;
    t(`custom ${hex}: text + fill contrast >= 4.5 in both modes`, ok, `dark ${ratio(accD, [5, 8, 7]).toFixed(1)}/${ratio(accD, onD).toFixed(1)} light ${ratio(accL, [255, 255, 255]).toFixed(1)}/${ratio(accL, onL).toFixed(1)}`);
  }
  await p.evaluate(() => MGLSK.setAccent('#7c3aed')); await p.reload(); await p.waitForTimeout(300);
  t('custom accent persists across reload', (await p.getAttribute('html', 'data-accent')) === 'custom' && (await p.evaluate(() => MGLSK.accent())) === '#7c3aed');

  // --- controls + keep-open dropdown
  await p.evaluate(() => { MGLSK.setTheme('dark'); MGLSK.setAccent('green'); });
  await p.click('.topbar [data-dropdown-toggle][aria-label="Theme and accent colour"]');
  await p.click('.theme-menu [data-theme-set="light"]'); await p.click('.theme-menu [data-accent-set="cyan"]');
  t('theme panel stays open after clicks', await p.isVisible('.theme-menu'));
  t('panel buttons switch mode + accent', (await p.getAttribute('html', 'data-theme-resolved')) === 'light' && (await p.getAttribute('html', 'data-accent')) === 'cyan');
  await p.fill('.theme-menu input[data-accent-custom]', '#ff00aa'); await p.dispatchEvent('.theme-menu input[data-accent-custom]', 'input');
  t('colour input sets custom accent', (await p.getAttribute('html', 'data-accent')) === 'custom');
  await p.mouse.click(330, 700); t('click outside closes panel', !(await p.isVisible('.theme-menu')));
  await p.evaluate(() => { MGLSK.setTheme('dark'); MGLSK.setAccent('green'); });

  // --- contrast matrix on the live tokens: 8 presets x 2 modes
  let worst = 99, fails = [];
  for (const accent of ['green', 'cyan', 'blue', 'violet', 'magenta', 'red', 'orange', 'yellow']) {
    for (const mode of ['dark', 'light']) {
      await p.evaluate(([a, m]) => { MGLSK.setAccent(a); MGLSK.setTheme(m); }, [accent, mode]); await p.waitForTimeout(380);
      const [acc, on, bg, s1, s2, text, muted, faint, succ, warn, dang, info, onD, s3] = await Promise.all(['--accent', '--on-accent', '--bg', '--surface', '--surface-2', '--text', '--muted', '--faint', '--success', '--warning', '--danger', '--info', '--on-danger', '--surface-3'].map(colour));
      const tint = (fg, bgc) => bgc.map((v, i) => v * 0.9 + fg[i] * 0.1);     // accent-soft (10%) composited on a surface
      const checks = { 'accent/bg': ratio(acc, bg), 'accent/surface-2': ratio(acc, s2), 'accent/surface-3': ratio(acc, s3), 'accent/soft-on-surface': ratio(acc, tint(acc, s1)), 'accent/soft-on-surface-3': ratio(acc, tint(acc, s3)), 'code: accent/surface-3': ratio(acc, s3), 'on-accent/accent': ratio(on, acc), 'text/surface': ratio(text, s1), 'muted/bg': ratio(muted, bg), 'muted/surface-2': ratio(muted, s2), 'faint/surface-2': ratio(faint, s2), 'success/surface': ratio(succ, s1), 'warning/surface': ratio(warn, s1), 'danger/surface': ratio(dang, s1), 'info/surface': ratio(info, s1), 'on-danger/danger': ratio(onD, dang) };
      for (const [k, v] of Object.entries(checks)) { worst = Math.min(worst, v); if (v < 4.5) fails.push(`${accent}/${mode} ${k}=${v.toFixed(2)}`); }
    }
  }
  t('contrast matrix: every accent x mode x token pair >= 4.5:1', !fails.length, fails.length ? fails.join('; ') : `worst ${worst.toFixed(2)}`);

  // --- every page ships the no-flash snippet + the theme controls
  const fs = require('fs'); const pages = fs.readdirSync(ROOT + '/components').filter(f => f.endsWith('.html')).map(f => 'components/' + f).concat(['examples/dashboard.html', 'examples/settings.html', 'examples/login.html', 'starter/index.html']);
  const missing = pages.filter(f => { const h = fs.readFileSync(ROOT + '/' + f, 'utf8'); return !/mglsk-theme/.test(h.split('</head>')[0]) || !/data-theme-set/.test(h); });
  t(`all ${pages.length} pages have the early snippet + theme controls`, !missing.length, missing.slice(0, 5).join(','));
  t('head snippet leaks no globals (regression: const t in demos)', await p.evaluate(() => ['d', 'l', 't', 'a', 'v', 'k'].every(n => !(n in window))));
  t('no page errors', !errs.length, errs.join('|'));

  const bad = res.filter(r => !r[1]); res.forEach(r => console.log(r[1] ? 'PASS' : 'FAIL', r[0], r[2]));
  console.log(res.length, 'checks;', bad.length, 'failed'); await b.close(); process.exit(bad.length ? 1 : 0);
})();
