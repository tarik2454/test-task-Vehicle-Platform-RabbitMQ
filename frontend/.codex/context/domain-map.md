# Domain Map

## Areas

- `auth and onboarding` - `src/app/(auth)`, auth stores, OAuth helpers, verification flows
- `platform` - public marketing/product pages, explore, profile, rewards, support
- `creator sites` - `src/app/(main)/creator/[creatorSlug]`, creator layouts, creator nav and sections
- `backoffice` - `src/app/(backoffice)/admin`, admin CRUD flows, moderation, settings, payouts
- `chat` - `src/app/(chat)`, chat UI, message input, attachments, secure ticket actions
- `leaderboards` - services, types, filters, payout views, creator/public/admin screens
- `wagers and wager rewards` - wager tables, upload/import flows, review/pending rewards
- `quests and raffles` - chain/review/pending rewards flows plus public creator views
- `inventory, store, and orders` - inventory CRUD, store views, order messaging and claim flows
- `events, offers, and FAQs` - shared content domains across platform, creator, and admin
- `live streams` - player pages, websocket listeners, stream settings, proxy routes
- `support tickets` - `src/stores/support-tickets/`, support modals, admin ticket handling

## Cross-Cutting

- `src/constants/routes.ts`
- `src/constants/access-routes.ts`
- `src/shared/mappers/`
- `src/shared/schemas/`
- `src/components/ui/Modals/`
- `src/hooks/`
- `src/providers/`
- `src/server/hooks/`
- `src/server/services/`
- `src/server/query-keys/`
- `src/constants/`
