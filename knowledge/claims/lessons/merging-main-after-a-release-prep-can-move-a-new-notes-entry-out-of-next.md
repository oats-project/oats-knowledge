---
type: Lesson
title: "Merging main after a release prep can move a branch's new release-notes entry out of next/"
description: "A release prep removes docs/release-notes/next/ from main, and when Git pairs one of its entries with the new notes file as a rename it treats next/ as renamed, so merging main into a branch that adds an entry there moves the entry up a directory; try the merge with merge-tree first, merge with -X no-renames and prove the PR's own diff is unchanged."
id: ins-a752769c758d
about: [workstream/coordination]
kind: lesson
tags: [release-notes, merges, git, landing]
timestamp: 2026-11-22
---

# What happened

A pull request added its entry as `docs/release-notes/next/<issue>-<slug>.md`. While it waited, the
release prep merged and moved every entry out of `next/`, so the directory no longer existed on
main; Git recorded one of the old entries as renamed to the version's notes file. A trial merge
(`git merge-tree --write-tree HEAD origin/main`) reported "CONFLICT (file location): ...
added in HEAD inside a directory that was renamed", and proposed the entry at
`docs/release-notes/<issue>-<slug>.md`. The source reports that GitHub still showed the pull
request as mergeable.

# What to do

- After a release prep lands, try the merge with `git merge-tree --write-tree HEAD origin/main`
  before merging main into a branch that adds a `next/` entry.
- Merge with `git merge -X no-renames origin/main`, and check the entry is still under `next/`.
  `-X no-renames` turns rename detection off for every path, so the next step is not optional.
- Show that the merge left the pull request's own diff unchanged: `git diff <old-base> <old-head> | git patch-id --stable`
  equals `git diff origin/main HEAD | git patch-id --stable`. On the pull request this came from,
  the lane maintainer's green light accepted that check as carrying the earlier review rounds to
  the merge head. Where the diff changed, it carries nothing: see
  [coupled Desktop and kernel landings](/nodes/oats-desktop-expert/lessons/coupled-kernel-and-desktop-landings.md).

# Why it matters

An entry outside `next/` is skipped when the release lane assembles the notes
(`scripts/assemble-release-notes.mjs` reads only the files directly under `next/`) and is
published at the wrong path. Nothing else flags it: the tag gate checks only that `next/` is
empty, the entry test reads only `next/`, and the conflict shows only in a local merge.

A release prep landing under a waiting pull request has another cost, in its claims and its
corrected entries: [a pull request on hold can have a release pass underneath it](/claims/lessons/a-pr-on-hold-can-have-a-release-pass-underneath-it.md).

# Elimination route

A check in oats-project/oats that refuses any file directly under `docs/release-notes/` that is
not a version's notes file would turn the moved entry into a CI failure; until then, this lesson.

# Citations

1. [oats-project/oats#2099](https://github.com/oats-project/oats/pull/2099) (release prep 0.70.5),
   merged 2026-11-22 at `e5e7a2a4`: it removes `next/` from main, and GitHub lists one entry as
   renamed to `docs/release-notes/v0.70.5.md`.
2. [oats-project/oats#2100](https://github.com/oats-project/oats/pull/2100), merged 2026-11-22:
   `git merge-tree --write-tree bd64ab7a e5e7a2a4` reproduces the file-location conflict and the
   proposed path at maintainer review; with `-X no-renames` it merges cleanly; the merge commit
   `58852463` keeps `docs/release-notes/next/2095-status-line-host-name.md`. The lane maintainer's
   green light ([comment](https://github.com/oats-project/oats/pull/2100#issuecomment-7087532945))
   records the same patch-id and the review carried. GitHub's mergeable state at the time is
   source-reported.
3. oats-project/oats `scripts/assemble-release-notes.mjs`, `scripts/release-lane.mjs`,
   `test/release-notes-entries.test.mjs` and `docs/release-lane.md` ("Release-notes entries") at
   `main`, read at maintainer review 2026-11-23.
