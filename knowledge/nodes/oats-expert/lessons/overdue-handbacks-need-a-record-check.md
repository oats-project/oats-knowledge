---
type: Lesson
title: An overdue handback needs a record check, not indefinite mail waiting
description: Give delegated steps expected checkpoints and distinguish a recorded result from notification of its next actor, because overdue work can hide either a missing handoff wake or an undelivered one.
tags: [coordination, delegation, review, handover]
timestamp: 2026-11-03
---
# A chain of mail waits has no inherent checkpoint

A lead can wait for a developer's handback while the developer waits for a
reviewer. Neither receives a new result that prompts a look at the chain.
Silence alone cannot distinguish work still progressing, a blocker, a
missed handoff or a child with nothing else assigned. In the reported case,
the human noticed the delay before the lead did.

When delegating a step, record when its next result is expected. If that
checkpoint passes, inspect the records you are authorized to read before
asking for status: the branch head and its time, review artifacts, explicit
work-state or log entries, and lifecycle status. Use those observations to
find the unresolved dependency; when the child is waiting on mail you sent,
one such dependency is
[an undelivered wake](/nodes/oats-desktop-expert/lessons/idle-child-may-be-an-undelivered-wake.md),
which that lesson owns. Then unblock it within your authority, ask
one precise question whose answer changes the next action, or assign a
ready independent piece when the child's availability is established.

The overdue checkpoint is a reason to inspect, not proof of failure or
permission to interrupt a working reviewer. A stale commit, terminal silence
or a running process does not establish idleness; preserve the distinction
in [producer-reported activity](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md).
Do not infer completion, bypass review, or mark unknown activity idle.
Nor does this lesson grant access to another instance's private records or
transcript: use only the shared or otherwise authorized evidence available
to the lead. It is not a polling loop or a demand for progress messages.

# A record check can find a wake that was never sent

A later source report, from ten counted coordination-trial runs across four
arms on 2026-11-02/03, attributes ten rescued stalls to completed steps that
were recorded without notifying the person or agent who needed to act next:
plans or approvals on an issue only, a gate verdict on a PR only, or a PR
reported to the lead rather than its next reviewer. This differs from the
Desktop lesson above: an undelivered message has a delivery problem; a
record-only handoff may have no message to deliver.

For a handoff that requires another actor to continue, name both the durable
record and the notification route to that actor. In the trial's messaging-led
workflow, the proposed repair is a mail pointing to the exact issue, PR or
reviewed head. Opening the PR, posting a verdict or telling a non-acting lead
was not sufficient. Rework is another transition: an opening-only trigger
does not establish a re-review wake after a revision.

Do not generalize this to "a forge never wakes anyone": a configured,
verified trigger may supply the route. Check the actual transition and
recipient rather than assume either automatic delivery or a need for
redundant mail. Sending a notification still does not prove consumption,
transfer review authority or make a relayed approval valid; the authoritative
record and existing approval rules remain separate. This is a result or
blocking handoff to the next actor, not a periodic progress report or a new
human-notification duty.

# Prevention and the existing communication rule

The existing `oats-token-saving` skill already says to read a shared record
instead of asking for progress. The additional lesson is **when to look**:
a result-only handoff needs an expected checkpoint so nested waiting does
not become invisible. Keep result and blocking-question messages; do not
replace them with periodic status reports.

Put checkpoint ownership and overdue-step handling into the existing lead
delegation guidance for separate review. Where the task system can expose
owned dependencies and overdue checkpoints, prefer that visibility to
repeated manual inspection. This is coordination debt, not a reason to add
a second activity detector or a new kernel lifecycle policy. No scheduler,
notification mechanism or skill change is claimed implemented here.

For the missing-wake case, prefer a handoff mechanism that records the
transition and reliably notifies its designated next actor. Test opening,
verdict and rework transitions, including a recipient different from the
lead. The sender's side of that rule, including why the recipient is every
waiter rather than the author, is in
[sending a hand-off by message to every waiter](/nodes/oats-expert/lessons/send-a-hand-off-by-message-to-every-waiter-at-an-exact-head.md).
Where handoffs remain manual, the owning capability's template should
name the record, recipient and notification responsibility for separate
review. Keep this policy in
[composed coordination capabilities](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md),
not in neutral kernel or core instructions. Neither the mechanism nor those
checks is delivered by this lesson.

# Evidence and limits

Evidence: OKF proposal from oats-expert/app-owned-reader-expert,
2026-10-29; notes/check-children-instead-of-waiting-for-mail.md.

The source reports a second review round left uninspected for roughly an
hour and a half until the human asked. Inspection found the reviewer still
working, and an approval arrived shortly afterward. Thus the evidence is a
lead's visibility and scheduling miss, **not a demonstrated stuck reviewer**
or a measured review-time saving. The source subsequently separated
measurement from the code handback and started another ready piece; these
are examples of parallelizing work, not permission to skip verification or
a universal rule for stacking branches. Exact clock times and temporary PR
letters are not needed to preserve the lesson. No other instance's records
were read to verify the account during this harvest.

Evidence for the missing-wake refinement: OKF proposal from
oats-expert/oats-expert-coordination-rethink, 2026-11-03;
notes/a-hand-over-written-only-on-the-forge-wakes-nobody.md.

The trial account is source-reported: real OATS instances with a local forge
and messaging in scratch deployments, a single model generation and a scripted
human. The source also reports a production-workspace confirmation: five PRs
waited on a verdict left only as a comment until mail was added. Neither that
correspondence nor the trial records were inspected here; only the captured
proposal and named note were read. Ten rescued stalls are not a population
failure rate, proof of unassisted completion or evidence that every idle
agent lacks a wake. The earlier progressing-reviewer case remains unchanged.
