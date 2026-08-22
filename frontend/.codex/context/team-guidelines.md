# Frontend Team Guidelines

## Collaboration

- No code owners are documented for this project. Inspect current consumers and
  recent history before broad changes to shared modules.
- Keep one source of truth for API calls, types, shared layout behavior, and
  reusable UI.
- If documentation conflicts with current source or package scripts, treat the
  code as authoritative and update the documentation.

## Git

- Keep each commit focused on one coherent result.
- Use the Vehicle Platform frontend commit skill for branch and commit naming.
- Use lowercase ASCII branch names and avoid hidden or mixed-script characters.
- Do not assume a task ID workflow, PR base branch, or external automation unless
  the user provides one.

## Change Scope

- Route-specific changes should remain in the narrowest route subtree possible.
- Shared component changes require checking every current consumer.
- API contract changes require checking request helpers, frontend types, pages,
  and the owning backend service together.
- Styling changes should avoid unrelated full-project reformatting.
