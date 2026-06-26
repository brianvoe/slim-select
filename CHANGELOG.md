# Changelog

All notable changes to Slim Select are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2026-06-26

### Added

- `modal` setting (`'off'` | `'on'` | `'mobile'`, default `'mobile'`) — opens the option panel as a centered modal with
  backdrop on small viewports or always when set to `'on'`
- Modal UI: semi-transparent backdrop, centered 400px card, close button, Escape and backdrop dismiss, body scroll lock
  while open, and `--ss-modal-z-index` for stacking above page chrome
- `shouldUseModalView()` helper for resolving modal vs dropdown mode (including the 768px mobile breakpoint)
- Settings documentation page for modal and live modal demos on the home page
- Internal `SyncCoordinator` for batched native/API/UI update routing
- `Lifecycle` scheduler for open/close timing with `transitionend` fallback
- JS animation helpers (`animations.ts`) replacing hardcoded animation delays
- Playwright smoke tests for open/close and native mutation sync
- Expanded Playwright E2E suite (selection, search, keyboard, sync API, accessibility)
- Playwright E2E tests for API search, error recovery, hideSelected, and addable
- Characterization tests for sync engine and lifecycle races
- Integration tests for API search error recovery, hideSelected, and addable + catalog
- `prefers-reduced-motion` support for value removal and content panel transitions

### Changed

- `events.search` second argument is typed as selected options (`Option[]`); optional third argument passes the catalog
  baseline (`getCatalogData()`)
- Documentation updated for `events.search` callback parameters (`searchValue`, `selected`, `catalog`)
- Mutation classification extracted to `mutations.ts`
- Global window/document listeners extracted to `events.ts`
- Selection-only updates use lightweight native `setSelectedByValue` instead of full native `<select>` rebuilds
- Selection-only updates sync existing dropdown option nodes instead of rebuilding the full option list
- Local search filters existing option nodes in place instead of rebuilding the list on each keystroke
- API search results are temporary — clearing search restores the catalog baseline while preserving selection
- Reopening with `keepSearch` re-runs the active search query
- API search merges preserve selection without duplicating options that match by id or value
- Search input is trimmed; whitespace-only input clears search and restores the catalog
- Structure sync skip checks use field-wise data comparison instead of JSON.stringify
- Moved `dataStructureEqual` and `selectedIdsEqual` into `helpers.ts`
- Replaced dropdown position polling (`setInterval`) with `ResizeObserver` for absolute content
- Option rows use `content-visibility: auto` to reduce layout cost for long lists
- `store.filter()` supports read-only views without cloning; hot paths use live store references
- Vue component requires the `data` prop; slot content for `<option>` children is no longer supported. Slot-based
  options caused Vue to patch the native `<select>` on re-renders, which re-triggered Slim Select's mutation observer
  and structure sync — risking redundant work and v-model feedback loops. Pass options via `:data` instead (same shape
  as core SlimSelect).
- Modal option panel uses `--ss-modal-height` (default `85vh`) and `--ss-modal-width` (default `min(90vw, 400px)`)
  instead of the dropdown `--ss-content-height` cap
- Modal dialog shows associated label text (or `aria-label`) as a header above the option list; override with
  `settings.modalTitle`
- Optgroup select-all label is always "Select All" or "Unselect All" when every option in the group is selected;
  `selectAllText` and `data-selectalltext` are no longer supported
- Style showcase and customize demos use long multi-select lists to preview scrollbar styling; Show CSS output groups
  variables in the same order as `slimselect.scss`
- Min/max settings documentation uses survey, tag, and scheduling demos with clearer behavior notes

### Fixed

- `Option.data` is now a plain object when options are read from HTML `data-*` attributes, instead of a live
  `DOMStringMap` that stringified as `[object DOMStringMap]`
- Single-select value text no longer ellipsizes prematurely — `.ss-values` now fills space before the arrow and dropped
  the extra `max-width` offset meant for controls outside that container
- Multi-select `minSelected` hides value remove buttons and clear-all at the minimum; clear-all with `allowDeselect`
  reduces to `minSelected` instead of clearing every selection
