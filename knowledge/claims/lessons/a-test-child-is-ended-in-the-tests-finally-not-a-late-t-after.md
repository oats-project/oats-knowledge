---
type: Lesson
title: A child process a node:test test starts is ended in the test's own finally, never only in a t.after added after the fixture's cleanup
description: node:test runs t.after hooks in the order they were added and skips the rest when one throws; a fixture cleanup that fails while a test's child still writes in its tree then skips the hook that kills the child, and the live child hangs the CI shard.
about: [system/oats-kernel]
kind: lesson
id: ins-5f33250e6c2a
tags: [testing, node-test, ci, flaky, process-lifecycle]
timestamp: 2026-11-21
---

# What was observed (oats#2053, fixed in oats#2054)

A CI shard hung ten minutes after the last test of a file and was cancelled. Its log showed, earlier in the same file,
`not ok … hookFailed … ENOTEMPTY … rmdir`, and two node processes left at the cancel: the file's process and one
test's child. The test killed its rewriting child in a `t.after` added after the fixture's own cleanup hook. node:test
ran the fixture's cleanup first, removed the tree while the child still wrote in it, failed on a write that landed
between removing the entries and the directory, and skipped the later hook, so the child was never killed and kept
the file's process alive.

# The rule

- Kill and await a child a test starts inside the test's own `finally` (with the fixture's pre-cleanup hook as a net
  for a body abandoned before its finally), never only in a `t.after`.
- Assert the child was ended by that kill, so a child that died early is not mistaken for a clean run.
- Reading a hung shard: look for an earlier `hookFailed` in the same file, and at the orphan processes the job lists.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-21 (oats-knowledge#448);
   notes/kernel-session-provider-build-lessons.md.
2. Checked at maintainer review 2026-11-21: oats-project/oats#2053 (the hung shard) and its fix
   oats-project/oats#2054 (merged 2026-11-21), whose description quotes the job's `hookFailed` / `ENOTEMPTY` line,
   the two node processes left at the cancel, the hook order, the fix in a `finally` with `beforeCleanup` as the net,
   and the mechanism reproduced alone in a container (a first `t.after` that throws leaves the second's child alive).
