---
type: Decision
title: A team view names your instances, not the team's full membership
description: Label team instance lists and counts as the user's observed deployments and state their machine scope, so a partial view never implies a complete team roster.
about: [system/oats-desktop]
id: dec-293f4a6ef57e
tags: [desktop, teams, scope, wording, information-architecture]
timestamp: 2026-10-15
---
# Decision

The source reports the product owner's 2026-10-14 direction: a Desktop team
page says **Your instances on this team**, with an adjacent sentence stating
that it covers this computer and the machines registered to this workspace,
and excludes instances other people run on the team. Team-card counts carry
the same qualification: they count **your instances**, distinguishing other
machines where useful, not the team's membership.

This is a decision about what the view may claim, not a promise that Desktop
can discover everyone on a messaging team. A team can span people and
machines outside the deployments the view reads. The old unqualified
membership heading made that bounded observation look like a complete roster;
a count without the qualification repeats the same mistake even when every
counted row is correct.

# Rationale and rejected alternative

Keep scope visible in words beside the list rather than expecting the user
to infer it from the machine groups or missing rows. The source rejected a
whole-team list: that would need a new provider-roster contract and was not
the requested design. A broader label must not manufacture broader evidence.

This applies the maintainer's
[truthful Desktop semantics](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md)
to the extent of a collection, not just the state of each row. It complements
[filtered-roster replacement](filtered-roster-preserves-unasked-groups.md):
that decision governs which held observations a read replaces; this one
governs what the team surface tells the user those observations cover.
Neither decision authorizes a second Desktop deployment model.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-teams-design, 2026-10-15; notes/teams-setup-design-direction.md.

The proposal and note report the product owner's direction on 2026-10-14
and implementation in [awebai/oats#1220](https://github.com/awebai/oats/pull/1220).
Acceptance, the reader's deployment scope and shipment are source-reported;
this harvest did not inspect the implementation or independently verify
human acceptance. No full-team discovery capability is inferred.
