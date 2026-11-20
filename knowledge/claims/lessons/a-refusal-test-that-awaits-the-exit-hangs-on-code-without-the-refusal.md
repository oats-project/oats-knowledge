---
type: Lesson
title: "A test of a start-time refusal that awaits the exit hangs, not fails, on code without the refusal"
description: "A test that asserts a process refuses at start by awaiting its exit never settles on code that lacks the refusal, because that code starts its children and runs; give the test its own timeout, and prove 'fails on the old code' under a timeout, checking for fixture processes left behind."
about: [workstream/coordination, system/oats-kernel]
kind: lesson
id: ins-a3f18e2f96ac
tags: [tests, refusals, timeouts, review, fixtures]
timestamp: 2026-11-20
---

# What happened

A change made the team image's supervisor refuse a damaged token file before starting any child.
Its test started the supervisor fixture, awaited the exit code and asserted "exit 1, no child, one
fixed line". The spec asked that the test fail on the old code.

On the old code the supervisor does not refuse: it starts its children and runs until it is told
to stop. The awaited exit never comes, so no assertion ever runs. The repository's test runner sets
no timeout. By the source's report, the author's own old-code check ran into the tool's command
limit after fifteen minutes and left one detached fixture child running, and the first reviewer's
check did the same. The reviewer ranked it minor: a regression would show as a stuck run, not as a
failed assertion.

# What to do

- Give a test of "refuses at start" a bound of its own (here `{timeout: 20_000}` on a test that
  takes 0.2 s when healthy), or race the awaited exit against the first sign that a child started
  and assert on that. Then code without the refusal ends the test as failed or cancelled by itself.
- When you prove "fails on the old code" by hand, run it under `timeout <seconds>`, and look for
  fixture processes afterwards: a run killed from outside skips the fixture's own cleanup.
- A reviewer's brief that asks for that proof says the same, so the reviewer's check does not leave
  processes either.

The same shape hides in any existing test that awaits an exit after an expected refusal; the
reviewer pointed at one neighbour and left it, as outside the change.

# Elimination route

A per-test bound repairs one test. What removes the trap is a default bound in the runner:
`node --test` takes `--test-timeout`, and `scripts/run-tests.mjs` passes none, so every test that
awaits an exit is unbounded until it names its own. Until the runner has a default, this lesson is
knowledge debt: the bound is the author's to add, test by test. A bound ends the test; it does not
end fixture processes a killed run leaves, so the check for leftovers stays.

What a hanging fake must model is a different question, answered in
[A fake CLI that hangs must start a child of its own](/nodes/integrations-expert/lessons/a-fake-that-hangs-must-have-a-child.md).

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-20;
   notes/refusal-test-hangs-on-old-code.md.
2. [oats-project/oats#1997](https://github.com/oats-project/oats/pull/1997) (open, unmerged) at
   `523ab4f2f`, read at maintainer review 2026-11-20: `test/agent-container.test.mjs`, "a token file
   with whitespace inside the token fails the start before any child, and never shows the value",
   carries `{timeout: 20_000}` and the comment that on a supervisor without the refusal the awaited
   exit never settles; that commit's message records the round-1 minor finding (the test hung
   instead of failing); `scripts/run-tests.mjs` passes no `--test-timeout`. The fifteen-minute
   runs, the fixture child left behind and the cancelled old-code run under the bound are the
   source's report.
