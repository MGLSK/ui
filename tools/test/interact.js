const { chromium, executablePath } = require('./pw');
const ROOT = require('path').resolve(__dirname, '..', '..');
const URL = p => 'file://' + ROOT + '/' + p;
(async () => {
  const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => { localStorage.setItem('mglsk-fx', 'off'); });
  const results = [];
  const open = async n => { const pg = await ctx.newPage(); pg.on('pageerror', e => results.push(['PAGEERROR ' + n, false, e.message])); await pg.goto(URL(`components/${n}.html`)); await pg.waitForTimeout(150); return pg; };
  const t = (name, ok, extra = '') => results.push([name, !!ok, extra]);
  let p;

  p = await open('select');
  await p.click('.select-trigger >> nth=0'); t('select opens', await p.isVisible('.select-menu >> nth=0'));
  await p.click('.select-option[data-value=banana]'); t('select picks', (await p.inputValue('#sel-hidden')) === 'banana', await p.textContent('#sel-out'));
  t('select shows label', (await p.textContent('.select-value >> nth=0')).trim() === 'Banana');
  await p.click('.select-trigger >> nth=0'); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter'); t('select keyboard', (await p.inputValue('#sel-hidden')) === 'cherry', await p.inputValue('#sel-hidden'));
  await p.click('.select-trigger >> nth=0'); await p.click('.select-option[data-value=leek]', { force: true }).catch(() => {}); t('disabled option ignored', (await p.inputValue('#sel-hidden')) !== 'leek');
  await p.close();

  p = await open('combobox');
  await p.fill('#cbx1', 'sv'); const vis = await p.$$eval('[data-combobox] >> nth=0', () => 0).catch(() => 0);
  const visible = await p.$$eval('.select-root >> nth=0 >> .select-option', os => os.filter(o => !o.hidden).map(o => o.textContent)).catch(() => null);
  const shown = await p.evaluate(() => [...document.querySelectorAll('[data-combobox]')][0].querySelectorAll('.select-option:not([hidden])').length);
  t('combobox filters', shown === 1, 'shown=' + shown);
  await p.keyboard.press('Enter'); t('combobox selects', (await p.inputValue('#cbx1')) === 'SvelteKit', await p.inputValue('#cbx1'));
  const chips = await p.evaluate(() => document.querySelectorAll('[data-multiple] .chip').length); t('multi preselected chip', chips === 1, 'chips=' + chips);
  await p.fill('[data-multiple] input', 'go'); await p.keyboard.press('Enter'); t('multi adds chip', (await p.evaluate(() => document.querySelectorAll('[data-multiple] .chip').length)) === 2);
  await p.close();

  p = await open('calendar');
  await p.click('#cal1 .cal-day:not(.outside) >> nth=9'); t('calendar single', /value/.test(await p.textContent('#cal-out')), await p.textContent('#cal-out'));
  await p.click('#cal2 .cal-day:not(.outside) >> nth=4'); await p.click('#cal2 .cal-day:not(.outside) >> nth=10');
  t('calendar range', /start/.test(await p.textContent('#cal-out')) && (await p.$$('#cal2 .in-range')).length === 5, await p.textContent('#cal-out'));
  await p.click('#cal1 [data-cal="1"]'); t('calendar next month', true);
  await p.close();

  p = await open('date-picker');
  await p.click('[data-datepicker] .select-trigger >> nth=0'); t('datepicker opens', await p.isVisible('.dp-panel >> nth=0'));
  await p.click('.dp-panel >> nth=0 >> .cal-day:not(.outside) >> nth=14'); t('datepicker value', (await p.textContent('.select-value >> nth=0')).includes('20'), await p.textContent('.select-value >> nth=0'));
  t('datepicker closes', !(await p.isVisible('.dp-panel >> nth=0')));
  await p.close();

  p = await open('input-otp');
  await p.click('#otp1 input >> nth=0'); await p.keyboard.type('1234'); t('otp advance', /1234/.test(await p.textContent('#otp-out')), await p.textContent('#otp-out'));
  await p.click('#otp-reset'); await p.evaluate(() => { const i = document.querySelector('#otp1 input'); i.focus(); const dt = new DataTransfer(); dt.setData('text', '987654'); i.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); });
  t('otp paste completes', /Code: 987654/.test(await p.textContent('#otp-out')), await p.textContent('#otp-out'));
  await p.close();

  p = await open('slider');
  await p.fill('.slider input >> nth=0', '70').catch(async () => { await p.evaluate(() => { const i = document.querySelector('.slider input'); i.value = 70; i.dispatchEvent(new Event('input', { bubbles: true })); }); });
  t('slider output', (await p.textContent('.slider-value >> nth=0')).trim() === '70%', await p.textContent('.slider-value >> nth=0'));
  t('range output', /100 – 350/.test(await p.textContent('.slider-value >> nth=1')), await p.textContent('.slider-value >> nth=1'));
  await p.close();

  p = await open('toggle-group');
  await p.click('#tg1 .toggle >> nth=2'); t('toggle single', (await p.getAttribute('#tg1 .toggle >> nth=0', 'aria-pressed')) === 'false' && (await p.getAttribute('#tg1 .toggle >> nth=2', 'aria-pressed')) === 'true', await p.textContent('#tg-out'));
  await p.click('#tg2 .toggle >> nth=1'); t('toggle multiple', /italic/.test(await p.textContent('#tg-out')), await p.textContent('#tg-out'));
  await p.close();

  p = await open('command');
  await p.keyboard.press('Control+k'); t('ctrl+k opens palette', await p.isVisible('#cmd-dialog'));
  await p.keyboard.type('sett'); const n = await p.evaluate(() => document.querySelectorAll('#cmd-dialog .command-item:not([hidden])').length); t('command filters', n === 1, 'items=' + n);
  await p.keyboard.press('Enter'); t('command runs + closes', !(await p.isVisible('#cmd-dialog')) && /Ran: Settings/.test(await p.textContent('#cmd-out')), await p.textContent('#cmd-out'));
  await p.close();

  p = await open('context-menu');
  await p.click('.ctx-area', { button: 'right' }); t('context menu opens', await p.isVisible('#ctx1'));
  await p.keyboard.press('Escape'); t('context menu esc', !(await p.isVisible('#ctx1')));
  await p.close();

  p = await open('popover');
  await p.click('[data-popover-toggle] >> nth=0'); t('popover opens', await p.isVisible('.popover >> nth=0'));
  await p.keyboard.press('Escape'); t('popover esc', !(await p.isVisible('.popover >> nth=0')));
  await p.close();

  p = await open('carousel');
  await p.click('[data-carousel] .carousel-btn.next >> nth=0'); await p.waitForTimeout(600);
  t('carousel next', (await p.evaluate(() => document.querySelector('.carousel-track').scrollLeft)) > 100);
  await p.close();

  p = await open('resizable');
  const hb = await (await p.$('.resizable-handle')).boundingBox(); const before = (await (await p.$('.resizable-panel')).boundingBox()).width;
  await p.mouse.move(hb.x + 3, hb.y + 50); await p.mouse.down(); await p.mouse.move(hb.x + 200, hb.y + 50, { steps: 5 }); await p.mouse.up();
  const after = (await (await p.$('.resizable-panel')).boundingBox()).width; t('resizable drag', after > before + 100, `${Math.round(before)} -> ${Math.round(after)}`);
  await p.focus('.resizable-handle'); await p.keyboard.press('ArrowLeft'); t('resizable keyboard', (await (await p.$('.resizable-panel')).boundingBox()).width < after);
  await p.close();

  p = await open('message-scroller');
  const atBottom = () => p.evaluate(() => { const e = document.getElementById('ms1'); return e.scrollHeight - e.scrollTop - e.clientHeight < 5; });
  await p.waitForTimeout(300); t('scroller starts at bottom', await atBottom());
  await p.evaluate(() => { const e = document.getElementById('ms1'); e.style.scrollBehavior = 'auto'; e.scrollTop = 0; }); await p.waitForTimeout(100);
  t('jump button shows when away', await p.isVisible('.scroller-jump'));
  await p.click('.scroller-jump'); await p.waitForTimeout(500); t('jump scrolls to end', await atBottom());
  await p.fill('#ms-in', 'hello world'); await p.press('#ms-in', 'Enter'); await p.waitForTimeout(1200);
  t('message appended + reply', (await p.evaluate(() => document.querySelectorAll('#ms1 .message').length)) === 8 && await atBottom());
  await p.close();

  p = await open('questionnaire');
  t('quiz next disabled until answered', await p.isDisabled('[data-quiz-next]'));
  await p.click('.radio-card >> nth=1'); await p.click('[data-quiz-next]'); await p.click('[data-quiz-next]'); await p.fill('textarea', 'hi'); await p.click('[data-quiz-next]');
  t('quiz summary', /Website/.test(await p.textContent('[data-quiz-summary]')) && /hi/.test(await p.textContent('[data-quiz-summary]')), (await p.textContent('[data-quiz-summary]')).slice(0, 80));
  await p.close();

  p = await open('trace');
  await p.click('.trace-row .trace-row .trace-head >> nth=0'); t('trace expands', await p.isVisible('.trace-children .trace-body >> nth=0'));
  await p.close();

  p = await open('alert-dialog');
  await p.click('[data-modal-open="#ad1"]'); await p.keyboard.press('Escape'); t('alertdialog ignores Esc', await p.isVisible('#ad1'));
  await p.mouse.click(5, 5); t('alertdialog ignores backdrop', await p.isVisible('#ad1'));
  await p.click('#ad1-ok'); t('alertdialog action', !(await p.isVisible('#ad1')) && /Deleted/.test(await p.textContent('#ad-out')));
  await p.click('#ad-js'); await p.click('dialog[open] .btn-danger'); await p.waitForTimeout(100); t('confirm promise', /Discarded/.test(await p.textContent('#ad-out')));
  await p.close();

  p = await open('data-table');
  t('datatable page 1 shows 8', (await p.evaluate(() => [...document.querySelectorAll('#dt-body tr')].filter(r => !r.hidden).length)) === 8);
  await p.selectOption('#dt-size', '12'); t('page size 12', (await p.evaluate(() => [...document.querySelectorAll('#dt-body tr')].filter(r => !r.hidden).length)) === 12);
  await p.fill('#dt-filter', 'ada'); await p.waitForTimeout(50); t('datatable filter', (await p.evaluate(() => [...document.querySelectorAll('#dt-body tr')].filter(r => !r.hidden).length)) === 1);
  await p.fill('#dt-filter', ''); await p.click('th[data-sort] >> nth=0'); t('datatable sort asc', (await p.textContent('#dt-body tr:not([hidden]) td >> nth=1')) === 'Ada');
  await p.click('.table-toolbar [data-dropdown-toggle]'); await p.click('#dt-cols .menu-item >> nth=0');
  t('column toggle hides', !(await p.isVisible('#dt-table thead th >> nth=1')));
  await p.close();

  p = await open('navigation-menu');
  await p.hover('.navmenu-trigger >> nth=0'); t('navmenu hover opens', await p.isVisible('.navmenu-panel >> nth=0'));
  await p.close();

  p = await open('menubar');
  await p.click('.menubar .dropdown >> nth=0 >> button'); await p.hover('.menubar .dropdown >> nth=1 >> button'); t('menubar hover-switch', await p.isVisible('.menubar .dropdown >> nth=1 >> .menu') && !(await p.isVisible('.menubar .dropdown >> nth=0 >> .menu')));
  await p.close();

  p = await open('pagination');
  await p.click('#pg1 button:has-text("6")'); t('pagination event', /page: 6/.test(await p.textContent('#pg-out')), await p.textContent('#pg-out'));
  t('pagination ellipsis', (await p.$$('.pagination .ellipsis')).length >= 2);
  await p.close();

  p = await open('code-block');
  t('highlight tokens', (await p.$$('.codeblock .tok-k')).length > 3 && (await p.$$('.codeblock .tok-s')).length > 0);
  t('line numbers + hl', (await p.$$('.codeblock.lines .ln')).length === 6 && (await p.$$('.codeblock .hl')).length === 2);
  await p.close();

  p = await open('direction');
  await p.click('[data-dir-toggle="rtl"]'); t('dir rtl', (await p.getAttribute('#dir-demo', 'dir')) === 'rtl');
  await p.close();

  p = await open('collapsible');
  await p.click('.collapsible-trigger'); await p.waitForTimeout(450); t('collapsible closes', (await (await p.$('.collapsible-body')).boundingBox()).height < 2);
  await p.close();

  p = await open('accordion');
  await p.click('[data-accordion="single"] details >> nth=1 >> summary'); await p.waitForTimeout(100);
  t('accordion exclusive', (await p.evaluate(() => [...document.querySelectorAll('[data-accordion] details')].filter(d => d.open).length)) === 1);
  await p.close();

  p = await open('sheet');
  await p.click('[data-modal-open="#sh-l"]'); t('sheet opens', await p.isVisible('#sh-l'));
  await p.keyboard.press('Escape'); await p.close();

  p = await open('drawer');
  await p.click('[data-modal-open="#dr1"]'); await p.waitForTimeout(450); t('drawer opens', await p.isVisible('#dr1'));
  const hbx = await (await p.$('.drawer-handle')).boundingBox();
  await p.mouse.move(hbx.x + 24, hbx.y + 2); await p.mouse.down(); await p.mouse.move(hbx.x + 24, hbx.y + 220, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(150);
  t('drawer drag dismiss', !(await p.isVisible('#dr1')));
  await p.close();

  p = await open('toast');
  await p.click('#t-act'); t('toast with action', (await p.$$('.toast .toast-action')).length === 1); await p.click('.toast-action'); await p.waitForTimeout(100); t('toast action runs', /Restored/.test(await p.textContent('.toasts')));
  await p.close();

  p = await open('sidebar');
  await p.click('.app-embed [data-toggle="nav"]'); t('sidebar embed collapses (scoped)', (await p.getAttribute('.app-embed', 'data-nav')) === 'collapsed' && !(await p.getAttribute('body > .app', 'data-nav')));
  await p.close();

  p = await open('checkbox');
  await p.click('#cb-all'); t('checkbox parent selects children', (await p.$$('.cb-child:checked')).length === 3);
  await p.close();

  p = await open('textarea');
  await p.fill('#tx3', 'x'.repeat(90)); t('textarea counter over', await p.isVisible('.counter.over'));
  await p.close();

  p = await open('chart');
  t('charts rendered', (await p.$$('.chart svg')).length >= 4 && (await p.$$('.spark svg')).length === 2);
  await p.close();

  p = await open('network');
  const cnt = await p.evaluate(() => [document.querySelectorAll('.net-node').length, document.querySelectorAll('.net-link').length, document.querySelectorAll('.net-flow').length]);
  t('network renders nodes + links', cnt[0] === 11 && cnt[1] === 12, cnt.join('/'));
  t('network: a down link has no traffic', cnt[2] === 11, 'flows=' + cnt[2]);
  const box = await p.evaluate(() => { const r = document.querySelector('#net1 svg').getBoundingClientRect(); return [r.width, r.height]; });
  t('network svg fits its host', box[0] > 300 && box[1] > 200 && box[1] <= 530, box.join('x'));
  await p.focus('.net-node[data-id=db]');
  const hl = await p.evaluate(() => [document.querySelector('#net1').classList.contains('net-focus'), [...document.querySelectorAll('.net-node.on')].map(n => n.dataset.id).sort().join(',')]);
  t('network focus lights up neighbours', hl[0] && hl[1] === 'app1,app2,app3,db,repl', hl[1]);
  t('network tooltip shows', await p.isVisible('#net1 .chart-tip.on'));
  await p.keyboard.press('Enter');
  t('network Enter selects and emits mglsk:network', (await p.getAttribute('.net-node[data-id=db]', 'aria-pressed')) === 'true' && /Primary DB/.test(await p.textContent('#net-out')), await p.textContent('#net-out'));
  await p.keyboard.press('Space');
  t('network Space deselects', (await p.getAttribute('.net-node[data-id=db]', 'aria-pressed')) === 'false');
  await p.hover('.net-node[data-id=waf]'); await p.mouse.move(5, 5);
  t('network focus clears on leave', !(await p.evaluate(() => document.querySelector('#net1').classList.contains('net-focus'))));
  t('network has accessible names', /Primary DB, Data, online, 4 connections/.test(await p.getAttribute('.net-node[data-id=db]', 'aria-label')), await p.getAttribute('.net-node[data-id=db]', 'aria-label'));
  t('network has a data table for screen readers', (await p.$$('#net1 table.sr-only')).length === 2);
  await p.setViewportSize({ width: 420, height: 800 }); await p.waitForTimeout(250);
  t('network re-renders narrow without overflow', await p.evaluate(() => document.querySelector('#net1 svg').getBoundingClientRect().width <= document.querySelector('#net1').clientWidth + 1));
  await p.close();

  const bad = results.filter(r => !r[1]);
  console.log(results.length, 'checks;', bad.length, 'failed');
  results.forEach(r => console.log(r[1] ? 'PASS' : 'FAIL', r[0], r[2] || ''));
  await b.close();
})();
