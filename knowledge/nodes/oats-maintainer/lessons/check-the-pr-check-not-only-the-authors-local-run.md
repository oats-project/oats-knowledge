---
type: Lesson
title: Check the PR's own check before an ACK; the author's local run is not the runner's run
description: A provider PR's check was red on every head while the author's local suite was green, because a test's skip guard threw when the runner lacked a host binary; read the PR's check conclusion and its failed log in every round, since a runner without the host's binaries is not a duplicate of a green local suite.
about: [workstream/oats-direction]
kind: lesson
id: ins-165d932aedeb
tags: [review, ci, testing, release]
timestamp: 2026-09-25
---

**Observed (2026-09-25).** A messaging-provider PR's check failed on all seven
heads of its branch. The author ran the suite locally with the real client
binary on PATH and reported green each round. The runner had no such binary;
the test meant to skip built its skip message from null output and threw. The
reviewer ACKed two rounds on the author's runs and saw the red check only when
preparing the merge.

**Rules.**
- Every round: read the PR's check conclusion; when it is red, read the
  failed log before judging the diff. "Do not duplicate a green suite" is
  about re-running, not about ignoring a different environment's result.
- A test that depends on a host binary skips on a spawn error and on null
  output, and the skip path itself is exercised once without the binary.
- The merge guard includes the check's head SHA and conclusion, not only the
  branch head.
