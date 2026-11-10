---
type: Decision
title: A client probe must not turn kernel unknown into a confident state
description: Preserve a kernel-unknown row and its recorded session facts rather than manufacture liveness or terminal eligibility from a weaker client probe.
about: [system/oats-desktop]
id: dec-d26e5e3f46fc
tags: [desktop, liveness, observation, shared-code, truthfulness]
timestamp: 2026-10-14
---
# Decision and accepted cost

The source records the rule chosen on 2026-10-10–11 and later agreed: a local
row answered with `running: null` is not refined by the client's pane probe.
Keep the kernel's state and error, and do not offer terminal opening on the
strength of that unknown row. A Session card shows only the kernel-recorded
session or nothing; the probe's default session name is not an observation.

The client probe was the weaker observer for important failure cases. A
missing socket did not establish the absence of a process, and an unreadable
record could make the probe search under default names instead of the
recorded target. Filling these gaps would turn a failed kernel read into a
confident client state. Sharing the collector also prevents two clients from
disagreeing about the same unknown.

The accepted cost is one roster-read interval of unknown even when a
transient kernel read failure might be followed by a successful local probe.
Distinguishing that cause by reading the error's prose was rejected: prose
is not a machine contract.

# Why this predicate and this boundary

Key the exception on the kernel's explicit unknown liveness value, not an
enumeration of runtime-state names. A name list must grow whenever the kernel
adds a state; suppressing probes whenever any state name exists would stop
refining even a known-running row if the kernel later named it.

Put the skip in the shared collector, alongside its other no-probe rule,
not in a later merge that would need to undo invented observations. Applying
it only to the state badge is insufficient: associated session facts and
terminal eligibility must respect the same evidential limit. Keeping a
default session label for continuity was rejected because it asserts a
session nobody observed.

The whole collector may still fail and turn known rows into unknown with a
client-authored reason. That is not the prohibited reverse inference. This
decision concerns explicit kernel unknown; it does not assign new semantics
to malformed or missing fields.

# Enforcement and related knowledge

Protect the no-probe path in the collector, then carry representative unknown
rows through session display and terminal-opening composition tests. The
[verification lesson](../lessons/verification-judgment-for-privileged-surfaces.md#additive-acceptance-is-not-operator-visible-parity)
owns why a reader-only test is insufficient. This decision supplies the
accepted liveness tradeoff, complementing
[CLI authority](standalone-product-and-cli-authority.md) and
[shared terminal opening](shared-terminal-opening-keeps-context-and-client-scope.md).

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-REDACTED-desktop-queue, 2026-10-14; notes/kernel-unknown-is-not-probed.md; notes/an-unprobed-row-shows-only-the-session-the-kernel-recorded.md.

The notes identify [awebai/oats#855](https://github.com/awebai/oats/issues/855)
(comments 6102201022 and 6110081333). The first note's initial pending status
is explicitly updated on 2026-10-14 to agreed and built in
[#970](https://github.com/awebai/oats/pull/970). The proposal cites
[#1096](https://github.com/awebai/oats/issues/1096) for the Desktop opening-site
audit. Agreement, implementation and audit results are source-reported, not
independently checked by this harvest. The second note does not establish
which partial session-record shapes a real kernel emits; no such guarantee
is inferred here.
