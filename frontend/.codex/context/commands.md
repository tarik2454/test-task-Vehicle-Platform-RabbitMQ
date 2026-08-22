# Frontend Commands

Run commands from `frontend/` unless noted otherwise.

## Development

- Install exact dependencies: `npm ci`
- Start development server: `npm run dev`
- Create production build: `npm run build`
- Start production server: `npm run start`

## Quality

- Check ESLint: `npm run lint`
- Apply ESLint fixes: `npm run lint:fix`
- Check TypeScript without output: `npm run type-check`
- Check formatting: `npm run format:check`
- Apply formatting: `npm run format`

## Pre-commit

The frontend hook is normally delegated by the repository root hook. To run it
directly, execute this from the repository root:

`sh frontend/.husky/pre-commit`

It runs lint-staged for staged frontend files and then checks the complete
TypeScript project.

## Docker

From the repository root:

- Complete stack: `docker compose up --build`
- Frontend logs: `docker compose logs -f frontend`
- Stop stack: `docker compose down`

The frontend image installs dependencies with `HUSKY=0`, so Docker does not try
to configure Git hooks while preserving other npm lifecycle scripts.

Local frontend URL: `http://localhost:3000`.
