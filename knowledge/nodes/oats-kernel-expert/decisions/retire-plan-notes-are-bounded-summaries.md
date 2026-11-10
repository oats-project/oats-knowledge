---
type: Decision
title: Retire plan notes are bounded summaries, not the full fact record
description: Bound retirement summaries without truncating facts or silently extending the plan contract, because readable CLI output must also remain consumable by Desktop.
about: [system/oats-kernel]
id: dec-cb2e99bcb675
tags: [kernel, retire, plan, diagnostics, json, compatibility]
timestamp: 2026-10-09
---
# Decision

Treat a retire plan's notes as a bounded human-readable summary and its
structured fact fields as the full record of the values they contain. Bound
both note count and note length at the producer; do not repair oversized
notes by silently cutting paths or reasons, or by changing the plan's JSON
shape as part of a wording fix.

The source records this decision from the 2026-10-08/09 retirement work.
It reports that Desktop rejected oversized notes, making a retirement that
the CLI could perform unavailable through Desktop's planning flow. The
rationale is consumer compatibility and truthful explanation, not cosmetic
brevity.

# Preserve meaning without enlarging the contract

When a note is too long, retain its explanatory sentence and replace its
largest interpolated parts first with references to existing plan JSON facts
that carry the complete values. Those fact fields are not truncated. A
reference must point to a value the plan actually contains; it is not a
license to invent a field to make the summary fit.

The source's initial specification assumed the plan would expose a retained
destination for the primary work tree. That addition was dropped: a new
field in a JSON answer consumed by Desktop is a contract change requiring a
maintainer decision, and the bounded-note repair did not require it. Under
that decision, the primary work tree's destination remained in retirement's
result and event rather than gaining a plan field. This is the scope of the
repair, not a permanent prohibition on an explicitly reviewed API extension.

# Rejected alternatives

- **Cut text at the limit:** a partial path or reason can be read as complete,
  misrepresenting the fact rather than summarizing it.
- **Raise Desktop's limit:** moves the failure threshold without establishing
  a bounded producer.
- **Drop an oversized note:** makes the plan silent about a tree it will move.
- **Add a primary-work destination field opportunistically:** mixes a
  presentation repair with a consumer-contract decision that was not needed
  for the repair.

The numerical limits and exact field layout belong in the current producer,
consumer schema and their tests, not in a competing knowledge specification.
The source identifies producer fixes and a regression repair below; the
record retained here is why those bounds preserve facts and why the plan
shape was deliberately left alone.

# Related

[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
owns the general machine-consumer, truthful-diagnostic and feature-advertisement
obligations. This decision records the narrower retirement-summary tradeoff
without replacing that contract guidance.

[How the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md)
owns the rule that an additive field on a closed-shape contract is breaking
for strict consumers already released, which is why the destination field
was a separate contract decision rather than part of this repair.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-09; notes/decision-retire-plan-notes-are-bounded-summaries.md.

The proposal and note identify [awebai/oats#813](https://github.com/awebai/oats/pull/813)
for [#658](https://github.com/awebai/oats/issues/658),
[#834](https://github.com/awebai/oats/pull/834) for
[#821](https://github.com/awebai/oats/issues/821), and the related regression
repair [#853](https://github.com/awebai/oats/pull/853). These are source-reported
evidence pointers; implementation and delivery history were not independently
audited by this harvest.

Verified by the knowledge maintainer at review of the harvest: awebai/oats#813
merged on 2026-10-08 and #834 and the test-only #853 on 2026-10-09, each with
APPROVE verdicts from both maintainers posted on the PR. #813's description
records that a path is never cut and that whatever does not fit is left to
the plan's fact fields or the receipt, keeps the plan and receipt shapes
unchanged, and lists new fields of any kind as out of scope. #834's records
that a destination for the primary work tree was deliberately not added to
the plan because it would change a shape Desktop reads. The raised-limit and
dropped-note alternatives rest on the source's note alone.
