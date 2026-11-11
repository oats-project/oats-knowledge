---
type: Lesson
id: ins-2ba87c00f079
title: The frontmatter scalar reader strips one leading and one trailing quote independently
description: The 5.8 frontmatter parser, and the 6.0 regenerator and validator that keep its scalar rule, strip `^["']` and `["']$` separately, so a title or description that begins or ends with a quoted phrase loses one quote in every reader and generated view (`title: "A" b` reads `A" b`); a tool generating from frontmatter must parse values exactly as the reader does, and an affected concept is fixed by a content edit, never by a generator-side repair.
about: [system/oats-okf]
kind: lesson
tags: [lesson, okf, frontmatter, parser, regenerator, validator, views]
timestamp: 2026-11-10
---

# The rule the reader applies

The scalar reader strips one leading quote and one trailing quote as two independent steps. A value that is fully
quoted reads correctly; a value that starts or ends with a quoted phrase but is not fully quoted loses exactly one
quote: `title: "A" b` reads `A" b`. Every reader of the base (5.8 consult, the 6.0 validator, the 6.0 regenerator's
views) agrees with itself and disagrees with a tool that parses the value differently.

# Consequences

- A generator, verdict lane or validator over frontmatter parses values as the reader does (comments and quotes
  included), or its output disagrees with what instances read.
- An affected concept (three accepted titles on the OATS base at the time) is repaired by editing its frontmatter,
  never by special-casing the generator, which would make the views differ from the readers.

# Evidence

Bridge PR review rounds 1–2 (two reviewers independently), 10 November 2026; `parseFrontmatter` in 5.8.0's
`lib/okf-validate.mjs`; the 6.0 regenerator's views show the same stripped titles. Verified on 5.8.0 and the 6.0 build. Maintainer check at
acceptance (11 November 2026): 6.0.2's `lib/okf-reindex.mjs` applies `/^["']|["']$/g` and 6.0.2's `lib/okf-validate.mjs`
imports its `parseFrontmatter`; the OATS base then held three titles and one description that start or end with a
quote without being fully quoted.
