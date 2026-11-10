---
type: Lesson
title: A test harness must reproduce a known-good baseline before any delta it reports means anything
description: An isolated copy of a project can fail for environmental reasons that have nothing to do with the change under test, so run the unmodified control first and require it to match the trusted result.
about: [workstream/oats-direction]
kind: lesson
id: ins-15aab98fde8f
tags: [lesson, testing, verification, methodology]
timestamp: 2026-09-21
---

Learned 2026-09-21 by a maintainer evaluating a change in an isolated copy.

Evaluating a change in isolation means building a second environment, and a
second environment is itself untested. If it is missing something the real
one has (installed dependencies, a path, a binary) the suite fails for
reasons unconnected to the change. Those failures look exactly like the
change being catastrophic.

So run the control first: the unmodified code, in the new environment, and
require it to reproduce the result you already trust. Only then is a
difference attributable. A control that disagrees with the known-good
baseline means the harness is broken, and nothing measured in it counts
until that is fixed, including a result that happens to look reassuring.

Two traps make a control silently useless:

- **Restoring from a dirty index.** A three-way apply stages its changes,
  and restoring the working tree from the index then keeps them. The
  "control" still contains the patch. Reset to the commit, then confirm the
  tree is clean before running.
- **Matching failure counts.** When control and treatment fail identically,
  the instinct is relief. It more often means neither run exercised what
  you think, and the shared failures are the environment.

Finding the missing piece is usually quick and worth it: a harness that
reproduces the baseline converts a meaningless comparison into a real one.
Report the control's numbers alongside the treatment's, because a reader
cannot judge a delta whose baseline is unstated.
