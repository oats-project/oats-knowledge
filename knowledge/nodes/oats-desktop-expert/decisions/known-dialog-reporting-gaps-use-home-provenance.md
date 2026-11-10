---
type: Decision
title: Known dialog-reporting gaps use the home's provenance
description: Explain a known historical Claude dialog-reporting gap from the home's recorded module source, keeping the notice separate from live attention and avoiding warnings based on unknown coverage.
about: [system/oats-desktop]
id: dec-703621628af3
tags: [desktop, attention, provenance, warnings, rejected-alternatives]
timestamp: 2026-10-31
---
# Decision and rationale

The Desktop expert chose a narrow notice for a known historical gap: Claude
questions and permission requests could wait without producing an attention
claim. An investigation found that a fresh home could still lack the emitter
when its workspace lock selected an older package. Home and lock agreed, so
the absence of drift did not reveal the gap. To the operator, no claim looked
the same as not waiting.

Use the row's own captured module provenance for this particular notice:
the harness is `claude`, and `modules[oats.core].from` identifies package
`oats.framework` below version `1.6.0`, the source-reported release boundary
for oats.core `2.4.0`'s Claude hooks. Read the home's recorded `from.version`,
not the workspace lock: changing the lock alone does not move that home's
modules. Upgrading or respawning the home onto a version beyond the gap
clears the reason for this notice.

This is a bounded historical diagnosis, not a declaration that every newer
home reports every dialog. Member-sourced or differently packaged modules
are outside the predicate; absent or malformed provenance supplies no basis
for this notice. The threshold deliberately depends on one package's release
history rather than a new kernel contract.

# Separate a reporting limitation from a live claim

Place the explanation in the roster hover card and the context panel's
Session card. Keep the row label and the live **Needs input** pill governed
by the existing [attention design](needs-input-preserves-liveness-and-recognition.md).
A reporting limitation is not evidence that the agent is currently waiting.

Name exactly what goes unreported: Claude's questions and permission
requests. A blanket inability to report needs input would be false because
the same old home can still hold its agent's explicit
`oats instance attention` claim. Its live Waiting fact and the reporting-gap
notice may therefore appear together, with each clearing for its own reason.

# Rejected alternatives

Adding a kernel `wakeHold` coverage field to status rows and warning on
`unknown` was rejected. The source found that unknown also covered homes
which could emit claims, including pi and intermediate Claude hook versions.
It was absence of a support answer, not evidence of the historical emitter
gap. Upgrading a functioning home would not necessarily clear such a warning.
The wording “Needs-input reporting not confirmed” retained the same problem.

This applies the maintainer's
[healthy-default warning judgment](/nodes/oats-maintainer/lessons/healthy-defaults-do-not-warn-about-optional-features.md):
a warning that cannot clear in a supported, healthy configuration loses its
meaning. The source reports that the release lane required clearable client
warnings and that the maintainer agreed to drop the proposed status-row field
once it had no consumer. That is source-reported lane agreement, not a
verified human acceptance record.

The rejected status-row projection does not supersede the kernel's separate
[per-start hook-support decision](/nodes/oats-kernel-expert/decisions/dialog-claim-support-is-a-per-start-hook-statement.md)
or change wake-delivery policy. Provenance identifies this old-module gap;
it does not replace real-run evidence for broader support claims.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/desktop-platforms-expert,
2026-10-31; notes/stale-lock-hides-needs-input.md.

The proposal and note record the investigation and rejected alternatives.
The [implementation proposal](https://github.com/awebai/oats/pull/1704) was
open at `8f3608ed4ecf2be1592cc666120ec7e686bdebef` when checked by this
harvest. Its body corroborates the predicate, separate surfaces and coexistence
with an explicit attention claim. No implementation execution, release or
live app verification is established here; the source explicitly leaves
live checks unproven. This records the expert's design choice and rationale,
not shipment or a new human-approved requirement.

Added at maintainer review of oats-knowledge#239: the implementation PR merged
at that head on 2026-10-31 as `ba11de84`, before this harvest opened, so its
open state above is out of date. The
[release-lane approval](https://github.com/awebai/oats/pull/1704#issuecomment-6539292772)
records the same boundary (`oats-framework/v1.5.0` carries oats.core `2.3.0`,
`v1.6.0` carries `2.4.0`), the clearable-warning rule and `wakeHold` staying
unbuilt, and says the four running-app checks are still owed. The
[v0.40.0 release notes](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.40.0.md)
state the same boundary. The approval is a GitHub record of the lane's
agreement, not human acceptance, and no release of this notice is established.
