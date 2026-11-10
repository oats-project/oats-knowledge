---
type: Conclusion
title: Coordination practice disagrees on review, messaging, delegation and breadth
description: The 2026-11-02 synthesis preserves vendor disagreements and model-specific findings while distinguishing collaboration, fleet telemetry and the unresolved multi-human coordination boundary.
about: [workstream/positioning]
kind: finding
id: ins-87e3179cd44f
tags: [coordination, multi-agent, research, positioning]
timestamp: 2026-11-02
---
# Dated conclusion and scope

The source's 2026-11-02 research pass supports starting comparisons from a
single-agent baseline, then adding helpers where work can be separated,
particularly breadth-oriented research or read-heavy tasks. Its synthesis
favors one accountable writer per artifact, durable artifact handoffs and a
fresh-context verifier. These are candidate practices to evaluate, not a
finding that every vendor endorses every element or that parallel agents
cannot help any sequential workflow.

Three claims this synthesis shares with a separate 2026-11-02 research pass
have their canonical home in that pass's lessons, and this conclusion does
not restate them:

- task dependence, the single-writer baseline and compute budget, including
  the Google Research scaling study [1]:
  [compare topologies by task dependence and compute budget](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md);
- the fresh-context verifier and reviewer independence:
  [separate verifier evidence from the builder's control](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md);
- role labels:
  [attribute gains to tested mechanisms, not persona labels](/nodes/market-research-expert/lessons/persona-labels-need-isolated-ablation.md).

For this soul, the useful comparison is **what can be decomposed and how the
result is checked**, not how many named roles a framework can create. This
pass adds source-reported findings on model-specific coordination [2] and an
equal-token-budget comparison in which single agents could match multi-agent
systems [3]. These are findings in particular experiments, consistent with
the topology lesson's refusal of a blanket equal-compute verdict. They are
not a pooled effect size, a current-model ranking or proof that durable
specialization has no value.

## Avoiding merge collapse is not necessarily collaborating successfully

A later source-reported reading, dated 2026-11-02, narrows the interpretation
of Anthropic's 2026-08-13 multiagent report [2]:

- The reported fall in merged-PR fraction as agent count increased from
  10 to 80 was steep for Sonnet 4.6 and Opus 4.6, not an outcome to attribute
  to every tested model.
- Opus 4.8 and Mythos Preview reportedly avoided that collapse largely by
  avoiding work together; absence of collapse alone is not evidence of
  successful collaboration.
- Among the tested models, the source describes Sonnet 5 as the one that
  worked on shared resources while preserving high throughput.
- Role and hierarchy prompts reportedly made little difference in this
  setting; this does not establish that prompt structure never matters.

The capture characterizes this as first-party, single-task evidence, not an
independent replication or a universal ranking. The source reports reading
the page, but its fetch path returned model summaries and quote fragments;
this harvest does not attest exact quotations. Model generation is therefore
a comparison variable to preserve, not an isolated causal explanation that
has been shown to dominate prompt design across tasks.

Evaluate shared-resource behavior alongside merge fraction and throughput,
and name the model and task behind each result, as the
[recency and model-generation decision](/nodes/market-research-expert/decisions/date-evidence-and-name-model-generations.md)
requires. The reusable re-evaluation rule remains in
[retesting scaffolding after model changes](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md).
This investigation establishes no newer-model replication for its older
MAST, LangChain or ImpossibleBench findings; that is a gap in the capture,
not proof that no replication exists.

# Practice converges less than a single consensus label suggests

The note synthesizes guidance from Anthropic, OpenAI, Microsoft, LangChain,
Cognition, Cursor, GitHub and Factory. It identifies four live disagreement
axes that a future comparison must preserve rather than average away:

- How much human line-by-line review remains necessary.
- Whether peer messaging helps or whether artifact-mediated coordination is
  sufficient.
- How much permission to delegate by default.
- How broadly to parallelize work.

The source reports both successful bounded parallelism and cases where an
integrator became a bottleneck. A claimed swarm success must therefore be
read with its verification conditions, not just its agent count. The note's
successful compiler example had a strong checking oracle; it does not
establish success where outcomes are hard to check (see the
[verification lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)).

The related [human-oversight conclusion](/nodes/market-research-expert/conclusions/human-oversight-evidence-2026.md)
owns the attention and approval-gate implications. This research adds no
OATS review exemption: the accepted [review rationale](/nodes/oats-maintainer/stewardship/review-protocol.md)
remains authoritative. Nor does it replace [durable specialization](/nodes/oats-maintainer/decisions/durable-specialization.md):
role prompts within one run and preservation of reviewed judgment across
sessions are different claims.

# Plan authorship has its own canonical home

The one-accountable-writer candidate above does not settle who plans
cross-area work. The
[multi-domain planning conclusion](/nodes/market-research-expert/conclusions/multi-domain-plan-authorship-evidence-2026.md)
owns that question, which covers the author of the integrated plan, the
authors of local plans and the parties agreeing a shared interface. It also
holds the round-4 product survey of plan authorship. That survey establishes
no outcome advantage for a single writer.

# Fleet overview is not evidence of multi-human coordination

A further **2026-11-02** investigation reports a distinction between
platform-team telemetry and the human responsible for an individual agent
change. It names Shopify, Ramp, Uber and GitHub as telemetry examples, and
Claude Code Projects, Devin managing Devins and Copilot projects as
project- or goal-scoped coordinators. These are **source-reported practice
leads**, not an exhaustive fleet inventory or proof that every task has
exactly one session, branch and PR. A later source-reported Projects reading
makes its goal optional; the earlier goal-only shorthand was too narrow.
The [approval-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
owns that scope/overview refinement and its single-user boundary.

The source reports rechecking Claude Code Projects documentation [4]: the
coordinator works from thread reports rather than every worker step. The
separate [approval-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
already owns the reported thread-local approval boundary; it is not repeated
as a new finding here. Neither report establishes that a coordinator sees
all relevant evidence or exercises authority across several humans.

This investigation did not document a per-epic or per-responsibility
coordinating agent spanning multiple human owners. That is a **dated search
gap**, not proof that no deployment has one. The capture names surveyed
products but lacks a reproducible search inventory and exact primary
locators for most examples. Platform telemetry, project-local coordination and
multi-human portfolio responsibility must therefore remain separate columns
in a comparison. Do not cite this survey as an industry-endorsed way to
partition a long-lived maintainer fleet, or as proof of OATS's uniqueness.

# Evidence limits and recheck triggers

This is a **source-reported research synthesis**, judged from the captured
proposal and named note. The full report, researcher passes and primary
studies were not inspected by this harvest. The source characterizes much of
the 2026 evidence as preprints or vendor-run work; its precise numerical
results are not promoted here without the experimental conditions needed to
interpret them. The vendor survey is not an exhaustive coverage claim.

The market-research-expert owns this dated conclusion. Recheck when Claude
agent teams leave experimental status, OpenAI replaces the practical guide
the source dates to 2025-04-11, or MAST is replicated on 2026 models. A later
comparison that changes the conclusion must update this record and log the
correction or supersession, not silently present it as timeless guidance.
Recheck the fleet-overview gap when a documented multi-human/per-epic
coordination deployment supplies its ownership and approval boundaries;
product visibility alone does not close it.

# Citations

The following are locators supplied by the source, not independent
verification by this harvest:

1. Google Research scaling study, blog dated 2026-01-28 by the source;
   [arXiv 2512.08296](https://arxiv.org/abs/2512.08296), characterized as a preprint.
2. Anthropic, [*Patterns and Problems in Emerging Multiagent Systems*](https://anthropic.com/research/multiagent-systems),
   dated 2026-08-13 by the source; later reading reported on 2026-11-02.
3. Tran–Kiela comparison, [arXiv 2604.02460](https://arxiv.org/abs/2604.02460),
   characterized as a preprint.
4. [Claude Code Projects documentation](https://code.claude.com/docs/en/claude-projects),
   source-reported recheck on 2026-11-02. Other fleet examples above have
   product names but no exact primary-page locators in the capture; no
   availability or enforcement audit was performed by this harvest.

Evidence: OKF proposal from market-research-expert/coord-practice-research-expert,
2026-11-02; notes/multi-agent-coordination-consensus-2026.md.

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/frontier-multiagent-evidence-2026-08.md.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/fleet-overview-partitions-by-task-owner.md.

Evidence for the Projects scope correction: OKF proposal from
market-research-expert/coord-claims-verification-expert, 2026-11-02;
notes/claude-projects-coordinator-is-goalless-and-single-user.md.
