# Changelog

## 0.3.0 — 2026-11-12

### Accessibility
- **Audit & tests:** `npm run test:a11y` runs axe-core (WCAG 2.0–2.2 A/AA + best practice) over 72 pages × dark/light + 16 open
  states — 0 violations — and a 73-check keyboard/behaviour suite. New `ACCESSIBILITY.md` (per-component keyboard map, author
  checklist, explicit list of what is not verified).
- **Page structure:** skip link, focusable `<main>`, labelled navigation landmarks, heading levels fixed (card titles are `h2`),
  login page gets a `main` landmark.
- **Semantics (new `js/a11y.js`):** menus (`menu`/`menuitem`, arrow/Home/End/Esc/Tab, focus returns to the trigger), progress bars,
  dialog names, keyboard-focusable scroll regions and code blocks, sortable headers operable by keyboard, `aria-describedby` /
  `aria-invalid` on fields, tooltip names, unique landmark names, avatar status, message log.
- **Components:** calendar is a real ARIA grid (rows/cells, named days, Home/End, Shift+Page = year); select/combobox/command
  palette use correct `combobox` → `listbox` → `option` wiring with `aria-activedescendant`; context menu opens from the keyboard
  (Shift+F10 / Menu key); charts ship a visually-hidden data table; toasts use `status`/`alert`, never time out while hovered or
  focused, and keep action toasts until dismissed; destructive confirm dialogs focus Cancel first.
- **Motion & hover content:** CRT toggle stops all decorative motion; carousel autoplay has a Pause button and stops on
  hover/focus; ticker pauses on hover/focus; tooltips and hover cards are dismissible with Esc and stay while hovered (WCAG 1.4.13);
  the text "decode" effect no longer exposes scrambled glyphs to screen readers.
- **Contrast:** light-mode accent presets darkened so accent text passes 4.5:1 on every light surface and tint; custom accents are
  fitted to the same target; calendar out-of-month days, code comments and own-bubble timestamps fixed.
- **Reflow & targets:** nothing scrolls horizontally at 320 px (calendar, OTP, pagination, items, navigation menu made fluid); range
  sliders have 24 px targets; dual slider has a synced number-input equivalent.
- **Forced colours / contrast preferences:** `forced-colors: active` and `prefers-contrast: more` styles.

### Changed
- CRT scanlines and film grain now render on the page background only (beneath the app, same layer as the WebGL dot field), so
  components are never overlaid; the topbar is opaque so the layers do not show through it.
- `.card-head` styles both `h2` and `h3`; docs and examples use `h2`. Toast default timeout is 5 s.

## 0.2.0 — 2026-11-12

### Added
- **Theming:** light / dark / auto mode (auto follows the OS live) and eight accent presets (green, cyan, blue, violet, magenta,
  red, orange, yellow) plus any custom colour via `MGLSK.setAccent('#hex')`. Persisted; no flash of the wrong theme (inline
  `<head>` snippet). New `js/theme.js`, `MGLSK.setTheme / setAccent / theme / accent / contrast`, and declarative
  `[data-theme-set]`, `[data-theme-toggle]`, `[data-accent-set]`, `input[data-accent-custom]` controls.
- Theme panel in every topbar, login page and the starter, a Theming docs page, and an Appearance section in the settings example.
- WebGL dot field and particle logo are theme-aware (accent colours, ink-on-light blending in light mode).
- Contrast-corrected custom accents (>= 4.5:1 text and fill, both modes). `npm test` now checks all 8 accents x 2 modes x 12 token pairs.

### Changed
- All hard-coded green/dark values in the stylesheets are now tokens (`--accent-rgb`, `--on-accent`, `--bg-rgb`, `--glow-k`…),
  the select arrow follows the accent, and neon glows switch off in light mode.
- Dropdowns can opt in to staying open for clicks inside (`data-keep-open`).

## 0.1.0 — 2026-11-12

First packaged release.

### Added
- **Design system:** "cyber terminal" tokens (near-black, phosphor-green signal, magenta for glitch only), self-hosted Archivo,
  Instrument Serif and JetBrains Mono, CRT scanlines + grain.
- **66 components**, one documented page each in `components/`: Accordion, Alert, Alert Dialog, Aspect Ratio, Attachment, Avatar,
  Badge, Breadcrumb, Bubble, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Code Block, Collapsible, Combobox,
  Command, Context Menu, Data Table, Date Picker, Dialog, Direction, Drawer, Dropdown Menu, Empty, Field, Hover Card, Input,
  Input Group, Input OTP, Item, Kbd, Label, Marker, Menubar, Message, Message Scroller, Native Select, Navigation Menu,
  Pagination, Popover, Progress, Questionnaire, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton,
  Slider, Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle, Toggle Group, Tooltip, Trace, Typography.
- **App shell:** collapsible sidenav (drawer on mobile), sticky topbar, standalone navbar, breadcrumbs.
- **Charts:** dependency-free SVG line, bar (grouped/stacked), donut and sparkline.
- **Effects:** WebGL dot field behind the app, WebGL particle logo (`MGLSK.fx.particles`) sampled from text or an SVG path,
  text decode, glitch, reveal; all respect `prefers-reduced-motion`; CRT toggle persists.
- **Examples:** dashboard, settings, login.
- **Packaging:** `dist/` (concatenated + minified CSS/JS with source map), `starter/` template, test suite, docs generator.

### Known limitations
- Tested in Chromium only (see README, "Browser support").
- No automated accessibility audit has been run yet.
- Proprietary, all rights reserved (see `LICENSE`). No source maps are shipped.
