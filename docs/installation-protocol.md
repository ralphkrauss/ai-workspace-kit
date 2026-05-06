# Installation Protocol

The installer is prompt-based. It uses this repository as source material, then
creates a repository-native AI workspace in the target project.

## Install Levels

### Minimal

Use when the target repository is small or the user wants the least intrusive
setup.

- Root `AGENTS.md`
- Optional tool wrapper such as `CLAUDE.md`
- Selected shared skills under `.agents/skills/`
- Short `docs/ai-workspace.md`

### Standard

Use for most repositories.

- Everything from minimal
- `.agents/README.md`
- `.agents/rules/`
- `.agents/agents/`
- portable core skills from `assets/shared-skills/`, adapted to repository
  conventions
- Generic sync script if the selected tools require generated projections
- Task recipe for sync and validation

### Full

Use for teams or mature repositories.

- Everything from standard
- Optional git hook files
- Optional MCP scaffolding
- Optional CI check for instruction drift
- Project-specific skill/rule authoring docs

## Installer Phases

1. Read this kit.
2. Inventory the target repository.
3. Ask preference questions.
4. Present an installation proposal.
5. Wait for approval.
6. Implement approved changes.
7. Verify generated files.
8. Report outcomes and follow-ups.

The first write must happen only after the user approves the proposal.

## Repository Profile

The installer should infer and record:

- project name and purpose
- language/framework stack
- build/test/lint commands
- package manager
- task runner
- CI provider
- selected AI tools
- preferred plan directory
- whether apps may be run by agents
- whether commits or pushes are allowed
- local restrictions and safety rules
- existing instruction hierarchy

## Canonical Layout

Use this layout unless the target repository clearly has a better convention:

```text
AGENTS.md                    Cross-tool repository instructions
CLAUDE.md                    Optional Claude wrapper importing AGENTS.md
.agents/README.md            Canonical AI workspace explanation
.agents/skills/*/SKILL.md    Shared or project-specific skills
.agents/rules/*.md           Glob-activated or targeted rules
.agents/agents/*.md          Reusable agent definitions
docs/ai-workspace.md         Maintainer documentation
scripts/sync-ai-workspace.mjs Optional projection script
scripts/ai-hooks.mjs          Optional hook activation helper
.githooks/post-checkout       Optional sync hook
.githooks/post-merge          Optional sync hook
```

Generated tool projections must be worktree-scoped. Do not write generated
skills, commands, agents, rules, MCP config, hooks, settings, or other
installer output into user-level tool directories such as `~/.claude/`,
`~/.codex/`, or `~/.cursor/`.

## Adaptation Rules

- Replace generic placeholders with the repository's actual commands.
- If commands are unknown, write them as explicit TODOs and ask the user.
- Avoid source-kit assumptions in generated files.
- Keep target-specific constraints in `AGENTS.md` or nested `AGENTS.md`.
- Keep reusable workflows in `.agents/skills/`.
- Keep cross-cutting file-pattern guidance in `.agents/rules/`.
- Keep long explanations in docs and link to them from instructions.
- If the target repository has existing `.cursor/rules/` files or a
  `.cursorrules` file, migrate useful guidance into `.agents/rules/` before
  generating Cursor projections.

## Portable Skills

The default portable skill set is listed in `assets/MANIFEST.md`. Install the
full set for standard/full installs unless the user prefers a smaller footprint.

Use `docs/portable-skill-candidates.md` when deciding whether optional skills
from another repository should be promoted into the kit.

## Tool Projection

Some tools read `.agents/` directly. Others need generated copies.

Recommended canonical source:

- skills: `.agents/skills/`
- rules: `.agents/rules/`
- agents: `.agents/agents/`

Generated projections, when selected:

- Claude: `.claude/skills/`, `.claude/rules/`, `.claude/agents/`
- Cursor: `.cursor/rules/`
- other tools: add only when the target tool requires it

Generated directories should be documented as generated. The default project
model is to edit canonical files under `.agents/` and regenerate tool-specific
directories such as `.cursor/`; when those directories are gitignored, local
Cursor users should run the sync command before relying on Cursor rules.
These destinations are repository-relative paths in the target worktree, never
user-level paths under a home directory.

If Cursor cloud agents or SDK cloud mode must see generated `.cursor/` files,
either commit the required Cursor projection files or configure the cloud setup
to run the sync command after clone and before agent work.

## Git Hooks

The kit includes optional hooks that run the sync script after checkout and
merge. If selected, install them as files under `.githooks/`.

Activation is a separate decision because it writes local git config:

```text
git config --local core.hooksPath .githooks
```

When `just` is used, the installer may add:

```text
just ai-hooks-status
just ai-hooks-enable
just ai-hooks-disable
```

Agents must ask before running `ai-hooks-enable` or `ai-hooks-disable`.
