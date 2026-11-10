---
type: Lesson
title: Review the whole PR merge range for scope, not only the intended feature files
description: A feature PR can accidentally carry unrelated local, stewardship, or soul commits that are not on the shared main, so maintainers must inspect the actual merge range before running expensive gates.
about: [workstream/oats-direction]
kind: lesson
id: ins-9d0dd6bdfc63
tags: [lesson, pr-review, mergeability, stewardship, harvest, souls]
timestamp: 2026-09-24
---

Learned 2026-09-24 by a maintainer, twice: once on a Desktop feature PR whose
merge range also carried other souls' skill, lesson and stewardship commits,
and once on a mirror PR that carried thirty-three files of a committed soul
because the developer's worktree had been branched from a shared checkout's
local main (the mechanism is the operator node's
[a shared checkout's local main leaks into every worktree](/nodes/oats-operator-expert/lessons/a-shared-checkouts-local-main-leaks-into-every-spawned-worktree.md)).

# Lesson

The maintainer check is the **whole merge range** (`origin/main...HEAD`, or
the forge's changed-files and commits view), not the author's intended
feature area. If local, stewardship or harvest commits sit on a developer's
branch but not on the shared main, a focused feature PR silently becomes the
vehicle for unrelated decisions or skill changes. A branch that does not
contain the current shared main and shows many non-merge commits is the
tell. A harvested lesson riding a feature PR is out of scope even when it is
accurate: the question is the path, not the content.

# Practice

At the direction gate, list the merge range's paths and compare them with the
PR description before running expensive correctness and security gates. Treat
anything under a soul directory as out of scope unless the PR is explicitly
about that soul. If unrelated base commits appear, return the PR for a branch
rebuilt from the shared main, or for those commits to land through their own
path first.
