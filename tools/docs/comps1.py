from registry import C
from theme_ui import PANEL

# ============================== LAYOUT ==============================
C('aspect-ratio', 'Aspect Ratio', 'Layout', 'Keeps media at a fixed ratio regardless of width.', '''
<div class="grid grid-3">
  <div class="stack-sm"><span class="comment">16 / 9</span><div class="ratio" style="--r:16/9"><div class="ratio-ph">16:9</div></div></div>
  <div class="stack-sm"><span class="comment">4 / 3</span><div class="ratio" style="--r:4/3"><div class="ratio-ph">4:3</div></div></div>
  <div class="stack-sm"><span class="comment">1 / 1</span><div class="ratio" style="--r:1/1"><div class="ratio-ph">1:1</div></div></div>
</div>
''', [('.ratio', 'Wrapper. Direct children fill it (<code>object-fit: cover</code>).'), ('--r', 'CSS variable: <code>16/9</code>, <code>4/3</code>, <code>1/1</code> …'), ('.ratio-ph', 'Striped placeholder child.')])

C('card', 'Card', 'Layout', 'Bordered surface with head, body and foot. Optional hover lift and stat variant.', '''
<div class="grid grid-3">
  <div class="card"><div class="card-head"><h3>Plain card</h3><span class="badge badge-accent">new</span></div><div class="card-body">Thin rules instead of shadows.</div><div class="card-foot"><button class="btn btn-sm">Cancel</button><button class="btn btn-primary btn-sm">Save</button></div></div>
  <div class="card card-hover"><div class="card-body stack-sm"><b>Hover card</b><span class="text-sm text-muted">Lifts, green border and a hard green shadow on hover.</span></div></div>
  <div class="card stat"><div class="stat-label"><i data-icon="dollar"></i>Revenue</div><div class="stat-value">€128.4k</div><span class="stat-delta up"><i data-icon="trend-up"></i>12.5%</span></div>
</div>
''', [('.card', 'Container.'), ('.card-head / .card-body / .card-foot', 'Sections. <code>.card-body.flush</code> removes padding (tables, code).'), ('.card-hover', 'Hover lift with hard green shadow.'), ('.stat', 'Stat tile with HUD corner brackets.')])

C('collapsible', 'Collapsible', 'Layout', 'A single show/hide region with animated height.', '''
<div class="collapsible open" style="max-width:480px;border:1px solid var(--border-strong);padding:0 var(--sp-4)">
  <button class="collapsible-trigger" aria-expanded="true">3 files changed <i data-icon="chevron-down"></i></button>
  <div class="collapsible-body"><div><ul class="list"><li class="mono text-sm">src/app.js</li><li class="mono text-sm">src/styles.css</li><li class="mono text-sm">README.md</li></ul></div></div>
</div>
''', [('.collapsible', 'Root. Toggle the <code>.open</code> class (done automatically on trigger click).'), ('.collapsible-trigger', 'Button; chevron rotates. Sets <code>aria-expanded</code>.'), ('.collapsible-body > div', 'Content wrapper (needed for the height animation).')])

C('direction', 'Direction', 'Layout', 'Right-to-left support: logical alignment and mirrored components when <code>dir="rtl"</code>.', '''
<div class="row"><div class="segmented"><button data-dir-toggle="ltr" data-dir-target="#dir-demo" aria-pressed="true">LTR</button><button data-dir-toggle="rtl" data-dir-target="#dir-demo" aria-pressed="false">RTL</button></div></div>
<div id="dir-demo" class="dir-demo stack" dir="ltr">
  <nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Projects</a></li><li aria-current="page">Settings</li></ol></nav>
  <div class="input-group"><span class="input-addon">https://</span><input class="input" value="example.com" aria-label="Website"><button class="btn">Go</button></div>
  <div class="item item-outline"><span class="item-media"><i data-icon="user"></i></span><div class="item-content"><div class="item-title">Robin B.</div><div class="item-desc">Administrator</div></div><span class="badge badge-accent">Pro</span></div>
  <label class="check"><input type="checkbox" checked><span>Remember me</span></label>
</div>
''', [('dir="rtl"', 'Set on <code>html</code> or any container. Flex/grid layouts mirror automatically.'), ('[dir=rtl] overrides', 'Select arrow, input-group radii, badge/shortcut placement, blockquote rule.'), ('[data-dir-toggle][data-dir-target]', 'Demo helper that flips <code>dir</code> on the target.')])

