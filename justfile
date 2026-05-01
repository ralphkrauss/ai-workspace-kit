# AI Workspace Kit development commands.

default:
    @just --list

# Validate that public files do not contain common secret patterns or optional
# caller-provided private terms.
check-public:
    node assets/scripts/check-public-readiness.mjs

# Backwards-compatible alias while this repo is still being shaped.
check-generic: check-public

# Show tracked source files in this kit.
files:
    find README.md PROMPT.md INSTALL.md docs profiles assets examples -type f | sort
