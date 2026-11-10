---
type: Lesson
title: A passing composition does not prove every copied input is needed
description: Before requiring a second client to retain state copied from the first, compare its composition with and without each candidate input and establish which consumer path actually needs it.
about: [workstream/coordination]
kind: lesson
id: ins-af3146f4e65c
tags: [planning, second-consumer, shared-code, state, verification]
timestamp: 2026-10-13
---
# Working with an input is not evidence for keeping it

A lead checking a second client's spec can reproduce the first client's
composition, supply all its inputs, and get the right answer while still
specifying unnecessary state. That successful run proves the supplied
composition works for the exercised cases; it does not prove each supplied
part is needed by the new consumer.

Before requiring the second client to keep a copied input, compare the same
representative consumer paths with and without that part. Check the built
producer's contract and use of the input as well: an unchanged happy-path
result alone is not proof of redundancy. Establish whether the shared code
already derives the value, or whether another path the second client needs
actually reads it. A part needed only by the first client's other callers
is not automatically a requirement of the second client.

The decision is what state the spec makes the developer maintain, not merely
whether the proposed calls run. When the required paths and contract do not
need the part, omit it instead of copying it for resemblance to the first
client. Unresolved necessity remains a question to settle with the shared
owner, not permission to delete a contractually required input.

# Why the omission check changed the spec

The source reports that its terminal-client spec retained precomputed panel
entries because the Desktop kept them and the lead's composition walk passed
with them. The developer found that the shared view function derived the
panels itself; the other reader of the retained entries was outside the
terminal client's scope. Repeating the walk without those entries produced
the same answers, so the spec dropped them. The avoidable cost was a second
copy of derived data with a separate opportunity to become stale.

This is distinct from [owner review before estimating a second
client](/nodes/oats-expert/lessons/import-closure-needs-owner-review.md), which
finds missing shared rules and callers. It asks the complementary question:
which parts of the first client's composition should **not** become the
second client's obligations? Checking that a composition is correct and
checking that every retained input is necessary are different judgments.

The correctness check has its own home: [run the consumer spec against the
built producer](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md)
before handover. A composition can pass that check, with every input
supplied, and still carry state the second client does not need.

# Elimination route

Prefer deriving a value in its shared owner over maintaining another copy
in each client. Preserve the useful omission cases in consumer-contract
coverage, and enforce the intended client boundary so later changes do not
reintroduce the redundant construction. The proposal reports such a boundary
test; this harvest has not audited it. Tests can preserve an established
minimal contract, but the lead still has to question copied obligations
when specifying a new consumer. This is not a permanent manual test recipe
or authority to change the first client's contract.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-13;
notes/spec-3-inputs.md (the 2026-10-13 panel-input finding).

The proposal places the finding in [awebai/oats#855](https://github.com/awebai/oats/issues/855)
and its consumer [#1057](https://github.com/awebai/oats/pull/1057).
The code inspection, paired runs, spec change and boundary test are
source-reported, not independently reproduced or audited by this harvest.
No current API inventory, shipped-status claim or new product decision is
promoted.
