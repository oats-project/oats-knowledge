---
type: Decision
title: A client marks an instance gone only on a stop or retire plan refused with E_SESSION_UNKNOWN
description: The OATS plugin for bb says "not in OATS any more" only when a stop plan or a retire plan is refused with E_SESSION_UNKNOWN, by code alone; every other refusal is shown as the kernel's and the roster is read again, because that code also means a session whose state cannot be established.
about: [workstream/provider-integration, system/oats-kernel]
id: dec-292ee93e877c
kind: decision
tags: [bb, plugin, lifecycle, refusal, e-session-unknown, stale-roster]
timestamp: 2026-11-22
---

# The decision

A client that keeps a roster it read earlier can be asked to act on an agent that was retired
since. The plugin marks such a row "not in OATS any more" on exactly one signal: a stop PLAN or a
retire PLAN refused with `E_SESSION_UNKNOWN`, matched by its code, never by a refusal's words. Every
other refusal, on any act, is shown as the kernel's own refusal, and the roster is read again at
once; a retired instance is absent from that read, and that read removes its row.

# Why not more

- A refusal's words are no contract. An earlier version matched sentences its author had written
  from a report; a reviewer ran the kernel and four of six acts went unrecognised. The fix was to
  record what the kernel prints for a retired agent on each act, from a real run.
- `E_SESSION_UNKNOWN` alone is not enough on every act: the kernel also answers it for a session
  whose state cannot be established (a start, a restart, the signalling of a stop). Taken as "gone"
  there, a living agent would be marked gone. Only where the name is resolved first (the plans) does
  the code mean nothing else. The overload is filed as a contract question (oats#2084).
- A start or restart given a retired home answers `E_WORK_INSPECTION_FAILED`, a code shared with
  other failures.

# What it costs

An agent retired in the seconds between its plan and its apply gets the kernel's refusal, and its
row leaves a moment later, without the notice.

# Status at acceptance (2026-11-22)

Decided and built, not yet on main: the rule is `planSaysGone` in `plugin/app/roster/gone.ts` of the
open [oats-bb#31](https://github.com/oats-project/oats-bb/pull/31). Whoever merges, changes or drops
it updates this record, and so does the answer to oats#2084: a code of its own for "no such
instance" would let this rule widen beyond the plans.

# Related

- [When the bb plugin cannot read OATS it keeps the last roster](/claims/decisions/a-plugin-that-cannot-read-oats-keeps-the-last-roster-and-its-acts.md)
  (`dec-fa4d901ed0f8`): its condition that "a row the kernel no longer knows shows the kernel's
  refusal and is marked until the next read" is made exact here: the mark comes only from a plan's
  `E_SESSION_UNKNOWN`.
- [An OATS view inside a third-party runner reads the kernel's JSON verbs and never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`): stop and retire go as plan then apply, with the kernel's refusal shown
  unchanged; this decision is the one place the view reads a refusal's code as a fact.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-22
   (oats-knowledge#457); notes/bb-plugin-unreadable-state-design.md.
2. [oats-project/oats#2084](https://github.com/oats-project/oats/issues/2084), open, read at
   maintainer review 2026-11-22: `E_SESSION_UNKNOWN` means both "no instance" and "session state
   cannot be established", with the kernel lines for each.
3. oats-project/oats at `24403e17`, read at maintainer review 2026-11-22: `lib/instance-address.mjs`
   throws `E_SESSION_UNKNOWN` ("no instance …") when a name resolves to no home;
   `docs/desktop-cli-api.md` ("Stop") documents that a home retired since the plan answers it, and
   ("Start and restart") answers it for a start whose session target cannot be established.
4. [oats-bb#31](https://github.com/oats-project/oats-bb/pull/31), open, read at maintainer review
   2026-11-22: its body states the rule, the four review rounds and the second round's finding that
   the first version matched refusal words written from a report; its fixture
   `plugin/test/fixtures/lifecycle/gone.json`, recorded from the real kernel 0.70.0, holds what the
   six acts answer for a retired agent: `E_WORK_INSPECTION_FAILED` for start and restart,
   `E_SESSION_UNKNOWN` for both plans and both applies.
