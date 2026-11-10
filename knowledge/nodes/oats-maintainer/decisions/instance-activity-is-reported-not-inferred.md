---
type: Decision
title: Working and idle are producer-reported facts, not terminal heuristics
description: Harness producers report main-thread activity through one kernel writer, within the existing hook budget, so clients never infer idleness from terminal silence or turn unknown into idle.
about: [workstream/oats-direction, system/oats-desktop]
id: dec-4eaa8d223e4c
tags: [runtime, activity, ownership, harnesses, desktop, truthfulness]
timestamp: 2026-10-26
---
# Decision and rationale

On 2026-10-26, the source reports that the release lane agreed this contract
in response to a product-owner request for an idle indicator. **This records
an agreed direction, not evidence of implementation or release.** The
cross-domain decision belongs here: harness producers observe turns, the
kernel records the reported fact, and clients render it.

`running` establishes that the harness process is up; it does not establish
whether the main agent is working or idle. The agreed addition is optional
`activity: { state: "working" | "idle", since, producer } | null` on
`oats status --json` instance rows, gated by the `instance-activity` feature.
The field is a reported observation, not a kernel or client inference.

This applies the existing
[runtime, messaging and viewer ownership split](runtime-messaging-viewer-ownership.md)
and the rule that [kernel JSON is the Desktop's model](desktop-parity-lifecycle-and-policy.md#the-kernels-json-is-the-desktops-model-2026-09-24).
It does not move harness-specific turn detection into the kernel or grant
viewers session ownership.

# Constraints that make the decision useful

- **One writer path.** Producers report through a kernel verb in the
  waiting-claim family, with storage managed like waiting claims. The kernel
  owns the record's format and lifetime; it neither reads a producer-written
  activity file nor tries to infer activity itself.
- **No extra process per turn.** Reporting rides the hook invocation already
  made at turn boundaries. For Claude, the named boundaries are
  `UserPromptSubmit`, `Stop` and `SessionEnd`. The agreed requirement is to
  retain the existing two-second budget and success exit, without adding a
  prompt-blocking dependency or another process startup per turn. These are
  acceptance constraints, not a claim that timing or failure behavior has
  been verified.
- **Main thread only.** A subagent stopping or a tool call is not evidence
  that the instance's main agent became idle.
- **Session-bounded lifetime.** Start, stop and restart invalidate the
  report. Activity is returned only on a running row, and reading it requires
  no terminal or tmux inspection. A report from an earlier session must not
  masquerade as the current session's activity.
- **Unknown stays unknown.** `null` does not mean idle. A harness without a
  turn-start hook stays `null`, rather than acquiring an inferred answer.
  A conservative visual fallback is not evidence of working either; this
  decision does not prescribe a dot style or relabel unknown as a known
  activity state.

# Rejected alternatives

**Infer idle from pane activity or recent redraws.** Terminal silence is not
idleness: a model may be generating for a long time without drawing new
output. The heuristic also adds a terminal read per instance on each refresh
and fails to provide a host-independent signal for remote instances. It is
both a weaker observation and the wrong cost model for a roster fact.

**Add a separate reporting process or let each client derive activity.** A
second process at every turn boundary spends the interactive budget on
bookkeeping. Client-side derivation creates competing observers instead of
one reported fact. Reuse the existing producer call and kernel writer;
leave missing producer support visible as unknown.

# Scope and related knowledge

This is a cross-layer ownership and cost decision, not a second wire-spec or
an implementation checklist. Exact verb syntax, storage mechanics and
released support belong with the implementation's contracts. It does not
supersede the [kernel's generic responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md).
The Desktop's [unknown-liveness rule](/nodes/oats-desktop-expert/decisions/kernel-unknown-is-not-refined-by-a-client-probe.md)
concerns a different observation but preserves the same limit on weaker
client evidence. Activity does not replace the separate
[needs-input signal](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md).

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-desktop, 2026-10-26; notes/instance-activity-contract.md.

The proposal and note report release-lane agreement on 2026-10-26 and point
to [awebai/oats#1546](https://github.com/awebai/oats/issues/1546). That agreement
is source-reported, not independently audited by this harvest. The
product-owner request does not establish direct human acceptance of every
contract detail. No implementation, release, timing test or live harness
verification is claimed.
