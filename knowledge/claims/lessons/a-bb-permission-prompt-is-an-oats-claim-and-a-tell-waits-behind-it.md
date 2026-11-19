---
type: Lesson
title: In a bb Claude thread a permission prompt becomes oats.core's claim, and a bb tell waits behind it
description: With the OATS env set for a bb Claude Code thread, a Bash permission interaction still fires Claude's own hooks, so oats.core records a permission claim in the home's events; but session inspect reads such a home as not launched, a spawn-only home lacks the PermissionRequest hook, and a bb tell sent meanwhile neither answers nor cancels the interaction but queues until it is resolved.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-7265936fd6d8
tags: [bb, claude-code, waiting, permission, hooks, wake, tell]
timestamp: 2026-11-19
---

# What was observed

bb-app 0.50.1 runs Claude Code (2.1.328) with `--permission-prompt-tool=stdio`; a Bash call in
`accept-edits` mode shows in bb as a pending `approval` interaction (`bb thread interactions list`).
Claude still runs its own hooks for it: the PermissionRequest hooks at the prompt and
`Notification:permission_prompt` about 6 s later. With `OATS_INSTANCE_HOME` (and `OATS_INSTANCE`,
`AWEB_IDENTITY_HOME`) set for the thread through `bb machine env set --project`, oats.core's
`claude-waiting.sh` writes `waiting {waitingOnYou: true, reason: permission}` (producer oats.core) to
the home's events, and clears it when the tool runs or at the next boundary.

Three gaps for a home bb runs:

- **A home OATS only spawned has no PermissionRequest hook.** The hook and StopFailure are written
  only when the launch hook can ask the harness for its version (`OATS_HARNESS_EXECUTABLE`); a
  `--no-launch` spawn writes neither, so the claim comes from the Notification, seconds late, and a
  failed turn sets no claim. In the probe the debounce marker directory was absent where bb ran the
  thread too (oats.core's spawn and launch hooks create it outside the home, under
  `XDG_RUNTIME_DIR` or the temp dir, so an environment that does not share it lacks it); the script
  then calls the CLI on every event: harmless.
- **The claim is written but not read.** `oats session inspect` reports such a home as
  `not-launched` with `waitingOnYou: null`: no OATS reader shows the claim of a session OATS
  didn't start.
- **A tell does not touch the prompt.** `bb thread tell --mode auto` (and `--mode steer`) while the
  interaction is pending returns `delivery: queued`, its queued message waiting on `interaction`;
  the interaction stays pending. Once it is resolved, the queue drains: the first message reaches
  the running turn beside the tool result, later ones as turns of their own. (bb's server refuses a
  direct user send in that state with 409 `awaiting_user_interaction`; the CLI's tell takes the queue.)

# What to do with it

A bb backend for OATS can rely on oats.core's events for a bb home's permission claim, but has to
read them (or bb's pending interactions) itself to show waitingOnYou; it should give the home the
launched form of oats.core's settings if late permission claims and missing failed-turn claims
matter. A wake delivered by `bb thread tell` into a home waiting on a permission is safe: it cannot
answer the prompt and is not lost.

Evidence: OKF proposal from oats-engineering-expert/bb-interactions-probe, 2026-11-19;
notes/bb-permission-interaction-claims-and-tell.md. Measured in a container with a mock model:
bb-app 0.50.1, Claude Code 2.1.328, oats 0.69.20.

Review read oats.core 2.14.0's hook writer (PermissionRequest and StopFailure only under a
versioned `OATS_HARNESS_EXECUTABLE`; the marker directory made at spawn and launch) and oats
0.69.20's `session inspect` and `status` (waitingOnYou only for a session OATS sees running): they
match. The bb behaviour (hooks under the stdio prompt tool, the tell queue, the 409) is
source-reported; review ran no bb.
