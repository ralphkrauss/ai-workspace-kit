# Example Installation Report

## Installed

- Created `AGENTS.md`
- Created `.agents/README.md`
- Added shared skills:
  - `create-plan`
  - `implement-plan`
  - `resolve-pr-comments`
  - `commit`
  - `create-pr`
  - `review`
  - `review-pr`
  - plus the rest of the portable core set from `assets/MANIFEST.md`
- Added `scripts/sync-ai-workspace.mjs`

## Migrated

- Merged existing `CLAUDE.md` into a short tool-specific wrapper.
- Preserved existing project build/test commands.
- Moved long workflow instructions from `AGENTS.md` into skills.

## User Decisions

- Tool support: Codex, Claude, Cursor
- Generated files: gitignored
- Hooks: files added but not activated
- MCP config: skipped

## Skipped Dangerous Operations

- Did not set `git config core.hooksPath .githooks`
- To enable later: `just ai-hooks-enable`
- Did not install packages
- Did not commit or push

## Next Checks

```text
node scripts/sync-ai-workspace.mjs --check
git diff --stat
```
