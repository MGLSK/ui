#!/usr/bin/env python3
"""Generates the two top-level pages of the documentation site: index.html (landing) and usage.html (usage guide).
Component pages come from build.py. `npm run build:site` assembles everything for GitHub Pages."""
import html, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from theme_ui import DROPDOWN, EARLY

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
LOGO = re.search(r' d="([^"]+)"', open(os.path.join(ROOT, 'img', 'logo_mglsk.svg')).read()).group(1)

def code(lang, src):
    return f'<figure class="codeblock" data-lang="{lang}"><figcaption><button class="btn btn-ghost btn-sm" data-copy>Copy</button></figcaption><pre><code>{html.escape(src.strip(chr(10)))}</code></pre></figure>'

PAGES = [('index.html', 'Home', 'home'), ('usage.html', 'Usage guide', 'file'), ('components/index.html', 'Components', 'panel'),
         ('examples/dashboard.html', 'Dashboard example', 'chart'), ('examples/settings.html', 'Settings example', 'settings'),
         ('examples/login.html', 'Login example', 'lock'), ('starter/index.html', 'Starter app', 'folder')]

def shell(title, active, body, toc=None, script=''):
    nav = ''.join(f'      <a class="nav-item" href="{h}"{" aria-current=\"page\"" if h == active else ""}><i data-icon="{i}"></i><span class="nav-label">{t}</span></a>\n' for h, t, i in PAGES)
    if toc:
        nav += '      <div class="nav-group">On this page</div>\n' + ''.join(f'      <a class="nav-item" href="#{a}"><span class="nav-label">{t}</span></a>\n' for a, t in toc)
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="MGLSK UI: a terminal-styled UI kit for web apps in plain HTML, CSS and vanilla JavaScript.">
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="css/mglsk-ui.css">
{EARLY.replace('../', '')}
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
<div class="app">
  <aside class="sidenav" id="sidenav">
    <a class="sidenav-brand" href="index.html"><span class="brand-mark"><span class="logo-mark"></span></span><span class="brand-text">MGLSK UI</span></a>
    <nav class="sidenav-body" aria-label="Documentation">
{nav}    </nav>
    <div class="sidenav-foot text-xs text-muted nav-label">Proprietary · all rights reserved</div>
  </aside>
  <div class="nav-backdrop"></div>
  <header class="topbar">
    <button class="btn btn-ghost btn-icon" data-toggle="nav" aria-label="Toggle navigation"><i data-icon="menu"></i></button>
    <a class="btn btn-ghost btn-sm" href="usage.html">Usage</a><a class="btn btn-ghost btn-sm" href="components/index.html">Components</a><a class="btn btn-ghost btn-sm" href="examples/dashboard.html">Examples</a>
    <div class="topbar-actions">
      {DROPDOWN.replace('../', '')}
      <button class="btn btn-ghost btn-sm" data-fx-toggle aria-label="Toggle CRT effects">CRT</button>
    </div>
  </header>
{body}
</div>
<script src="js/icons.js"></script>
<script src="js/theme.js"></script>
<script src="js/core.js"></script>
<script src="js/charts.js"></script>
<script src="js/forms.js"></script>
<script src="js/overlays.js"></script>
<script src="js/display.js"></script>
<script src="js/a11y.js"></script>
<script src="js/fx.js"></script>
{script}
</body></html>
'''

# ------------------------------------------------------------------ landing
SHOTS = [('dashboard-dark', 'Dashboard', 'examples/dashboard.html'), ('settings', 'Settings', 'examples/settings.html'), ('login', 'Login', 'examples/login.html'),
         ('network', 'Network graph', 'components/network.html'), ('data-table', 'Data table', 'components/data-table.html'), ('theming', 'Theming', 'components/theming.html')]
cards = ''.join(f'<a class="card card-hover" href="{h}" style="color:inherit"><img src="docs/screenshots/{n}.png" alt="Screenshot: {t}" loading="lazy" style="width:100%;display:block;border-bottom:1px solid var(--border)"><div class="card-body"><b class="mono" style="text-transform:uppercase;font-size:.8rem">{t}</b></div></a>' for n, t, h in SHOTS)

landing = f'''  <main class="main" id="main" tabindex="-1">
    <section class="hero" style="display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:var(--sp-6);align-items:center">
      <div class="stack-lg">
        <span class="eyebrow">// terminal-styled ui kit</span>
        <h1 tabindex="-1" style="font-size:clamp(2.4rem,5vw,4.2rem)">Interfaces with a <span class="serif-i">signal</span><span class="cursor">_</span></h1>
        <p class="lead">Dashboards, forms, overlays, charts and an isometric network graph, in plain HTML, CSS and vanilla JavaScript. Themeable, accessible, no framework.</p>
        <div class="row"><a class="btn btn-primary" href="usage.html">Read the usage guide →</a><a class="btn" href="components/index.html">Browse components</a><a class="btn" href="examples/dashboard.html">Open the dashboard</a></div>
      </div>
      <div><div class="sigil" style="height:clamp(220px,32vw,380px);margin:24px"><canvas id="logo" aria-hidden="true"></canvas><span class="mid"></span><b></b></div><div class="hud"><span>mark.svg</span><span id="ro">x 0 y 0</span></div></div>
    </section>

    <div class="stack-sm"><span class="eyebrow">// examples</span><h2>See it in use</h2></div>
    <div class="grid grid-auto" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">{cards}</div>

    <div class="stack-sm"><span class="eyebrow">// quick start</span><h2>Two files and you are running</h2></div>
    {code('html', """<link rel="stylesheet" href="assets/css/mglsk-ui.min.css">
<script src="assets/js/mglsk-ui.min.js"></script>   <!-- end of <body> -->""")}
    <p class="text-sm text-muted">Copy <a href="starter/index.html">the starter</a> or <code>dist/</code> into your project. More in the <a href="usage.html">usage guide</a>.</p>

    <div class="features" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:var(--sp-4)">
      <div class="card"><div class="card-body stack-sm"><span class="eyebrow">68 components</span><b>Everything an app needs</b><span class="text-sm text-muted">Tables, forms, dialogs, command palette, calendar, charts, chat scroller, agent trace.</span></div></div>
      <div class="card"><div class="card-body stack-sm"><span class="eyebrow">theming</span><b>Light, dark, auto and 8 accents</b><span class="text-sm text-muted">Switch at runtime or bring any colour; every pair is contrast-checked.</span></div></div>
      <div class="card"><div class="card-body stack-sm"><span class="eyebrow">a11y</span><b>WCAG 2.2 AA target</b><span class="text-sm text-muted">0 axe violations across all pages in both themes, plus a keyboard suite.</span></div></div>
      <div class="card"><div class="card-body stack-sm"><span class="eyebrow">dependency-free</span><b>CSS-first, declarative JS</b><span class="text-sm text-muted">Behaviour hangs off <code>data-</code> attributes. No build step required.</span></div></div>
    </div>
  </main>'''
open(os.path.join(ROOT, 'index.html'), 'w').write(shell('MGLSK UI: terminal-styled UI kit', 'index.html', landing, script=f'''<script>
  MGLSK.fx.particles(document.getElementById('logo'), {{ path: {LOGO!r}, viewBox: [1024, 1024] }}, {{ readout: document.getElementById('ro') }});
