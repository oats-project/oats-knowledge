---
type: Decision
title: Directory mode does its repository work in extra trees of its own, with the workspace briefing's --repo-always section
description: The directory briefing grants extra trees with the workspace briefing's "Extra trees" section byte for byte (`--repo` always), because a directory home's recorded repo is configuration context, not a Git tree; `./work` stays an owned directory that never becomes a repository.
about: [system/oats-kernel]
kind: decision
id: dec-16ac0c13fb00
tags: [kernel, work-modes, directory, extra-trees, instructions]
timestamp: 2026-11-13
---

# The decision

Shipped in [oats-project/oats#1933](https://github.com/oats-project/oats/pull/1933), merged 2026-11-13 as `f4b78f9a` under the repository owner's account, after the product, setup and release lanes' approvals at the reviewed head `9a199c86` were posted on that PR under the same account (verified at that link; that proves the record, not who typed it). It closes the "Open" of [Workspace mode keeps member clones read-only and does its repository work in extra trees of its own](/claims/decisions/workspace-mode-edits-only-in-its-own-extra-trees.md), and follows the same request of the person who owns OATS (2026-11-13: work modes "should teach to make worktrees"), relayed to this effort's lead as a finding of the workspace effort (source-reported).

- **`./work` stays an instance-owned directory** that never becomes a repository, and the recorded `repo` still grants no editing.
- **Repository work that needs a branch goes in an extra tree of the instance's own**, `oats worktree add --purpose <p> --branch <b> --base <remote-branch> --repo <repo>`; a directory instance's TASK.md says "Work in ./work; do repository work only in your extra trees."
- **`--repo` is always named:** a directory home's `repo` is the deployment directory by default, or another context directory named at spawn (`resolveExecutionContext`). Without `--repo`, `add` resolves that path and is refused when it is not a clone (`E_CLONE_MISSING`).
- **One section for the two modes whose `./work` is not a Git tree:** the directory block's "Extra trees" section is the workspace block's, byte for byte, and a test pins their equality.

# Why

The instance-boundary block composed into every instance says repository work happens in `./work` "or in the extra trees your mode block grants"; the directory block granted none. Yet `oats worktree add` worked from a directory home with `--repo`, and the workspace's directory-mode expert souls are taught by their own capabilities and skills to make trees for building, verifying and probing. Two composed texts gave one instance opposite answers, the failure [kernel-composed text is executable surface](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md) warns of.

[Separate operational home from granted work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md) still holds: the directory worker's configured context "supplies policy without becoming a writable target". The trees are the instance's own, never the context directory, and what work it takes on stays its role's and its task's call.

# Rejected

- **Change the expert souls to `work: workspace`.** It changes what their `./work` is, in every soul file, to fix a briefing.
- **Keep directory mode tree-less and strip the tree text from the experts' capability and skills.** It contradicts what the kernel does and the direction taken for workspace mode.
- **A directory-specific section.** The reason for `--repo` is the workspace one; two texts drift.

Evidence: OKF proposal from oats-engineering-expert/directory-mode-trees-lead, 2026-11-13; notes/directory-mode-trees-share-the-workspace-section.md.
