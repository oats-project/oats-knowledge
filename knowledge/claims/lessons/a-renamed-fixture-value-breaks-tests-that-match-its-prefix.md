---
type: Lesson
title: "Renaming a shared test fixture's value breaks tests that match its prefix, not only its literal"
description: "In the Desktop tests a fixture shared by many tests is asserted by pattern as well as by value; a soul renamed in sidebar-slice1's remote() passed three review rounds and failed CI in a test matching /^oats-/. Grep for anchored regexes and startsWith on the old value's prefix before renaming, and assert a row's own fixture value."
id: ins-29b44bd0e2bd
about: [system/oats-desktop]
kind: lesson
tags: [tests, fixtures, ci, desktop]
timestamp: 2026-11-22
---

# What happened

A pull request replaced a deployment's real soul and host in the Desktop's sidebar fixtures
(`remote()` in `packages/desktop/test/sidebar-slice1.test.mjs`) with generic names, and updated
every assertion that named the old values. Three fresh review rounds approved it. CI then failed
one test of the same file that asserted the second line of each row with `/^oats-/`: the old soul
happened to start with `oats-`, the new one did not.

# What to do

- Before renaming a value in a shared fixture, grep the files that use it for anchored regexes,
  `startsWith` and other prefix or suffix matches on the old value, not just its literal.
- Where a test asserts a row's text, assert that row's own value, not a prefix it shares with
  others by chance.

# Why it matters

The Desktop's suite is not run locally (the oats repository's `AGENTS.md`: pull-request CI is
the test run), so a missed pattern shows only in CI, and it costs a head move and a new review
read at the new head.

# Elimination route

Tests that read the expected value from the fixture (`remote(name).agent`, or the row's own
agent) instead of repeating a literal or a shared prefix cannot break this way; the delta review
of the fix suggested it as an optional nit, and the fix itself still names the souls as literals.

# Citations

1. [oats-project/oats#2100](https://github.com/oats-project/oats/pull/2100), merged 2026-11-22:
   commit `8581d51a` renames `remote()`'s soul; rounds 1 to 3 approve (round 3 at `bd64ab7a`, no
   findings); commit `77cb9695` replaces `assert.match(..., /^oats-/)` in "slice3d harness mark on
   line 2" with `startsWith(soul)`; the delta review at `77cb9695` carries the fixture-read nit.
   Read at maintainer review 2026-11-23.
