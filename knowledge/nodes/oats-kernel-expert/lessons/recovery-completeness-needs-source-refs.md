---
type: Lesson
title: Recovery completeness must be measured against the source, not Git's advertised refs
description: A successful Git transport copy can omit hidden branches, so recovery must derive its required refs from the source and verify the destination against that independent set.
about: [system/oats-kernel]
kind: lesson
id: ins-8cc208096387
tags: [kernel, retire, recovery, git, verification]
timestamp: 2026-10-08
---
# Lesson

Git's transport view is not an inventory of everything the source repository
holds. If a recovery copier derives its expected branches from the clone's
remote-tracking refs, the transport and the check share the same blind spot:
a hidden branch is absent from both, and a successful copy can still lose
work.

The source reports an adversarial recovery probe on 2026-10-08: a repository
with `uploadpack.hideRefs=refs/heads/hidden` produced a recovery copy missing
the hidden branch, its reflog and its unique commits, while retirement still
reported success. This is evidence about the transport-based recovery path,
not a claim that every form of local Git clone respects that setting.

# What changes future judgment

For local-branch preservation, enumerate the source repository's own
`refs/heads`, transfer the required objects, then compare the destination's
branch names and object IDs against that independently measured source set.
The source reports repairing this case by fetching tips by object ID over
protocol v2 and requiring the final branch listing to match the source byte
for byte. Do not generalize that repair into a promise that an arbitrary
remote server will permit fetching any unadvertised object ID.

A matching branch list is one proof obligation, not proof of the entire
recovery: index state, reflog-named objects and other promised work still
need their own preservation checks. The durable lesson for backups,
migrations and exports is to derive the required set from the authoritative
source, not from the transport projection being tested.

# Eliminate the failure in code and tests

Keep source-side enumeration and destination verification in the recovery
producer. Guard the boundary with a hidden local branch whose tip and reflog
name otherwise unreferenced commits; require those promised objects and refs
to survive, and require preservation failure to block destructive retirement.
The proposal identifies [awebai/oats#817](https://github.com/awebai/oats/pull/817)
as the implementation fix. This lesson preserves the reason for that design
and the rejected clone-derived proof, not a substitute for regression tests.

# Related

- [Recovery preserves Git state across ref formats, not just paths](/nodes/oats-kernel-expert/decisions/recovery-preserves-git-state-across-ref-formats.md) addresses the different path/status blind spot; its fixed operation-ref set does not replace source enumeration of local branches.
- [Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md) owns the general measure-before-destroying and fail-closed recovery rule; this lesson records the specific transport visibility trap.
- [Recovery copies preserve work, not repository-local Git behavior](/nodes/oats-kernel-expert/decisions/recovery-copies-do-not-inherit-local-git-config.md) separates branch and object preservation from restoring local operating configuration.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08; notes/decision-657-no-local-config.md.

The probe and repair are source-reported from the review of
[awebai/oats#817](https://github.com/awebai/oats/pull/817). The harvest did not
repeat the probe or independently audit the implementation or its test suite.

Verified by the knowledge maintainer at review of the harvest: awebai/oats#817,
merged 2026-10-08, reads nested-repository branches from the source's own
`refs/heads` instead of the clone's remote-tracking refs, fetches tips by id
over protocol v2, and requires the copy's branch listing to match the source.
Its description records the reviewer's `uploadpack.hideRefs` probe losing a
branch, its reflog and its unique commits while retirement succeeded, and a
hidden-branch regression test that fails at the PR's first commit.
