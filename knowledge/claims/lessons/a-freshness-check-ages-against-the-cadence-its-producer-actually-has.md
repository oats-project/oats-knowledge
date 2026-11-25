---
type: Lesson
title: A freshness check on wake broker evidence ages against the cadence its producer actually has
description: The host wake broker rewrites its status snapshot every 2 s, but it records a session inspection only at startup and before a delivery, so the inspection's age is no health signal for an idle home. Read the producer at a named version before you age a field, and give each differently refreshed field its own warning.
about: [system/oats-aweb, workstream/provider-integration]
kind: lesson
id: ins-6eab88cf2ad1
tags: [oats.aweb, wake-broker, readiness, health, session-delivery, freshness]
timestamp: 2026-11-25
---

# What was observed

Under session delivery, `oats aweb health publish` published every idle home as
`degraded`, `oats.receive_unproven`, from about 30 s after the broker's last inspection
(awebai/oats-aweb#332). This held on tmux and on session-provider homes, as
[the one-container probe](/claims/lessons/aweb-oss-stack-runs-in-one-container-for-grant-and-status-probes.md)
also saw. Readiness aged two fields of `aw wake status` against one 30 s threshold, under one
warning (`receive-observation-aged`):

- `status.updated_at` is rewritten every `PollInterval`, 2 s by default
  (aw v1.36.59 `wake/broker.go:32`).
- `last_inspect_at` is set only from the channel-core worker's liveness lines
  (`wake/instance.go:541-550`).
  - At startup the worker inspects until it sees the receiver.
  - After that it inspects only before a delivery (`wake/channel_core_runner_entry.ts:131-143`:
    "ordinary delivery then owns inspection").
  - The 5-minute presence heartbeat also inspects, but records nothing
    (`wake/instance.go:430-475`).

An idle home's recorded inspection therefore ages without limit, and aw's own readiness
treats that age as an advisory with `ready: true` (`wake/readiness.go:166-167`). The
provider's README already said quiet workers inspect "at startup and on events". Even so,
the publisher's vocabulary mapped the shared warning to degraded.

# The lesson

- **Read the producer's code at a named version before you age a field,** and age each
  field against that producer's real cadence. The same rule set the native receipt's 90 s
  threshold ([receive evidence follows the delivery mode](/nodes/oats-aweb-expert/decisions/receive-evidence-follows-delivery-mode.md)).
  A field written on an event has no cadence, and its age says only that nothing happened.
- **Give each differently refreshed field its own warning code.** One code for two ages
  left the consumer unable to keep the one that carries a signal (the snapshot) and drop
  the one that doesn't (the idle inspection).
- **Before you ask a producer to observe more often, look for a fresher observation the
  consumer already holds.** The publisher runs `oats session inspect` on every tick, and,
  with the fix, reads readiness only for a home that inspect found alive. That is the
  observation the broker's worker records, made fresh. So the fix needs nothing from aw:
  awebai/oats-aweb#333 makes `receive-observation-aged` the snapshot's age only (it still
  degrades) and adds `receive-inspection-aged`, which does not degrade. That PR was open,
  not merged, at maintainer review on 2026-11-25; check its state before relying on the
  new code.

# Elimination route

The lesson's first case is removed in code by #333's split warning codes and its test
`test/idle-session-health-332.test.mjs`. On the producer side, the root-cause comment on
#332 notes that if aw recorded `last_inspect_at` from its 5-minute heartbeat inspection,
the field would gain a real cadence; no aw issue for that was found at review.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/idle-receive-degraded-lead,
   2026-11-25; notes/event-driven-broker-inspection.md.
2. Read at maintainer review, 2026-11-25: awebai/aw at tag `v1.36.59`, `wake/broker.go`
   (`DefaultPollInterval`, `DefaultHeartbeatInterval`), `wake/instance.go` (`heartbeat`,
   `recordChildLiveness`), `wake/channel_core_runner_entry.ts` (`observeStartupPresence`) and
   `wake/readiness.go` (the observation-aged advisory).
3. The root-cause comment on [awebai/oats-aweb#332](https://github.com/awebai/oats-aweb/issues/332#issuecomment-7158649892);
   awebai/oats-aweb `README.md` ("at startup and on events").
4. [awebai/oats-aweb#333](https://github.com/awebai/oats-aweb/pull/333) at head `f47a2cbe`:
   `lib/wake-receive.mjs` (the two warning codes) and `lib/health-vocabulary.mjs`
   (`receive-inspection-aged` not among the degrading warnings). Its body reports the three
   review rounds and the two captured broker-status fixtures (inspections 42 s and 2 min
   old); those are the source's report, not reproduced at review.