C('resizable', 'Resizable', 'Layout', 'Panels with draggable, keyboard-accessible handles (horizontal, vertical, nested).', '''
<div class="resizable" data-resizable="horizontal">
  <div class="resizable-panel" style="flex:0 0 35%"><b>Sidebar</b><p class="text-sm text-muted">Drag the handle, or focus it and use ← →.</p></div>
  <div class="resizable-handle"></div>
  <div class="resizable-panel" style="flex:1 1 0;padding:0">
    <div class="resizable" data-resizable="vertical" style="border:0;height:100%;min-height:220px">
      <div class="resizable-panel" style="flex:0 0 55%"><b>Editor</b></div>
      <div class="resizable-handle"></div>
      <div class="resizable-panel" style="flex:1 1 0"><b>Terminal</b><div class="mono text-sm text-muted">$ npm run build<span class="cursor">_</span></div></div>
    </div>
  </div>
</div>
''', [('[data-resizable="horizontal|vertical"]', 'Container; handles sit between <code>.resizable-panel</code> elements.'), ('.resizable-handle', 'Focusable separator. Arrow keys move 3%. Panels clamp to 10–90%.')])

C('scroll-area', 'Scroll Area', 'Layout', 'Themed scrollbars, optional edge fade, horizontal strips.', '''
<div class="grid grid-2">
  <div class="scroll-area scroll-fade" style="height:200px;padding:var(--sp-3)" role="region" aria-label="Release notes"><div class="stack-sm">
    <div class="text-sm">Release 5.1</div><div class="text-sm">Release 5.0</div><div class="text-sm">Release 4.9</div><div class="text-sm">Release 4.8</div><div class="text-sm">Release 4.7</div><div class="text-sm">Release 4.6</div><div class="text-sm">Release 4.5</div><div class="text-sm">Release 4.4</div><div class="text-sm">Release 4.3</div><div class="text-sm">Release 4.2</div><div class="text-sm">Release 4.1</div><div class="text-sm">Release 4.0</div></div></div>
  <div class="scroll-area" role="region" aria-label="Image strip"><div class="scroll-x" style="width:max-content"><div class="ratio" style="--r:4/3;width:140px"><div class="ratio-ph">01</div></div><div class="ratio" style="--r:4/3;width:140px"><div class="ratio-ph">02</div></div><div class="ratio" style="--r:4/3;width:140px"><div class="ratio-ph">03</div></div><div class="ratio" style="--r:4/3;width:140px"><div class="ratio-ph">04</div></div><div class="ratio" style="--r:4/3;width:140px"><div class="ratio-ph">05</div></div></div></div>
</div>
''', [('.scroll-area', 'Any overflow container with styled scrollbars (green thumb on hover).'), ('.scroll-fade', 'Fades the top and bottom edges.'), ('.scroll-x', 'Horizontal strip with gap.')])

C('separator', 'Separator', 'Layout', 'Horizontal, dashed, vertical and labelled dividers.', '''
<div class="stack" style="max-width:520px">
  <div>Section A</div><hr class="sep"><div>Section B</div><hr class="sep sep-dashed">
  <div class="sep-label">or continue with</div>
  <div class="row" style="height:24px"><span>Docs</span><span class="sep-v"></span><span>Blog</span><span class="sep-v"></span><span>Changelog</span></div>
</div>
''', [('.sep', 'Horizontal rule. Add <code>.sep-dashed</code> for dashed.'), ('.sep-v', 'Inline vertical divider.'), ('.sep-label', 'Divider with centred label.')])

