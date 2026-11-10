---
type: Decision
title: A shared task list selects its team without changing messaging defaults
description: Select the aweb tasks team once in the workspace's tasks payload, not through deployment-local overrides or messaging defaults, so deployments share a task list without moving unrelated identities.
about: [workstream/oats-direction, workstream/messaging]
id: dec-fb3a725cbbb1
tags: [workspace, tasks, messaging, configuration, rejected-alternatives]
timestamp: 2026-11-03
---
# Decision and rationale

A workspace that chooses one shared aweb task list selects its team through
an `oats.aweb-tasks` setting, `team: <label>`, in the workspace definition's
top-level `tasks:` payload. A deployment-local value must not override that
team. The point is one workspace-wide task destination without changing
which team a home uses for messaging.

The source reports that task routes are team-scoped. Using each deployment's
messaging default for a shared workspace's tasks can split the work across
lists, or mix it with unrelated projects that share a personal default team.
This is a concrete application of
[placing facts by their ownership scope](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md),
not a change to who owns messaging defaults. It complements
[independent messaging and task composition](/nodes/oats-maintainer/decisions/messaging-and-task-coordination-are-separate-choices.md).

# Rejected alternatives

- **Make the selected team every soul's messaging default.** The source's
  analysis identified unrelated lifecycle effects on existing homes: joined
  teams can become ineligible and be dropped at launch, and GLOBAL grant
  seats can be re-minted under a different default while lacking a local
  joined-team route. A task-list choice should not require those identity
  changes. These are source-reported risks, not live migration results.
- **Configure the team separately in every deployment.** That reintroduces
  the very task-list drift the shared setting is meant to prevent.
- **Change a deployment's default team.** That moves other projects' souls
  as well as the workspace that requested the shared list.
- **Allow settings on any slot reference immediately.** The broader option
  generalizes to every slot for a need then specific to tasks and overlaps
  the existing messaging payload. It was deferred, not prohibited forever;
  a later additive design remains possible.

The selected narrow route was called K1: a top-level workspace `tasks:`
payload analogous to `messaging:`, at the same configuration layer. The
all-slot alternative was K2. These names identify the rejected design
choice, not a second implementation specification.

# Acceptance, enforcement and limits

Acceptance is **source-reported**: Pepe directed use of aweb tasks for the
OATS workspace on 2026-11-03; the two maintainer sides agreed the task-team
setting and K1 route that day. The captured note identifies agreement
threads `49ac8491` and `0a90c365`. Neither private thread nor the human's
session was inspected. The human's direction to use tasks is not presented
as a separate direct endorsement of every technical term.

Enforce the shared-team boundary in configuration resolution and regression
cases that combine workspace and deployment values. Task-team selection
must still respect actual membership and identity availability; a label
alone grants neither. Exact readiness answers, command routing and feature
floors belong in the implementation and its documentation. This record
certifies no release, migration, test run or working-home change and does
not supersede existing messaging-default or onboarding-review authority.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/tasks-team-is-a-workspace-setting.md.
