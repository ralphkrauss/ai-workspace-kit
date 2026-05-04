# .agents

Canonical AI workspace source for this repository.

## Layout

```text
.agents/
  skills/    Repeatable workflows
  rules/     Cross-cutting coding and process rules
  agents/    Reusable agent definitions
```

Tool-specific directories such as `.claude/` or `.cursor/` may contain
generated projections. Edit the canonical files under `.agents/` unless a file
explicitly says otherwise.

If `.cursor/` is gitignored, run the repository sync command before relying on
Cursor project rules. Move useful guidance from legacy `.cursorrules` or manual
`.cursor/rules/` files into `.agents/rules/`; generated Cursor files are not
canonical.

## Skills

Each skill is a folder containing `SKILL.md`.

```text
.agents/skills/{skill-name}/SKILL.md
```

Skills are for repeatable multi-step workflows. Keep them generic where
possible and move long reference material into a `references/` folder.

## Rules

Rules describe constraints, conventions, and review checks. Use rules for
cross-cutting guidance that should load when relevant files are touched.

## Maintenance

- Search before adding a new rule or skill.
- Update existing material when it partially covers the new lesson.
- Keep generated tool-specific files in sync through the repository's chosen
  sync command.
