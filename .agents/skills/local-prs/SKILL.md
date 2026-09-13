---
name: local-prs
description: Use when drafting, refining, or validating pull request titles or pull request bodies for this repository
---

# Local PRs

Use this local skill before writing a pull request title or pull request body for this repository.

## Pull Request Titles

- Keep the PR title short and descriptive.
- Prefer one clear summary of the main change.
- Avoid vague titles like `changes`, `fixes`, or `update stuff`.

Good examples:

- `fix inventory deleted item status`
- `prevent status edits for deleted items`
- `improve leaderboard default handling`

## Pull Request Bodies

- Keep the PR body short and descriptive.
- Prefer concise summaries over long changelog-style descriptions.
- Include only the most useful context for reviewers.

## Recommended PR Body Shape

- What changed
- Why it changed
- How it was checked

## Example

```md
## Summary
- keep deleted inventory items inactive
- block status edits for deleted items

## Why
- deleted items could still appear active or be switched back from the editor

## Checks
- npm run type-check
- commit hook build
```
