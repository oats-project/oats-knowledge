---
type: Lesson
title: When a home's captured setting blocks the refresh meant to reach it, read live only the fields the refresh changes, and pin the authority fields to the capture
description: A home captures its provider settings at spawn, so a later setup refresh (a newly mapped team, a new policy) never reaches an existing home's command, and a refusal whose fix is "rerun the refresh" is untrue there; read the live setting for the refreshed fields only, require every authority field (root, human, service, profile path and digest) to equal the captured one, and refuse with "respawn this home" otherwise.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-7804ce2fd75a
tags: [lesson, settings, captured-settings, refresh, authority]
timestamp: 2026-11-14
---

# What was observed

The kernel exports a home's captured settings (`instance.json`) to its provider commands
as `OATS_SETTINGS` (here kernel 0.69.19). oats.aweb's opt-in attribution setting lists the
teams a deployment admits into, and its endorsement policy. A home spawned with teams
[backend] still refused `join --labels ops` (`unlisted`) after `setup --endorse-root` had added
ops. The refusal's pinned fix said to run that same refresh. The same held for a refreshed policy.

# Rule

- Read live (here through `oats inspect --soul`, the read the legacy join already used for its
  root) only the fields the refresh is meant to change: here `teams` and
  `endorsement.policy`.
- Every field that carries authority must equal the captured one: the root id, the human,
  the service, the profile path and its digest. Otherwise refuse before any provider call,
  naming the field, with "respawn this home". The commands that remove what this one
  creates (retire, leave) use the captured authority, so the authority that admits and
  the one that removes can't diverge.
- If the live setting can't be read, refuse with its repair, not "respawn": a respawn
  would read the same setting.
- An operation already under way keeps the values it recorded.
- The other commands (retire, leave, start, readiness) keep the captured setting.

For a readiness check, the same question (which source does the consumer read?) is answered
in [readiness reads the setting source its consumer uses](/nodes/integrations-expert/lessons/readiness-reads-what-the-consumer-reads.md).

Rejected: keep the captured setting and change the fix to "refresh, then respawn". It is
honest, but an existing home could then never join a newly mapped team.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-human-ids-endorsed-root, 2026-11-14; notes/join-reads-live-teams-and-policy-behind-an-authority-guard.md.

Verified by maintainer review on 2026-11-14: the trap, the live read through
`oats inspect --soul`, the `setting-diverged` and `setting-unreadable` refusals, the kept
pending policy and the commands that keep the capture are in commit `f5b013a0` (round 11,
the lead's decision) and deviation 2 of [awebai/oats-aweb PR 271](https://github.com/awebai/oats-aweb/pull/271),
open and unmerged. The rejected alternative is source-reported.
