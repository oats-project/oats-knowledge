---
type: Lesson
title: A rework of instruction rules is reviewed against a written table, not rediscovered round by round
description: Before the first review round of a recomposition, write the rule inventory as a table (old place, rule, new place or the numbered intended change that removes it); for one procedure stated in several roles' texts, write one row per case and one column per copy. Reviewers attack the table, and a missing row is a finding.
about: [workstream/coordination]
kind: lesson
id: ins-541c473f573d
tags: [instructions, review, templates, inventory, recomposition]
timestamp: 2026-11-17
---

# Fresh rule-by-rule reads converge slowly without a table

The engineering coordination template's recomposition for template-v4.0.0
(34 skills merged into 21, briefings shortened) had three fresh reviewers per
round, one per scope, each reading old text against new rule by rule with the
intended changes as numbered criteria. Major and minor findings per round:
18/9, 10/8, 6/7, 4/8 (27, 18, 13 and 12 in all). Four rounds, the cap, did not
reach a clean one, and, as the lead reports, most findings in every round were
rules the first recomposition had dropped, not errors in the fixes. Each fresh
reader found dropped rules the earlier ones had passed; a rule on test doubles
was still found missing by a second read after the fourth round.

What a first pass loses, most often first: a small prohibition inside a long
paragraph; a named word whose behaviour stays after its defining passage was
merged; a pointer whose target was merged away; qualifiers; a rule kept in two
briefings and removed from both; mechanics (exact flags, the order of two
commands).

# One procedure in several texts needs cases by copies

The maintainer lookup lives in three texts (dispatcher, expert, maintainer),
because each role reads only its own capabilities. Both patches cut the day
template-v4.0.0 shipped (2026-11-16) found cases a copy lacked: v4.0.1 a
holder's numbered successors and a refused spawn read wrongly; v4.0.2 a
refused spawn in the maintainer's copy and, in the dispatcher's, a name only on
the roster, another person's lane, no maintainer soul, a shared lane and an
unknown lane. A table with one row per case and one column per copy, each cell
the line that settles the case or why the case cannot arise for that role,
ended it: v4.0.2's later delta reads built one, and the port into OATS's copy
(oats-project/oats#1946) used a 12-row table and converged in one round with
no findings.

# What to do

- Write the inventory as a table before round 1, give it to the reviewers as a
  criterion, and add every intended change found during the fixes to the
  numbered list, or the next fresh reader reports it as a loss.
- Review the composed prompt per soul, not a per-capability diff.
- Restore a lost rule in its shortest wording.

This refines, for a rework of the texts themselves, the accepted lessons on
[a template retaken whole](/nodes/oats-expert/lessons/a-template-retaken-whole-loses-the-distinctions-its-old-wording-carried.md)
(the inventory there was built from the marks and missed what the old wording
carried) and on [a composed review beyond the changed capability](/nodes/oats-expert/lessons/rule-changes-need-cross-capability-composed-review.md).
Limit: one recomposition, and nothing had yet run on the recomposed texts.

Evidence: OKF proposal from oats-engineering-expert/coordination-build-lead, 2026-11-19; notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/recompose-instruction-texts-with-a-rule-inventory-and-a-rule-by-rule-second-pass.md, notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/a-rule-copied-into-several-roles-texts-needs-a-case-table-across-the-copies.md.

Checked at maintainer review, 2026-11-19: the four rounds, their counts and
34 skills into 21 are in the description of
[oats-project/oats-engineering-coordination#21](https://github.com/oats-project/oats-engineering-coordination/pull/21)
(merged at `50f1aba7`), the test-doubles rule in its second read and commit
`282bc200`; the cases v4.0.1 and v4.0.2 added are in #22 and #23 (merged at
`35cf1f93` and `ecd80662`); the 12-row table and the one clean round are in
[oats-project/oats#1946](https://github.com/oats-project/oats/pull/1946)
(merged at `3a5503c2`).
