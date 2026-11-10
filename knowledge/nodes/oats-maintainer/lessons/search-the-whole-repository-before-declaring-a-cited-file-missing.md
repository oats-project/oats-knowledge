---
type: Lesson
title: Search the whole repository before declaring a cited file missing
description: A file cited by an older note that is absent from the directory you expected is not evidence that it was renamed or removed; a name search across the whole tree costs seconds and an invented history, once written into accepted knowledge, is a defect a reviewer has to catch.
about: [workstream/oats-direction, workstream/knowledge]
kind: lesson
id: ins-4d0ff7892acf
tags: [lesson, verification, knowledge, review]
timestamp: 2026-09-21
---

Learned 2026-09-21 while judging legacy notes into a new knowledge bundle.

A conformance vector cited by name was looked up only under the directory
where vectors were assumed to live. Not finding it there, the concept was
written with a sentence saying the file had been renamed after the decision
was recorded. The file existed unchanged in another package's directory and a
test read it by that exact name; the reviewer found it in one search.

The general rule: before writing that a cited artefact is missing, renamed or
moved, search the whole tree for the name and for consumers of the name.
Absence from one directory is a fact about that directory. If the search
still finds nothing, say that the search found nothing and where it looked,
and never supply a history for the absence.
