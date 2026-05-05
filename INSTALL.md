# AI Workspace Kit Installer Prompt

Use this prompt in a target repository to install or migrate an AI coding
workspace from this kit.

```text
You are installing an AI workspace into this repository using the
ai-workspace-kit. Your job is to adapt the kit to this repository, not to copy
it blindly.

Source kit location:
{PATH_TO_AI_WORKSPACE_KIT}

Core requirements:
- Inspect the target repository before writing files.
- Ask preference questions when decisions materially affect the setup.
- Merge or migrate existing AI/tooling setup instead of replacing it.
- Ask for explicit confirmation before any dangerous operation.
- Do not commit, push, delete, reset, rebase, install packages, modify secrets,
  activate git hooks, or run network-writing commands unless the user clearly
  approves that exact action.
- Keep project-specific instructions in the target repository.
- Keep reusable workflow guidance generic and tool-agnostic unless a file is
  explicitly tool-specific.

Phase 1: Read the Kit
1. Read `{PATH_TO_AI_WORKSPACE_KIT}/README.md`.
2. Read `{PATH_TO_AI_WORKSPACE_KIT}/docs/installation-protocol.md`.
3. Read `{PATH_TO_AI_WORKSPACE_KIT}/docs/safety-model.md`.
4. Read `{PATH_TO_AI_WORKSPACE_KIT}/docs/merge-model.md`.
5. Read `{PATH_TO_AI_WORKSPACE_KIT}/assets/MANIFEST.md`.
6. Inspect the available assets under `{PATH_TO_AI_WORKSPACE_KIT}/assets/`.
7. Load only the profile files under `{PATH_TO_AI_WORKSPACE_KIT}/profiles/`
   that match this repository's detected stack.

Phase 2: Inventory the Target Repository
Inspect and summarize:
- Project type, language stack, package manager, test framework, build system,
  task runner, and CI.
- Existing `AGENTS.md`, nested `AGENTS.md`, `CLAUDE.md`, `.agents/`,
  `.claude/`, `.cursor/`, `.cursorrules`, `.codex/`, `.opencode/`,
  `.github/`, MCP config, hooks, task files, and docs.
- Whether any MCP config (`.mcp.json`, `.codex/config.toml`,
  `.cursor/mcp.json`, `opencode.json`, etc.) references
  `@ralphkrauss/agent-orchestrator`, and whether a profiles manifest exists for
  it (such as a `profiles.json` or path under `AGENT_ORCHESTRATOR_HOME`).
  Record which profile aliases are defined; do not print credentials or
  resolved tokens.
- Existing build, test, lint, format, review, PR, and release commands.
- Existing safety constraints: whether apps may be run, whether commits are
  allowed, whether tests should be targeted, and which commands are destructive.
- Existing secrets or environment files by path only. Do not print secret
  values.

Do not write files yet.

Phase 3: Produce an Installation Proposal
Present:
1. Repository profile.
2. Existing AI/tooling inventory.
3. Recommended installation level:
   - minimal: instructions plus shared skills
   - standard: instructions, skills, rules, sync script, docs
   - full: standard plus optional hooks, task recipes, MCP scaffolding
4. Files to create.
5. Files to modify and how they will be merged.
6. Files that appear generated or tool-specific.
7. Dangerous operations that would require explicit approval.
8. Questions that need user decisions.

Ask only questions that cannot be answered safely from the repository. Prefer
1-3 questions per round. Include a recommended default and a short tradeoff.

Common preference questions:
- Which AI tools should be supported: Codex, Claude, Cursor, OpenCode,
  Copilot, other?
- Should shared skills be copied into the repo, referenced externally, or
  installed as a tool-specific plugin where supported?
- Should git hooks be added only as files, or should `core.hooksPath` also be
  activated?
- Should MCP config be skipped, scaffolded with placeholders, or migrated from
  existing config?
- Should task recipes use `just`, `make`, package scripts, or existing commands?
- Should generated tool-specific directories be committed or gitignored?
- What rigor level should the project use: lightweight, standard, regulated,
  or custom?
- Should orchestration skills (`orchestrate-create-plan`,
  `orchestrate-implement-plan`, `orchestrate-resolve-pr-comments`) be
  installed? These require the `@ralphkrauss/agent-orchestrator` MCP server
  and a profiles manifest defining the referenced profile aliases
  (`plan-creator`, `plan-reviewer`, `implementation`, `code-review`,
  `pr-comment-triage`, `pr-comment-reviewer`, `pr-comment-responder`).
  Default to skip unless the inventory shows agent-orchestrator is already
  configured or the user opts in.

Wait for user approval before writing files.

Phase 4: Implement the Approved Plan
When approved:
1. Preserve existing useful instructions.
2. Create or update `AGENTS.md` with repository-specific guidance.
3. Add tool-specific wrappers only when selected, such as `CLAUDE.md`.
4. Create `.agents/README.md`, `.agents/skills/`, `.agents/rules/`, and
   `.agents/agents/` only as needed.
5. Adapt selected shared skills from the kit. For standard/full installs,
   default to the portable core set in `assets/MANIFEST.md` unless the user asks
   for a smaller footprint. Remove source-project assumptions and replace them
   with this repository's commands and conventions. Install orchestration
   skills (the `orchestrate-*` set in `assets/MANIFEST.md`) only when the user
   opted in. Copy them verbatim — they reference profile aliases, not models.
   Do not invent profile aliases or hard-code provider/model/effort settings;
   if the profiles manifest is missing or incomplete, list the required
   aliases in the install report and let the user configure them through the
   agent-orchestrator MCP tools.
6. Before generating tool projections, migrate useful manual Cursor guidance
   from `.cursor/rules/` or `.cursorrules` into `.agents/rules/`.
7. Add sync scripts or task recipes only if the selected tools need generated
   projections.
8. Add optional hook files without activating them unless separately approved.
9. If hook activation was separately approved, run the repository's hook
   activation command, such as `just ai-hooks-enable` or
   `node scripts/ai-hooks.mjs enable`.
10. Add docs such as `docs/ai-workspace.md` if useful for maintainers.

Migration rules:
- Do not overwrite existing instruction files. Merge them.
- If a section is superseded, keep the original meaning or move it to the
  appropriate layer.
- If a conflict exists, show the conflict and ask for a decision.
- Keep generated copies separate from canonical source files.
- Treat `.cursor/` as generated when the repository chooses to gitignore it;
  edit `.agents/` and regenerate Cursor projections locally.
- Do not move secrets into the repo.

Phase 5: Verify
Run non-destructive checks only:
- Show the created/modified file list.
- Search generated files for source-kit placeholders and source-project terms.
- Validate skill frontmatter where possible.
- Validate that referenced commands exist or are documented as placeholders.
- If a sync script was added, run it only if it does not overwrite unreviewed
  existing files; otherwise ask first.
- Show `git diff --stat` and summarize important diff areas.

Phase 6: Report
Finish with:
- What was installed.
- What was migrated from existing setup.
- What user decisions were applied.
- What dangerous operations were skipped or require later approval.
- How to use the new setup.
- Suggested next checks.

Never commit or push unless the user explicitly asks after reviewing the diff.
```

## Placeholder Replacement

Replace `{PATH_TO_AI_WORKSPACE_KIT}` with the absolute or repository-relative
path to this kit before using the prompt.
