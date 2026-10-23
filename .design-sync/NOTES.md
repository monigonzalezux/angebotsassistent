# Design sync notes (Claude Design)

## Setup
- [GENERAL] This repo is an app, not a published package. `npm run build:lib` (vite.lib.config.ts + tsconfig.lib.json) builds the components as a library into `dist-lib/` (JS + `index.css` + `.d.ts`). The sync bundles that: `cfg.entry` = `./dist-lib/index.js`, `cfg.cssEntry` = `dist-lib/index.css`. Run `buildCmd` before every sync; `dist-lib/` is gitignored.
- [GENERAL] `src/index.ts` is the library entry. New components must be exported there or the sync won't see them.
- [GENERAL] Styling is Tailwind v4. `src/index.css` uses `@theme static`, so every Figma token is emitted as a CSS variable in `dist-lib/index.css` even when unused.
- `Foundations/Tokens` (src/tokens/Tokens.stories.tsx) is a docs page, not a component: excluded via `titleMap {"Tokens": null}`. Tokens still ship through `styles.css`.

## Fixes
- Button: `[GRID_OVERFLOW] wide` from the All Combinations grid -> `cardMode: "column"`.
- Button: Hover / Pressed / Keyboard Focus / All Combinations stories rendered as plain default buttons in the preview -> they rely on `storybook-addon-pseudo-states` (a Storybook-only addon that fakes :hover/:active/:focus-visible), which can't ship -> skipped via `overrides.Button.skip`. Real hover/press/focus styles are plain CSS in the bundle and work in designs.
- SuggestionRow: auto-extracted `.d.ts` flattened the discriminated union (confidence high|check / no-match / error) and dropped `suggestion`, `error` and all `on*` callbacks -> hand-written in `cfg.dtsPropsFor.SuggestionRow`. Must be kept in sync with `src/components/SuggestionRow.tsx` by hand.
- Button: auto-extracted `.d.ts` dropped the native button attributes (`disabled`, `type`, `onClick`, `aria-label`) inherited from `ButtonHTMLAttributes` -> hand-written in `cfg.dtsPropsFor.Button`. Keep in sync with `src/components/Button.tsx`.

## Re-sync risks
- Not uploaded yet: first sync (2026-10-22) was built and verified locally only, because DesignSync authorization failed in the desktop app's Code tab even after a successful `/design-login`. No `projectId` in config, no `_ds_sync.json` anchor remote, so the next sync is a full first-sync (create project, re-verify all).
- `cfg.dtsPropsFor` for Button and SuggestionRow is hand-written: it goes stale silently when those components' props change. Re-check it against `dist-lib/components/*.d.ts` on every sync.
- `.design-sync/conventions.md` lists token names and component props by hand: re-validate against `ds-bundle/_ds_bundle.css` and the `.d.ts` files each sync.
- Button's Hover / Pressed / Keyboard Focus / All Combinations stories are skipped (Storybook addon only). New Button stories that use `parameters.pseudo` need the same skip.
- New stories in `src/data`-driven lists (SuggestionRow All Tender Lines) depend on `src/data/tenderLines.ts`; editing that data re-grades SuggestionRow.
- No webfont ships: everything renders in the system sans-serif (`--font-sans`). Figma names Inter, but the app doesn't load it either, so previews and app agree. If Inter is added to the app, add it via `cfg.extraFonts`.
- Toolchain at first sync: Storybook 10.6.3, Tailwind 4.3.3, Vite 8.3.4, React 19.3.1, Node 24.22.0.
