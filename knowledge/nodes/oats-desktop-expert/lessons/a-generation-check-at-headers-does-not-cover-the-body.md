---
type: Lesson
title: A generation check at response headers does not cover the body
description: A fetch-like response resolves when its headers arrive, so a server-generation lease checked there still lets a stale body through; check the lease after the last byte, abort in-flight requests on revocation, and have a caller that commits state after a later await check the lease itself, not a replacement-only counter.
about: [system/oats-desktop]
id: ins-160f357edad4
kind: lesson
tags: [desktop, lease, generation, stale-reply, backend-client, review]
timestamp: 2026-11-13
---

# The lesson

A response object built over a stream (in Node, `new Response(Readable.toWeb(res))`)
fulfils as soon as the headers arrive. A lease check made at that point
leaves the body readable after the server it came from was replaced or
exited, and the caller then commits state from a server that is gone. So the
generation check belongs **after the body**: read the reply whole (bounded),
check the lease again after its last byte, and abort every request in flight
on a lease when it is revoked.

**A counter that moves only on a planned replacement is not a generation
check.** A child that exits on its own revokes its lease and leaves such an
epoch where it was. A caller that commits main's state after a later await
(an advertised set, a connection result) must check, right before the
commit, that the lease it read under is still the current one and ready. A
caller that only returns an answer can keep the coarser check.

# How to apply

- When a client's replies are scoped to a server generation, put the check
  after the body, never at the headers.
- Find every later await followed by a commit; each needs its own check,
  against the lease.
- Test each check with a server that *exits*, not only with a planned
  replacement.

**Elimination route.** The Desktop's one backend client now buffers, checks
after the last byte and aborts on revocation, so its callers cannot get the
first half wrong. The late-commit check cannot live in the client: it stays a
reviewer's check, backed by a test with an exiting server.

# Evidence

Found by the second adversarial design review of the backend boundary change
(a primitive check of the headers-time resolution) and by review round 5 of
oats-project/oats#1891, which reproduced a late commit after a child exit
(both source-reported). OKF proposal from
oats-desktop-expert/desktop-backend-boundary-knowledge-expert, 2026-11-13;
notes/generation-check-must-cover-the-body.md.

Related: [Desktop's backend boundary is a private socket and a per-child credential](../decisions/backend-boundary-is-a-private-socket-and-a-per-child-credential.md).
