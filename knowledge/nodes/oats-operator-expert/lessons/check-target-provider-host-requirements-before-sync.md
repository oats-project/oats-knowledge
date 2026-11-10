---
type: Lesson
title: Check the target provider's host requirements before sync
description: Green checks against the current lock do not establish readiness for a moving provider; compare the target version's host requirements and satisfy them before writing the new lock.
about: [workstream/operations]
kind: lesson
id: ins-acae848b5dd6
tags: [lesson, operator, provider, upgrades, host-requirements, sequencing]
timestamp: 2026-10-13
---

# Rule

When a sync plan moves a provider package, compare the host's installed tools
with the requirements of **the version the plan will lock**, not merely the
provider locked now. Read the target provider's manifest `requires` entries
and the version floors its hooks enforce. Satisfy those requirements through
the authorized host-upgrade procedure before applying the sync.

A green plan, doctor or readiness result for the current composition is not
proof that the host can run the target composition. This extends
[the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md):
for an upgrade, inspect the next reader's requirements before installing it.

# Why the order matters

In the source's 2026-10-13 report of an upgrade across three kernel releases,
the sync plan named a messaging-provider version change but did not flag its
higher client-tool floor. Doctor and new-spawn readiness passed before sync:
the installed tool satisfied the old provider, not the target provider.
Reading the target provider exposed the gap while the lock was still
unchanged. The source reports that installing the tool first and syncing
second left new-spawn readiness passing on the new provider.

The source inspected the target spawn hook's fatal below-floor path; it did
not trigger that refusal locally. The sibling-host account is second-hand:
sync happened first there, and subsequent new-spawn readiness failed until
the tool was upgraded. Thus the lesson is not that the mismatch can *only*
be detected at spawn. It is that successful checks before the change did not
certify the provider about to be locked, leaving later readiness or a spawn
to expose the missing prerequisite.

Skipping releases makes the mistaken inference easier. In this incident the
target release's Upgrade section and the task brief omitted the tool-upgrade
step, while an intermediate release's Upgrade section contained it. The
source acknowledges that the upgrading guide already required reading every
intermediate Upgrade section and that it initially missed that review.
Checking the target provider is a direct cross-check, not a replacement for
reading the skipped upgrade instructions.

# Elimination route

This manual comparison is knowledge debt. The proposed fix is a plan-time
comparison of the to-be-locked provider's machine-readable tool requirements
with the host, before the lock changes. The source found that the relevant
minimum version was expressed only in prose in `requires`; structured
version constraints and a host comparison would remove that manual gap.
This is a proposed route, not an accepted kernel design or a delivered gate.
Supersede the manual rule when an equivalent target-version check exists.

Provider lifecycle acceptance and how to choose a tested version floor remain
in the integrations node's
[real-binary rehearsal lesson](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md);
this concept owns the operator's upgrade-order judgment.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-deploy-053, 2026-10-13; notes/check-provider-host-floors-before-sync.md.
The incident and source inspection are source-reported; this harvest did not
repeat the upgrade, execute the below-floor hook or independently reproduce
the sibling-host result.