C('sidebar', 'Sidebar', 'Layout', 'Collapsible app sidebar with groups, badges, collapsible sections and an icon-only mode.', '''
<div class="app app-embed" data-nav="">
  <aside class="sidenav">
    <a class="sidenav-brand" href="#"><span class="brand-mark"><span class="logo-mark"></span></span><span class="brand-text">Project</span></a>
    <nav class="sidenav-body">
      <div class="nav-group">Platform</div>
      <a class="nav-item" href="#" aria-current="page"><i data-icon="home"></i><span class="nav-label">Overview</span></a>
      <a class="nav-item" href="#"><i data-icon="inbox"></i><span class="nav-label">Inbox</span><span class="badge badge-accent">4</span></a>
      <details class="nav-collapsible" open>
        <summary class="nav-item"><i data-icon="folder"></i><span class="nav-label">Projects</span></summary>
        <div class="nav-sub"><a class="nav-item" href="#">Alpha</a><a class="nav-item" href="#">Beta</a><a class="nav-item" href="#">Gamma</a></div>
      </details>
      <div class="nav-group">Account</div>
      <a class="nav-item" href="#"><i data-icon="settings"></i><span class="nav-label">Settings</span></a>
    </nav>
    <div class="sidenav-foot row row-nowrap"><span class="avatar">RB</span><div class="nav-label grow text-sm fw-600">Robin B.</div></div>
  </aside>
  <header class="topbar"><button class="btn btn-ghost btn-icon" data-toggle="nav" aria-label="Toggle sidebar"><i data-icon="panel"></i></button><span class="topbar-title mono text-sm">OVERVIEW</span></header>
  <div class="main" role="region" aria-label="Sidebar preview"><p class="text-sm text-muted">Click the panel button: the sidebar collapses to icons on desktop and becomes a drawer on narrow screens.</p></div>
</div>
''', [('.app > .sidenav + .topbar + .main', 'App shell grid. Add <code>.app-embed</code> to contain it in a box.'), ('data-nav="collapsed|open"', 'On <code>.app</code>. Toggled by <code>[data-toggle="nav"]</code> (nearest <code>.app</code>).'), ('.nav-group / .nav-item / .nav-sub', 'Group label, link (<code>aria-current="page"</code> for active), nested links.'), ('details.nav-collapsible', 'Collapsible section.')], stage='')

C('typography', 'Typography', 'Layout', 'Display, headings, lead text, lists, quotes, code and inline helpers.', '''
<div class="typography">
  <div class="display">Display <span class="serif-i">title</span><span class="cursor">_</span></div>
  <h1>Heading one</h1>
  <h2>Heading two (serif)</h2>
  <h3>Heading three</h3>
  <h4>Heading four</h4>
  <p class="lead">Lead paragraph: a larger, muted intro line for the start of a section.</p>
  <p>Body text uses Archivo at 15px. It contains <a href="#">a link</a>, <strong>bold</strong>, <em>italic</em>, <code>inline code</code>, <mark>a marker</mark> and <kbd>Ctrl</kbd> + <kbd>K</kbd>.</p>
  <ul><li>Unordered list with a green prompt marker</li><li>Second item</li></ul>
  <ol><li>Ordered list</li><li>Second item</li></ol>
  <blockquote>A serif italic quote with a green rule.</blockquote>
  <p><span class="large">Large</span> · <span class="small">Small</span> · <span class="muted">Muted</span> · <span class="eyebrow">Eyebrow</span> · <span class="comment">Comment</span></p>
</div>
''', [('.typography', 'Wrapper that styles bare h1–h4, p, ul, ol, blockquote, a (max 70ch).'), ('.display / .lead / .large / .small / .muted', 'Helper classes usable anywhere.'), ('.serif-i', 'Green serif-italic accent phrase.'), ('.eyebrow / .comment', 'Mono labels (<code>// comment</code> prefix).')])


