from registry import C

C('button', 'Button', 'Forms', 'Primary, default, danger, ghost and link buttons in three sizes, with icon and loading states.', '''
<div class="row"><button class="btn btn-primary">Primary</button><button class="btn">Default</button><button class="btn btn-danger">Danger</button><button class="btn btn-ghost">Ghost</button><button class="btn btn-link">Link</button><button class="btn" disabled>Disabled</button></div>
<div class="row"><button class="btn btn-sm">Small</button><button class="btn">Medium</button><button class="btn btn-lg">Large</button><button class="btn btn-icon" aria-label="Add"><i data-icon="plus"></i></button><button class="btn btn-primary"><i data-icon="download"></i>With icon</button><button class="btn btn-primary" id="btn-load">Click to load</button></div>
''', [('.btn', 'Base (outlined, mono uppercase).'), ('.btn-primary', 'Solid green, wide Archivo, hard shadow (magenta on hover, collapses on press).'), ('.btn-danger / .btn-ghost / .btn-link', 'Variants.'), ('.btn-sm / .btn-lg / .btn-icon', 'Sizes.'), ('.loading', 'Shows a spinner and disables pointer events.')],
  script='''
  document.getElementById('btn-load').onclick = e => { const b = e.currentTarget; b.classList.add('loading'); setTimeout(() => b.classList.remove('loading'), 1600); };
''')

C('button-group', 'Button Group', 'Forms', 'Joined buttons: horizontal, vertical, with a split dropdown.', '''
<div class="row">
  <span class="btn-group"><button class="btn">Day</button><button class="btn">Week</button><button class="btn">Month</button></span>
  <span class="btn-group vertical"><button class="btn">Top</button><button class="btn">Middle</button><button class="btn">Bottom</button></span>
  <span class="btn-group"><button class="btn btn-primary">Deploy</button>
    <span class="dropdown"><button class="btn btn-primary split" data-dropdown-toggle aria-label="More deploy options" aria-expanded="false"><i data-icon="chevron-down"></i></button>
      <div class="menu menu-right"><button class="menu-item">Deploy to staging</button><button class="menu-item">Schedule…</button></div></span></span>
</div>
''', [('.btn-group', 'Joins adjacent buttons (borders overlap, radii removed).'), ('.vertical', 'Stack vertically.'), ('.split', 'Narrow trailing button for a dropdown.')], style='min-height:160px;align-items:flex-start')

C('calendar', 'Calendar', 'Forms', 'Month grid with single or range selection, keyboard navigation and min/max.', '''
<div class="row" style="align-items:flex-start;gap:var(--sp-5)">
  <div data-calendar id="cal1"></div>
  <div data-calendar data-mode="range" id="cal2"></div>
</div>
<div class="mono text-sm text-muted" id="cal-out">Pick a date…</div>
''', [('[data-calendar]', 'Initialises a calendar. <code>data-mode="single|range"</code>, <code>data-value="YYYY-MM-DD"</code>, <code>data-min</code>, <code>data-max</code>.'), ('mglsk:calendar', 'Event; <code>detail</code> = <code>{ value }</code> or <code>{ start, end }</code>.'), ('MGLSK.calendar(el, opts)', 'Programmatic. Options: <code>mode, value, min, max, weekStart, footer, onChange</code>.'), ('Keyboard', 'Arrows move by day/week, PageUp/PageDown by month.')],
  script='''
  document.addEventListener('mglsk:calendar', e => { document.getElementById('cal-out').textContent = JSON.stringify(e.detail); });
''')

