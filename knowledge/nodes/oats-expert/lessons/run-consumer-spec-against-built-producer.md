---
type: Lesson
title: Run the consumer spec against the built producer before handover
description: When a consumer spec predates its shared producer, exercise its compositions against the built code before handing it to the developer; matching names does not establish matching behavior.
about: [workstream/coordination]
kind: lesson
id: ins-f40b9e58d786
tags: [planning, integration, shared-code, verification]
timestamp: 2026-10-12
---
# A correct list of names can describe a wrong composition

A lead may have to draft a consumer spec from the producer's spec before the
shared implementation exists. Treat that draft as provisional. Once the
producer is built, exercise the consumer's proposed compositions against it
with representative inputs **before developer handover**, rather than only
checking exported names and signatures. The developer can faithfully build
a composition whose premise was wrong.

In the source's second-client effort, this check exposed both an incorrect
argument and a missing association between rows and their deployments. The
latter made a stale observation appear current despite using the intended
shared helpers. Exercising pending, unavailable, observed and stale inputs
exposed behavior that a name-by-name comparison had missed.

# Reuse the rule, not only its parts

When the shared producer already offers the composition that serves the
first client and it fits the second client's need, use that composition.
Reassembling its smaller helpers in the consumer creates another copy of
the rule, including any associations or state transitions between calls.
If the composition does not fit, resolve that with its owner rather than
quietly restoring the omitted behavior in the new client.

This is a later check than [owner review before estimating a second
client](/nodes/oats-expert/lessons/import-closure-needs-owner-review.md): that
review establishes what must be shared; this check establishes that the
lead's actual consumer spec uses the built interface correctly. It also
precedes the implementation-level [coupled-consumer verification](/nodes/oats-desktop-expert/lessons/coupled-kernel-and-desktop-landings.md).
Neither check replaces the other.

A composition that passes with all the first client's inputs supplied has
not shown that each input is needed: [a passing composition does not prove
every copied input is needed](/nodes/oats-expert/lessons/prove-copied-inputs-are-needed.md)
owns that separate question.

A later, prose-specific responsibility remains with the spec author:
[recheck dictated words against the build](/nodes/oats-expert/lessons/recheck-dictated-words-against-the-build.md)
before opening the PR. Correctly built compositions do not establish that
wording fixed earlier in the spec still describes them.

After implementation, [check the affected-test inventory at handback](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md):
when suites run only in CI, a green list of selected files can omit existing
tests of changed surfaces. That selection check is distinct from proving
the spec's composition here.

# Elimination route

Keep one owner-reviewed composition for shared rules. Turn the useful probe
cases into executable consumer-contract or integration tests, and use real
producer fixtures rather than incomplete hand-built shapes. Type checking
can catch an argument mismatch; behavior tests must catch a plausible but
wrong composition. The durable lesson is the lead's handover timing and
choice of evidence, not a permanent manual script or an API inventory.
No new release gate or permission to change the producer is implied.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-12;
notes/spec-2b-draws-from-paneldata.md.

The note dates the check to 2026-10-11. The proposal identifies the producer
[awebai/oats#970](https://github.com/awebai/oats/pull/970) and consumer
[#978](https://github.com/awebai/oats/pull/978) in the
[terminal-client effort](https://github.com/awebai/oats/issues/855).
The source reports that using the shared composition produced the expected
states. These are source-reported checks, not code execution independently
repeated by this harvest or a claim that the consumer shipped.
