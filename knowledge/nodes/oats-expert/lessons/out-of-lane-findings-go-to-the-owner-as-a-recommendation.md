---
type: Lesson
title: A finding outside the finder's lane goes to the area's owner as a recommendation, never to a human as an FYI or an offer
description: In two coordination trials, out-of-lane findings reported to a human as information or "if you like" were never acted on and cost hidden checks, while the same kind of finding raised to whoever owns the area as a decision with a recommendation was fixed within the hour; whether to fix a pre-existing defect unasked is a policy choice the measures disagree on, so the lead raises it rather than deciding it silently.
about: [workstream/coordination]
kind: lesson
id: ins-93dd54a39586
tags: [coordination, findings, scope, recommendations, human-interaction, trials]
timestamp: 2026-11-09
---
# An FYI has no owner who will act

A session that owns one item finds something outside it: a pre-existing
defect, a caller the change does not cover, an exposure in a neighbouring
surface. The source reports three such findings in one trial arm, each
reported to the human as information ("it is yours to decide and fix", "I
can take that on too if you like") and then closed. None was acted on. Two
of them were exactly what a hidden check later measured, so the arm lost
checks for findings it had already made. A fourth, written into a design
note under "things to know" with no recommendation, outlived the session
only as a line in a merged document.

A human seat that answers questions and accepts recommendations but
volunteers nothing is a strict stand-in for a busy human, who reads such a
line and moves on. The finding needs an owner who will act, not a reader.

# What worked, in both trials

In the other arm an expert found a latent CLI defect while on an unrelated
effort, wrote the human a card with options and a recommendation, got a
one-word answer and had the fix merged about half an hour later. In the
earlier small-work trial the one pre-existing defect the briefs never
mentioned was fixed in team arms only when someone raised it to the human
with a recommendation; offered without a question, it was never fixed.

So the lead's rule for an out-of-lane finding:

- **Route it to whoever owns the area**, by a message that wakes them
  ([hand-offs by message](/nodes/oats-expert/lessons/send-a-hand-off-by-message-to-every-waiter-at-an-exact-head.md)),
  or put it to the human as a decision with options, their effects and a
  recommendation, the shape the
  [request-as-data lesson](/nodes/oats-expert/lessons/an-agents-request-to-a-human-is-data-drawn-once-in-the-efforts-thread.md)
  gives. A human can accept a recommendation in one word; an offer asks
  them to do the thinking.
- **Open the record as well** (an issue), so the finding has a home after
  the finder retires. The record alone is not the hand-off.
- **Never the bare offer.** It is the one shape that guarantees nothing
  happens.
- **Do not retire before the finding has an owner.** A session that reports
  and closes has handed it to nobody.

# Fixing it unasked is a policy choice, not a default

The trial measures pull against each other on an unasked fix outside the
change's scope: fixed checks reward it however it happens, a blind judge and
the design's scope rule dock it as overstepping, and a forge review bot
opposed one such fix as an undeclared contract change. "Clean" and "in
scope" disagree on exactly the class of defect real work is full of. The
candidate policies are to fix an adjacent, reversible defect in the area's
own repository and say so in the PR; to raise it on the plan card with a
recommendation; or to file it and leave it. Which applies is the human's
and the maintainer's to set in the coordination guidance, not the lead's
to decide silently per task. Until it is set, raising it with a
recommendation is the path that worked in both trials.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-09; notes/t7-a-finding-handed-to-a-human-as-an-fyi-goes-nowhere.md;
notes/out-of-scope-latent-defects-are-a-policy-question.md.

The source reports the T7 v2 paired trial (2026-11-08/09, generalist arm:
three findings offered, none taken, two costing checks; redesign arm: one
finding raised as a card and fixed) and trial T6 (2026-11-04, 25 counted
runs, the one pre-existing trap fixed in teams only when raised with a
recommendation). Both ran in scratch deployments with a scripted or
rule-bound human seat; T7 v2 was stopped early and its records deleted, so
the account survives only in the named notes. One run per arm and task; no
transcript, PR or check output was inspected here and no trial was
repeated. The counts are examples of a mechanism, not a rate. Where a
standing expert per area exists it supplies the owner a one-item session
lacks; that is an observation about routing, not a roster decision, which
belongs to the maintainer's
[coordination redesign](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md).
