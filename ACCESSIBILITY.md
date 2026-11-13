# Accessibility

MGLSK UI is built to the **WCAG 2.2 level AA** success criteria. This document says what is verified, how components behave for
keyboard and assistive-technology users, and — just as important — what has **not** been verified yet.

> This is an engineering status report, not a formal conformance claim or VPAT. Automated tools find roughly a third of
> accessibility problems; the rest needs people. See "Not verified" below before relying on it for a regulated product.

## What is verified (and re-checked by `npm test`)

| Check | Scope | Result |
|---|---|---|
| **axe-core 4.14**, rules for WCAG 2.0/2.1/2.2 A + AA and best practice | 73 pages × dark and light + 16 open states (menus, dialogs, pickers, palettes, toasts…) | **0 violations** (1 documented exception, below) |
| **Keyboard & behaviour suite** (`tools/test/a11y-keyboard.js`) | focus management, roles/state, live regions, dismissible hover content, pausable motion, reflow, text spacing, visible focus, forced colours | 73 checks |
| **Contrast matrix** (`tools/test/theme.js`) | 8 accents × 2 modes × all text/fill/status token pairs, plus tinted surfaces | every pair ≥ 4.5:1 |
| **Reflow** (WCAG 1.4.10) | all 73 pages at 320 px wide, geometry-based | no horizontal page scroll, nothing cut off |
| **Text spacing** (WCAG 1.4.12) | line-height 1.5, letter-spacing .12em, word-spacing .16em on 7 pages | no clipped text |
| **Visible focus** (WCAG 2.4.7) | Tab through 12 pages (≤ 70 stops each) | every stop has an outline or ring |

Run them: `npm run test:a11y` (axe + keyboard) or `npm test` (everything).

**Documented exception.** The dual-thumb range slider is two overlapping `<input type=range>` elements, so each cannot be a separate
24 × 24 px target (WCAG 2.2 SC 2.5.8). The criterion allows an equivalent control: the slider docs pair it with two synced number
inputs (Min / Max). The audit excludes only that one case.

## Not verified

- **Screen readers.** No manual testing with NVDA, JAWS, VoiceOver (macOS/iOS) or TalkBack. ARIA patterns follow the APG, but real
  announcements can differ per reader/browser pair. This is the largest gap.
- **Browsers.** Everything above ran in Chromium. Firefox and Safari are untested.
- **Real hardware:** touch/pointer on phones, voice control (Dragon, Voice Control), switch access, magnification software.
- **Windows High Contrast** is emulated (`forced-colors: active`) and has a stylesheet, but is not checked on a real device.
- **Cognitive/language aspects** (plain language, consistent help, error recovery wording) are content decisions for your app.
- Your own content: the kit cannot know whether your alt text, link text or headings make sense.

## How the components behave

Roles, names and states are added automatically from markup (`js/a11y.js`, plus each component module) — you rarely write ARIA by hand.

