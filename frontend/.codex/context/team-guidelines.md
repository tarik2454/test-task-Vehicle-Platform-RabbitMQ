# Team Guidelines

Source: `Team Development Guidelines.pdf` from June 2026 local project context.

## Code Owners

Tag or consult the relevant owner before architectural changes, broad edits, conflict resolution, or risky fixes in their area.

| Code Owner | Area |
| --- | --- |
| Yevhenii Konovalov | `auth`, `live`, `platform`, config files, `backoffice(auth)`, WebSockets, `proxy.ts` |
| Nikita Lucenko | `coming-soon`, `docs`, `main`, `backoffice(main)`, SEO |
| Tarik | global admin |

## Before Coding

- Check neighboring tasks in `In Progress` and `To Do` before taking a bug.
- If another task touches the same component or screen, ask the teammate whether the work overlaps.
- Do not start coding a task until it is assigned to you and moved to `In Progress`.
- If touching a global component, post a short team status naming the task and shared component.
- For complex components, check Git blame and module ownership before editing.

## Collaboration

- Prefer a short owner check-in before direct edits in unfamiliar or owner-heavy modules.
- If a PR has large conflicts with another developer's branch in the same component, resolve together instead of guessing alone.
- Spend a few minutes asking who is touching a component before risking hours of conflicting architecture.

## Single Source Of Truth

- Do not copy logic, state, styles, or functions to patch a bug in another place.
- If a fix needs copied code, extract the shared behavior into a hook, utility, mapper, or component.
- If a bug appears in multiple places, fix the root component or function once instead of adding separate local patches.

## Git Freshness

- Start work by fetching and pulling the current target branch before creating a feature branch.
- Before opening or updating a PR, check whether the target branch has moved and whether conflicts are likely.

## Branch Names

Use short kebab-case branch names:

```text
type/short-description
```

Allowed types:

- `feature/` or `feat/` for new functionality
- `bugfix/` or `fix/` for bug fixes
- `hotfix/` for urgent production fixes
- `refactor/` for non-behavioral code improvements
- `docs/` for documentation-only changes

Examples:

- `feature/user-login`
- `bugfix/header-dropdown`
- `hotfix/critical-payment-error`
- `refactor/clean-database-queries`
- `docs/update-api-guidelines`

## Commits

Use the local `.codex/skills/local-commits/SKILL.md` skill and the global `commit-message-format` skill when preparing commits.

Default format:

```text
type(scope): short imperative summary
```

Use `type: short imperative summary` when scope is unnecessary.

Rules:

- Use Conventional Commits types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`.
- Write the summary in present-tense imperative form.
- Keep the first line ideally under 50 characters and never over 72 characters without a strong reason.
- Keep one logical action per commit.
- Avoid vague messages like `fix`, `done`, `fixed bug`, `asdasd`, or `changes`.
