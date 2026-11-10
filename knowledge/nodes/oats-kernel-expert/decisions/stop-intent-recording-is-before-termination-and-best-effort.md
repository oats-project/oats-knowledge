---
type: Decision
title: Stop intent is recorded before termination, but recording is best effort
description: Every intentional kernel stop attempts to record the ended start before termination, but a failed write must not block retirement, accepting a documented double-failure recovery ambiguity.
about: [system/oats-kernel]
id: dec-5458031c99c1
tags: [kernel, lifecycle, stop, retire, recovery, failure-tradeoff]
timestamp: 2026-10-28
---
# Decision and rationale

Every kernel path that intentionally ends a harness, including retirement's
own window termination and restart's stop, attempts to record the stop and the start it ends
**before** ending the session. This implements the distinction already owned
by the [lost-session recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md):
lifecycle evidence distinguishes stopped on purpose from lost; it is not a
second intent field or a new recovery policy.

The ordering matters because a sweep can observe the gap after termination
and before retirement finishes. The source reports that retirement's bare
window termination omitted the record and left homes looking lost. A record
written only by the ordinary Stop command cannot represent every intentional
kernel stop. New termination paths must participate in the same recording
rule, rather than leave an automatic starter to infer intent from absence.

**The write is best effort, not a new gate on the stop or retirement.** A full
disk is precisely when an operator may need to retire work to free space.
Refusing to end the session because its safety record cannot be written
would turn that record into a new cause of an unretirable home. Best effort
requires attempting the write; it is not permission to omit a path.

# Deliberate residual and rejected alternatives

The [whole-run lifecycle claim](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md#refinement-automatic-resume-joins-the-whole-run-claim)
excludes automatic resume while retirement is running. It cannot make the
stop record durable if the write failed. If **both the record write and the
retirement fail**, a retained home can still read lost and may be resumed if
otherwise eligible. The source records this as a documented exception, not
a closed failure mode.

Two alternatives were rejected: refuse retirement before killing the window
when the record cannot be written, or keep documentation claiming that an
intentional stop can never appear lost. The first sacrifices the needed
operator act; the second conceals the accepted limit. Recording first and
recording successfully are different guarantees.

This tradeoff is narrow. It does not weaken lifecycle exclusion, authorize
recovery of an ineligible home, or bypass the independent work-preservation
and cleanup gates in [preserve recovery authority](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).
The original 2026-10-27 proposal left failed-relaunch classification outside
its repair; the following refinement addresses that separate omission without
turning best-effort recording into a durability guarantee.

# Refinement: restart records intent before its stop

The 2026-10-28 proposal explicitly includes `oats session restart` in the same
record-before-termination rule. Restart intentionally replaces a launch; an
interrupted or failed relaunch must not make that deliberately ended launch
look like a loss for an automatic sweep to recover. When the stop record is
written successfully, the ended launch reads stopped rather than lost even
if the replacement never starts.

The source reports that the product-lane maintainer chose **before** over
the expert's initial **after the harness exits** proposal, citing this
accepted decision. Recording after exit leaves a crash window between the
kill and the record. Use the same ordinary stop writer, best effort, rather
than inventing a second restart-intent mechanism.

The accepted cost runs in the other direction: if the record is written but
restart's stop is refused, keep that record while the harness remains live.
A later death of that harness then reads stopped rather than lost. This is
the chosen tradeoff, not a reason to move recording after exit. A restart of
a non-running home ends no harness and records no stop. A failed record write
still has the best-effort limitation above; this refinement does not promise
that every failed restart can never appear lost or expand recovery eligibility.

# Related compatibility tradeoff

[Retire's lineage repair falls back on any atomic-write failure](/nodes/oats-kernel-expert/decisions/retire-lineage-repair-falls-back-on-any-atomic-write-failure.md)
applies the no-new-bookkeeping-obstacle rationale to reader protection, but
keeps a different failure boundary: it tries the legacy in-place write and
propagates that write's failure. It does not generalize this stop-intent
record's best-effort allowance to every retirement write.

# Enforcement and evidence limits

The enforcement route belongs in the kernel's termination paths and
regression tests, not in a permanent reviewer checklist alone. Account for
every path that ends a harness, assert the record is attempted before
termination, exercise a record-write failure without blocking the act, and
keep the write-plus-retirement failure visible as the documented residual.
For restart, regress the ordering, interrupted/failed relaunch, refused-stop
record retention and non-running-home case. The current path inventory belongs
in code and tests, not this concept.

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert, 2026-10-27; notes/decision-retire-stop-record-is-best-effort.md; notes/decision-resume-takes-the-lifecycle-claim.md.

The proposal identifies [awebai/oats#1599](https://github.com/awebai/oats/pull/1599)
as the repair; the stop-record note reports reviewer agreement on the
residual. This harvest read the captured proposal and notes, not the private
correspondence or implementation. Agreement, repair and test results remain
source-reported; no human acceptance, completed all-path audit, test rerun or
release is certified here.

At maintainer review on 2026-10-27, awebai/oats#1599 was open, not merged.
Its description states the single stop writer used by stop, idle stop and
retire, the retire's write before termination, and the full-disk
double-failure exception. Until it merges and ships, this is the chosen
direction, not released behaviour.

Evidence: OKF proposal from oats-kernel-expert/session-lifecycle-followups-kernel-expert, 2026-10-28; notes/1601-restart-records-before-termination.md.

The restart refinement names [awebai/oats#1601](https://github.com/awebai/oats/issues/1601)
and [awebai/oats#1627](https://github.com/awebai/oats/pull/1627). The source reports
maintainer direction, an implementation and revert-sensitive tests with green
CI; #1627 was open, not merged, at its checkpoint. This is chosen direction,
not a shipment receipt or an independently audited test result. Maintainer-instance
direction is not inferred human acceptance.
