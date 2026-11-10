---
type: Lesson
title: A team-local identity is reachable only inside its team — a seat that other teams must contact needs a global identity served from custody
description: Instances minted at spawn get team-local identities with no durable address, which other teams and outside parties cannot use for first contact; a standing seat that must be reachable across teams is a resident global identity created once by its owner and served to instances through custody, never a per-instance mint.
about: [workstream/operations]
kind: lesson
id: ins-44350fd8d781
tags: [lesson, operator, identity, reachability, teams, residents, custody]
timestamp: 2026-09-21
---

Judgement formed 2026-09-21 by the maintainer of a second deployment while
planning a coordination seat's handover across a rebuild; restated 2026-09-24
after the per-spawn identity choice was decided.

# Rule

Choose an instance's identity kind by **who must be able to reach it first**:

- **Team-local** (the default a spawn mints and a retire deletes): reachable
  by its own team only. It has no durable address, so an agent in another
  team, or a party outside the organisation, cannot open first contact with
  it. Right for workers whose conversations start inside the team.
- **Global, served from custody**: a resident identity with a durable
  address, created once by its owner, whose instances act as it through
  scoped, expiring grants
  ([resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)).
  Required for any standing seat — a coordinator, a public contact point, a
  reviewer other teams write to — that must be found and written to from
  outside its team, and for any seat whose address must survive the instance
  that serves it.

Never meet the second need by minting a global identity per instance, or by
copying a global identity's keys into an instance home: the first creates an
address graveyard at every retire, the second puts root keys where the
custody rule forbids them.

# Why

Cross-team first contact is addressed by namespace address; a team-local
identity has none, and the roster of one team is not visible from another.
A seat that is reachable today only because someone in the same team relayed
it is not reachable, it is relayed. During a rebuild the question surfaces
as "which of these seats must keep their address": those are the residents,
and they are the ones whose custody host has to be decided before the first
spawn ([messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md)).

# What goes wrong

- A coordinator seat rebuilt with a fresh local mint: teammates reach it, the
  other team's coordinator cannot, and the failure looks like a routing
  problem rather than an identity-kind decision.
- A handover that keeps the address by copying keys: two homes now hold root
  material for one identity, and the retire ordering in
  [self-custodial identities retire from inside the home](/nodes/oats-operator-expert/lessons/self-custodial-identity-retires-from-inside-the-home.md)
  no longer has one owner.

# Consequences

- The rebuild checklist names, per team, the seats that must be global, and
  whose custody host serves them; every other soul stays team-local.
- Adding a team to a resident is a workspace change plus new grants; the
  address does not move.

# Routed

- How the messaging provider mints a team-local identity, how a grant is
  minted and what the served instance can and cannot do → the messaging
  package expert.

# Citations

- oats.aweb `identity` setting (`mode: local` mints an instance-local team
  identity; `mode: global` acts as a named resident through a session grant),
  [`capabilities/oats-aweb/oats.json`](https://github.com/awebai/oats/blob/main/capabilities/oats-aweb/oats.json).
- The per-spawn identity decision:
  [the served identity is a messaging-layer fact](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md).
- Migrated from agents/oats-expert/soul/knowledge/inbox/a-locally-minted-oats-identity-has-no-cross-team-first-contact-address.md @ 7838d3ca.
