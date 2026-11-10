---
type: Decision
title: A workspace has a default team; there is no personal team
description: Decided 2026-09-26 by the human: neither the messaging service nor OATS has a "personal team" concept; a workspace's instances live in the workspace's default team and join other teams explicitly; the default team comes from the root identity the deployment holds, creating a team is an owner's account-level act outside OATS, and nothing in spawn, mint, retire or wake ever requires a human login.
about: [workstream/provider-integration, workstream/messaging]
id: dec-2ee5be2e6860
tags: [decision, integrations, messaging, teams, identity, naming]
timestamp: 2026-09-26
---

Decided 2026-09-26 by the human, as a total blocker: "there is no personal
concept in aweb and oats does not need one. Workspaces have their default
teams of course, and agents can join other teams of course, but no personal
team." The earlier framing ("a person's agents live in their personal team
by default") carried an owner narrative that does not exist in the messaging
service's model and breaks for any workspace an organisation owns.

# Decision

- **The workspace's default team** is the team every instance of a workspace
  lives in unless it joins another. It is the team of the root identity the
  deployment holds (a configured team, else the root's active team). A
  soul's team labels make wider teams eligible; joining and leaving stay
  explicit.
- **No "personal" anywhere**: not in prose, narrative, settings, wire names
  or endpoints. In the provider: the teams document field is `defaultTeam`,
  the refusal to leave it is `E_TEAM_DEFAULT`, the broker receive label is
  `default`, and `roots.personal` is gone (oats.aweb 1.16.0). The messaging
  service renames its own `personal-workspace` endpoints, auth scope, CLI
  wording and binding file.
- **Where a workspace's team comes from** (the messaging service's
  engineering lead and the framework co-lead, from first principles,
  2026-09-26): in the service's model the primitive is key control; a team
  is created by its namespace's controller, and on the hosted service a
  human session directs the custodian. So creating a team for a workspace is
  an account-level act done once by whoever owns the team, outside OATS, and
  produces a root identity bounded to that one team. OATS only consumes the
  root: it mints and revokes instances, checks spawn authority live, records
  what it minted, and never holds account credentials. The service's human
  login stays as optional tooling with an explicit expected account; OATS
  never requires it.

# Supersedes

- [Enrolling a workspace's team through a human login on the host](/nodes/integrations-expert/decisions/workspace-team-enrollment-by-human-login-superseded.md)
  (the human session in the provider's path, and the owner narrative).
- The "personal" wording of
  [teams in the messaging provider](/nodes/integrations-expert/decisions/teams-in-the-messaging-provider-default-team-explicit-join.md),
  renamed in place.
