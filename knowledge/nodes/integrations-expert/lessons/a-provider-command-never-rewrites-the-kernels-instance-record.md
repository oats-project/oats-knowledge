---
type: Lesson
title: A provider that owns an in-life lifecycle owns its state file and its verbs — it never rewrites the kernel's instance record, and its skills never teach the native mutations underneath
description: Keep in-life state in a provider file mirrored through hook meta, never in instance.json, teach the provider's verbs, and use reported identity locations rather than derived paths or a silent default for an unavailable explicit task destination.
about: [workstream/provider-integration]
kind: lesson
id: ins-52db13416bd7
tags: [integrations, provider-state, hooks, instance-record, ownership, skills, lifecycle]
timestamp: 2026-11-03
---

**Observed (2026-09-25), in the first review of a messaging provider's join
and leave verbs.**

- The verbs persisted the joined-team list by reading the kernel's
  `instance.json`, editing its own `capabilityMeta` block and writing the
  whole file back. It worked in the fixture and it is wrong: the kernel writes
  that file itself at spawn, launch and retire (and the Desktop edits it
  through the kernel), so a command racing a kernel write loses one side's
  edit silently, and the provider has bypassed hook output, the one channel
  through which its meta is supposed to reach the kernel.
- The provider's team-membership skill still taught the native client's join,
  leave, invite and switch commands after the provider had taken ownership of
  membership (per-team identity homes, a state file, retire cleanup,
  readiness, the Desktop's operations). An agent following it would have
  changed a membership behind the provider's back.

**Rules.**
- A provider owns its in-life state in its own file inside the home (for
  oats.aweb, `.oats-aweb/teams.json`), and reads it in every entrypoint: its
  commands, its operations, and its launch and retire hooks, beside the
  kernel-fed meta.
- Every hook output mirrors that state into `meta`, so the kernel's record
  carries a copy for inspection; the copy is never the source. A consumer that
  needs the state live (a Desktop panel) reads it through the provider's
  operation.
- Once a provider owns a lifecycle, every shipped skill and inject names the
  provider's verbs for changing it, and allows the native tool only for
  read-only diagnostics (list, status, show). Review skills together with the
  code that takes ownership; the removed-verb scan covers the native tool's
  mutating verbs the same way it covers the kernel's.
- Cleanup of that state follows
  [a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md):
  a failed remote leave keeps the local credential.

# Refinement: consumers use the provider's reported identity (2026-11-03)

A second consumer of a provider-owned lifecycle must not create another
source of truth for its resources. In the source's task-team design, task
commands select the joined identity home reported for the label by
`oats aweb teams --json`. Building that location from a label and a directory
naming convention was rejected: knowing the convention neither establishes
membership nor identifies the provider's recorded identity.

The [shared task-team decision](/nodes/oats-maintainer/decisions/tasks-team-is-a-workspace-setting.md)
already owns where the task destination is selected, and the
[kernel's committed-only decision](/nodes/oats-kernel-expert/decisions/committed-only-prevents-deployment-drift.md)
owns the restriction on configuration sources. This refinement concerns the
consumer boundary, not a second task-team or resolver specification.

For the explicitly selected task team, a missing or unreadable membership
answer means report and stop, not run under the primary identity. The source
reports that aweb scopes task lists by the authenticated certificate's team;
a successful command under a fallback identity can therefore operate on an
entirely different list. That apparent success is the reason to refuse the
fallback. Absence of an explicit selection is different: the selected design
retains the default-team behavior in that case. This does not overturn
[contract-defined fallbacks](/nodes/integrations-expert/lessons/a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md)
for other inputs or authorize automatic joining, identity creation or moving
messaging defaults.

Put the consumer lookup behind one provider-reported selection path and test
it with a reported identity location that differs from the naming convention.
Negative cases should prove that an explicitly unavailable destination causes
no command against the default team; pair them with the unset case that
preserves default behavior. Readiness and command guidance must agree on
that boundary. These are elimination targets for implementation and guidance,
not tests delivered or rerun by this knowledge change.

The source reports agreement by both maintainer sides, relayed by the setup
maintainer by mail on 2026-11-03, and cites
[awebai/oats-aweb#189](https://github.com/awebai/oats-aweb/pull/189), open at
capture. That is **source-reported design agreement**, not independently
verified human acceptance or released availability. The team-scoping premise
comes from the source's reading of aweb server-v1.27.45 task routes; no server,
implementation or live membership was tested here. This is one integration
example, not evidence that every provider has the same team semantics.

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-03; notes/tasks-team-is-a-committed-label-read-from-the-joined-home.md.
