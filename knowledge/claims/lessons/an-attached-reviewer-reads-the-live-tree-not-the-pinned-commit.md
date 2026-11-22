---
type: Lesson
title: An attached reviewer reads the live worktree, not the commit its brief pins; park mid-round edits outside the tree
description: A code-reviewer spawned with --work attached reads and runs the author's worktree as it is on disk. Any uncommitted edit the author makes while the round runs enters what the reviewer tests, whatever target_sha the brief names. New work that arrives mid-round goes into a stash or a patch file until the report is in.
about: [workstream/coordination]
id: ins-ed5abcdefc5d
kind: lesson
tags: [lesson, review-loop, attached-worktree, reviewer, evidence]
timestamp: 2026-11-22
---

# Lesson

The review-loop skill says to edit nothing in the worktree while a reviewer runs. The
reason is concrete: an attached reviewer has no checkout of its own, so the "pinned range"
holds only while the tree stays clean. A direction note arrived mid-round, and the author
edited the tree for about two minutes: a new refusal message, with the test's matcher not
yet updated. The reviewer's local run then failed that test once, and it reported the
failure as a possible flake it could not reproduce.

# What to do

- When new work arrives while a round runs, write it as a patch file, or stash it, outside
  the attached tree. Apply it after the report, in the next fix commit.
- If the tree did change mid-round, say so when answering the report, so that an
  unexplained failure isn't recorded as a flake.

# Elimination route

The review-loop skill already states the rule; this lesson gives its reason and what to say
when it was broken. The structural fix would be a reviewer that runs in its own checkout of
the target commit, or one that records whether the attached tree was clean when it started
and finished and reports a dirty tree in its verdict. Until one exists, the rule and this
lesson are the guard.

# Citations

1. [oats#2086](https://github.com/oats-project/oats/pull/2086): the round-1 review at
   `c4c5e731` (its "Observation (not a finding)": one test failed once, then passed on ten
   reruns) and the author's answer settling round 1 at `a694f032` (uncommitted edits in the
   attached tree for about two minutes during the round).
