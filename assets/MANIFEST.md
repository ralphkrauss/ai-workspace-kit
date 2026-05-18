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
| `shape-issue` | Refine rough requests into specific issue requirements |
| `setup-worktree` | Prepare branches/worktrees safely |
| `update-context` | Refresh branch context artifacts |

## Orchestration Skills

These skills are for a **supervising agent** that drives worker CLI runs through
the [`@ralphkrauss/agent-orchestrator`](https://www.npmjs.com/package/@ralphkrauss/agent-orchestrator)
MCP server. They are optional add-ons: install them only when the target
repository has the agent-orchestrator MCP server configured and a profiles
manifest defining the referenced profile aliases (for example `plan-creator`,
`plan-reviewer`, `implementation`, `code-review`, `pr-comment-triage`,
`pr-comment-reviewer`, `pr-comment-responder`).

| Skill | Purpose |
|---|---|
| `orchestrate-create-plan` | Supervise a plan-creator + plan-reviewer loop on a GitHub issue and push the plan |
| `orchestrate-implement-plan` | Supervise an implementer + code-reviewer loop against an approved plan |
| `orchestrate-resolve-pr-comments` | Supervise PR-comment triage, resolution-map review, implementation, code review, push, and GitHub replies |

Orchestration skills reference the matching repository workflow skills
(`create-plan`, `implement-plan`, `resolve-pr-comments`) so install those first
when adopting the supervisor flow.

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
