---
type: Lesson
title: A holderless lifecycle marker cannot support safe recovery
description: Killed start and stop probes left permanent busy markers, while removing a live start's marker admitted two unmanageable harnesses, so recovery needs holder evidence rather than an age or deletion hint.
about: [system/oats-kernel]
kind: lesson
id: ins-b2ea0a4bf5ab
tags: [kernel, lifecycle, concurrency, liveness, recovery]
timestamp: 2026-10-10
---
# Discovery

The lifecycle investigation of 2026-10-10 found both sides of a recovery
trap on OATS 0.50.0 at `ae9308b2`: a holderless marker left by a dead command
refused subsequent work indefinitely, but removing it while its holder was
live broke exclusion [1]. A hint to remove a marker only when no operation
is running is not an actionable safety test if the marker supplies no way
to identify that operation.

The source killed stop while it waited for its harness. SIGTERM, SIGINT,
SIGHUP and SIGKILL each left its in-progress marker; later stop applies
refused with `E_LIFECYCLE_BUSY`, including after the instance was started
again. A reader closing its pipes did not produce the same failure: the
command finished and released the marker. The source also reports a start
killed by SIGKILL leaving `E_SESSION_START_BUSY` indefinitely. Catchable
signals did not have that outcome in its start probes. These are
command-specific observations, not a promise about all signals or versions.

The stranded stop marker blocked stop, not every lifecycle operation:
retirement could still proceed in the reported case. Keep the affected
operation explicit rather than calling the whole instance unrecoverable.

# Why manual deletion is not the missing protocol

In the source's controlled test, removing the start marker while its holder
was still running let two starts create two same-named tmux windows and two
harnesses. The kernel then failed to address them as one instance: inspection
and stop read stopped, start refused, and retirement could not quiesce them.
An apparently stopped result was not evidence that either harness had ended.

This makes the design consequence stronger than remembering to clean up a
lock. **A marker whose recovery may require displacing its holder must carry
holder evidence usable by the recovering party.** Without it, there is no
basis for distinguishing a dead command from a slow one. A timeout alone
cannot supply that evidence. Nor is a holder PID alone sufficient:
[process identity and liveness have separate limits](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md),
including PID reuse, unknown reads and unreaped holders.

The [record-store decision](/nodes/oats-kernel-expert/decisions/record-lock-liveness-tradeoff.md)
already explains why refusing is preferable to stealing from a live holder.
The [whole-run retire claim](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md)
already rejects non-reclaimable locks for long operations. This lesson adds
the observed start/stop consequences; it does not replace either policy or
prescribe the record store's foreign-holder age fallback for lifecycle work.

# Elimination route

Treat holderless-marker recovery as kernel knowledge debt. The source names
[awebai/oats#890](https://github.com/awebai/oats/issues/890) for killed stop and
[awebai/oats#889](https://github.com/awebai/oats/issues/889) for the start and
two-harness findings. First define holder identity, safe takeover and
owner-checked release for the lifecycle protocol; then test killed holders,
live contention and unknown identity through the actual CLI. A signal
handler or a `finally` block cannot promise cleanup after SIGKILL, and
instructing an operator to delete state is not a replacement for that
protocol. No marker-removal permission or new force escape is granted here.

Keep catchable-signal tests per command as well: synchronous work with a
listener can defer handling, while default termination can bypass cleanup.
The general signal-lifetime rationale already lives in
[the terminal wrapper lesson](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md).
The kernel owner should update this finding when the recovery protocol is
fixed; this harvest establishes neither the issues' current status nor an
accepted replacement design.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle-overlaps, 2026-10-10; notes/killed-stop-strands-later-stops.md; notes/866-start-exclusion-and-spawn-gap.md.

1. The named notes report killed-command, reader-disconnect and live-marker-removal probes at `ae9308b2`, attributed to awebai/oats#889 and #890. This harvest did not rerun them or independently audit the implementation. The separate spawn/start gap in the backing note is not promoted as another claim in this proposal.
