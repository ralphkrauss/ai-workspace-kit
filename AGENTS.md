# AI Workspace Kit

## Project Overview

Prompt-based installer and source-material bundle for setting up AI coding
workspaces in arbitrary repositories.

## Rules

- Keep assets generic. Do not add source-project names, tenant names, private
  infrastructure names, or domain-specific rules to shared assets.
- The installer must inspect target repositories first, ask user preference
  questions, and merge existing setup instead of blindly overwriting files.
- Dangerous operations require explicit user confirmation in installed prompts
  and skills.
- Do not commit or push unless explicitly asked.
- Use `rg` for searches.

## Validation

```bash
just check-public
```

If `just` is unavailable:

```bash
node assets/scripts/check-public-readiness.mjs
```

To scan for local/private source terms before publishing:

```bash
AI_WORKSPACE_FORBIDDEN_TERMS="term-one,term-two" just check-public
```
