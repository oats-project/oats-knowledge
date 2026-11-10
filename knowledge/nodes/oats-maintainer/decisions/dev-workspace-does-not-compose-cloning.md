---
type: Decision
title: The OATS development workspace does not compose oats.cloning
description: Deliberately leave oats.cloning unpinned and uncomposed in the OATS development workspace while retaining its catalog entry and member repository; restoring consumption needs the deciding human's approval.
about: [workstream/oats-direction]
id: dec-5be609ddbc40
tags: [workspace, composition, cloning, packages, stewardship]
timestamp: 2026-10-29
---
# Decision and acceptance

On 2026-10-29, the release lane's directing human chose to remove
`oats.cloning` from the OATS development workspace's package pins and from
its souls' composition, while keeping the catalog entry and the
`awebai/oats-cloning` workspace member. The source reports direct acceptance
of that scope before the 0.69.5 tag. This is a deliberate consumption
choice, not an omitted dependency to repair during routine review.

Re-pinning the package here, or adding its package-sourced capability back
to a soul here, reverses that decision and needs the deciding human's
approval. The decision applies to `awebai/oats`'s own development workspace,
not every workspace using OATS. It neither deprecates the package nor
withdraws its official status.

This explicitly narrows the blanket package-consumption statement in the
[dogfooding decision](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md)
for `oats.cloning`. It does not reverse multi-repository dogfooding,
reciprocal membership or the separation of member and publisher roles.

# Why the distinction matters

The human gave no further reason for removing the capability. The source
places the request after a discussion of package kernel floors; that
context is not evidence that a particular floor problem was the human's
reason or that the package is unsuitable for other adopters.

The retained catalog entry and member are intentional, not evidence that
the pin should be restored:

- Removing the catalog entry as well would remove pinning by catalog id for
  other workspaces. Official listing is distinct from this workspace's
  consumption, as the
  [marketplace decision](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md)
  already establishes.
- Dropping the member as well would remove discovery of its expert soul.
  Membership remains useful without consuming the package here; see the
  [workspace/package distinction](/nodes/oats-maintainer/decisions/workspace-definition-is-not-a-package.md).

These are the source's reasons for the retained scope, not additional
motives attributed to the human. A future maintainer should preserve that
scope rather than infer either accidental omission or global deprecation.

# Release boundary

The source's removal judgment distinguishes a loss of capability from
adoption of a higher package floor. The
[shared-workspace floor hold](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-souls-new-key-is-a-package-wide-rollout-decision-2026-10-27)
applies to advancing pins to a floor-raising package; this removal does not
make that move. This is not a blanket exemption from holds, second reads or
other release gates.

A removal still affects the sides whose deployments follow this workspace:
their new instances lose the capability. The source's release guidance is
to tell each affected side before merging and name that loss in the release
notes. Not raising a floor does not make the change adoption-neutral.
This guidance is maintainer judgment, distinct from the human's accepted
consumption decision.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-29; notes/dev-workspace-does-not-compose-cloning.md.

The source identifies [awebai/oats#1643](https://github.com/awebai/oats/pull/1643)
as the reviewed removal shipped in 0.69.5. Acceptance, review and shipment
are source-reported; this harvest did not independently audit the session,
implementation or release. No broader reason, package deprecation or
completed deployment rollout is inferred.
