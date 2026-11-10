---
type: Lesson
title: Replace shared shell tools atomically
description: A trial setup reportedly failed when its shared shell tool was rewritten during execution, so tool publication must preserve the bytes already-running readers use rather than mutate them in place.
about: [workstream/operations]
kind: lesson
id: ins-ec27d7f63a08
tags: [operator, trials, shared-tooling, publication, concurrency]
timestamp: 2026-11-03
---
# A shared tool directory is a live dependency

A 2026-11-02 trial setup reportedly died with a shell syntax error while
the shared kit script it was executing was rewritten in place. The source
attributes the failure to Bash reading more script bytes during execution:
a reader positioned in the old content can encounter a fragment of the new
content after an in-place rewrite. Later edits used atomic replacement and
the source reports no recurrence.

The operator lesson is to treat shared launch wrappers, hook scripts and
trial drivers as live dependencies of every run using them. An otherwise
valid edit can break a concurrent run; the failed run is not by itself
evidence of a defect in the configuration under test.

# Publish new bytes instead of altering a reader's bytes

The tool owner should prepare a complete replacement in the same directory
and rename it over the old path, rather than truncate and rewrite the file
that running readers have open. Existing open readers retain the old inode;
new opens see the replacement. Preserve the required executable mode and
metadata as part of that publication path.

This is not permission for a consumer to edit another owner's tool directory.
The [shared-checkout ownership lesson](/nodes/oats-operator-expert/lessons/shared-checkout-serves-a-stale-soul.md)
already owns who repairs a shared tree. Atomic replacement answers how an
authorized publisher avoids mutating bytes in use, not who may publish.

# Limits and elimination route

One reported failure supports the hazard, not a claim that every in-place
edit must kill every Bash process. Buffering and which bytes remain to be
read affect exposure. Replacing one file also does not give a run a coherent
snapshot of tools it later reopens or other files it loads.

The elimination route is an atomic publication primitive in the tool's
installer/editor, tested with a reader held open across replacement and a
new reader afterward. Where a run needs a consistent multi-file toolset,
immutable versioned tool directories are the stronger design route; that
arrangement was not tested in this incident. The lasting lesson explains
why publication needs that guard, not a permanent manual editing checklist.

# Evidence

Evidence: OKF proposal from oats-operator-expert/coord-brain-knowledge-trials-expert, 2026-11-02; notes/kit-rewritten-in-place-breaks-running-scripts.md.

The failure occurred at 21:16Z according to the source. This harvest read
the captured account only; it did not reproduce the failure or inspect the
script's reader offsets.
