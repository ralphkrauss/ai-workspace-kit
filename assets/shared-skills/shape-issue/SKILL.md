---
name: shape-issue
description: Shape vague requests into specific, implementation-ready issue requirements. Use when the user says "shape issue", "shape this issue", "refine issue", "refine requirements", "make this more specific", "turn this into an issue", or wants testable acceptance criteria before issue creation or planning.
---

# Shape Issue

Turn a rough request into a precise issue brief with explicit scope,
assumptions, open questions, risks, and testable acceptance criteria.

## Instructions

### Step 1: Determine The Output

Identify what the user needs:

- a requirements brief
- a rewritten issue body
- acceptance criteria only
- a clarification questionnaire
- a handoff to `create-issue` after the requirements are shaped

Classify the work as bug, feature, task, chore, documentation, or
question/research. Ask if the type materially changes the output.

### Step 2: Gather Grounding Context

Use repository truth before shaping requirements:

- `AGENTS.md` and relevant nested instructions
- relevant docs and rules
- related code paths and existing patterns
- related issues, PRs, plans, or decision records when available
- logs, screenshots, transcripts, or error messages provided by the user

Do not treat existing code as the specification when an external service,
standard, policy, or user workflow defines correctness. Ask what source
documentation or reference material should be used when it is missing.

### Step 3: Separate Requirements From Assumptions

Structure the analysis with clear provenance:

- **User-stated requirements**: only what the user explicitly said
- **Known context**: facts found in repository or supplied source material
- **Analyst assumptions**: inferred requirements or defaults that need
  confirmation
- **Proposed out of scope**: items to exclude only if the user confirms
- **Open questions**: unresolved decisions that change scope or behavior

Never present inferred scope boundaries as confirmed decisions.

### Step 4: Investigate Negative Signals

When the user says something is wrong, messy, insufficient, confusing, slow,
unsafe, or undesirable, clarify before rewriting:

- what specifically is wrong now
- who is affected
- what must change
- what can stay
- what evidence would prove the issue is fixed

Do not reduce negative feedback to a mechanical cleanup task unless the user
confirms that is the intent.

### Step 5: Ask High-Value Questions

Ask only questions that materially affect the issue. Prefer one to three
questions per round.

Good question targets:

- desired outcome and definition of done
- affected actors, workflows, surfaces, and environments
- in-scope, out-of-scope, and follow-up boundaries
- expected behavior for error, empty, duplicate, invalid, race, and retry cases
- data, API, UI, permission, security, compatibility, migration, rollout, and
  observability expectations
- validation level: automated tests, manual checks, metrics, logs, docs, or
  release checks

For non-trivial choices, present two or three options with tradeoffs and a
recommended default.

### Step 6: Produce The Shaped Issue

Use this structure unless the repository has a stronger issue template:

```markdown
## Summary

{what should change and why}

## User-Stated Requirements

- {explicit requirement}

## Context

- {repo/source evidence}
- {current behavior}
- {related issue, PR, plan, or doc}

## Scope

### In Scope

- {confirmed deliverable}

### Proposed Out Of Scope

- {assumption needing confirmation}

## Acceptance Criteria

- [ ] {specific, observable criterion}
- [ ] {specific, observable criterion}

## Validation

- {test, build, manual check, metric, log, or documentation check}

## Risks And Edge Cases

- {risk or edge case and expected handling}

## Open Questions

- {decision still needed}
```

If the user wants issue creation after shaping, hand the final body to
`create-issue` and preserve that skill's approval rules for external writes.

### Step 7: Self-Review

Before finalizing, check:

- user-stated requirements and assumptions are visibly separate
- every acceptance criterion is testable or observable
- validation checks are realistic for the repository
- open questions are limited to material unresolved decisions
- proposed out-of-scope items are not presented as confirmed
- vague phrases such as "works correctly", "improve UX", "handle errors", or
  "make better" are replaced with expected behavior
- external source material gaps are called out when they affect correctness

## Critical Rules

- Do not create external issues; use `create-issue` after the user approves.
- Do not invent product decisions when a requirement is ambiguous.
- Do not hide assumptions inside acceptance criteria.
- Do not mark inferred out-of-scope items as confirmed.
- Keep reusable issue templates generic; avoid private names, secrets, and
  project-specific domain rules.

## Checklist

- [ ] Output type identified
- [ ] Repository/source context gathered
- [ ] User-stated requirements separated from assumptions
- [ ] Negative signals investigated
- [ ] Material questions asked or recorded
- [ ] Scope and proposed exclusions explicit
- [ ] Acceptance criteria testable
- [ ] Validation checks realistic
- [ ] Open questions surfaced
