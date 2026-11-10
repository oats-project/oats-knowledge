---
type: Lesson
title: Admit failed-run leftovers by type, not name
description: Widening a provider's directory admission to accept failed-run leftovers requires expected-type checks before effects, exclusive creation of new outputs, and collision checks across the whole output set.
about: [workstream/provider-integration]
kind: lesson
id: ins-1c8f419d31d3
tags: [integrations, filesystem, admission, recovery, symlinks]
timestamp: 2026-11-03
---

# Lesson

A provider's decision to accept leftovers in an operator-selected directory
is a write-safety change, not merely a more forgiving name allowlist. Rejecting
unrecognized contents had kept those entries away from later writes; admitting
their names removes that protection without establishing what the entries are.

For this recovery boundary:

- Check every admitted leftover against its **expected type** with `lstat`:
  a real directory where a directory is required, or a regular file where a
  file is allowed. A matching name is insufficient; linked and dangling
  entries are not the required objects. Perform admission checks before
  external initialization or other effects, including on resumed paths.
- Create **new output files** exclusively (`wx`) rather than opening a chosen
  name for truncating writes. An earlier absence check does not reserve the
  name; a collision at creation must fail without overwriting existing bytes.
- Choose an output-set name only when **every member** is absent according to
  `lstat`, not merely the member normally written last. An interrupted attempt
  may have left only an earlier member, including a dangling link. A partly
  occupied set is not a fresh name.

This is not a ban on deliberate updates to provider-owned files or a complete
filesystem containment algorithm. `lstat` checks a named entry, and exclusive
file creation does not make mutable parent directories safe. The kernel's
[resolved-object and containment lesson](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md)
owns ancestor checks, intended-object authority and the check-to-effect race
limits. Keep those obligations; do not advertise this repair as race-free.

# Why the name-only alternative was rejected

In a 2026-11-03 review of a messaging provider's resident-creation rerun after
an API-key refusal, the source reports that a draft admitted failed-run
leftovers by name alone. A linked capture directory passed admission, and a
later capture write followed an existing output link and truncated a file
outside the selected directory. A regular file where a directory was required
also passed: external initialization created identity state before capture
setup failed. Checking only the last output member missed partially used
capture names.

These failures explain the ordering and scope of the checks: reject the wrong
object before external effects, preserve existing bytes at the write boundary,
and treat interrupted output as a set rather than a completion marker.

# Elimination route

Enforce the rule in a shared provider admission and output-creation boundary,
not solely in reviewer memory. Keep regression cases for linked or dangling
leftovers, wrong-type entries, a partly occupied output set, and a final-entry
link inserted after name selection. Assert both refusal before external
initialization for invalid admission and preservation of existing output and
outside bytes at write-time collisions. Retain the rationale here; the actual
accepted shapes and implementation belong in the provider's code and tests.

The proposal reports approval of the repair, refusal of eight unsafe shapes
and an `EEXIST` refusal when a link was inserted after name selection. These
are source-reported review and test results, not an independently rerun test
suite, a release certification or evidence of a field incident. One provider
case supports this lesson; it does not establish all filesystem race behavior.

# Related

[A lifecycle hook never trusts the ambient environment](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)
owns authoritative input selection. This lesson covers the separate question
of what a provider may admit on disk before writing there.

[Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md)
owns the read-side boundary for another agent's tree, not this failed-run
write-admission choice.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-03; notes/admit-leftovers-by-type-not-name.md. The captured note and
proposal were read and hash-checked; the reported implementation and review
were not independently inspected or reproduced by this harvest.
