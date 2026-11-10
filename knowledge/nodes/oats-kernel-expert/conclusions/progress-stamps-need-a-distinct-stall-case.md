---
type: Conclusion
title: Require a distinct stall case before adding a progress stamp
description: The source's provisional position defers a new progress record because missing handoff notifications call for waiter checkpoints, while neither reported activity nor elapsed silence justifies a kernel stalled verdict.
about: [system/oats-kernel]
kind: finding
id: ins-64e172e81d4f
tags: [kernel, coordination, activity, supervision, rejected-alternatives]
timestamp: 2026-11-03
---
# Position and status

The 2026-11-03 kernel investigation recommends **not adding a last-progress
stamp yet**. This is a source-reported product-lane conclusion submitted for
human review, not an accepted contract or an implemented detector. It keeps
progress distinct from process liveness, reported activity and waiting claims.

The source characterizes the coordination trial's observed stall class as a
handoff recorded without waking its next actor. A waiter-owned checkpoint can
bring that missing transition to attention even when activity is unknown;
a new inferred progress signal is not required to justify the record check.
The generalist's [overdue-handback lesson](/nodes/oats-expert/lessons/overdue-handbacks-need-a-record-check.md)
already owns the missing-notification finding and coordination response. This
concept adds only the kernel expert's reason to defer another record.

# Separate observation from the supervision verdict

The proposed supervision approach reads reported activity, waiting claims and
lifecycle times. It applies the existing [producer-reported activity direction](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md):
unknown stays unknown, and a working report does not prove useful outward
progress. The source rejects a kernel "stalled" verdict because the threshold
and response depend on the coordinating process.

The investigation rejected scanning file times, Git, mail or forge activity on
the status path. Besides the hot-read cost, these observations would mix
ownership boundaries and turn silence into an inferred conclusion. The
[forge boundary](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md)
and [provider-owned delivery reporting](/nodes/oats-kernel-expert/decisions/delivery-stalls-use-provider-attention-claims.md)
remain canonical, rather than being replaced with a kernel observer.

# What would justify revisiting the deferral?

A working agent with no outward progress is a different case from a completed
handoff with no notification. The source had not observed that distinct class
in this investigation. Its provisional fallback, if evidence warrants it,
is a producer-reported progress record through a kernel writer in the
waiting-claim family, not kernel inference from external systems. That would
require a separately agreed contract; the draft field layout is not a current
API or permission to build it.

Deferral is not a claim that the existing mechanisms solve every stall. The
[waiter-owned checkpoint rationale](/nodes/integrations-expert/decisions/checkpoint-wake-belongs-to-the-waiter.md)
retains missed-time, consumption and cleanup limits. A checkpoint is neither
a diagnosis nor authority to interrupt or replace a worker. The
[waiting-claim hold](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md)
can delay a wake indefinitely; this position does not waive its coverage and
input-safety requirements.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-d6-kernel-questions, 2026-11-03; notes/no-progress-uses-checkpoint-and-reported-activity.md.

The trial classification is source-reported, not a harvest reproduction or a
population claim. At the proposal checkpoint the source reported the activity
contract unbuilt in awebai/oats `8f2e28d59`; the approach above does not assume
it was already available. No detector, delivery guarantee or universal stall
remedy was tested. No human acceptance is recorded and no accepted decision
is superseded; later evidence or direction should explicitly revise this
provisional deferral.
