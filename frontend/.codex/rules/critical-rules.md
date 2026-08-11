# Critical Rules

## Scope

- Keep this local context frontend-only.
- Do not mix backend, database, queue, or repo-wide infrastructure notes into `frontend/.codex/` unless they directly affect frontend runtime.

## Workflow

- Check recent frontend history before broad changes.
- Prefer `git log -n 3 --oneline --stat -- frontend`.
- If code and older notes disagree, prefer the current `frontend/` code and config.

## Conventions

- Use `.codex/skills/local-commits/SKILL.md` for branch and commit naming guidance.
- Keep one logical action per commit.
- Prefer SSOT fixes over duplicated page, helper, or style logic.
- Before removing files, verify whether the active surface is `app/` or legacy `src/`.

## Verification

- Prefer `cd frontend && npm run lint`.
- Use `cd frontend && npm run build` when routes, styling, or app-router files change.
- Call out frontend env or Docker limitations in verification notes when relevant.
