---
type: Lesson
title: A carry rule ported from one template is tested against the target template's custody checks
description: When a recomposition ports a shared rule on what carries to a new head (a review, a verification note) from one template into another, the target's own mechanical checks can refuse what the rule allows; in the science template, the engineering rule that a review carries through an unchanged rebase met a record steward that requires every reviewed head to be an ancestor of the merged head, so the lead runs each ported carry rule against the target's custody commands before the first review round and keeps the narrower rule where they disagree.
about: [workstream/coordination]
kind: lesson
id: ins-0aea1b9b314c
tags: [templates, recomposition, review, verification, custody, rebase, science]
timestamp: 2026-11-16
---
# A rule that is right in its source can be refused by the target's mechanism

A template release that recomposes its texts often takes the shared rules of a
sibling template whole: what a review carries to a new head, what a
verification note carries, when a fresh reviewer is needed. In the engineering
template a review carries with no re-read through a rebase whose range-diff
shows every commit unchanged. Its maintainer checks a rebased head by that
range-diff, and no check there requires a reviewed head to be an ancestor of
the merged head, so the rule is consistent there.

The science template has a record steward that merges a run record only after
checking, with git commands, that each review recorded in it names a head that
is an ancestor of the head being merged, and that the reviewed material is
unchanged since. Ported whole, the engineering carry rule told the analyst and
the lead that a rebased run record still had its reviews; the steward's
mandatory check then refused it, because a rebase rewrites the reviewed
commits. One reviewer reproduced it in a scratch repository (the source's
report): range-diff showed the commit unchanged, the ancestry check exited 1.

Two review rounds went to it. The first port made the contradiction; a fix
then let the verification note carry wherever its reviews carried, which was
broader than the agreed rule and a third round narrowed it again.

# What to do

- **Before the first review round,** list every ported rule that says when
  something carries to a new head or a new revision, and run each against the
  target template's own mechanical checks (the custody commands, the merge
  conditions), on paper or in a scratch repository.
- **Where they disagree, keep the narrower rule in the target** and say why
  in its changelog. In the science template, run-record reviews carry only as
  the steward's checks allow (an update from the default branch by a merge,
  the run's evidence growing, verdict-only commits); a run record's
  verification note carries only through an unchanged update from the default
  branch, never a rebase; the engineering rebase carry stays for a PR outside
  the records, where no such check runs.
- **Keep the two carries apart in the text:** what carries a reviewer's
  verdict and what carries the lead's note are different questions, and
  folding one into the other ("the note carries where its reviews carry")
  silently widens the note.

This refines the composed-review lesson
([plan a composed review beyond the capability changing a rule](/nodes/oats-expert/lessons/rule-changes-need-cross-capability-composed-review.md)):
the neighbouring text to read is not only other instructions but the target's
executable checks. It sits beside
[a template retaken whole loses the distinctions its old wording carried](/nodes/oats-expert/lessons/a-template-retaken-whole-loses-the-distinctions-its-old-wording-carried.md),
which concerns the organisation's distinctions; this one concerns the target
template's mechanism.

Evidence: OKF proposal from oats-expert/science-template-v3-expert, 2026-11-16; notes/run-record-carry-vs-rebase.md. Science template-v3.0.0, review rounds 2 and 3 (oats-project/oats-scientific-research-coordination#9).

# Citations

1. [oats-project/oats-scientific-research-coordination#9](https://github.com/oats-project/oats-scientific-research-coordination/pull/9), open and unmerged on 2026-11-16 (head `61b648d`). Commit `ca06ebf` ports the engineering wording ("a review carries … through a rebase whose range-diff shows every commit unchanged") beside the record steward's `merge-base --is-ancestor <reviewed head> H` check in `land-a-run-record`; commit `d43caea` (round-2 fixes) limits run-record reviews to the steward's checks and lets the run record's `VERIFIED` carry "only where every review it lists carries there too"; commit `00066fb` (round-3 fixes) narrows that note to an unchanged update from the default branch, never a rebase. The review rounds' own reports (the scratch-repository reproduction, the flag on the widened note, the lead's confirmation) are not on the PR; they are the source's report.
2. [oats-project/oats-engineering-coordination](https://github.com/oats-project/oats-engineering-coordination) at `template-v4.0.0`: `landing-rules-detail` carries a review "with no re-read, through a rebase whose range-diff shows every commit unchanged"; the maintainer's `reviewed-delivery` reference checks a rebased head with `git range-diff` and only reports ancestry after a force push.
