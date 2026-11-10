---
type: Lesson
title: Attribute spawn latency before choosing the component to fix
description: Combine existing phase evidence with preview tracing, caller profiling and repeated read timings to assign spawn costs to their owners without creating an instance on the measured deployment.
about: [system/oats-desktop]
kind: lesson
id: ins-24946fca76c9
tags: [desktop, spawn, performance, measurement, verification]
timestamp: 2026-10-15
---
# Finding

A slow Desktop spawn is not necessarily a slow Desktop. In the source's
2026-10-15 investigation, provider hooks and kernel re-resolution outweighed
the client's redundant preview and post-apply observation waits. Fixing only
the visible client would have left the largest costs untouched.

Before designing a fix, produce a phase table with an owner for each row:
Desktop, kernel or provider. Separate time to a launched session from time to
a visible, ready row; they are different endpoints. Route each finding to
its owner rather than treating the whole delay as one client's budget.

# Evidence without a new spawn on the measured deployment

The useful combination was four kinds of evidence, not one stopwatch:

1. **Existing spawn phase timestamps.** With authorized access, correlate
   module-materialization timestamps, hook-output modification times,
   creation time and the recorded launch event from completed spawns. These
   bound phase windows without running another spawn. File times are proxies
   whose meaning depends on the hook order and which output each hook wrote;
   they are not direct measurements of every operation inside a hook.
2. **A subprocess timeline around a live `oats spawn --preview`.** PATH
   wrappers recording child start/end and invocation distinguish external
   waits in discovery and resolution without applying the spawn. Preview
   evidence covers that read path, not the provider hooks that apply runs.
3. **A CPU profile of the preview, correlated with the child timeline and
   caller.** A `--cpu-prof` sample in synchronous subprocess execution does
   not by itself identify the child or separate its work from waiting. The
   kernel's [probe-cost finding](/nodes/oats-kernel-expert/lessons/spawn-probe-cost-is-claude-telemetry-flush.md)
   corrects this investigation's initial attribution to Git; that attribution
   is not carried here.
4. **Repeated timings of individual reads, with load recorded.** The source
   used three to five runs per read to avoid treating one loaded-host sample
   as a stable cost.

This method avoids a new spawn on the measured deployment; it is not a claim
of zero overhead or permission to inspect arbitrary homes. Keep raw traces
and profiles scoped to the authorized investigation rather than publishing
private paths or invocation contents.

# What the measurements do and do not establish

The source estimated press-to-launch at about 10 seconds for a developer
spawn and 11–16 seconds for an expert spawn. Its phase ranges were aweb hooks
2.6–3.7 seconds, OKF hooks 0.6–5.1 seconds, kernel live re-resolution
1.4–2.4 seconds, Desktop's prepare miss 1.4–2.4 seconds and post-apply wait
1–3 seconds. **These are measured parts added together, not one timed
end-to-end run.** Reads were timed at load 2.4–3.7, and the later fixture
comparisons ran at 3.0–9.0. They explain the ownership
judgment on that deployment, not permanent budgets or universal bottlenecks.

For a Desktop before/after comparison, interleave builds press by press on
throwaway fixture deployments with no messaging, a stub harness and a
headless backend. That isolates the client contribution but excludes real
kernel and provider costs; a faster fixture result cannot establish the
same end-to-end production gain. The source's three-deployment row-ready
comparison was 3.3 to 1.0 seconds with a 30-second-old preview, and 3.5 to
2.7 seconds at 90 seconds. Those scoped results support the
[spawn-read decision](../decisions/preview-bounded-spawn-outcomes.md#reuse-the-confirmed-preview-and-observe-only-the-created-deployment),
not a claim that more deployments always produce a proportional gain.

# Elimination route

Prefer explicit phase instrumentation and a repeatable, bounded fixture
benchmark over reconstructing timing from file metadata indefinitely. Keep
this as investigation judgment, not a permanent manual command checklist or
an assertion that instrumentation already exists. The existing
[verification safety rules](verification-judgment-for-privileged-surfaces.md#operator-machine-safety-is-part-of-verification-judgment)
still govern native effects, process lifetime and output bounds.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-client-spawn, 2026-10-15; notes/measure-spawn-latency-without-spawning.md; notes/a-spawn-reads-only-what-it-changed.md.

The source identifies the breakdown in
[awebai/oats#1246, comment 6193791566](https://github.com/awebai/oats/issues/1246#issuecomment-6193791566)
and before/after tables in [#1260](https://github.com/awebai/oats/pull/1260).
Measurements and implementation are source-reported, not reproduced or
independently audited by this harvest. The accepted kernel lesson linked
above owns the later child-cost correction from #1259; this Desktop lesson
owns the phase-ownership and comparison judgment.

Checked by the knowledge maintainer at review of the harvest on 2026-10-15:
the cited #1246 comment gives the same phase ranges, owners and totals, and
states that nothing was spawned on the measured deployment and that the sums
are additions of measured parts, not one timed run. The merged #1260 reports
the interleaved headless fixture runs, five per cell, and states that kernel
and provider costs fall outside them. Nothing was reproduced here.
