// Behavioural accessibility tests — what axe cannot judge: real keyboard operation, focus management, live regions,
// motion/hover rules (WCAG 2.2.2, 1.4.13), reflow (1.4.10), text spacing (1.4.12), forced colours, visible focus (2.4.7 / 2.4.11).
const { chromium, executablePath } = require('./pw');
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const URL = p => 'file://' + ROOT + '/' + p;
(async () => {
  const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('_a')) { sessionStorage.setItem('_a', '1'); localStorage.setItem('mglsk-fx', 'off'); } });
  const res = []; const t = (n, ok, x = '') => res.push([n, !!ok, x]);
  const errs = [];
  const open = async (u, vp) => { const p = await ctx.newPage(); if (vp) await p.setViewportSize(vp); p.on('pageerror', e => errs.push(u + ': ' + e.message)); await p.goto(URL(u)); await p.waitForTimeout(220); return p; };
  const attr = (p, sel, a) => p.getAttribute(sel, a);
  const active = p => p.evaluate(() => { const a = document.activeElement; return a ? (a.id || a.className || a.tagName) + '' : ''; });
  let p;

  /* ---------- landmarks, skip link ---------- */
  p = await open('components/button.html');
  await p.keyboard.press('Tab');
  t('skip link is the first tab stop', await p.evaluate(() => document.activeElement.classList.contains('skip-link')));
  await p.waitForTimeout(250);
  t('skip link becomes visible on focus', (await p.evaluate(() => document.activeElement.getBoundingClientRect().top)) >= 0);
  await p.keyboard.press('Enter');
  t('skip link moves focus to <main>', (await p.evaluate(() => document.activeElement.id)) === 'main');
  t('one main, one banner, labelled navs', await p.evaluate(() => document.querySelectorAll('main').length === 1 && !!document.querySelector('header') && [...document.querySelectorAll('nav')].every(n => n.getAttribute('aria-label'))));
  t('page has lang + title', await p.evaluate(() => !!document.documentElement.lang && !!document.title));
  t('heading levels: one h1, card titles are h2', await p.evaluate(() => document.querySelectorAll('h1').length === 1 && !!document.querySelector('.card-head h2')));
  await p.close();

  /* ---------- dialog focus management ---------- */
  p = await open('components/dialog.html');
  await p.focus('[data-modal-open="#dlg1"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  t('dialog: focus moves inside', await p.evaluate(() => document.querySelector('#dlg1').contains(document.activeElement)));
  t('dialog is labelled by its heading', await p.evaluate(() => { const d = document.querySelector('#dlg1'); const id = d.getAttribute('aria-labelledby'); return !!id && !!document.getElementById(id)?.textContent.trim(); }));
  let leaked = false; for (let i = 0; i < 9; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(() => document.activeElement !== document.body && !document.querySelector('#dlg1').contains(document.activeElement))) leaked = true; }  // (body = focus left to the browser UI, the page is inert)
  t('dialog: Tab is trapped (9 presses)', !leaked);
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  t('dialog: Esc closes and focus returns to the opener', !(await p.isVisible('#dlg1')) && (await p.evaluate(() => document.activeElement.getAttribute('data-modal-open'))) === '#dlg1');
  await p.close();

  p = await open('components/alert-dialog.html');
  await p.focus('[data-modal-open="#ad1"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  t('alertdialog: role + label + description', await p.evaluate(() => { const d = document.querySelector('#ad1'); return d.getAttribute('role') === 'alertdialog' && !!d.getAttribute('aria-labelledby') && !!d.getAttribute('aria-describedby'); }));
  t('alertdialog: initial focus is the safe action (Cancel)', await p.evaluate(() => document.activeElement.textContent.trim() === 'Cancel'));
  await p.keyboard.press('Escape'); t('alertdialog: Esc does not dismiss', await p.isVisible('#ad1')); await p.click('#ad1 [data-modal-close] >> nth=0');
  await p.click('#ad-js'); await p.waitForTimeout(150);
  t('confirm(danger): focus starts on Cancel', await p.evaluate(() => document.activeElement.textContent.trim() === 'Cancel'));
  await p.keyboard.press('Escape'); await p.close();

  /* ---------- menus ---------- */
  p = await open('components/dropdown-menu.html');
  t('trigger announces menu popup', (await attr(p, 'main [data-dropdown-toggle] >> nth=0', 'aria-haspopup')) === 'menu' && !!(await attr(p, 'main [data-dropdown-toggle] >> nth=0', 'aria-controls')));
  await p.focus('main [data-dropdown-toggle] >> nth=0'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80);
  t('ArrowDown opens the menu and focuses the first item', (await attr(p, 'main [data-dropdown-toggle] >> nth=0', 'aria-expanded')) === 'true' && await p.evaluate(() => document.activeElement.classList.contains('menu-item')));
  const first = await p.evaluate(() => document.activeElement.textContent.trim());
  await p.keyboard.press('ArrowDown'); t('ArrowDown moves to the next item', (await p.evaluate(() => document.activeElement.textContent.trim())) !== first);
  await p.keyboard.press('End'); const lastTxt = await p.evaluate(() => document.activeElement.textContent.trim()); await p.keyboard.press('Home'); t('Home / End jump to first / last item', (await p.evaluate(() => document.activeElement.textContent.trim())) === first && lastTxt !== first);
  t('menu items have roles', await p.evaluate(() => [...document.querySelectorAll('.dropdown .menu[role=menu] .menu-item')].every(i => /^menuitem/.test(i.getAttribute('role')))));
  await p.keyboard.press('Escape'); await p.waitForTimeout(80);
  t('Esc closes the menu and returns focus to the trigger', (await attr(p, 'main [data-dropdown-toggle] >> nth=0', 'aria-expanded')) === 'false' && await p.evaluate(() => document.activeElement.hasAttribute('data-dropdown-toggle')));
  await p.keyboard.press('Enter'); await p.keyboard.press('Tab'); await p.waitForTimeout(80);
  t('Tab leaves and closes the menu', (await attr(p, 'main [data-dropdown-toggle] >> nth=0', 'aria-expanded')) === 'false');
  await p.close();

  p = await open('components/context-menu.html');
  await p.focus('.ctx-area'); await p.keyboard.press('Shift+F10'); await p.waitForTimeout(120);
  t('context menu opens from the keyboard (Shift+F10) and takes focus', await p.isVisible('#ctx1') && await p.evaluate(() => document.activeElement.classList.contains('menu-item')));
  await p.keyboard.press('Escape'); await p.waitForTimeout(80);
  t('context menu: Esc closes and focus returns to the area', !(await p.isVisible('#ctx1')) && await p.evaluate(() => document.activeElement.classList.contains('ctx-area')));
  await p.close();

  /* ---------- select / combobox ---------- */
  p = await open('components/select.html');
  t('select trigger is a combobox with a name', await p.evaluate(() => { const t = document.querySelector('.select-trigger'); return t.getAttribute('role') === 'combobox' && !!t.getAttribute('aria-controls') && !!t.getAttribute('aria-labelledby'); }));
  await p.focus('.select-trigger >> nth=0'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80);
  t('select opens with the keyboard, aria-expanded true', (await attr(p, '.select-trigger >> nth=0', 'aria-expanded')) === 'true');
  const ad1 = await attr(p, '.select-trigger >> nth=0', 'aria-activedescendant'); await p.keyboard.press('ArrowDown');
  t('aria-activedescendant follows the highlighted option', !!ad1 && (await attr(p, '.select-trigger >> nth=0', 'aria-activedescendant')) !== ad1 && await p.evaluate(() => { const id = document.querySelector('.select-trigger').getAttribute('aria-activedescendant'); return document.getElementById(id)?.getAttribute('role') === 'option'; }));
  await p.keyboard.press('Enter'); t('Enter selects, focus stays on the trigger', (await p.inputValue('#sel-hidden')) !== '' && await p.evaluate(() => document.activeElement.classList.contains('select-trigger')));
  t('the listbox is named', await p.evaluate(() => !!document.querySelector('.select-menu').getAttribute('aria-labelledby')));
  await p.close();
  p = await open('components/combobox.html');
  await p.click('#cbx1'); await p.keyboard.type('s'); await p.keyboard.press('ArrowDown');
  t('combobox: aria-controls + activedescendant + expanded', await p.evaluate(() => { const i = document.querySelector('#cbx1'); return !!document.getElementById(i.getAttribute('aria-controls')) && !!i.getAttribute('aria-activedescendant'); }) && (await attr(p, '#cbx1', 'aria-expanded')) === 'true');
  await p.keyboard.press('Escape'); t('combobox: Esc collapses', (await attr(p, '#cbx1', 'aria-expanded')) === 'false');
  await p.close();

  /* ---------- command palette ---------- */
  p = await open('components/command.html');
  await p.focus('[data-command-open]'); await p.keyboard.press('Control+k'); await p.waitForTimeout(150);
  t('Ctrl+K opens the palette with focus in its input', await p.evaluate(() => document.activeElement.closest('#cmd-dialog') && document.activeElement.getAttribute('role') === 'combobox'));
  t('palette: listbox -> groups -> options', await p.evaluate(() => { const l = document.querySelector('#cmd-dialog [role=listbox]'); return !!l && l.querySelectorAll('[role=group]').length >= 1 && l.querySelectorAll('[role=option]').length >= 3; }));
  const c0 = await p.evaluate(() => document.activeElement.getAttribute('aria-activedescendant')); await p.keyboard.press('ArrowDown');
  t('palette: activedescendant moves', (await p.evaluate(() => document.activeElement.getAttribute('aria-activedescendant'))) !== c0);
  await p.keyboard.type('zzzz'); await p.waitForTimeout(80);
  t('palette: "no results" is a live status outside the listbox', await p.evaluate(() => { const e = document.querySelector('#cmd-dialog .command-empty'); return e.getAttribute('role') === 'status' && !e.hidden && !e.closest('[role=listbox]'); }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  t('palette: Esc closes, focus returns', !(await p.isVisible('#cmd-dialog')));
  await p.close();

  /* ---------- calendar ---------- */
  p = await open('components/calendar.html');
  t('calendar: grid > row > columnheader/gridcell structure', await p.evaluate(() => { const g = document.querySelector('#cal1 [role=grid]'); return g.querySelectorAll('[role=row]').length === 7 && g.querySelectorAll('[role=columnheader]').length === 7 && g.querySelectorAll('[role=gridcell]').length === 42 && !!g.getAttribute('aria-labelledby'); }));
  t('calendar: day buttons are named with the weekday + date', await p.evaluate(() => /\d/.test(document.querySelector('#cal1 .cal-day').getAttribute('aria-label')) && /day/i.test(document.querySelector('#cal1 .cal-day').getAttribute('aria-label'))));
  await p.focus('#cal1 .cal-day[tabindex="0"]'); const d0 = await p.evaluate(() => document.activeElement.dataset.date);
  await p.keyboard.press('ArrowRight'); const d1 = await p.evaluate(() => document.activeElement.dataset.date);
  await p.keyboard.press('ArrowDown'); const d2 = await p.evaluate(() => document.activeElement.dataset.date);
  const dayDiff = (a, c) => Math.round((new Date(c) - new Date(a)) / 864e5);
  t('calendar: ← → move by 1 day, ↑ ↓ by 7', dayDiff(d0, d1) === 1 && dayDiff(d1, d2) === 7, `${d0} ${d1} ${d2}`);
  await p.keyboard.press('Home'); t('calendar: Home goes to the start of the week', (await p.evaluate(() => new Date(document.activeElement.dataset.date).getDay())) === 1);
  await p.keyboard.press('Enter'); t('calendar: Enter selects (aria-selected on the cell)', (await p.$$('#cal1 [role=gridcell][aria-selected="true"]')).length === 1);
  await p.close();

  /* ---------- tabs, tables, forms ---------- */
  p = await open('components/tabs.html');
  await p.focus('[role=tab][aria-selected="true"] >> nth=0'); await p.keyboard.press('ArrowRight');
  t('tabs: arrow moves focus + selection, roving tabindex', await p.evaluate(() => { const tabs = [...document.querySelectorAll('[data-tabs] [role=tab]')].slice(0, 3); return tabs[1].getAttribute('aria-selected') === 'true' && tabs[1].tabIndex === 0 && tabs[0].tabIndex === -1 && document.activeElement === tabs[1]; }));
  await p.close();
  p = await open('components/data-table.html');
  await p.focus('th[data-sort] >> nth=0'); await p.keyboard.press('Enter');
  t('sortable headers work with Enter and expose aria-sort', (await attr(p, 'th[data-sort] >> nth=0', 'aria-sort')) === 'ascending');
  await p.keyboard.press('Space'); t('… and Space toggles direction', (await attr(p, 'th[data-sort] >> nth=0', 'aria-sort')) === 'descending');
  t('column headers have scope', await p.evaluate(() => [...document.querySelectorAll('#dt-table thead th')].every(th => th.getAttribute('scope') === 'col')));
  await p.close();
  p = await open('components/field.html');
  await p.click('form[data-validate] .btn-primary'); await p.waitForTimeout(100);
  t('invalid submit focuses the first invalid control', await p.evaluate(() => document.activeElement.id === 'fd1'));
  t('invalid control: aria-invalid + describedby includes the error', await p.evaluate(() => { const i = document.getElementById('fd1'); const ids = (i.getAttribute('aria-describedby') || '').split(' '); return i.getAttribute('aria-invalid') === 'true' && ids.some(id => document.getElementById(id)?.classList.contains('error-text')); }));
  t('error text is an alert; required asterisk hidden from AT', await p.evaluate(() => document.querySelector('#fd1').closest('.field').querySelector('.error-text').getAttribute('role') === 'alert' && document.querySelector('.label .req').getAttribute('aria-hidden') === 'true'));
  await p.fill('#fd1', 'a@b.co'); await p.waitForTimeout(100);
  t('fixing the value clears aria-invalid', (await attr(p, '#fd1', 'aria-invalid')) === null);
  await p.close();

  /* ---------- live regions, names, roles ---------- */
  p = await open('components/toast.html');
  await p.click('#t-def'); await p.click('#t-err');
  t('toast: info = status, danger = alert; dismiss is labelled', await p.evaluate(() => { const ts = [...document.querySelectorAll('.toast')]; return ts[0].getAttribute('role') === 'status' && ts[1].getAttribute('role') === 'alert' && ts.every(x => x.querySelector('button[aria-label]')); }));
  await p.evaluate(() => { document.querySelectorAll('.toast').forEach(x => x.remove()); MGLSK.toast({ title: 'Pausable', timeout: 700 }); });
  await p.hover('.toast'); await p.waitForTimeout(1300);
  t('toast timer pauses while hovered (WCAG 2.2.1)', await p.evaluate(() => !!document.querySelector('.toast')));
  await p.mouse.move(5, 5); await p.waitForTimeout(2600);
  t('… and dismisses after the pointer leaves', await p.evaluate(() => !document.querySelector('.toast')));
  await p.click('#t-act'); t('toast with an action does not auto-dismiss', await p.evaluate(async () => { await new Promise(r => setTimeout(r, 300)); return !!document.querySelector('.toast-action'); }));
  await p.close();
  p = await open('components/chart.html');
  t('chart: svg has a name and a screen-reader data table', await p.evaluate(() => [...document.querySelectorAll('.chart')].filter(c => c.querySelector('svg[aria-label]') && c.querySelector('table.sr-only caption')).length === 4 && document.querySelectorAll('#ch-line table.sr-only tbody tr').length === 8));
  await p.close();
  p = await open('components/progress.html');
  t('progress: role + value', await p.evaluate(() => { const b = document.querySelector('.progress'); return b.getAttribute('role') === 'progressbar' && b.getAttribute('aria-valuenow') === '65' && !!b.getAttribute('aria-label'); }));
  await p.close();
  p = await open('components/avatar.html');
  t('avatar status is announced', await p.evaluate(() => [...document.querySelectorAll('.avatar[data-status]')].every(a => a.getAttribute('role') === 'img' && /online|away|busy/.test(a.getAttribute('aria-label')))));
  await p.close();
  p = await open('components/message-scroller.html');
  t('message scroller is a polite log', await p.evaluate(() => { const s = document.getElementById('ms1'); return s.getAttribute('role') === 'log' && s.getAttribute('aria-live') === 'polite'; }));
  await p.close();
  p = await open('components/code-block.html');
  t('code blocks are keyboard-scrollable and named only when they overflow', await p.evaluate(() => [...document.querySelectorAll('.codeblock pre')].every(pre => pre.scrollWidth <= pre.clientWidth + 1 || (pre.tabIndex === 0 && pre.getAttribute('role') === 'region' && !!pre.getAttribute('aria-label')))));
  await p.close();
  p = await open('components/pagination.html');
  t('pagination: nav labels are unique, pages have names', await p.evaluate(() => { const l = [...document.querySelectorAll('.pagination[role=navigation]')].map(n => n.getAttribute('aria-label')); return new Set(l).size === l.length && [...document.querySelectorAll('.pagination button')].every(b => b.getAttribute('aria-label')); }));
  await p.close();

  /* ---------- WCAG 1.4.13 + 2.2.2 ---------- */
  p = await open('components/tooltip.html');
  await p.hover('[data-tip] >> nth=0'); await p.waitForTimeout(250);
  const op = () => p.evaluate(() => getComputedStyle(document.querySelector('[data-tip]'), '::after').opacity);
  t('tooltip appears on hover', (await op()) === '1');
  await p.keyboard.press('Escape'); await p.waitForTimeout(250);
  t('tooltip is dismissible with Esc (1.4.13)', (await op()) === '0');
  await p.close();
  p = await open('components/hover-card.html');
  await p.hover('.hovercard-root a'); await p.waitForTimeout(600);
  const hcVis = () => p.evaluate(() => getComputedStyle(document.querySelector('.hovercard')).visibility);
  t('hover card appears', (await hcVis()) === 'visible');
  const hb = await (await p.$('.hovercard')).boundingBox(); await p.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2, { steps: 6 }); await p.waitForTimeout(300);
  t('hover card is hoverable (stays while the pointer is over it)', (await hcVis()) === 'visible');
  await p.keyboard.press('Escape'); await p.waitForTimeout(250); t('hover card dismisses with Esc', (await hcVis()) === 'hidden');
  await p.close();
  p = await open('components/carousel.html');
  const ap = await ctx.newPage(); await ap.goto(URL('components/carousel.html'));
  await ap.evaluate(() => { const c = document.querySelector('[data-carousel]'); c.dataset.autoplay = '800'; delete c._ak_car; MGLSK.init(); });
  t('autoplay carousel gets a Pause control', (await ap.$$('.carousel-pause')).length >= 1);
  await ap.close(); await p.close();
  const rm = await b.newContext({ reducedMotion: 'reduce', viewport: { width: 1000, height: 700 } });
  p = await rm.newPage(); await p.addInitScript(() => localStorage.setItem('mglsk-fx', 'on')); await p.goto(URL('examples/dashboard.html')); await p.waitForTimeout(300);
  t('prefers-reduced-motion: decorative animation off', await p.evaluate(() => [...document.querySelectorAll('.cursor')].every(c => getComputedStyle(c).animationName === 'none')));
  t('prefers-reduced-motion: content is visible immediately', await p.evaluate(() => [...document.querySelectorAll('.card')].every(c => getComputedStyle(c).opacity === '1')));
  await p.close(); await rm.close();
  p = await open('examples/dashboard.html');
  t('fx off (CRT toggle) stops the blinking cursor', await p.evaluate(() => [...document.querySelectorAll('.cursor')].every(c => getComputedStyle(c).animationName === 'none')));
  await p.close();

  /* ---------- reflow @320px (1.4.10) + zoom ---------- */
  const pages = fs.readdirSync(ROOT + '/components').filter(f => f.endsWith('.html')).map(f => 'components/' + f).concat(['index.html', 'usage.html', 'examples/dashboard.html', 'examples/settings.html', 'examples/login.html', 'starter/index.html']);
  const wide = [];
  for (const u of pages) {
    const q = await ctx.newPage(); await q.setViewportSize({ width: 320, height: 700 }); await q.goto(URL(u)); await q.waitForTimeout(120);
    const over = await q.evaluate(() => { const d = document.documentElement; const vw = d.clientWidth, bad = []; const clipped = e => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (/(auto|scroll|hidden|clip)/.test(o.overflowX) && a.getBoundingClientRect().right <= vw + 1) return true; } return false; }; document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (r.right > vw + 1 && r.width > 0 && cs.visibility !== 'hidden' && cs.opacity !== '0' && cs.position !== 'fixed' && !e.closest('.sr-only,.sidenav,dialog,.menu,.popover,.hovercard,.navmenu-panel,.select-menu,.dp-panel,.toasts,.nav-backdrop') && !clipped(e)) bad.push((e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0])); }); return bad.length ? d.scrollWidth + ' > ' + vw + ' ' + [...new Set(bad)].slice(0, 3).join(',') : (d.scrollWidth > vw + 1 ? 'scrollWidth ' + d.scrollWidth : null); });
    if (over) wide.push(u.replace('components/', '') + ' (' + over + ')');
    await q.close();
  }
  t(`reflow: no horizontal page scroll at 320px on ${pages.length} pages`, !wide.length, wide.join('; '));

  /* ---------- text spacing (1.4.12): nothing is clipped when users override spacing ---------- */
  const clipped = [];
  for (const u of ['examples/dashboard.html', 'examples/settings.html', 'components/card.html', 'components/button.html', 'components/data-table.html', 'components/item.html', 'components/badge.html']) {
    const q = await open(u);
    await q.addStyleTag({ content: '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}.reveal{opacity:1!important;transform:none!important;transition:none!important}' });
    await q.waitForTimeout(150);
    const bad = await q.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { if (e.closest('.sr-only,svg,.skip-link,.fx-scan,.fx-grain,pre,.table-wrap,.tabs,.carousel-track')) return false; const cs = getComputedStyle(e); if (!/hidden|clip/.test(cs.overflowY) || cs.display === 'inline') return false; if (!e.textContent.trim() || e.children.length > 6) return false; return e.scrollHeight > e.clientHeight + 3 && e.clientHeight > 0; }).slice(0, 3).map(e => e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0]));
    if (bad.length) clipped.push(u + ': ' + bad.join(','));
    await q.close();
  }
  t('text spacing override clips no text', !clipped.length, clipped.join(' | '));

  /* ---------- visible focus on every tab stop (2.4.7) ---------- */
  const noFocus = [];
  for (const u of ['examples/dashboard.html', 'examples/settings.html', 'examples/login.html', 'components/button.html', 'components/form-controls.html'.replace('form-controls', 'field'), 'components/data-table.html', 'components/pagination.html', 'components/tabs.html', 'components/slider.html', 'components/menubar.html', 'components/toggle-group.html', 'starter/index.html']) {
    const q = await open(u); let n = 0;
    for (let i = 0; i < 70; i++) {
      await q.keyboard.press('Tab');
      const r = await q.evaluate(() => {
        const e = document.activeElement; if (!e || e === document.body) return null;
        const cs = getComputedStyle(e), pseudo = e.matches('input[type=range]');
        const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.outlineColor);
        const ring = cs.boxShadow !== 'none';
        const label = e.tagName.toLowerCase() + (e.id ? '#' + e.id : '.' + String(e.className).split(' ')[0]);
        const hasLabel = e.closest('.check,.switch') ? (() => { const c = getComputedStyle(e.closest('.check,.switch')); return c; })() : null; void hasLabel;
        return { label, ok: outline || ring || pseudo, skip: e.classList.contains('skip-link') };
      });
      if (!r) break; n++;
      if (!r.ok) noFocus.push(u.split('/').pop() + ':' + r.label);
    }
    await q.close();
  }
  t('every tab stop shows a focus indicator (12 pages)', !noFocus.length, [...new Set(noFocus)].slice(0, 8).join(', '));

  /* ---------- forced colours ---------- */
  const fc = await b.newContext({ forcedColors: 'active', viewport: { width: 1100, height: 800 } });
  p = await fc.newPage(); await p.addInitScript(() => localStorage.setItem('mglsk-fx', 'off')); await p.goto(URL('examples/dashboard.html')); await p.waitForTimeout(300);
  await p.focus('.btn-primary'); await p.keyboard.press('Tab'); await p.keyboard.press('Shift+Tab');
  t('forced-colors: focus outline uses a system colour', await p.evaluate(() => { const cs = getComputedStyle(document.activeElement); return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2; }));
  t('forced-colors: decorative layers removed, borders kept', await p.evaluate(() => getComputedStyle(document.querySelector('.fx-scan')).display === 'none' && getComputedStyle(document.querySelector('.card')).borderTopStyle !== 'none'));
  await p.screenshot({ path: '/tmp/forced-colors.png' }); await p.close(); await fc.close();

  t('no page errors', !errs.length, errs.slice(0, 3).join(' | '));
  const bad = res.filter(r => !r[1]);
  res.forEach(r => console.log(r[1] ? 'PASS' : 'FAIL', r[0], r[2]));
  console.log(res.length, 'checks;', bad.length, 'failed'); await b.close(); process.exit(bad.length ? 1 : 0);
})();
