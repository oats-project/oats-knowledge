---
type: Lesson
title: Profile a slow read's waits before designing concurrency
description: Before specifying parallel reads, lanes or extra reader processes, obtain child invocation counts and wall times so an architectural comparison does not hide the wait that dominates the workload.
about: [workstream/coordination]
kind: lesson
id: ins-87c7950cd453
tags: [planning, performance, profiling, concurrency]
timestamp: 2026-10-29
---
# Attribution before architecture

When a read becomes cheaper in CPU but not faster in wall time, a comparison
between a sequential warm reader and parallel CLI calls can make concurrency
look like the next requirement. That comparison does not explain what either
implementation waits on. Before specifying parallel reads, lanes or extra
processes, ask for a profile of the representative workload: each child
invocation, its count and wall time, alongside the end-to-end read time.

Use that attribution to choose what to investigate first. A dominant external
wait can make a concurrency design an expensive answer to a smaller problem.
Compare the remaining benefit with the memory cost and any contract change
only after identifying that wait. This is not a blanket rejection of
concurrency, nor permission to remove a call or cache its answer merely
because it is expensive.

# What changed the lead's plan

In the source's 2026-10-29 follow-up to the CLI-cost evaluation, the warm
reader reportedly halved CPU but still took about a second per poll tick.
The architecture comparison suggested lanes, multiple readers or a combined
request. A profile instead attributed roughly 700 ms of the tick to one
`gh api user` network call in workspace status.

With a stand-in `gh` returning the same reported answer without that wait,
the reader tick fell from 1034 ms to about 250 ms, compared with 483 ms for
the CLI. The tested parallel variants added only about 40–70 ms of savings
once that wait was absent, while adding memory cost and requiring a contract
change. Those observations changed which problem was worth designing for;
the profile supplied the cause that comparing architectures alone had not.

The stand-in is an attribution control, not a production fix. Matching the
answer in that experiment does not establish a safe replacement, cache
freshness policy or equivalent behavior across errors and account changes.
The timings are source-reported results from 11 interleaved runs on one
deployment, not cross-host budgets or guaranteed delivered gains.

# Canonical boundaries and prevention

The kernel's [unchanged-child-waits lesson](/nodes/oats-kernel-expert/lessons/kernel-rewrite-does-not-remove-child-waits.md)
owns the performance attribution finding and the bound on language-rewrite
gains. This lesson owns the lead's ordering of evidence before a concurrency
spec, not a second kernel optimization record. The Desktop node owns the
[phase-measurement method](/nodes/oats-desktop-expert/lessons/measure-spawn-latency-without-spawning.md).
The maintainer's [app-owned-reader decision](/nodes/oats-maintainer/decisions/no-cli-rewrite-app-owned-reader.md)
still owns the direction and contract boundary; these measurements do not
approve a protocol change or supersede that decision.

[Comparing a leaning with alternatives](/nodes/oats-expert/lessons/compare-a-leaning-with-alternatives-before-specifying.md)
remains useful, but a performance comparison needs causal attribution too:
an alternative can win without identifying the cost a proposed design is
meant to remove.

Prefer maintained child/phase instrumentation and bounded repeatable
benchmarks to a one-off profile. Carry the chosen optimization's behavior,
freshness and failure cases into executable checks. Specification guidance
should require cost attribution before choosing a concurrency shape. These
are prevention routes for their owners, not claims that instrumentation,
tests or a fix have shipped; this harvest changes no skill or code.

For the subsequent before/after report,
[measure cached gains through the real client and across expiry](/nodes/oats-expert/lessons/measure-cached-gains-through-the-client-past-expiry.md)
so the result includes client-side work, expiry refreshes and fallback counts,
not only the warm path whose cost the profile helped explain.

# Evidence

Evidence: OKF proposal from oats-expert/app-owned-reader-expert, 2026-10-29; notes/poll-wall-time-is-one-network-call.md.

The proposal identifies the follow-up investigation on
[awebai/oats#1630](https://github.com/awebai/oats/issues/1630). This harvest
verified the captured note's hash but did not rerun benchmarks or inspect
the implementation or separate spike report. Preserve the planning
conclusion and its measured scope, not the current child-call inventory or
an assertion that a network optimization has been accepted or delivered.

Checked by the knowledge maintainer at review on 2026-10-29:
[#1650](https://github.com/awebai/oats/pull/1650)'s body reports the warm
reader halving tick CPU with wall time unchanged, because it answers the
tick's two reads in turn, and names a second lane as a possible design.
[Comment 6500978620](https://github.com/awebai/oats/issues/1630#issuecomment-6500978620)
on #1630 attributes about 650–700 ms of wall time per tick to that one login
call, and it also reports 11 interleaved runs. That comment measures a
separately proposed login-reuse change, not the stand-in. The stand-in
figures above (1034, 483 and 40–70 ms) do not appear in either record and
remain source-reported. The change it proposes awaits the other maintainer
side's answer there, and this lesson does not record that change as accepted.
