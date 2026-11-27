---
type: Decision
title: The unified product is primitives plus framework; aweb's organization is OATS's workspace, and the framework's files name the primitives directly
description: Pepe decided on 2026-11-27 the shape of the product that OATS and aweb become. One product, aweb, in two layers, primitives (ids, messaging, teams, organizations) and a framework defined in Git. "Organization" replaces "fleet" and "workspace". Each team defines its own souls and capabilities. Two hosted options, with self-hosting of both first-class.
about: [workstream/oats-direction]
tags: [direction, roadmap, aweb, unification, organization, hosting]
timestamp: 2026-11-27
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when the unified concept model is agreed by Pepe, Juan and Joan, or a decision below is reversed, this record is updated or superseded.

# Decision

On 2026-11-27 Pepe told the release lane directly what the unified product is. It refines [OATS and aweb unify under aweb](oats-and-aweb-unify-under-aweb.md).

- **Two layers, one product, named aweb.** The primitives (today's aweb) do ids, messaging, teams and organizations, well and securely. The framework (today's OATS) uses them, and defines everything in Git and on a Git forge.
- **Organization, not fleet, not workspace.** The aweb organization is unioned with the OATS workspace, and the word is "organization" everywhere. The workspace file becomes, roughly, an organization file.
- **One organization has one definition. Its subdivisions are teams. Each team defines its own souls and capabilities.** Juan's side agreed to this on 2026-11-26.
- **The framework's files name the primitives directly:** the organization, team names and public ids. The framework no longer offers a contract for a generic messaging capability.
- **Free, open, and self-hostable.** Two hosted options exist: the id and messaging server, and the servers where agents run. Self-hosting both is clearly supported, the second above all. The usual developer self-hosts where the agents run and rents ids and messaging.
- **A person can always see what they self-host and what they rent.**

**Acceptance: human-accepted.** Pepe stated it in his own words to the release lane.

# How it applies

- Write "organization". Don't write "fleet", and don't use "workspace" for the organization's definition in new text.
- Judge a design for the joint product by three questions. Is each concept one word for one thing across both layers? Does a name in a file resolve to a public name in the primitives? Does it say what is self-hosted and what is rented?
- A provider contract that exists only to keep messaging generic is not a thing to extend.
- The design of teams, ids, sandboxing and secrets in the app follows the agreed concept model, not the other way round.

# Open

- Teams give access, and must stay independent of where an agent runs (Juan, 2026-11-26).
- Where the definition lives when one team's repository is private. Keeping each team's part in that team's own repository removes the problem, and changes how the framework reads its configuration.
- The concept model itself is a proposal, not agreed: whether "agent" replaces "instance", whether "role" stays beside "soul", how the identity tree relates to who started an agent, and the command names.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-27; notes/unified-product-direction.md.
