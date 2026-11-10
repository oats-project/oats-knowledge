---
type: Conclusion
title: Compare knowledge systems by authority and retrieval evidence, not storage format
description: The 2026-11-02 research distinguishes authority, recall, retrieval and maintenance evidence without treating storage format, layout or edit frequency as guarantees of knowledge quality.
about: [workstream/positioning, workstream/knowledge]
kind: finding
id: ins-bb36a6cb89f9
tags: [research, knowledge, memory, retrieval, authority]
timestamp: 2026-11-02
---
# Dated conclusion

Compare agent knowledge systems along separate axes: who may make a statement
authoritative, how agent-written recall is admitted and revised, and whether
retrieval finds useful evidence for the tested workload. A Markdown file, Git
commit, vector store or graph does not by itself answer any of these questions.
In particular, version history is not proof of human review, and successful
retrieval does not turn recalled content into an instruction or accepted fact.

This is a **source-reported research synthesis as of 2026-11-02**, not an audit
of vendor enforcement or a decision selecting an OATS storage backend.

# What the investigation reports

The source identifies a two-tier pattern in the products it examined:
reviewable instruction/skill files such as AGENTS.md, CLAUDE.md and SKILL.md,
and separately agent-written memory used for recall. It reports both local
memory and hosted memory with governance features. Its examples include
Copilot Memory citation checking and expiry, Anthropic Managed Agents memory
versioning, and Letta's git-backed MemFS [1]. These are **source-reported
feature descriptions**, not evidence that every write is human-approved or
that those products enforce equivalent authority boundaries.

The proposal reports re-fetching the Copilot and Letta documentation on
2026-11-02; the capture does not retain those pages or their exact URLs.
Anthropic's versioning description has no separately recorded re-fetch in
the proposal. Consequently this concept does not certify defaults, retention
ranges, immutability guarantees, read-only enforcement or release chronology.
The reusable result is the comparison distinction, not a feature register.

# Retrieval is a workload- and model-qualified comparison

The source reports three different kinds of evidence, which must not be
pooled into one claim of a best retrieval design:

- **Agentic search versus embeddings:** in arXiv 2605.05242 [2], the source
  reports Claude Code on **Sonnet 4.6** outperforming the **Qwen3-Embedding-8B**
  retrieval comparator at one corpus size, then degrading at larger sizes.
  The proposal reports re-fetching this paper on 2026-11-02. The capture
  lacks the corpus, metric and budget details needed to reuse the percentages,
  cost comparison or document counts as a general crossover threshold.
- **Index structure:** arXiv 2607.17598 [3] reportedly found a benefit from
  one flat index level but not a second. The note describes **small/mid-size
  models without exact model identifiers**. It does not establish an optimum
  for current frontier models or a ceiling for growing an OKF-style index.
- **Always-loaded pointers versus on-demand skills:** the source reports a
  Vercel evaluation favoring a compact pointer index [4]. It is vendor-measured,
  with **the model unstated in the capture**; it is a candidate to reproduce,
  not transferable evidence of perfect retrieval or superiority to all skills.

A compact pointer index plus search/read is therefore a useful candidate to
compare with embedding retrieval, not a universal winner. Keep corpus size,
index size/depth, model, retrieval configuration, task accuracy and cost
explicit. The grep result does not establish that vector or graph storage is
unsuitable for authoritative knowledge; retrieval performance and authority
are separate properties.

# Layout and edit history do not establish knowledge freshness

A further **2026-11-02** investigation reports product/technical or
specification/plan artifact divisions in Kiro, Spec Kit and BMAD. These are
source-reported organization examples, not evidence that every product uses
one physical store with enforced owners, or that one shared base beats
separate product and engineering bases. This capture establishes no
controlled comparison of those layouts. The
[knowledge-shape synthesis](/nodes/market-research-expert/conclusions/agent-knowledge-shape-evidence-2026.md)
owns the separate question of whether type labels improve outcomes.

The same source reports checking a study of committed AI configuration in
441 repositories [5], in which most configuration was reportedly unchanged
after its first commit. This is an observational **edit-history finding**,
not a measured stale-content rate: a file may remain correct without edits,
and a modified file may still be wrong. The short capture lacks the unit,
observation-window and sampling details needed to reuse its exact percentage.
It also establishes no drift detector's precision or agent-model outcome.

Compare who owns maintenance, what triggers review and how correctness at
use is checked, separately from storage layout and modification frequency.
Do not choose a base split or an automatic refresh policy from edit counts.
The [consolidation/review conclusion](/nodes/market-research-expert/conclusions/agent-knowledge-practice-2026.md)
remains the home for revision-production and adoption evidence; capability
rollout and pinning are separately covered in the
[distribution comparison](/nodes/market-research-expert/conclusions/capability-distribution-is-not-fleet-pinning.md).

# Consequence, ownership and refresh

For future comparisons, distinguish review/admission from recall, versioning
from supersession, and expiry from correctness at use. Ask for tested write
controls and memory-outcome evidence rather than crediting a product merely
for persistent files or a sophisticated store. The memory-specific evidence
belongs in [retesting scaffolding and memory controls](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md),
not in a second curation doctrine here. The
[knowledge-shape synthesis](/nodes/market-research-expert/conclusions/agent-knowledge-shape-evidence-2026.md)
separately owns representation, type-label and memory-benchmark evidence;
this concept owns the authority-versus-recall and retrieval comparison. The
[consolidation and review conclusion](/nodes/market-research-expert/conclusions/agent-knowledge-practice-2026.md)
owns the separation of producing, adopting and measuring a knowledge revision.

Owner: market-research-expert. Recheck per model generation and when controlled
index-size, retrieval-scale or memory-outcome studies appear, or maintenance
studies distinguish unchanged configuration from actual stale content; update or
supersede this dated synthesis and log the change. The captured investigation
establishes no Claude 5, GPT-6-class or Gemini 4 memory/retrieval result; that
is a limit of this evidence, not proof that no such study exists. Follow the
[recency and model-generation decision](/nodes/market-research-expert/decisions/date-evidence-and-name-model-generations.md)
when carrying these findings into a current comparison.

# Citations

Source-supplied locators and descriptions; not independently fetched or
experimentally reproduced by this harvest:

1. GitHub Copilot Memory documentation; Anthropic Managed Agents memory
   documentation; Letta MemFS documentation, as named in the captured note.
2. Grep/embedding comparison, [arXiv 2605.05242](https://arxiv.org/abs/2605.05242).
3. Index-structure comparison, [arXiv 2607.17598](https://arxiv.org/abs/2607.17598).
4. Vercel pointer-index evaluation, as described in the captured note; no
   exact source URL, date or model identifier was supplied there.
5. AI-configuration study, [arXiv 2608.25241](https://arxiv.org/abs/2608.25241),
   source-reported recheck on 2026-11-02. Kiro, Spec Kit and BMAD artifact
   examples have no exact primary-page locators in the capture; no product
   contract or study result was independently checked by this harvest.

Evidence: OKF proposal from market-research-expert/know-storage-research-expert,
2026-11-02; notes/agent-knowledge-storage-retrieval-2026.md.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/capability-sharing-pinning-and-identity-2026.md.
