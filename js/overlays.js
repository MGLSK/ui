/* MGLSK UI overlays — popover, context menu, menubar, navigation menu, command palette, drawer, accordion, collapsible, menu items.
 *
 *  .popover-root > [data-popover-toggle] + .popover      click toggle, Esc/outside closes
 *  [data-context-menu="#menuId"]                          right-click / long-press area
 *  .menubar .dropdown                                     hover-switch once one is open
 *  .navmenu > li > .navmenu-trigger + .navmenu-panel      hover + click + keyboard
 *  [data-command] / dialog[data-command-dialog]           filterable list; Ctrl/Cmd+K opens the dialog
 *  dialog.drawer-bottom                                   drag the handle down to dismiss
 *  [data-accordion="single"] / .collapsible               exclusive accordion / animated collapsible
 *  .menu-item[role=menuitemcheckbox|menuitemradio]        toggles aria-checked
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fire = (el, name, detail) => el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
  const once = (el, key) => (el['_ak_' + key] ? false : (el['_ak_' + key] = true));

  /* ---------- popover ---------- */
  document.addEventListener('click', e => {
    const tg = e.target.closest('[data-popover-toggle]');
    $$('.popover-root.open').forEach(p => { if (!tg || p !== tg.closest('.popover-root')) if (!p.contains(e.target) || tg) p.classList.remove('open'); });
    if (tg) { const r = tg.closest('.popover-root'); r.classList.toggle('open'); tg.setAttribute('aria-expanded', r.classList.contains('open')); if (r.classList.contains('open')) $('input,button,a,[tabindex]', $('.popover', r))?.focus(); }
    // menu item toggles
    const mi = e.target.closest('.menu-item[role="menuitemcheckbox"], .menu-item[role="menuitemradio"]');
    if (mi) {
      if (mi.getAttribute('role') === 'menuitemradio') $$(`.menu-item[role="menuitemradio"][data-group="${mi.dataset.group}"]`, mi.closest('.menu')).forEach(r => r.setAttribute('aria-checked', r === mi));
      else mi.setAttribute('aria-checked', mi.getAttribute('aria-checked') !== 'true');
      e.stopPropagation(); fire(mi, 'mglsk:menu', { value: mi.dataset.value, checked: mi.getAttribute('aria-checked') === 'true' });
    }
    // context menu closes on any click
    $$('.menu.ctx.open').forEach(m => m.classList.remove('open'));
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { $$('.popover-root.open').forEach(p => { p.classList.remove('open'); $('[data-popover-toggle]', p)?.focus(); }); $$('.menu.ctx.open').forEach(m => { m.classList.remove('open'); ctxOpener && ctxOpener.focus && ctxOpener.focus(); }); $$('.navmenu > li.open').forEach(l => l.classList.remove('open')); } });

  /* ---------- context menu ---------- */
  let ctxOpener = null;
  const showCtx = (menu, x, y) => {
    $$('.menu.ctx.open').forEach(m => m.classList.remove('open'));
    ctxOpener = document.activeElement;
    menu.classList.add('open'); const r = menu.getBoundingClientRect();
    menu.style.left = Math.min(x, innerWidth - r.width - 8) + 'px'; menu.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';
    $('.menu-item', menu)?.focus();
  };
  document.addEventListener('contextmenu', e => {
    const a = e.target.closest('[data-context-menu]'); if (!a) return;
    const m = $(a.dataset.contextMenu); if (!m) return; e.preventDefault(); m.classList.add('ctx');
    // keyboard invocation (Shift+F10 / Menu key) reports no pointer position: anchor to the focused area instead
    let x = e.clientX, y = e.clientY;
    if (!x && !y) { const r = a.getBoundingClientRect(); x = r.left + Math.min(40, r.width / 2); y = r.top + Math.min(24, r.height / 2); }
    showCtx(m, x, y);
  });
  let press; document.addEventListener('pointerdown', e => { const a = e.target.closest('[data-context-menu]'); if (a && e.pointerType === 'touch') press = setTimeout(() => showCtx($(a.dataset.contextMenu), e.clientX, e.clientY), 550); });
  ['pointerup', 'pointermove', 'pointercancel'].forEach(n => document.addEventListener(n, () => clearTimeout(press)));

  /* ---------- menubar: hover-switch while one is open ---------- */
  document.addEventListener('mouseover', e => {
    const d = e.target.closest('.menubar .dropdown'); if (!d) return;
    const bar = d.closest('.menubar'); if (!$('.dropdown.open', bar) || d.classList.contains('open')) return;
    $$('.dropdown.open', bar).forEach(o => o.classList.remove('open')); d.classList.add('open');
  });
  document.addEventListener('keydown', e => {
    const d = e.target.closest?.('.menubar .dropdown'); if (!d || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const all = $$('.dropdown', d.closest('.menubar')), n = all[(all.indexOf(d) + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
    if (n && d.classList.contains('open')) { d.classList.remove('open'); n.classList.add('open'); $('.menu-item', n)?.focus(); }
  });

  /* ---------- navigation menu ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('.navmenu-trigger'), li = t?.parentElement;
    $$('.navmenu > li.open').forEach(o => { if (o !== li) o.classList.remove('open'); });
    if (li) { li.classList.toggle('open'); t.setAttribute('aria-expanded', li.classList.contains('open')); }
  });
  document.addEventListener('mouseover', e => {
    const li = e.target.closest('.navmenu > li'); if (!li || !$('.navmenu-panel', li) || !matchMedia('(hover:hover)').matches) return;
    $$('.navmenu > li.open', li.parentElement).forEach(o => o !== li && o.classList.remove('open')); li.classList.add('open');
  });
  document.addEventListener('mouseout', e => { const nav = e.target.closest('.navmenu'); if (nav && !nav.contains(e.relatedTarget)) $$('li.open', nav).forEach(o => o.classList.remove('open')); });

  /* ---------- command ---------- */
  function initCommand(c) {
    if (!once(c, 'cmd')) return;
    const input = $('input', c), list = $('.command-list', c), empty = $('.command-empty', c);
    const items = () => $$('.command-item', list).filter(i => !i.hidden);
    let cur = 0;
    // ARIA: input is a combobox that controls the listbox; items are options inside labelled groups
    list.id ||= 'cmd-' + Math.random().toString(36).slice(2, 7);
    list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', input.getAttribute('aria-label') || 'Commands');
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-controls', list.id); input.setAttribute('aria-expanded', 'true'); input.setAttribute('aria-autocomplete', 'list');
    if (empty) { empty.setAttribute('role', 'status'); list.after(empty); }   // live message must not live inside the listbox
    let group = null, n = 0;
    $$(':scope > *', list).forEach(el => {
      if (el.classList.contains('command-group-label')) {
        el.setAttribute('aria-hidden', 'true'); el.id ||= `${list.id}-g${n++}`;
        group = document.createElement('div'); group.setAttribute('role', 'group'); group.setAttribute('aria-labelledby', el.id); el.before(group); group.append(el);
      } else if (el.classList.contains('command-item')) { (group || list).append(el); }
    });
    $$('.command-item', list).forEach((it, i) => { it.setAttribute('role', 'option'); it.id ||= `${list.id}-o${i}`; });
    const mark = () => { const all = items(); all.forEach((it, i) => { it.setAttribute('aria-selected', i === cur); if (i === cur) { it.scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', it.id); } }); if (!all.length) input.removeAttribute('aria-activedescendant'); };
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      $$('.command-item', list).forEach(i => (i.hidden = !!q && !(i.textContent + ' ' + (i.dataset.keywords || '')).toLowerCase().includes(q)));
      $$('[role="group"]', list).forEach(g => (g.hidden = !$$('.command-item', g).some(i => !i.hidden)));
      if (empty) empty.hidden = items().length > 0;
      cur = 0; mark();
    };
    const run = it => { fire(c, 'mglsk:command', { value: it.dataset.value || it.textContent.trim(), item: it }); it.click?.(); const d = c.closest('dialog'); d && d.close(); };
    input.addEventListener('input', filter);
    c.addEventListener('keydown', e => {
      const len = items().length; if (!len) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); cur = (cur + 1) % len; mark(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); cur = (cur - 1 + len) % len; mark(); }
      if (e.key === 'Home') { e.preventDefault(); cur = 0; mark(); }
      if (e.key === 'End') { e.preventDefault(); cur = len - 1; mark(); }
      if (e.key === 'Enter') { e.preventDefault(); run(items()[cur]); }
    });
    list.addEventListener('mousemove', e => { const it = e.target.closest('.command-item'); if (it) { const i = items().indexOf(it); if (i >= 0 && i !== cur) { cur = i; mark(); } } });
    list.addEventListener('click', e => { const it = e.target.closest('.command-item'); if (it && e.isTrusted) { fire(c, 'mglsk:command', { value: it.dataset.value || it.textContent.trim(), item: it }); const d = c.closest('dialog'); d && d.close(); } });
    c.reset = () => { input.value = ''; filter(); input.focus(); };
    filter();
  }
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { const d = $('dialog[data-command-dialog]'); if (d) { e.preventDefault(); d.open ? d.close() : (d.showModal(), $('[data-command]', d).reset?.()); } }
  });
  document.addEventListener('click', e => { const o = e.target.closest('[data-command-open]'); if (o) { const d = $(o.dataset.commandOpen); d.showModal(); $('[data-command]', d).reset?.(); } if (e.target instanceof HTMLDialogElement && e.target.matches('.command-dialog')) e.target.close(); });

  /* ---------- bottom drawer: drag handle to dismiss ---------- */
  function initDrawer(d) {
    if (!once(d, 'drawer')) return;
    const h = $('.drawer-handle', d); if (!h) return;
    let y0 = null, dy = 0;
    h.addEventListener('pointerdown', e => { y0 = e.clientY; h.setPointerCapture(e.pointerId); d.style.transition = 'none'; });
    h.addEventListener('pointermove', e => { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); d.style.transform = `translateY(${dy}px)`; });
    const end = () => { if (y0 == null) return; y0 = null; d.style.transition = ''; if (dy > 120) d.close(); d.style.transform = ''; dy = 0; };
    h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
  }

  /* ---------- accordion (exclusive) + collapsible ---------- */
  document.addEventListener('toggle', e => {
    const d = e.target; if (!(d instanceof HTMLDetailsElement) || !d.open) return;
    const a = d.closest('[data-accordion="single"]'); if (a) $$('details[open]', a).forEach(o => o !== d && (o.open = false));
  }, true);
  document.addEventListener('click', e => {
    const t = e.target.closest('.collapsible-trigger'); if (!t) return;
    const c = t.closest('.collapsible'); c.classList.toggle('open'); t.setAttribute('aria-expanded', c.classList.contains('open'));
  });

  AK.initOverlays = (root = document) => { $$('[data-command]', root).forEach(initCommand); $$('dialog.drawer-bottom', root).forEach(initDrawer); };
  const prevInit = AK.init; AK.init = (root = document) => { prevInit && prevInit(root); AK.initOverlays(root); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => AK.initOverlays()) : AK.initOverlays();
})();
