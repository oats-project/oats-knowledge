---
type: Decision
title: Onboarding's setup expert keeps its derived name, `<workspace>-oats-setup-expert`
description: The spawn line `oats onboard` hands the person names the setup expert `<workspace>-oats-setup-expert` (fallback `<workspace>-oats-setup`), derived from the workspace and the soul, not model-chosen. The deployment's owner kept it, like `--purpose`; it is the third deterministic name beside `--purpose` and the numbered fallback.
about: [system/oats-kernel, workstream/operations]
kind: decision
id: dec-36806a9c549a
tags: [naming, instance-name, onboarding, setup-expert, exception]
timestamp: 2026-11-13
---

# The decision

[Instance names end in the coordination role](/claims/decisions/instance-names-end-in-the-coordination-role-chosen-by-the-namer.md)
names `--purpose` and the numbered fallback as the names that keep the soul's
name. A third route keeps it too: `oats onboard`'s `next.spawn` line names the
setup expert itself, in the kernel (`packageInstanceName` in `bin/oats.mjs`,
oats main `d81c7dce2`):

- `<workspace>-oats-setup-expert` for oats.framework's `oats-setup-expert` soul;
- `<workspace>-oats-setup` when a soul of the workspace already holds that name;
- no `--name` (spawn names it) when both are souls' names or the name would be
  over the instance-name limit. A workspace's own setup soul gets no `--name`.

The deployment's owner decided on 2026-11-13, answering the lead's card, to keep
it "for now", because it is a good name for that instance. Acceptance:
source-reported (the owner's answer on the lead's card, 2026-11-13; not a
record the reviewer can open). Renaming it later is an effort of its own.

This refines the earlier decision rather than replacing it: everything else it
says still holds, and it links here.

# Why it stays

- It names one well-known instance per workspace and machine, which the person
  and the getting-started hand-over look for by that name: oats.framework's
  `oats-getting-started` skill (oats main `d81c7dce2`) inserts this machine's
  name for an existing workspace (`<workspace>-<machine>-oats-setup-expert`) so
  that a rerun derives the same name and finds its own setup expert. The
  setup lane's second reader of oats-project/oats#1896 flagged the skill's
  example as the onboarding hand-over's spawn line (verified at
  [its review comment](https://github.com/oats-project/oats/pull/1896#issuecomment-6828707864),
  2026-11-12).
- No model is in the onboarding loop, and nothing there has a task text to read
  a role from.

# Rejected

- **Rename it in the same release** (for example `<workspace>-setup-assistant`):
  a companion change across the kernel, the getting-started skill in the setup
  lane and the docs, a contract check with both sides, and accepting old names
  on a rerun, all for a name nobody found wrong.

Evidence: OKF proposal from oats-engineering-expert/instance-naming-lead, 2026-11-13; notes/naming-inventory-includes-names-the-kernel-writes.md.
