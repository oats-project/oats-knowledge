---
type: Decision
title: Committed-only settings prevent deployment drift, not committed soul choice
description: Refuse host and spawn contributions to committed-only settings in the resolver while allowing soul payloads, because the restriction prevents deployment-local drift rather than privileging workspace files over other reviewed sources.
about: [system/oats-kernel]
id: dec-40efc78f3506
tags: [kernel, settings, provenance, compatibility, rejected-alternatives]
timestamp: 2026-11-03
---
# Decision and rationale

The source's 2026-11-03 design selects a generic manifest setting attribute,
`committedOnly: true`, as the committed-layer counterpart to `hostOnly`.
Its purpose is to keep a deployment or individual spawn from overriding a
reviewed shared value. It is **not** a rule that only the workspace may
choose that value.

A soul's slot payload stays allowed alongside manifest defaults and workspace
slot payloads: the soul is itself committed and reviewed, rather than a
machine-local source of variation. Excluding it would add a workspace-versus-
soul distinction unrelated to the drift this restriction is meant to prevent.
This does not assert that all deployments run the same revision or that a
soul can never choose a different value from a workspace default.

The selected boundary refuses contributions from the host-local settings
and per-spawn provider flags **before merging**. Presence is refused even
when the supplied value matches the committed one; the constraint concerns
which layer may choose, not whether today's values happen to agree. Declaring
both host-only and committed-only on one key is a manifest fault, not a
precedence choice between the flags.

# Rejected alternatives

- **Warn instead of refusing.** A warning permits the local override that
  defeats the shared-value boundary. The source rejected warnings as the
  enforcement mechanism, not warnings for every unrelated condition.
- **Call it `workspaceOnly` and exclude the soul.** That is stricter than the
  requirement and ties a generic setting constraint to one payload location;
  some capabilities have no workspace slot payload at all.
- **Enforce in the provider.** Refusal belongs in the resolver that sees the
  input layers, before consumers use the merged value. The existing
  [host-only lesson](/nodes/integrations-expert/lessons/a-merged-provider-payload-cannot-enforce-host-only-keys.md)
  owns that general argument. Hooks can receive leaf-origin diagnostics;
  the claim is not that hooks have no provenance information, or that
  re-reading the winning merged value can police every input contribution.

The shared-task-team requirement is already canonical in
[the maintainer's task-team decision](/nodes/oats-maintainer/decisions/tasks-team-is-a-workspace-setting.md).
It motivated the restriction but does not make the kernel know what a task
team means. The [configuration ownership decision](soul-declares-kind-config-assigns-policy.md)
remains unchanged. This generic attribute neither selects a task team nor
proves membership, deployment convergence or runtime enforcement of an
agent's work scope.

# Enforcement, agreement and limits

Put the boundary in resolution and regression cases that exercise every
allowed and refused layer, equal-valued forbidden contributions, conflicting
flags and a non-tasks setting. These are the mechanism's enforcement targets,
not tests rerun by this harvest. Formal syntax and errors belong in the
[kernel's capability contract](https://github.com/awebai/oats/blob/main/docs/capabilities.md),
not a second API specification here. The
[compatibility rationale](evidence-bounded-compatibility-and-migration.md#additive-contracts-need-the-actual-old-reader-failure-path)
explains why accepting a new manifest flag is not proof that an old kernel
enforces it.

The public [contract record](https://github.com/awebai/oats/issues/1719#issuecomment-6603147412),
read on 2026-11-03, reports agreement with the provider side and
setup-maintainer-pepe. That corroborates the source's reported design
agreement; it is not direct human acceptance or proof of final kernel review.
The implementation [PR #1721](https://github.com/awebai/oats/pull/1721) was
still open at `3885ca029dcb454b78c3f6a967ccb127259171e8` when checked that day.
This record preserves the selected rationale, not released availability.
If review changes the semantics, revise or supersede this decision explicitly.
No existing human-accepted decision is superseded.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-tasks-slot-payload, 2026-11-03; notes/committed-only-mirrors-host-only.md.
