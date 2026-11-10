---
type: Lesson
title: A fix made after the last review round reopens the loop, however small; the coordinator compares the handed head with the last approved head before routing
description: A hand-over whose last round ended in change requests has not converged until a fresh reader has read the fixes, because "small" is the author's judgment and the author is the one reader who cannot see what a fix broke; before routing a PR upward, the coordinator compares the handed head with the head of the last approval and, if the content differs, asks for one delta review of exactly that range with the open findings as its criteria, rather than letting the maintainer return it for process.
about: [workstream/coordination]
kind: lesson
id: ins-720e60af13e4
tags: [hand-over, review, coordination, delegation, convergence]
timestamp: 2026-11-10
---
# The last verdict is about the head it read

Twice in one build the same gap appeared on the way up to the merging
maintainer. First the source told a developer that a one-sentence content
commit needed no review, and the maintainer returned the PR for process.
Later an expert under the source handed up a PR whose last full review
round had ended with two change requests, "both fixed, no further round,
the fixes being small". One of the fixes was on the path that publishes
content.

A review verdict binds to the head the reviewer read. A fix made after it,
of any size, produces a head nobody has read, and the loop that was meant
to converge on an approved head has not. "Small" does not help: it is the
author's judgment of its own change, and the author is the one reader who
cannot see what the fix broke. The maintainer's
[carry rule](/nodes/oats-maintainer/stewardship/review-protocol.md#carry-verdicts-only-with-proof-of-an-unchanged-delta-2026-10-13)
says the same from the merging side: a verdict carries only across an
unchanged diff, and anything else returns to the readers for that delta.
The lead's mistake was to route a PR that rule would return.

# Rule: compare heads before routing, and call a delta review

Before routing a hand-over upward, the coordinator:

- compares the handed head with the head of the last approval. The PR's
  review history gives both; if the lead cannot find the approved head, the
  hand-over is not ready;
- if the two differ in content, asks for one fresh **delta review of
  exactly that range**, with the last round's open findings as its criteria
  and a list of what it checked as its output. It goes as a call to a fresh
  reader at the exact head, as the
  [hand-off lesson](/nodes/oats-expert/lessons/send-a-hand-off-by-message-to-every-waiter-at-an-exact-head.md)
  describes, not as a new full round;
- routes only once that review has approved the handed head. A delta
  review cost minutes in the source's build; the return for process cost a
  round trip with the maintainer.

What counts as "differs in content" is the maintainer's rule to draw, not
the lead's: the carry rule accepts only an unchanged diff or a range-diff
that is `=` throughout. So a rebase passes without a delta review only when
its range-diff is `=` throughout, and a rename or a CI fix changes the diff
and gets the delta review like any other fix. The source's own practice let
a rebase, a rename or a CI fix with no content change pass without one; that
practice is recorded here, not adopted. Where the lead is unsure whether a
change is content, it is content. Asking for the review is cheaper than
being returned.

# Elimination route

A forge check that compares the PR head with the head of its latest
approval and flags the mismatch would make the unconverged state visible
before anyone routes it; where the forge dismisses stale approvals on
push, reading that state is the same check. A hand-over template field
"last approved head, handed head, delta review of the range (or none
needed because identical)" makes it a question the author must answer.
Neither is delivered here; this is the coordinator's manual step.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-10; notes/a-fix-after-the-last-review-round-reopens-the-loop.md.

Two PRs in one build on one deployment, source-reported: the content
commit and its return, the two post-round fixes, the delta review and its
approval with a list of checks are the source's report; this harvest read
neither PR nor review. The source's exceptions (rebase, rename, CI fix) are
recorded as what it applied, not adopted where they exceed the maintainer's
accepted carry rule, which remains the authority on what carries.
