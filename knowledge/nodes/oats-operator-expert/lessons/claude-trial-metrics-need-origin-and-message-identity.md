---
type: Lesson
title: Claude trial metrics need run, origin and message identity
description: Claude trial measurements need run, origin and message identity, with per-command timing evidence retained before teardown rather than attributing whole-turn duration to component owners.
about: [workstream/operations]
kind: lesson
id: ins-c1322b3cbc58
tags: [operator, trials, measurement, claude, transcripts]
timestamp: 2026-11-03
---
# Select the run before counting its entries

A second 2026-11-02 trial investigation reported inflated usage after scratch
deployments were purged and recreated at the same paths. Claude's
path-keyed transcript storage still contained sessions from the earlier
runs. Reusing the home path did not reset the measurement population; even
a correct per-message counter could include work from another incarnation.

The source's working filter used a deployment-creation marker recorded by
the trial and included only sessions whose first top-level transcript
`timestamp` was after that boundary. A nested timestamp was not the session
start: the parser read until it found the first top-level timestamp. Record
the run boundary when creating the trial, rather than inferring it from a
reused directory name or treating every session there as current work.

This filter is the reported remedy for fresh-run measurements, not a
complete attribution rule for sessions resumed across the boundary. Missing
or ambiguous start times need an explicit unsupported result, not silent
inclusion. The report does not validate billing totals or establish an
exact over-counting factor.

# Avoid two biased counters

A trial that counts every transcript user entry as a new input turn can
count tool results as turns. Filtering out all metadata entries instead
can omit channel-driven turns. The source's Claude Code 2.1.308 smoke-run
inspection found a useful distinction:

- A turn-start user entry carried `origin`; tool-result user entries did
  not.
- TASK input, `oats session input` and scheduled wakes appeared with
  `origin.kind: human`.
- aweb pushes appeared with `origin.kind: channel` and `isMeta: true`.
  Excluding `isMeta` entries therefore lost the channel inputs.

For this observed format, distinguish inputs by their recorded origin rather
than user-role count or a metadata exclusion. **The label `human` is not
proof that a person typed the input**: the same label represented automated
terminal input and scheduled wakes in the reported runs. These are counts
of recorded input-turn starts, not completed tasks, correctness or delivery
acknowledgements.

Usage repeated across streamed entries for the same `message.id`. Counting
each entry separately would inflate reported usage; aggregate at message
identity rather than summing every repeated entry. The note does not
establish how to reconcile conflicting usage snapshots, missing identifiers
or resumed/compacted histories, so those cases remain unqualified.

The source also observed `system/turn_duration` as an active-time signal.
Keep it distinct from elapsed trial time and queueing delays; the report
does not establish it as a billing or end-to-end latency contract.

# Preserve command timing before teardown

The onboarding campaign's 2026-11-02 warm run recorded person inputs and
screen output, but not the per-tool timing evidence needed for an owner-by-owner
latency split. Its report assigned a combined onboarding-and-spawn interval
to components even though the interval included model time. The source
reports correcting that attribution: screen redraws and whole-turn counters
could bound a turn but could not separate command execution from reasoning
around it. The proposal reports later runs retaining per-command evidence;
their exact totals have not been independently checked.

A measured disposable run must preserve the evidence needed for its intended
breakdown before destroying the machine. The source recommends retaining the
harness's tool-call/result timestamps and timing the provider commands
explicitly. Keep component command durations distinct from model time and
end-to-end elapsed time. A tool-call/result interval may include dispatch or
other overhead; it is not automatically pure component execution time.
Without the finer-grained evidence, report the owner split as unavailable
rather than allocating a whole turn to the components whose names appear in
it. Destruction of the only retained timing record cannot be repaired by
reading the implementation later.

This is evidence-retention judgment, not permission to collect other
instances' transcripts or publish raw session content. Retain only authorized
trial evidence in its appropriate protected location, not in the knowledge
base.

# Make measurement reproducible

The elimination route is a version-qualified parser with sanitized fixtures
for human-labelled input, scheduled input, channel metadata, tool results
and repeated streaming usage. Add fixtures for old and new sessions sharing
a recreated home path, nested timestamps preceding the first top-level one,
and missing or boundary-spanning session starts. Assert both session
membership and the intended input/message counts; flag unsupported shapes
instead of silently assigning comparable numbers.
For timing, have the trial runner collect command start/end records and check
that the intended run's required evidence has been exported and is readable
before teardown. Test missing timestamps, incomplete calls and the refusal to
produce owner totals from turn-only evidence. These are proposed prevention
routes, not a delivered collector or a verified reconstruction of this
campaign. Requalify the parser when the transcript format changes. Exact
schema maintenance belongs in that parser and its tests, not in this lesson.

This is operator measurement judgment for comparing trials, not a new kernel
activity contract or permission to inspect other instances' transcripts.
The [measurement non-interference lesson](/nodes/integrations-expert/lessons/a-measurement-must-not-change-the-state-under-test.md)
remains canonical for ensuring that collecting a metric does not alter what
it measures.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-02; notes/claude-transcript-turns.md.

The entry-format observations are source-reported from Claude Code 2.1.308
smoke runs. Their original harvest read only the captured note and proposal,
not transcripts, and did not run a parser or validate token totals.

Evidence: OKF proposal from oats-operator-expert/coord-brain-knowledge-trials-expert, 2026-11-02; notes/claude-transcripts-outlive-a-recreated-deployment.md.

The incarnation-filter refinement is source-reported from repeated scratch
trials; that note does not identify the Claude Code version. Its harvest
also read only the captured evidence, not transcripts or a parser. The
2.1.308 qualifier above is not evidence of the later runs' version. No
universal transcript schema, complete cost model or result for other
harnesses is claimed.

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-03; notes/time-each-command-before-teardown.md.

The timing refinement is source-reported from the 2026-11-02/03 onboarding
campaign. The harvest read only the captured note and proposal, not a
transcript or timing collector. No exact harness version, cost correction,
component speedup or complete causal attribution is established.
