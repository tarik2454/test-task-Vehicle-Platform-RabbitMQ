---
name: local-task-report
description: Use when writing a short completed-work summary for a finished repository task, especially when the user wants a concise English status update or Asana-ready report
---

# Local Task Report

Use this local skill when the user asks for a short report describing what was done in a task.

## Default Output

- Write in English.
- Use a numbered list the user can copy together with the numbering.
- Keep the report focused on completed work, not on plans or reasoning.
- Use 1 or more points depending on the actual scope of the task.
- Keep each point concise and factual, usually one clear sentence.

## Style Rules

- Describe what was done, not what was discussed.
- Keep wording abstract unless the user explicitly wants file names, component names, or technical detail.
- Avoid mentioning tests, checks, or verification unless the user explicitly asks for them or they are important to the task outcome.
- Prefer direct factual verbs like `updated`, `changed`, `added`, or `removed`.
- If the user asks for "only the main thing" or "the most essential," reduce the report to the smallest useful set of points.

## Preferred Shape

Use this default shape unless the user asks differently:

1. Briefly state the completed action or fixed problem.
2. Briefly state the implemented change or outcome.

If one point is enough to cover the task, use one point.
Add more points only when the actual scope of the completed work needs extra context.

## Length Guide

- Default target: 2 points for a small finished task.
- Default sentence size: around 8-18 words per point in most cases.
- Add a little context when a very short point feels too abrupt.
- Remove filler when a point starts sounding like a mini postmortem.
- Prefer “what changed and why it matters” in one sentence instead of splitting it into several tiny bullets.

## Good Examples

```md
1. Updated the countdown behavior so the leaderboard timer no longer changes brightness.
```

```md
1. Updated the affected logic so the flow now points to the correct destination.
```

```md
1. Updated the affected component so the content now fits correctly without breaking nearby elements.
```

## Avoid

- Unnumbered bullets when the user wants a copy-ready report
- File paths, component names, and code terms unless requested
- Overly short labels like `fixed redirect`
- Long changelog-style breakdowns for simple tasks
- Over-explaining small fixes with multiple clauses or background details
- Mentioning tests by default
- "Investigated" / "identified" style wording when a plain action summary is enough
