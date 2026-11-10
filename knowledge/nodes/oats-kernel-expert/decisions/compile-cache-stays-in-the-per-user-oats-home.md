---
type: Decision
title: The CLI compile cache stays in the per-user OATS home
description: Keep the CLI's automatic compile cache in the existing per-user OATS home to avoid a shared-directory trust dependency, a second location override and an inherited hook-environment change.
about: [system/oats-kernel]
id: dec-bc510fd6398c
tags: [kernel, performance, cache, trust, environment, testing]
timestamp: 2026-10-28
---
# Selected design and its boundary

The source's 2026-10-28 design enables Node's compile cache for CLI startup,
including cheap reads, at `$OATS_HOME_DIR/compile-cache`. Create the directory
with mode 0700 before passing it to Node, and skip the optimization if it
cannot be prepared. Reuse Node's `NODE_COMPILE_CACHE` and
`NODE_DISABLE_COMPILE_CACHE` controls rather than add an OATS-specific
opt-out. Enable the automatic cache through the API without adding
`NODE_COMPILE_CACHE` to the process environment or exporting an OATS-chosen
value to hooks. This does not promise to remove a caller-supplied variable.

This records the source-selected design and rationale, not released behavior
or human acceptance. The implementation was still open at the proposal
checkpoint. Current behavior and compatibility belong to the code and tests.

# Why the alternatives lost

- **Node's default shared temporary-directory location.** The source rejected
  making kernel startup consume V8 cache bytes from a location that another
  local principal could pre-create and control. A startup saving is not a
  reason to introduce that trust dependency. Keep the automatic location
  within the existing per-user OATS boundary, with private creation, rather
  than assume code-cache input is safe because it is called a cache. This is
  the design's threat rationale, not a demonstrated exploit or an audit of
  Node's cache validation. Explicit caller-selected locations remain the
  caller's choice; private creation is not a guarantee about every directory
  a caller might supply.
- **A separate XDG cache location.** OATS already has a per-user location and
  its override. A second location with another override would add operator
  surface without a benefit identified in this design. Reusing the existing
  home also lets the existing test-runner isolation cover the new write.
- **An OATS-specific disable variable.** Node already supplies the control.
  Another variable would create a second contract and precedence problem,
  not a new capability.
- **Setting an environment variable to activate the automatic cache.** API
  activation keeps this startup optimization local to the CLI instead of
  changing the environment inherited by hooks. The source's runtime probes
  support that choice; do not infer unchanged children merely from a faster
  parent command.

# Cache isolation is not a personal-file mutation guard

The source rejected guarding the live compile-cache contents as though they
were a personal registry: ordinary concurrent CLI use legitimately changes
those contents, so a before/after guard could blame a test for an unrelated
write. Source-hash-keyed, regenerable entries are not personal list state.
Keep per-test-file `OATS_HOME_DIR` isolation; fix tests that bypass it rather
than using a live-cache mutation guard as a substitute.

This is the cache-specific tradeoff, not a repeal of the generalist's
[personal-state isolation lesson](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md).
Its registry guards and cleanup obligations remain in their own canonical
home. Cache placement, private creation, caller-control precedence,
no-added-variable behavior and isolation belong in executable regressions;
this harvest does not certify their coverage.

# Relationship to the earlier spawn rejection

The [spawn-probe lesson](/nodes/oats-kernel-expert/lessons/spawn-probe-cost-is-claude-telemetry-flush.md#compile-cache-scope-refined-on-2026-10-28)
already distinguishes a small spawn-specific gain from a larger share of
startup-dominated reads. That finding remains canonical for the measurements.
This design chooses the cache for CLI startup generally and addresses the
shared-storage concern through placement; it does not overturn the earlier
spawn measurement or the probe-only telemetry environment boundary. No
universal speedup or effect-free optimization follows.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/cli-startup-node-fixes-kernel-expert, 2026-10-28; notes/compile-cache-location.md.

The proposal identifies [awebai/oats#1630](https://github.com/awebai/oats/issues/1630)
as the evaluation and [awebai/oats#1632](https://github.com/awebai/oats/pull/1632)
as the open implementation at its checkpoint. The source reports Node 26.12.1
probes showing API activation leaves the environment unchanged and Node's
own directory creation uses 0755, motivating explicit 0700 creation; the
proposal additionally reports confirmation of the environment behavior on
Node 22.23. These are source-reported observations, not probes reproduced by
this harvest. No macOS performance measurement or accepted merge is claimed.
Exact timings, API compatibility details and review/CI bookkeeping are not a
second specification here.
