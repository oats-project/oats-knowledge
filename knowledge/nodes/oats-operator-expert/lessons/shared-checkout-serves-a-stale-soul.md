---
type: Lesson
title: Anything read through a shared checkout is only as current as that tree — validity is not currency, and repair belongs to the tree's owner
description: Content an instance reads through a shared checkout is a coherent but possibly weeks-old picture, and nothing in it signals that. Verify the tree's position against the remote before trusting what you read, read canonical content from the remote ref when behind, and leave repair of a shared tree to its owner.
about: [workstream/operations, workstream/knowledge]
kind: lesson
id: ins-9e9998dfce3c
tags: [lesson, operator, placement, orientation, knowledge, shared-checkout, custody, verification, currency]
timestamp: 2026-09-19
---

Judgement formed 2026-09-19 by the maintainer of a second deployment,
orienting in checkout mode on a tree that had fallen more than two hundred
commits behind (one incident; the rule generalises the mechanism, which needs
no repeat to hold).

# Where the exposure is now

At the time, the soul itself was read through the checkout. On main it is
not: the kernel fetches each soul from its member's remote at the confirmed
commit, and the knowledge capability consults bases remotely at their accepted
state. The exposure remains for everything an instance reads **directly from a
shared tree** — a checkout-mode `work/` is the member clone itself — docs,
design records, specifications and in-repository state files a maintainer or
reviewer orients on. The judgement below is unchanged for those.

# Rule

Content read through a shared checkout is exactly as current as that tree. In
a shared tree nobody owns keeping it current unless the operator names
someone, so relying on it is a placement trade-off: assign an owner for the
tree's currency, or accept that instances may orient on a stale picture.
Nothing detects the condition; the operator designs around it.

# Why

A shared checkout moves only when somebody moves it. An instance reading
through it gets a well-formed, internally consistent picture that may be many
commits behind, and what it cannot show is precisely the freshest material —
so the gap is worst exactly when the project is most alive.

**Validity is not currency.** A stale copy parses, passes every validator, and
carries timestamps indistinguishable from files that simply have not needed
changing. Current-state documents are the worst case: an old copy reads as a
confident statement about now.

# What goes wrong

- An instance reasons from an old world and reports it as the present; the
  report is fluent and wrong, and nobody downstream has a signal to doubt it.
- Recently recorded decisions are invisible and get re-derived.
- An instance notices the gap and "fixes" it by pulling — changing a tree that
  belongs to the human and possibly other agents, from a role that owns none
  of it.

# Verification before trust

1. Refresh the remote-tracking view with a read-only fetch — the one operation
   that changes no branch, index or file.
2. Count ahead and behind against the canonical branch.
3. If behind, read what matters (current-state documents first) from the
   remote ref, without touching the tree.
4. State the gap in the orientation report in one line: how far behind, and
   what was read from the remote instead.

Ahead is a finding too: commits that exist only on the shared tree's local
branch are stranded and leak into worktrees
([a shared checkout's local main leaks into every worktree](/nodes/oats-operator-expert/lessons/a-shared-checkouts-local-main-leaks-into-every-spawned-worktree.md)).

# Custody of the repair

A non-owner never pulls, fast-forwards or resets a shared tree; it reports the
gap and lets the owner decide when to move it. This is the custody discipline
of [resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md):
whoever owns the directory decides what changes in it.

# Consequences

- When currency matters and no owner is named, keep canonical material out of
  shared work trees: remote-read souls and knowledge bases already do this
  ([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)).
- A checkout-mode seat's placement names who keeps the tree current, and the
  seat runs the verification above at session start.
- A validator pass is never evidence of currency; ask which tree served the
  content and where that tree is relative to the remote.

# Citations

- [souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)
  (per-commit soul copies; `checkout` work mode) and
  [knowledge.md](https://github.com/awebai/oats/blob/main/docs/knowledge.md)
  (remote consultation at accepted state).
- Migrated from agents/oats-expert/soul/knowledge/lessons/stale-checkout-serves-stale-soul.md @ 7838d3ca.
