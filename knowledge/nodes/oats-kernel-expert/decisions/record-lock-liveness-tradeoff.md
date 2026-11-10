---
type: Decision
title: Record locks favor recoverable refusal over live-holder theft
description: Record-store lock age must not override a live local holder, with foreign-lock fallback and the check-unlink race remaining explicit limits.
about: [system/oats-kernel]
id: dec-a483c063ddff
tags: [kernel, record-store, locks, concurrency, fail-closed]
timestamp: 2026-09-05
---
# Rationale

Decided 2026-09-05 during the record-store lock review. The failure came from
comparing clocks with different starting events: a wait timeout starts when a
contender arrives; lock age starts when the holder acquired it. Two durations
measured from different events cannot be ordered by comparing their lengths,
so ordering them cannot prevent a late contender from stealing a live lock.

The accepted tradeoff refuses to write when a local holder appears alive, even
after long delay. The asymmetry is the whole argument: refusing to write is
recoverable; writing concurrently with a live holder is not — so every
uncertainty resolves toward waiting. PID reuse can make abandoned state appear
live, but that recoverable refusal is preferable to concurrent
read-truncate-write repair corrupting the journal. Do not reintroduce an
unconditional age ceiling as a convenience fix.

This is bounded record-store rationale, not distributed-lock doctrine. Foreign
or unreadable holders still use age fallback, and checking identity before
unlink detects many replacements but does not close the check/unlink race.
Owner-checked release helps prevent cascading theft without proving universal
exclusion.

**Bounded retry** (2026-09-05). Waiting is only safe if it ends. Every
iteration that fails to acquire falls through one deadline check and one
sleep, with no `continue` above them and no branch that retries for free: the
first version checked the deadline on one branch only, so an unreadable lock
or one that kept failing to be removed retried forever, hot. Retrying at once
after a reclaim saves about 25ms and reopens that hole. Two file shapes
reproduce the pathologies deterministically, where permission tricks do not:
a directory where the lock belongs (a non-ENOENT read error), and a dangling
symlink (the name exists, yet the lock reads as vanished on every pass).

# Related

[A holderless lifecycle marker cannot support safe recovery](/nodes/oats-kernel-expert/lessons/holderless-markers-cannot-support-safe-recovery.md)
records killed start/stop and live-marker-removal findings where there was
no holder identity to assess; it does not replace this record-store policy.

[Retire exclusion belongs to a whole-run claim, not a plan or retry key](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md)
applies the refusal asymmetry to retirement, with distinct no-wait and
no-force-bypass decisions; it does not replace this record-store policy.

[Preserve recovery authority until the outcome is proven](preserve-authority-until-cleanup-is-proven.md);
[Process identity must survive different readers and host conventions](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md).

# Current contracts

- [Current store.mjs](https://github.com/awebai/oats/blob/main/packages/record/lib/store.mjs)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge @ 7838d3ca (pid-liveness-fails-toward-refusing-to-write, ownership-token-lock-beats-threshold-ordering).
2. Migrated from agents/cli-dev/soul/knowledge/lessons/every-failed-retry-needs-one-deadline.md @ 7838d3ca.
