---
type: Lesson
title: Ten parallel developers and their reviewers on one laptop overloaded its CPU, the GitHub token and the mail path; size parallelism to the host
description: Ten developers plus reviewers, each running live Electron checks, pushed a 16-core laptop's load to 57, exhausted the shared GitHub token's 5000 requests an hour, and let delivered mail be marked read unseen, so decisions crossed and flipped.
id: ins-338892c1950d
about: [workstream/coordination]
kind: lesson
tags: [coordination, parallelism, host, github, rate-limit, mail, pi]
timestamp: 2026-11-20
---

# What happened

To make a morning deadline, the lead ran up to ten developers at once (plus a reviewer each), all on
one laptop and one GitHub token:

- the load reached 57 on 16 cores, and messages arrived late;
- PR watchers polling every two minutes, plus `gh run watch` (3 s polls), used up the token's 5000
  requests an hour;
- on pi, delivered mail was sometimes marked read without being presented. Instructions looked unsent;
  answers crossed, and the same decision flipped twice (a key binding, a trimming rule).

# The lesson

- Size the tree to the host: a few concurrent Desktop developers per laptop, staggered live checks.
- One PR watcher per PR at five minutes or slower, by its developer, not also the lead.
- In each thread, restate a decision in full rather than "as I said". Say "final" when it is, and
  reconcile with `aw mail inbox --show-all` at task boundaries.
- Expect a child to look silent while one long tool call runs. Check its pane before replacing it.

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-19 to 20; notes/pi-mail-delivery-marks-read.md.
