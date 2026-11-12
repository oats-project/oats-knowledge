---
type: Decision
title: Readers tolerate a stale generated index and a missing id on a bridged base; writers' gates refuse them
description: On a base with the subject layout, readers (the spawn hook, the subject verbs and, from 6.0.2, `oats okf bases`) read the committed generated indexes as they are and warn, `W_INDEX_STALE` for stale views (6.0.0) and `W_ID_MISSING` for a `claims/` concept merged without its id (6.0.2), while strict validation, `okf-reindex --check`, migration and publication still refuse them; because a refusing reader takes every version-2 soul off the air at spawn for one maintainer-upkeep slip; consequence: the 6.0 view format is final, and a renderer change costs every bridged base a regeneration PR.
about: [system/oats-okf]
kind: decision
id: dec-eb168e76219e
tags: [decision, okf, subject-layout, readers, writers, w-index-stale, w-id-missing, w-base-invalid, 6.0]
timestamp: 2026-11-12
---

# The decision

Readers tolerate, writers refuse. On a bridged base the spawn hook and the subject verbs read the committed generated
indexes as they are and surface one warning line per kind, in a fixed order: `W_INDEX_STALE: N generated files stale
at <alias@commit>; the maintainer regenerates (okf-reindex.mjs)` (6.0.0) and `W_ID_MISSING: N claims lack an id at
<alias@commit>; the maintainer stamps them (knowledge-review)` (6.0.2). `oats okf bases` joins them in 6.0.2; in
6.0.0 and 6.0.1 it showed no stale-index warning and read a base with an unstamped claim as `INVALID`.
`W_ID_MISSING` counts `claims/` concepts only: an old-node concept without `id` is a strict-validation warning that
readers tolerate too, but it is not counted. Every other finding still refuses the spawn and reads `INVALID` in `bases`.
In a running home the subject verbs answer such a base all the same: see "A base that fails validation" below.

