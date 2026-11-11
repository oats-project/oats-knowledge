---
type: Lesson
id: ins-f4fcc3bf5c0a
title: The OATS knowledge base's own CI pins the node roster, so a base-metadata change carries a CI change
description: The base repository's adapter (`scripts/validate.mjs`, pinned OKF 2.1.1) asserts the exact node list and distinct owner UUIDs beyond what OKF's `metadata()` checks (it has no distinct-owner rule), so adding nodes — the bridge's reserved `claims`, `subjects`, `verdicts` under the sentinel owner — passes OKF 2.1.1, 5.8 and 6.0 validation yet fails that CI until the adapter changes in the same PR; the adapter is the base's own and its reviewers' call, and the adapter requires Node major version 22.
about: [system/oats-okf, workstream/knowledge]
kind: lesson
tags: [lesson, okf, oats-knowledge, ci, okf-base, nodes, reserved-nodes]
timestamp: 2026-11-10
---

# What the base's CI checks beyond the package

The OATS knowledge base's repository runs its own adapter over the pinned public OKF 2.1.1 validator. Beyond OKF's
`metadata()` (which has no distinct-owner rule), the adapter asserts the exact node roster and that owner UUIDs are
distinct. A change to `okf-base.json` that passes every package validator (2.1.1, 5.8, 6.0) still fails that CI
("Unreviewed node roster") until the adapter is changed in the same PR. The adapter belongs to the base and its
reviewers decide its shape. The adapter also asserts Node major version 22.

# When it bites

Any future change of the base's metadata: 7.0's `okf-base.json` version 2, a new reserved node, a node move. Budget
the adapter change and its tests into the same PR.

# Evidence

Bridge PR oats-knowledge #342, 10 November 2026: baseline CI green with 14 nodes; with the three reserved nodes under
the sentinel owner the unchanged adapter failed; the PR's adapter commit added a reviewed RESERVED map and refusal
tests (the lead's confirmation by mail, 10 November 2026). Maintainer check at acceptance (11 November 2026): the
`RESERVED` roster and its asserts entered `scripts/validate.mjs` in merge 1229e509, and OKF 2.1.1's `metadata()` has
no distinct-owner rule.
