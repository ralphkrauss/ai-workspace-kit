# Copy-Paste Installer Prompt

Use this from the target repository:

```text
Use {PATH_TO_AI_WORKSPACE_KIT}/INSTALL.md to install the AI workspace into this
repository.

Follow the installer protocol exactly:
- inspect this repository first
- do not write files until I approve the installation plan
- ask me preference questions for ambiguous setup decisions
- merge existing AI/tooling setup instead of overwriting it
- ask before dangerous operations, including hook activation, git config
  changes, package installs, commits, pushes, deletes, external writes, or
  secret changes
- adapt shared skills and templates to this repository's actual commands and
  conventions
- leave changes uncommitted
```

Replace `{PATH_TO_AI_WORKSPACE_KIT}` with the absolute or relative path to this
kit.
