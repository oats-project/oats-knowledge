---
type: Lesson
title: Keep a secret out of a server's replies at its single reply writer, not per route
description: Excluding a secret's file by path or inode misses every route that re-emits its content, such as a Git diff of an untracked file or a copy; refuse any reply that holds the secret at the one function that writes replies, and keep the per-file exclusions as a second layer.
about: [system/oats-desktop]
kind: lesson
tags: [desktop, security, credential, secret, reply, defence-in-depth]
timestamp: 2026-11-12
---

**What happened.** The Desktop backend excluded a hand-started server's token file by `(dev, ino)` from `/api/file` and from the skill reader. A fresh reviewer then found the file's text reaching a client through `/api/instance-git`. The kernel's diff of an untracked file in an observed worktree carries its content verbatim, under an opaque file id that the server cannot map back to an inode.

**The fix that holds.** `send()` is the server's only reply writer. It now refuses, with `403 E_FORBIDDEN` and no content, any body that holds the secret, whatever route built it. That covers a diff, a copy, a hard link and any later route. The inode checks stay. The secret is base64url, which JSON never escapes, so a substring check on the serialized body is exact.

**How to apply.**
- When a server holds a secret that may also exist as a file it can read, find where its replies are written. Check whether one function writes them all; make it so if not.
- Put the exclusion there, with a test that a copy of the file under another inode is refused.
- Treat per-route exclusions as the second layer, not the guard.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-desktop-backend-auth, 2026-11-12; notes/secret-exclusion-at-the-reply-writer.md. Review round 2 of the backend change, fixed in oats-project/oats#1891.

Related: [The Desktop backend's boundary is a private socket and a per-child credential](/claims/decisions/desktop-backend-boundary-is-a-private-socket-and-a-per-child-credential.md).
