---
type: Lesson
title: midTask in a stop plan means reported activity, never a running turn
description: The kernel's stop plan sets midTask true for a running harness or uncommitted work: an idle tmux agent reads true, and a provider home reads its provider's running (harness alive), so a client that words midTask as 'in the middle of a task' over-warns; word it from the plan's work facts and the client's own turn reading.
about: [system/oats-kernel]
kind: lesson
id: ins-3532f055a76f
tags: [stop-plan, midTask, clients, wording]
timestamp: 2026-11-24
---

# What was observed (OATS 0.70.5, 2026-11-23)

lib/instance-lifecycle.mjs planStop: "`midTask` is REPORTED activity: dirty work or a running session"; a tmux pane
running its harness is activity; a provider home reads its provider's `running`, which the bb contract defines as
harness alive. After oats-bb began reporting `running: true` for an idle loaded harness, the bb plugin's Stop dialog
warned "in the middle of a task" for every idle bb agent. The kernel's desktop-cli-api.md, which says a provider home's
`midTask` is "true when it runs a turn", is wrong for such a provider.

# What follows

The plan's target carries `work` (observed, changed, untracked) beside `midTask`. A client says "uncommitted work"
from those, "working on a turn" only from its own turn reading (bb's thread status), and nothing for a running
session with neither. Turn activity reported by providers apart from `running` would be a contract addition.

# Citations

1. oats-project/oats `lib/instance-lifecycle.mjs` `planStop` at v0.70.5: "`midTask` is REPORTED activity: dirty work or a running session".
2. oats-project/oats `docs/desktop-cli-api.md`, the stop plan's `midTask`: "`true` when it runs a turn", still so on main at v0.70.7 (2026-11-24). Correcting that sentence in the kernel's docs is the elimination route for this lesson.
3. oats-project/oats-bb `plugin/WORDS.md` (the Stop dialog's "in the middle of a task" line NOT KEPT, worded from facts instead) and `plugin/README.md`, read on main, 2026-11-24; the plugin's change is oats-bb#64.
4. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
