# Node/TypeScript Profile

Use for repositories containing `package.json`, lockfiles, workspace config, or
frontend frameworks.

## Detect

- package manager from lockfile: `pnpm-lock.yaml`, `yarn.lock`,
  `package-lock.json`, `bun.lockb`
- workspace files
- scripts in `package.json`
- test framework and browser test tooling
- generated directories

## Adaptation Notes

- Use the detected package manager consistently.
- Prefer existing package scripts over direct tool invocations.
- Ask before installing dependencies.
- Ask before running dev servers.
- For UI changes, include visual verification only when the repo supports it and
  the user approves running the app.

## Candidate Commands

Only use these if the repository has no better local convention:

```text
<pm> install
<pm> run build
<pm> test
<pm> run lint
```
