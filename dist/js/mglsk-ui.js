/*! MGLSK UI v0.3.0 · (c) 2026 MGLSK · All rights reserved · proprietary, see LICENSE · bundled fonts: SIL OFL 1.1 (THIRD-PARTY.md) */
/* ===== icons.js ===== */
/* MGLSK UI icons — usage: <i data-icon="home"></i>. Stroke icons on a 24px grid; add your own to MGLSK.icons. */
(() => {
  const P = d => `<path d="${d}"/>`;
  const icons = {
    home: P('M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5'),
    users: P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75') + '<circle cx="9" cy="7" r="4"/>',
    user: P('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2') + '<circle cx="12" cy="7" r="4"/>',
    chart: P('M3 3v18h18M7 15l4-4 3 3 5-6'),
    bars: P('M6 20V10M12 20V4M18 20v-7'),
    settings: '<circle cx="12" cy="12" r="3"/>' + P('M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'),
    bell: P('M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0'),
    search: '<circle cx="11" cy="11" r="7"/>' + P('M21 21l-4.3-4.3'),
    menu: P('M3 6h18M3 12h18M3 18h18'),
    x: P('M18 6 6 18M6 6l12 12'),
    plus: P('M12 5v14M5 12h14'),
    trash: P('M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6'),
    edit: P('M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'),
    check: P('M20 6 9 17l-5-5'),
    'chevron-down': P('m6 9 6 6 6-6'),
    'chevron-right': P('m9 6 6 6-6 6'),
    'chevron-left': P('m15 6-6 6 6 6'),
    alert: P('M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01'),
    info: '<circle cx="12" cy="12" r="10"/>' + P('M12 16v-4M12 8h.01'),
    'check-circle': P('M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3'),
    download: P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3'),
    upload: P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12'),
    moon: P('M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'),
    sun: '<circle cx="12" cy="12" r="4"/>' + P('M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'),
    file: P('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6'),
    folder: P('M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'),
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/>' + P('m22 7-10 6L2 7'),
    dollar: P('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'),
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' + P('M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6'),
    'trend-up': P('m22 7-8.5 8.5-5-5L2 17M16 7h6v6'),
    'trend-down': P('m22 17-8.5-8.5-5 5L2 7M16 17h6v-6'),
    'arrow-up': P('M12 19V5M5 12l7-7 7 7'),
    'arrow-down': P('M12 5v14M19 12l-7 7-7-7'),
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    filter: P('M22 3H2l8 9.5V19l4 2v-8.5z'),
    logout: P('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'),
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/>' + P('M9 3v18'),
    inbox: P('M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z'),
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/>' + P('M7 11V7a5 5 0 0 1 10 0v4'),
    eye: P('M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z') + '<circle cx="12" cy="12" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/>' + P('M16 2v4M8 2v4M3 10h18'),
    star: P('m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'),
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/>' + P('M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'),
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/>' + P('M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.7 1.7-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.1 0-.9.7-1.7 1.7-1.7H16c3.1 0 5.6-2.5 5.6-5.6C22 6 17.5 2 12 2z'),
    link: P('M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'),
  };
  const render = (root = document) => root.querySelectorAll('i[data-icon]').forEach(el => {
    const body = icons[el.dataset.icon];
    if (!body) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = body;
    el.replaceWith(svg);
  });
  window.MGLSK = Object.assign(window.MGLSK || {}, { icons, renderIcons: render });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => render()) : render();
})();

/* ===== theme.js ===== */
/* MGLSK UI theme — light/dark/auto mode and accent colour, persisted in localStorage.
 *
 *  MGLSK.setTheme('light' | 'dark' | 'auto')     data-theme + data-theme-resolved on <html>; 'auto' follows the OS live
 *  MGLSK.setAccent('orange' | '#ff9f1c')         preset name or any hex colour (contrast-corrected for both modes)
 *  MGLSK.theme() / .resolvedTheme() / .accent()  current setting / actual mode / current accent
 *  MGLSK.accents                                 preset names
 *  MGLSK.contrast('#rrggbb', '#rrggbb')          WCAG contrast ratio
 *  Events (on document):  mglsk:theme {theme, resolved}   mglsk:accent {accent, rgb}
 *
 *  Declarative controls (any element, state kept in aria-pressed):
 *    [data-theme-set="light|dark|auto"]   [data-theme-toggle]   [data-accent-set="orange"]   input[type=color][data-accent-custom]
 *
 *  Put this in <head> (before the stylesheet paints) to avoid a flash of the wrong theme -> see README "Theming".
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const root = document.documentElement;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const mq = matchMedia('(prefers-color-scheme: light)');
  const fire = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail }));

  /* ---------- colour maths ---------- */
  const hexToRgb = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const rgbToHex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const lum = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  AK.contrast = (a, b) => ratio(hexToRgb(a), hexToRgb(b));

  const BG_DARK = [5, 8, 7], WHITE = [255, 255, 255], INK = [5, 8, 7], SURF3 = [225, 233, 228];
  /** Move `c` toward `toward` until it has >= min contrast against `bg`. */
  const fit = (c, bg, toward, min) => { let t = 0, out = c; while (ratio(out, bg) < min && t < 1) { t += 0.02; out = mix(c, toward, t); } return out; };

  /* ---------- theme ---------- */
  const PRESETS = ['green', 'cyan', 'blue', 'violet', 'magenta', 'red', 'orange', 'yellow'];
  const resolve = t => (t === 'light' || (t === 'auto' && mq.matches) ? 'light' : 'dark');
  AK.accents = PRESETS;
  AK.theme = () => root.dataset.theme || 'dark';
  AK.resolvedTheme = () => root.dataset.themeResolved || 'dark';

  function sync() { // reflect state in any controls on the page
    const th = AK.theme(), ac = AK.accent();
    $$('[data-theme-set]').forEach(b => b.setAttribute('aria-pressed', b.dataset.themeSet === th));
    $$('[data-accent-set]').forEach(b => b.setAttribute('aria-pressed', b.dataset.accentSet === ac));
    const hex = ac[0] === '#' ? ac : (getComputedStyle(root).getPropertyValue('--accent-rgb').trim().split(/\s+/).map(Number));
    $$('input[data-accent-custom]').forEach(i => { if (document.activeElement !== i) i.value = typeof hex === 'string' ? hex : rgbToHex(hex); });
    $$('[data-accent-label]').forEach(e => (e.textContent = ac));
    $$('[data-theme-label]').forEach(e => (e.textContent = th === 'auto' ? `auto (${AK.resolvedTheme()})` : th));
  }

  AK.setTheme = (t, { persist = true } = {}) => {
    if (!['light', 'dark', 'auto'].includes(t)) t = 'dark';
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { root.classList.add('theme-anim'); setTimeout(() => root.classList.remove('theme-anim'), 400); }
    root.dataset.theme = t; root.dataset.themeResolved = resolve(t);
    if (persist) store.set('mglsk-theme', t);
    sync(); fire('mglsk:theme', { theme: t, resolved: root.dataset.themeResolved });
  };
  mq.addEventListener?.('change', () => { if (AK.theme() === 'auto') { root.dataset.themeResolved = resolve('auto'); sync(); fire('mglsk:theme', { theme: 'auto', resolved: root.dataset.themeResolved }); } });

  /* ---------- accent ---------- */
  AK.accent = () => (root.dataset.accent === 'custom' ? store.get('mglsk-accent') || '#2bff88' : root.dataset.accent || 'green');
  const CUSTOM_VARS = ['--accent-d', '--accent-l', '--on-accent-d', '--on-accent-l'];

  AK.setAccent = (v, { persist = true } = {}) => {
    if (PRESETS.includes(v)) {
      CUSTOM_VARS.forEach(k => root.style.removeProperty(k));
      root.dataset.accent = v;
      if (persist) { store.set('mglsk-accent', v); store.set('mglsk-accent-vars', ''); }
    } else if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v)) {
      const base = hexToRgb(v.startsWith('#') ? v : '#' + v);
      const dark = fit(base, BG_DARK, WHITE, 4.5);            // readable on the near-black surface
      const light = fit(base, SURF3, [0, 0, 0], 4.7);         // readable as text on the darkest light surface (and tints of it)
      const onD = ratio(dark, INK) >= ratio(dark, WHITE) ? '#050807' : '#ffffff';
      const onL = ratio(light, WHITE) >= ratio(light, INK) ? '#ffffff' : '#050807';
      const vars = { '--accent-d': dark.map(Math.round).join(' '), '--accent-l': light.map(Math.round).join(' '), '--on-accent-d': onD, '--on-accent-l': onL };
      Object.entries(vars).forEach(([k, val]) => root.style.setProperty(k, val));
      root.dataset.accent = 'custom';
      const hex = rgbToHex(base);
      if (persist) { store.set('mglsk-accent', hex); store.set('mglsk-accent-vars', JSON.stringify(vars)); }
    } else return false;
    sync(); fire('mglsk:accent', { accent: AK.accent(), rgb: getComputedStyle(root).getPropertyValue('--accent-rgb').trim() });
    return true;
  };

  /* ---------- controls ---------- */
  document.addEventListener('click', e => {
    const set = e.target.closest('[data-theme-set]'); if (set) AK.setTheme(set.dataset.themeSet);
    if (e.target.closest('[data-theme-toggle]')) AK.setTheme(AK.resolvedTheme() === 'light' ? 'dark' : 'light');
    const ac = e.target.closest('[data-accent-set]'); if (ac) AK.setAccent(ac.dataset.accentSet);
  });
  document.addEventListener('input', e => { const i = e.target.closest('input[data-accent-custom]'); if (i) AK.setAccent(i.value); });

  // adopt whatever the <head> snippet (or defaults) put on <html>; make sure the resolved attribute exists
  if (!root.dataset.theme) root.dataset.theme = store.get('mglsk-theme') || 'dark';
  root.dataset.themeResolved = resolve(root.dataset.theme);
  if (!root.dataset.accent) { const a = store.get('mglsk-accent'); if (a) AK.setAccent(a, { persist: false }); }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', sync) : sync();
})();

