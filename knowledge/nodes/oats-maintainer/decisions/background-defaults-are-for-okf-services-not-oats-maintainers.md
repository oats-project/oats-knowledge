---
type: Decision
title: Background defaults belong to short-lived OKF services, not OATS maintainers
description: Default the OKF harvester and knowledge-maintainer to background, while keeping OATS maintainers visible as the human's working peers and respecting package-qualified request scope.
about: [workstream/oats-direction]
id: dec-c3da5fef7882
tags: [presentation, soul-defaults, package-scope, rejected-alternatives]
timestamp: 2026-10-28
---
# Decision and rationale

The source records the product owner's direct decision on **2026-10-28**:
the background defaults requested for OKF apply to
`oats.okf/knowledge-harvester` and `oats.okf/knowledge-maintainer`, **not** to
`oats-maintainer`.

The distinction is the role's relationship with the human. The two OKF
service souls perform one bounded job and retire themselves; keeping those
short-lived jobs out of the main sidebar list reduces clutter. An OATS
maintainer is the human's ongoing working peer and must remain visible there
by default. A shared word in the soul names does not make the roles
interchangeable.

**Rejected:** making the OATS maintainer background by default. The question
decided was which souls default to background, and the source records the
answer for OATS maintainers in unqualified terms: they are not background.
No separate ruling on a deliberately chosen per-instance value is recorded;
do not read this record as permission to background a maintainer, and ask
the human before doing so. Nor is it a rule that every short-lived soul
automatically qualifies. It grants no new lifecycle or retirement authority.

# Apply the package qualifier before broadening scope

The source's mistaken draft read a request about OKF harvesters and
maintainers as including the project's OATS maintainer. Preserve the package
qualifier when resolving such role names: identify the package-qualified
souls before changing their defaults. A request naming a package does not
silently include similarly named souls outside it. Ask before widening it
to an OATS maintainer or expert.

Encode the chosen defaults in the relevant soul declarations and cover the
service defaults and the OATS maintainer's foreground default with regression
checks. Those are enforcement targets, not implementation results established
by this record. The knowledge retained here is why the roles differ and why
the broader interpretation was rejected.

# Related decisions

The [presentation coherence ruling](/nodes/oats-maintainer/stewardship/presentation-features-reuse-one-contract.md)
owns the separation of display choices from identity, policy and lifecycle.
The [package-soul rollout gate](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-souls-new-key-is-a-package-wide-rollout-decision-2026-10-27)
owns compatibility and installation evidence before adoption. Choosing these
defaults does not waive either boundary or certify deployment readiness. The
[background presentation decision](/nodes/oats-maintainer/decisions/background-is-presentation-not-lifecycle.md)
owns what the value means and where it lives.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-28; notes/background-instances-gate.md.

The proposal and the note's dated final section attribute the selection
directly to the product owner. The source identifies
[awebai/oats#1593](https://github.com/awebai/oats/pull/1593) as the rejected
OATS-maintainer draft, closed unmerged, and
[awebai/oats-okf#113](https://github.com/awebai/oats-okf/pull/113) as the
package implementation context. Acceptance and draft disposition are
source-reported, not independently audited correspondence or forge history.
The note's earlier gated design context is not proof of final delivery.
This record preserves the decision and its rationale, not a claim that both
package defaults have shipped or that any deployment already uses them.
