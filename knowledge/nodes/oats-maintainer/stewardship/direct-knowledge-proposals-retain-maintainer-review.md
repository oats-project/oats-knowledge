---
type: Roadmap
title: Direct knowledge proposals should retain doctrine and maintainer review
description: Move toward working agents opening knowledge PRs themselves under unchanged promotion doctrine, but retain current harvest duties until the knowledge-package owner designs and ships the authority and independent-review transition.
about: [workstream/oats-direction, workstream/knowledge]
kind: direction
status: decided
decided-by: human
id: dec-ab8abe185811
tags: [knowledge, direction, review, capabilities, authority]
timestamp: 2026-11-02
---
**Owner: oats-maintainer. Update-on-change:** record an accepted change to this
direction or a shipped transition in the same session, citing its evidence
and explicitly identifying any operating decision it supersedes.

# Direction as of 2026-11-02

The source reports Pepe's direction to reduce knowledge-publication ritual:
a working agent should apply the knowledge-theory promotion test itself and
open the knowledge PR, rather than spawn a separate harvester. A knowledge
maintainer still reviews that PR, and the doctrine of what qualifies as
knowledge is unchanged. Direct proposal is not direct acceptance into the
base.

This is project direction for a future change to `oats.okf`, **not permission
to skip the current proposal/harvest duty**. That package is already shipped;
its owner must design the change and deliver it before agents follow a new
workflow. A roadmap record does not change a running agent's captured skills,
write authority or publication protocol.

# What the owner design must resolve

The source identifies two responsibilities that cannot disappear merely by
removing the harvester role:

- Explain the independent judgment and provenance checks the harvester
  supplied, and how the maintainer's review carries those responsibilities
  in the direct-proposal model.
- Specify how the working agent obtains the write access needed to prepare
  and publish a proposal. Knowledge ownership by itself is not that access.

The [personal-data exclusion decision](/nodes/oats-okf-expert/decisions/personal-data-exclusion-is-not-a-publication-guarantee.md)
is a design input to both: it counts the capturing instance, harvester and
reviewer as separate exclusion judges, and it deferred separating publication
access from the agent that judges exclusions. Removing the harvester changes
both premises, so the design must say how they carry forward.

The [source-independent custody decision](/nodes/oats-maintainer/decisions/external-knowledge-custody.md)
remains the record of why evidence, proposal delivery and acceptance are
separate, and why learning must not ride the code work branch. Its current
working-agent write prohibition is **not superseded by this roadmap**. A
future accepted implementation must explicitly reconcile or supersede the
relevant operating terms rather than imply that a change of proposer erases
their rationale.

This remains a [capability-owned runtime choice](/nodes/oats-maintainer/decisions/optional-reference-theory.md),
not a universal kernel knowledge pipeline. The
[knowledge-review research](/nodes/market-research-expert/conclusions/agent-knowledge-practice-2026.md)
leaves separate-judge outcome comparisons unresolved; it does not prove that
removing or retaining a harvester improves review quality. The source gives
reduced ritual as the direction's rationale, not a measured cost or quality
result.

# Acceptance and evidence limits

Acceptance of the **direction** is **source-reported**: Pepe in the
coordination-rethink lead's session on 2026-11-02, relayed to the source
maintainer by that lead in mail 83131d00 that day. Neither the session nor the
mail was inspected. The record establishes no approved replacement protocol,
completed design, package release, access grant or current-workflow exemption.
Until the owner-reviewed change ships, proposals and harvests continue under
the existing instructions.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/knowledge-without-harvesters-direction.md.
