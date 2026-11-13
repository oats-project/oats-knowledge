---
type: Decision
title: Instance names end in the coordination role, chosen by whoever names them; nothing appends the soul's role
description: An instance is named `<descriptive>-<role>`, at most five words, where the role is its role in the spawner's coordination. A person, an agent or the naming model chooses it, reading the role from the task text. The kernel knows no role list and appends nothing. `--purpose` and the numbered fallback keep the soul's name for automations.
about: [system/oats-kernel, system/oats-desktop, workstream/coordination]
kind: decision
id: dec-d2b7cfe5553a
tags: [naming, instance-name, suggest-name, coordination-role, contract]
timestamp: 2026-11-13
---

# The decision

The deployment's owner decided on 2026-11-12 that names should not carry the soul's role, because the soul is already shown beside the name. The contract change (v3) had both maintainer sides' yes. Acceptance: source-reported (relay in the bodies of [oats-project/oats#1896](https://github.com/oats-project/oats/pull/1896) and [#1897](https://github.com/oats-project/oats/pull/1897), 2026-11-12). It is implemented in three PRs aimed at one release:

- [oats-project/oats#1897](https://github.com/oats-project/oats/pull/1897): the kernel;
- [oats-project/oats#1896](https://github.com/oats-project/oats/pull/1896): oats.core;
- a Desktop PR for the typed name, still to come when #1897 opened.

None of them was merged when this was proposed. All three merged on 2026-11-12: #1897 (`9810a8ee`), #1896 (`75982b65`) and the Desktop's [oats-project/oats#1898](https://github.com/oats-project/oats/pull/1898) (`2b122547`). What the decision says:

- **The rule lives once,** in oats.core's oats-souls "Name the instance". Docs point at it and don't restate it.
  - The name is `--name <descriptive>-<role>`, at most five words.
  - The role is the new instance's role as the spawner's coordination names it. With no coordination, it is one word for what the instance does.
  - A spawn task states the new instance's role in its first lines.
- **The suggested name** (`--suggest-name`, `oats instance suggest-name`) is the model's whole reply, slugged. The kernel:
  - keeps the last word, the role, through every cut. Over five words, or over 64 characters counting any `-n`, it drops the descriptive words nearest the role first;
  - treats a one-word reply as `invalid-reply`, which falls back to a numbered name.
- **What doesn't change.** The JSON, the reasons and the features stay the same, and `--soul` is accepted but unused. No client needs to tell the old rule from the new one. An older side gives a valid but longer name, and the release notes say so.
- **A typed `--name`** is used exactly as given; the Desktop's dialog stops adding the role to a typed name (the Desktop PR).
- **`--purpose`** (`<soul>-<purpose>`) and the numbered `<soul>-<n>` stay, by the owner's decision ("for now"). Schedules and triggers name their runs that way, and schedule reconciliation finds a lost run by that name, with no model in the loop (see [a derived name's absence proves nothing unless it is the producer's name](/nodes/oats-kernel-expert/lessons/derived-name-absence-needs-producer-identity.md)).
- **Onboarding's setup expert** keeps its derived `<workspace>-oats-setup-expert` too, by the owner's later decision: [onboarding's setup expert keeps its derived name](/claims/decisions/onboarding-names-its-setup-expert-for-the-workspace-and-soul.md) (2026-11-13) refines this decision with a third kept name; it is not a leftover to fix.

# Why

- The kernel stays coordination-neutral, and a workspace may have no coordination at all. Only the task text knows the role.
- A probe showed that the task text carries the role when it is stated early ([the lesson](/claims/lessons/a-naming-model-reads-the-role-from-the-tasks-first-lines.md)).

# Rejected

- **The kernel reads a role list from the coordination capability:** a new contract, and the kernel would learn the coordination's roles.
- **A caller-passed `--role`:** a new flag every client must fill, when the task already carries the role.
- **Refusing `--soul` on `instance suggest-name`:** it breaks every installed Desktop's suggestion, for no gain.
- **Renaming `--purpose` runs:** it breaks schedule reconciliation in every deployment.

Evidence: OKF proposal from oats-engineering-expert/instance-naming-lead, 2026-11-12; notes/suggested-name-role-from-task-not-kernel.md, notes/purpose-stays-the-automation-route.md.
