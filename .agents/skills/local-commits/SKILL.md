---
name: local-commits
description: Use when creating, checking, or fixing Git branch names and commit messages for this repository. Enforces team branch naming and Conventional Commits.
---

# Local Commits

Use this skill before suggesting, creating, or validating a branch name or commit message.

## Branch Names

For Rewardom task work linked to Notion, branch format:

```text
REW-15
```

Rules:

- Use the exact task ID from Notion, for example `REW-15`.
- The task ID must be the whole branch name for task-linked work.
- Use ASCII-only branch names.
- Do not add a type prefix or extra description for task-linked branches unless the team changes the guideline.
- Do not use hidden characters, Cyrillic lookalikes, or mixed-script branch names.

Good examples:

- `REW-15`
- `REW-3`
- `REW-40`

Avoid:

- `bugfix/rew-15-giveaway-entry-state`
- `bugfix/refer-friend`
- `bugfix/кefer-friend`
- `rew-15`
- `REW15`

For non-task work not tied to a Notion card, branch format:

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
- Do not use hidden characters, Cyrillic lookalikes, or mixed-script branch names.
- If the app-level branch prefix is required by the tool, prepend it without changing the team branch body.

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

- `fix(giveaways): repair entry state`
- `fix(auth): improve form layout`
- `docs(codex): update team guidelines`
- `refactor(api): share request handling`
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

- Confirm that task-linked branches use the exact `REW-XX` ID from Notion.
- Confirm that non-task branches match the `type/short-description` kebab-case rules.
- Confirm the commit type matches the change.
- Confirm the scope is a real app/domain area.
- Confirm the message describes the outcome, not only the files changed.
