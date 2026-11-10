---
type: Decision
title: Messaging does not compose task coordination
description: Keep task teaching and prerequisites capability-scoped, default onboarding to aweb tasks only without an existing tracker, and keep OATS-installed aweb skills within composition so messaging alone never opts a home into tasks.
about: [workstream/oats-direction, workstream/messaging]
id: dec-2a251cd41168
tags: [capabilities, composition, messaging, tasks, readiness]
timestamp: 2026-11-03
---
# Decision and rationale

Choosing aweb messaging does not choose aweb task coordination. Task teaching
belongs only in `oats.aweb-tasks`, for homes that compose it. The source
reports explicit human direction to keep all task teaching out of
`oats.aweb`: its inject, Comms line and skills, including bundled aweb skills.
Even a conditional pointer to the tasks capability is excluded. It still
puts task vocabulary and commands into every messaging-only home's context,
encouraging an agent to reach for a layer it was never given.

The rationale is independent composition, not a preference for a particular
task backend. The directing human expects many deployments to use aweb only
for messaging. A workspace must be able to make that choice without receiving
instructions for task claiming. This specializes the broader
[capability-owned coordination boundary](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)
at the messaging/tasks seam; it does not move coordination into core.

# Task-only costs follow the composed capability

The same boundary applies to behavior and prerequisites. A change needed only
for aweb task claims, such as a claim-heartbeat readiness floor, its warning
or upgrade advice, applies only where `oats.aweb-tasks` is composed. A
messaging-only home does not acquire task claiming or a new prerequisite for
an unused task feature merely because both capabilities use the same CLI.

Forcing that upgrade on every messaging deployment charges them for a feature
they did not select. Review the purpose of the new requirement and the
capability that uses it before widening a floor. This is not a waiver of
actual messaging prerequisites or faults in selected features; the
[healthy-default warning lesson](/nodes/oats-maintainer/lessons/healthy-defaults-do-not-warn-about-optional-features.md)
remains canonical for that distinction.

# Refinement: onboarding defaults do not make messaging an opt-in (2026-11-03)

Onboarding defaults the tasks slot to `oats.aweb-tasks` when a workspace has
no existing tracker; when one is detected it writes `tasks: none`. The
source-reported detection agreement counts GitHub issues only when at least
one issue was updated within the last 180 days and was not opened by a bot.
An empty or bot-only list is not enough. Jira or Linear count when the person
names them or ticket keys appear. These are dated selection criteria, not a
claim that every tracker is detectable or that an existing tracker has been
integrated with OATS.

The rationale is to offer a task layer where work is otherwise untracked,
without pushing a second system onto a workspace that already has one.
Defaulting at onboarding and opting in at composition are different acts:
composing `oats.aweb-tasks` is the home's opt-in. aweb's default team
instructions carry no task opt-in line, so joining a messaging team does not
silently choose task coordination. The separate
[workspace task-team decision](/nodes/oats-maintainer/decisions/tasks-team-is-a-workspace-setting.md)
owns where the selected task list lives.

# Refinement: installation must preserve the composition boundary (2026-11-03)

Keep two installation paths distinct. aweb's own installation may supply
machine-wide skills, including task skills. The OATS installation of aweb
supplies what messaging needs on the machine but no machine-wide skills;
skills reach an OATS home through its composed capabilities. Otherwise a
global skill can put back the task teaching deliberately excluded from a
messaging-only home.

This is a direction for the OATS install path, not authority to remove a
person's pre-existing skills or replace their aweb installation. The
[installer ownership decision](/nodes/integrations-expert/decisions/installers-preserve-existing-tools-and-state.md)
remains intact. Nor does this revise the
[onboarding effort's design and review delegation](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md).

The later direction is **source-reported**: Pepe directly in the source
maintainer's session on 2026-11-03 for the default-with-tracker-exception and
two installation paths; the source reports the other side's agreement on
tracker criteria and agreement with aweb on the opt-in boundary. Private
exchanges were not inspected. This refines, rather than supersedes, the
accepted separation above; it does not repeat the note's earlier tentative
blanket objection to task skills in aweb's own installation.

The public description of
[awebai/oats-aweb#186](https://github.com/awebai/oats-aweb/pull/186), merged
2026-11-03, was read and corroborates composition as the opt-in. It does not
establish delivery of the tracker-detection or two-install-path decisions,
or that existing homes have changed.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/oats-aweb-teaches-no-tasks.md (later capture).

# Enforcement and evidence limits

Enforce the instructional boundary with a test of the text composed by
`oats.aweb`, bundled skills included, rather than a reviewer remembering every
teaching point. Pair task-only readiness cases with messaging-only cases that
prove the extra check and warning are absent. These are prevention routes,
not a claim that this harvest changes tests, skills or the instructions in
existing homes. For the refinements, use onboarding fixtures for absent,
active, old and bot-only issue lists and named/key-indicated trackers, plus
install/composition tests proving the OATS path adds no global skills. Those
checks must not confuse suppression of an extra task system with setup of
the existing tracker. These are prevention routes, not delivered tests.

Acceptance of the original separation is **source-reported**: Pepe directly in the source maintainer's
session on 2026-11-03. The proposal also reports the other maintainer side's
agreement on scope in aweb thread `e0d7902a` that day. Neither the session nor
the thread was inspected; this is not independently verified human authorship
or evidence of a shipped change. No existing human-accepted decision is
superseded.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/oats-aweb-teaches-no-tasks.md;
notes/aweb-task-claiming-only-under-aweb-tasks.md.
