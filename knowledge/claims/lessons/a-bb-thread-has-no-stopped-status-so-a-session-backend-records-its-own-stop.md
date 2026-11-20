---
type: Lesson
title: A bb thread has no "stopped" status, so a session backend over bb records its own stop
description: bb's thread statuses are pending, idle, starting, active, stopping and error; a settled stop reads idle and any tell restarts the thread, so a kernel that runs agents as bb threads must record its own stop and refuse input to a home it stopped, or a mail silently restarts a stopped agent.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-f5e5457e0cbf
tags: [bb, session-backend, lifecycle, stop, wake]
timestamp: 2026-11-19
---

# What holds

In bb (get-bb/bb), a thread's status is one of `pending`, `idle`, `starting`, `active`,
`stopping`, `error`. A stop settles to `idle`, the same status as a live thread waiting for
input, and `bb thread tell` restarts an idle thread. So "stopped" cannot be read from bb, and
"idle" says nothing about whether a harness process is alive.

# What it changes

- This is the bb fact behind the rule that a stop stays stopped, decided in
  [the session-provider contract](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)
  (`dec-faf9af131d69`), which is the canonical home of that rule and of why a broker-side guard
  was rejected. Its implementation records a kernel-owned `stoppedAt` in the receipt before the
  provider's `stop` is called, and refuses input to such a home `E_SESSION_NOT_RUNNING` before any
  provider call.
- bb's `idle` and `pending` map to `running: null` (unknown), never `true`: nothing is inferred.
- A thread stopped from bb's own UI sets no OATS stop record, so the next tell restarts it: stops
  of OATS agents go through OATS.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-20;
   notes/bb-has-no-stopped-status.md.
2. get-bb/bb at `df9619d8`, read at maintainer review 2026-11-20:
   `packages/domain/src/thread-status.ts` lists the six statuses and no stopped one, and
   `thread-lifecycle.ts` moves `stop.settled` to `idle` from `active` and `stopping`.
3. [oats-project/oats#1991](https://github.com/oats-project/oats/pull/1991) (open, unmerged), read
   at maintainer review 2026-11-20: it implements contract r10 and documents `stoppedAt` recorded
   before `stop`, input refused `E_SESSION_NOT_RUNNING`, and `running: null` when a provider cannot
   tell a live idle session from a settled one. The contract's earlier revisions are the source's
   report.
