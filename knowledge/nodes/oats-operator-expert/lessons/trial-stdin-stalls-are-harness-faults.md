---
type: Lesson
title: Trial stdin stalls are harness faults, not coordination outcomes
description: A Claude trial stalled on bare cat commands reading a socket that did not close, so background-task waiting and any reaper intervention must be separated from measured coordination behavior.
about: [workstream/operations]
kind: lesson
id: ins-18ff63372b5b
tags: [operator, trials, claude, stdin, measurement]
timestamp: 2026-11-03
---
# A background task can be waiting on input forever

The source reports three stalls in roughly an hour during a Claude Code
2.1.308 trial campaign. Commands began with a bare file-writing `cat`, before
a later heredoc. The first process read from a socket on stdin that did not
reach EOF. After the tool moved the command to the background, the agent
waited for it, leaving the review or reply that other agents needed unsent.

An agent waiting on a background command is therefore not sufficient evidence
of a coordination-policy failure. In this observed pattern, the blocked
input lifecycle belonged to the harness/tool execution path. It is not a
claim that every long-running `cat`, socket input or background wait is faulty.

# Treat recovery as an intervention

The source's run-scoped reaper sent SIGTERM to bare `cat` processes with
socket stdin after 60 seconds. It applied across trial arms, logged each reap
as a kit fault, and reportedly let the rest of the shell command proceed.
The proposal reports no later hangs, but gives no matched exposure period
sufficient to establish a failure rate or a reliable cure.

Preserve this as a temporary fixture workaround, not a general instruction
to kill host processes. A process name, socket and age alone do not prove
that input was unintended. Continuing the shell after terminating a writer
also does not establish that its output is complete or that downstream work
is valid. Report affected runs and recovery interventions separately from
unassisted coordination outcomes; equal application across arms does not
make an intervention invisible to the measurement.

# Eliminate the input-lifecycle fault

The durable route is an execution contract with explicit stdin ownership
and bounded completion or cancellation: commands not intended to read input
must not inherit a stream that waits indefinitely. Add harness/runner
regressions for a bare reader before a later heredoc, background handoff,
closed input, and cancellation that cannot silently pass incomplete output.
A retained workaround must identify only the authorized run's processes and
record its effects. This harvest certifies neither those guards nor a
harness fix.

See the [trial model-identity lesson](/nodes/oats-operator-expert/lessons/trial-model-identity-needs-launch-enforcement.md)
for the campaign's early mixed-model limitation, and the
[trial boundary lesson](/nodes/oats-operator-expert/lessons/trial-runtime-redirection-excludes-host-service-proof.md)
for the separate question of where file writes land. Containing a write does
not resolve a stalled stdin, and unblocking stdin does not establish isolation.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-03; notes/claude-bash-stdin-socket-hang.md.

The observations are source-reported from one host. The note attributes the
cases to Sonnet 5.5, while the proposal identifies unintended models in early
runs of the same campaign; no per-model incidence estimate follows. The
harvest inspected no processes, transcripts or reaper implementation and
reproduced no stall or recovery.
