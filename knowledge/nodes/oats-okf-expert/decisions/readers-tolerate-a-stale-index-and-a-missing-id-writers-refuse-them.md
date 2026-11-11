---
type: Decision
title: Readers tolerate a stale generated index and a missing id on a bridged base; writers' gates refuse them
description: On a base with the subject layout, readers (the spawn hook, the subject verbs and, from 6.0.2, `oats okf bases`) read the committed generated indexes as they are and warn, `W_INDEX_STALE` for stale views (6.0.0) and `W_ID_MISSING` for a `claims/` concept merged without its id (6.0.2), while strict validation, `okf-reindex --check`, migration and publication still refuse them; because a refusing reader takes every version-2 soul off the air at spawn for one maintainer-upkeep slip; consequence: the 6.0 view format is final, and a renderer change costs every bridged base a regeneration PR.
about: [system/oats-okf]
kind: decision
id: dec-eb168e76219e
tags: [decision, okf, subject-layout, readers, writers, w-index-stale, w-id-missing, 6.0]
timestamp: 2026-11-11
---

# The decision

Readers tolerate, writers refuse. On a bridged base the spawn hook and the subject verbs read the committed generated
indexes as they are and surface one warning line per kind, in a fixed order: `W_INDEX_STALE: N generated files stale
at <alias@commit>; the maintainer regenerates (okf-reindex.mjs)` (6.0.0) and `W_ID_MISSING: N claims lack an id at
<alias@commit>; the maintainer stamps them (knowledge-review)` (6.0.2). `oats okf bases` joins them in 6.0.2; in
6.0.0 and 6.0.1 it showed no stale-index warning and read a base with an unstamped claim as `INVALID`.
`W_ID_MISSING` counts `claims/` concepts only: an old-node concept without `id` is a strict-validation warning that
readers tolerate too, but it is not counted. Every other finding still refuses a reader.

The writers hold the line. `okf-validate.mjs --strict`, `okf-reindex.mjs --check`, migration and publication refuse
both kinds. `propose --check` validates the proposed tree with its generated indexes regenerated, and the proposal's
own claims carry no `id` because the maintainer stamps them. From 6.0.2 it reports an accepted `claims/` concept
without `id` that the proposal leaves untouched as `W_ID_MISSING` instead of refusing. An unstamped old-node concept
still makes it refuse, which is a known follow-up.

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
- Backing note: the proposer's notes on bridged-base warnings refusing readers and on the subject-layout build
  decisions (proposal of 11 November 2026, retired source subject-layer-developer).
