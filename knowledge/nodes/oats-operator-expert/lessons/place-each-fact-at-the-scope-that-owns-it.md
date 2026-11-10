---
type: Lesson
title: Place each fact at the scope that owns it — shared declarations in Git, host facts in the uncommitted local file, single-holder facts at spawn — and let meaning, not type, break ties
description: A deployment has three legal homes for a provider fact and the docs say what each accepts, not which one a given fact belongs to. Place by ownership scope, and when a fact is legal in two homes let its meaning (how many holders it may have) decide, not its type (path, string, flag).
about: [workstream/operations]
kind: lesson
id: ins-325fdea31cb9
tags: [lesson, operator, placement, workspace, local-file, spawn, blast-radius, rebuild]
timestamp: 2026-09-23
---

Judgement formed 2026-09-23 by the OSS coordinator while moving host paths out
of the old configuration chain during a two-team rebuild.

# Rule

A fact has exactly three legal homes, and each has one owner:

1. **Shared declarations** — `oats-workspace.yaml` and each `soul.yaml`,
   committed and read by every machine — own what is true for everyone:
   members, package pins, the team labels, defaults, and a soul's own slot
   payload (true of every instance of that soul).
2. **`oats-local.yaml`**, uncommitted, one per machine, owns **host facts**:
   absolute paths, clone locations, state directories, custody locations,
   delivery modes.
3. **The spawn** (`--provider <cap> key=value`, recorded in that instance's
   `instance.json`) owns **single-holder facts**: anything true of one
   instance that must not become true of the next instance of the same soul.

The placement question is never "does this file accept this fact?" (it usually
does, or it refuses loudly) but **"who else would this fact reach if I put it
here?"** Choose the narrowest home whose scope matches the holders the fact is
meant to have.

# The tie-breaker: meaning over type

The docs give each surface's grammar and merge position (soul payload, then
local settings, then spawn; later wins) and one hard refusal: no absolute
paths in the workspace file. They cannot classify the fact the operator is
holding, because the same fact is often legal in two homes. A competent
operator rejects the illegal home and then picks between the legal ones by
**type** — "it is an absolute path, so it is a host fact" — which is sound
reasoning that produces a wrong deployment.

The forming case was a retained messaging seat. Its value is an absolute path
on one machine, so by type it belongs in the local file. But a seat can be
**held once**: exactly one running instance is that identity. In the local
file it would reach every instance of every messaging soul spawned on that
host, and the first two to come up would share an identity; nothing refuses
it. The seat belongs on the spawn. Type is a floor (it rules out the illegal
home); meaning picks among the rest. The custody *directory* of a resident is
nonetheless a host fact
([resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)):
the directory is where a machine keeps things; the seat is who holds one.

# What goes wrong

- **A host fact in shared defaults.** Paths are refused, but a machine-level
  setting that is not a path slips in and becomes policy for every member on
  every machine. Find out what a setting does before deciding where it lives
  ([the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md)).
- **A per-instance fact at machine level.** Legal and accepted; the blast
  radius is every future spawn on that host. Anything naming one identity, one
  lease or one external registration behaves like the seat.
- **An organisation fact placed locally.** Machines drift independently, and
  two deployments that "run the same workspace" disagree.

# Consequences

- In a rebuild, walk the retired configuration fact by fact and classify each
  by holder count before touching the new files: everyone → shared; this
  machine → local file; this one instance → spawn. Settle the shared file
  first ([cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md)).
- Use `oats spawn <soul> --preview` as the check: if a single-holder fact
  appears in the merged payload of an instance that should not hold it, the
  fact is one scope too wide.
- Special cases with their own concepts: the disclosure audience of the member
  list ([private member requires a private workspace host](/nodes/oats-operator-expert/decisions/private-member-requires-a-private-workspace-host.md))
  and the messaging root
  ([messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md)).
- Related host-account judgment: [Git credentials must work for unattended
  agents](/nodes/oats-operator-expert/decisions/host-git-credentials-must-work-unattended.md).
  Their unattended-use trade-off is an operator decision; the credentials stay
  in native Git/forge custody, not in OATS configuration.

# Citations

- [workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md#provider-payloads-have-three-homes)
  "Provider payloads have three homes" (the retained-seat example is the
  spawn row) and [configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md).
- Original rationale: [`docs/rebuild-to-v2.md` at v0.25.9](https://github.com/awebai/oats/blob/v0.25.9/docs/rebuild-to-v2.md),
  the local-file and retained-seat steps.
