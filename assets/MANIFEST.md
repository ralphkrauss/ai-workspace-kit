# Asset Manifest

Assets are source material for the installer. They should be adapted to the
target repository instead of copied blindly.

For the copy-paste installer prompt, see `PROMPT.md` at the repository root.

## Shared Skills

| Skill | Purpose |
|---|---|
| `await-pr-checks` | Monitor PR checks and diagnose failures |
| `commit` | Create scoped git commits |
| `create-agent` | Capture reusable agent definitions |
| `create-issue` | Draft and create structured issues |
| `create-mcp` | Add MCP server config safely |
| `create-plan` | Plan features through discussion and write plan files |
| `create-pr` | Publish branch work as a pull request |
| `create-skill` | Capture repeatable workflows |
| `create-test-plan` | Create human-plus-agent test runbooks |
| `create-rule` | Capture conventions in the right instruction layer |
| `implement-plan` | Execute approved plans with evidence |
| `load-context` | Load branch context artifacts |
| `resolve-conflicts` | Resolve git conflicts safely |
| `resolve-issue-comments` | Triage and resolve issue feedback |
| `resolve-pr-comments` | Triage and resolve PR feedback |
| `review` | Review uncommitted changes |
| `review-pr` | Review full branch diff |
| `run-test-plan` | Execute manual test runbooks |
| `setup-worktree` | Prepare branches/worktrees safely |
| `update-context` | Refresh branch context artifacts |

## Shared Agents

| Agent | Purpose |
|---|---|
| `researcher` | Bounded read-only codebase research |
| `implementer` | One-task implementation from a plan |
| `reviewer` | Code review and quality gate checks |

## Templates

| Template | Purpose |
|---|---|
| `AGENTS.md.template` | Root project instructions |
| `CLAUDE.md.template` | Optional Claude wrapper |
| `agents-readme.md` | `.agents/README.md` |
| `docs-ai-workspace.md.template` | Maintainer documentation |
| `mcp-notes.md.template` | MCP documentation scaffold |
| `resolution-map.md.template` | PR feedback triage artifact |
| `issue-resolution-map.md.template` | Issue feedback triage artifact |

## Scripts And Hooks

| Asset | Purpose |
|---|---|
| `scripts/sync-ai-workspace.mjs` | Optional projection sync from `.agents/` |
| `scripts/ai-hooks.mjs` | Optional local git hook status/enable/disable helper |
| `just/ai.just` | Optional task recipes |
| `githooks/post-checkout` | Optional sync after checkout |
| `githooks/post-merge` | Optional sync after merge |
