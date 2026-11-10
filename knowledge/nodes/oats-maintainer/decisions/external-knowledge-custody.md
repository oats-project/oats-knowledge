---
type: Decision
title: External knowledge needs source-independent custody
description: External custody separates source evidence from writer execution and separates proposal delivery from accepted reader knowledge; learning never rides the work branch.
about: [workstream/oats-direction, workstream/knowledge]
id: dec-3c64bd46f6a2
tags: [knowledge, custody, review, architecture]
timestamp: 2026-09-19
---
# Decision

Accepted human direction, 2026-09-13. The default knowledge direction rejects
retaining even portable expertise inside souls. Knowledge lives in an external
base with specialized owners; souls carry role, curriculum and logical
declarations (`owns`/`reads`) only. This superseded the 2026-07 design in
which each soul's bundle lived under `soul/knowledge/` and instance learning
was harvested into it.

**Scoped 2026-09-19** by the
[flexible-knowledge decision](/nodes/oats-maintainer/decisions/flexible-knowledge-and-situated-instances.md):
external placement is the *default integration's* choice, not a kernel rule
against co-located knowledge under another capability. PR-only Git delivery
and source-independent judgment are unchanged by that scoping.

# Rationale

The important boundary is **custody, not location**. If judgment or delivery
needs a source worktree to survive, retirement can strand learning. Preserve
independently usable evidence and run the judge separately; source context is
provenance, not writer authority.

The motivating failures were observed in 2026-07 under in-soul harvest:
learning committed to an instance's work branch was deleted with the branch at
retirement unless someone noticed and rescued it by hand; a harvest commit
advanced a branch tip *under an open review*, so reviewers verified stale
SHAs and the integration commit map filled with knowledge noise; and a
cherry-picked terminal harvest commit could lose semantic fixes that lived in
its parent commits. All three are consequences of knowledge sharing custody
with code under review.

For Git-backed knowledge, review through a pull request is required even in a
private repository. A submitted proposal is not accepted knowledge, and
acceptance is not proof a fresh reader used it. Genuine non-Git storage must
have its own recoverable delivery rather than pretending to be Git or
bypassing review.

The working-agent write prohibition is instructional, not filesystem
isolation. Ownership routes maintenance; reads select initial context. Neither
supplies repository access control. These are default OKF choices, not extra
kernel doctrine imposed on other knowledge capabilities
([optional reference theory](/nodes/oats-maintainer/decisions/optional-reference-theory.md)).

# Consequences

Episodic notes stay in the instance home and never change a branch tip.
Knowledge arrives as separate reviewed changes to the external base, judged by
the maintainer under the
[review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md). Adoption
claims about knowledge follow
[adoption evidence discipline](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md).

# Later direction, not a current-policy replacement

The [2026-11-02 direct-proposal roadmap](/nodes/oats-maintainer/stewardship/direct-knowledge-proposals-retain-maintainer-review.md)
records a move toward working agents opening knowledge PRs themselves, with
unchanged doctrine and maintainer review. It does not lift the current write
prohibition or remove current harvest duties. The package-owner design must
address provenance, independent review and write authority before the
transition ships; the custody rationale above remains in force.

# Current contracts

- [knowledge.md](https://github.com/awebai/oats/blob/main/docs/knowledge.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/external-knowledge-custody`; `lessons/harvest-cherrypick-parent-state`, 2026-07-25), with motivating cases from agents/dev-coordinator and agents/docs-expert knowledge @ 7838d3ca.
