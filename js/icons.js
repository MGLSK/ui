/* MGLSK UI icons — usage: <i data-icon="home"></i>. Stroke icons on a 24px grid; add your own to MGLSK.icons. */
(() => {
  const P = d => `<path d="${d}"/>`;
  const icons = {
    home: P('M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5'),
    users: P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75') + '<circle cx="9" cy="7" r="4"/>',
    user: P('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2') + '<circle cx="12" cy="7" r="4"/>',
    chart: P('M3 3v18h18M7 15l4-4 3 3 5-6'),
    bars: P('M6 20V10M12 20V4M18 20v-7'),
    settings: '<circle cx="12" cy="12" r="3"/>' + P('M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'),
    bell: P('M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0'),
    search: '<circle cx="11" cy="11" r="7"/>' + P('M21 21l-4.3-4.3'),
    menu: P('M3 6h18M3 12h18M3 18h18'),
    x: P('M18 6 6 18M6 6l12 12'),
    plus: P('M12 5v14M5 12h14'),
    trash: P('M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6'),
    edit: P('M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'),
    check: P('M20 6 9 17l-5-5'),
    'chevron-down': P('m6 9 6 6 6-6'),
    'chevron-right': P('m9 6 6 6-6 6'),
    'chevron-left': P('m15 6-6 6 6 6'),
    alert: P('M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01'),
    info: '<circle cx="12" cy="12" r="10"/>' + P('M12 16v-4M12 8h.01'),
    'check-circle': P('M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3'),
    download: P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3'),
    upload: P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12'),
    moon: P('M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'),
    sun: '<circle cx="12" cy="12" r="4"/>' + P('M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'),
    file: P('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6'),
    folder: P('M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'),
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/>' + P('m22 7-10 6L2 7'),
    dollar: P('M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'),
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' + P('M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6'),
    'trend-up': P('m22 7-8.5 8.5-5-5L2 17M16 7h6v6'),
    'trend-down': P('m22 17-8.5-8.5-5 5L2 7M16 17h6v-6'),
    'arrow-up': P('M12 19V5M5 12l7-7 7 7'),
    'arrow-down': P('M12 5v14M19 12l-7 7-7-7'),
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    filter: P('M22 3H2l8 9.5V19l4 2v-8.5z'),
    logout: P('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'),
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/>' + P('M9 3v18'),
    inbox: P('M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z'),
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/>' + P('M7 11V7a5 5 0 0 1 10 0v4'),
    eye: P('M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z') + '<circle cx="12" cy="12" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/>' + P('M16 2v4M8 2v4M3 10h18'),
    star: P('m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'),
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/>' + P('M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'),
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/>' + P('M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.7 1.7-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.1 0-.9.7-1.7 1.7-1.7H16c3.1 0 5.6-2.5 5.6-5.6C22 6 17.5 2 12 2z'),
    link: P('M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'),
  };
  const render = (root = document) => root.querySelectorAll('i[data-icon]').forEach(el => {
    const body = icons[el.dataset.icon];
    if (!body) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = body;
    el.replaceWith(svg);
  });
  window.MGLSK = Object.assign(window.MGLSK || {}, { icons, renderIcons: render });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => render()) : render();
})();
