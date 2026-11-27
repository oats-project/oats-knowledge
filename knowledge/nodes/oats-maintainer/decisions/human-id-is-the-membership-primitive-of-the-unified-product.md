---
type: Decision
title: In the unified product the human id is the membership primitive; the app starts from the person, and Git forge access decides what they see
description: Pepe decided on 2026-11-27 that the unified product uses human ids natively. Each person has their root, membership hangs on the human id, the app lists organizations by human id, and inside one a person sees the souls and capabilities their Git forge access lets them read.
about: [workstream/oats-direction]
tags: [direction, aweb, unification, human-identity, membership, organization]
timestamp: 2026-11-27
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when Juan's side agrees or changes the default, or the membership rule below is agreed, this record is updated or superseded.

# Decision

On 2026-11-27 Pepe told the release lane directly, for the product that OATS and aweb become ([OATS and aweb unify under aweb](/nodes/oats-maintainer/decisions/oats-and-aweb-unify-under-aweb.md)):

- **Human ids are used natively,** not as an option. Each person has their root.
- **The unified primitive for membership is the human id.**
- **The app, as a dashboard or on the desktop, starts from the person.** It shows the organizations that human id has access to.
- **Inside an organization, a person sees the souls and capabilities that their Git forge access lets them read.**

**Acceptance: human-accepted.** Pepe stated it in his own words to the release lane.

# How it applies

- Two gates, kept apart. The primitives say who is a member. The Git forge says who can read a source. Neither decides the other. A design that lets membership grant read access to a repository, or forge access grant membership, is returned.
- A model of the joint product starts from the person: their human id, their forge access, their machines.
- Scope: the unified product. It does not supersede [human attribution is an optional messaging-capability contract](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md). OATS as it runs today is frozen, and its deployments keep working without human ids.

# Open

- The human IDs contract (OATS `docs/design/2026-11-21-human-ids-contract.md`) has "adoption is opt-in" as a principle, and both sides own that contract. Human ids by default in the new product is for Juan's side to agree.
- One human id across organizations, admitted elsewhere as an outsider, or one identity per organization. The release lane proposed the first, because the app has to start from one person.
- How an agent's membership follows its person. Proposed by the release lane, not agreed: a team admits people, and an agent joins when its person is in the team and its soul is among those the team lists.
- What happens to a person's agents when the person leaves a team.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-27; notes/unified-product-direction.md.
