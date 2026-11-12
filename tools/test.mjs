// npm test — needs Playwright + a Chromium (set CHROMIUM=/path if not /usr/bin/chromium).
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = join(dirname(fileURLToPath(import.meta.url)), 'test');
let fail = 0;
for (const f of ['starter.js', 'theme.js', 'sweep.js', 'interact.js', 'a11y-keyboard.js', 'a11y.js']) {
  console.log(`\n── ${f}`);
  const r = spawnSync('node', [join(dir, f)], { stdio: 'inherit' });
  if (r.status) fail++;
}
process.exit(fail ? 1 : 0);
