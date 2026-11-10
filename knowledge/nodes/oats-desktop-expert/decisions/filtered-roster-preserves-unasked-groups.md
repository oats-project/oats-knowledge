---
type: Decision
title: A filtered roster answer must not erase groups it did not ask about
description: Narrow roster replacement to the requested workspace scope while retaining unasked groups as old observations, so filtering cannot forget machines or erase the route back to another workspace.
about: [system/oats-desktop]
id: dec-6e556afd20b5
tags: [desktop, roster, workspaces, observation, identity]
timestamp: 2026-10-14
---
# Decision and rationale

The source records the Desktop choice, with bilateral agreement reported on
2026-10-14: when the kernel's declared `roster-workspace-key` feature allows
one remote-roster read to be narrowed to the open windows' usable workspace
keys, the answer replaces only the corresponding scope. Carry the requested
keys with the outcome; an omitted group is not necessarily a removed group.

Replacing the entire held roster with a filtered answer would mistake
**not asked** for **gone**. Machines in other workspaces would be forgotten,
including their persisted identity memory, and remote-only workspaces could
vanish from the switcher needed to reopen them. The accepted cost is retaining
old observations outside the queried scope, never presenting them as freshly
confirmed by this read.

- Replace groups inside the requested set, unknown-key groups and
  saved-route-only groups as before; absence within this replacement scope
  still means removal.
- Keep groups whose last-known key is outside the requested set, including
  their identity memory and original observation. The filtered read does not
  refresh them.
- An unfiltered answer replaces the whole set.

# When narrowing would lose the view

Read unfiltered before a window set or roster answer is available, while a
window shows the switcher, when a keyless view holds another machine's
deployment, or when no usable key exists. Include member-derived usable keys:
skipping them was rejected because the kernel records a registration's
host-reported key regardless of its origin, and excluding such keys could
lose an unattached view's machines.

Have the window owner report the window set explicitly rather than infer it
from renderer reads. Which view happens to poll is a fragile proxy for which
workspaces are open. This does not weaken the
[loopback trust boundary](loopback-trust-boundary-and-transport-simplicity.md)
or let remote rows authorize local file access. The separate
[qualified-identity rule](../lessons/identity-and-relationship-legibility.md)
still governs ambiguity; query scope is not identity.

# Limit and enforcement

The proposal reports a remaining limit: a registration whose key no longer
matches can stay stale under filtered reads. This is not evidence of current
liveness or permission to invent a client-side contract repair. The kernel
and Desktop owners must settle the invalidation contract together; this
record makes no claim that the issue has been resolved.

Protect the merge with composition tests for in-scope removal, out-of-scope
retention without freshness advancement, identity-memory persistence and the
unfiltered fallbacks. The window set and result scope should travel as
explicit data rather than being reconstructed later. These are enforcement
routes, not an assertion that every case already has coverage.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-lfx-desktop-queue, 2026-10-14; notes/a-filtered-roster-read-replaces-only-what-it-asked-about.md.

The proposal cites [awebai/oats#1124](https://github.com/awebai/oats/issues/1124),
comments 6169153192 and 6169160731, and implementation PRs
[#1148](https://github.com/awebai/oats/pull/1148) and
[#1167](https://github.com/awebai/oats/pull/1167). The startup/no-usable-key
fallbacks and key-mismatch limit ([#1207](https://github.com/awebai/oats/issues/1207))
come from the proposal beyond the named note. Acceptance, implementation and
that limit are source-reported; this harvest did not audit the code or
establish independent human acceptance. Release scheduling is not preserved
as ongoing state.
