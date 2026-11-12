---
type: Lesson
title: Settings reach hooks as a payload, and the brief tells the agent where they are — an advisory hook briefs and persists meta without calling the service
description: A capability's settings arrive at its hooks as one merged JSON payload; the spawn hook returns a one-line brief naming the facts the agent must know and persists what a later event needs as meta, the skill tells the agent to find those facts in the brief or the instance record and stop when they are unset, and an advisory hook never contacts the external service.
about: [workstream/provider-integration]
kind: lesson
id: ins-17110e4ebac9
tags: [lesson, integrations, hooks, settings, brief, meta, advisory]
timestamp: 2026-07-10
---

Formed 2026-07-10 by the integrations expert for a tasks integration whose
target site and project vary per deployment; restated under the workspace
model, where the payload is merged from several layers.

# Rule

- The kernel hands a capability its merged settings as one JSON payload
  (`OATS_SETTINGS`, with `OATS_SETTINGS_ORIGINS` saying which layer set each
  leaf); the hook reads its own keys from it and nothing else
  ([capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)).
- The spawn hook returns **one brief line** (the `brief` of its final JSON
  line, which the kernel adds to the instance's `TASK.md`) naming the facts
  the agent must know (which site, which project, which identity it acts as),
  and persists in **meta** what a later event needs (identifiers to retire,
  locators to reuse).
- The capability's skill tells the agent to find those facts in the brief
  first, then in the instance record, then to ask a human, and to **stop**
  rather than guess when they are unset.
- An **advisory** hook (one that only briefs) makes no call to the external
  service and emits a warning, not a failure, for incomplete settings; a
  **required** spawn hook (one whose failure would leave the instance
  believing it has something it lacks) fails and rolls back the spawn.

# Why

Agents act on what they can read. A setting that reached the hook but not the
brief is invisible to the agent; a setting the agent guesses is a wrong call
against a real service. Separating advisory from required hooks keeps spawns
cheap where nothing external is created and honest where something is: a
messaging identity that was never minted must fail the spawn, a tracker whose
project is unset must only warn.

# Consequences

- Retire hooks exist only when there is external state to undo; a roster
  retirement that is a skill-level protocol is not a hook.
- A key that only the host may supply is a manifest declaration
  ([host-only settings](/nodes/integrations-expert/lessons/a-merged-provider-payload-cannot-enforce-host-only-keys.md)),
  and inputs a hook acts on never come from its ambient environment
  ([a lifecycle hook never trusts the ambient environment](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)).

# Spawn-time values are strings

**Refinement, 2026-11-12.** A setting given at spawn, `oats spawn --provider
<capability> key=value`, reaches the payload as a string. Values a
deployment declares in YAML keep their types. A hook that tests a boolean
with `=== true` or `!== false` therefore ignores the command-line form, and
a refusal whose remedy is "spawn with `--provider … key=true`" names a
remedy that does nothing. When a hook reads a boolean setting that an
operator may give at spawn, accept the string too, exactly `"true"` (or
`"false"`) and nothing looser, and test the hook with the string the kernel
passes, not only with a boolean fixture. Whether the kernel should type these
values is the kernel's question, not the provider's to settle.

Evidence: OKF proposal from integrations-expert/aweb-seat-defects-lead, 2026-11-12; notes/provider-flag-values-are-strings.md.
Source: the fix in awebai/oats-aweb#234 (#227), and the general case
awebai/oats-aweb#232. Maintainer review of oats-knowledge#375 read the
kernel's `parseProviderFlags` (awebai/oats `lib/instance-resolution.mjs` at
1286cfa): its doc comment says values are strings, and it assigns the raw
text after the first `=`.

# Citations

- Migrated from agents/integrations-expert/soul/knowledge @ dade3270.
