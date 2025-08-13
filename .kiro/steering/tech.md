# Technology Stack

## Core Technologies
- **React 19** - UI framework with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 6.1.0** - Fast build tool and dev server
- **Node.js >=22.12.0** - Runtime requirement

## Build System
- **Turborepo** - Monorepo task runner for efficient builds
- **pnpm** - Package manager with workspace support
- **ESBuild** - Fast JavaScript bundler

## Styling & UI
- **TailwindCSS** - Utility-first CSS framework
- **PostCSS** - CSS processing with autoprefixer

## Code Quality
- **ESLint** - Linting with Airbnb TypeScript config
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files

## Key Libraries
- **qr-code-styling** - QR code generation and styling
- **@sentry/browser** - Error tracking and monitoring

## Common Commands

### Development
```bash
# Start development server (Chrome)
pnpm dev

# Start development server (Firefox)
pnpm dev:firefox

# Clean and reinstall dependencies
pnpm clean:install
```

### Building
```bash
# Production build (Chrome)
pnpm build

# Production build (Firefox)
pnpm build:firefox

# Create distribution zip
pnpm zip
```

### Code Quality
```bash
# Run linting with auto-fix
pnpm lint

# Run type checking
pnpm type-check

# Format code with Prettier
pnpm prettier

# Run E2E tests
pnpm e2e
```

### Maintenance
```bash
# Clean all build artifacts
pnpm clean

# Update package versions
pnpm update-version

# Module manager utility
pnpm module-manager
```

## Environment Variables
- `CLI_CEB_DEV` - Development mode flag
- `CLI_CEB_FIREFOX` - Firefox build flag
- Environment setup handled by `bash-scripts/set_global_env.sh`