/* ===== core.js ===== */
/* MGLSK UI — behaviour. Declarative via data-attributes; no dependencies.
 *
 *  data-toggle="nav"                         collapse (desktop) / open (mobile) the sidenav
 *  data-modal-open="#id" / data-modal-close  <dialog class="modal"> open/close
 *  data-tabs                                 container with [role=tablist] and [role=tabpanel]
 *  .dropdown > [data-dropdown-toggle] + .menu
 *  table[data-sortable]                      click th[data-sort] (optionally data-sort="num")
 *  [data-filter-table="#tableId"]            live text filter for a table
 *  [data-check-all="#tableId"]               select-all checkbox for a table
 *  form[data-validate]                       native validation + .field.invalid styling
 *  MGLSK.toast({title,message,type,timeout})
 *  MGLSK.confirm({title,message,confirmText,danger}) -> Promise<boolean>
 *  MGLSK.paginate(tableEl, perPage, pagerEl)
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;

  /* ---------- toasts ---------- */
  AK.toast = ({ title = '', message = '', type = '', timeout = 5000, action } = {}) => {
    let box = $('.toasts');
    if (!box) { box = document.createElement('div'); box.className = 'toasts'; document.body.append(box); }
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    // errors/warnings interrupt (alert), everything else is announced politely (status)
    t.setAttribute('role', type === 'danger' || type === 'warning' ? 'alert' : 'status');
    const body = document.createElement('div');
    const h = document.createElement('div'); h.className = 'toast-title'; h.textContent = title;
    const m = document.createElement('div'); m.className = 'toast-msg'; m.textContent = message;
    body.append(h, m);
    if (action) { const a = document.createElement('button'); a.className = 'btn btn-sm toast-action'; a.textContent = action.label; a.onclick = () => { action.onClick?.(); t.remove(); }; body.append(a); }
    const x = document.createElement('button'); x.setAttribute('aria-label', 'Dismiss notification'); x.innerHTML = '<span aria-hidden="true">✕</span>';
    x.onclick = () => t.remove();
    t.append(body, x); box.append(t);
    // WCAG 2.2.1: never time out while the user is reading/interacting; toasts with an action stay until dismissed
    if (timeout && !action) {
      let left = timeout, started = Date.now(), id;
      const run = () => { started = Date.now(); id = setTimeout(() => t.remove(), left); };
      const pause = () => { clearTimeout(id); left -= Date.now() - started; };
      t.addEventListener('mouseenter', pause); t.addEventListener('focusin', pause);
      t.addEventListener('mouseleave', () => { left = Math.max(left, 2000); run(); }); t.addEventListener('focusout', () => { left = Math.max(left, 2000); run(); });
      run();
    }
    return t;
  };


  /* ---------- confirm dialog ---------- */
  AK.confirm = ({ title = 'Are you sure?', message = '', confirmText = 'Confirm', cancelText = 'Cancel', danger = false } = {}) =>
    new Promise(res => {
      const d = document.createElement('dialog');
      d.className = 'modal modal-sm';
      d.innerHTML = `<div class="modal-head"><h3></h3></div><div class="modal-body text-muted"></div>
        <div class="modal-foot"><button class="btn" value="no"></button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" value="yes"></button></div>`;
      d.querySelector('h3').textContent = title;
      d.querySelector('.modal-body').textContent = message;
      const [no, yes] = d.querySelectorAll('button');
      no.textContent = cancelText; yes.textContent = confirmText;
      no.onclick = () => d.close('no'); yes.onclick = () => d.close('yes');
      d.addEventListener('close', () => { res(d.returnValue === 'yes'); d.remove(); });
      document.body.append(d); d.showModal(); (danger ? no : yes).focus();   // destructive: focus the safe choice
    });

  /* ---------- delegated clicks ---------- */
  document.addEventListener('click', e => {
    const t = e.target;
    const nav = t.closest('[data-toggle="nav"]');
    if (nav) {
      const app = nav.closest('.app') || $('.app');
      if (matchMedia('(max-width:900px)').matches) app.dataset.nav = app.dataset.nav === 'open' ? '' : 'open';
      else app.dataset.nav = app.dataset.nav === 'collapsed' ? '' : 'collapsed';
    }
    if (t.closest('.nav-backdrop')) (t.closest('.app') || $('.app')).dataset.nav = '';


    const open = t.closest('[data-modal-open]');
    if (open) { const d = $(open.dataset.modalOpen); d && d.showModal(); }
    if (t.closest('[data-modal-close]')) t.closest('dialog')?.close();
    if (t instanceof HTMLDialogElement && t.classList.contains('modal') && !t.hasAttribute('data-static')) { // backdrop click
      const r = t.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) t.close();
    }

    const dt = t.closest('[data-dropdown-toggle]');
    const keep = t.closest('[data-keep-open]'); // panels that stay open while you click inside them (e.g. the theme panel)
    $$('.dropdown.open').forEach(d => { if ((!dt || d !== dt.closest('.dropdown')) && !(keep && d.contains(keep))) d.classList.remove('open'); });
    if (dt) {
      const dd = dt.closest('.dropdown'); dd.classList.toggle('open');
      dt.setAttribute('aria-expanded', dd.classList.contains('open'));
    }

    const seg = t.closest('.segmented [aria-pressed]');
    if (seg) { $$('[aria-pressed]', seg.parentElement).forEach(b => b.setAttribute('aria-pressed', b === seg)); seg.dispatchEvent(new CustomEvent('mglsk:segment', { bubbles: true, detail: seg.dataset.value })); }

    const th = t.closest('table[data-sortable] th[data-sort]');
    if (th) sortTable(th);

    const x = t.closest('.chip button, [data-dismiss]');
    if (x) (x.closest('.chip, .alert, [data-dismissible]'))?.remove();
  });
  document.addEventListener('cancel', e => { if (e.target.hasAttribute?.('data-static')) e.preventDefault(); }, true);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.dropdown.open').forEach(d => d.classList.remove('open'));
    const item = e.target.closest?.('.menu');
    if (item && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const items = $$('.menu-item', item), i = items.indexOf(document.activeElement);
      items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !$('[data-command-dialog]')) { const s = $('[data-search]'); if (s) { e.preventDefault(); s.focus(); } }
  });
  // focus first menu item when a dropdown opens
  document.addEventListener('click', e => { const dt = e.target.closest('[data-dropdown-toggle]'); if (dt && dt.closest('.dropdown.open')) $('.menu-item', dt.closest('.dropdown'))?.focus(); });

  /* ---------- tabs ---------- */
  const initTabs = c => {
    const tabs = $$('[role=tab]', c), panels = $$('[role=tabpanel]', c);
    const select = tab => {
      tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
      panels.forEach(p => (p.hidden = p.id !== tab.getAttribute('aria-controls')));
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { const n = tabs[(i + k + tabs.length) % tabs.length]; n.focus(); select(n); }
        if (e.key === 'Home') { tabs[0].focus(); select(tabs[0]); }
        if (e.key === 'End') { tabs.at(-1).focus(); select(tabs.at(-1)); }
      });
    });
    select(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  };
  $$('[data-tabs]').forEach(initTabs);

  /* ---------- tables ---------- */
  const cellVal = (tr, i) => { const c = tr.children[i]; return c.dataset.value ?? c.textContent.trim(); };
  function sortTable(th) {
    const table = th.closest('table'), idx = [...th.parentElement.children].indexOf(th);
    const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
    $$('th', table).forEach(h => h.removeAttribute('aria-sort'));
    th.setAttribute('aria-sort', dir);
    const num = th.dataset.sort === 'num';
    const rows = $$('tbody tr', table);
    rows.sort((a, b) => {
      const x = cellVal(a, idx), y = cellVal(b, idx);
      const r = num ? parseFloat(x.replace(/[^\d.-]/g, '')) - parseFloat(y.replace(/[^\d.-]/g, '')) : x.localeCompare(y, undefined, { numeric: true, sensitivity: 'base' });
      return dir === 'ascending' ? r : -r;
    });
    rows.forEach(r => r.parentElement.append(r));
    table.dispatchEvent(new CustomEvent('mglsk:sorted'));
  }
  document.addEventListener('input', e => {
    const f = e.target.closest('[data-filter-table]');
    if (f) {
      const table = $(f.dataset.filterTable), q = f.value.toLowerCase();
      $$('tbody tr', table).forEach(tr => { const hit = tr.textContent.toLowerCase().includes(q); tr.dataset.f = hit ? '' : 'x'; tr.hidden = !hit; });
      table.dispatchEvent(new CustomEvent('mglsk:filtered'));
    }
  });
  document.addEventListener('change', e => {
    const all = e.target.closest('[data-check-all]');
    if (all) $$('tbody input[type=checkbox]', $(all.dataset.checkAll)).forEach(c => { c.checked = all.checked; c.closest('tr').setAttribute('aria-selected', c.checked); });
    else if (e.target.matches('.table tbody input[type=checkbox]')) e.target.closest('tr').setAttribute('aria-selected', e.target.checked);
  });

  AK.paginate = (table, perPage = 10, pager) => {
    let page = 1;
    const setPerPage = n => { perPage = n; page = 1; draw(); };
    const draw = () => {
      const all = $$('tbody tr', table).filter(r => r.dataset.f !== 'x');
      const pages = Math.max(1, Math.ceil(all.length / perPage));
      page = Math.min(page, pages);
      all.forEach((r, i) => (r.hidden = i < (page - 1) * perPage || i >= page * perPage));
      if (!pager) return;
      pager.innerHTML = '';
      const mk = (label, p, dis, cur) => { const b = document.createElement('button'); b.textContent = label; b.disabled = dis; if (cur) b.setAttribute('aria-current', 'page'); b.onclick = () => { page = p; draw(); }; pager.append(b); };
      mk('‹', page - 1, page === 1);
      for (let p = 1; p <= pages; p++) mk(p, p, false, p === page);
      mk('›', page + 1, page === pages);
      const info = pager.closest('.table-foot')?.querySelector('[data-page-info]');
      if (info) info.textContent = `${Math.min(all.length, (page - 1) * perPage + 1)}–${Math.min(all.length, page * perPage)} of ${all.length}`;
    };
    table.addEventListener('mglsk:sorted', draw);
    table.addEventListener('mglsk:filtered', () => { page = 1; draw(); });
    draw();
    return Object.assign(draw, { draw, setPerPage });
  };

  /* ---------- form validation ---------- */
  $$('form[data-validate]').forEach(f => {
    f.noValidate = true;
    const check = el => {
      const field = el.closest('.field'); if (!field) return;
      const ok = el.checkValidity();
      field.classList.toggle('invalid', !ok);
      field.classList.toggle('valid', ok && el.value !== '');
      const msg = field.querySelector('.error-text');
      if (msg && !ok) msg.textContent = el.dataset.error || el.validationMessage;
    };
    f.addEventListener('blur', e => e.target.matches?.('.input,.select,.textarea') && check(e.target), true);
    f.addEventListener('input', e => e.target.closest('.field.invalid') && check(e.target));
    f.addEventListener('submit', e => {
      const els = $$('.input,.select,.textarea', f); els.forEach(check);
      if (!f.checkValidity()) { e.preventDefault(); els.find(x => !x.checkValidity())?.focus(); }
      else if (f.hasAttribute('data-demo')) { e.preventDefault(); AK.toast({ title: 'Saved', message: 'Form is valid (demo, nothing sent).', type: 'success' }); }
    });
  });

  /* ---------- file dropzone ---------- */
  $$('.dropzone').forEach(z => {
    const input = $('input[type=file]', z);
    ['dragenter', 'dragover'].forEach(n => z.addEventListener(n, e => { e.preventDefault(); z.classList.add('over'); }));
    ['dragleave', 'drop'].forEach(n => z.addEventListener(n, e => { e.preventDefault(); z.classList.remove('over'); }));
    z.addEventListener('drop', e => { if (input) { input.files = e.dataTransfer.files; input.dispatchEvent(new Event('change')); } });
  });
})();

