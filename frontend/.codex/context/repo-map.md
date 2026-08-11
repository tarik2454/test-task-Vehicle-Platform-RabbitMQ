# Repo Map

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Sass modules

## Root

- `app/` - active Next.js app-router surface
- `public/` - static assets
- `.codex/` - local frontend context
- `package.json` - frontend scripts and dependencies
- `next.config.ts` - Next.js config
- `tsconfig.json` - TypeScript config

## App Surface

- `app/layout.tsx` - root layout
- `app/page.tsx` - home page
- `app/(platform)/users/page.tsx` - users page
- `app/(platform)/vehicles/page.tsx` - vehicles page
- `app/server/` - frontend-side API helper layer
- `app/styles/globals.css` - global styles

## Legacy Surface

- `src/` - older frontend files kept in the repo; verify usage before editing or deleting

## Notes

- The active work is centered around `app/`.
- SCSS modules are used in current pages and require `sass`.
