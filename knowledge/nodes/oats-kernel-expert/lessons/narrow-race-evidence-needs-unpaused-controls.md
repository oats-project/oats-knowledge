---
type: Lesson
title: Narrow race evidence needs unpaused controls and bounded fixtures
description: An exact CLI pause establishes a possible interleaving, not its ordinary reachability, so pair it with unpaused trials and measured window width while bounding fixture resource use; a test of the kernel's answer to a race's outcome needs no gate, only the competitor's effect placed before the act and a step matched by its arguments rather than their position.
about: [system/oats-kernel]
kind: lesson
id: ins-cc1d2a43c0ea
tags: [kernel, testing, concurrency, evidence, environment]
timestamp: 2026-11-11
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
`oats-maintainer-REDACTED`, relayed by the lead: a reproduction needing tens of
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

# A test of the answer to a race's outcome needs no gate (2026-11-11)

The sections above are about whether, and how readily, an interleaving is
reached. A different subject is what the kernel answers once the race has
gone one way. A test of that answer needs neither a second process nor a
gate [2]:

- **Put the competitor's effect where the precheck cannot see it, before the
  act.** For the branch race of `oats worktree add`, the precheck reads the
  branch's ref and never its lock. A lock file for that ref, placed before
  the command starts, lets the precheck pass, and the switch then meets the
  lock.
- **Or make the effect right before the real step, in sequence.** A stand-in
  `git` ahead of the real one on `PATH` that, on the switch call, first makes
  the branch with the real Git and then runs the real switch. Nothing waits
  and there is no timer.

Find the intercepted step by what its arguments are (the subcommand, and the
value that follows its flag), never by their index. The two-process gate used
for "two adds racing" told its racers apart by argv position. An unrelated
kernel change put a configuration override first, and both racers then took
the same side of the gate. Each waited out the gate's 30-second limit, and
the test failed about one run in five while every run took over half a minute
[2]. The repair reads the argument that follows `-C`. It
deliberately does not accept any argument ending in the tree's name, because
an override's value can be an arbitrary path.

The asymmetry is the point. A gate that stops matching degrades into a timing
race and still passes most runs. A sequential stand-in that stops matching
fails every run, at once. Where the subject is the answer, prefer the form
whose breakage is loud.

This tests the kernel's answer, not that two real commands can race. The
two-process test stays for that, and the unpaused controls above still apply
to reachability and to sizing the risk. The lock-file placement holds only on
Git's `files` ref backend: the source's test asserts the backend rather than
carry an untested reftable branch, and it was not run on Git before 2.44. The
two outcomes under test are recorded in
[the observed-condition decision](/nodes/oats-kernel-expert/decisions/refusal-remedy-requires-an-observed-condition.md).

The elimination route for the silent degradation is in the harness: a gate
whose wait reaches its limit fails the test, naming the gate, instead of
letting the step run. The gate repair's description announces that hardening
as a follow-up change; this harvest did not check that it landed [2]. Until
it has, a gated test that suddenly takes its timeout's length is a broken
gate, not a slow host.

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

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-race-contract, 2026-11-11; notes/deterministic-race-path-tests.md.

2. The named note reports the two placements, the positional gate and the files-backend limit. The harvest read the flake report [oats-project/oats#1857](https://github.com/oats-project/oats/issues/1857) and [oats-project/oats#1866](https://github.com/oats-project/oats/pull/1866), merged on 2026-11-11 at `b4f5bad0f58c`, whose description states the positional match, the 30-second limit, two failures in ten local runs before the repair, runs of about 33 seconds, the repair that reads the argument after `-C`, and the announced fail-at-limit follow-up. [oats-project/oats#1867](https://github.com/oats-project/oats/pull/1867), open at `9bcad122def2` with ten successful checks when read, describes both gate-free tests. This harvest read no test code, reran nothing and did not reproduce the failure rate.
