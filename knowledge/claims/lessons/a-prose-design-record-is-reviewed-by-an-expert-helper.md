---
type: Lesson
title: A prose design record is reviewed by a fresh expert helper, not the code-reviewer soul
description: The code-reviewer soul sends back a plan or a design written in prose unreviewed. For a docs-only design record, each review round's reader is a fresh oats-engineering-expert, spawned as a one-report helper on another model family, with a seat line in its brief.
about: [workstream/coordination]
kind: lesson
id: ins-8f3731edb61b
tags: [review-loop, design-records, helpers, models]
timestamp: 2026-11-20
---

# What happened

On 2026-11-19, the first review round of a docs-only design record (the sandboxes
record, oats-project/oats#2012) spawned a `code-reviewer`, as the run-the-review-loop
skill says. It answered NOT REVIEWED. Its role says a plan or a design in prose is
not its to read, and sends it back to the expert.

The round was rerun with a fresh `oats-engineering-expert`, spawned attached as a
helper on another model family than the author's. That pattern carried four full
rounds, each of which found defects in the record's contracts, and three delta
reads, the last two of which approved with no findings.

# The lesson

The two rules sit in texts a lead does not read together: run-the-review-loop
names a `code-reviewer` for every round, and only the reviewer's own inject
(`capabilities/oats-code-review/injects/reviewer.md`, "A plan or a design in prose
is not yours to read") says a prose design goes to an expert. For a design record,
a spec or a plan written in prose, brief a fresh expert of the area as the round's
reviewer from the start, and keep the loop's own rules:

- **Model:** the review loop's model rule, a family other than the author's at or
  above the floor. The expert soul's launch default (Claude) is the author's own
  family when the author is an expert on that default, so the spawn names the model.
- **Seat line:** the expert's orchestrate-agents rule, a `Seat:` line naming it a
  helper that owns no effort; for a reviewer, add one report, then retire, and do
  not edit the worktree. Without it, the expert soul reads its task as a lead's.
- **The rest of the brief:** unchanged. The range, the criteria verbatim, the tests
  allowed, and a Checked section.

The route that would retire this lesson is run-the-review-loop naming the prose
case itself; that is a skill change for separate human review.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sandbox-architecture-lead,
2026-11-20; notes/design-record-review-goes-to-expert.md.

- Verified by the maintainer review on 2026-11-20 at oats-project/oats `4ee389bb`
  (and unchanged at `4a76d9fd`): the reviewer inject's sentence above;
  run-the-review-loop's "a new `code-reviewer` instance" each round and its model
  table; the orchestrate-agents `Seat:` rule; the expert soul's Claude launch
  default.
- The PR body of oats-project/oats#2012 states four full rounds by fresh readers on
  another model family and three delta reads, the last two approving with no
  findings. The round-1 NOT REVIEWED answer and the helpers' seat are the source's
  report.
