---
type: Lesson
title: Anything that newly parses a value every base carries must be linear in the input
description: A new parse of a value 5.8 treated as an opaque scalar runs on every base, plain ones included, inside a fixed 30 s validation deadline, so it must be linear: 5.8's own comment strip (`/\s+#.*$/`) is quadratic on a long whitespace run with no `#` (10k spaces 310 ms, 30k 1052 ms, 100k over 3 s), a sticky regex with overlapping branches worse; write cursor scanners and test them for exact equivalence against the old regex.
about: [system/oats-okf]
kind: lesson
id: ins-8693f38d3d4e
tags: [lesson, okf, validator, parser, performance, regex, deadline]
timestamp: 2026-11-11
---

# The constraint

Validation has a fixed deadline (30 s) and runs over every base a deployment binds, bridged or plain. A parser added
for the subject layout (flow lists, `about:`, kinds) therefore runs on content it was never meant for, including
adversarially long scalars a committed index may carry.

# What was found

5.8's comment strip `/\s+#.*$/` is quadratic on a long whitespace run without `#`: 10k spaces 310 ms, 30k
1052 ms, 100k over 3 s (a reviewer's timing on the host). A sticky regex with overlapping branches was worse.

# The rule

Cursor scanners, linear in the input, with an exact-equivalence test against the regex they replace (200k-character
inputs in the suite). Linear parsing alone does not bound the work when keys are long (see the lesson on long keys).

# Why it stays a lesson

The suite bounds today's parsers. Nothing stops the next parser from adding a quadratic regex, so this rule guards
new parsing of base text until the suite has a time-bounded test for every new reader.

# Evidence

- oats-okf #132 (merged 11 November 2026, released in 6.0.0). Source-reported (the proposer's backing note): the
  reviewer's timings in review rounds 1-5 and 11, and the result that a sticky regex with overlapping branches was
  worse.
- Maintainer check at acceptance (11 November 2026): the regex is in 5.8.0's `lib/okf-validate.mjs` (the frontmatter
  key-value line). Re-timed on Node 26.12.1, it took 114 ms for 10k spaces, 1,007 ms for 30k and 12.2 s for 100k, which
  is quadratic. In 6.0.2, `validateBase` (`lib/stores.mjs`) runs the validator as a child process under `exec`'s
  default 30 s timeout (`lib/io.mjs`), and `test/okf6-subjects.test.mjs` feeds the readers 200,000-character inputs.
