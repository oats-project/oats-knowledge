---
type: Decision
title: When the bb plugin cannot read OATS it keeps the last roster, with its age, and the acts stay usable
description: On a failed read the OATS plugin for bb shows the roster it last read, marked with its age, and keeps Stop, Start, Restart and Retire enabled, because each act asks the kernel first; hiding them left only bb's own Stop, Archive and Delete.
about: [workstream/provider-integration, system/oats-desktop]
id: dec-fa4d901ed0f8
kind: decision
tags: [bb, plugin, stale, roster, lifecycle, unreadable]
timestamp: 2026-11-21
---

# The decision

The plugin has four roster states: ready, stale (a read failed after one answered), unreadable (no
roster was ever read) and reading. In stale it draws the last roster under its age and keeps its
four lifecycle acts on each agent, marked "as of <age>". In unreadable and reading, every thread's
menu carries one disabled entry that says why, never nothing.

# Why, and why it differs from the Desktop

The Desktop holds acts on a stale roster, because it would act from its own stale facts. The plugin
acts only through the kernel: Stop and Retire read the kernel's plan first, Start and Restart are
refused by the kernel when wrong. A stale row therefore cannot cause a wrong act. And inside bb the
alternative to the plugin's acts is not "no act": bb's own Stop, Archive and Delete stay on the
thread, and they detach the agent from OATS. The first plugin hid its acts on a failed read and a
critical reader found exactly that.

# Conditions

The dialog names the agent from the kernel's answer, never from the stale row. A row the kernel no
longer knows shows the kernel's refusal and is marked until the next read.

# Status at acceptance (2026-11-21)

Decided, not yet built. oats-project/oats-bb `main` at `e9b74cba` and the open
[oats-bb#19](https://github.com/oats-project/oats-bb/pull/19) at `fadebb93` do not carry the four
roster states. #19's pattern table describes its `Stale` component as holding "why the unsafe acts
are held"; the piece that builds this decision reconciles that row with it, since here the four
lifecycle acts are not held. Whoever builds or changes it updates this record.

# Related

- [An unreached host keeps Stop and Retire available through a fresh plan](/nodes/oats-desktop-expert/decisions/unreached-host-actions-use-the-plan.md)
  (`dec-184f30c84c2a`): the Desktop's own case of the same reasoning, for one unreached host's
  rows: the kernel's fresh plan, not an old read, decides whether an act can be applied.
- [An OATS view inside a third-party runner reads the kernel's JSON verbs and never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`): every act goes through the `oats` CLI (stop and retire as plan then
  apply), and bb's own stop, archive and delete cannot be hidden from a plugin.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-21
   (oats-knowledge#455); notes/bb-plugin-unreadable-state-design.md. The design's acceptance on
   2026-11-21, the critical read of the first plugin and the four states are the source's report.
2. oats-project/oats at `8d3fffdd`, read at maintainer review 2026-11-21:
   `packages/client/roster-sections.mjs` (`rowStale`) holds a row of a stale deployment so that
   "its Start and actions wait for a current read, as for a stale roster": the Desktop's hold.
   Its reason, that the Desktop would act from its own stale facts, is the source's report.
