---
type: Lesson
title: Inventory spawn routes before specifying a feature
description: Before specifying a spawn feature, enumerate each execution route and record its option handling, authoritative feature gate, older-side behavior and verification rather than treating one dialog as one implementation.
about: [workstream/coordination]
kind: lesson
id: ins-1ae1b39605ae
tags: [planning, spawn, routing, feature-gating, compatibility, verification]
timestamp: 2026-10-27
---
# One dialog does not establish one feature path

A feature specified against the visible spawn dialog can be complete for
one execution route and absent from another. In the source's Desktop
naming investigation, exact-name behavior had shipped for local spawns,
while remote spawns still treated the same typed text as a purpose and
added the soul prefix. The source reports that the omission surfaced through
use on another machine and required a late correction before a frozen
release. The planning failure was assuming the feature's visible entry
point covered its execution routes, not merely forgetting one option.

# Give every route an explicit disposition

Before handing a spawn feature to developers, trace each route the current
client can take. Put a route-by-route table in the spec, including:

- **Intended behavior and option handling:** what the feature means on that
  route, and which forwarding or option-admission boundary must carry it.
- **The authoritative gate:** whose reported features establish support on
  that route. Support on the asking machine is not evidence of support on
  the executing host.
- **Older or unknown support:** what happens when the relevant CLI or host
  does not advertise the feature. An omitted route must not silently become
  the compatibility policy.
- **Verification:** the route-specific supported and unsupported cases the
  developer must cover, including the user-visible result rather than only
  the dialog state.

For the reported Desktop case, local and remote execution needed separate
rows: the local preview/prepare/apply path and the remote forwarding path
had separate option admission and different sources of feature evidence.
Use those as the motivating distinction, not a permanent inventory of the
product. Re-establish the routes for the change being planned; neither a
local test nor a shared control proves that the other route was exercised.

# Canonical boundaries and prevention

The Desktop decision on [host-reported features](/nodes/oats-desktop-expert/decisions/soul-instructions-own-and-composed.md)
already owns the remote-gating rationale. This lesson adds the generalist's
spec-time obligation to discover every route needing that gate, not a new
feature-detection policy. It complements [tracing outcomes to their producing
code](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md):
even the right repository can contain a second route omitted from the spec.
The later [affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
checks implementation coverage; it cannot repair an unstated route contract.

Prefer eliminating accidental divergence through a shared option contract
where the route owners judge that appropriate; this lesson does not require
merging different execution lifecycles. Route-level contract regressions
should enforce the intended behavior and gate on each side, including
mixed-support cases. The remaining discovery obligation belongs in the
planning template or skill. These are prevention routes, not claims that
this harvest delivered shared code, tests or a skill change.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-remote-spawn-naming,
judged 2026-10-27; notes/desktop-remote-spawn-is-a-separate-path.md.

The proposal and note report the local/remote naming gap on 2026-10-23.
The proposal identifies [awebai/oats#1490](https://github.com/awebai/oats/issues/1490)
as the correction's decision record. The incident and subsequent fixes are
source-reported; this harvest did not inspect the implementation or rerun
spawn tests. The lesson retains the planning failure, not a current call
graph or option allowlist.

The proposal's lack-of-preview observation concerns the Desktop remote
route it inspected, not kernel capability or all remote spawning: the
kernel's [routed-preview decision](/nodes/oats-kernel-expert/decisions/routed-preview-preserves-caller-state.md)
is already recorded separately. The TUI route was not checked, so the
note's suggested extension to it is not established by this evidence.
