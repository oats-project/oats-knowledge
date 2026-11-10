---
type: Lesson
title: Pi bridge holds must not wait for their own run
description: Detect pi's active-before-start lifecycle by the event's messageType rather than a version gate, because an idle wait inside that run deadlocks and apparent agent work can mask a missing opening task.
about: [system/oats-kernel]
kind: lesson
id: ins-fd823e1aa727
tags: [kernel, pi, bridges, lifecycle, compatibility, evidence]
timestamp: 2026-10-16
---
# Keep the hold outside the run it is waiting for

The opening-task investigation found a self-dependency in an apparently
reasonable idle wait. In pi 1.2.0, the run becomes active **before**
`before_agent_start`; waiting there for `ctx.isIdle()` waits for the handler's
own run to finish. Aborting does not rescue this hold: pi's `abort()` also
awaits idle. The source reproduced the hang with the old bridge on pi 1.2.0
and 1.3.0, but not 1.1.0.

The chosen bridge boundary is the input handler, before the prompt's own run
exists. Skip the additional `before_agent_start` hold when the event carries
`messageType`, and release outstanding waits on `session_shutdown`. The
same pi release introduced that event discriminant and the changed run
lifecycle, making the event shape the relevant compatibility signal. This
records the reason for the boundary; the bridge and its tests own the current
implementation, and later lifecycle changes require fresh evidence.

# Why the smaller fix won

- **No pi floor, band or version-string gate.** Restricting versions would
  discard working older behavior or encode an indirect proxy for the actual
  event contract. Feature detection distinguishes the observed lifecycles
  without declaring an arbitrary supported range.
- **No replacement signal wait at `before_agent_start` on the new lifecycle.**
  The source's review found `ctx.signal` still absent for the prompt's own run
  at this point, so that draft avoided the self-deadlock. But a foreign signal
  there covered pi's own concurrent-start race across authentication, not a
  bridge-owned race. Waiting could not repair the shared run-state clearing
  in that race; removing the redundant hold was the smaller honest fix.
- **No bridge-driven message reordering.** On the new lifecycle, a welcome
  sent while the task's run is starting is queued after that run's own
  message. Accept that ordering rather than have a bridge that never sends
  messages become a message sender to reorder it. This is conditional on
  which run has started, not a promise that task and welcome always arrive
  in one fixed order.

# Apparent work is not opening-task evidence

A welcome turn can tell the agent to read TASK.md and thereby make a home
look healthy even though the opening user message never reached the session.
The same deadlock can appear after the welcome finishes: subsequent typed
prompts remain queued as steers behind the stuck task run. Those symptoms
motivate checking the session's **opening user message**, not declaring
success because the agent did work or the welcome completed.

The presence of that message establishes arrival, not task completion.
Queued input alone is not a deadlock diagnosis: ordinary active runs also
queue input. The proposal's corrected session-file observations support the
masking mechanism; no third-party transcript or correspondence is reproduced.

# Enforcement and related decisions

Pin both lifecycle shapes in the host model and exercise the real runtime's
opening-task, cancellation/shutdown and arrival behavior. The remaining
[real-pi CI gap](real-pi-opening-races-need-an-executed-ci-gate.md) owns the
missing automated gate and temporary verification boundary; a model alone
cannot establish that pi still follows the lifecycle it models.

This does not change [native harness launch](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
or the [runtime-session fresh-home heuristic](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md).
Earlier filed sessions are a resume-nudge signal, not proof that the opening
task arrived in this launch.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-opening-deadlock,
2026-10-16; notes/pi-run-active-before-before-agent-start.md;
notes/queued-prompts-after-turn.md.

The source identifies [awebai/oats#1322](https://github.com/awebai/oats/issues/1322)
and [#1324](https://github.com/awebai/oats/pull/1324), reporting the fix merged
at `6f362215` after maintainer-lane review. It reports Linux SDK and TUI
probes using npm pi 1.1.0, 1.2.0 and 1.3.0, and source review of the 1.2.0
lifecycle change and 1.3.0 run/abort paths. These results and the rejected
signal-wait analysis are source-reported, not repeated or independently
audited by this harvest. The messaging extension's separate post-turn wake
path was read, not exercised; no finding about that path is promoted.
Maintainer review is not an explicit human-acceptance receipt, and no accepted
base decision is superseded.

Verified by the knowledge maintainer at review of the harvest, 2026-10-16, by
reading [awebai/oats#1324](https://github.com/awebai/oats/pull/1324), its
discussion and the bridge at `6f362215`; nothing was run. It merged on
2026-10-16 at `6f362215` from head `1d251a6f`, closing #1322, and changes only
`packages/pi`. The bridge skips the `before_agent_start` hold when the event
carries `messageType`, keeps the input-handler hold and releases waits on
`session_shutdown`. Its description names no pi floor or band and keeps the
bridge from sending or altering messages. It also states the conditional
welcome ordering on pi 1.2 and later. The adversarial review's smaller fix
(skip the hold rather than wait on `ctx.signal`) was taken. Two maintainer lanes
approved in comments. Those verdicts establish maintainer review, not human
acceptance.
