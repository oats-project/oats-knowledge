---
type: Lesson
title: Report an outcome only from a read-back of the target
description: A chained push, merge or release script can fail mid-way while a later step still announces the intended outcome; a head, a merge or a tag is named to a reviewer only from a read-back of the remote or the forge, in its own step, guarded by what the read-back says.
about: [workstream/oats-direction]
kind: lesson
id: ins-63e4ef0ea9c2
tags: [lesson, release, git, review, notices, read-back]
timestamp: 2026-09-24
---

Learned 2026-09-24/25 by a maintainer who sent three false reports in two
days, all of one shape. Twice a chain whose git step failed still printed the
local head and mailed it as the "new head". Once an edit, commit, merge and
the "merged" notice were chained with `&&` except the notice, which followed a
`;`: the edit's pattern did not match, every guarded step was skipped, and the
notice announced a merge with empty identifiers.

# Rule

- A notice about an outcome is **its own step**, composed from a read-back of
  the target after the action — the remote ref, the PR state, the remote tag —
  and it branches on the read-back value, never on the intent.
- The merge guard takes the full object id from the PR view, and the PR's
  check (its head SHA and conclusion) is part of what is read back.
- An edit that finds nothing to change must stop the run; assert the match
  before editing.
- A refusal right after a push to a branch with required checks is usually
  the check still running, not a conflict: wait for the check, merge, read
  back.
- Before opening a PR from a scratch worktree, list the merge range's paths:
  a dependency symlink added for local gate runs is committed by a
  directory-wide add.

A reviewer who fetches the branch catches a false report at once, but it
costs a round trip and trust.
