---
type: Lesson
title: pi's ui_prompt_start and ui_prompt_end events can carry a needs-input claim, also in the RPC mode bb runs
description: pi fires ui_prompt_start and ui_prompt_end around every blocking extension dialog, including in RPC mode under bb, so a pi bridge can set and clear an OATS waiting claim through the kernel's verb as it already reports a failed turn; the clear must be awaited at session shutdown, and a question asked through bb's own question plugin fires no pi event.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-a83809fd36d4
tags: [pi, needs-input, waiting-claim, bb, extension-ui]
timestamp: 2026-11-21
---

# What was observed

pi 1.5.2 run by bb-app 0.50.1 (`--mode rpc`), OATS 0.70.0, a mock model that calls a probe tool opening
`ctx.ui.confirm` / `ctx.ui.select`.

- pi has no permission prompts and no native question tool. What blocks it on a person is an extension dialog. Under bb
  each one is a pending interaction (`payload.kind: "provider-pi/extension-ui"`, the thread row's
  `hasPendingInteraction: true`); a tell queues behind it, and the bb provider's input refuses with
  `E_SESSION_PROMPT_OPEN`, unchanged from Claude.
- No OATS claim is set for it: oats.core's hooks are Claude Code's, and @awebai/oats-pi 0.70.0 reports only a failed
  turn.
- `ui_prompt_start` (with the dialog's kind and title) and `ui_prompt_end` fired in bb's RPC pi. An extension that ran
  the kernel's `oats instance waiting set --reason question --message=<title>` on the first and `waiting clear` on the
  second made `oats status --json` show the question while the dialog was open, and nothing once it was answered.
- Stopping the session with the dialog open fired `ui_prompt_end`, but the clear had not finished when pi exited.

# What it changes

- Needs-input for a pi home can come from the pi bridge, on any session backend, with no harness-specific hook file:
  the two events, the kernel's waiting verb, writes queued one at a time and awaited on `session_shutdown`.
- It needs `OATS_INSTANCE_HOME` in pi's process (the bridge is inert without it) and the home's kernel shim.
- It does not cover bb's `ask-user-question` plugin (off by default): that tool is bb's, returns at once, leaves the
  thread idle with a pending interaction, and fires no pi event. Only bb's own `hasPendingInteraction` shows it, which
  a provider's inspect could report.

# Citations

1. Evidence: container probe for the bb pi slice, 2026-11-21 (evidence file of the probe, sections Q3 and Q4). The
   events firing under bb's RPC pi, the claim's set and clear, the unfinished clear at shutdown and bb's question
   plugin are the source's probe.
2. @earendil-works/pi-coding-agent 1.5.2 (npm), read at maintainer review 2026-11-21: the extension API declares
   `ui_prompt_start` and `ui_prompt_end`, and `dist/core/extensions/runner.js` emits them around an extension dialog,
   with its kind and title.
3. oats-project/oats at `a4a43220`, read at maintainer review 2026-11-21: @awebai/oats-pi 0.70.0
   (`packages/pi/extension/`) handles no prompt event, sets a waiting claim only for a failed turn, and is inert
   outside an instance (`OATS_INSTANCE_HOME` naming a home with `instance.json`).
4. oats-project/oats-bb at `ae10f089`, read at maintainer review 2026-11-21: `lib/input.mjs` refuses
   `E_SESSION_PROMPT_OPEN` and sends nothing while a bb interaction is pending.
