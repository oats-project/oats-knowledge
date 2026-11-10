---
type: Decision
title: Remove wording needs an owned-worktree fact, not a mode or default
description: Base Remove's worktree promises on the kernel's explicit ownership fact because a recorded work mode and a retention default do not establish what belongs to the instance.
about: [system/oats-desktop]
id: dec-dd2b29b22c18
tags: [desktop, lifecycle, confirmation, contracts, truthfulness]
timestamp: 2026-10-14
---
# Decision and rationale

The source records a 2026-10-12 decision, reported agreed and built by
2026-10-14: statements about keeping or deleting an instance's own worktree
come from the retire plan's `facts.ownWorktree`, not its recorded
`facts.workMode` or `defaults.retainWorktree`.

A mode describes the record, not necessarily the object now at `work/`.
Links, a directory that is not the instance's tree, and an attached instance
can make a worktree-shaped reading attribute another object or branch to the
instance. A retention default answers what the command normally does; it is
not evidence of ownership and can become false for more than one reason.

The same fact governs the discard choice and whether counts or drift are
presented as the instance's own. With false, state only that there is no
worktree of its own to keep or delete as one. Do not infer the fate of a
directory or link from the record again. The kernel's plan remains the
source of those effects.

# Gate on the answering kernel's declaration

Where the answering kernel advertises the ownership-fact feature, require a
boolean fact and refuse a missing or malformed one rather than falling back
to a recorded mode. A destructive confirmation must not silently replace
promised evidence with a guess.

The source's compatibility decision retains the earlier reading when that
feature is not advertised; when a routed kernel's feature list is unknown,
it uses the fact when present. This is a feature-scoped transition, not a
claim that every historical plan now carries the fact. It applies the
[declared-feature authority](standalone-product-and-cli-authority.md) without
inventing a new version floor.

# Rejected alternatives

- **Treat a false retention default as no owned tree:** conflates a policy
  default with a physical fact and fails when another reason changes it.
- **Expose a larger shape enumeration just for this dialog:** each new value
  creates a contract to maintain, while this decision needs one boolean.
  This does not prevent a separately justified richer kernel contract.
- **Match a plan note's wording to identify the shape:** makes kernel prose
  a hidden protocol.

The structural fix is the producer fact and its feature-gated reader, backed
by contradictory-record/plan cases through every worktree confirmation
surface. No independent client filesystem classifier is implied. The broader
[confirmation-effect lesson](../lessons/asynchronous-intent-and-truthful-outcomes.md#confirmations-follow-effect-conditions-not-the-usual-case)
owns truthful conditional promises; this decision adds why a particular
kind of plan evidence is necessary.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-REDACTED-desktop-queue, 2026-10-14; notes/the-remove-dialog-speaks-from-plan-facts-not-from-the-record.md.

The note identifies [awebai/oats#973](https://github.com/awebai/oats/issues/973)
(comment 6132433324) and [#988](https://github.com/awebai/oats/issues/988).
Its initial pending status is explicitly updated on 2026-10-14; the proposal
reports the Desktop change in [#1086](https://github.com/awebai/oats/pull/1086),
for [#1071](https://github.com/awebai/oats/issues/1071), merged as `c6abdfb0`.
Agreement, shipment and the note's parser check are source-reported, not
independently audited or rerun by this harvest.
