<div align="center">

# qroar - 1-Click QR Code Generator

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)

</div>

## About

**qroar** is a Chrome extension that allows you to generate QR codes with a single click. It's built using a powerful and modern tech stack, designed for high performance and a smooth developer experience.

This project is based on the [chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite) and has been customized to create a QR code generator.

## Features

- **1-Click QR Code Generation:** Quickly generate QR codes for the current page URL.
- **React 19, TypeScript, Vite:** A modern and fast development environment.
- **Turborepo:** High-performance build system for monorepos.
- **TailwindCSS:** A utility-first CSS framework for rapid UI development.
- **ESLint and Prettier:** For clean, consistent, and error-free code.
- **Manifest V3:** The latest Chrome extension manifest version.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sherlock-holmes1/qroar.git
    ```
2.  **Install dependencies:**
    Make sure you have `pnpm` installed (`npm install -g pnpm`). Then run:
    ```bash
    pnpm install
    ```
3.  **Run in development mode:**
    - **Chrome:** `pnpm dev`
    - **Firefox:** `pnpm dev:firefox`
4.  **Load the extension in your browser:**
    - **Chrome:**
        1.  Go to `chrome://extensions`.
        2.  Enable "Developer mode".
        3.  Click "Load unpacked" and select the `dist` directory.
    - **Firefox:**
        1.  Go to `about:debugging#/runtime/this-firefox`.
        2.  Click "Load Temporary Add-on..." and select the `dist/manifest.json` file.

## Project Structure

The project is a monorepo with the following structure:

-   `chrome-extension/`: Contains the core extension files, including the manifest and background scripts.
-   `packages/`: Shared packages for things like UI components, storage, and configuration.
-   `pages/`: The different pages of the extension, such as the popup and options page.

## How to Add Components and Dependencies

### Adding a New UI Component

1.  **Create the component file:**
    Create a new `.tsx` file in the `packages/ui/lib` directory. For example, `packages/ui/lib/MyNewComponent.tsx`.
2.  **Export the component:**
    Add an export for your new component in `packages/ui/index.ts`.
3.  **Use the component:**
    You can now import and use your component in any of the pages (e.g., in `pages/popup/src/App.tsx`).

### Adding a New Dependency

-   **For the entire project (root):**
    ```bash
    pnpm add <package-name> -w
    ```
-   **For a specific package/page:**
    ```bash
    pnpm add <package-name> -F <workspace-name>
    ```
    For example, to add a dependency to the `popup` page:
    ```bash
    pnpm add <package-name> -F popup
    ```

## Building for Production

To create a production-ready build of the extension, run:

```bash
pnpm build
```

This will create an optimized build in the `dist` directory. To create a zip file for distribution, run:

```bash
pnpm zip
```