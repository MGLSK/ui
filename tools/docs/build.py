#!/usr/bin/env python3
"""Generates components/*.html from the component data modules (one page per component)."""
import html, os, re, sys, textwrap
sys.path.insert(0, os.path.dirname(__file__))
from registry import REG, GROUPS
from theme_ui import DROPDOWN, EARLY
import comps1, comps2, comps3, comps4  # noqa: F401  (registering side effects)

OUT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'components'))
os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT):
    if f.endswith('.html'): os.remove(os.path.join(OUT, f))

order = []
for g in GROUPS:
    order += sorted([c for c in REG if c['group'] == g], key=lambda c: c['title'])
assert len(order) == len(REG)

def side(active):
    h = ['''  <aside class="sidenav" id="sidenav">
    <a class="sidenav-brand" href="../examples/dashboard.html"><span class="brand-mark"><span class="logo-mark"></span></span><span class="brand-text">MGLSK UI</span></a>
    <nav class="sidenav-body" aria-label="Components">
      <a class="nav-item" href="index.html"%s><i data-icon="panel"></i><span class="nav-label">All components</span><span class="badge badge-accent">%d</span></a>''' % (' aria-current="page"' if active is None else '', len(order))]
    for g in GROUPS:
        h.append(f'      <div class="nav-group">{g}</div>')
        for c in order:
            if c['group'] != g: continue
            cur = ' aria-current="page"' if c is active else ''
            h.append(f'      <a class="nav-item" data-nav-item href="{c["slug"]}.html"{cur}><i data-icon="{ICON.get(g,"file")}"></i><span class="nav-label">{html.escape(c["title"])}</span></a>')
    h.append('''    </nav>
    <div class="sidenav-foot row row-nowrap"><span class="avatar">RB</span><div class="nav-label grow"><div class="fw-600 text-sm">Robin B.</div><div class="text-xs text-muted">Admin</div></div></div>
  </aside>
  <div class="nav-backdrop"></div>''')
    return '\n'.join(h)

ICON = {'Layout': 'panel', 'Navigation': 'menu', 'Forms': 'edit', 'Overlays': 'copy', 'Data display': 'bars', 'Feedback': 'bell', 'Chat & AI': 'mail'}

TOP = '''  <header class="topbar">
    <button class="btn btn-ghost btn-icon" data-toggle="nav" aria-label="Toggle navigation"><i data-icon="menu"></i></button>
    <div class="topbar-search"><i data-icon="search"></i><input class="input" data-search data-nav-filter placeholder="Filter components…  Ctrl K" aria-label="Filter components"></div>
    <div class="topbar-actions">
      <span class="topbar-clock"><span class="dot"></span>Hasselt <span data-clock>--:--</span></span>
      {DROPDOWN}
      <button class="btn btn-ghost btn-sm" data-fx-toggle aria-label="Toggle CRT effects" data-tip="CRT fx" data-tip-pos="bottom">CRT</button>
      <a class="btn btn-sm" href="../examples/dashboard.html">Dashboard</a>
    </div>
  </header>'''.replace('{DROPDOWN}', DROPDOWN)

HEAD = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s · MGLSK UI</title>
<link rel="icon" href="../img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../css/mglsk-ui.css">
__EARLY__
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
<div class="app">
'''.replace('__EARLY__', EARLY)
TAIL = '''</div>
<script src="../js/icons.js"></script>
<script src="../js/theme.js"></script>
<script src="../js/core.js"></script>
<script src="../js/charts.js"></script>
<script src="../js/forms.js"></script>
<script src="../js/overlays.js"></script>
<script src="../js/display.js"></script>
<script src="../js/a11y.js"></script>
<script src="../js/fx.js"></script>
<script>
  document.querySelector('[data-nav-filter]').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('[data-nav-item]').forEach(a => (a.hidden = !a.textContent.toLowerCase().includes(q)));
  });
</script>
%s
</body></html>
'''

def clean(s): return textwrap.dedent(s).strip('\n')

for i, c in enumerate(order):
    demo = clean(c['demo'])
    api = ''
    if c.get('api'):
        rows = ''.join(f'<tr><td><code>{html.escape(k)}</code></td><td>{v}</td></tr>' for k, v in c['api'])
        api = f'''    <section class="card"><div class="card-head"><h2>API</h2></div><div class="table-wrap"><table class="table table-compact"><thead><tr><th style="width:36%">Class / attribute</th><th>Description</th></tr></thead><tbody>{rows}</tbody></table></div></section>
'''
    prev = order[i - 1] if i else None; nxt = order[i + 1] if i + 1 < len(order) else None
    pn = '    <div class="row between">' + (f'<a class="btn btn-sm" href="{prev["slug"]}.html">← {html.escape(prev["title"])}</a>' if prev else '<span></span>') + (f'<a class="btn btn-sm" href="{nxt["slug"]}.html">{html.escape(nxt["title"])} →</a>' if nxt else '<span></span>') + '</div>\n'
    stage_cls = 'card-body ' + c.get('stage', 'stack')
    page = (HEAD % html.escape(c['title'])) + side(c) + '\n' + TOP + f'''
  <main class="main" id="main" tabindex="-1">
    <div class="page-head"><div><nav aria-label="Breadcrumb"><ol class="breadcrumb"><li><a href="index.html">components</a></li><li aria-current="page">{c["slug"]}</li></ol></nav><h1 data-glitch>{html.escape(c["title"])}<span class="cursor">_</span></h1><p>// {c["desc"]}</p></div><div class="page-actions"><span class="badge badge-accent">{c["group"]}</span></div></div>

    <section class="card"><div class="card-head"><h2>Preview</h2></div><div class="{stage_cls}" style="{c.get("style","")}">
{demo}
    </div></section>

    <section class="card"><div class="card-head"><h2>Markup</h2></div><div class="card-body flush"><figure class="codeblock" data-lang="html" style="border:0"><figcaption><button class="btn btn-ghost btn-sm" data-copy>Copy</button></figcaption><pre><code>{html.escape(demo)}</code></pre></figure></div></section>
{api}{pn}  </main>
''' + (TAIL % (f'<script>\n{clean(c["script"])}\n</script>' if c.get('script') else ''))
    open(f'{OUT}/{c["slug"]}.html', 'w').write(page)

# index
cards = []
for g in GROUPS:
    items = [c for c in order if c['group'] == g]
    cards.append(f'    <div class="stack-sm"><span class="eyebrow">// {g.lower()} ({len(items)})</span></div>\n    <div class="grid grid-auto">' + ''.join(
        f'<a class="card card-hover" href="{c["slug"]}.html" style="color:inherit"><div class="card-body stack-sm"><b class="mono" style="text-transform:uppercase;font-size:.8rem">{html.escape(c["title"])}</b><span class="text-sm text-muted">{c["desc"]}</span></div></a>' for c in items) + '</div>')
idx = (HEAD % 'Components') + side(None) + '\n' + TOP + f'''
  <main class="main" id="main" tabindex="-1">
    <div class="page-head"><div><nav aria-label="Breadcrumb"><ol class="breadcrumb"><li aria-current="page">components</li></ol></nav><h1 data-glitch>Component <span class="serif-i">library</span><span class="cursor">_</span></h1><p>// {len(order)} components · live preview, markup and API for each</p></div></div>
{chr(10).join(cards)}
  </main>
''' + (TAIL % '')
open(f'{OUT}/index.html', 'w').write(idx)
print(len(order), 'pages built')
