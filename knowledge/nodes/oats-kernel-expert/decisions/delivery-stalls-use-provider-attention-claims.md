---
type: Decision
title: Delivery stalls use the messaging provider's attention claim
description: Delivery failures reach the roster through a provider-owned attention claim because live network reads do not belong on the status hot path and liveness does not establish idleness.
about: [system/oats-kernel, workstream/messaging]
id: dec-224d5ab3ec78
tags: [kernel, messaging, attention, ownership, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and rationale

The onboarding investigation selected an `oats.aweb` observer to report
stalled mail delivery through its own `attention` claim. Reuse the existing
roster and Desktop needs-input presentation instead of adding live delivery
fields to kernel status rows. The producer owns clearing the claim when its
condition ends, including retirement or unregistration. Its text contains
only a line of counts and fixed error classes, never sender content.

The source reports acceptance by oats-expert-juan for the product lane on
2026-10-30, through mail 4dbfa438. This is **source-reported agent direction**,
not independently verified human acceptance or released behavior.

# Rejected alternatives

- **Read live facts through the messaging slot on every status call.** A
  spawn-recorded value such as human attribution does not have the cost of
  an unread count. Live delivery facts would require a provider command and
  potentially a network read per identity on the Desktop's hot roster path.
- **Have the kernel compute idle-with-unread.** Harness process activity is
  not turn-level idleness. The proposal reports that the host wake broker
  treats inspect's `state: unknown` as deliverable; that fallback does not
  establish an idle prompt. Keep the separate
  [producer-reported activity direction](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)
  intact rather than manufacturing idleness from a weaker observation.
- **Put claim ownership in the aw broker.** The source reports that the
  broker declined this responsibility. The OATS messaging provider owns
  the home-scoped claim and its cleanup, consistent with the
  [kernel/messaging boundary](messaging-capability-owns-provider-behaviour.md).

# Input boundary and accepted limit

The observer's attention claim is a report, never permission to type.
Any automated delivery path must apply the existing
[all-live-claims withholding rule](waiting-claims-may-only-withhold-automated-input.md),
including its restriction that attention never labels a screen Enter can
answer. Inspect's `waitingOnYou` is a display summary: using it as a retry
gate can hide a permission claim beneath attention text or make the
observer's own claim block its retries. This applies the earlier rule to
the provider's delivery boundary; it does not certify that the broker
already implements it or that missing claims make input safe.

The source explicitly accepts that the observer described does not cover
native-channel homes absent from the broker's wake inventory. Keep that
coverage gap visible; neither the claim nor its absence proves that all
unread mail will be delivered.

Enforce producer cleanup and bounded text in the observer, and exercise
competing permission and attention claims at the automated input boundary.
These are prevention routes, not tests performed by this harvest.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/onboarding-kernel-expert, 2026-10-30; notes/idle-unread-as-a-producer-claim.md.

Broker behavior, accepted conditions and the coverage gap are source-reported.
The proposal names awebai/oats-aweb#168 as an implementation awaiting review.
No runtime reproduction, completed review or shipment is certified here.
