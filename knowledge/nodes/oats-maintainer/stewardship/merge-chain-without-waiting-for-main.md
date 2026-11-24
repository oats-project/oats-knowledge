---
type: Decision
title: A merge chain may squash the next PR while main's run on the last one is still going
description: In a repository whose CI run is long, the next squash need not wait for main's run on the previous one when the head contains main exactly, every check at it is green and at most one main run is unread; main's run is still read, and a red one stops every chain.
about: [workstream/oats-direction]
tags: [stewardship, merge, ci, chain, release]
timestamp: 2026-11-24
---
**Owner: oats-maintainer. Update-on-change: whoever changes how a merge chain
waits for main revises this concept in the same change.**

# Decision

Agreed by the release lane on 2026-11-24 for oats-bb, where one plugin CI run
takes about 45 minutes. The next squash in a chain may merge while main's run
on the previous squash is still going, if ALL of these hold:

1. **The head contains main exactly.** Merge with `--match-head-commit`, and
   check that the head's tree is main's plus the PR's own diff
   (`git merge-base --is-ancestor origin/main <head>`; a squash of such a head
   leaves main's tree equal to the head's).
2. **Every check at that head is green.**
3. **At most one main run is unread.**
4. **Main's run is still read.** A red main run stops every chain until main is
   green again, whatever the cause looks like.

A head that is behind main, even only by another chain's merges that share no
file with it, does not qualify: it updates first, and a verdict carries to the
updated head only by the carry rule ([review protocol](review-protocol.md)).

# Why

The PR's own run at a head that contains main tests the tree main will have,
so waiting for main's run after every squash mostly re-runs the same tree and
cost a whole release day. What main's run can still catch is the environment,
and rule 4 keeps that gate.

# Rejected

- **Wait for main after every squash.** Safe, but at about 45 minutes a run it
  turned a dozen ready PRs into a day.
- **Several unread main runs.** A red result could then not be pinned to one
  squash.

# Evidence

The same day, main went red twice on a flake in starting a second bb in the
two-CPU container (provider contract runs 45421291925 and 45429539876). Both
chains stopped, the reruns were green, and the flake got its own fix
(oats-bb#80).

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-24; notes/merge-chain-without-waiting-main.md.
