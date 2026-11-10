---
type: Conclusion
title: Multi-domain planning practice does not establish an authorship winner
description: The 2026-11-02/03 investigation distinguishes plan authorship, interface ownership, integration and verifiable review from feedback-only revision without establishing a software planning winner.
about: [workstream/positioning]
kind: finding
id: ins-6bbc6c6cff59
tags: [research, planning, contracts, coordination, uncertainty]
timestamp: 2026-11-03
---
# Dated conclusion

The **2026-11-02** investigation proposes a pattern for cross-area features:
one author holds the affected areas in context and writes an integrated plan,
including scope, interfaces and merge order; domain owners review it; local
specifications elaborate it. This is a **source-reported practice synthesis
and candidate design**, not a measured winning planning topology or a
universal description of current practice.

The round-5 verification pass adds a documented federated alternative to
that integrated-plan candidate: the source reports that Spec Kit documents
**per-project planning joined by interface contracts**, without a shared
implementation plan [6]. That is a federated pattern, not
an example of a coordinator agent assembling the local plans. This
investigation still supplies no matched software study comparing whole-plan
authorship with per-area planners plus a coordinator. It does supply an
older robotics analogue, bounded below. None of these search findings is a
literature census. Plan authorship, implementation parallelism and approval
authority remain separate variables.

# Contract ownership is more specific than a single-author label

The initial reading of Spec Kit discussion #4465 and issue #4609 [1]
emphasized an optional umbrella specification, contract-version pinning and
contract/provider/consumer merge order. The round-5 source reports reading
the published *Contract-Driven Development* guide and its Git history [6],
identifying publication on **2026-09-17**, commit `aaa8fa9247`, PR #4616.
That guide reading replaces the discussion-derived umbrella framing for this
planning comparison:

- Each project owns its own specification, plan and tasks; there is no shared
  implementation plan and no required umbrella repository.
- Each interface contract has one owner, usually its provider. The owner
  drafts it during planning and reviews it with consumers. A project can
  own one interface and consume another.
- Implementation can expose a contract problem that requires revising the
  authoritative agreement; interface decisions are not necessarily final
  when the first plan is written.

This is **source-reported first-party guidance**, not measured integration
success, automatic synchronization or an enforcement audit. A contract joins
the local plans; it is not itself a coordinator agent, and the guide reading
does not establish a standing agent architecture owner. Keep **integrated-plan
authorship**, **local-plan authorship**, **interface ownership** and
**consumer agreement** distinct.

A separate round-4 survey, also dated **2026-11-02** [5], reports the
integrated-plan pattern across products. A main session, lead or coordinator writes the
cross-area plan, and delegated agents plan the slices assigned to them. The
source names Anthropic, OpenAI, Cursor, GitHub, Google, Devin, Factory, Kiro
and Augment, but its note keeps no primary page for each product. Treat the
survey as corroborating source-reported practice. It is not a complete
census, not a verified common contract and not proof that domain agents never
co-author a plan. Its Spec Kit guide lead lacked a locator/version; the
round-5 reading above supplies repository provenance and corrects any
inference that this federated example requires one integrated-plan author.
Several local plans under one contract are not evidence that several agents
wrote one plan together. Conversely, one integrated-plan author does not mean
there is only one planning artifact.

The source also describes an Abnormal AI engineering account, dated
2026-03-02, in which an agent drafts the whole design and domain teams supply
constraints and approve [2]. It supplies no baseline, measured model or
outcome comparison. That account is a practice lead, not evidence that owner
review or single authorship caused better results. Older RFC/KEP process
analogies likewise cannot establish an agent-planning outcome.

# Seam studies motivate contract checks, not an authorship verdict

Keep these source-reported readings separate:

- **CooperBench, arXiv 2601.13295v2**, dated 2026-01-26 in the verification
  note [3]: the source identifies **GPT-5, Sonnet 4.5, MiniMax-M2 and
  Qwen3-30B**, using **OpenHands v0.54**. Two peers each implement a different
  feature from their own supplied plan, on separate branches followed by a
  Git merge. The earlier reading reports lower peer success and communication
  reducing merge conflicts without resolving broader failures. The round-5
  reading identifies **no specification, planner or coordinator intervention
  arm**. It therefore supplies no explicit-specification cure or comparison
  of who should author a plan. Do not apply a GPT-5/Sonnet 4.5 headline to all
  four models.
