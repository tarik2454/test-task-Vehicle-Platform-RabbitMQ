<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Project documentation for local development is stored in `.codex/`.

## Structure

- `.codex/context/repo-map.md` - a short map of the frontend app and its main directories.
- `.codex/context/commands.md` - frontend development commands, environment notes, and useful links.
- `.codex/context/team-guidelines.md` - frontend collaboration, SSOT, branch, and commit rules.
- `.codex/rules/critical-rules.md` - important local frontend rules and constraints.
- `.codex/skills/local-commits/SKILL.md` - local skill for branch names and commit messages.
- `.codex/skills/local-prs/SKILL.md` - local skill for PR titles and PR bodies.

## Principles

- Keep frontend-only links, notes, and project context in `frontend/.codex/`.
- Use `.codex` as the primary source of frontend-specific context and update it when new stable, useful frontend information appears.
- Keep `.codex` aligned with the actual `frontend/` app, not with backend services or unrelated repo areas.
- Treat `AGENTS.md` as the short entrypoint and `.codex/` as the detailed frontend knowledge base.
- Do not add secrets, tokens, or private keys to Markdown files.
- If new useful development information appears, update the appropriate file in `.codex/`.
- Use `.codex/context/team-guidelines.md` for team ownership and collaboration rules.

## Current Project Scope

- This local context is only for the `frontend/` app.
- The active frontend uses Next.js app router under `app/`, but the folder also contains older `src/` files that should be treated as legacy until verified otherwise.
- Do not document backend services, databases, queues, or repo-wide infrastructure here unless it directly affects frontend runtime or API usage.

## Contract-First Rule

For tasks involving external integrations or contracts, do not guess.

This includes:

- frontend API request and response fields
- framework and library integration points
- SDK and library integration points
- page params, query params, headers, and payload shapes
- third-party frontend configuration

Required verification order:

1. Check local frontend code, types, and existing usage.
2. Verify the external contract in the relevant documentation or current source.
3. Only then implement the minimal necessary change.

Do not add speculative fallback fields or extra payload keys unless verified by docs or real API responses.
Do not use speculative API or integration fixes when the contract is unclear.

## Team Coordination Rule

- Before large or architectural frontend changes, check `.codex/context/team-guidelines.md`.
- Keep fixes SSOT-oriented: fix the root component, helper, style layer, or page wrapper rather than duplicating logic across screens.

## Frontend Change Rule

Before changing navigation, layouts, shared providers, route groups, styling infrastructure, or common UI primitives:

1. Check whether the code lives in the active `app/` surface or older `src/` legacy surface.
2. Confirm whether there is a route-specific layout or wrapper that is safer to change.
3. Prefer the narrowest frontend surface that solves the issue without altering unrelated pages.

## Local Context Hygiene

- Keep `.codex` concise and frontend-only.
- Prefer durable frontend facts over temporary debugging notes.
- When a local note becomes outdated, update or delete it instead of letting conflicting guidance accumulate.
