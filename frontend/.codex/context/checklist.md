# Checklist

## Before

- Read `.codex/rules/critical-rules.md`
- Review recent frontend history
- Check env needs
- Identify whether the task affects `app/`, `src/`, styles, or config

## During

- If API usage changes, review the frontend helper layer, local types, and page usage together
- If ports or host assumptions change, update `.codex/context/`
- If a fix requires copying logic, move the source of truth instead
- If structure changes, verify whether `app/` or `src/` is the intended surface before deleting files

## After

- Run `cd frontend && npm run lint`
- Run `cd frontend && npm run build` when routes or styles changed
- Note verification gaps
- Record useful new frontend context