C('checkbox', 'Checkbox', 'Forms', 'Checked, unchecked, indeterminate and disabled — with a parent/children example.', '''
<div class="row" style="gap:var(--sp-5)">
  <label class="check"><input type="checkbox"><span>Unchecked</span></label>
  <label class="check"><input type="checkbox" checked><span>Checked</span></label>
  <label class="check"><input type="checkbox" id="cb-ind"><span>Indeterminate</span></label>
  <label class="check"><input type="checkbox" disabled><span>Disabled</span></label>
</div>
<fieldset style="max-width:320px"><legend>Select all</legend>
  <div class="stack-sm">
    <label class="check"><input type="checkbox" id="cb-all"><span>All notifications</span></label>
    <label class="check" style="margin-left:24px"><input type="checkbox" class="cb-child" checked><span>Email</span></label>
    <label class="check" style="margin-left:24px"><input type="checkbox" class="cb-child"><span>Push</span></label>
    <label class="check" style="margin-left:24px"><input type="checkbox" class="cb-child"><span>SMS</span></label>
  </div></fieldset>
''', [('label.check > input[type=checkbox] + span', 'Markup pattern.'), (':indeterminate', 'Set via JS <code>input.indeterminate = true</code>.')],
  script='''
  document.getElementById('cb-ind').indeterminate = true;
  const all = document.getElementById('cb-all'), kids = [...document.querySelectorAll('.cb-child')];
  const sync = () => { const n = kids.filter(k => k.checked).length; all.checked = n === kids.length; all.indeterminate = n > 0 && n < kids.length; };
  all.onchange = () => { kids.forEach(k => (k.checked = all.checked)); sync(); };
  kids.forEach(k => (k.onchange = sync)); sync();
''')

C('combobox', 'Combobox', 'Forms', 'Searchable select with keyboard navigation; single or multiple (chips).', '''
<div class="grid grid-2">
  <div class="field"><label class="label" for="cbx1">Framework</label>
    <div class="select-root" data-combobox>
      <div class="combo-input"><input class="input" id="cbx1" placeholder="Search framework…" autocomplete="off"><button type="button" class="combo-btn" tabindex="-1" aria-label="Toggle list"><i data-icon="chevron-down"></i></button></div>
      <div class="select-menu" hidden>
        <div class="select-option" data-value="next">Next.js</div><div class="select-option" data-value="svelte">SvelteKit</div><div class="select-option" data-value="nuxt">Nuxt</div><div class="select-option" data-value="remix">Remix</div><div class="select-option" data-value="astro">Astro</div>
        <div class="select-empty" hidden>No framework found.</div>
      </div><input type="hidden" name="framework"></div></div>
  <div class="field"><label class="label">Tags (multiple)</label>
    <div class="select-root" data-combobox data-multiple>
      <div class="combo-multi"><input placeholder="Add tag…" autocomplete="off"></div>
      <div class="select-menu" hidden>
        <div class="select-option" data-value="php" data-selected>PHP</div><div class="select-option" data-value="go">Go</div><div class="select-option" data-value="vue">Vue.js</div><div class="select-option" data-value="k8s">Kubernetes</div>
        <div class="select-empty" hidden>No tags.</div>
      </div><input type="hidden" name="tags"></div></div>
</div>
''', [('[data-combobox]', 'Root. Contains an <code>input</code>, <code>.select-menu</code> with <code>.select-option[data-value]</code> and a hidden input (value).'), ('data-multiple', 'Multi-select with chips; Backspace removes the last chip.'), ('change', 'Fires on the hidden input.'), ('Keyboard', '↑ ↓ Home End Enter Esc.')], style='min-height:260px;align-content:start')

C('date-picker', 'Date Picker', 'Forms', 'Input that opens a calendar popover — single date or range.', '''
<div class="grid grid-2" style="align-items:start">
  <div class="field"><span class="label">Date of birth</span>
    <div class="datepicker" data-datepicker><button type="button" class="select-trigger" aria-haspopup="dialog" aria-expanded="false"><span class="select-value placeholder" data-placeholder="Pick a date">Pick a date</span><i data-icon="calendar"></i></button>
      <div class="dp-panel" hidden><div data-dp-cal></div></div><input type="hidden" name="dob"></div></div>
  <div class="field"><span class="label">Date range</span>
    <div class="datepicker" data-datepicker data-mode="range"><button type="button" class="select-trigger" aria-haspopup="dialog" aria-expanded="false"><span class="select-value placeholder" data-placeholder="Pick a range">Pick a range</span><i data-icon="calendar"></i></button>
      <div class="dp-panel" hidden><div data-dp-cal></div></div><input type="hidden" name="range"></div></div>
</div>
''', [('[data-datepicker]', 'Root. <code>data-mode="single|range"</code>.'), ('.dp-panel [data-dp-cal]', 'Popover with the calendar (see Calendar).'), ('input[type=hidden]', 'Receives <code>YYYY-MM-DD</code> or <code>start/end</code>; fires <code>change</code>.')], style='min-height:420px;align-content:start')

