# Integrations

## Frontend Runtime

- Root layout: `app/layout.tsx`
- Global styles: `app/styles/globals.css`
- Error states: `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`

## Frontend API Layer

- Frontend helper layer lives in `app/server/`
- `app/server/users.ts` wraps users API calls
- `app/server/vehicles.ts` wraps vehicles API calls

## Styling

- Tailwind CSS 4 is enabled globally
- SCSS modules are used in current `app/` pages
- `sass` must remain installed for `*.module.scss` imports to work
