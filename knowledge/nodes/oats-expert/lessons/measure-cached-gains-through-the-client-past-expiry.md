---
type: Lesson
title: Measure cached gains through the real client and across expiry
description: A cache-backed before/after comparison must exercise each installation's real client path, include an observed expiry refresh and count fallbacks so warm-only samples and omitted client work do not misstate the gain.
about: [workstream/coordination]
kind: lesson
id: ins-f5f7a4917569
tags: [performance, measurement, caching, verification]
timestamp: 2026-10-29
---
# Measure the workload and the reuse cycle

When reporting a speed-up that depends on a reuse window, a quick series of
warm reads is not evidence for the whole polling workload. Write down the
reuse lifetime, interleave the before and after runs on the same deployment,
and pace them across more than that lifetime. Establish that a measured tick
actually paid the expiry refresh. Report p95 and maximum alongside the median
so the remaining live call is not hidden by the typical warm tick.

Drive each installation's real client code on both sides. A collection of CLI
calls is a different workload if the client also starts a collector or does
other work within the measured tick. Account for that child work in CPU as
well as end-to-end wall time. Count fallbacks to the old path: a nominal
reader run that silently took the CLI path does not measure the intended
implementation.

# What exposed the measurement error

The source's 2026-10-29 final comparison used 15 interleaved rounds with
2-second pauses over roughly 90 seconds against a 60-second login reuse
window. It reported a TUI median tick of 268 ms and a maximum of 924 ms,
attributing the maximum to the one login-expiry tick. Back-to-back samples
wholly inside the reuse window would have omitted that cost, including from
their p95 and maximum. The proposal reports no fallbacks in the measured
after runs; that bounds those samples, not future reader reliability.

The earlier CLI-only baseline reported 0.92 CPU seconds per tick, versus
1.57 CPU seconds when the baseline ran through the client. The source
attributes the discrepancy to the client-side liveness collector child
omitted by the CLI-only bench. The lesson is to preserve the measured workload,
not to carry an abbreviated baseline forward as though it measured the client.

These are source-reported results on one deployment, not reproduced
benchmarks or cross-host budgets. One observed expiry establishes that the
refresh cost appeared in the sample; it does not establish a stable population
p95 or worst-case bound. No numerical p95 was supplied in the captured evidence.

# Canonical boundary and elimination route

[Profile read waits before designing concurrency](/nodes/oats-expert/lessons/profile-read-waits-before-designing-concurrency.md)
owns causal attribution before choosing an optimization. This lesson owns
measurement of the resulting gain: the real client workload and the reuse
cycle, rather than a second profiling method. The Desktop
[phase-measurement lesson](/nodes/oats-desktop-expert/lessons/measure-spawn-latency-without-spawning.md)
retains its distinct spawn-cost and fixture boundaries. Neither a favorable
benchmark nor an expiry observation grants permission to change freshness or
authorization policy; the maintainer's
[reader decision](/nodes/oats-maintainer/decisions/no-cli-rewrite-app-owned-reader.md)
owns that contract boundary.

Prefer a maintained benchmark that invokes the actual client path and records
refresh and fallback counts over a manually assembled CLI simulation. Add
checks that the comparison exercised the intended path and crossed expiry;
keep controlled cache-expiry behavior tests separate from real elapsed-time
performance evidence. Carry these requirements into measurement guidance
rather than relying indefinitely on reviewer memory. These are prevention
routes for the implementation and guidance owners, not claims that a harness,
regression or skill update has shipped.

# Evidence

Evidence: OKF proposal from oats-expert/app-owned-reader-expert, 2026-10-29; notes/measure-a-cached-gain-past-its-window.md.

The source identifies the final measurement in
[awebai/oats#1630, comment 6503498776](https://github.com/awebai/oats/issues/1630#issuecomment-6503498776).
This harvest verified the captured note's hash; it did not inspect the
benchmark implementation, rerun it or independently audit the issue comment.
