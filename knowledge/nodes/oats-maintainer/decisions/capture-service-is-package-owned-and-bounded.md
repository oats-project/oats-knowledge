---
type: Decision
title: The capture service belongs to the record package and runs bounded passes
description: Capture direction replaces the unbounded watcher with package-owned periodic passes, retaining progress and failure isolation while avoiding a second in-pass scheduling mode.
about: [workstream/oats-direction]
id: dec-19c1cc67440b
tags: [direction, capture, package-boundary, scheduling, resource-limits]
timestamp: 2026-10-14
---
# Direction and why

The source reports direction on 2026-10-13 for a capture service safe to leave
running on an operator's machine: periodic passes bounded by heap, elapsed
time and resident memory, rather than an unbounded watcher. The bounds apply
to every trigger, not only the installed service. A memory incident had been
mitigated by one operator's wrapper; setup then replaced that job. A local
wrapper is not a product fix.

The service and its contract belong to the record package. Kernel health
reporting asks the package for its readout rather than parsing private package
state, so the package remains usable without the kernel. Service replacement
is a migration, not merely installation of a new file: account for old command
lines running new package code between upgrade and setup, and do not leave
both old and new captures active. Ownership recognition must include files
written before an ownership marker existed, without treating every file with
the expected label as ours.

The [resource-acceptance decision](/nodes/oats-kernel-expert/decisions/resource-limits-do-not-prove-incremental-work.md)
is canonical for algorithm-first correction and memory, storage, work and
progress proofs. Those requirements are already accepted knowledge; this
concept owns the service/package boundary and scheduling tradeoff, not a
second account of that evidence.

# Scheduling tradeoff reported on 2026-10-14

The proposal reports subsequent decisions on the same issue:

- Isolate a failing unit with backoff, so it cannot starve unrelated work.
- Narrow an interrupted multi-stream group across passes, admitting its
  members later as single-stream units. Do not add diagnostic starts inside
  a pass: one scheduling mode is easier to reason about than two. A measured
  starvation case is the stated reason to reconsider an in-pass fallback.
- Permit the service to rotate bounded batches among accounts sharing a
  stream, while preserving the synchronous capture API's whole-file order.
  Per-account order and IDs remain contracts; physical order across accounts
  is deliberately not one.

These later terms are proposal-only evidence: the named note ends earlier.
They are recorded as source-reported direction, not independently verified
acceptance, completed implementation or performance qualification. Wire-field
shapes, scheduling constants and unelaborated deferred work remain on the
issue and in the package contract, not copied into this concept.

# Enforcement and evidence

The real fix is the bounded runner and service migration in the package,
with tests for upgrade from its released service shape, failure isolation and
progress across interrupted passes. A resource ceiling is not a substitute
for the linked algorithm qualification, and this record claims none of those
checks already passed.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-pepe, 2026-10-14; notes/the-capture-service-is-bounded-and-the-packages-own.md.

The note cites [awebai/oats#1108](https://github.com/awebai/oats/issues/1108),
comments 6151642608 and 6151667127 for direction and package-boundary terms.
The proposal cites comments 6164912188, 6165524097, 6165530069, 6165685192,
6165761446, 6165830717 and 6167753913 for the later terms. This harvest read
the proposal and note, not those discussions, and did not independently
establish human acceptance.
