---
type: Lesson
title: "Where reviewers are kept on the author's model family, the one round on another family goes first"
description: "On one large pull request three review rounds on the author's model family passed what the fourth, on another family, returned as three majors at the loop's cap; on its sibling the other-family round ran first and its three majors cost one ordinary fix."
about: [workstream/coordination]
kind: lesson
id: ins-46ab5a1e10c4
tags: [review-loop, model-diversity, reviewers, cap]
timestamp: 2026-11-20
---

# What happened

The source reports that an effort's person had asked for every child on one model, so authors
and reviewers shared a model family, and that mid-effort the lead ruled that every large pull request gets at least one fresh
review round on another family, at or above the floor.

On the first pull request that round came last, as round 4 of 4. Rounds 1 to 3, on the author's
family, had each approved with small findings. Round 4 returned changes: the supervisor checked a
command at its resolved path but launched the declared one; an inherited variable survived an
absent file it was meant to come from; a pre-start check passed on an attempt that could not tell.
The source reports that one of the earlier reviewers had seen the first of these and not reported
it.

Because the cap was reached, the findings came to the specifier to decide one by one, and the
fixes were read as deltas by fresh reviewers and by the specifier in place of a fifth whole-change
round: a loosening of the loop that had to be stated on the pull request and to its maintainer.

On the sibling pull request, in another repository, the other-family round ran first. It returned
changes with three majors (smaller ones than #2004's: docs and a check stricter than the base's
grammar); they were fixed in one commit, the next round approved, and the loop closed inside its
cap with nothing to explain.

This is one pair of pull requests, not a measurement: it shows where an other-family round's
findings land in the loop, not that the order changes how many there are.

# What to do

Where an effort keeps reviewers on the author's family for any reason, schedule the round on
another family as round 1 of the whole change. Its findings then meet a loop with rounds left.
This does not replace the default, a reviewer of another family than the author's every round
(the review loop's model rule); it is what to do when that default has been set aside.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-20;
notes/other-family-round-first.md, notes/round4-decisions-2004.md.

# Citations

1. oats-project/oats pull request 2004: its description lists the rounds, the models and how the
   fourth round's findings were handled at the cap.
2. oats-project/oats-bb pull request 2, merged as `449410a6`: its description lists round 1 on
   another model family and round 2's approval.
3. oats-project/oats `capabilities/oats-build/skills/run-the-review-loop/references/model-and-history.md`
   at `47af6d138901`: the review loop's model rule. Read at maintainer review 2026-11-20.
