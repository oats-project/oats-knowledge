---
type: Lesson
title: Check the affected-test inventory, not only the green runs
description: Brief and check the affected-test inventory by changed surface and transition, with results or explicit gaps and evidence that gated behavior ran on a feature-enabled integration tree.
tags: [verification, handover, testing, coordination]
timestamp: 2026-10-29
---
# A run list hides tests nobody thought to run

When local verification is restricted to individual test files and full
suites run only in CI, a green handback proves only the selected files. A
developer, reviewer and lead can all inspect the same successful runs while
missing an existing consumer test. Adding review rounds does not itself
correct a shared omission in test selection.

The lead's brief should request an **affected-test inventory**, not merely a
run list. Search the repository and package test trees for consumers of the
surfaces changed by the diff: rendered rows, footer text, action names,
imports and source-text reads. Include each identified test file, even if
it was not changed, with its result or the reason it was not run. At
handback, the lead checks that inventory against the changed surfaces,
rather than verifying only the runs the developer chose to report.

Search is a discovery aid, not a completeness certificate: indirect helpers,
fixtures and differently named assertions can conceal dependencies. The
inventory makes the selection and its gaps reviewable; it does not prove
that every possible affected test was found. A non-run reason discloses
missing evidence, not permission to waive it. Preserve local execution
limits and CI's full-suite gate; this lesson does not authorize broader
local runs or change maintainer acceptance requirements.

# Text readers are consumers even without imports

The 2026-10-27 refinement makes the search obligation more specific. Test
consumers include function extractors, export or manifest inventories,
whole-module scanners and rendered-output assertions, not only importers.
They can depend on comments, labels and the **form** of a value even when
runtime meaning is unchanged.

Brief the inventory search before implementation, then check it at handback:

- Search test roots for changed function names and old literals, including
  readers that reconstruct a function with a separate dependency context.
- When a representation changes, search its alternate spellings: `.prop`,
  `'prop'`, `"prop"`, property-access helpers such as
  `getPropertyValue("prop")`, and the old displayed value. A dot-property
  search alone misses a test passing the property name as a string.
- Include scanners that consume the whole shipped module, even for a
  comment-only edit; their rules can match text without naming the changed
  function. Discover those readers from the current repository rather than
  treating a fixed list of test files as complete.

