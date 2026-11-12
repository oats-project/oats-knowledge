---
type: Lesson
title: A text-pattern guard's exact contract is written before its first review
description: Review a hand-written matcher against a loose criterion ("fails on any unlisted home path") and each fresh adversarial reviewer finds a new boundary input. Narrowing the criterion mid-loop is a contract change and costs a fresh round each time. State the matched shape, what ends it, what it skips and what is out of scope in "Done when", with tests at those boundaries, before round 1.
about: [workstream/coordination]
kind: lesson
id: ins-6113673ac843
tags: [review-loop, guard, tests, specification, acceptance]
timestamp: 2026-11-12
---

# The lesson

A cheap repository guard (a regular expression over text files for owners' home paths) was
reviewed against the criterion "fails on a home directory whose owner is not an invented one".
Four review rounds in a row, each with a fresh reviewer on another model family, returned
CHANGES NEEDED. Each found a real input at a boundary of the matcher:

- owners beyond ASCII, or an invented owner's name followed by more letters;
- a home directory whose own name held a space or a quote;
- a dot before the next `/`, and every `$`-prefixed segment being skipped;
- `|` and `*` ending the owner early.

Some were real gaps and were fixed. Others were inputs a cheap guard shouldn't try to cover:
telling a quoted path's closing quote from one inside the name needs a quote-aware reader for
each file type. Each of those was put out of scope by narrowing the criterion. A narrowed
criterion is a contract change, so the next round had to be a fresh reviewer on the whole
change rather than a re-read of the delta. The loop hit its four-round cap and needed a fifth.

# How to apply

For any guard or validator built on a text pattern, write its contract into "Done when" before
the first review:

- the shape it matches and the characters a match may hold;
- what ends a match (separators) and what it skips (interpolation, escapes);
- what is deliberately out of scope, and who catches that instead (usually review).

Then test those boundaries before round 1. The reviewer checks a stated contract instead of
discovering it, and a scope question becomes a reply rather than a finding.

This prevents the loop that a must-fix cut-off closes: when a hardening loop is already running
on code that parses untrusted input,
[a hardening review loop needs a cut-off](/nodes/oats-okf-expert/lessons/a-hardening-review-loop-needs-a-cut-off.md)
says how to end it without losing a must-fix.

# Evidence and limits

Evidence: OKF proposal from oats-engineering-expert/neutral-fixtures-lead, 2026-11-12;
notes/text-guards-need-their-contract-written-first.md. One guard and five rounds in one
effort; the count of rounds is from the lead's own loop.

Verified by maintainer review on 2026-11-12: the body of
[oats-project/oats PR 1910](https://github.com/oats-project/oats/pull/1910) (merged
2026-11-12) records five rounds, each with a fresh reviewer on another model family, rounds 1
to 4 each finding a matcher edge case and round 5 approving. It also lists the guard's narrowed
scope, and its commits fix the boundaries listed above. The per-round findings, the four-round
cap and which narrowings needed a whole-change round are source-reported.
