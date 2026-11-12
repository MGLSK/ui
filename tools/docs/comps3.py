from registry import C

# ============================== OVERLAYS ==============================
C('alert-dialog', 'Alert Dialog', 'Overlays', 'Modal that interrupts for a critical confirmation: no backdrop dismiss, no Esc — an explicit choice is required.', '''
<div class="row"><button class="btn btn-danger" data-modal-open="#ad1">Delete project…</button><button class="btn" id="ad-js">Promise API</button><span class="mono text-sm text-muted" id="ad-out"></span></div>
<dialog class="modal modal-sm alertdialog" id="ad1" role="alertdialog" aria-labelledby="ad1-t" aria-describedby="ad1-d" data-static>
  <div class="modal-body"><span class="ad-icon"><i data-icon="alert"></i></span><div><h3 id="ad1-t">Delete this project?</h3><p id="ad1-d" class="text-sm text-muted">This permanently removes the project and its 14 deployments. This action cannot be undone.</p></div></div>
  <div class="modal-foot"><button class="btn" data-modal-close autofocus>Cancel</button><button class="btn btn-danger" data-modal-close id="ad1-ok">Delete</button></div>
</dialog>
''', [('dialog.alertdialog[data-static]', '<code>role="alertdialog"</code>; backdrop click and Esc do not close it.'), ('MGLSK.confirm({title, message, confirmText, danger})', 'Promise-based variant that builds the dialog for you; resolves <code>true/false</code>.')],
  script='''
  document.getElementById('ad1-ok').onclick = () => (document.getElementById('ad-out').textContent = 'Deleted ✓');
  document.getElementById('ad-js').onclick = async () => { const ok = await MGLSK.confirm({ title: 'Discard draft?', message: 'Unsaved changes will be lost.', confirmText: 'Discard', danger: true }); document.getElementById('ad-out').textContent = ok ? 'Discarded' : 'Kept'; };
''')

C('dialog', 'Dialog', 'Overlays', 'Modal dialog on the native <code>&lt;dialog&gt;</code> element: focus trap, Esc and backdrop close, four sizes.', '''
<div class="row"><button class="btn" data-modal-open="#dlg1">Edit profile</button><button class="btn" data-modal-open="#dlg2">Large (scrolling)</button></div>
<dialog class="modal" id="dlg1">
  <form method="dialog" data-validate data-demo>
    <div class="modal-head"><h3>Edit profile</h3><button type="button" class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div>
    <div class="modal-body stack"><div class="field"><label class="label" for="dl-n">Name</label><input class="input" id="dl-n" value="Robin B." required></div><div class="field"><label class="label" for="dl-u">Username</label><input class="input" id="dl-u" value="robin"></div></div>
    <div class="modal-foot"><button type="button" class="btn" data-modal-close>Cancel</button><button class="btn btn-primary">Save changes</button></div>
  </form>
</dialog>
<dialog class="modal modal-lg" id="dlg2">
  <div class="modal-head"><h3>Terms of service</h3><button class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div>
  <div class="modal-body stack" style="max-height:50vh"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>
  <div class="modal-foot"><button class="btn" data-modal-close>Decline</button><button class="btn btn-primary" data-modal-close>Accept</button></div>
</dialog>
''', [('dialog.modal', 'Sizes: default 520px, <code>.modal-sm</code>, <code>.modal-lg</code>, <code>.modal-xl</code>.'), ('[data-modal-open="#id"] / [data-modal-close]', 'Open / close buttons. Clicking the backdrop or pressing Esc also closes.'), ('.modal-head / .modal-body / .modal-foot', 'Sections (head shows the three window lights).')])

C('drawer', 'Drawer', 'Overlays', 'Bottom drawer with a grab handle — drag it down to dismiss (mobile-style).', '''
<button class="btn" data-modal-open="#dr1">Open drawer</button>
<dialog class="drawer-bottom" id="dr1">
  <span class="drawer-handle" aria-hidden="true"></span>
  <div class="drawer-body stack">
    <div><div class="drawer-title">Move goal</div><p class="text-sm text-muted">Set your daily activity goal.</p></div>
    <div class="row between"><button class="btn btn-icon" aria-label="Decrease"><i data-icon="plus" style="transform:rotate(45deg)"></i></button><div style="text-align:center"><div class="display" style="font-size:3.4rem">350</div><div class="eyebrow">calories / day</div></div><button class="btn btn-icon" aria-label="Increase"><i data-icon="plus"></i></button></div>
    <div class="row"><button class="btn btn-primary grow" data-modal-close>Submit</button><button class="btn grow" data-modal-close>Cancel</button></div>
  </div>
</dialog>
''', [('dialog.drawer-bottom', 'Native dialog anchored to the bottom.'), ('.drawer-handle', 'Drag down more than ~120px to dismiss.'), ('Sheet', 'For side/top panels see Sheet.')])

