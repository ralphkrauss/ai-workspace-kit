# Portable Skill Candidates

This file records which source workflows are suitable for the generic kit.

## Included In The Core Set

These are generally useful across repositories after replacing project-specific
commands with target-repository discovery:

| Skill | Why Portable |
|---|---|
| `create-plan` | Generic feature planning and plan artifacts |
| `implement-plan` | Generic plan execution and evidence tracking |
| `commit` | Generic scoped git commits |
| `create-pr` | Generic PR creation from branch artifacts |
| `create-issue` | Generic issue drafting with context |
| `resolve-pr-comments` | Generic PR feedback triage and resolution maps |
| `resolve-issue-comments` | Generic issue feedback triage and resolution maps |
| `await-pr-checks` | Generic CI monitoring and failure triage |
| `review` | Generic uncommitted diff review |
| `review-pr` | Generic branch review before PR |
| `create-test-plan` | Generic manual test runbook creation |
| `run-test-plan` | Generic human-plus-agent test session |
| `resolve-conflicts` | Generic git conflict resolution |
| `setup-worktree` | Generic branch/worktree startup |
| `load-context` | Generic branch artifact loading |
| `update-context` | Generic branch context refresh |
| `create-skill` | Generic workflow capture |
| `create-rule` | Generic instruction/rule capture |
| `create-agent` | Generic agent definition capture |
| `create-mcp` | Generic MCP config workflow |
| `shape-issue` | Generic requirements shaping before issue creation or planning |

## Good Optional Add-Ons

These are portable, but depend on tools, vendors, or repo conventions:

| Skill | Reason Optional |
|---|---|
| `review-codex` / `review-pr-codex` | Requires Codex CLI and local wrapper conventions |
| `coderabbit-*` | Requires CodeRabbit CLI/auth and repo recipes |
| `create-design` / `implement-design` / `review-design-implementation` | Useful for UI repos, too heavy for non-UI repos |
| `build-wiki` / `ingest-wiki` / `query-wiki` | Useful for documentation-heavy repos |
| `create-plan-execution-package` | Useful when teams delegate to multiple agents |
| `orchestrate-create-plan` / `orchestrate-implement-plan` / `orchestrate-resolve-pr-comments` | Requires the `@ralphkrauss/agent-orchestrator` MCP server and a profiles manifest with the referenced profile aliases |

## Keep Project-Specific

These should stay in product/domain repositories unless rewritten as generic
examples:

| Category | Examples |
|---|---|
| provider/integration workflows | provider scaffolding, provider docs, provider tests |
| infrastructure-specific workflows | cloud log queries, account-specific tunnels |
| domain-specific reviews | financial/provider/database audits tied to one platform |
| localization pipelines | only portable after adapting file formats and translation flow |
