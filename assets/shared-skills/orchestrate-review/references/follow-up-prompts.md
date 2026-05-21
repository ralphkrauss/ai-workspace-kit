# `/orchestrate-review` Follow-Up Prompt Templates

Standard prompts for each step of the review loop. Replace `{placeholders}`
with actual scope-specific values.

## Round 1 — Raw reviewer (fresh `code-review` run)

```
You are the raw reviewer for the orchestrate-review workflow. This is a fresh
run — no prior context.

Workspace: {cwd}
Branch: {branch}
Scope: {commits or range to review — e.g. "the previous commit b3a633e24",
or "the unpushed commits", or "git diff main...HEAD"}

Run the project's `/review` skill against that scope. `/review` knows the
project's review patterns, so do not re-list them in the prompt. Just point
`/review` at the right diff.

Output a per-finding table the supervisor can pass verbatim to the
implementer:

| # | Severity | File:line | Description | Recommended fix |
|---|---|---|---|---|

Severities: Critical / Major / Minor / Nit. Recommended fix should be
specific enough that a fresh implementer can act without re-reading the
review transcript. List non-blocking suggestions in a separate table.

Final verdict: BLOCKING (at least one Major+ finding) or CLEAN.

Hard rules:
- Do NOT modify source code.
- Do NOT commit, push, or post to GitHub.
- Do NOT touch any files marked user-owned by the supervisor.
- Do NOT create or write a review artifact file (e.g., `.agents/reviews/...`,
  `plans/.../reviews/...`). Even if the project's `/review` skill would
  normally write one, do not do so here. Report findings via the worker's
  final output text only.
```

## Round 1 — CodeRabbit reviewer (fresh `coderabbit-reviewer` run)

```
You are the CodeRabbit reviewer for the orchestrate-review workflow. This is
a fresh run.

Workspace: {cwd}
Branch: {branch}
Scope: {commits or range to review}

Your job: invoke the `coderabbit` MCP server's `execute` tool with the
post-prefix `review ...` command. Do not include a leading `coderabbit`; the
project's CLI-MCP wrapper prepends it.

Use these review flags:

**Step 0: Resolve scope.** For unpushed-only review, compute the upstream:
`git rev-parse --abbrev-ref --symbolic-full-name @{upstream}`. Use that
value as `--base`. Example: `--base origin/<branch>`. Do NOT use
`--unpushed` — that flag is only supported by some local wrapper scripts,
not the raw CodeRabbit CLI exposed via the MCP launcher.

For full-branch-vs-base review, use the merge target (e.g.,
`--base origin/main`).
For working-tree-only review, use `--type uncommitted` and skip `--base`.

The flag set becomes:
- `--type {committed | uncommitted}` (per scope)
- `--base <ref>` (when `--type committed`)
- `--agent` (structured JSON output)
- `--config AGENTS.md --config <project rule files> --config .coderabbit.yaml`

**Incremental review note.** CodeRabbit reviews only the diff between
`--base <ref>` and `HEAD`. For a round-1 review of all unpushed commits,
`--base` is the upstream ref. For a round-N+1 re-review of a new fix
commit, `--base` is the parent of that commit (`git rev-parse <fix>~1`),
so CodeRabbit sees only the new diff. Each CodeRabbit run is blind —
prior round context does NOT carry over.

Step 1: Run `auth status --agent` through the MCP `execute` tool first. If
unauthenticated, fail fast and report — do not silently drop the review.

Step 2: Run the review with the flags above. Reviews can take 7–30+ minutes
upstream. Do not cancel; just wait.

Step 3: Report CodeRabbit's findings VERBATIM. Do not edit, summarize, or
pre-filter. Group by severity if CodeRabbit returns severity. Include file
paths and line numbers exactly as CodeRabbit emits them.

**Note on the "0 findings" case.** When CodeRabbit returns no findings, the
agent-mode JSON output is terse: it ends with a `complete` event with
`findings: 0`, NOT a `findings: []` array structure. Report this verbatim —
the supervisor checks the `complete` event's `findings` count to decide
whether the loop ends. If the JSON stream omits a `complete` event entirely
(e.g., the run aborted or timed out), say so explicitly so the supervisor
does not treat silence as success.

Hard rules:
- Do NOT modify source code.
- Do NOT commit, push, or post to GitHub.
- Do NOT alter CodeRabbit's findings — verbatim only.
```

## Round N — Implementer fix pass (fresh `implementation` run)

