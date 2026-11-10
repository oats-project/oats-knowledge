---
type: Lesson
title: A soul removal or rename is a live change for every deployment that follows main; plan the roster change as add first, remove later
description: A deployment that resolves its souls from the head of the workspace repository's main takes a soul removal or rename the moment the PR merges, failing its next spawn of that soul while agents may still run on it, and no review catches it; so the lead asks at planning time which deployments follow main and plans add-then-remove from the start, with the old souls kept composing and marked deprecated and the removals in a separate PR on each such operator's word.
tags: [planning, souls, roster, deployments, landing-order, cross-area]
timestamp: 2026-11-10
---
# Merging is adoption for a deployment that follows main

A deployment can resolve its member souls from the head of the workspace
repository's `main` rather than from a tag or pin. For that deployment a
soul removal or rename is adopted the moment the PR merges: the next spawn
of the removed soul fails, and agents may be running on it at that moment.
Nothing in the PR shows this. The change is approved on every side and
green, because review reads the diff and the deployments are not in the
diff; the conflict appears only when a side whose deployment follows main
is asked to say yes to the merge.

The maintainer's node already records the policy: a removal or fold needs
the agreement of every side that spawns the soul, and the additive part may
be staged ahead of the removals
([how the roster changes in a shared workspace](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md#how-the-roster-changes-in-a-shared-workspace-2026-11-09)).
The release lane records the general form for schema keys: where a
deployment reads a soul from the member repository itself, merging is
adoption
([shared-soul keys wait for every reader](/nodes/oats-maintainer/stewardship/release-traps.md#shared-soul-keys-wait-for-every-reader)).
This lesson is the lead's planning consequence: staging is not a fallback
to reach for when a merge is withheld, it is how a roster change is planned
from the start.

# The lead's rule

Before specifying a roster change (a soul added, removed, folded or
renamed; a rename is a removal plus an addition):

- **Ask at planning time which deployments follow main.** Each such
  deployment makes the removal live at merge; name those sides in the plan.
- **Plan two PRs from the start.** The first adds the new souls and keeps
  the old ones composing exactly as before, with only their description
  changed to say they are deprecated and which soul new work spawns. The
  second removes the old souls and merges on the word of each operator whose
  deployment follows main, once no agent of theirs still runs on them.
- **Two souls may share one knowledge owner id during the overlap.** The old
  soul and its successor each declare the same id and both spawn. The
  maintainer's rule holds this to an interim state during a fold; the lead's
  plan names when the overlap ends.
- **Capability text that the old souls compose may still change in the
  additive PR**, provided the PR says plainly what a new home of an old soul
  will now read (for example, that a home of the deprecated lead now
  launches the successor developer). Such a change rewires the old souls'
  next spawn, so the first PR is then no longer additive in the maintainer's
  sense (nothing removed, routing unchanged) and cannot go ahead on one
  side's word: it needs the agreement of every side that spawns the old
  souls, as the first PR in the evidence received. A second copy of the
  capability, kept so the old souls read unchanged text, was rejected: it
  doubles a shared definition for a transitional reader and is the kind of
  divergence
  [the dependent-text lesson](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md)
  warns against.

The pattern the lead avoids is the one in the evidence: a removal PR that
every reviewer approves, that is green, and that is then rebuilt at the
merge because one deployment would have been broken by it. Finding the
constraint at planning time costs one question; finding it at the merge
costs a rebuild of the PR and its release notes.

# How this differs from its neighbours

[Dependent soul text lands with or after its capability pin](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md)
orders a soul's text against a package pin; this lesson orders a roster
change against the deployments that read the roster, where there is no pin
between merge and reader. [Test what a change strands through a real start](/nodes/oats-expert/lessons/test-what-a-change-strands-through-a-real-start.md)
is how the overlap was checked here: real spawns in a scratch deployment,
not a read of the declarations.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-10;
notes/a-deployment-that-follows-main-makes-a-soul-removal-a-live-change.md.

One roster change,
[oats-project/oats#1780](https://github.com/oats-project/oats/pull/1780).
Read on the forge at harvest: approvals from both sides at `16f9be80`, the
head that removed four souls; the additive rebuild `fbe64475`, which keeps
the four old souls differing from main only in a description beginning
"Deprecated: new work spawns <successor>", with the removal and its hand
steps moved to a later change on the other side's word, and two souls
sharing each of two knowledge owner ids until then; approvals from both
sides and the release lane at that head. The reason the merge was withheld
(a deployment resolving souls from main's head, with agents running on the
removed souls) is source-reported. The scratch-deployment spawns showing an
old soul and its successor both live on one owner id and each passing the
knowledge provider's spawn hook are source-reported at kernel 0.69.12 and
oats.okf 5.8.0, with no model run; two harvest PRs landing together on one
co-owned node was not tested. This lesson does not decide the roster, the
removal's date or the knowledge reshape; those are the maintainer's.
