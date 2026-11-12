"""Shared markup for the theme controls (docs pages, examples, starter all get the same panel)."""
PRESETS = [  # name, dark-mode triplet, light-mode triplet  (keep in sync with css/tokens.css)
    ('green', '43 255 136', '0 106 46'), ('cyan', '43 220 255', '0 100 130'), ('blue', '100 150 255', '35 80 209'),
    ('violet', '176 148 255', '102 61 209'), ('magenta', '255 92 220', '169 18 129'), ('red', '255 96 110', '178 22 49'),
    ('orange', '255 159 28', '144 72 0'), ('yellow', '255 214 51', '117 88 0'),
]
SWATCHES = ''.join(
    f'<button type="button" class="swatch" data-accent-set="{n}" aria-pressed="{"true" if n == "green" else "false"}" aria-label="{n.title()}" title="{n.title()}" style="--sw-d:{d};--sw-l:{l}"></button>'
    for n, d, l in PRESETS)

PANEL = f'''<div class="theme-panel">
  <div class="stack-sm"><span class="label">Mode</span>
    <div class="segmented" role="group" aria-label="Colour mode"><button type="button" data-theme-set="light" aria-pressed="false">Light</button><button type="button" data-theme-set="dark" aria-pressed="true">Dark</button><button type="button" data-theme-set="auto" aria-pressed="false">Auto</button></div></div>
  <div class="stack-sm"><span class="label">Accent · <span data-accent-label class="text-accent">green</span></span>
    <div class="swatches" role="group" aria-label="Accent colour">{SWATCHES}<input type="color" class="swatch-input" data-accent-custom aria-label="Custom accent colour" value="#2bff88"></div></div>
</div>'''

DROPDOWN = f'''<div class="dropdown"><button class="btn btn-ghost btn-icon" data-dropdown-toggle aria-label="Theme and accent colour" aria-expanded="false"><i data-icon="palette"></i></button>
        <div class="menu menu-right theme-menu" data-keep-open>{PANEL}</div></div>'''

# runs in <head>, before first paint: applies saved mode/accent/fx so there is no flash of the wrong theme
EARLY = ("<script>(function(){try{var d=document.documentElement,l=localStorage,t=l.getItem('mglsk-theme')||'dark',a=l.getItem('mglsk-accent');"
         "d.dataset.theme=t;d.dataset.themeResolved=t==='light'||(t==='auto'&&matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';"
         "if(a){if(a.charAt(0)==='#'){var v=JSON.parse(l.getItem('mglsk-accent-vars')||'{}');for(var k in v)d.style.setProperty(k,v[k]);d.dataset.accent='custom'}else d.dataset.accent=a}"
         "if(l.getItem('mglsk-fx')==='off')d.dataset.fx='off'}catch(e){}})()</script>")
OLD_EARLY = "<script>try{if(localStorage.getItem('mglsk-fx')==='off')document.documentElement.dataset.fx='off'}catch(e){}</script>"
