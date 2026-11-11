---
type: Lesson
title: On Node, a Map or Set keyed by long untrusted text is quadratic; key through a bounded key
description: A Map, Set or object keyed by text from a base or a committed index (types, kinds, ids, legacy-node names, about and supersedes items) is quadratic when many keys exceed 16383 characters, because V8 hashes such strings by length alone (measured: 3,000 distinct 20,000-character keys, 10.4 s); key untrusted text through a bounded key (the text up to 16,000 characters, else a tagged sha256) and filter references against short trusted keys before building a set.
about: [system/oats-okf]
kind: lesson
id: ins-0a8ae201a953
tags: [lesson, okf, node, v8, performance, map, untrusted-input]
timestamp: 2026-11-11
---

# What V8 does

V8 does not hash strings longer than 16383 characters by content; it hashes them by length. Many distinct long keys
therefore collide into one bucket and every lookup degrades to a linear scan: 3,000 distinct 20,000-character keys
took 10.4 s on the host's Node.

# Where it bites

Any index keyed by text read from a base or a committed generated index: types, kinds, ids, legacy-node names,
`about:` and `supersedes:` items. Linear parsing does not bound the work; the keys do.

# The rule

Key untrusted text through a bounded key (oats.okf's `textKey`: the text itself up to 16,000 characters, else a
tagged sha256 of it), and filter references against short trusted keys before building a set from them.

# Why it stays a lesson

`textKey` covers the indexes built today. A new Map, Set or object keyed by base text is guarded only by this rule,
and by review, until a test with long distinct keys covers it.

# Evidence

- oats-okf #132 (merged 11 November 2026, released in 6.0.0). Source-reported (the proposer's backing note): in
  review round 11 a 60 MB index stalled a Map, and the 10.4 s figure was measured on the proposer's host.
- Maintainer check at acceptance (11 November 2026): re-measured on Node 26.12.1, 3,000 distinct keys took 37 ms at
  16,000 characters and 12.9 s at 20,000 characters. In 6.0.2, `textKey` in `lib/okf-reindex.mjs` passes text of up
  to `KEY_CHARS` (16,000) characters through with a `=` tag, and replaces longer text with a `#`-tagged sha256.
  `lib/write-surface.mjs` keys `legacy-nodes` and `supersedes` through it, and `test/okf6-subjects.test.mjs` has the
  2,500 long distinct types regression. The threshold is measured, not read from V8's source.
