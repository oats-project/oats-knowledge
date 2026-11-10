---
type: Lesson
title: Judge a chain of sensible fixes as a whole
description: When each fix answers the last objection by adding another mechanism, compare the accumulated design with changing the original premise before approving the next step.
about: [workstream/oats-direction]
kind: lesson
id: ins-9fa3a92c47e0
tags: [design-review, complexity, rejected-alternatives]
timestamp: 2026-10-31
---
# Local reasonableness does not establish a good design

Before approving another step in a growing design, restate the original
need and judge the whole solution now proposed. Compare it with removing or
changing the premise that made the chain necessary. Otherwise review can
ratify a complicated system one defensible addition at a time, especially
when each addition answers the last objection rather than the original need.

The source reports a default-reviewer design on 2026-10-30 that grew from a
contract to a sandbox and then a proposed marker. Rejecting the marker's
complexity prompted reconsideration of the default, which removed most of
the chain. An earlier yes had preceded testing that showed the proposed
approach could not start. The lesson is to reconsider the accumulated cost,
not to preserve that abandoned implementation as a recipe.

# Apply the comparison without inventing authority

Bring the simpler alternative back to the existing
[direction-first review gate](/nodes/oats-maintainer/stewardship/review-protocol.md#four-gates-direction-first).
The question is whether the original premise is necessary, not whether a
reviewer may silently discard a requirement. A human-accepted requirement or
shared contract keeps its existing amendment gate; this lesson does not
select a reviewer default, waive safety requirements or authorize a design
change by itself.

Prefer eliminating the unnecessary mechanism over documenting how to
manage its complexity. Tests can establish whether a candidate starts and
meets its requirements, but passing them cannot decide whether the chain is
worth keeping. The residual whole-design comparison belongs in the existing
maintainer direction gate, not a second procedure or new enforcement layer.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-31; notes/judge-a-chain-of-steps-as-a-whole.md.

This is one source-reported review and reversal, not a claim that the
alternative shipped, a general finding against sandboxes or markers, or a
new human-accepted default.
