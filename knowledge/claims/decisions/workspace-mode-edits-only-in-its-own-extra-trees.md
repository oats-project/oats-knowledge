---
type: Decision
title: Workspace mode keeps member clones read-only and does its repository work in extra trees of its own
description: The workspace briefing grants extra trees (`oats worktree add --repo <member>`, `--repo` always), so "read-all/edit-none" means edit none of the shared member clones; whether an instance changes code at all is its role's and task's call, not the mode's.
about: [system/oats-kernel]
kind: decision
id: dec-bfc86391e5ec
tags: [kernel, work-modes, workspace, extra-trees, instructions]
timestamp: 2026-11-13
---

# The decision

Taken on the request of the person who owns OATS (2026-11-13: workspace mode "should teach to make worktrees"; the request is source-reported, made in the lead's session), shipped in [oats-project/oats#1929](https://github.com/oats-project/oats/pull/1929), merged 2026-11-13 as `4b7bb29b` under the repository owner's account (verified at that link; that proves the record, not who typed it).

- **Member clones stay read-only through `./work`:** no edits, commits, branch switches, resets, pulls, stashes, or `git worktree` run by hand. Others use those clones.
- **Work that needs a member's branch goes in an extra tree of the instance's own**, made with `oats worktree add --purpose <p> --branch <b> --base <remote-branch> --repo <member>`, which moves none of the clone's refs.
- **`--repo` is always named in this mode:** a workspace home records the deployment directory as its repository, which is not a Git tree, so `add` without it is refused (`E_CLONE_MISSING`).
- **The mode says where work happens, not what work:** whether a workspace instance changes code is its role's and its task's call, as for every mode.

# Why

The workspace block forbade worktrees and said "you do not change code", while the instance-boundary block composed just before it says repository work happens "there, or in the extra trees your mode block grants". Two composed blocks gave one instance opposite answers, the failure [kernel-composed text is executable surface](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md) warns of. The kernel never enforced the ban: `oats worktree add` already worked from a workspace home with `--repo`.

"You do not change code" was task authority written into a mode, which [separate operational home from granted work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md) rules out ("work modes grant different repository discipline, not additional task authority"). This refines that decision's "read-all/edit-none workspace mode" (2026-07-17): edit none of the shared clones; edit in your own trees.

# Rejected

- **Trees for reading only.** Reading is already free through `./work`; the request was to work in them.
- **One byte-identical "Extra trees" section with the worktree and checkout modes.** Their default `--repo` (the instance's own repository) is wrong for a workspace home; the workspace section shares their rules and adds `--repo` to the command.

# Open

The `directory` briefing has the same gap: it grants no extra trees, while directory-mode souls can be taught to make them by their own capabilities.

Closed 2026-11-13 by [Directory mode does its repository work in extra trees of its own](/claims/decisions/directory-mode-does-repository-work-in-its-own-extra-trees.md) (`dec-16ac0c13fb00`), which gives the directory briefing this decision's "Extra trees" section byte for byte; this decision is unchanged.

Evidence: OKF proposal from oats-engineering-expert/workspace-mode-worktrees-lead, 2026-11-13; notes/workspace-mode-trees-are-where-not-what.md.
