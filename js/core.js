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
