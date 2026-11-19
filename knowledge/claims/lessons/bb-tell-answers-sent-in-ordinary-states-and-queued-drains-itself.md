---
type: Lesson
title: bb thread tell answers "sent" in a Claude thread's ordinary states, and its "queued" for a starting turn drains by itself
description: In bb-app 0.50.1 a `bb thread tell --mode auto` into a Claude Code thread answers delivery "sent" when the thread is idle (with or without a live Claude process), mid tool call and in error; it answers "queued" with waitingOn turn-starting only in the short window while another tell restarts the thread, and bb delivers that message unaided within about a second. Each message reached the model once.
about: [workstream/provider-integration]
kind: lesson
id: ins-3f55359c0839
tags: [bb, tell, delivery, queued, session-input, claude-code]
timestamp: 2026-11-19
---

# What was observed

One Claude Code thread per state, bb-app 0.50.1 and Claude Code 2.1.328 on a mock model,
`bb thread tell <thread> --message-file f --mode auto --json`, the thread's status read just
before, and every model request logged:

| Thread state at the tell | delivery | waitingOn | reached the model | times |
|---|---|---|---|---|
| idle, Claude process alive | sent | - | ~0.3 s after the send, as a new user turn | 1 |
| idle after `bb thread stop` (no Claude process) | sent | - | ~0.9 s; the tell restarted Claude with `--resume` | 1 |
| active, a 25 s Bash call running (full permission mode) | sent (steered) | - | when the tool ended, inside the running turn beside the tool result ("The user sent a new message while you were working: ...") | 1 |
| starting: 0.15 s after another tell restarted a stopped thread | queued | turn-starting | ~0.7 s; merged into the restarted turn's first user message | 1 |
| starting, 0.5 s after (status already active, no model call yet) | sent | - | ~0.4 s, its own user message after the first reply | 1 |
| error (the previous turn's model call failed) | sent | - | at once; the failed turn's text was sent again with it | 1 |

A thread's Claude process idle for 12 minutes was not reaped, so "idle, no process" happens
after an explicit stop (or a bb restart), not by itself within that time. The stopping state
was not caught: a stop with a tool running settled in under 0.4 s.

bb's source agrees (apps/server `thread-send.ts` resolveSendMode, `dispatch-attempt.ts`
continueThroughCoreWaits at bb df9619d8): a tell into a non-active thread starts a turn, a tell
into an active one steers, and the queued answers come only from named waits: time, app-update,
thread-busy, stopping, host-offline, turn-starting, provisioning, interaction, plugin.

# What to do with it

A provider that maps `bb thread tell` onto `oats session input` should not read a "queued"
answer as not submitted. bb keeps a queued row and sends it itself when its wait clears; its
thread-messaging guide says of a tell queued behind an interaction that it "is not a failure, so
do not resend". Refusing it and
retrying the mail would send it a second time once bb drains the first. turn-starting (and by
the source thread-busy and stopping) clear with the thread itself, usually within a second; the
queued case is ordinary whenever a tell lands while another tell is starting the thread, as
when two wakes arrive close together. One exception in bb's source: after a manual
`bb thread stop` that interrupts a turn, rows waiting on thread-busy or turn-starting are
paused until a new turn is requested and starts.

The kinds that wait on something outside the thread (interaction, host-offline, provisioning,
app-update, time, plugin) can wait long, but bb still delivers them. A provider that wants to
report such a tell as not submitted, and keep the mail unread, has to withdraw the row first
(`bb thread queue delete <thread> <message-id>`, the id is in the answer's `queuedMessage`), or
the retry duplicates it. Only superseded (a retry a newer message overtook) is never sent
automatically.

# Related

- [In a bb Claude thread a permission prompt becomes oats.core's claim, and a bb tell waits behind it](/claims/lessons/a-bb-permission-prompt-is-an-oats-claim-and-a-tell-waits-behind-it.md): the interaction wait, observed.
- [A bb restart holds wake-broker mail cleanly but strands a wake already steered into a turn](/claims/lessons/a-bb-restart-holds-broker-mail-but-strands-a-steered-wake.md): what happens to a steered tell when bb restarts.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-tell-delivery-probe, 2026-11-19;
   notes/bb-tell-delivery-per-thread-state.md. Measured in a container with a mock model:
   bb-app 0.50.1, Claude Code 2.1.328. The per-state answers, timings and counts are the
   proposer's observation; review ran no bb.
2. get-bb/bb at `df9619d8`, read at review on 2026-11-19: `apps/server/src/services/threads/thread-send.ts`
   (resolveSendMode: auto steers an active thread and starts any other),
   `dispatch-attempt.ts` (continueThroughCoreWaits and its waits),
   `thread-turn-starting.ts` (the turn-starting row), `packages/domain/src/queued-message.ts`
   (the ten wait kinds), `packages/db/src/data/queued-thread-messages.ts` (thread-busy,
   turn-starting and stopping drain on an idle thread; the manual-stop pause; superseded), and
   `packages/templates/src/templates/bb-guide-thread-messaging.md` (turn-starting steered in at
   `turn/started`; a queued tell is not a failure; `bb thread queue delete`).
