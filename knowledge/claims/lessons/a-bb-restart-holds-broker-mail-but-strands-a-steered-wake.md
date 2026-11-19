---
type: Lesson
title: A bb restart holds wake-broker mail cleanly but strands a wake already steered into a turn
description: With the aw wake broker delivering into a bb thread through bb thread tell, mail sent while bb is down arrives exactly once after it returns, provided session inspect fails while bb is unreachable; but bb never resumes an interrupted turn, and a wake bb had already accepted as a steer leaves the thread in status error, acknowledged and without a turn, until a later tell restarts it.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-c046f24af7d0
tags: [bb, wake, broker, restart, tell, steer, pi, claude-code]
timestamp: 2026-11-19
---

# What was observed

The route: `aw wake register --delivery session` and `aw wake run --oats-bin <shim>`, the shim
answering `oats session inspect` from `bb thread show <thread>` (exiting non-zero when bb is
unreachable) and turning `oats session input` into `bb thread tell <thread> --mode auto`. A pi
thread on a real Opus-tier model, and a Claude Code thread on a mock model, each ran a long tool
call while bb was stopped (SIGINT, and SIGKILL of every bb process).

- **Mail sent while bb is down arrives exactly once.** Inspect fails, so the broker attempts no
  input and leaves the mail unread; after bb returns, one input and one turn (2 s after a graceful
  restart, 18 s after a crash, broker backoff). This needs the inspect to fail: a shim that always
  answers "present" would hand the mail to a dead bb.
- **bb does not resume an interrupted turn.** The thread log shows "Thread interrupted because the
  host daemon disconnected"; the tool's work is lost; the session history is kept.
- **A wake already steered into the busy turn is stranded.** bb accepted the tell as a steer and the
  broker marked the mail read at that acceptance. After the restart the thread's status is `error`
  and no harness runs for it; the broker does not re-deliver (read). The next tell of anything
  restarts the thread, and the real model then answered the stranded mail from its history.
- **Claude Code may act during the shutdown.** It sent the model the steered mail as bb stopped and
  sent its reply 2 s after the SIGINT; bb's thread log does not show that reply.

The broker's half is aw 1.36.58's own behaviour, read at review: its terminal handler runs
`oats session inspect` before every input and stops with "terminal safety inspect failed before
input" when inspect fails; a mail it presented is marked read once `oats session input` reports
`submitted: true` ("marked read after accepted terminal presentation, not after task
completion", in `aw wake --help`); and a restart re-raises only what is still unread. The bb half
(interrupted turns not resumed, the `error` status, the restart on the next tell, Claude Code's
reply during shutdown, the timings) is the proposer's observation; review ran no bb.

# What to do with it

A bb session backend needs a truthful `session inspect` (unreachable while bb is down) and a
resume step: when bb comes back, or when inspect sees a thread in `error`, send it one resume
tell. Without it a wake steered or presented just before a restart waits for the next message.
Any wake route that acknowledges at `bb thread tell` acceptance has the same gap.

Map bb's statuses to the broker's states deliberately. aw 1.36.58 defers mail while inspect
reports `working` (also `busy` or `running`) and keeps it unread, so reporting a bb thread with a
running turn as `working` keeps mail from being steered into a turn a restart can interrupt. This
narrows the gap and does not close it: chat is still presented to a working pane, and a wake
presented to an idle thread can lose the turn it starts. A status the broker does not know (bb's
`error`) reads as `unknown`, which does not block input, so a later wake's tell restarts such a
thread.

# Related

- [In a bb Claude thread a permission prompt becomes oats.core's claim, and a bb tell waits behind it](/claims/lessons/a-bb-permission-prompt-is-an-oats-claim-and-a-tell-waits-behind-it.md): tells queue behind a permission prompt; this lesson covers restarts.
- [A human addresses a long-lived agent through threads that are aweb conversations](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md) records that presentation's acknowledgement is what stops redelivery. The broker acknowledging at presentation is why a stranded wake is not delivered again.
- [Runtime, messaging and viewers have separate owners; a wake is a hint, not consumption](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md): unchanged by this lesson. Its rejected alternative is a broker that fetches or acknowledges mail on the agent's behalf. The lesson only records what the shipped broker does at presentation.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-realmodel-trial-probe, 2026-11-19;
   notes/bb-restart-strands-steered-wake.md. Measured in a container: bb-app 0.50.1, aw 1.36.58,
   pi 1.5.2 with github-copilot/claude-opus-5.5, Claude Code 2.1.328 on a mock; 14 wakes, one
   input each.
2. awebai/aw at `a3223c1d` (aw 1.36.58), read at review on 2026-11-19: `cmd/aw/wake.go` (the
   `aw wake` help on read acknowledgement and restart), and the bundled channel-core terminal
   handler in `wake/channel_core_runner_bundle.mjs` (inspect before input, the `working` mail
   deferral, the state mapping, acknowledgement on delivery).
