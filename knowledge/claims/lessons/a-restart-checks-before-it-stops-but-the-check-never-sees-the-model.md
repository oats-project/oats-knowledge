---
type: Lesson
title: A restart runs the provider's check before it stops, but the check never sees the launch's model
description: In OATS 0.70.5 a session restart runs the session provider's planned-launch check before stopping the old session, so an unready harness is refused with nothing stopped; but the planned launch carries no model, so a model the provider would refuse is refused only at the launch, after the old session was stopped, leaving a working agent stopped.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
status: superseded
id: ins-5b5c4d7f7a24
tags: [restart, provider, check, model]
timestamp: 2026-11-24
---

**Superseded 2026-11-25** by [A session provider's planned-launch check sees the launch's model, so a restart refuses a bad model before it stops](/claims/lessons/a-restart-checks-the-launchs-model-before-it-stops.md) (`ins-a351988a8d0f`): oats-project/oats#2126 added `launch.model` to the planned launch. This record stays true of OATS 0.70.5 and of kernels without the feature `launch-model-and-check-warnings`.

# What was observed (OATS 0.70.5, bb-app 0.50.1, oats-bb #65 probes, 2026-11-24)

- A running pi home restarted as `--harness claude` with bb's Claude provider disabled: `E_BACKEND_NOT_READY`,
  "nothing was stopped or started"; the agent still runs. The same for a Claude home restarted as pi with the bridge
  missing.
- A running pi home restarted with a model pi does not have: `E_BACKEND_LAUNCH_ARG` from the launch, AFTER the old
  session was stopped and its thread archived; nothing new started.
- The kernel's planned launch is `{harness, yolo, args, sandbox?, trees, protected}` (core.mjs plannedLaunch), and the
  spawn path keeps nothing of a "ready" check's answer, so its warnings reach no client.

# What follows

A spawn's preview passes a bad model; the spawn is refused and rolled back with nothing left; a start on a stopped
home is refused with nothing changed; only the restart harms. Clients hold a Restart that changes the model with a
check of their own until the kernel hands the check `launch.model` (and relays its warnings): a contract addition.

# Citations

1. oats-project/oats `lib/core.mjs` at v0.70.5, still so at v0.70.7 (main, 2026-11-24): `plannedLaunch` builds `{harness, yolo, args, sandbox?, trees, protected}` with no `model`, though the launch recipe carries `model` beside `args`; the session start asks the check (`askCheck`) before anything is stopped and refuses with "nothing was stopped or started".
2. oats-project/oats-bb `README.md`: the kernel asks the provider "before every launch (a spawn, a start, and a restart before it stops anything)", read on main, 2026-11-24.
3. The restart probes' outcomes (`E_BACKEND_NOT_READY` with the agent still running; `E_BACKEND_LAUNCH_ARG` after the old session was stopped and archived) are source-reported from the proposer's probes for oats-bb#65.
4. The contract addition (`launch.model` in the planned launch) had no issue in oats-project/oats on 2026-11-24; it is the elimination route for this lesson.
5. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
