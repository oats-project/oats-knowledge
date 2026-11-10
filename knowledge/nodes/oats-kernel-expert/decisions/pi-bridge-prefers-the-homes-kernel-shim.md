---
type: Decision
title: The pi bridge prefers the home's kernel shim over ambient discovery
description: The pi bridge explicitly consults the home's launching-kernel shim before ambient discovery, avoiding a new launch variable or public package-root field for a failure confined to an outside-instance wrapper.
about: [system/oats-kernel]
id: dec-34024360e82f
tags: [kernel, pi, bootstrap, compatibility, verification]
timestamp: 2026-10-28
---
# Decision and rationale

The 2026-10-28 proposal chooses the home's kernel shim as an explicit bridge
bootstrap candidate: after the existing explicit `OATS_PKG_ROOT` override,
before PATH or global-install lookup. The home selected by `OATS_INSTANCE_HOME`
already has a shim symlink to its launching kernel. Consulting it directly
makes the home independent of the PATH pi happens to receive; it is not
redundant merely because an ordinary instance launch puts that shim on PATH.

Do not add another launch variable to repair an unproven missing-kernel path.
For pi outside an instance behind a wrapper-script `oats`, the chosen answer
is a clear resolution error naming the supported ways out, not following the
wrapper as though it were a symlink.

The rejected alternative was exposing the kernel's package root through
`oats version --json` so the bridge could resolve wrapper scripts. That would
change a client-read contract for a rare host layout, while an actionable
error suffices for this case. This is a case-specific rejection, not a ban on
future public seams justified by a real consumer. It preserves the
[public-boundary rationale](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md),
not permission for independently released capabilities to discover and import
private kernel files.

# Why the proof invocation changed the design

The source reports that the original issue attributed a provisioning proof's
failure to pi homes requiring a global OATS installation. Reproduction with
pi 1.3.0 and bridge 0.69.4, isolated user/package locations and no global
package instead showed the instance-home launch working through its shim.
The failure reproduced only with pi outside any instance behind a shell
wrapper. Resolving a wrapper's own path does not reveal the package it invokes.

The investigation therefore narrowed the affected surface before choosing a
fix: the proof's provisioning invocation was not the product's home launch.
Treating the issue's likely cause as established would have led to a new
launch contract for a path the reproduction did not find broken. Reproduce the
actual failing invocation and distinguish its environment from the claimed
product path before expanding a contract. The existing
[entry-point evidence lesson](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md#establish-reachability-before-filing-or-gating)
provides the related reachability rule; this decision keeps the specific
bootstrap finding and its rejected design together rather than adding a
second generic reproduction checklist.

The elimination route is bootstrap regression coverage distinguishing a home
without a global install, a home whose shim is absent from PATH, the explicit
override, and an outside-instance wrapper with an actionable diagnostic.
That coverage should preserve the boundary established by the investigation,
not encode the original misdiagnosis. This is an enforcement target, not a
claim that this harvest executed or verified those cases.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/session-lifecycle-followups-kernel-expert, 2026-10-28; notes/1604-pi-bridge-cause.md.

The proposal identifies [awebai/oats#1604](https://github.com/awebai/oats/issues/1604)
and the proposed fix [awebai/oats#1631](https://github.com/awebai/oats/pull/1631).
The reproduction, chosen fix and rejected alternative are source-reported;
this harvest did not rerun pi or audit the implementation. #1631 was open,
not merged, at the source's checkpoint. Preserve the rationale as chosen
direction, not released behavior or a guarantee for every installation layout.
No explicit human acceptance is established by the captured evidence.
