---
type: Lesson
title: A branch built on a PR's unsquashed history is cherry-picked, not merged, once main holds that PR squashed
description: After a PR lands on main as a squash, a branch built on its unsquashed history brings the whole feature in twice as add/add conflicts when merged; cherry-pick only the branch's own commits (-x, signed off) and prove them by git patch-id --stable equality and a diff --stat of only the expected paths.
about: [workstream/coordination]
kind: lesson
id: ins-c47a5e5d2223
tags: [git, squash, cross-team, verification]
timestamp: 2026-11-24
---

# What was observed (oats-bb #40 and the plugin's #55, 2026-11-23)

A plugin branch of six commits (one folder) sat on the plugin feature's unsquashed history; main had that feature as
one squash commit. Merging the branch into the provider PR conflicted in five files, three outside the folder. Cherry-
picking the six commits applied cleanly; each pick's stable patch id equalled its source's, so the verifier checked
the picks without re-running anything, and the real run then proved them in CI.

# What follows

Before merging another team's branch into yours, check its merge base against main; if main holds its base squashed,
cherry-pick its own commits, and hand the verifier the patch ids and the --stat.

Related: [a commit cherry-picked across a base change must be re-read as a diff against the new base](/nodes/oats-maintainer/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md),
which is the reviewer's side of the same move.

# Citations

1. oats-project/oats-bb#40 (merged 2026-11-23): its description records the six commits cherry-picked with `-x` from the plugin's branch, each with its original's patch id, touching only `plugin/container/real/`, and that the branch stood on the unsquashed history of #55, which main holds as one commit; the plugin specialist's VERIFIED notes are quoted there.
2. oats-project/oats-bb#55 (merged 2026-11-23 as one squash commit).
3. The failed merge's five conflicting files are source-reported.
4. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
