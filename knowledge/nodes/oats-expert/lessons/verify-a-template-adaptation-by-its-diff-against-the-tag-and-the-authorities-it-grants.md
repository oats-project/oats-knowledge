---
type: Lesson
title: Verify a template adaptation twice, by its diff against the tag and by the authorities its text grants
description: When a template is copied into an organisation's repository and adapted, the developer's and reviewers' briefs name two checks; diff each copied file against the template at its tag so every changed hunk sits at an adapt marker or carries its reason, and read every grant of authority in the copied text, marked or not, against the organisation's record, because an unchanged default can add a gate nobody decided.
tags: [templates, adaptation, review, briefs, authority, release, cross-area]
timestamp: 2026-11-09
---
# A copy that passed every reader was returned twice

Coordination now ships as template repositories that each workspace copies
and adapts into its own capabilities
([coordination policy lives in capabilities](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)),
so a lead will verify more adaptations than this one. In the source's
effort, the project's own copy of its engineering template passed six
reviewer rounds and two maintainers' reads, then was returned twice at the
merge gate. Each return found a different kind of gap, and together they
are the two checks an adaptation needs. Reviewers check what the brief
points them at; neither the adapt markers nor a read against the template
catches both.

# Check 1, mechanical: diff the copy against the template at its tag

The first return found two overrides of the template's text with no mark,
one on model families in a probe skill and one in the review skill. A
reviewer reading the copy cannot see what differs from the template; a
script can. Diff each copied file against the template at the tag the copy
records, and require every changed hunk to sit at an adapt marker or carry
its reason beside it. The source reports that the developer's script then
found every override (five), and each was marked.

This check runs **before the first review round**, in the developer's
brief, so reviewers read a copy whose every difference is already named.
It is the review-side counterpart of the maintainer's
[adopt, then adapt](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md#adopt-then-adapt)
rule for copied suites: the evidence a reviewer needs is a small, marked
diff against the upstream original.

# Check 2, semantic: read every authority the text grants against the organisation's record

The second return found what no diff shows: a default left in place. The
copy kept the template's release rule, under which a tag waits on a direct
go from each owner whose lane has changes in it. The organisation's record
([one release lane does the final review, merge and tags](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md),
kept current on the [lane map](https://github.com/awebai/oats/issues/1566))
gives the release lane the final say, with lanes agreeing the contents
through their maintainers on its posted release plan. The unchanged default
made every tag wait on each lane's person: a gate nobody decided.

So the second check reads **every grant of authority in the copied text,
marked or not**, against the organisation's record: who approves, who
merges, who tags, and whose yes a step waits on. The reviewers' brief names
this check. It is the adaptation-time form of
[checking a brief's subjects against the lane's decisions](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md):
there the claims to check arrive in a brief, here they arrive as a
template's defaults, and either way the record, not the text in hand,
decides.

# Why both, and how this relates to condensing

A marked override can still be wrong, and an unmarked default can add a
gate; the diff finds the first kind and only a read for authorities finds
the second. The brief names both because reviewers check what they are
pointed at.

[Condensing instructions must preserve load coverage](/nodes/oats-expert/lessons/condensing-instructions-preserves-load-triggers.md)
is the mirror image: there rules were lost when text moved, here a default
was kept that the organisation never adopted. Both efforts found release
authority to be the rule most easily lost or gained in a text change, which
is why the semantic check starts with who tags.

# Elimination route

The mechanical check can live in the template itself: a template that
records its tag in the copy and ships the diff-against-tag script, or a CI
check that fails on an unmarked hunk, removes the first kind of return at
the source. The semantic check cannot be automated, since the record it
reads against is the organisation's; it belongs in the adaptation and
review briefs. Both are proposed prevention routes, not delivered checks,
and this harvest changes no template or soul skill.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-09;
notes/a-template-default-can-add-an-authority-the-org-lacks.md.

The source identifies
[oats-project/oats#1769](https://github.com/oats-project/oats/pull/1769)
as the adaptation (the project's copy of its engineering template at the
template's 2.1.0 tag), the setup lane's
[first return](https://github.com/oats-project/oats/pull/1769#issuecomment-6750586527)
as the unmarked-override finding and the release lane's
[second return](https://github.com/oats-project/oats/pull/1769#issuecomment-6751433895)
as the release-authority finding. Checked at harvest on 2026-11-09: the
pull request is merged and both return comments exist and say what is
cited; the six reviewer rounds, the developer's script and its count of
five overrides are source-reported, and this harvest read neither the
copied files nor the script.

One adaptation in one organisation. The diff check assumes the template is
tagged and the copy records the tag it was taken from. The release rule
described above is the organisation's record at that date, owned by the
maintainer's decision and the lane map, not by this lesson.