</script>'''))

# ------------------------------------------------------------------ usage guide
def sec(i, title, *parts):
    return f'<section class="card" id="{i}"><div class="card-head"><h2>{title}</h2></div><div class="card-body stack-lg">{"".join(parts)}</div></section>\n'
def p(s): return f'<p>{s}</p>'
def tbl(head, rows):
    return '<div class="table-wrap"><table class="table table-compact"><thead><tr>' + ''.join(f'<th>{h}</th>' for h in head) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows) + '</tbody></table></div>'

S = []
S.append(sec('install', 'Install', p('Copy <a href="starter/index.html">starter/</a> (it carries its own <code>assets/</code>) or copy <code>dist/</code> into your project, then link two files. Fonts are referenced as <code>../fonts/…</code> from the stylesheet, so keep <code>css/</code> and <code>fonts/</code> as siblings.'),
  code('html', '<link rel="stylesheet" href="assets/css/mglsk-ui.min.css">\n<script src="assets/js/mglsk-ui.min.js"></script>   <!-- end of <body> -->'),
  p('From npm (private package, authenticate first):'),
  code('bash', 'npm install @mglsk/ui'),
  code('js', "import '@mglsk/ui/css';   // dist/css/mglsk-ui.min.css\nimport '@mglsk/ui';       // dist/js/mglsk-ui.min.js, defines window.MGLSK")))
S.append(sec('page', 'A minimal page', p('Every page uses the same shell: a skip link, an <code>.app</code> wrapper, a <code>.sidenav</code>, a <code>.topbar</code> and one <code>main</code>. Start from the <a href="starter/index.html">starter</a> or copy any <a href="examples/dashboard.html">example</a>.'),
  code('html', '''<body>
