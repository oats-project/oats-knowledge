---
type: Decision
title: "A resident's custody is a host fact: one custody host per resident, one custody per resident across teams, custody services co-located and fail-closed"
description: Fixes the multi-machine custody layout for residents whose external identity reaches instances through grants — custody lives on exactly one host, declared in that host's local config, shared by every team the resident acts in, with custody-class services co-located and reporting unavailability instead of serving stale or from another machine. Renewal is a host action at restart, never something an instance does for itself.
about: [workstream/operations]
id: dec-d722f2d71c2e
tags: [decision, operator, custody, residents, grants, multi-machine, identity, lifecycle, degraded-mode]
timestamp: 2026-09-24
---

Position formed 2026-09-24 by the OSS coordinator from operating a two-team
deployment across machines through a rebuild round. It fixes operator
placement, ordering and degraded-mode behaviour; rules 4 and 6 match the
messaging project's accepted custody contract and the shipped oats.aweb
provider (1.16.1), which reads custody paths only from host settings and
refuses a global-mode spawn whose custody service is not serving.

# Rule

1. **Assign residents to hosts before laying out the deployment.** A
   `<resident>` has exactly one custody host: the machine where that
   resident's instances spawn and where the spawn hook runs. Each machine
   holds only the residents it serves. Do not point a second machine at the
   same resident, replicate its custody, or share it over a network path.
2. **Custody location is declared in the host's `oats-local.yaml`**
   (for oats.aweb, `settings.oats.aweb.residents`: resident name to custody
   directory), never in the committed workspace or soul files. It is a
   fact about `<host-a>`, and it belongs at the scope that owns it — see
   [Place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).
3. **One resident, several teams, one custody directory.** The team an
   instance acts in is chosen per spawn from the workspace's team label and
   carried in the spawn payload. Two instances of one resident on two teams
   are two grants with different team bounds over the same custody. Never
   create per-team custody copies, and never flip custody's active team to
   serve a different spawn — a hook must not mutate custody state.
4. **Custody-class services run per host, co-located with the state they
   guard**, under the same user and lifecycle as the spawn hook — the same
   operational class as the wake broker. They differ in one way: a wake-broker
   registration is durable across a broker restart, so a spawn never fails on
   a restarting broker; a custody service is *required* for signing and for
   encrypted receive, so a global-mode spawn probes it before minting and
   **fails closed with a typed diagnostic** when it is not serving. The
   operator's remedy is to start the service, never to spawn without it.
5. **Host down means fail closed.** When a custody host is unavailable,
   encrypted receive for its residents is unavailable and is reported as
   unavailable — never served stale from a cache, never served from another
   host. Plaintext paths continue unaffected.
6. **Grant renewal is a host action at restart**, performed through the
   launch lifecycle (accepted 2026-09-24 in the messaging project's custody
   contract: the worker-facing service exposes no mint, renew or revoke; those
   stay with the trusted host). An instance cannot renew itself. On a mid-session expiry
   error the instance reports and stops; the operator restarts it (restart
   renews and supersedes the old grant) rather than repairing identity
   in-session. Size grant TTL to the expected session length so this is rare.

# Why

The self-custodial model puts root signing and encryption keys outside every
worker; hosting is routing, not custody. That only holds if custody has one
physical location whose services are the only things that ever touch root
material. Because the resident's stable encryption key stays in custody,
inbox history and offline delivery can be served — which is exactly why
custody cannot be per-session, per-team or replicated without breaking the
key's single home.

Team selection per spawn keeps custody immutable under load: the same
directory serves any team the resident belongs to because the team is an
input to the grant, not a state of the custody. This is the operator face of
[preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md):
a hook that rewrites custody to make one spawn work has silently changed
what every later spawn on that host gets.

Renewal at restart rather than in-session is deliberate. Grant subcommands
correctly refuse a grant home, so an instance has no path to renew itself;
the host's launch lifecycle runs on every start and restart and is the one
point that already has custody access and prior meta. Making that the only
renewal path keeps identity repair out of the instance and out of the
operator's hands.

# What goes wrong

- Two machines "sharing" a resident: the second host cannot serve it; the
  operator ends up copying custody, and now two roots exist for one identity.
- Per-team custody copies for a multi-team resident, or a hook that switches
  the active team: spawns on the other team start receiving the wrong bound.
- Custody committed into the deployment repo or workspace file: every other
  host inherits a path that does not exist there, and rebuilds carry it along.
- A cache that keeps serving decrypted mail while the custody host is down:
  the deployment reports healthy receive it does not have; revocation is
  invisible.
- Operators fixing a mid-session expiry by hand inside the instance: the
  meta no longer matches the live grant and retire revokes the wrong one.

# Consequences

- Multi-machine layout starts with a resident-to-host table; custody
  directories, custody-class daemons and TTL sizing follow from it.
- Adding a team to a resident is a workspace change plus new grants, not a
  custody change.
- Degraded mode is explicit: an encrypted-receive outage is scoped to one
  host's residents and visible as such; nothing else pretends otherwise.
- Verifying a rebuild on a host means checking that custody, spawn hook and
  custody-class services all live under the same user and lifecycle there.
- Retiring a resident's instance follows the same custody boundary: see
  [self-custodial identities retire from inside the home](/nodes/oats-operator-expert/lessons/self-custodial-identity-retires-from-inside-the-home.md).

# Routed

- Grant mint/renew/revoke command surface, flags and their acceptance
  sequence → the messaging package expert.
- Custody service authentication, API ordering and freshness bounds → the
  messaging project's identity/custody expert (a cross-project seam).
- Launch-hook meta persistence and payload verification rules → kernel and
  integrations nodes.

# Citations

- oats.aweb manifest `settings.residents` and custody preflight
  ([`capabilities/oats-aweb`](https://github.com/awebai/oats/tree/main/capabilities/oats-aweb),
  1.16.1 mirror).
- Migrated from agents/oats-expert/soul/knowledge/inbox/grant-custody-service-and-renewal-belong-on-the-custody-host.md @ 7838d3ca.
