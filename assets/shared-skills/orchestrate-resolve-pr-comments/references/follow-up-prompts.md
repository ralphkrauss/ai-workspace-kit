# Follow-Up Prompts

- Triage: "Use the repository `resolve-pr-comments` skill, but override its
  interactive one-comment-at-a-time loop. Fetch unresolved PR comments,
  independently assess every actionable comment in one pass, and create/update
  the resolution map. Do not ask the human questions during triage. Make routine
  behavior-preserving decisions yourself when safe. Put unresolved uncertainties
  in a Reviewer Questions section for the resolution-map reviewer to answer
  first, not in a human prompt. Do not escalate verified in-scope bugs,
  regressions, test gaps, or plan-compliance gaps just because the fix is
  non-trivial; mark them as fix items when the fix preserves approved behavior.
  Promote proposed behavior, public-contract, workflow, permission/tool-surface,
  release/publish, dependency-policy, accepted-risk, or capability-removal
  changes to Open Human Decisions with options. Include final Reviewer Questions
  and Open Human Decisions sections, using `none` when empty. Do not edit code,
  commit, push, or post replies."
- Resolution-map review: "Review the resolution map using the repository
  `resolve-pr-comments` workflow and project rules as context. Inputs: PR
  identifier, branch, resolution-map path, triage output, and current diff or
  diff command. Treat triage output as claims, not facts. Answer Reviewer
  Questions you can answer from the PR, map, diff, and repository context.
  Report blocking map defects, true Open Human Decisions, materially useful
  feedback, and whether the map is ready for the human-approval checkpoint."
- Map feedback to triage: "Address the resolution-map reviewer feedback in this
  existing triage session. Update the map, incorporate reviewer answers to
  Reviewer Questions, and report what changed plus any remaining Reviewer
  Questions and Open Human Decisions."
- Implementation: "Implement only approved fix actions from the final resolution
  map. Skip deferred/declined items and human-approval-required changes unless
  the human explicitly approved them. Preserve approved behavior, public
  contracts, workflow, and permission/tool surfaces. Update evidence, run
  verification, and report changed files, results, risks, and blockers. Do not
  commit, push, or post GitHub replies yet."
- Code review: "Use the repository `/review` or `/review-pr` workflow to review
  the current working tree diff. Inputs: final resolution-map path, implementer
  output, PR identifier, and current diff or diff command. Treat implementer
  output as claims, not facts. Report blocking findings first, then
  non-blocking suggestions and test gaps. Say whether the implementation is
  ready."
- Final commit: "The resolution-map reviewer and code reviewer say this is
  ready, and final Open Human Decisions are answered or none. Commit and push
  only intended files. Always include the final resolution map and relevant plan
  evidence under `plans/{branch-name}/` unless the human explicitly excludes
  them. Report commit SHA, pushed branch/ref, files committed, verification
  evidence, and residual risks."
- Reply/resolve: "Using the final resolution map and pushed commit, post the
  drafted GitHub replies with correlation markers and resolve only threads marked
  resolved or declined. Leave deferred/escalated threads open unless the map says
  otherwise. Report every reply, resolved thread, skipped thread, and errors."
