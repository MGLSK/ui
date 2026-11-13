/* MGLSK UI charts — dependency-free SVG charts that follow the theme tokens.
 *
 *  MGLSK.charts.line(el,  { labels:[...], series:[{name, data:[...]}], area:true, format:v=>v, height:260 })
 *  MGLSK.charts.bar(el,   { labels:[...], series:[...], stacked:false, ... })
 *  MGLSK.charts.donut(el, { items:[{label, value}], center:'Total' , format })
 *  MGLSK.charts.spark(el, { data:[...], area:true, color:'var(--s2)' })
 *  MGLSK.charts.network(el, { nodes:[{id, label, x, y, z, group, status, size}], links:[{from, to, status}], title, height, routing })
 *      isometric node graph: x/y are floor-grid cells, z is elevation; emits 'mglsk:network' when a node is selected
 *
 * Colours come from --s1..--s6, so charts re-theme automatically (CSS only, no re-render needed).
 */
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    parent && parent.append(n);
    return n;
  };
  const nice = max => { // round axis max up to 1/2/5 * 10^n
    if (max <= 0) return 1;
    const p = 10 ** Math.floor(Math.log10(max)), f = max / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
  };
  const compact = v => Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : Math.abs(v) >= 1e3 ? (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'k' : String(v);
  const legend = (host, names) => {
    const l = document.createElement('div'); l.className = 'legend'; l.style.marginTop = '12px';
    names.forEach((n, i) => { const s = document.createElement('span'); s.className = 's' + (i % 6 + 1); const d = document.createElement('i'); s.append(d, n); l.append(s); });
    host.append(l);
  };
  const tip = host => { const t = document.createElement('div'); t.className = 'chart-tip'; host.append(t); return t; };
  const showTip = (t, host, evt, html) => {
    const r = host.getBoundingClientRect();
    t.innerHTML = html; t.style.left = evt.clientX - r.left + 'px'; t.style.top = evt.clientY - r.top + 'px'; t.classList.add('on');
  };

  function frame(host, o, n) { // shared axes for line/bar
    const W = Math.round(host.clientWidth) || 640, H = o.height || 260, m = { t: 12, r: 12, b: 28, l: 44 };
    const fmt = o.format || compact;
    const all = o.series.flatMap(s => s.data);
    const stacked = o.stacked && o.type === 'bar';
    const max = nice(stacked ? Math.max(...o.labels.map((_, i) => o.series.reduce((a, s) => a + s.data[i], 0))) : Math.max(...all));
    const min = Math.min(0, ...all);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': o.title || 'Chart' });
    const x0 = m.l, x1 = W - m.r, y0 = H - m.b, y1 = m.t;
    const y = v => y0 - (v - min) / (max - min) * (y0 - y1);
    for (let i = 0; i <= 4; i++) {
      const v = min + (max - min) * i / 4;
      el('line', { class: 'grid-line', x1: x0, x2: x1, y1: y(v), y2: y(v) }, svg);
      const t = el('text', { x: x0 - 8, y: y(v) + 4, 'text-anchor': 'end' }, svg); t.textContent = fmt(Math.round(v * 100) / 100);
    }
    const step = Math.ceil(o.labels.length / 8);
    const xAt = i => o.type === 'bar' ? x0 + (x1 - x0) * (i + .5) / n : x0 + (x1 - x0) * (n === 1 ? .5 : i / (n - 1));
    o.labels.forEach((l, i) => { if (i % step) return; const t = el('text', { x: xAt(i), y: H - 8, 'text-anchor': 'middle' }, svg); t.textContent = l; });
    return { svg, W, H, x0, x1, y0, y1, y, xAt, fmt };
  }

  /** Screen-reader alternative: the chart's data as a visually-hidden table. */
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const srTable = (caption, head, rows) => {
    const t = document.createElement('table'); t.className = 'sr-only';
    t.innerHTML = `<caption>${esc(caption)}</caption><thead><tr>${head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
    return t;
  };
  const describe = (kind, o) => (o.title ? o.title + ' — ' : '') + kind + (o.series ? ': ' + o.series.map(s => s.name).join(', ') : '');

  function mount(host, o, draw) {
    host.classList.add('chart'); host.innerHTML = '';
    const g = draw();
    host.prepend(g);
    return host;
  }

  const charts = {
    line(host, o) {
      o.type = 'line'; const n = o.labels.length;
      mount(host, o, () => {
        const f = frame(host, o, n), t = tip(host);
        o.series.forEach((s, si) => {
          const g = el('g', { class: 's' + (si % 6 + 1) }, f.svg);
          const pts = s.data.map((v, i) => [f.xAt(i), f.y(v)]);
          const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
          if (o.area !== false && si === 0) el('path', { class: 'area', d: d + `L${pts.at(-1)[0]} ${f.y0}L${pts[0][0]} ${f.y0}Z` }, g);
          el('path', { class: 'line', d }, g);
          pts.forEach(p => el('circle', { class: 'dot', cx: p[0], cy: p[1], r: 4, 'data-i': 0 }, g));
        });
        // hover columns
        o.labels.forEach((l, i) => {
          const w = (f.x1 - f.x0) / Math.max(1, n - 1);
          const col = el('rect', { class: 'hit', x: f.xAt(i) - w / 2, y: f.y1, width: w, height: f.y0 - f.y1 }, f.svg);
          col.addEventListener('mousemove', e => {
            f.svg.querySelectorAll('.dot.on').forEach(d => d.classList.remove('on'));
            f.svg.querySelectorAll('g').forEach(g => g.children[g.children.length - n + i]?.classList.add('on'));
            showTip(t, host, e, `<b>${l}</b><br>` + o.series.map(s => `${s.name}: ${(o.format || (v => v.toLocaleString()))(s.data[i])}`).join('<br>'));
          });
          col.addEventListener('mouseleave', () => { t.classList.remove('on'); f.svg.querySelectorAll('.dot.on').forEach(d => d.classList.remove('on')); });
        });
        return f.svg;
      });
      host.querySelector('svg').setAttribute('aria-label', describe('Line chart', o));
      host.append(srTable(describe('Data for line chart', o), ['Label', ...o.series.map(s => s.name)], o.labels.map((l, i) => [l, ...o.series.map(s => (o.format || (v => v.toLocaleString()))(s.data[i]))])));
      if (o.series.length > 1) legend(host, o.series.map(s => s.name));
    },

    bar(host, o) {
      o.type = 'bar'; const n = o.labels.length, k = o.series.length;
      mount(host, o, () => {
        const f = frame(host, o, n), t = tip(host);
        const slot = (f.x1 - f.x0) / n, groupW = slot * .68, bw = o.stacked ? groupW : groupW / k;
        const bars = el('g', { class: 'bars' }, f.svg);
        o.labels.forEach((l, i) => {
          let acc = 0;
          o.series.forEach((s, si) => {
            const v = s.data[i];
            const x = f.xAt(i) - groupW / 2 + (o.stacked ? 0 : si * bw);
            const top = f.y(o.stacked ? acc + v : v), base = f.y(o.stacked ? acc : 0);
            const r = el('rect', { class: 'bar s' + (si % 6 + 1), x: x + (o.stacked ? 0 : 1), y: top, width: Math.max(1, bw - (o.stacked ? 0 : 2)), height: Math.max(0, base - top - (o.stacked && si ? 1 : 0)), rx: 2 }, bars);
            acc += v;
            r.addEventListener('mousemove', e => showTip(t, host, e, `<b>${l}</b><br>${s.name}: ${(o.format || (x => x.toLocaleString()))(v)}`));
            r.addEventListener('mouseleave', () => t.classList.remove('on'));
          });
        });
        return f.svg;
      });
      host.querySelector('svg').setAttribute('aria-label', describe(o.stacked ? 'Stacked bar chart' : 'Bar chart', o));
      host.append(srTable(describe('Data for bar chart', o), ['Label', ...o.series.map(s => s.name)], o.labels.map((l, i) => [l, ...o.series.map(s => (o.format || (v => v.toLocaleString()))(s.data[i]))])));
      if (k > 1) legend(host, o.series.map(s => s.name));
    },

    donut(host, o) {
      const total = o.items.reduce((a, b) => a + b.value, 0), fmt = o.format || (v => v.toLocaleString());
      mount(host, o, () => {
        const S = 200, r = 76, sw = 26, C = 2 * Math.PI * r, t = tip(host);
        const svg = el('svg', { viewBox: `0 0 ${S} ${S}`, role: 'img', 'aria-label': o.title || 'Donut chart' });
        svg.style.maxWidth = '220px'; svg.style.margin = '0 auto';
        let off = 0;
        o.items.forEach((it, i) => {
          const len = it.value / total * C, gap = o.items.length > 1 ? 2 : 0;
          const c = el('circle', { class: 'slice s' + (i % 6 + 1), cx: S / 2, cy: S / 2, r, 'stroke-width': sw, 'stroke-dasharray': `${Math.max(0, len - gap)} ${C}`, 'stroke-dashoffset': -off, transform: `rotate(-90 ${S / 2} ${S / 2})`, style: `--sw:${sw}` }, svg);
          off += len;
          c.addEventListener('mousemove', e => showTip(t, host, e, `<b>${it.label}</b><br>${fmt(it.value)} (${Math.round(it.value / total * 100)}%)`));
          c.addEventListener('mouseleave', () => t.classList.remove('on'));
        });
        const a = el('text', { class: 'donut-total', x: S / 2, y: S / 2 + 4, 'text-anchor': 'middle' }, svg); a.textContent = o.centerValue ?? fmt(total);
        const b = el('text', { class: 'donut-sub', x: S / 2, y: S / 2 + 20, 'text-anchor': 'middle' }, svg); b.textContent = o.center || 'Total';
        return svg;
      });
      host.querySelector('svg').setAttribute('aria-label', (o.title || 'Donut chart') + ': ' + o.items.map(i => `${i.label} ${Math.round(i.value / total * 100)}%`).join(', '));
      host.append(srTable('Data for donut chart', ['Item', 'Value', 'Share'], o.items.map(i => [i.label, fmt(i.value), Math.round(i.value / total * 100) + '%'])));
      legend(host, o.items.map(i => i.label));
      host.querySelector('.legend').style.justifyContent = 'center';
    },

    network(host, o) {
      const nodes = o.nodes || [], links = o.links || [], straight = o.routing === 'straight';
      const groups = [...new Set(nodes.map(n => n.group || 'nodes'))], gi = n => { const g = n.group || 'nodes'; return (o.colors && o.colors[g]) || groups.indexOf(g) % 6 + 1; };
      const deg = new Map(nodes.map(n => [n.id, 0]));
      links.forEach(l => { deg.set(l.from, (deg.get(l.from) || 0) + 1); deg.set(l.to, (deg.get(l.to) || 0) + 1); });
      const byId = new Map(nodes.map(n => [n.id, n])), z0 = n => n.z || 0, sz = n => .7 * (n.size || 1), ht = n => sz(n) * .8;
      const P = (x, y, z = 0) => [(x - y) * .866, (x + y) * .5 - z * .8];             // isometric projection, grid units
      const label = n => n.label || n.id;
      const STATUS = { ok: 'online', warn: 'degraded', danger: 'down' };
      mount(host, o, () => {
        const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
        const [x0, x1, y0, y1] = [Math.min(...xs) - 1, Math.max(...xs) + 1, Math.min(...ys) - 1, Math.max(...ys) + 1];
        const pts = [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
        nodes.forEach(n => { const h = sz(n) / 2; pts.push(P(n.x - h, n.y - h, z0(n) + ht(n) + .5), P(n.x + h, n.y + h, z0(n) - .35)); });
        const mnx = Math.min(...pts.map(p => p[0])), mxx = Math.max(...pts.map(p => p[0])), mny = Math.min(...pts.map(p => p[1])), mxy = Math.max(...pts.map(p => p[1]));
        const W = Math.round(host.clientWidth) || 640, pad = 16, lab = 20;
        let k = Math.min(110, (W - 2 * pad) / (mxx - mnx || 1));
        const H = o.height || Math.min(520, Math.round((mxy - mny) * k + 2 * pad + lab));
        k = Math.min(k, (H - 2 * pad - lab) / (mxy - mny || 1));
        const ox = (W - (mxx - mnx) * k) / 2 - mnx * k, oy = pad + (H - 2 * pad - lab - (mxy - mny) * k) / 2 - mny * k;
        const T = (x, y, z) => { const p = P(x, y, z); return [ox + p[0] * k, oy + p[1] * k]; };
        const d = a => a.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join('') ;

        const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'group', 'aria-label': o.title || 'Network' });
        const t = tip(host);
        // floor plane + grid
        el('path', { class: 'net-floor', d: d([T(x0, y0), T(x1, y0), T(x1, y1), T(x0, y1)]) + 'Z' }, svg);
        for (let x = Math.ceil(x0); x <= x1; x++) el('path', { class: 'net-grid', d: d([T(x, y0), T(x, y1)]) }, svg);
        for (let y = Math.ceil(y0); y <= y1; y++) el('path', { class: 'net-grid', d: d([T(x0, y), T(x1, y)]) }, svg);

        // links: orthogonal routes along the grid axes at the source node's mid-height
        const linkEls = links.map(l => {
          const a = byId.get(l.from), b = byId.get(l.to); if (!a || !b) return null;
          const za = z0(a) + ht(a) / 2, zb = z0(b) + ht(b) / 2;
          const route = straight ? [[a.x, a.y, za], [b.x, b.y, zb]] : [[a.x, a.y, za], [b.x, a.y, za], [b.x, b.y, za], [b.x, b.y, zb]]
            .filter((q, i, r) => !i || q[0] !== r[i - 1][0] || q[1] !== r[i - 1][1] || q[2] !== r[i - 1][2]);
          const g = el('g', { class: 'net-link s' + gi(a), 'data-status': l.status || 'ok' }, svg), path = d(route.map(q => T(...q)));
          el('path', { class: 'net-edge', d: path }, g);
          if (l.status !== 'down') el('path', { class: 'net-flow', d: path }, g);
          return g;
        });

        // nodes, far to near so nearer cubes paint over farther ones
        const nodeEls = new Map();
        [...nodes].sort((a, b) => (a.x + a.y) - (b.x + b.y) || z0(a) - z0(b)).forEach(n => {
          const h = sz(n) / 2, z = z0(n), zt = z + ht(n), ring = (zz, f) => f.map(([dx, dy]) => T(n.x + dx * h, n.y + dy * h, zz));
          const A = [-1, -1], B = [1, -1], Cc = [1, 1], D = [-1, 1];
          const deg_ = deg.get(n.id) || 0, st = STATUS[n.status];
          const g = el('g', { class: 'net-node s' + gi(n), tabindex: 0, role: 'button', 'aria-pressed': 'false', 'data-id': n.id,
            'aria-label': `${label(n)}${n.group ? ', ' + n.group : ''}${st ? ', ' + st : ''}, ${deg_} connection${deg_ === 1 ? '' : 's'}` }, svg);
          if (z) { el('path', { class: 'net-stem', d: d([T(n.x, n.y, 0), T(n.x, n.y, z)]) }, g); el('path', { class: 'net-shadow', d: d(ring(0, [A, B, Cc, D])) + 'Z' }, g); }
          el('path', { class: 'net-left', d: d([...ring(zt, [Cc, D]), ...ring(z, [D, Cc])]) + 'Z' }, g);
          el('path', { class: 'net-right', d: d([...ring(zt, [B, Cc]), ...ring(z, [Cc, B])]) + 'Z' }, g);
          el('path', { class: 'net-top', d: d(ring(zt, [A, B, Cc, D])) + 'Z' }, g);
          if (n.status) { const c = T(n.x, n.y, zt + .35); el('circle', { class: 'net-status ' + n.status, cx: c[0], cy: c[1], r: 3.5 }, g); }
          const lp = T(n.x + h, n.y + h, z); el('text', { class: 'net-label', x: lp[0], y: lp[1] + 15, 'text-anchor': 'middle' }, g).textContent = label(n);
          nodeEls.set(n.id, g);
          const on = () => {
            host.classList.add('net-focus');
            const near = new Set([n.id]);
            links.forEach((l, i) => { const hit = l.from === n.id || l.to === n.id; linkEls[i] && linkEls[i].classList.toggle('on', hit); if (hit) { near.add(l.from); near.add(l.to); } });
            nodeEls.forEach((e, id) => e.classList.toggle('on', near.has(id)));
            const r = g.getBoundingClientRect(), hr = host.getBoundingClientRect();
            t.innerHTML = `<b>${esc(label(n))}</b>${n.group ? '<br>' + esc(n.group) : ''}${st ? '<br>' + st : ''}<br>${deg_} connection${deg_ === 1 ? '' : 's'}`;
            t.style.left = r.left + r.width / 2 - hr.left + 'px'; t.style.top = r.top - hr.top + 'px'; t.classList.add('on');
          };
          const off = () => { host.classList.remove('net-focus'); svg.querySelectorAll('.on').forEach(e => e.classList.remove('on')); t.classList.remove('on'); };
          g.addEventListener('mouseenter', on); g.addEventListener('focus', on); g.addEventListener('mouseleave', off); g.addEventListener('blur', off);
          const pick = () => {
            const sel = !g.classList.contains('sel');
            nodeEls.forEach(e => { e.classList.remove('sel'); e.setAttribute('aria-pressed', 'false'); });
            if (sel) { g.classList.add('sel'); g.setAttribute('aria-pressed', 'true'); }
            host.dispatchEvent(new CustomEvent('mglsk:network', { bubbles: true, detail: { id: n.id, node: n, selected: sel } }));
          };
          g.addEventListener('click', pick);
          g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
        });
        return svg;
      });
      host.append(srTable((o.title || 'Network') + ' — nodes', ['Node', 'Group', 'Status', 'Connections'], nodes.map(n => [label(n), n.group || '', STATUS[n.status] || '', deg.get(n.id) || 0])));
      if (links.length) host.append(srTable((o.title || 'Network') + ' — links', ['From', 'To', 'Status'], links.map(l => [label(byId.get(l.from) || { id: l.from }), label(byId.get(l.to) || { id: l.to }), l.status === 'down' ? 'down' : 'up'])));
      if (groups.length > 1) {
        const l = document.createElement('div'); l.className = 'legend'; l.style.marginTop = '12px';
        groups.forEach(g => { const sp = document.createElement('span'); sp.className = 's' + gi({ group: g }); sp.append(document.createElement('i'), g); l.append(sp); });
        host.append(l);
      }
    },

    spark(host, o) {
      host.classList.add('spark'); host.innerHTML = '';
      const d = o.data, W = 100, H = 30, min = Math.min(...d), max = Math.max(...d), rng = max - min || 1;
      const pts = d.map((v, i) => [i / (d.length - 1) * W, H - 2 - (v - min) / rng * (H - 4)]);
      const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' }, host);
      if (o.color) svg.style.setProperty('--c', o.color);
      if (o.area !== false) el('path', { class: 'area', d: path + `L${W} ${H}L0 ${H}Z` }, svg);
      el('path', { class: 'line', d: path, 'vector-effect': 'non-scaling-stroke' }, svg);
    },
  };

  // re-render responsively when the container width changes
  ['line', 'bar', 'donut', 'network'].forEach(k => {
    const fn = charts[k];
    charts[k] = (host, o) => {
      fn(host, o);
      if (host._ro) return;
      let w = host.clientWidth;
      host._ro = new ResizeObserver(() => { if (Math.abs(host.clientWidth - w) > 24) { w = host.clientWidth; fn(host, o); } });
      host._ro.observe(host);
    };
  });

  window.MGLSK = Object.assign(window.MGLSK || {}, { charts });
})();
