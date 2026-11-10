---
type: Lesson
title: A rehearsal's measurement must not change the state under test
description: Establish that a diagnostic preserves the state being measured, and compare unexplained transitions with the observer's own actions before attributing them to the system under test.
about: [workstream/provider-integration]
kind: lesson
id: ins-2b95fa963f77
tags: [integration, testing, rehearsal, measurement, evidence]
timestamp: 2026-10-30
---

# The observer belongs in the causal account

Before using a command as a measurement in a live rehearsal, establish that
it does not alter the state whose transition the test is meant to explain.
A command named as a read can also acknowledge or consume what it displays.
Its output then cannot establish what would have happened without that
inspection. Treat the affected run as contaminated, not as evidence of a
product failure or a pass.

When a transition's timestamp matches none of the expected system actions,
compare it with the rehearsal's own diagnostic commands before reporting a
fault. A match is a reason to investigate the observer, not by itself proof
of causality. Rerun with an observation path shown to preserve the measured
state.

# Why this check was added

The source reports one rehearsal on **2026-10-30, aw 1.36.35** in which its
own `aw mail inbox` check acknowledged the message it was inspecting. The
read timestamp matched that command rather than the system actions being
tested; the source nearly reported a delivery loss. It voided that run and
reported a clean rerun using the sender's `aw mail show --message-id` view
of `read_at` instead.

That is a version-bounded, source-reported observation, not an independently
reproduced result or a guarantee about every CLI version and identity mode.
The reusable lesson is how to choose and validate the observer; current
command semantics belong to the tool's contract and its expert. Nor does
`read_at` alone prove model consumption: the existing
[acknowledgement-stage lesson](/nodes/integrations-expert/lessons/acknowledgement-stage-must-match-receipt.md)
owns which receipt can prove which delivery stage.

# Elimination route

Prefer a supported inspection surface that separates observation from
acknowledgement or consumption. In an executable rehearsal, validate the
chosen probe against disposable state and assert that the relevant state is
unchanged by the probe itself. Include a mutating-observer control that the
fixture must reject as contaminated. This turns the specific trap into a
regression guard rather than relying only on an operator remembering it.
These are proposed controls, not tests implemented or run by this harvest.

For mail, the deferred
[threads direction](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
records a non-acking conversation read as accepted by the aweb project; that
is a dependency of deferred work, not a command available today.

This refines [real-binary acceptance](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md):
using the real tool does not make the measurement apparatus neutral.
The [real-terminal observation lesson](/nodes/oats-expert/lessons/real-terminal-waits-prove-the-observed-state.md)
covers a passive observation that misreports the state; this one covers an
observation that changes it.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/a-check-can-change-what-it-checks.md.

The proposal supplies the client version and clean-rerun report; the named
note supplies the mistaken attribution and timestamp comparison. No live
rehearsal was repeated by this harvest.

Checked by the knowledge maintainer at review on 2026-10-30: the `aw mail
inbox --help` text of aw 1.36.35 itself says that messages shown by the
command are acknowledged as read, so the effect was declared, and a command's
help is the cheapest first check of an observer. The `aw mail show --help`
text of that version says nothing either way about acknowledgement, so it
does not establish that the rerun's observation path preserves read state;
that remains the source's report. No rehearsal was run here.
