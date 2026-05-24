---
name: brainstorm-issue
description: Explore rough ideas before creating GitHub issues. Use when user says "brainstorm issue", "brainstorm before creating an issue", "explore this idea", "think through this feature request", "turn this rough idea into an issue", or wants collaborative design discovery before issue creation.
---

# Brainstorm Issue

Turn a rough idea into an approved issue concept before drafting or creating a
GitHub issue.

## Instructions

### Step 1: Confirm The Brainstorm Target

Identify what the user is trying to create:

- feature request
- bug report
- implementation task
- cleanup or tech-debt item
- documentation issue
- research or decision issue

Clarify the intended next step:

- hand off to `create-issue` when the concept is issue-ready
- hand off to `shape-issue` when requirements and acceptance criteria need more
  precision
- stop with a brainstorm brief only

Do not create a GitHub issue during this skill.

### Step 2: Gather Grounding Context

Inspect repository truth before proposing options:

- `AGENTS.md` and relevant nested instructions
- relevant docs, rules, ADRs, or plans
- code paths and existing patterns likely affected by the idea
- related issues, PRs, or comments when available
- user-provided screenshots, logs, transcripts, examples, or source material

If correctness depends on an external service, standard, policy, or user
workflow, ask for the missing source material instead of treating current code
as the specification.

### Step 3: Separate The Raw Idea From Inferences

Keep provenance visible while exploring:

- **User-stated idea:** what the user actually asked for
- **Known context:** facts from repository or supplied material
- **Inferred goals:** likely outcomes that need confirmation
- **Constraints:** technical, product, compatibility, security, rollout, or
  workflow boundaries
- **Unknowns:** decisions that affect whether the issue should exist or how it
  should be scoped

Do not turn inferred goals into issue requirements until the user confirms them.

### Step 4: Decompose Oversized Ideas

Before going deep, check whether the idea contains independent workstreams.

If it does, propose a small issue set instead of one oversized issue:

- one sentence describing each candidate issue
- dependency or ordering notes
- the recommended first issue and why

Ask the user which issue concept to brainstorm first. Do not continue refining
multiple independent issues in one pass unless the user explicitly asks.

### Step 5: Ask Focused Questions

Ask the smallest number of questions that materially changes the issue concept.
Prefer one question at a time for broad ideas; use up to three concise questions
when the decisions are independent and easy to answer together.

Good question targets:

- the user, workflow, or failure mode that motivates the issue
- the outcome that would make the issue worth doing
- what should stay unchanged
- explicit non-goals and follow-up boundaries
- success signals and validation evidence
- expected behavior for empty, invalid, duplicate, error, permission, migration,
  rollout, and compatibility cases

Skip questions already answered by repository conventions or source material.

### Step 6: Offer Approaches

For non-trivial ideas, present two or three plausible directions with tradeoffs.
Lead with a recommended direction and explain why.

Keep the options at issue-concept level, not implementation-plan level. Include:

- what outcome each approach optimizes for
- what it excludes or defers
- risk, complexity, and validation differences
- the recommended approach

Ask the user to choose, combine, or reject the options before producing the
final concept.

### Step 7: Produce The Brainstorm Brief

Use this structure unless the repository has a stronger pre-issue template:

```markdown
## Idea

{plain-language concept}

## Confirmed Goals

- {user-confirmed outcome}

## Context

- {repository or source evidence}

## Recommended Issue Shape

- **Type:** {feature / bug / task / chore / docs / research}
- **Title direction:** {draft title or title pattern}
- **Scope:** {what belongs in the issue}
- **Non-goals:** {what should be excluded or deferred}

## Candidate Approach

{recommended direction and why}

## Acceptance Signals

- {observable signal that the issue is complete}

## Validation Ideas

- {tests, manual checks, metrics, docs, logs, or review evidence}

## Risks And Open Questions

- {remaining uncertainty, if any}

## Suggested Next Step

{create-issue / shape-issue / split into multiple issues / stop}
```

### Step 8: Handoff

After the user approves the brainstorm brief:

- If the concept is issue-ready, hand the brief to `create-issue`. Preserve
  `create-issue` approval rules for duplicate search and external writes.
- If scope or acceptance criteria are still fuzzy, hand the brief to
  `shape-issue` and preserve the distinction between confirmed decisions and
  assumptions.
- If the idea should be split, ask which candidate issue to create or shape
  first.

## Critical Rules

- Do not create external issues; use `create-issue` only after the user approves
  the brainstorm outcome.
- Do not write implementation plans or code from this skill.
- Do not invent product decisions to close open questions.
- Do not collapse multiple independent workstreams into one issue for
  convenience.
- Keep issue concepts generic and avoid private names, secrets, tenant names, or
  project-specific domain rules in reusable examples.

## Checklist

- [ ] Brainstorm target identified
- [ ] Repository/source context gathered
- [ ] Raw idea separated from inferences
- [ ] Oversized ideas decomposed when needed
- [ ] Material questions asked or recorded
- [ ] Options and recommendation presented for non-trivial ideas
- [ ] Brainstorm brief produced
- [ ] Next handoff selected