C('hover-card', 'Hover Card', 'Overlays', 'Rich preview shown on hover or keyboard focus, with a short delay.', '''
<div class="hovercard-root"><a href="#" class="mono">@mglsk</a>
  <div class="hovercard" role="tooltip"><div class="row row-nowrap" style="align-items:flex-start"><span class="avatar avatar-lg">AK</span><div class="stack-sm"><b class="mono">@mglsk</b><span class="text-sm text-muted">Terminal-styled UI components in plain HTML, CSS and a little JS.</span><span class="text-xs text-faint mono">JOINED NOVEMBER 2026</span></div></div></div>
</div>
''', [('.hovercard-root > .hovercard', 'Card appears on <code>:hover</code> / <code>:focus-within</code> after 350ms (CSS only).'), ('.hovercard-root.left', 'Align to the right edge.')], style='min-height:200px;align-content:start')

C('popover', 'Popover', 'Overlays', 'Click-triggered floating panel with a form — four placements.', '''
<div class="row">
  <div class="popover-root"><button class="btn" data-popover-toggle aria-expanded="false">Dimensions</button>
    <div class="popover" role="dialog" aria-label="Dimensions"><div class="popover-title">Dimensions</div><div class="stack-sm"><div class="field"><label class="label" for="pp-w">Width</label><input class="input input-sm" id="pp-w" value="100%"></div><div class="field"><label class="label" for="pp-h">Height</label><input class="input input-sm" id="pp-h" value="25px"></div></div></div></div>
  <div class="popover-root"><button class="btn" data-popover-toggle>Top</button><div class="popover" data-placement="top">Opens above the trigger.</div></div>
  <div class="popover-root"><button class="btn" data-popover-toggle>Right</button><div class="popover" data-placement="right">Opens to the right.</div></div>
  <div class="popover-root"><button class="btn" data-popover-toggle>Bottom end</button><div class="popover" data-placement="bottom-end">Aligned to the right edge.</div></div>
</div>
''', [('.popover-root > [data-popover-toggle] + .popover', 'Click toggles; Esc or an outside click closes.'), ('data-placement', '<code>bottom</code> (default), <code>top</code>, <code>right</code>, <code>left</code>, <code>bottom-end</code>.')], style='min-height:260px;align-content:start')

C('sheet', 'Sheet', 'Overlays', 'Edge-anchored panel from the right, left, top or bottom.', '''
<div class="row"><button class="btn" data-modal-open="#sh-r">Right</button><button class="btn" data-modal-open="#sh-l">Left</button><button class="btn" data-modal-open="#sh-t">Top</button><button class="btn" data-modal-open="#sh-b">Bottom</button></div>
<dialog class="sheet sheet-right" id="sh-r"><div class="modal-head"><h3>Edit profile</h3><button class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div><div class="modal-body stack grow"><div class="field"><label class="label" for="sh-n">Name</label><input class="input" id="sh-n" value="Robin B."></div><div class="field"><label class="label" for="sh-u">Username</label><input class="input" id="sh-u" value="robin"></div></div><div class="modal-foot"><button class="btn" data-modal-close>Cancel</button><button class="btn btn-primary" data-modal-close>Save</button></div></dialog>
<dialog class="sheet sheet-left" id="sh-l"><div class="modal-head"><h3>Navigation</h3><button class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div><div class="modal-body vnav grow"><a href="#" aria-current="page">Overview</a><a href="#">Projects</a><a href="#">Settings</a></div></dialog>
<dialog class="sheet sheet-top" id="sh-t"><div class="modal-head"><h3>Announcement</h3><button class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div><div class="modal-body">Version 5.1 is live: new components, new docs.</div></dialog>
<dialog class="sheet sheet-bottom" id="sh-b"><div class="modal-head"><h3>Share</h3><button class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div><div class="modal-body row"><button class="btn">Copy link</button><button class="btn">Email</button><button class="btn">Slack</button></div></dialog>
''', [('dialog.sheet.sheet-right|left|top|bottom', 'Side variants (440px wide / 70vh high max).'), ('[data-modal-open] / [data-modal-close]', 'Same open/close hooks as Dialog.')])

