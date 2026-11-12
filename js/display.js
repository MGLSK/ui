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