- Removed Vue `updated()` hook; v-model sync is handled by the `modelValue` watcher and initial `mounted` sync only
- Vue `data` watcher skips `setData` when the prop structure is unchanged (field-wise compare), avoiding thrash when
  parents recreate arrays each render
- Vue `data` watcher re-applies `modelValue` after `setData` so selection is preserved when options are replaced
- React component requires the `data` prop; `<option>` children are no longer supported. Child elements re-rendered the
  native `<select>` and re-triggered structure sync via the mutation observer — pass options via `data` instead (same
  shape as core SlimSelect).
- React `data` effect skips `setData` when the prop structure is unchanged and re-applies `value` after updates
- React wrapper keeps `onChange` and `events` callbacks fresh via refs so parent re-renders do not call stale handlers
- Native option+selection mutations coalesce into a single structure sync
- Animation timing reads from `--ss-animation-timing` so lifecycle waits stay aligned with CSS
- Value chip removal uses CSS animation only (`.ss-value-out`)
- Open/close waits for content panel opacity and transform transitions, with cleanup on cancel
- `--ss-search-height` and `--ss-option-height` default to `var(--ss-main-height)` so customizing main height keeps
  search and options aligned
- Main bar, search input, options, and optgroup labels share horizontal alignment via `--ss-spacing-s` /
  `--ss-spacing-l` (no extra padding variables)
- Main bar uses horizontal-only padding with vertical centering so single and multiple selects honor `--ss-main-height`
  consistently (including placeholders)
- Options and optgroup labels use `min-height` with vertical centering instead of vertical padding for height control
- Modal mode is skipped when `alwaysOpen` is true (inline always-open panels stay non-modal)
- Documentation variables page and site nav menu updated for the tighter height and spacing behavior
- Closable optgroups behave as an accordion — opening one closes any other open closable optgroup, including groups
  expanded because they contain a selected option

### Fixed

- Multi-select placeholder no longer exceeds a customized `--ss-main-height` while single select respects it
- Collapsed closable optgroups no longer reserve blank row height when options are hidden
- Modal overlay z-index and close button styling so the backdrop sits above fixed headers and the dismiss control is
  visible
- Adding an option during API search updates the catalog baseline instead of replacing it with search overlay data
- Fixed stale lifecycle callbacks overwriting `isOpen` after `closeOnSelect`
- Fixed Playwright E2E webServer health check failing on `/e2e/index.html` redirect

## [3.6.1] - 2026-06-12

### Fixed

- Fixed `aria-hidden` accessibility issue on the native select element
- Replaced deprecated CSS `clip` usage with `clip-path`

### Changed

- Updated required field documentation examples to use placeholders for certain values

## [3.6.0] - 2026-06-04

### Changed

- Added live region announcements for search results

## [3.5.0] - 2026-06-03

### Added

- Added `multiString` setting to display multi-select values as a comma-separated string instead of individual tags

### Changed

- Improved ARIA attributes and screen reader support

## [3.4.3] - 2026-02-25

### Fixed

- Fixed Shift+click range selection ignoring the active search filter

## [3.4.2] - 2026-02-24

### Changed

- Minor search behavior and documentation updates

## [3.4.1] - 2026-02-13

### Fixed

- Fixed dropdown content overflowing the window width

## [3.4.0] - 2026-02-07

### Added

- Added `contentWidth` setting to set a dropdown width independent of the main select element
- Added positioning tests for dropdown content placement

### Changed

- Improved dropdown content positioning logic
- Updated documentation for CSS class usage

## [3.3.0] - 2025-12-11

### Added

- Added support for space-separated values in the `classes` setting

### Changed

- Made label click handling more flexible
- Removed scroll offset that caused incorrect dropdown positioning
- Refactored content direction logic to reduce duplication
- Replaced Shiki with Highlight.js for documentation syntax highlighting

### Fixed

- Fixed open/close event and animation race conditions
- Fixed content positioning when `contentLocation` is not the document body or has a non-relative position
- Fixed search input border styling when dropdown opens above the select
- Fixed interactivity issues with dynamically updated options
- Fixed documentation before/after open-close state race conditions

