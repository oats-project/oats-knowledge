---
type: Lesson
title: Seeded review needs planting and catch validation
description: Post-authorship defect injection triggered tamper handling and cooperative planting varied between instances, so seeded-review comparisons need actual planted populations and validated catch stages rather than raw counts.
about: [workstream/operations]
kind: lesson
id: ins-33045c0385e3
tags: [operator, trials, review, measurement, seeds]
timestamp: 2026-11-03
---
# Injection can change the task being measured

In the source's 2026-11-02/03 campaign, rewriting a commit's index to insert
defects led authors to remove changes they had not written. Amending an
already-verified PR head prompted resets, remote disabling and escalation
about unexplained edits. Those runs measured incident handling rather than
ordinary review of an author's work. Tests written by the author could also
catch planted mutations before the intended review stage.

A trial-only confederate builder—a builder that knowingly plants the
experimental defects—was the reported working alternative. It received a
private seed card before its first commit, with trial instructions explicitly
giving the card precedence on the seeded points. This is a description of
an experimental intervention, not evidence that a card is a real human's
authorization or permission to conceal defects in ordinary work. The capture
establishes neither that every seeded-review design needs a confederate nor
that all post-authorship injection must fail. A design not dependent on seeds
remains an alternative.

# Willing planting is still a selection mechanism

Across ten counted runs, the source reports different planted-versus-carded
populations between arms. Builders sometimes refused, skipped, disclosed or
quickly removed seeds. One expert soul refused in two runs and complied in
a later run despite identical soul text. The reported difference between
expert and developer builders is therefore not a stable role capability or
an isolated effect of role naming.

Measure the seeds actually present at the relevant review point, not just
those the card requested. Report carded and planted counts per run, together
with refusals, self-removals and disclosure that changes reviewer exposure.
Credit catches only against established planted defects, and distinguish
pre-PR detection, reviewer detection, gate detection and human detection.
Raw catch totals conflate planting with review opportunity.

**Catch stages do not remove the selection bias.** They describe where
observed catches occurred conditional on the planted population. Different
seed difficulty, survival and exposure can still differ by arm. A causal
comparison needs matched opportunities and controls; neither this capture
nor a stage breakdown alone establishes which coordination design is better.

# Naming a behavior is not detecting its defect

The source's word-match attribution credited the earliest reader whose text
contained a seed's terms. In one reported case, that reader explicitly
accepted the behavior; a later gate actually rejected it. The source corrected
the attribution by hand. A term match plus eventual removal cannot establish
who caught a defect or that the first mention caused its repair.

Validate what the reader said and when: acceptance, problem identification,
request for correction and actual removal are different events. Hand-check
ambiguous earliest mentions and preserve correction reasons rather than
silently shifting credit. Do not infer detection from a private seed's name
appearing in a message.

# Elimination route and scope

Put a seed-presence ledger and review-stage evidence into the trial's
measurement design, with assertions at the points being compared. Test the
attribution tool on mentions that approve the behavior, later genuine
objections, self-removal and multiple readers. Deterministic checks can
establish presence; ambiguous semantic credit still needs adjudication.
These are proposed controls, not validated tooling from this harvest.

This is operator knowledge about constructing and interpreting an experiment,
not a replacement review policy. The research lesson on
[independent verification evidence](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the general separation of acceptance criteria from builder control;
[task and budget qualification](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns the broader comparison discipline.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-03; notes/seed-injection-tells.md; notes/confederate-builder-planting-varies.md; notes/seed-naming-word-match-limit.md.

The source reports OATS 0.69.8, Claude Code 2.1.308 and Sonnet 5.5 in the
counted trials, on one host. The harvest checked only the captured proposal
and notes, not cards, patches, transcripts or per-run ledgers. Early runs
with unintended models are excluded from fixed-model inference as explained
in [model identity](/nodes/oats-operator-expert/lessons/trial-model-identity-needs-launch-enforcement.md).
No arm ranking, transferable planting rate or controlled comparison of
injection methods is established.