<a class="skip-link" href="#main">Skip to main content</a>
<div class="app">
  <aside class="sidenav">…</aside>
  <header class="topbar">…</header>
  <main class="main" id="main" tabindex="-1">
    <div class="page-head"><div><h1>Title</h1><p>// subtitle</p></div></div>
    <section class="card"><div class="card-head"><h2>Card</h2></div><div class="card-body">…</div></section>
  </main>
</div>'''),
  p('Use one <code>h1</code>, then <code>h2</code> card titles, and keep the landmarks. The <a href="components/index.html">component pages</a> show live markup you can copy for every piece.')))
S.append(sec('how', 'How it works', '<ul class="stack-sm"><li><b>CSS-first.</b> Components are classes (<code>.btn</code>, <code>.card</code>, <code>.table</code>…). Most work with no JavaScript.</li><li><b>Declarative JS.</b> Behaviour attaches through <code>data-</code> attributes and initialises on load.</li><li><b>Icons.</b> <code>&lt;i data-icon="home"&gt;&lt;/i&gt;</code> becomes an inline SVG; add your own to <code>MGLSK.icons</code>.</li><li><b>Dynamic markup.</b> After you inject HTML call <code>MGLSK.init(root)</code> so behaviour attaches to the new nodes.</li></ul>',
  tbl(['Attribute', 'Does'], [['<code>data-modal-open="#id"</code> / <code>data-modal-close</code>', 'Open / close a <code>&lt;dialog&gt;</code> (focus is trapped and restored).'], ['<code>data-select</code>, <code>data-combobox</code>', 'Custom select and filterable combobox (keyboard + ARIA).'], ['<code>data-tabs</code>, <code>data-accordion</code>', 'Tabs with roving tabindex; accordion over <code>&lt;details&gt;</code>.'], ['<code>data-calendar</code>, <code>data-datepicker</code>', 'Month grid, single or range; date picker popover.'], ['<code>data-sortable</code>, <code>data-filter-table</code>, <code>data-check-all</code>', 'Table sort, filter and select-all.'], ['<code>data-validate</code>', 'Form validation with inline errors; the first error takes focus.'], ['<code>data-tip</code>, <code>data-popover-toggle</code>, <code>data-dropdown-toggle</code>', 'Tooltip, popover, dropdown menu.'], ['<code>data-theme-set</code>, <code>data-accent-set</code>, <code>data-fx-toggle</code>', 'Theme, accent and CRT-effects controls.']])))
S.append(sec('theming', 'Theming', p('Mode and accent are runtime switches, no rebuild. Everything is driven by CSS variables; the accent is stored as an <code>r g b</code> triplet so tints and glows can be derived.'),
  code('js', "MGLSK.setTheme('light');      // 'light' | 'dark' | 'auto' (follows the OS live)\nMGLSK.setAccent('orange');    // green | cyan | blue | violet | magenta | red | orange | yellow\nMGLSK.setAccent('#ff9f1c');   // any colour, adjusted until it is >= 4.5:1 in both modes"),
  p('Choices persist in <code>localStorage</code> (<code>mglsk-theme</code>, <code>mglsk-accent</code>). To avoid a flash of the wrong theme, every page carries a small inline script in <code>&lt;head&gt;</code>; copy it from any page here. Brand overrides go after the stylesheet:'),
  code('css', ':root                             { --accent-d: 255 159 28; --accent-l: 160 80 0; }  /* default accent, dark / light mode */\nhtml[data-theme-resolved="light"] { --bg: #faf7f2; }                                 /* tweak a neutral in one mode */'),
  tbl(['Token', 'Use'], [['<code>--accent-rgb</code>, <code>--accent</code>, <code>--on-accent</code>', 'Accent for the current mode; <code>rgb(var(--accent-rgb) / .2)</code> for tints; readable text on an accent fill.'], ['<code>--bg --surface --surface-2 --border --text --muted</code>', 'Neutrals.'], ['<code>--success --warning --danger --info</code>', 'Status colours, independent of the accent.'], ['<code>--s1…--s6</code>', 'Chart series; <code>--s1</code> follows the accent.']]),
  p('See the live <a href="components/theming.html">theming page</a>.')))
S.append(sec('forms', 'Forms and validation', p('Wrap a form in <code>data-validate</code>. Controls are checked on submit and on blur; invalid controls get <code>aria-invalid</code> and an error linked by <code>aria-describedby</code>, and the first error takes focus. Always use a real <code>&lt;label&gt;</code>.'),
  code('html', '''<form data-validate novalidate>
  <div class="field">
    <label class="label" for="mail">Email <span class="req">*</span></label>
    <input class="input" id="mail" type="email" required>
    <span class="hint">We never share your address.</span>
    <span class="error-text"></span>
  </div>
  <button class="btn btn-primary">Send</button>
