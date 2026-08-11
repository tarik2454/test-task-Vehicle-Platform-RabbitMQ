# Checklist

## Before

- Read `.codex/rules/critical-rules.md`
- Read `.codex/context/team-guidelines.md` for owner-sensitive or shared work
- Review recent history
- Check env needs
- Identify which route groups are affected
- Check neighboring team tasks before starting overlapping component work

## During

- If API changes, review services, types, mappers, hooks
- If Zustand is involved, check related stores
- If shared layout, nav, or provider code changes, inspect platform, creator, and backoffice usage before editing
- If routes, access control, or redirects change, inspect `src/constants/routes.ts` and route-group layouts
- If routes/hosts change, update `.codex/context/`
- If a fix requires copying logic, extract or move the shared source of truth instead
- If conflicts overlap another developer's active module, coordinate before resolving

## After

- Run `npm run lint`
- Run `npm run type-check` for code changes
- Run `npx prettier --check <path>` if formatting-specific verification matters
- Use `.codex/skills/local-commits/SKILL.md` when drafting branch names or commits
- Note verification gaps
- Record useful new context
