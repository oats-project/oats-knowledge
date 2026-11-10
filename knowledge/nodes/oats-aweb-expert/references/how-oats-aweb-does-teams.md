---
type: Reference
title: How oats.aweb does teams (1.16.1)
description: The package facts introduced in the first workspace-model-only release (1.14.0) and current in 1.16.1: eligible teams arrive through the environment only (the check stdin stays strict), every instance is minted into the workspace's default team, wider teams are joined by an explicit spawn setting or the teams/join/leave verbs and home operations, each joined team is a further local identity beside the primary that sends with an identity-home selector and receives live through the host wake broker where the runtime supports it (else by polling), joined-team state lives in a provider-owned file mirrored through hook meta, a failed leave keeps the credential, an unmapped primary label falls back to the default team with a warning, and readiness warns on each joined team's receive mode and on the host wake daemon.
about: [system/oats-aweb]
id: ref-f0e889131359
tags: [oats.aweb, teams, readiness, provider-state, wake, identity]
timestamp: 2026-09-25
---

Introduced in release 1.14.0, the first floored at kernel 0.26.0 (the classic
team-scope path is gone; an older kernel's environment is refused with one
fixed message in spawn, setup and the readiness check), and verified against
the 1.16.1 mirror; later changes are labelled with their release. The design it
implements is
[teams in the messaging provider](/nodes/integrations-expert/decisions/teams-in-the-messaging-provider-default-team-explicit-join.md);
the custody attachment of resident grants is unchanged from
[the 1.13.1 attachment reference](/nodes/oats-aweb-expert/references/how-a-grant-home-is-attached-to-custody.md).

# Schema

1. **Teams reach the provider through the environment only**: `OATS_TEAMS`
   (the eligible teams, one entry per soul label with its mapped team id and
   payload), `OATS_TEAMS_SOURCE` (`live` or `recorded`) and
   `OATS_TEAM_LABELS`, in every hook, command and readiness check. The
   binding-check stdin decoder stays strict; the only new setting it accepts
   is `join`.
2. **Every instance is minted into the workspace's default team**: `settings.oats.aweb.team`
   when the host or workspace sets it, else the root's active team (the
   teams document's `defaultTeam`; called "personal" in the 1.14–1.15 wire
   names). A soul's labels, the primary included, never choose the mint
   target: a mapped primary label is eligible like every other label. An
   unmapped primary label is not a refusal: spawn warns `team-unmapped` and
   readiness stays ready with the same warning.
3. **Wider teams are explicit**: the spawn setting `join` (comma-separated
   eligible labels, checked before anything is minted), and the commands
   `oats aweb teams`, `oats aweb join --labels …`, `oats aweb leave
   --labels …`, also declared as home operations keyed `teams`, `join`,
   `leave` (the kernel addresses them as `messaging:teams|join|leave`; kind
   action; one required arg `labels`). `eligible` lists every mapped label
   with its joined flag; the default team is separate and never in `eligible`. A
   label outside the eligible set is `E_TEAM_NOT_ELIGIBLE`; leaving the
   default team is `E_TEAM_DEFAULT` (`E_TEAM_PERSONAL` in 1.14–1.15). Global (resident-grant) mode refuses
   `join`.
4. **One local identity per joined team**, minted like the primary (the
   root's invite for that team, then `aw id team accept-invite --local` under
   `--identity-home <home>/.aweb-identity-<label>`). Sending as that team is
   the client's identity-home selector. Receiving was polling-only in 1.14;
   from 1.15 the provider registers the home's joined identities with the
   host wake broker (`aw wake register --registration-json -`): an
   external-session home hands the broker every identity, a native channel or
   pi home keeps its primary and the broker attaches only the joined ones.
   Each joined entry records `receive: "native"` when the broker accepted the
   registration and `"poll"` otherwise, with a warning naming why.
5. **Provider-owned state**: the joined-team list lives in
   `<home>/.oats-aweb/teams.json` (owner-only permissions); the commands
   write it, the launch and retire hooks read it beside the kernel-fed meta,
   and every hook output mirrors it in `meta`; the kernel's record is a
   copy, never the source.
6. **Lifecycle**: the launch hook leaves a joined team that is no longer
   eligible only when `OATS_TEAMS_SOURCE=live`, and warns `teams-unverified`
   otherwise; retire leaves every joined team, a retained seat's retire
   included; a leave whose remote
   self-delete fails keeps the identity home and the state entry and reports
   the failure, so the deletion can be retried.
7. **Readiness** answers only `status`, `problems` and `warnings` (the
   teams view is the `teams` operation; a `teams` block in the check answer,
   shipped in 1.14.0, made the kernel relay every answer as unknown). It
   warns `team-unmapped` for an unmapped primary label, and per joined team
   `joined-team-receive` (live through the broker) or `joined-team-poll-only`
   (with the reason). When delivery is `session` it reads the host wake
   daemon's status against the single client floor `AW_MIN` (aw 1.36.13 in
   1.16.1; a separate `WAKE_STREAM_MIN` before): `wake-daemon-outdated` and
   `wake-daemon-not-running` are problems, `wake-daemon-version-unknown` a
   warning.
