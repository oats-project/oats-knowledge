---
type: Lesson
title: A grant is proven per path at the receiver — custody attachment is necessary, not sufficient, and scopes do not name the endpoints a path calls
description: A session grant signs and decrypts only when its record carries the custody locator, so custody readiness is not grant readiness; and a grant holding every offered scope can still be refused on a path whose client makes a call no scope names; rehearse each operation per path and direction, read the receiver's verification, and trace a refusal to its request.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-df8db34215a1
tags: [lesson, integrations, messaging, grants, custody, scopes, e2ee, rehearsal]
timestamp: 2026-09-24
---

Learned 2026-09-24/25 by the integrations maintainer during the hosted
rehearsals of resident-identity session grants, corrected each time against
the service's released source.

# What happened

**Attachment.** Custody readiness reported the service running, both keys
ready and every operation advertised; a grant was minted, a mail sent through
it was delivered, a reply was received, and retire revoked the grant. Yet the
receiver reported the mail unverified, and reading the inbox through the grant
warned that decryption was unavailable. The grant record has a custody block
(socket path, service id, version) from which the client installs its signer
and reaches the custody service for decryption, and the mint of that time
wrote none of it. The service then gave its mint an explicit custody-socket
option, so the CLI owns both the schema and the writer; the integration passes
the socket its preflight verified and proves attachment after the mint
(mechanics in
[how oats.aweb attaches a grant home to custody](/nodes/oats-aweb-expert/references/how-a-grant-home-is-attached-to-custody.md)).

**Scope.** On an attached grant carrying every scope the mint offers,
plaintext mail was delivered and verified, encrypted chat worked both ways,
and an encrypted mail reply was refused "outside grant scope". The refusal
came from a conversations listing the encrypted mail path performs first to
resolve the reply; the plaintext path never makes that call and no scope in
the vocabulary names it.

# Rule

- **Custody readiness is not grant readiness.** A grant home without its
  custody locator is a delivery-only identity; the integration never calls it
  ready, and a failed attachment proof revokes the grant and fails the spawn.
- **A scope list is not a capability list.** Rehearse every operation an
  instance will perform through the grant, per path (plain, encrypted) and per
  direction (send, receive), and label the evidence that way.
- **Acceptance evidence is the receiver's verification**, not delivery.
  "Delivered" proves routing only
  ([a failing diagnostic is not a missing fact](/nodes/integrations-expert/lessons/a-failing-readiness-diagnostic-is-not-a-missing-fact.md)
  says where to read verification).
- **Trace a refusal to the exact request** before concluding anything about
  the grant, and report the endpoint and request id to the service owner, who
  decides whether the scope rule or the client path is wrong.
- **Never widen scopes or fall back to plaintext** to get past a refusal in a
  rehearsal: a widened grant hides the defect, and a plaintext fallback
  reports an encrypted path as working when it is not.

# Why

The grant model keeps the resident's root keys on the custody host and gives
the instance a short-lived, scoped grant
([resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)).
Everything signed or decrypted as the resident goes back to the custody
service, and the grant home is the only place the instance learns where it
is; a gap on that edge is invisible from the sender's side and from readiness.
The scopes are what the human consented to; the endpoints a client path
touches are an implementation detail that changes between paths and releases.
Only per-path evidence at the receiver shows whether the consented operations
work.

# Consequences

- The provider's readiness answer reports a grant whose home lacks the
  custody locator as a `custody` problem with the respawn remedy
  ([the kernel's provider readiness check wire](/nodes/integrations-expert/references/the-kernels-provider-readiness-check-wire.md)).
- A rehearsal evidence plan lists each path and direction as its own line
  item, with the request that proved or refused it.
