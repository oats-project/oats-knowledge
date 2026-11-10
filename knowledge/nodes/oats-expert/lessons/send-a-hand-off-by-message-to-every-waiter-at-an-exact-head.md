---
type: Lesson
title: Send a hand-off as a message that wakes every waiter at an exact head; the forge is the record, never the signal
description: A plan, approval, verdict or merge written only on an issue or PR wakes nobody, and a merge mailed only to its author strands everyone else waiting on it, so the lead sends each hand-off as a message to every instance the plan says waits, naming the artefact at its exact head and the ask, and runs a check as a call to a fresh reviewer rather than a standing station.
about: [workstream/coordination, workstream/messaging, workstream/oats-direction]
kind: lesson
id: ins-1c14597fb88f
tags: [coordination, handover, messaging, review, gates, trials]
timestamp: 2026-11-09
---
# Two halves of every hand-off, and the second is the one that moves work

A hand-off has a durable record and a wake. In OATS the record is the forge
(issue, PR, check, approval comment) and the wake is messaging. Across three
coordination trials the source reports the same stall whenever the wake was
left out: the next actor was correct, idle, and never moved until something
outside the design nudged it.

- **Written only on the forge.** A plan or its approval on the issue only, a
  gate's verdict as a PR comment only, a PR opened and told to a lead who
  was not the next actor. A block raised with a needs-input flag and a PR
  comment sat for two days where the human seat read only mail. The
  [overdue-handback lesson](/nodes/oats-expert/lessons/overdue-handbacks-need-a-record-check.md)
  owns the diagnostic side of this: how a record-only hand-off differs from
  an undelivered message and when to go and look.
- **Mailed only to the author.** Once developers implement, the author of a
  PR is the developer, and the expert waiting to rebase a dependent change
  or to verify and hand on is someone else. A merge notice addressed "to the
  author" woke the one participant who did not need it.
- **Handed back by label.** A gate woken by a label and handing back by a
  label lost quick relabels and once removed its own, and a trigger that
  could not respawn the gate left the kit to spawn it by hand. The time went
  to the station, not to the review.

# The rule the lead applies

Send the hand-off as a message that wakes its recipient, with the record
behind it:

1. **Name the artefact at an exact head and the ask.** Spec path, branch,
   PR and sha; what the recipient is to do with it. "Please look at the PR"
   without a head is a reading assignment, not a hand-off, and it does not
   survive a rework.
2. **Address every waiter the plan names, not the author.** Post in the
   effort's thread where the expert, developers and dispatcher read, or mail
   each waiter. "Mail the author" is wrong as soon as author and owner
   differ, which is the normal case under delegation.
3. **Run a check as a call, not a station.** Send the PR at its head to a
   fresh reviewer or gate and get the verdict back by mail; the author keeps
   ownership and merges on agreement. A standing seat in the path, woken and
   released by labels, adds a wake, a relabel and a respawn to every round.
4. **Send it again at each rework.** Opening a PR is one transition; a new
   head is another. A wake tied to opening gives the reworked PR nothing.
5. **A block is a hand-off too.** It goes by message to whoever can act,
   with the ask and a recommendation, never as a flag or a comment alone.

Do not read this as "the forge never wakes anyone": a configured and
verified trigger may supply the route, and the maintainer's
[checkpoint-wake decision](/nodes/oats-maintainer/decisions/own-home-checkpoint-wake-is-an-instance-act.md)
and the integrations expert's
[waiter-owned wake](/nodes/integrations-expert/decisions/checkpoint-wake-belongs-to-the-waiter.md)
own how a waiter gives itself a checkpoint. This lesson is about what the
sender does, so that the waiter's checkpoint is rarely needed. Sending still
does not prove consumption, carry review authority or make a relayed
approval valid; the record and the approval rules stay separate. Nor does
a call change who may merge: where the workspace's
[review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md)
makes a maintainer the PR gate, the call goes to that gate and it keeps its
authority; this lesson is about waking it by message instead of by label.

# Prevention route

The repair is instruction-level, in the composed coordination capabilities
([policy lives in capabilities](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)),
not in the kernel: every template that describes a hand-off names the
recipient of the wake, the waiter list comes from the plan, and gate text
says "mail the waiters" rather than "mail the author". A primitive that
resolves a role, mails it the artefact at a head and returns the answer
would cover the same ground; whether it touches a contract is the
maintainer's decision, not this lesson's. In a trial, count rescues of this
class separately so they are not read as a coding or design failure.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-09; notes/a-hand-over-written-only-on-the-forge-wakes-nobody.md;
notes/a-merge-told-only-to-its-author-strands-the-waiters.md;
notes/handoffs-go-to-a-role-by-message-at-a-head.md.

The source reports: trial T1 (2026-11-03, ten counted runs over four arms,
all ten rescued stalls were record-only hand-offs); trial T6 (2026-11-04,
25 counted runs on two models, all three rescues were a merge mailed only to
the author or developer while an expert waited); and the T7 v2 paired trial
(2026-11-06 to 09), where label hand-backs cost one incident effort about
3.5 hours and one feature effort about 56 minutes, the kit spawned gates by
hand eleven times, and one knowledge PR's block surfaced only when a
scheduled status probe asked. A production workspace's earlier case (a
verdict left as a PR comment until mail was added) is reported in the
overdue-handback lesson. All of this is source-reported from scratch
deployments with a scripted or mail-only human seat; T7 v2 was stopped at
slot 32 of 34 and its run records were deleted at the human's request, so
the figures survive only in the named notes. No transcript, kit or forge
record was inspected and no trial was repeated. Rescue counts are not
population failure rates. The "no deadlines on hand-offs" direction the
notes attribute to the human is project direction for the maintainer's
records, not a claim of this lesson.
