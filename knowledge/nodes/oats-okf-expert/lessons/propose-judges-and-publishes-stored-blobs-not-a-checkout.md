---
type: Lesson
title: propose prepares, judges and publishes one tree of stored blobs, never a checkout
description: `propose --check` prepares (about:, regenerated indexes), judges (write surface, verdict lanes, validation) and publishes one tree of stored blobs; the accepted side is read from accepted blobs (full listing, whole reads, unreadable is an error, never "absent"); the clone's checkout is only the proposer's view — prepared files go back through Git's checkout and `--apply` stages the checked tree itself — because Git `ident`, `working-tree-encoding` and clean filters otherwise turn a valid proposal into E_SCOPE, E_GIT or E_DIGEST, the last consuming the only publication attempt.
about: [system/oats-okf]
kind: lesson
id: ins-0a72d001a3d4
tags: [lesson, okf, propose, git, filters, stored-bytes, digest]
timestamp: 2026-11-11
---

# What this adds to the general rule

Rule 4 of [a local publish command binds what it publishes to immutable objects](/nodes/oats-okf-expert/lessons/a-local-publish-command-binds-what-it-publishes-to-immutable-objects.md)
is the general rule: the validator and the screen read stored bytes, never a checkout. The 6.0 subject layout added
steps that write into the proposal (`about:` and the regenerated indexes) and steps that judge both the accepted and
the proposed side (the write surface and the verdict lanes). This lesson is how those steps keep the rule.

# Checkout bytes are not committed bytes

A clone's working tree passes through Git's filters: `ident` expands `$Id$`, `working-tree-encoding` re-encodes
(UTF-16), clean filters rewrite on the way in. A tool that judges or hashes the checkout judges bytes Git will not
commit, so the second `--check` disagrees with the first, the write surface sees a change the proposer never made, or
the digest fails at `--apply` and consumes the one publication attempt.

# The rule

`propose` prepares, judges and publishes one tree of stored blobs. The accepted side is read from accepted blobs
(full listing, whole reads; an unreadable blob is an error, never "absent"). Prepared files are written back through
Git's checkout so the proposer sees them, and `--apply` stages the checked tree itself rather than re-reading the
working tree.

# Why it stays a lesson

The suite holds `propose` to this. A new command that judges, hashes or publishes a base clone must read the stored
blobs the same way, or it repeats the trap.

# Evidence

- oats-okf #132 (merged 11 November 2026, released in 6.0.0): its body and the release-lane sign-off state that the
  write surface and verdict lanes judge stored bytes on both sides, and that `--apply` stages the checked tree.
  Source-reported (the proposer's backing note): review rounds 21-23, and the report that a UTF-16 checkout broke the
  second check before the fix.
- Maintainer check at acceptance (11 November 2026), in the oats.okf 6.0.2 source: `acceptedReader` in
  `lib/propose.mjs` lists the accepted tree with `git ls-tree` and treats an unreadable entry as `E_GIT`. The publish
  directory is the one-attempt marker, and the `E_DIGEST` refusals at `--apply` come after it.
  `test/okf6-subjects-propose.test.mjs` checks twice and then applies proposals under `ident`,
  `working-tree-encoding=UTF-16LE` and a byte-changing clean filter.