C('theming', 'Theming', 'Layout', 'Light, dark and auto modes plus eight accent colours (or any custom colour) — all driven by CSS variables and persisted.', """
<div class="grid grid-2" style="align-items:start">
  <div class="card"><div class="card-head"><h3>Controls</h3></div><div class="card-body stack">""" + PANEL + """
    <div class="row"><button class="btn btn-icon" data-theme-toggle aria-label="Toggle light / dark"><span class="ico-sun"><i data-icon="sun"></i></span><span class="ico-moon"><i data-icon="moon"></i></span></button><span class="text-sm text-muted mono">mode: <span data-theme-label>dark</span></span></div>
  </div></div>
  <div class="card"><div class="card-head"><h3>Live preview</h3></div><div class="card-body stack">
    <div class="row"><button class="btn btn-primary">Primary</button><button class="btn">Default</button><button class="btn btn-danger">Danger</button><span class="badge badge-accent">Accent</span><span class="badge badge-success badge-dot">Paid</span></div>
    <div class="progress"><span style="width:64%"></span></div>
    <input class="input" placeholder="Focus me to see the accent ring">
    <div class="alert alert-info"><i data-icon="info"></i><p>Status colours (success / warning / danger / info) stay fixed; only the accent changes.</p></div>
    <div class="segmented"><button aria-pressed="true">Daily</button><button aria-pressed="false">Weekly</button></div>
    <div id="th-chart"></div>
  </div></div>
</div>
<figure class="codeblock" data-lang="js"><figcaption><button class="btn btn-ghost btn-sm" data-copy>Copy</button></figcaption><pre><code>MGLSK.setTheme('light');          // 'light' | 'dark' | 'auto' (follows the OS live)
MGLSK.setAccent('orange');        // preset name
MGLSK.setAccent('#ff9f1c');       // any colour: made readable in both modes automatically
document.addEventListener('mglsk:theme', e =&gt; console.log(e.detail)); // { theme, resolved }</code></pre></figure>
""", [
 ('html[data-theme="light|dark|auto"]', 'Colour mode. <code>data-theme-resolved</code> (set by JS) is the actual mode the CSS keys off; without JS the page is dark.'),
 ('html[data-accent="green|cyan|blue|violet|magenta|red|orange|yellow"]', 'Accent preset. <code>custom</code> is set by <code>MGLSK.setAccent("#hex")</code>.'),
 ('MGLSK.setTheme(mode)', 'Switch mode; persisted in <code>localStorage["mglsk-theme"]</code>; fires <code>mglsk:theme</code>.'),
 ('MGLSK.setAccent(nameOrHex)', 'Preset or custom colour; persisted in <code>mglsk-accent</code>; fires <code>mglsk:accent</code>. Custom colours are lightened/darkened until they reach 4.5:1 against the dark and light surfaces.'),
 ('MGLSK.contrast(hexA, hexB)', 'WCAG contrast ratio helper.'),
 ('[data-theme-set] / [data-theme-toggle] / [data-accent-set] / input[data-accent-custom]', 'Declarative controls; state mirrored in <code>aria-pressed</code>. Wrap a popup in <code>data-keep-open</code> so clicks inside do not close the dropdown.'),
 ('--accent-rgb', 'Triplet <code>r g b</code> for the current mode — use <code>rgb(var(--accent-rgb) / .2)</code> for tints and glows. Also <code>--accent</code>, <code>--accent-soft</code>, <code>--accent-deep</code>, <code>--accent-hover</code>, <code>--on-accent</code> (text colour for accent fills).'),
 ('Neutrals & status', '<code>--bg --surface --surface-2 --surface-3 --border --border-strong --text --muted --faint</code>; <code>--success --warning --danger --info</code> with <code>-soft</code> tints; chart series <code>--s1…--s6</code> (<code>--s1</code> follows the accent).'),
 ('<head> snippet', 'Add the small inline script from <code>tools/docs/theme_ui.py</code> (<code>EARLY</code>) before the stylesheet paints to avoid a flash of the wrong theme. Every page in this kit already has it.'),
 ('Effects', 'The WebGL dot field and particle logo read the theme: green glow on dark, ink-on-light in light mode, accent-coloured highlights.'),
], script="""
  MGLSK.charts.line(document.getElementById('th-chart'), { labels: ['Mon','Tue','Wed','Thu','Fri'], height: 160, series: [{ name: 'A', data: [4,7,5,9,8] }, { name: 'B', data: [3,4,6,5,7] }] });
""")

# ============================== NAVIGATION ==============================
C('breadcrumb', 'Breadcrumb', 'Navigation', 'Path-style trail with separator variants and a collapsed middle.', '''
<ol class="breadcrumb"><li><a href="#">home</a></li><li><a href="#">projects</a></li><li aria-current="page">mglsk-ui</li></ol>
<ol class="breadcrumb chev"><li><a href="#">Home</a></li><li><a href="#">Docs</a></li><li aria-current="page">Breadcrumb</li></ol>
<ol class="breadcrumb arrow"><li><a href="#">Start</a></li><li><button class="crumb-more" aria-label="Show hidden items">…</button></li><li><a href="#">Parent</a></li><li aria-current="page">Current</li></ol>
''', [('.breadcrumb', '<code>ol</code> list; the last item gets <code>aria-current="page"</code>.'), ('.slash / .chev / .arrow', 'Separator variants.'), ('.crumb-more', 'Button for collapsed items.')])

