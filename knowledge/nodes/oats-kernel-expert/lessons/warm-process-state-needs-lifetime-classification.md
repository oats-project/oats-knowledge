---
type: Lesson
title: A warm process needs lifetime classification, not just a cache-reset list
description: A warm-reader review missed a process-long WeakMap and misclassified a live-child registry, so repeated kernel calls need explicit reset, drain and safe-with-reason lifetimes backed by closure and equivalence tests.
about: [system/oats-kernel]
kind: lesson
id: ins-f23ad24489f3
tags: [kernel, lifecycle, performance, caching, testing]
timestamp: 2026-10-29
---
# What the review uncovered

The 2026-10-29 warm-reader specification review found two omissions in an
otherwise careful per-request reset list: a Git-version memo keyed by the
module-constant execution function, and a live-Git-process-group registry
classified as resettable. The one-shot CLI had made process exit an implicit
invalidation and cleanup boundary. Keeping its code loaded for repeated
requests changes that assumption without changing the functions themselves.

The first miss could retain an external fact after it changed; the second
could erase the only bookkeeping for children still needing cleanup. These
are plausible stale answers and orphaned work, not necessarily crashes.
The lesson is why a hand-maintained list of things called caches is an
insufficient review boundary, not a second inventory of current kernel state.

# Classify lifetime and obligation separately

For every module-level mutable binding in the read closure, establish one
of three treatments:

- **Reset per request:** observations of external facts and request-local
  bookkeeping must not silently become app-lifetime data. The review's
  Git-version memo illustrates why the container type is not evidence of
  freshness: a WeakMap keyed by the real execution function lives as long
  as that module-constant key. Inspect the key's lifetime, not just the
  presence of a WeakMap. The reported version gate matters to
  [helper-free Git observation](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md),
  not only to performance.
- **Drain, never merely clear:** a live-child registry represents cleanup
  obligations, not reusable observations. Its request-end invariant is
  that no live children remain registered because their work and cleanup
  have ended; emptying the set does not establish that fact.
- **Safe only with a reason:** per-request-object WeakMap keys, self-cleaning
  synchronization, boot-lifetime facts and installation-derived constants
  have different lifetime arguments. None is a blanket exemption. The last
  category depends on detecting a changed installation and ending the warm
  process rather than continuing with a mixture of old code and new inputs.

The review also identified two process-lifetime hazards outside a cache
list. Reusing the CLI read-session setup per call adds process listeners
repeatedly and competes with the host's handlers. A dependency's own signal
handler can call `process.exit`, so the source required an exit-path cleanup
backstop rather than relying only on the host's signal handlers. These are
review conclusions for the examined closure, not proof that runtime cleanup
has been implemented or exercised.

# Installation identity includes runtime inputs

The proposed installation-change stamp must cover what loaded code consumes,
not only module files: bundled data, directory listings whose added entries
change behavior, the install root's inode because a global package update can
replace the directory, and the Node binary. An unchanged module list does not
establish an unchanged running installation. Keep the concrete input set
with the implementation and its tests, not in this knowledge record.

# Eliminate reliance on reviewer memory

Prefer explicit request lifetimes while retaining the
[one-owner rule for extracted state](/nodes/oats-kernel-expert/decisions/hot-read-imports-preserve-contracts-and-static-boundaries.md).
The source's elimination route is a closure tripwire that accounts for every
module-level mutable binding with a reset, drain or safe-with-reason treatment,
plus multi-request equivalence tests. A named reset list alone cannot catch
an omitted binding; a complete binding list alone cannot prove its lifetime
classification is correct. The tests must challenge changed external facts
and outstanding cleanup obligations across requests, not only compare one
successful response with a fresh CLI.

This is temporary knowledge debt until the architecture and executable gates
carry those obligations. The kernel expert changing the read closure owns
updating this lesson when the guarantees or their enforcement change. No
completed gate or shipped reader is certified here. The maintainer's
[app-owned reader decision](/nodes/oats-maintainer/decisions/no-cli-rewrite-app-owned-reader.md)
remains the canonical home for the product choice and the warm-code/not-warm-data
criterion; this lesson neither reopens nor supersedes it.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/warm-reader-kernel-expert, 2026-10-29; notes/warm-process-turns-lifetime-caches-into-data.md.

The source reports reviewing the warm-reader specification for
[awebai/oats#1630](https://github.com/awebai/oats/issues/1630) against
`ad48f6eac887`, and that the findings were folded into the specification.
This was review-time code reading, not a build or runtime reproduction; the
reader was not built at that checkpoint. The harvest used the captured
proposal and named note only, without independently auditing the code,
specification acceptance or implementation. No observed stale response,
orphaned child, safety bypass or delivered performance gain is asserted.