```
You are the implementer for the orchestrate-review workflow. This is a fresh
run.

Workspace: {cwd}
Branch: {branch}
Scope under review: {commits or range}
Round: {N}

Inputs (separate, NOT pre-merged):

### Raw reviewer report
{verbatim raw reviewer output}

### CodeRabbit reviewer report
{verbatim CodeRabbit reviewer output}

Your job:
1. Synthesize the two reports yourself. Dedupe overlap. Identify false
   positives or incorrect findings — declining is fine, but the rationale
   must go in the commit message.
2. Implement behavior-preserving fixes for genuine findings. Prefer fixes
   that satisfy both perspectives.
3. If a finding requires a product/scope/contract change beyond what the
   plan or repo rules already authorize, STOP and report it as an Open
   Human Decision rather than implementing it.
4. Run the narrowest meaningful verification first, then the full project's
   tests for any area you touched.
5. **Commit this iteration as a new local commit** (no push). Use a clear
   message that names the findings addressed and any declined with reason.

Output:
- New commit SHA.
- Per-finding table (use this exact shape — the supervisor passes it to the
  reviewers verbatim):

  | # | Source | Severity | Status | Rationale / fix summary |
  |---|---|---|---|---|

  - **Source**: which reviewer raised it — `raw` / `coderabbit` / `both`.
  - **Severity**: as the reviewer classified it.
  - **Status**: `fixed` / `declined` / `deferred`.
  - **Rationale / fix summary**: what changed (if fixed) or why declined/deferred.
- Files changed (categorized: src / tests / generated / docs).
- Verification commands run and their results (test counts, build status).
- Non-blocking suggestions: which were folded in, which declined, rationale.
- Residual risks or unresolved findings.
- Any new Open Human Decisions surfaced.

Hard rules:
- Do NOT push.
- Do NOT amend or rebase.
- Do NOT post GitHub replies or open PRs.
- Each round = one new commit. No squashing.
```

## Re-review — Raw reviewer (`send_followup`)

```
The implementer has applied a fix iteration. Please re-review the new commit
using the project's `/review` approach, with prior findings as context.

New commit: {SHA}
Diff for this commit only: {git command, e.g. `git diff <prior>..<new>`}

Implementer's per-finding report:

| # | Source | Severity | Status | Rationale / fix summary |
|---|---|---|---|---|
{rows verbatim from implementer output}

Treat the implementer's report as claims, not facts. Do not add a
supervisor-authored checklist; use the repository review skill and your prior
findings to decide what still matters.

Output a per-finding response table:

| # | Status | Notes |
|---|---|---|

- **Status**: `resolved` / `still-blocking` / `accept-decline` (the
  implementer declined and you accept the rationale) / `new-blocker` (a
  fresh issue introduced by this commit).
- **Notes**: short rationale or specific issue.

Final verdict: BLOCKING or CLEAN.
```

## Re-review — CodeRabbit (fresh run, no session state)

```
{Same as Round 1 CodeRabbit prompt body, but Step 0 changes:}

**Step 0: Resolve scope for incremental re-review.** Compute the parent of
the new fix commit and use that as `--base`:

```bash
git rev-parse {new_commit}~1
```

Pass the resulting SHA as `--base`, with `--type committed`. CodeRabbit
will review ONLY the new commit's diff. Do NOT use the upstream ref as
`--base` here — that would re-review prior commits already cleared by
earlier rounds.

Each CodeRabbit invocation is blind. Do NOT pass the implementer's
per-finding report to CodeRabbit — let it find issues independently. The
raw reviewer (which has session continuity via `send_followup`) sees the
report; CodeRabbit does not.

The flag set:
- `--type committed`
- `--base {parent_SHA}`
- `--agent`
- `--config AGENTS.md --config <project rule files> --config .coderabbit.yaml`
```

## Impasse final-call

```
We are in round {N} on this finding and the same blocker keeps surfacing
after fix attempts. The implementer has tried:

{summary of attempted fixes and why each didn't satisfy you}

Please make a final call. Choose ONE:

(a) Fix this EXACTLY as I describe — provide concrete code or pseudocode
    so the implementer can apply it without further interpretation.
(b) Accept as decline with rationale — explain why this is no longer
    blocking given what's been tried.
(c) Escalate to the human — this needs product/scope/judgment beyond
    what we can resolve here.

Whatever you answer becomes the final decision for this finding. Reply
with (a), (b), or (c) and the supporting content.
```