| Component | Keyboard | Semantics |
|---|---|---|
| Page shell | **Tab** → "Skip to main content" | `header`, labelled `nav`s, `aside`, one `main` (focusable target), `h1` then `h2` card titles |
| Dialog, Sheet, Drawer, Command dialog | Tab is trapped (native modal), **Esc** closes, focus returns to the opener | named from the heading; `Drawer` can also be dragged |
| Alert Dialog | no Esc / backdrop dismissal; focus starts on **Cancel** | `role=alertdialog`, labelled + described |
| Dropdown Menu, Menubar | **↓ ↑** open from the trigger and move, **Home/End**, **→ ←** submenu / next menu, **Esc** closes and returns focus, **Tab** closes | `menu` / `menuitem(checkbox/radio)`, `aria-haspopup`, `aria-expanded`, `aria-controls` |
| Context Menu | **Shift+F10** or the Menu key on the focused area (also right-click, long-press) | focusable trigger area, `menu` |
| Select, Combobox | **↓ ↑ Home End Enter Esc**, type-ahead; stays on the control | select-only / editable `combobox`, `aria-activedescendant`, named listbox, `aria-expanded` |
| Command palette | **Ctrl/⌘+K**, **↑ ↓ Home End Enter Esc** | input `combobox` → `listbox` → `group` → `option`; "no results" is a live status |
| Calendar, Date Picker | **← → ↑ ↓**, **Home/End** (week), **PageUp/Down** (month; **Shift** = year), **Enter** | `grid` › `row` › `columnheader` / `gridcell` (`aria-selected`), days named "Sunday 1 November 2026", `aria-current="date"` |
| Tabs | **← → Home End**, roving tabindex | `tablist` / `tab` / `tabpanel`, `aria-selected` |
| Accordion, Collapsible | native `details`, or Enter/Space | `aria-expanded`, `aria-controls` |
| Data Table / Table | sortable headers take **Enter / Space** | `scope`, `aria-sort`, selection checkboxes named per row |
| Forms / Field | invalid submit focuses the first error | `aria-invalid`, `aria-describedby` (hint + error), error is `role=alert`, required `*` hidden from AT |
| Input OTP | auto-advance, Backspace, paste | `group`, each box "Digit n" |
| Slider | native range keys | named; dual slider has a number-input equivalent |
| Toggle, Toggle Group, Switch, Checkbox, Radio | Space / arrows | `aria-pressed` / native input state |
| Resizable | **← →** or **↑ ↓** on the handle | `separator` with `aria-valuenow/min/max` |
| Carousel | **← →**, prev/next, dots | region + `aria-roledescription=slide` (`n of m`), **Pause** button on autoplay |
| Toast | **Tab** to Undo/Dismiss; hover/focus pauses the timer | `role=status` (info) / `role=alert` (warning, danger); toasts with an action never time out |
| Charts | — | `img` with a descriptive label **plus** a visually-hidden data table of the same values |
| Progress, Spinner | — | `progressbar` + `aria-valuenow`; indeterminate omits the value |
| Tooltip, Hover Card | shown on focus too; **Esc** dismisses; the pointer can move onto the content | `aria-describedby`; icon-only `[data-tip]` buttons get their name from the tip |
| Message Scroller | scrollable region is focusable | `role=log`, `aria-live=polite` |
| Avatar with status | — | `img`, e.g. "RB, online" |

## Colour, contrast, motion

- **Contrast.** Neutrals, status colours and all eight accent presets meet 4.5:1 for text in both modes, including on tinted and
  hovered surfaces. Light-mode accents are deliberately darker than the dark-mode ones. A **custom colour**
  (`MGLSK.setAccent('#hex')`) is lightened/darkened automatically until it passes in both modes.
- **Not by colour alone.** Status badges carry text, trend deltas carry arrows and a hidden "Up/Down", errors carry text.
- **`prefers-contrast: more`** strengthens borders and secondary text. **`forced-colors: active`** switches to system colours and
  keeps every border, focus ring and selected state visible.
- **Motion.** `prefers-reduced-motion` turns off CSS animation and renders the WebGL layer as a single static frame. The **CRT**
  toggle in the topbar also stops decorative motion (blinking cursor, glitch, pulses, ticker) and the WebGL field for everyone. The
  ticker pauses on hover/focus, the carousel pauses on hover/focus and has a button, toasts pause while you read them.
- **Text effects.** The "decode" hover effect only scrambles a decorative copy; the real text stays in the accessibility tree.
- **WebGL layers** (dot field, particle logo) are decorative: `aria-hidden`, never the only carrier of meaning.

## Using the kit accessibly — author checklist

1. **Label every control.** Use `<label class="label" for="id">` (or `aria-label` for icon-only buttons). Placeholders are not labels.
2. **One `h1`, then `h2`…** Card titles use `h2` under the page `h1` (`.card-head` styles `h2` and `h3`).
3. **Keep the landmarks** from the starter: skip link, `<main id="main" tabindex="-1">`, labelled `<nav>`s (wrap breadcrumbs in
   `<nav aria-label="Breadcrumb">`).
4. **Icon-only buttons need a name** (`aria-label="Close"`). Icons from `<i data-icon>` are already `aria-hidden`.
5. **Give dialogs a heading** (`.modal-head h3`) — it becomes the accessible name. Give `role=region` scroll areas a short `aria-label`.
6. **Don't hide information in a tooltip.** Tips are supplementary; the name/visible text must carry the meaning.
7. **Provide text for charts you build elsewhere**; `MGLSK.charts.*` adds a data table for you. Pass `title` for a better label.
8. **Never remove focus outlines.** If you restyle, keep ≥ 3:1 contrast against the adjacent colours.
9. **Test your content** with the keyboard only, at 200 % zoom, and with a screen reader.

## Reporting problems

Open an issue with the page, browser, assistive technology and what you expected to happen.
