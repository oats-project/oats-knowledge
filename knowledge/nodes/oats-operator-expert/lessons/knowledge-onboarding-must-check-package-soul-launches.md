---
type: Lesson
title: Knowledge onboarding must check package-soul launches
description: A Claude-only trial launched its working souls successfully but refused harvesters until an explicit host launch preference was selected, so onboarding must check the knowledge-operation souls before the first checkpoint.
about: [workstream/operations, workstream/knowledge]
kind: lesson
id: ins-d2f53c2db1c1
tags: [operator, onboarding, knowledge, launch, verification]
timestamp: 2026-11-03
---
# Working agents do not prove the harvest can start

In a 2026-11-02 scratch deployment on OATS 0.69.8 with oats.okf 5.7.0,
the working souls had their own launch preferences and started on Claude.
The source reports that the knowledge package's harvester and maintainer
souls declared no launch preference. A host launch configuration marked
`default: true` did not produce the expected harvester launch: all three
workers' harvester previews selected pi, unavailable on that host.

Selecting the intended Claude launch configuration through a host-wide
`souls.launch` preference changed the harvester preview to Claude; later
control runs reportedly spawned their harvesters on Claude. The failed
previews had left proposals pending and workers asking for input. Successful
worker launch had therefore hidden a later onboarding dependency.

# Operator consequence

Before relying on the first knowledge checkpoint, check the resolved launch
for the package souls that will perform knowledge operations, not only the
working souls. On the affected version pair, use an explicit host preference
for the intended configuration rather than assuming its default flag reaches
those souls. A wildcard changes the host-wide selection: do not use it as an
incidental fix when only selected souls are meant to change.

The [host-wide launch preference lesson](/nodes/oats-setup-admin/lessons/a-host-wide-pi-model-is-one-launch-set-write.md)
already owns placement, supported writes and member/package spawn-preview
checks. This lesson adds why knowledge onboarding must do that check before
the first checkpoint; it is not a second launch-configuration recipe.
A preview establishes selection, not successful execution or publication.

# Limits and elimination route

The capture establishes one reported host/version pair and a working remedy,
not which kernel rule selected pi or whether the default should have applied.
It contains no maintainer launch result and does not prove that all hosts or
later versions require an override. It does not change the separate
[unmatched-pin refusal decision](/nodes/oats-kernel-expert/decisions/unmatched-launch-pins-refuse-fallthrough.md).

The elimination route is onboarding preflight coverage of ancillary package
souls on hosts with only the intended harness, plus launch-selection regression
tests for souls with and without their own preference. The kernel owner must
settle any default-selection defect; a permanent manual override is not the
fix. Current commands belong in setup skills and launch documentation.

# Evidence

Evidence: OKF proposal from oats-operator-expert/coord-brain-knowledge-trials-expert, 2026-11-02; notes/okf-package-souls-need-a-host-launch-preference.md.

Source-reported smoke and subsequent control runs; this harvest did not
inspect the trial deployment or rerun its launches.
