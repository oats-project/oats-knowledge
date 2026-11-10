---
type: Decision
title: Operator-default soul selection is not a wording fix
description: Preserve first-by-name operator soul selection when clarifying a confusing notice, because choosing a friendlier soul changes the command's resolved settings and teams rather than just its presentation.
about: [workstream/oats-direction]
id: dec-99a344ad76aa
tags: [operator-commands, compatibility, direction, wording]
timestamp: 2026-11-02
---
# Decision and rationale

The source maintainer's 2026-11-02 decision for an onboarding finding was
**keep the selection, change the words**. For an operator command from a
deployment without `--soul`, preserve the existing first-by-name selection
among souls whose resolution provides the namespace. Explain why the chosen
soul matters and how to select another; do not make a confusing notice the
occasion to change resolution policy.

The soul is not merely a display name: its resolution supplies the command's
provider settings, teams and source. Two souls can resolve differently, so
substituting a more familiar one can change what an existing deployment's
command does. The important distinction is between a command using a soul's
resolution and an instance of that soul acting. Clarify that distinction
rather than changing behavior to make the name look more appropriate.

# Rejected alternatives

- **Prefer the deployment's messaging default or setup soul.** Friendlier
  naming does not justify silently changing the selected resolution. That
  would be a contract change, not a wording repair.
- **Hide the soul's name or say less.** The selected resolution affects the
  command, so the operator still needs to know which soul supplied it. Keep
  the name on stderr and explain the settings/team consequence and explicit
  `--soul` choice.

# Applying the decision

Distinguish a report that the selection itself is wrong from a report that
its explanation reads wrongly. A proposed selection change goes through the
existing [direction and contract gate](/nodes/oats-maintainer/stewardship/review-protocol.md#contract-agreement-stays-on-the-issue-through-implementation-2026-10-28),
including its consequence for existing deployments; a wording-only repair
preserves selection. This is not a permanent ban on an explicitly decided
replacement policy or a new approval procedure.

The full dispatch rules remain in the repository's
[operator-command documentation](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
and [`operator-default-soul` contract](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md).
This concept keeps the rejected alternatives and compatibility rationale,
not a second dispatch specification.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-02; notes/operator-default-soul-stays-first-by-name.md.

The decision and rejected alternatives are source-reported; no explicit
human acceptance is claimed. The proposal identified onboarding finding a8
in [awebai/oats#1665](https://github.com/awebai/oats/issues/1665) and reported
[awebai/oats#1713](https://github.com/awebai/oats/pull/1713) awaiting final review.
At harvest on 2026-11-02, the public PR record instead showed it merged. Its
read diff changes the diagnostic string, documentation, assertions and
release-note entry, not the selection logic. That corroborates the
wording-only implementation scope, not human acceptance, released-version
availability, a live deployment result or an independently repeated test.
