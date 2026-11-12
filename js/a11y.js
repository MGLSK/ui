/* MGLSK UI a11y — cross-cutting accessibility semantics, applied automatically (and again on MGLSK.init(root)).
 *
 *  - menus:        role=menu / menuitem / separator, aria-haspopup + aria-controls, ←/→/Home/End/Esc/Tab handling, focus returns to the trigger
 *  - progress:     role=progressbar with aria-valuenow kept in sync with the bar width / --v
 *  - dialogs:      aria-labelledby from their heading
 *  - scrollables:  keyboard-focusable (tabindex=0 + role=region + label) only while they actually overflow
 *  - sortable <th> operable with Enter / Space; header cells get scope
 *  - fields:       aria-describedby (hint + error) and aria-invalid mirrored from .field state; required asterisks hidden from AT
 *  - tooltips:     icon-only [data-tip] elements get an accessible name; Esc dismisses hover content (WCAG 1.4.13)
 *  - landmarks:    duplicate navigation labels are made unique; carousel slides get roles/labels; avatars with status announce it
 *  - live regions: message scroller = role=log
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const uid = p => p + '-' + Math.random().toString(36).slice(2, 8);
  const once = (el, key) => (el['_ak_a_' + key] ? false : (el['_ak_a_' + key] = true));

  /* ---------- menus ---------- */
  function menus(root) {
    $$('.menu', root).forEach(menu => {
      const items = $$(':scope > .menu-item, :scope > .menu-sub > .menu-item', menu);
      if (!items.length || menu.hasAttribute('data-keep-open')) return;           // panels with form controls are not menus
      menu.id ||= uid('menu');
      if (!menu.getAttribute('role')) menu.setAttribute('role', 'menu');
      items.forEach(i => { if (!i.getAttribute('role')) i.setAttribute('role', 'menuitem'); });
      $$(':scope > .menu-sep', menu).forEach(s => s.setAttribute('role', 'separator'));
      $$(':scope > .menu-label', menu).forEach(l => l.setAttribute('aria-hidden', 'true'));
      $$(':scope > .menu-sub', menu).forEach(sub => { const t = $(':scope > .menu-item', sub); t.setAttribute('aria-haspopup', 'menu'); const m = $(':scope > .menu', sub); if (m) { m.id ||= uid('menu'); t.setAttribute('aria-controls', m.id); } });
      const dd = menu.closest('.dropdown'), trig = dd && $('[data-dropdown-toggle]', dd);
      if (trig && menu.parentElement === dd) {
        trig.setAttribute('aria-haspopup', 'menu'); trig.setAttribute('aria-controls', menu.id); trig.id ||= uid('mt');
        if (!menu.hasAttribute('aria-label') && !menu.hasAttribute('aria-labelledby')) menu.setAttribute('aria-labelledby', trig.id);
      } else if (!menu.hasAttribute('aria-label') && !menu.hasAttribute('aria-labelledby')) menu.setAttribute('aria-label', 'Menu');
    });
    // popovers / navigation menu / collapsible: link trigger -> panel
    $$('.popover-root', root).forEach(r => { const t = $('[data-popover-toggle]', r), p = $('.popover', r); if (!t || !p || !once(r, 'pop')) return; p.id ||= uid('pop'); t.id ||= uid('pt'); t.setAttribute('aria-controls', p.id); t.setAttribute('aria-haspopup', 'dialog'); if (!p.getAttribute('role')) p.setAttribute('role', 'dialog'); if (!p.hasAttribute('aria-label') && !p.hasAttribute('aria-labelledby')) p.setAttribute('aria-labelledby', t.id); });
    $$('.navmenu > li', root).forEach(li => { const t = $('.navmenu-trigger', li), p = $('.navmenu-panel', li); if (t && p) { p.id ||= uid('nm'); t.setAttribute('aria-controls', p.id); t.setAttribute('aria-expanded', li.classList.contains('open')); } });
    $$('.collapsible', root).forEach(c => { const t = $('.collapsible-trigger', c), b = $('.collapsible-body', c); if (t && b) { b.id ||= uid('col'); t.setAttribute('aria-controls', b.id); t.setAttribute('aria-expanded', c.classList.contains('open')); } });
    $$('.menubar', root).forEach(m => { m.setAttribute('role', 'menubar'); $$(':scope > .dropdown > [data-dropdown-toggle]', m).forEach(t => t.setAttribute('role', 'menuitem')); });
  }

  /* ---------- progress ---------- */
  function progress(root) {
    $$('.progress, .progress-circle', root).forEach(p => {
      if (!once(p, 'prog')) return;
      p.setAttribute('role', 'progressbar'); p.setAttribute('aria-valuemin', '0'); p.setAttribute('aria-valuemax', '100');
      if (!p.hasAttribute('aria-label') && !p.hasAttribute('aria-labelledby')) p.setAttribute('aria-label', p.dataset.label || 'Progress');
      const read = () => {
        if (p.classList.contains('indeterminate')) { p.removeAttribute('aria-valuenow'); return; }
        let v;
        if (p.classList.contains('progress-circle')) v = parseFloat(getComputedStyle(p).getPropertyValue('--v'));
        else if (p.classList.contains('seg')) { const s = $$(':scope > span', p); v = s.length ? Math.round(s.filter(x => x.classList.contains('on')).length / s.length * 100) : 0; }
        else v = parseFloat(($('span', p) || {}).style?.width) || 0;
        p.setAttribute('aria-valuenow', Math.round(v));
      };
      read(); new MutationObserver(read).observe(p, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
    });
  }

  /* ---------- dialogs: name from heading ---------- */
  function dialogs(root) {
    $$('dialog', root).forEach(d => {
      if (d.hasAttribute('aria-label') || d.hasAttribute('aria-labelledby')) return;
      const h = $('.modal-head h2, .modal-head h3, .drawer-title, h1, h2, h3', d);
      if (h) { h.id ||= uid('dlg'); d.setAttribute('aria-labelledby', h.id); } else d.setAttribute('aria-label', 'Dialog');
    });
  }

  /* ---------- scrollable regions must be keyboard reachable ---------- */
  const SCROLLERS = '.table-wrap, .scroll-area, .codeblock pre, .scroller, .command-list, .modal-body, .carousel-track, .resizable-panel, .select-menu, .drawer-body, .trace-body pre';
  const fitScroll = el => {
    const over = el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
    const own = el.hasAttribute('data-a11y-tab');
    if (over && !el.hasAttribute('tabindex')) { el.tabIndex = 0; el.setAttribute('data-a11y-tab', ''); }
    else if (!over && own) { el.removeAttribute('tabindex'); el.removeAttribute('data-a11y-tab'); }
    if (over && !el.getAttribute('role') && !el.closest('[role=dialog],dialog') && el.matches('.table-wrap, .scroll-area, .codeblock pre, .trace-body pre')) {
      el.setAttribute('role', 'region');
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) el.setAttribute('aria-label', el.matches('pre') ? ((el.closest('.codeblock')?.dataset.lang || 'code').toUpperCase() + ' code') : el.matches('.table-wrap') ? 'Scrollable table' : 'Scrollable content');
    }
  };
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(es => es.forEach(e => fitScroll(e.target))) : null;
  function scrollables(root) {
    $$(SCROLLERS, root).forEach(el => { if (el.matches('.select-menu')) return; fitScroll(el); ro && once(el, 'ro') && ro.observe(el); });
    // generic fallback names must be unique among regions (landmark-unique)
    const seen = {};
    $$('[role=region][aria-label]', document).forEach(r => { const l = r.dataset.baseLabel || (r.dataset.baseLabel = r.getAttribute('aria-label')); seen[l] = (seen[l] || 0) + 1; if (seen[l] > 1) r.setAttribute('aria-label', `${l} ${seen[l]}`); else r.setAttribute('aria-label', l); });
  }

  /* ---------- tables ---------- */
  function tables(root) {
    $$('table', root).forEach(t => $$('thead th', t).forEach(th => { if (!th.hasAttribute('scope')) th.setAttribute('scope', 'col'); }));
    $$('th[data-sort]', root).forEach(th => { if (once(th, 'sort')) { th.tabIndex = 0; th.setAttribute('role', 'columnheader'); th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); th.click(); } }); } });
  }

  /* ---------- fields ---------- */
  const ctl = f => $('.input, .select, .textarea, [data-otp], .select-trigger, input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select', f);
  function describe(f) {
    const c = ctl(f); if (!c) return;
    const hint = $('.hint', f), err = $('.error-text', f), invalid = f.classList.contains('invalid');
    const ids = [];
    if (hint) { hint.id ||= uid('hint'); ids.push(hint.id); }
    if (err) { err.id ||= uid('err'); if (invalid) ids.push(err.id); }
    if (ids.length) c.setAttribute('aria-describedby', ids.join(' ')); else c.removeAttribute('aria-describedby');
    if (invalid) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
    if (err && !err.getAttribute('role')) err.setAttribute('role', 'alert');
  }
  function fields(root) {
    $$('.label .req', root).forEach(r => r.setAttribute('aria-hidden', 'true'));
    $$('.field', root).forEach(f => {
      if (!once(f, 'field')) return;
      describe(f); new MutationObserver(() => describe(f)).observe(f, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /* ---------- tooltips / hover content ---------- */
  function tips(root) {
    $$('[data-tip]', root).forEach(el => {
      const tip = el.dataset.tip;
      if (!(el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title'))) el.setAttribute('aria-label', tip);
      else if (!el.hasAttribute('aria-description')) el.setAttribute('aria-description', tip);
    });
    $$('.tooltip-wrap', root).forEach(w => { const t = $('.tooltip-rich', w), c = $('button, a, [tabindex]', w); if (t && c) { t.id ||= uid('tip'); t.setAttribute('role', 'tooltip'); c.setAttribute('aria-describedby', t.id); } });
    $$('.hovercard-root', root).forEach(w => { const t = $('.hovercard', w), c = $('a, button, [tabindex]', w); if (t && c) { t.id ||= uid('hc'); c.setAttribute('aria-describedby', t.id); } });
  }
  // WCAG 1.4.13: hover/focus content is dismissible without moving the pointer — Esc hides it until the pointer/focus leaves
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    $$('[data-tip]:hover,[data-tip]:focus,.hovercard-root:hover,.hovercard-root:focus-within,.tooltip-wrap:hover,.tooltip-wrap:focus-within').forEach(el => el.setAttribute('data-dismissed', ''));
  });
  // …and stays dismissed until the pointer actually moves away from the trigger AND the card (hiding the card must not re-trigger it)
  const inside = (r, x, y) => x >= r.left - 2 && x <= r.right + 2 && y >= r.top - 2 && y <= r.bottom + 2;
  document.addEventListener('pointermove', e => {
    $$('[data-dismissed]').forEach(el => {
      const card = $('.hovercard, .tooltip-rich', el);
      if (!inside(el.getBoundingClientRect(), e.clientX, e.clientY) && !(card && inside(card.getBoundingClientRect(), e.clientX, e.clientY))) el.removeAttribute('data-dismissed');
    });
  }, { passive: true });
  document.addEventListener('focusout', e => { const el = e.target.closest?.('[data-dismissed]'); if (el && !el.contains(e.relatedTarget)) el.removeAttribute('data-dismissed'); });

  /* ---------- menu keyboard ---------- */
  document.addEventListener('keydown', e => {
    const menu = e.target.closest?.('.menu[role="menu"]'); if (!menu) return;
    const dd = menu.closest('.dropdown'), trig = dd && $('[data-dropdown-toggle]', dd);
    const items = $$('.menu-item', menu.matches('.menu-sub .menu') ? menu : menu).filter(i => i.offsetParent && !i.disabled);
    const i = items.indexOf(document.activeElement);
    if (e.key === 'Home') { e.preventDefault(); items[0]?.focus(); }
    else if (e.key === 'End') { e.preventDefault(); items.at(-1)?.focus(); }
    else if (e.key === 'Escape' && trig && dd.classList.contains('open')) { dd.classList.remove('open'); trig.setAttribute('aria-expanded', 'false'); trig.focus(); e.stopPropagation(); }
    else if (e.key === 'Tab' && menu.classList.contains('ctx')) menu.classList.remove('open');
    else if (e.key === 'Tab' && dd) { dd.classList.remove('open'); trig?.setAttribute('aria-expanded', 'false'); }
    else if (e.key === 'ArrowRight') { const sub = document.activeElement.closest('.menu-sub'); if (sub && document.activeElement === $(':scope > .menu-item', sub)) { e.preventDefault(); $('.menu .menu-item', sub)?.focus(); } }
    else if (e.key === 'ArrowLeft') { const inner = document.activeElement.closest('.menu-sub > .menu'); if (inner) { e.preventDefault(); $(':scope > .menu-item', inner.parentElement).focus(); } }
    void i;
  }, true);
  // opening a menu from its trigger with ↓ / ↑
  document.addEventListener('keydown', e => {
    const t = e.target.closest?.('[data-dropdown-toggle]'); if (!t || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    const dd = t.closest('.dropdown'), menu = $(':scope > .menu', dd); if (!menu) return;
    e.preventDefault(); dd.classList.add('open'); t.setAttribute('aria-expanded', 'true');
    const items = $$('.menu-item', menu).filter(x => !x.disabled); (e.key === 'ArrowUp' ? items.at(-1) : items[0])?.focus();
  });
  // close a menu when focus leaves it; keep aria-expanded truthful
  document.addEventListener('focusout', e => {
    const dd = e.target.closest?.('.dropdown.open'); if (!dd || dd.contains(e.relatedTarget) || !e.relatedTarget) return;
    dd.classList.remove('open'); $('[data-dropdown-toggle]', dd)?.setAttribute('aria-expanded', 'false');
  });
  new MutationObserver(ms => ms.forEach(m => { const dd = m.target; if (dd.matches?.('.dropdown')) $('[data-dropdown-toggle]', dd)?.setAttribute('aria-expanded', dd.classList.contains('open')); })).observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['class'] });
  // Esc in navigation menu / popover returns focus to the trigger
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const li = e.target.closest?.('.navmenu > li.open'); if (li) { li.classList.remove('open'); const t = $('.navmenu-trigger', li); t.setAttribute('aria-expanded', 'false'); t.focus(); }
  });
  document.addEventListener('click', e => { const t = e.target.closest?.('.navmenu-trigger'); if (t) requestAnimationFrame(() => t.setAttribute('aria-expanded', t.parentElement.classList.contains('open'))); });

  /* ---------- landmarks, widgets ---------- */
  function widgets(root) {
    // unique accessible names for repeated navigation landmarks
    const seen = {};
    $$('nav[aria-label], [role=navigation][aria-label]', root).forEach(n => {
      const l = n.dataset.baseLabel || (n.dataset.baseLabel = n.getAttribute('aria-label'));
      seen[l] = (seen[l] || 0) + 1; if (seen[l] > 1) n.setAttribute('aria-label', `${l} ${seen[l]}`);
    });
    $$('[data-carousel]', root).forEach((c, ci) => {
      if (!c.hasAttribute('aria-label') && !c.hasAttribute('aria-labelledby')) c.setAttribute('aria-label', c.dataset.label || `Carousel ${ci + 1}`);
      const slides = $$('.carousel-slide', c);
      slides.forEach((s, i) => { s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', 'slide'); s.setAttribute('aria-label', `${i + 1} of ${slides.length}`); });
    });
    $$('.avatar[data-status]', root).forEach(a => { if (once(a, 'av')) { a.setAttribute('role', 'img'); a.setAttribute('aria-label', `${(a.textContent.trim() || a.getAttribute('title') || 'User')}, ${a.dataset.status}`); } });
    $$('[data-scroller]', root).forEach(s => { s.setAttribute('role', 'log'); s.setAttribute('aria-live', 'polite'); if (!s.hasAttribute('aria-label')) s.setAttribute('aria-label', 'Messages'); });
    $$('[data-context-menu]', root).forEach(c => { if (!c.matches('a,button,input,select,textarea,[tabindex]')) c.tabIndex = 0; c.setAttribute('aria-haspopup', 'menu'); if (!c.hasAttribute('aria-description')) c.setAttribute('aria-description', 'Press Shift+F10 or the Menu key for options'); });
    $$('.skeleton, .skeleton-card', root).forEach(s => s.setAttribute('aria-hidden', 'true'));
    $$('[data-otp]', root).forEach(o => { if (!o.getAttribute('role')) o.setAttribute('role', 'group'); if (!o.hasAttribute('aria-label') && !o.hasAttribute('aria-labelledby')) o.setAttribute('aria-label', 'One-time code'); });
    $$('.stat-delta', root).forEach(d => { if (once(d, 'delta')) d.insertAdjacentHTML('afterbegin', `<span class="sr-only">${d.classList.contains('down') ? 'Down' : 'Up'} </span>`); });
  }

  AK.a11y = { init(root = document) { menus(root); progress(root); dialogs(root); scrollables(root); tables(root); fields(root); tips(root); widgets(root); } };
  const prevInit = AK.init; AK.init = (root = document) => { prevInit && prevInit(root); AK.a11y.init(root); };
  const boot = () => AK.a11y.init();
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
  addEventListener('load', () => scrollables(document));          // re-check once fonts/images have settled the layout
})();
