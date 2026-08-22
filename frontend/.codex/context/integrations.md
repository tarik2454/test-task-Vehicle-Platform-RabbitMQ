# Frontend Integrations

## Request Layer

- Generic request logic: `src/server/index.ts`
- User API functions: `src/server/users.ts`
- Vehicle API functions: `src/server/vehicles.ts`
- Shared request and response types: `src/types/index.ts`

Requests use JSON for mutation bodies, disable fetch caching, and throw an error
containing the backend response text when a response is not successful.

## User API

- Base port: `4001`
- Resource: `/users`
- Operations: list, get by ID, create, update, and delete.

## Vehicle API

- Base port: `4002`
- Resource: `/vehicles`
- Operations: list, get by ID, create, update, and delete.

## Cross-Service Behavior

Creating a user also causes the backend services to create a default vehicle
through RabbitMQ. The frontend does not publish or consume RabbitMQ messages
directly.

For contract changes, verify backend DTO validation and returned data before
editing frontend types or payloads.
