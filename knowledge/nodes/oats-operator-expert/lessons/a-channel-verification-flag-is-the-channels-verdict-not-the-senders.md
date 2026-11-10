---
type: Lesson
title: A channel's verified=false is the channel's verdict; confirm with a CLI fetch before suspecting the sender
description: The push channel and the CLI verify a message independently and can disagree; when the CLI fetch says verified and the registry mapping is consistent, the failure is channel-local state and the sender should not rotate anything.
about: [workstream/operations, workstream/messaging]
kind: lesson
id: ins-80c5bf878c1f
tags: [lesson, messaging, verification, channel, diagnostics]
timestamp: 2026-09-24
---

Learned 2026-09-24 by an operator whose push channel flagged a run of mails
from one global (did:aw) sender as unverified while mails from a team-local
(did:key) sender kept verifying. The sender's own diagnostics were clean.

What settled it in minutes, in order:

1. Fetch the same message ids with the CLI in JSON and read the
   verification status, the sender's key and stable id, and compare the
   envelope field set and the signed payload with an earlier message that
   did verify. Identical shapes plus a verified CLI status rule out the
   envelope and the signature.
2. Resolve the sender's stable id and address in the registry anonymously
   and compare the current key with the message's key. A match rules out
   rotation or an address remap.
3. Read the channel's own verification chain. A push channel typically runs
   signature, recipient binding, a registry step that applies only to
   global senders, and a trust-on-first-use pin keyed on the stable id, and
   exposes only a boolean. Team-local senders skip the registry and pin
   steps, which is why they keep verifying while a global sender fails.

If the channel does not log which step failed, the remaining candidate is
its own pinned or cached state, and the fix is on the channel side, not a
key rotation by the sender. Treat the flagged messages as status only, keep
working, and report the comparison to the sender so they stop rotating or
re-initialising on a false alarm.
