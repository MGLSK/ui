// Assembles the documentation site (GitHub Pages) into _site/ from the committed pages and assets.
//   node tools/build-site.mjs            (run `npm run build` first if you changed sources)
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..'), out = join(root, '_site');
rmSync(out, { recursive: true, force: true }); mkdirSync(out);

// pages use relative paths into css/, js/, fonts/, img/ — keep the same layout as the repo
const COPY = ['index.html', 'usage.html', 'components', 'examples', 'starter', 'css', 'js', 'fonts', 'img', 'dist', 'docs/screenshots'];
for (const p of COPY) {
  if (!existsSync(join(root, p))) throw new Error('missing ' + p + ' (run npm run build first)');
  cpSync(join(root, p), join(out, p), { recursive: true });
}
writeFileSync(join(out, '.nojekyll'), '');

// fail the build on a broken local link or asset reference (Pages would just serve a 404)
const pages = []; (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } })(out);
const broken = [];
for (const f of pages) for (const m of readFileSync(f, 'utf8').matchAll(/\b(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
  const u = m[1]; if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(u)) continue;
  if (!existsSync(resolve(dirname(f), u))) broken.push(f.slice(out.length + 1) + ' -> ' + u);
}
if (broken.length) { console.error('broken links:\n  ' + [...new Set(broken)].join('\n  ')); process.exit(1); }
console.log('site ready in _site/ (' + pages.length + ' pages, no broken local links)');