C('toast', 'Toast', 'Overlays', 'Transient notifications from JavaScript: variants, action button, persistent.', '''
<div class="row">
  <button class="btn" id="t-def">Default</button><button class="btn" id="t-ok">Success</button><button class="btn" id="t-warn">Warning</button><button class="btn btn-danger" id="t-err">Danger</button><button class="btn" id="t-act">With action</button><button class="btn" id="t-sticky">Persistent</button>
</div>
''', [('MGLSK.toast({ title, message, type, timeout, action })', '<code>type</code>: <code>success | warning | danger</code> (default accent). <code>timeout: 0</code> keeps it. <code>action: {label, onClick}</code> adds a button. Returns the element.'), ('.toasts', 'Fixed container created on demand (bottom-right, <code>aria-live="polite"</code>).')],
  script='''
  const $ = id => document.getElementById(id);
  $('t-def').onclick = () => MGLSK.toast({ title: 'Event created', message: 'Sunday, 22 November at 9:00' });
  $('t-ok').onclick = () => MGLSK.toast({ title: 'Saved', message: 'Your changes are live.', type: 'success' });
  $('t-warn').onclick = () => MGLSK.toast({ title: 'Storage almost full', message: '92% of 10 GB used.', type: 'warning' });
  $('t-err').onclick = () => MGLSK.toast({ title: 'Upload failed', message: 'The server did not respond.', type: 'danger' });
  $('t-act').onclick = () => MGLSK.toast({ title: 'Message archived', message: 'It will be removed in 30 days.', action: { label: 'Undo', onClick: () => MGLSK.toast({ title: 'Restored', type: 'success' }) } });
  $('t-sticky').onclick = () => MGLSK.toast({ title: 'Needs attention', message: 'Dismiss me manually.', timeout: 0 });
''')

C('tooltip', 'Tooltip', 'Overlays', 'Short hint on hover/focus — attribute-based (4 positions) or rich content.', '''
<div class="row" style="gap:var(--sp-6);padding:var(--sp-4) 0">
  <button class="btn" data-tip="Top (default)">Top</button>
  <button class="btn" data-tip="Below" data-tip-pos="bottom">Bottom</button>
  <button class="btn" data-tip="To the left" data-tip-pos="left">Left</button>
  <button class="btn" data-tip="To the right" data-tip-pos="right">Right</button>
  <span class="tooltip-wrap"><button class="btn btn-icon" aria-label="Info"><i data-icon="info"></i></button><span class="tooltip-rich" role="tooltip">Rich tooltip: can hold <b style="color:var(--accent)">two lines</b> of explanatory text.</span></span>
</div>
''', [('[data-tip="text"]', 'Pure-CSS tooltip (also on <code>:focus-visible</code>).'), ('[data-tip-pos]', '<code>bottom | left | right</code> (default top).'), ('.tooltip-wrap > .tooltip-rich', 'Multi-line tooltip content.')], style='min-height:120px')

# ============================== DATA DISPLAY ==============================
C('accordion', 'Accordion', 'Data display', 'Vertically stacked sections built on <code>&lt;details&gt;</code>; optionally exclusive.', '''
<div class="grid grid-2" style="align-items:start">
  <div class="accordion"><details open><summary>Is it accessible?</summary><div class="acc-body">Yes. It uses native details/summary.</div></details><details><summary>Is it styled?</summary><div class="acc-body">Matches the terminal theme.</div></details><details><summary>Can several be open?</summary><div class="acc-body">By default, yes.</div></details></div>
  <div class="accordion" data-accordion="single"><details open><summary>Exclusive: one</summary><div class="acc-body">Opening another closes this.</div></details><details><summary>Exclusive: two</summary><div class="acc-body">Second panel.</div></details><details><summary>Exclusive: three</summary><div class="acc-body">Third panel.</div></details></div>
</div>
''', [('.accordion > details > summary + .acc-body', 'Markup.'), ('[data-accordion="single"]', 'Only one panel open at a time.')])

