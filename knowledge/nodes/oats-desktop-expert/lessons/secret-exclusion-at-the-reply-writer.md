---
type: Lesson
title: Keep a secret out of a server's replies at its single reply writer
description: Excluding a secret's file by path or inode misses every route that re-emits its content, such as a Git diff of an untracked file or a copy; refuse any reply holding the secret at the one function that writes replies, and keep per-file exclusions as a second layer.
about: [system/oats-desktop]
id: ins-32d19fa73e49
kind: lesson
tags: [desktop, security, credential, secret, reply, defence-in-depth, review]
timestamp: 2026-11-13
---

# What happened

The Desktop backend excluded a hand-started server's token file, by device
and inode, from its file route and its skill reader. A fresh reviewer then
found the file's text reaching a client through the instance Git route: the
kernel's diff of an untracked file in an observed worktree carries its
content verbatim, under an opaque file id the server cannot map back to an
inode. A copy or a later route would leak the same way.

# The fix that holds

The server's one reply writer refuses (403, no content) any reply that holds
the secret, whatever route built it. That covers a diff, a copy, a hard link
and every later route. The inode checks stay as a second layer. Because the
secret is base64url, which JSON never escapes, a substring check on the
serialized body is exact; a secret alphabet that JSON escapes would need the
check on both forms.

# How to apply

- When a server holds a secret that may also exist as a file it can read,
  find where its replies are written. If one function does not write them
  all, make it so.
- Put the exclusion there, with a test that a copy of the file under another
  inode is refused.
- Treat per-route exclusions as the second layer, never the guard.

**Elimination route.** For the Desktop backend this is code now: the single
reply writer and its copy test. The lesson stands for the next server that
holds a secret, and for any reply path added beside the writer.

# Evidence

Found by review round 2 of the backend boundary change and fixed before
oats-project/oats#1891 merged (source-reported). OKF proposal from
oats-desktop-expert/desktop-backend-boundary-knowledge-expert, 2026-11-13;
notes/secret-exclusion-at-the-reply-writer.md.

Related: [Desktop's backend boundary is a private socket and a per-child credential](../decisions/backend-boundary-is-a-private-socket-and-a-per-child-credential.md).
