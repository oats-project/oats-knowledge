---
type: Decision
title: An own-home checkpoint wake is a routine instance act
description: Classify an instance's own checkpoint registration and removal as routine rather than operator work, while retaining the wake-hold prerequisite, its coverage limits, and separate gates for host installation and other-home wakes.
about: [workstream/oats-direction]
id: dec-2614bd084ea6
tags: [permissions, checkpoints, scheduling, rationale]
timestamp: 2026-10-31
---
# Decision and rejected alternative

The setup maintainer's 2026-10-30 ruling classifies setting and removing a
checkpoint wake on the instance's **own home** as routine instance work:
it is local, reversible, and neither destructive nor outward. Retaining an
operator gate for every such checkpoint could strand the waiter at a
permission prompt with nobody there, recreating the stall the checkpoint
was meant to prevent.

This is the permission-classification rationale, not a second scheduling
recipe. The integration decision owns [why the checkpoint belongs to the
waiter](/nodes/integrations-expert/decisions/checkpoint-wake-belongs-to-the-waiter.md).
Installing the host timer remains an operator act; configuring a wake on
another home through spawn keeps its human gate. Neither this decision nor
the checkpoint's purpose authorizes either act.

The classification must live in the permission model itself. Guidance in a
coordination skill cannot override a conflicting operator-act rule. Nor
does routine classification imply a blanket command allow rule: the
reviewed choice leaves registration and removal with the classifier,
because a command-pattern rule cannot establish which home a job file
names. This is not a guarantee of prompt-free execution or permission to
bypass a refusal.

# The condition is withholding, not universal protection

The ruling was conditional on the kernel holding automated wake input at
reported permission or question prompts. A timer must not supply the
person's answer. The reviewed guidance therefore permits checkpoints only
with the kernel hold and a home reporting `on-claims` or `not-exposed`;
absent or unknown coverage does not justify setting one. The review
explicitly accepted reporting an unbounded wait when no level is covered
rather than sending an unsafe Enter.

The kernel's [withholding decision](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md)
and [partial-dialog-coverage lesson](/nodes/oats-kernel-expert/lessons/dialog-claims-do-not-enumerate-all-dialogs.md)
remain canonical for the mechanism and its limits. A support statement is
not complete protection: unreported dialogs and claim/input races remain.
This classification does not cover direct session input or a separate
messaging broker. Removing or weakening the hold requires re-judging the
ruling, not silently retaining the routine-act conclusion.

Keep the current operating rules in `oats-agent-permissions` and the
coordination skills. Enforcement belongs at the automated-input boundary,
with regressions for withholding and coverage-gated scheduling; knowledge
records why the permission and guidance changes must agree. No skill or
runtime change is delivered here.

# Evidence and acceptance limits

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-10-31; notes/own-home-checkpoint-wake-is-an-instance-act.md.

The [initial ruling](https://github.com/awebai/oats-engineering/pull/34#issuecomment-6525755420),
[coverage-gated approval](https://github.com/awebai/oats-engineering/pull/34#issuecomment-6530187858),
and [permission companion review](https://github.com/awebai/oats/pull/1684#issuecomment-6530188540)
were read during harvest. They present themselves as maintainer-instance
judgments, not the human account owner's own acceptance. The
[release-lane second read](https://github.com/awebai/oats/pull/1684#issuecomment-6530241402)
confirms the classifier and unknown-coverage boundaries.

GitHub records the coordination change merged on 2026-10-31 at `654be537`
and the permission companion at `0f6fa9fb`. The
[hold-lifting comment](https://github.com/awebai/oats-engineering/pull/34#issuecomment-6537279818)
reports the prerequisite released in OATS 0.69.7. Merge records were checked;
at maintainer review the `v0.69.7` tag was also read and contains the merge
of [the hold](https://github.com/awebai/oats/pull/1673). Runtime behavior and
rehearsals were not independently audited or reproduced. No installed-host
readiness or complete prompt protection is certified. The older integration
concept's open limits are not rewritten or superseded; the maintainer added a
forward pointer to this decision there, and that node's owner retains their
review.