C('attachment', 'Attachment', 'Data display', 'File chips and thumbnails with upload progress, error state and remove.', '''
<div class="attachments">
  <div class="attachment" data-dismissible><span class="attachment-icon">PDF</span><div class="attachment-info"><span class="attachment-name">quarterly-report.pdf</span><span class="attachment-meta">2.1 MB</span></div><button class="btn btn-ghost btn-icon btn-sm" data-dismiss aria-label="Remove"><i data-icon="x"></i></button></div>
  <div class="attachment" data-state="uploading"><span class="attachment-icon">CSV</span><div class="attachment-info"><span class="attachment-name">customers-export.csv</span><span class="attachment-meta">Uploading… 64%</span></div><div class="progress"><span style="width:64%"></span></div></div>
  <div class="attachment" data-state="error"><span class="attachment-icon"><i data-icon="alert"></i></span><div class="attachment-info"><span class="attachment-name">huge-video.mov</span><span class="attachment-meta">Too large (max 25 MB)</span></div><button class="btn btn-ghost btn-sm">Retry</button></div>
  <div class="attachment attachment-thumb" data-dismissible><div class="thumb"><i data-icon="folder"></i></div><div class="attachment-info"><span class="attachment-name">photo.png</span><span class="attachment-meta">480 KB</span></div><button class="btn btn-ghost btn-icon btn-sm" data-dismiss aria-label="Remove"><i data-icon="x"></i></button></div>
</div>
''', [('.attachment', 'Chip: <code>.attachment-icon</code>, <code>.attachment-info</code> (<code>-name</code>, <code>-meta</code>).'), ('[data-state="uploading|error"]', 'Progress bar along the bottom / red state.'), ('.attachment-thumb', 'Image thumbnail card.'), ('[data-dismissible] + [data-dismiss]', 'Click removes the element.')])

C('avatar', 'Avatar', 'Data display', 'Initials or image with fallback, sizes, presence status and stacks.', '''
<div class="row" style="gap:var(--sp-5)">
  <span class="avatar avatar-sm">S</span><span class="avatar">RB</span><span class="avatar avatar-lg">LG</span>
  <span class="avatar" data-status="online">ON</span><span class="avatar" data-status="away">AW</span><span class="avatar" data-status="busy">BY</span>
  <span class="avatar"><img src="data:," alt="" onerror="this.remove()">FB</span>
  <span class="avatar-stack"><span class="avatar">AB</span><span class="avatar">CD</span><span class="avatar">EF</span><span class="avatar avatar-more">+3</span></span>
</div>
''', [('.avatar', 'Square monogram. Sizes <code>.avatar-sm</code> / <code>.avatar-lg</code>.'), ('img', 'Place an <code>img</code> inside; with <code>onerror="this.remove()"</code> the initials show as fallback.'), ('[data-status="online|away|busy"]', 'Presence dot.'), ('.avatar-stack', 'Overlapping group.')])

C('badge', 'Badge', 'Data display', 'Status labels and counts.', '''
<div class="row"><span class="badge">Default</span><span class="badge badge-accent">Accent</span><span class="badge badge-success badge-dot">Paid</span><span class="badge badge-warning badge-dot">Pending</span><span class="badge badge-danger badge-dot">Failed</span><span class="badge badge-info">Info</span><span class="badge badge-solid">3</span></div>
''', [('.badge', 'Base; variants <code>-accent -success -warning -danger -info -solid</code>.'), ('.badge-dot', 'Adds a status square.')])

C('carousel', 'Carousel', 'Data display', 'Scroll-snap slideshow with arrows, dots, keyboard, optional autoplay and multi-item layout.', '''
<div class="stack">
  <div class="carousel" data-carousel tabindex="0">
    <div class="carousel-track">
      <div class="carousel-slide"><div class="ratio" style="--r:21/9"><div class="ratio-ph">Slide 1</div></div></div>
      <div class="carousel-slide"><div class="ratio" style="--r:21/9"><div class="ratio-ph">Slide 2</div></div></div>
      <div class="carousel-slide"><div class="ratio" style="--r:21/9"><div class="ratio-ph">Slide 3</div></div></div>
      <div class="carousel-slide"><div class="ratio" style="--r:21/9"><div class="ratio-ph">Slide 4</div></div></div>
    </div>
    <button class="btn btn-icon btn-sm carousel-btn prev" aria-label="Previous"><i data-icon="chevron-left"></i></button>
    <button class="btn btn-icon btn-sm carousel-btn next" aria-label="Next"><i data-icon="chevron-right"></i></button>
    <div class="carousel-dots"></div>
  </div>
  <div class="carousel multi" data-carousel>
    <div class="carousel-track">
      <div class="carousel-slide"><div class="card"><div class="card-body">One</div></div></div><div class="carousel-slide"><div class="card"><div class="card-body">Two</div></div></div><div class="carousel-slide"><div class="card"><div class="card-body">Three</div></div></div><div class="carousel-slide"><div class="card"><div class="card-body">Four</div></div></div><div class="carousel-slide"><div class="card"><div class="card-body">Five</div></div></div>
    </div>
    <button class="btn btn-icon btn-sm carousel-btn prev" aria-label="Previous"><i data-icon="chevron-left"></i></button>
    <button class="btn btn-icon btn-sm carousel-btn next" aria-label="Next"><i data-icon="chevron-right"></i></button>
  </div>
</div>
''', [('[data-carousel]', 'Root with <code>.carousel-track</code> > <code>.carousel-slide</code>, optional <code>.carousel-btn.prev/.next</code> and <code>.carousel-dots</code>.'), ('data-autoplay="4000"', 'Autoplay (paused on hover and with reduced motion).'), ('.multi', 'Three slides per view.'), ('Keyboard', '← → when focused.')])

