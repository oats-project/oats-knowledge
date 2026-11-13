---
type: Lesson
title: A naming change's inventory greps every `--name` the kernel and the skills write, not only the naming calls
description: The naming effort inventoried spawn's naming routes (suggested, typed, `--purpose`, numbered) and missed `oats onboard`'s spawn line, which builds `--name <workspace>-oats-setup-expert` itself. A second reader found it after the plan had both sides' yes. Grep for every name the kernel and the shipped skills emit before writing a naming contract.
about: [workstream/coordination, system/oats-kernel]
kind: lesson
id: ins-571751c05262
tags: [planning, naming, inventory, spawn, onboarding]
timestamp: 2026-11-13
---

# The lesson

A rule about instance names reaches every place a name is built, and the
kernel builds names outside spawn. The naming effort of 2026-11-12 listed
spawn's routes (the suggested name, a typed `--name`, `--purpose`, the
numbered fallback) and wrote its contract on that list. `oats onboard` was not
on it: its `next.spawn` hands the person a spawn line with a name the kernel
derives (`<workspace>-oats-setup-expert`), and the getting-started skill finds
that machine's setup expert by the name. The setup lane's second reader of
oats-project/oats#1896 found the route after the plan had been agreed
([its review comment](https://github.com/oats-project/oats/pull/1896#issuecomment-6828707864),
2026-11-12, flags the skill's example as the hand-over's spawn line). It cost
a late decision card to the deployment's owner (source-reported), who kept the name
([the decision](/claims/decisions/onboarding-names-its-setup-expert-for-the-workspace-and-soul.md)).

# What to do

Before specifying a change to how instances are named, list every route that
produces a name, from the code rather than from the spawn flags:

- `git grep -n -- '--name ' lib bin skills oats-package`, plus the functions
  that derive a name (the onboarding and schedule paths among them);
- each hit gets a row: changed by the rule, or kept, and why.

This refines [inventory spawn routes before specifying a feature](/nodes/oats-expert/lessons/inventory-spawn-routes-before-specifying-a-feature.md):
for naming, a route is any code that writes a name, not only the routes a spawn takes.

Evidence: OKF proposal from oats-engineering-expert/instance-naming-lead, 2026-11-13; notes/naming-inventory-includes-names-the-kernel-writes.md.
