const { execSync } = require('child_process');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require(execSync('npm root -g').toString().trim() + '/playwright')); }
module.exports = { chromium, executablePath: process.env.CHROMIUM || '/usr/bin/chromium' };
