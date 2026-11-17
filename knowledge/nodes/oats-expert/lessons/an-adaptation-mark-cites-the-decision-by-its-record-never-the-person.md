---
type: Lesson
title: An adaptation mark cites the decision by its record, never the person who took it
description: When a person's direction decision changes an adapted copy of a template, each `<!-- OATS: -->`-style adaptation mark gives the rule's reason as the decision and its record (date and PR or issue), never the person's name or quoted words; the name and words go in the PR description and the author's notes, and a grep for the name runs before the head is handed back.
about: [workstream/coordination]
kind: lesson
id: ins-9eddcdefafb1
tags: [templates, adaptation, marks, privacy, capabilities, review]
timestamp: 2026-11-17
---
# A head returned for naming its decider

A copy of a coordination template is changed only at marked places, each
mark giving the reason the organisation's text differs from the template's.
When a person's direction decision changed the copy on a port PR, each new
mark gave as its reason the person's name, the date and a quote of their
words. The source reports that its fresh reviewer approved that head and
that the lead that had asked for the change returned it: no capability text
in the repository named a person, before or after the port.

Capability text is composed into the prompt of every instance that carries
the capability and lives in a public repository. A mark that gives a person
as its reason ties the rule to who said it rather than to the record where
a reader can find what was decided and why; a quote there reads as an
instruction from that person, and outlives the decision's context. The
decider here was a team member, whose name the project may publish
([check who a flagged name belongs to](/nodes/oats-expert/lessons/check-who-a-flagged-name-is-before-reporting-a-privacy-finding.md)),
so this is a rule about what a mark cites, not a privacy finding. Soul text
in the same repository does name the team's people as owners of their
lanes (who decides what); that names a standing role, not the reason for
one rule, and this lesson does not cover it.

## How to apply

- Write the mark as the decision plus its record:
  `<!-- OATS: decided <date> (<repo>#<PR>): <the rule> -->`. The record is
  where a reader finds who decided and why.
- Keep the person's words in the PR description and in the author's notes
  outside the repository.
- Before handing back a head that adds marks, `git grep -i <name>` over the
  capabilities, the package and the docs the change touched, and give the
  result in the hand-back. This is the mark-level case of the hand-over
  search in
  [design records name no hosts, people, paths or personal repositories](/nodes/oats-expert/lessons/design-records-name-no-deployment-specifics.md).
- A commit message is history: a name there can be fixed only by rewriting
  the branch, which a no-force-push rule forbids. Get commit messages right
  before the first push.
- Reviewers check what the brief names: a brief for a change that carries a
  person's decision names "no person's name or quote in capability text" as
  a done-when item.

Related: [verify a template adaptation twice](/nodes/oats-expert/lessons/verify-a-template-adaptation-by-its-diff-against-the-tag-and-the-authorities-it-grants.md),
[a brief that hands a child someone else's private material names every public destination](/nodes/oats-expert/lessons/a-brief-passing-private-material-names-every-public-destination.md).

## Elimination route

A check over the capabilities that fails an adaptation mark whose reason
is not a record (a date and a `<repo>#<number>`) would remove this at the
source, next to the diff-against-tag check the template-adaptation lesson
proposes. Neither exists yet; until then this is the lead's step at
briefing and hand-back.

## Evidence and limits

Evidence: OKF proposal from oats-expert/oats-copy-template-v4-expert,
2026-11-17; notes/adaptation-marks-cite-the-decision-not-the-person.md.

Checked at review on 2026-11-17 against
[oats-project/oats#1943](https://github.com/oats-project/oats/pull/1943)
(merged that day): commit `9c34543dc` added 14 adaptation marks whose
reason named the decider and quoted their words; commit `ca074af84`
("OATS marks name the decision, not a person") rewrote all 14 to the form
`decided 17 Nov 2026 (oats#1943): <rule>`; the earlier commit's message
still names the person. At the merged head, no file under the repository's
capability directories names that person. The fresh reviewer's approval of
the earlier head, the lead's return and the hand-back grep are the source's
report. One port PR in one organisation.
