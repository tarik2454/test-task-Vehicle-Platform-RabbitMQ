# Critical Rules

## Docs

- Keep local project context in `.codex/`
- Do not use root `docs/` for local working notes
- Keep commands/checklists in `context/`
- Keep durable rules here

## Safety

- Do not commit secrets, tokens, private keys, or signed URLs
- Treat `.env` as local-only
- Keep `.env.example` safe to commit

## Workflow

- At session start, inspect last 3 commits
- Prefer `git log -n 3 --oneline --stat`
- Open full commit details only if relevant
- Check `.codex/context/commands.md` before noticeable changes
- Check `.codex/context/team-guidelines.md` before architectural, broad, shared, or owner-sensitive changes
- Refresh `.codex/context/*.md` when structure, env, domains, or integrations change
- For large conflicts in another developer's active area, coordinate with that developer instead of resolving alone

## Conventions

- Keep `.env.example` and `env.d.ts` aligned
- Treat this repo as a multi-surface frontend, not an admin-only app
- Use `.codex/skills/local-commits/SKILL.md` plus the global `commit-message-format` skill for branch names and commit messages
- For this repository, ALWAYS use `.codex/skills/local-commits/SKILL.md` before proposing branch names, commit messages, or commit structure
- `.codex/skills/local-commits/SKILL.md` overrides generic commit or branch naming guidance for this repository
- Use short kebab-case branch names in `type/short-description` format
- Use Conventional Commits: `type(scope): short imperative summary`, or `type: short imperative summary`
- Keep one logical action per commit
- Prefer SSOT fixes over duplicated logic, state, styles, or copied functions
- Before changing shared navigation, layout, auth, websocket, or modal infrastructure, check whether platform, creator, and backoffice all consume it
- For API contract changes, review `src/server/services/`, `src/server/types/`, and `src/shared/mappers/`
- For route-group-specific changes, prefer the narrowest layout or subtree instead of global wrappers
- For payout, leaderboard, creator, FAQ, moderation, wager, or support changes, also check related stores and query hooks
- For route and permission changes, check `src/constants/routes.ts`, `src/constants/access-routes.ts`, and any matching layout or guard
- If tests are added, document the command in `.codex/context/commands.md`

## Verification

- Prefer at least `npm run lint`
- Prefer `npm run type-check` for TypeScript code changes
- Use `npx prettier --check <path>` when formatting matters
- Call out env/stage/test limitations in verification notes
