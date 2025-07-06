<div align="center">

<picture>
    <!-- TODO: Replace with actual extension logo if available, or a more generic QR code logo -->
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/99cb6303-64e4-4bed-bf3f-35735353e6de" />
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/a5dbf71c-c509-4c4f-80f4-be88a1943b0a" />
    <img alt="Logo" src="https://github.com/user-attachments/assets/99cb6303-64e4-4bed-bf3f-35735353e6de" />
</picture>

# QR Code Generator Extension

**Generate and customize QR codes directly in your browser!**

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
<!-- TODO: Update badges if necessary, e.g., link to this project's actions if CI is set up -->
<!-- ![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/build-zip.yml/badge.svg) -->
<!-- ![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/lint.yml/badge.svg) -->

<!-- TODO: Update or remove hits counter and Discord link if not applicable -->
<!-- <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/YOUR_REPO_PATH&count_bg=%23#222222&title_bg=%23#454545&title=😀&edge_flat=true" alt="hits"/> -->
<!-- <a href="https://discord.gg/4ERQ6jgV9a" target="_blank"><img src="https://discord.com/api/guilds/1263404974830915637/widget.png"/></a> -->

</div>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Structure](#structure)
    - [Extension Core](#structure-extension-core)
    - [User Interface Pages](#structure-pages)
    - [Shared Packages](#structure-packages)
- [Getting Started (for Developers)](#getting-started-for-developers)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Loading the Extension](#loading-the-extension)
        - [Chrome](#loading-chrome)
        - [Firefox](#loading-firefox)
    - [Building for Production](#building-for-production)
- [Managing Dependencies](#managing-dependencies)
    - [For the entire project (root)](#dependency-for-root)
    - [For a specific page or package](#dependency-for-module)
- [Key Technologies](#key-technologies)
<!-- - [Community](#community) -->
<!-- - [Reference](#reference) -->

## Intro

This is a browser extension for Chrome and Firefox that allows you to quickly generate QR codes for web pages, selected text, or any custom input. You can also personalize the appearance of your QR codes, including colors, embedded logos, and various design styles.

The extension is built using modern web technologies like React and TypeScript, with Vite for a fast development experience and pnpm with Turborepo for efficient monorepo management.

## Features

- **Instant QR Code Generation:** Create QR codes for the current URL, any text input, etc. (Actual generation capabilities to be confirmed by inspecting `Popup.tsx`)
- **Customizable Appearance:**
    - **Colors:** Choose custom colors for the QR code and background.
    - **Logos:** Embed a logo in the center of your QR code.
    - **Designs:** Select from various pre-set design styles for your QR codes.
- **User-Friendly Interface:**
    - **Popup:** Quick access to QR generation via the extension toolbar icon.
    - **Options Page:** Detailed settings to customize QR code appearance and extension behavior.
- **Built with Modern Tech:** React 19, TypeScript, Tailwind CSS, Vite.
- **Cross-Browser Compatible:** Designed for Chrome and Firefox.

## Structure

The project is organized as a monorepo using pnpm workspaces.

### Extension Core <a name="structure-extension-core"></a>

Located in the `chrome-extension/` directory:

- `manifest.ts`: Defines the extension's properties, permissions, background scripts, and declares the popup and options pages.
- `src/background/index.ts`: Handles background tasks and events for the extension.
- `public/`: Contains static assets like extension icons.

### User Interface Pages <a name="structure-pages"></a>

These are the interactive parts of the extension, found in the `pages/` directory. Each is a separate Vite application.

- **`pages/popup/`**:
    - Contains the UI for the popup window that appears when you click the extension icon.
    - `src/Popup.tsx` is the main component for this view, likely handling QR code generation and display.
- **`pages/options/`**:
    - Provides the options/settings page for the extension.
    - `src/Options.tsx` is the main component, allowing users to configure:
        - `src/ColorSettings.tsx`: QR code and background colors.
        - `src/LogoSettings.tsx`: Embedding and selecting logos.
        - `src/qrDesignsArray.ts`: Choosing from available QR code designs.

### Shared Packages <a name="structure-packages"></a>

Reusable code and configurations are organized into local packages within the `packages/` directory:

- `packages/shared/`: Common utilities, hooks, types, or components used across different parts of the extension.
- `packages/ui/`: Likely contains shared React UI components and Tailwind CSS utilities/presets.
- `packages/storage/`: Helper functions for managing data in browser storage (e.g., user settings).
- `packages/i18n/`: For internationalization, allowing the extension to be translated into multiple languages.
- `packages/env/`: Manages environment variables.
- `packages/tailwind-config/`: Shared Tailwind CSS configuration.
- `packages/tsconfig/`: Shared TypeScript configurations.
- `packages/vite-config/`: Shared Vite build configurations.
- `packages/dev-utils/`: Development utilities.
- `packages/hmr/`: Custom Hot Module Replacement setup for Vite.
- `packages/zipper/`: Script (`pnpm zip`) to package the `dist` folder for distribution.
- `packages/module-manager/`: A tool (`pnpm module-manager`) to enable/disable different modules (though this extension currently focuses on popup and options).

## Getting Started (for Developers) <a name="getting-started-for-developers"></a>

### Prerequisites <a name="prerequisites"></a>

1.  **Git EOL Configuration (Windows users):**
    ```bash
    git config --global core.eol lf
    git config --global core.autocrlf input
    ```
    This ensures compatibility with Linux/macOS line endings.
2.  **Node.js:** Ensure your Node.js version is >= the one specified in the `.nvmrc` file. Using [nvm](https://github.com/nvm-sh/nvm) is recommended.
3.  **pnpm:** Install pnpm globally (Node.js >= 22.12.0 recommended for pnpm):
    ```bash
    npm install -g pnpm
    ```

### Installation <a name="installation"></a>

1.  Clone this repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory and install dependencies:
    ```bash
    pnpm install
    ```

### Development <a name="development"></a>

To start the development server with Hot Module Replacement (HMR):

-   **For Chrome:**
    ```bash
    pnpm dev
    ```
    (On Windows, you might need to run this as an administrator if you encounter issues like [issue#456](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/456) from the original boilerplate).
-   **For Firefox:**
    ```bash
    pnpm dev:firefox
    ```

This will create a `dist/` directory with the unpacked extension files.

### Loading the Extension <a name="loading-the-extension"></a>

#### Chrome <a name="loading-chrome"></a>

1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** (toggle in the top right).
3.  Click **Load unpacked**.
4.  Select the `dist` directory from your project's root.

#### Firefox <a name="loading-firefox"></a>

1.  Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2.  Click **Load Temporary Add-on...**.
3.  Select the `dist/manifest.json` file from your project's root.

> **Note for Firefox:** Temporary add-ons are removed when Firefox is closed. You'll need to reload it each session.

### Building for Production <a name="building-for-production"></a>

To create an optimized production build in the `dist/` directory:

-   **For Chrome:**
    ```bash
    pnpm build
    ```
-   **For Firefox:**
    ```bash
    pnpm build:firefox
    ```

To package the `dist` folder into a zip file (e.g., `extension-YYYYMMDD-HHmmss.zip`) in a `dist-zip/` directory, run:
```bash
pnpm zip
```

## Managing Dependencies <a name="managing-dependencies"></a>

This project uses pnpm workspaces.

### For the entire project (root) <a name="dependency-for-root"></a>

(Rarely needed for typical application dependencies)
```bash
pnpm add <package-name> -w
```

### For a specific page or package <a name="dependency-for-module"></a>

This is the common way to add dependencies.
```bash
pnpm add <package-name> -F <module-name>
```
-   `<package-name>`: The name of the npm package you want to install (e.g., `dayjs`).
-   `<module-name>`: The `name` field from the `package.json` of the target page or package (e.g., `@extension/popup`, `qr-code-options-page`, `@project/shared`). You can often use the shorter name like `popup` or `shared`.

Example: To add `dayjs` to the `popup` page:
`pnpm add dayjs -F @extension/popup` (or `pnpm add dayjs -F popup`)

## Key Technologies

- React 19
- TypeScript
- Vite (with Rollup for builds)
- Tailwind CSS
- pnpm (with Workspaces)
- Turborepo
- Chrome Extensions Manifest Version 3

<!-- ## Community -->
<!--
To chat with other community members, you can join the [Discord](https://discord.gg/4ERQ6jgV9a) server.
You can ask questions on that server, and you can also help others.
-->

<!-- ## Reference -->
<!--
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo Documentation](https://turbo.build/repo/docs)
-->

---
<!-- TODO: Update "Made by" if desired -->
<!-- Made by [Your Name/Organization](link) -->
