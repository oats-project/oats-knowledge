---
type: Lesson
title: Pending lifecycle state is not evidence of failure
description: Require producer liveness to interpret held lifecycle rows, keep unknown retirement outcomes non-failing with secondary recovery, and reconcile each local apply only against a later covering observation.
about: [system/oats-desktop]
kind: lesson
id: ins-4608e065b023
tags: [desktop, lifecycle, retire, liveness, async, truthfulness]
timestamp: 2026-10-15
---
# A pending obligation does not say whether its worker failed

The 2026-10-15 retirement investigation found a misleading inference:
`retirePending` persisted both while self-retirement was under way and after
an unsuccessful or interrupted completion. Reading that marker as failure
made an ordinary self-retire display a failure and retry prompt throughout
its deferred wait and execution. Conversely, retirement started through a
client or CLI could hold the operation's claim without that marker. Neither
marker presence nor absence supplied the missing liveness fact.

Ask the producer for operation liveness and outcome rather than infer them
from a cleanup obligation. The source reports an agreed retire contract
distinguishing running, unknown, failed with code/message, and interrupted.
The client keeps running, unknown and an older kernel's bare `retirePending`
in a non-failure **Retiring…** presentation. This is conservative pending
presentation, not a claim that an unknown worker has been observed running.
Only a recorded failure justifies failure wording; preserve an explicit
interruption as interruption rather than invent a failure cause. Explain a
recorded failure through the existing display filter and
[attributed-kernel-text boundary](../decisions/shared-readers-separate-client-terms-and-kernel-prose.md),
not raw producer text or prose matching.

Keep Retire reachable but secondary, outside the row's primary affordances.
Unknown must not become a permanent dead end, yet a primary retry prompt
would misrepresent routine in-progress work. This choice relies on the
kernel's [whole-run retirement exclusion](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md):
a competing retire is refused before effects. It does not authorize automatic
retries, waive fresh-plan requirements or make a second arbitrary lifecycle
operation safe. The generalizable question is what liveness fact a held row
needs; the particular secondary-action policy must retain its producer-side
safety guarantee. Spawn already had a liveness fact, so this finding creates
no new missing-field claim for spawn.

# An answer and a later observation close different gaps

For the client's own apply, retain the in-flight presentation from submission
until a roster read **started after the answer** covers that row. A read
started earlier can finish later with pre-action state; arrival order alone
cannot release the hold truthfully. A refusal releases that apply's hold at
once because it reports that the action did not proceed.

Track each apply separately. If a second action is refused while the first
is still running, releasing the second must not release the first. This is
per-operation ownership, not permission to replace producer liveness with a
client-wide busy flag. The existing
[async intent lesson](asynchronous-intent-and-truthful-outcomes.md) owns the
broader stale-completion and mutation-reconciliation rules.

# Elimination route

Give held-state readers explicit producer liveness/outcome facts, then test
their composition into visible rows and action placement. Cover running,
unknown, legacy marker-only, recorded failure and interrupted outcomes;
include display-filter handling. Exercise a pre-answer roster read arriving
late, a post-answer read covering the row, an unrelated scoped read, and a
refused overlapping apply that must not clear the original hold. These are
code/contract enforcement routes, not claims that this harvest verified
shipped coverage. The retained expertise is the failed inference and the
reason conservative presentation still needs a reachable recovery path.

# Related

[A client probe must not turn kernel unknown into a confident state](../decisions/kernel-unknown-is-not-refined-by-a-client-probe.md)
owns the roster-liveness counterpart: an unknown row is not refined into a
confident state. [An unreached host keeps Stop and Retire available](../decisions/unreached-host-actions-use-the-plan.md)
keeps recovery reachable on unknown remote rows through a fresh plan; this
lesson applies the same stance to an unknown retirement outcome.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-retired-tabs, 2026-10-15; notes/retire-pending-reads-as-failure.md.

The note supports the marker/liveness gap and erroneous failure reading in
[awebai/oats#1247](https://github.com/awebai/oats/issues/1247). The final state
contract, secondary-action choice and per-apply observation boundary come
from the proposal, which reports lane-maintainer agreement and implementation
in [#1272](https://github.com/awebai/oats/pull/1272) and
[#1275](https://github.com/awebai/oats/pull/1275). Those acceptance, merge and
implementation claims were not independently audited; lane-maintainer
agreement is not inferred human acceptance. This lesson concerns retirement
presentation, not a universal failure taxonomy for all lifecycle verbs.
