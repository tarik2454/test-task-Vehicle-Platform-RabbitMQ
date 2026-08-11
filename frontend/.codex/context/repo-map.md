# Repo Map

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Zustand
- Axios
- Sentry
- Socket.IO client
- React Hook Form + Zod

## Root

- `src/` - app code
- `public/` - static assets
- `.codex/` - local project context
- `.github/` - GitHub workflows and templates
- `docs/` - product and reference docs already present in the repo
- `README.md` - still close to default template, not the main source of project context
- `Dockerfile` - build/runtime with Doppler

## Source Layout

- `src/app/` - routes and layouts
- `src/assets/` - icons and images
- `src/components/` - UI and feature components
- `src/constants/` - routes and constants
- `src/providers/` - app providers
- `src/server/` - services, hooks, query keys, types, utils
- `src/shared/` - hooks, schemas, mappers, types, lib
- `src/stores/` - Zustand stores
- `src/utils/` - app utilities
- `src/ws/` - websocket code

## Route Groups

- `src/app/(auth)` - auth entry flows and onboarding
- `src/app/(backoffice)` - embedded admin/backoffice area under `/admin`
- `src/app/(main)` - creator-facing site pages under `/creator/[creatorSlug]`
- `src/app/(platform)` - public platform pages such as explore, profile, rewards, support
- `src/app/(chat)` - chat pages
- `src/app/(docs)` - documentation pages
- `src/app/(live)` - live player pages
- `src/app/api/` - proxy and health endpoints

## Key Subtrees

- `src/components/common/`
- `src/components/layout/`
- `src/components/ui/`
- `src/components/ui/Modals/`
- `src/hooks/`
- `src/providers/`
- `src/server/services/`
- `src/server/hooks/`
- `src/server/query-keys/`
- `src/shared/mappers/`
- `src/shared/schemas/`
- `src/shared/lib/`
- `src/stores/auth/`, `src/stores/backoffice/`, `src/stores/global/`, `src/stores/main/`, `src/stores/platform/`

## Domains

- `auth and onboarding`
- `platform discovery and profile`
- `creators`
- `chat and support`
- `leaderboards`
- `wagers and wager rewards`
- `quests and raffles`
- `inventory and store`
- `events and offers`
- `faqs`
- `support tickets`
- `live streams and stream settings`
