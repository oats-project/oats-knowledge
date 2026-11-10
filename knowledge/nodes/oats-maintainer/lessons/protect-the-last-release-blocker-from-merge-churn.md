---
type: Lesson
title: Protect the last release blocker from merge churn
description: When one PR is the release's last blocker, arrange a temporary hold on competing merges to its paths so repeated base updates do not consume the critical path, without relaxing integration evidence.
about: [workstream/oats-direction]
kind: lesson
id: ins-37e2e5707414
tags: [stewardship, release, merge-order, ci]
timestamp: 2026-10-27
---
**Owner: oats-maintainer. Update-on-change: whoever changes release-lane merge
scheduling or the integration gate revises this judgment in the same change.**

# Lesson

When a release waits on one PR, letting competing changes land ahead of it
can repeatedly invalidate its integration evidence. The work is ready, but
the release keeps paying for another base update and CI round. Treat this
as a merge-scheduling problem, not a reason to weaken the gate or ask the
owner to keep chasing main indefinitely.

The lane maintainer asks the release lane for a temporary hold on other
merges to the blocker’s touched paths, and lifts that hold when it lands.
The request identifies the PR and the paths, so the release lane can protect
the critical path without an unexplained, indefinite freeze. The
[release lane](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
still owns final review and merge; the request does not transfer that authority.

# Preserve the integration gate

This is a scheduling remedy, not a new CI policy. The existing
[same-area integration rule](/nodes/oats-maintainer/stewardship/review-protocol.md#a-batch-window-preserves-same-area-integration-evidence)
requires updated-head CI for same-area combinations and recognizes semantic
code/test coupling even without shared files. A path hold alone is not proof
that every later combination is safe. Conversely, genuinely independent
merges do not automatically require a serial CI round merely because main
moved. Do not turn the source's broad “every merge” wording into that rule.

The [early combined-tree trial](/nodes/oats-expert/lessons/trial-merge-before-the-merge-order-is-fixed.md)
prepares integration work before order is fixed; this lesson addresses a
later scheduling bottleneck, when one PR has become the last release blocker.
Neither replaces the evidence required on the combination that will land.

Prefer a merge queue that verifies prospective combinations and can honor
the release's chosen order. Until that enforcement exists, repeated manual
holds are coordination debt, with the residual judgment kept in the
maintainer's existing review and release skills. A faster CI run reduces
the cost of one lap but does not remove starvation by competing merges.
No queue implementation or measured future saving is claimed here.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/critical-path-merge-order.md.

The source reports repeated green runs and base updates for the retire-race
fix [awebai/oats#1599](https://github.com/awebai/oats/pull/1599), with other
changes landing first, including a shared-file change. It reports that the
PR landed after a hold on competing kernel-path merges was requested. This
supports the scheduling lesson, not an independently established causal
measurement or a promise about CI duration. Exact run counts, head hashes
and the release's current state are not maintained here.
