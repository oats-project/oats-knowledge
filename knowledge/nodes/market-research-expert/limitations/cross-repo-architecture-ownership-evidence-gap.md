---
type: Limitation
title: Cross-repository change coordination does not establish architecture ownership
description: The 2026-11-02 investigation found cross-repository change tools but no documented standing agent architecture owner in its search, and its WideSWE reading does not measure the effect of such a role.
about: [workstream/positioning]
kind: constraint
id: ins-f1009a607385
tags: [research, architecture, cross-repository, authority, uncertainty]
timestamp: 2026-11-02
---
# Dated finding

The source's **2026-11-02** search across GitHub, Cognition, Sourcegraph,
Moderne, Augment and generic architect-agent queries did not document a
shipping agent with standing single-writer architecture responsibility or
blocking design-review authority across repositories. This is a
**search-bounded gap**, not proof that no such deployment exists. The capture names
search targets but retains neither a complete query/result inventory nor
primary contracts for all products.

The reported alternatives coordinate a change rather than establish ongoing
architecture ownership: Sourcegraph Agentic Batch Changes with human
changeset approval, Moderne Moddy with LLM planning and deterministic recipes,
Copilot projects, and Augment Intent's per-task specification. These are
source-reported product leads [1], not an audited availability register or
proof of uniform per-repository human approval. In particular, the source
marks Copilot projects' review model as unreported.

# Cross-repository task failures do not identify the missing role

The source reports checking WideSWE's HTML [2], a study of 120 cross-repository
tasks. It names **GPT-5.6-sol, Opus 5, Gemini 3.8 Flash, DeepSeek V4 Pro,
Qwen 3.8 Max and GLM 5.3**, and reports missed-scope and post-edit failures,
plus an aggregate advantage for joint over independent execution. These are
source-reported benchmark findings, not an independent replication or
transfer evidence for other generations.

The initial capture flags an inconsistency between Table 1 and the text's
headline/best-configuration success rates. A later verification note supplies
more detail on the **failure-category table**, not a resolution of that
success-score discrepancy. A further planning-practice note identifies the
joint/independent subexperiment's model and reports scores, but does not
reconcile the earlier Table 1/text conflict. The round-5 note now explicitly
identifies **RQ3** and supplies paired feature counts and request use for that
subexperiment, retained below as a separate source-reported result. This does
not resolve the earlier headline discrepancy or establish a numerical model
leaderboard.

The **2026-11-02 verification pass** reports 120 tasks mined from merged PRs,
with hidden fail-to-pass and pass-to-pass tests in each repository. Across
seven model/scaffold configurations, the reported **share of classified
failures** assigned to missed repository scope ranges from **21.33% to 37.68%**;
it is **25.64% for Opus 5 with Claude Code**. These are not percentages of all
tasks. Scope is classified at repository level, so touching the right
repositories does not prove complete coverage within them.

Post-edit failures account for approximately **59–73% of failures in six of
seven configurations**; the seventh is dominated by delivery failure. Thus
the highest scope-miss share is not a general cross-repository failure rate,
and identifying target repositories is not equivalent to producing correct
behavior. The captured table is source-reported, not independently fetched
or reproduced by this harvest. It establishes no general ranking for newer
models or production repositories.

In the separate **RQ3 comparison, 89 paired cases with Codex CLI and
GPT-5.6-sol**, the source reports opposite directions by task: independent
execution helped bug fixes and hurt features, without an aggregate advantage
over joint execution. The round-5 HTML reading on **2026-11-02** clarifies
that independent means **isolated single-repository runs given the identical
prompt**, with a full run for each repository, not agents coordinating from
separate locally authored plans.

