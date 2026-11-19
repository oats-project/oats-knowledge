---
type: Decision
title: Every finished instance retires itself, children first, and its parent sweeps for what is still listed
description: In the coordination templates, a finished instance (reviewer, developer, helper, probe, lead) retires itself in its own turn after its last message; its parent checks the status at the child's last message, before any step that needs it gone, and at every checkpoint wake, and retires what is finished or stalled. A reviewer is one report, then gone. A self-retire discards nothing.
about: [workstream/coordination]
kind: decision
id: dec-e16916c07d41
tags: [retirement, lifecycle, templates, reviewers, developers]
timestamp: 2026-11-16
---

# The decision

Asked to make very sure reviewers and developers are retired, with the choice
between self-retire and retire by the parent left to the effort's lead, the
lead chose both layers: a finished instance retires itself
(`oats retire <name> --self`), children first, after its last message; its
parent sweeps `oats status` on the child's last message, before any step that
needs the child gone, and at every checkpoint wake. Only maintainers and
dispatchers stand.

# Why

The finish is a step of the instance's own flow, in its own turn. "The parent
retires on the done line" needs the parent to wake, read and remember, with
nothing behind it; reviewers and developers were being left running.

# What followed

- A reviewer is one reviewer, one report, then gone: a minor fix's delta is
  read by the review bot or a fresh reviewer briefed with the delta alone.
- Never retire yourself over a running child: a retire stops the children and
  keeps their homes, which is how instances are left behind.
- With no messaging layer an instance prints its last message and stays, and
  whoever started it retires it.
- A self-retire's detached completion does not receive the discard-worktree
  choice, so `--self --discard-worktree` keeps the work tree silently
  (oats-project/oats#1941, open, found by reading the code path and not run);
  the texts say "a self-retire discards nothing".

Rejected: parent-retire only (one layer); self-retire for reviewers only (two
rules for one act). The request and the delegation of the choice are
**source-reported (relay at
[oats-engineering-coordination#21](https://github.com/oats-project/oats-engineering-coordination/pull/21#issuecomment-6921103683))**:
the release lane's review reports that the person who decides asked on
2026-11-16 for a decision between self-retirement and retirement by the
parent, and that the lead chose self-retirement with a parent's sweep.

This extends to every finished instance the accepted OATS policy that a finished lead with no OATS parent retires itself
([coordination policy](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md),
"Human-spawned leads and standing maintainers"), and keeps its boundary: an
instance retires only itself and its own children. It supersedes nothing: the
parent's retirement of its finished children stays, as the sweep, and the same
review checked that a parent retires only its own children, standing
maintainers and dispatchers stay excluded, and a parentless lead's done line
still goes out before it retires.

Evidence: OKF proposal from oats-engineering-expert/coordination-build-lead, 2026-11-19; notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/every-finished-instance-retires-itself-and-its-parent-sweeps.md.

Checked at maintainer review, 2026-11-19: #21 merged at `50f1aba7`
(template-v4.0.0) with self-retirement and the parent's sweep in its
description, and oats-project/oats#1941 is open with the deferred-completion
reading above.
