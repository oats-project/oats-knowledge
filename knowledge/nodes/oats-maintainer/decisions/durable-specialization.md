---
type: Decision
title: Durable specialization preserves judgment across sessions
description: Preserve expertise as a versioned project artifact and the soul as canonical curated birth context, while treating agent genomics and speciation as direction rather than replacing shared specialization with per-instance configuration.
about: [workstream/oats-direction]
id: dec-d211774b6b32
tags: [positioning, specialization, providers, architecture]
timestamp: 2026-11-02
---
# The founding claim

OATS (Open Agent Team Specification) was founded on one claim, stated at the
pattern's first recording (2026-07-08) and made the accepted product
positioning by the founder on 2026-07-26: **agent expertise should be a
versioned project artifact, not a session side-effect.** A soul is a reviewed
description of a durable specialist; an instance is its disposable, steerable
incarnation. Instances die, models and harnesses change, the specialist
remains — and every incarnation should start wiser than the last.

The value is not one more universal assistant, model router or rigid workflow
engine. OATS makes the agent team itself part of project architecture:
identities, roles, knowledge, procedures, deployment policy, capability
assignment, work topology and coordination are explicit, reviewable artifacts.

# Genealogy

The pattern was derived from a prior team architecture (souls, instances,
per-agent messaging identities, a spawn skill) and from an agent-native
multi-repository engineering practice in which each repository carries its
own specialists. It deliberately builds on open standards rather than
inventing formats — see
[What OATS borrowed and where it diverges](/nodes/oats-maintainer/references/standards-genealogy.md).

# Rationale

A full instance can be steered, resumed and coordinated; it is not merely an
anonymous workflow step. Provider-native subagents and workflows remain useful,
and OATS documentation must not dismiss them; they do not by themselves supply
durable role continuity, project ownership or curated curriculum.

Curating a specialist's context is preferable to presenting every procedure
and hoping the model ignores irrelevant ones. Runtime diversity is a feature
when specialization makes the choice intentional: different roles may run
different runtimes and models, and OATS supplies the common identity,
curriculum, configuration, memory, communication and work contracts without
flattening every member into a least-common-denominator engine.

"Provider-agnostic" names **two distinct axes** that documentation must not
conflate: (1) agent runtime/model providers, which no OATS contract may
assume; (2) external service providers (the concrete knowledge, messaging or
task system a deployment selects). A layer capability may deliberately bind
one external service, but it must expose a runtime/model-neutral protocol and
behave coherently under every runtime adapter; runtime-specific glue stays
thin and at the edge.

The mental model that every explanatory surface should teach, in this order:
**package distributes, capability teaches or enables, config assigns, soul
specializes, instance works.** Schemas, manifests and locks follow the model;
they do not lead it.

# Consequences

Continuity is an opportunity, not automatic learning: a new instance becomes
better informed only when useful evidence has been judged, delivered, accepted
and read. Where knowledge lives and who holds custody of it is decided in
[external knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md),
not here. No knowledge integration is compulsory,
and managed context selection is not whole-harness isolation. Layer
implementations are judged for runtime neutrality even when they bind one
external service ([kernel responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).
Present-tense product claims must match released behaviour; target
architecture is never documented as shipped.

# Birth-context refinement and evolution direction (2026-11-02)

The source reports Pepe's framing of a soul as an agent's **birth context**:
a curated set of capabilities, a specialization and one canonical shared
definition. The agent is the model and harness alive with that context.
This reinforces the founding reason for curating reusable expertise; review
should not collapse that shared definition into per-instance configuration.
It is rationale for the distinction, not a second schema description.

The associated direction is toward agent genomics and speciation: souls can
evolve and branch. The existing
[evidence-based speciation decision](/nodes/oats-maintainer/decisions/flexible-knowledge-and-situated-instances.md)
already owns the criteria and human-acceptance boundary for structural change;
this refinement neither replaces those criteria nor establishes automatic
speciation. Renaming the term “soul” remains open, not a selected name or
migration commitment.

**Owner: oats-maintainer. Update-on-change:** when the human accepts a changed
birth-context model, evolution policy or naming decision, update this dated
refinement and log the change in the same session, preserving the original
specialization rationale and citing any explicit supersession.

Acceptance is **source-reported**: Pepe in the coordination-rethink lead's
session on 2026-11-02, relayed to the source maintainer by that lead in mail
83131d00 that day. Neither the session nor the mail was inspected. The
framing and future direction are not evidence of an implemented evolution
mechanism, chosen rename or completed trial.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/soul-is-birth-context.md.

# Current contracts

- [souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)
- [knowledge.md](https://github.com/awebai/oats/blob/main/docs/knowledge.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`architecture/what-oats-is`, 2026-07-08; `decisions/provider-agnostic-specialization-and-curated-context`, founder acceptance 2026-07-26).
