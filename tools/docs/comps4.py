from registry import C

# ============================== FEEDBACK ==============================
C('alert', 'Alert', 'Feedback', 'Inline messages: info, success, warning, danger — with title, action and dismiss.', '''
<div class="stack">
  <div class="alert alert-info"><i data-icon="info"></i><div class="grow"><div class="alert-title">Heads up</div><p>A new version is available.</p></div></div>
  <div class="alert alert-success"><i data-icon="check-circle"></i><p>Your changes were saved.</p></div>
  <div class="alert alert-warning"><i data-icon="alert"></i><div class="grow"><div class="alert-title">Trial ending</div><p>3 days left.</p></div><button class="btn btn-sm">Upgrade</button></div>
  <div class="alert alert-danger" data-dismissible><i data-icon="alert"></i><div class="grow"><div class="alert-title">Payment failed</div><p>Update your card to keep your plan.</p></div><button class="btn btn-ghost btn-icon btn-sm" data-dismiss aria-label="Dismiss"><i data-icon="x"></i></button></div>
</div>
''', [('.alert-info / -success / -warning / -danger', 'Variants (coloured left rule + icon).'), ('.alert-title', 'Optional bold heading.'), ('[data-dismissible] + [data-dismiss]', 'Dismiss button removes the alert.')])

C('progress', 'Progress', 'Feedback', 'Bars (default, status colours, indeterminate, striped, segmented) and a circular gauge.', '''
<div class="stack" style="max-width:520px">
  <div class="progress"><span style="width:65%"></span></div>
  <div class="progress success"><span style="width:90%"></span></div><div class="progress warning"><span style="width:55%"></span></div><div class="progress danger"><span style="width:25%"></span></div>
  <div class="progress indeterminate"><span></span></div>
  <div class="progress striped progress-lg"><span style="width:45%"></span></div>
  <div class="progress seg"><span class="on"></span><span class="on"></span><span class="on"></span><span></span><span></span></div>
  <div class="row"><div class="progress-circle" style="--v:72"><b>72%</b></div><div class="progress-circle" style="--v:35;--sz:56px"><b>35</b></div></div>
</div>
''', [('.progress > span', 'Set the width inline. Variants <code>.success .warning .danger</code>.'), ('.indeterminate / .striped / .seg / .progress-lg', 'Style variants.'), ('.progress-circle', '<code>--v</code> (0–100) and <code>--sz</code>.')])

C('skeleton', 'Skeleton', 'Feedback', 'Loading placeholders for text, avatars and cards.', '''
<div class="grid grid-2">
  <div class="stack-sm"><div class="skeleton" style="height:14px;width:60%"></div><div class="skeleton" style="height:14px"></div><div class="skeleton" style="height:14px;width:80%"></div></div>
  <div class="skeleton-card"><div class="skeleton skeleton-circle" style="width:44px;height:44px"></div><div class="stack-sm grow"><div class="skeleton" style="height:14px;width:50%"></div><div class="skeleton" style="height:12px"></div></div></div>
</div>
''', [('.skeleton', 'Shimmering block — size it inline.'), ('.skeleton-circle', 'Round (avatars).'), ('.skeleton-card', 'Row container with border.')])

C('spinner', 'Spinner', 'Feedback', 'Indeterminate loaders: ring, dots, bars and a terminal spinner.', '''
<div class="row" style="gap:var(--sp-6)">
  <span class="spinner spinner-sm" role="status" aria-label="Loading"></span><span class="spinner" role="status" aria-label="Loading"></span><span class="spinner spinner-lg" role="status" aria-label="Loading"></span>
  <span class="spinner-dots" role="status" aria-label="Loading"><i></i><i></i><i></i></span>
  <span class="spinner-bars" role="status" aria-label="Loading"><i></i><i></i><i></i><i></i></span>
  <span class="mono text-sm"><span class="spinner-term" role="status" aria-label="Loading"></span> compiling…</span>
</div>
''', [('.spinner (+ -sm, -lg)', 'Ring.'), ('.spinner-dots / .spinner-bars / .spinner-term', 'Alternatives (<code>|/-\\</code> for the terminal one).')])

# ============================== CHAT & AI ==============================
C('bubble', 'Bubble', 'Chat & AI', 'Chat bubbles: incoming, outgoing, system and typing indicator.', '''
<div class="stack-sm" style="max-width:560px">
  <div class="bubble bubble-in">Hi! How can I help you today?<span class="bubble-meta">10:02</span></div>
  <div class="bubble bubble-out">I'd like a quote for a webshop.<span class="bubble-meta">10:03 · read</span></div>
  <div class="bubble bubble-sys">— conversation assigned to Robin —</div>
  <div class="bubble bubble-in bubble-typing" role="status" aria-label="Typing"><i></i><i></i><i></i></div>
</div>
''', [('.bubble', 'Base. <code>.bubble-in</code>, <code>.bubble-out</code> (right, solid green), <code>.bubble-sys</code>.'), ('.bubble-meta', 'Timestamp/status line.'), ('.bubble-typing', 'Three pulsing squares.')])

