# MCP Server Config Format Templates

Side-by-side templates for adding an MCP server to each AI tool's config file.

## Claude Code (`.mcp.json`) -- the reference config

### Stdio server (Docker)

```json
"my-server": {
  "_comment": "Tier N: Description (access mode). Prerequisites: ...",
  "type": "stdio",
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "--network", "host",
    "-e", "MY_VAR",
    "-e", "MY_SECRET",
    "image-name:tag"
  ],
  "env": {
    "MY_VAR": "default-value",
    "MY_SECRET": "${MY_ENV_VAR:-}"
  }
}
```

### Stdio server (Node.js)

```json
"my-server": {
  "_comment": "Description. Prerequisites: ...",
  "type": "stdio",
  "command": "node",
  "args": ["mcp/my-server/server.mjs"],
  "env": {
    "MY_VAR": "${MY_ENV_VAR:-}"
  }
}
```

### Stdio server (npm package, cross-platform shared config)

Use the repo-owned launcher instead of raw `npx` so native Windows works without `cmd /c` overrides in user-local config.

```json
"my-server": {
  "_comment": "Description. Prerequisites: Node.js.",
  "type": "stdio",
  "command": "node",
  "args": ["scripts/run-npx-mcp.mjs", "@scope/my-mcp-package", "--flag"],
  "env": {
    "MY_VAR": "${MY_ENV_VAR:-}"
  }
}
```

### Stdio server (uv/Python)

```json
"my-server": {
  "_comment": "Description. Prerequisites: uv, project's MCP build command.",
  "type": "stdio",
  "command": "uvx",
  "args": ["my-mcp-package"],
  "env": {
    "MY_VAR": "${MY_ENV_VAR}"
  }
}
```

### HTTP server (via mcp-remote proxy)

Claude Code uses `mcp-remote` as a stdio-to-HTTP bridge so the server survives restarts. In shared repo configs, launch it through `scripts/run-npx-mcp.mjs` instead of raw `npx`.

```json
"my-server": {
  "_comment": "Description. Prerequisites: server running on port NNNN.",
  "type": "stdio",
  "command": "node",
  "args": ["scripts/run-npx-mcp.mjs", "-y", "mcp-remote", "http://localhost:NNNN/mcp", "--transport", "http-only", "--header", "X-API-Key: my-key"]
}
```

### Tier 2 CLI wrapper (Docker)

