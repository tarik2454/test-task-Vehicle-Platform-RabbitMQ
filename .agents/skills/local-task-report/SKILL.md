---
name: local-task-report
description: Use when writing a short completed-work summary for a finished repository task, especially when the user wants a concise English status update or Asana-ready report
---

# Local Task Report

Use this local skill when the user asks for a report describing what was done in a task.

## Default Output

- Write in English.
- Use a numbered list the user can copy together with the numbering.
- Do not add blank lines between numbered list items.
- Keep the report focused on completed work, not on plans or reasoning.
- Prefer a moderately detailed report that keeps related work grouped but still surfaces each important outcome.
- Keep each point factual and medium-length, usually one clear sentence with only the context needed to understand the result.

## Style Rules

- Describe what was done, not what was discussed.
- Describe completed work at a concrete level, giving enough context for each important task result.
- Name the affected page, feature, component, or behavior only when it helps the report stay clear.
- Keep wording abstract unless the user explicitly wants file names, component names, or deeper technical detail.
- Avoid mentioning tests, checks, or verification unless the user explicitly asks for them or they are important to the task outcome.
- Do not mention Git workflow actions such as branches, commits, merges, pulls, pushes, or remote synchronization unless the user explicitly asks for them.
- Do not mention GitHub or pull request handling, such as opening, retargeting, syncing, or fixing a PR, unless the user explicitly asks for GitHub workflow details.
- Keep reports strictly focused on the concrete task implementation; exclude process-only actions that did not change the product behavior, UI, content, or code outcome.
- Prefer direct factual verbs like `updated`, `changed`, `added`, or `removed`.
- If the user asks for "only the main thing" or "the most essential," reduce the report to the smallest useful set of points.

## Report Structure

- Split the report by meaningful completed outcomes, including distinct visual, behavioral, responsive, or structural changes when they each matter to the task.
- Combine small supporting details with their nearest outcome instead of listing every implementation step separately.
- Use one point when the task had one logical outcome.
- Add points when they make the completed work easier to understand; fold only minor supporting details into the closest related point.
- When several related files support one visible outcome, summarize them in one point instead of listing implementation steps.
- Avoid giving supporting cleanup its own point unless it changes shared behavior or meaningfully affects future work.

## Length Guide

- Do not target a specific number of points.
- Default sentence size: around 10-18 words per point in most cases.
- Add enough context to explain what changed, but avoid explaining implementation details unless they are central to the outcome.
- Remove filler when a point starts sounding like a mini postmortem.
- Prefer “what changed and why it matters” in one sentence instead of splitting it into several tiny bullets.

## Balanced Detail Level

When the user asks for a report that is more detailed than a short status update, but not a full changelog:

- Use as many numbered points as the meaningful completed outcomes require, without padding the report.
- Name the affected feature, page, or component when it improves clarity.
- State the outcome and the main behavior, UI change, or structural scope in each point.
- Include responsive behavior, shared components, reusable APIs, or integration boundaries when they are central to the completed work.
- Omit exact CSS values, file paths, and every implementation detail unless the user explicitly asks for them.

## Preferred Detail Level

By default, prefer a report that sits between a minimal status update and a detailed task summary:

- Mention the main user-facing or structural change without expanding into a full changelog.
- Separate layout, content, shared-component, and responsive changes when each represents a clear part of the completed task.
- Avoid collapsing the whole task into one broad line if that loses important implementation outcomes.
- Keep the report copy-ready and compact enough to read at a glance.

Example:

```md
1. Added shared PageWrapper and Container components to centralize page spacing and responsive content gutters.

2. Configured the components with consistent desktop, tablet, and mobile spacing while preserving custom styling through standard props.

3. Left existing pages unchanged so the new layout primitives can be integrated gradually where needed.
```

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
- Long changelog-style breakdowns or overly detailed multi-point reports for simple tasks
- Over-explaining small fixes with multiple clauses or background details
- Mentioning tests by default
- Git workflow actions unless the user explicitly asks for them
- GitHub or PR management details such as opening or changing the PR target branch
- "Investigated" / "identified" style wording when a plain action summary is enough
