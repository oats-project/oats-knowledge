---
type: Lesson
title: Spawn probe telemetry can masquerade as Git cost
description: Attribute synchronous child cost before optimizing Git, and keep the Claude telemetry opt-out local to the plugin probe because carrying it into a launch disables channels.
about: [system/oats-kernel]
kind: lesson
id: ins-07815a4268dd
tags: [kernel, spawn, performance, profiling, claude-code, environment]
timestamp: 2026-10-28
---
# Finding

A sampled `spawnSync` self-time total does not identify the child responsible.
In the source's 2026-10-15 investigation, roughly 0.65–0.9 seconds had been
attributed to repeated Git calls into the remote cache. A child-process
timeline paired with a CPU profile aggregated by kernel caller instead put
627 of 647 milliseconds under the harness-package gate's
`claude plugin list --json` probe [1].

On that throwaway deployment with Claude Code 2.1.288, the source measured:

- Git cache calls at 1–22 milliseconds each. A long-lived `cat-file --batch`
  process's elapsed lifetime was not time spent doing Git work.
- The plugin probe at 610–770 milliseconds, falling to 200–207 milliseconds
  with `DISABLE_TELEMETRY=1`, with byte-identical output. The source attributed
  roughly 0.43 seconds to Claude's telemetry flush at exit.

The diagnostic lesson is to correlate child start/end timestamps with the
caller's profile before removing allegedly redundant work. Instrumenting
child-process calls distinguished a synchronous harness probe from Git;
sampling alone had not. These are source-reported measurements from one host
and one Claude version, not a spawn latency budget or a universal Git cost.
Re-measure when the harness changes.

# The optimization stops at the probe

The selected fix puts `DISABLE_TELEMETRY=1` on this probe alone. The same
investigation reports that Claude disables channels in a session whose launch
environment opts out of telemetry. Carrying the optimization into a launch
would therefore cut aweb channel delivery. Do not mutate a shared or launch
environment to speed up a read-only probe.

This is not a new [native-launch policy](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
or permission to override an operator's settings. It is a boundary on the
optimization's own environment override. Preserve the required-plugin gate;
one version's byte-identical listing does not establish equivalence for every
future Claude release. The source reports a regression asserting that the
pane environment does not receive the probe override. Probe-output checks and
launch-environment regressions are the enforcement route, not a standing
manual workaround.

# Alternatives rejected in this investigation

- **Cache the probe answer between preview and apply.** This widens the
  required-plugin gate's race window and silently extends what `--max-age`
  covers. The [preview-bound observation exception](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md)
  does not authorize caching this gate.
- **Overlap the probe with hooks or materialization.** This violates the
  [pre-commit refusal boundary](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md);
  faster work is not useful if a failing gate can run after effects begin.
- **Start the probe speculatively beside remote-reference discovery.** Its
  inputs come from resolution, and the remaining measured probe cost was
  only about 0.2 seconds after the telemetry cut.
- **Cache `ls-tree` by commit or enable Node's compile cache.** The targeted
  costs were small (`ls-tree` took 6–22 milliseconds; the compile-cache gain
  was about 30 milliseconds), while the compile cache added temporary-storage
  effects. These are
  workload-specific rejections, not permanent prohibitions on either cache.

# Compile-cache scope refined on 2026-10-28

The earlier approximately 30 ms compile-cache gain was measured on spawn;
it is not a forecast for startup-dominated reads. In a later investigation
on kernel 0.69.4 and Node 26.12.1, the source reports `NODE_COMPILE_CACHE`
saving 60–95 ms per process on cheap reads (about 64 ms, 17%, on session
inspection and 94 ms, 36%, on `version`). This refines the
scope of the rejection above, not the probe's environment boundary or the
reason to account for temporary-storage effects.

The later comparison used one Linux host, 7–15 interleaved runs and medians;
absolute times varied substantially with load, and macOS was not measured.
Measure the target workload before dismissing or selecting a cache. These
figures do not establish that enabling it is effect-free, universally useful,
or an accepted implementation decision. The separate
[kernel-rewrite finding](kernel-rewrite-does-not-remove-child-waits.md)
explains why startup savings do not remove unchanged child waits.

Evidence: OKF proposal from oats-kernel-expert/cli-language-evaluation-kernel-expert, 2026-10-28; notes/native-rewrite-keeps-node-and-the-waits.md; notes/cli-cost-is-startup-and-children-not-compute.md. The source identifies [awebai/oats#1630](https://github.com/awebai/oats/issues/1630); these later measurements were not reproduced by this harvest.

# Later cache-location design

A separate source proposal on 2026-10-28 selects an automatic cache for CLI
startup generally, placed in the existing per-user OATS home rather than a
shared temporary directory. The [compile-cache location decision](/nodes/oats-kernel-expert/decisions/compile-cache-stays-in-the-per-user-oats-home.md)
owns that trust rationale, caller-control and hook-environment boundary,
and cache-specific test-isolation tradeoff. This extends the workload
refinement above with a selected design; the implementation was still open
at that proposal's checkpoint, so it is not evidence that every CLI process
already uses the cache. The original spawn-specific rejection and probe-only
telemetry boundary remain historical and applicable in their stated scope.

Evidence: OKF proposal from oats-kernel-expert/cli-startup-node-fixes-kernel-expert, 2026-10-28; notes/compile-cache-location.md.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-spawn-resolution-speed, 2026-10-15; notes/spawn-probe-cost-is-claude-telemetry-flush.md; notes/preview-bound-apply-may-reuse-observations.md.

1. The proposal and notes identify [awebai/oats#1246](https://github.com/awebai/oats/issues/1246)
   as the investigation and report the repair merged in
   [#1259](https://github.com/awebai/oats/pull/1259). Measurements, telemetry
   attribution, channel behavior, implementation and tests are source-reported;
   this harvest did not reproduce them or audit the implementation.
2. Checked by the knowledge maintainer at review of the harvest on
   2026-10-15. #1246's breakdown attributed about 0.9 s of `spawnSync` self
   time to roughly 20 Git calls into the remote cache; the merged #1259
   (2026-10-15) reports the child-process timeline that moved it to the
   plugin probe, with the same per-call Git, probe and `DISABLE_TELEMETRY=1`
   figures on Claude 2.1.288. Its diff sets the variable on the plugin listing
   alone, with a code comment that it is never a launch's because it turns
   channels off; adds `test/harness-probe-env.test.mjs` and changes
   `test/pane-environment.test.mjs`; and lists the four rejected alternatives
   as considered and not built. The repository's docs state the probe
   override, not the misattribution or the rejections, which this lesson
   preserves. The tests' assertions were not read and nothing was run or
   reproduced here.