C('chart', 'Chart', 'Data display', 'Dependency-free SVG charts that follow the theme: line, bar (grouped / stacked), donut and sparkline.', '''
<div class="grid grid-2">
  <div class="card"><div class="card-head"><h3>Line</h3></div><div class="card-body"><div id="ch-line"></div></div></div>
  <div class="card"><div class="card-head"><h3>Bar (stacked)</h3></div><div class="card-body"><div id="ch-bar"></div></div></div>
  <div class="card"><div class="card-head"><h3>Bar (grouped)</h3></div><div class="card-body"><div id="ch-bar2"></div></div></div>
  <div class="card"><div class="card-head"><h3>Donut</h3></div><div class="card-body"><div id="ch-donut"></div></div></div>
</div>
<div class="row" style="gap:var(--sp-6)"><div style="width:160px;height:40px" id="ch-sp1"></div><div style="width:160px;height:40px" id="ch-sp2"></div></div>
''', [('MGLSK.charts.line(el, {labels, series:[{name,data}], area, format, height})', 'Line chart; hover shows a tooltip.'), ('MGLSK.charts.bar(el, {…, stacked})', 'Grouped or stacked bars.'), ('MGLSK.charts.donut(el, {items:[{label,value}], center})', 'Donut with centre total.'), ('MGLSK.charts.spark(el, {data, color})', 'Tiny trend line.'), ('Theming', 'Colours come from <code>--s1</code>…<code>--s6</code>; charts re-render on container resize.')],
  script='''
  const C = MGLSK.charts, m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
  C.line(document.getElementById('ch-line'), { labels: m, series: [{ name: 'Users', data: [120,180,150,240,300,280,360,410] }, { name: 'Sessions', data: [90,130,140,200,220,260,300,340] }] });
  C.bar(document.getElementById('ch-bar'), { labels: m.slice(0,6), stacked: true, height: 220, series: [{ name: 'Web', data: [40,55,48,70,82,76] }, { name: 'App', data: [20,25,30,32,40,44] }] });
  C.bar(document.getElementById('ch-bar2'), { labels: m.slice(0,6), height: 220, series: [{ name: '2025', data: [30,45,40,60,70,65] }, { name: '2026', data: [42,55,52,78,90,88] }] });
  C.donut(document.getElementById('ch-donut'), { center: 'Visits', items: [{ label: 'Direct', value: 420 }, { label: 'Search', value: 310 }, { label: 'Social', value: 190 }, { label: 'Email', value: 90 }] });
  C.spark(document.getElementById('ch-sp1'), { data: [3,5,4,7,6,9,8,11] });
  C.spark(document.getElementById('ch-sp2'), { data: [9,8,9,6,7,4,5,3], color: 'var(--s2)' });
''')

