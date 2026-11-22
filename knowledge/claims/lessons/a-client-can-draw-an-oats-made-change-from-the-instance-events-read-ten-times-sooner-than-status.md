---
type: Lesson
title: A client can draw a change OATS made from the instance's events read, about ten times sooner than from status
description: oats instance events <instance> --since <iso> --json is a contract a client may rely on and answers in about 80 ms where the whole oats status takes about 830 ms on a host with 14 instances; a client draws the change at once and lets the next status read confirm it, because events hold only what OATS itself wrote.
about: [workstream/provider-integration, system/oats-kernel]
id: ins-5b411990eff8
kind: lesson
tags: [events, status, freshness, client, plugin, desktop-cli-api]
timestamp: 2026-11-22
---

# What holds

`oats instance events <instance> --since <iso> --json` (feature `instance-events-2`, eventsApi 2;
the Desktop reads it, so it is a contract: docs/desktop-cli-api.md, "Events" and "Waiting on you")
tells a client what OATS itself changed for one instance: spawned, launched or restarted, stopped,
retired, and needs-input set or cleared. The file that changed names the instance
(`<deployment>/.agents/events/<agent>--<instance>.jsonl`), but the command is the contract, not the
file.

Timed read-only on one host with 14 instances at low load, five runs each: about 82 ms for one
instance's events, about 830 ms for `oats status --json`.

# How to use it

- For needs-input use the answer's top-level `waitingOnYou` and `waitingClaims`, never one `waiting`
  row: the kernel folds the producers and the session rules.
- Draw from the event at once; let the next status read confirm or correct.
- What nobody wrote is not there: a harness that died, a stop made in a provider's own UI, a
  provider thread in error, provider liveness. Status stays the truth for those.

# Why it matters

A client that only re-reads status on every event waits, in the worst case, for a read in flight,
its pause and the next read: about twice the status time plus the pause. On that host this is close
to 3 s, the bar a person was promised, before the roster grows. The event read does not grow with
the roster.

# Related

- [An OATS view inside a third-party runner reads the kernel's JSON verbs and never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`): the events read is one of the kernel's JSON verbs, so drawing from it keeps
  that decision; reading the event files' contents would not.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-22
   (oats-knowledge#457); notes/bb-plugin-draw-from-the-event.md.
2. oats-project/oats at `24403e17`, `docs/desktop-cli-api.md`, read at maintainer review
   2026-11-22: "Events" documents `oats instance events <instance> [--since <iso>] --json` under
   feature `instance-events-2`, `eventsApi: 2`, its kinds (spawned, launched, restarted, stopped,
   retired, waiting and others), the workspace log `<deployment>/.agents/events/<agent>--<instance>.jsonl`,
   and the top-level `waitingOnYou` and `waitingClaims`. The timings and the kernel side's
   confirmation of the read as a contract are the source's report.
