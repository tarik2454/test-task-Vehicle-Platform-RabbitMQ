# Commands

## Dev

- `npm run dev`
- `npm run build`
- `npm run start`

## Quality

- `npm run test`
- `npm run lint`
- `npm run lint:fix`
- `npm run type-check`
- `npx prettier --write <path>` for targeted formatting
- `npx prettier --check <path>` when you need a formatting-only verification
- Badge layout regression tests: `npm run test -- test/unit/creator-verified-badges.test.tsx test/unit/live-stream-info-badges.test.tsx`

## Notes

- Unit/component tests run with Vitest through `npm run test`
- Husky/lint-staged run on commit and may trigger a production build
- `README.md` is still close to the default Next.js template
- Docker build uses Doppler
- `AGENTS.md` and `.codex/` are intentionally local-only and ignored by git
- Recent history: `git log -n 3 --oneline --stat`
- Commit format: `type(scope): short imperative summary`
- Branch format: `type/short-description` with kebab-case descriptions
- Local commit skill: `.codex/skills/local-commits/SKILL.md`

## Env

- Copy `.env.example` to `.env`
- Details: `.codex/context/env.md`
- Sentry DSN is optional locally

## Links

- Swagger: `https://api.stage-rewardsvip.com/swagger#/`
- App local: `http://localhost:3000`
- Admin area local: `http://localhost:3000/admin`
- Creator page local example: `http://localhost:3000/creator/[creatorSlug]`
- Platform stage: `https://stage-rewardsvip.com`
- Admin stage route on platform host: `https://stage-rewardsvip.com/admin`
- Stage API: `https://api.stage-rewardsvip.com`
- Current frontend: `/Users/taras/Desktop/rewardsvip-fe`
- Figma: add when available
- Notion: add when available
