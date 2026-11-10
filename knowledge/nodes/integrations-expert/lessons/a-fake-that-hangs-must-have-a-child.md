---
type: Lesson
title: A fake CLI that hangs must start a child of its own
description: A single-process hang fake hides descendant leaks, so timeout and reader-termination tests must observe both the fake and its child on every external-CLI call path.
about: [workstream/provider-integration]
kind: lesson
id: ins-87a6e2593242
tags: [integrations, testing, fake-cli, process-groups, timeout, signals]
timestamp: 2026-10-19
---

# Discovery and consequence

A fake that hangs alone makes direct-child termination look like complete
cleanup. It cannot reveal a caller that returns on timeout while the CLI's
child keeps running. **Model the descendant that could leak, not only the
process the caller starts.** The hang fake starts a child of its own and
records both PIDs so the test can observe their lifetimes independently.

The source's 2026-10-19 integration review found that an existing JSON read
already had process-group handling and a hang-with-child test, but two later
read paths used Node's `spawnSync` timeout. Reusing the fake against those
paths exposed a surviving descendant after timeout; sending SIGTERM to the
reader left both the fake and its child alive. The proposal reports repairing
each read's process-group handling and adding both kinds of test per path.

The lasting lesson is the false confidence from testing only the first
caller or only a single-process hang. A passing test on one read path is not
evidence for another path that starts the same CLI. When adding a caller,
exercise it against the hang-with-child fake under both its timeout and
SIGTERM to the reader, checking that neither recorded process remains alive.
A returned timeout error alone is not the cleanup assertion.

# Elimination route and limits

Put lifecycle handling in a shared reader where feasible, and keep the
hang-with-child fixture and per-entry-point timeout/interruption regressions
in executable tests. A new call path must join that coverage rather than
inherit a passing verdict from an older caller. This is the route for
eliminating the defect; remembering the lesson is not its repair. Signal and
cleanup targets must remain test-owned.

This adds a test-modeling constraint to
[real-binary acceptance](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md),
not a replacement for it. The fake proves only its exercised process topology
and interruption cases, not every descendant arrangement or uncatchable
termination. The kernel's
[terminal signal lesson](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md)
remains the home for signal-lifetime and process-group reasoning; this lesson
does not prescribe a new kernel contract or a portable synchronous API fix.

# Citations

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy, 2026-10-19; notes/a-fake-that-hangs-must-have-a-child.md.

The source attributes the finding and repair to oats-omarchy #11, review
round 1. The failure and regression results are source-reported; this harvest
verified the captured note's hash, not the implementation or execution of
those tests.
