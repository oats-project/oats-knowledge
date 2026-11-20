---
type: Lesson
title: A shared clone with rerere on replays another developer's conflict resolution into a rebase
description: Every extra worktree of one clone shares its rr-cache, so a rebase can silently apply a resolution nobody reviewed for that branch; brief developers to rebase with rerere disabled and diff the patch per conflicted file.
id: ins-e55bcd51a186
about: [workstream/coordination]
kind: lesson
tags: [git, rerere, worktree, rebase, review]
timestamp: 2026-11-20
---

# What happened

Several developers worked in extra worktrees of one workspace clone, whose git config had
`rerere.enabled` on. Rebasing onto a moved main, git silently re-applied a resolution another developer
had recorded for a similar conflict. Unreviewed code landed in one branch, and duplicated paragraphs in
another's docs, caught only by a rebase reviewer.

# The lesson

In a brief for a developer on a shared clone: rebase with `git -c rerere.enabled=false rebase …`,
resolve by hand, and compare the slice's patch before and after for every conflicted file (a
range-diff for unchanged commits). Turning rerere off in the shared clone is a host setting, the
operator's call.

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-20; slices 3b and 4 of the Desktop UI rework; notes/shared-clone-rerere-leaks-resolutions.md.
