<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Project documentation for local development is stored in `.codex/`.

## Structure

- `.codex/context/repo-map.md` - a short map of the repository and its main directories.
- `.codex/context/commands.md` - development commands, environment notes, and useful links.
- `.codex/context/team-guidelines.md` - team ownership, collaboration, SSOT, branch, and commit rules.
- `.codex/rules/critical-rules.md` - important local rules and constraints.
- `.codex/skills/local-commits/SKILL.md` - local skill for branch names and commit messages.
- `.codex/skills/local-prs/SKILL.md` - local skill for PR titles and PR bodies.

## Principles

- Keep local links, notes, and project context in `.codex/`, not in the root `docs/` directory.
- Use `.codex` as the primary source of repository-specific context and update it when new stable, useful project information appears.
- Keep `.codex` aligned with this frontend repository, not with the separate admin frontend.
- Treat `AGENTS.md` as the short entrypoint and `.codex/` as the detailed local knowledge base.
- Do not add secrets, tokens, or private keys to Markdown files.
- If new useful development information appears, update the appropriate file in `.codex/`.
- Use `.codex/context/team-guidelines.md` for team ownership and collaboration rules.

## Current Project Scope

- This repository is the main RewardsVip frontend.
- It includes public platform pages, creator-facing pages, auth flows, chat, docs pages, live pages, and the embedded backoffice admin area.
- Do not assume this project is admin-only. Route groups under `src/app/` must be evaluated in context before changing shared UI, layout, auth, SEO, or websocket behavior.

## Contract-First Rule

For tasks involving external integrations or contracts, do not guess.

This includes:

- backend API request and response fields
- Swagger and OpenAPI contracts
- SDK and library integration points
- third-party service configuration
- enums, payload formats, query params, headers, and mutation bodies

Required verification order:

1. Check local typed contracts and existing project usage.
2. Verify the external contract in the relevant documentation or contract source.
3. Only then implement the minimal necessary change.

Do not add speculative fallback fields or extra payload keys unless verified by docs or real API responses.
Do not use speculative API or integration fixes when the contract is unclear.

## Team Coordination Rule

- Before large or architectural changes, check `.codex/context/team-guidelines.md` for code owners and coordination expectations.
- For module-owner areas, tag or consult the owner before broad edits, conflict resolution, or risky refactors.
- Keep fixes SSOT-oriented: fix the root component, hook, utility, or mapper rather than duplicating logic across screens.

## Frontend Change Rule

Before changing navigation, layouts, shared providers, route groups, or common UI primitives:

1. Check whether the code is used by platform pages, creator pages, and backoffice pages.
2. Confirm whether there is a route-group-specific layout or wrapper that is safer to change.
3. Prefer the narrowest surface that solves the issue without altering unrelated experiences.

## Local Context Hygiene

- Keep `.codex` concise and high-signal.
- Prefer durable facts over temporary debugging notes.
- When a local note becomes outdated, update or delete it instead of letting conflicting guidance accumulate.
