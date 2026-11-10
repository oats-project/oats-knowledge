---
type: Lesson
title: Check who never reaches a registry's writers
description: Before fixing a per-user registry's writer set, check that CLI-only, client-only and pre-existing users reach it, and weigh automatic population by its steady-state cost and preservation of explicit removal.
about: [workstream/coordination]
kind: lesson
id: ins-fa9c4b1d02ae
tags: [planning, registries, user-paths, performance]
timestamp: 2026-10-19
---
# Writer correctness does not establish population coverage

A registry can have correct readers and writers yet omit the users it was
introduced to serve. Before fixing the writer set, enumerate the relevant
user paths: CLI-only use, client-only use and state created before the
feature. For each, identify what actually makes its entry appear. Creation,
client opening and manual add are not sufficient merely because together
they look like all the explicit write operations; an existing CLI-only
user may never pass through any of them.

The deployments-list proposal initially rejected automatic population on
kernel commands to keep hot reads free of locked writes. The source reports
that this missed an existing CLI-only deployment and prompted an amendment.
The important omission was the population check, not incorrect code in an
individual writer.

# Separate population cost from steady-state read cost

Before rejecting automatic population on performance grounds, evaluate a
bounded, lock-free membership read followed by a lock only for an unlisted
entry, skipping the attempt if busy. This check-then-lock shape can separate
ordinary listed-path cost from first registration. It is a candidate to
measure under the intended contract, not proof that every registry should
auto-register or that a skipped attempt guarantees immediate visibility.

Automatic population also changes removal semantics: deleting an entry
alone allows the next ordinary command to add it again. Preserve explicit
removal intent; the source's registry used a tombstone so removal wins over
automatic addition. Do not mistake an efficient add path for a complete
population contract.

This is a specific application of [comparing a lead's leaning with
alternatives before specifying it](/nodes/oats-expert/lessons/compare-a-leaning-with-alternatives-before-specifying.md):
the distinguishing evidence here is user-path coverage and listed-path
cost, not merely a working writer. Automatic population also brings the
[per-user-file isolation obligation](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md)
into the same delivery plan.

# Elimination route

Put population and removal semantics in the responsible shared boundary,
then encode the user-path matrix and removal-followed-by-ordinary-use case
as regression tests. Measure listed, unlisted and contended paths rather
than carrying a remembered benchmark forward as a budget. Specification
guidance should ask who never reaches the proposed writers. These are
prevention routes, not a claim that this harvest audited their coverage.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-deployments-list, 2026-10-19; notes/registry-population-gap.md.

The source attributes the explicit-writer restriction and its reversal to
the spec and amendment in [awebai/oats#1390](https://github.com/awebai/oats/issues/1390).
The proposal reports implementation through
[PR #1396](https://github.com/awebai/oats/pull/1396),
[PR #1402](https://github.com/awebai/oats/pull/1402) and
[PR #1404](https://github.com/awebai/oats/pull/1404).
These are evidence pointers for one effort and one registry, not an
independently audited implementation, performance or human-acceptance
receipt. The lesson does not establish a universal registration policy or
supersede a kernel contract.
