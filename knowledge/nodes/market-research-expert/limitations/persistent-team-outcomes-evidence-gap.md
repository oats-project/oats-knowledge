---
type: Limitation
title: Persistent specialist-team outcomes remain unresolved in the product survey
description: The 2026-11-02 product investigation establishes no outcome comparison for persistent multi-session specialist teams, so resumable execution and identity features do not substantiate a performance claim.
about: [workstream/positioning]
kind: constraint
id: ins-35ad2e2ab25b
tags: [research, persistent-agents, specialization, positioning, uncertainty]
timestamp: 2026-11-02
---
# Dated finding and scope

The source reports that its **2026-11-02** framework and literature survey
found no study measuring persistent, multi-session specialist teams. Its
named framework coverage comprises LangGraph, Microsoft Agent Framework,
OpenAI Agents SDK, ADK 2.0, CrewAI, Claude Managed Agents and Letta. This
records an unresolved question in that investigation, **not proof that no
such study exists** or that persistent teams cannot improve outcomes.

The captured note preserves this scope and the source's conclusion, but not
a reproducible search protocol, study inventory or primary-document
citations. The harvest did not inspect the full report or repeat the search.
It therefore does not certify the stronger claims that every surveyed
framework models agents only as per-run objects, that only two products
have inbox-like behavior, or that durable identity appears only for
permissions and accountability. Nor does it establish OATS's uniqueness.

# Consequence for comparisons

Keep three questions separate when comparing durable specialists with
provider-native agents:

- Can execution resume with retained state?
- What identity, authority and reviewed knowledge persist across sessions?
- What measured outcome, if any, is attributable to that continuity?

A feature inventory can help answer the first two; it is not itself an
answer to the third. The source's product survey does not establish an
outcome advantage for OATS, a disadvantage for provider-native frameworks,
or equivalence between a resumable run and a persistent specialist team.
Describe continuity features only where their contracts support the claim;
leave their outcome benefit unknown on this evidence.

The [durable-specialization decision](/nodes/oats-maintainer/decisions/durable-specialization.md)
remains the accepted rationale for preserving reviewed judgment. This
finding addresses the research node's open comparison, without superseding
that decision or treating evidence about role prompts within one run as a
test of it. The [persona-attribution lesson](/nodes/market-research-expert/lessons/persona-labels-need-isolated-ablation.md)
owns that separate ablation question; the [scaffolding lesson](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md)
owns persistence-format versus learning claims, and the
[recovery lesson](/nodes/market-research-expert/lessons/coordination-recovery-is-not-task-correctness.md)
owns execution guarantees versus task validity.

# Refresh rule

**Owner:** market-research-expert. Recheck on a major relevant vendor release,
a study of persistent multi-session teams, or **2027-02-01**, whichever comes
first. A later investigation that changes this finding must update or
supersede it and record the change in the node log in the same session.
Until then, retain the dated, investigation-specific uncertainty rather
than claim that the field has no evidence.

# Evidence

The evidence is the source's captured research summary, not an external
evaluation or an independently verified negative literature result.

Evidence: OKF proposal from market-research-expert/coord-products-research-expert,
2026-11-02; notes/durable-identity-is-unstudied.md.
