---
type: Lesson
title: A shard number does not identify the same tests after main moves
description: Before attributing a CI hang to a Desktop change, establish test membership in that exact run rather than treating absence from one shard's log as evidence of a hang.
about: [system/oats-desktop]
kind: lesson
id: ins-51f606be62ab
tags: [desktop, verification, ci, triage]
timestamp: 2026-10-14
---
# The mistaken attribution

The source reports blaming a new Desktop test for a timed-out shard because
it never appeared in that shard's log. It had actually passed in another
shard. The workflow tested the PR merged with main and partitioned a sorted
file list; main had moved, changing which files belonged to each shard.
The last output instead pointed the investigation toward a kernel test.

A shard number is not a stable test identity across different merged trees.
Before returning a red run to a Desktop developer, find the last printed
file, search all shards of the same run for the suspected test, and compare
with a green run using the same main baseline and established membership.
Do not infer membership from an earlier run's shard number. Last output is
an investigative lead, not proof of which test or process caused a hang.

An authorized rerun of failed jobs can distinguish a persistent failure from
a transient one; the reported rerun passed. That result neither identifies
the cause nor makes retries a substitute for evidence. General merge and
approval policy remains with [maintainer review](/nodes/oats-maintainer/stewardship/review-protocol.md).

# Elimination route

Have CI retain the exact tested tree, per-shard file inventory, and file
start/completion evidence. Better reporting removes the need to reconstruct
membership from missing log lines. This is a proposed reporting improvement,
not a claim that it already ships. The lasting expert judgment is to establish
what ran before attributing a failure to the change under review.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-partner-desktop-queue, 2026-10-14; notes/a-ci-shard-holds-different-files-when-main-moves.md.

The incident and green rerun are source-reported. No run identifier was
supplied, and this harvest did not inspect CI logs or reproduce the hang.
The note's stronger claim that a repeated stopping point establishes the
responsible file is not adopted.
