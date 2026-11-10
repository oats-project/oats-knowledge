---
type: Decision
title: Resource limits do not prove bounded or incremental reconciliation
description: Reconciliation acceptance separately qualifies memory, staged-data backing storage, content work and durability work with caps disabled, then proves continued progress with caps enabled.
about: [system/oats-kernel]
id: dec-37c4d940131a
tags: [kernel, reconciliation, performance, evidence, resource-limits]
timestamp: 2026-10-13
---
# Decision

Treat resource limits as a protective backstop, not evidence that a
reconciliation algorithm uses bounded memory or does incremental work.
The source reports founder direction and agreement from both maintainer
lanes on 2026-10-13 rejecting a bounded wrapper as the algorithm correction
[1]. Fix and qualify the memory and work behavior independently of service
migration or its resource policy.

The case was the record package's capture pass, which reconciles harness
transcripts and messaging logs into the record and its index [2].

Acceptance needs separate evidence:

1. With resource caps disabled, increase input size while keeping record
   size fixed and measure memory scaling. A process stopped by a limit has
   not demonstrated that its allocation is independent of history size.
2. With caps disabled, measure content read and records parsed for unchanged
   input and small appends, including fresh processes. Work must track newly
   appended content rather than repeatedly reading and parsing old history.
3. With caps enabled, demonstrate continued progress across bounded passes.
   One successful capped pass does not establish that later passes reach
   the backlog or finish the required work.

A capped worker can repeatedly stop at the same point while respecting
every limit. Streaming can remove a large allocation while still rereading
the entire journal on every invocation. Neither result alone proves both
memory boundedness and incremental work. Keep the limits as defense, but do
not use them to excuse input-size allocations, historical rescans or a
worker that cannot make progress.

## Storage and durability refinement — 2026-10-13

The acceptance dimensions above also require an explicit account of where
staged data lives and how much durability work a pass performs. Process RSS
and content-byte counters alone cannot establish total resource cost:

- Moving staged payloads out of the heap into system temporary storage can
  move memory pressure into tmpfs, outside process RSS. Name and qualify the
  backing storage instead of treating a spill as proof that memory pressure
  disappeared.
- An unchanged pass can avoid historical content reads yet still perform
  synchronous database transactions proportional to stream count. Count
  connection and transaction work separately from bytes read and records
  parsed; neither content bounds nor RSS establishes latency or completion.

The source reports that a Linux btrfs/tmpfs probe exposed both gaps after
large-source scaling, deterministic read-work regressions and independent
review had passed [3]. That is the reason for extending the acceptance
model. The timing evidence was one run per tree, under unequal light load,
through library calls only: it warrants investigation and qualified
disclosure, not a universal slowdown factor or service-level qualification.
The note's later small SQL experiment supports structural amplification;
it did not measure fsyncs. These are source-reported findings, not
measurements reproduced by this harvest.

The note reports acceptance of scratch storage on the record volume and an
explicit deferral of transaction amortization, with Linux service acceptance
and disclosure still required [3]. A scoped deferral does not establish that
the durability cost is solved. This refinement adds evidence dimensions to
the existing decision; it does not replace the content-work or progress
requirements.

Maintainer verification qualifies the account of the probe [4]. The fixed
transaction cost of a pass with nothing new had already been read in the
code, and carried into the later service's acceptance, before the probe's
results were returned.
What the probe added was the staging in temporary storage and the cost of
the first pass after an upgrade, which the return calls the larger part. The
return also gives the reason the earlier measurements missed that cost: they
ran on a host where a sync is nearly free. Where a qualification runs is
therefore part of the evidence, not a detail of it.

# Elimination route

Correct the algorithm and retain small deterministic allocation and
content-work regressions in the permanent suite. Count bytes read and
records parsed for unchanged input, small growth and fresh processes; keep
large scaling measurements outside ordinary CI. Choose backing storage for
temporary payloads explicitly and provide cleanup that respects ownership.
Retain deterministic connection/transaction-work regressions, and qualify
first-upgrade and no-op passes on representative storage where durable
commits matter before accepting the bounded service. Preserve sync and
crash guarantees; weakening them to improve a benchmark changes the
contract being measured. Disclose resource dimensions left unmeasured.
These checks enforce the
acceptance distinction; the durable decision records why success under
caps cannot substitute for them. This records implementation direction,
not completed fixes, landed tests or measured performance.

# Related

[Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md)
owns the security boundary for observing another agent's tree. This decision
adds a separate resource-and-progress acceptance criterion for reconciliation.

[Narrow race evidence needs unpaused controls and bounded fixtures](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md)
owns experimental resource containment; disabling the worker's caps for a
measurement does not remove that fixture discipline.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-upgrade-fixes, 2026-10-13; notes/resource-limits-do-not-prove-incremental-work.md.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-upgrade-fixes, 2026-10-13; notes/resource-evidence-includes-storage.md.

