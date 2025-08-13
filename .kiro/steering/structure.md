# Project Structure

## Monorepo Organization
This is a **pnpm workspace** monorepo managed by **Turborepo** with the following structure:

```
qroar/
├── chrome-extension/          # Core extension files (manifest, background scripts)
├── pages/                     # Extension UI pages
│   ├── popup/                # Main popup interface
│   └── options/              # Settings/customization page
├── packages/                  # Shared code and utilities
│   ├── ui/                   # Shared React components
│   ├── shared/               # Common utilities and helpers
│   ├── storage/              # Browser storage management
│   ├── i18n/                 # Internationalization
│   └── [other packages]/     # Additional shared modules
├── tests/e2e/                # End-to-end tests (Playwright)
└── bash-scripts/             # Build and deployment scripts
```

## Key Directories

### `/chrome-extension`
- **Purpose**: Core browser extension logic
- **Key Files**: 
  - `manifest.ts` - Extension manifest configuration
  - `src/background/` - Background scripts
  - `vite.config.mts` - Build configuration

### `/pages`
Each page is a **self-contained React application** built with Vite:
- **`popup/`** - Main extension interface (React app)
- **`options/`** - Settings and customization page (React app)
- Each has its own `package.json`, `tailwind.config.ts`, and build setup

### `/packages` (Shared Code)
- **`ui/`** - Reusable React components
  - Add components in `lib/`, export from `index.ts`
  - Reference as `@extension/ui` in other packages
- **`shared/`** - Common utilities and helpers
  - Export from `index.mts`, reference as `@extension/shared`
- **`storage/`** - Browser storage abstractions and QR settings management
- **`i18n/`** - Translation files in `locales/` directory

## Workspace Dependencies
- Use `workspace:*` references in `package.json` for internal packages
- Add dependencies with: `pnpm add <package> -F <workspace-name>`
- Root dependencies: `pnpm add <package> -w`

## Important Patterns

### State Management
- **QR Settings**: Managed through `packages/storage` with atomic updates
- **Preset vs Custom**: Use `selectedDesign` property to track preset modifications
- **Critical**: Always use `setAll()` for atomic updates when changing to 'custom' state

### Component Architecture
- Shared components in `packages/ui/lib/`
- Page-specific components within respective `pages/` directories
- Export shared components from `packages/ui/index.ts`

### Build Outputs
- All builds output to `/dist` directory
- Turborepo manages build dependencies and caching
- Use `pnpm build` for production, `pnpm dev` for development

## File Naming Conventions
- React components: PascalCase (e.g., `MyComponent.tsx`)
- Utilities: camelCase (e.g., `myUtility.ts`)
- Config files: kebab-case (e.g., `vite.config.mts`)
- Directories: kebab-case (e.g., `my-package/`)