---
type: Lesson
title: A maintainer's one read of the diff does not replace the author's counted review at the merging head
description: A green light that reads the code once still needs one clean read on a floor model, named and posted on the PR at the head that merges; three times in two days the maintainer's own read found nothing and the counted read then found real defects.
about: [workstream/oats-direction]
kind: lesson
id: ins-404a6d8f44f5
tags: [lesson, pr-review, landing-rules, model-floor, evidence]
timestamp: 2026-11-21
---

Learned 2026-11-19 and 2026-11-20 by a lane maintainer holding a merge gate
over two parallel efforts, whose green light reads the whole diff once.

**What happened.** On three changes the maintainer read the whole diff, found
no defect, and gave or was about to give its green light. Each time a review
by the author's loop on a model at the floor then found real ones: two races
in a kernel rule that a stop stays stopped (a stop arriving while a launch was
still in flight answered that there was nothing to stop); four majors in a
client change; and, in a view that types a person's answer onto an agent's
terminal, an answer whose first key the terminal's scrollback mode consumed,
so that it landed as a digit without its id, which the contract forbids. In two of the three
the author's earlier rounds had all run on a model whose tier was not
established, and none was posted on the PR.

**The rule the maintainer now applies at every call.**

- Ask which read at the merging head was made on a model at the floor, and
  where it is posted. A round on a model below the floor, or one that is only
  described in a message, is not that read.
- When it is missing, return on evidence alone, saying that the diff was read
  and no defect was found, and that the same head may be called again once the
  read is posted. No new commit is asked for.
- When that read finds something, the fix moves the head; the maintainer
  reads the delta and the read is repeated at the new head. Commits after the
  last such read that are its own nits (a sentence, a list entry) may be
  carried when the maintainer reads them and says so in the verdict.
- A commit after that read is not carried when it answers a finding with
  logic of its own in a guard (a counter in place of a flag, state moved to
  another scope), however small. Return on evidence for a delta read on the
  floor model; if that finds a major, for a read of the whole change at the
  head. Say in the return what will block and what will not, and where the
  class that already exists on the main branch goes, so the returns end
  (2026-11-21, citation 4).
- Say in the verdict what was read in full and what was read against a spec's
  tables only. A large rewrite's correctness then rests, visibly, on its tests
  and on the counted read, not on the maintainer's name.

**Why.** The maintainer reads for direction, contracts, coherence and scope,
once, across many changes; the counted review reads one change for defects
with nothing else in view. They catch different things, and the second is the
one the landing rules call the review.

This refines, and does not supersede,
[the lane maintainer's green light](/nodes/oats-maintainer/stewardship/review-protocol.md#a-lane-maintainers-green-light-has-five-checks-the-release-lanes-sign-off-keeps-the-four-gates-2026-11-17):
its five checks and one read of the whole diff stand, and "it runs no review
rounds of its own: the author's reviewers run those" is the reason the
maintainer asks for the author's read instead of standing in for it. The
floor is [the model floor in the shared rules](/claims/lessons/a-limit-in-coordination-texts-is-checked-first-and-binds-the-value-used.md),
where an unknown tier counts as below it. In the first case the read that
found the races was a round on another model family; see
[the one round on another family goes first](/claims/lessons/the-one-review-round-on-another-model-family-goes-first.md).

**Related practice from the same two days.**

- Before any merge, test the merge of main plus this change against every
  other change of the lane that has a green light or a sign-off out, and merge
  a signed-off change at once. One change was merged while another's sign-off
  was out; both edited one shared file, and the second needed its review, its
  green light and its sign-off again. This extends
  [same-area integration evidence](/nodes/oats-maintainer/stewardship/review-protocol.md#a-batch-window-preserves-same-area-integration-evidence)
  from what has landed to what has a verdict out.
- A decided text that "writes amendments in" is read rule by rule against
  each amendment, never by its list of amendments: a recorded revision still
  described a file its own amendment had removed, and the other side found
  it.
- For anything that types into a terminal, ask what state the terminal can be
  in (the agent view's answer to this case is
  [the agent view never guesses the terminal input line](/claims/decisions/the-agent-view-never-guesses-the-terminal-input-line.md));
  for anything "recorded outside the home", ask which write paths of the
  harness can still reach it.

Evidence: OKF proposal from oats-maintainer/joan-product-maintainer, 2026-11-20; notes/maintainer-gate-lessons.md.
The three cases were checked at review on the PRs below; the model tiers of the
earlier rounds and the merge collision are source-reported.

# Citations

1. Kernel session providers, the green light withdrawn after the author's
   cross-family round found a stop that does not stay stopped:
   [oats-project/oats#1991](https://github.com/oats-project/oats/pull/1991#issuecomment-7036061433).
2. Clients' change, a return on evidence only, then a green light once the
   counted reads were posted:
   [oats-project/oats#2013 return](https://github.com/oats-project/oats/pull/2013#issuecomment-7039405130),
   [green light](https://github.com/oats-project/oats/pull/2013#issuecomment-7040565081).
3. The Desktop's agent view, a return on evidence only, then the Opus-tier
   read's copy-mode major:
   [oats-project/oats#2024 return](https://github.com/oats-project/oats/pull/2024#issuecomment-7044503983),
   [review](https://github.com/oats-project/oats/pull/2024#issuecomment-7044667377).
4. Update of 2026-11-21 (a fix commit that adds logic in a guard is not
   carried): OKF proposal from oats-maintainer/joan-product-maintainer,
   2026-11-21; notes/maintainer-gate-lessons.md. A form's guard against saving
   a stale definition: the maintainer returned twice on evidence; the delta
   read it asked for found a major, the next whole-change read another, and
   the third whole-change read at the head was clean:
   [oats-project/oats#2061 first return](https://github.com/oats-project/oats/pull/2061#issuecomment-7067164109),
   [second return](https://github.com/oats-project/oats/pull/2061#issuecomment-7067607509),
   [green light](https://github.com/oats-project/oats/pull/2061#issuecomment-7067704883).
