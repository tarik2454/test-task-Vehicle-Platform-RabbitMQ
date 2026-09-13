# Frontend Repository Map

## Stack

- Next.js `16.3.0`
- React `19.2.8`
- TypeScript 5
- Tailwind CSS 4
- Sass and SCSS modules
- ESLint 9
- Prettier 3

## Root Files

- `AGENTS.md` - frontend instruction entrypoint and context-loading policy.
- `.codex/` - detailed frontend context, mandatory rules, and generated local
  environment metadata.
- `.agents/skills/` - discoverable frontend Git and pull request workflows.
- `package.json` - scripts, dependencies, and lint-staged configuration.
- `next.config.ts` - Next.js configuration.
- `tsconfig.json` - TypeScript configuration and `@/*` path alias.
- `eslint.config.mjs` - Next.js and TypeScript ESLint configuration.
- `postcss.config.mjs` - Tailwind PostCSS integration.
- `.prettierrc` and `.prettierignore` - formatting configuration.
- `Dockerfile` - frontend container image.

## Source Tree

- `src/app/` - App Router routes, layouts, and error boundaries.
- `src/components/common/` - shared container and page wrapper.
- `src/components/ui/` - reusable table and pagination UI.
- `src/server/` - HTTP request layer for backend services.
- `src/styles/` - global SCSS entrypoint, theme tokens, breakpoints, typography,
  and reusable mixins.
- `src/types/` - shared frontend data types.
- `public/` - static assets.

## Path Alias

`@/*` resolves from the frontend package root, so current imports use paths such
as `@/src/server/users` and `@/src/components/common/container`.
