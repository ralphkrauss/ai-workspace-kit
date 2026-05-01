# Contributing

Thanks for improving AI Workspace Kit.

## Development Rules

- Keep shared assets generic and repository-agnostic.
- Do not add private customer names, tenant names, internal infrastructure
  names, credentials, or source-project-specific domain rules.
- Prefer improving existing skills, rules, or templates over adding duplicates.
- Keep prompt instructions explicit about user confirmation before dangerous
  operations.
- Do not add generated tool-specific output to this kit unless it is an example.

## Checks

Run:

```bash
just check-public
```

If you are extracting from a private or internal repository, also scan for local
source terms before publishing:

```bash
AI_WORKSPACE_FORBIDDEN_TERMS="term-one,term-two" just check-public
```

Validate scripts:

```bash
node --check assets/scripts/check-public-readiness.mjs
node --check assets/scripts/ai-hooks.mjs
node --check assets/scripts/sync-ai-workspace.mjs
```

## Adding Portable Skills

Before adding a skill, classify it in `docs/portable-skill-candidates.md`.

Include it in `assets/shared-skills/` only when it is useful across many
repositories after normal adaptation. Keep project-specific workflows out of
the core kit.
