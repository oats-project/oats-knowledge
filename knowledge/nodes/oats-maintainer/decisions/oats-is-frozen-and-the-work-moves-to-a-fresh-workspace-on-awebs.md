---
type: Decision
title: OATS is frozen; its deployments keep running as they are, and the work moves to a fresh workspace built on aweb's
description: On 2026-11-26 Pepe froze OATS. Nothing merges to its main branch and no release is cut, except the experimental bb integration work. Existing deployments keep running on their current versions and are not converted in this leg. A fresh workspace is made from aweb's own, in the aweb repository, and OATS continues mainly to support the joint product.
about: [workstream/oats-direction]
tags: [direction, roadmap, aweb, unification, freeze]
timestamp: 2026-11-26
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when Pepe lifts or narrows the freeze, when a conversion of existing deployments is decided, or when the fresh workspace exists, this record is updated or superseded.

# Decision

On 2026-11-26 Pepe told the release lane directly:

- **OATS is frozen now.** Nothing merges to its main branch and no OATS release is cut. The release that was being planned is dropped.
- **Existing OATS deployments keep working as they are,** with the aweb versions they run today. No conversion of them is planned in this leg.
- **A completely fresh workspace is made,** reusing aweb's current workspace in the aweb repository. OATS and its workspace continue to exist mainly to support the new joint product.
- **One exception: the bb integration work,** which is experimental. It continues in its own repository as before. A change to OATS's main branch is allowed only where that work needs one, and each is named on the hold when it merges. The other official package repositories are frozen with OATS.

**Acceptance: human-accepted.** Pepe stated each point in his own words to the release lane.

This refines [OATS and aweb unify under aweb](oats-and-aweb-unify-under-aweb.md): that record's line that OATS releases continue "until the unification changes how they are cut" is replaced by the freeze.

# How it applies

- **The freeze is a hold on the default branch,** an open issue with the `hold` label, not a message. Its standing exception for the bb work is a comment on it.
- **A PR open at the freeze stays open as history** or is parked by its lane's maintainer. Nobody rebases or finishes it for a release that isn't coming.
- **A plan for the merged product that assumes every deployment is converted** describes one side's plan, not an agreed one. The release lane answers such a plan with this decision and leaves whether and when to convert to Pepe and Juan.
- **Releases of the bb integration** continue as before, cut by the release lane as its work lands.

# Rejected

- **Keep releasing the old line until each deployment is converted.** This was the release lane's own earlier position. Pepe chose the freeze: the old line needs no new releases if its deployments stay as they are.
- **Convert existing deployments as part of this leg.** Not planned; the new work starts fresh.

# Open

Whether existing deployments are ever converted, and when. What the fresh workspace's souls are, and the word for what OATS calls a workspace in the joint product: Pepe did not accept the word first proposed for it.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-26; notes/oats-and-aweb-unify-under-aweb.md.
