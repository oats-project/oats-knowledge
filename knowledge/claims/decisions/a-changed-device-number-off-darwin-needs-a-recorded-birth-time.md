---
type: Decision
title: Off darwin, a directory identity whose device number changed is the same directory only when its inode and a recorded non-zero birth time both match
description: A directory-mode home's start guard compares the spawn baseline's {dev, ino, birthtimeNs}. On Linux, a btrfs subvolume or a remounted overlay gets a new st_dev at each mount, so dev alone refuses every home after a reboot. The rule accepts a changed dev only when ino and a recorded birth time other than "0" both match. A record with none keeps {dev, ino} strict, and its refusal names the reboot and the remedy (respawn) rather than "exchanged". darwin keeps its weaker inode-alone rule for records without a birth time.
about: [system/oats-kernel]
id: dec-e4912484a0c0
kind: decision
tags: [decision, kernel, directory-mode, identity, guard, btrfs, overlayfs, reboot, birth-time]
timestamp: 2026-11-22
---

# Status

Merged on 2026-11-22 in [oats#2086](https://github.com/oats-project/oats/pull/2086)
(merge commit `19eb5c49`), fixing the btrfs half of
[oats#1266](https://github.com/oats-project/oats/issues/1266), after the product lane
maintainer's green light and the release lane's sign-off at `a694f032` [1].

# Decision

`sameDirectory` (`packages/record/lib/directory-identity.mjs`) stays the one rule for
comparing a directory identity across boots:

- an equal `dev` and `ino` is the same directory everywhere;
- on darwin, an equal inode is enough, plus a matching birth time where one was recorded (#1261);
- elsewhere, a changed `dev` needs an equal inode **and** a recorded birth time other than
  `"0"` that matches. A record with no birth time, or `"0"`, needs `dev` to match.

# Why stricter than darwin

- btrfs numbers every subvolume's inodes from the same start, so an equal inode on another
  `dev` says little on its own.
- Linux has no call that sets a birth time: `cp -a`, `rsync` and `btrfs receive` all give a
  new one. So inode plus a nanosecond birth time is a strong witness there. Where statx is
  missing, libuv reports ctime, which moves with any change, so that case fails closed.

# What it gives up

Any filesystem at the path that shows the recorded inode and birth time passes: a snapshot
or block copy of the volume (the home at an earlier state), or a mount the home's own user
makes there, such as FUSE. That user can already rewrite the baseline, so the guard is
robustness, not access control (`docs/trust-model.md`, "What OATS does not promise").

# Evidence

- One host with `/home` on btrfs: the baselines record `dev` 56, 55 and 52 across three
  boots, with inode and birth time unchanged in each.
- In a container of our own: remounting one overlay changed `dev` from 114 to 115, with the
  upper directories' inode and birth time unchanged. A plain `docker restart` kept `dev`.

# Open

As of 2026-11-22: the captured-Pi root witness records a closed `{dev, ino}` with no birth
time, so on Linux it stays strict after a reboot. Adding a birth time to it is a format
change for the contract deciders ([oats#2088](https://github.com/oats-project/oats/issues/2088),
open). Whoever settles #2088 updates this section.

# Related

- [Resume lookup uses the recorded incarnation and exact home](/nodes/oats-kernel-expert/decisions/resume-lookup-uses-recorded-incarnation-and-exact-home.md)
  and the [pi fresh-home decision](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md)
  record why a birth time can be missing or unreliable. This rule is consistent with them: it
  relies on a birth time only as an extra witness beside an equal inode, and where the birth
  time is missing, `"0"` or libuv's ctime fallback it fails closed.

# Citations

1. oats#2086: the PR body (the rule, the btrfs and overlay observations, the existing-homes
   cases), the two review rounds, the green light and the release-lane sign-off on the PR.
2. oats#1266: the reproduction request and the notes on birth time on Linux.
3. oats#2088: the captured-Pi witness follow-up and its three options.
