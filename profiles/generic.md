# Generic Profile

Use when no more specific profile fits, or as the base for every installation.

## Detect

- README and docs for project purpose
- build/test/lint commands
- package manager or task runner
- CI workflow files
- contribution guidelines
- existing AI instruction files

## Recommended Defaults

- Install level: standard
- Plan directory: `plans/{branch-name}/`
- Context directory: `contexts/{branch-name}/`
- Canonical skills path: `.agents/skills/`
- Canonical rules path: `.agents/rules/`
- No automatic commits or pushes
- Ask before running apps
- Ask before external service writes

## Questions

Ask when not obvious:

- Which command builds the project?
- Which command runs targeted tests?
- Are agents allowed to run local applications?
- Should generated tool-specific AI files be committed?
- Which AI tools should this repository support?
