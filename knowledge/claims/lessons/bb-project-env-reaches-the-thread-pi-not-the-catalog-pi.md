---
type: Lesson
title: In bb, project env reaches only the thread's pi; bb's hidden catalog pi takes only machine-wide or server-process env
description: bb's per-project env reaches a pi thread's process but not the hidden model-catalog pi bb runs in the same directory, so a per-home AWEB_DELIVERY=session leaves that catalog pi listening as the home's aweb identity and taking its mail; only bb's machine-global env, the bb server's own process environment, or a pi configuration without the aweb extension silences it.
about: [workstream/provider-integration]
kind: lesson
id: ins-59e913a97d98
tags: [bb, pi, launch-env, aweb, delivery]
timestamp: 2026-11-21
---

# What was observed

bb-app 0.50.1, pi 1.5.2, @awebai/pi 0.5.0, a mock model, an OATS home with an aweb identity run as a bb thread
(`bb thread spawn --provider pi --environment <home>`).

Beside each thread's pi, bb's pi provider starts a catalog pi (`--mode rpc --no-session --extension <bb's own>`) in the
thread's directory. It loads every user extension, carries no `BB_*` variable, lives as long as its bridge worker (or five
minutes idle), and is also started by a model listing while no thread runs.

Counted as pi processes holding an aweb event stream, and by which process took one mail:

| Where `AWEB_DELIVERY=session` is set | Listeners | The mail |
|---|---|---|
| nowhere | catalog and thread | two model turns, one in an agent no thread shows |
| bb project env (`bb machine env set --project`) | the catalog pi | taken by the catalog pi alone; the thread gets nothing |
| bb machine-global env (`bb machine env set`, no `--project`) | none | stays unread, for the host broker |
| the bb server's own process environment | none | not taken |
| not set; bb started with `PI_CODING_AGENT_DIR` naming a pi configuration without the aweb extension | none | not taken; the agent's `aw` commands still work |

A marker variable confirmed the scopes: project env appears in the thread's pi only; machine-global env and the server's
process environment appear in the bridge worker, the catalog pi and the thread's pi.

With `AWEB_DELIVERY=session` in every pi, the aweb extension's one-time welcome is still taken as a model turn by the
catalog pi on a home's first start (it starts a second or two before the thread's pi), and each start of the thread's pi
gets the extension's "delivery is external" notice as a user message.

# What it changes

- A provider that runs pi homes as bb threads can carry the per-home launch env through bb's project env for what only
  the agent's own process needs (`OATS_INSTANCE_HOME`, which makes @awebai/oats-pi load the home's skills; the shim-first
  `PATH`). `PATH` set this way replaces pi's PATH, so it must still contain pi's own directory: without it the tell is
  answered "sent" and the thread then goes to error.
- Anything that must hold for every pi process in the home cannot be per home. For a home the host broker delivers to,
  that is a fact of the bb server: no aweb pi extension in the pi configuration bb runs (the clean state: no listener, no
  welcome turn), or `AWEB_DELIVERY=session` in the server's environment. Readiness checks it; a launch cannot write it.
- bb keeps project env in its own database and shows each value as secret; it outlives the home's retirement unless the
  provider removes it.

# Limits

Listeners were counted on the client side (no aw command counts an identity's stream listeners). One bb version, one
pi version, a mock model; the host broker's own delivery was not part of the run.

# Citations

1. Evidence: container probe for the bb pi slice, 2026-11-21 (evidence file of the probe, sections Q1 and Q2). The
   env scopes, the listener counts and the mail outcomes in the table are the source's probe.
2. get-bb/bb at `35a03bbb`, read at maintainer review 2026-11-21: `plugins/provider-pi/src/bridge/catalog.ts` starts
   the catalog pi with `--mode rpc --no-session --extension <bb's extension>` in the given directory, keyed by that
   directory and the env it is handed, closed after five idle minutes by default (`BB_PI_CATALOG_IDLE_MS`);
   `bridge.ts` starts it for a model listing and a provider health check, from the env those calls carry.
3. Relates to [Claude Code applies a home's settings.local.json env inside a bb thread](/claims/lessons/claude-code-applies-a-homes-settings-local-env-inside-a-bb-thread.md):
   for Claude a file in the home carries the launch env; pi has no such file.
