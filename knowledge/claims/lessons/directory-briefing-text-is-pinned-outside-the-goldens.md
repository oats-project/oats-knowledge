---
type: Lesson
title: Directory-mode briefing text is pinned outside the goldens, in the trigger fixture and the Desktop inspect fixtures
description: No golden composes directory mode, so a change to injects/work-directory.md or the directory TASK.md line is caught by test/fixtures/trigger-pipeline-13 (re-record, then word-diff) and by six Desktop inspect fixtures (align by hand, run packages/desktop/test/inspect-fixture-briefings.test.mjs locally); both before the first push.
about: [system/oats-kernel, system/oats-desktop]
kind: lesson
id: ins-6e6b67714008
tags: [kernel, desktop, tests, fixtures, work-modes, local-gate]
timestamp: 2026-11-13
---

# Lesson

`test/golden-fixtures.test.mjs` composes the worktree, checkout, attached and workspace modes, never directory, so the goldens say nothing about a directory-mode text change. Two other recordings do:

- **`test/fixtures/trigger-pipeline-13/*.json`** records each trigger home's TASK.md byte for byte, and the trigger homes are directory mode. A change to the directory TASK.md line fails it. Re-record with `OATS_RECORD_TRIGGER_FIXTURE=1 node --test test/trigger-pipeline-fixture.test.mjs` (its header allows it for a reviewed change that means to change outputs), then check with `git diff --word-diff=porcelain` that only the intended words moved.
- **`packages/desktop/test/inspect-fixture-briefings.test.mjs`** compares every composed `work-mode:directory` block in the Desktop's fixtures with `injects/work-directory.md` itself. There is no generator: replace the JSON-escaped old block with the new one in each fixture that holds it.

Neither file is one a directory-briefing change obviously touches, so in oats-project/oats#1933 the Desktop one was first found by CI (its Desktop job and a kernel test shard), costing a round. Both are one test file each, inside the local gate: run them before the first push.

The elimination route is code: a directory case in the golden matrix (`WORK_MODES` in `test/golden-fixtures.test.mjs`), or a generator for the Desktop fixtures' composed blocks. Neither exists at oats `f4b78f9a`; this lesson stands until one does.

Evidence: OKF proposal from oats-engineering-expert/directory-mode-trees-lead, 2026-11-13; notes/directory-mode-trees-share-the-workspace-section.md.
