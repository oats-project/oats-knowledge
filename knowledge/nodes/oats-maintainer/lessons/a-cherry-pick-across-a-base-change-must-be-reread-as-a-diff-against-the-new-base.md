---
type: Lesson
title: A commit cherry-picked across a base change must be re-read as a diff against the new base
description: When a developer rebuilds a branch on a newer base by cherry-picking, hunks written against the old base can reintroduce text the new base removed; the reviewer reads the full diff against the remote main, not only the lines the change was meant to touch.
about: [workstream/oats-direction]
kind: lesson
id: ins-cb5daaa232cd
tags: [lesson, pr-review, git, cherry-pick, docs]
timestamp: 2026-09-24
---

Learned 2026-09-24 by a maintainer whose co-reviewer caught what the
maintainer's own check had missed.

# What happened

A mirror PR was rebuilt from the remote main by cherry-picking one commit
that had been written on a stale local main. The commit's guide hunk updated
a version number inside an example command that main had since removed, so
the cherry-pick faithfully reintroduced the removed command with the new
version. The maintainer checked the pin line, the payload parity and the
tests, all green, and did not read the guide hunk against the new base.

# Rule

After any rebase or cherry-pick across a moved base, review the branch as
the full three-dot diff against the remote main, hunk by hunk, and for
documentation compare each touched example against what main now says.
Green tests do not cover prose, and a version bump inside a dead example is
exactly the shape a parity test cannot see. This is the same check as
[review the whole PR merge range for scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md),
applied to content rather than to paths.
