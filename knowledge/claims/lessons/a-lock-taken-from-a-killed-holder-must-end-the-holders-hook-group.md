---
type: Lesson
title: A lock taken over from a killed holder must first end the process group of the hook that holder started
description: A hook run in its own process group survives a SIGKILL of the kernel that started it, so a directory lock taken over from that dead holder hands the lock out while the hook still acts. The holder records the hook's group and start token in its claim, and the taker ends that group, or refuses when it can't judge the record, before it proceeds.
about: [system/oats-kernel]
kind: lesson
id: ins-6704300319af
tags: [locks, process-group, hooks, sigkill, sandboxes]
timestamp: 2026-11-20
---

# What happened

Building the sandbox provider hook runner (S1, oats-project/oats#2025 [1]), the
kernel ran each hook in its own process group, so that a finished act could kill
whatever the hook left behind. Review then found the reverse case: a SIGKILL of the
kernel can't run any holder cleanup, and the per-sandbox lock's stale-holder takeover
handed the lock to the next caller while the dead holder's hook group was still
acting on the same sandbox. A pinned test's fixture leak check showed it.

The fix, on that PR (open, not yet merged, on 2026-11-20) [2][3]:

- the holder records the hook's process group (its leader's pid and start token) in
  the claim of each lock it holds around the act, and clears it once the group is gone;
- a taker that finds a dead holder ends the recorded group first (SIGTERM, then
  SIGKILL, waited for), but only while the leader's start token matches;
- a group that can't be judged, or that survives, is never signalled blind: the
  sandbox's lock refuses as busy, and a kept request stays held in flight. A later
  review round found that a group recorded with no start token was read as foreign;
  it now refuses too. A foreign or gone group is nothing to end.

# The lesson

Process-group ownership protects the normal path: the holder kills its leftovers. It
doesn't protect a takeover after SIGKILL. Any lock whose holder starts a detached
process group has to record that group in the claim, and its takeover has to end it
first. A record that can't be judged is a refusal, never absence.

Relates to: [a supervisor that restarts a launcher owns its process group](/claims/lessons/a-supervisor-that-restarts-a-launcher-owns-its-process-group.md)
(the same orphaning under SIGKILL, here for a lock's takeover rather than a restart);
[a holderless marker cannot support safe recovery](/nodes/oats-kernel-expert/lessons/holderless-markers-cannot-support-safe-recovery.md)
(a takeover needs holder evidence) and [process identity across readers and hosts](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md)
(unknown permits no automatic takeover or signalling), which this applies to the
holder's children.

# Citations

Evidence: OKF proposal from oats-engineering-expert/sandbox-architecture-lead,
2026-11-20; notes/sandbox-design-constraints-found.md.

1. [oats-project/oats#2025](https://github.com/oats-project/oats/pull/2025), S1:
   sandboxes in the kernel and the CLI.
2. [c274a895](https://github.com/oats-project/oats/commit/c274a89568762baf91c22c43c1fa4f67fe129b38):
   the takeover ends the recorded hook group (`lib/claim.mjs` `endHolderStep`,
   `lib/worktree-hooks.mjs` `terminateRecordedGroup`), with tests that fail without it.
3. [42155e73](https://github.com/oats-project/oats/commit/42155e7325807e8411022f3d99e21112cd6f15e2):
   a group recorded without its leader's start is refused at takeover.
