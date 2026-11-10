---
type: Conclusion
title: An optional waiting-claim reference would convey no authority
description: The source proposes an opaque capability-and-id reference as a claim-to-request join key, with no kernel dereference or mandatory permission reference because a claim cannot establish consent.
about: [system/oats-kernel, workstream/messaging]
kind: finding
id: ins-f658b0831be8
tags: [kernel, claims, messaging, authority, rejected-alternatives]
timestamp: 2026-11-03
---
# Position and status

The 2026-11-03 kernel investigation proposes an optional `ref {capability, id}`
on a waiting claim. The kernel would shape-check, store, return and relay the
reference, **never dereference it**. This is a source-reported product-lane
position submitted for human review, not an accepted field or released API.
Adoption would change the kernel contract.

The rationale is to give a client an explicit join key between an instance
claim and a messaging request without giving the kernel ownership of the
request. The named capability resolves its opaque identifier. Structural
validity would establish neither that the target exists nor that anyone has
authorized the requested action.

# Why optional includes permission

A harness permission dialog can exist without any messaging request. Making
a reference mandatory for `permission` would confuse that dialog observation
with an approval card and could suppress a legitimate report merely because
there was no message to link.

The existing [withholding decision](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md)
remains unchanged: a claim can delay automated input, never authorize it.
The proposed reference must not change the reason semantics, claim selection
or clearing lifetime, and an unusable reference must not erase the underlying
claim. Consent cannot be established by the claim, its text or the reference's
presence. This conclusion does not define a new human-consent protocol.

A coordination capability could require its own agent to attach a reference
when reporting a sent request card. That would be the process's rule, not a
universal kernel admission requirement for every claim producer. The
[client-queue position](attention-ranking-is-not-a-kernel-queue.md) explains
why the join is useful without turning the kernel into the inbox.

# Rejected alternatives

- **Extract a link from display text.** A bounded human-readable message is
  not a structured foreign key; parsing it would couple navigation to prose.
- **Store an arbitrary URL instead.** That puts unchecked navigation and
  viewer choice into the kernel instead of naming the capability that owns
  resolution.
- **Validate against the messaging service in the kernel.** That introduces
  foreign fact checks and network reads into a local reporting boundary.
- **Require a reference on permission, or add an approval reason.** Both
  conflate a reported harness dialog with the messaging request's own type
  and authority. The [runtime/messaging ownership split](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
  remains intact.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-d6-kernel-questions, 2026-11-03; notes/claim-message-reference-is-opaque-and-optional.md.

The source attributes the question to a needs-input relay during the D6
investigation and reports reading awebai/oats `8f2e28d59`. Neither the relay
nor implementation was independently inspected here; no code was built or
run. Exact identifier limits, reader normalization and change detection are
draft contract details, not a wire specification certified by this concept.
No human acceptance is recorded and no accepted decision is superseded. A
later accepted contract should explicitly revise or supersede this position.
