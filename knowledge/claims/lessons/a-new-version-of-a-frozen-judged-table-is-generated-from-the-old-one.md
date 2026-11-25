---
type: Lesson
title: A new version of a frozen judged table is generated from the old one plus a file of the re-judged cells; reproduce the old count before moving a row
description: When a frozen judgment document (a parity matrix, an audit table) gets a new version in which only some rows are judged again, a small script builds it from the frozen file, one file holding only the re-judged cells, and a new header. The script's classifier must first reproduce the frozen version's own count; then the new count is the old one with exactly the re-judged rows moved, and the header says which rows were not judged again. An input the brief names by what it should hold is checked against its own README before a verdict rests on it.
about: [workstream/coordination]
kind: lesson
id: ins-498081096dee
tags: [lesson, parity-matrix, audit, versioning, evidence, helper]
timestamp: 2026-11-25
---

# Lesson

A long judged table (here a parity matrix of about 1,100 rows, frozen at each version) needed
a new version after a few weeks of building: about one row in eight had to be judged again,
the rest had to stand as they were. Edited by hand, such a table loses the line between what
was judged now and what was carried over, and a recount of rows nobody re-read presents old
verdicts as new ones.

Built by a script, it keeps that line. The inputs are the frozen file, untouched; one file
that holds only the re-judged cells, one record per row, with a mark for "keep the old cell";
and the new header. The diff between the two versions is then the cells file, and a reader
checks that file instead of the whole table. The list of changes (old verdict, new verdict,
per row) falls out of the same run.

# What to do

- Never edit the frozen version. Generate the next one from it.
- Before moving any row in the summary count, make the script's classifier reproduce the
  frozen version's own count from the frozen cells. If it does, the new count is the old one
  with exactly the re-judged rows moved. If it does not, say so in the header and present
  the numbers as a delta, not as a recount.
- Say in the header which rows were re-judged, and that every other row keeps the earlier
  version's cells and may be out of date. List the rows that a change plainly touched and
  that could not be checked.
- Write a verdict only for what was checked. Where a row was not checked, keep the old cell
  and name the row.

# An input named by what it should hold

A brief can name an input by what it is supposed to hold ("the image set made with every
page on"). Open it and check it against its own README or commit file before a verdict rests
on it. Here the set named was made with the same default as the set it was meant to
complement, and the only images of the hidden pages were of an older commit. The cells then
say "an older commit" instead of claiming a current image, and the sender is told.

# Evidence

Version 5 of the OATS-in-bb parity matrix, 2026-11-25: 131 rows re-judged, 61 changed their
class, and the classifier reproduced the earlier version's ten-class count over 349 rows
exactly before any row moved.

Evidence: OKF proposal from oats-engineering-expert/bb-matrix-v5-helper, 2026-11-25
(oats-knowledge#470); notes/a-new-version-of-a-frozen-judged-table-is-generated-not-edited.md.
The matrix and its counts are the source's report; the matrix is not on GitHub.
