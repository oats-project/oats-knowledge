---
type: Decision
title: Resume selectors and notices are execution-only
description: Resume selectors and notices belong only to the current execution, because persisting them would make later ordinary starts reopen an old conversation and break pi transcript-root certification.
about: [system/oats-kernel]
id: dec-ed67a0c55c7b
tags: [kernel, launch, recovery, persistence, native-record]
timestamp: 2026-10-27
---
# Decision and rationale

Apply a resume's conversation selector and notice only to the command being
executed. Keep the recorded command, pending native receipt and frozen
recipe in their ordinary fresh-launch rendering.

This separation preserves later start semantics. Persisting `--resume <id>`
or `--session <id>` could cause an ordinary start through a legacy recorded
command to reopen that old conversation. The source also reports that pi's
transcript-root certification rejects a recorded session selector; recording
the resume command would therefore break the evidence used to locate that
home's transcripts.

The stored launch description is reusable configuration, not a record of
every transient argument needed for one execution. This is the same boundary
as the [execution-only agent-scope wrapper](/nodes/oats-kernel-expert/decisions/agent-scopes-are-probe-guarded-and-execution-only.md),
but the distinct failure here is accidental conversation reuse and loss of
record certification, not resource placement.

The proposal also ties admission to the notice's truth: `start --resume` is
refused unless the session was lost, because the kernel-composed notice
says it was lost. Do not widen admission while leaving that assertion in
place. The general rule that [composed instructions must state an invariant](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
remains canonical; this is its application to resume text.

# Boundary and enforcement

The [maintainer's recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
already preserves fresh ordinary Start/Restart and owns which sessions may
recover. This decision explains how transient launch arguments must avoid
silently changing those semantics; it grants no additional recovery scope.

Keep the overlay at the execution boundary. Regression coverage should
compare the executed command with all three stored surfaces, follow a
resume with an ordinary start, preserve pi root certification and reject
non-lost admission with a lost-session notice. Command rendering must also
retain [one native start per launch](/nodes/oats-kernel-expert/lessons/native-start-is-prepared-once-per-launch.md).
These are enforcement targets, not test results from this harvest.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/decision-resume-argv-is-execution-only.md.

The source identifies start-record persistence and pi session-root checks at
`d5443cc3`, within [awebai/oats#1559](https://github.com/awebai/oats/issues/1559).
The named note supports the persistence rationale; the proposal supplies
the lost-only admission corollary. These are source-reported findings, not
an implementation audit, shipment receipt or live harness proof. No human
acceptance or supersession of ordinary-start policy is inferred.