## [3.2.0] - 2025-11-19

### Added

- Added `keepSearch` setting to preserve the search value when the dropdown closes

### Changed

- Options added or changed after initial render are now handled correctly
- Prevented page scroll when focusing the search input
- Corrected content class removal timeout to match CSS animation duration
- Prevented default click behavior on child elements inside select labels

## [3.1.4] - 2025-11-19

### Added

- Added label click tests

### Changed

- Label click now toggles the dropdown open and closed
- Label click handler only fires when the label itself is clicked
- Improved `contentLocation` documentation

## [3.1.3] - 2025-11-18

### Fixed

- Fixed scrollbar issues on initial render by positioning content off-screen until opened

## [3.1.2] - 2025-11-15

### Changed

- Dependency and package updates

## [3.1.1] - 2025-11-15

### Added

- Added label interaction tests
- Added race condition tests for rapid value changes
- Added invalid value handling examples in documentation

### Changed

- Vue component now handles values not present in the dropdown options
- Vue component value handling aligned more closely with native Vue select behavior
- Updated React usage documentation and examples

## [3.1.0] - 2025-11-02

### Added

- Added label click support to open and interact with Slim Select via associated `<label>` elements

## [3.0.6] - 2025-10-25

### Added

- Added styles documentation section
- Added mandatory option deselection tests

### Changed

- Mandatory options can no longer be deselected
- Improved no-results search styling
- Animated optgroup option reveal
- Moved CSS classes and styles documentation into a dedicated styles section
- Empty search now returns all available options
- Minor CSS visual improvements

### Fixed

- Fixed hover styling on disabled options
- Fixed search value not resetting on dropdown close

## [3.0.5] - 2025-10-24

### Changed

- Exported additional render fields required by TypeScript consumers

## [3.0.4] - 2025-10-24

### Changed

- Replaced Highlight.js with Shiki for documentation syntax highlighting
- Improved documentation descriptions across multiple sections
- Fixed export declaration issues

## [3.0.3] - 2025-10-22

### Fixed

- Fixed directional CSS class animation on open/close

## [3.0.2] - 2025-10-22

### Added

- Added standalone `example.html` demo file
- Added dedicated UMD export entry point

### Changed

- Split library build into multiple output files (ES, CJS, UMD, IIFE)

## [3.0.1] - 2025-10-22

### Added

- Added IIFE, minified, and source map build outputs
- Added Terser for production minification
- Updated package exports and unpkg import paths

### Changed

- Updated installation documentation

## [3.0.0] - 2025-10-21

Version 3 is a major rewrite of Slim Select with a TypeScript codebase, modern build tooling, first-class framework
support, and significantly improved accessibility.

### Added

- Complete TypeScript rewrite with exported types
- Official Vue 3 component (`slim-select/vue`)
- Official React component (`slim-select/react`)
- Required attribute support for HTML5 form validation
- Cmd/Ctrl+click and Shift+click range selection for multi-select
- Keyboard support for removing selected options
- Form native reset support (restores `defaultSelected` options)
- SCSS import path (`slim-select/scss`)
- CSS import path (`slim-select/styles`)
- WCAG 2.1 Level AA ARIA accessibility support
- `maxValuesShown` deselection behavior with tests
- Status color and reusable message CSS classes

### Changed

- Build system migrated from Rollup to Vite
- Test framework migrated from Jest to Vitest
- Search refactored to operate on option objects
- Vue component moved to dedicated subfolder with separate exports
- Package converted to ESM (`"type": "module"`)
- Native select element hidden visually but kept in DOM for form/required support
- DOM option updates use `createDocumentFragment` for better performance
- Improved text overflow and ellipsis handling for long option text
- Simplified TypeScript type exports

### Fixed

- Fixed undefined `main.id` in `updateAriaAttributes` ([#592](https://github.com/brianvoe/slim-select/issues/592))
- Fixed form reset not restoring default selected options ([#627](https://github.com/brianvoe/slim-select/issues/627))
- Fixed Enter key behavior in search and addable select modes
- Fixed highlight and open animation timing
