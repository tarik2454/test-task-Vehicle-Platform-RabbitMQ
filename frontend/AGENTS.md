<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend Instructions

This file is the self-contained entrypoint for work inside `frontend/`. All
frontend-specific agent configuration lives in this file, `.codex/`, and
`.agents/` so the directory can move to a standalone repository without relying
on instructions from its current parent repository.

## Required Reading

- Before every frontend task, read `.codex/rules/critical-rules.md` and
  `.codex/context/checklist.md`.
- Read only the additional context files relevant to the task: repository and
  domain maps for ownership, commands for verification, environment and
  integrations for runtime or API work, and team guidelines for shared changes.
- Treat current source, package scripts, and configuration as authoritative when
  a context file is stale, then update the stale context in the same change.

## Context Map

- `.codex/context/repo-map.md` - stack and source tree.
- `.codex/context/domain-map.md` - current product areas and ownership.
- `.codex/context/commands.md` - development and quality commands.
- `.codex/context/env.md` - ports and runtime assumptions.
- `.codex/context/integrations.md` - HTTP API integration details.
- `.codex/context/checklist.md` - task workflow.
- `.codex/context/team-guidelines.md` - collaboration and Git conventions.
- `.codex/rules/critical-rules.md` - mandatory frontend rules.
- `.agents/skills/vehicle-platform-frontend-commits/SKILL.md` - branch and
  commit naming.
- `.agents/skills/vehicle-platform-frontend-prs/SKILL.md` - pull request
  guidance.

## Project Scope

- Next.js 16 App Router and React 19.
- TypeScript with strict checking.
- Tailwind CSS 4 plus SCSS modules.
- Active application code lives under `src/`.
- The UI manages users and vehicles through two independent backend APIs.

## Ownership Boundaries

- Keep routes and layouts under `src/app/`.
- Keep reusable UI under `src/components/`.
- Keep service requests in `src/server/` and shared data shapes in `src/types/`.
- Keep types used only by one component next to it in its `.tsx` file. Put shared
  types in the nearest module that owns them.
- Prefer keeping static constants next to the code that uses them. A constant
  can stay in the same file when several components or functions in that file
  use it. Group related configuration in a colocated file when it makes the code
  easier to read.
- Across files, share a constant when it represents the same rule and should
  change together for all consumers. Use the nearest owning module and reserve
  `src/constants/` for application-wide values such as routes and theme settings.
- Keep API request and response types in `src/types/` even when only one
  component uses them.
- Do not scatter backend URLs, ports, or raw fetch logic through components.
- Before changing a request or response shape, inspect the matching backend DTO,
  controller, service response, frontend type, request helper, and UI consumer.
- Use the task checklist for verification; scale checks to the files and behavior
  changed.

## Context Hygiene

- Keep `.codex` and the frontend skills frontend-only and aligned with current
  source and package scripts.
- Prefer durable facts over temporary debugging notes.
- Remove obsolete context instead of keeping conflicting instructions.
- Never add secrets, `.env` contents, private keys, or credentials.