The writers hold the line. `okf-validate.mjs --strict`, `okf-reindex.mjs --check`, migration and publication refuse
both kinds. `propose --check` validates the proposed tree with its generated indexes regenerated, and the proposal's
own claims carry no `id` because the maintainer stamps them. From 6.0.2 it reports an accepted `claims/` concept
without `id` that the proposal leaves untouched as `W_ID_MISSING` instead of refusing. In 6.0.2 an unstamped old-node
concept still made it refuse for every proposer on the base; from 6.0.3 (oats-okf #140) it is counted in the same
warning when the proposal leaves it untouched. The readers' count stays `claims/` only.

# A base that fails validation

A finding no reader tolerates divides the readers. The spawn refuses and `bases` reads `INVALID`, as before. The
subject verbs in a running home keep answering from the committed indexes and, from 6.0.3 (oats-okf #140), warn
`W_BASE_INVALID` with the first finding and a count of the rest, on stderr and in `warnings`. In 6.0.0 to 6.0.2 they
answered with no warning.

They warn rather than refuse because `cat`, `ls` and `search` already serve such a base, so refusing only the
subject verbs would take every running home off its knowledge for one bad merge while the plain readers went on.
Refusing like the spawn was the rejected alternative. Silence was the defect: it hid a broken base from the
instance reading it.

The first finding and the count ride on the cached invalid verdict as optional fields beside `error`, not inside
it, so `bases --json` did not change. The cache version did not move: a valid verdict is unchanged, and an invalid
one cached without the fields is judged again once. That is the narrower tool when only invalid verdicts gain
fields; [widening what a reader tolerates](/nodes/oats-okf-expert/lessons/widening-reader-tolerance-moves-the-validation-cache-version.md)
still needs the version to move. The finding is committed text, so control characters are removed before it is cut.

# Why

For 6.0.0 the proposer reports this, and the GitHub record does not show it: a live rehearsal of the 6.0 build
against the real base found every version-2 soul refused at spawn, because the base's views had been rendered by an
earlier build of the regenerator and read as stale. oats-okf #132 records the resulting reader tolerance and the two
focused review rounds on it. For 6.0.2: on the released 6.0.1, in a scratch deployment whose private base could not be
protected, one proposal merged without the maintainer's amend-and-merge made every new version-2 spawn refuse until
someone stamped the id. Running homes read on with no warning (oats-okf #138). One merge can leave a base stale or
unstamped. Taking a deployment's souls off the air for that is the wrong trade, but the gates that write to the base
must still hold the line.

# Consequences

- The view format is frozen at 6.0: a change to the renderer's output costs every bridged base a regeneration PR.
- The base's own CI runs `okf-reindex.mjs --check` (oats-knowledge #355), so stale views on a PR are caught there.
- The maintainer regenerates and stamps before merging. A claim merged without its stamp is repaired in a reviewed
  PR, and then the branch is protected (knowledge-review, "A claim merged without its id", 6.0.2).

# Evidence

- oats-okf #132 (merged 11 November 2026, released in 6.0.0): its body's "Differs from the spec" and "Known limits"
  give the reader tolerance, the writers' refusal and the frozen view format. The reviewers approved it as contract
  point 2 in [lane:setup's review](https://github.com/oats-project/oats-okf/pull/132#issuecomment-6777524721),
  [oats-expert-juan's review](https://github.com/oats-project/oats-okf/pull/132#issuecomment-6777534654) and the
  [release-lane sign-off](https://github.com/oats-project/oats-okf/pull/132#issuecomment-6795029788). The release-lane
  sign-off also notes that 6.0.0's `bases` reported no such warning.
- oats-okf #138 (issue, closed 11 November 2026) and #139 (merged 11 November 2026, released as 6.0.2) cover the id
  case, `bases` agreeing with the readers, and `propose --check`'s warning. The same three reviewers approved them as
  contract points 1, 2 and 4 in [lane:setup's review](https://github.com/oats-project/oats-okf/pull/139#issuecomment-6796590427),
  [oats-expert-juan's review](https://github.com/oats-project/oats-okf/pull/139#issuecomment-6796628436) and the
  [release-lane sign-off](https://github.com/oats-project/oats-okf/pull/139#issuecomment-6798364996). These are agent
  reviews posted under their humans' accounts. They are recorded as approvals in review, not as a human's own
  acceptance.
- Maintainer check at acceptance (11 November 2026), in the oats.okf 6.0.2 source: `validateBase` in `lib/stores.mjs`
  tolerates the two kinds only in reader mode on a subject-layout base, and matches `UNSTAMPED_ERROR` only for
  `claims/` concepts. `propose.mjs`'s `allow` drops only the untouched accepted unstamped claims. 6.0.0's
  `validateBase` tolerates the stale-index and old-node id warnings, but not a `claims/` concept without `id`.
- oats-okf #140 (issue, closed 12 November 2026) and #144 (merged 12 November 2026, released in 6.0.3, tagged the same
  day) cover the old-node case in `propose --check` and `W_BASE_INVALID`. The warning and the choice to warn were
  agreed by lane:setup and oats-expert-juan before the build, by mail (source-reported), and approved in review on
  #144 in [lane:setup's review](https://github.com/oats-project/oats-okf/pull/144#issuecomment-6828559974),
  [oats-expert-juan's review](https://github.com/oats-project/oats-okf/pull/144#issuecomment-6828576264) and the
  [release-lane sign-off](https://github.com/oats-project/oats-okf/pull/144#issuecomment-6828607926), each of which
  names the agreed warning; these are agent reviews, not a human's own acceptance.
  Verified by the pull request's tests; not rehearsed on a live deployment. Proposal of 12 November 2026, live source
  oats-okf-followups-okf-expert; notes/subject-verbs-warn-on-an-invalid-base-instead-of-refusing.md.
- Maintainer check at acceptance (12 November 2026), in the v6.0.3 source: `verdict()` in `lib/consult.mjs` still
  writes and accepts only `version: 4`, adds `first` and `count` beside `error` only on an invalid verdict, and judges
  again a cached `E_VALIDATION` verdict without `first`; `propose.mjs` filters untouched findings on `ID_WARNING`
  (any concept without `id`), while the readers' `unstamped` count still matches `UNSTAMPED_ERROR` (`claims/` only).
- Backing note: the proposer's notes on bridged-base warnings refusing readers and on the subject-layout build
  decisions (proposal of 11 November 2026, retired source subject-layer-developer).
