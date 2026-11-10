---
type: Lesson
title: Scripted provider checks separate product questions from harness blockers
description: Run a harness-free provider pre-check before newcomer onboarding to expose setup and join failures without waiting for model login, while keeping test-rig faults and full acceptance separate.
about: [workstream/operations]
kind: lesson
id: ins-a3eaadb2eb39
tags: [operator, onboarding, acceptance, trials, failure-attribution]
timestamp: 2026-11-05
---
# Answer the product question before the harness question

A full agent-driven onboarding run mixes product behavior, the harness's
login and permission state, and the trial rig. The source's campaign chose
a scripted provider pre-check first: exercise owner setup, invite issuance
and each supported join form on a disposable VM without an agent harness.
This gives an answer about those product steps even when model login blocks
the full run, and gives a cheaper first check for a changed
[client/provider/service combination](/nodes/oats-operator-expert/lessons/onboarding-evidence-follows-the-live-version-combination.md).

Removing the harness removes that dependency from the pre-check; it does
**not** remove the test rig. The source's first attempt failed on a missing
parent directory and a shell environment missing the tool's executable
location. Report such fixture failures separately rather than calling them
product refusals or dismissing all failures as harness trouble.

# What the pre-check does not prove

The source reports that both the labelled and invite-only join forms passed
their membership checks while the full onboarding run still waited for a
harness login. This is useful partial evidence, not a newcomer pass. It
exercised no conversational consent round, automatic message delivery or
exact-ID reply, and it cannot establish comprehension, harness permission
or a measured end-to-end improvement.

[Onboarding passes on the newcomer's experience](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
already owns the human-accepted rule that command predicates are insufficient.
This lesson adds the sequencing and fault-attribution rationale, not a new
acceptance standard. The integration owner's
[whole-lifecycle real-binary gate](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
and [bounded partial-proof lesson](/nodes/integrations-expert/lessons/credential-free-harness-probes-have-bounded-proof.md)
remain separate: passing setup and join cannot certify unrun lifecycle legs.

A harness-free fixture is not a way to perform an action that the person's
harness refused. It needs its own authorized test scope. Testing hosted
first-use behavior uses the existing
[hosted-build exception](/nodes/oats-operator-expert/decisions/disposable-trials-prefer-local-messaging.md),
with explicit remote-state cleanup accounting; deleting the VM does not
delete hosted accounts. The full run still uses native harness authentication
and respects required human actions.

# Elimination route and evidence

Keep the pre-check in an executable trial driver, with distinct owner and
joiner contexts, environment preflights, separate step results and read-only
membership assertions. Keep invite tokens in protected input, out of argv,
logs and reports. Reproduce discovered product failures in the owning
component's regressions; cover the rig's directory and executable-resolution
failures in the driver. Command recipes belong in maintained setup/provider
guidance, not in this concept. These are proposed controls, not a certified
implementation or proof of complete fixture isolation.

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-05; notes/scripted-pre-check-separates-product-from-harness.md.

The pre-check result, harness blocker and rig faults are source-reported.
This harvest did not inspect the script or raw results, repeat the run or
measure time saved. The source selected this test order; no additional human
acceptance or workspace-wide policy is claimed.