C('field', 'Field', 'Forms', 'Label + control + hint/error wrapper; vertical, horizontal and grouped layouts with validation.', '''
<form data-validate data-demo class="stack" style="max-width:520px" novalidate>
  <div class="field"><label class="label" for="fd1">Email <span class="req">*</span></label><input class="input" id="fd1" type="email" required placeholder="you@company.be"><span class="hint">We never share your address.</span><span class="error-text"></span></div>
  <div class="field invalid"><label class="label" for="fd2">Username</label><input class="input" id="fd2" value="a"><span class="error-text">Must be at least 3 characters.</span></div>
  <div class="field field-row"><div class="field-text"><span class="label">Marketing emails</span><span class="hint">Product news, once a month.</span></div><label class="switch"><input type="checkbox" aria-label="Marketing emails"></label></div>
  <fieldset class="field-group"><legend>Notifications</legend>
    <label class="check"><input type="checkbox" checked><span>Email</span></label><label class="check"><input type="checkbox"><span>Push</span></label></fieldset>
  <div class="form-actions"><button type="reset" class="btn">Reset</button><button class="btn btn-primary">Validate</button></div>
</form>
''', [('.field', 'Vertical stack: <code>.label</code>, control, <code>.hint</code>, <code>.error-text</code>.'), ('.field.invalid / .valid', 'Show the error text / success border.'), ('.field-row', 'Horizontal layout (text left, control right).'), ('form[data-validate]', 'Native validation with inline messages; <code>data-error</code> overrides the message.')])

C('input', 'Input', 'Forms', 'Text inputs: types, states, sizes.', '''
<div class="grid grid-2">
  <div class="field"><label class="label" for="in1">Text</label><input class="input" id="in1" placeholder="Type here…"></div>
  <div class="field"><label class="label" for="in2">Email</label><input class="input" id="in2" type="email" placeholder="you@company.be"></div>
  <div class="field"><label class="label" for="in3">Password</label><input class="input" id="in3" type="password" value="secret123"></div>
  <div class="field"><label class="label" for="in4">Number</label><input class="input" id="in4" type="number" value="42"></div>
  <div class="field"><label class="label" for="in5">Disabled</label><input class="input" id="in5" value="Can't edit" disabled></div>
  <div class="field invalid"><label class="label" for="in6">Invalid</label><input class="input" id="in6" value="nope"><span class="error-text">Something is wrong.</span></div>
  <div class="field"><label class="label" for="in7">Small</label><input class="input input-sm" id="in7" placeholder="Compact"></div>
  <div class="field"><label class="label" for="in8">File</label><input class="input" id="in8" type="file"></div>
</div>
''', [('.input', 'Text-like inputs.'), ('.input-sm', 'Compact.'), ('.field.invalid / .valid', 'Border colours.')])

C('input-group', 'Input Group', 'Forms', 'Inputs with addons, buttons and icons attached.', '''
<div class="stack" style="max-width:480px">
  <div class="input-group"><span class="input-addon">https://</span><input class="input" placeholder="example.com"></div>
  <div class="input-group"><span class="input-addon">€</span><input class="input" type="number" value="100" aria-label="Amount in euro"><span class="input-addon">.00</span></div>
  <div class="input-group"><input class="input" placeholder="Search…" aria-label="Search"><button class="btn btn-primary">Search</button></div>
  <div class="input-group"><input class="input" value="mglsk-token-123" readonly aria-label="API token"><button class="btn" id="ig-copy">Copy</button></div>
</div>
''', [('.input-group', 'Flex row; first/last child get the outer radii (none here).'), ('.input-addon', 'Static text segment.')],
  script='''
  document.getElementById('ig-copy').onclick = () => MGLSK.toast({ title: 'Copied', type: 'success' });
''')

