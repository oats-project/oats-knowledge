---
type: Lesson
title: Prepare an open-head trial before the merge order is fixed
description: Before merge order is fixed, prepare combined-tree evidence and a tested resolution handoff for overlapping PRs, and check whether inventory tests require a producer to land before its gated consumer.
about: [workstream/coordination, workstream/oats-direction]
kind: lesson
id: ins-cb558bef39eb
tags: [integration, coordination, testing, handover]
timestamp: 2026-10-29
---
# Preparation while both efforts are still open

When the maintainer identifies another open effort that overlaps yours, ask
your developer to trial-merge locally onto that PR's current head and run
the affected tests from both changes. If the order is still being decided,
do this then rather than waiting for the first PR to land and discovering
the integration work during the second owner's rebase.

The useful handback is not merely “it conflicts” or “the merge is clean.”
Give the maintainer the tested heads, textual hunks and their proposed
resolutions, semantic failures found by the combined run, and a drafted
interaction test with its result. Make that test available to whichever
owner will land second. Use the existing
[affected-test inventory](check-affected-test-inventory-at-handback.md)
to expose consumers, not only the files each author happened to run.

Keep the trial local and unpushed, separate from the real PR branches. It
informs the maintainer's order and prepares a resolution; it neither chooses
the order nor imports another effort into the deliverable. The
[presentation-family review rule](/nodes/oats-maintainer/stewardship/presentation-features-reuse-one-contract.md)
already requires early ordering and scrutiny of the later hand-resolved
rebase. This lesson supplies the lead's preparation for that decision, not
a competing merge policy. A passing trial does not replace
[updated-head integration evidence or content-bound review](/nodes/oats-maintainer/stewardship/review-protocol.md).
Existing execution limits still apply.

# Why the Git conflict list was insufficient

In the reported shared-work/background-client trial, Git flagged an import
line, but the other PR's newly added renderer test harness lacked the new
import supplied by this effort. Fourteen of its fifteen cases failed on
the combined tree despite no textual conflict at that harness. The early
trial exposed the additional repair and produced a draft interaction test
before the maintainer fixed the order.

The distinct lesson is the timing and transferable resolution, not another
claim that clean merges prove too little. Nor does this case establish the
[Desktop coupled-release condition](/nodes/oats-desktop-expert/lessons/coupled-kernel-and-desktop-landings.md):
overlapping work does not by itself mean either feature is unsafe to ship
alone.

# A gated consumer can still depend on producer-first landing

Runtime compatibility is not the only constraint on order. In the reported
warm-reader effort, the client was inert without the new kernel feature, so
consumer-first looked safe. Its error-code inventory check nevertheless
rejected kernel-owned names that existed only in the unmerged producer.
The plan had to change after the client PR opened and CI failed.

Before recommending an order, inspect the consumer diff for newly named
kernel error codes and check their ownership against the inventory test's
producer tree. If that tree does not yet write those codes, the unchanged
consumer cannot land first under that gate. Record the producer dependency
in both PRs for the maintainer's ordering decision. A passing combined tree
alone does not show that the proposed first landing passes on current main.
Do not relabel kernel codes as client-owned merely to get a green check.

This is not a universal producer-first rule. It does not settle whether the
producer is safe to release alone, waive consumer-first compatibility
requirements for breaking contracts, or give the lead merge authority. If
those constraints conflict, take the dependency to the maintainer rather
than weakening the inventory gate. The
[retired-code decision](/nodes/oats-maintainer/decisions/retired-kernel-codes-need-no-client-list-until-required.md)
owns the converse case: supported old-kernel outputs outliving a code's
presence in the current producer. This addition owns only the planning
consequence of new names preceding their producer.

# Elimination route and limits

Eliminate the duplicated harness dependency context through the existing
[importable-logic remedy](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#source-evaluating-tests-include-renderer-modules-not-only-main)
rather than preserving a permanent missing-import checklist. Keep the
interaction regression in the repository. Automated prospective-combination
CI can replace the manual rehearsal; the residual lead judgment is to
surface the overlap early enough for planning and hand the repair to its
landing owner. For inventory dependencies, enforce the declared PR dependency
and check both the intended first landing and the prospective combination
before the order is committed. Preserve truthful code ownership; a shared
contract source could remove accidental literal coupling only through its
owners' review, not a local allow-list workaround. The planning guidance
should request this evidence before handover. These are prevention routes;
no such complete automation or skill change is claimed delivered here.

Evidence: OKF proposal from oats-expert/sidebar-same-work-expert,
2026-10-27; notes/trial-merge-onto-the-overlapping-open-pr.md.

The source identifies [awebai/oats#1587](https://github.com/awebai/oats/pull/1587)
and [#1589](https://github.com/awebai/oats/pull/1589). This is one effort's
source-reported trial and handoff, not an independently reproduced test run.
The proposal explicitly leaves unobserved whether the later PR carried the
repairs and test. Do not infer a successful landing or measured CI saving.

Evidence: OKF proposal from oats-expert/app-owned-reader-expert,
2026-10-29; notes/new-kernel-codes-pin-producer-first.md.

The source reports that [awebai/oats#1647](https://github.com/awebai/oats/pull/1647)
at `9ae15da03` failed `test/client-own-codes.test.mjs` in CI run
`40878244622`: `E_READER_DEFECT` and `E_READER_STALE` were neither
client-owned nor written by the kernel on that tree. Their producer was
[pending PR #1650](https://github.com/awebai/oats/pull/1650), so the source
changed the planned order to kernel-first. This harvest did not rerun CI or
verify either landing. The observation establishes an error-code inventory
dependency, not that every feature or field name has an equivalent gate.
