---
type: Lesson
title: Prove coupled Desktop changes on main and on the prospective kernel merge
description: When a kernel change would make Desktop actively wrong, keep the Desktop delta reviewable on main but prove the combined tree before maintainers land the pair together.
about: [system/oats-desktop, system/oats-kernel]
kind: lesson
id: ins-837ede000839
tags: [desktop, integration, kernel, release, verification]
timestamp: 2026-10-30
---
# Why these changes need a coupled landing

The source reports the same integration problem twice: a new kernel effect
made the existing Desktop wrong, not merely incomplete. Long spawns exceeded
Desktop's transport assumptions, and capability-source testing turned a
read-like button into code execution. The Desktop decisions remain in
[preview-bounded spawn outcomes](../decisions/preview-bounded-spawn-outcomes.md)
and [informed manual actions](../decisions/informed-manual-actions-match-cli-authority.md).
This lesson owns only their consumer-side integration strategy.

A green Desktop PR on current main cannot prove behavior with the pending
producer. Conversely, mixing the kernel implementation into the Desktop PR
hides which side owns the change and makes its review depend on unlanded
ancestry. Keep two explicit bodies of evidence.

# What worked

- **A Desktop-only branch based on main.** Keep readers tolerant and capture
  fixtures from the real kernel PR head, recording their provenance. Main
  must pass without silently assuming the unmerged feature exists.
- **A declared-feature gate for the kernel-backed test.** Absence of the
  kernel's feature declaration is the explained skip on main. Once the
  kernel declares it, a failure is a failure, not another reason to skip.
- **Full gates on a local, unpushed combined tree.** Test the prospective
  merge with the kernel PR head as well as the Desktop-only branch, and
  hand over both verdicts against their exact heads. Whenever that kernel
  head moves, inspect its diff for consumer-shape changes; a lead's
  assurance of no change is not that inspection.

Coordinate a hold with the maintainers while the kernel PR is still
unmerged, until both verdicts exist. If the pair cannot be made ready, the
available release fallback is to omit the kernel change, not to ship a
known-wrong Desktop. The source reports kernel-first, immediately followed
by Desktop, once both were ready; this is a scoped integration tactic, not
permission to override the maintainer's consumer-first rules for breaking
wire contracts.

The reported final Desktop rebases changed release notes only. Wait for the
queue ahead to land before resolving a shared release-notes file; premature
rebases repeat the same conflict. A range-diff can establish that the
approved implementation delta survived such a rebase. It does **not** grant
merge authority or replace approval when content changed. Head-bound review
and the carrying of verdicts remain owned by the
[maintainer's review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md).
General contract freezing and merge-fidelity reasoning stay in
[cross-workstream delivery](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md).

# Elimination route

Make the dual-tree checks and feature-gated integration test reproducible in
the repository's test/CI machinery, with exact producer and consumer heads
recorded. This removes reliance on a remembered manual rehearsal. What tests
cannot decide is whether an interim release would mislead the operator;
that judgment is why the expert requests the coupled landing rather than
calling missing parity a later enhancement. This lesson does not assert
that a permanent combined-tree CI gate has been adopted.

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, received 2026-10-09.

The proposal identifies the pairs
[awebai/oats#801](https://github.com/awebai/oats/pull/801) /
[#819](https://github.com/awebai/oats/pull/819) and
[#845](https://github.com/awebai/oats/pull/845) /
[#850](https://github.com/awebai/oats/pull/850). It reports dual-tree gates,
back-to-back landings and repeated release-notes conflicts. These outcomes
are source-reported, not independently audited or rerun; this is not a
current release-status record. The named manual-action note does not back
the delivery process, which is supported by the proposal itself.
