---
type: Lesson
title: Nested deadlines must let the inner outcome reach the view
description: A view's promise to show a bounded kernel answer requires every enclosing wait to outlast the inner one, including intermediary proxy classes omitted by endpoint-only review.
about: [system/oats-desktop]
kind: lesson
id: ins-e048f7151195
tags: [desktop, deadlines, transport, verification, truthfulness]
timestamp: 2026-10-14
---
# The missing middle invalidated the visible promise

The source reports two reviews that found the same specification gap: a
kernel operation and its adapter had adequate bounds, but the Electron proxy
between the server route and renderer did not. Reading the route and the
view had missed the waiting layer between them.

For a request that waits for the kernel's final answer, establish the chain
of deadlines from the kernel through the CLI adapter, route, main-process
proxy and renderer. Each enclosing wait must allow the inner bounded answer
to arrive, with transport overhead; a shorter middle deadline makes the
slowest supported outcome unreachable even when both endpoints implement
their specs correctly. Route classification is part of this reasoning, not
just the numeric limit at the endpoints.

The first reported case gave the proxy 20 seconds while the kernel could
answer at its 30-second launch-prompt bound. The view therefore got a proxy
timeout instead of the very outcome the spec promised to show. The second
case needed a refresh-route proxy class above its adapter's limit. These
numbers explain the failures; they are not permanent timeout configuration.

# Bound a response separately from a long-running job

This is not a rule to hold every request open for the whole operation.
[Preview-bounded spawn outcomes](../decisions/preview-bounded-spawn-outcomes.md)
already chooses a short response returning an outcome or `pending`, while a
broker retains the job and its separate deadline. Apply the nesting check
to the answer a particular request promises, not to the total lifetime of
work that intentionally outlives it. That accepted decision is unchanged.

Nor does a client timeout prove the underlying operation ended. The source's
gated-kernel experiment found that aborting the request did not stop the
server's CLI call. Report uncertainty rather than infer rollback or invite
retry from a missing response. This does not authorize signalling, killing
or retrying an in-flight operation.

# Elimination route

Prefer deadline relationships derived from the actual call bounds rather
than independently copied constants. Keep regression coverage that reads
the effective limits, includes the proxy's route classification, and drives
a slow bounded answer through the composition. A route-only unit test cannot
protect a missing proxy class. Use inert gated producers for timing tests;
this lesson grants no authority to run native effects on an operator's
machine. The durable lesson is the expert's full-chain evidence requirement,
not a manual timeout table in knowledge.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-partner-desktop-queue, 2026-10-14; notes/an-outcome-must-outlive-every-hop-deadline.md.

The note dates the launch-prompt review for
[awebai/oats#917](https://github.com/awebai/oats/issues/917) to 2026-10-11 and
records the recurrence in [#1118](https://github.com/awebai/oats/pull/1118) on
2026-10-14. It reports a 70-second refresh proxy above a 60-second adapter.
Review findings and the abort experiment are source-reported, not audited or
rerun by this harvest. Derived limits and composition regressions are the
elimination route, not a claim that all routes now have those protections.
