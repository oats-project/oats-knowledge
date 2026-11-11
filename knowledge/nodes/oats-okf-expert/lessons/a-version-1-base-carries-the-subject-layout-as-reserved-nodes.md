---
type: Lesson
title: A version-1 base carries the subject layout as reserved nodes, so 5.8 readers keep working unchanged
description: The subject layout is announced by three reserved nodes (`claims`, `subjects`, `verdicts`) under a sentinel owner, extra frontmatter keys and generated Markdown views, not by a new `okf-base.json` key or a data file, because 5.x refuses unknown keys in `okf-base.json` and any non-Markdown file in a node, and every 5.x home reads the same accepted branch as a 6.x home; the bridged OATS base passed 5.8.0's strict validator and consult unchanged.
about: [system/oats-okf]
kind: lesson
id: ins-9d679af15f64
tags: [lesson, okf, subject-layout, compatibility, okf-base, reserved-nodes]
timestamp: 2026-11-10
---

# The constraint

5.x refuses unknown keys in `okf-base.json` (only `version`, `id` and `nodes`) and any file in a node that is not
Markdown, and every 5.x home reads the same accepted branch as a 6.x home. A subject layout therefore cannot announce
itself with new metadata keys or data files without taking every 5.x reader off the base.

# The shape that works

Three reserved nodes (`claims`, `subjects`, `verdicts`, path = name) under the sentinel owner
`00000000-0000-0000-0000-000000000000`; `about:`, `kind:` and `id:` as extra frontmatter keys on existing concepts;
generated views as ordinary Markdown. A 6.x reader detects the layout by the reserved node names, exactly so (a base
with only some of them is plain). The same move has a cost outside the package: the base's own CI pinned the node
roster ([the base's own CI pins the node roster](/nodes/oats-okf-expert/lessons/the-oats-bases-own-ci-pins-the-node-roster.md)).

# When it bites

Any later change to the base's shape that 5.x homes still read, such as an `okf-base.json` version 2: it either
keeps to this shape or waits until no 5.x home reads the base.

# Evidence

- The bridge PR on this base, oats-knowledge #342 (merged 10 November 2026): its body records the 5.8.0 validator,
  strict, 0 errors and 0 warnings on the bridged base, and the 5.8.0 consult CLI rehearsal giving identical output
  before and after.
- Maintainer check at acceptance (11 November 2026): in oats.okf 5.8.0, `lib/config.mjs` refuses `okf-base.json`
  keys other than `version`, `id` and `nodes` and any non-`.md` file in a node (`E_BASE`); in 6.0.2,
  `lib/okf-reindex.mjs` classifies the layout by `RESERVED_NODES` with path = name and the sentinel owner, and the
  README's "The subject layout" states that 5.8.0 accepts a bridged base.
- Backing note: the proposer's note on the version-1 base and reserved nodes (proposal of 11 November 2026, live
  source kb-by-subject-okf-expert).
