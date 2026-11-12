# Third-party notices

## Fonts (bundled in `fonts/`, copied to `dist/fonts/`)

All three are licensed under the **SIL Open Font License 1.1**, which permits bundling and redistribution with software.
The full licence texts are in `fonts/licenses/`. Keep them next to the font files when you redistribute.

| Font | Source | Copyright |
|------|--------|-----------|
| Archivo (variable, wght + wdth, latin) | https://github.com/Omnibus-Type/Archivo | © 2020 The Archivo Project Authors |
| Instrument Serif (regular + italic, latin) | https://github.com/Instrument/instrument-serif | © 2022 The Instrument Serif Project Authors |
| JetBrains Mono (variable, wght, latin) | https://github.com/JetBrains/JetBrainsMono | © 2020 The JetBrains Mono Project Authors |

The woff2 files come from the `@fontsource` npm packages (latin subset). They are self-hosted so the kit makes no requests to
Google Fonts.

## Build tooling (dev only, not shipped)

- esbuild (MIT) — minification in `tools/build-dist.mjs`.
