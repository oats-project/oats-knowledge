---
type: Decision
title: Operating OATS is capability content; the reviewed list is the marketplace
description: Knowing how to operate OATS ships as two official capabilities — a core every soul receives by kernel default and a setup capability held by the souls that administer a deployment — and the reviewed package catalog in the framework repository is the official marketplace, without a hosted registry.
about: [workstream/oats-direction, system/oats-kernel]
id: dec-feb06c322c75
tags: [distribution, capabilities, marketplace, onboarding, souls, kernel]
timestamp: 2026-09-20
---
# Decision

Decided 2026-09-20 with the human (oats-expert as maintainer). The core's
delivery was amended 2026-09-23 by
[workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)
(point 26); who holds the setup capability follows the
[roster](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md).

# Context

The skills that teach an agent to *operate on OATS* were kernel-owned and
appeared in every instance "by magic". A soul's definition therefore did not
show that it received OATS operational knowledge, so that knowledge could not
be removed, replaced or reasoned about; and setup knowledge travelled with the
installed kernel, not with a soul. At the same time an official package list
already existed as a mechanism (the catalog the CLI resolves short names
through), but nobody had stated that this list is *what defines officialness*.

# What was decided

1. **Two official capabilities, shipped from the framework repository as a
   package like any other.** `oats.core` carries day-to-day operation, soul
   discovery and the "you run on OATS" briefing; `oats.setup` carries the
   workspace model, configuration and packages.
2. **The core is a visible, removable default.** Since 2026-09-23 it is a
   workspace default (and the kernel's default in the standalone case), shown
   in the spawn preview and replaced by any mention of it in the soul
   (including `off`). A soul without it is a valid, deliberately OATS-unaware
   soul. The 2026-09-20 form — soul-creation tooling writing the line into
   every soul — was dropped because a line copied into every file is
   ceremony; the invariant that survives is that the dependency is
   **visible**, never silent.
3. **The kernel keeps only what describes the layout it itself creates**
   (the instance-boundary and work-mode briefings). Operational skills and the
   "you run on OATS" briefing are the core's; the kernel ships no copy.
4. **Setup knowledge travels as a soul.** `oats.setup` is declared by the
   souls that operate a deployment — the operator expert and the
   deployment's setup admin — so setup is a conversation with a soul that has
   the setup skills, not a wall of flags. No new bootstrap authority is
   introduced.
5. **The official marketplace is the reviewed package catalog in the
   framework repository.** Officialness is granted by a maintainer-reviewed PR
   to that list — for externally hosted packages too. It is the only way a
   package becomes pinnable by id; a package outside it is written as a Git
   reference. **Listed is not trusted**: listing grants no credentials and no
   permission to run code; declaring a package in the workspace is the trust
   decision, and the lock pins commit and integrity
   ([integrity, origin and consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)).

# Rationale and rejected alternatives

- **Leaving operational skills ambient** — it hides a dependency and blocks
  reasoning about what a soul knows.
- **Building a hosted registry** — when a shipped mechanism already exists,
  the decision is to **name and govern it**, not to build a parallel one.
  Officialness is a review outcome, not a hosting arrangement.
- **An invisible kernel default with no trace in the preview** — the very
  defect being removed; the v2 default is acceptable only because the preview
  shows it and one line in the soul replaces it.

# Consequences

- Soul definitions are honest about how an agent knows OATS; a soul still
  gets policy from configuration
  ([kernel view](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)).
- **Kernel releases and capability releases decouple**: the distribution
  package carries its own tag, so capability content ships without a kernel
  cut, under the [release judgement](/nodes/oats-maintainer/stewardship/release-traps.md).
- User-facing onboarding judgement is the
  [operator node's](/nodes/oats-operator-expert/index.md) to hold.

# Current contracts

- [official-catalog.md](https://github.com/awebai/oats/blob/main/docs/official-catalog.md)
- [packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/official-capabilities-oats-core-setup-and-marketplace`; delivery-log "name and govern" and decoupled-tag lessons, 2026-09-20).