</form>'''),
  p('Live examples: <a href="components/field.html">Field</a>, <a href="components/select.html">Select</a>, <a href="components/date-picker.html">Date picker</a>, <a href="components/input-otp.html">OTP</a>, <a href="examples/settings.html">Settings page</a>.')))
S.append(sec('overlays', 'Dialogs, toasts and menus', p('Dialogs use the native <code>&lt;dialog&gt;</code>; toasts and confirms are promise-based helpers.'),
  code('html', '''<button class="btn" data-modal-open="#dlg">Edit</button>
<dialog class="modal" id="dlg">
  <div class="modal-head"><h3>Edit profile</h3><button class="btn btn-ghost btn-icon btn-sm" data-modal-close aria-label="Close"><i data-icon="x"></i></button></div>
  <div class="modal-body">…</div>
  <div class="modal-foot"><button class="btn" data-modal-close>Cancel</button><button class="btn btn-primary">Save</button></div>
</dialog>'''),
  code('js', "MGLSK.toast({ title: 'Saved', message: 'Your changes are live.', type: 'success' });\n\nif (await MGLSK.confirm({ title: 'Delete order?', message: 'This cannot be undone.', confirmText: 'Delete', danger: true })) {\n  // …\n}")))
S.append(sec('charts', 'Charts and the network graph', p('Dependency-free SVG charts that follow the theme, re-render on resize and ship a hidden data table for screen readers.'),
  code('js', "MGLSK.charts.line(el,  { labels: ['Jan', 'Feb', 'Mar'], series: [{ name: 'Revenue', data: [7200, 8100, 7800] }] });\nMGLSK.charts.bar(el,   { labels, series, stacked: true });\nMGLSK.charts.donut(el, { items: [{ label: 'Direct', value: 820 }, { label: 'Search', value: 540 }], center: 'Orders' });\nMGLSK.charts.spark(el, { data: [3, 4, 3, 5, 6] });"),
  p('The <a href="components/network.html">network graph</a> draws nodes as isometric cubes on a floor grid, joined by animated data links. Hover or focus a node to light up its neighbours; select with click or Enter.'),
  code('js', '''MGLSK.charts.network(el, {
  title: 'Infrastructure topology',
  nodes: [
    { id: 'lb',  label: 'Gateway', group: 'Edge',    x: 0, y: 2, status: 'ok' },
    { id: 'api', label: 'api-01',  group: 'Compute', x: 2, y: 1, status: 'warn' },
    { id: 'db',  label: 'DB',      group: 'Data',    x: 4, y: 2, status: 'ok', size: 1.2 },
    { id: 'siem',label: 'SIEM',    group: 'Security',x: 1, y: 2, z: 1.8 },   // z lifts a node onto a floating layer
  ],
  links: [{ from: 'lb', to: 'api' }, { from: 'api', to: 'db', status: 'down' }],
});
el.addEventListener('mglsk:network', e => console.log(e.detail.id, e.detail.selected));'''),
  tbl(['Option', 'Meaning'], [['<code>nodes[]</code>', '<code>{id, label, x, y, z, group, status, size}</code>; <code>status</code> is <code>ok | warn | danger</code>.'], ['<code>links[]</code>', '<code>{from, to, status}</code>; <code>"down"</code> draws a red dashed link with no traffic.'], ['<code>routing</code>', '<code>"ortho"</code> (default, along the grid axes) or <code>"straight"</code>.'], ['<code>colors</code>', 'Map a group to a colour slot 1–6; default is order of first appearance.'], ['<code>height</code>', 'Fixed height in px; automatic (max 520) when omitted.']])))
S.append(sec('api', 'JavaScript API', tbl(['Call', 'Purpose'], [['<code>MGLSK.toast({ title, message, type, timeout, action })</code>', 'Toast notification.'], ['<code>MGLSK.confirm({ title, message, confirmText, danger })</code>', 'Promise-based confirm dialog.'], ['<code>MGLSK.charts.line / bar / donut / spark / network(el, opts)</code>', 'SVG charts.'], ['<code>MGLSK.calendar(el, opts)</code>, <code>MGLSK.pagination(el, opts)</code>', 'Programmatic calendar and pagination.'], ['<code>MGLSK.paginate(table, perPage, pager)</code>', 'Table pagination; returns <code>{ draw, setPerPage }</code>.'], ['<code>MGLSK.scroller(el)</code>', 'Chat scroller: <code>append(node)</code>, <code>toEnd()</code>.'], ['<code>MGLSK.highlight(src, lang)</code>', 'Code highlighter (returns HTML).'], ['<code>MGLSK.fx.particles(canvas, { text | path, viewBox }, opts)</code>', 'WebGL particle logo.'], ['<code>MGLSK.setTheme(mode)</code>, <code>MGLSK.setAccent(colour)</code>', 'Theme and accent.'], ['<code>MGLSK.init(root)</code>', 'Re-scan markup after DOM changes.']]),
  p('Events bubble from the component: <code>mglsk:calendar</code>, <code>mglsk:otp</code>, <code>mglsk:page</code>, <code>mglsk:command</code>, <code>mglsk:toggle</code>, <code>mglsk:network</code>.')))
S.append(sec('fx', 'Effects and motion', p('The dot field, scanlines and grain are decorative. Put <code>data-fx="off"</code> on <code>&lt;html&gt;</code> to disable them (the <code>[data-fx-toggle]</code> button does this and remembers it), or add <code>data-no-field</code> anywhere on a page to keep the scanlines but skip the WebGL field. <code>prefers-reduced-motion</code> stops animation and renders a single static WebGL frame. Without WebGL the dot field is skipped and the particle logo falls back to 2D dots.')))
S.append(sec('a11y', 'Accessibility', p('Built to WCAG 2.2 AA and re-checked on every test run: axe-core finds 0 violations on every page in both themes, plus a keyboard and behaviour suite (focus management, ARIA state, live regions, 320 px reflow, forced colours). Not yet verified: manual screen-reader testing, Firefox and Safari. The per-component keyboard map and the author checklist are in <code>ACCESSIBILITY.md</code> in the repository.'),
  '<ul class="stack-sm"><li>Label every control with a <code>&lt;label&gt;</code> or <code>aria-label</code>; placeholders are not labels.</li><li>Keep one <code>h1</code>, then <code>h2</code>; keep the skip link and landmarks.</li><li>Give icon-only buttons an <code>aria-label</code>; give dialogs a heading.</li><li>Never remove focus outlines; do not hide information in tooltips.</li></ul>'))
S.append(sec('support', 'Browser support', p('Uses <code>&lt;dialog&gt;</code>, <code>:has()</code>, <code>color-mix()</code>, CSS <code>mask</code>, <code>scroll-snap</code> and WebGL 1: roughly Chrome/Edge 111+, Safari 16.4+ and Firefox 121+. Only Chromium has been tested so far.')))
S.append(sec('licence', 'Licence', p('Proprietary: all rights reserved. The kit may not be used, copied, modified or shared without a written agreement with MGLSK. The bundled fonts (Archivo, Instrument Serif, JetBrains Mono) are licensed to everyone under the SIL OFL 1.1.')))

TOC = [('install', 'Install'), ('page', 'A minimal page'), ('how', 'How it works'), ('theming', 'Theming'), ('forms', 'Forms and validation'), ('overlays', 'Dialogs, toasts, menus'), ('charts', 'Charts and network'), ('api', 'JavaScript API'), ('fx', 'Effects and motion'), ('a11y', 'Accessibility'), ('support', 'Browser support'), ('licence', 'Licence')]
usage = f'''  <main class="main" id="main" tabindex="-1">
    <div class="page-head"><div><nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="index.html">home</a></li><li aria-current="page">usage</li></ol></nav><h1 data-glitch>Usage <span class="serif-i">guide</span><span class="cursor">_</span></h1><p>// install, theme, wire up and ship</p></div></div>
{"".join(S)}  </main>'''
open(os.path.join(ROOT, 'usage.html'), 'w').write(shell('Usage guide · MGLSK UI', 'usage.html', usage, toc=TOC))
print('site pages built: index.html, usage.html')
