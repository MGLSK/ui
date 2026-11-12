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
