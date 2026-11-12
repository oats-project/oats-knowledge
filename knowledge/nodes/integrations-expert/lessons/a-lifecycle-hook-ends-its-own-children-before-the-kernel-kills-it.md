---
type: Lesson
title: A lifecycle hook ends its own children before the kernel kills it
description: A provider hook whose external calls can outlast the kernel's hook timeout bounds them all by one deadline of its own, measured on a monotonic clock and enforced with SIGKILL on every path out, synchronous, background and early exit, and its compensation stays safe when that deadline cuts its own rollback.
about: [workstream/provider-integration]
kind: lesson
id: ins-34ea8e76b3c8
tags: [lesson, integrations, hooks, timeout, signals, compensation, fake-cli]
timestamp: 2026-11-12
---

Learned 2026-11-12 building a deadline into a messaging provider's lifecycle
hook, whose calls between them could take longer than the kernel's limit.
Five review rounds each found a different way a child outlived the hook's
deadline, while every timing test passed.

# Rule

The kernel kills a spawn, launch or retire hook at its own timeout, and then
the hook's handling of a call that completed late (a mint to report for
compensation, a grant to revoke) never runs. So a hook whose external calls
can add up past that limit ends every child by one deadline of its own, with
room left to report:

1. **One deadline for every child.** Each call's timeout is the lesser of what
   it asks for and what is left before the deadline. A call with no time left
   is not started, and fails through the hook's ordinary error path.
2. **SIGKILL, not SIGTERM.** Node's `execFileSync`/`spawnSync` `timeout` sends
   SIGTERM by default, then waits for the child to exit. A child that catches
   SIGTERM keeps the hook waiting past the deadline. Set
   `killSignal: "SIGKILL"`, and kill a background child the same way.
3. **Elapsed time, on a monotonic clock.** Child timeouts and the kernel's
   timeout measure elapsed time. A deadline taken from `Date.now()` moves when
   the host clock is corrected. Use `performance.now()`, and floor what is
   left before passing it as a timeout.
4. **No synchronous wait under a pending kill timer.** A background child
   killed by `setTimeout` dies only on the event loop's next free turn. A
   synchronous wait started after it (`Atomics.wait` on a file lock, a long
   synchronous call) postpones the kill, and the child can apply its effect
   late. Await the background child before any such wait.
5. **No exit leaves a background child behind.** A refusal or a fatal that
   calls `process.exit` while a background child runs orphans it with no
   timeout at all. Route the exits you know through the await, and kill the
   child on `process.once("exit")` as the backstop for the ones you don't.
6. **Compensation survives a cut rollback.** The deadline can cut the hook's
   own rollback, and then the hook answers no meta. The compensating retire
   must be safe without that answer: decide any destructive branch from the
   kernel-captured settings
   ([a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md)).

# Why

A fake that models a cooperative child hides every one of these escapes.
That means a child that dies on SIGTERM, takes no contended lock, runs on a
steady clock and is always awaited. The deadline then looks enforced by tests
that only measure how long the hook took. Each escape lets a call act after
the kernel has given up on the hook, the case the deadline exists to prevent.

# Consequences

- Test each path with a fake that defeats it: a child that catches SIGTERM, a
  contended lock after a background child starts, an early refusal while one
  runs, and a wall-clock step (a preloaded module that moves `Date.now()`
  once a chosen call has run, never the host's clock). Assert the effect (the
  child is dead, or its side effect never applied), not only the elapsed
  time.
- This extends [a fake CLI that hangs must start a child of its own](/nodes/integrations-expert/lessons/a-fake-that-hangs-must-have-a-child.md)
  from descendants to the caller's own kill and exit paths. Signal and
  process-group reasoning stays with the kernel's
  [terminal signal lesson](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md).
- The kernel's timeout value is the kernel's fact, read from its source for
  the release a provider supports. Never copy it into the provider as a
  promise.

# Citations

Evidence: OKF proposal from integrations-expert/aweb-seat-defects-lead, 2026-11-12; notes/hook-deadline-needs-sigkill-and-no-sync-wait.md.

Source: awebai/oats-aweb#229, review rounds 2 to 6 on branch
`fix/229-hook-deadline`, each escape reproduced by a regression that failed
before its fix.

Maintainer review of oats-knowledge#375: the branch's commits name each
escape and its fix in turn (one budget for every aw call; the version read
and background deregistration bounded too; SIGKILL; awaiting the background
deregistration before the record's synchronous lock wait; no exit leaving it
running; the monotonic clock). The branch was unmerged and #229 open when
proposed; the regressions' pass/fail results are source-reported, not rerun
in review.
