---
type: Lesson
title: A failed-job rerun does not pick up a later base fix
description: When PR CI failed on an old merge revision, rerunning that run does not test a fix subsequently merged to main; obtain fresh combination evidence and distinguish a branch update from an unchanged-head retrigger.
about: [workstream/oats-direction]
kind: lesson
id: ins-40596dd7e121
tags: [review, ci, merge, evidence]
timestamp: 2026-10-28
---
# Choose the remedy from the revision that failed

For the GitHub pull-request merge-ref runs reported by the source,
`gh run rerun --failed` repeats the revision captured by the original run.
A fix-forward that landed on main afterward is not pulled into that rerun.
Before retrying a red check, establish whether the failure is transient on
the tested revision or whether the needed fix exists only on a newer base.
The latter needs a fresh run of the combination, not another attempt of the
old run. A transient failure is a reason to retry; this is not a claim that
flakes are the only possible reason to rerun CI. Establishing which tests
ran in that exact run is the
[shard-membership lesson](/nodes/oats-desktop-expert/lessons/shard-membership-is-run-specific.md)'s
concern, not repeated here.

Updating the branch by merging main incorporates the fix and **changes the
PR head**. Record and verify the resulting head and checks under the
[existing review rules](/nodes/oats-maintainer/stewardship/review-protocol.md#bind-every-verdict-to-content);
this lesson grants no automatic carry of an earlier approval. In particular,
the [same-area integration requirement](/nodes/oats-maintainer/stewardship/review-protocol.md#a-batch-window-preserves-same-area-integration-evidence)
remains in force.

The source also reports closing and reopening a PR to obtain a new merge-ref
run without changing its head. Treat that as an observed retrigger, not a
universal forge guarantee or a substitute for a required branch update.
If using that route where policy permits, confirm that a new run actually
started and that its tested combination includes the fix. Unchanged PR head,
new run and current tested base are different facts.

# Prevention and limits

A merge queue that tests each prospective combination is the structural
route already identified by the review protocol. CI tooling should expose
the tested revision and reject stale combination evidence; until enforced,
revision-aware retry judgment belongs in `pr-review`. No queue, guard or
skill change is delivered by this lesson.

Evidence: OKF proposal from oats-maintainer/pepe-lfx-maintainer, 2026-10-28; notes/a-rerun-tests-the-old-merge-ref.md.

The note dates the failed rerun to 2026-10-15 and identifies
[awebai/oats#1163](https://github.com/awebai/oats/pull/1163),
[run 38617772381](https://github.com/awebai/oats/actions/runs/38617772381),
and the fix-forward [#1203](https://github.com/awebai/oats/pull/1203).
It reports the unchanged-head retrigger in
[#1250](https://github.com/awebai/oats/pull/1250). These are source-reported
incidents, not independently audited CI results. The evidence does not
establish every workflow's checkout strategy or event configuration.

Verified by the knowledge maintainer at review on 2026-10-28 from public
GitHub records: the cited `pull_request` run's first attempt started
2026-10-14T18:44Z and failed; #1203 merged at 19:22Z; the second attempt
started at 19:24Z and also failed. The rerun therefore postdated the fix, on
2026-10-14 in UTC, where the note's 2026-10-15 is presumably local time.
#1250 shows a close and reopen at 2026-10-15T14:04Z. The tested revision of
each attempt and the retrigger's new run were not inspected.
