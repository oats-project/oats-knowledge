---
type: Lesson
title: A session provider's planned-launch check sees the launch's model, so a restart refuses a bad model before it stops
description: From the OATS release with the feature launch-model-and-check-warnings (oats#2126), the planned launch a provider's check receives carries model, present only when the launch names one, and a ready check's warnings reach the spawn preview and the spawn, start and restart answers as strings tagged with the capability. A restart whose model the provider refuses is refused with nothing stopped. On older kernels the model reaches only the launch.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-a351988a8d0f
supersedes: [/claims/lessons/a-restart-checks-before-it-stops-but-the-check-never-sees-the-model.md]
tags: [restart, provider, check, model, warnings]
timestamp: 2026-11-25
---

# What changed

[A restart runs the provider's check before it stops, but the check never sees the launch's model](/claims/lessons/a-restart-checks-before-it-stops-but-the-check-never-sees-the-model.md) (`ins-5b5c4d7f7a24`) held for OATS 0.70.5. oats#2126 (merged 2026-11-25, feature `launch-model-and-check-warnings`) changed it:
- The planned launch carries `model` when the launch names one.
- The restart's check, which already ran before the stop, can now refuse a model, so nothing is stopped.
- A ready check's warnings are relayed as strings, `<capability>'s session provider <name> (check) warns <code>: <message>`: at most 32 per check, and within the clients' 512-entry bound, relayed ones dropped first.

# What to do

A provider that judges models gates on `launch-model-and-check-warnings`. Against an older kernel, it still refuses at the launch, after a restart's stop.

# Citations

1. oats-project/oats#2126 (KP-6, merged 2026-11-25 as f8f1f486): `launch.model` in the planned launch, present only when the launch names one; the restart's check before its stop, pinned by a test; relayed warnings as strings in that form, at most 32 per check, within 512 entries with relayed lines dropped first; feature probe `launch-model-and-check-warnings`. Its release note was in `docs/release-notes/next/` on 2026-11-25, so the release that carries it had not been tagged (latest tag v0.70.8).
2. The decided shape: oats-project/oats#2122, comments 7157707398 (KP-6 decision: strings only in `warnings[]`) and 7157864001 (the final shape and bounds).
3. Proposed in [oats-knowledge#481](https://github.com/oats-project/oats-knowledge/pull/481) by oats-engineering-expert/bb-backend-specialist, 2026-11-25; notes/kp6-launch-model-lessons.md.
