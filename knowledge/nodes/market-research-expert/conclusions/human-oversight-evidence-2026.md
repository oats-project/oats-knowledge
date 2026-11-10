---
type: Conclusion
title: Attention is an oversight risk, not a measured universal agent limit
description: The 2026-11-02 research motivates testing oversight timing, reviewer context and agent influence separately, without establishing a best merge gate, sustainable human capacity or downstream quality.
about: [workstream/positioning]
kind: finding
id: ins-17f724dd36a0
tags: [human-oversight, coordination, research, uncertainty]
timestamp: 2026-11-02
---
# Dated conclusion

The source's 2026-11-02 investigation identifies human attention as a likely
constraint worth testing, not as the proven binding constraint in every
agent workflow. It reports high manual-permission acceptance, increasing
auto-approval with experience, reduced inline review activity and reviewer
abandonment of some agent PRs [1–4]. Those observations motivate concern
about approval habituation; they do not by themselves establish its cause,
the safety of automatic approval or a universal number of agents per human.
The reading of the auto-mode report [1] as prompt acceptance that is not
informed consent has its canonical home in
[separate supervision product patterns from measured human outcomes](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md);
this conclusion adds the habituation concern and the review-burden findings.

The resulting design hypothesis is to concentrate meaningful human decisions
at plan approval and irreversible outcomes instead of treating frequent
low-information prompts as proof of oversight. This is a research hypothesis
for comparison, **not permission to remove existing authorization, safety or
review gates**. The [coordination-practice conclusion](/nodes/market-research-expert/conclusions/coordination-practice-2026.md)
owns the related artifact-ownership and fresh-verifier synthesis.

A future market comparison should keep human attention and review burden
visible rather than infer quality from prompt acceptance or task throughput.
The source's session-count anecdotes are not a capacity specification, and
PR-review observations do not establish the defect or revert rate of merged
agent changes.

# A human gate does not automatically supply independent judgment

A later source-reported reading adds a direct challenge to the selective-gate
hypothesis's assumption of an independent plan approver. Anthropic's report
of 2026-10-27 [5] is described as a randomized study of a statistical advisory
task: 61 analysts were recruited, 11 declined to use the agent and were
excluded, leaving 50 in the analysis. The model was Opus 4.8 at High effort
in Claude Code. The source reports that analysts agreed with the agent's
randomly assigned lean 86% of the time. It also reports frequent repetition
of the agent's arguments and low explicit attribution to the agent.

The 86% is the report's agreement figure for this selected study population,
not a coding-review error rate, a count of defective approvals or a measure
of plan-gate effectiveness. The capture does not retain uncertainty estimates
or enough detail to interpret the exact attribution percentage separately,
so that percentage is not reproduced. This is one vendor-run study on data
analysis, not a code-review trial or independent replication. The proposer
reports reading the primary page; its tool returned model summaries, and
this harvest inspected only the captured note and proposal.