C('input-otp', 'Input OTP', 'Forms', 'One-time-code input: auto-advance, backspace, paste and an event on completion.', '''
<div class="stack">
  <div class="otp" data-otp id="otp1"><input><input><input><span class="otp-sep"></span><input><input><input></div>
  <div class="text-sm text-muted mono" id="otp-out">Enter 6 digits (try pasting “123456”).</div>
  <button class="btn btn-sm" id="otp-reset" style="align-self:flex-start">Clear</button>
</div>
''', [('[data-otp]', 'Container of single-character inputs (<code>data-otp="text"</code> for alphanumeric).'), ('mglsk:otp', 'Event with <code>{ value, complete }</code>.'), ('.otp-sep', 'Visual separator.'), ('.otp.invalid', 'Error state.')],
  script='''
  const o = document.getElementById('otp1');
  o.addEventListener('mglsk:otp', e => { document.getElementById('otp-out').textContent = e.detail.complete ? 'Code: ' + e.detail.value : 'Entered: ' + (e.detail.value || '—'); });
  document.getElementById('otp-reset').onclick = () => { o.querySelectorAll('input').forEach(i => (i.value = '')); o.querySelector('input').focus(); };
''')

C('label', 'Label', 'Forms', 'Form labels: required, optional and disabled states.', '''
<div class="stack-sm">
  <label class="label" for="lb1">Default label</label>
  <label class="label" for="lb1">Required <span class="req">*</span></label>
  <label class="label opt" for="lb1">Optional</label>
  <input class="input" id="lb1" style="max-width:320px" placeholder="Linked to the labels above">
  <label class="label disabled" for="lb2">Disabled</label>
  <input class="input" id="lb2" style="max-width:320px" value="Cannot edit" disabled>
</div>
''', [('.label', 'Mono uppercase caption.'), ('.label .req', 'Red asterisk.'), ('.label.opt', 'Appends “(optional)”.')])

C('native-select', 'Native Select', 'Forms', 'The browser select, styled: sizes, groups, multiple, disabled.', '''
<div class="grid grid-2">
  <div class="field"><label class="label" for="ns1">Country</label><select class="select" id="ns1"><option>Belgium</option><option>Netherlands</option><option>Germany</option></select></div>
  <div class="field"><label class="label" for="ns2">Grouped</label><select class="select" id="ns2"><optgroup label="Benelux"><option>Belgium</option><option>Luxembourg</option></optgroup><optgroup label="Other"><option>France</option></optgroup></select></div>
  <div class="field"><label class="label" for="ns3">Small</label><select class="select select-sm" id="ns3"><option>10 per page</option><option>25 per page</option></select></div>
  <div class="field"><label class="label" for="ns4">Disabled</label><select class="select" id="ns4" disabled><option>Locked</option></select></div>
  <div class="field"><label class="label" for="ns5">Multiple</label><select class="select" id="ns5" multiple><option selected>Laravel</option><option>Vue.js</option><option selected>Go</option><option>Django</option></select></div>
</div>
''', [('select.select', 'Native element with a custom arrow.'), ('.select-sm', 'Compact.')])