These are ways to expose a search blind spot, not a proof of exhaustive
coverage or a requirement to preserve incidental source syntax. Keep each
non-run explicit when the permitted environment cannot execute a reader.
The Desktop-owned
[source-evaluation lesson](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#source-evaluating-tests-include-renderer-modules-not-only-main)
owns the hand-maintained evaluation-context failure and its extraction
remedy; the generalist owns making those readers visible in the handback.

# Tightening an evidence rule exposes transition consumers

Replacing an optimistic default such as false, idle or absent with
**unknown unless established** can expose an observation gap during a state
transition. A test may reach the changed rule only through a wait across
that gap, so searching the rule's callers or literals alone can miss it.
Selected green tests and an approving review do not make a later failure in
such a wait an unrelated flake.

For this kind of change, the lead's brief should:

- Name the transitions where the old default could have filled an evidence
  gap: exit, respawn, pane death and startup are candidates, not an exhaustive
  list or a claim that every one is affected.
- Inventory tests and runtime consumers that wait, poll or act across those
  transitions, including indirect consumers. Give each a verification result,
  an explicit execution gap, or an evidence-backed reason it cannot encounter
  the race. Check this inventory at handback as well as the changed-surface
  search; a reason is reviewable evidence, not proof of completeness.
- State the user-visible transitional consequence in the PR as behavior for
  review: what becomes unknown, which action may refuse, and what recovery
  the contract permits. Do not hide it as test flakiness or infer that every
  unknown permits a retry or that one retry must succeed.

This extends the inventory's discovery method, not the liveness contract.
The [shared-behavior guarantees lesson](enumerate-what-a-removed-behaviour-held-up.md)
owns specifying guarantees the old behavior supplied; the
[terminal-observation lesson](real-terminal-waits-prove-the-observed-state.md)
owns proving that a wait reached its intended state. The Desktop's
[unknown-state decision](/nodes/oats-desktop-expert/decisions/kernel-unknown-is-not-refined-by-a-client-probe.md)
remains authoritative for client handling; this inventory does not authorize
converting unknown back into a convenient default.

# The right files can run with the changed behavior switched off

The session-resume effort exposed a second coverage gap: the consumer branch
was based on a kernel without the producer feature that enabled its sweep.
Local real-tmux tests could run successfully without exercising that new
behavior. CI's merge with feature-bearing main activated it and exposed
fixture and user-output defects missed by the review loop. Naming and
running the affected files was necessary but not sufficient.

For a feature-gated change, the inventory must identify **the tree and gate
state that each result covers**, not only the test filename. Once the
producer is available, run the affected integration tests in the permitted
combined tree with the producer feature enabled, matching the relevant CI
composition. Establish that the intended path actually executed; gate-off
compatibility remains useful evidence, but is not positive coverage of the
new path. When tests must wait for CI, state that gap and check whether the
CI tree will enable the feature rather than treating local green as an
equivalent run.

The kernel's [real-pi CI-gate lesson](/nodes/oats-kernel-expert/lessons/real-pi-opening-races-need-an-executed-ci-gate.md)
owns its specific skipped-runtime gap. This addition concerns the lead's
handback: a test may execute while the behavior inside it remains gated
off. Neither case is cured by adding more readers of the same green result.

# Distinct responsibility and elimination route

When the maintainer identifies an overlapping open effort,
[prepare an open-head trial and resolution handoff](trial-merge-before-the-merge-order-is-fixed.md)
while the merge order is being chosen. That lesson owns the timing and
transfer of combined-tree findings; this one owns discovery of the test set
and whether its results exercised the changed behavior.

The [provider mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
already separates named local files from CI suites. This lesson owns the
lead's check that the named set reaches the change's consumers. It is later
than [exercising a consumer spec against its built producer](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md),
which tests the composition before developer handover. The maintainer's
[evidence-before-hand-over rule](/nodes/oats-maintainer/stewardship/review-protocol.md#evidence-outside-pr-ci-belongs-before-hand-over)
remains the authority for affected paths absent from PR CI.

[Runner isolation for automatic per-user writes](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md)
addresses an earlier boundary: a new side effect can expose personal state
through unrelated CLI tests, so isolation and guards belong in the spec,
not only in the later affected-test inventory.

Prefer eliminating incidental coupling first: [consumer tests should own
their reading, not copied producer sentences](/nodes/oats-desktop-expert/lessons/kernel-text-tests-own-the-client-reading.md).
For real dependencies, dependency-aware test selection and automated
comparison of affected files with reported evidence can reduce this manual
inventory debt; neither is claimed delivered here. Add explicit positive
path assertions and feature-on/feature-off integration coverage so a gated
no-op cannot count as new-behavior coverage. CI should exercise the relevant
producer-consumer combination rather than rely on a stale branch base.
These are test and CI enforcement targets, not delivered changes claimed
here. For the published evidence that telling an agent which tests a change
affects beats test-first procedure alone, and what that means for a skill's
content, see [the focused-rules lesson](/nodes/oats-expert/lessons/agent-skills-take-focused-rules-and-targeted-context-not-packs-or-procedures.md). For a tightened evidence rule, prefer shared, explicit unknown handling
over divergent consumer defaults; encode the permitted behavior in
transition-aware waits and regressions that deliberately exercise the
inconclusive interval. Do not rely on its chance occurrence in CI or weaken
the producer's evidence rule to make a wait pass.

The residual handback requirement belongs in specification and verification
guidance, not a permanent list of test filenames in knowledge. No soul skill
is changed.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, 2026-10-14;
notes/without-local-suites-name-every-test-that-reads-the-change.md.

The source reports that [awebai/oats#1168](https://github.com/awebai/oats/pull/1168)
changed help rows, but its green per-file handback omitted an existing
terminal test still waiting for the old row. Review and lead verification
missed the omission; CI exposed it. The proposal reports that a later
handback included a consumer search and CI passed. The note supports the
initial failure and the inventory recommendation, not that later outcome.
These are source-reported observations, not independently reproduced runs.
The local-run restriction is the reported context, not a new project-wide
policy established by this harvest or proof that search alone caused the
later green result.

Evidence: OKF proposal from oats-expert/oats-expert-workspace-sidebar,
2026-10-27; notes/source-extracting-harnesses.md.

Across one Desktop/TUI effort, the source reports repeated CI failures from
omitted source readers: a newly called helper absent from an extracted
function's context, a comment mistaken for a computed import, and CSS
property readers missed after a shorthand-to-longhands change. In the last
case, a dot-property search missed a string-argument read. The reports span
2026-10-22 through 2026-10-27; no implementation or CI run was independently
reproduced by this harvest. The reported local dependency gap explains why
selected green runs failed to expose the omissions; it is not a permanent
host limitation or permission to replace execution with search.

Evidence: OKF proposal from oats-expert/oats-expert-session-resume,
2026-10-27; notes/feature-gated-consumer-tested-where-gate-is-off.md.

For [awebai/oats#1581](https://github.com/awebai/oats/pull/1581), the source
reports that CI's feature-enabled merge exposed a tmux fixture hold catching
the sweep, a background notice replacing the answer to the person's own act,
and resume output on quit. The proposal reports later green CI, but this
harvest did not audit those runs or repairs. Preserve the gate-state
explanation and coverage requirement, not a permanent TUI-notice contract,
a claim that every local test skipped, or a shipment receipt.

Evidence: OKF proposal from oats-expert/app-owned-reader-expert, 2026-10-29;
notes/evidence-tightening-surfaces-transitions.md.

For [awebai/oats#1641](https://github.com/awebai/oats/issues/1641) and
[PR #1644](https://github.com/awebai/oats/pull/1644), the source reports that
requiring process-table proof of a fallback prompt exposed a brief interval
when tmux still reported a live pane after its process had left the table.
A harness-exit wait treated the truthful unknown as fatal. A transition-based
inventory then found another racing test; the proposal reports green CI at
the next head. This is one change in one repository, not a reproduced
experiment or proof that transition search found every consumer. The local
frequency measurement is not a general race rate, and the reported recovery
is not a universal retry guarantee.
