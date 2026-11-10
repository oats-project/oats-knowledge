---
type: Lesson
title: Separate supervision product patterns from measured human outcomes
description: The 2026-11-02 research synthesis identifies policy-based supervision and worker drill-down as a hybrid candidate, not proof of lower attention cost or safer outcomes.
about: [workstream/positioning]
kind: lesson
id: ins-64fd41511240
tags: [research, supervision, human-oversight, interfaces, evaluation]
timestamp: 2026-11-02
---

# Conclusion and scope

Policy-bounded execution with review of outcomes, a lead-agent interface and
direct access to workers is a **candidate supervision pattern** reported in
the 2026-11-02 research pass. It is not evidence that broker-only interaction
or a separate thread for every agent is best. A shipped interface shows an
available design, not that it saves human attention or improves safety.

The scope is the source's reading of selected vendor products and reports.
No independent comparison of supervision attention cost or broker versus
per-agent threads is established by the captured evidence. This is a gap
in this investigation, not a claim that no such study exists anywhere.

# Evidence and limits

The source cites Anthropic's auto-mode report of 2026-03-25 as reporting high
acceptance of permission prompts alongside misses by an action classifier
in a small evaluation. It also cites the sandboxing account of 2025-10-20 as
reporting fewer prompts. Neither frequent acceptance nor prompt reduction
alone establishes informed consent, low attention cost or equivalent safety.
The exact rates and small-sample estimate are not promoted without the
underlying evaluation context.

The source describes lead/worker access or task-to-artifact review patterns
in Claude Code agent teams, managed Devins, the Codex app and GitHub Agent
HQ. These are vendor/product observations as reported by the source, not a
live product audit by this harvest. They support considering a hybrid
interface, but not the proposal's universal claim that every product keeps
the same drill-down behavior or that the market has converged on one design.

# Recency refinement: aggregation is both an interface and monitoring question

A separate 2026-11-02 recency pass describes aggregated needs-input inboxes
in Claude Code Agent View and Gemini products, secondary-only reporting of
Codex `/agents`, and the OSC 7501 proposal [3]. These are source-reported
examples to compare, not a verified feature matrix: a proposal, a secondary
account and a shipped interaction do not establish the same availability
or semantics. The capture supplies no outcome comparison showing that an
inbox beats a broker or per-agent threads. No measured model is identified
for these interface observations.

The note also reports a preprint in which per-agent monitors missed more
attacks when activity was split across agents [4], naming **GPT-5.6 Sol** as
the monitor. The attack setup, agent models and controls are not retained,
so neither the reported rates nor transfer to other monitors is established.
A separate source-reported red-team account describes monitoring gaps at
compaction and turn boundaries [5]; its measured models are **unstated**.
Neither account was independently checked by this harvest.

The new evaluation question is whether supervision can connect activity
across agents and across context/turn boundaries. Compare fleet-level
visibility with isolated-agent views and test what evidence survives those
boundaries. An aggregated inbox alone is not cross-agent attack detection,
and a joinable activity record is a candidate evaluation requirement, not a
proven sufficient defense or a newly selected OATS architecture.

# Visible agents need a separate isolation check

A follow-up product investigation dated **2026-11-02** reports that xAI's
Grok Bot documentation describes separately named bots with distinct
conversations and learned context, task handoffs and requests for human
approval. Crucially, the source reports that the bots share a cloud computer
and that xAI warns against treating separate bots as a security boundary [6].
This is a **source-reported documentation reading**: the captured note names
the documentation domain but retains no specific page or contract, and this
harvest did not inspect the product or its enforcement.

Use the example to distinguish **context separation from trust isolation**
when comparing visible-agent interfaces. Separate conversations do not by
themselves demonstrate separate permissions, credentials or execution
boundaries. Likewise, a described return for approval does not establish an
enforced authorization gate; the [question-routing lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
owns that distinction. No availability, launch-priority or reliability claim
is established here, and a user-built broker is not a measured improvement
over direct access to the bots.

# Consequence for comparisons

Evaluate permission policy, isolation boundaries, review artifacts and the
human's ability to inspect or intervene in a worker separately. Compare the
attention required to understand and resolve a real task, not just prompt
counts or the presence of a coordinator. Keep approval authority explicit;
a report of prompt fatigue does not authorize bypassing existing approval
requirements.

This supplies a research question for the accepted
[coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md),
which deliberately leaves the human-interaction choice open. It does not
select a replacement design or resume a deferred implementation. The
[task-and-budget topology comparison](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
addresses agent performance, a different outcome from human supervision
cost.

**Owner and recheck:** market-research-expert. Recheck on independent
attention-cost or supervision-safety studies, controlled broker/thread
comparisons, or material changes to the cited product interactions. Recheck
the Grok Bot documentation lead on a major product release or by 2027-02-01,
with the exact context and security contracts before making product claims.
Update or supersede this conclusion and log the change before presenting a newer
product snapshot as current evidence.

# Citations

1. Anthropic, auto-mode report, 2026-03-25, and sandboxing report,
   2025-10-20, as identified by the proposal; vendor-reported evidence, not
   independently re-fetched or replicated here.
2. Claude Code agent teams, Cognition managed Devins, OpenAI Codex app and
   GitHub Agent HQ: product patterns reported by the source as of 2026-11-02,
   not a claim of feature parity, universal availability or measured benefit.
3. Recency note's product/proposal attributions: Claude Code Agent View,
   Gemini Enterprise/agent-tasks inboxes, Codex CLI `/agents` (secondary),
   and Hashimoto's OSC 7501 proposal, dated 2026-10-06 by the source.
   No primary product pages or outcome measurements are retained in the note.
4. [arXiv 2610.24052](https://arxiv.org/abs/2610.24052), dated 2026-10-16
   and described as a preprint on split attacks by the recency source.
5. METR/Redwood red-team account of OpenAI internal monitoring, dated
   2026-10-22 by the source; a source-reported lead without a specific report
   URL in the capture, not an audited incident or coverage inventory.
6. xAI Grok Bot documentation, `docs.x.ai`, source reading dated 2026-11-02;
   exact page and version not retained. This is a lead for contract checking,
   not a verified security or availability audit.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/supervision-moves-to-policy-and-outcomes.md.

Evidence for the recency refinement: OKF proposal from
market-research-expert/coord-practice-research-expert, 2026-11-02;
notes/inbox-convergence-and-fleet-monitoring.md.

Evidence for the context-versus-isolation comparison: OKF proposal from
market-research-expert/coord-products-research-expert, 2026-11-02;
notes/grok-bot-visible-roster-broker.md.
