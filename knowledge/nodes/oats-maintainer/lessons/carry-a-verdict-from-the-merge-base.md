---
type: Lesson
title: Compute a verdict carry from the merge base, not from the PR's recorded base
description: When you check whether an up-to-date head still carries its verdicts, take the reviewed diff from the merge base with a three-dot diff. The forge's recorded base of a PR follows the base branch's tip, not the commit the head was branched from, so using it, or a two-dot diff, mixes the base branch's own changes into the PR's diff.
about: [workstream/oats-direction]
kind: lesson
id: ins-0489611dbaf4
tags: [lesson, pr-review, git, carry, forge]
timestamp: 2026-11-13
---

Learned 2026-11-13 while bringing an approved PR up to date (oats#1933).

# What happened

The forge reported the PR's base commit (`baseRefOid`) equal to main's tip, so the base looked unmoved. After the forge's update of the branch, the trees differed from the reviewed head's, which looked like a change nobody had reviewed. The reviewed head had in fact been branched from an earlier main commit. The update was right. The reading of the base was wrong: the forge's base field follows the base branch's tip and does not record where the head was branched from.

# Rule

For the [carry rule](/nodes/oats-maintainer/stewardship/review-protocol.md#carry-verdicts-only-with-proof-of-an-unchanged-delta-2026-10-13), compare these two diffs:

- the reviewed diff, `git diff <main-at-review>...<reviewed-head>`, which is the diff from their merge base;
- the updated diff, `git diff <new-main>...<new-head>`.

Drop the `index` lines and compare. Empty output, with CI green on the new head, means the verdicts carry. Never take the base from the forge's PR base field, and never use a two-dot diff: both pull in whatever landed on main since. The [cherry-pick lesson](/nodes/oats-maintainer/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md) is the same three-dot discipline applied to review.

# Citations

1. oats-project/oats#1933, read at review on 2026-11-13. The reviewed head `fd5aaff05d71` has merge base `eecc25ce99ea` with main. The PR's `baseRefOid` is `404957831049`, a later main commit, which the forge's update `47b83bcc163c` merged into the branch.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe, 2026-11-13; notes/carry-a-verdict-from-the-merge-base.md.
