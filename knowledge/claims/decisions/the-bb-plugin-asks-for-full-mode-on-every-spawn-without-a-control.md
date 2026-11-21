---
type: Decision
title: The OATS plugin for bb asks for bb's full mode on every spawn, without a control
description: Joan decided that a spawn from bb's New agent form always passes --yolo, with no tick box and no dependence on a host default; the grant is stated in words (README, skill, one help line), and Start and Restart keep the home's recorded choice.
about: [workstream/provider-integration, system/oats-kernel]
kind: decision
id: dec-0850fbbbe808
tags: [bb, plugin, spawn, full-mode, yolo, permission, rejected-alternatives]
timestamp: 2026-11-21
---

# The decision

The bb session provider launches agents in bb's full mode only: no sandboxed mode is offered,
because bb lets a command leave its sandbox
([a harness sandbox is not a boundary unless its switch is out of reach](/nodes/oats-maintainer/decisions/a-harness-sandbox-is-not-a-boundary-unless-its-switch-is-out-of-reach.md),
`dec-375435ce318a`). A launch that does not choose full mode is refused
(`E_BACKEND_SANDBOXED_MODE`).

The plugin's New agent form asked the kernel for no mode. On a deployment with no full-mode default
launch configuration its Spawn was therefore refused, with advice (`--yolo`, a launch
configuration) the form could not act on; and on OATS 0.70.0 the preview read clean first.

Three options were put to Joan, the person the effort is for:

1. a line in the form saying agents in bb run in full mode, with a box to tick, then `--yolo`
   (the specialist's recommendation: the person sees the grant and says yes each time);
2. no plugin change: a full-mode default in each deployment, and the docs say so;
3. the plugin always passes `--yolo`, silently (advised against by the specialist: nothing on the
   screen says so).

**Decision by Joan, 2026-11-21: "3: Silent, always full".** The acceptance is
**source-reported (relay at
[oats-project/oats-bb#15](https://github.com/oats-project/oats-bb/pull/15))**: the change's
description quotes the decision with its date and says it reached the author through the effort's
lead, as a person's word passed on by agents. A later instance does not reopen it on its own; a
change to it needs Joan's acceptance, cited.

# How it is carried

- The spawn's preview and its apply both carry `--yolo` (the kernel binds the apply to the
  preview's decision, so they must agree). The plugin depends on no default of the host.
- **Start and Restart are not changed.** They keep the home's recorded choice. A home that someone
  spawned elsewhere without full mode is not escalated from bb: the kernel refuses, and the plugin
  shows the refusal unchanged. The decision was about spawn.
- **The grant is findable in words, never as a control:** the plugin's README, the plugin's skill
  for agents, and one muted line on the form, "Runs in bb's full mode: no sandbox." A sentence
  asks nothing, so it does not contradict "silently".

# What a later instance should not do

Add a tick box or a confirmation to the form; make the plugin's spawn depend on a host default
again; pass `--yolo` on Start or Restart. Each reverses a choice a person made or widens it.

# Related

- [A harness sandbox is not a boundary unless its switch is out of reach](/nodes/oats-maintainer/decisions/a-harness-sandbox-is-not-a-boundary-unless-its-switch-is-out-of-reach.md)
  (`dec-375435ce318a`): why the provider runs in full mode only. This decision refines it for the
  plugin's spawn and changes nothing in it.
- [An OATS view inside a third-party runner reads the kernel's JSON verbs and never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`): the plugin still acts only through the `oats` CLI and shows the kernel's
  refusals unchanged; this decision only fixes which flag its spawn passes.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-21
   (oats-knowledge#449); notes/bb-plugin-spawn-always-full-mode.md. The options as put and the
   specialist's recommendation are the source's report.
2. [oats-project/oats-bb#15](https://github.com/oats-project/oats-bb/pull/15), merged 2026-11-21
   as `ae10f08`, read at maintainer review 2026-11-21: its description quotes the decision ("3:
   Silent, always full", 2026-11-21) as relayed through the effort's lead; `plugin/kernel/spawn.ts`
   puts `--yolo` in the argument list the preview and the apply share; `plugin/README.md` says
   Spawn runs in full mode always, with no tick box, and that Start and Restart name no mode; the
   form carries the line "Runs in bb's full mode: no sandbox."; the skill says it for agents. The
   real run's results (`yolo: true, launchConfig: null` on a deployment with no launch
   configuration) are the PR's report; the run was not reproduced at review.