1. The proposal and named note attribute algorithm-first direction to the
   founder and agreement to both maintainer lanes in
   [awebai/oats#1108, direction](https://github.com/awebai/oats/issues/1108#issuecomment-6151859713),
   [release-lane agreement](https://github.com/awebai/oats/issues/1108#issuecomment-6151968578)
   and [lead acceptance](https://github.com/awebai/oats/issues/1108#issuecomment-6152021799).
   Acceptance is source-reported: this harvest read the proposal and named
   note, not those discussions, and did not reproduce a performance measurement.
2. Verified by the knowledge maintainer at review of the harvest on
   2026-10-13. [awebai/oats#1108](https://github.com/awebai/oats/issues/1108)
   is where the capture service of the record package was specified after
   an operator had bounded capture with a wrapper of their own. Comment
   6151859713, posted by one maintainer side's expert lane, presents as
   that side's human direction that the memory and time problems are
   defects of the algorithm, that a cap would only hide them, and that
   acceptance runs with the limits off (peak memory within a small constant
   whatever the input size, and the work of a pass proportional to the new
   bytes) and then with them on as a backstop. The lead's acceptance terms
   are in
   [comment 6151890080](https://github.com/awebai/oats/issues/1108#issuecomment-6151890080),
   which the citation above does not name: fixed line size, batch and cache
   settings over increasing inputs; peak memory and bytes read and records
   parsed, not elapsed time alone; no scan of historical bytes on an
   unchanged pass or a one-record append, the first append of each process
   included; then the limits on and completion over several passes. The
   same comment measures an initial build, a rebuild of lost derived state
   and an explicit final-snapshot verification separately from steady-state
   passes, forbids removing a corruption check to pass a speed measurement,
   and says a stop at a limit does not classify a normal input as
   malformed. Comment 6151968578 agrees for the release lane, asks that the
   algorithm fixes be a pull request of their own merged before the service
   work, and keeps in the suite the tests that count bytes read and records
   parsed at small sizes, with the multi-gigabyte run reported and not
   added to CI; comment 6152021799 accepts. The progress requirement is
   older than the algorithm-first direction: the release lane's
   [comment 6151667127](https://github.com/awebai/oats/issues/1108#issuecomment-6151667127)
   asks that a bound come with a progress guarantee, because a bounded
   service that never finishes and reports nothing wrong is worse than the
   unbounded one. A capped pass that stalls is a design concern in these
   comments, not a reported observation. The issue was open at review, and
   no fix, test or measurement was checked. The comments are maintainer-lane
   records posted from the two maintainers' accounts; beyond the first
   one's own attribution they are not evidence of human acceptance.
3. The storage refinement's proposal and named note cite the
   [maintainer return](https://github.com/awebai/oats/pull/1114#issuecomment-6155040571),
   [probe and evidence boundaries](https://github.com/awebai/oats/pull/1114#issuecomment-6155076265)
   and [lead's scoped deferral](https://github.com/awebai/oats/pull/1114#issuecomment-6155143669).
   These links are reviewer evidence pointers: this harvest read the
   proposal and named note, not those discussions, and does not independently
   establish acceptance or claim that a transaction fix is complete.
4. Verified by the knowledge maintainer at review of the storage refinement
   on 2026-10-13. [awebai/oats#1114](https://github.com/awebai/oats/pull/1114)
   is the standalone algorithm prerequisite of awebai/oats#1108. Comment
   6155040571 is the release lane's return of a head the other maintainer
   side had approved, from running that head beside main on a Linux host
   whose record root was on btrfs and whose temporary directory was tmpfs.
   Its second finding is that snapshots and a claims database were staged in
   the system temporary directory, which on such a host is memory or swap
   that the process's own RSS does not show, on the first pass after the
   upgrade and on every recovery. The path was confirmed by an ordinary pass
   failing when the temporary directory was missing; no memory held in tmpfs
   was measured. Its third finding is the durability cost over 2,000
   five-line transcripts: a first pass and its index rebuild slower than
   main by large one-run factors, and passes with nothing new or one added
   line slower by smaller ones, read there as a database connection opened
   per append and per stream and several synced commits where main syncs
   once. The same comment says the earlier limits-off measurements did not
   see this because they ran on a host where a sync is nearly free. The
   fixed cost of a pass with nothing new was not first exposed by the probe:
   [comment 6154585899](https://github.com/awebai/oats/pull/1114#issuecomment-6154585899),
   which the citation above does not name, had read it in the code, each
   stream opening the capture database and taking a write transaction at
   least twice per pass, and
   [comment 6154599350](https://github.com/awebai/oats/pull/1114#issuecomment-6154599350)
   records it as an acceptance requirement of the later service, measured
   over 1,300 or more streams against the deadline. Comment 6155076265
   gives the probe and its limits as the refinement states them: library
   calls with no capture lock, status file or root discovery, one run per
   tree, the head's while the host did other light work and main's alone.
   It adds that a rerun on a quiet Linux runner is the number to quote.
   Comment 6155143669 is the lead's deferral, taking an exit the return had
   offered in advance: the cost goes beyond passing one connection down,
   because validation and checkpoint state and the per-stream index commits
   have separate transaction and lock lifetimes, so the redesign goes to the
   later service with first-upgrade and no-op measurements beside the
   previous release on a Linux runner and with connection and transaction
   counts, and the pull request discloses the remaining first-pass cost. The
   same comment places scratch privately inside the record root, with
   cleanup under the capture lock removing only recognized allocations whose
   local owner is demonstrably dead. The other maintainer side concurs with
   the return and withdraws its approval of that head in
   [comment 6155075299](https://github.com/awebai/oats/pull/1114#issuecomment-6155075299).
   The small SQL experiment rests on the source's note alone: none of these
   comments carries it, and the pull request's description says of its SQL
   counts only that they are not fsync or timing claims. The pull request
   was open and unmerged at review, and no fix, test or measurement was
   checked. The comments are maintainer-lane records posted from the two
   maintainers' accounts, not evidence of human acceptance.
