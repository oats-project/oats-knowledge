---
type: Lesson
title: A shared checkout's local main leaks into every worktree spawned from it, and strands whatever reaches no remote
description: Worktree instances branch from the clone's checked-out state, not the shared remote's main; unpushed commits there ride every developer's PR and never reach another machine. Branch from the remote main, deliver shared-tree changes by pull request, and keep the checkout's main equal to the remote.
about: [workstream/operations]
kind: lesson
id: ins-624ef17b92e4
tags: [lesson, operator, git, worktree, checkout-mode, harvest, pr-scope, placement]
timestamp: 2026-09-24
---

Learned 2026-09-24 twice, from both sides of one condition: a maintainer
reviewing a developer's mirror PR that carried dozens of files of another
agent's committed soul, and the maintainer of a second deployment finding six
harvested lessons "already on main" that no other machine could see.

# What happened

A checkout-mode instance whose soul lived in the repository ran a harvester
that committed promotions onto the shared checkout's local main. Main pushes
belonged to another role, so the commits stayed local. Nothing failed:
validation passed, the log listed the promotions, the instance reported
"harvested". Meanwhile every worktree instance spawned from that clone
branched from its local main and carried those commits into its PR; one
earlier PR escaped only because its developer happened to rebase onto the
remote main first.

# Rules

- **A worktree instance branches from the remote main** (fetch first), never
  from the clone's local state, and says so in its handoff. The kernel starts
  a worktree from the clone's `HEAD` unless the spawn names another base, so
  the spawner puts the base in every helper's task.
- **A reviewer lists the merge range's paths before reading any diff** and
  treats soul paths as out of scope; a branch that does not contain the current
  remote main and shows many non-merge commits is the tell (see
  [review the whole PR merge range for scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md)).
- **Nothing commits onto a shared tree's main that its committer cannot
  push.** When an instance does not own pushes to the canonical branch, its
  deliveries are a branch plus a pull request. oats.okf now delivers harvests
  to external bases by pull request, which removes the forming case; the rule
  still holds for anything else committed in a shared checkout.
- **Check the local branch against the remote in both directions.** Behind
  means stale ([anything read through a shared checkout is only as current as that tree](/nodes/oats-operator-expert/lessons/shared-checkout-serves-a-stale-soul.md));
  ahead means stranded and leaking.
- Moving the checkout's main back onto the remote main is destructive Git on a
  shared tree and belongs to the human, after whatever sits only there has
  been delivered.

# Why it is worse than a failure

Stranded work produces no error, so no one looks for it; "not on main" reads
as "never written", and it gets rebuilt elsewhere. A local main carrying extra
commits can no longer fast-forward, so each sync becomes a merge on a tree
nobody meant to fork. And the lessons about how the deployment itself is
operated — the ones the operator most needs elsewhere — are exactly the ones
that stay behind.

# Citations

- [souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)
  (`worktree` and `checkout` work modes) and
  [knowledge.md](https://github.com/awebai/oats/blob/main/docs/knowledge.md)
  (harvest delivery by pull request).
- Both incidents from the maintainers' notes, 2026-09-24; the stranded lessons
  were delivered through an inbox pull request the same day.
