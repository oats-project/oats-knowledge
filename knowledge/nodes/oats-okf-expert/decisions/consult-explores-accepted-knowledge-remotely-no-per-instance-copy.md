---
type: Decision
title: Consult explores accepted knowledge remotely; instances get no knowledge copy
description: Instances read their soul's OKF bases remotely at the accepted commit through read-only consult commands served from one host-wide cache, with receipts and base confinement; no instance holds a knowledge copy, and consultation works whether harvest is on or off.
about: [system/oats-okf, workstream/knowledge]
id: dec-515608970d00
tags: [decision, okf, knowledge, consult, skill]
timestamp: 2026-09-26
---

Decided 2026-09-26 on the human's direction for oats.okf 3.0.0; current as of
oats.okf 4.0.3 ([Consult](https://github.com/awebai/oats/blob/main/docs/knowledge.md#consult)).
An instance explores its soul's knowledge as it would a local copy (index →
links → full files) but against the accepted remote state, with nothing copied
into its home. Before 3.0.0 every okf instance got a full `./knowledge/`
snapshot at spawn and `read`/`refresh` wrote a view directory per call; for
large bases that cost disk, spawn time and freshness.

**Decision.**

1. **Consult commands** are the capability's own CLI (`oats okf bases | index
   | cat | ls | search | links`), read-only. Each resolves the base's
   **accepted** commit (never an open PR), serves it from one host-wide bare
   partial-clone cache per Git base under the bindings' `stateDir` (directory
   bases are read in place) and answers with a receipt
   `{ base, kind, commit|digest, fetchedAt, stale }`, so a citation reads
   `alias/node/concept.md@<short-oid>`. Freshness is the `consult-max-age`
   setting (default 300 s) plus `--fresh`; a failed fetch serves the cached
   commit marked `stale`; no cache and no network is a typed error.
2. **Confinement.** Every path resolves inside its base, only Markdown is
   served, and there is no ref override: nothing widens acceptance. Since
   4.0.1 every tree entry of the accepted commit is contained, and a bad entry
   refuses the whole base.
3. **No per-instance copy, no compatibility verbs.** A spawn writes no
   `./knowledge/` and no view; a leftover 2.x `./knowledge/` is ignored.
   `refresh` (3.0.0) and `read` (4.0.0) answer `E_REMOVED` naming `index` and
   `cat`: a verb whose meaning no longer exists misleads if it silently does
   something else.
4. **Consultation is independent of harvest.** It needs only the binding;
   the host's harvest switch (default off) governs capture, not reading.
5. **Taught by a skill, stated by the inject.** Working souls get the
   `okf-consultation` skill (start-of-task checklist, consult-while-working
   triggers, navigation without bulk-loading, citing, freshness) beside
   `okf-instance-knowledge`; the inject states the work mode in a few lines.
   The kernel needs nothing: a capability's `commands:` are its CLI.

**Rejected.** A spawn-time snapshot (disk, spawn time, staleness); per-call
view directories; an opt-in materialized copy (dropped from the same-day
2.2.0 draft); a per-instance cache (duplicates one host fact per home); keeping
`refresh` as an alias (emulation that misleads); a ref override (lets a
reader widen what counts as accepted).

Related: [workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)
(package repositories carry their expert soul).
