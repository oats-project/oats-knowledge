---
type: Lesson
title: A gate-style label trigger needs a purpose unique per ask
description: A PR-label trigger whose spawn purpose is the trigger name plus the PR number reportedly could not spawn again for the same PR after its first instance retired, and missed an unlabel and relabel inside one poll, so a gate a PR may need more than once needs a per-ask purpose or an operator backup.
about: [workstream/operations]
kind: lesson
id: ins-934260204f6f
tags: [operator, triggers, github, labels, spawn, naming, polling]
timestamp: 2026-11-09
---
# The purpose is the name, and the name outlives the instance

A label-driven trigger that spawns an instance whose purpose is
`<trigger>-<PR number>` fixes that instance's name, and its messaging
alias, for the life of the PR. In a 2026-11 trial the source reports that
after the first gate instance for a PR retired, later relabels of the same
PR spawned nothing: the trigger's last-run marker stayed at the first gate,
and one PR waited hours for a review it had asked for again. The source
attributes this to the name and alias remaining taken by the retired
instance, so the same purpose cannot produce a second live instance.

The operator lesson is that a trigger purpose is an identity, not a label.
A purpose that is stable across asks suits a trigger that must run at most
once per PR. A **gate** that a PR may legitimately need several times (a
product or platform review re-requested after fixes) needs a purpose that
is unique per ask, or an operator who watches for unanswered asks and
spawns the review by hand.

# Poll comparison cannot see a label that is removed and re-added

The same trigger inferred the `labeled` event by comparing one poll's label
set with the previous one. An unlabel and relabel that both completed
between two polls (the source reports a gap of a few seconds) left the
label set unchanged, so no event was inferred and nothing spawned. Anyone
who re-requests a gate by removing and re-adding the label quickly will be
invisible to a poll-diff trigger, whatever its purpose scheme.

# Limits and elimination route

The source observed one trigger kind across one trial; it did not inspect
the kernel's name reservation or the trigger's poll implementation, and
this harvest did not either. The account establishes the operator-visible
failure (a gate that fires once, and ignores fast relabels), not the exact
rule by which names stay reserved. That rule, and whether a retired name
should become spawnable again, is the kernel's and the trigger provider's
to decide, not this node's.

The elimination route is in the trigger, not in operator vigilance: a
purpose derived from the labelling event (or a per-ask counter) rather than
from the PR number alone, and event-based rather than poll-diff detection
of relabels, with a regression covering retire-then-relabel and
unlabel-relabel-within-one-poll. Until a trigger offers that, the operator
backup above is the honest answer when configuring a merge gate. Which
spawn routes a deployment actually has is the [spawn-route inventory
lesson](/nodes/oats-expert/lessons/inventory-spawn-routes-before-specifying-a-feature.md)'s
concern.

# Evidence

Evidence: OKF proposal from oats-operator-expert/coord-workspace-trial-kit-expert,
2026-11-09; proposal text only, no backing note was named for this claim.

The source reports the pattern across two gate triggers on 7–9 November
2026, with timestamps for the first gate, the ignored relabels and the
unlabel/relabel pair; those exact times and PR numbers are task context
and are not preserved here.
