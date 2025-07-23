# Project Architecture

This document provides an overview of the project architecture, development workflow, and conventions.

## Overall Architecture

The project is a monorepo managed by [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/). This structure allows for managing multiple packages within a single repository, sharing code, and optimizing the build process.

- **`pnpm-workspace.yaml`**: Defines the workspaces (packages) included in the monorepo.
- **`turbo.json`**: Configures the task runner (Turborepo) to manage dependencies and execute scripts efficiently across the workspaces.

## Main Components

The core user-facing parts of the extension are the popup and the options page.

### Popup

- **Location**: The source code for the popup is located in `pages/popup`.
- **Implementation**: It is a self-contained React application, built with Vite. The entry point is `pages/popup/index.html`, and the main React component is in `pages/popup/src/Popup.tsx`.
- **Styling**: It uses Tailwind CSS, with the configuration in `pages/popup/tailwind.config.ts`.

### Options Page

- **Location**: The source code for the options page is located in `pages/options`.
- **Implementation**: Similar to the popup, it is a self-contained React application built with Vite. The entry point is `pages/options/index.html`, and the main React component is in `pages/options/src/Options.tsx`.
- **Styling**: It also uses Tailwind CSS, with its configuration in `pages/options/tailwind.config.ts`.

## Shared Code

The `packages/` directory contains shared modules used by different parts of the extension.

### Shared UI Controls

- **Location**: Shared React components are located in `packages/ui/lib`.
- **How to add a new control**:
    1. Create a new component file in `packages/ui/lib`.
    2. Export the new component from `packages/ui/index.ts`.
    3. The component can then be imported and used in any of the `pages` applications (e.g., `import { MyComponent } from '@extension/ui';`).
    4. The reference to the shared ui controls has to be added to package.json of the corresponding project, i.e `dependencies": { "@extension/ui": "workspace:*"}`,

### Shared Utilities

- **Location**: Shared utility functions are located in `packages/shared/lib`.
- **How to add a new utility**:
    1. Create a new file in `packages/shared/lib` with the utility functions.
    2. Export the functions from `packages/shared/index.mts`.
    3. The utilities can then be imported and used anywhere in the project (e.g., `import { myUtil } from '@extension/shared';`).
    4. The reference to the shared utilities has to be added to package.json of the corresponding project, i.e `dependencies": { "@extension/shared": "workspace:*"}`,

### Internationalization (i18n)

- **Location**: The i18n package is located in `packages/i18n`.
- **Translations**: JSON translation files are in `packages/i18n/locales`.
- **How to add new translations**:
    1. Add the new key-value pairs to the JSON files in `packages/i18n/locales`.
    2. The `useTranslate` hook from `@extension/i18n` can be used in React components to get the translated strings.

### Shared Types and Interfaces

When defining shared data structures or interfaces that are used across multiple packages, it's crucial to maintain consistency and ensure all relevant properties are defined in the primary interface.

-   **Location**: Core interfaces, such as `QRCodeBoxProps`, are defined in files like `packages/storage/lib/impl/QRCodeBoxProps.tsx`.
-   **Usage in Storage**: Other types, like `StoredSettings` in `packages/storage/lib/impl/qrSettingsStorage.ts`, often derive their properties by picking from these core interfaces (e.g., `Pick<QRCodeBoxProps, ...>`).
-   **Important Note**: If a new property is introduced that needs to be stored or used in a derived type (like `StoredSettings`), it *must* first be added to the primary interface (e.g., `QRCodeBoxProps`). Failing to do so will result in TypeScript errors (e.g., "Type '...' is not assignable to type 'keyof QRCodeBoxProps'") during the build process, as the derived type will attempt to pick a property that doesn't exist in its source. Always ensure the primary interface is updated before extending its usage in other types.

## State Management in the Options Page

The Options page (`pages/options`) allows users to customize their QR codes. This state needs to persist across browser sessions, which introduces some complexity, especially when handling user modifications to predefined presets.

### Storage Layer

-   **Implementation**: All QR code settings are persisted using a dedicated storage module located at `packages/storage/lib/impl/qrSettingsStorage.ts`.
-   **API**: This module provides methods like `get`, `set`, and `setAll` to interact with the browser's storage.

### Presets vs. Custom Settings

The Options page features design presets (e.g., "Blue," "Red") that a user can select. A key challenge is managing the state when a user selects a preset and then modifies one of its properties (e.g., changes a color).

To solve this, we use a special property in our stored settings: `selectedDesign`.

1.  **Selecting a Preset**: When a user clicks a preset (e.g., "Blue"), all the settings from that preset are applied, and the `selectedDesign` property is set to the ID of that preset (e.g., `'blue'`). This is done in a single, atomic operation using `qrSettingsStorage.setAll()`.

2.  **Modifying a Preset**: If the user then changes a color or another setting, we need to break the link to the original preset. To do this, the `selectedDesign` property is immediately changed to a special value: `'custom'`.

3.  **The "Custom" State**: This `'custom'` value tells the application that the current settings are no longer a direct representation of a saved preset but are a unique, user-defined configuration. The UI reflects this by showing a "Custom" preset as selected.

### Atomic Updates

It is critical that any change to a setting that results in a `'custom'` state is saved atomically. This means that both the new setting value (e.g., the new foreground color) and the new state (`selectedDesign: 'custom'`) must be saved in the same storage operation.

-   **Incorrect**: `qrSettingsStorage.setForegroundColor(color)` followed by a separate `qrSettingsStorage.setSelectedDesign('custom')`. This can create a race condition where one update might fail or be overwritten.
-   **Correct**: `qrSettingsStorage.setAll({ foregroundColor: color, selectedDesign: 'custom' })`. This ensures that both properties are updated together, preventing data inconsistency.

This approach ensures that user modifications are reliably saved and restored, even after refreshing the page.

## Extension Core

The core logic of the browser extension resides in the `chrome-extension` package.

### Manifest

- **Location**: The manifest is generated from `chrome-extension/manifest.ts`.
- **How to add changes**:
    1. Modify the `manifest.ts` file to add or remove permissions, content scripts, etc.
    2. The build process will generate the final `manifest.json` file.

### Background Scripts

- **Location**: Background scripts are located in `chrome-extension/src/background`.
- **How to add a new background script**:
    1. Create a new TypeScript file in `chrome-extension/src/background`.
    2. Add the new script to the `background` section of `chrome-extension/manifest.ts`.

## Testing

### End-to-End (E2E) Tests

- **Location**: E2E tests are located in `tests/e2e/specs`.
- **Framework**: The tests are written using Playwright.
- **How to add a new test**:
    1. Create a new `*.spec.ts` file in `tests/e2e/specs`.
    2. Write the test using the Playwright API.
    3. Run the tests using the `pnpm e2e` command.

## Build Process

The build process is managed by Turborepo and defined in the root `package.json`.

- **`pnpm build`**: This command builds all the packages in the correct order.
- **`pnpm dev`**: This command starts the development server for the pages and watches for changes.
- **`pnpm zip`**: This command creates a zip file of the extension for distribution.

## Dependency Management

- **pnpm**: The project uses pnpm for package management.
- **Workspaces**: Dependencies can be added to individual workspaces (e.g., `pnpm -F @qroar/popup add <package>`) or to the root `package.json` for shared dev dependencies.
