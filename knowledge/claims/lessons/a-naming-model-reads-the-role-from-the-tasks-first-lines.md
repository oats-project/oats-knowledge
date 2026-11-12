---
type: Lesson
title: A small naming model reads an instance's role from the task text only when the task states it early
description: Given only the task text, a haiku-class naming call ended the name with the right coordination role on 35 of 42 runs. Its failures came from the task, not the prompt: a person-suffixed instance name, an embedded spec of another role, a helper called a probe. The fix is that spawn tasks state the role in their first lines.
about: [system/oats-kernel, workstream/coordination]
kind: lesson
id: ins-3ccc5100b413
tags: [naming, suggest-name, prompt, probe, task-text]
timestamp: 2026-11-12
---

# The lesson

A probe made 153 calls identical to the kernel's isolated naming call (claude, haiku) on 18 tasks:

- 10 real spawn tasks of a deployment;
- 4 tasks in the coordination templates' shape;
- 4 tasks with no coordination.

Results:

- **The old prompt** asked for descriptive words only, and gave a role on 0 of 14 runs.
- **The adopted prompt** asks for `<work>-<role>` with the role as the task gives it. It got the role right on 35 of 42 runs, gave a sensible one-word role on 12 of 12 tasks with no coordination, and never went over five words.
- **Where the role sits:** every real task stated its role within its first 450 characters, well inside the kernel's 4000-character cut.

The failures were each a feature of the task:

- a task that introduces the instance by a name ending in a person keeps the person's name last;
- a review brief that embeds the developer's spec gets "developer";
- a helper brief gets "probe".

A prompt line forbidding a person's or an agent's name last gained nothing (6 of 12 on the failing tasks, the same as without it).

# What to do

- Fix a naming failure in the task, not by adding prompt rules: the spawn task says the new instance's role in its first lines ("You lead …", "You are the developer for …").
- Not checked: pi, codex, other models, and tasks not written in English.

The adopted prompt is the one [oats-project/oats#1897](https://github.com/oats-project/oats/pull/1897) puts in the kernel; it decides [the naming rule](/claims/decisions/instance-names-end-in-the-coordination-role-chosen-by-the-namer.md).

Evidence: OKF proposal from oats-engineering-expert/instance-naming-lead, 2026-11-12; notes/naming-model-reads-role-from-early-task-text.md.
