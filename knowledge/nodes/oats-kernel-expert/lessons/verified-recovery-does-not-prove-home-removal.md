---
type: Lesson
title: Verified recovery does not prove that a home stays removed
description: Stop-retire overlap preserved work in the reported probes but could recreate or strand a receipt-only home, so cross-command exclusion must cover removal and late writes as well as preservation.
about: [system/oats-kernel]
kind: lesson
id: ins-5ad87fda1c7e
tags: [kernel, lifecycle, concurrency, recovery, cleanup]
timestamp: 2026-10-10
---
# Discovery

The stop-retire investigation of 2026-10-10 separated two risks that a
single label such as lifecycle race conceals: **preserving work and finishing
cleanup are different proofs**. On OATS 0.50.0 at `ae9308b2`, the source
reported complete, byte-for-byte recovery in its probes, yet a stop writing
during retirement could leave a receipt-only stub home that still occupied
the instance name [1]. This is evidence for the cross-command boundary of
[the retire-only claim](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md),
not evidence that that claim already coordinates stop.

The source's safety argument is bounded: the tested stop wrote kernel home
metadata, not instance work; retirement measured the recovery against the
source after copying and checked it again after hooks. A transient stop
marker could instead cause `E_WORK_PRESERVATION_FAILED` before hooks. Those
refusals subsequently retired successfully in the reported trials. The
argument confirms [measurement against the source](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md);
it does not establish that arbitrary concurrent writers, surviving harnesses
or future stop implementations can never lose work.

# Why cleanup has a separate race

The source demonstrated two ways a late writer defeats removal:

- With Node 26 on tmpfs and btrfs, recursive `rmSync` could throw
  `ENOTEMPTY` and leave a directory when another process added a file after
  that directory had been listed. A successful recovery did not make that
  removal succeed.
- An existence check followed by recursive creation of a parent directory
  could recreate a home removed between those calls. Checking that the home
  exists before writing is not coordination with its removal.

The resulting stub had lost its instance record but retained a stop receipt.
It appeared idle and held the name. In the reported directory-work case,
normal retirement refused the unidentified home and forced retirement
refused inspection; neither removed it. Do not generalize the worktree-mode
force outcome to directory mode, or infer that a listing's idle state proves
there is a supported cleanup path.

Other interleavings lost the stop's receipt or let a disappearing marker
escape the retire walk as raw `ENOENT`. In the post-hook case, the source
reported a recovery still marked before-hooks and a later retirement running
hooks again. Thus preservation, cleanup, receipt durability and truthful
phase reporting need separate assertions; the [CLI-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
covers the reporting consequence.

# Evidence bounds and elimination route

The source reports 168 unpaused overlapped retirements: one stub, eleven
preservation refusals and 156 clean outcomes. The stub was in a 20,000-file
directory-work fixture (one in 61 trials); an ordinary-home group had none
in 40. Measured removal time was about 2.4 microseconds per file on tmpfs and
13 on btrfs in those fixtures. These are observations, not production rates,
portable timing bounds or a proof from zero observed failures. They explain
why work inside a directory-mode home can widen the removal window; the
[reproduction lesson](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md)
keeps possibility separate from unpaused reachability.

This is knowledge debt with a kernel elimination route, not an instruction
to delete a stub manually. Cross-command coordination must include the
removal and every participating command's late writes, while retaining the
existing recovery checks. A copy-only fix or a second existence check cannot
establish that the home stays gone. Preserve deterministic regressions for
writes during removal and between the check and parent creation, and assert
work recovery, home/name cleanup, receipt outcome and hook-phase reporting
independently. The source names [awebai/oats#866](https://github.com/awebai/oats/issues/866)
as the coordination follow-up; this lesson adopts no particular shared-claim
protocol or claim that a fix has shipped. The kernel owner should update the
lesson when the failure is eliminated.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle-overlaps, 2026-10-10; notes/866-stop-overlapping-retire.md.

1. The proposal and named note report the phase-controlled and unpaused probes at `ae9308b2`; results are attributed to [awebai/oats#866](https://github.com/awebai/oats/issues/866#issuecomment-6099605454), with the walk failure tracked as [awebai/oats#892](https://github.com/awebai/oats/issues/892). This harvest read the named evidence, not the scripts or implementation, and did not rerun the probes. The proposal's universal no-work-loss wording is narrowed to the stated writer and verification assumptions.
