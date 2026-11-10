---
type: Lesson
title: Credential-free harness probes establish only the boundary they exercise
description: A real TUI with a local stub provider can test input consumption without login, while real sandbox commands test particular permissions; neither substitutes for authenticated end-to-end acceptance.
about: [workstream/provider-integration]
kind: lesson
id: ins-d96f545456ff
tags: [integration, testing, harnesses, authentication, sandbox, evidence]
timestamp: 2026-10-30
---
# Preserve useful partial evidence without calling it a pass

A missing harness login need not block every integration investigation.
First separate the question that requires a real provider from the boundary
that can be exercised without one. In the reported Codex investigation, the
real TUI against a local Responses stub, driven through the kernel's own
input function, exposed idle input consumption and busy-turn queueing
without a credential. Running the real operation through the released
sandbox runner separately exposed its permission failure.

This is a narrower proof, not a relaxation of
[whole-lifecycle real-binary acceptance](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md).
Report the exercised boundary and the missing end-to-end legs separately.
A model request observed at the stub does not establish real-provider
execution, scheduler triggering, or successful completion of the requested
work. The existing [acknowledgement-stage lesson](/nodes/integrations-expert/lessons/acknowledgement-stage-must-match-receipt.md)
owns that distinction between queued, admitted and processed evidence.

Do not confuse an instrumented partial proof with an unconfigured process
that merely stays alive: the [Pi 1.3.0 no-provider finding](/nodes/integrations-expert/lessons/a-live-pi-tui-does-not-prove-provider-readiness.md)
reports a silent running TUI without useful execution, not evidence that a
prompt reached a model. Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/a-pi-reviewer-with-no-provider-is-silent.md.

# What the reported experiment established

On 2026-10-30, with OATS 0.69.6 and Codex 0.160.0, the source reports:

- A real Codex TUI in a scratch test context, a local stub provider and the
  kernel's input function produced a model request after idle input. In a
  confirmed busy turn, the TUI queued the input and sent it after the turn
  ended. This was **not a kernel-launched instance, did not exercise a
  schedule tick and used no real model**.
- An earlier busy-case run was invalid because the stub had failed to bind
  and the turn was never busy. Establish the precondition before interpreting
  queue behavior. This is an application of the generalist's
  [state-aware terminal observation rule](/nodes/oats-expert/lessons/real-terminal-waits-prove-the-observed-state.md),
  not a new production activity detector.
- `codex sandbox --permission-profile` running the actual commands found
  `oats schedule add` refused with `EROFS` under both `:workspace` and
  `:read-only`; the scheduling probe used a disabled job. An `oats spawn`
  probe under `:workspace` returned `E_REMOTE_UNREADABLE`. These are
  observations of particular operations in the tested environment, not an
  equivalence between spawn permission and scheduling permission.

Do not infer that every sandboxed Codex is unable to have children, or that
an instance able to spawn must also be able to set a wake. Test each needed
operation under the actual supported permission boundary. A refusal is a
result to report, not authorization to escape that boundary.

# Native authentication and fixture isolation remain separate

The scratch context is an explicitly unauthenticated test apparatus, never
a substitute native profile used to claim live launch or readiness. The
human-accepted [native authentication decision](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
remains unchanged: do not copy credentials, repair login, replace an
operator's selected profile or create an OATS credential layer to make a
proof pass. Authenticated end-to-end acceptance still needs the operator's
normally authenticated harness and the relevant authorization.

Likewise, using a real TUI does not remove the
[fixture-isolation obligation](/nodes/oats-expert/lessons/real-proof-boundaries-preserve-fixture-isolation.md).
A private socket alone does not establish a private principal or contain
host state. Partial evidence is useful only when its substitutions and
isolation limits are explicit.

# Elimination route

Put stub readiness, a positively observed busy turn, the input-consumption
observation and bounded teardown into an executable real-TUI fixture. Keep
real-operation sandbox probes separate from the provider stub so the fake
cannot accidentally grant a permission the real sandbox refuses. Preserve
negative results and require the missing authenticated launch, host-timer
and real-provider legs before claiming those properties. These are proposed
regression controls, not tests implemented or run by this harvest.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/prove-a-harness-you-cannot-log-in-to.md; notes/idle-waiter-wake-rehearsal.md.

Results are source-reported from one versioned experiment, not independently
reproduced. The reusable finding is how to obtain and label a cheaper partial
proof, not the host's login state or a promise that the same fixture works
for every harness.
