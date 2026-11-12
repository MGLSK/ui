// Builds dist/ (concatenated + minified CSS/JS, fonts, img) and refreshes starter/assets/.
//   node tools/build-dist.mjs
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const esbuild = require('esbuild');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const banner = `/*! MGLSK UI v${pkg.version} · (c) 2026 MGLSK · All rights reserved · proprietary, see LICENSE · bundled fonts: SIL OFL 1.1 (THIRD-PARTY.md) */\n`;
// Source maps expose readable source, so they are opt-in for private debugging only:  SOURCEMAP=1 node tools/build-dist.mjs
const WITH_MAP = process.env.SOURCEMAP === '1';

// Order matters: later layers override earlier ones.
const CSS = ['tokens', 'base', 'layout', 'components', 'terminal', 'forms', 'overlays', 'display'];
const JS = ['icons', 'theme', 'core', 'charts', 'forms', 'overlays', 'display', 'a11y', 'fx'];

const read = p => readFileSync(join(root, p), 'utf8').replace(/\r/g, '');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
for (const d of ['css', 'js']) mkdirSync(join(dist, d), { recursive: true });

// ---- CSS: inline the @import chain in order (font/img urls stay relative: dist/css/ -> ../fonts, ../img)
const css = banner + CSS.map(n => `/* ===== ${n}.css ===== */\n` + read(`css/${n}.css`).replace(/@import[^;]+;\s*/g, '')).join('\n');
writeFileSync(join(dist, 'css/mglsk-ui.css'), css);
const cssMin = await esbuild.transform(css, { loader: 'css', minify: true, legalComments: 'inline' });
writeFileSync(join(dist, 'css/mglsk-ui.min.css'), cssMin.code);

// ---- JS: every module is an IIFE; concatenation order = load order
const js = banner + JS.map(n => `/* ===== ${n}.js ===== */\n` + read(`js/${n}.js`)).join('\n');
writeFileSync(join(dist, 'js/mglsk-ui.js'), js);
const jsMin = await esbuild.transform(js, { loader: 'js', minify: true, target: 'es2020', legalComments: 'inline', ...(WITH_MAP ? { sourcemap: 'external', sourcefile: 'mglsk-ui.js' } : {}) });
writeFileSync(join(dist, 'js/mglsk-ui.min.js'), jsMin.code + (WITH_MAP ? '\n//# sourceMappingURL=mglsk-ui.min.js.map\n' : ''));
if (WITH_MAP) writeFileSync(join(dist, 'js/mglsk-ui.min.js.map'), jsMin.map);

// ---- assets
cpSync(join(root, 'fonts'), join(dist, 'fonts'), { recursive: true });
cpSync(join(root, 'img'), join(dist, 'img'), { recursive: true });

// ---- starter gets its own copy so it can be copied out of the repo on its own
const sa = join(root, 'starter/assets');
rmSync(sa, { recursive: true, force: true });
cpSync(dist, sa, { recursive: true });
rmSync(join(sa, 'js/mglsk-ui.js'), { force: true });
rmSync(join(sa, 'css/mglsk-ui.css'), { force: true });

// ---- report
const kb = n => (n / 1024).toFixed(1) + ' kB';
console.log(`MGLSK UI v${pkg.version}`);
for (const f of ['css/mglsk-ui.css', 'css/mglsk-ui.min.css', 'js/mglsk-ui.js', 'js/mglsk-ui.min.js']) {
  const buf = readFileSync(join(dist, f));
  console.log(`  dist/${f.padEnd(20)} ${kb(buf.length).padStart(9)}   gzip ${kb(gzipSync(buf).length).padStart(8)}`);
}
