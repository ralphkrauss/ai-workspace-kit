# AI Workspace Kit development commands.

default:
    @just --list

# Validate that public files do not contain common secret patterns or optional
# caller-provided private terms.
check-public:
    node assets/scripts/check-public-readiness.mjs

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
# This writes local git config: core.hooksPath=.githooks
ai-hooks-enable:
    node scripts/ai-hooks.mjs enable

# Disable repository-local AI hooks installed by this kit.
# This writes local git config.
ai-hooks-disable:
    node scripts/ai-hooks.mjs disable

# Backwards-compatible alias while this repo is still being shaped.
check-generic: check-public

# Show tracked source files in this kit.
files:
    find README.md PROMPT.md INSTALL.md AGENTS.md CONTRIBUTING.md justfile docs profiles assets examples scripts .agents .claude .githooks -type f 2>/dev/null | sort
