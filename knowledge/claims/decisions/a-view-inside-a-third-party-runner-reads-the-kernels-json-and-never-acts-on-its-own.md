---
type: Decision
title: An OATS view inside a third-party runner reads the kernel's JSON verbs, joins by the recorded session id, and never acts on its own
description: The OATS plugin for bb owns nothing. It draws from `oats ... --json` and the runner's SDK, joins a status row to a thread only by the thread id the session provider recorded, shows the kernel's activity words as given, and when a person removes a thread in the runner it shows the mismatch instead of retiring anything.
about: [workstream/provider-integration, system/oats-kernel]
kind: decision
id: dec-0a818525cc9d
tags: [bb, plugin, session-provider, status, join, lifecycle]
timestamp: 2026-11-20
---

# The decision

A user interface for OATS agents that lives inside another product (first case: the OATS plugin
for bb, where a bb thread is the agent's session) is a reader and a caller of the kernel, not a
second owner of its facts.

- **It reads only the kernel's JSON verbs** (`oats status`, `souls`, `capabilities`, `teams`,
  `server list`) for every OATS fact, and the runner's own SDK for the runner's facts. It never
  reads `instance.json`, receipts, event files' contents or the runner's database. (Watching that
  the deployment's event log changed, as a signal to read `oats status` again, is not reading it.)
- **It joins a status row to a session by the id the session provider recorded** (for bb: the
  thread id on a local status row), never by a title, a path or the runner's environment id.
  A session with no row is not an OATS agent and stays usable as the runner's own.
- **It shows the kernel's words as given.** Where the runner cannot tell a live idle agent from
  a settled one, an agent the kernel does not call running reads "idle", never a state the kernel
  did not say. (The plugin's "Finished, not looked at" list gathers idle agents whose bb thread is
  unread, which is bb's fact, not a claim that the agent finished.) A pending interaction is the
  runner's fact and is read from the runner; a waiting claim is the kernel's.
- **Every act goes through the `oats` CLI** (spawn, stop as plan then apply, start, restart,
  retire as plan then apply), with the kernel's refusal shown unchanged. A person's answer to a
  permission or a question goes through the runner's own interaction interface (in bb,
  `interactions.respond` or `interactions.resolve`), and a person's message through the runner's
  composer, never through `oats session input`: a provider's input never answers a pending prompt
  ([the session-provider contract](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md),
  `dec-faf9af131d69`). That is this view's choice, not a narrowing of `oats session input`, which
  stays the kernel's input path elsewhere, for example
  [a launcher's prompt](/nodes/integrations-expert/decisions/launcher-prompts-use-the-persons-session-input.md)
  (`dec-f5c1fd231298`).
- **It never acts on its own.** The runner's own stop, archive and delete cannot be hidden from
  a plugin. When a person uses them on an agent's thread, the view shows the agent as detached
  ("thread missing") and offers Start and Retire.

# Why

The kernel already owns receipts, lifecycle claims, refusals and the JSON shapes; a view that
reads files or infers state drifts from them and lies when they change. Joining by the recorded
id is the only join a person or the runner cannot break by renaming or moving something.

# Rejected

- **Retiring an agent when its thread is deleted in the runner.** One mis-click would remove a
  home, its identity and its work.
- **Reading OATS's files from the plugin.** Files are not the contract; the JSON verbs are.
- **The kernel pushing state into the runner.** The kernel stays runtime-neutral; the view pulls.
- **Replacing the runner's navigation to group the OATS pages.** The plugin would have to redraw
  all of the runner's own navigation and would replace the person's chosen layout; the group is
  drawn at the top of the plugin's own list instead.
- **Pinning the plugin's list at install.** In bb 0.50.1 such a pin outlives the plugin and
  leaves an empty sidebar after removal.

# Related

- Confirms, and does not change,
  [working and idle are producer-reported facts, not terminal heuristics](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)
  (`dec-4eaa8d223e4c`).
- [A bb thread has no "stopped" status](/claims/lessons/a-bb-thread-has-no-stopped-status-so-a-session-backend-records-its-own-stop.md)
  (`ins-f5e5457e0cbf`) is why a stop from bb's own UI is not an OATS stop, and why the view offers
  Stop through OATS.
- [In a bb Claude thread a permission prompt becomes oats.core's claim](/claims/lessons/a-bb-permission-prompt-is-an-oats-claim-and-a-tell-waits-behind-it.md)
  (`ins-7265936fd6d8`) is the bb behaviour behind reading a pending interaction from bb.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-20;
   notes/bb-plugin-reads-kernel-json-and-joins-by-thread-id.md;
   notes/bb-plugin-slots-probe-findings.md; notes/bb-plugin-backend-probe-findings.md.
2. [oats-project/oats-bb#1](https://github.com/oats-project/oats-bb/pull/1), merged 2026-11-20 as
   `f4b3fbf`, read at maintainer review 2026-11-20 (bb-app 0.50.1, plugin SDK 0.6.157):
   `plugin/README.md` states that it reads only the `--json` verbs and never `instance.json`,
   receipts, event files' contents or bb's database, that an archived or deleted thread shows
   "thread missing" with Start and Retire and nothing is retired, and that the plugin does not pin
   its thread list because a pin outlives the plugin; `plugin/model/view.ts` joins by
   `agent.threadId === thread.id` only and maps anything the kernel does not call running to
   "idle"; `plugin/app/interactions.ts` answers through bb's `interactions.respond` and
   `interactions.resolve`; no plugin code calls `oats session input`; `plugin/app.tsx` keeps the
   four pages out of bb's navigation and opens them from the top of the plugin's list. The
   reasons for the rejected alternatives are the source's report.
