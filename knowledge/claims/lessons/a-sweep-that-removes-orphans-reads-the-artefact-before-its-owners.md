---
type: Lesson
title: A sweep that removes orphaned artefacts reads the artefacts first and their owners after
description: When owners create an artefact only after they exist and have recorded their claim, a reconcile that removes artefacts no live owner claims must snapshot the artefacts first, then list the owners, then read their records, and only that snapshot is ever a removal candidate; in any other order, an owner created in between makes a live artefact look orphaned.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-03aa6e28ed47
tags: [lesson, concurrency, reconcile, ordering, destructive-act]
timestamp: 2026-11-14
---

# What was observed

oats.aweb's reconcile removes the root's certificate copies that no live home's record
names. Nothing serialises commands on one home or root.
- It first read the records, then made slow member-list calls, then read the copies. A
  join that committed in between wrote a copy the records snapshot never held, and the
  sweep revoked a live membership.
- After that fix it still listed the homes before reading the copies. A home spawned in
  between had its copy in the snapshot but no entry in the home list.
- The builder's own sweep for the race class missed the second: its argument covered the
  records, not the listing of owners.

Both were reproduced deterministically by running a join or a spawn inside reconcile's
slow call.

# Rule

- **The invariant:** an owner creates the artefact only after it exists and has written
  its claim. Any artefact in an earlier snapshot therefore has an owner in a later
  listing and a record in a later read.
- **The order:** artefacts, then the owner listing, then the owners' records, then the
  slow calls, then the act, on that snapshot only. An owner listing that can't be read
  refuses the sweep.
- State the invariant once in the code's docs and check every destructive path against
  it, not against examples.
- Test an interleaving at each point: before the snapshot, inside each slow read, after
  the last read.

Where nothing serialises the commands, the ordering is the cheap correct guard; a lock
would also work, but adds a failure mode to every command.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-human-ids-endorsed-root, 2026-11-14; notes/a-destructive-sweep-reads-the-artefact-before-its-owners.md.

Verified by maintainer review on 2026-11-14: both races, their red-first reproductions
(a join inside the first list read and after the last; a spawn inside the root's `aw who`)
and the two reorderings are in commits `813691eb` (round 12) and `c9aca10f` (round 13) of
[awebai/oats-aweb PR 271](https://github.com/awebai/oats-aweb/pull/271), open and
unmerged; the invariant is stated in its body and in commit `bc80e12e`. That the builder's
own race sweep missed the second is source-reported.
