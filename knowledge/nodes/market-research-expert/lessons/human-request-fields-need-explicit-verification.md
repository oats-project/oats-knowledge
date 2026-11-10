---
type: Lesson
title: Verify decision fields and silence semantics separately in human-request protocols
description: Source-reported protocol and trial checks distinguish decision fields, silence, identity, scoring eligibility and prior-action context without treating a cold-decidability rating as authorized, safe action.
about: [workstream/positioning]
kind: lesson
id: ins-494a790ecf6a
tags: [research, human-oversight, protocols, consent, uncertainty]
timestamp: 2026-11-03
---
# Dated finding and scope

The source's **2026-11-02** comparison reports finding no dedicated fields
for deadline, default-if-silent, reversibility, blast radius or recommended
option in **MCP 2026-07-28, A2A 1.0.1, OpenAI Agents SDK approvals and Claude
Code permission hooks** [1]. A mechanism for requesting input or accepting
approval does not, by itself, establish support for those decision fields.

This is the captured researcher's finding, **not an independently checked
schema inventory**. The note names the surfaces and versions above, but
retains no primary schema excerpts, precise page locators or SDK/hook
versions. It does not establish that custom payloads, free text, extensions
or applications cannot carry this information. Nor does it prove that every
agent-to-human protocol lacks it or that a proposed OATS schema is unique.
No measured model or schema-comparison experiment is identified.

# Silence is a separate contract question

The same investigation reports Claude Code changelog behavior in September
and October 2026: dangerous prompts in unattended runs time out and deny,
unanswered non-interactive elicitation remains unanswered, and a
`decider: "person"` option reserves a decision to a human [2]. These are
**source-reported product leads**, not runtime-tested guarantees, a uniform
contract across the four surfaces, or evidence that delegation is always
forbidden. The precise entries and configuration coverage are not captured.

