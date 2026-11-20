---
type: Lesson
title: An "only what was applied may run" gate needs its carrier, a fence held through the effect, a commit point and a revision scope, stated up front
description: A design rule that a routed operation runs only what an operator-applied plan admitted is unbuildable until it names four things - what carries the approved state to the executor, a recheck held through the actual send, a commit boundary matching "a failed run never widens", and the scope of the revision the apply names. Successive review rounds of one design record found them piecemeal.
about: [system/oats-kernel, workstream/coordination]
kind: lesson
id: ins-b226f680795a
tags: [design-review, gates, plan-revision, sandboxes, contracts]
timestamp: 2026-11-20
---

# What happened

On 2026-11-20 the sandboxes design record (amendment r5) took the rule that a sandbox
runs only the capabilities the last operator-applied sync admitted for each soul. The
rule was one sentence. Successive fresh review rounds each found a missing piece, and
each was a real gap:

1. **The carrier** (round 2) [1]. The executor (the kernel inside the sandbox) never
   sees the host's recorded admission. The fix reused the routed spawn's decision
   hash, which already binds the exact composition the apply will build: the host
   checks that composition against the recorded admission after the remote preview,
   before anything is kept or minted.
2. **A fence held through the effect** (round 3) [2]. A check before minting doesn't
   stop a policy edit committed between the check and the send, because the decision
   hash fingerprints the composition, not workspace policy. The fix rechecks under
   the request's in-flight lock immediately before each send and each replay. A
   refusal there, for a request with no recorded send, is itself proof that nothing
   was sent, which lets the reserved seat be released.
3. **A commit point that matches the failure rule** (rounds 2 and 3) [1][2]. Round 2
   wrote each sandbox's admission once its own sync action succeeded; round 3 found
   that this let a sync that failed elsewhere still widen admission. The fix commits
   once, atomically, only when the whole sync succeeds.
4. **The revision's scope** (round 4). Per-sandbox revisions with one scalar apply
   flag can't select which revision applies. The position the lead handed over with
   the record, not yet in a reviewed commit at the time: one aggregate revision per
   sync, and the commit writes only the entries the plan widens or changes, so a
   narrowed entry keeps its earlier approval.

# The lesson

When writing or reviewing a gate of the form "only what an operator applied may run",
state all four before the first review: the carrier into the executor, the fence held
through the actual effect, the commit boundary, and the revision's scope. Give each
its acceptance case. A gate stated as a rule alone costs a review round per missing
piece.

Relates to: [machine-boundary contract](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
(a plan revision is revalidated at apply; this extends it to a routed apply whose
executor can't read the approval), and [a text guard's contract is written before its
first review](/claims/lessons/a-text-guards-contract-is-written-before-its-first-review.md)
(the same cost of a loose criterion, here with the four parts such a gate's contract
must name).

# Citations

Evidence: OKF proposal from oats-engineering-expert/sandbox-architecture-lead,
2026-11-20; notes/approval-gate-needs-carrier-fence-commit-scope.md.

1. [5a187b38](https://github.com/oats-project/oats/commit/5a187b387e3d3eea7771329b1d56b843994e8db3),
   "Sandboxes record r5: round 2's fixes", on branch
   `agents/sandbox-architecture-lead-record-r5` (`docs/design/2026-11-19-sandboxes.md`).
2. [d7e2f2eb](https://github.com/oats-project/oats/commit/d7e2f2eb5b8a616578153e4c9b0b848e5291a8ab),
   "Sandboxes record r5: round 3's fixes", the same branch: the apply-time admission
   fence and the atomic commit.
