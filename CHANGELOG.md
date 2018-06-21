# Changelog

## 2.0.1

### Fixes

- Fix regression on methods that are not displayed (#72)

## 2.0.0

### Features

- Added `@vue-prop` tag (#59)
- Added `@vue-data` tag (#59)
- Added `@vue-computed` tag (#59)
- Added rendering system to support more JSDoc templates (#59)
- Rewrote default renderer (#64)
- Added [docstrap](https://github.com/docstrap/docstrap) renderer (#65)
- Added [tui](https://github.com/nhnent/tui.jsdoc-template) renderer (#66)
- Added [minami](https://github.com/nijikokun/minami) renderer (#67)

### Removals 

- Removed `followImports` config (#53)
- Removed configuration system (#53)
- Removed source transformation (Babel) (#55)
- Removed Vue component script evaluation (#57)
- Removed Vue lifecycle hooks listing (#59)
- Removed `@vue` tag (#59)

### Internals

- Use [Cypress](https://cypress.io) for E2E testing (#59)
