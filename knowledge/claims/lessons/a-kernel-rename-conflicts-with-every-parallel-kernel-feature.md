---
type: Lesson
title: A kernel rename conflicts with every parallel kernel feature, and its deprecations stay off --json
description: Renaming a kernel feature touches the shared lists every new feature appends to (the features list, kernel-owned home prefixes and receipts, the schema pattern, argv switch lists, the status row and the roster relay), so it conflicts with each parallel kernel PR; resolve by keeping main's side and re-applying the edit, checked with a sorted comparison of the change's lines. A deprecated alias warns on stderr after the argv check; a deprecated programmatic option warns through process.emitWarning.
about: [system/oats-kernel]
id: ins-4ea8e909fe8d
kind: lesson
tags: [kernel, rename, rebase, deprecation, json-contract]
timestamp: 2026-11-20
---

# What happened

The related-work rename (oats-project/oats#2010) was rebased over the agent's-board kernel change (#1998), which
had appended to the same lists, and hit 14 conflicts. Each was resolved by keeping main's side and re-applying the
rename's edit; the lane maintainer's [green light on #2010](https://github.com/oats-project/oats/pull/2010#issuecomment-7039702051) records the 14 conflicts and that main's board side was kept.
Then, by the source's report, a sorted comparison of the change's added and removed lines, before and after, showed
that only the board's context differed.

The compatibility layer kept `--same-work` as an alias. Its deprecation line is printed at dispatch, after the
argv check, so a refused command never prints it, and the `--json` envelope stays the new spelling's. The library's
`sameWork` option warns once through `process.emitWarning` as a DeprecationWarning with a code. That goes to stderr
only, and a test catches it through `process.on("warning")`.

# How to apply

Expect a rename to conflict with every open kernel feature PR. Rebase with that comparison, not by reading the
merged file. Never print a deprecation into a JSON answer.

The alias rule itself is part of the kernel contract recorded in
[related work binds the recorded parent, else the recorded sibling](/nodes/oats-maintainer/decisions/related-work-binds-parent-else-sibling-and-keeps-old-spellings.md)
(`dec-4034b6ca6513`); this lesson adds only how such a layer is built and rebased.

Evidence: OKF proposal from oats-engineering-expert/sidebar-collapsed-sibling-lines-lead, 2026-11-20. oats-project/oats#2010 (merged 2026-11-20, `de654633`), compatibility-layer commits 37cb7c2be and d848d51ac.
