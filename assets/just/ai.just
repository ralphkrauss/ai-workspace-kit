# Optional AI workspace recipes.

# Sync generated tool-specific AI files from .agents/.
ai-sync:
    node scripts/sync-ai-workspace.mjs

# Check generated tool-specific AI files are up to date.
ai-sync-check:
    node scripts/sync-ai-workspace.mjs --check

# Show repository-local AI hook status.
ai-hooks-status:
    node scripts/ai-hooks.mjs status

# Enable repository-local AI hooks.
# Agents must ask for explicit user approval before running this because it
# writes local git config: core.hooksPath=.githooks
ai-hooks-enable:
    node scripts/ai-hooks.mjs enable

# Disable repository-local AI hooks installed by this kit.
# Agents must ask for explicit user approval before running this because it
# writes local git config.
ai-hooks-disable:
    node scripts/ai-hooks.mjs disable

# Show AI workspace files.
ai-files:
    find AGENTS.md CLAUDE.md .agents .claude .cursor .codex .opencode .github -maxdepth 3 -type f 2>/dev/null | sort
