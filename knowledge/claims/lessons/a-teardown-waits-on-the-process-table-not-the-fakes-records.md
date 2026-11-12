---
type: Lesson
title: A test teardown that removes a fake CLI's directory waits on the process table, not on the fake's records
description: The Desktop backend exits on SIGTERM without signalling the CLI runs it launched, so a test that removes the directory a fake CLI writes into waits, after the server's exit, until no process runs from that directory; records the fake writes cannot see a run launched but not yet noted, and a full-path match misses a run under a non-ASCII parent.
about: [system/oats-desktop]
kind: lesson
id: ins-b9ac4e5525a3
tags: [desktop, testing, flake, teardown, fake-cli, processes]
timestamp: 2026-11-12
---

# What was observed

The Desktop's backend (`packages/desktop/server/oats-web.mjs`) re-raises SIGTERM and exits without signalling the
CLI children it launched. A test helper's stop that awaits the server's exit returns while an orphaned fake-CLI
run can still write into the temporary directory, and removing that directory meets `ENOTEMPTY`. This was the
cause of an intermittent after-hook failure of A6 in `packages/desktop/test/backend-request-checks.test.mjs`
(oats-project/oats CI run 43260674258).

# Waiting on the fake's records is not enough

The fake CLI's own records (a start log and whole-record appends: `settled()` and `serverRuns()` from
oats-project/oats#1893) see only runs that have noted their start. A run the server launches after start-up (a new
CLI's roster read, or the periodic roster read every 10 seconds while focused) can be executing before its first
line has run, and nothing the teardown reads names it. Waiting for runs by name closes only the runs the test
knows of. A review round reproduced the gap with the periodic read.

# What closes it

Once the server has exited it starts no run, and each run it started is already executing (a spawn returns once
the exec has). So the teardown waits, bounded, until no process names a path in the directory on its command line
(`ps -A -ww -o args=` with a fixed `PATH` and `LC_ALL`), and only then removes it. It matches a process by the
directory's own `mkdtemp` name, which is ASCII and random, not by its full path: under `LC_ALL=C`, `ps` prints each
byte of a non-ASCII path component as `?`. A second review round reproduced a live run hidden that way under a
non-ASCII temporary-directory parent.

Rejected: retrying the removal (it hides the race); killing the process group (it kills instead of waiting);
waiting for each known run by name (it misses launches the test does not track).

Regressions that each fail on the teardown they guard against: a run held mid-record across the server's stop; a
later run held after launch and before its start note; a held run under a non-ASCII parent directory.

This is another case of [a gated regression exposing a wait the first fix missed](/nodes/oats-desktop-expert/lessons/slow-the-suspected-step-on-ci.md).

# Evidence and limits

Evidence: OKF proposal from oats-engineering-expert/a6-teardown-flake-lead, 2026-11-12; notes/teardown-waits-on-the-process-table.md.

[oats-project/oats#1904](https://github.com/oats-project/oats/pull/1904) carries the fix, test-only, in that file's
`started()` teardown. Maintainer review of oats-knowledge#373, 2026-11-12, read it on GitHub: two approval comments
at head `d7cc8ff152ee` and the squash merge `5f02164ddb9d` on 2026-11-12, after this proposal was written. The
macOS named run 43268069400 ran this file once at that head and all 10 of its tests passed. Run 43260674258's first
attempt shows A6's after hook failing with `ENOTEMPTY`. The two review rounds that found the gaps are
source-reported; GitHub records only the approvals. The process-table wait relies on `ps` behaving as on the Linux
and macOS runners; other platforms are not established.

The approvals left one question open: should a stopping Desktop server end its own CLI runs? That is a product
decision, not settled here. If the server comes to signal or reap its children on exit, the cause this lesson
works around is gone; revisit it then.
