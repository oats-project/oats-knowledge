---
type: Lesson
title: Separate coordination recovery guarantees from task correctness
description: The 2026-11-02 research synthesis distinguishes ownership, recorded progress and resumable execution from evidence that an agent's result is correct, without asserting uniform protocol guarantees.
about: [workstream/positioning]
kind: lesson
id: ins-8bc7239dd345
tags: [research, coordination, distributed-systems, recovery, evaluation]
timestamp: 2026-11-02
---
# Conclusion and scope

When comparing agent-coordination systems, ask separately **what the system
can recover or coordinate** and **what establishes that the work is correct**.
A recorded successful step or a terminal task state is not independent
validation of the result. The source's distributed-systems research makes
this distinction useful for evaluating frameworks that borrow similar names
for materially different guarantees.

This is a **source-reported research conclusion as of 2026-11-02**, not an
audit of the named products, a protocol conformance result or a measured
failure rate. It does not choose an OATS architecture.

# What the captured research supports

The note groups several mechanisms worth distinguishing in a comparison:

- **Claims and write ownership:** claims, reservations and isolated work
  areas address concurrent access. Their existence alone does not establish
  safe ownership transfer or prevent incompatible changes to an artifact.
- **External progress records:** the source reports that Anthropic's
  long-running harness uses progress artifacts and Git to support fresh
  sessions [1]. Retaining progress is distinct from checking a reported
  completion; the same account describes premature completion claims.
- **Durable execution:** Temporal, Restate and DBOS are cited for recording
  execution steps, while LangGraph and Microsoft Agent Framework are cited
  for boundary-based resumption [2]. The capture does not establish identical
  replay boundaries or external-side-effect guarantees across these systems.
- **Explicit task states:** the source reports task-state, cancellation and
  delivery behavior in A2A [3]. A transport or task protocol describes
  coordination progress, not the semantic validity of the delivered work.

The comparison lesson is to inspect the guarantee behind each mechanism,
not to infer equivalent behavior from a shared label. In particular, do not
infer exactly-once external effects, reproducible model outputs or
semantically correct merges merely from the presence of durable execution,
a log or a coordination protocol. The proposal's categorical rejection of
consensus, deterministic replay and CRDTs is not retained: the captured note
does not show that these techniques cannot help within a defined scope.

