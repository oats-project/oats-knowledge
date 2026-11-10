---
type: Lesson
title: Scoped release approval covers delivered behavior, including package pins
description: Check an effort-scoped release approval against all behavior the candidate delivers, including package pins, rather than only its kernel diff.
about: [workstream/oats-direction]
kind: lesson
id: ins-85f308054956
tags: [stewardship, release, scope, approval, pins]
timestamp: 2026-10-31
---
# Lesson

A human's go for one effort's releases does not authorize unrelated behavior
merely because it travels in the same tag. The relevant scope is everything
the candidate delivers to a host, including behavior supplied by its package
pins. A kernel diff entirely inside the effort is not enough: advancing a
pin can change an operator-visible promise without changing kernel code.

Before tagging under that delegation, enumerate the candidate's behavioral
changes, including the pinned packages' changes, against what the go names.
Remove changes outside that scope or obtain the human's word for them. For
incidental content that cannot be separated from a required package or the
way the tag is built, name it in the release plan and explain why it does not
change behavior a deployment relies on. That explanation makes the judgment
reviewable; it is not a general exception for inseparable changes. A
substantive out-of-scope effect still needs authority, not a harmlessness
label.

This applies the existing
[effort-only release delegation](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#onboarding-redesign-delegation-2026-10-30),
without narrowing its authorized work or widening it to unrelated releases.
It changes no reviewer, merge, tag, deployment or verification gate. The
[whole-merge-range check](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md)
catches unrelated commits; this lesson adds the behavior carried by a pin
even when that pin's files were deliberately included.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-31; notes/a-go-covers-what-its-words-name.md.

In the source's release-prep example, the onboarding-only go was initially
read as covering a candidate whose kernel changes belonged to that effort.
A second read identified that its engineering-package pin also introduced
checkpoint behavior under which a stopped instance could restart. The
release lane removed that pin instead of treating release-note disclosure as
authority to ship it. Inseparable framework and build changes were named
with their impact assessment in the revised plan.

The [second read](https://github.com/awebai/oats/pull/1699#issuecomment-6538356386),
[release-lane correction](https://github.com/awebai/oats/pull/1699#issuecomment-6538372430)
and [delta approval](https://github.com/awebai/oats/pull/1699#issuecomment-6538472075)
were read during harvest. They corroborate the review and correction, not
human authorship of the go; the second reader explicitly leaves tag authority
to the release lane. This is one source-reported release, not an independent
runtime or shipment audit, and not a new human-accepted release policy. The
package's current behavior and release status belong in its own records.

# Prevention route

Prefer release tooling that derives a complete candidate inventory from the
selected artifacts and pinned revisions, with a release gate requiring each
entry to be accounted for in the scoped plan. Automated inventory can catch
omissions; it cannot decide what the human authorized or whether an
incidental behavior is harmless. Keep that remaining judgment in the existing
`git-tag-release` skill and
[release lane](https://github.com/awebai/oats/blob/main/docs/release-lane.md),
not a new sign-off queue. This harvest adds no tooling, test or skill change.
For the separate compatibility and adoption-route gates, see
[release judgment](/nodes/oats-maintainer/stewardship/release-traps.md).
