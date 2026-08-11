# Team Guidelines

## Collaboration

- Treat this local context as frontend-only.
- For broad changes, identify the frontend source of truth first: `app/`, styles, config, or frontend API helpers.
- If docs disagree with frontend code, document the mismatch instead of assuming the docs are correct.

## Single Source Of Truth

- Do not patch the same behavior separately across multiple pages if a shared frontend fix is enough.
- If a fix needs copied logic, extract or centralize the shared behavior.
- If a frontend contract changes, update helper code, local types, and affected pages together.

## Git Freshness

- Start work by checking recent history before creating follow-up changes.

## Branch Names

Use short kebab-case branch names:

```text
type/short-description
```

Examples:

- `feature/users-page`
- `bugfix/homepage-build-error`
- `refactor/app-server-helpers`
- `docs/update-codex-context`
