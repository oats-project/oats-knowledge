---
type: Decision
title: Recovery preserves Git state across ref formats, not just paths
description: Retirement recovery preserves a fixed set of Git operation refs and their available objects across ref formats, because path copies and matching status can silently omit them and the comparison must cover what the copier promises.
about: [system/oats-kernel]
id: dec-a972ee29532d
tags: [kernel, retire, recovery, git, verification]
timestamp: 2026-10-15
---
# Decision and rationale

Treat promised Git state as semantic state, not as a list of filesystem
entries. The source reports that path-by-path recovery lost operation refs
and stash state stored in reftable, while file-backed refs could arrive
without the objects they named. A link at a copied name could also be
silently skipped by a presence check that followed it. Matching
`git status --porcelain` did not expose those losses.

The recovery decision is therefore to carry a fixed, implementation-owned
set of operation-ref names through Git, validating each source value as a
full object ID. The source does not get to choose additional names for this
operation. Carry the objects those refs name before installing the refs;
when the source itself lacks a named object, preserve that limitation rather
than inventing completeness. Preserve a link as a link, not as its target or
as an absent entry. The selected recovery representation is file-backed refs
regardless of the source format or operator default.

A failed Git step blocks retirement just as a failed copy does. Known absence
in the source is not the same as a failed read or transfer. The before- and
after-hook comparison must inspect the same promised refs through the
copier's own readers: a check that observes less than the copy promises
cannot detect either a dropped ref or a hook's change to it.

This records the source's 2026-10-14–15 decision and its reason, not an
independently established human-acceptance receipt. It refines rather than
supersedes the existing preservation and configuration boundaries.

# Rejected shortcuts and scope

- **Path copying plus matching status:** rejected as a completeness proof;
  both can omit meaningful state while agreeing about the visible tree.
- **Source-selected operation-ref names:** rejected because the source is
  untrusted. This fixed-name boundary does not replace the separate duty to
  [enumerate source local branches](/nodes/oats-kernel-expert/lessons/recovery-completeness-needs-source-refs.md)
  rather than trust Git transport's advertised subset. Operation-ref
  selection and local-branch inventory are different proof sets.
- **Copy a ref without its available objects:** insufficient preservation;
  retaining a name is not retaining the work it names.

Semantic preservation does not mean restoring source-selected executable
configuration. The decision to
[preserve work rather than repository-local Git behavior](/nodes/oats-kernel-expert/decisions/recovery-copies-do-not-inherit-local-git-config.md)
remains in force. Nor does this establish complete nested-repository reflog
preservation in reftable or settle ownership of a repository-wide stash
shared across instances; the source explicitly leaves those outside this
change. The exact ref inventory and transfer mechanics belong in the
implementation and its tests, not a second specification here.

# Eliminate the failure in code and tests

Keep semantic ref reads, object preservation and fail-closed comparison in
the recovery producer. Test the promised state in both file and reftable
formats, including refs whose objects an ordinary clone lacks, source-missing
objects, links and hook-time changes. Verify raw ref values and object
availability in the recovered copy, not only status equality. Each new class
of preserved state must extend both the copier and its verification coverage.

The source identifies [awebai/oats#1189](https://github.com/awebai/oats/pull/1189)
as the implementation and regression route. This concept retains why those
checks are necessary; it is not a substitute for them or a certification of
current recovery completeness.

# Related

[Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md)
owns the general measure-before-destroying and failure-retention decision.
The [source-ref completeness lesson](/nodes/oats-kernel-expert/lessons/recovery-completeness-needs-source-refs.md)
records the distinct hidden-branch transport blind spot.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle, 2026-10-15; notes/a-recovery-carries-git-state-that-is-not-a-path.md.

The proposal and note identify the review in
[awebai/oats#1038](https://github.com/awebai/oats/issues/1038), including
[staging in both ref formats](https://github.com/awebai/oats/issues/1038#issuecomment-6172301668)
and the [object-preservation extension](https://github.com/awebai/oats/issues/1038#issuecomment-6172478397).
The source reports #1189 merged on 2026-10-15 and names
[#1181](https://github.com/awebai/oats/issues/1181) and
[#1182](https://github.com/awebai/oats/issues/1182) as the separately scoped
reflog and shared-stash follow-ups. These are source-reported evidence
pointers, not a maintained issue-status ledger. This harvest did not inspect
the implementation discussions or reproduce the probes and test results.

Verified by the knowledge maintainer at review of the harvest:
awebai/oats#1189, merged 2026-10-15 and closing #1038, records that
path-by-path recovery dropped reftable operation refs and the stash, dropped
a link at a copied name, and carried file refs without their objects while
`git status --porcelain` agreed. It carries a frozen operation-ref list never
read from the source, checks each id as a full object id, carries named
objects before writing refs, always clones the recovery with file-backed
refs, refuses the retire when a Git step fails, and extends the before- and
after-hook comparison through the copier's own readers. It refuses a
reftable ref whose object the source lacks, since Git will not write it.
#1181 (nested reftable reflogs) and #1182 (shared stash) were open at review.
