---
type: Lesson
title: Tracker integrations are partial surfaces; set expectations before adopting one
description: A tasks-slot integration deliberately exposes only the issue-execution slice of a tracker, so an adopter must be told up front what agents can operate, what stays human/UI-only, and that unsupported operations escalate rather than improvise.
about: [workstream/operations, workstream/provider-integration]
kind: lesson
id: ins-f60dc4cf7713
tags: [lesson, onboarding, adoption, tasks, integrations, expectations]
timestamp: 2026-07-10
---

Formed 2026-07-10 by the integrations role that built the first two tasks
integrations (Linear and Jira); generalised 2026-09-21 for onboarding in the
former oats-assistant node, merged here 2026-09-28.

# Context

A command list is not enough to onboard a deployment onto a tracker. Trackers
carry projects, overviews, documents, issues, sub-issues, comments and
relations; the integration exposes a narrow slice, and an adopter who hears
"OATS is connected to our tracker" as full coverage will promise workflows the
agents cannot run.

# Lesson

A tasks integration is a **partial surface by design**, not an incomplete one:

- **Issues execute** work: claim, update, block, hand off, complete.
- **Comments record** events on that work.
- **Documents and project overviews explain** the work and hold the durable
  "why"; they stay human- or UI-owned.
- **Conversation belongs to messaging**, not to tracker comments.

When helping a deployment adopt a tasks layer:

1. State the boundary before promising a workflow: agents operate issues and
   comments; humans own project structure and documents.
2. Read the integration's own declared support boundary (its skill's
   "not supported" list), not the tracker's UI or API.
3. Tell the adopter that an agent hitting an unsupported operation
   **escalates** with the task state preserved — it never invents a command or
   improvises a partial workaround.
4. Route requests to widen the boundary to the integration's owner; a
   deployment cannot configure its way to operations the integration does not
   expose.

The tasks slot is exclusive: one tracker fills it per soul, and which tracker
is a deployment decision, not a framework preference — the framework ships
integrations, not a choice.

# Consequences

- Onboarding conversations about a tasks layer open with this operating-model
  split, not with a command demo; a connected tracker is availability
  evidence, not proof that a workflow runs end to end
  ([adoption evidence and approved scope](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md)).
- The shipped Linear skill carries an explicit not-supported list and an
  escalate-on-persistent-failure rule, confirming the lesson held.
- Rejected: documenting only command recipes (users then assume UI-only
  operations are automatable); letting agents fall back to raw tracker API
  calls (breaks the ownership split and the capability boundary — see
  [kernel and capability responsibility](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).

# Citations

- [integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md)
  and [layers.md](https://github.com/awebai/oats/blob/main/docs/layers.md)
  (the exclusive `tasks` slot; `oats.jira`, `oats.linear`).
- Migrated from agents/integrations-expert/soul/knowledge/lessons/tracker-integration-docs-support-matrix.md @ 7838d3ca;
  adopter selection from agents/oats-expert/soul/knowledge/decisions/jira-over-aweb-tasks.md
  and official-multi-repo-workspace-and-package-experts.md @ 7838d3ca.
