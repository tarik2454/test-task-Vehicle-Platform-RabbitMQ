# Frontend Task Checklist

## Before

- Confirm `.codex/rules/critical-rules.md` and the task-relevant context files
  have been read.
- Check `git status` and preserve unrelated changes.
- Review recent frontend history when changing shared code.
- Identify affected routes, components, types, API helpers, and styles.
- For a contract change, inspect the owning backend implementation first.

## During

- Keep fetch logic in `src/server/`.
- Keep shared data contracts in `src/types/`.
- Check every consumer before changing shared UI or types.
- Prefer the narrowest route, component, or style surface that owns the behavior.
- Avoid copying request logic, state handling, or styles to patch the same issue
  in multiple places.
- Update `.codex` when a stable command, port, path, architecture boundary, or
  contract changes.
- Update the matching `.agents/skills` workflow when its durable Git or PR
  convention changes.

## After

- Run `npm run lint` and `npm run type-check` after TypeScript or React changes.
- Run `npm run build` when routes, layouts, config, or rendering changed.
- Run `npm run format:check` when formatting matters.
- For documentation-only changes, validate links, paths, stale terms, and the
  final diff instead of running unrelated application checks.
- Report every check that could not run because a backend, Docker, or environment
  dependency was unavailable.
