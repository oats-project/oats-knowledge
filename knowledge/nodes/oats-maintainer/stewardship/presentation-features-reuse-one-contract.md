---
type: Decision
title: Presentation features reuse one state contract unless divergence is justified
description: Review new instance-presentation features against the established state and mutation boundaries, requiring a reason for divergence so display choices do not acquire identity, policy or lifecycle meaning.
about: [workstream/oats-direction]
id: dec-ac1d7340db51
tags: [stewardship, coherence, presentation, review]
timestamp: 2026-10-27
---
**Owner: oats-maintainer. Update-on-change: whoever changes how instance
presentation facts are stored, read or mutated, or justifies a divergence
from this family, revises this concept in the same change.**

# Coherence ruling

The source maintainer's 2026-10-27 review rule is to treat colour, background
placement and shared-work display as one family of **presentation facts**,
not three opportunities to invent state machinery. A new fact about where
or how clients show an instance is compared with that family; a difference
needs a reason. The rationale is to add no new kind of state and let nothing
outside presentation depend on the display choice.

This is a review presumption, not a requirement that every fact have the
same value type or semantics. The [shared-work decision](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
still owns parent binding and connector meaning; this rule neither redefines
those semantics nor makes a display declaration into coordination authority.

# What the comparison protects

- **State ownership and lifetime:** presentation stays separately
  kernel-owned rather than becoming lifecycle record state or capability
  work. Its storage and retirement treatment must agree; a display change
  must not introduce a new retention obligation by accident.
- **Read and mutation boundaries:** use bounded, link-safe presentation
  reads and the established instance-targeting and lifecycle refusals for
  writes. Invalid presentation data is not set, not a new identity or
  lifecycle verdict. A feature-specific verb is not permission to weaken
  a held-claim or retirement refusal.
- **One meaning across clients:** consume the authoritative presentation
  fact and respect the execution host's advertised support, rather than
  deriving a second copy from lifecycle records or assuming the caller's
  support proves the host's. Reuse the established client request boundary
  instead of inventing a separate mutation path for each display choice.

These are the invariants behind the comparison, not another specification
of filenames, permissions, registries, wire fields or Desktop components.
Keep those exact contracts with the code. The source reports a missing
feature-specific held-claim explanation caught in background review: a
small omission exposed drift from the shared mutation contract, rather than
a justified difference in presentation semantics.

Parallel features in this family touch common ownership and routing
registries despite having different feature names. Set their merge order
up front and re-read the later owner's hand-resolved rebase. This applies
the existing [shared-write-surface delivery lesson](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md#independence-needs-write-surfaces-not-titles-2026-09-20)
and [content-bound review](/nodes/oats-maintainer/stewardship/review-protocol.md#bind-every-verdict-to-content);
it is not a new verdict-carry exception or a replacement for integration CI.

Prefer shared implementations and contract regressions for mechanically
checkable parity, including ownership/retirement treatment, refusal behavior
and client routing. Any remaining checklist duplication is review debt;
the maintainer's direction gate owns the residual judgment about whether
a divergence is justified. This record does not claim that common helpers
or comprehensive parity tests have been delivered.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/instance-presentation-facts-shape.md.

The source identifies the colour precedent
[awebai/oats#1421](https://github.com/awebai/oats/issues/1421), background
kernel review [#1584](https://github.com/awebai/oats/pull/1584), shared-work
kernel review [#1586](https://github.com/awebai/oats/pull/1586), and background
client review [#1589](https://github.com/awebai/oats/pull/1589). The review
ruling and defect are source-reported, not independently audited here.
At capture the source explicitly said the client work was not all merged;
this is no shipment, completed-test or live-behavior claim.
