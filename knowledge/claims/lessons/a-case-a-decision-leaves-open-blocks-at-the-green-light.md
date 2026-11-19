---
type: Lesson
title: A case a recorded decision leaves open blocks the PR at the green light; settle it before the build
description: When a change follows a decision that names a case it does not decide, and the change touches that case, the lead takes the case to the lane maintainer as a direction question before building; picking an answer silently gets an ESCALATE at the green light and a rebuild after the review loop.
about: [workstream/coordination]
kind: lesson
id: ins-4d910134ee21
tags: [decisions, green-light, escalate, planning, contracts]
timestamp: 2026-11-19
---

# Every review read passed it; the maintainer stopped it

oats-project/oats#1962 (the BYOT branch of `oats-getting-started`) followed the
decision that
[the tested aw is published by oats.aweb and pinned only for BYOT](/nodes/oats-maintainer/decisions/tested-aw-is-published-by-oats-aweb-and-pinned-only-for-byot.md).
That decision said in a "Not decided here" line what it left open: what the
branch does when a newer aw is already installed. The plan, two whole-change
review rounds and three delta reads took "install the tested aw in place of
any other" as settled. The lane
maintainer read the decision itself and escalated at the green light, since the
two sides that took a decision settle its open cases. They chose to keep a
newer aw. The step was rebuilt, and then it needed a fresh review round and
CI again.

# What to do

When planning against a recorded decision, read its "not decided", "open" or
"out of scope" lines. Any case the change touches goes to the lane maintainer
as a direction question before the build, with a recommendation: it needs no
PR and no CI. Reviewers check the change against the decision's text, so they
don't catch a choice the decision never made.

Checked at maintainer review, 2026-11-19, on
[oats-project/oats#1962](https://github.com/oats-project/oats/pull/1962),
merged as `b25111fb` from head `1b0c47c0`: the ESCALATE at `c3ae543a`
([issuecomment-7016642633](https://github.com/oats-project/oats/pull/1962#issuecomment-7016642633))
quotes the decision's "Not decided here" line and holds the verdict until the
two sides settle it; the GREEN LIGHT at `1b0c47c0`
([issuecomment-7017032491](https://github.com/oats-project/oats/pull/1962#issuecomment-7017032491))
reports both sides' option (b), keep a newer aw. The PR body's Review section
lists r1 and r2 with delta reads at `8840623d`, `266dedd8` and `c3ae543a`
before the ESCALATE, and the fresh whole-change round r3 at `1b0c47c0` after
it; CI green at that head per the green light. The proposal's "four review
rounds" was corrected to that record. The open point is now recorded as
decided in the decision itself (its "A newer aw already installed is kept"
paragraph). That the plan took the case as settled is the lead's report.

Evidence: OKF proposal from oats-engineering-expert/byot-getting-started-lead, 2026-11-19; notes/an-open-case-in-a-decision-blocks-at-the-green-light.md. ESCALATE at c3ae543a on oats-project/oats#1962 (issuecomment-7016642633), decided by both sides, rebuilt in 1b0c47c0, green light at 1b0c47c0 (issuecomment-7017032491).
