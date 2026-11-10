---
type: Decision
title: Cache fetch cleanup waits out possible writers
description: Failed-fetch temporary files are reclaimed only after the longest fetch can have elapsed because a new write lock and a before-and-after listing cannot establish ownership against older lock-free Git writers.
about: [system/oats-kernel]
id: dec-94c0f85ee995
tags: [kernel, git, cache, cleanup, concurrency, compatibility]
timestamp: 2026-10-13
---
# Decision

The source's 2026-10-13 review records a correction to failed-fetch cleanup:
leave fresh temporary files alone. A later fetch, under the cache write
lock, removes only temporary files older than the longest fetch. This is a
bounded-age policy for these fetch artifacts, not permission to delete
arbitrary caches or reclaim live-holder locks [1].

## Why immediate cleanup was rejected

Git chooses the temporary filename. A file that appeared during a failed
attempt is therefore not proven to belong to that attempt. Older kernels
can still fetch into the same cache without taking the new write lock;
serializing new writers does not serialize those old writers. The source
reports that a review probe's lock-free second writer lost its live pack to
the first version's immediate cleanup [1].

The tempting promise that a failed fetch leaves nothing behind was stronger
than the ownership evidence. A before-and-after directory comparison could
not make it true safely. The selected rule accepts temporary leftovers
rather than risk destroying another fetch's in-progress output. Its safety
argument depends on an actual bound on fetch lifetime: changes to that bound
or to which processes may write here must revisit the cleanup threshold,
not retain a magic age indefinitely.

## Deferred alternative and enforcement

A per-fetch quarantine would provide exact ownership and permit immediate
cleanup. The source records that alternative as deferred because it changes
the cache design, rather than as inherently undesirable. Reconsider it if
exact cleanup becomes necessary; do not approximate ownership from filename
appearance while retaining the shared directory.

The elimination route is ownership isolation or enforced lifetime-bounded
cleanup in the cache implementation, with a lock-free second-writer
regression alongside the new lock-respecting path. The proposal reports
that coverage; this harvest did not run it. This decision complements the
[negotiated fetch and single retry](/nodes/oats-kernel-expert/decisions/cache-fetch-negotiates-before-one-whole-retry.md),
whose unsuccessful first attempt makes correct cleanup important. It does
not replace the distinct [record-lock liveness policy](/nodes/oats-kernel-expert/decisions/record-lock-liveness-tradeoff.md).

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/cache-fetch-negotiates-then-retries-whole.md.

1. The note's final review section supersedes its earlier immediate-cleanup
   assumption. It attributes the live-pack loss and corrected rule to review
   of [awebai/oats#1075](https://github.com/awebai/oats/pull/1075), following
   [awebai/oats#1059](https://github.com/awebai/oats/issues/1059). Maintainer
   agreement and implementation status are source-reported, not independently
   established human acceptance or an audited implementation claim.
2. Verified by the knowledge maintainer at review of the harvest on 2026-10-13. [awebai/oats#1059, comment 6136289377](https://github.com/awebai/oats/issues/1059#issuecomment-6136289377) records the lead's decision after the first review round: the lock-free second writer whose temporary pack was removed while it lived, why a file that appeared during an attempt cannot be told from one made by it, the age rule as Git's own for its temporary files, and the per-fetch quarantine left undone because it changes how every fetch writes the cache. [awebai/oats#1075](https://github.com/awebai/oats/pull/1075), merged on 2026-10-13 with both maintainer sides approving the head that merged, derives the age bound from the fetch timeout plus a margin in one place and reports that writer as a regression test; the repository owns the current value. The comments are maintainer-lane records posted from the two maintainers' accounts, not evidence of human acceptance, and no release was checked.
