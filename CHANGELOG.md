# Changelog

All notable changes to Slim Select are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.6.1] - 2026-06-12

### Fixed

- Fixed `aria-hidden` accessibility issue on the native select element
- Replaced deprecated CSS `clip` usage with `clip-path`

### Changed

- Updated required field documentation examples to use placeholders for certain
  values

## [3.6.0] - 2026-06-04

### Changed

- Added live region announcements for search results

## [3.5.0] - 2026-06-03

### Added

- Added `multiString` setting to display multi-select values as a
  comma-separated string instead of individual tags

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

- Added `contentWidth` setting to set a dropdown width independent of the main
  select element
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
- Fixed content positioning when `contentLocation` is not the document body or
  has a non-relative position
- Fixed search input border styling when dropdown opens above the select
- Fixed interactivity issues with dynamically updated options
- Fixed documentation before/after open-close state race conditions

## [3.2.0] - 2025-11-19

### Added

- Added `keepSearch` setting to preserve the search value when the dropdown
  closes

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

- Fixed scrollbar issues on initial render by positioning content off-screen
  until opened

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
- Vue component value handling aligned more closely with native Vue select
  behavior
- Updated React usage documentation and examples

## [3.1.0] - 2025-11-02

### Added

- Added label click support to open and interact with Slim Select via associated
  `<label>` elements

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

Version 3 is a major rewrite of Slim Select with a TypeScript codebase, modern
build tooling, first-class framework support, and significantly improved
accessibility.

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
- Native select element hidden visually but kept in DOM for form/required
  support
- DOM option updates use `createDocumentFragment` for better performance
- Improved text overflow and ellipsis handling for long option text
- Simplified TypeScript type exports

### Fixed

- Fixed undefined `main.id` in `updateAriaAttributes`
  ([#592](https://github.com/brianvoe/slim-select/issues/592))
- Fixed form reset not restoring default selected options
  ([#627](https://github.com/brianvoe/slim-select/issues/627))
- Fixed Enter key behavior in search and addable select modes
- Fixed highlight and open animation timing
