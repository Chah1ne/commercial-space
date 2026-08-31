# Contributing to Commercial Space

Thank you for helping improve Commercial Space, a platform for discovering and publishing commercial real-estate opportunities.

## Development setup

Use Node.js 22 or newer and pnpm 10. Install the locked dependency set with:

```bash
pnpm install --frozen-lockfile
```

Start the Vite development server with:

```bash
pnpm dev
```

Before opening a pull request, run the same checks used for production builds:

```bash
pnpm check
pnpm build
```

## Pull requests

Keep each pull request focused on one change. Explain the user-facing impact, include the validation commands you ran, and add screenshots when the change affects the interface. Please avoid committing generated build output, local environment files, or credentials.

## Code style

The project uses TypeScript, React, and Prettier. Prefer small, typed components and reuse the existing UI primitives and utility functions. Keep accessibility in mind by providing labels for form controls, meaningful button text, and keyboard-accessible interactions.

## Reporting issues

When reporting a bug, include the affected page, steps to reproduce, expected behavior, actual behavior, and browser or device details when relevant.