/* ===== charts.js ===== */
/* MGLSK UI charts — dependency-free SVG charts that follow the theme tokens.
 *
 *  MGLSK.charts.line(el,  { labels:[...], series:[{name, data:[...]}], area:true, format:v=>v, height:260 })
 *  MGLSK.charts.bar(el,   { labels:[...], series:[...], stacked:false, ... })
 *  MGLSK.charts.donut(el, { items:[{label, value}], center:'Total' , format })
 *  MGLSK.charts.spark(el, { data:[...], area:true, color:'var(--s2)' })
 *
 * Colours come from --s1..--s6, so charts re-theme automatically (CSS only, no re-render needed).
 */
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    parent && parent.append(n);
    return n;
  };
  const nice = max => { // round axis max up to 1/2/5 * 10^n
    if (max <= 0) return 1;
    const p = 10 ** Math.floor(Math.log10(max)), f = max / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
  };
  const compact = v => Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : Math.abs(v) >= 1e3 ? (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'k' : String(v);
  const legend = (host, names) => {
    const l = document.createElement('div'); l.className = 'legend'; l.style.marginTop = '12px';
    names.forEach((n, i) => { const s = document.createElement('span'); s.className = 's' + (i % 6 + 1); const d = document.createElement('i'); s.append(d, n); l.append(s); });
    host.append(l);
  };
  const tip = host => { const t = document.createElement('div'); t.className = 'chart-tip'; host.append(t); return t; };
  const showTip = (t, host, evt, html) => {
    const r = host.getBoundingClientRect();
    t.innerHTML = html; t.style.left = evt.clientX - r.left + 'px'; t.style.top = evt.clientY - r.top + 'px'; t.classList.add('on');
  };

  function frame(host, o, n) { // shared axes for line/bar
    const W = Math.round(host.clientWidth) || 640, H = o.height || 260, m = { t: 12, r: 12, b: 28, l: 44 };
    const fmt = o.format || compact;
    const all = o.series.flatMap(s => s.data);
    const stacked = o.stacked && o.type === 'bar';
    const max = nice(stacked ? Math.max(...o.labels.map((_, i) => o.series.reduce((a, s) => a + s.data[i], 0))) : Math.max(...all));
    const min = Math.min(0, ...all);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': o.title || 'Chart' });
    const x0 = m.l, x1 = W - m.r, y0 = H - m.b, y1 = m.t;
    const y = v => y0 - (v - min) / (max - min) * (y0 - y1);
    for (let i = 0; i <= 4; i++) {
      const v = min + (max - min) * i / 4;
      el('line', { class: 'grid-line', x1: x0, x2: x1, y1: y(v), y2: y(v) }, svg);
      const t = el('text', { x: x0 - 8, y: y(v) + 4, 'text-anchor': 'end' }, svg); t.textContent = fmt(Math.round(v * 100) / 100);
    }
    const step = Math.ceil(o.labels.length / 8);
    const xAt = i => o.type === 'bar' ? x0 + (x1 - x0) * (i + .5) / n : x0 + (x1 - x0) * (n === 1 ? .5 : i / (n - 1));
    o.labels.forEach((l, i) => { if (i % step) return; const t = el('text', { x: xAt(i), y: H - 8, 'text-anchor': 'middle' }, svg); t.textContent = l; });
    return { svg, W, H, x0, x1, y0, y1, y, xAt, fmt };
  }

  /** Screen-reader alternative: the chart's data as a visually-hidden table. */
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const srTable = (caption, head, rows) => {
    const t = document.createElement('table'); t.className = 'sr-only';
    t.innerHTML = `<caption>${esc(caption)}</caption><thead><tr>${head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
    return t;
  };
  const describe = (kind, o) => (o.title ? o.title + ' — ' : '') + kind + (o.series ? ': ' + o.series.map(s => s.name).join(', ') : '');

  function mount(host, o, draw) {
    host.classList.add('chart'); host.innerHTML = '';
    const g = draw();
    host.prepend(g);
    return host;
  }

  const charts = {
    line(host, o) {
      o.type = 'line'; const n = o.labels.length;
      mount(host, o, () => {
        const f = frame(host, o, n), t = tip(host);
        o.series.forEach((s, si) => {
          const g = el('g', { class: 's' + (si % 6 + 1) }, f.svg);
          const pts = s.data.map((v, i) => [f.xAt(i), f.y(v)]);
          const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
          if (o.area !== false && si === 0) el('path', { class: 'area', d: d + `L${pts.at(-1)[0]} ${f.y0}L${pts[0][0]} ${f.y0}Z` }, g);
          el('path', { class: 'line', d }, g);
          pts.forEach(p => el('circle', { class: 'dot', cx: p[0], cy: p[1], r: 4, 'data-i': 0 }, g));
        });
        // hover columns
        o.labels.forEach((l, i) => {
          const w = (f.x1 - f.x0) / Math.max(1, n - 1);
          const col = el('rect', { class: 'hit', x: f.xAt(i) - w / 2, y: f.y1, width: w, height: f.y0 - f.y1 }, f.svg);
          col.addEventListener('mousemove', e => {
            f.svg.querySelectorAll('.dot.on').forEach(d => d.classList.remove('on'));
            f.svg.querySelectorAll('g').forEach(g => g.children[g.children.length - n + i]?.classList.add('on'));
            showTip(t, host, e, `<b>${l}</b><br>` + o.series.map(s => `${s.name}: ${(o.format || (v => v.toLocaleString()))(s.data[i])}`).join('<br>'));
          });
          col.addEventListener('mouseleave', () => { t.classList.remove('on'); f.svg.querySelectorAll('.dot.on').forEach(d => d.classList.remove('on')); });
        });
        return f.svg;
      });
      host.querySelector('svg').setAttribute('aria-label', describe('Line chart', o));
      host.append(srTable(describe('Data for line chart', o), ['Label', ...o.series.map(s => s.name)], o.labels.map((l, i) => [l, ...o.series.map(s => (o.format || (v => v.toLocaleString()))(s.data[i]))])));
      if (o.series.length > 1) legend(host, o.series.map(s => s.name));
    },

    bar(host, o) {
      o.type = 'bar'; const n = o.labels.length, k = o.series.length;
      mount(host, o, () => {
        const f = frame(host, o, n), t = tip(host);
        const slot = (f.x1 - f.x0) / n, groupW = slot * .68, bw = o.stacked ? groupW : groupW / k;
        const bars = el('g', { class: 'bars' }, f.svg);
        o.labels.forEach((l, i) => {
          let acc = 0;
          o.series.forEach((s, si) => {
            const v = s.data[i];
            const x = f.xAt(i) - groupW / 2 + (o.stacked ? 0 : si * bw);
            const top = f.y(o.stacked ? acc + v : v), base = f.y(o.stacked ? acc : 0);
            const r = el('rect', { class: 'bar s' + (si % 6 + 1), x: x + (o.stacked ? 0 : 1), y: top, width: Math.max(1, bw - (o.stacked ? 0 : 2)), height: Math.max(0, base - top - (o.stacked && si ? 1 : 0)), rx: 2 }, bars);
            acc += v;
            r.addEventListener('mousemove', e => showTip(t, host, e, `<b>${l}</b><br>${s.name}: ${(o.format || (x => x.toLocaleString()))(v)}`));
            r.addEventListener('mouseleave', () => t.classList.remove('on'));
          });
        });
        return f.svg;
      });
      host.querySelector('svg').setAttribute('aria-label', describe(o.stacked ? 'Stacked bar chart' : 'Bar chart', o));
      host.append(srTable(describe('Data for bar chart', o), ['Label', ...o.series.map(s => s.name)], o.labels.map((l, i) => [l, ...o.series.map(s => (o.format || (v => v.toLocaleString()))(s.data[i]))])));
      if (k > 1) legend(host, o.series.map(s => s.name));
    },

    donut(host, o) {
      const total = o.items.reduce((a, b) => a + b.value, 0), fmt = o.format || (v => v.toLocaleString());
      mount(host, o, () => {
        const S = 200, r = 76, sw = 26, C = 2 * Math.PI * r, t = tip(host);
        const svg = el('svg', { viewBox: `0 0 ${S} ${S}`, role: 'img', 'aria-label': o.title || 'Donut chart' });
        svg.style.maxWidth = '220px'; svg.style.margin = '0 auto';
        let off = 0;
        o.items.forEach((it, i) => {
          const len = it.value / total * C, gap = o.items.length > 1 ? 2 : 0;
          const c = el('circle', { class: 'slice s' + (i % 6 + 1), cx: S / 2, cy: S / 2, r, 'stroke-width': sw, 'stroke-dasharray': `${Math.max(0, len - gap)} ${C}`, 'stroke-dashoffset': -off, transform: `rotate(-90 ${S / 2} ${S / 2})`, style: `--sw:${sw}` }, svg);
          off += len;
          c.addEventListener('mousemove', e => showTip(t, host, e, `<b>${it.label}</b><br>${fmt(it.value)} (${Math.round(it.value / total * 100)}%)`));
          c.addEventListener('mouseleave', () => t.classList.remove('on'));
        });
        const a = el('text', { class: 'donut-total', x: S / 2, y: S / 2 + 4, 'text-anchor': 'middle' }, svg); a.textContent = o.centerValue ?? fmt(total);
        const b = el('text', { class: 'donut-sub', x: S / 2, y: S / 2 + 20, 'text-anchor': 'middle' }, svg); b.textContent = o.center || 'Total';
        return svg;
      });
      host.querySelector('svg').setAttribute('aria-label', (o.title || 'Donut chart') + ': ' + o.items.map(i => `${i.label} ${Math.round(i.value / total * 100)}%`).join(', '));
      host.append(srTable('Data for donut chart', ['Item', 'Value', 'Share'], o.items.map(i => [i.label, fmt(i.value), Math.round(i.value / total * 100) + '%'])));
      legend(host, o.items.map(i => i.label));
      host.querySelector('.legend').style.justifyContent = 'center';
    },

    spark(host, o) {
      host.classList.add('spark'); host.innerHTML = '';
      const d = o.data, W = 100, H = 30, min = Math.min(...d), max = Math.max(...d), rng = max - min || 1;
      const pts = d.map((v, i) => [i / (d.length - 1) * W, H - 2 - (v - min) / rng * (H - 4)]);
      const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' }, host);
      if (o.color) svg.style.setProperty('--c', o.color);
      if (o.area !== false) el('path', { class: 'area', d: path + `L${W} ${H}L0 ${H}Z` }, svg);
      el('path', { class: 'line', d: path, 'vector-effect': 'non-scaling-stroke' }, svg);
    },
  };

  // re-render responsively when the container width changes
  ['line', 'bar', 'donut'].forEach(k => {
    const fn = charts[k];
    charts[k] = (host, o) => {
      fn(host, o);
      if (host._ro) return;
      let w = host.clientWidth;
      host._ro = new ResizeObserver(() => { if (Math.abs(host.clientWidth - w) > 24) { w = host.clientWidth; fn(host, o); } });
      host._ro.observe(host);
    };
  });

  window.MGLSK = Object.assign(window.MGLSK || {}, { charts });
})();

/* ===== forms.js ===== */
/* MGLSK UI forms — toggle(+group), slider, OTP, select, combobox, textarea, calendar, date picker, pagination, questionnaire.
 * All auto-initialise from markup; call MGLSK.init(root) after injecting new markup.
 *
 *  .toggle[data-toggle-btn]                    standalone pressed/unpressed
 *  [data-toggle-group="single|multiple"]       group of .toggle buttons
 *  .slider input[type=range]  [data-output]    custom-styled; .slider-range holds two inputs
 *  [data-otp]                                  container of inputs; fires 'mglsk:otp' {value, complete}
 *  [data-select] / [data-combobox]             custom listbox / searchable listbox; fires 'change' on the hidden input
 *  [data-autogrow] / [data-counter="n"]        textarea helpers
 *  [data-calendar]  data-mode="single|range"   MGLSK.calendar(el, opts)
 *  [data-datepicker]                           trigger + calendar popover
 *  [data-pagination] data-pages data-page      MGLSK.pagination(el, opts)
 *  [data-questionnaire]                        multi-step survey (steps = [data-step])
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const icon = n => `<i data-icon="${n}"></i>`;
  const fire = (el, name, detail) => el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
  const once = (el, key) => (el['_ak_' + key] ? false : (el['_ak_' + key] = true));
  const uid = p => p + '-' + Math.random().toString(36).slice(2, 8);
  const labelFor = (root, input) => { // the visible <label> for a custom control, giving it an id so aria-labelledby can point at it
    const l = (input && input.id && document.querySelector(`label[for="${input.id}"]`)) || root.closest('.field')?.querySelector('.label');
    if (l) l.id ||= uid('lbl'); return l;
  };

  /* ---------- toggle ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('.toggle');
    if (!t || t.disabled) return;
    const g = t.closest('[data-toggle-group]');
    if (g) {
      if (g.dataset.toggleGroup === 'single') $$('.toggle', g).forEach(b => b.setAttribute('aria-pressed', b === t && t.getAttribute('aria-pressed') !== 'true' ? 'true' : 'false'));
      else t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') !== 'true');
      fire(g, 'mglsk:toggle', $$('.toggle[aria-pressed="true"]', g).map(b => b.dataset.value ?? b.textContent.trim()));
    } else if (t.hasAttribute('data-toggle-btn')) t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') !== 'true');
  });

  /* ---------- slider ---------- */
  const paint = i => { const p = (i.value - i.min) / ((i.max || 100) - (i.min || 0)) * 100; i.style.setProperty('--p', p + '%'); return p; };
  function initSlider(box) {
    if (!once(box, 'slider')) return;
    const ins = $$('input[type=range]', box);
    const out = box.dataset.output ? $(box.dataset.output) : $('.slider-value', box.parentElement);
    const upd = () => {
      if (box.classList.contains('slider-range')) {
        let [a, b] = ins.map(i => +i.value); if (a > b) [a, b] = [b, a];
        const mn = +ins[0].min, mx = +ins[0].max;
        box.style.setProperty('--lo', (a - mn) / (mx - mn) * 100 + '%'); box.style.setProperty('--hi', (b - mn) / (mx - mn) * 100 + '%');
        if (out) out.textContent = `${a} – ${b}`;
      } else { paint(ins[0]); if (out) out.textContent = (box.dataset.prefix || '') + ins[0].value + (box.dataset.suffix || ''); }
    };
    ins.forEach(i => i.addEventListener('input', upd)); upd();
  }

  /* ---------- OTP ---------- */
  function initOtp(box) {
    if (!once(box, 'otp')) return;
    const ins = $$('input', box);
    const emit = () => { const v = ins.map(i => i.value).join(''); fire(box, 'mglsk:otp', { value: v, complete: v.length === ins.length }); };
    ins.forEach((inp, i) => {
      inp.maxLength = 1; inp.inputMode = box.dataset.otp === 'text' ? 'text' : 'numeric'; inp.autocomplete = 'one-time-code'; inp.placeholder = ' ';
      inp.setAttribute('aria-label', `Digit ${i + 1}`);
      inp.addEventListener('input', () => {
        if (box.dataset.otp !== 'text') inp.value = inp.value.replace(/\D/g, '');
        if (inp.value && ins[i + 1]) ins[i + 1].focus(); emit();
      });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !inp.value && ins[i - 1]) { ins[i - 1].focus(); ins[i - 1].value = ''; emit(); }
        if (e.key === 'ArrowLeft' && ins[i - 1]) ins[i - 1].focus();
        if (e.key === 'ArrowRight' && ins[i + 1]) ins[i + 1].focus();
      });
      inp.addEventListener('focus', () => inp.select());
      inp.addEventListener('paste', e => {
        e.preventDefault();
        const txt = (e.clipboardData.getData('text') || '').replace(box.dataset.otp === 'text' ? /\s/g : /\D/g, '');
        [...txt].slice(0, ins.length - i).forEach((c, k) => (ins[i + k].value = c));
        ins[Math.min(ins.length - 1, i + txt.length)].focus(); emit();
      });
    });
  }

  /* ---------- select + combobox ---------- */
  function initSelect(root) {
    if (!once(root, 'select')) return;
    const combo = root.hasAttribute('data-combobox'), multi = root.hasAttribute('data-multiple');
    const menu = $('.select-menu', root), hidden = $('input[type=hidden]', root);
    const trigger = $('.select-trigger', root), input = combo ? $('input:not([type=hidden])', root) : null, valueEl = $('.select-value', root);
    const opts = () => $$('.select-option', menu);
    const vis = () => opts().filter(o => !o.hidden && o.getAttribute('aria-disabled') !== 'true');
    let chosen = new Set(), active = -1;
    const label = o => o.dataset.label || o.textContent.trim();
    const setActive = i => { const v = vis(); v.forEach(o => o.classList.remove('active')); active = (i + v.length) % (v.length || 1); const o = v[active]; if (o) { o.classList.add('active'); o.scrollIntoView({ block: 'nearest' }); (input || trigger).setAttribute('aria-activedescendant', o.id || ''); } };
    const open = () => { menu.hidden = false; root.classList.add('open'); (input || trigger).setAttribute('aria-expanded', 'true'); const sel = vis().findIndex(o => o.getAttribute('aria-selected') === 'true'); setActive(sel < 0 ? 0 : sel); };
    const close = () => { menu.hidden = true; root.classList.remove('open'); (input || trigger).setAttribute('aria-expanded', 'false'); };
    const sync = () => {
      opts().forEach(o => o.setAttribute('aria-selected', chosen.has(o.dataset.value)));
      const vals = [...chosen]; if (hidden) hidden.value = vals.join(',');
      if (valueEl) { const lab = opts().filter(o => chosen.has(o.dataset.value)).map(label); valueEl.textContent = lab.length ? lab.join(', ') : valueEl.dataset.placeholder || 'Select…'; valueEl.classList.toggle('placeholder', !lab.length); }
      if (combo && !multi) input.value = vals.length ? label(opts().find(o => o.dataset.value === vals[0])) : '';
      if (multi && combo) renderChips();
      if (hidden) hidden.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const renderChips = () => {
      $$('.chip', root).forEach(c => c.remove());
      opts().filter(o => chosen.has(o.dataset.value)).forEach(o => { const c = document.createElement('span'); c.className = 'chip'; c.innerHTML = `${label(o)} <button type="button" aria-label="Remove ${label(o).replace(/"/g, '')}"><span aria-hidden="true">✕</span></button>`; c.querySelector('button').onclick = ev => { ev.stopPropagation(); chosen.delete(o.dataset.value); sync(); }; input.before(c); });
    };
    const pick = o => { const v = o.dataset.value; if (multi) { chosen.has(v) ? chosen.delete(v) : chosen.add(v); } else { chosen = new Set([v]); close(); } sync(); if (combo) filter(''); };
    const filter = q => { q = q.toLowerCase(); opts().forEach(o => (o.hidden = !!q && !label(o).toLowerCase().includes(q))); $$('.select-group-label', menu).forEach(g => { let n = g.nextElementSibling, any = false; while (n && !n.classList.contains('select-group-label')) { if (n.classList.contains('select-option') && !n.hidden) any = true; n = n.nextElementSibling; } g.hidden = !any; }); const em = $('.select-empty', menu); if (em) em.hidden = vis().length > 0 || opts().some(o => !o.hidden); setActive(0); };
    opts().forEach((o, i) => { o.setAttribute('role', 'option'); o.id ||= `${menu.id || 'sel' + Math.random().toString(36).slice(2, 6)}-o${i}`; if (o.getAttribute('aria-selected') === 'true' || o.hasAttribute('data-selected')) chosen.add(o.dataset.value); o.addEventListener('mousedown', e => e.preventDefault()); o.addEventListener('click', () => pick(o)); o.addEventListener('mousemove', () => { const v = vis(); setActive(v.indexOf(o)); }); });
    menu.setAttribute('role', 'listbox'); if (multi) menu.setAttribute('aria-multiselectable', 'true');
    menu.id ||= uid('lb');
    const lab = labelFor(root, input);
    const named = el => { if (lab) el.setAttribute('aria-labelledby', lab.id); else if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', root.dataset.label || el.getAttribute('placeholder') || 'Options'); };
    named(menu);
    const key = e => {
      if (menu.hidden && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key) && !(combo && e.key === ' ')) { e.preventDefault(); open(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Home') { e.preventDefault(); setActive(0); } else if (e.key === 'End') { e.preventDefault(); setActive(-1); }
      else if (e.key === 'Enter' || (e.key === ' ' && !combo)) { e.preventDefault(); const o = vis()[active]; if (o) pick(o); }
      else if (e.key === 'Escape') { close(); }
      else if (!combo && e.key.length === 1) { const i = vis().findIndex(o => label(o).toLowerCase().startsWith(e.key.toLowerCase())); if (i >= 0) setActive(i); }
      else if (combo && e.key === 'Backspace' && multi && !input.value && chosen.size) { chosen.delete([...chosen].pop()); sync(); }
    };
    if (combo) {
      input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-controls', menu.id);
      if (!lab && !input.hasAttribute('aria-label')) input.setAttribute('aria-label', input.placeholder || 'Search');
      input.addEventListener('focus', () => menu.hidden && open());
      input.addEventListener('input', () => { if (menu.hidden) open(); filter(input.value); });
      input.addEventListener('keydown', key);
      const b = $('.combo-btn', root); b && b.addEventListener('click', () => (menu.hidden ? (input.focus(), open()) : close()));
      input.addEventListener('blur', () => setTimeout(() => { if (!root.contains(document.activeElement)) { close(); if (!multi) sync(); else input.value = ''; filter(''); } }, 120));
    } else {
      trigger.setAttribute('role', 'combobox'); trigger.setAttribute('aria-haspopup', 'listbox'); trigger.setAttribute('aria-expanded', 'false'); trigger.setAttribute('aria-controls', menu.id);
      if (lab) trigger.setAttribute('aria-labelledby', lab.id + ' ' + (valueEl.id ||= uid('val'))); else if (!trigger.hasAttribute('aria-label')) trigger.setAttribute('aria-label', root.dataset.label || 'Select');
      trigger.addEventListener('click', () => (menu.hidden ? open() : close()));
      trigger.addEventListener('keydown', key);
    }
    document.addEventListener('click', e => { if (!root.contains(e.target)) close(); });
    sync(); if (combo) filter('');
  }

  /* ---------- textarea ---------- */
  function initTextarea(t) {
    if (!once(t, 'ta')) return;
    const max = +t.dataset.counter, cnt = max ? Object.assign(document.createElement('span'), { className: 'counter' }) : null;
    if (cnt) t.after(cnt);
    const upd = () => {
      if (t.hasAttribute('data-autogrow')) { t.style.height = 'auto'; t.style.height = t.scrollHeight + 2 + 'px'; }
      if (cnt) { cnt.textContent = `${t.value.length}/${max}`; cnt.classList.toggle('over', t.value.length > max); }
    };
    t.addEventListener('input', upd); upd();
  }

  /* ---------- calendar ---------- */
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = s => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  AK.calendar = (el, opt = {}) => {
    const mode = opt.mode || el.dataset.mode || 'single', weekStart = opt.weekStart ?? 1;
    let sel = parse(opt.value || el.dataset.value), end = null, anchor = null;
    let view = new Date((sel || new Date()).getFullYear(), (sel || new Date()).getMonth(), 1), focusDate = sel || new Date();
    const min = parse(opt.min || el.dataset.min), max = parse(opt.max || el.dataset.max);
    el.classList.add('calendar');
    const fmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
    const dowDate = i => new Date(2024, 0, 1 + (i + weekStart + 6) % 7);
    const dows = [...Array(7)].map((_, i) => ({ short: new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(dowDate(i)).slice(0, 2), long: new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(dowDate(i)) }));
    const dayName = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const gid = 'cal-' + Math.random().toString(36).slice(2, 7);
    function render(focus) {
      const first = new Date(view), offset = (first.getDay() - weekStart + 7) % 7, start = new Date(view.getFullYear(), view.getMonth(), 1 - offset), today = iso(new Date());
      let h = `<div class="cal-head"><button type="button" class="btn btn-ghost btn-icon btn-sm" data-cal="-1" aria-label="Previous month">${icon('chevron-left')}</button><div class="cal-title" id="${gid}-t" aria-live="polite">${fmt.format(view)}</div><button type="button" class="btn btn-ghost btn-icon btn-sm" data-cal="1" aria-label="Next month">${icon('chevron-right')}</button></div>`;
      h += `<div class="cal-grid" role="grid" aria-labelledby="${gid}-t"><div class="cal-row" role="row">${dows.map(d => `<div class="cal-dow" role="columnheader" aria-label="${d.long}">${d.short}</div>`).join('')}</div>`;
      for (let r = 0; r < 6; r++) {
        h += '<div class="cal-row" role="row">';
        for (let c = 0; c < 7; c++) {
          const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + r * 7 + c), k = iso(d);
          const dis = (min && d < min) || (max && d > max);
          const isSel = sel && (k === iso(sel) || (end && k === iso(end)));
          const inR = sel && end && d > sel && d < end;
          h += `<div class="cal-cell" role="gridcell" aria-selected="${!!(isSel || inR)}"><button type="button" class="cal-day${d.getMonth() !== view.getMonth() ? ' outside' : ''}${k === today ? ' today' : ''}${isSel ? ' selected' : ''}${inR ? ' in-range' : ''}" data-date="${k}" ${dis ? 'disabled' : ''} tabindex="${k === iso(focusDate) ? 0 : -1}" ${k === today ? 'aria-current="date"' : ''} aria-label="${dayName.format(d)}">${d.getDate()}</button></div>`;
        }
        h += '</div>';
      }
      h += '</div>';
      if (opt.footer !== false) h += `<div class="cal-foot"><span role="status">${sel ? (end ? `${iso(sel)} → ${iso(end)}` : iso(sel)) : 'No date selected'}</span><button type="button" class="btn-link" data-cal="today">Today</button></div>`;
      el.innerHTML = h; AK.renderIcons && AK.renderIcons(el);
      if (focus) $('.cal-day[tabindex="0"]', el)?.focus();
    }
    const choose = d => {
      if (mode === 'range') { if (!anchor || end) { sel = d; end = null; anchor = d; } else { if (d < anchor) { end = anchor; sel = d; } else end = d; anchor = null; } }
      else sel = d;
      focusDate = d; view = new Date(d.getFullYear(), d.getMonth(), 1); render(true);
      const detail = mode === 'range' ? { start: sel && iso(sel), end: end && iso(end) } : { value: iso(sel) };
      if (mode !== 'range' || end) { fire(el, 'mglsk:calendar', detail); opt.onChange?.(detail); }
    };
    el.addEventListener('click', e => {
      const n = e.target.closest('[data-cal]'), d = e.target.closest('.cal-day');
      if (n) { if (n.dataset.cal === 'today') { const t = new Date(); view = new Date(t.getFullYear(), t.getMonth(), 1); focusDate = t; render(); } else { view = new Date(view.getFullYear(), view.getMonth() + +n.dataset.cal, 1); focusDate = view; render(); } }
      else if (d) choose(parse(d.dataset.date));
    });
    el.addEventListener('keydown', e => {
      const d = e.target.closest('.cal-day'); if (!d) return;
      const mv = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (mv) { e.preventDefault(); const c = parse(d.dataset.date); focusDate = new Date(c.getFullYear(), c.getMonth(), c.getDate() + mv); view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1); render(true); }
      if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); const c = parse(d.dataset.date), dow = (c.getDay() - weekStart + 7) % 7; focusDate = new Date(c.getFullYear(), c.getMonth(), c.getDate() + (e.key === 'Home' ? -dow : 6 - dow)); view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1); render(true); }
      if (e.key === 'PageDown' || e.key === 'PageUp') { e.preventDefault(); const c = parse(d.dataset.date), s = (e.key === 'PageDown' ? 1 : -1) * (e.shiftKey ? 12 : 1); focusDate = new Date(c.getFullYear(), c.getMonth() + s, c.getDate()); view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1); render(true); }
    });
    render();
    return { get value() { return sel && iso(sel); }, set(v) { sel = parse(v); view = new Date(sel.getFullYear(), sel.getMonth(), 1); focusDate = sel; render(); } };
  };

  /* ---------- date picker ---------- */
  function initDatePicker(root) {
    if (!once(root, 'dp')) return;
    const btn = $('.select-trigger', root), val = $('.select-value', root), hidden = $('input[type=hidden]', root);
    const panel = $('.dp-panel', root), cal = $('.calendar, [data-dp-cal]', panel);
    const mode = root.dataset.mode || 'single', f = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const lab = labelFor(root, null);
    if (lab) btn.setAttribute('aria-labelledby', lab.id + ' ' + (val.id ||= uid('val')));
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', (lab ? lab.textContent.trim() + ': ' : '') + (mode === 'range' ? 'choose a date range' : 'choose a date'));
    btn.setAttribute('aria-controls', (panel.id ||= uid('dp')));
    cal.dataset.mode = mode;
    AK.calendar(cal, { mode, value: hidden?.value, onChange: d => {
      val.classList.remove('placeholder');
      val.textContent = mode === 'range' ? `${f.format(parse(d.start))} → ${f.format(parse(d.end))}` : f.format(parse(d.value));
      if (hidden) { hidden.value = mode === 'range' ? `${d.start}/${d.end}` : d.value; hidden.dispatchEvent(new Event('change', { bubbles: true })); }
      if (mode === 'single' || mode === 'range') { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    } });
    btn.addEventListener('click', () => { panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', !panel.hidden); if (!panel.hidden) ($('.cal-day[tabindex="0"]', panel) || panel).focus(); });
    document.addEventListener('click', e => { if (!root.contains(e.target)) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
    root.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { panel.hidden = true; btn.focus(); } });
  }

  /* ---------- pagination ---------- */
  AK.pagination = (el, opt = {}) => {
    let pages = opt.pages ?? (+el.dataset.pages || 1), page = opt.page ?? (+el.dataset.page || 1); const sib = opt.siblings ?? 1, compact = el.hasAttribute('data-compact');
    el.setAttribute('role', 'navigation'); el.setAttribute('aria-label', el.dataset.label || 'Pagination');
    const go = p => { page = Math.min(pages, Math.max(1, p)); draw(); fire(el, 'mglsk:page', page); opt.onChange?.(page); };
    function draw() {
      el.innerHTML = '';
      const b = (label, p, o = {}) => { const x = document.createElement('button'); x.type = 'button'; x.innerHTML = label; x.disabled = !!o.dis; if (o.cur) x.setAttribute('aria-current', 'page'); x.setAttribute('aria-label', o.aria || `Page ${p}${o.cur ? ', current page' : ''}`); x.onclick = () => go(p); el.append(x); };
      b('‹', page - 1, { dis: page === 1, aria: 'Previous page' });
      if (compact) { const s = document.createElement('span'); s.className = 'pagination-compact'; s.textContent = `Page ${page} of ${pages}`; el.append(s); }
      else {
        const set = new Set([1, pages]); for (let i = page - sib; i <= page + sib; i++) if (i > 0 && i <= pages) set.add(i);
        let last = 0; [...set].sort((a, c) => a - c).forEach(p => { if (p - last > 1) { const s = document.createElement('span'); s.className = 'ellipsis'; s.textContent = '…'; el.append(s); } b(p, p, { cur: p === page }); last = p; });
      }
      b('›', page + 1, { dis: page === pages, aria: 'Next page' });
    }
    draw();
    return { go, set(n, p) { pages = n; page = p ?? 1; draw(); } };
  };

  /* ---------- questionnaire ---------- */
  function initQuiz(q) {
    if (!once(q, 'quiz')) return;
    const steps = $$('[data-step]', q), bar = $('.progress > span', q), label = $('[data-quiz-label]', q);
    const back = $('[data-quiz-back]', q), next = $('[data-quiz-next]', q), summary = $('[data-quiz-summary]', q);
    let i = 0;
    const answer = s => { const c = $$('input:checked', s), t = $('textarea', s); return t ? t.value.trim() : c.map(x => x.closest('label')?.querySelector('.rc-title, span:last-child')?.textContent.trim() || x.value).join(', '); };
    const show = () => {
      steps.forEach((s, k) => (s.hidden = k !== i)); const done = i === steps.length;
      $('[data-done]', q).hidden = !done;
      if (bar) bar.style.width = Math.round(i / steps.length * 100) + '%';
      if (label) label.textContent = done ? 'Complete' : `Question ${i + 1} of ${steps.length}`;
      back.disabled = i === 0 || done; next.hidden = done;
      next.textContent = i === steps.length - 1 ? 'Submit →' : 'Next →';
      if (done && summary) summary.innerHTML = steps.map(s => `<dt>${$('.quiz-q', s).textContent}</dt><dd>${answer(s) || '<span class="text-faint">(skipped)</span>'}</dd>`).join('');
      const ok = i < steps.length && (!steps[i].hasAttribute('data-required') || answer(steps[i]));
      next.disabled = !ok;
    };
    q.addEventListener('input', () => { if (i < steps.length) next.disabled = steps[i].hasAttribute('data-required') && !answer(steps[i]); });
    next.onclick = () => { i++; show(); if (i === steps.length) fire(q, 'mglsk:quiz', steps.map(answer)); };
    back.onclick = () => { i--; show(); };
    const restart = $('[data-quiz-restart]', q); if (restart) restart.onclick = () => { i = 0; $$('input', q).forEach(x => (x.checked = false)); $$('textarea', q).forEach(x => (x.value = '')); show(); };
    show();
  }

  AK.init = (root = document) => {
    $$('.slider, .slider-range', root).forEach(initSlider);
    $$('[data-otp]', root).forEach(initOtp);
    $$('[data-select], [data-combobox]', root).forEach(initSelect);
    $$('textarea[data-autogrow], textarea[data-counter]', root).forEach(initTextarea);
    $$('[data-calendar]', root).forEach(c => once(c, 'cal') && AK.calendar(c));
    $$('[data-datepicker]', root).forEach(initDatePicker);
    $$('[data-pagination]', root).forEach(p => once(p, 'pg') && AK.pagination(p));
    $$('[data-questionnaire]', root).forEach(initQuiz);
    AK.renderIcons && AK.renderIcons(root);
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => AK.init()) : AK.init();
})();

/* ===== overlays.js ===== */
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

/* ===== display.js ===== */
/* MGLSK UI display — carousel, resizable, code block (copy + highlight), message scroller, trace, direction toggle.
 *
 *  [data-carousel]  [data-autoplay=ms]        scroll-snap carousel with prev/next/dots
 *  [data-resizable="horizontal|vertical"]     drag/keyboard splitter between .resizable-panel elements
 *  .codeblock code[data-highlight]            tiny tokenizer (js/ts/json/css/html/bash/php/sql/py); [data-copy] copies
 *  [data-scroller]                            sticks to bottom, shows jump button; MGLSK.scroller(el).append(node)
 *  .trace-head                                expands/collapses a step
 *  [data-dir-toggle="rtl|ltr"][data-dir-target="#id"]
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const once = (el, key) => (el['_ak_' + key] ? false : (el['_ak_' + key] = true));

  /* ---------- carousel ---------- */
  function initCarousel(c) {
    if (!once(c, 'car')) return;
    const track = $('.carousel-track', c), slides = $$('.carousel-slide', c), dots = $('.carousel-dots', c);
    const prev = $('.carousel-btn.prev', c), next = $('.carousel-btn.next', c);
    const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    const idx = () => Math.round(track.scrollLeft / step());
    const to = i => track.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * step() });
    if (dots) { dots.innerHTML = ''; slides.forEach((_, i) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `Slide ${i + 1}`); b.onclick = () => to(i); dots.append(b); }); }
    const upd = () => {
      const i = idx(), end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      prev && (prev.disabled = i <= 0); next && (next.disabled = end);
      dots && $$('button', dots).forEach((b, k) => b.setAttribute('aria-current', k === (end ? slides.length - 1 : i)));
    };
    prev && (prev.onclick = () => to(idx() - 1)); next && (next.onclick = () => to(idx() + 1));
    track.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
    c.setAttribute('role', 'region'); c.setAttribute('aria-roledescription', 'carousel'); if (c.dataset.autoplay) track.setAttribute('aria-live', 'off'); else track.setAttribute('aria-live', 'polite');
    c.addEventListener('keydown', e => { if (e.key === 'ArrowRight') to(idx() + 1); if (e.key === 'ArrowLeft') to(idx() - 1); });
    if (c.dataset.autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // WCAG 2.2.2: moving content that lasts > 5s needs a pause control; it also stops while hovered or focused
      let paused = false, hover = false, focus = false;
      const pause = document.createElement('button'); pause.type = 'button'; pause.className = 'btn btn-ghost btn-sm carousel-pause'; pause.setAttribute('aria-pressed', 'false'); pause.textContent = 'Pause';
      pause.onclick = () => { paused = !paused; pause.setAttribute('aria-pressed', paused); pause.textContent = paused ? 'Play' : 'Pause'; };
      c.append(pause);
      c.addEventListener('mouseenter', () => (hover = true)); c.addEventListener('mouseleave', () => (hover = false));
      c.addEventListener('focusin', () => (focus = true)); c.addEventListener('focusout', () => (focus = false));
      setInterval(() => { if (paused || hover || focus || document.hidden) return; const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; to(end ? 0 : idx() + 1); }, +c.dataset.autoplay || 4000);
    }
    upd();
  }

  /* ---------- resizable ---------- */
  function initResizable(r) {
    if (!once(r, 'rs')) return;
    const vert = r.dataset.resizable === 'vertical';
    $$(':scope > .resizable-handle', r).forEach(h => {
      const a = h.previousElementSibling, b = h.nextElementSibling;
      h.setAttribute('role', 'separator'); h.setAttribute('aria-orientation', vert ? 'horizontal' : 'vertical'); h.tabIndex = 0;
      const total = () => (vert ? a.offsetHeight + b.offsetHeight : a.offsetWidth + b.offsetWidth);
      const set = pct => { pct = Math.max(10, Math.min(90, pct)); a.style.flex = `0 0 ${pct}%`; b.style.flex = '1 1 0'; h.setAttribute('aria-valuenow', Math.round(pct)); };
      const cur = () => ((vert ? a.offsetHeight : a.offsetWidth) / (vert ? r.clientHeight : r.clientWidth)) * 100;
      h.addEventListener('pointerdown', e => {
        h.setPointerCapture(e.pointerId); h.classList.add('drag'); document.body.style.userSelect = 'none';
        const move = ev => { const rect = r.getBoundingClientRect(); set(((vert ? ev.clientY - rect.top : ev.clientX - rect.left) / (vert ? rect.height : rect.width)) * 100); };
        const up = () => { h.classList.remove('drag'); document.body.style.userSelect = ''; h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', up); };
        h.addEventListener('pointermove', move); h.addEventListener('pointerup', up);
      });
      h.addEventListener('keydown', e => {
        const k = vert ? { ArrowUp: -3, ArrowDown: 3 } : { ArrowLeft: -3, ArrowRight: 3 };
        if (k[e.key]) { e.preventDefault(); set(cur() + k[e.key]); }
      });
      h.setAttribute('aria-valuenow', Math.round(cur()) || 50); h.setAttribute('aria-valuemin', 10); h.setAttribute('aria-valuemax', 90);
    });
  }

  /* ---------- code block ---------- */
  const KW = {
    js: 'const let var function return if else for while class new import from export default async await try catch throw typeof null true false undefined this of in switch case break continue',
    php: 'function return if else foreach for while class new use namespace public private protected static null true false echo array fn match try catch throw',
    py: 'def return if elif else for while class import from as None True False with try except raise lambda in not and or pass yield async await',
    sql: 'select from where join left right inner on group by order limit insert into values update set delete create table index and or not null as distinct count',
    bash: 'if then else fi for do done while case esac function echo export cd ls git npm sudo',
    css: '@media @import @font-face @keyframes !important',
    html: '', json: 'true false null',
  };
  KW.ts = KW.js + ' interface type enum implements readonly public private'; KW.jsx = KW.tsx = KW.ts;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  AK.highlight = (src, lang = 'js') => {
    const kw = new Set((KW[lang] || KW.js).split(' ').filter(Boolean)); const ci = lang === 'sql';
    if (lang === 'html') {
      const tag = /(<!--[\s\S]*?-->)|(<\/?)([\w-]+)((?:\s+[\w:@.-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'))?)*)(\s*\/?>)/g;
      let o = '', i = 0, m;
      while ((m = tag.exec(src))) {
        o += esc(src.slice(i, m.index)); i = tag.lastIndex;
        if (m[1]) { o += `<span class="tok-c">${esc(m[1])}</span>`; continue; }
        const attrs = m[4].replace(/(\s+)([\w:@.-]+)(\s*=\s*)?("[^"]*"|'[^']*')?/g, (_, sp, n, eq, v) => `${sp}<span class="tok-n">${esc(n)}</span>${esc(eq || '')}${v ? `<span class="tok-s">${esc(v)}</span>` : ''}`);
        o += `${esc(m[2])}<span class="tok-k">${esc(m[3])}</span>${attrs}${esc(m[5])}`;
      }
      return o + esc(src.slice(i));
    }
    const re = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*|--[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_@$!][\w$-]*)(\s*\()?/g;
    let out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index)); last = re.lastIndex;
      const [all, com, str, num, word, call] = m;
      if (com && !(com[0] === '#' && (lang === 'js' || lang === 'ts' || lang === 'css' || lang === 'json'))) out += `<span class="tok-c">${esc(com)}</span>`;
      else if (com) out += esc(com);
      else if (str) out += `<span class="tok-s">${esc(str)}</span>`;
      else if (num) out += `<span class="tok-n">${num}</span>`;
      else if (word && kw.has(ci ? word.toLowerCase() : word)) out += `<span class="tok-k">${esc(word)}</span>${esc(call || '')}`;
      else if (word && call) out += `<span class="tok-f">${esc(word)}</span>${esc(call)}`;
      else out += esc(all);
    }
    return out + esc(src.slice(last));
  };
  function initCode(fig) {
    if (!once(fig, 'code')) return;
    const code = $('code', fig), lang = fig.dataset.lang || 'js', raw = code.textContent.replace(/^\n/, '').replace(/\s+$/, '');
    fig.dataset.raw = raw;
    const cap = $('figcaption', fig); if (cap) cap.dataset.lang = lang;
    if (!code.hasAttribute('data-nohighlight')) {
      let html = AK.highlight(raw, lang);
      const hl = (fig.dataset.highlight || '').split(',').filter(Boolean).map(Number);
      if (fig.classList.contains('lines') || hl.length) html = html.split('\n').map((l, i) => `${fig.classList.contains('lines') ? `<span class="ln">${i + 1}</span>` : ''}${hl.includes(i + 1) ? `<span class="hl">${l || ' '}</span>` : l}`).join('\n');
      code.innerHTML = html;
    }
    const b = $('[data-copy]', fig);
    if (b) b.addEventListener('click', async () => { try { await navigator.clipboard.writeText(raw); } catch (e) { const t = document.createElement('textarea'); t.value = raw; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); } const o = b.textContent; b.textContent = 'Copied ✓'; setTimeout(() => (b.textContent = o), 1400); });
  }

  /* ---------- message scroller ---------- */
  AK.scroller = el => {
    const wrap = el.closest('.scroller-wrap') || el.parentElement; let stick = true;
    const near = () => el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    const jump = $('.scroller-jump', wrap);
    el.addEventListener('scroll', () => { stick = near(); wrap.classList.toggle('away', !stick); });
    if (jump) jump.onclick = () => { el.scrollTop = el.scrollHeight; };
    const toEnd = () => { el.scrollTop = el.scrollHeight; };
    return { append(node) { const was = stick; el.append(node); if (was) { requestAnimationFrame(toEnd); } else wrap.classList.add('away'); return node; }, toEnd };
  };

  /* ---------- trace + direction + misc clicks ---------- */
  document.addEventListener('click', e => {
    const h = e.target.closest('.trace-head');
    if (h) { const r = h.parentElement; r.classList.toggle('open'); h.setAttribute('aria-expanded', r.classList.contains('open')); }
    const d = e.target.closest('[data-dir-toggle]');
    if (d) { const t = $(d.dataset.dirTarget); t.setAttribute('dir', d.dataset.dirToggle); $$('[data-dir-toggle]').forEach(b => b.setAttribute('aria-pressed', b === d)); }
  });

  AK.initDisplay = (root = document) => {
    $$('[data-carousel]', root).forEach(initCarousel);
    $$('[data-resizable]', root).forEach(initResizable);
    $$('.codeblock', root).forEach(initCode);
    $$('[data-scroller]', root).forEach(s => once(s, 'sc') && (s._sc = AK.scroller(s)) && requestAnimationFrame(() => s._sc.toEnd()));
  };
  const prevInit = AK.init; AK.init = (root = document) => { prevInit && prevInit(root); AK.initDisplay(root); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => AK.initDisplay()) : AK.initDisplay();
})();

