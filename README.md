# AI Workspace Kit

Prompt-based installer for a portable AI coding workspace.

This repository is source material for installing a familiar agent setup into
any codebase without forcing that codebase through a rigid template. The user
points an AI coding agent at `INSTALL.md`; the agent inspects the target
repository, asks preference questions, then creates or migrates the local AI
workspace files.

## Goals

- Make a new repository quickly feel familiar across Codex, Claude, Cursor,
  OpenCode, Copilot, and similar AI coding tools.
- Keep the target repository as the source of truth for project-specific
  instructions.
- Reuse generic workflows such as planning, implementation, PR comment
  resolution, test-plan creation, rule creation, and skill creation.
- Merge and migrate existing AI setup instead of overwriting it.
- Require explicit user confirmation for dangerous operations.

## Non-Goals

- This is not a one-size-fits-all repository template.
- This is not a user-level dotfiles replacement.
- This does not assume any one programming language, framework, host platform,
  or AI tool.

## Layout

```text
INSTALL.md                         Prompt to paste into an AI coding agent
docs/                              Installer policy and design docs
profiles/                          Stack-specific guidance for adaptation
assets/shared-skills/              Generic skills to adapt into target repos
assets/shared-workflows/           Agent Orchestrator workflow JSON assets
assets/templates/                  Starter files the installer can merge
assets/scripts/                    Optional sync scripts for generated tool dirs
assets/githooks/                   Optional hook files
assets/just/                       Optional just recipes
examples/                          Example reports and generated shapes
```

## Quick Start

Clone or place this kit somewhere your AI coding agent can read:

```bash
git clone https://github.com/ralphkrauss/ai-workspace-kit.git ~/ai-workspace-kit
```

From any target repository, tell your AI coding agent:

```text
Use /path/to/ai-workspace-kit/INSTALL.md to install the AI workspace into this
repository. Inspect first, ask me questions for preferences, merge any existing
setup, and ask before dangerous operations.
```

For a fuller copy-paste prompt, use `PROMPT.md`.

The installer should first produce an inventory and proposed plan. It should not
write files until you approve the installation plan.

## Design Principles

- **Prompt first, assets second.** The prompt is the interface. The assets are
  source material the agent adapts to the repository.
- **Repository-local by default.** Instructions, skills, rules, and agents live
  in the target repo so collaborators and future agents share the same context.
  Generated tool projections must also stay inside the target worktree, such as
  `.claude/skills/` or `.cursor/rules/`; the kit is not a user-level
  `~/.claude`, `~/.codex`, or `~/.cursor` installer.
- **Generic core, local specialization.** Shared skills must avoid
  project-specific command names, paths, domain terms, and infrastructure names.
- **Merge over replace.** Existing `AGENTS.md`, `.agents/`, `.claude/`,
  `.cursor/`, `.codex/`, hooks, and task files are migrated with a clear diff.
- **Confirmation for dangerous operations.** The installer must ask before
  deletes, overwrites, commits, pushes, hook activation, package installs,
  network writes, destructive git operations, or secret handling.

## Current Extracted Assets

- `create-plan`
- `implement-plan`
- `resolve-pr-comments`
- `create-test-plan`
- `run-test-plan`
- `create-skill`
- `create-rule`
- `commit`
- `create-pr`
- `brainstorm-issue`
- `create-issue`
- `shape-issue`
- `await-pr-checks`
- `review`
- `review-pr`
- `resolve-conflicts`
- `resolve-issue-comments`
- `setup-worktree`
- `load-context`
- `update-context`
- `create-agent`
- `create-mcp`
- `orchestrate-create-plan` (optional; requires the `@ralphkrauss/agent-orchestrator` MCP server)
- `orchestrate-implement-plan` (optional; requires the `@ralphkrauss/agent-orchestrator` MCP server)
- `orchestrate-create-test-plan` (optional; requires the `@ralphkrauss/agent-orchestrator` MCP server)
- `orchestrate-review` (optional; requires the `@ralphkrauss/agent-orchestrator` MCP server)
- `orchestrate-resolve-pr-comments` (optional; requires the `@ralphkrauss/agent-orchestrator` MCP server)
- Matching workflow JSON assets under `assets/shared-workflows/`
- Generic `AGENTS.md` template
- Generic shared agents: `researcher`, `implementer`, `reviewer`
- Generic sync script for rules, skills, and agents
- Optional `just` recipes, hook helper, and git hooks

## Development

This repository intentionally contains source material, not generated output.
When improving the kit:

- Keep shared skills under `assets/shared-skills/`.
- Keep shared Agent Orchestrator workflow JSON under `assets/shared-workflows/`.
- Keep examples generic.
- Run `just check-public` before publishing changes.
- For local/private source terms, run
  `AI_WORKSPACE_FORBIDDEN_TERMS="term-one,term-two" just check-public`.
- Do not add secrets, tenant names, infrastructure account names, or
  application-specific domain rules to generic assets.

See `CONTRIBUTING.md` for the public-readiness checklist.

## License

MIT. See `LICENSE`.