C('code-block', 'Code Block', 'Data display', 'Terminal-style code with language label, syntax highlighting, line numbers, line highlight and copy.', '''
<div class="stack">
  <figure class="codeblock" data-lang="js"><figcaption><button class="btn btn-ghost btn-sm" data-copy>Copy</button></figcaption><pre><code>// Fetch and render a list
async function load(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()).items.map(i => i.name);
}</code></pre></figure>
  <figure class="codeblock lines" data-lang="php" data-highlight="3,4"><figcaption><button class="btn btn-ghost btn-sm" data-copy>Copy</button></figcaption><pre><code>public function handle(): void
{
    // lines 3-4 are highlighted
    $this->release(30);
    echo "done";
}</code></pre></figure>
  <figure class="codeblock" data-lang="bash"><figcaption><button class="btn btn-ghost btn-sm" data-copy>Copy</button></figcaption><pre><code># install and run
npm install @mglsk/ui
npm run dev -- --port 3000</code></pre></figure>
</div>
''', [('figure.codeblock[data-lang]', 'Language label in the caption bar (js, ts, php, py, sql, bash, css, html, json).'), ('.lines', 'Line numbers.'), ('data-highlight="3,4"', 'Highlight lines.'), ('[data-copy]', 'Copy button (uses the raw source).'), ('MGLSK.highlight(src, lang)', 'Tokenizer, returns HTML.')])

C('data-table', 'Data Table', 'Data display', 'Sortable, filterable, selectable, paginated table with column visibility and page size.', '''
<div class="card" id="dt1">
  <div class="table-toolbar">
    <div class="topbar-search" style="flex:0 1 260px"><i data-icon="search"></i><input class="input input-sm" id="dt-filter" data-filter-table="#dt-table" placeholder="Filter…" aria-label="Filter rows" style="padding-left:34px"></div>
    <span class="text-sm text-muted mono" id="dt-sel"></span>
    <div class="dropdown ml-auto"><button class="btn btn-sm" data-dropdown-toggle aria-expanded="false">Columns<i data-icon="chevron-down"></i></button>
      <div class="menu menu-right" id="dt-cols"><div class="menu-label">Toggle columns</div></div></div>
  </div>
  <div class="table-wrap"><table class="table table-hover" id="dt-table" data-sortable>
    <thead><tr><th class="check-col"><label class="check"><input type="checkbox" data-check-all="#dt-table" aria-label="Select all"></label></th><th data-sort>Name</th><th data-sort>Role</th><th data-sort>Status</th><th data-sort="num" class="num">Seats</th></tr></thead>
    <tbody id="dt-body"></tbody></table></div>
  <div class="table-foot"><div class="row"><span data-page-info></span><select class="select select-sm" id="dt-size" aria-label="Rows per page" style="width:auto"><option>5</option><option selected>8</option><option>12</option></select></div><div class="pagination" id="dt-pager"></div></div>
</div>
''', [('table[data-sortable] th[data-sort]', 'Click to sort; <code>data-sort="num"</code> for numeric; <code>td[data-value]</code> overrides the sort key.'), ('[data-filter-table="#id"]', 'Live text filter.'), ('[data-check-all="#id"]', 'Select-all checkbox; rows get <code>aria-selected</code>.'), ('MGLSK.paginate(table, perPage, pagerEl)', 'Pagination; returns <code>{ draw, setPerPage(n) }</code>.')],
  script='''
  const names = ['Ada','Grace','Linus','Margaret','Dennis','Barbara','Ken','Radia','Guido','Yukihiro','Anders','Brendan','Bjarne','James','Tim','Larry'];
  const roles = ['Admin','Editor','Viewer'], st = { Active: 'success', Invited: 'warning', Inactive: '' };
  const sts = Object.keys(st), body = document.getElementById('dt-body');
  names.forEach((n, i) => { const s = sts[i % 3]; body.insertAdjacentHTML('beforeend', `<tr><td class="check-col"><label class="check"><input type="checkbox" aria-label="Select ${n}"></label></td><td>${n}</td><td>${roles[(i * 2) % 3]}</td><td><span class="badge badge-dot ${st[s] ? 'badge-' + st[s] : ''}">${s}</span></td><td class="num">${(i * 7) % 20 + 1}</td></tr>`); });
  const pg = MGLSK.paginate(document.getElementById('dt-table'), 8, document.getElementById('dt-pager'));
  document.getElementById('dt-size').onchange = e => pg.setPerPage(+e.target.value);
  // column visibility
  const table = document.getElementById('dt-table'), cols = document.getElementById('dt-cols');
  [...table.querySelectorAll('thead th')].slice(1).forEach((th, k) => {
    const i = k + 1, b = document.createElement('button'); b.className = 'menu-item'; b.setAttribute('role', 'menuitemcheckbox'); b.setAttribute('aria-checked', 'true'); b.textContent = th.textContent;
    b.addEventListener('mglsk:menu', e => { table.querySelectorAll('tr').forEach(r => { r.children[i] && (r.children[i].hidden = !e.detail.checked); }); });
    cols.append(b);
  });
  document.addEventListener('change', () => { const n = body.querySelectorAll('tr[aria-selected="true"]').length; document.getElementById('dt-sel').textContent = n ? n + ' selected' : ''; });
''')

