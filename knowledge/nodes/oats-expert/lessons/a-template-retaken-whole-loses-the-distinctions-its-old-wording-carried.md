---
type: Lesson
title: A template retaken whole loses the organisation's distinctions that its old wording carried
description: When a template release recomposes its texts and the copy is taken up whole, carrying every marked adaptation is not enough; the organisation's actor distinctions (a lane with one seat for the whole project beside per-person lanes, who gathers the other agreements, which seat nobody takes by default) often lived in the old template's own wording with no mark, so the lead lists them from the record and checks each against every lookup, seat-taking, launch and gather path of the new text before the first review round.
about: [workstream/coordination]
kind: lesson
id: ins-84a0b07b12ad
tags: [templates, adaptation, upgrade, review, briefs, authority, release, cross-area]
timestamp: 2026-11-16
---
# Every mark was carried, and seven rules were still lost

OATS's copy of its engineering template moved from one release to the next.
That release had recomposed every text, so the copy took up the new text
whole and wrote OATS's answers back in. The inventory had one row for each
of the old copy's 40 OATS-marked places and each adapt-marker answer, and
it named where each rule now lives. The diff against the new tag was clean.

Three of the four fresh review rounds still found an existing OATS rule
gone, in seven places in all. None had been marked, because the old
template's own wording had already said what OATS needed:

- **The release lane has one maintainer for the whole project.** Project
  lanes have one per person. The old lookup resolved the lane's owner
  first. The new one looked for "your person's maintainer in that lane",
  so in five places it would miss the release maintainer for a lead from
  another person's side.
- **Nobody takes the release seat automatically.** The old seat text said
  "nor in the release lane, which changes hands only as its humans say".
  Two new seat and launch paths dropped it, so a project maintainer could
  start a release maintainer once the old one retired.
- **Only the PR's own maintainer gathers the other agreements.** The old
  line was "once you approve a PR of your lane". Without that qualifier, a
  maintainer called only as the second reader would recruit a second reader
  again: on a lane whose second reader is the release lane, itself.
- **Release prep keeps its second reader, and a lane closes on the lane
  map.** The new text exempted the one and closed the lane in the landing
  rules.

# Why the inventory missed them

The inventory was built from the places where OATS had changed the
template: the marks and the marker answers. These were places where the
template already agreed with OATS. Rewriting the text removed the
agreement, and nothing recorded that OATS depended on it.

[Verify a template adaptation twice](/nodes/oats-expert/lessons/verify-a-template-adaptation-by-its-diff-against-the-tag-and-the-authorities-it-grants.md)
names the two checks for a copy. Its semantic check, reading every grant of
authority against the record, is what found these. It found them one path
at a time, over three rounds, because a reviewer checks the path in front
of it. This lesson refines that check for a retake: it supersedes nothing.
It is the upgrade-time counterpart of
[a template derived from another carries over the safety rules of the roles it drops](/nodes/oats-expert/lessons/a-template-derived-from-another-carries-the-safety-rules-of-the-roles-it-drops.md).
There a rule left with a dropped role; here it left with rewritten wording.
The same kind of recomposition sets a different trap in
[a step that gates on another text's list of conditions names the items it waits for](/nodes/oats-expert/lessons/a-gate-pointing-at-another-texts-list-names-the-items-it-waits-for.md):
there a pointer that kept its old wording inherits a list that moved.

# Rule: list the distinctions, then check every path

Before writing a retake, the lead lists the organisation's actor
distinctions from its record (in OATS,
[the lane map](https://github.com/oats-project/oats/issues/1566)):

- seats that are one per project, and seats that are one per person;
- who gathers the other agreements, and who only answers its caller;
- who may start, take or replace a seat, and which seat changes hands only
  on its people's word;
- where a lane opens and closes;
- which PRs, release prep included, still need their second reader.

Then the lead greps the new text for every lookup, seat-taking, launch and
gather-the-others path, and checks each distinction on each path. The list
goes into the reviewers' brief beside the two checks, so the first round
reads every path rather than the one it happens to meet.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-copy-template-v4-expert,
2026-11-16; notes/retaking-a-recomposed-template-loses-unmarked-distinctions.md.

The source is
[oats-project/oats#1943](https://github.com/oats-project/oats/pull/1943),
the copy at its verified head (open, not yet merged, on 2026-11-16). The PR
body records four review rounds, all 40 marks carried, and a last round at
the head with no findings. The PR's review commits for rounds 1 to 3 name the
lost rules above, each fixed: release prep's second reader and closing a lane
on the lane map (round 1), the release lane's one maintainer in every lookup
(round 2), and the PR's own maintainer gathering the other agreements and the
release seat changing hands only as its people say (round 3). The old wording
quoted above is the template-v3.1.3 copy's text on OATS's main. The count of
seven places and of five lookups is the lead's report from the review rounds. This is one
retake in one organisation, caught before review rounds ended. The list of
distinctions is what this retake lost plus its obvious neighbours, not an
exhaustive inventory.
