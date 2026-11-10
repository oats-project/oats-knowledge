---
type: Lesson
title: A kernel rewrite does not remove unchanged child waits
description: Separate process startup and kernel compute from child waits before estimating a language rewrite's benefit, because measured warm-read gains do not remove provider, network or harness costs.
about: [system/oats-kernel]
kind: lesson
id: ins-624979831a77
tags: [kernel, performance, profiling, runtimes]
timestamp: 2026-10-28
---
# Finding

A slow CLI is not evidence that kernel computation is the bottleneck. Split
command latency into runtime boot and module loading, kernel computation,
and waits on children before pricing a language rewrite. With the child work
unchanged, replacing the kernel's language can reduce the first two costs;
it does not remove network discovery, provider checks or harness probes.
Reducing those requires a separate change to the work or its execution.

The source's 2026-10-28 investigation found two different performance regimes:
cheap reads paid hundreds of milliseconds to start and load Node, while live
status, readiness and spawn preview also paid substantial external waits.
Selected source-reported measurements illustrate why one speedup cannot be
applied to every command:

| Operation | Reported wall time | Attribution or comparison |
| --- | --- | --- |
| Session inspection | About 380 ms cold, 17 ms warm in-process | Avoiding repeated startup exposed a much smaller read operation. |
| Live status | About 1.05 s | About 450 ms of network discovery; the `--max-age` variant, which reuses observations, was about 0.53 s. |
| Readiness | About 2.3 s | About 1.2 s in two provider Node check children, outside the kernel's own computation. |
| Spawn preview | About 1.6 s | About 450 ms network discovery and 460 ms harness probing, alongside about 280 ms kernel computation. |

These are attribution findings, not permission to reuse observations or skip
a gate. The existing [probe-cost lesson](spawn-probe-cost-is-claude-telemetry-flush.md)
owns the probe-only optimization and the workload-specific compile-cache
comparison.

# What the rewrite estimate establishes

No Rust kernel was built. The evaluation used a no-op native binary at about
4 ms plus the measured child waits as an optimistic latency floor, not as a
benchmark of an equivalent implementation. Do not extrapolate inspection's
cold-to-warm speedup to readiness or spawn: their expensive children remain
in the estimate. Nor does changing the kernel alone establish a Node-free
host: separately executed Node work remains outside that change's scope.

The warm inspection result makes startup amortization worth comparing with
a rewrite. It does **not** establish a complete resident reader's per-poll
cost, semantic equivalence, or approval to build one. A kernel-owned reader
would need its own public contract and measurements; the accepted
[minimal process boundary](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md)
is not superseded by a faster private in-process measurement. The messaging
node separately owns its [batched-query rationale](/nodes/oats-aweb-expert/decisions/readiness-cache-needs-measured-cost.md).

# Scope and elimination route

The proposal reports kernel 0.69.4 and Node 26.12.1 on one Linux host, with
7–15 interleaved runs and medians; absolute times varied by roughly a factor
of two with host load. macOS was not measured. Spawn-apply estimates reused
earlier evidence rather than a new apply run, so they are not another row
of this comparison. Re-measure representative workloads before choosing an
optimization; these figures are neither production budgets nor universal
language rankings.

Use maintained phase instrumentation and bounded, repeatable benchmarks to
keep the attribution reproducible, rather than preserve a manual profiling
recipe here. The Desktop node owns the existing
[phase-measurement method](/nodes/oats-desktop-expert/lessons/measure-spawn-latency-without-spawning.md).
This lesson records the investigation's conclusion, not an accepted decision
to reject a rewrite, enable a cache, or introduce a resident reader.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/cli-language-evaluation-kernel-expert, 2026-10-28; notes/native-rewrite-keeps-node-and-the-waits.md; notes/cli-cost-is-startup-and-children-not-compute.md.

The source identifies [awebai/oats#1630](https://github.com/awebai/oats/issues/1630)
as the evaluation and [#1246](https://github.com/awebai/oats/issues/1246) as the
earlier spawn evidence. Measurements and attribution are source-reported;
this harvest verified the captured evidence hashes but did not reproduce the
benchmarks or audit the implementation. The proposal explicitly withholds
acceptance of its architectural recommendations.

Checked by the knowledge maintainer at review on 2026-10-28 against #1630's
body: the cold and warm session-inspection, live-status, readiness,
spawn-preview, no-op-binary and compile-cache figures appear there. The
live-status reuse figure was corrected to the issue's `--max-age 60` median.
The tables were compared, not re-run.
