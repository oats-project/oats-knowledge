---
type: Lesson
title: Narrow race evidence needs unpaused controls and bounded fixtures
description: An exact CLI pause establishes a possible interleaving, not its ordinary reachability, so pair it with unpaused trials and measured window width while bounding fixture resource use.
about: [system/oats-kernel]
kind: lesson
id: ins-cc1d2a43c0ea
tags: [kernel, testing, concurrency, evidence, environment]
timestamp: 2026-10-10
---
# Lesson

A deterministic pause answers whether an interleaving can fail; it does not
answer how readily the unmodified command reaches it. The lifecycle evidence
review of 2026-10-10 required both an unpaused trial series and the window's
wall-clock width per file and filesystem before using a constructed race to
size the risk [1]. Record the pause, the unpaused outcomes and the measurement
separately. A zero-failure batch is not impossibility, and a forced failure is
not a production-frequency estimate.

The source found a useful CLI-level seam without changing kernel files:
a module passed directly through `node --import` could wrap a function on
`node:fs` or `node:child_process` and call `syncBuiltinESMExports()` so the
kernel's named imports used the wrapper. A release-file gate could then hold
one CLI at an exact call. Passing the import to that process rather than
through `NODE_OPTIONS` kept the instrumentation out of its children. This
was useful where in-process test seams could not establish the result seen
by an independent CLI client.

Prefer an observable phase boundary to a guessed sleep: hold one side at its
last relevant step, then release it when the other side's progress is visible
on disk. That still contains an instrumented side and must not be labelled
an entirely unpaused trial. Separately run ordinary overlapping commands
with no gates and measure the original window. The stop-retire findings in
[verified recovery versus home removal](/nodes/oats-kernel-expert/lessons/verified-recovery-does-not-prove-home-removal.md)
show why a small metadata-only home and a large directory-work home can
have different exposure without different kernel logic.

# Bound the experiment, not just the last cleanup

The source exhausted the shared temporary filesystem's inodes by retaining
large per-trial homes and recovery copies. Checking free bytes alone missed
the limiting resource. Cleaning each trial afterwards reduced the peak but
did not bound it. The note attributes the resulting 2026-10-10 rule to
`oats-maintainer-lfx`, relayed by the lead: a reproduction needing tens of
thousands of files uses its own size- or inode-capped fixture root, or asks
first. This is source-reported maintainer guidance, not independently
established human acceptance. Account for both inode and byte use; other
sessions' leftovers are not the experimenter's to remove.

Invocation context is another experimental input. The source found that a
fixture launched from inside a live instance home inherited that instance's
operational interpretation. Use an isolated fixture context rather than
letting the driver masquerade as the instance under test. This applies the
existing [home/work authority boundary](/nodes/oats-kernel-expert/decisions/home-work-authority.md),
not permission to operate on another home or deployment.

Signal outcomes also need their own controls: the source's synchronous stop
and start differed under catchable signals because only one process had a
listener installed. Test each command and signal rather than extrapolating
from the neighboring command. Link the existing
[signal-lifetime lesson](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md)
for the reason cleanup may not run, and the
[known-good baseline lesson](/nodes/oats-maintainer/lessons/validate-the-harness-against-a-known-good-baseline.md)
for validating a newly isolated environment.

# Elimination route

This is evidence-design judgment, not a permanent preload runbook. Once an
interleaving exposes a defect, fix its lifecycle coordination or reporting
in the kernel and retain a deterministic regression at that boundary. Put
resource caps, per-trial ownership and cleanup in the reproduction harness;
a remembered warning or free-space check is not a cap. Preserve CLI-level
coverage where the externally reported outcome is the property under test.
Do not substitute a pause for the unpaused evidence needed by a later risk
decision, or adopt an injected wrapper as production behavior.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle-overlaps, 2026-10-10; notes/repro-pauses-without-touching-the-kernel.md; notes/866-stop-overlapping-retire.md; notes/killed-stop-strands-later-stops.md.

1. The proposal attributes the no-pause and window-width requirements to the maintainer's evidence review. The named notes report the technique, inode incident and command-specific signal results on `ae9308b2`; the proposal points to scripts in [awebai/oats#866](https://github.com/awebai/oats/issues/866#issuecomment-6099626048). This harvest did not read or run those scripts, independently confirm acceptance messages, or reproduce the host measurements.
