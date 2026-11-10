---
type: Lesson
title: A re-dated claim must be re-verified against the release it now names
description: Verify version-qualified behavior against the named release; an unreleased-feature gate keeps its fallback without a guessed floor, and mirror-keyed checks prompt release-qualified wording when the feature ships.
about: [workstream/oats-direction]
kind: lesson
id: ins-e5b8d9e34293
tags: [lesson, review, docs, release, versions]
timestamp: 2026-11-03
---

Learned 2026-09-24 by the maintainer while reviewing a provider release's
mirror PR.

# What happened

A mirror PR for a provider release updated every version literal in the
integration guide to the new floor. One sentence said that, as of the old
version, sending through a session grant was rejected by the server with a
specific error. The developer bumped its version to the new floor; the fix
for that very error shipped in the floor release, so the sentence became
false. The first reviewer approved after checking the pin, the payload
parity, the floor markers and the tests; a second reviewer read the sentence
and asked whether it was still true.

# Rule

A version literal inside a sentence that asserts behaviour is not a pin.
Before approving a release that bumps it, decide for each such sentence
whether the behaviour is still true at the named version, from the
release's own evidence (acceptance results, changelog, source), and rewrite
it as history plus current state if it changed. Sentences of the shape
"as of X, Y does not work" are the ones to search for, because they are the
ones releases exist to falsify.

# Why

Parity checks, pins and tests cover bytes and behaviour; none of them reads
prose. A guide that carries a falsified limitation forward tells the next
operator to work around a problem the release removed, and it does so with
the authority of a freshly updated version number.

# Consequences

- Reviewing a release's docs means grepping for version-qualified claims
  and re-verifying each, not diffing the version literals.
- The same discipline as
  [re-reading a cherry-pick against the new base](/nodes/oats-maintainer/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md):
  green mechanical checks do not cover prose, and
  [the merge range is the scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md)
  includes every touched sentence.

# Feature floors need a shipped feature (2026-11-02)

The same distinction applies before a release, not just when re-dating a
limitation. A skill's claim that a feature needs package version X or later
must be checked against a tag that actually includes that feature. Before it
ships, say "the release that ships it"; an explicitly labelled earliest
possible version can record a planning bound, but cannot certify feature
availability. If the feature misses a release, correct the claim rather than
letting the guessed floor become a shipped promise. The refinement below
makes the boundary explicit: a planning bound does not belong in the gate.

The source reports that getting-started guidance named oats.aweb 1.33.0 for
a root route still pending in oats-aweb#147. The 0.69.9 pin move exposed the
mismatch through a skill-versus-mirror test. The skill was live from main, so
the misleading version line mattered at merge, not only at the next tag.
That timing is the new lesson; the actual floor remains in release evidence,
not this knowledge record.

The [correction at b0ad6929](https://github.com/awebai/oats/commit/b0ad692950ba6df50e4a76604c8192f56a9d9410)
was read during harvest: it changes the skill's floor to 1.34.0 and describes
that version as the earliest possible shipment in the test. The
[second read](https://github.com/awebai/oats/pull/1709#issuecomment-6575948203)
explicitly says no 1.34.0 tag existed then. Neither proves shipment in
1.34.0, and the still-unqualified skill wording is not adopted as evidence
that a future numeric floor is safe.

Prefer deriving feature-availability guidance from one release-qualified
source, with CI exercising the documented route against its named released
package rather than merely comparing duplicate version literals. The
reported test caught this instance; no general version-claim gate is claimed.
The remaining semantic check belongs in existing release and skill-review
guidance, not a second procedure or a knowledge-only permanent workaround.
No skill or test is changed by this harvest.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/a-skill-names-a-version-only-once-it-ships.md. The CI failure
and main-served timing are source-reported; the public correction and reader's
assessment were checked, but no CI run, release or runtime was reproduced.

# An unshipped feature's gate names no version (2026-11-03)

Do not write an earliest possible release number into an availability gate,
even as a temporary floor to bump at each release. Name the feature's PR and
keep the documented fallback unconditional until a release carries the
feature. The release preparation that pins that release supplies the first
evidence-backed floor. A PR merge alone is not shipment. Planning estimates
may remain outside the gate; review and release prep reject them as execution
conditions. This refines the earlier planning-bound distinction without
changing the duty to re-verify later version-qualified claims.

The source reports that the root-route gate was moved to 1.34.0 and then
1.35.0, neither carrying the feature. The plan still fell back safely: the
observed cost was needless release-prep edits, not a broken run. Removing the
guessed floor avoids that repeated prediction; it does not make all wording
immune to staleness once the feature ships or its contract changes.

Prefer one release-qualified feature source for guidance, with a check keyed
to the pinned package's mirror: absence requires fallback wording; presence
requires replacing it with a floor verified against release evidence. This
puts the transition in the prep that actually adopts the feature rather than
in a calendar guess. Keep the remaining semantic judgment in existing
release/skill review, not a duplicate procedure or a knowledge-only guard.

The public [correction in oats#1728](https://github.com/awebai/oats/pull/1728)
was read during harvest. It removes the guessed provider floor and keys
`test/getting-started-steward.test.mjs` to a root-route marker in the mirror.
Its positive branch rejects the old no-release sentence and checks the
underlying CLI floor; it does **not** assert that the replacement prose names
the correct provider release. Treat it as a bounded transition reminder, not
complete enforcement. Release-evidence verification, or a stronger assertion
against that evidence, is still needed. No skill or test is changed here.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-03; notes/an-unshipped-feature-floor-names-no-version.md. The merged
PR and relevant diff were checked; the repeated guesses and safe-fallback
outcome remain source-reported, bounded to one skill and one feature. No CI
run, release availability or deployment was independently verified.