C('command', 'Command', 'Navigation', 'Command palette: filterable groups, keyboard navigation and a Ctrl/Cmd+K dialog.', '''
<div class="row"><button class="btn" data-command-open="#cmd-dialog">Open palette <span class="kbd-group"><kbd>Ctrl</kbd><kbd>K</kbd></span></button><span class="text-sm text-muted" id="cmd-out">Pick a command…</span></div>
<div class="command" data-command style="max-width:520px">
  <div class="command-input"><i data-icon="search"></i><input placeholder="Type a command or search…" aria-label="Search commands"></div>
  <div class="command-list" role="listbox">
    <div class="command-group-label">Suggestions</div>
    <div class="command-item" data-value="Calendar"><i data-icon="calendar"></i>Calendar</div>
    <div class="command-item" data-value="Search emoji"><i data-icon="star"></i>Search emoji</div>
    <div class="command-group-label">Settings</div>
    <div class="command-item" data-value="Profile"><i data-icon="user"></i>Profile<span class="shortcut">⌘P</span></div>
    <div class="command-item" data-value="Billing"><i data-icon="dollar"></i>Billing<span class="shortcut">⌘B</span></div>
    <div class="command-item" data-value="Settings"><i data-icon="settings"></i>Settings<span class="shortcut">⌘,</span></div>
    <div class="command-empty" hidden>No results.</div>
  </div>
  <div class="command-foot"><span>↑↓ navigate</span><span>↵ run</span><span>esc close</span></div>
</div>
<dialog class="command-dialog" id="cmd-dialog" data-command-dialog>
  <div class="command" data-command>
    <div class="command-input"><i data-icon="search"></i><input placeholder="Jump to…" aria-label="Jump to"></div>
    <div class="command-list" role="listbox">
      <div class="command-group-label">Pages</div>
      <div class="command-item" data-value="Dashboard"><i data-icon="home"></i>Dashboard</div>
      <div class="command-item" data-value="Components"><i data-icon="panel"></i>Components</div>
      <div class="command-item" data-value="Settings"><i data-icon="settings"></i>Settings</div>
      <div class="command-empty" hidden>No results.</div>
    </div>
  </div>
</dialog>
''', [('.command[data-command]', 'Container with <code>.command-input input</code> and <code>.command-list</code>.'), ('.command-item[data-value]', 'Selectable row; <code>data-keywords</code> adds search terms.'), ('mglsk:command', 'Event with <code>{ value, item }</code> when an item is run (Enter or click).'), ('dialog[data-command-dialog]', 'Opens on Ctrl/Cmd+K; <code>[data-command-open="#id"]</code> opens it from a button.')],
  script='''
  document.addEventListener('mglsk:command', e => { document.getElementById('cmd-out').textContent = 'Ran: ' + e.detail.value; });
''')

C('context-menu', 'Context Menu', 'Navigation', 'Right-click (or long-press on touch) menu at the pointer.', '''
<div class="ctx-area" data-context-menu="#ctx1">Right-click here</div>
<div class="menu ctx" id="ctx1" role="menu">
  <button class="menu-item" role="menuitem"><i data-icon="arrow-up"></i>Back<span class="shortcut">⌘[</span></button>
  <button class="menu-item" role="menuitem"><i data-icon="copy"></i>Copy<span class="shortcut">⌘C</span></button>
  <button class="menu-item" role="menuitemcheckbox" aria-checked="true" data-value="bookmarks">Show bookmarks</button>
  <div class="menu-sep"></div>
  <button class="menu-item danger" role="menuitem"><i data-icon="trash"></i>Delete</button>
</div>
''', [('[data-context-menu="#id"]', 'Area that opens the referenced <code>.menu</code>.'), ('.menu.ctx', 'Menu element (positioned fixed at the pointer, kept inside the viewport).'), ('role="menuitemcheckbox|menuitemradio"', 'Items toggle <code>aria-checked</code>.')])