The accepted [independent-verification lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the builder/checker implications. The [scaffolding lesson](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md)
owns the distinction between persistent files and demonstrated learning.
This concept adds the research comparison boundary between execution recovery
and task validity, rather than duplicating those conclusions.

# Recency refinement: renewal is not evidence of progress

A later proposal from the same source reports rechecking **Beads v1.3.0
release notes**, dated 2026-09-15, on 2026-11-02 [4]. It describes expiring
claims renewed by heartbeat, reclaim/unclaim operations and conditional
updates to assignment or status. This is a **source-reported release-note
reading**, not a tested lease contract. The capture retains neither an exact
release-page locator nor enough implementation detail to establish safe
ownership transfer, fencing or the behavior of a stale claimant.

This adds a reported implementation lead to the earlier mechanism comparison;
it does not correct an accepted assertion that expiring claims were unbuilt.
A heartbeat renewal indicates that something can still renew the claim, not
that useful work advanced. Compare **claim validity, renewal/liveness,
artifact-level progress and result correctness** separately. Reclamation
also raises a distinct question: what prevents a previous claimant from
continuing to affect the artifact after ownership changes? Neither expiry
nor a conditional metadata update alone answers that enforcement question.

The report does not establish progress-based renewal, a measured reduction
in stalled work or that fencing exists only in small projects. Any selected
ownership-transfer design needs enforcement and stale-writer tests in the
owning implementation; this research is not an OATS lease specification.

# Compaction: summary omission is not instruction violation

A verification pass dated **2026-11-02** supplies a narrower reading of
arXiv 2610.31778v1 [5]. Its SWE-chat analysis covered **44 Claude Code
sessions and 269 constraints**, judged by LLMs, chiefly Sonnet 5, against
**the next compaction summary**. The source reports omission rates of
35.9% for process constraints, 36.8% for scope exclusions and 6.2% for
features, with Wilson 95% intervals of 23–52%, 19–59% and 3–13%, respectively.
These are shares absent from that summary, **not observed violation rates**.
The session agent models are unstated; do not infer them from the judge or
the product name. These are source-reported readings, not harvest replication.

The paper's Opus 4.6 versus GPT-5.3-Codex comparison and growth over repeated
rounds belong to a **separate ProgramBench/OpenCode experiment on three
anti-cheating rules**. Do not assign those models or repeated-round results
to the SWE-chat population. This capture does not establish a newer-model
retention result or a measured fresh-restart advantage over compaction.

The same source reports reading Claude Code's context-window documentation
[6]: root CLAUDE.md, unscoped rules, auto memory and the plan-mode plan are
re-injected from disk after compaction; invoked skill bodies are re-injected
subject to caps. Path-scoped rules and nested CLAUDE.md are instead summarized.
This is a dated documentation reading, not a runtime test or a guarantee that
reloaded instructions are followed.

For recovery evaluation, distinguish **summary retention, disk re-injection
and subsequent compliance**. Do not apply the study's omission percentages to
all file-backed rules, or treat them as measured rates specifically for
path-scoped files: the capture provides no storage-location breakdown. The
reported mechanism motivates testing placement of essential rules in
re-injected files rather than conversation-only state; it does not prove that
placement prevents violations. Enforce machine-checkable constraints in
permissions and executable tests instead of relying solely on remembered
instructions. General model-dependent retesting remains in the
[scaffolding lesson](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md).
The [topology lesson](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns the separate coordinator-span gap; retention loss determines neither a
safe effort count nor a mandatory respawn policy.

# Limits and refresh

The harvest inspected the captured notes, not the primary documentation or
working report. Apart from the attributed Beads release identifier above,
protocol versions, integration availability, fencing support and cross-product
contract equivalence are not established here.
The initial note supplies no comparative conflict, duplicate-handoff or
restart-versus-compaction measurements; the later compaction study does not
supply the restart comparison either. It also does not substantiate its
claim that wrong output reported as success is the dominant failure class;
that ranking is not promoted.

**Owner and recheck:** market-research-expert. Recheck when version-specific
primary contracts or controlled coordination/recovery trials establish these
guarantees and outcome measures, progress-based renewal and stale-claimant
enforcement are documented and tested, or controlled compaction/restart
studies and changed re-injection contracts connect retention to compliance
on named models. Update or supersede this conclusion and log the change.
Framework changes and OATS operating decisions require
their owners' separate review; this research grants no implementation authority.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. Anthropic, long-running-agent harness account, 2025-11-26.
2. Temporal integration reporting, 2026-03-23 and 2026-10-30; Restate, DBOS,
   LangGraph and Microsoft Agent Framework durable-execution/resumption
   documentation, as identified in the captured note. These broad locators
   support attribution, not an implementation or availability claim.
3. A2A task-state, cancellation and webhook-delivery specification, as
   characterized by the source on 2026-11-02; no version-specific guarantee
   is certified here.
4. Beads v1.3.0 release notes, dated 2026-09-15 by the recency source;
   source-reported recheck on 2026-11-02. Exact release-page locator absent
   from the captured proposal and note; no behavior reproduced here.
5. [Compaction study, arXiv 2610.31778v1](https://arxiv.org/html/2610.31778v1),
   dated 2026-10-22 by the source; section 4.2 reportedly checked in raw HTML
   on 2026-11-02. No primary page was fetched by this harvest.
6. [Claude Code context window](https://code.claude.com/docs/en/context-window),
   source-reported reading on 2026-11-02; product behavior not tested here.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/distributed-systems-primitives-that-map-to-agents.md.

Renewal/progress refinement:

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/recency-refinements-memory-relay-claims-2026.md.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/coordinator-span-is-unmeasured-state-not-headcount.md.

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/compaction-loss-applies-to-conversation-only-rules.md.
