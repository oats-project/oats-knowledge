---
type: Conclusion
title: Knowledge-shape evidence does not establish a durable-project-memory winner
description: The 2026-11-02 research pass identifies no experiment isolating a type-label benefit and reports competitive simple memory baselines, without establishing a best representation for durable project judgment or current models.
about: [workstream/positioning, workstream/knowledge]
kind: finding
id: ins-a9bdeb8db70c
tags: [research, knowledge, memory, evaluation, uncertainty]
timestamp: 2026-11-02
---
# Dated conclusion and scope

The source's **2026-11-02** investigation did not identify an experiment
isolating the effect of note type labels on agent retrieval or behavior.
Treat that benefit as **unknown in this investigation**, not as disproved
or as proof that no such study exists. A shipped taxonomy, a memory-system
benchmark and an evaluation of durable project judgment answer different
questions.

The useful consequence for research is to compare a proposed representation
with simple baselines and ask what mechanism the evaluation actually tests.
Do not infer that graphs, typed notes or plain files are universally superior.
This conclusion records source-reported readings; it does not select an OATS
knowledge schema or change the accepted
[durable-specialization rationale](/nodes/oats-maintainer/decisions/durable-specialization.md).

# What the captured research supports

- **Shipped format, not outcome evidence.** The source reports checking
  Claude Code's memory documentation on 2026-11-02 [1]: Markdown memory with
  an index and shallow user, feedback, project and reference categories,
  avoiding project material recoverable from code. This is vendor-described
  behavior, not an experiment showing that those categories improve results.
  It neither validates nor rules out decision/rationale-oriented knowledge.
- **Independent comparison, bounded task coverage.** The source reports
  reading MemoryAgentBench v4 Table 3, dated 2026-06-28 [2]. In its listed
  overall results, GPT-5-mini long context leads the named memory systems;
  BM25 is approximately level with, and slightly below, HippoRAG-v2 and above
  the listed Zep, Mem0 and Cognee results. This is a source-reported
  independent benchmark comparison on recall/conflict tasks, not an
  independently reproduced result here or an evaluation of durable project
  knowledge. The captured summary does not preserve the metric
  definition, full configurations or uncertainty needed for a reusable
  numerical leaderboard or causal attribution to storage architecture.
- **Context-file utility depends on content and setup.** The source reports
  checking the abstract of the ETH context-file study's v3, dated
  2026-09-29 [3], which does not find general success improvement and reports
  increased cost. Its note attributes little value to overviews while tool
  instructions are followed. The model list—Sonnet 4.5, GPT-5.2, GPT-5.1
  mini and Qwen3—comes from researcher notes, not the checked abstract.
  This is not a finding that every context file is harmful, nor a direct
  test of reviewed decisions and supersession records.
- **Query reliability is a separate concern.** Researcher summaries of
  CypherGuard and CypherTurn [4, 5] report silent query errors and lower
  multi-turn accuracy with greater autonomy. The capture names Sonnet 4.6
  and gpt-5.4-mini for CypherGuard, and includes Opus 4.7 and GPT-5.5 among
  CypherTurn's models. The proposer did not re-fetch these papers. These
  reports motivate checking query correctness; they do not establish that
  graph storage causes those failures or that plain files avoid them.
- **Admission deserves its own comparison.** A researcher summary of
  Xiong et al. [6] reports an advantage for selective additions plus
  deletions over storing everything, and limited benefit from LLM-judge
  filtering. The capture characterizes the tested models only as 2024–25
  models; exact model names are unstated. The proposer did not re-fetch
  the paper. Keep this as a bounded reported result, not a proven universal
  curation policy or a numerical guarantee for today's models.

The source supplies no evaluation on the Claude 5 family or GPT-6-class
models for these findings. Transfer to those generations is **unconfirmed**,
not evidence of no benefit. Vendor documentation supplies no measured-model
result at all. The investigation also establishes no outcome study of
persistent decisions, rationale and supersession as durable project knowledge;
that is a gap in the captured research, not a complete negative literature
review.

# Additional context-file evidence reported on 2026-11-02

A separate recency proposal supplies a **researcher-read, secondhand summary**
of an AGENTS.md ablation [7], dated 2026-07-28 by the source, on
**claude-sonnet-4-6 and gpt-5.5**. It reports no measurable correctness change
in a small study. The proposer explicitly did not recheck this paper; this
harvest read the captured summary, not the paper or experiment.

The source identifies a distinct context-file study; this capture establishes
neither a newer version nor a replication of the ETH study above. The capture
does not retain the tasks, file contents, comparison arms or uncertainty
needed to infer equivalence, a universal
zero benefit or a model-strength trend. A null result in the reported setup
is not proof that context files never help. This summary also establishes no
test of reviewed decisions, rationale and supersession across future
instances, and supplies no Claude 5 or GPT-6-class result.

Keep this as an additional model-qualified lead for context-file comparisons,
not a finding that memory or skills generally stopped working. The comparison
question remains what content and mechanism were tested against what baseline;
publication recency alone cannot answer it.

# Related claims and refresh rule

The [scaffolding lesson](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md)
owns model-dependent retesting and the distinction between persistence and
learning. This pass adds a specifically identified memory benchmark without
retroactively making that earlier capture an independent evaluation. The
[persistent-team limitation](/nodes/market-research-expert/limitations/persistent-team-outcomes-evidence-gap.md)
separately owns the multi-session specialist-team outcome question; memory
recall results do not settle it.

**Owner:** market-research-expert. Recheck per model generation and when a
controlled type-label ablation or durable-project-knowledge evaluation
appears. Apply the [recency and model-generation decision](/nodes/market-research-expert/decisions/date-evidence-and-name-model-generations.md)
to the next pass. Update or supersede this conclusion and log the change in
the same session; do not silently extend its scope or date.

# Citations and evidence boundary

These locators and version dates are supplied by the source. The harvest
read only the captured proposal and named note, not the full report,
researcher files, vendor pages or papers; no experiment was reproduced.
The source's primary-source spot checks are distinguished above from
secondhand researcher summaries, not upgraded into harvest verification.

1. [Claude Code memory documentation](https://code.claude.com/docs/en/memory),
   source-reported check on 2026-11-02; vendor documentation.
2. [MemoryAgentBench, arXiv 2507.05257v4](https://arxiv.org/abs/2507.05257v4),
   Table 3, source dates v4 to 2026-06-28 and its reading to 2026-11-02.
3. [ETH context-file study, arXiv 2602.11988v3](https://arxiv.org/abs/2602.11988v3),
   source dates v3 to 2026-09-29; abstract reportedly checked 2026-11-02.
4. [CypherGuard, arXiv 2610.41755](https://arxiv.org/abs/2610.41755),
   dated 2026-10-30 by the source; researcher-summary support only.
5. [CypherTurn, arXiv 2609.36987](https://arxiv.org/abs/2609.36987),
   dated 2026-09-29 by the source; researcher-summary support only.
6. [Xiong et al., arXiv 2505.16067](https://arxiv.org/abs/2505.16067),
   identified by the source as ACL 2026; researcher-summary support only.
7. AGENTS.md ablation, [arXiv 2607.27250](https://arxiv.org/abs/2607.27250),
   dated 2026-07-28 by the recency source; researcher-summary support only,
   not rechecked by the proposer or independently fetched by this harvest.

Evidence: OKF proposal from market-research-expert/know-ontology-research-expert,
2026-11-02; notes/agent-knowledge-shape-evidence-2026-11.md.

Additional context-file finding:

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/recency-refinements-memory-relay-claims-2026.md.
