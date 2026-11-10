---
type: Lesson
title: A team per workspace needs a service primitive
description: The messaging service has no idempotent create-or-return for a team, so a zero-step team per workspace cannot be improvised by the provider; the provider exposes setup as a guided step and never invents local shims, and the fix proposed here (a human CLI login in the provider's path) is superseded by team creation as the owner's account-level act outside OATS.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-f0081105d3e8
tags: [lesson, aweb, messaging, teams, defaults, integrations]
timestamp: 2026-09-27
---

Learned 2026-09-24 by the integrations expert, checking with the messaging
service's coordinator against reviewed source after the framework's human
asked for a team per workspace with no steps (then framed as "personal"; the framing was withdrawn on 2026-09-26).

- The hosted "create team" command is a fresh signup: a new key, a new
  account, a team named `default:<username>`, a refusal for an existing
  username; an existing hosted identity cannot create a second hosted team.
- The local path requires a local registry and a running service; it does
  not route through the hosted service, and two machines bootstrapping their
  own local stacks do not converge on one team, whatever the names say.
- No endpoint returns an existing team on a repeated create; every path
  refuses.

A follow-up source check narrowed the missing primitive: the messaging CLI
has no reusable human credential. The hosted side has browser sessions and
an OAuth 2.1 server for connectors, but no CLI login, device-code flow or
other command-line human session. A hosted user's namespace held exactly one team
named `default`, while organisation namespaces already hold several; the
registry's uniqueness key `(domain, name)` would support idempotency, and
the server's fixed-name default-team helper is already idempotent on
`(owner, slug)`, so the first server change is to generalise a
caller-supplied slug. Spawn invites carry `max_uses` and expiry in the
model, but the CLI hardcodes single use and minting needs team-key
authority; the session-authorised route that adds an existing identity
exists only in the dashboard path.

**Superseded 2026-09-26:** the conclusion below, that the missing primitive is a
human CLI login in the provider's path, was withdrawn. See
[a workspace has a default team; there is no personal team](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md):
the service's primitive is key control, creating a team is an account-level act
by its owner outside OATS, and the provider only consumes the resulting root
identity; nothing in spawn, mint, retire or wake requires a human login. The
facts above (no idempotent create, every path refuses a repeat) still hold.

The shape proposed to the service (not a landed contract): a prerequisite
human CLI login, then session-authorised verbs that mint a short-expiry
single-use spawn invite and redeem it in place, one for the workspace's
team keyed on the workspace and one for an entitled human joining
a named team without a token. Refusals return structured data (entitled or
not, and why) so readiness can print the exact remedy. The provider's
per-spawn path, a single-use invite minted with the root's authority, does
not change.

Interim consequence for a provider that is the workspace default: an
unmapped team label is answered with a readiness problem, and setup remains
one guided step over existing primitives (hosted signup with a username, a
team API-key init, or an invite token), never an improvised local team. The
general form: a zero-step default on top of an external service exists only
where the service has an idempotent create-or-return call scoped to a
logged-in person; otherwise the default must make the missing step visible.
See [guidance names only verbs the target CLI exposes](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md).