- **The Specification Gap, arXiv 2603.24284v1**, dated 2026-03-25 [4]: the
  round-5 note identifies **Claude Sonnet 4 (20250514)** and **Haiku 4.5
  (20251001)**, 51 ClassEval classes, and a constructed split condition with
  opposing list/dictionary biases, no communication and temperature 0.7,
  compared with single-agent temperature 0. The source reports a split-agent
  deficit **even with the full specification**. The reported recovery used
  **one merger agent given both implementations and the full specification**;
  it was not simply restored detail given to the same split implementers.
  Conflict reports added no benefit in that setting. This corrects the
  earlier ambiguous recovery description, not a claim that every failure was
  fixed. Bias, sampling and integration changes prevent attributing the
  difference to split ownership alone.

Both accounts concern work **within one repository**, not a multi-service
or cross-repository planning trial. The capture still lacks complete scoring,
per-model results and uncertainty analysis, so no numerical effect sizes or
current-frontier result are adopted. Neither compares one plan author against
per-area planners plus a coordinator. Full-specification availability and a
single spec-informed integration step are different interventions; neither
an exclusive remedy nor a universal single-integrator advantage follows.

The separate [WideSWE account](/nodes/market-research-expert/limitations/cross-repo-architecture-ownership-evidence-gap.md)
owns cross-repository execution findings; it has no planner/coordinator arm.
The [topology lesson](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns task, budget and intervention controls and other seam studies. Do not
pool these different experiments into one causal result about split ownership.

# A robotics analogue does not close the software-planning gap

The round-5 source identifies **HMAS-2**, Chen et al., ICRA 2024,
**arXiv 2309.15943v2**, using **gpt-4-0613** [7]. A central planner drafts a
plan and local agents provide feedback. The source reports that HMAS-2
outperformed centralized, decentralized and HMAS-1 designs on four 2D
multi-robot tasks. This is a measured analogue for central drafting with local
feedback, not a software trial of per-section domain review or a controlled
isolation of author count. The short capture supplies no full methods or
uncertainty analysis for transferring its ranking.

It is the comparison this investigation found, not demonstrably the only one
in the literature. Its 2023 model and robotics setting leave transfer to
current software agents unconfirmed. The missing software comparison remains
a search-bounded gap, not proof of no benefit or permission to call a proposed
review pattern unique.

# Verification and feedback-only revision are different interventions

A **2026-11-03** source-reported reading of Agachan et al., arXiv
2609.14767 [8], describes an open-ended business-intelligence reporting
comparison with **43 pairs, 86 runs**. Flat teams reportedly scored higher
than a manager arrangement that sent work back for revision. The source
reports the paper's conclusion as conditional: authority helped when the
manager could verify the work, but feedback-only authority reduced quality
in its reported setting. The short capture gives no model identifiers,
complete scoring protocol or uncertainty analysis. The pair/run counts
bound the report, not a transferable effect size or proof that verification
was the only differing variable.

This is an analogue for reviewing a plan, **not a software plan-review
experiment**. It motivates asking what the reviewer can actually verify
before citing a checker-versus-reviser shorthand as support for folding
feedback into a plan. It does not establish that plan feedback always hurts,
that flat teams are generally better, or that a verifier role alone creates
reliable evidence. The
[independent-verification lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the broader evidence and acceptance-criteria distinction.

Likewise, the follow-up Destefanis and Aste reading remains in its canonical
[topology account](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md):
coverage of both sides of an interface is not interchangeable with a
third-party contract-owner label. Check that intervention match before using
seam ownership to justify a planning design. Neither reading overturns the
bounded HMAS-2 analogue or settles the missing software-authorship comparison.

# Consequence for research, not a new approval policy

When asked who should plan cross-area work, present the integrated-plan
candidate and Spec Kit's federated contract pattern separately, and state what
remains unmeasured. Compare plan authorship and affected-area context
separately from contract ownership, review, execution topology, integration
and budget. A spec-informed integration owner plus runnable cross-area checks
is a candidate to evaluate, not a proven general cure from these studies.
A proposed contract gate needs executable integration checks in its owning
implementation; a plan or an ownership label is not behavioral verification.
Do not relabel experts writing local specifications as the constructed split
implementation condition: those are different interventions.

Automatic teammate-plan approval already has a qualified canonical account
in [question routing and approval authority](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md).
Do not shorten conditional product behavior to a universal auto-approval
default, or infer human consent from agent approval. The source's proposed
human plan gate and prohibition on auto-approving local plans are not adopted
here. The [human-oversight conclusion](/nodes/market-research-expert/conclusions/human-oversight-evidence-2026.md)
owns review-timing hypotheses; none of this evidence selects an OATS planner,
changes the domain roster or supersedes an accepted review decision.

# Recency pass, 2026-11-02

- **Changed:** the September 2026 Spec Kit guide reading replaces the
  umbrella-centered interpretation with federated local planning. The
  Specification Gap reading now separates the full-specification split
  deficit from recovery by one spec-informed merger; exact models are named.
- **Held:** task/budget and approval-authority distinctions remain necessary.
  The related WideSWE account still has no planning-intervention arm, and its
  earlier headline-score discrepancy remains unresolved.
- **New:** the CooperBench configuration and intervention boundary, and the
  older HMAS-2 robotics analogue. The captured software studies do not test
  the proposal's named newer models, Opus 5.5 or GPT-6; this is not a claim
  that no evidence exists elsewhere. No matched software-authorship or
  controlled repository-layout comparison was found in this investigation.

# Recency pass, 2026-11-03

- **Changed:** comparisons must distinguish verifiable review from
  feedback-only revision and test whether a cited seam owner covers both
  sides of the interface, rather than merely carrying an owner title.
- **Held:** no software-authorship winner follows. The Specification Gap
  merger distinction remains unchanged; its repeated confirmation is not
  a new experiment or a newly established recovery percentage.
- **New:** the Agachan reporting-task analogue and the linked named-coordinator
  qualification. Models are unstated in this follow-up capture, so no
  current-generation transfer or replication is established.

**Owner and refresh:** market-research-expert. Recheck on a documented
federated-planning deployment, a matched planner/coordinator trial, exact
model identification or newer-model replication, revised Spec Kit
contract guidance, or versioned primary contracts that document
co-authorship, local-plan and interface-agreement boundaries. Recheck the
feedback-revision analogue on a matched, model-identified software review
trial with explicit verification access and scoring. Update or supersede
this dated conclusion and log the change; do not silently turn a practice
synthesis or search gap into policy.

# Citations

Source-supplied locators and descriptions. These refinements use captured
proposals and named notes, not primary pages or experimental artifacts; the
reported readings are not independent harvest verification.

1. GitHub Spec Kit, [discussion #4465](https://github.com/github/spec-kit/discussions/4465)
   (answer dated 2026-09-09 by the source) and
   [issue #4609](https://github.com/github/spec-kit/issues/4609)
   (dated 2026-09-16 by the source). Contract guidance and its status are
   source-reported, not an enforcement audit.
2. Abnormal AI engineering post, dated 2026-03-02 by the source; exact title,
   page locator and measured model absent from the capture.
3. [CooperBench, arXiv 2601.13295v2](https://arxiv.org/html/2601.13295v2),
   raw-HTML reading reported on 2026-11-02. The source says the paper does not
   state its venue, so the earlier ICLR attribution is not retained as
   established publication status.
4. [The Specification Gap, arXiv 2603.24284v1](https://arxiv.org/html/2603.24284v1),
   raw-HTML reading reported on 2026-11-02; date and model identifiers above
   are source-supplied.
5. Round-4 product survey, named by the source on 2026-11-02; no per-vendor
   primary-page inventory is retained. Its then-unlocated Spec Kit guide lead
   is refined by [6], not independent outcome corroboration.
6. GitHub Spec Kit, *Contract-Driven Development* guide; the source identifies
   [commit aaa8fa9247](https://github.com/github/spec-kit/commit/aaa8fa9247)
   and [PR #4616](https://github.com/github/spec-kit/pull/4616), publication
   2026-09-17, and reports checking the guide and Git history on 2026-11-02.
   These are source-supplied repository locators, not an independently fetched
   guide page or verified publication date from this harvest.
7. Chen et al., [arXiv 2309.15943v2](https://arxiv.org/html/2309.15943v2),
   identified by the source as ICRA 2024; raw-HTML reading reported on
   2026-11-02. HMAS-2's model, task setting and comparison are source-reported,
   not a harvest replication.
8. Agachan et al., [arXiv 2609.14767](https://arxiv.org/abs/2609.14767),
   abstract-page reading reported on 2026-11-03. Task, sample and conditional
   quality direction are source-reported; no primary page or experiment was
   independently checked by this harvest.

Evidence: OKF proposal from market-research-expert/coord-practice-research-expert,
2026-11-02; notes/multi-domain-plan-authorship-2026.md.

Evidence for the round-4 product survey: OKF proposal from
market-research-expert/coord-frontier-research-expert, 2026-11-02;
notes/one-plan-author-per-area-specs.md.

Evidence for the round-5 corrections and robotics analogue: OKF proposal from
market-research-expert/coord-claims-verification-expert, 2026-11-02;
notes/spec-kit-contract-guide-is-federated-planning.md;
notes/split-implementation-tax-survives-full-spec.md.

Evidence: OKF proposal from market-research-expert/study-design-opus-expert,
2026-11-03; notes/cited-sources-cut-against-section-review.md.
