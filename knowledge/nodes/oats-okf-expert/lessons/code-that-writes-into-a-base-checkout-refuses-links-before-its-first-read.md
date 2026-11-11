---
type: Lesson
title: Code that writes into a base checkout refuses links and non-regular files before its first read
description: Any oats.okf path that writes into a base checkout (the regenerator, `propose --check`'s preparation) walks the whole tree first and refuses symlinks, non-regular files, multiply-linked files and names holding a backslash, then writes through a fresh temp file renamed in place; the consumer's strict validation runs too late to protect a write, because the maintainer regenerates a PR checkout before validating it; `okf-base.json` is read only as a regular single-link file, never through a link or a FIFO.
about: [system/oats-okf]
kind: lesson
id: ins-5c27ed7216f9
tags: [lesson, okf, regenerator, propose, checkout, symlink, custody, review]
timestamp: 2026-11-11
---

# Why the walk comes first

The strict validator (`validateBase`) refuses links, but it runs on the result. A writer that trusts the checkout it
is about to modify can follow a symlink or a hard link out of the base and overwrite a file elsewhere, or be fed a
FIFO. The maintainer regenerates a PR's checkout before validating it, so the write happens on untrusted content.

# The rule

Every writing path walks the tree first (refusing symlinks, non-regular files, multiply-linked files, names with a
backslash), writes each file through a fresh temporary file renamed in place, and reads `okf-base.json` only as a
regular single-link file. A regression test plants an outside marker behind a link and asserts its bytes unchanged.

# Why it stays a lesson

The regression covers today's two writers, the regenerator and `propose`'s preparation. A new path that writes into
a base checkout is guarded only by this rule until it calls `assertSafeTree` first and is added to that test.

# Evidence

- oats-okf #132 (merged 11 November 2026, released in 6.0.0). Source-reported (the proposer's backing note; the
  review rounds are not on the GitHub record of #132): in review rounds 1-5 a reviewer's probe overwrote an outside
  marker through a link before the fix.
- Maintainer check at acceptance (11 November 2026), in the oats.okf 6.0.2 source: `assertSafeTree` in
  `lib/okf-reindex.mjs` refuses names with a backslash, symlinks, non-regular files and files with more than one link
  before any read. `writeInBase` writes through a fresh temporary file renamed over the target. `okf-base.json` is
  refused unless it is a regular single-link file. The regression `the regenerator and propose refuse ... (E_PATH)
  and write nothing outside the base` in `test/okf6-subjects.test.mjs` runs for both the CLI and propose's
  preparation, and asserts that the outside files are unchanged.