/* ===== a11y.js ===== */
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

/* ===== fx.js ===== */
/* MGLSK UI FX — terminal effects. Raw WebGL1, no dependencies.
 *
 *  Auto on load (opt out with <html data-fx="off"> or the [data-fx-toggle] button, which persists):
 *    - scanline + grain layers (background only, beneath the app)
 *    - WebGL dot field behind the app (pointer-reactive, scan sweep)
 *    - live clock [data-clock], text decode on [data-decode] / .nav-label / headings, glitch on [data-glitch]
 *    - reveal-on-scroll for .reveal
 *
 *  Particle logo:   MGLSK.fx.particles(canvas, { text:'_AK' } | { path:'M…', viewBox:[w,h] },
 *                     { count:7200, dust:.07, readout:el })
 *  Falls back to a static 2D drawing without WebGL; one assembled static frame under prefers-reduced-motion.
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  root.classList.add('js');

  /* ---------- fx on/off (persisted) ---------- */
  if (localStorage.getItem('mglsk-fx') === 'off') root.dataset.fx = 'off';
  const fxOn = () => root.dataset.fx !== 'off';

  /* ---------- theme colours for the shaders (read from the CSS tokens, refreshed when the theme/accent changes) ---------- */
  const theme = { light: false, ink: [.89, .94, .91], dot: [.49, .56, .52], acc: [.17, 1, .53], glitch: [1, .17, .84] };
  let probeEl;
  const cssRgb = v => {
    probeEl ||= Object.assign(document.createElement('i'), { ariaHidden: 'true' });
    if (!probeEl.isConnected) { probeEl.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden;transition:none!important'; document.body.append(probeEl); }
    probeEl.style.color = v;
    const n = (getComputedStyle(probeEl).color.match(/[\d.]+/g) || [0, 0, 0]).map(Number);
    return getComputedStyle(probeEl).color.startsWith('color(') ? n.slice(0, 3) : n.slice(0, 3).map(x => x / 255);
  };
  const readTheme = () => {
    theme.light = root.dataset.themeResolved === 'light';
    theme.ink = cssRgb('var(--text)'); theme.dot = cssRgb('var(--muted)'); theme.acc = cssRgb('var(--accent)'); theme.glitch = cssRgb('var(--glitch)');
    document.dispatchEvent(new CustomEvent('mglsk:fx-theme'));
  };
  ['mglsk:theme', 'mglsk:accent'].forEach(n => document.addEventListener(n, () => requestAnimationFrame(readTheme)));
  if (document.body) readTheme();

  /* ---------- tiny GL helpers ---------- */
  const compile = (gl, type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const program = (gl, vs, fs) => {
    const v = compile(gl, gl.VERTEX_SHADER, vs), f = compile(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  };
  const getGL = c => { try { return c.getContext('webgl', { antialias: false, premultipliedAlpha: true, alpha: true }) || c.getContext('experimental-webgl'); } catch (e) { return null; } };

  /* shared pointer, smoothed per consumer */
  const ptr = { x: -9999, y: -9999, down: false };
  addEventListener('pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => { ptr.x = ptr.y = -9999; });
  addEventListener('pointerup', () => { if (ptr.touch) ptr.x = ptr.y = -9999; });
  addEventListener('pointerdown', e => { ptr.touch = e.pointerType === 'touch'; ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });

  /* ====================================================================
     1. DOT FIELD — full-viewport fragment shader
     ==================================================================== */
  function dotField() {
    if (document.getElementById('fx-field')) return;
    const c = document.createElement('canvas'); c.id = 'fx-field'; c.setAttribute('aria-hidden', 'true');
    document.body.prepend(c);
    const gl = getGL(c);
    if (!gl) { c.remove(); return; }
    const prog = program(gl,
      'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}',
      `precision mediump float;
      uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_time; uniform float u_dpr; uniform vec3 u_dot; uniform vec3 u_acc; uniform float u_gain;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      void main(){
        vec2 px=vec2(gl_FragCoord.x,u_res.y-gl_FragCoord.y)/u_dpr;       // css px, y down
        float cell=16.;
        vec2 c=(floor(px/cell)+.5)*cell;
        float n=vn(c*.011+vec2(u_time*.04,u_time*.025));
        float near=smoothstep(280.,0.,length(c-u_mouse));
        float r=mix(.5,1.5,n)+near*1.7;
        float d=length(px-c);
        float dot=smoothstep(r,r-.9,d);
        float sy=mod(u_time*70.,u_res.y/u_dpr+240.)-120.;
        float sweep=exp(-abs(c.y-sy)/36.)*.35;
        float a=dot*(.07+.16*n+sweep)+dot*near*.7;
        vec3 col=mix(u_dot,u_acc,clamp(near*1.2+sweep*1.5,0.,1.));
        a=min(a*u_gain,1.);
        gl_FragColor=vec4(col*a,a);
      }`);
    if (!prog) { c.remove(); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prog, n);
    const u = { res: U('u_res'), mouse: U('u_mouse'), time: U('u_time'), dpr: U('u_dpr'), dot: U('u_dot'), acc: U('u_acc'), gain: U('u_gain') };
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let mx = -9999, my = -9999, t0 = performance.now(), raf = 0;
    const resize = () => { const d = dpr(); c.width = Math.round(innerWidth * d); c.height = Math.round(innerHeight * d); gl.viewport(0, 0, c.width, c.height); };
    const draw = time => {
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u.res, c.width, c.height); gl.uniform2f(u.mouse, mx, my);
      gl.uniform1f(u.time, time); gl.uniform1f(u.dpr, dpr());
      gl.uniform3f(u.dot, ...theme.dot); gl.uniform3f(u.acc, ...theme.acc); gl.uniform1f(u.gain, theme.light ? 1.7 : 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = now => {
      raf = 0;
      if (document.hidden || !fxOn()) return;
      mx += (ptr.x - mx) * .15; my += (ptr.y - my) * .15;
      if (ptr.x < -999) { mx = ptr.x; my = ptr.y; }
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduce && fxOn()) raf = requestAnimationFrame(loop); };
    resize();
    addEventListener('resize', () => { resize(); if (reduce) draw(2); });
    document.addEventListener('visibilitychange', start);
    document.addEventListener('mglsk:fx', start);
    document.addEventListener('mglsk:fx-theme', () => { if (reduce) draw(2); });
    if (reduce) draw(2); else start();
  }

  /* ====================================================================
     2. PARTICLE LOGO — gl.POINTS, additive, targets sampled from text/path
     ==================================================================== */
  AK.fx = AK.fx || {};
  AK.fx.particles = (canvas, src = {}, opt = {}) => {
    const isMobile = innerWidth < 700;
    const COUNT = opt.count || (isMobile ? 4200 : 7200), DUST = opt.dust ?? .07;
    const gl = getGL(canvas);
    const readout = opt.readout;
    let W = 0, H = 0, D = 1, targets = [], P = [], raf = 0, t0 = 0, glitchUntil = 0, nextGlitch = 0, visible = true;
    let mx = -9999, my = -9999;

    /* sample filled pixels of the mark on an offscreen 2D canvas (never tainted: text/Path2D only) */
    const sample = () => {
      const s = document.createElement('canvas'), w = (s.width = 360), h = (s.height = Math.max(120, Math.round(360 * H / W)));
      const x = s.getContext('2d', { willReadFrequently: true });
      x.fillStyle = '#fff';
      if (src.path) {
        const [vw, vh] = src.viewBox, k = Math.min(w / vw, h / vh) * .92;
        x.translate((w - vw * k) / 2, (h - vh * k) / 2); x.scale(k, k); x.fill(new Path2D(src.path));
      } else {
        let size = h * .8; x.font = `800 ${size}px Archivo, system-ui, sans-serif`;
        const tw = x.measureText(src.text).width; if (tw > w * .92) { size *= w * .92 / tw; x.font = `800 ${size}px Archivo, system-ui, sans-serif`; }
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(src.text, w / 2, h / 2 + size * .04);
      }
      const px = x.getImageData(0, 0, w, h).data, pts = [];
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (px[(j * w + i) * 4 + 3] > 128) pts.push([i / w, j / h]);
      return pts;
    };

    const build = () => {
      const pts = sample(), fillN = Math.round(COUNT * (1 - DUST));
      P = [];
      for (let i = 0; i < COUNT; i++) {
        const dust = i >= fillN, t = pts[(Math.random() * pts.length) | 0] || [.5, .5];
        P.push({
          tx: dust ? Math.random() * W : t[0] * W, ty: dust ? Math.random() * H : t[1] * H,
          sx: Math.random() * W * 1.4 - W * .2, sy: Math.random() * H * 1.4 - H * .2,
          delay: Math.random() * .8, ph: Math.random() * 6.28, amp: .4 + Math.random() * 1.4,
          size: dust ? .9 + Math.random() * .8 : 1.1 + Math.random() * 1.3,
          green: Math.random() < .035 ? 1 : 0, dust, x: 0, y: 0, g: 0, band: 0,
        });
        P[i].band = ((Math.floor(P[i].ty / 22) * 2654435761) >>> 0) / 4294967296;
        P[i].x = P[i].sx; P[i].y = P[i].sy;
      }
    };

    /* GL setup */
    let prog, buf, loc, uni;
    if (gl) {
      prog = program(gl,
        `attribute vec2 a_pos;attribute float a_size;attribute float a_g;uniform vec2 u_res;uniform float u_dpr;uniform vec2 u_off;varying float v_g;
         void main(){vec2 p=a_pos+u_off;gl_Position=vec4(p.x/u_res.x*2.-1.,1.-p.y/u_res.y*2.,0.,1.);gl_PointSize=a_size*u_dpr;v_g=a_g;}`,
        `precision mediump float;uniform vec3 u_col;uniform vec3 u_acc;uniform float u_alpha;uniform float u_force;varying float v_g;
         void main(){vec2 c=gl_PointCoord-.5;float d=length(c);if(d>.5)discard;float a=smoothstep(.5,.1,d)*u_alpha;
           vec3 col=mix(mix(u_col,u_acc,v_g),u_col,u_force);gl_FragColor=vec4(col*a,a);}`);
      if (prog) {
        gl.useProgram(prog); buf = gl.createBuffer();
        loc = { pos: gl.getAttribLocation(prog, 'a_pos'), size: gl.getAttribLocation(prog, 'a_size'), g: gl.getAttribLocation(prog, 'a_g') };
        const U = n => gl.getUniformLocation(prog, n);
        uni = { res: U('u_res'), dpr: U('u_dpr'), off: U('u_off'), col: U('u_col'), acc: U('u_acc'), alpha: U('u_alpha'), force: U('u_force') };
        gl.enable(gl.BLEND);
      }
    }
    const data = new Float32Array(COUNT * 4);

    const resize = () => {
      const r = canvas.getBoundingClientRect(); D = dpr();
      if (!r.width || !r.height) return;
      W = r.width; H = r.height; canvas.width = Math.round(W * D); canvas.height = Math.round(H * D);
      if (gl && prog) gl.viewport(0, 0, canvas.width, canvas.height);
      build();
      if (reduce || !prog) { step(99, 99); render(0); }
    };

    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(time, dt) {
      const r = canvas.getBoundingClientRect(), px = mx - r.left, py = my - r.top;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const k = ease(Math.min(1, Math.max(0, (time - p.delay) / 1.4)));
        let x = p.sx + (p.tx - p.sx) * k, y = p.sy + (p.ty - p.sy) * k;
        if (k >= 1) { x += Math.sin(time * .8 + p.ph) * p.amp; y += Math.cos(time * .7 + p.ph) * p.amp; }
        let g = 0;
        const dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          const d = Math.sqrt(d2) || 1, f = 1 - d / 150;
          x += dx / d * f * 70; y += dy / d * f * 70; g = f;
        }
        // smooth the pointer influence
        const s = Math.min(1, dt * 12);
        p.x += (x - p.x) * s; p.y += (y - p.y) * s;
        p.g = Math.max(g, p.green);
      }
    }
    const fill = (shiftBand = 0) => {
      for (let i = 0; i < P.length; i++) {
        const p = P[i], o = i * 4;
        data[o] = p.x + (shiftBand ? (p.band - .5) * shiftBand : 0); data[o + 1] = p.y; data[o + 2] = p.size * (1 + p.g * .9); data[o + 3] = p.g;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(loc.pos); gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(loc.size); gl.vertexAttribPointer(loc.size, 1, gl.FLOAT, false, 16, 8);
      gl.enableVertexAttribArray(loc.g); gl.vertexAttribPointer(loc.g, 1, gl.FLOAT, false, 16, 12);
    };
    const pass = (off, col, alpha, force) => {
      gl.uniform2f(uni.off, off, 0); gl.uniform3f(uni.col, col[0], col[1], col[2]); gl.uniform1f(uni.alpha, alpha); gl.uniform1f(uni.force, force);
      gl.drawArrays(gl.POINTS, 0, P.length);
    };
    function render(time) {
      if (!prog) return fallback();
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uni.res, W, H); gl.uniform1f(uni.dpr, D); gl.uniform3f(uni.acc, ...theme.acc);
      gl.blendFunc(...(theme.light ? [gl.ONE, gl.ONE_MINUS_SRC_ALPHA] : [gl.ONE, gl.ONE])); // additive glow on dark, plain ink on light
      const gl_ = time < glitchUntil;
      fill(gl_ ? 26 : 0);
      if (gl_) { // RGB split: magenta + green offset copies under the main cloud
        pass(7, theme.glitch, .8, 1); pass(-7, theme.acc, .8, 1);
      }
      pass(0, theme.ink, .9, 0);
    }
    function fallback() { // no WebGL: plain 2D dots
      const x = canvas.getContext('2d'); if (!x) return;
      x.setTransform(D, 0, 0, D, 0, 0); x.clearRect(0, 0, W, H);
      P.forEach(p => { x.fillStyle = `rgb(${(p.g ? theme.acc : theme.ink).map(v => Math.round(v * 255)).join(',')})`; x.fillRect(p.x, p.y, p.size, p.size); });
    }

    const glitch = time => { glitchUntil = time + .45; };
    const loop = now => {
      raf = 0; if (!visible || document.hidden) return;
      const time = (now - t0) / 1000, dt = Math.min(.05, (now - (loop.last || now)) / 1000 || .016); loop.last = now;
      mx += (ptr.x - mx) * .2; my += (ptr.y - my) * .2; if (ptr.x < -999) { mx = ptr.x; my = ptr.y; }
      if (time > 2.2 && !nextGlitch) { nextGlitch = time + 5.5; glitch(time); } // end of intro
      if (nextGlitch && time > nextGlitch) { glitch(time); nextGlitch = time + 5.5; }
      step(time, dt); render(time);
      if (readout) readout.textContent = `x ${Math.max(0, Math.round(mx - canvas.getBoundingClientRect().left))} y ${Math.max(0, Math.round(my - canvas.getBoundingClientRect().top))}`;
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduce) { t0 = t0 || performance.now(); raf = requestAnimationFrame(loop); } };
    canvas.addEventListener('pointerdown', () => { glitchUntil = (performance.now() - t0) / 1000 + .45; });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }).observe(canvas);
    new ResizeObserver(() => resize()).observe(canvas);
    document.addEventListener('visibilitychange', start);
    document.addEventListener('mglsk:fx-theme', () => { if (reduce || !prog) render(0); });
    resize(); start();
    return { glitch: () => glitch((performance.now() - t0) / 1000), count: COUNT };
  };

  /* ====================================================================
     3. TEXT: decode, glitch, clock, reveal
     ==================================================================== */
  const GLYPHS = '!<>-_\\/[]{}=+*^?#01';
  const decode = el => {
    if (reduce || !fxOn()) return;
    const real = el.dataset.text || (el.dataset.text = el.textContent);
    const start = performance.now(), dur = 250 + 22 * real.length;
    cancelAnimationFrame(el._dec);
    // the real text stays in a visually-hidden node; only a presentational copy is scrambled, so assistive tech never reads the glyphs
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = real;
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    el.replaceChildren(sr, vis);
    const f = now => {
      const p = Math.min(1, (now - start) / dur), n = Math.floor(p * real.length);
      if (p < 1) { vis.textContent = real.split('').map((ch, i) => i < n || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join(''); el._dec = requestAnimationFrame(f); }
      else el.textContent = real;
    };
    el._dec = requestAnimationFrame(f);
  };
  AK.fx.decode = decode;

  function text() {
    // clock
    const clocks = $$('[data-clock]');
    const tick = () => { const t = new Intl.DateTimeFormat('nl-BE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' }).format(new Date()); clocks.forEach(c => (c.textContent = t)); };
    if (clocks.length) { tick(); setInterval(tick, 10000); }
    // decode on hover for nav + anything marked; on reveal for headings
    $$('.nav-item .nav-label, [data-decode]').forEach(el => (el.closest('a,button') || el).addEventListener('mouseenter', () => decode(el)));
    // periodic headline glitch
    const g = $$('[data-glitch]');
    if (g.length && !reduce) setInterval(() => { if (!fxOn()) return; g.forEach(el => { el.classList.remove('glitch-now'); void el.offsetWidth; el.classList.add('glitch-now'); }); }, 5500);
    // reveal: cards fade up when scrolled into view
    $$('.main .card, .main .page-head').forEach(c => c.classList.add('reveal'));
    const targets = $$('.reveal');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('.card-head h3', e.target).forEach(decode);
      io.unobserve(e.target);
    }), { threshold: .08 });
    targets.forEach(t => io.observe(t));
  }

  /* ---------- fx toggle ---------- */
  document.addEventListener('click', e => {
    if (!e.target.closest('[data-fx-toggle]')) return;
    const off = fxOn(); if (off) root.dataset.fx = 'off'; else delete root.dataset.fx;
    localStorage.setItem('mglsk-fx', off ? 'off' : 'on');
    document.dispatchEvent(new Event('mglsk:fx'));
  });

  /* ---------- boot ---------- */
  const boot = () => {
    readTheme();
    if (!document.querySelector('.fx-scan')) {
      const a = document.createElement('div'), b = document.createElement('div');
      a.className = 'fx-scan'; b.className = 'fx-grain'; a.setAttribute('aria-hidden', 'true'); b.setAttribute('aria-hidden', 'true');
      document.body.append(a, b);
    }
    if (!document.querySelector('[data-no-field]')) dotField();
    text();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