C('dropdown-menu', 'Dropdown Menu', 'Navigation', 'Button-triggered menu with labels, shortcuts, checkboxes, radios and a submenu.', '''
<div class="row">
  <div class="dropdown"><button class="btn" data-dropdown-toggle aria-expanded="false">Account<i data-icon="chevron-down"></i></button>
    <div class="menu" role="menu">
      <div class="menu-label">My account</div>
      <button class="menu-item" role="menuitem"><i data-icon="user"></i>Profile<span class="shortcut">⇧⌘P</span></button>
      <button class="menu-item" role="menuitem"><i data-icon="dollar"></i>Billing</button>
      <div class="menu-sub"><button class="menu-item" role="menuitem">Invite users</button>
        <div class="menu"><button class="menu-item">Email</button><button class="menu-item">Message</button><button class="menu-item">Link</button></div></div>
      <div class="menu-sep"></div>
      <button class="menu-item" role="menuitemcheckbox" aria-checked="true" data-value="status">Status bar</button>
      <button class="menu-item" role="menuitemcheckbox" aria-checked="false" data-value="panel">Activity panel</button>
      <div class="menu-sep"></div>
      <button class="menu-item danger" role="menuitem"><i data-icon="logout"></i>Sign out</button>
    </div></div>
  <div class="dropdown"><button class="btn" data-dropdown-toggle aria-expanded="false">Sort by<i data-icon="chevron-down"></i></button>
    <div class="menu" role="menu"><div class="menu-label">Order</div>
      <button class="menu-item" role="menuitemradio" aria-checked="true" data-group="s">Newest</button>
      <button class="menu-item" role="menuitemradio" aria-checked="false" data-group="s">Oldest</button>
      <button class="menu-item" role="menuitemradio" aria-checked="false" data-group="s">Name</button></div></div>
</div>
''', [('.dropdown > [data-dropdown-toggle] + .menu', 'Trigger + panel. <code>.menu-right</code> aligns right.'), ('.menu-item / .menu-label / .menu-sep', 'Items, group label, divider. <code>.danger</code> for destructive.'), ('.menu-sub', 'Submenu wrapper (opens on hover/focus).'), ('role="menuitemcheckbox|menuitemradio"', 'Toggle <code>aria-checked</code>; radios group by <code>data-group</code>.'), ('Keyboard', '↑/↓ move between items, Esc closes.')])

C('menubar', 'Menubar', 'Navigation', 'Desktop-style horizontal menu: hover-switch between menus once one is open, ←/→ between menus.', '''
<div class="menubar">
  <div class="dropdown"><button data-dropdown-toggle aria-expanded="false">File</button><div class="menu"><button class="menu-item">New tab<span class="shortcut">⌘T</span></button><button class="menu-item">New window<span class="shortcut">⌘N</span></button><div class="menu-sep"></div><button class="menu-item">Print…<span class="shortcut">⌘P</span></button></div></div>
  <div class="dropdown"><button data-dropdown-toggle aria-expanded="false">Edit</button><div class="menu"><button class="menu-item">Undo<span class="shortcut">⌘Z</span></button><button class="menu-item">Redo<span class="shortcut">⇧⌘Z</span></button><div class="menu-sep"></div><button class="menu-item">Find…</button></div></div>
  <div class="dropdown"><button data-dropdown-toggle aria-expanded="false">View</button><div class="menu"><button class="menu-item" role="menuitemcheckbox" aria-checked="true">Always show toolbar</button><button class="menu-item" role="menuitemcheckbox" aria-checked="false">Full screen</button></div></div>
  <div class="dropdown"><button data-dropdown-toggle aria-expanded="false">Help</button><div class="menu"><button class="menu-item">Docs</button><button class="menu-item">About</button></div></div>
</div>
''', [('.menubar > .dropdown', 'Each top-level entry is a dropdown. Once one is open, hovering another switches to it.'), ('Keyboard', '← / → move between top-level menus while open.')], style='min-height:220px;align-items:flex-start')

