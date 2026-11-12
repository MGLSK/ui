// Release guard: inspects the tarball `npm pack` would produce and refuses anything that should not ship.
// Runs in CI on every PR, in the release workflow, and automatically via `prepublishOnly`.
//   node tools/check-pack.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const errors = [], notes = [];
const fail = m => errors.push(m);

// ---- package.json: must be a *private package* (scoped + restricted), publishable
if (!/^@[a-z0-9-]+\/[a-z0-9-._]+$/.test(pkg.name)) fail(`name "${pkg.name}" must be scoped (@scope/name) — unscoped npm packages are always public`);
if (pkg.private === true) fail('"private": true makes `npm publish` refuse to run; use publishConfig.access = "restricted" instead');
if (pkg.publishConfig?.access !== 'restricted') fail('publishConfig.access must be "restricted" (private package)');
if (pkg.license !== 'UNLICENSED') fail(`license must be "UNLICENSED" (proprietary), found "${pkg.license}"`);
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(pkg.version)) fail(`version "${pkg.version}" is not semver`);

// ---- what npm would put in the tarball
const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const info = JSON.parse(out)[0];
const files = info.files.map(f => f.path);
const has = p => files.includes(p);

const REQUIRED = ['package.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'THIRD-PARTY.md', 'ACCESSIBILITY.md',
  'dist/css/mglsk-ui.css', 'dist/css/mglsk-ui.min.css', 'dist/js/mglsk-ui.js', 'dist/js/mglsk-ui.min.js',
  'dist/fonts/Archivo-normal.woff2', 'dist/fonts/InstrumentSerif-normal.woff2', 'dist/fonts/InstrumentSerif-italic.woff2', 'dist/fonts/JetBrainsMono-normal.woff2',
  'dist/img/favicon.svg', 'fonts/licenses/Archivo-OFL.txt', 'starter/index.html'];
REQUIRED.filter(p => !has(p)).forEach(p => fail(`missing from tarball: ${p}`));

const FORBIDDEN = [[/\.map$/, 'source maps expose readable source'], [/(^|\/)node_modules\//, 'node_modules'], [/\.tgz$/, 'nested tarball'],
  [/^tools\//, 'build tooling'], [/^\.github\//, 'CI config'], [/(^|\/)\.env/, 'env file'], [/(^|\/)\.git(\/|$)/, 'git data'], [/\.log$/, 'log file']];
for (const f of files) for (const [re, why] of FORBIDDEN) if (re.test(f)) fail(`must not ship ${f} (${why})`);

// exports map targets must exist
const targets = [];
(function walk(v) { if (typeof v === 'string') targets.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })(pkg.exports);
for (const t of targets) { if (t.includes('*')) { const pre = t.replace(/^\.\//, '').split('*')[0]; if (!files.some(f => f.startsWith(pre))) fail(`exports pattern ${t} matches nothing`); } else if (!has(t.replace(/^\.\//, ''))) fail(`exports target missing from tarball: ${t}`); }

// ---- dist must be built from *this* version, with the proprietary banner
for (const f of ['dist/js/mglsk-ui.min.js', 'dist/css/mglsk-ui.min.css', 'dist/js/mglsk-ui.js', 'dist/css/mglsk-ui.css']) {
  if (!existsSync(join(root, f))) continue;
  const head = readFileSync(join(root, f), 'utf8').slice(0, 300);
  if (!head.includes(`MGLSK UI v${pkg.version} `)) fail(`${f}: banner is not v${pkg.version} — run \`npm run build\` (dist is stale)`);
  if (!/All rights reserved/.test(head)) fail(`${f}: missing proprietary banner`);
}
if (/sourceMappingURL/.test(readFileSync(join(root, 'dist/js/mglsk-ui.min.js'), 'utf8'))) fail('dist/js/mglsk-ui.min.js references a source map');

// ---- changelog has an entry for this version
const cl = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
if (!new RegExp(`^## ${pkg.version.replace(/\./g, '\\.')}\\b`, 'm').test(cl)) fail(`CHANGELOG.md has no "## ${pkg.version}" section`);

// ---- no credentials in anything we ship
const SECRET = /(ghp_|gho_|ghs_|github_pat_)[A-Za-z0-9_]{20,}|npm_[A-Za-z0-9]{36}|-----BEGIN [A-Z ]*PRIVATE KEY-----|AKIA[0-9A-Z]{16}/;
for (const f of files) { if (/\.(woff2|png|ico)$/.test(f)) continue; const p = join(root, f); if (existsSync(p) && SECRET.test(readFileSync(p, 'utf8'))) fail(`possible credential in ${f}`); }

// ---- sanity limits
if (info.size > 3 * 1024 * 1024) fail(`tarball is ${(info.size / 1024).toFixed(0)} kB (limit 3072 kB)`);
if (files.length > 400) fail(`${files.length} files in tarball (limit 400)`);

notes.push(`${pkg.name}@${pkg.version}`, `${files.length} files`, `${(info.size / 1024).toFixed(0)} kB packed / ${(info.unpackedSize / 1024).toFixed(0)} kB unpacked`, `access: ${pkg.publishConfig?.access}`);
if (errors.length) { console.error('✗ pack check failed:\n' + errors.map(e => '  - ' + e).join('\n')); process.exit(1); }
console.log('✓ pack check passed: ' + notes.join(' · '));
