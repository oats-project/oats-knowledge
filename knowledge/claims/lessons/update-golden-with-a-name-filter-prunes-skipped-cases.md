---
type: Lesson
title: Re-approving goldens with a test-name filter deletes the goldens of every case it skipped
description: A full `UPDATE_GOLDEN=1` run of test/golden-fixtures.test.mjs deletes the whole golden tree before it writes, so with `--test-name-pattern` only the matched cases come back; scope the update with `UPDATE_GOLDEN_ARTIFACT`, which deletes nothing, or restore the rest from HEAD and re-verify before committing.
about: [system/oats-kernel]
kind: lesson
id: ins-b7b08a6dfb5b
tags: [kernel, tests, goldens, local-gate]
timestamp: 2026-11-13
---

# Lesson

The oats repository's local gate allows one or two test files, so re-approving only the golden cases a change touches is the natural move. `UPDATE_GOLDEN=1 node --test --test-name-pattern="golden: .*-workspace-" test/golden-fixtures.test.mjs` rewrote the 8 matching cases and also deleted the golden files of every case the filter skipped (268 files changed, about 26,000 lines removed). The cause is deliberate for a full run: without `UPDATE_GOLDEN_ARTIFACT` the file removes the whole golden root first, so a removed case cannot leave an orphan; a name filter then writes back only the cases it ran. The test's header documents `UPDATE_GOLDEN` and `UPDATE_GOLDEN_ARTIFACT`, not this interaction.

**How to apply:** for a filtered re-approval, set `UPDATE_GOLDEN_ARTIFACT` to each artifact the change touches (for example `AGENTS.md`, then `TASK.md`): an artifact-scoped update deletes and rewrites no other golden, and still verifies the matched cases' other artifacts. If a filtered run without it has already happened, `git checkout HEAD --` every golden directory outside the filter, run the filtered cases again without `UPDATE_GOLDEN`, and check that `git status` lists only the intended cases' files.

**The real fix is code:** the harness could skip the wipe, or refuse, when a name filter is active. Until it does, this lesson stands in for that check.

**Also grep the tests for the phrase you change.** A changed kernel-composed phrase can be pinned by a literal outside the goldens too: `test/capabilities.test.mjs` pinned the old workspace wording ("never edit or commit inside them") and failed only in CI.

Evidence: OKF proposal from oats-engineering-expert/workspace-mode-worktrees-lead, 2026-11-13; notes/update-golden-with-name-filter-prunes.md.
