# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Environment Setup
- **Install dependencies**: `pnpm install` (requires Node.js >=22.12.0)
- **Clean install**: `pnpm clean:install`

### Development
- **Chrome development**: `pnpm dev`
- **Firefox development**: `pnpm dev:firefox`
- **Module manager**: `pnpm module-manager`

### Building & Production
- **Build for Chrome**: `pnpm build`
- **Build for Firefox**: `pnpm build:firefox`
- **Create distribution zip**: `pnpm zip` (Chrome) or `pnpm zip:firefox` (Firefox)

### Code Quality
- **Lint with auto-fix**: `pnpm lint` or `pnpm lint:fix`
- **Type checking**: `pnpm type-check`
- **Format code**: `pnpm prettier`

### Testing
- **Run E2E tests**: `pnpm e2e` (Chrome) or `pnpm e2e:firefox` (Firefox)
- Tests use WebDriver.io (WDIO) framework and are located in `tests/e2e/specs/`

### Cleanup
- **Clean all**: `pnpm clean`
- **Clean build outputs**: `pnpm clean:bundle`
- **Clean dependencies**: `pnpm clean:node_modules`

## Project Architecture

This is a Chrome/Firefox extension built as a monorepo using pnpm workspaces and Turborepo. It's a QR code generator extension with popup and options pages.

### Monorepo Structure
- **Root**: Configuration and build scripts
- **`chrome-extension/`**: Extension core (manifest, background scripts)
- **`pages/`**: React applications for popup (`pages/popup`) and options (`pages/options`)
- **`packages/`**: Shared libraries and utilities
- **`tests/`**: E2E test suite

### Key Packages
- **`packages/ui`**: Shared React components (export from `packages/ui/index.ts`)
- **`packages/shared`**: Utility functions (export from `packages/shared/index.mts`)
- **`packages/storage`**: Browser storage abstraction with typed methods
- **`packages/i18n`**: Internationalization with translations in `packages/i18n/locales`
- **`packages/tailwind-config`**: Shared Tailwind CSS configuration

### Extension Pages
- **Popup**: `pages/popup` - Main QR code generation interface
- **Options**: `pages/options` - Settings and customization page
- Both are standalone React apps built with Vite and use Tailwind CSS

### State Management Pattern
QR code settings use a sophisticated state management pattern in `packages/storage/lib/impl/qrSettingsStorage.ts`:

1. **Presets vs Custom**: Uses `selectedDesign` property to track if settings match a preset or are custom
2. **Atomic Updates**: When modifying preset settings, must update both the setting AND set `selectedDesign: 'custom'` in a single `setAll()` call to prevent race conditions
3. **Type Safety**: `StoredSettings` type derives properties from `QRCodeBoxProps` using `Pick<>`. Always add properties to `QRCodeBoxProps` first before using in derived types

### Adding New Components/Features
1. **UI Component**: Create in `packages/ui/lib/`, export from `packages/ui/index.ts`, add workspace dependency
2. **Utility Function**: Create in `packages/shared/lib/`, export from `packages/shared/index.mts`, add workspace dependency
3. **Translation**: Add to JSON files in `packages/i18n/locales/`, use `useTranslate` hook from `@extension/i18n`

### Technical Stack
- **React 19** with TypeScript 5.9.2
- **Vite 6.1.0** for building
- **Tailwind CSS** for styling
- **ESLint 9** with TypeScript ESLint, Prettier, React hooks, and a11y rules
- **Turborepo** for task orchestration
- **pnpm** for package management
- **WebDriver.io** for E2E testing

### Environment & Configuration
- **Manifest V3**: Generated from `chrome-extension/manifest.ts`
- **Cross-browser**: Supports both Chrome and Firefox with environment variables
- **TypeScript**: Strict configuration with consistent type imports enforced
- **Permissions**: `storage`, `activeTab`, `favicon`

### Development Notes
- All caches are disabled in turbo.json for development reliability
- Uses `@extension/` namespace for internal packages
- Environment variables prefixed with `CEB_*` or `CLI_CEB_*`
- Build outputs go to `dist/` directory
- Zip distributions created in `dist-zip/`