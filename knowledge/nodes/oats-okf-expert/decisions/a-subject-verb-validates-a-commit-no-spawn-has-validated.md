---
type: Decision
title: A subject verb that reads a commit no spawn or `bases` has validated validates it once, so W_INDEX_STALE is not silent on a moved base
description: The `W_INDEX_STALE` warning comes from the per-commit validation cache; the 6.0.0 build read only what was cached and so was silent exactly after `--fresh` or a fetch that moved the accepted branch, when staleness is most likely; a subject verb now validates such a commit once and caches it, at the price of one whole-base validation per new commit per host (spawn already pays it); kept: an offline context never fetches for the warning, a validation that cannot run gives no warning, caches nothing and is retried next read, and the verb's answer never depends on it; rejected: documenting the gap as a known limit.
about: [system/oats-okf]
id: dec-30e09cab5c1c
tags: [decision, okf, subject-verbs, w-index-stale, validation-cache, 6.0]
timestamp: 2026-11-11
---

# The decision

The "verbs never scan the base" principle has one deliberate exception: a subject verb (`subjects`, `subject`,
`claims`, `index` for a version-2 soul, `verdicts --check`) that reads an accepted commit no spawn or `bases` has
validated on this host validates it once, caches the verdict, and warns as the spawn hook would. Cost: one whole-base
validation per new commit per host, which spawn already pays.

# Constraints kept

- An offline context (the spawn brief) never fetches to produce the warning.
- A validation that cannot run gives no warning, caches nothing, and is retried on the next read.
- The verb's answer never depends on the validation; only the warning does.

# Rejected

Documenting the gap as a known limit: the silence fell exactly after `--fresh` or a fetch that moved the branch,
when staleness is most likely, and the 6.0.0 release note had to carry it as its known limit until 6.0.1 fixed it.

# Related

The warning this exception makes reliable, and why readers warn rather than refuse, is the accepted decision
[readers tolerate a stale generated index and a missing id; writers' gates refuse them](/nodes/oats-okf-expert/decisions/readers-tolerate-a-stale-index-and-a-missing-id-writers-refuse-them.md).

# Evidence

oats-okf #136 (11 November 2026, the release lane's follow-up 2): all six verb forms warn on the first read of a
moved commit, after `--fresh` and after a due fetch; reviewers probed offline reads, injected validation failure and
three concurrent first readers. Released in 6.0.1 (CHANGELOG, "`W_INDEX_STALE` on a moved commit (6.0.0's known
limit)"). Source-reported, not on the PR record: the developer also rehearsed the moved-commit warning live against
the real base.