Uses a shared CLI-MCP Docker image (replace `org/cli-mcp:latest` with your project's image). The last arg to Docker is the CLI tool name.

```json
"my-cli": {
  "_comment": "Tier 2: Description (environment, access mode). Prerequisites: project's MCP build command, credentials.",
  "type": "stdio",
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "-e", "MY_CREDENTIAL",
    "-e", "MCP_REQUIRED_ENV",
    "-e", "MCP_ALLOWED_PATTERNS",
    "-e", "MCP_BLOCKED_PATTERNS",
    "-e", "MCP_STRIP_ARGS",
    "-e", "MCP_DENY_ARGS",
    "-e", "MCP_PREPEND_ARGS",
    "-e", "MCP_DESCRIPTION",
    "-e", "MCP_EXAMPLES",
    "org/cli-mcp:latest", "my-cli-tool"
  ],
  "env": {
    "MY_CREDENTIAL": "${MY_CREDENTIAL_VAR:-}",
    "MCP_REQUIRED_ENV": "MY_CREDENTIAL",
    "MCP_ALLOWED_PATTERNS": "get-*,list-*,describe-*",
    "MCP_STRIP_ARGS": "[\"--profile\"]",
    "MCP_DENY_ARGS": "[\"--interactive\"]",
    "MCP_PREPEND_ARGS": "[\"--output\",\"json\"]",
    "MCP_DESCRIPTION": "My CLI tool (environment, access mode)",
    "MCP_EXAMPLES": "[\"subcommand --flag value\",\"other-subcommand\"]"
  }
}
```

Guardrail env vars (all optional):
- `MCP_REQUIRED_ENV` -- comma-separated list of env vars that must be set (exits cleanly if missing)
- `MCP_ALLOWED_PATTERNS` -- comma-separated glob patterns for allowed subcommands
- `MCP_BLOCKED_PATTERNS` -- comma-separated glob patterns for blocked subcommands
- `MCP_STRIP_ARGS` -- JSON array of flags to remove from commands (consumes the following non-flag token, e.g. `--profile dev`)
- `MCP_DENY_ARGS` -- JSON array of boolean flags to drop (does NOT consume the following token, unlike `MCP_STRIP_ARGS`). Filtering runs BEFORE `MCP_BLOCKED_PATTERNS`, so a leading `--<deny-flag>` cannot bypass the block check.
- `MCP_PREPEND_ARGS` -- JSON array of flags to prepend to every command
- `MCP_DESCRIPTION` -- human-readable description shown in the help tool
- `MCP_EXAMPLES` -- JSON array of example commands shown in the help tool

**Choose one guardrail mode:**
- Open: omit both pattern lists (e.g., a local sandbox tool)
- Allowlist-only: set `MCP_ALLOWED_PATTERNS` only (e.g., a staging tool restricted to read-only commands)
- Blocklist-only: set `MCP_BLOCKED_PATTERNS` only (e.g., the `gh` CLI with destructive subcommands blocked)

---

## Codex (`.codex/config.toml`)

### Stdio server (Docker)

```toml
[mcp_servers.my-server]
command = "docker"
args = ["run", "-i", "--rm", "--network", "host", "-e", "MY_VAR", "-e", "MY_SECRET", "image-name:tag"]

[mcp_servers.my-server.env]
MY_VAR = "default-value"
# MY_SECRET goes in ~/.codex/config.toml
```

### Stdio server (Node.js/uv)

```toml
[mcp_servers.my-server]
command = "node"
args = ["mcp/my-server/server.mjs"]

# Or for uv:
# command = "uvx"
# args = ["my-mcp-package"]
```

### HTTP server

Codex supports `url` + `http_headers` directly (no proxy needed).

```toml
[mcp_servers.my-server]
url = "http://localhost:NNNN/mcp"
http_headers = { "x-api-key" = "my-key" }
```

### Tool approval gating

Gate specific tools to require user approval:

```toml
[mcp_servers.my-server.tools.execute]
approval_mode = "approve"

[mcp_servers.my-server.tools.list_items]
approval_mode = "approve"
```

### Secret-bearing stdio servers

If the server needs secret-name remapping or should read from the shared user-level
secret file, wrap it with `scripts/mcp-secret-bridge.mjs`.

```toml
[mcp_servers.my-server]
command = "node"
args = ["scripts/mcp-secret-bridge.mjs", "my-server", "--", "docker", "run", "-i", "--rm", "-e", "MY_SECRET", "image-name:tag"]

[mcp_servers.my-server.env]
MY_STATIC_VALUE = "default-value"
```

---

## Cursor (`.cursor/mcp.json`)

### Stdio server (Docker)

```json
"my-server": {
  "command": "node",
  "args": [
    "scripts/mcp-secret-bridge.mjs", "my-server", "--",
    "docker", "run", "-i", "--rm",
    "-e", "MY_VAR",
    "-e", "MY_SECRET",
    "image-name:tag"
  ],
  "env": {
    "MY_VAR": "default-value"
  }
}
```

No `type` or `_comment` fields. For secret-bearing stdio servers, use the bridge and keep only static non-secret values in `env`.

---

## OpenCode (`opencode.json`)

### Stdio server (Docker)

```json
"my-server": {
  "type": "local",
  "command": ["node", "scripts/mcp-secret-bridge.mjs", "my-server", "--", "docker", "run", "-i", "--rm", "-e", "MY_VAR", "-e", "MY_SECRET", "image-name:tag"],
  "environment": {
    "MY_VAR": "default-value"
  }
}
```

Key differences:
- `command` is a single array (command + args combined)
- `environment` instead of `env`
- For secret-bearing stdio servers, use the bridge and keep only static non-secret values in `environment`

### Stdio server (Node.js/uv)

```json
"my-server": {
  "type": "local",
  "command": ["node", "mcp/my-server/server.mjs"],
  "environment": {
    "MY_STATIC_VALUE": "default-value"
  }
}
```

For secret-bearing local servers, use the bridge instead of direct `{env:...}` wiring.

### HTTP server

OpenCode supports `type: "remote"` with `url` + `headers` directly.

```json
"my-server": {
  "type": "remote",
  "url": "http://localhost:NNNN/mcp",
  "headers": {
    "X-API-Key": "my-key"
  }
}
```

---

## Format Comparison Quick Reference

| Aspect | Claude (`.mcp.json`) | Codex (`.codex/config.toml`) | Cursor (`.cursor/mcp.json`) | OpenCode (`opencode.json`) |
|--------|---------------------|-----------------------------|-----------------------------|---------------------------|
| Format | JSON | TOML | JSON | JSON |
| Top key | `mcpServers` | `[mcp_servers.*]` | `mcpServers` | `mcp` |
| Command | `command` + `args` | `command` + `args` | `command` + `args` | `command` (single array) |
| Env vars | `env` | `[...env]` table | `env` | `environment` |
| Secrets | `${VAR:-}` from settings | `scripts/mcp-secret-bridge.mjs` + canonical names | `scripts/mcp-secret-bridge.mjs` + canonical names | `scripts/mcp-secret-bridge.mjs` + canonical names |
| HTTP | `npx mcp-remote` proxy | `url` + `http_headers` | not reliably supported | `type: "remote"` + `url` |
| Type field | `"type": "stdio"` | implicit | none | `"local"` / `"remote"` |
| Comments | `_comment` field | TOML `#` comments | none | none |
| Tool gating | none | `[...tools.*.approval_mode]` | none | none |
