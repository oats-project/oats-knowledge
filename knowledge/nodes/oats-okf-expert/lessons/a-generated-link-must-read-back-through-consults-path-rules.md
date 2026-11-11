---
type: Lesson
title: A generated Markdown link must read back its own file through consult's path rules
description: `resolveBasePath` cuts a path at `?` and `#` and decodes `%`, so a generated index never links a path holding one of them (`E_PATH` at generation); otherwise an index entry silently resolves to a different claim than the one it names.
about: [system/oats-okf]
kind: lesson
id: ins-1cd2d7c4333d
tags: [lesson, okf, regenerator, consult, links, paths]
timestamp: 2026-11-11
---

# The mismatch

Generated views are Markdown links that instances follow with `oats okf cat`. Consult resolves a link's path with the
same rules as any citation: it cuts at `?` and `#` and percent-decodes. A file whose name holds one of those
characters is reachable in the tree yet the link to it resolves elsewhere, or to nothing, without an error.

# The rule

The regenerator refuses to link such a path (`E_PATH`, naming the file) rather than emit a link that reads back to
a different claim; names with spaces, parentheses and angle brackets are likewise never linked. A round-trip test
follows every generated link through consult's resolver.

# Why it stays a lesson

The regenerator and its round-trip test enforce this for the generated indexes. Any other code that emits base links
for instances to follow (a new view, a verdict or a brief) needs the same round trip.

# Evidence

- oats-okf #132 (merged 11 November 2026, released in 6.0.0): its body lists the paths that are never linked
  (`E_PATH`). Source-reported (the proposer's backing note): a reviewer's probe showed a wrong claim behind a link.
- Maintainer check at acceptance (11 November 2026), in the oats.okf 6.0.2 source: `resolveBasePath` in
  `lib/consult.mjs` drops everything from the first `?` or `#` and then percent-decodes. `lib/okf-reindex.mjs` refuses
  to link a path holding whitespace, parentheses, angle brackets, `?`, `#`, `%` or `\` (`E_PATH`).
  `test/okf6-subjects.test.mjs` asserts that every generated link resolves through `resolveBasePath` to its own
  existing file.
