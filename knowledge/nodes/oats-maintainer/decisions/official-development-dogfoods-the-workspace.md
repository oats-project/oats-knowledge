---
type: Decision
title: Official OATS development runs on the architecture it offers adopters
description: The framework and its official package repositories develop as one multi-repository OATS workspace, so the project exercises its own workspace, curriculum and discovery architecture at real scale under one cross-package stewardship gate; a repository may be a member and a package publisher without the two roles collapsing.
about: [workstream/oats-direction]
id: dec-8a564ed28c70
tags: [workspace, packages, development, stewardship, dogfooding, supersession]
timestamp: 2026-10-29
---
# Decision

Accepted by the founder 2026-07-26, re-shaped 2026-09-20 and 2026-09-23. The
OATS framework repository and every official package repository are members
of one **multi-repository OATS workspace**, and official development happens
inside it — the topology offered to any adopting team with several
repositories. Expertise is not centralised in the kernel repository, and
cross-package architecture has **one stewardship gate** (`oats-expert`) so the
packages do not drift into isolated directions. Who holds which role is the
[roster decision](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md).

# How the shape changed

- **2026-07-26:** the team boundary was a non-Git directory whose
  configuration was adopted from a development package's profile, with one
  durable maintainer soul per package repository.
- **2026-09-20:** the boundary became a **Git-shared workspace definition**
  hosted in the framework repository
  ([a workspace definition is not a package](/nodes/oats-maintainer/decisions/workspace-definition-is-not-a-package.md)).
  Membership is discovery, not activation.
- **2026-09-23:** [workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)
  dropped pinned member revisions: a member is discovered at its **latest
  state**, the reciprocal membership handshake is the whole trust decision for
  member content, and a team that wants frozen capabilities publishes them as
  a **package**, the only versioned thing. Every official package repository
  also carries a member soul that is the expert in that package.

# Member and publisher never collapse

Stated by the human at the start of the v2 implementation: **a repository may
be a member AND a package publisher, and the two roles do not collapse.**
The 2026-09-23 consumption formulation, narrowed below, was: every official
package repository is a member of the OATS workspace (its
souls are discoverable at latest state) *and* its published package is
consumed by the framework's own souls as a package — versioned, pinned in the
workspace, locked by commit and integrity. What a repository exports as
member content and what it publishes as a package are different tiers even in
one repository; membership never turns a package into a latest-state member
capability. So the framework consumes its own packages exactly as an adopter
does, while the package repositories' expert souls are reached through
membership like any adopter's own souls.

**Explicit exception, 2026-10-29:** the source reports the release lane's
human chose to stop pinning and composing `oats.cloning` in this workspace
while retaining its catalog entry and member repository. This narrows the
blanket consumption statement above for that package, not the membership,
publisher separation or dogfooding intent. The
[cloning consumption decision](/nodes/oats-maintainer/decisions/dev-workspace-does-not-compose-cloning.md)
is canonical for the scope, acceptance evidence and human approval needed
to reverse it.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-29; notes/dev-workspace-does-not-compose-cloning.md. Human acceptance
is source-reported, not independently audited by this harvest.

# What survives from 2026-07-26

- **Dogfooding intent**: the official workspace exercises packages, curricula,
  cross-repository discovery, messaging and the Desktop at real scale before
  those are claimed for others.
- **One stewardship gate** across packages; package experts own their
  package's facts, not the cross-package architecture.
- The workspace definition is **deployment policy, not product source**: no
  machine paths, accounts, credentials, private team identifiers or store
  locators. Operator-local inputs stay with the operator.
- Distribution and local assignment are separate: a package repository may
  ship capabilities for users without those capabilities being active for its
  own maintainers.

# Rejected alternatives

- Committing the workspace root into one child repository: one checkout would
  become the team boundary and leak machine and account state into portable
  material.
- Live inheritance of package configuration into the workspace: a package
  update would rewrite deployment policy at a distance
  ([a package update never retargets a deployment](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)).
- Filesystem migration as a side effect of package acquisition, or as a task
  for an in-flight development agent: it is an operator action with a
  rollback plan.
- Pinning member souls at reviewed revisions (2026-09-20, dropped
  2026-09-23): a member frozen at a revision is a package by another name and
  duplicates the lock's job.

# Current contracts

- [workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md)
- [packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/official-multi-repo-workspace-and-package-experts`, `workspace-model-v2` decisions 11, 19 and 20).
2. [Simplified workspace model](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-23-simplified-workspace-model.md) (design record, superseded by the current reference pages).
