---
type: Decision
title: A workspace definition, a source library and a capability package are different responsibilities
description: Shared team composition lives in a Git-backed workspace definition; behaviour lives in capabilities; a distribution package transports them; a local deployment realises them — different responsibilities that may share a repository, joined only by reciprocal membership; consuming is never joining.
about: [workstream/oats-direction]
id: dec-5530c921ff42
tags: [workspace, packages, composition, membership, supersession]
timestamp: 2026-09-24
---
# Decision

Decided 2026-09-20 with the human (oats-expert as maintainer), after an
initial recommendation to reuse the development-capability repository as the
workspace home was set aside. The human chose to host the OATS development
**workspace definition in the framework repository**, next to that
repository's own sources, and to keep the development package focused on
reusable behaviour.

Its 2026-09-20 *mechanics* — members imported by reviewed immutable revision,
per-repository export lists — were superseded on 2026-09-23 by
[workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md):
members are discovered at latest state, everything a member carries is
discoverable unless it marks itself private, and packages are the only
versioned source. The separation of responsibilities below is what this
concept exists for, and it stands.

# The four responsibilities

- A **workspace definition** describes shared organisational composition:
  admitted repositories, defaults, package versions, knowledge-store and team
  references.
- A **capability** supplies behaviour — instructions, skills, declared
  operations and hooks.
- A **distribution package** transports capabilities (and package souls). It
  is neither workspace membership nor an active team.
- A **local deployment** is one operator's realisation of the declarations:
  local mappings, state and credentials. Several deployments may share one
  workspace without sharing live sessions.

The workspace is a **logical role, not a repository requirement**: the
workspace file and a member's membership file may coexist in one repository.

# Rules that follow

- **Membership is reciprocal.** The workspace admits a repository and the
  member names the workspace in its own membership file. Neither alone is
  membership, so a fork or a nearby directory cannot join by inheritance or
  proximity; eligibility is decided on qualified Git identities, not folder
  names ([kernel view](/nodes/oats-kernel-expert/decisions/configured-team-boundary.md)).
- **Consuming is not joining.** Consuming a package, reading a public soul or
  reading a knowledge store never makes its repository a member or selects its
  publisher's workspace. This matters most because the generic framework and
  its own development workspace share a repository: framework consumers are
  not enrolled in the project's workspace.
- **Member and publisher do not collapse.** A repository may be a member and
  a package publisher at once; what it exports as member content is
  latest-state, what it publishes as a package is versioned.
- The workspace file is **deployment policy, not product source**: no machine
  paths, accounts, credentials, private team identifiers or store locators. A
  successful parse is not deployment qualification, and choosing a workspace
  home never approves a live cutover.
- Deprecating any package is a distinct reviewed change, never an automatic
  consequence of adding a workspace file.

# Rationale and rejected alternatives

Both the selected shape and the runner-up were valid; co-hosting preserved the
development package's distinct purpose without adding a repository.

- **Repurpose the development package as the workspace** — mixes a
  package role with shared team composition.
- **A dedicated workspace repository** — rejected for now: no independent
  access-control or lifecycle need was established. Moving the workspace
  later is an identity and adoption transition, not a directory rename, so it
  needs a reason.
- **A config-template package as the composition mechanism** — it did not
  exercise Git workspaces, which is what the project must dogfood
  ([dogfooding decision](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md));
  under v2 the per-deployment configuration file is gone altogether.
- **Imports by reviewed revision** (the 2026-09-20 mechanic) — a member
  frozen at a revision is a package by another name; the reviewed,
  integrity-checked discipline now sits exactly where the trust boundary is
  crossed, at packages from outside the team's repositories.

# Current contracts

- [workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/git-workspace-versus-development-package`, 2026-09-20; `decisions/workspace-model-v2` decisions 2, 3, 11, 19).
