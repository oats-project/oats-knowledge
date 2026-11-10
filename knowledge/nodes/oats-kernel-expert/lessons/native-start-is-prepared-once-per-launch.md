---
type: Lesson
title: A native start belongs to the launch, not each rendering of its command
description: Preparing native-record state during command rendering can strand an undispatched pending receipt and make history unreadable, so one launch owns one prepared start reused by every render.
about: [system/oats-kernel]
kind: lesson
id: ins-6f41b7e715da
tags: [kernel, launch, native-records, receipts, history]
timestamp: 2026-10-27
---
# Lesson and failure mechanism

Treat native-record preparation as a launch-owned side effect, not a string
rendering operation. A launch may render its command more than once without
starting another harness. Each render must reuse the same prepared start.

The source reports that a second `prepareNativeStart` created another pending
receipt, while only the command actually dispatched could complete its
receipt. The other receipt remained pending. `historicalSessionRoots` then
refused the home's history because a pending launch has unknown recording
locations; transcript capture and `sessionsForHome` failed in turn. A command
that eventually runs correctly can therefore leave history unusable through
an earlier, discarded rendering.

The discovery was not specific to systemd. Adding a wrapper exposed the
problem, but re-rendering after locating a harness elsewhere or changing
folder trust had the same risk. A future wrapper or launch adaptation must
not acquire another native start merely because it needs another command
string. Preserve the refusal's reason rather than making history silently
ignore an unknown launch to hide the extra receipt.

# Elimination route

This is code debt, not a permanent reminder for callers. Allocate the start
once at the launch boundary and make the rendering API consume that prepared
start. The source reports that passing the one start to every render was the
repair. The enforcement target is a regression that exercises multiple
renders for one launch and checks that there is exactly one prepared receipt,
that the dispatched command completes it, and that subsequent history reads
remain usable. A rendered-string assertion alone misses the stranded state.

The named note calls receipt-count regression coverage a target; this harvest
does not certify that it exists. Nor does this lesson redefine interrupted
real launches as harmless, authorize deleting pending receipts, or weaken
the history reader's fail-closed boundary.

# Related

[Per-agent scopes are probe-guarded and execution-only](/nodes/oats-kernel-expert/decisions/agent-scopes-are-probe-guarded-and-execution-only.md)
records the wrapper tradeoffs that exposed the issue. [Native harness
launch](/nodes/oats-kernel-expert/decisions/harness-native-launch.md) remains
canonical for native settings, discovery and permission policy; this lesson
changes none of those boundaries.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert, 2026-10-27; notes/lesson-native-start-prepared-once-per-launch.md.

The source attributes the discovery and repair to review of
[awebai/oats#1561](https://github.com/awebai/oats/pull/1561) at `add54ec5`,
still unmerged at proposal time. The failure, repair and reported CI results
are source-reported; this harvest did not audit the implementation, reproduce
the failure or run a harness. No human acceptance or release is inferred.
