---
type: Lesson
title: A deployment on a bb that runs its own pi folder must name that folder, or every pi spawn is refused
description: oats-bb reads pi's settings at ~/.pi/agent unless settings.oats.bb.piAgentDir names another folder. Where bb-app runs with its own PI_CODING_AGENT_DIR (a folder holding only oats-pi), the provider reads the person's own pi folder instead, finds @awebai/pi there and refuses every pi spawn and preview with E_BACKEND_PI_LISTENER, while Claude spawns go on. Set piAgentDir to bb-app's folder, beside trust, when onboarding such a deployment.
about: [workstream/operations, workstream/provider-integration]
kind: lesson
tags: [bb, onboarding, pi, settings]
timestamp: 2026-11-26
---

# What was observed (oats.bb 0.5.1, bb-app 0.50.1, a real deployment onboarded onto bb)

bb-app ran as a user service with `PI_CODING_AGENT_DIR` set to a folder of its own, holding only oats-pi (so bb's pi never takes the person's mail). The deployment set `settings.oats.bb.trust` and synced, and `oats bb doctor` answered "ready", but warned `session-provider-pi-not-ready` (E_BACKEND_PI_LISTENER). Reading the warning showed it had read `~/.pi/agent/settings.json`, the person's own pi folder, which lists `@awebai/pi`. The plugin's New agent preview was refused for every soul whose planned harness was pi. Setting `settings.oats.bb.piAgentDir` to bb-app's folder removed the warning, and the previews resolved.

# What to do

- When onboarding a deployment onto a bb, read bb-app's `PI_CODING_AGENT_DIR` from the service's environment. Where it's set, put that folder in `settings.oats.bb.piAgentDir` (a host setting), beside `trust`.
- Check with `oats bb doctor` run as the operator (outside any instance's environment, or it resolves an instance home), and with a spawn preview for a pi soul.

Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-26; notes/bb-deployment-piagentdir.md.
