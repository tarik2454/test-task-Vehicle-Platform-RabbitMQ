# Repository Instructions

- For any work under `frontend/`, read and follow `frontend/AGENTS.md`.
- Treat those instructions as frontend-only; do not apply them to
  `user-service/` or `vehicle-service/`.

## Development

Run repository-level commands from the repository root.

- Start the complete project: `docker compose up --build`.
- Start it in the background: `docker compose up --build -d`.
- Follow all container logs: `docker compose logs -f`.
- Stop the project: `docker compose down`.

After startup, the frontend is available at `http://localhost:3000`, the user
API at `http://localhost:4001`, the vehicle API at `http://localhost:4002`, and
RabbitMQ management at `http://localhost:15672`.

## Individual Applications

- Frontend: `cd frontend && npm run dev`.
- User service: `cd user-service && npm run dev`.
- Vehicle service: `cd vehicle-service && npm run dev`.

Prefer Docker Compose for the complete system. Running a backend service by
itself requires its PostgreSQL database, RabbitMQ, and environment variables to
be available separately.
