---
type: Lesson
title: A service's member listing finds removal candidates; only a locally held signed copy authorises the removal
description: A reconcile that removes leaked memberships must never take a certificate id or alias from an unsigned listing as authority; it acts only through the locally held signed copy (looked up by an id of the provider's own form, using the copy's own team and alias), a certificate a live home's record names is that home's whatever the listing says, and a row with no copy is listed, never removed.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-b7b3c7740de9
tags: [lesson, security, reconcile, untrusted-input, aweb]
timestamp: 2026-11-14
---

# What was observed

oats.aweb's admission reconcile read the team's members (`aw id team members`) and removed
those no live home held. The member list is registry metadata nobody signed. A review
reproduced two attacks on it:
- a row whose certificate id held a path segment (`../admissions/<live id>`) made
  reconcile read a live home's real certificate, write a removal record outside its
  directory, and have the root remove that live membership;
- a row giving a live home's real id under another alias got that membership removed.

# Rule

- The listing finds candidates; a locally held, signed artefact (here the root's copy of
  each certificate it admitted) authorises the act. Look the copy up only by an id
  matching the provider's id form, and act with the copy's own team and alias, never the
  row's.
- A certificate a live or kept home's record names (committed, or awaiting its outcome)
  belongs to that home, whatever the listing says.
- A row with no local copy is reported, never removed by guess.

This holds for any OATS path that turns a service listing into a destructive act
(remove, delete, revoke). aweb's own knowledge applies the same rule server-side
(renewal copies fields only from the verified old certificate, never from unsigned
registry rows: [unauthenticated input must not drive remote work](https://github.com/awebai/aweb/blob/6610ce8d290a6451a262ec4509b978cb77938eb6/knowledge/aweb-protocol-expert/lessons/unauthenticated-input-must-not-drive-remote-work.md)
in aweb's knowledge, at `6610ce8d`).

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-human-ids-endorsed-root, 2026-11-14; notes/registry-member-rows-are-unsigned-act-only-through-the-roots-copy.md.

Verified by maintainer review on 2026-11-14: both attacks and the fix (copies only, by
aw-form ids, with the copy's team and alias; a live or kept home's committed, pending or
unknown record shields its certificate; a row with no copy listed, never removed) are
in the round-9 commit `4900e18a` of [awebai/oats-aweb PR 271](https://github.com/awebai/oats-aweb/pull/271),
open and unmerged. The aweb rule was read at the cited commit.
