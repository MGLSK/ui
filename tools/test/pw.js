const { execSync } = require('child_process');
const fs = require('fs');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require(execSync('npm root -g').toString().trim() + '/playwright')); }
// CHROMIUM=/path wins; else a system Chromium if present (the sandbox); else Playwright's own browser (CI: `npx playwright install chromium`)
const executablePath = process.env.CHROMIUM || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
module.exports = { chromium, executablePath };