C('questionnaire', 'Questionnaire', 'Forms', 'Multi-step survey with progress, required steps, summary and a completion event.', '''
<div class="quiz" data-questionnaire style="max-width:560px">
  <div class="quiz-head"><div class="quiz-step"><span data-quiz-label>Question 1 of 3</span><span>~1 min</span></div><div class="progress"><span style="width:0"></span></div></div>
  <div class="quiz-body">
    <div data-step data-required><div class="quiz-q">What are you <span class="serif-i">building</span>?</div>
      <div class="radio-group"><label class="check radio-card"><input type="radio" name="q1" value="web"><span class="rc-body"><span class="rc-title">Web app</span><span class="rc-desc">Dashboards, portals, internal tools.</span></span></label><label class="check radio-card"><input type="radio" name="q1" value="site"><span class="rc-body"><span class="rc-title">Website</span><span class="rc-desc">Marketing or content site.</span></span></label><label class="check radio-card"><input type="radio" name="q1" value="api"><span class="rc-body"><span class="rc-title">API / integration</span><span class="rc-desc">Syncing systems.</span></span></label></div></div>
    <div data-step><div class="quiz-q">Which <span class="serif-i">stack</span>?</div>
      <div class="stack-sm"><label class="check"><input type="checkbox" value="php"><span>PHP / Laravel</span></label><label class="check"><input type="checkbox" value="js"><span>Node.js</span></label><label class="check"><input type="checkbox" value="go"><span>Go</span></label></div></div>
    <div data-step><div class="quiz-q">Anything else?</div><textarea class="textarea" placeholder="// optional"></textarea></div>
    <div data-done hidden><div class="quiz-q">Thanks<span class="cursor">_</span></div><dl class="quiz-summary" data-quiz-summary></dl><button class="btn btn-sm" data-quiz-restart>Start over</button></div>
  </div>
  <div class="quiz-foot"><button class="btn" data-quiz-back>← Back</button><button class="btn btn-primary" data-quiz-next>Next →</button></div>
</div>
''', [('[data-questionnaire]', 'Root; steps are <code>[data-step]</code> (add <code>data-required</code> to block Next until answered).'), ('[data-quiz-label] / .progress', 'Step counter and bar.'), ('[data-done] / [data-quiz-summary]', 'Completion panel and answer summary.'), ('mglsk:quiz', 'Event with the array of answers.')])

C('radio-group', 'Radio Group', 'Forms', 'Radios as a list, inline, or selectable cards.', '''
<div class="grid grid-2">
  <fieldset><legend>List</legend><div class="radio-group"><label class="check"><input type="radio" name="rg1" checked><span>Default</span></label><label class="check"><input type="radio" name="rg1"><span>Comfortable</span></label><label class="check"><input type="radio" name="rg1"><span>Compact</span></label></div></fieldset>
  <fieldset><legend>Inline</legend><div class="radio-group inline"><label class="check"><input type="radio" name="rg2" checked><span>Light</span></label><label class="check"><input type="radio" name="rg2"><span>Dark</span></label><label class="check"><input type="radio" name="rg2"><span>System</span></label></div></fieldset>
</div>
<div class="radio-cards"><label class="check radio-card"><input type="radio" name="rg3" checked><span class="rc-body"><span class="rc-title">Starter</span><span class="rc-desc">€9 / month</span></span></label><label class="check radio-card"><input type="radio" name="rg3"><span class="rc-body"><span class="rc-title">Pro</span><span class="rc-desc">€29 / month</span></span></label><label class="check radio-card"><input type="radio" name="rg3"><span class="rc-body"><span class="rc-title">Team</span><span class="rc-desc">€99 / month</span></span></label></div>
''', [('.radio-group', 'Vertical list (<code>.inline</code> for a row).'), ('.radio-card', 'Add to a <code>label.check</code> for a bordered, selectable card; wrap several in <code>.radio-cards</code>.')])

