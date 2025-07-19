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
- **Implementation**: It is a self-contained React application, built with Vite. The entry point is `pages/popup/index.html`, and the main React component is in `pages/popup/src/main.tsx`.
- **Styling**: It uses Tailwind CSS, with the configuration in `pages/popup/tailwind.config.ts`.

### Options Page

- **Location**: The source code for the options page is located in `pages/options`.
- **Implementation**: Similar to the popup, it is a self-contained React application built with Vite. The entry point is `pages/options/index.html`, and the main React component is in `pages/options/src/main.tsx`.
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
