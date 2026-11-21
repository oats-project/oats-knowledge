---
type: Lesson
title: A pi thread in bb's error state keeps its pi process, so a provider that reads error as a lost session strands the home
description: After a failed model turn bb marks a pi thread error while its long-lived pi process stays alive and a plain tell would recover it; a session provider that maps error to a missing session makes the kernel show the home lost, hide the failed-turn claim and refuse every input and resume, because a process of the last run still works in the home.
about: [workstream/provider-integration, system/oats-kernel]
kind: lesson
id: ins-52e46d38a7a2
tags: [bb, pi, session-provider, lost-session, failed-turn]
timestamp: 2026-11-21
---

# What was observed

OATS 0.70.0, the bb session provider with a trial-only change that admits the pi harness, bb-app 0.50.1, pi 1.5.2, a
mock model that answers one turn with an HTTP 400.

- bb runs pi as one long-lived RPC process per thread. The failed turn left that process running and set the thread's
  status to `error`. @awebai/oats-pi set its `Turn failed: …` waiting claim.
- In bb alone, the next `bb thread tell` was dispatched into the same process, ran a turn, and the thread was `idle`
  again (the claim cleared).
- Through the kernel, with the provider's mapping of `error` to "no session": the row read lost and did not show the
  claim; `oats session input` answered `E_SESSION_NOT_RUNNING` at once, and `oats session start --resume` waited 150 s
  and answered `E_SESSION_UNKNOWN`, both because "a process of its last run still works in its home" (the bridge worker
  and the pi processes). Only a start without resume worked, as a new thread and a new conversation.

# What it changes

- A bb status word is mapped per harness, from what that harness's process does in that state. For pi, `error` is a
  settled thread with a live session that an input restarts: it should read as present, so the input goes through and
  the failed-turn claim shows.
- The kernel's lost-session rule (resume only once no process of the last run is in the home) is right for a harness
  whose process dies with its session; a provider must not report "lost" for a session whose process it knows is alive.
- Until then a single provider error leaves a pi home deaf to mail until someone stops and starts it.

# Limits

Not compared with Claude Code under the same failed turn. One bb and pi version.

# Citations

1. Evidence: container probe for the bb pi slice, 2026-11-21 (evidence file of the probe, section Q4). The pi
   process's survival and the recovery by a plain tell are the source's probe.
2. oats-project/oats-bb at `ae10f089`, read at maintainer review 2026-11-21:
   `oats-package/capabilities/oats-bb/lib/threads.mjs` maps `error` to the missing-session answer
   (`present: false, state: "stopped", running: false`) on the stated ground that bb never resumes an interrupted
   turn, and `lib/mode.mjs` admits the `claude` harness only (pi is not yet admitted).
3. oats-project/oats at `a4a43220`, read at maintainer review 2026-11-21: `lib/core.mjs`'s `resumeLostSession`
   waits up to 150 s for a start and not at all for an input while a process of the last run works in the home,
   then refuses `E_SESSION_UNKNOWN` (start) or `E_SESSION_NOT_RUNNING` (input), naming the processes and killing
   none. `packages/pi/extension/failed-turn.mjs` (@awebai/oats-pi 0.70.0) sets the failed-turn waiting claim.
4. Related: [A bb thread has no "stopped" status](/claims/lessons/a-bb-thread-has-no-stopped-status-so-a-session-backend-records-its-own-stop.md)
   (bb's statuses and the kernel's own stop record), and
   [bb thread tell answers "sent" in a Claude thread's ordinary states](/claims/lessons/bb-tell-answers-sent-in-ordinary-states-and-queued-drains-itself.md)
   (the Claude side of a tell into a thread in error).
