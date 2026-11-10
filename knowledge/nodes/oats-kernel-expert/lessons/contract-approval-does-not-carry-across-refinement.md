---
type: Lesson
title: Contract approval does not carry across a refinement
description: The kernel expert must obtain both maintainer sides' agreement to a changed contract shape before building it, because approval of earlier wording and a coordinating expert's agreement do not approve the refinement.
about: [system/oats-kernel]
kind: lesson
id: ins-84c1de6c257b
tags: [kernel, contracts, specification, review, handover]
timestamp: 2026-10-15
---
# Approval has a shape, not just an issue number

When refining an agreed kernel contract addition—a flag, field, feature word
or its semantics—take the changed shape and its rationale to the lane
maintainer before implementation. Both maintainer sides must agree to that
shape on the issue. Agreement from the coordinating expert does not stand in
for either maintainer, and merely posting the refinement does not renew an
earlier approval.

The source reports learning this when the roster proposal changed from
mirroring `--workspace-ref` to accepting `--workspace-key`. The technical
[reason for the key form](/nodes/oats-kernel-expert/decisions/consumer-filter-takes-the-reported-identity.md)
was sound, but the handover cited the other side's approval of the earlier
ref wording as though it covered the new shape. A maintainer's PR approval
did not settle the missing bilateral contract agreement; the refinement had
to return to the decision-makers.

For the kernel expert, the durable distinction is between **technical
agreement**, **contract authorization**, and **implementation review**. A
correction can improve the design without inheriting permission to build it.
In the handover, cite the exact approving comments for the exact shape being
shipped, not merely an issue containing an older yes.

# Boundary and elimination route

This applies the existing decision-first
[maintainer review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md);
it does not create another reviewer, grant merge authority, or require a new
approval for every implementation-only edit. The
[Desktop staging lesson](/nodes/oats-desktop-expert/lessons/staging-an-agreed-rule-needs-agreement.md)
owns the different failure of omitting agreed cases from a delivery. Here the
failure is carrying approval to changed contract wording and semantics.

Tests can verify a flag's behavior but cannot establish who agreed to its
shape. The prevention route belongs in contract-specification and handover
guidance: keep the current shape and the comments approving it together, and
expose any refinement before building. This is a process-guidance candidate,
not an assertion that such an automated gate exists or a change to soul skills.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-desktop-queue-kernel, harvested 2026-10-15; notes/contract-refinement-needs-both-maintainer-yes.md.

The source cites [the earlier approval](https://github.com/awebai/oats/issues/1124#issuecomment-6169160731)
and [the refinement](https://github.com/awebai/oats/issues/1124#issuecomment-6169253976),
and reports the maintainer's correction on
[awebai/oats#1148](https://github.com/awebai/oats/pull/1148) on 2026-10-14.
The incident and correction are source-reported; this harvest did not audit
the discussions or establish independent human acceptance. No existing
human-accepted decision is superseded.

Knowledge-maintainer review, 2026-10-15: on #1148 the lane maintainer's
approval states that the PR merges only after the other side agrees to the
refined contract on #1124, because the earlier yes covered the ref wording
and the PR builds the key form. The other side's later approval names the
key shape. This corroborates the reported correction; it is not a human
acceptance of this lesson.
