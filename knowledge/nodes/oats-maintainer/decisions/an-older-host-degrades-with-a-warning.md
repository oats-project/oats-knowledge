---
type: Decision
title: An older host degrades with a warning; it is refused only where it would do worse than today
description: When a new client meets a host or kernel that lacks a new feature, it falls back to today's behaviour with a warning naming the upgrade; it refuses before sending only when the old side would silently do something worse than today. A fallback ends only by a declared floor whose refusal names the upgrade.
about: [workstream/oats-direction]
id: dec-85dfc5779cfd
tags: [version-skew, compatibility, remote, desktop, review, contract]
timestamp: 2026-11-11
---
# The decision

Agreed by both maintainer sides on 2026-11-11, on the routed spawn's task
moving off ssh argv (oats#1846). The PR first refused a task to a host without
`spawn-task-stdin`. That was wrong: the Desktop's remote spawn goes through
this route, almost every remote spawn carries a task, and the Desktop bundles
the newest kernel while servers lag it. Every remote spawn to a server not
yet upgraded would have failed. The older host now gets the task as an
argument, which is today's exposure, and the answer warns that it was
readable in both machines' process lists and names the upgrade.

The rule:

- **Fall back with a warning** when the old side does what it does today
  (oats#1827, the keyed spawn; oats#1846, the task off argv). The new client
  adds a protection only where the other side can give it.
- **Refuse before sending** when the old side would ignore the new request
  and silently do worse than today (oats#1833: an older host would install
  the timer that `schedule host install --register-only` asks it not to).

# How a fallback ends

A fallback is not kept forever. It is removed by a declared floor: the new
side refuses an older host before anything is created, with an error that
names the upgrade (agreed by both sides 2026-11-12 for routed spawns: a
floor release advertising `spawn-task-stdin` and keyed spawn, refused with
`E_REMOTE_INCOMPATIBLE`). The floor is released only when it breaks no
route still in use: oats#1912, which builds it, is held so that it does not
ship while a routed host below the floor may still be used.

# Rejected

- **"Upgrade the host first" as an Upgrade note.** A Desktop that updates
  itself cannot follow it.
- **Keeping old fallbacks indefinitely.** They keep the weaker property
  (task text on argv, unkeyed spawns that can duplicate instances) on every
  route.

# Rule for review

For any routed or probed feature, ask in order:

1. Does the Desktop or another bundled client reach this path? Read the
   client's argv, not the PR's claim about it.
2. What does the old side do with the request as it was sent before?
3. Same as today: fall back with a warning. Worse than today: refuse, with
   the fix named.

The Desktop's tested CLI bound applies the same rule to a client facing a
newer kernel ([the CLI ceiling decision](/claims/decisions/desktop-cli-ceiling-is-a-tested-bound-with-an-allowlist.md)).

# Evidence

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-13; notes/older-host-degrades-with-a-warning.md,
notes/routing-floor-and-shim-removal.md. Pull requests oats#1827, oats#1833,
oats#1846 (2026-11-11); the floor agreement of 2026-11-12, built in oats#1912
(open, approved and held, when this was accepted).
