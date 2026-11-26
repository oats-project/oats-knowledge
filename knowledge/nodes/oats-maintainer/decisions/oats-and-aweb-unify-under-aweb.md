---
type: Decision
title: OATS and aweb unify under aweb; Juan's side joins the CLIs, and Pepe's side supports it fully
description: Pepe, Juan and Joan agreed on 2026-11-25 to unify OATS and aweb under aweb. Juan's side does the work of joining the CLIs. Pepe's side answers its questions promptly and doesn't block it. The shape, names, repositories, packages and migration are Juan's side's to propose, and the contracts are still decided by both sides.
about: [workstream/oats-direction]
id: dec-16c70b173006
tags: [direction, roadmap, aweb, cli, unification]
timestamp: 2026-11-25
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when Juan's side publishes the plan or design, or the unification changes how releases are cut, this record is updated or superseded.

# Decision

On 2026-11-25 Pepe told the release lane directly that he, Juan and Joan had agreed to unify OATS and aweb under aweb. Juan's side takes on the work of joining the two CLIs. Pepe's side fully supports Juan: a question from Juan's side about the unification gets a prompt, full answer, and nothing on Pepe's side becomes a gate to wait at.

**Acceptance: human-accepted, source-reported.** Pepe stated it directly to the release lane on 2026-11-25 ("I have agreed with Juan and Joan to unify oats and aweb under aweb. Juan will take on this work in terms of joining the CLIs. We should fully support Juan if he has questions"). The record is the session, which a reviewer cannot read: the quoted words are the source's report, not a verified record. No agreement recorded by Juan's or Joan's side is cited.

# How it applies

- **Who proposes what.** Juan's side proposes the shape of the joined CLI, its names, the repositories and packages, and the migration for existing deployments. Pepe's side doesn't design it.
- **Contracts stay bilateral.** A contract change the unification needs is still decided by both sides before it is built. Pepe's side answers quickly, in support. For the unification, the release lane holds Pepe's side's half: the CLI join, its names, repositories and migration. Other contracts stay with the lanes that hold them now. Where one of those turns out to be part of the unification, the two maintainers settle which of them answers, so there is one text.
- **Releases.** Releases and tags of OATS and the official packages stay with the release lane until the unification changes how they are cut. Then the release lane asks Pepe. **Refined 2026-11-26:** OATS is frozen and no release is cut, the bb integration work excepted: see [OATS is frozen](oats-is-frozen-and-the-work-moves-to-a-fresh-workspace-on-awebs.md).
- **Every Pepe-side lane** answers Juan's side's questions about its own area promptly.

# What it does not change yet

- **The move to the oats-project org.** This decision names no destination. [OATS moves to its own GitHub org and npm scope](oats-moves-to-its-own-org-in-stages.md) (`dec-adccf4392c7e`) stands until a plan changes it. A plan that changes where the repositories or packages live, or which of them move, supersedes that human-accepted decision and needs the human's acceptance cited.
- **The two-sided contract rule** in [one release lane and project lanes](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md) (`dec-1d2a5106b721`) still holds for the unification, as above.

# Open

Nothing is designed yet. No plan exists, nor a lead, nor where the plan will live, nor the joined CLI's name. Juan's side was asked who leads it and where the plan will live.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-25; notes/oats-and-aweb-unify-under-aweb.md.
Maintainer review of oats-knowledge#480 (2026-11-25) recorded the acceptance as source-reported (no GitHub record of it was found, the lane map included), linked the org-move decision this one does not yet change and the two-sided contract rule, and stamped the id.