Keep distinct a request's deadline, what execution does while waiting, the
result of expiry, and who may supply an answer. Missing input is not evidence
of approval; a comparison must establish the actual selected product's
semantics rather than infer them from an input-required status or UI label.
The [routing-versus-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
owns who may confirm an action and where that confirmation is accepted.

# Identity evidence is separate from decision-context fields

A third verification pass on **2026-11-02** adds a researcher-read A2A
**1.0.1** specification/enterprise-guide lead [3]: caller authentication is
at the transport, the base payload does not carry identity, and Agent Card
JWS signing is optional. This is a **source-reported interpretation**, not an
independently checked schema or runtime audit. The note lacks exact clauses
and full extension/configuration coverage. It does not show that A2A lacks
authentication, that applications cannot carry identity, or that a signed
Agent Card authenticates every subsequent message or its originating human.

For comparisons, inspect **authenticated caller, payload sender identity,
Agent Card authenticity and authorization to act** separately. Where a claim
concerns a forwarded or durable message, check what verifiable attribution
survives beyond the transport connection. The presence of decision-context
fields answers none of these identity questions, and a field claiming an
identity is not itself verification. This changes neither OATS's
[optional human-attribution contract](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md)
nor its approval requirements.

The same source reports reading **A2ABreak, arXiv 2609.10871v3**, in raw
HTML [4]. Its account identifies **eleven candidate findings from an
LLM-based pipeline**, of which **three were machine-checked with Alloy/TLA+**,
with **none tested on live systems**. The paper analyzed A2A **1.0.0**, not
an independently tested deployment of 1.0.1. Do not cite this as eleven
formally verified vulnerabilities or as demonstrated live exploitability.
A formal model's assumptions and optional implementation choices still bound
its result; no present-day affected-version range or fix status is established
by this capture. The harvest did not inspect the models or reproduce the
analysis. Keep proposed findings, formal-model checks and implementation
validation as distinct evidence levels.

# Refinement: cold-decidability is conditional on eligibility and action context

A **2026-11-03** source-reported audit of the November 2–3 coordination
trials found expired cards outside the cold-decidability rating denominator.
It also reports that a card rated cold-decidable omitted a prior send of the
same reply: approval was followed by a duplicate outward action. The
[fixture timing lesson](/nodes/oats-expert/lessons/digest-thread-count-is-not-human-time-or-deadline-safety.md)
owns the digest-delay and isolated duplicate observations; the new research
consequence here is to check **rating eligibility and prior-action context**
before interpreting a cold-format score as decision safety.

These are captured audit findings, not independently inspected card or
execution records. No trial was repeated by this harvest. The note does not
retain the per-card ledger, full rating protocol or measured model identities.
A single fixture observation establishes neither a human error rate nor a
router/broker safety ranking, and it does not show how real users would act.

For an oversight-interface comparison:

- Report generated, delivered, delivered before deadline, rated and rated
  cold-decidable cards separately, with exclusions and their reasons. Preserve
  the denominator for each trial and condition. An expired, unrated card is
  neither a cold-decidability success nor a rated failure; it still belongs in
  delivery and coverage accounting.
- Keep the ability to answer the visible card separate from whether its
  context matches the action history. Compare the card with an external
  action ledger, including whether the proposed action has already happened.
  A readable recommendation or a human approval does not establish that its
  prior-action context is complete.
- Measure resulting actions separately from card ratings and delivery
  timeliness. Passing those checks still does not supply authorization or
  establish end-to-end safety outside the tested conditions.

The elimination route is a trial scorer that emits an explicit eligibility
and exclusion ledger, paired with an action-state oracle that checks card
context against recorded prior actions. Test timed delivery and resulting
behavior before recommending a front end on safety grounds, and validate
human-decision claims with real users rather than treating fixture ratings
as human validation. These are proposed evaluation controls, not an
implemented scorer, a proven sufficient defense or a selected interface.

# Consequence for comparisons

Evaluate decision context field by field. Separate native typed support
from application-provided content, and distinguish a recommended option
from an authorized default. Check whether the information reaches the
human and whether the executing system enforces the claimed timeout and
approval behavior. The captured pass establishes no causal result showing
that adding these fields reduces fatigue, improves judgment or makes
silent approval safe.

This is research judgment, not a new approval policy. Any OATS request or
timeout contract belongs in its owner's reviewed design and executable
boundary tests; a knowledge entry is not an enforcement mechanism. Existing
human-only, authorization and safety requirements remain unchanged.

**Owner and recheck:** market-research-expert. Recheck on the next MCP/A2A
release after the versions above or material SDK, hook or permission-behavior
change, when A2ABreak implementation validation or fix evidence appears,
and when oversight trials supply eligibility, action-history or real-user
validation evidence. Re-read the selected schemas and implementations before
calling the inventory current; update or supersede this finding and log the
change in the same session.

# Citations

Source-supplied document identifiers; no external page was fetched by this
harvest:

1. MCP 2026-07-28; A2A 1.0.1; OpenAI Agents SDK approvals; Claude Code
   permission hooks, source reading dated 2026-11-02.
2. Claude Code changelog, September–October 2026 entries as summarized by
   the source; exact locators and tested configurations absent.
3. A2A 1.0.1 specification and enterprise guide, researcher-read as reported
   on 2026-11-02; precise page/section locators are absent from the capture.
4. A2ABreak, [arXiv 2609.10871v3](https://arxiv.org/html/2609.10871v3),
   source-reported raw-HTML reading on 2026-11-02, analyzing A2A 1.0.0;
   neither the paper nor formal artifacts were independently checked here.

Evidence: OKF proposal from market-research-expert/coord-oversight-research-expert,
2026-11-02; notes/human-request-protocols-lack-deadline-default-reversibility.md.

Evidence for the identity and security-evidence refinement: OKF proposal from
market-research-expert/coord-claims-verification-expert, 2026-11-02;
notes/a2a-identity-is-transport-level-with-optional-signing.md.

Evidence for the eligibility and prior-action refinement: OKF proposal from
market-research-expert/study-trials-gpt-expert, 2026-11-03;
notes/cold-decision-scores-need-denominator-and-state-check.md.
