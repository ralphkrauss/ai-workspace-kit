---
name: extend-ai-workspace-kit
description: Add or update installable assets in this AI workspace kit. Use when user asks to extend the kit, add a shared skill, make a workflow installable by this kit, or update the kit's portable source assets.
---

# Extend AI Workspace Kit

Project-local workflow for adding portable assets to this kit without confusing source assets with installed target-worktree files.

## Instructions

### Step 1: Classify The Asset

Decide where the change belongs:

| Asset type | Source location |
|---|---|
| Portable skill installed by the kit | `assets/shared-skills/{skill-name}/SKILL.md` |
| Optional orchestration supervisor skill | `assets/shared-skills/orchestrate-{name}/SKILL.md` |
| Agent Orchestrator workflow JSON | `assets/shared-workflows/{workflow-name}.json` |
| Shared agent prompt | `assets/shared-agents/{agent-name}.md` |
| Installable template | `assets/templates/{template-name}` |
| Kit-only maintenance skill | `.agents/skills/{skill-name}/SKILL.md` |

Do not put kit-only maintenance workflows under `assets/shared-skills/`; those would become portable install assets.

### Step 2: Generalize Source Material

When deriving a portable asset from existing source material:

1. Read only enough source material to understand workflow shape
2. Extract generic structure, decision points, artifact patterns, and validation gates
3. Do not copy project names, tenant names, private infrastructure names, domain-specific rules, command aliases, or regulated/business terminology
4. Replace project-specific commands with discoverable, project-neutral instructions

### Step 3: Check Existing Kit Assets

Before creating a new asset:

1. Search `assets/shared-skills/`, `assets/shared-workflows/`, `assets/shared-agents/`, and `.agents/skills/`
2. Read any overlapping asset
3. Update an existing asset if it already owns the workflow
4. Create a new asset only when the workflow is genuinely missing

### Step 4: Write The Asset

For skills:

- directory name and frontmatter `name` must match exactly in kebab-case
- frontmatter `description` must say what the skill does and when to use it
- keep `SKILL.md` concise, preferably under 250 lines
- use generic, tool-agnostic language unless the skill is explicitly tool-specific
- include critical rules, checklist, and references when useful
- avoid local paths, private terms, secrets, and hard-coded project commands

For workflow JSON, templates, scripts, and agents, follow the nearest existing asset's format and keep public portability as the default.

### Step 5: Update Indexes

For a new shared skill, update:

- `assets/MANIFEST.md`
- `README.md` Current Extracted Assets list
- `docs/portable-skill-candidates.md`

For optional orchestration assets, also update the orchestration sections in `assets/MANIFEST.md` and `README.md`.

Update `INSTALL.md`, `PROMPT.md`, or `docs/installation-protocol.md` only when installer behavior, prompts, or required install decisions change.

### Step 6: Sync Local Projections When Needed

If you changed kit-local files under `.agents/`, run:

```bash
just ai-sync
```

Then verify:

```bash
just ai-sync-check
```

The `.claude/` files are generated projections for this repository's local AI
workspace. Do not edit them directly.

For hook status, run:

```bash
just ai-hooks-status
```

Do not enable or disable hooks unless the user explicitly asks, because that
writes local git config.

### Step 7: Validate

Run:

```bash
just check-public
```

If `just` is unavailable, run:

```bash
node assets/scripts/check-public-readiness.mjs
```

Before finishing, inspect `git diff` for:

- accidental private or domain-specific terms
- absolute user paths
- tool-specific assumptions in shared assets
- missing manifest or README entries
- unrelated changes

## Critical Rules

- Shared assets must stay generic and portable across target worktrees
- The installer must inspect and merge target worktrees, not blindly overwrite
- Dangerous operations in installed prompts and skills require explicit user confirmation
- Do not commit or push unless explicitly asked
- Do not edit generated tool projections directly; edit `.agents/` and run `just ai-sync`
- Do not enable or disable git hooks without explicit user approval

## Checklist

- [ ] Asset classified as shared, optional orchestration, template, agent, workflow, or kit-local
- [ ] Existing assets checked for overlap
- [ ] Shared asset kept generic and portable
- [ ] Required indexes/docs updated
- [ ] `just ai-sync` and `just ai-sync-check` run if `.agents/` changed
- [ ] `just check-public` or fallback validation passed
- [ ] Diff reviewed for private terms and unrelated edits

## Reference

- `AGENTS.md` -- project rules
- `README.md` -- current asset list and development notes
- `assets/MANIFEST.md` -- installable asset inventory
- `docs/portable-skill-candidates.md` -- portable vs project-specific skill classification
- `INSTALL.md` -- manual installation protocol
