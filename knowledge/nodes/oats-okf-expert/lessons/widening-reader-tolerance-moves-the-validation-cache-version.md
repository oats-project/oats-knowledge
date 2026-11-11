---
type: Lesson
title: Widening what a reader tolerates moves the validation cache version, or a cached refusal sticks
description: Validation verdicts are cached per accepted commit with a version, so any change to what a reader accepts or to the verdict's fields must bump that version (6.0.2: 3 → 4), or hosts keep refusing a commit they cached as invalid; the three reading surfaces (spawn, subject verbs, `bases`) must report one line per commit.
about: [system/oats-okf]
kind: lesson
id: ins-44d160ef84eb
tags: [lesson, okf, validation-cache, readers, w-id-missing, upgrade]
timestamp: 2026-11-11
---

# The cache remembers the old rule

The spawn hook, `oats okf bases` and the subject verbs read a per-commit validation verdict from the host cache rather
than re-validating (a verb validates a commit only when none is cached for it, per
[a subject verb validates a commit no spawn has validated](/nodes/oats-okf-expert/decisions/a-subject-verb-validates-a-commit-no-spawn-has-validated.md)).
The verdict carries the version of the rule that produced it. When a release widens what readers
tolerate (6.0.2: a `claims/` concept without `id` becomes `W_ID_MISSING` instead of a refusal) without moving that
version, every host that already cached `ok:false` for the accepted commit keeps refusing it after the upgrade, and the
fix looks broken exactly where it was needed.

# The rule

Any change to what a reader accepts, or to the verdict's fields, bumps the verdict version (6.0.2: 3 → 4), and the
regression test plants the previous version's invalid verdict and asserts the new reader re-judges the commit.

Nothing in the code ties the version to the reader rules: in 6.0.2 it is a literal written in `verdict()` in
`lib/consult.mjs` (twice where a verdict is produced, once where a cached one is accepted), and the comment there
records why each version moved. The bump is kept by review and by each change's own regression test; a test that
fails when the tolerated kinds change without a version move would retire this lesson.

# Corollary: one line for one commit

The three reading surfaces must say the same thing about one commit. In 6.0.0/6.0.1 `bases` reported INVALID for an
unstamped claim while running homes read on silently and new spawns were refused: three answers, none naming an
action. 6.0.2 makes `bases` agree with the readers (valid, with the warning line) while the writers' gates keep
refusing. The decision itself, and its canonical record, is
[readers tolerate a stale index and a missing id; writers refuse them](/nodes/oats-okf-expert/decisions/readers-tolerate-a-stale-index-and-a-missing-id-writers-refuse-them.md).

# Evidence

- oats-okf #138 (issue, closed 11 November 2026): observed on the released 6.0.1 in a scratch deployment; spawn
  refused, `bases` read INVALID, the subject verbs answered with no warning.
- oats-okf #139 (merged 11 November 2026, tagged v6.0.2): moves the cached validation from version 3 to 4 (adding
  `unstamped`); its test "a validation cached by 6.0.0/6.0.1 (version 3, invalid) is judged again" plants the version 3
  verdict and checks that spawn, the verbs and `bases` print the same line. The PR body reports that all new tests
  fail on the 6.0.1 library. Two reviews and the release-lane sign-off approved it; these are agent reviews posted
  under their humans' accounts, recorded as approvals in review.
- Maintainer check at acceptance (11 November 2026), in the v6.0.2 source: `verdict()` in `lib/consult.mjs` returns
  and accepts only `version: 4`; the subject verbs' warnings read that cached verdict for a Git base.
- Backing notes: the proposer's notes on the verdict cache version and on the base not being able to assume the
  maintainer gate (proposal of 11 November 2026, retired source okf-602-id-missing-developer, operator form).
