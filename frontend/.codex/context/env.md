# Frontend Environment

## Runtime Addresses

- Frontend: `http://localhost:3000`
- User API: browser hostname on port `4001`
- Vehicle API: browser hostname on port `4002`

## Current API Resolution

`src/server/index.ts` derives the hostname from `window.location.hostname` in
the browser and falls back to `localhost` during server-side execution. The user
and vehicle ports are currently fixed in that module.

The frontend does not currently read public API URL environment variables. Do
not document or introduce an unused variable as if it were active.

## Docker

Docker Compose publishes the frontend on port `3000` and the backend APIs on
ports `4001` and `4002`. The frontend container starts after both backend
containers have started, but Compose does not currently wait for backend HTTP
health checks.

Never commit `frontend/.env` or add real credentials to `.codex`.
