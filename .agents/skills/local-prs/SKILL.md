---
name: local-prs
description: Use when drafting, refining, or validating pull request titles or pull request bodies for this repository
---

# Local PRs

Use this local skill before writing a pull request title or pull request body for this repository.

## Base Branch

- Open ordinary task PRs into `stage` by default.
- Require a pull request for changes targeting either `stage` or `prod`; no approving review is required while the repository has a single maintainer.
- Use `prod` only for a production release or when the user explicitly asks for a `prod`-targeted PR.
- In the GitHub compare UI, an ordinary task PR should read `base: stage <- compare: REW-15` or your current task branch.
- Promote tested changes from `stage` to `prod` through a dedicated release PR.
- Treat direct pushes to `stage` or `prod` as an owner-only emergency bypass, not the normal workflow.

## Review State

- Open ordinary task PRs ready for review by default.
- Create a draft PR only when the user explicitly requests a draft.

## Pull Request Titles

- Keep the PR title short and descriptive.
- Prefer one clear summary of the main change.
- For task-driven Rewardom work, strictly title the PR as `REW-15, short description`.
- Keep the task ID at the very start of the title and keep the comma after it.
- Do not title task PRs without the task ID, with the task ID at the end, or without the comma.
- Use ASCII-only titles; do not use hidden or mixed-script characters in the task ID.
- Avoid vague titles like `changes`, `fixes`, or `update stuff`.

Good examples:

- `REW-15, fix giveaway entry state`
- `REW-22, improve notification settings`
- `REW-31, update giveaway leaderboard`

Avoid:

- `fix giveaway entry state`
- `fix giveaway entry state REW-15`
- `REW-15 fix giveaway entry state`

## Pull Request Bodies

- For ordinary task PRs, do not write a PR body/description unless the user explicitly asks for one.
- Leave the PR body empty when creating an ordinary task PR.
- The PR title is the summary and must follow `REW-15, short description`.
- If the user explicitly asks for a PR body, keep it short and include only the requested context.

## Recommended PR Body Shape

Use this only when the user explicitly asks for a PR body:

- What changed
- Why it changed
- How it was checked

## Example

```md
## Summary

- preserve the giveaway entry state after refresh
- handle an unavailable entry request

## Why

- the entry state could become stale after a session refresh

## Checks

- npx tsc --noEmit
- npm run build
```
