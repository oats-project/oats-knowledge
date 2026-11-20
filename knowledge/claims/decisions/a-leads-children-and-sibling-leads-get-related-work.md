---
type: Decision
title: A lead's children and its sibling leads get related work; independent and maintainer-launched leads don't, and the kernel sets no default
description: Coordination, not the kernel, decides who carries the related-work flag. A lead spawns its children (specialists, helpers, probes, developers, reviewers) with it, and a sibling lead it starts for an effort that arises from its own; an independent lead and a lead a maintainer launches start without it. The kernel's injects and oats.core say nothing about it.
about: [workstream/coordination]
id: dec-31b4c8d0cc8f
kind: decision
tags: [coordination, related-work, lineage, desktop, spawning]
timestamp: 2026-11-20
---

# The decision

The product owner, directly to the effort's lead on 2026-11-20: "our coordination shpuld teach this: lead
siblings get related work, and lead-lead's children get it too. The kernel inject should say nothing about this."
Asked whether that meant both a lead's sibling leads and its own children, the answer was: "yes your read is right".

- **With related work:** every child of a lead (specialist, helper, probe, developer, and each review round's
  reviewer), and a sibling lead started for a new effort that arises from the lead's own
  (`--relation sibling --relative-to <lead> --related-work`).
- **Without it:** an independent lead (`--relation unrelated`), and a lead a maintainer launches as its child:
  that effort is its own, not the maintainer's work.
- **Where the rule lives:** in the coordination capabilities that teach spawning (OATS's copy of the engineering
  template, and oats.framework's coordination guidance). The kernel only records and reports the flag
  ([the binding](/nodes/oats-maintainer/decisions/related-work-binds-parent-else-sibling-and-keeps-old-spellings.md));
  its injects and oats.core set no default and don't mention it.

This refines OATS's own convention in
[parent-child lines require declared shared work](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
(`dec-97cfed58e463`: experts set the flag on their developers, developers on their reviewers, maintainers not on
their experts) by adding the sibling lead that the related-work binding now allows. It supersedes nothing: that
record's declaration-only rule and capability-owned policy stand.

# Why

The flag exists so a person sees which instances belong to one piece of work. A lead's children are its work by
definition, and a follow-on lead is work the person looks for next to the first. An independent lead isn't, and a
maintainer is a standing seat, not one effort. Putting a default in the kernel would draw lines for work that isn't
related, and take a coordination choice away from the organisation that adapts its coordination.

# How to apply

Spawn as above. On an OATS before 0.69.23 the flag is `--same-work` and binds a child only: start a sibling lead
without it there.

# Acceptance

The product owner's decision, given to the effort's lead in session on 2026-11-20, is **source-reported (relay at
[oats-project/oats#2019](https://github.com/oats-project/oats/pull/2019))**: the PR description quotes it as the lead's
report, and the lane maintainer's
[green light](https://github.com/oats-project/oats/pull/2019#issuecomment-7040513667) rests on it. Checked at review.

Evidence: OKF proposal from oats-engineering-expert/sidebar-collapsed-sibling-lines-lead, 2026-11-20. Taught in
oats.framework by oats-project/oats#2022 (merged 2026-11-20, naming both spellings by version), and in OATS's own
capabilities by oats-project/oats#2019, which was open at review, held until every host that spawns from those
capabilities runs 0.69.23.