C('empty', 'Empty', 'Data display', 'Empty state with an icon, message and actions.', '''
<div class="grid grid-2">
  <div class="card"><div class="empty"><span class="empty-media"><i data-icon="inbox"></i></span><h3>No messages</h3><p>New messages will show up here.</p><div class="empty-actions"><button class="btn btn-primary btn-sm">Compose</button><button class="btn btn-sm">Refresh</button></div></div></div>
  <div class="card"><div class="empty"><span class="empty-media"><i data-icon="search"></i></span><h3>No results for “xyz”</h3><p>Try a different search term.</p><div class="empty-actions"><button class="btn btn-sm">Clear filters</button></div></div></div>
</div>
''', [('.empty', 'Centred stack.'), ('.empty-media', 'Dashed icon frame.'), ('.empty-actions', 'Button row.')])

C('item', 'Item', 'Data display', 'Versatile row: media, title, description and actions — for lists, settings and menus.', '''
<div class="grid grid-2" style="align-items:start">
  <div class="stack-sm">
    <div class="item item-outline"><span class="item-media"><i data-icon="user"></i></span><div class="item-content"><div class="item-title">Profile</div><div class="item-desc">Name, avatar and bio.</div></div><div class="item-actions"><button class="btn btn-sm">Edit</button></div></div>
    <div class="item item-muted"><span class="item-media"><i data-icon="lock"></i></span><div class="item-content"><div class="item-title">Security</div><div class="item-desc">Password and 2FA.</div></div><span class="badge badge-warning">Action needed</span></div>
    <a class="item item-outline" href="#"><span class="item-media"><i data-icon="mail"></i></span><div class="item-content"><div class="item-title">Link item</div><div class="item-desc">Whole row is a link.</div></div><i data-icon="chevron-right"></i></a>
    <div class="item item-sm item-outline"><span class="item-media"><i data-icon="file"></i></span><div class="item-content"><div class="item-title">Small</div></div></div>
  </div>
  <div class="item-group">
    <div class="item"><span class="avatar">AB</span><div class="item-content"><div class="item-title">Ada Byron</div><div class="item-desc">ada@example.com</div></div><span class="badge badge-success badge-dot">online</span></div>
    <div class="item"><span class="avatar">GH</span><div class="item-content"><div class="item-title">Grace Hopper</div><div class="item-desc">grace@example.com</div></div><span class="badge badge-dot">offline</span></div>
    <div class="item"><span class="avatar">LT</span><div class="item-content"><div class="item-title">Linus T.</div><div class="item-desc">linus@example.com</div></div><span class="badge badge-warning badge-dot">away</span></div>
  </div>
</div>
''', [('.item', 'Row: <code>.item-media</code>, <code>.item-content</code> (<code>-title</code>, <code>-desc</code>), <code>.item-actions</code>.'), ('.item-outline / .item-muted / .item-sm', 'Variants. Use <code>&lt;a class="item"&gt;</code> for links.'), ('.item-group', 'Stack of items separated by rules.')])

C('kbd', 'Kbd', 'Data display', 'Keyboard keys and shortcuts.', '''
<div class="row" style="gap:var(--sp-6)">
  <span class="kbd-group"><kbd>Ctrl</kbd><kbd>K</kbd></span>
  <span class="kbd-group"><kbd>⌘</kbd><kbd>⇧</kbd><kbd>P</kbd></span>
  <span class="text-sm">Press <kbd>Esc</kbd> to close</span>
  <span class="kbd-group"><kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd></span>
</div>
''', [('kbd', 'Styled key cap.'), ('.kbd-group', 'Groups several keys.')])

