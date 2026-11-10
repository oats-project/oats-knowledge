---
type: Decision
title: Date fast-moving research and name the measured model generation
description: Source-reported human direction on 2026-11-02 prioritizes the last six months, explicitly searches the latest quarter, and requires model-generation labels and a dated recency pass.
about: [workstream/positioning]
id: dec-8cd7b48ab2fb
tags: [research, recency, evidence-quality, model-capability]
timestamp: 2026-11-02
---
# Decision and rationale

For this soul's fast-moving agent and coordination research, prefer evidence
from the **last six months** and treat older sources as background to confirm
or supersede. Explicitly search for releases and publications from the
**latest three months**. Date the evidence and identify the models on which
each finding was measured rather than presenting an older generation's
result as a current-model fact.

The rationale is that model releases can change the value of coordination
and scaffolding. Publication recency alone cannot establish applicability:
a recent paper may test older models, and a vendor or practitioner account
may never name a model. Older work is not automatically false; its status as
current evidence needs an explicit check. The windows are rolling, relative
to the research date, not a fixed calendar filter.

# Consequences for research reports

1. Record each finding's source date and measured model or model generation.
   When the source does not identify it, write **model unstated** rather than
   infer a model from the date, product name or current vendor lineup.
2. Mark older-generation-only findings **unconfirmed for current models**.
   Say whether newer evidence confirms, weakens or reverses the finding,
   or whether none was found. Do not equate absence of newer evidence with
   either confirmation or refutation.
3. Look specifically for evidence that coordination or scaffolding needs
   change as models improve, not only for new product announcements. Do not
   assume that every coordination or authority control disappears as
   capability grows.
4. Include a short **Recency pass, <date>** section with:
   - **Changed:** conclusions revised by the newer evidence.
   - **Held:** conclusions retained, with the newest backing-source date.
   - **New:** findings added in the pass.

This decision specifies how evidence is dated and reported. The
[scaffolding lesson](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md)
already owns the reason to retest components per generation; the
[decisive-claim verification lesson](/nodes/market-research-expert/lessons/verify-decisive-product-claims-before-synthesis.md)
owns primary-source and evidence-status checks. A recent source is not
necessarily an independent or reliable source, and this decision replaces
neither check.

# Acceptance and scope

**Acceptance: source-reported.** The source attributes this direction to
Pepe on **2026-11-02**, relayed by `oats-expert-coordination-rethink` in aweb
mail messages `16c7e803-d186-483f-a3e1-282c3deca7c8` and
`ea9405ce-3e79-4eaf-bd80-467bb63d4611`. The source reports that the relaying
sender was verified. The harvester did not inspect those messages; neither
sender verification nor this capture makes the relay the human's own record.
No message is reproduced verbatim. A second proposal, from
know-storage-research-expert on the same date, reports the same direction
relayed by the same parent instance in aweb mail messages
`6620b3fb-23ef-4cfa-8e66-e0e55bd8c3c4` and
`d299a525-5d7c-4322-84c0-4bb52d45ed38`; that report is likewise
source-reported and was not inspected.

This is direction for market-research-expert's research method, not a
workspace-wide expiry rule, permission to discard accepted decisions, or a
claim about which model family is currently newest. It complements the
existing lessons without superseding them, selects no coordination design,
and leaves the [coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
as the canonical project mandate.

# Ownership and implementation route

**Owner:** market-research-expert. Preserve this acceptance and rationale;
a change to the human-accepted rule requires cited human acceptance and an
explicit logged supersession.

The routine reporting step belongs in separately reviewed research guidance
and report templates. Evidence tooling can flag missing dates, model labels
and recency sections; it cannot establish that a newer study transfers to a
different model or supports the same claim. No soul skill or enforcement
mechanism is changed by this knowledge record.

Evidence: OKF proposal from market-research-expert/know-ontology-research-expert,
2026-11-02; notes/research-recency-and-model-generation-rule.md.
Corroborating report and the rolling-window and control clarifications:
OKF proposal from market-research-expert/know-storage-research-expert,
2026-11-02; notes/recency-and-model-generation-anchoring.md.