C('navigation-menu', 'Navigation Menu', 'Navigation', 'Top navigation with mega-menu panels (hover, click or keyboard).', '''
<nav aria-label="Primary" style="min-height:300px"><ul class="navmenu">
  <li><button class="navmenu-trigger" aria-expanded="false">Products<i data-icon="chevron-down"></i></button>
    <div class="navmenu-panel">
      <a class="feature" href="#"><b>MGLSK UI</b><span>A terminal-styled component kit in plain HTML.</span></a>
      <a href="#"><b>Charts</b><span>Dependency-free SVG charts.</span></a>
      <a href="#"><b>Forms</b><span>Validation, OTP, pickers.</span></a>
      <a href="#"><b>Effects</b><span>WebGL dot field and particles.</span></a>
    </div></li>
  <li><button class="navmenu-trigger" aria-expanded="false">Resources<i data-icon="chevron-down"></i></button>
    <div class="navmenu-panel"><a href="#"><b>Docs</b><span>Guides and API.</span></a><a href="#"><b>Blog</b><span>Release notes.</span></a><a href="#"><b>Support</b><span>Get help.</span></a><a href="#"><b>Status</b><span>Uptime.</span></a></div></li>
  <li><a class="navmenu-link" href="#">Pricing</a></li>
  <li><a class="navmenu-link" href="#">Contact</a></li>
</ul></nav>
''', [('.navmenu > li', 'Items. A <code>.navmenu-trigger</code> + <code>.navmenu-panel</code> pair makes a mega-menu; <code>.navmenu-link</code> is a plain link.'), ('.navmenu-panel .feature', 'Optional tall feature tile.'), ('Behaviour', 'Opens on hover (pointer devices), click or Enter; Esc closes.')])

C('pagination', 'Pagination', 'Navigation', 'Page navigation with ellipsis, compact mode and a change event.', '''
<div class="stack">
  <div class="pagination" data-pagination data-pages="12" data-page="5" id="pg1"></div>
  <div class="pagination" data-pagination data-pages="24" data-page="1"></div>
  <div class="pagination" data-pagination data-compact data-pages="8" data-page="3"></div>
  <span class="text-sm text-muted mono" id="pg-out">page: 5</span>
</div>
''', [('[data-pagination]', 'Renders itself. <code>data-pages</code>, <code>data-page</code>, <code>data-compact</code>.'), ('mglsk:page', 'Event, <code>detail</code> = new page number.'), ('MGLSK.pagination(el, {pages, page, siblings, onChange})', 'Programmatic API; returns <code>{ go(n), set(pages, page) }</code>.')],
  script='''
  document.getElementById('pg1').addEventListener('mglsk:page', e => { document.getElementById('pg-out').textContent = 'page: ' + e.detail; });
''')

C('tabs', 'Tabs', 'Navigation', 'Underline, pill and vertical tab sets with arrow-key navigation.', '''
<div data-tabs>
  <div class="tabs" role="tablist">
    <button class="tab" role="tab" id="ta1" aria-controls="tp1" aria-selected="true">Account</button>
    <button class="tab" role="tab" id="ta2" aria-controls="tp2">Password</button>
    <button class="tab" role="tab" id="ta3" aria-controls="tp3">Billing <span class="badge">2</span></button>
  </div>
  <div class="tab-panel" role="tabpanel" id="tp1">Make changes to your account here.</div>
  <div class="tab-panel" role="tabpanel" id="tp2" hidden>Change your password here.</div>
  <div class="tab-panel" role="tabpanel" id="tp3" hidden>Manage invoices and payment methods.</div>
</div>
<div data-tabs>
  <div class="tabs tabs-pill" role="tablist">
    <button class="tab" role="tab" id="tb1" aria-controls="tq1" aria-selected="true">Overview</button>
    <button class="tab" role="tab" id="tb2" aria-controls="tq2">Analytics</button>
  </div>
  <div class="tab-panel" role="tabpanel" id="tq1">Pill tabs.</div><div class="tab-panel" role="tabpanel" id="tq2" hidden>Analytics panel.</div>
</div>
''', [('[data-tabs]', 'Container; wires every <code>[role=tab]</code> to its <code>[role=tabpanel]</code> via <code>aria-controls</code>.'), ('.tabs / .tabs-pill', 'Underline or pill style.'), ('Keyboard', '← → Home End; roving tabindex.')])
