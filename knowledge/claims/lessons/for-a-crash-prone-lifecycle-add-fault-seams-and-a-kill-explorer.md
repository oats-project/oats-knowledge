---
type: Lesson
title: For a lifecycle that must survive killed processes, a transition table is not enough; add fault seams at every write and an exhaustive kill explorer in CI
description: Refines the transition-table lesson for concurrent lifecycle code with crash points: after the table, fresh review rounds still found one kill ordering each until every write had a fault seam and a seeded explorer killed the kernel at each seam of each verb, ran the other verbs, and checked the design page's invariants, with every schedule required in CI.
about: [workstream/coordination, system/oats-kernel]
kind: lesson
id: ins-072fea4ad204
tags: [lesson, review-loop, state-machine, crash-consistency, testing, coordination]
timestamp: 2026-11-21
---

# What was observed (K1 to K3, oats#1991, #2040, #2048)

The session-provider lifecycle (spawn, start, stop, input, resume, retire of a home whose session a provider runs)
had review rounds that each found a real, reproduced defect in a rarer ordering. Writing the design page (records,
states, a settle procedure, write orders, verbs by state, crossing tables) found three gaps at once, as
[the transition-table lesson](/claims/lessons/a-review-loop-that-keeps-finding-state-defects-converges-with-a-transition-table.md)
predicts. But the following rounds still found kill orderings: a reviewer inverted three write orders and every
table test still passed, because the tests built the intermediate states by hand.

# What converged it

- **A fault seam between each pair of writes**, and one test per gap asserting the state left and that the next verb
  settles it.
- **An explorer**: for each verb, kill the kernel at each seam and around each provider call; run each other verb and
  an input; when all settles, check the page's invariants (no session runs that no record names; a home recorded
  stopped has none running; no home is left that no verb can act on; no input lands after a confirmed stop). 1260
  schedules, seeded and deterministic, a failure printing its seed and steps.
- **Every schedule in CI** (a seeded sample in the shards, the full set as a required job behind a path filter plus
  nightly): a sample is what lets the next ordering through.
- **The next reviewer is told the explorer exists**, and that a finding should name a schedule it misses (the
  source's practice).

Two defects the explorer's runs found that review had not: in a container whose first process is no init, a
provider command's group whose members were all zombies counted as alive, so a stop was refused and the session left
running; and, in the explorer's own fake provider, an event-log reader racing a mid-line append.

# When

Call the design pass at the second round that finds a lifecycle defect, not the fifth; add the explorer as soon as the
code has crash points between writes.

This refines the transition-table lesson (`ins-1f10c618a0bc`) and supersedes nothing: the table still comes first.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-21 (oats-knowledge#448);
   notes/lifecycle-patches-converge-slowly-write-the-state-machine.md, notes/kernel-session-provider-build-lessons.md.
2. Checked at maintainer review 2026-11-21: oats-project/oats#1991 (merged 2026-11-20) adds the design page, the
   seams and the explorer (1260 schedules, a seeded sample in the suite, every schedule a required CI job); its commits
   record that "three inverted orders passed every test" because the unsettled states were built by hand, and the
   all-zombie group the explorer found in a container with no init. oats-project/oats#2034 (merged) runs every
   schedule for a change that touches the lifecycle and nightly; oats-project/oats#2041 (merged) fixed the fake's
   event-log reader; oats-project/oats#2040 and #2048 (merged) ran every schedule at their heads.