C('select', 'Select', 'Forms', 'Custom listbox select with groups, typeahead and full keyboard support.', '''
<div class="grid grid-2">
  <div class="field"><label class="label">Fruit</label>
    <div class="select-root" data-select>
      <button type="button" class="select-trigger"><span class="select-value placeholder" data-placeholder="Select a fruit">Select a fruit</span><i data-icon="chevron-down"></i></button>
      <div class="select-menu" hidden>
        <div class="select-group-label">Fruits</div>
        <div class="select-option" data-value="apple">Apple</div><div class="select-option" data-value="banana">Banana</div><div class="select-option" data-value="cherry">Cherry</div>
        <div class="select-group-label">Vegetables</div>
        <div class="select-option" data-value="carrot">Carrot</div><div class="select-option" data-value="leek" aria-disabled="true">Leek (sold out)</div>
      </div><input type="hidden" name="fruit" id="sel-hidden"></div></div>
  <div class="field"><label class="label">Timezone (preselected)</label>
    <div class="select-root" data-select>
      <button type="button" class="select-trigger"><span class="select-value" data-placeholder="Select">Select</span><i data-icon="chevron-down"></i></button>
      <div class="select-menu" hidden><div class="select-option" data-value="cet" aria-selected="true">Europe/Brussels</div><div class="select-option" data-value="utc">UTC</div><div class="select-option" data-value="est">America/New_York</div></div><input type="hidden" name="tz"></div></div>
</div>
<div class="mono text-sm text-muted" id="sel-out">value: —</div>
''', [('[data-select]', 'Root containing <code>.select-trigger</code>, <code>.select-menu</code> (<code>.select-option[data-value]</code>, <code>.select-group-label</code>) and a hidden input.'), ('aria-selected="true"', 'Preselect an option; <code>aria-disabled="true"</code> disables one.'), ('change', 'Fires on the hidden input.'), ('Keyboard', '↑ ↓ Home End Enter Space Esc and typeahead.')], style='min-height:280px;align-content:start',
  script='''
  document.getElementById('sel-hidden').addEventListener('change', e => { document.getElementById('sel-out').textContent = 'value: ' + (e.target.value || '—'); });
''')

C('slider', 'Slider', 'Forms', 'Single value and dual-thumb range sliders with live output.', '''
<div class="stack" style="max-width:460px">
  <div class="field"><span class="label">Volume</span><div class="slider" data-suffix="%"><input type="range" min="0" max="100" value="40" aria-label="Volume"><span class="slider-value"></span></div></div>
  <div class="field" role="group" aria-labelledby="pr-l"><span class="label" id="pr-l">Price range</span><div class="slider"><div class="slider-range"><input type="range" min="0" max="500" value="100" aria-label="Minimum price"><input type="range" min="0" max="500" value="350" aria-label="Maximum price"></div><span class="slider-value" style="min-width:9ch" aria-hidden="true"></span></div>
    <div class="row"><label class="label" for="pr-min">Min</label><input class="input input-sm" id="pr-min" type="number" min="0" max="500" value="100" style="width:96px"><label class="label" for="pr-max">Max</label><input class="input input-sm" id="pr-max" type="number" min="0" max="500" value="350" style="width:96px"></div><span class="hint">Type exact values, or drag the thumbs — both stay in sync.</span></div>
  <div class="field"><span class="label">Stepped</span><div class="slider"><input type="range" min="0" max="100" step="25" value="50" aria-label="Stepped"><span class="slider-value"></span></div><div class="slider-ticks"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div></div>
  <div class="field"><span class="label">Disabled</span><div class="slider"><input type="range" value="30" disabled aria-label="Disabled"></div></div>
</div>
''', [('.slider', 'Wraps an <code>input[type=range]</code> and an optional <code>.slider-value</code> output (<code>data-prefix</code>, <code>data-suffix</code>).'), ('.slider-range', 'Two overlaid range inputs for min/max.'), ('.slider-ticks', 'Optional tick labels.')],
  script='''
  const [a, b] = document.querySelectorAll('.slider-range input'), nmin = document.getElementById('pr-min'), nmax = document.getElementById('pr-max');
  const fromSliders = () => { const lo = Math.min(+a.value, +b.value), hi = Math.max(+a.value, +b.value); nmin.value = lo; nmax.value = hi; };
  const fromNumbers = () => { a.value = nmin.value; b.value = nmax.value; a.dispatchEvent(new Event('input')); };
  [a, b].forEach(x => x.addEventListener('input', fromSliders)); [nmin, nmax].forEach(x => x.addEventListener('input', fromNumbers));
''')

C('switch', 'Switch', 'Forms', 'On/off toggle for settings.', '''
<div class="stack-sm">
  <label class="switch"><input type="checkbox" checked><span>Airplane mode</span></label>
  <label class="switch"><input type="checkbox"><span>Notifications</span></label>
  <label class="switch"><input type="checkbox" disabled><span>Disabled</span></label>
</div>
''', [('label.switch > input[type=checkbox]', 'Markup pattern; state is the checkbox state.')])

