---
type: Lesson
title: Plan dependent soul text to land with or after its capability pin
description: When soul text relies on a package capability change, record the pin dependency in the plan and soul PR rather than treating two text changes as independent landings; when the pinned release removes something the consuming repository still uses, plan the texts and every repair in the pin's own PR from the start.
about: [workstream/coordination]
kind: lesson
id: ins-e06b000eb2a5
tags: [planning, instructions, dependencies, packages, cross-area]
timestamp: 2026-11-11
---
# Two text PRs can be one semantic change

A generic capability change and a soul-specific change can look independent:
each diff is coherent in its own repository. But the soul composes the
workspace's pinned package, not the capability repository's latest text. If
the soul starts relying on the new rule before the pin moves, a fresh
instance can receive contradictory instructions even though both PRs pass
their separate checks.

The planning mistake is to treat text-only work as release-independent.
When splitting a rule between a package capability and a soul that composes
it, identify which version makes the new soul text coherent. Plan the soul
PR to land **with or after the pin of that release**, and put that condition
in the soul PR description before handover. Merging the capability's source
alone does not satisfy it. This is a dependency to make visible to the
maintainer, not authority for the expert to choose release order or tag.

This applies when the soul actually depends on the new capability text; it
does not serialize unrelated wording changes. In the reported incident,
review caught a contradiction between the new soul's joining rule and the
older pinned capability before either PR merged. The possible bad spawn is
the reason for the ordering, not an observed shipped failure.

# A pin that removes something carries its repairs in one PR (2026-11-11)

"With or after" holds for an additive release. When the pinned release
**removes** something the consuming repository still uses, only "with"
is left: the pin is red without the repairs, and texts that name the new
release's commands are wrong before the pin. The release lane's
[removal rule](/nodes/oats-maintainer/stewardship/release-traps.md#a-provider-release-that-removes-a-component-is-pinned-inside-its-adoption-pr-2026-11-11)
owns that judgement and the PR's shape: the release lane builds the
generated pin commit, the adoption PR carries it unchanged and puts the
repairs on top, and the release lane signs off last. It is not restated
here. This section adds what falls to the lead of the adoption work:

- **Plan one PR from the start.** The source planned the pin as the
  release lane's small PR, with the texts in a second PR after it, and
  learned that the pin could not merge alone only when its CI went red.
  A lead told that a pin crosses a major asks what the major removes
  before agreeing to a two-PR plan.
- **Search the consumer for every use of the removed thing before
  planning,** not only the texts the lead came to change: the tests that
  spawn or run it, the smoke scripts, the docs links into the package,
  and the texts. In the source's case the repairs were nine kernel tests,
  the clean-room smoke and one docs link, none of them part of the text
  work as first planned. This is
  [enumerating what a removed behaviour held up](/nodes/oats-expert/lessons/enumerate-what-a-removed-behaviour-held-up.md)
  applied to a package's consumer.
- **Read CI one stage at a time.** A pipeline that stops at its first
  failure says nothing about the stages after it. The source saw the
  smoke fail only once the docs failure was fixed. After each fix, read
  the next stage at the new head rather than assuming it is clean, and do
  not size the repair work from the first red run.

# Canonical boundaries and prevention

The accepted [source → tag → pin judgment](/nodes/oats-maintainer/stewardship/release-traps.md#source--tag--pin-proven-from-both-sides)
and the integration owner's [mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
own release mechanics. This lesson adds the generalist's earlier planning
check for a semantic consumer: the soul's instructions. It complements
[tracing promised outcomes to their producer](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md),
rather than duplicating package release procedure. Where no pin stands
between merge and reader, because a deployment resolves its souls from the
workspace repository's main, the ordering question is the roster's:
[a soul removal is a live change for deployments that follow main](/nodes/oats-expert/lessons/a-soul-removal-is-live-for-deployments-that-follow-main-so-add-first-remove-later.md).

Prefer keeping a shared rule in one capability-owned home instead of two
independently changing definitions. Where the soul must specialize it,
review the **composed text at the intended pin**, not merely both diffs.
Structural composition tests and an enforceable PR dependency can prevent
known mismatches; a pin/parity check alone cannot establish that two pieces
of prose agree. The owning planning guidance should require the dependency
and landing condition. These are prevention routes, not claims that new
checks or skill changes have landed.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-maintainer-lanes,
2026-10-27; notes/soul-text-lands-after-the-capability-pin.md.

The source reports one planning miss found by an adversarial reviewer on
2026-10-26, involving [awebai/oats-engineering#16](https://github.com/awebai/oats-engineering/pull/16)
and [awebai/oats#1537](https://github.com/awebai/oats/pull/1537). At that
observation, neither PR had merged. This harvest did not audit those PRs,
compose a fresh instance or reproduce the contradiction; it preserves the
reported review lesson, not current PR, pin or release status.

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-11; notes/a-pin-that-breaks-the-consumer-lands-with-its-repairs-in-one-pr.md.

The removal section is one pin in one build, observed 2026-11-11 and
source-reported: the two-PR plan, the nine kernel tests, the clean-room
smoke, the docs link, the order in which CI showed them and the single
PR's checks passing 13 of 13 are the source's report. This harvest read
no PR, check run or commit. It is the lead's side of the case the release
lane's section records; that section stays the authority on the PR's
shape and sign-off, and whether the adoption PR merged is not established
here.
