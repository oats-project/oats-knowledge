---
type: Lesson
title: A generation check at response headers does not cover the body
description: A fetch-like wrapper resolves when the headers arrive, so a lease revoked afterwards cannot stop .json() from returning a stale body; read the body whole and check the lease after the last byte, abort in-flight requests on revocation, and have any caller that commits state after a later await check the lease, not an epoch, right before committing.
about: [system/oats-desktop]
kind: lesson
tags: [desktop, lease, generation, stale-reply, backend-client]
timestamp: 2026-11-12
---

**The lesson.** `new Response(Readable.toWeb(res))` fulfils as soon as the headers arrive. A lease check made at that point leaves the body readable after a replacement, and the caller then commits state from a server that is gone. The Desktop's backend client (`packages/desktop/backend-client.mjs`) therefore:
- reads the whole reply, bounded;
- checks the lease again after the last byte;
- aborts every request in flight on a lease that is revoked.

**Refinement.** A counter that moves only on a planned replacement (the Desktop's `serverEpoch`) is not a generation check. A child that exits revokes its lease and leaves the epoch where it was. So a caller that commits main's state after a later await must check, right before the commit, that the lease it read under is still the current one and ready (`serverHost.held()`). Examples are the panel's advertised set and the forge connection's result. A caller that only returns an answer, such as the IPC proxies, can keep the epoch check.

**How to apply.**
- When a client's replies are scoped to a server generation, put the generation check after the body, not at the headers.
- Look for each later await that is followed by a commit. Each one needs its own check, against the lease rather than a coarser counter.
- Test each check with a server that exits, not only with a planned replacement.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-desktop-backend-auth, 2026-11-12; notes/lease-must-cover-the-body.md. Found by the second design review of the backend change (a primitive `Response` check) and by review round 5 of oats-project/oats#1891, which reproduced a late commit after a child exit.

Related: [The Desktop backend's boundary is a private socket and a per-child credential](/claims/decisions/desktop-backend-boundary-is-a-private-socket-and-a-per-child-credential.md).
