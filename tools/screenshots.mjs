// Regenerates docs/screenshots/*.png from the pages in this repo (Chromium via Playwright).
//   node tools/screenshots.mjs [name ...]   (no names = all; CHROMIUM=/path/to/chrome overrides the browser)
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium, executablePath } = createRequire(import.meta.url)('./test/pw.js');
const out = join(root, 'docs/screenshots');
const url = p => pathToFileURL(join(root, p)).href;

// [file, page, theme, accent, optional action to run before the shot]
const SHOTS = [
  ['dashboard-dark', 'examples/dashboard.html', 'dark'],
  ['dashboard-light', 'examples/dashboard.html', 'light'],
  ['dashboard-violet', 'examples/dashboard.html', 'dark', 'violet'],
  ['dialog', 'examples/dashboard.html', 'dark', null, p => p.click('[data-modal-open="#new-order"]')],
  ['login', 'examples/login.html', 'dark'],
  ['settings', 'examples/settings.html', 'dark'],
  ['components-index', 'components/index.html', 'dark'],
  ['theming', 'components/theming.html', 'dark'],
  ['data-table', 'components/data-table.html', 'dark'],
  ['chart', 'components/chart.html', 'dark'],
  ['calendar', 'components/calendar.html', 'light'],
  ['trace', 'components/trace.html', 'dark'],
  ['network', 'components/network.html', 'dark'],
  ['network-light', 'components/network.html', 'light'],
];

const b = await chromium.launch({ executablePath, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const only = process.argv.slice(2);
for (const [name, page, theme, accent, act] of SHOTS) {
  if (only.length && !only.includes(name)) continue;
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.addInitScript(([t, a]) => { try { localStorage.setItem('mglsk-theme', t); a && localStorage.setItem('mglsk-accent', a); } catch {} }, [theme, accent]);
  const p = await ctx.newPage();
  await p.goto(url(page));
  await p.waitForTimeout(900);
  if (act) { await act(p); await p.waitForTimeout(400); }
  await p.screenshot({ path: join(out, name + '.png') });
  await ctx.close();
  console.log('ok', name);
}
await b.close();
