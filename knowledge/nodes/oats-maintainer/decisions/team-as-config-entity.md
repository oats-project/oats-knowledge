---
type: Decision
title: Team as a first-class config entity
description: On the classic configuration path a team block at a config scope declared the deployment boundary, drove instance identity and cross-repo discovery, and fixed the contract that the instance name is the messaging alias; the workspace model supersedes the block, and the alias contract survives.
about: [workstream/oats-direction, workstream/messaging]
id: dec-000acd98ff38
tags: [decision, config, team, aweb, discovery, messaging, supersession]
timestamp: 2026-09-24
---
> **Superseded by the workspace model.** Under
> [workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)
> the deployment boundary is the deployment directory and teams are labels
> declared in the workspace file; there is no `team:` block in a config
> scope. What survives from this decision is the contract that an
> instance's name is its discoverable messaging alias, and the guided
> onboarding shape. The rest is the history of the classic path.

Decided with the founder in July 2026, motivated by deployments where a
workspace directory holds agents both at the workspace level and inside
member repositories: agents needed to know their team from configuration,
not from whichever messaging directory happened to be found, and the
operator needed cross-repository discovery.

# Shape (classic path)

A `team:` block (`name:` required, optional provider `id:`) in the
closest config scope declared the deployment boundary: every repository
under that scope resolved the same team. This formalised the boundary the
messaging hook had previously guessed at by bounded directory search.

# What hung off it

1. **Identity.** Config resolution exposed the team; instances recorded it
   and received a briefing line naming the team and the roster command;
   hooks received the team name, id and scope as environment.
2. **Discovery.** The scope's own agents root plus each direct child's
   agents root formed the roster; an explicit member list was considered
   and closed as unnecessary because the scope's directory tree is the
   member list by construction.
3. **Messaging.** The spawn hook preferred config id, then config name,
   then the root's active team; a bare name resolved against the root's
   memberships with a unique match winning. The hook kept its invariants:
   an explicit team at invite, verification of the joined certificate,
   never inheriting the ambient active team. **The instance name is the
   discoverable alias**, documented as contract.

# Cross-machine discovery

The local roster is this machine's filesystem; the cross-machine view rides
the messaging layer, because every spawned instance joins the team with
alias equal to its instance name, so the team's certificate roster doubles
as the directory of live instances. Liveness across machines is eventually
consistent: retire deletes the workspace, a crashed machine's records
linger until the service marks them stale.

# Onboarding and degradation

The guided, idempotent onboarding command checks in order: the team is
declared, the messaging CLI is present, a messaging workspace exists at the
root, and a membership matches the configured team, offering only the
service's real primitives (hosted signup with a username, a team API-key
init, or an invite token) and printing exactly one next step at each stage.
When the CLI is missing, spawn degrades with a warning rather than
blocking. A kernel self-update command checks the registry for the matching
kernel and adapter and directs the operator to the doctor afterwards, so
migration knowledge ships in the kernel rather than in a skill that can go
stale.

# Cross-repository spawn

Spawn and retire fall back to a scope-wide lookup when a name is not found
at the local root; a unique match wins, several matches ask for an explicit
directory, and a local soul shadows the lookup. Homing stays with the
soul's repository: where a spawn is issued from changes nothing about the
instance.

# Rejected

- Per-repository team declarations overriding the workspace: allowed by
  closest-wins, but the normal pattern is one declaration at the workspace.
- An explicit member list: closed as not needed; revisit only for members
  outside the scope directory or nested deeper than one level.
