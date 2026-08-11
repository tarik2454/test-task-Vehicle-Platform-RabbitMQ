# Integrations

## API

- Base URL: `NEXT_PUBLIC_API_BASE_URL`
- Swagger: `https://api.stage-rewardsvip.com/swagger#/`
- Services: `src/server/services/`
- Types: `src/server/types/`
- Hooks: `src/server/hooks/`

## Sentry

- Package: `@sentry/nextjs`
- Configs: `sentry.client.config.ts`, `sentry.edge.config.ts`, `sentry.server.config.ts`
- Wrapper: `next.config.ts`
- DSN: `NEXT_PUBLIC_SENTRY_DSN`

## Websocket

- Code: `src/ws/`
- Base URL follows `NEXT_PUBLIC_API_BASE_URL`
- Includes general app sockets and live-stream-specific listeners

## Remote Images

- Config: `next.config.ts`
- Hosts include `localhost`, `api.stage-rewardsvip.com`, `api.rewards.vip`, `stage-rewardsvip.com`, `rewards.vip`, `cdn.discordapp.com`, and broader wildcard allowances

## Streaming And Proxying

- Proxy routes: `src/app/api/kick-proxy`, `src/app/api/kick-channel-proxy`, `src/app/api/twitch-proxy`, `src/app/api/twitch-m3u8`
- Player code: `src/components/common/kick-video-player`, `src/components/common/twitch-video-player`, `src/components/common/hls-video-player`
- OAuth and external platform redirects should be checked alongside env and proxy config

## Build

- Docker + Doppler
- Build: `doppler run --command 'npm run build'`
- Start: `doppler run -- npm run start`
- Local commits may also run build logic through Husky hooks
