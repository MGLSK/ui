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
