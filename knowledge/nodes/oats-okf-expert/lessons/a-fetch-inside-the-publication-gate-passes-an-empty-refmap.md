---
type: Lesson
title: A fetch inside the publication gate passes an empty --refmap= and reads the tip from FETCH_HEAD
description: A source-only fetch still applies the clone's configured refspec destinations and can overwrite a local branch before any compare-and-swap; every helper fetch passes an empty `--refmap=` and the gate reads the tip from `FETCH_HEAD^{commit}`.
about: [system/oats-okf]
kind: lesson
id: ins-e0292ee4e062
tags: [lesson, okf, publication, git, fetch, refmap, base-moved, review]
timestamp: 2026-11-11
---

# A fetch is not a read of the remote only

`git fetch origin refs/heads/<branch>` with a source-only refspec is not read-only for local refs. Git also applies the
clone's configured `remote.origin.fetch` destinations to it (the opportunistic update). A valid configured mapping such
as `+refs/heads/main:refs/heads/<any local branch>` therefore lets the fetch overwrite an unrelated local branch, or
the proposal branch itself when it is not checked out. That happens before, and outside, any compare-and-swap the
publication helper does afterwards, which cannot undo it. When the mapped branch is the one checked out, Git refuses
the whole fetch instead (`refusing to fetch into branch ... checked out`), so the same configuration turns into a
failed fetch rather than an overwrite.

# The rule

Any fetch in the publication helper (both shipped copies) passes an empty `--refmap=`. It then writes only objects
and `FETCH_HEAD`, not even remote-tracking refs, and the gate reads the fetched tip from `FETCH_HEAD^{commit}`. The
only local ref the gate moves is the one it compare-and-swaps.

# Why it outlives the fix

The helper's gates already distrust ambient configuration (pushurl, insteadOf rewrites, hooks, replacement objects,
inherited `GIT_*` selectors). A fetch looks like a harmless read, so a future change adding one (to a maintenance
command, or to `propose`, which reuses `create`) would plausibly omit the flag. Whoever writes or reviews such a fetch
adds `--refmap=` and takes the tip from `FETCH_HEAD`, never from a remote-tracking ref. Until this lesson, the rule
lived in one code comment at the one fetch, and the regression test covers only that fetch.

The route that would retire this lesson is a test asserting that every `fetch` the helper runs carries `--refmap=`
(the helper has one fetch per copy today); until such a test exists, this lesson is the guard for new fetches.

# Evidence

- Verified by the maintainer review on 2026-11-11: the fix is commit `808e44c92` ("Recovery fetch writes no local ref
  through configured fetch destinations") in oats-project/oats-okf#130, merged 2026-11-10 and first released in
  oats.okf 6.0.0. Its regression test (`the recovery fetch writes no local ref through configured fetch destinations`
  in `test/okf5-publication.test.mjs`) maps `main` onto an unrelated local branch and asserts that branch and
  `refs/remotes/origin/main` stay unchanged while `FETCH_HEAD` is the new tip; it passes with the flag and fails
  without it (re-run at oats.okf 6.0.2). The opportunistic overwrite of an unrelated branch, and Git's refusal when
  the mapped branch is checked out, were reproduced with Git 2.55.0 on a local bare remote.
- Source-reported (the proposer's backing note): the first review round of #130 found the overwrite against the
  shipped helper, where `create` succeeded and silently moved an unrelated local safety branch, and a mapping onto
  the proposal ref overwrote the proposal before the CAS returned `E_HEAD_MOVED`; a second round checked configured
  tag pruning and remote-HEAD following under these options and saw no ref updates. These review rounds are not on
  the GitHub record of #130.
- Git's documentation of `--refmap`: an empty value makes Git ignore the configured refspecs and rely only on the
  refspecs given on the command line. The behaviour is not transport-specific.
