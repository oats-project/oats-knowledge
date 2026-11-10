---
type: Conclusion
title: Keep attention ranking out of the kernel's claim record
description: The source's provisional position places request deadlines with messaging and ranking in a client view, because a person's request queue extends beyond instances on their kernel hosts and a claim is only a local report.
about: [system/oats-kernel, workstream/messaging]
kind: finding
id: ins-f364414c99ae
tags: [kernel, attention, messaging, clients, rejected-alternatives]
timestamp: 2026-11-03
---
# Position and status

The 2026-11-03 kernel investigation recommends a client view over typed
messaging requests and kernel waiting claims, rather than a kernel attention
queue. This is a **source-reported product-lane position submitted for human
review**, not accepted Desktop direction or an implemented messaging API.

A person's actionable requests can come from agents that have no instance
row on that person's hosts. A kernel roster therefore cannot be the complete
request set. The proposal keeps a request's deadline in the messaging layer's
typed request and leaves ranking to its client, while kernel claims supply
their own reported instance facts.

# Rejected alternatives and rationale

- **A kernel attention-queue verb.** A complete queue would need foreign
  messaging facts, and ranking expresses coordination policy rather than an
  execution fact. Putting the read on kernel status would also import the
  live-provider cost rejected by the [delivery-stall decision](/nodes/oats-kernel-expert/decisions/delivery-stalls-use-provider-attention-claims.md).
- **A deadline on every waiting claim.** It would duplicate the typed
  request's deadline in a bounded display hint and still fail to represent
  requests without a local instance. A claim's age is not a second request
  deadline or evidence of urgency.
- **Desktop parsing mail itself.** The client should consume a
  capability-owned read through its OATS command surface, not implement a
  second messaging parser. This applies the existing [runtime/messaging/viewer split](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
  and [Desktop JSON boundary](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md#the-kernels-json-is-the-desktops-model-2026-09-24),
  not an exception allowing clients to inspect provider storage.

The [optional opaque-reference position](waiting-claim-references-convey-no-authority.md)
is a possible join between a claim and a request, not the queue's source of
truth. A missing reference cannot make an otherwise valid claim disappear,
and a joined record does not acquire consent or prove that a request was read.

# Scope and evidence

This conclusion owns the kernel expert's reasons to reject queue and deadline
ownership. Actual queue presentation, ranking policy, typed-request semantics
and adoption remain their owners' decisions. No UI, provider contract or
unowned knowledge node is changed by recording this position. It supersedes
no accepted decision.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-d6-kernel-questions, 2026-11-03; notes/attention-queue-is-a-client-view.md.

The source reports reading the waiting-claim and roster surfaces at
awebai/oats `8f2e28d59`. This harvest did not inspect that implementation or
test an inbox, multi-host join or ranking scheme. The conclusion preserves
reasoning and rejected alternatives, not a claim that the proposed read or
client already exists. A later accepted design should explicitly revise or
supersede it.