For **60 feature cases**, that reading reports **26 successes for joint
execution versus 19 for independent execution**, with **11 versus 4**
discordant pairs in those respective directions. These are source-reported
counts in one configuration, not a significance or causal claim. The
proposal's McNemar calculation is the researcher's own analysis, not a
paper-reported result adopted here. The source also reports **3.13 times as
many API requests** for the independent condition, explaining that each
repository receives a full run. Request counts are not token or monetary
costs; the comparison does not hold total budgets equal. These RQ3 details
do not certify the separate headline/best-configuration scores.

The earlier planning-practice source reports illustrative incompatible
cross-repository assumptions. The round-5 source qualifies the paper's
recovery comparison by whether a repository was modified as **descriptive,
not causal**. Neither is a measured prevalence of contract errors or an
experiment repairing them with contracts. The capture still lacks full
configuration, scoring and uncertainty details, and the reported direct
checks are not harvest replication. This evidence is not a controlled
estimate of scope-discovery benefit or proof that independent work never helps.

The captured RQ3 account has **no planner, contract or coordinator arm**;
no dependency-map, code-search or architecture-owner intervention was tested
in this evidence. Do not equate any failure share with the causal cost of
lacking an architecture agent, or treat a pre-fan-out plan review as a measured
remedy. The [verification lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the distinction between plans and runnable evidence of correct behavior.

The supported comparison question is whether a system discovers all affected
repositories and validates changes across their boundaries, separately from
whether it can open several PRs. Neither joint execution nor human changeset
approval alone answers who owns an architecture decision over time. Scope
coverage, checking outcomes and decision authority must be evaluated
separately.

# Consequence, ownership and refresh

Treat a proposed architecture steward, pre-fan-out plan review and blocking
contract checks as **design hypotheses**, not established industry practice
or a measured solution to WideSWE failures. This research chooses no OATS
role or approval policy. The distinct
[multi-domain planning account](/nodes/market-research-expert/conclusions/multi-domain-plan-authorship-evidence-2026.md)
adds source-reported practice and contract-ownership guidance, not a
planner/coordinator comparison or a measured remedy for these failures.
A selected blocking rule needs enforcement and
runnable tests in its owning implementation, not just an agent title or
recorded approval. The existing
[topology comparison](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns task/budget controls; the
[approval-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
owns the distinction between agent review and human authorization.

**Owner:** market-research-expert. Recheck when a documented cross-repository
architecture-owner deployment supplies its decision and enforcement contract,
when WideSWE's conflicting figures are resolved, or when controlled trials
test scope checking or architecture-review roles. Update or supersede this
dated finding and log the change; do not silently turn a search gap into a
permanent market claim.

# Citations

Source-supplied locators and descriptions; these refinements use captured
proposals and named notes, not independently fetched product pages or
replicated experiments:

1. Sourcegraph Agentic Batch Changes, Moderne Moddy, Copilot projects and
   Augment Intent, as named in the source's 2026-11-02 research pass; exact
   primary-page URLs are absent from the capture.
2. [WideSWE, arXiv 2609.33382v1](https://arxiv.org/html/2609.33382v1), dated
   2026-09-27 by the source; HTML reportedly checked on 2026-11-02. The
   source-reported Table 1/text discrepancy remains unresolved here. The
   later verification source reports checking the failure-category table in
   raw HTML on the same date; this does not certify the other success scores.
   The later planning-practice source reports checking the 89-case
   joint/independent section in HTML on 2026-11-02 and supplies its model;
   its capture does not reconcile the earlier success-score discrepancy.
   The round-5 verification source identifies RQ3, the identical-prompt
   independent condition, paired feature counts and request ratio; these are
   scoped to RQ3 and do not resolve or validate the earlier headline scores.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/cross-repo-architecture-ownership-is-unshipped.md.

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/cross-repo-agent-failures-are-mostly-post-edit.md.

Evidence for the subexperiment model and scope refinement: OKF proposal from
market-research-expert/coord-practice-research-expert, 2026-11-02;
notes/multi-domain-plan-authorship-2026.md.

Evidence for the RQ3 intervention, paired-count and request-use qualification:
OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/split-implementation-tax-survives-full-spec.md.
