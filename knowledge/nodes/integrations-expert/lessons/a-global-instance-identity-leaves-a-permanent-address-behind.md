---
type: Lesson
title: A global instance identity's address is released only by the authority that owns its lifecycle, so per-spawn global identities need that retire path settled first
description: On the messaging service a global identity can hold several team memberships and retire can revoke them all, but releasing its address is a separate lifecycle act with its own authority (a namespace controller key on a customer-controlled namespace; on the hosted service an owner's archive or the member's own deprovision with address deletion, under a human session or the member's own key), and enrolling an existing global identity into a further hosted team needs a human owner session; settle which of those a provider's retire and join can actually call before defaulting instances to global.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-30669e92e959
tags: [messaging, identity, teams, retire, registry]
timestamp: 2026-09-25
---

**Observed.** Designing multi-team membership for instances: a team-scoped
(local) identity is one team by construction, since joining refuses an
occupied identity directory; hosted teams refuse member-global invites, so an
existing global identity joins a further hosted team only through a human
owner or admin session endpoint followed by the member's own certificate
fetch. Retirement, on the published client, revokes every membership through
the team-authorized removal path. Releasing the address is separate: on a
customer-controlled namespace the namespace controller's key deletes it
(`aw id namespace delete-address`, certificates revoked first); on the hosted
service the owner's archive endpoint or the member's own deprovision with
address deletion does, under a human session or the member's own key. None
of these is a generic team-removal verb, and none was shown callable from a
session grant. The did:aw history stays append-only in every case. A first
reading of the CLI's flag names had concluded "no release exists"; the
service's owners corrected it from source.

**Rules.**
- Before defaulting a provider to global identities per spawn, know which
  authority releases the address and joins a further team, and whether the
  provider's retire and join hooks hold it; read the service's source or ask
  its owner, never infer from a flag's name, in either direction.
- Verify a credential's team selection separately from an identity's
  memberships: an identity may belong to several teams while its session
  credential names one.
- The kernel contract for teams does not depend on the answer: the
  explicit join/leave verbs and the per-label payload work with either
  identity model; only the provider's default scope does.
