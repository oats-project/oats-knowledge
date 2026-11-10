---
type: Conclusion
title: Keep coordination scopes and budgets in the provider payload
description: The source's provisional position routes coordination declarations through capability settings rather than adding kernel fields, because recording a team's scope or budget does not make the kernel its enforcer or token meter.
about: [system/oats-kernel]
kind: finding
id: ins-d052b716ae39
tags: [kernel, coordination, capabilities, budgets, rejected-alternatives]
timestamp: 2026-11-03
---
# Position and status

The 2026-11-03 kernel investigation recommends carrying write scopes and
budgets in the coordination capability's provider payload. These are
**source-reported product-lane positions submitted for human review, not
accepted direction**. Nothing was implemented or run for this investigation.
No existing decision is superseded.

The proposed placement uses the workspace-owned coordination capability's
manifest defaults, with per-spawn narrowing through the existing provider
settings route. The recorded payload can then be read by the parent or gate.
The important distinction is declaration versus enforcement: recording a
scope or budget does not prove that the agent obeyed it.

# Why not add kernel or soul fields?

A kernel `writeScope` or `budget` would give one coordination vocabulary its
own privileged schema while duplicating the generic payload route. A new
soul-schema field was also rejected: the source's reading found that additive
capability defaults could live in the workspace capability's manifest, so a
new soul contract bought no necessary expressiveness for this proposal.
Exact supported settings syntax remains repository-owned, not a second schema
in this concept.

This applies the existing [generic capability boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)
and [capability-owned coordination policy](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md).
It does not replace those decisions or turn every capability into a coordination
provider.

The source rejects kernel write-scope enforcement: the kernel does not mediate
all agent writes, and the accepted [home/work boundary](/nodes/oats-kernel-expert/decisions/home-work-authority.md)
is not a sandbox. Where enforcement is required, the position places it at the
actual write or publication boundary, such as native harness permissions,
forge identity permissions or a required forge check. Those are candidate
control locations, not proof that any selected configuration enforces the
scope; [native harness settings and explicit bypass consent](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
remain unchanged.

# Time is not token consumption

Lifecycle timestamps can support elapsed-time observations. They cannot
measure token use. The position assigns token measurement to a harness-aware
capability and rejects kernel transcript parsing and kernel budget-triggered
auto-stop. Measurement and the team's response to a budget belong to their
respective capability owners, rather than turning a recorded allowance into
an implicit lifecycle action. This does not claim that generic lifecycle or
resource mechanisms cannot exist.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-d6-kernel-questions, 2026-11-03; notes/coordination-declarations-ride-the-provider-payload.md.

The source reports reading awebai/oats at `8f2e28d59` for the provider-setting
and inspection route. This harvest did not audit that code or test settings,
permissions, token accounting or budget enforcement. The durable conclusion
is the placement rationale and rejected alternatives, not a support matrix.
A later accepted change should explicitly revise or supersede this position,
not silently promote it to a human decision.
