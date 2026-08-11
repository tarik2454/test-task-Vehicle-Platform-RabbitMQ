# Environment

## Files

- `.env`
- `.env.example`
- `env.d.ts`

## Variables

- `NEXT_PUBLIC_NODE_ENV`
- `NEXT_PUBLIC_WEBSITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `SSR_API_URL`
- `NEXT_PUBLIC_SENTRY_DSN`

## Main Usage

- `src/server/apiAxios.ts`
- `src/ws/index.ts`
- `src/utils/image.ts`
- `src/hooks/useOAuth.ts`
- `src/providers/index.tsx`
- `src/proxy.ts`
- `src/seo/base.config.ts`
- `sentry.client.config.ts`
- `sentry.edge.config.ts`
- `sentry.server.config.ts`

## Rules

- Keep `env.d.ts` and `.env.example` in sync
- Use placeholders only in `.env.example`
- Prefer adding a variable to `env.d.ts` when it is used in app code
- When changing host or redirect behavior, review platform pages, creator URLs, auth callbacks, and proxy routes together
