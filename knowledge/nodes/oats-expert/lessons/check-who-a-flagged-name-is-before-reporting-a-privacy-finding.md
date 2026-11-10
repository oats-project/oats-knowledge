---
type: Lesson
title: Check who a flagged name belongs to before reporting a privacy finding upward; report the scope verified, not the number of matches
description: A name found in published text is a privacy finding only if it belongs to someone outside the team, so the lead establishes whose name it is (the roster, the repository's authors, the human) before reporting it, and reports the scope it verified rather than a match count; one name reported as an outside person's to two instances was a team member's first name, and both had begun planning a clean-up before the correction.
about: [workstream/coordination]
kind: lesson
id: ins-eb91767e4df5
tags: [privacy, hand-over, verification, third-party, publication, coordination]
timestamp: 2026-11-10
---
# A match is not a finding

The lead's hand-over checks search published text for names: the
[deployment-specifics check](/nodes/oats-expert/lessons/design-records-name-no-deployment-specifics.md)
searches a record for the human's name and hosts, and the
[private-material brief](/nodes/oats-expert/lessons/a-brief-passing-private-material-names-every-public-destination.md)
searches a head for a partner's name before anything else is read. A search
returns matches. A match becomes a privacy finding only after a second
question: whose name is this?

The source reported "an outside person's name in 42 lines" of a knowledge
base to two instances before asking that question. The name was a team
member's first name, which the base may publish. Both recipients had begun
to plan a clean-up and had to be corrected. The finding that was in scope,
an outside organisation's name, was smaller and had been reported with the
same breath.

A false privacy finding is not free: it starts clean-up work, and a
clean-up of published text can mean rewriting a branch or purging history,
which others then have to coordinate around.

# Rule: establish the owner, then report the scope

Before reporting a flagged name as a privacy finding:

- establish who the name belongs to. The team roster, the repository's
  authors and contributors, and the human are the places to look; a name
  that matches a team member is not an outside person's by default, and a
  name that matches nobody known is not an outsider's by default either, it
  is unresolved;
- state the ownership in the finding ("the name belongs to <role>, outside
  the team") so the recipient can check the premise rather than the count;
- report the **scope verified**: which names, belonging to whom, in which
  artefacts. A match count ("42 lines") describes the search, not the
  exposure, and invites the recipient to size a clean-up before the premise
  is checked;
- keep an unresolved name as a question, not a finding, until it is
  resolved.

The lesson is about the step between the search and the report; the
exclusion itself (no personal data about people outside the team in
published knowledge) is the base's rule and unchanged.

# Elimination route

A deny-list search that already distinguishes the deployment's humans and
team members from everything else, as the deployment-specifics lesson
proposes, would return matches with the owner attached and make the second
question part of the first. Until such a check exists this is the lead's
manual step before reporting.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-10;
notes/check-who-a-flagged-name-is-before-reporting-a-privacy-finding.md.

One finding in one build on one deployment, source-reported: the search,
the report to two instances, their planning and the correction are the
source's report; this harvest did not read the base or the reports. Neither
the team member nor the outside organisation is named here. The places to
look are the ones the source named, not an exhaustive list.
