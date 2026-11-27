---
type: Decision
title: In the unified product apps are secondary and tasks are an optional capability
description: Pepe decided on 2026-11-27 that apps are not part of the core model of the unified product, and that tasks are an optional tasks capability, not a core concept.
about: [workstream/oats-direction]
tags: [direction, aweb, unification, apps, tasks, capabilities]
timestamp: 2026-11-27
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when Pepe or both sides change what is core, this record is updated or superseded.

# Decision

On 2026-11-27 Pepe told the release lane directly, for the product that OATS and aweb become ([OATS and aweb unify under aweb](/nodes/oats-maintainer/decisions/oats-and-aweb-unify-under-aweb.md)):

- **Apps are secondary.** An app is a separate service that a team may install. The core is whole with none installed: identities, teams, messaging, the definition in Git and the agents.
- **Tasks are an optional tasks capability.** A team that wants tasks adds the capability. Tasks are not a core concept, and no team gets them by default.

**Acceptance: human-accepted.** Pepe stated both in his own words to the release lane.

# How it applies

- A design for the joint product that needs an app installed for a core act is returned.
- A design that gives every team tasks, claims or locks is returned.
- Whatever stores tasks sits behind the capability.

# Open

- When this was recorded, Juan's side was specifying a Tasks service with its own commands. Whether that service is the store behind the capability had not been put to Juan.
- Credentials. The sandboxes design (OATS `docs/design/2026-11-19-sandboxes.md`) holds an agreed broker contract with no provider behind it. Whether the Secrets app becomes one provider of it is proposed, not decided.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-27; notes/unified-product-direction.md.
