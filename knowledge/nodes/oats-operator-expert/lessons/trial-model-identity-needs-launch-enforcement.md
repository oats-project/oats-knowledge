---
type: Lesson
title: Trial model identity needs launch enforcement and observation
description: A controlled Claude trial ran unintended models despite soul preferences, so a fixed-model comparison needs an enforced launch boundary and observed model identity for participating seats.
about: [workstream/operations]
kind: lesson
id: ins-140a2ac15c57
tags: [operator, trials, measurement, launch, claude]
timestamp: 2026-11-03
---
# A preference did not establish the experimental control

In the source's 2026-11-02/03 trial campaign, souls declared the intended
model, but the selected launch configuration supplied none. Some recorded
launches had a null model and the panes ran Claude's default instead. A
builder also spawned its reviewer with another explicit model, which reached
the reviewer. The intended single-model control was therefore not in force.

This is a source-reported observation on OATS 0.69.8 and Claude Code 2.1.308,
not proof that the kernel never reads a soul's model field or a complete
precedence contract. The source explicitly left that implementation question
unconfirmed. Do not repair ordinary deployments from this observation by
inventing settings or replacing their launch policy.

# What worked in the controlled fixture

The trial's launch executable removed incoming model options and supplied
the experiment's selected model. A probe deliberately spawned with a
different model reportedly showed the intended Sonnet 5.5 in its pane;
reported messaging and running-state checks still passed. That establishes
one successful fixture probe, not that every later seat or harness is pinned.

For an experiment that deliberately holds model identity fixed, test the
launch boundary against default selection and conflicting child-spawn
arguments. Check the effective model at the first settled startup of the
participating seats, including reviewers, rather than treating a soul's
preference or a requested model as execution evidence. A mismatch or unknown
model disqualifies the run from a claimed fixed-model comparison until its
actual population is established. Pricing usage at the intended model does
not correct a run that used another one.

This is distinct from an ordinary
[host-wide launch preference](/nodes/oats-setup-admin/lessons/a-host-wide-pi-model-is-one-launch-set-write.md):
a preference expresses a host choice; this fixture intentionally constrains
experiment inputs. The wrapper is a reported trial remedy, not a required
production launcher or permission to override an operator's model choice.
Keep native authentication, discovery and permission policy intact under
[the native-launch decision](/nodes/oats-kernel-expert/decisions/harness-native-launch.md).

# Elimination route and limits

Put the model invariant and a version-qualified startup check in the trial
launcher, with regressions for absent model arguments and conflicting nested
spawns. Record requested and observed model identity separately; do not make
manual pane inspection the permanent enforcement mechanism. These are checks
to implement and requalify, not tests certified by this harvest. They
complement [run, origin and message identity](/nodes/oats-operator-expert/lessons/claude-trial-metrics-need-origin-and-message-identity.md),
which owns population selection and usage counting.

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-03; notes/kit-model-pin-and-private-tmp.md.

The harvest read the captured proposal and note, not the launcher, panes or
transcripts, and repeated no probe. The evidence covers one host and harness
version; early mixed-model runs are not Sonnet 5.5 comparison evidence, and
no corrected billing totals or universal model-selection rule are established.
