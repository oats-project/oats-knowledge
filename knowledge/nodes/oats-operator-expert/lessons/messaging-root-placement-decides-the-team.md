---
type: Lesson
title: "The messaging root is a deployment-bounded host fact: where it sits decides which team residents mint into, and a root above the deployment is a silent cross-team leak"
description: A rebuilt deployment mints no messaging identities until its root sits where the provider hook searches, and that placement — not any configuration text — decides the team a resident joins. Keep exactly one root per deployment inside the boundary, pin the team explicitly, and verify each new certificate before trusting the roster.
about: [workstream/operations, workstream/messaging]
kind: lesson
id: ins-4b93d9edff70
tags: [lesson, operator, messaging, identity, rebuild, team-boundary, placement, custody, verification]
timestamp: 2026-09-23
---

First formed 2026-07-09 by the maintainer (bounded search, verify the team
after every join); extended into its present form 2026-09-23 by the OSS
coordinator during a two-team rebuild (placement decides the team).

# Rule

The messaging/identity root of a deployment is a **host fact bounded by the
deployment directory**. It lives in exactly one of two places, and the choice
is a team decision, not a convenience:

- **At the deployment directory**, when every messaging soul spawned there
  belongs to one team.
- **Ignored-by-git inside a member clone**, when that member's souls must mint
  into a *different* team than the deployment's default. The signing key is
  never committed; the clone's ignore rules carry the root, not the repository.

Anything above the deployment — the operator's user home, a parent folder
shared by several deployments — is **a different team by definition**. The
provider search stops at the workspace boundary on purpose; an operator who
"fixes" a failed mint by initialising or copying a root above the boundary has
not fixed anything, they have pointed the deployment at somebody else's team.

Three companion disciplines make the placement honest:

1. **One root per deployment.** Two deployments on one machine each get their
   own root inside their own boundary. A personal messaging identity the
   operator keeps for themselves stays outside every deployment and is never
   the root a deployment mints from.
2. **Pin the team explicitly in configuration**, even when the root's active
   team already matches. The pin is the declared intent; the root is the
   mechanism. When they disagree, the operator wants a refusal, not a silent
   choice.
3. **Verify each newly minted resident's certificate names the intended team**
   before trusting the roster it appears in. A roster entry proves a mint
   happened; only the certificate proves *where*.

Carry existing memberships forward by **copying the old root** into its new
place. Re-initialising creates a fresh identity with no memberships and orphans
the seats the old root held.

# Why

The maintainer's 2026-07-09 finding: the minting-authority search walked from
the instance home all the way to the machine-level identity directory, and a
resident minted there appeared healthy, messaged normally, and was a member of
the wrong team. Nothing refused it, because from the provider's point of view
a valid root had been found. The judgement was that the search must be bounded
at the workspace and the team verified after every join — the boundary is what
makes "the team" a property of the deployment rather than of whoever happens
to run the spawn.

The OSS coordinator's 2026-09-23 extension: under the workspace model the
removed configuration chain no longer supplies a team scope, so after a
rebuild the old team root is **not among the places the hook looks**; every
first spawn fails to mint until the operator places the root inside the
boundary. The rebuild made the second half of the lesson visible:
**placement decides the team, configuration text does not**. The per-team
block the operator declares in the workspace file is delivered by the kernel
but is only honoured by a provider release that reads it — see
[the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md).
Until then, the only per-team lever an operator actually holds is where the
root sits, which is why this is operator knowledge and not a configuration
recipe.

# What goes wrong

- **Silent cross-team leak.** A root above the boundary is found by nothing
  today, but an operator who relaxes that (or links a root in) mints
  residents into a team that never agreed to host them. Discovery comes from
  the wrong team's roster, not from any error.
- **Per-clone placement that reaches nobody.** Per-team minting through a
  member clone only reaches souls whose **work mode actually uses that
  clone**. A soul with no member clone as context — directory or workspace
  modes — always falls to the deployment root and mints into the default team,
  however carefully the clone's root was placed. Operators who need a
  coordination soul in the second team must accept that it lands in the first,
  or give it a work mode that binds it to the clone.
- **Re-initialising instead of copying.** The new root is a stranger to every
  team the old one belonged to; retained seats become unrecoverable from the
  new deployment.
- **Trusting the roster instead of the certificate.** A resident that minted
  into the wrong team is fully functional; only the certificate's team tells
  the operator to retire and re-mint it.

# Consequences

- Treat the root like the other custody directories in this node: a fact
  about one host and one deployment, placed at the scope that owns it
  ([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md),
  [resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)).
- Root placement is a **pre-spawn step of the rebuild**, sequenced before the
  first messaging soul is spawned and after the fresh provider state is laid
  down ([cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md)).
- The outsider verifying a rebuild checks certificates against the intended
  team, not roster presence ([second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md)).
- The clean-v2 stance that made the old team scope disappear is recorded in
  [workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md).

# Routed

- The hook's exact search order, the environment and payload keys it reads,
  and which provider release honours the per-team block → the messaging
  package expert.
- The discipline that a hook's locator search is bounded and never taken from
  the ambient environment → the integrations node.

# Citations

- Legacy lesson `lessons/aweb-workspace-lifecycle.md` in the oats-expert
  bundle ("Team boundedness", added 2026-07-09 by the maintainer; the bounded
  search and the cross-team-leak finding).
- [`docs/rebuild-to-v2.md` at v0.25.9](https://github.com/awebai/oats/blob/v0.25.9/docs/rebuild-to-v2.md) (removed from the current tree by the 0.26.0 legacy sweep; the current homes are `docs/packages.md` "Declaring packages" and `docs/configuration.md`) (§1 two teams in one workspace; §8b where the team
  root lives now and per-repo placement; the two-team rebuild, 2026-09-23, on
  oats.aweb 1.11.2/1.12.0 under kernel 0.25.x).
