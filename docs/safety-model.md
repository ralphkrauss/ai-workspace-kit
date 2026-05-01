# Safety Model

The installer and the installed skills must preserve user control over risky
operations.

## Dangerous Operations

The agent must ask for explicit confirmation before:

- deleting files or directories
- overwriting existing instructions, hooks, MCP config, CI config, or task files
- changing `git config`, including `core.hooksPath`
- running `git reset`, `git clean`, `git checkout --`, `git rebase`, or other
  destructive history/worktree operations
- committing or pushing
- installing packages or running dependency managers
- executing scripts downloaded from the network
- writing to external services such as GitHub, cloud providers, package
  registries, databases, queues, or issue trackers
- changing secrets, credentials, local env files, or user-level config
- running application servers or long-lived processes when the repo does not
  explicitly permit that
- broad formatting or generated-file rewrites that touch unrelated files

Confirmation must name the exact operation and its expected effect.

For hook activation, approval should explicitly mention that the command writes
repository-local git config:

```text
git config --local core.hooksPath .githooks
```

## Safe Operations

These are generally safe after the user approves the installation plan:

- reading files
- listing directories
- searching with local tools
- creating new non-conflicting files
- editing approved files
- running non-destructive validation commands
- showing diffs

If a "safe" command could still mutate state in the target repo, treat it as
dangerous.

## Existing Worktree Changes

The installer must assume uncommitted changes belong to the user.

- Do not revert user changes.
- Do not normalize unrelated formatting.
- If a target file is dirty, read it carefully and merge with it.
- If the merge is ambiguous, ask before editing.

## Secrets

- Never print secret values.
- Do not move secrets from user-level or local files into the repository.
- Secret examples must use placeholders.
- MCP or tool config should route secrets through environment variables or
  documented user-level files.

## Installed Skill Requirements

Shared skills must include these defaults:

- no automatic commits or pushes
- user confirmation before external writes
- user confirmation before destructive git operations
- plan and evidence updates for multi-step implementation
- explicit test/build evidence instead of unsupported claims
