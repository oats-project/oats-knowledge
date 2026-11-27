---
type: Decision
title: In the unified product a soul is not owned by one team; a team chooses the souls it uses
description: On 2026-11-27 Pepe rejected "a soul belongs strictly to one team" for the unified product. A soul lives in a repository or a package and several teams can use it, which team model 4 and the sandboxes design had already agreed.
about: [workstream/oats-direction]
tags: [direction, aweb, unification, teams, souls]
timestamp: 2026-11-27
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when the file that defines an organization is agreed by both sides, this record is updated or superseded.

# Decision

The release lane's proposal for the unified product said that a soul belongs to the one team whose repository holds it. On 2026-11-27 Pepe answered that he is "not convinced by souls belonging only strictly to one team". The release lane dropped the rule.

On 2026-11-26 the wording Pepe and Juan's side agreed was that each team defines its own souls and capabilities. Both hold when that is read as: a team chooses the souls it uses, and what each is given there. It is not ownership.

**Acceptance:** the rejection is human-accepted (Pepe, directly to the release lane). The reading of the 2026-11-26 wording is the release lane's, and was not confirmed when this was recorded.

# Why

The designs both sides had already agreed say the same:

- Team model 4 (OATS `docs/design/2026-11-23-team-model-4.md`): each team names the souls that may join it, the same soul can be named by several teams, and a soul's own entry holds only its default team.
- The sandboxes design (OATS `docs/design/2026-11-19-sandboxes.md`): team, sandbox, placement, identity and authority are five independent decisions, each declared and checked alone. A team is membership and messaging.

# How it applies

- Where a soul's text lives and which teams may use it are two facts. A design that derives one from the other is returned.
- A model of the joint product starts from the designs both sides agreed in OATS `docs/design/`: team model 4, sandboxes and the human IDs contract. The release lane's first drafts did not read them, and were wrong on souls, on sandboxing and on human identity.

# Open

- Whether a team's entry also says which capabilities each soul gets there, so the same soul can differ between two teams. Joan's side asked for it and the release lane proposed it. It changes the workspace file, so both sides decide it.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-27; notes/unified-product-direction.md.
