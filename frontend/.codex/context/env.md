# Environment

## Frontend

- Local env file: `frontend/.env`
- Current local frontend port: `3000`
- Frontend API helper code derives the hostname from `window.location.hostname`

## API Usage

- Users API port referenced by the frontend helper layer: `4001`
- Vehicles API port referenced by the frontend helper layer: `4002`

## Rules

- Keep documented env and runtime assumptions aligned with actual frontend code.
- When ports or host assumptions change, update `.codex/context/commands.md` and `.codex/context/env.md`.
