# Frontend Critical Rules

## Architecture

- Treat `src/app/` as the active Next.js App Router tree.
- Do not create a second root-level `app/`, `components/`, or `server/` tree.
- Keep backend host and port resolution centralized in `src/server/index.ts`.
- Keep user and vehicle request functions in their owning server modules.
- Do not change frontend contracts without checking the matching backend DTO and
  response shape.

## React And TypeScript

- Keep `'use client'` limited to components that need browser behavior.
- Use clear loading, empty, error, and submitting states.
- Prefer early returns for whole-render states and boolean guards for local JSX
  branches when they improve readability.
- Avoid unsafe types and speculative response fields.

## Styling And Formatting

- Keep SCSS modules colocated with their route or component.
- Keep global styles in `src/styles/globals.scss`.
- Keep both `prettier-plugin-css-order` and `prettier-plugin-tailwindcss`
  loadable when changing Prettier configuration.
- Avoid broad formatting changes during focused work.

## Safety

- Do not commit `.env`, PEM files, secrets, caches, `node_modules`, build output,
  or `*.tsbuildinfo` files.
- Do not edit generated `.next/`, `next-env.d.ts`, or `.eslintcache` files.
- Treat `.codex/environments/environment.toml` as generated configuration; do
  not maintain it manually.
- Preserve unrelated user changes.
