// Prints the CHANGELOG.md section for a version (default: package.json version) — used for GitHub release notes.
//   node tools/changelog-section.mjs [x.y.z]
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2] || JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const lines = readFileSync(join(root, 'CHANGELOG.md'), 'utf8').split('\n');
const start = lines.findIndex(l => new RegExp(`^## ${version.replace(/\./g, '\\.')}\\b`).test(l));
if (start < 0) { console.error(`No CHANGELOG section for ${version}`); process.exit(1); }
let end = lines.findIndex((l, i) => i > start && /^## /.test(l)); if (end < 0) end = lines.length;
console.log(lines.slice(start + 1, end).join('\n').trim());
