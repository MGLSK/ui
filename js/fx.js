/* MGLSK UI FX — terminal effects. Raw WebGL1, no dependencies.
 *
 *  Auto on load (opt out with <html data-fx="off"> or the [data-fx-toggle] button, which persists):
 *    - scanline + grain overlays
 *    - WebGL dot field behind the app (pointer-reactive, scan sweep)
 *    - live clock [data-clock], text decode on [data-decode] / .nav-label / headings, glitch on [data-glitch]
 *    - reveal-on-scroll for .reveal
 *
 *  Particle logo:   MGLSK.fx.particles(canvas, { text:'_AK' } | { path:'M…', viewBox:[w,h] },
 *                     { count:7200, dust:.07, readout:el })
 *  Falls back to a static 2D drawing without WebGL; one assembled static frame under prefers-reduced-motion.
 */
(() => {
  const AK = (window.MGLSK = window.MGLSK || {});
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  root.classList.add('js');

  /* ---------- fx on/off (persisted) ---------- */
  if (localStorage.getItem('mglsk-fx') === 'off') root.dataset.fx = 'off';
  const fxOn = () => root.dataset.fx !== 'off';

  /* ---------- theme colours for the shaders (read from the CSS tokens, refreshed when the theme/accent changes) ---------- */
  const theme = { light: false, ink: [.89, .94, .91], dot: [.49, .56, .52], acc: [.17, 1, .53], glitch: [1, .17, .84] };
  let probeEl;
  const cssRgb = v => {
    probeEl ||= Object.assign(document.createElement('i'), { ariaHidden: 'true' });
    if (!probeEl.isConnected) { probeEl.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden;transition:none!important'; document.body.append(probeEl); }
    probeEl.style.color = v;
    const n = (getComputedStyle(probeEl).color.match(/[\d.]+/g) || [0, 0, 0]).map(Number);
    return getComputedStyle(probeEl).color.startsWith('color(') ? n.slice(0, 3) : n.slice(0, 3).map(x => x / 255);
  };
  const readTheme = () => {
    theme.light = root.dataset.themeResolved === 'light';
    theme.ink = cssRgb('var(--text)'); theme.dot = cssRgb('var(--muted)'); theme.acc = cssRgb('var(--accent)'); theme.glitch = cssRgb('var(--glitch)');
    document.dispatchEvent(new CustomEvent('mglsk:fx-theme'));
  };
  ['mglsk:theme', 'mglsk:accent'].forEach(n => document.addEventListener(n, () => requestAnimationFrame(readTheme)));
  if (document.body) readTheme();

  /* ---------- tiny GL helpers ---------- */
  const compile = (gl, type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const program = (gl, vs, fs) => {
    const v = compile(gl, gl.VERTEX_SHADER, vs), f = compile(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  };
  const getGL = c => { try { return c.getContext('webgl', { antialias: false, premultipliedAlpha: true, alpha: true }) || c.getContext('experimental-webgl'); } catch (e) { return null; } };

  /* shared pointer, smoothed per consumer */
  const ptr = { x: -9999, y: -9999, down: false };
  addEventListener('pointermove', e => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });
  addEventListener('pointerleave', () => { ptr.x = ptr.y = -9999; });
  addEventListener('pointerup', () => { if (ptr.touch) ptr.x = ptr.y = -9999; });
  addEventListener('pointerdown', e => { ptr.touch = e.pointerType === 'touch'; ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });

  /* ====================================================================
     1. DOT FIELD — full-viewport fragment shader
     ==================================================================== */
  function dotField() {
    if (document.getElementById('fx-field')) return;
    const c = document.createElement('canvas'); c.id = 'fx-field'; c.setAttribute('aria-hidden', 'true');
    document.body.prepend(c);
    const gl = getGL(c);
    if (!gl) { c.remove(); return; }
    const prog = program(gl,
      'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}',
      `precision mediump float;
      uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_time; uniform float u_dpr; uniform vec3 u_dot; uniform vec3 u_acc; uniform float u_gain;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      void main(){
        vec2 px=vec2(gl_FragCoord.x,u_res.y-gl_FragCoord.y)/u_dpr;       // css px, y down
        float cell=16.;
        vec2 c=(floor(px/cell)+.5)*cell;
        float n=vn(c*.011+vec2(u_time*.04,u_time*.025));
        float near=smoothstep(280.,0.,length(c-u_mouse));
        float r=mix(.5,1.5,n)+near*1.7;
        float d=length(px-c);
        float dot=smoothstep(r,r-.9,d);
        float sy=mod(u_time*70.,u_res.y/u_dpr+240.)-120.;
        float sweep=exp(-abs(c.y-sy)/36.)*.35;
        float a=dot*(.07+.16*n+sweep)+dot*near*.7;
        vec3 col=mix(u_dot,u_acc,clamp(near*1.2+sweep*1.5,0.,1.));
        a=min(a*u_gain,1.);
        gl_FragColor=vec4(col*a,a);
      }`);
    if (!prog) { c.remove(); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(prog, n);
    const u = { res: U('u_res'), mouse: U('u_mouse'), time: U('u_time'), dpr: U('u_dpr'), dot: U('u_dot'), acc: U('u_acc'), gain: U('u_gain') };
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let mx = -9999, my = -9999, t0 = performance.now(), raf = 0;
    const resize = () => { const d = dpr(); c.width = Math.round(innerWidth * d); c.height = Math.round(innerHeight * d); gl.viewport(0, 0, c.width, c.height); };
    const draw = time => {
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u.res, c.width, c.height); gl.uniform2f(u.mouse, mx, my);
      gl.uniform1f(u.time, time); gl.uniform1f(u.dpr, dpr());
      gl.uniform3f(u.dot, ...theme.dot); gl.uniform3f(u.acc, ...theme.acc); gl.uniform1f(u.gain, theme.light ? 1.7 : 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = now => {
      raf = 0;
      if (document.hidden || !fxOn()) return;
      mx += (ptr.x - mx) * .15; my += (ptr.y - my) * .15;
      if (ptr.x < -999) { mx = ptr.x; my = ptr.y; }
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduce && fxOn()) raf = requestAnimationFrame(loop); };
    resize();
    addEventListener('resize', () => { resize(); if (reduce) draw(2); });
    document.addEventListener('visibilitychange', start);
    document.addEventListener('mglsk:fx', start);
    document.addEventListener('mglsk:fx-theme', () => { if (reduce) draw(2); });
    if (reduce) draw(2); else start();
  }

  /* ====================================================================
     2. PARTICLE LOGO — gl.POINTS, additive, targets sampled from text/path
     ==================================================================== */
  AK.fx = AK.fx || {};
  AK.fx.particles = (canvas, src = {}, opt = {}) => {
    const isMobile = innerWidth < 700;
    const COUNT = opt.count || (isMobile ? 4200 : 7200), DUST = opt.dust ?? .07;
    const gl = getGL(canvas);
    const readout = opt.readout;
    let W = 0, H = 0, D = 1, targets = [], P = [], raf = 0, t0 = 0, glitchUntil = 0, nextGlitch = 0, visible = true;
    let mx = -9999, my = -9999;

    /* sample filled pixels of the mark on an offscreen 2D canvas (never tainted: text/Path2D only) */
    const sample = () => {
      const s = document.createElement('canvas'), w = (s.width = 360), h = (s.height = Math.max(120, Math.round(360 * H / W)));
      const x = s.getContext('2d', { willReadFrequently: true });
      x.fillStyle = '#fff';
      if (src.path) {
        const [vw, vh] = src.viewBox, k = Math.min(w / vw, h / vh) * .92;
        x.translate((w - vw * k) / 2, (h - vh * k) / 2); x.scale(k, k); x.fill(new Path2D(src.path));
      } else {
        let size = h * .8; x.font = `800 ${size}px Archivo, system-ui, sans-serif`;
        const tw = x.measureText(src.text).width; if (tw > w * .92) { size *= w * .92 / tw; x.font = `800 ${size}px Archivo, system-ui, sans-serif`; }
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(src.text, w / 2, h / 2 + size * .04);
      }
      const px = x.getImageData(0, 0, w, h).data, pts = [];
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (px[(j * w + i) * 4 + 3] > 128) pts.push([i / w, j / h]);
      return pts;
    };

    const build = () => {
      const pts = sample(), fillN = Math.round(COUNT * (1 - DUST));
      P = [];
      for (let i = 0; i < COUNT; i++) {
        const dust = i >= fillN, t = pts[(Math.random() * pts.length) | 0] || [.5, .5];
        P.push({
          tx: dust ? Math.random() * W : t[0] * W, ty: dust ? Math.random() * H : t[1] * H,
          sx: Math.random() * W * 1.4 - W * .2, sy: Math.random() * H * 1.4 - H * .2,
          delay: Math.random() * .8, ph: Math.random() * 6.28, amp: .4 + Math.random() * 1.4,
          size: dust ? .9 + Math.random() * .8 : 1.1 + Math.random() * 1.3,
          green: Math.random() < .035 ? 1 : 0, dust, x: 0, y: 0, g: 0, band: 0,
        });
        P[i].band = ((Math.floor(P[i].ty / 22) * 2654435761) >>> 0) / 4294967296;
        P[i].x = P[i].sx; P[i].y = P[i].sy;
      }
    };

    /* GL setup */
    let prog, buf, loc, uni;
    if (gl) {
      prog = program(gl,
        `attribute vec2 a_pos;attribute float a_size;attribute float a_g;uniform vec2 u_res;uniform float u_dpr;uniform vec2 u_off;varying float v_g;
         void main(){vec2 p=a_pos+u_off;gl_Position=vec4(p.x/u_res.x*2.-1.,1.-p.y/u_res.y*2.,0.,1.);gl_PointSize=a_size*u_dpr;v_g=a_g;}`,
        `precision mediump float;uniform vec3 u_col;uniform vec3 u_acc;uniform float u_alpha;uniform float u_force;varying float v_g;
         void main(){vec2 c=gl_PointCoord-.5;float d=length(c);if(d>.5)discard;float a=smoothstep(.5,.1,d)*u_alpha;
           vec3 col=mix(mix(u_col,u_acc,v_g),u_col,u_force);gl_FragColor=vec4(col*a,a);}`);
      if (prog) {
        gl.useProgram(prog); buf = gl.createBuffer();
        loc = { pos: gl.getAttribLocation(prog, 'a_pos'), size: gl.getAttribLocation(prog, 'a_size'), g: gl.getAttribLocation(prog, 'a_g') };
        const U = n => gl.getUniformLocation(prog, n);
        uni = { res: U('u_res'), dpr: U('u_dpr'), off: U('u_off'), col: U('u_col'), acc: U('u_acc'), alpha: U('u_alpha'), force: U('u_force') };
        gl.enable(gl.BLEND);
      }
    }
    const data = new Float32Array(COUNT * 4);

    const resize = () => {
      const r = canvas.getBoundingClientRect(); D = dpr();
      if (!r.width || !r.height) return;
      W = r.width; H = r.height; canvas.width = Math.round(W * D); canvas.height = Math.round(H * D);
      if (gl && prog) gl.viewport(0, 0, canvas.width, canvas.height);
      build();
      if (reduce || !prog) { step(99, 99); render(0); }
    };

    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(time, dt) {
      const r = canvas.getBoundingClientRect(), px = mx - r.left, py = my - r.top;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const k = ease(Math.min(1, Math.max(0, (time - p.delay) / 1.4)));
        let x = p.sx + (p.tx - p.sx) * k, y = p.sy + (p.ty - p.sy) * k;
        if (k >= 1) { x += Math.sin(time * .8 + p.ph) * p.amp; y += Math.cos(time * .7 + p.ph) * p.amp; }
        let g = 0;
        const dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          const d = Math.sqrt(d2) || 1, f = 1 - d / 150;
          x += dx / d * f * 70; y += dy / d * f * 70; g = f;
        }
        // smooth the pointer influence
        const s = Math.min(1, dt * 12);
        p.x += (x - p.x) * s; p.y += (y - p.y) * s;
        p.g = Math.max(g, p.green);
      }
    }
    const fill = (shiftBand = 0) => {
      for (let i = 0; i < P.length; i++) {
        const p = P[i], o = i * 4;
        data[o] = p.x + (shiftBand ? (p.band - .5) * shiftBand : 0); data[o + 1] = p.y; data[o + 2] = p.size * (1 + p.g * .9); data[o + 3] = p.g;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(loc.pos); gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(loc.size); gl.vertexAttribPointer(loc.size, 1, gl.FLOAT, false, 16, 8);
      gl.enableVertexAttribArray(loc.g); gl.vertexAttribPointer(loc.g, 1, gl.FLOAT, false, 16, 12);
    };
    const pass = (off, col, alpha, force) => {
      gl.uniform2f(uni.off, off, 0); gl.uniform3f(uni.col, col[0], col[1], col[2]); gl.uniform1f(uni.alpha, alpha); gl.uniform1f(uni.force, force);
      gl.drawArrays(gl.POINTS, 0, P.length);
    };
    function render(time) {
      if (!prog) return fallback();
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uni.res, W, H); gl.uniform1f(uni.dpr, D); gl.uniform3f(uni.acc, ...theme.acc);
      gl.blendFunc(...(theme.light ? [gl.ONE, gl.ONE_MINUS_SRC_ALPHA] : [gl.ONE, gl.ONE])); // additive glow on dark, plain ink on light
      const gl_ = time < glitchUntil;
      fill(gl_ ? 26 : 0);
      if (gl_) { // RGB split: magenta + green offset copies under the main cloud
        pass(7, theme.glitch, .8, 1); pass(-7, theme.acc, .8, 1);
      }
      pass(0, theme.ink, .9, 0);
    }
    function fallback() { // no WebGL: plain 2D dots
      const x = canvas.getContext('2d'); if (!x) return;
      x.setTransform(D, 0, 0, D, 0, 0); x.clearRect(0, 0, W, H);
      P.forEach(p => { x.fillStyle = `rgb(${(p.g ? theme.acc : theme.ink).map(v => Math.round(v * 255)).join(',')})`; x.fillRect(p.x, p.y, p.size, p.size); });
    }

    const glitch = time => { glitchUntil = time + .45; };
    const loop = now => {
      raf = 0; if (!visible || document.hidden) return;
      const time = (now - t0) / 1000, dt = Math.min(.05, (now - (loop.last || now)) / 1000 || .016); loop.last = now;
      mx += (ptr.x - mx) * .2; my += (ptr.y - my) * .2; if (ptr.x < -999) { mx = ptr.x; my = ptr.y; }
      if (time > 2.2 && !nextGlitch) { nextGlitch = time + 5.5; glitch(time); } // end of intro
      if (nextGlitch && time > nextGlitch) { glitch(time); nextGlitch = time + 5.5; }
      step(time, dt); render(time);
      if (readout) readout.textContent = `x ${Math.max(0, Math.round(mx - canvas.getBoundingClientRect().left))} y ${Math.max(0, Math.round(my - canvas.getBoundingClientRect().top))}`;
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduce) { t0 = t0 || performance.now(); raf = requestAnimationFrame(loop); } };
    canvas.addEventListener('pointerdown', () => { glitchUntil = (performance.now() - t0) / 1000 + .45; });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }).observe(canvas);
    new ResizeObserver(() => resize()).observe(canvas);
    document.addEventListener('visibilitychange', start);
    document.addEventListener('mglsk:fx-theme', () => { if (reduce || !prog) render(0); });
    resize(); start();
    return { glitch: () => glitch((performance.now() - t0) / 1000), count: COUNT };
  };

  /* ====================================================================
     3. TEXT: decode, glitch, clock, reveal
     ==================================================================== */
  const GLYPHS = '!<>-_\\/[]{}=+*^?#01';
  const decode = el => {
    if (reduce || !fxOn()) return;
    const real = el.dataset.text || (el.dataset.text = el.textContent);
    const start = performance.now(), dur = 250 + 22 * real.length;
    cancelAnimationFrame(el._dec);
    // the real text stays in a visually-hidden node; only a presentational copy is scrambled, so assistive tech never reads the glyphs
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = real;
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    el.replaceChildren(sr, vis);
    const f = now => {
      const p = Math.min(1, (now - start) / dur), n = Math.floor(p * real.length);
      if (p < 1) { vis.textContent = real.split('').map((ch, i) => i < n || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join(''); el._dec = requestAnimationFrame(f); }
      else el.textContent = real;
    };
    el._dec = requestAnimationFrame(f);
  };
  AK.fx.decode = decode;

  function text() {
    // clock
    const clocks = $$('[data-clock]');
    const tick = () => { const t = new Intl.DateTimeFormat('nl-BE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' }).format(new Date()); clocks.forEach(c => (c.textContent = t)); };
    if (clocks.length) { tick(); setInterval(tick, 10000); }
    // decode on hover for nav + anything marked; on reveal for headings
    $$('.nav-item .nav-label, [data-decode]').forEach(el => (el.closest('a,button') || el).addEventListener('mouseenter', () => decode(el)));
    // periodic headline glitch
    const g = $$('[data-glitch]');
    if (g.length && !reduce) setInterval(() => { if (!fxOn()) return; g.forEach(el => { el.classList.remove('glitch-now'); void el.offsetWidth; el.classList.add('glitch-now'); }); }, 5500);
    // reveal: cards fade up when scrolled into view
    $$('.main .card, .main .page-head').forEach(c => c.classList.add('reveal'));
    const targets = $$('.reveal');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('.card-head h3', e.target).forEach(decode);
      io.unobserve(e.target);
    }), { threshold: .08 });
    targets.forEach(t => io.observe(t));
  }

  /* ---------- fx toggle ---------- */
  document.addEventListener('click', e => {
    if (!e.target.closest('[data-fx-toggle]')) return;
    const off = fxOn(); if (off) root.dataset.fx = 'off'; else delete root.dataset.fx;
    localStorage.setItem('mglsk-fx', off ? 'off' : 'on');
    document.dispatchEvent(new Event('mglsk:fx'));
  });

  /* ---------- boot ---------- */
  const boot = () => {
    readTheme();
    if (!document.querySelector('.fx-scan')) {
      const a = document.createElement('div'), b = document.createElement('div');
      a.className = 'fx-scan'; b.className = 'fx-grain'; a.setAttribute('aria-hidden', 'true'); b.setAttribute('aria-hidden', 'true');
      document.body.append(a, b);
    }
    if (!document.querySelector('[data-no-field]')) dotField();
    text();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