C('textarea', 'Textarea', 'Forms', 'Multi-line input with optional auto-grow and character counter.', '''
<div class="grid grid-2">
  <div class="field"><label class="label" for="tx1">Message</label><textarea class="textarea" id="tx1" placeholder="Type your message…"></textarea></div>
  <div class="field"><label class="label" for="tx2">Auto-grow</label><textarea class="textarea textarea-auto" id="tx2" data-autogrow placeholder="Grows as you type…"></textarea></div>
  <div class="field"><label class="label" for="tx3">Bio (max 80)</label><textarea class="textarea" id="tx3" data-counter="80" placeholder="Tell us about yourself"></textarea></div>
  <div class="field"><label class="label" for="tx4">Disabled</label><textarea class="textarea" id="tx4" disabled>Read only content</textarea></div>
</div>
''', [('.textarea', 'Base.'), ('[data-autogrow]', 'Height follows content.'), ('[data-counter="n"]', 'Shows <code>len/n</code> below; turns red when exceeded.')])

C('toggle', 'Toggle', 'Forms', 'A two-state button (pressed / not pressed).', '''
<div class="row">
  <button class="toggle toggle-outline" data-toggle-btn aria-pressed="false" aria-label="Bold"><i data-icon="star"></i>Bold</button>
  <button class="toggle toggle-outline" data-toggle-btn aria-pressed="true"><i data-icon="check"></i>Pressed</button>
  <button class="toggle" data-toggle-btn aria-pressed="false">Ghost</button>
  <button class="toggle toggle-outline toggle-sm" data-toggle-btn aria-pressed="false">Small</button>
  <button class="toggle toggle-outline toggle-lg" data-toggle-btn aria-pressed="false">Large</button>
  <button class="toggle toggle-outline" disabled>Disabled</button>
</div>
''', [('.toggle[data-toggle-btn]', 'Button; state lives in <code>aria-pressed</code>.'), ('.toggle-outline / .toggle-sm / .toggle-lg', 'Variants.')])

C('toggle-group', 'Toggle Group', 'Forms', 'A set of toggles — single or multiple selection.', '''
<div class="stack">
  <div class="stack-sm"><span class="comment">Single</span>
    <div class="toggle-group" data-toggle-group="single" id="tg1"><button class="toggle" aria-pressed="true" data-value="left">Left</button><button class="toggle" aria-pressed="false" data-value="center">Center</button><button class="toggle" aria-pressed="false" data-value="right">Right</button></div></div>
  <div class="stack-sm"><span class="comment">Multiple</span>
    <div class="toggle-group" data-toggle-group="multiple" id="tg2"><button class="toggle" aria-pressed="true" data-value="bold">B</button><button class="toggle" aria-pressed="false" data-value="italic">I</button><button class="toggle" aria-pressed="true" data-value="underline">U</button></div></div>
  <div class="stack-sm"><span class="comment">Spaced, vertical</span><div class="row"><div class="toggle-group spaced" data-toggle-group="single"><button class="toggle toggle-outline" aria-pressed="true">Grid</button><button class="toggle toggle-outline" aria-pressed="false">List</button></div><div class="toggle-group vertical" data-toggle-group="single"><button class="toggle" aria-pressed="true">Top</button><button class="toggle" aria-pressed="false">Bottom</button></div></div></div>
  <span class="mono text-sm text-muted" id="tg-out">—</span>
</div>
''', [('[data-toggle-group="single|multiple"]', 'Container of <code>.toggle</code> buttons.'), ('mglsk:toggle', 'Event; <code>detail</code> = array of pressed values (<code>data-value</code> or label).'), ('.spaced / .vertical', 'Layout variants.')],
  script='''
  document.addEventListener('mglsk:toggle', e => { document.getElementById('tg-out').textContent = (e.target.id || 'group') + ': ' + JSON.stringify(e.detail); });
''')
