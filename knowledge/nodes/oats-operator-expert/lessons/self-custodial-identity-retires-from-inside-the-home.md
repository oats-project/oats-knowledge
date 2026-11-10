---
type: Lesson
title: "Retire ordering for self-custodial identities: de-register from inside the home before removing it, and treat stranded-record cleanup as a deferred re-check"
description: When an instance's external identity is self-custodial (its signing key lives in the instance home), retire must stop the runtime, self-delete the identity from inside the home, and only then remove the directory. If that step was skipped, the stranded remote record is liveness-guarded and cleaned by one scheduled re-check after the staleness window, never by an immediate roster check or a retry loop.
about: [workstream/operations, workstream/messaging]
kind: lesson
id: ins-97f9b5f6ec52
tags: [lesson, operator, lifecycle, retire, identity, custody, messaging, teardown]
timestamp: 2026-07-08
---

Judgement formed 2026-07-08 by the maintainer after a live probe on a hosted
messaging team (one probe, before the workspace model). The ordering is what
the kernel does on main: `oats retire` runs each capability's retire hook
before the home is removed, and oats.aweb deletes the instance identity from
inside the home in that hook.

# Rule

For any capability whose external identity is **self-custodial** — the key
that proves "this is `<resident>`" is stored inside the instance home — the
retire sequence is fixed and asymmetric:

1. Stop the runtime (the session or process that heartbeats).
2. From **inside the home**, de-register the identity with the remote
   service. This is the only immediate path: it is authenticated by the key
   the home still holds.
3. Only then remove the directory.

Never the reverse, and never "simplified" to a plain directory removal in a
rebuild, a cleanup pass or a botched-spawn tidy-up. The rule applies to every
capability that places an identity in the home, each time one is added.

# Why

The home is the custody boundary for the identity. Delete it first and the
credential that could have retired the remote record no longer exists — the
resident is orphaned, not retired. The service cannot tell a silent member
from one whose machine is offline, so it refuses a third party's delete until
it has observed heartbeat silence for its staleness window. The kernel
principle is the same:
[preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

Two consequences operators consistently get wrong:

- **Stranded-record cleanup is deferred by design.** A remote delete refused
  as "still active" means *not stale yet* — not a permissions problem, not a
  transient error, not something a retry loop changes. The window's length is
  a provider fact; ask the package expert.
- **An immediate roster check after a forced teardown is a false positive.**
  Note the teardown, schedule **one** re-check after the window, and
  investigate only if the record survives it.

# What goes wrong

- A rebuild removes homes by hand "because we are starting fresh"; the team
  roster then shows residents that exist on no host, and the next operator
  reads them as live.
- A kernel upgrade lands before the old homes are retired: the new kernel
  retires a home an earlier kernel made without running its hooks, so every
  identity in it is stranded and must be revoked with the provider's own
  tooling (the reason cutover retires first:
  [cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md)).
- An operator seeing "still active" loops the delete or escalates it as an
  outage.
- A later "simplification" drops the from-inside-the-home step because the
  directory is going away anyway, and every subsequent retire strands again.

# Consequences

- Treat a home as holding a credential, not just files: before removing one,
  ask which capabilities placed an identity there and whether each has been
  de-registered from inside it — the same custody question as
  [resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md).
- Record the ordering as rationale in the deployment's operating notes, so a
  simplification has to argue against a reason.
- After a forced teardown, put a dated re-check on the calendar and tell
  anyone verifying the deployment which records are pending staleness.

# Routed

- The retire-hook contract → the kernel node. Provider commands, status
  vocabulary and the staleness window → the messaging package expert.

# Citations

- [souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md#retire)
  "Retire"; [release notes 0.26.0](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.26.0.md)
  (homes from an earlier kernel retire with no hook).
- Migrated from agents/oats-expert/soul/knowledge/lessons/aweb-workspace-lifecycle.md @ 7838d3ca.
