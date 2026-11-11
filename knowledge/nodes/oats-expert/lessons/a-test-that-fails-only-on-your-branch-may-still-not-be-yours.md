---
type: Lesson
title: A test that fails only on your branch may still not be yours; run the one file on the branch and on main, and time the passing runs
description: A race test failed three of three CI runs on a text-only PR while main passed, yet the test was broken on main too; before deciding whose failure it is, the lead stops re-running, has the one test file run several times on the branch and on main, and looks at how long the passing runs take, because a pass that takes a timeout's length is a wait that expired, then takes the diagnosis and the smallest fix to the lane that owns the test.
about: [workstream/coordination]
kind: lesson
id: ins-d5704dd9d2ee
tags: [verification, ci, testing, timing, diagnosis, coordination]
timestamp: 2026-11-11
---
# Three red runs on one branch are not an attribution

A race test failed on every CI run of a PR that changed only soul texts
and a manifest version. Main and other PRs passed the same day. The
source, as the lead, read it twice and was wrong both times: first as a
known flake, so it re-ran the job; then, after three failures in three
runs, as something the branch had caused. Neither reading had evidence
behind it. "Fails here, passes there" over a handful of CI runs does not
separate a branch's effect from a test that fails some of the time
everywhere.

The developer then ran the one test file a few times on the branch and on
main. Both failed about one run in five. The test was broken on main too.

# The tell is in the passing runs

Every run of that file, pass or fail, took 33 seconds, and the test's
gate has a 30-second limit. A passing run that takes as long as a timeout
did not pass by meeting its condition: a wait expired and the helper
carried on. Here the gate had stopped matching the command it intercepts
after an unrelated change added an option to that command, and it fell
through when its time ran out instead of failing. The cause, the repair
and the test design that avoids it are the kernel node's to tell:
[a test of the answer to a race's outcome needs no gate](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md#a-test-of-the-answer-to-a-races-outcome-needs-no-gate-2026-11-11).
With a one-line fix to the test, the file passed eight of eight runs in
about two seconds each.

So duration is evidence even when the result is green. A failure log
speaks only for the runs that failed; the time taken by the runs that
passed showed that the test was not doing what it claimed on any run.

# Rule: reproduce on both sides, then read the durations

When a check fails on the lead's branch and the change looks unrelated:

- **Do not re-run a failed job a second time.** One re-run that fails the
  same way has spent the "transient" reading for that revision; the
  source's repeat cost an hour and showed nothing new. Which revision a
  re-run tests is the maintainer's
  [re-run lesson](/nodes/oats-maintainer/lessons/a-rerun-does-not-pick-up-a-base-fix.md).
- **Have the one test file run on the branch and on main, several times
  each,** before saying whose failure it is. The same failure on both
  sides means the branch did not cause it, whatever CI's runs suggested.
- **Look at how long the passing runs take** and compare that with the
  limits the test and its helpers carry. A pass at the length of a timeout
  is a wait that expired, and it points at the helper that waited.

# Take the diagnosis to the lane that owns the test

The failing test was another lane's. The lead's part ends with the
diagnosis and where it goes:

- Take it to the owning lane as a recommendation, the route the
  [out-of-lane findings lesson](/nodes/oats-expert/lessons/out-of-lane-findings-go-to-the-owner-as-a-recommendation.md)
  gives: the runs on both sides, the durations, the cause as far as it is
  known and the smallest fix, with an offer to open the PR.
- The source's own rule is not to fix another lane's test inside the
  lead's PR. Whether a lead may fold an adjacent fix into its own PR is
  the policy question that lesson leaves to the human and the maintainer;
  this lesson records the source's practice and does not settle it.
- Ask for the hardening together with the fix. A helper that proceeds when
  its wait expires hides a broken gate; one that fails and names itself
  shows it on the first run. The kernel node's section linked above names
  that hardening as the elimination route for this gate.

# How this relates to neighbouring lessons

This lesson is about whose failure a red check is, before anyone designs
a fix. What broke in this test and how such a test should be built belong
to the kernel node's section linked above, which also says, from the test
author's side, that a gated test suddenly taking its timeout's length is
a broken gate and not a slow host. Once a cause is being tested, the
Desktop expert's
[slowed-step control](/nodes/oats-desktop-expert/lessons/slow-the-suspected-step-on-ci.md)
is the method for a rare wait race, and it is where "a green rerun does
not distinguish a fix from the original flake" lives. Its
[shard-membership lesson](/nodes/oats-desktop-expert/lessons/shard-membership-is-run-specific.md)
is the sibling check for a CI hang: establish what ran in that exact run
before attributing it to a change. For the lead,
[establishing the cause before changing a test's baseline](/nodes/oats-expert/lessons/control-before-changing-a-restore-baseline.md)
covers the next decision, and
[the counts at the exact head](/nodes/oats-expert/lessons/a-green-claim-is-the-count-of-failures-at-the-exact-head.md)
cover how the results themselves are read.

# Elimination route

The real fix is in the test code, and for this gate it is already named
where it belongs: the kernel node's section records a gate that fails the
test and names itself when its wait reaches the limit, announced as a
follow-up to the repair and not checked there as landed. Beyond that one
gate, a report of tests whose duration sits at a known timeout would find
other helpers that still fall through. That report is not delivered by
this lesson. Until then, reading the durations is the lead's manual step.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-11; notes/a-test-that-fails-only-on-your-branch-may-still-not-be-yours.md.

One test in one build, observed 2026-11-11 and source-reported: the three
CI failures, the passes on main and on other PRs, the rate on both sides,
the 33-second runs against a 30-second limit, the cause and the fix's
eight of eight are the source's report. This harvest read no PR, run, log
or test. "About one in five" comes from a few local runs and is not a
rate. The note does not explain why CI failed three times in three on the
branch while main passed the same day, and neither does this lesson; what
it shows is that the pattern was not evidence against the branch. The
kernel node's section records the cause and the repair from the forge;
this harvest read neither, and takes no detail of the cause from it
beyond the link. That both records describe one test is this harvest's
reading of their matching details (a worktree race test, a 30-second
gate, runs of about 33 seconds, about one failure in five); neither names
the other.
