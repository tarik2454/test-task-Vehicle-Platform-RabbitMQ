---
name: local-commits
description: Use when creating, checking, or fixing Git branch names and commit messages for this repository. Enforces team branch naming and Conventional Commits.
---

# Local Commits

Use this skill before suggesting, creating, or validating a branch name or commit message.

## Branch Names

Branch format:

```text
type/short-kebab-description
```

Allowed types:

- `feature` or `feat`
- `bugfix` or `fix`
- `hotfix`
- `refactor`
- `docs`

Rules:

- Use lowercase Latin characters.
- Use kebab-case after the slash.
- Keep the description short, usually 2-4 words.
- Make the name describe the work, not the implementation detail.
- If the app-level branch prefix is required by the tool, prepend it without changing the team branch body.

Good examples:

- `bugfix/product-visibility-filter`
- `fix/support-ticket-layout`
- `feature/creator-products`
- `refactor/reward-mappers`
- `docs/update-codex-context`

Avoid:

- `fix`
- `bugFix/ProductModal`
- `taras-changes`
- `feature/update`

## Commit Messages

Commit format:

```text
type(scope): short imperative summary
```

Allowed common types:

- `feat`
- `fix`
- `refactor`
- `docs`
- `style`
- `test`
- `chore`

Rules:

- Use Conventional Commits.
- Scope is required in every commit message.
- Use a real app/domain area for the scope.
- Write the summary in lowercase imperative present tense.
- Keep the first line concise, ideally 50-72 characters.
- Make one commit represent one coherent action.
- Add a body only when extra context materially helps.

Good examples:

- `fix(creators): repair product visibility filter`
- `fix(dashboard): stretch support ticket items`
- `docs(codex): update team guidelines`
- `refactor(rewards): share payout mapper`
- `chore(codex): refresh local codex context`

Avoid:

- `fix`
- `fixed bug`
- `feat: add message actions`
- `done`
- `update stuff`
- `asdasd`

## Validation Checklist

Before finalizing:

- Confirm the branch name matches the type and kebab-case rules.
- Confirm the commit type matches the change.
- Confirm the scope is a real app/domain area.
- Confirm the message describes the outcome, not only the files changed.