C('marker', 'Marker', 'Data display', 'Inline highlights and structural markers: new-messages line, date dividers, pins.', '''
<div class="stack">
  <p>Use <mark>highlighted text</mark>, <span class="marker marker-warn">a warning marker</span>, <span class="marker marker-danger">a danger marker</span> or <span class="marker-solid">solid tag</span> inline.</p>
  <div class="marker-line">Today</div>
  <div class="marker-line new">New messages</div>
  <div class="row"><span class="marker-pin">Pinned</span><span class="marker-pin" style="color:var(--muted)">Milestone: v5.1</span></div>
</div>
''', [('mark / .marker', 'Highlighter underline; variants <code>.marker-warn</code>, <code>.marker-danger</code>, <code>.marker-solid</code>.'), ('.marker-line', 'Divider with label (<code>.new</code> = green “unread” marker).'), ('.marker-pin', 'Diamond bullet label.')])

C('table', 'Table', 'Data display', 'Static tables: hover, striped, compact, with numeric columns and badges.', '''
<div class="card"><div class="table-wrap"><table class="table table-hover table-striped">
  <thead><tr><th>Invoice</th><th>Customer</th><th>Status</th><th class="num">Amount</th></tr></thead>
  <tbody>
    <tr><td class="mono">INV-001</td><td>Acme BV</td><td><span class="badge badge-success badge-dot">Paid</span></td><td class="num">€250.00</td></tr>
    <tr><td class="mono">INV-002</td><td>Globex</td><td><span class="badge badge-warning badge-dot">Pending</span></td><td class="num">€150.00</td></tr>
    <tr><td class="mono">INV-003</td><td>Initech</td><td><span class="badge badge-danger badge-dot">Failed</span></td><td class="num">€350.00</td></tr>
  </tbody></table></div></div>
<table class="table table-compact" style="max-width:420px"><thead><tr><th>Compact</th><th class="num">Qty</th></tr></thead><tbody><tr><td>Widget</td><td class="num">4</td></tr><tr><td>Gadget</td><td class="num">12</td></tr></tbody></table>
''', [('.table', 'Base. Add <code>.table-hover</code>, <code>.table-striped</code>, <code>.table-compact</code>.'), ('.num', 'Right-aligned tabular numerals.'), ('.table-wrap', 'Horizontal scroll container.')])

C('trace', 'Trace', 'Data display', 'Execution trace: nested steps with status, duration waterfall and expandable input/output (agents, requests, jobs).', '''
<div class="trace" id="tr1">
  <div class="trace-row open" data-status="ok"><button class="trace-head" aria-expanded="true"><span class="trace-dot"></span><span class="trace-name">agent.run<span class="trace-kind">agent</span></span><span class="trace-meta">2.41s</span><span class="trace-bar"><i style="--o:0%;--w:100%"></i></span></button>
    <div class="trace-body"><span class="lbl">input</span><pre>{ "task": "Summarise open invoices" }</pre></div>
    <div class="trace-children">
      <div class="trace-row" data-status="ok"><button class="trace-head" aria-expanded="false"><span class="trace-dot"></span><span class="trace-name">db.query<span class="trace-kind">tool</span></span><span class="trace-meta">180ms</span><span class="trace-bar"><i style="--o:4%;--w:8%"></i></span></button>
        <div class="trace-body"><span class="lbl">sql</span><pre>SELECT * FROM invoices WHERE status = 'open'</pre><span class="lbl">output</span><pre>14 rows</pre></div></div>
      <div class="trace-row" data-status="error"><button class="trace-head" aria-expanded="false"><span class="trace-dot"></span><span class="trace-name">http.get /rates<span class="trace-kind">tool</span></span><span class="trace-meta">1.20s</span><span class="trace-bar"><i style="--o:14%;--w:48%"></i></span></button>
        <div class="trace-body"><span class="lbl">error</span><pre>504 Gateway Timeout (retried 2×)</pre></div></div>
      <div class="trace-row" data-status="running"><button class="trace-head" aria-expanded="false"><span class="trace-dot"></span><span class="trace-name">llm.complete<span class="trace-kind">model</span></span><span class="trace-meta">…</span><span class="trace-bar"><i style="--o:64%;--w:36%"></i></span></button>
        <div class="trace-body"><span class="lbl">prompt</span><pre>Summarise the 14 invoices…</pre></div></div>
    </div>
  </div>
</div>
''', [('.trace > .trace-row[data-status="ok|error|running"]', 'A step; click the head to expand. Nest steps in <code>.trace-children</code>.'), ('.trace-head', 'Columns: status dot, name (+ <code>.trace-kind</code>), duration, waterfall bar.'), ('.trace-bar i', '<code>--o</code> start offset and <code>--w</code> width as % of the total run.'), ('.trace-body', 'Details (labels + <code>pre</code>).')])
