# Frontend Domain Map

## Platform Home

- `src/app/(platform)/page.tsx`
- Navigation to user and vehicle management.
- Styles: `src/app/(platform)/page.module.scss`.

## Users

- `src/app/(platform)/users/page.tsx`
- Loads, creates, and deletes users.
- Requests: `src/server/users.ts`.
- Backend owner: `user-service` on port `4001`.

## Vehicles

- `src/app/(platform)/vehicles/page.tsx`
- Loads users and vehicles, creates vehicles, and deletes vehicles.
- Requests: `src/server/vehicles.ts` and `src/server/users.ts`.
- Backend owner: `vehicle-service` on port `4002`.

## Shared UI

- `src/components/common/container/`
- `src/components/common/page-wrapper/`
- `src/components/ui/auto-table/`
- `src/components/ui/pagination/`

## Application States

- `src/app/global-error.tsx`
- `src/app/(platform)/error.tsx`
- `src/app/not-found.tsx`

Before changing shared UI, API helpers, or types, inspect every active consumer.
