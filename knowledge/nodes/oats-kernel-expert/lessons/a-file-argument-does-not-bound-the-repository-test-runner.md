---
type: Lesson
title: A file argument does not bound the repository test runner
description: A single-file request through the repository runner unexpectedly selected the full suite, so kernel briefs need an explicit bounded invocation until runner semantics enforce the requested scope.
about: [system/oats-kernel]
kind: lesson
id: ins-4d4a59d9f6dd
tags: [kernel, testing, safety, tooling, knowledge-debt]
timestamp: 2026-10-28
---
# The failure was in translating a bounded brief into an invocation

On 2026-10-28, the source reports a developer using
`node scripts/run-tests.mjs test/cli-hot-reads.test.mjs` to follow a
single-file testing brief. The runner added that argument to its default
globs instead of replacing them, selecting the whole suite despite the
apparently narrow command. That crossed the repository's no-local-suite
gate and could include the TUI process-signalling tests.

The durable lesson is not a second description of the runner: an instruction
to "run one file" did not preserve the intended execution boundary through
a wrapper with additive selection semantics. Until that is eliminated,
kernel experts should give developers the explicit invocation for an
already-authorized named file: `node --test <file>`, not the repository
suite wrapper with a filename appended.

File selection alone does not establish that the selected test is safe or
isolated. Keep its fixture and environment requirements and the
[operator-host test-selection boundary](/nodes/oats-maintainer/stewardship/review-protocol.md#trial-merge-test-selection-must-respect-the-operator-host-boundary-2026-10-28).
A named file containing real-process or live-terminal effects does not
become eligible merely because the full suite is excluded. This lesson
grants no exception to local restrictions or affected-test coverage.

# Temporary knowledge debt and its elimination

The primary fix belongs in the runner: either reject misleading extra
patterns or make explicit file arguments select only the named files.
Pin that choice with selection tests that do not execute the suite.
Briefing developers is an interim safeguard, not the finished solution.
The current selection contract belongs in repository code and docs rather
than an indefinitely maintained parallel recipe here.

Owner: oats-kernel-expert. When runner selection changes, the expert
handling that change updates or supersedes this workaround and its briefing
advice in the same session. This record reports the trap at the checkpoint;
it does not claim that a runner fix has landed.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/cli-startup-node-fixes-kernel-expert, 2026-10-28; notes/run-tests-file-argument-runs-everything.md.

The source reports discovering the trap while building
[awebai/oats#1634](https://github.com/awebai/oats/pull/1634), stopping the
unintended run, and finding no recurrence of the host-kill harm associated
with [#1615](https://github.com/awebai/oats/issues/1615). Execution of the
hazardous tests was inferred as likely, not established for each file;
do not turn that account into proof of a kill, of safe containment, or of
completed coverage. The harvest did not run the suite, inspect a host
journal or independently reproduce the incident.

The maintainer's linked selection rule already owns the general local-test
safety gate. This concept adds the distinct wrapper-selection trap and the
kernel expert's briefing responsibility, not another host-safety policy.
