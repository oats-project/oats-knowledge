---
type: Lesson
title: spawn --base <branch> starts from the clone's local branch, which may be far behind
description: oats spawn --repo <clone> --base main names a ref in the clone, so the worktree starts at the clone's local main even when origin is far ahead, unlike a same-repository spawn without --base or worktree add --base; read the preview's from main@<oid> against the remote, omit --base for the soul's own repository, or pass --base origin/<branch>.
about: [system/oats-kernel]
kind: lesson
id: ins-7cea7ef15e71
tags: [kernel, spawn, worktree, git, coordination, process]
timestamp: 2026-11-10
---
# The trap

`oats spawn <soul> --repo <clone> --base main` resolves `main` **in the
clone**: the branch starts at the clone's local `main`, which can be a
human's checkout or a shared reference far behind `origin/main`. The source
reports a 2026-11-10 spawn of a kernel developer whose preview printed
`from main@<oid>` for a commit at the v0.39.4 release while `origin/main`
was at the current head. The developer would have built on an ancient base.

This is documented behaviour, not a defect: `docs/souls-and-instances.md`
(spawn, worktree mode) says `--base <ref>` names another start point in the
clone. The trap is the asymmetry around it:

- **Without `--base`**, a same-repository spawn starts at the commit of the
  soul's repository the spawn observed on the remote, fetched by id into the
  clone; the clone's checked-out state does not matter.
- **`oats worktree add --base <branch>`** takes a remote branch and always
  starts at origin's.
- **`spawn --base main`** alone takes the clone's local ref, so the one
  spelling that looks like "start from main" is the one that can be stale.

# What to do

- Read the spawn preview's `from <ref>@<oid>` against the remote
  (`git ls-remote origin <branch>`) before applying.
- For the soul's own repository, omit `--base`: the observed remote commit is
  the right start.
- When a `--base` is needed, pass a remote-tracking ref,
  `--base origin/<branch>`, not the bare branch name.

The preview makes the stale commit visible before apply, but only to a
reader who knows to compare it.

The operator node's
[a shared checkout's local main leaks into every worktree spawned from it](/nodes/oats-operator-expert/lessons/a-shared-checkouts-local-main-leaks-into-every-spawned-worktree.md)
records the same staleness from the shared checkout's side. Its rule says a
worktree starts from the clone's `HEAD` unless the spawn names another base;
the documentation read for this lesson no longer says that for a
same-repository spawn, and naming the base as the bare branch is the trap
this lesson describes.

# Elimination route

The engineering template's coordinate-developers recipe spells the spawn as
`--base <its default branch>`, which invites this; the source reports
sending that correction to the recipe's owner. Until the recipe changes, this
lesson is the guard for a lead reading a preview. No kernel behaviour change
is proposed here; whether a preview should flag a local ref behind its
upstream is a separate contract question, not decided by this lesson.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-member-name, 2026-11-10; notes/spawn-base-main-is-local-ref.md.

The stale-base observation is source-reported from one spawn preview on one
deployment. The harvest read `docs/souls-and-instances.md` at
`21682c2142dd` in `oats-project/oats`: the worktree-mode section states that
without `--base` the branch starts at the commit the spawn observed, never
falling back to the clone's branch, and that `--base <ref>` names another
start point in the clone; the `worktree add` section states that its
`--base` is the remote branch the work starts from. This harvest ran no
spawn and did not inspect the recipe or its correction.