C('message', 'Message', 'Chat & AI', 'A chat message row: avatar, name, time, body, reactions, status and hover actions.', '''
<div class="stack" style="max-width:640px">
  <div class="message"><span class="avatar" data-status="online">AB</span>
    <div class="message-main"><div class="message-head"><span class="message-name">Ada Byron</span><span class="message-time">10:02</span></div>
      <div class="message-body">Deploy finished — all checks are green. <code>v5.1.0</code> is live. 🎉</div>
      <div class="message-reactions"><button class="reaction" aria-pressed="true">👍 3</button><button class="reaction" aria-pressed="false">🚀 1</button></div></div>
    <div class="message-actions"><button class="btn btn-ghost btn-icon btn-sm" aria-label="React"><i data-icon="star"></i></button><button class="btn btn-ghost btn-icon btn-sm" aria-label="Copy"><i data-icon="copy"></i></button><button class="btn btn-ghost btn-icon btn-sm" aria-label="More"><i data-icon="more"></i></button></div></div>
  <div class="message message-out"><span class="avatar">RB</span>
    <div class="message-main"><div class="message-head"><span class="message-name">You</span><span class="message-time">10:04</span></div>
      <div class="bubble bubble-out" style="margin-left:0">Great, thanks! Shipping the changelog now.</div><span class="message-status read">✓✓ read</span></div></div>
  <div class="marker-line new">New messages</div>
  <div class="message"><span class="avatar" data-status="away">GH</span><div class="message-main"><div class="message-head"><span class="message-name">Grace H.</span><span class="message-time">10:09</span></div><div class="message-body">Nice work, team.</div></div></div>
</div>
''', [('.message', 'Row: <code>.avatar</code> + <code>.message-main</code> (<code>.message-head</code> → <code>.message-name</code>/<code>.message-time</code>, <code>.message-body</code>).'), ('.message-out', 'Own message (mirrored).'), ('.message-actions', 'Hover toolbar.'), ('.reaction[aria-pressed]', 'Reaction pills; <code>.message-status.read</code> for receipts.')])

C('message-scroller', 'Message Scroller', 'Chat & AI', 'Chat history that sticks to the bottom, offers a “jump to latest” button when scrolled away, and handles new messages.', '''
<div class="scroller-wrap" style="max-width:640px">
  <div class="scroller" data-scroller id="ms1">
    <div class="marker-line">Yesterday</div>
    <div class="message"><span class="avatar">AB</span><div class="message-main"><div class="message-head"><span class="message-name">Ada</span><span class="message-time">17:40</span></div><div class="message-body">Standup notes are in the wiki.</div></div></div>
    <div class="message"><span class="avatar">GH</span><div class="message-main"><div class="message-head"><span class="message-name">Grace</span><span class="message-time">17:42</span></div><div class="message-body">Thanks — reviewing the PR now.</div></div></div>
    <div class="marker-line">Today</div>
    <div class="message"><span class="avatar">AB</span><div class="message-main"><div class="message-head"><span class="message-name">Ada</span><span class="message-time">09:01</span></div><div class="message-body">Morning! Any blockers?</div></div></div>
    <div class="message"><span class="avatar">LT</span><div class="message-main"><div class="message-head"><span class="message-name">Linus</span><span class="message-time">09:05</span></div><div class="message-body">None here. Starting on the sidebar docs.</div></div></div>
    <div class="message"><span class="avatar">GH</span><div class="message-main"><div class="message-head"><span class="message-name">Grace</span><span class="message-time">09:07</span></div><div class="message-body">I'll pair with you after lunch.</div></div></div>
    <div class="message"><span class="avatar">AB</span><div class="message-main"><div class="message-head"><span class="message-name">Ada</span><span class="message-time">09:10</span></div><div class="message-body">Perfect. Scroll up and send a message to try the jump button.</div></div></div>
  </div>
  <button class="btn btn-primary btn-sm scroller-jump"><i data-icon="arrow-down"></i>New messages</button>
  <form class="scroller-input" id="ms-form"><input class="input" id="ms-in" placeholder="Write a message…" aria-label="Message" autocomplete="off"><button class="btn btn-primary">Send</button></form>
</div>
''', [('[data-scroller]', 'The scrolling list (inside <code>.scroller-wrap</code>). Auto-sticks to the bottom while you are at the bottom.'), ('.scroller-jump', 'Button shown when scrolled away from the latest message.'), ('MGLSK.scroller(el)', 'Returns <code>{ append(node), toEnd() }</code> — use <code>append</code> for new messages so stick/jump logic applies.')],
  script='''
  const list = document.getElementById('ms1'), sc = { append: n => list._sc.append(n) }, form = document.getElementById('ms-form'), input = document.getElementById('ms-in');
  const t = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const add = (name, text, out) => { const d = document.createElement('div'); d.className = 'message' + (out ? ' message-out' : ''); const av = document.createElement('span'); av.className = 'avatar'; av.textContent = out ? 'RB' : 'AB'; const main = document.createElement('div'); main.className = 'message-main'; const h = document.createElement('div'); h.className = 'message-head'; const n = document.createElement('span'); n.className = 'message-name'; n.textContent = name; const tm = document.createElement('span'); tm.className = 'message-time'; tm.textContent = t(); h.append(n, tm); const b = document.createElement('div'); b.className = 'message-body'; b.textContent = text; main.append(h, b); d.append(av, main); sc.append(d); };
  form.onsubmit = e => { e.preventDefault(); if (!input.value.trim()) return; list.scrollTop = list.scrollHeight; add('You', input.value, true); input.value = ''; setTimeout(() => add('Ada', 'Got it 👍'), 700); };
''')
