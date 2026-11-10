---
type: Lesson
title: A cross-side brief names who builds and which lane reviews; a single "owner" column is read as "who builds"
description: When one side builds and the other side's lanes review, the brief's ownership table must say for each piece who builds it and which area lane reviews it, and name the lanes on each side that decide contract changes, because a table with one "owner" column is read as the build assignment and contradicts a covering mail that says the other side builds.
about: [workstream/coordination]
kind: lesson
id: ins-117ee992c8ca
tags: [planning, briefs, cross-area, lanes, review, ownership, contracts]
timestamp: 2026-10-30
---
# "Owner" means "builder" to the reader

A lead writing a brief for work another side will build naturally lists the
pieces against the lanes of its own side, under a heading such as "Lane /
owner", because those are the lanes it knows and the ones that will answer
for each area. The reader does not see it that way. Under the project's lane
model, a PR from the other side sits in that side's lane and names the area
lane it touches; the area lane reviews it. A table that puts "our" lanes in
an "owner" column therefore reads as "our lanes build these pieces", and it
contradicts the covering mail that says the other side builds everything.

In the source's effort (a cross-side onboarding redesign in which the other
side built and this side's lanes reviewed), the lane maintainer receiving
the brief asked first which lane was building, because the mail and the
table disagreed. The brief was amended and accepted whole; the question was
a round that need not have happened.

# Rule: two columns of meaning, plus who decides contracts

An ownership table in a brief that another side builds carries two
assignments per piece, not one:

- **who builds it**: the other side, named as such, so that no row can be
  read as a build assignment for the reviewing side;
- **which area lane reviews it**: the lane of the reviewing side that the
  piece touches, which is where the other side's PR will be read.

And it states, once, **which lanes decide contract changes on each side**,
naming the reviewing side's lanes (in the source's effort, the release lane
and the product lane; take the names from the current
[lane map](https://github.com/awebai/oats/issues/1566), which changes).
Contract changes are decided by both sides before they
are built, whatever the lane; the brief must make visible who those sides
are so that a piece touching a shared contract is routed to a decision
rather than reviewed as an ordinary PR. The lane model and the cross-side
contract rule are the maintainer's records and are not restated here:
[one release lane does the final review](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
and
[instruction precedence needs a cross-side decision](/nodes/oats-maintainer/stewardship/review-protocol.md#instruction-precedence-needs-a-cross-side-decision-2026-10-27).

In the source's effort the receiving lane maintainer checked exactly this
before accepting the brief, together with whether any item superseded a
human-accepted decision (see
[ask for the record of the brief's subject before designing](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md),
whose delegated-review rule comes from the same brief). Writing both in on
the first draft saves the review round.

# How this relates to neighbouring lessons

[Trace each "done" item to the code that owns it](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md)
asks which repository and owner produce each promised outcome today. This
lesson is the complementary question for the work ahead: for each piece,
who will build it and who will review it, when those are on different
sides.

# Elimination route

A cross-side brief template with separate "builds" and "reviews" columns
and a fixed line for the contract-deciding lanes would remove the
misreading at the source. Until the planning skills carry that template,
the lead writes both columns and the line by hand in every brief another
side builds.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-workspace-onboarding-setup-expert,
2026-10-30; notes/delegated-review-authority-and-builder-reviewer-split.md.

One brief and one receiving maintainer, source-reported: the maintainer's
question, the amendment and the acceptance are the source's report; this
harvest read neither the brief nor the exchange. The lane names given as the
reviewing side's contract-deciding lanes are the source's statement for that
effort at that date, and the current lane map, not this lesson, owns them.
The project direction under which that effort ran (which side builds, which
reviews, who coordinates releases) is the maintainer node's to record and is
not recorded here.

Checked at maintainer review on 2026-10-30 against the
[lane map](https://github.com/awebai/oats/issues/1566): a PR from an
overlapping lane is in that lane and names the area lane it touches, whose
maintainer is its second reader, and both sides decide contract changes
before anyone builds them. The lesson's reading of the lane model holds; the
map does not name lanes as a side's contract deciders, so that remains the
source's statement.
