---
type: Decision
title: Put the reference-theory authoring aid in oats.authoring
description: Move the optional knowledge-theory soul and capability to the existing authoring package rather than expose them in every new framework workspace, with release continuity and existing-home preservation.
about: [workstream/oats-direction, workstream/knowledge]
id: dec-a0f08a3153ab
tags: [knowledge, packaging, onboarding, authoring, direction]
timestamp: 2026-11-02
---
**Owner: oats-maintainer. Update-on-change: whoever changes the placement
plan, resolves a dependency or ships the move updates this record in the
same session, preserving the decision and explicitly superseding changed
terms.**

# Planned placement and rationale

As of 2026-11-02, the source reports a release-lane decision to move
`knowledge-theory-expert` and its capability `oats.knowledge-theory` from
`oats.framework` to the existing `oats.authoring` package. This is a planned
move, not shipped behavior or an instruction to rewrite existing homes.

The onboarding campaign exposed the mismatch: a fresh workspace offered the
reference-theory expert beside its setup expert because it consumed the
framework package. The soul is useful to capability authors, not required
for a newcomer to operate a workspace. Put that optional authoring aid in
the package already serving its audience, rather than make ordinary
onboarding explain or hide it.

This changes placement, not the human-accepted
[optional reference theory](/nodes/oats-maintainer/decisions/optional-reference-theory.md):
the soul remains an authoring aid, never a required live dispatcher,
universal harvester or approval service. It selects no new knowledge model
and does not change any capability's runtime obligations.

# Alternatives rejected by the plan

- **A dedicated new package:** another package to tag, pin, mirror and move
  for a single soul, when an authoring package already exists.
- **Collapse unused package souls in Desktop:** hides the mismatch instead
  of removing the authoring aid from a newcomer's framework consumption.
- **Record the person's harness through `souls.launch."*"`:** a broad
  override would also replace deliberate soul-specific harness choices
  later; it does not solve inappropriate package placement. A later decision
  adopts the wildcard for a different purpose, the
  [host-default harness](/nodes/oats-maintainer/decisions/host-default-harness-reuses-souls-launch-star.md),
  with per-soul exceptions for harnesses that can run on the machine; this
  rejection is unchanged for placement.

# Continuity and dependencies

Release `oats.authoring` with the soul and capability first, then update the
catalog and framework in the coordinated OATS release so the catalog never
has a gap. Both packages' release notes name the move from
`oats.framework/knowledge-theory-expert` to
`oats.authoring/knowledge-theory-expert`. Move the generated capability's
source to the authoring repository as part of the same ownership change.
The plan leaves legacy `oas.*` migration redirects intact; relocation is
not a spelling-cleanup project.

The intended existing-home behavior is preservation: homes retain their
copied modules despite old-soul absence, and an upgrade keeps the module;
respawning under the new reference adopts the new placement. These are the
source's stated continuity expectations, not an independently tested
upgrade or migration guarantee. The implementation and acceptance tests
must establish them before treating the move as delivered.

The source explicitly sequences the move after two dependencies:

1. The [repository move](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)
   that includes the authoring repository.
2. Pepe's decision on the [coordination research](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md),
   which may reshape the souls.

Neither dependency is declared complete here. Preserve the existing release
and cross-side contract gates; this placement record grants no new release
or deployment authority.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-02; notes/knowledge-theory-expert-moves-to-authoring.md.

The finding, release-lane decision (`eab15bcf`) and agreed plan (`197ef543`)
are source-reported from private correspondence. They are not independently
verified human acceptance. The source says the move was not built at
capture; no release, catalog transition or retained-home behavior was
reproduced by this harvest.
