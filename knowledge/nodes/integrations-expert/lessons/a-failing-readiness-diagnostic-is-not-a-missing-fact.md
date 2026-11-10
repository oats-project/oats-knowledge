---
type: Lesson
title: A client view that contradicts the source of truth is a client defect, not a missing fact — read the authoritative source, cite the message-level read, never rewrite a live identity
description: When a client's health check contradicts a command's own success receipt, or a listing disagrees with the single-message read, report the discrepancy and read the authoritative source (the registry route, the message envelope) before treating anything as missing; never rotate, re-publish or re-mint a live identity to satisfy a view that may itself be broken, and let only the receiver's verdict accept a signed send.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-3eef01fb47c8
tags: [lesson, integrations, messaging, e2ee, diagnostics, registry, verification, rehearsal]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations maintainer in two legs of a hosted
rehearsal of resident-identity session grants.

# What happened

**A health check.** A publication command reported a resident's
encryption-key assertion published, key unchanged. The CLI's online health
check then reported that the registry held no such assertion, on the
published binary and on the candidate alike. Reading the registry's public
route directly returned the assertion: same key id, same public key, the
publish recorded. One client path built its resolution without the field the
wire carried. Nothing was missing.

**A listing.** Through a grant home attached to custody, the conversation
listing showed a new custody-signed message as an identity mismatch; the
single-message read of the same message showed a verified signature, with the
envelope naming the resident's custody signing key as sender and the
resident's stable id. One client, one message, two verdicts.

# Rule

- **A diagnostic or view that contradicts a success receipt is a discrepancy
  to report, not an instruction to repeat the command.** Stop, leave the
  identity untouched, and read the authoritative source directly.
- **Never rotate, re-publish, re-mint or re-send on a live identity to satisfy
  a failing view.** The view may be the broken party; rotation cannot be
  undone, and repeated writes create noise the next reader must explain. A
  command that writes to a live identity runs at most once per authorization
  and reports its receipt with the direct read-back.
- **Cite verification from the single-message read**, with the envelope's
  sender key and stable id, never from a listing. A listing is navigation.
- **The sender-side read is evidence about the envelope, not acceptance.**
  Acceptance of a custody-signed send is the receiver's verification status of
  that message id, reported by the receiver.
- **A direct read proves readiness, not function.** The send, receive and
  unwrap through the real path remain the proof
  ([a grant is proven per path at the receiver](/nodes/integrations-expert/lessons/a-grant-home-needs-a-custody-reference-for-encrypted-receive.md)).
- When two views disagree, report both verbatim with the message id or the
  exact request and response to the client's owner.

# Why

Health checks, resolvers and listings consume the same wire as the feature but
are separate code and drift separately. The cost of believing a broken view
is asymmetric: a false "missing" invites a destructive fix, while a false
"present" is caught by the functional test that follows anyway. The operator
node records the same shape for push channels
([a channel's verified flag is the channel's verdict, not the sender's](/nodes/oats-operator-expert/lessons/a-channel-verification-flag-is-the-channels-verdict-not-the-senders.md)).

# Consequences

- Rehearsal runbooks name the authoritative read for each readiness fact
  beside the CLI check, so a disagreement between the two is a finding about
  the client, routed to its owner.
