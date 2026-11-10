---
type: Lesson
title: Slow the suspected step on CI to expose a rare wait race
description: Use a bounded delayed control to reproduce a rare terminal wait failure, expose missed dependants and challenge every affected exit path at the final head, while measuring timing margins separately from failure frequency.
about: [system/oats-desktop, workstream/coordination]
kind: lesson
id: ins-d5734f3fc101
tags: [verification, testing, tui, timing, controls, ci]
timestamp: 2026-10-30
---
# A green rerun does not distinguish a fix from the original flake

When a terminal wait fails rarely, slow the suspected asynchronous step in
a throwaway diagnostic ref on a disposable CI runner. Compare the unfixed
and fixed trees under that same perturbation, preserving the assertion and
checking that failures have the reported signature. Where available, a case
that does not perform the delayed step provides a useful control. This is a
way to test a causal hypothesis, not permission to dismiss other failures
or a claim that the artificial schedule represents ordinary frequency.

The source's delayed list-add investigation did more than reproduce the
original failure: it found a sibling test with the same missing wait that
reading and review had missed. Use the experiment to challenge the
[affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md),
not just to repeat the initially failing assertion. A passing delayed run
still cannot certify that every dependant has been discovered.

# A mostly passing control can expose the fix's remaining hole

The first fix passed seven of eight reported exit rows. The remaining
SIGTERM route skipped tmux's latency and exposed a process-table exit
window hidden by slower routes. When the remaining failure reaches the
same obligation, treat it as an incomplete fix rather than acceptable flake
noise. Exercise the distinct affected paths repeatedly under the control,
and repeat the evidence at the final head; a run against an intermediate
fix does not cover later edits.

Choose the delay to cross the suspected ordering boundary without crossing
unrelated fixture deadlines. In the reported experiment, four seconds also
tripped a two-second fixture-settle hook; 1.5 seconds exposed the wait
problem without that extra failure. These are diagnostic observations, not
portable delay defaults. Separate unrelated harness failures from the
intended control result rather than count every red row as confirmation.

# Measure the margin, not just whole-test duration

To ask whether an earlier change narrowed the timing margin, record the
completion of the suspected step and the competing leave event on both
sides of that change, under comparable conditions. Whole-test duration can
bury that interval in unrelated run noise. The source's probe compared both
trees in paired runs dispatched seconds apart and found smaller margins
without observing a lost race in either tree: evidence of a timing shift,
not a measured failure-rate increase. The kernel's
[constructed versus ordinary race evidence](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md)
owns that distinction; a forced failure and a green unpaused batch answer
different questions. No fixed repetition count proves a rare race absent.

# Safety and elimination route

Keep signal-capable controls, probes and old-code trials within the existing
[signal-test containment boundary](/nodes/oats-desktop-expert/lessons/signal-tests-must-contain-regressed-cleanup.md).
This case used disposable CI runners, not the operator host. A throwaway
ref is not itself isolation, and instrumentation needs bounded lifetime,
output and owned teardown just like the test it perturbs.

Repair the missing synchronization rather than add a production sleep or
weaken the assertion. Prefer explicit observable transition barriers in the
harness, then retain deterministic delayed or gated regressions that fail
without the fix and cover the affected exit paths. Keep those checks in CI
with executable containment. The lesson preserves why the diagnostic found
what code reading missed; it is not a permanent manual probe recipe or a
claim that all enforcement now ships. It specializes
[causal controls before changing a restore baseline](/nodes/oats-expert/lessons/control-before-changing-a-restore-baseline.md)
and complements [state-proving terminal waits](/nodes/oats-expert/lessons/real-terminal-waits-prove-the-observed-state.md)
without replacing their rules.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-tui-terminal-race, 2026-10-30; notes/slow-the-suspected-step-on-ci.md.

For awebai/oats#1662, the source reports Linux named runs of one terminal
test file: all nine delayed-add rows failed on main with the reported
message; the first fix retained the SIGTERM failure; a later run exposed the
sibling Ctrl+Z wait; and the reviewed fix head with a 1.5-second delay and
eight repetitions of the leave rows passed 83 of 83 tests. The proposal
identifies runs 41048973649, 41048978387, 41050034758 and 41050763780
respectively. The first two ran at four seconds and the last two at 1.5, so
the named runs hold no 1.5-second result on unfixed main, and none covers
the later merge of main into that pull request.

The proposal's margin probes (41048964957 and 41048969398), with 30 samples
per cell, report median margins of 488 to 206 ms idle and 969 to 453 ms
loaded, with no lost race observed. One failure found among 328 pull-request
runs does not establish a rate or a repetition budget. These are
source-reported observations, not runs reproduced or independently audited
by this harvest. They prove neither sharded-CI coverage, cross-platform
behavior, an exhaustive dependency inventory nor the absence of future
races; no shipment claim is made.
