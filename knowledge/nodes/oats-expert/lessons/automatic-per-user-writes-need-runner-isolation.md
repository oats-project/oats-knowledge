---
type: Lesson
title: Automatic per-user writes need runner isolation in the same change
description: When ordinary commands gain a per-user write side effect, plan runner isolation, a personal-file mutation guard, eligible positive fixtures and interruption cleanup in the same change rather than discovering them in CI.
about: [workstream/coordination]
kind: lesson
id: ins-b96996289076
tags: [planning, testing, isolation, cleanup]
timestamp: 2026-10-19
---
# A command side effect expands the test boundary

When an ordinary kernel command starts writing a per-user file, tests that
invoke it can begin modifying the developer's personal state even though
the tested feature is unrelated. Isolating the new feature's direct unit
tests does not protect all those callers. The generalist's spec should put
test-runner isolation and its enforcement in the same change as the write,
not leave them as follow-up hardening.

The deployments-registry effort exposed this dependency across separate CI
and review rounds. The source reports that runner isolation, a personal-list
mutation guard, positive fixtures and killed-run cleanup all became part of
the solution. Preserve why they belong together:

- **Isolate at the runner boundary.** Give each test file its own OATS home,
  including initialization that prevents unintended one-time imports. The
  default test environment should not reach personal storage.
- **Detect escape, not just configure isolation.** Fail the run if the real
  personal file changes. An injected home is the preventive mechanism; the
  guard detects callers that bypass it.
- **Prove the write path is eligible.** If automatic registration skips
  ordinary temporary directories, a normal temporary fixture can exercise
  only the skip path. Use a suitable positive-test base outside those
  exclusions, clean it up, and include it in leftover detection. Moving a
  fixture out of a skip region must not move it out of the guard's reach.
- **Account for abrupt termination.** Startup side effects can create run
  directories before a test kills the process. Arrange cleanup from the
  surviving test or runner; a SIGKILLed process cannot perform its own
  teardown. Keep the leftover gate as evidence of incomplete cleanup.

Runner-injected environment also changes exact child-environment assertions.
Check the environment contract being tested, using a relevant projection
where appropriate while retaining assertions for required isolation and
intentional inheritance. Do not simply weaken an assertion until it passes.

# Distinct planning check and elimination route

[Population coverage](/nodes/oats-expert/lessons/registry-population-needs-user-path-coverage.md)
explains why the automatic write was needed. This lesson owns the resulting
specification obligation, not a second implementation recipe for the runner.
The [affected-test inventory at handback](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
is a later coverage check; it does not replace designing isolation before
implementation. The kernel's [nested-run visibility decision](/nodes/oats-kernel-expert/decisions/ssh-fixture-paths-preserve-nested-run-visibility.md)
and [cleanup-evidence decision](/nodes/oats-kernel-expert/decisions/fixture-tmux-directory-preserves-cleanup-evidence.md)
remain canonical for their fixture-placement tradeoffs.

The durable fix belongs in runner-owned isolation, personal-file guards,
fixture lifecycle helpers and executable positive/skip/interruption
regressions. Specification guidance should require that package of checks
when introducing a new per-user side effect. Exact paths, environment
construction and cleanup mechanics stay in repository code and tests; this
lesson neither changes those contracts nor certifies present coverage.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-deployments-list, 2026-10-19; notes/per-user-file-test-isolation.md.

The proposal reports a child-environment assertion failure in
[PR #1396](https://github.com/awebai/oats/pull/1396), a killed TUI run's
leftover directory in [PR #1402](https://github.com/awebai/oats/pull/1402),
and a positive-test base adjustment in
[PR #1404](https://github.com/awebai/oats/pull/1404).
The captured note supports the isolation, guard and cleanup rationale.
These are source-reported observations from one effort and one registry;
this harvest did not reproduce the failures or audit the implementation.
They do not prove every CLI test wrote personal state or that a file guard
detects every possible leak.
