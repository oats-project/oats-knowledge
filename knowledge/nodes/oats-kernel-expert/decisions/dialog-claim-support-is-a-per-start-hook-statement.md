---
type: Decision
title: Dialog-claim support is a per-start hook statement, not a manifest promise
description: A real hook run reports this home's claim support after setup, replacing earlier answers even by absence, because module capability and past claims cannot prove what this start installed.
about: [system/oats-kernel]
id: dec-d71cf13bf3a8
tags: [kernel, hooks, claims, observations, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and rationale

The wake-hold design needs two distinct answers: whether the kernel can
withhold a wake, and whether **this home's current setup reports dialogs as
claims**. Homes keep their captured modules, so even a correct per-harness
support table cannot answer the second question.

The selected contract lets a spawn or launch hook report support **after
doing the work**, and the kernel records that real-run answer per capability.
A hook that runs and supplies no answer removes its previous entry. Absence
must replace an earlier positive answer, or a failed setup, downgrade or
changed launch can leave stale confidence behind.

The kernel names no harness. The producer owns the evidence for its answer:
writing hooks is insufficient if the actual launched harness cannot fire
them. This preserves [generic kernel/capability responsibilities](kernel-and-capability-responsibility.md)
and applies [producer-reported activity](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)
to a different fact, rather than duplicating that activity contract.

# Why the alternatives lost

- **A manifest key:** declares what a module can do, not what this start did.
  A hook may warn that it could not write settings, while the manifest still
  promises coverage. That fails in the dangerous direction.
- **A new emitter verb:** would establish that a hook actually ran, but adds
  another surface and stays unknown until the first event. A recipe cannot
  use it immediately after setup.
- **A documentation table alone:** cannot distinguish an old captured home
  from a newly composed home using the same harness.
- **Inference from past claims:** mistakes an unused home or a session with
  no dialog for lack of producer support. No observed claim is not a
  capability declaration.
- **Put the answer in preview-checked contributions:** a failed real write
  would then disagree with preview and refuse the start. The choice keeps
  this observation beside hook metadata, rather than turning an advisory
  setup failure into a new start gate.

These are reasons for the contract shape, not an instruction to copy its
current storage schema into every consumer.

# Name the evidence, not a guarantee

The chosen public wording is `on-claims`, not `protected`. It says that
kernel wake delivery relies on claims; it does not promise that all dialogs
are reported or that a dialog cannot open before Enter. A setting that
disables hooks can also invalidate the expected reporting without being
seen by setup.

The draft's claim that pi was `not-exposed` was withdrawn after a report of
an extension-owned question dialog. Knowing the built-in harness is not
enough to vouch for everything loaded into a home. The source's final
choice leaves that answer unknown; a producer may assert no exposure only
when it can support that broader statement. This is a conservative evidence
boundary, not a permanent version/support matrix.

The field concerns **kernel wake delivery only**. It does not cover direct
session input or the aweb broker, including broker delivery for joined
teams. Those paths need their own owners' changes and evidence. See the
[withholding decision](waiting-claims-may-only-withhold-automated-input.md)
and [dialog-coverage lesson](../lessons/dialog-claims-do-not-enumerate-all-dialogs.md).

# Enforcement and evidence

Keep recording tied to actual hook runs, with tests for positive answer to
absence, failed settings writes, unsupported or changed launch executables,
and unrelated capabilities' entries. The executable a producer versions is
the [kernel-handed pane-side answer](hook-executable-is-the-pane-side-answer.md),
so "reported only when claims will actually fire" shares that variable and
its absence rule. Separate the preview contribution
contract from advisory observed support. These are enforcement targets,
not a claim that this harvest executed the implementation.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-wake-holds-at-dialog, 2026-10-30; notes/item-4-claim-support-design.md.

The harvest read the [hook-answer proposal and rejected alternatives](https://github.com/awebai/oats/issues/1670#issuecomment-6526254349),
[other-side agreement with actual-support and replacement-by-absence conditions](https://github.com/awebai/oats/issues/1670#issuecomment-6526267253),
and [later product-side correction of the pi answer](https://github.com/awebai/oats/issues/1670#issuecomment-6526356580).
Do not treat the earlier agreement as independent acceptance of every later
refinement, or these agent records as human acceptance. The note's early pi
`none` draft is expressly corrected by its own limits and the later record.
The [implementation PR](https://github.com/awebai/oats/pull/1673) was open at
`78858899d` when read. No release, installed-home coverage or runtime test
result was independently established by this harvest.
