---
type: Lesson
title: The kernel's CI fails a test file that lets the SSH control-socket warning through, and a long TMPDIR is what triggers it
description: CI's temporary path is over the test runner's SSH socket budget, so a test whose fake host routes over SSH prints the connection-reuse warning in CI only, and the pristine-output gate fails the file although it passed locally under /tmp. Such a test takes io.warn and asserts the warning; reproduce it locally with a long TMPDIR.
about: [system/oats-kernel]
kind: lesson
id: ins-fe4e7a9e7514
tags: [ci, tests, ssh, routed-commands, sandboxes]
timestamp: 2026-11-20
---

# What happened

S1's branch (oats-project/oats#2025, 2026-11-20) passed the test files run locally
and failed in CI with no behaviour change [1]. CI's temporary path is long enough
that the SSH control socket's path passes the Unix socket length limit. The route's
"runs without connection reuse" warning then printed from two sandbox test files,
and the pristine-output gate failed them although every test passed. The fix gave
their fake hosts' io a `warn` that takes the warning and asserts it is that warning
and no other, as `test/instance-background.test.mjs` already did.

The same branch hit two other gates that fail only on a new command or a new answer
field [2]: `test/golden-fixtures.test.mjs` (a new answer field changes the spawn
goldens) and `test/command-flags-docs.test.mjs` (a new command needs its row in
`docs/desktop-cli-api.md`'s command-flags table, and a usage line naming only its
own flags).

# The lesson

The repository documents the gate and the socket budget (`docs/implementation.md`,
"Test output is pristine" and the per-file temporary directory rules), and advises a
`TMPDIR` of `/tmp` when a run is over budget. What it doesn't say is that CI's runs
are over it [1], so a local run under `/tmp` can't show the warning. A test whose fake host
routes over SSH captures and asserts the warning from the start.

Before pushing a routed or sandbox command, run the goldens and command-flags-docs
files (within the repository's local limit of one or two test files), and reproduce
the warning locally with a long `TMPDIR` rather than waiting for CI, as the fix's
commit did [1]. The source reports `TMPDIR=$(mktemp -d /tmp/ot-XXXXXX)/152` as its
recipe; the runner's own rules for where a run's directory goes and how long its
socket path may be are in `docs/implementation.md` [3].

This is knowledge debt: a fake-host test helper that takes and asserts the route
warning by default would remove the trap. It refines, for CI, [shorten SSH fixture
paths without moving nested runs beyond the guard](/nodes/oats-kernel-expert/decisions/ssh-fixture-paths-preserve-nested-run-visibility.md),
which chose a visible failure under an over-budget `TMPDIR`.

# Citations

Evidence: OKF proposal from oats-engineering-expert/sandbox-architecture-lead,
2026-11-20; notes/ci-pristine-output-and-long-tmpdir.md.

1. [2205db08](https://github.com/oats-project/oats/commit/2205db08c639022935ded7af728c7670228316fe),
   "Sandboxes tests: capture the route's connection-reuse warning (#2025 CI)".
2. [661f0085](https://github.com/oats-project/oats/commit/661f00850e20994c0f9a78a6c391d2567ec75e85),
   "Sandboxes: CI's command reference and spawn goldens (#2025)".
3. [docs/implementation.md](https://github.com/oats-project/oats/blob/main/docs/implementation.md),
   "Tests and gates": the pristine-output rule and the SSH socket budget.
