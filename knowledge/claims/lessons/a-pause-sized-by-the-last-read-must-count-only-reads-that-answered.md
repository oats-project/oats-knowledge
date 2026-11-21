---
type: Lesson
title: A pause sized by how long the last read took must count only reads that answered
description: To meet a 3 s freshness rule the bb plugin lowered the gap between two oats status reads to max(1 s, the last read's duration); counting a failed read's duration made Retry look dead for the length of the timeout, so only an answered read lengthens the pause.
about: [workstream/provider-integration]
id: ins-7abdc00890c1
kind: lesson
tags: [bb, plugin, status, polling, freshness, timeout]
timestamp: 2026-11-21
---

# What happened

The plugin's server shares one `oats status` read among all clients and never ran two within 5 s.
A rule that a state change reaches the screen within 3 s could not be met with that floor, so the
gap became: from the end of one read to the start of the next, 1 s or the time the last read took,
whichever is longer. The guard is for a kernel that answers slowly (a status of about 10 s was seen
in a container): without it a burst of events keeps such a kernel reading without pause.

As first written the guard counted every read. After a read that timed out at 20 s, the next one
waited 20 s more: Retry on "OATS could not be read" seemed dead, every later event was 20 s late,
and a timing check failed about one run in three. A fresh reviewer found it.

# The rule

Only a read that answered lengthens the pause; after a failed read the pause is the floor. Never
two reads at once, held by a test with a hanging kernel under a burst of events. Measured after the
change, in a real run: a state change on screen about 1 s after the kernel recorded it.

# Status at acceptance (2026-11-21)

The rule is in the open [oats-project/oats-bb#19](https://github.com/oats-project/oats-bb/pull/19)
at `fadebb93`, not yet merged; `main` at `e9b74cba` still has the 5 s floor.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-21
   (oats-knowledge#455); notes/bb-plugin-status-read-floor.md.
2. oats-project/oats-bb#19 at `fadebb93`, read at maintainer review 2026-11-21:
   `plugin/server/core.ts` sets `MIN_INTERVAL_MS` to 1 s (from 5 s on `main` at `e9b74cba`),
   waits `max(MIN_INTERVAL_MS, lastTook)` after the last read ended, and sets `lastTook` only
   when the read answered (0 after a failure); `plugin/kernel/runner.ts` gives a read 20 s. The
   description records the replacement of the 5 s floor, round 1's major on the pause after a
   failed read, the tests for a slow read, a failed read and a hanging kernel under a burst, and
   about 1.0 s from the kernel's record to the plugin's snapshot in the real run. The 10 s status
   in a container and the one-in-three timing failure are the source's report.
