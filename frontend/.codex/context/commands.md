# Commands

## Dev

- `cd frontend && npm run dev`
- `cd frontend && npm run build`
- `cd frontend && npm run start`
- `cd frontend && npm run lint`
- `cd frontend && npx tsc --noEmit`

## Notes

- Standard local frontend URL: `http://localhost:3000`
- Recent history: `git log -n 3 --oneline --stat -- frontend`
- Branch format: `type/short-description`
- Commit format: `type(scope): short imperative summary`

## Current Caveats

- `app/` is the active Next.js surface.
- `src/` still exists and may contain stale or legacy code.
- SCSS modules require `sass` in `package.json`.
