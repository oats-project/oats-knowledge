---
type: Lesson
title: A review loop that keeps finding record-state defects converges with a transition table, not more rounds
description: When fresh review rounds keep finding small in-spec defects in how records move between states (on resume, retry, retire), stop the round-by-round fixes; the builder writes the area's transition table from the spec, routes every read and write through one decision function, tests every cell, and briefs the next reviewer with the spec and the table; cells the spec leaves open go to the lead.
about: [workstream/coordination]
kind: lesson
id: ins-1f10c618a0bc
tags: [lesson, review-loop, state-machine, convergence, coordination]
timestamp: 2026-11-14
---

# What was observed

On an oats.aweb PR ([awebai/oats-aweb PR 271](https://github.com/awebai/oats-aweb/pull/271)) whose records (admission and removal, per team label) move through
none, keyed, pending, unknown, committed, refused and removed, review rounds 5 to 8 led to
2, 1, 1 and 3 fixes. Most were in that area and needed no spec change: a retry
overwrote a committed record. A certificate check applied to pending records only. A
retained seat's retire skipped the root's removals. Each fix was local to one path, so
the next fresh reviewer found the next path that decided a record's state on its own.

# The change of approach

- The builder writes the table: states × events × conditions → next state, writes, exit
  and warning, each cell cited to the spec.
- One function implements it. It decides and does nothing; callers run the CLI and the
  files.
- A table-driven test runs every cell.
- The next reviewer is briefed with the spec and the table.
- A cell the spec doesn't settle comes to the lead as a question, never a builder's
  guess. Here there were eight; all were decided without a contract change, and one
  showed that an existing acceptance row had encoded a defect.

# Outcome

After the table, rounds 9 to 14 found nothing inside the state machine: every cell held.
Their findings were in other areas (reconcile's inputs and ordering, an unconnected
leave, captured settings at join, a readiness hint), each different, none returning. The
loop converged at round 14. A table ends a loop's findings in its own area; it doesn't
end the loop, and a large change still takes fresh rounds elsewhere.

# How to apply

Read a run of rounds in one area that all find in-spec defects as the loop warning sign.
Change the method before the next round; don't brief the next reviewer more narrowly. This complements the
must-fix cut-off for hardening loops ([a hardening review loop needs a cut-off](/nodes/oats-okf-expert/lessons/a-hardening-review-loop-needs-a-cut-off.md)): the cut-off bounds edge-case hunting, and the table removes a class of defect. A loop that keeps finding boundary inputs in a
matcher has the same shape, and its fix is the contract written first ([a text-pattern guard's exact contract is written before its first review](/claims/lessons/a-text-guards-contract-is-written-before-its-first-review.md)).

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-human-ids-endorsed-root, 2026-11-14; notes/converge-a-looping-review-with-a-state-table.md.

Verified by maintainer review on 2026-11-14 against the PR's commits and body (open and
unmerged, held until a published aw pins it): the commits labelled review rounds 5, 6, 7 and
8 number 2, 1, 1 and 3; four of them (a start dropping an admitted joined team, a retained
seat's retire, a retry over a committed record, an unknown record's certificate at retire)
are record-state defects, and three (a refusal's length cap, the legacy roots inventory, a
joined team's 403) are not. The
structural commit routing every record move through one `step` function and the table test
follow round 8; the body lists the eight decided cells and records 14 rounds, the last
approving. The rounds' briefs and the claim that rounds 9 to 14 found nothing inside the
state machine are source-reported.
