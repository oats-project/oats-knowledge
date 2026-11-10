---
type: Lesson
title: Establish the cause before changing a restore-test baseline
description: Before changing what a restore test compares against to cure a platform-specific failure, use controls to distinguish the program's effect from the harness or environment's effect.
about: [workstream/coordination]
kind: lesson
id: ins-27d893d9015d
tags: [testing, planning, controls, regression]
timestamp: 2026-10-12
---
# A plausible explanation is not a reason to weaken the assertion

When a test promises that a program restores its environment on exit, moving
the baseline can hide precisely the effect it was meant to detect. A failure
on one platform does not by itself justify a weaker comparison everywhere.
Before specifying that fix, the lead should check whether the reported
passing and failing cases fit the proposed cause.

In the source's terminal-restore investigation, a shell-initialization
explanation prompted a spec to take the baseline later. But the original
baseline already ran through a command, and some exit signals passed while
another failed. Those observations challenged the explanation before any
baseline change was justified. Asking the developer to explain the mismatch
after starting the fix put the decisions in the wrong order.

# Request the control before routing the fix

Keep the relevant harness, platform and exit conditions, but replace the
program under test with a plain control. Then use a minimal program that
performs only the suspected step when needed to isolate its effect. Compare
the results and name the event responsible for the difference before
choosing a test change or a program change. An inconclusive control leaves
the cause unresolved; it does not license normalization.

A difference attributable to the program or its runtime remains within the
restore obligation. A demonstrated harness or environment effect may
justify a narrowly explained comparison change, not wholesale movement of
the baseline. The point is causal evidence before changing the assertion,
not a standing exception for a particular platform or terminal flag.

The [known-good harness lesson](/nodes/oats-maintainer/lessons/validate-the-harness-against-a-known-good-baseline.md)
asks whether a new test environment reproduces a trusted result. This lesson
addresses the subsequent judgment about an allegedly false restore failure:
which actor changed the state, and what the comparison must continue to
protect. It shares the evidence-before-recommendation stance of
[testable feasibility disputes](/nodes/oats-expert/lessons/test-feasibility-before-choosing-between-owners.md).
For a fix built away from the runtime that exposes the bug, see
[verification on the reproducing host](/nodes/oats-expert/lessons/verify-host-bound-fixes-on-the-reproducing-host.md);
that lesson separates cross-host handback evidence from capture-harness failures.
For tmux-driven assertions, [prove the observed view and fixture state](/nodes/oats-expert/lessons/real-terminal-waits-prove-the-observed-state.md)
before trusting content or absence; capture wrapping and input timing can
invalidate the measurement without a program defect.

# Elimination route

Fix the demonstrated program defect, or encode only the demonstrated
harness normalization in the test with a causal explanation and regression
coverage that still detects program-caused changes. Preserve coverage of the
relevant exit paths. A test can pin the established distinction; it cannot
justify a new exclusion whose cause has not yet been established. This is
specification judgment, not a replacement for that test repair.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-12;
notes/a-moved-baseline-needs-a-control-run.md.

The note records the 2026-10-11 macOS finding on
[awebai/oats#935](https://github.com/awebai/oats/pull/935), the premature
baseline-change spec and the maintainer's request for controls. The proposal
also reports a later fix in [#942](https://github.com/awebai/oats/pull/942),
but the note does not establish that fix's final causal result. This harvest
did not run the controls or audit the fix; it promotes the supported
investigation lesson, not a technical verdict about which flag to exclude.
