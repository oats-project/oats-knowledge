---
type: Lesson
title: A provider release is tagged first, then mirrored and pinned in one re-proven framework PR
description: Tag first, then review the tag-identical mirror and every pin as one diff; the gate keeps the Desktop suite, with the suites in CI and only named affected test files run locally, and a pin is re-proven after another shared-file change lands.
about: [workstream/provider-integration, system/oats-desktop, workstream/oats-direction]
kind: lesson
id: ins-1e61da3a31bb
tags: [integrations, release, mirror, catalog, pins, desktop, tests]
timestamp: 2026-10-12
---

The framework repository mirrors each official capability's payload and pins
its catalog to a tag of the package repository. Orderings that went wrong
before this was settled: a pin that named a tag not yet pushed, a mirror
reviewed against a stage that then moved, and a separate post-tag pin commit
that left the mirror and its pin reviewable apart. The settled practice
(oats.okf 4.0.2 and oats.aweb 1.16.1, 2026-09-28) is one PR after the tag.

**Order of record.**
1. Stage the release in the package repository; its reviewers approve the
   stage head; merge it and push the tag; read the tag back (annotated object
   and peeled commit).
2. Open ONE framework PR that carries the payload byte-identical to the
   tagged tree (the parity checker, never a hand copy), the catalog, workspace
   and docs pins, the version literals the tests carry, and any kernel tests
   the release reclassifies. Review it as one diff.
3. Specify where each part of the gate runs. For the normal CI-backed
   mirror-and-pin lane, run only affected test files locally, one file per
   invocation on a shared host. CI runs the kernel suites, the Desktop suite
   and the clean-room tarball smoke. Verify payload parity by comparing each
   mirror's Git tree id with the corresponding tagged tree, separately from
   the test verdicts; the pins and floors must also agree.

**A gate is not a local test command.** The source reports that copying the
old step 3's unqualified suite wording into a developer spec led to a full
local run that overloaded a shared host and compromised other developers'
test evidence. The maintainer's correction, reported for 2026-10-12, was to
name the affected files in the spec, run each alone, and leave the full suites
to CI. Do not run the whole suite or batch several test files in one local
invocation. For local Desktop verification, select only a file that exercises
what the mirror or version change touches; if none does, say so rather than
running the Desktop suite locally. A developer who believes a broader run is
needed raises the reason through its expert to the maintainer instead of
starting it on the shared host. This clarifies execution location; it does not
weaken the gate or replace the maintainer's exceptional release decisions.

**Why the Desktop suite remains in CI.** The Desktop pins a bundled provider's manifest
settings by recording, in fixtures, so a manifest change is a Desktop change
whether or not anyone in the provider's lane touched the Desktop. A mirror
once went red after approval on exactly that; the fix was a fixture-only
recapture from the mirror's tree. Even an affected Desktop file in a fresh
worktree needs the Desktop package's own devDependencies installed first: a
wall of missing-module failures is an environment fact, not a verdict.

**Plan for another pin landing first.** Different provider packages do not
make their framework pin PRs independent: shared release surfaces can move
under both. Before handover, check other open PRs for overlap in the catalog,
workspace pins, docs catalog table, smoke version literals and release notes,
and report the overlap to the maintainer. Write the notes entry so it can fit
under an existing heading rather than requiring its own duplicate heading.
Keep the developer available until merge, not merely until the first green
handover.

If another shared-file change lands first, rebase before handing over again.
Have the developer inspect the shared files line by line for preservation of
both pins, rerun every affected test file individually, and take the delta
through fresh review. Require CI green on the new head; the old head's result
does not prove it. These are the pin owner's preparations and re-verification
obligations, not authority to choose the maintainer's merge order. The source
reports repeated handovers in the 2026-10-12–13 pin work as the reason to plan
for this before the first handover.

The general rule that a conflict-free auto-merge is not semantic proof stays
in [cross-workstream delivery](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md).
Head-bound approval and fresh-review requirements stay in
[review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md).
That concept's wording for the maintainer's own local gate (the affected
suites) is not changed here: this lesson governs what an integration lead
writes into a developer's spec for the pin lane, and whether the shared-host
limit also binds the maintainer's gate is for that node's owner to settle.
The general release judgement (source, tag, pin; pin, bump and mirror bytes
land together) is the framework's
[release traps](/nodes/oats-maintainer/stewardship/release-traps.md); this lesson
is the provider-mirror instance of it.

**Elimination route.** Prefer fewer duplicated version literals and automated
mirror/pin consistency checks, as release stewardship already recommends.
Local-run safeguards and an explicit local-versus-CI section in the owning
specification guidance should prevent the ambiguous instruction from recurring;
base-current CI and review checks should enforce new-head evidence. Those are
follow-up changes for their owners, not capabilities delivered by this lesson.
The residual judgment is when to identify overlapping pins and request the
combined evidence, rather than treating different package names as isolation.

# Evidence

Evidence: OKF proposal from integrations-expert/integrations-expert-developer-skill-lines, 2026-10-12; notes/a-specs-gate-names-files-not-suites-on-a-shared-host.md; notes/concurrent-pin-prs-share-files-and-a-clean-merge-is-not-enough.md.

The notes attribute the shared-host correction and overlap guidance to the
maintainer on 2026-10-12 and 2026-10-13 respectively. These dates, incidents and
directions are source-reported; this harvest did not independently verify the
acceptance messages, rerun tests or establish human acceptance. The refinement
preserves the tag-first, one-PR and Desktop-gate decisions.
