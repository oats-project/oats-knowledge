---
type: Lesson
title: A reviewer loop on hardening edge cases does not converge by itself; a must-fix cut-off closes it without losing a must-fix
description: Fresh adversarial reviewer pairs on code that parses untrusted trees keep finding one or two new real edge cases per round, so a long hardening loop is closed by a must-fix cut-off (the current round is the last full one; afterwards only a wrong result, data loss or a hole reachable from a committed base, a proposal or a deployment's configuration is fixed, and the rest is listed as known limits and one issue), and a live rehearsal against the real system, not the converged loop, is the external check before hand-over.
about: [system/oats-okf]
kind: lesson
id: ins-7c53b6f0dc96
tags: [lesson, okf, review, process, cut-off, rehearsal]
timestamp: 2026-11-10
---

# What happened

The 6.0 subject-layer PR (oats-okf #132) ran 24 rounds of two reviewers each before both approved with no findings,
then two focused rounds on the stale-index change that the live rehearsal forced. The proposer reports that each of
the middle rounds surfaced one or two new hardening edge cases (links, FIFOs, resource bounds, V8 string hashing,
Git filters), each real and fixed with a regression test, none a wrong result on the intended path. A fresh
adversarial pair briefed to find something will keep finding such cases in code that parses untrusted trees; the
loop has no natural end.

# The cut-off that worked

Name the current round the last full one. From it, fix only must-fix findings: a wrong result, data loss, or a hole
reachable from a committed base, a proposal or a deployment's configuration. List the rest in the PR body as known
limits and open one issue after merge. Run one focused round only when a must-fix fix is non-trivial, and give every
content change after a round a fresh delta review. The proposer reports that the PR converged two rounds after the
cut-off and that the no-harvesters PR (#131, eight rounds) got the same rule at its last round.

# What the loop did not find

The live rehearsal against the real base found the release's one availability must-fix: readers refused a base
whose views an earlier regenerator had rendered
([readers tolerate a stale index; writers refuse it](/nodes/oats-okf-expert/decisions/readers-tolerate-a-stale-index-and-a-missing-id-writers-refuse-them.md)).
A green suite and a converged loop prove the fakes; the rehearsal against the real system belongs before hand-over.

# Evidence

- oats-okf #132 (merged 11 November 2026): the body's review line ("24 rounds of two reviewers each (round 24: both
  APPROVE, no findings), then two focused rounds on the stale-index change from the live rehearsal") and its known
  limits listing the remaining edge cases. oats-okf #131 (merged 10 November 2026): "the fixes from eight review
  rounds".
- Source-reported, not on the GitHub record: the per-round findings, when the cut-off was set, and the lead's
  acceptance of it.
- Backing note: none of the proposal's notes is specific to this lesson; it is the proposer's account of the 6.0
  build (proposal of 11 November 2026, live source kb-by-subject-okf-expert).
