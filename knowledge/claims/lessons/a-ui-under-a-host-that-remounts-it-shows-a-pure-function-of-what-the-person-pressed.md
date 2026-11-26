---
type: Lesson
title: A plugin's view under a host that remounts it must show a pure function of what the person pressed, with nothing derived from what was read
description: Where a host app may mount a plugin's view twice, share one memory across views and hold answers across mounts, any rule of the form "open on X where the data says Y" or "draw X only where there is Z" makes the view change under a reader; a transition table did not converge there, and removing the state did.
about: [workstream/provider-integration, workstream/coordination]
kind: lesson
tags: [bb, plugin, side-panel, remount, state, review-loop, convergence]
timestamp: 2026-11-26
---

# What was observed

A plugin's panel inside bb-app 0.50.1 had tabs, one of which opened by itself when the agent had an open question, and two of which were drawn only where there was something behind them. Four fresh review rounds each found a new path where the tab shown changed with no press: the host mounts a side panel's content twice now and then (see the accepted lesson on that), keeps one tab memory for every agent's panel, and its query client holds an answer from an earlier visit. What a mount KNOWS (is the board read yet, has it a question, is mail known) differed between the two mounts of one opening.

The first remedy was the accepted one for record-state defects: the shown tab became a state with a table of four named transitions. Two more rounds still found majors, each a way the host's behaviour made one of the transitions fire twice or on stale data.

It converged only when the behaviour was removed: the panel never chooses a tab by itself; every tab is always drawn, and a tab with nothing behind it says so in two words; what a panel shows is one line: the tab of the last press, read from one value in the window's store. A reviewer then walked random sequences of presses and remounts over two panels against that one line as its oracle and found nothing.

# The rule

- Under a host you do not control, a view holds no state derived at a mount from what was READ. What it shows is a pure function of what a person pressed.
- Do not draw a control conditionally on a read where its presence decides anything else. Draw it always and let it say "nothing here".
- A screen never moves under a reader: what leads a person somewhere is a press, and the focus lands on the thing to read, never on a control that sends or acts.
- When a transition table does not converge after a round or two, the state itself is the defect: ask what happens if it is deleted.
- A store's value that a press changes only in part must still be replaced whole, or its readers do not draw the press.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-26; notes/host-remounts-panel-state.md.
2. oats-project/oats-bb#115 (merged 2026-11-26): its body's "Review" section tells the four rounds and the delta reads; plugin/app/panel/tab-state.ts on main is the one line.
3. Refines /claims/lessons/a-review-loop-that-keeps-finding-state-defects-converges-with-a-transition-table.md (that remedy holds for records the code alone moves; here the host moved them) and builds on /claims/lessons/bb-mounts-a-plugins-side-panel-twice-when-a-thread-opens-with-it-shown.md.