For comparisons of human oversight, distinguish **having a decision point**
from **the approver exercising independent judgment**. Evaluate agent framing
and recommendation effects rather than assume that moving approval to a
plan restores independence. The study motivates that evaluation; it neither
proves every human checker is steered nor identifies the best gate design.
It does not authorize removal of existing human approvals. The
[verifier-evidence lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the related but distinct issue of independence among model reviewers.

# Recency refinement: within-session attention

A further captured note from the same source, also dated 2026-11-02, reports
that newer vendor auto-mode accounts [6] describe declining human detection
of dangerous commands over a session and more rejection of plans than of
individual actions. This adds a **source-reported within-session observation**
to the earlier habituation hypothesis, not an independently replicated
fatigue effect or evidence that plan gates guarantee safety. The measured
model is **unstated**; the production model family cannot establish it.

The capture does not retain the experimental protocol, task mix or enough
context to compare cohorts with the March account. It therefore does not
establish a numerical trend across releases or supersede a published rate
here: the earlier harvest deliberately retained no exact rate. Evaluate
attention over the session and decision granularity, not aggregate approval
alone, while keeping classifier misses and downstream outcomes in scope.
The newer note establishes no fresh classifier false-negative estimate.

# Refinement: peak concurrency is not sustainable supervisory capacity

The organisation-scale research pass of **2026-11-02** reports that a
ParallelPilot dashboard raised peak concurrent coding-agent use and throughput
without improving intervention success or perceived control [7]. A later
verification note supplies missing measurement context from its reported
reading of v1, Table 7.1: **16 Microsoft participants**, 20-minute blocks of
six tickets, a Copilot CLI/Chat baseline and a GPT-5.6-sol tool condition.
The reported peak-concurrency values are **2.31 versus 3.25**. The baseline's
model identifier and uncertainty estimates are not retained in this capture.
These are source-reported study figures, not a replication or a safe capacity
limit. The **4.00** response concerns participants' forecast of how many agents
they would feel comfortable supervising later, not observed concurrency.
The source also reports a ceiling effect.

The later note identifies Jellyfish's measure as a **30-day peak of top-level
Claude Code sessions**, with subagents invisible and light users dominating
[8]. Its OpenAI abstract reading reports **more than 10% of users managing
three or more concurrent Codex agents weekly** [9]. These are observed-use
measures, not capacity experiments; the measured models are not identified.
The Jellyfish percentage and helper-read OpenAI-staff subgroup figure are not
retained as independent quantitative findings from this capture.

**Sessions are not multi-day efforts steered through a coordinator.** None
of these captured measurements establishes that latter span. Do not combine
peak lab use, field-use reach and self-forecasts into a human limit of two
to four efforts. Vendor team-sizing advice and product concurrency allowances
also do not establish human capacity, especially when they concern an agent
lead rather than a human.

Compare active steering, asynchronous work awaiting review and artifact-review
load separately. A dashboard can increase concurrent work without improving
intervention quality; measure both rather than equating throughput with
oversight. This evidence does not settle the interface comparison, establish
PR review as every workflow's bottleneck, or demonstrate transfer to newer
models or long-running coordinator-mediated work.

# Refinement: direction checks and merge checks answer different questions

The round-4 verification pass of **2026-11-02** reports that the Claude Code
team's review account [10] recommends raising direction disagreements early
rather than first blocking a finished PR, while its automated reviewer reads
the PR's stated intent. This is a source-reported reading of a dated team
practice, not evidence that a plan-time gate improves outcomes or that a
reviewer needs every part of the builder's reasoning. The distinction between
agent review credit and human approval already lives in
[question routing and approval authority](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md).

The same pass describes abandonment and duplication, rather than unwanted
features, as the leading rejection categories in a 600-rejected-PR sample
from 2025-era agent work [4]. The reading is researcher-supplied; the capture
lacks category definitions, sampling details and measured model identities.
No percentages or population-wide ranking are retained. Even within a
rejected-PR sample, reasons for rejection do not measure direction-error
prevalence among all generated changes or the benefit of moving a gate.

For gate comparisons, separate **whether the intended change is wanted**
from **whether the implementation satisfies the authorized requirements**.
A direction objection first surfaced after implementation comes too late to
prevent the work already done; that does not make later review unnecessary.
A candidate to test is early direction review plus implementation review
against an approved specification and execution evidence, varying exposure
to the builder's explanation separately. The
[verifier-context refinement](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the evidence limits: plan blindness, author blindness and independence
from builder-controlled checks are not interchangeable interventions.

This capture establishes neither agent merge-gate accuracy nor a matched
planner-versus-approver outcome comparison, and supplies no current-frontier
judge result. Those are limits of this investigation, not proof that no such
study exists. The source proposes randomization by epic, seeded errors and
measurement of total cost per accepted, non-reverted change as candidate
evaluation elements. It supplies no full protocol or result, so these are
not a validated trial design or authorization to replace existing checks and
human merge requirements with an agent gate. The human-influence finding
above also prevents assuming that early human review restores independence.

# Unknown in this investigation, not absent from the world

The captured evidence does not settle:

- **Broker interface versus per-agent threads:** product choices do not
  establish which better preserves the human's intent and oversight. The
  [supervision lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md)
  owns this gap; this pass found the same one independently.
- **Persona roles versus function contracts at equal compute:** the reported
  role-prompt results do not settle the value of durable, curated expertise;
  see the [persona lesson](/nodes/market-research-expert/lessons/persona-labels-need-isolated-ablation.md).
- **Sustainable agents per human:** the reported pilot's peak concurrency,
  field usage and session anecdotes do not establish a general span of
  control across workloads and interfaces.
- **Defect and revert rates of agent changes:** approval and abandonment
  measures do not answer downstream quality.

Keep these as open comparisons, not claims that no relevant study exists.
The earlier proposal says a larger report supplies discriminating trials,
but its full designs are absent from the capture. The later round-4 proposal
adds only the candidate evaluation elements above; no full trial protocol is
reproduced or invented here.

This finding supports the accepted [coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
without selecting its outcome. It neither resumes the deferred
[threads design](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
nor supersedes existing interaction or review decisions.

# Evidence limits and refresh

These are source-reported readings from captured proposals and named notes;
the primary sources and full reports were not inspected by the harvests.
The earlier note mixes vendor observations, preprints, a workshop report,
a simulated user result and a small user study. Their populations and outcome
measures are not interchangeable, so its exact percentages, causal claims
and session-count limits remain excluded. That source also flags some OpenAI
dates as secondary-sourced. The later study's reported agreement figure is
retained only with its task, model and participant-selection limits above;
it is not pooled with the earlier results.

Owner: market-research-expert. Recheck on controlled evidence addressing the
unresolved comparisons, controlled gate-timing/context evaluations,
replication on newer models, or revised first-party approval guidance. Update
this dated conclusion and its log when that evidence changes the judgment;
do not convert the hypothesis into a product claim without the missing support.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. Anthropic auto mode, dated 2026-03-25 by the source.
2. Anthropic *Measuring agent autonomy*, dated 2026-02-18 by the source.
3. Agent-PR review report, [arXiv 2606.22721](https://arxiv.org/abs/2606.22721),
   characterized by the source as a workshop report.
4. Agent-PR rejection analysis, [arXiv 2601.15195](https://arxiv.org/abs/2601.15195).
5. Anthropic, [agents and judgment calls](https://anthropic.com/research/agents-judgment-calls),
   dated 2026-10-27 by the later source, reading reported on 2026-11-02.
6. Claude.com, *Auto mode is now the default in Claude Code* and *Running
   auto mode in production*, dated 2026-08-07 by the source, with the former
   updated 2026-10-22. Titles and dates are source-reported; primary pages
   and evaluation methods were not inspected by this harvest.
7. ParallelPilot, [arXiv 2609.33113v1](https://arxiv.org/html/2609.33113v1),
   dated 2026-09-27 by the verification source; Table 7.1 reportedly checked
   in raw HTML on 2026-11-02. The harvest read the captured note, not the paper.
8. Jellyfish Research Substack concurrency account, dated 2026-03-23 by the
   source; helper-read support, without an exact page locator in the capture.
9. OpenAI Codex usage paper, [arXiv 2606.26959](https://arxiv.org/abs/2606.26959),
   dated 2026-06-25 by the source; abstract reading reported on 2026-11-02,
   not independently fetched or reproduced by this harvest.
10. Claude Code team, [Solving code review at Anthropic](https://claude.dev/blog/solving-code-review-at-anthropic),
    dated 2026-10-15 by the source; direct reading reported on 2026-11-02.
    The harvest read the captured proposal and note, not the page. The
    round-4 reading of [4] came through a researcher, not a new paper check
    by the proposer or this harvest.

Evidence: OKF proposal from market-research-expert/coord-practice-research-expert,
2026-11-02; notes/human-oversight-evidence-2026.md.

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/plan-approvers-are-steered-by-agents.md.

Evidence for the recency refinement: OKF proposal from
market-research-expert/coord-practice-research-expert, 2026-11-02;
notes/oversight-fatigue-and-deference-recency.md.

Peak-concurrency refinement:

Evidence: OKF proposal from market-research-expert/coord-oversight-research-expert,
2026-11-02; notes/measured-interactive-agent-span-is-low-single-digits.md.

Measurement-definition refinement:

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/supervision-span-evidence-measures-sessions-not-efforts.md.

Gate-timing refinement:

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/plan-blind-merge-gate-loses-measured-context.md.
