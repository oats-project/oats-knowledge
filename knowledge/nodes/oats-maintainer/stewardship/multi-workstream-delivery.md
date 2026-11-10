---
type: Lesson
title: Cross-workstream delivery: freeze the contract first, adopt then adapt, prove the merge
description: Freeze shared contracts before implementation, adopt then adapt sibling suites, and prove merge fidelity; ship-together sets need whole-set evidence before the first merge or an explicit release hold, and a paused shared-package contract stage is reverted before release.
about: [workstream/oats-direction]
kind: lesson
id: ins-3b3df523e71a
tags: [stewardship, delivery, integration, contracts, releases]
timestamp: 2026-10-27
---
**Owner: oats-maintainer. Origin 2026-07-26/27; extended 2026-09-20,
2026-10-26 and 2026-10-27.
Update-on-change: revise when cross-workstream integration or ship-together
merge and release gates change.**

# Freeze the contract first

When two or more workstreams block on a shared contract, the effective move is
a standalone first commit containing **only the contract**: machine-readable
schemas, a design document with exact signatures and normalized identities,
and a stable error-code table that doubles as the machine-readable output
taxonomy. Implementation follows in each workstream against the frozen text.
Sibling branches are *read* (show a path at their head), never merged from,
until integration. Judgement calls made while freezing belong in the contract
document, where they move with the code.

## A merged-but-unreleased contract stage in a shared package is not inert (2026-10-26)

The contract-first commit is safe when the repository it lands in is not
released until the effort's own stages follow. In a **shared package that
other lanes release** on their own cadence (a capability such as oats.aweb),
the contract stage is a release candidate the moment it merges: the next tag,
cut for someone else's work, ships its setting, its validation and its brief
text, promising behaviour that nothing implements. A soul could set the field
and get nothing; a reader of the briefing would look for a surface that does
not exist. So in a shared package:

- land a contract stage **only together with the stage that makes it
  useful**, or sequenced so no release can fall between them; and
- when the effort pauses after the contract stage merged, **revert it before
  the next release of that package**, not after.

Learned on 2026-10-26 when the threaded human channel was
[deferred](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
the day its stage 1 (the `interaction` setting in oats.aweb) merged; a revert
was opened before any release. The lesson applies to every multi-stage
effort across the OATS package repositories
([official development runs on the architecture it offers adopters](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md)).

## A ship-together set needs whole-set evidence before its first merge (2026-10-27)

For PRs explicitly agreed to land together, prove the **full suite on the
whole set integrated with current main before merging its first PR**. A
passing full-suite run on a trial of the stack's top merged with main
supplies that evidence; a draft PR is the source's reported way to run it.
Then land the agreed set in
order, retargeting and updating each PR and requiring its own main-based
head to be green. The whole-set trial does not replace those per-head gates
or the [same-area integration rule](/nodes/oats-maintainer/stewardship/review-protocol.md#a-batch-window-preserves-same-area-integration-evidence).

The source reports that stacked PRs whose base was not main received only
dispatched, named-test-file coverage rather than full PR CI. Merging the
base on that partial evidence can leave half the contract on main when a later consumer
fails its first full run. Back-to-back intent alone cannot prevent that
failure. If a whole-set trial is not possible, the release lane must
explicitly hold tags until every PR in the set has landed. A tag hold
contains the shipping risk; it is not evidence that the set passes or
permission to bypass an existing merge hold or required CI.

This extends the shared-package sequencing lesson above, not the authority
to choose producer-first order. The Desktop expert's
[coupled-landing lesson](/nodes/oats-desktop-expert/lessons/coupled-kernel-and-desktop-landings.md)
owns the consumer-side dual-tree strategy. Existing breaking-contract order
and content-bound review remain in the
[review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md).

Bind trial evidence to the revision **actually tested**, not merely the
workflow's ref. In the source's dispatched Linux-tests workflow, `headSha`
identified main while the log's `commit under test` line identified the
requested test commit. That is a scoped workflow observation, not a rule
about every GitHub check. The structural elimination route is CI that tests
the complete prospective set and records its tested revision explicitly,
with a release gate that enforces the declared set. Until enforced, the
remaining review check belongs in the existing `pr-review` skill; this
lesson does not claim such automation has shipped.

# Adopt, then adapt

When a sibling owns a copied shared suite, do not three-way-merge large test
bodies on every re-merge. Replace the local file with the sibling's current
suite wholesale, then re-apply a **short, marked adaptation list**. Each
failure after adoption is either a missing adaptation or a real conflict that
needs a decision — never a silent assertion edit. The evidence a reviewer
needs is a small, reviewable diff against the upstream original. Writing the
disposition inventory *before* the integration merge makes conflict hunks
mechanical: each hunk maps to a pre-decided disposition.

# Independence needs write surfaces, not titles (2026-09-20)

When several workstreams run across separate checkouts and repositories,
independence comes from **explicit write surfaces and shared interface
contracts**, not from different task titles: begin bounded slices, report
concrete cross-lane seams, and reserve combined live acceptance for the
integrated result — a dispatched assignment is not a completed delivery.
Shared repository and messaging access are **not shared project context**:
keep one accountable integration lead and a current, version-scoped briefing
for every handoff; live aliases and machine-specific inventory belong in the
deployment's handoff, never in a reusable soul.

# Prove the merge

Git reporting an auto-merge with no conflict only means the hunks did not
textually collide; it is not evidence the other side's delta survived.
Reverse-apply each side's post-base patch against the merged tree with a
check-only apply, per side per auto-merged file. Its value is converting "Git
did not complain" into a reportable verification, which is what a maintainer
reviewing an integration head needs
([review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md)).

# Citations

1. Migrated from agents/cli-dev/soul/knowledge @ 7838d3ca (`lessons/frozen-interface-first-delivery`, `gate2-seam-teardown-execution`, `prove-auto-merge-preserved-both-deltas`, 2026-07-26/27).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log lessons of 2026-09-20 on independence and version-scoped briefings).
3. The shared-package contract-stage section: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer, 2026-10-26; notes/threaded-channel-deferred.md. The merge of awebai/oats-aweb#154 and the revert awebai/oats-aweb#156 (open, unmerged, before any oats.aweb release) were checked on GitHub by the knowledge maintainer's review, 2026-10-26.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-desktop, 2026-10-27; notes/ship-together-sets-need-a-whole-set-run.md.

The source identifies the [scroll agreement](https://github.com/awebai/oats/issues/1502)
(comments 6404356210, condition 2, and 6404378032), the set
[#1513](https://github.com/awebai/oats/pull/1513),
[#1514](https://github.com/awebai/oats/pull/1514) and
[#1550](https://github.com/awebai/oats/pull/1550), and the trial
[#1551](https://github.com/awebai/oats/pull/1551). Agreement, CI coverage and
workflow-ref behavior are source-reported, not independently audited here.
The trial's outcome was unknown at proposal time; this records the gate's
rationale, not a passing trial, a completed landing or a release receipt.
