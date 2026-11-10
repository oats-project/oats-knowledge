---
type: Lesson
title: A skipped real-binary test gives no compatibility evidence
description: Real-binary coverage needs installed floor and newer-version runs that fail on skipped required cases and prove the intended paths executed, not just a matrix or a green suite.
about: [workstream/provider-integration]
kind: lesson
id: ins-ac499caa45a7
tags: [integrations, testing, external-cli, ci, compatibility]
timestamp: 2026-10-30
---

# Why the real binary was still not enough

The source's 2026-10-30 investigation found two real-aw tests failing with
aw 1.36.43 through 1.36.51 while CI stayed green. The main test job did not
install aw, so those tests skipped; the job that did install it exercised
only the provider's floor. Merely having real-binary tests in the suite had
not made newer-client compatibility observable.

Adding a matrix was not sufficient either. Its first newer-version run
stopped at a journey test's own pin to 1.36.33, before any journey executed.
The source later reported all six journeys and five real-aw tests passing
at 1.36.33 and 1.36.51. The lesson is to inspect the exercised paths, not to
infer coverage from a matrix declaration or from a successful edit to its
version check.

# Review the execution evidence

- Install the external CLI explicitly in required compatibility jobs, at
  the provider's supported floor and the newest version being qualified.
  Record which binary actually ran, as the existing
  [real-binary rehearsal rule](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
  requires. An untested later release remains unqualified.
- Fail those jobs when a required real-binary case skips. Optional local
  execution without the CLI may remain convenient, but its green result
  supplies no evidence for that boundary.
- Require evidence that the intended cases reached the behavior under
  test. A version precondition can prevent every substantive assertion
  from running even after the right binary was installed.
- Give each side of an intentional behavior change its version-specific
  expectation. In the reported investigation, injecting the old refusal
  into the newer-version row passed an either-or assertion; the
  version-gated assertion rejected it. Accepting either outcome had erased
  the regression the row was meant to detect.

The messaging expert's
[versioned-pin lesson](/nodes/oats-aweb-expert/lessons/real-aw-pins-age-with-the-installed-client.md)
owns clean-base comparison and dedicated re-pinning. This adds the distinct
execution gap: a correctly pinned test that never runs cannot detect drift.
It does not replace the feature's whole-lifecycle acceptance gate.

# Eliminate the silent gap

Put tool installation, the qualification matrix, required-case execution
accounting and skip rejection in CI. Keep version-specific expectations in
executable tests, with negative controls that inject the obsolete outcome
and verify that the newer row fails. These are enforcement targets, not a
reason to accumulate a manual checklist indefinitely. Review the actual
run evidence until those controls reliably make missing coverage fail.

The proposal identifies
[awebai/oats-aweb#165](https://github.com/awebai/oats-aweb/pull/165)
as the associated work. It was open and unmerged at maintainer review on
2026-10-30; release and deployment are not established. Passing the
reported journeys and admission tests does **not** establish completed real
invite acceptance on 1.36.51; the proposal explicitly leaves that path
unproven.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-10-30; notes/real-binary-tests-that-skip-give-no-cover.md.

The failures, matrix precondition, passing cases and injected-refusal result
are source-reported observations, not experiments rerun by this harvest.
The reusable finding is why nominal real-binary coverage missed drift, not
a maintained CI-status ledger or a guarantee about all later aw releases.

Maintainer review of 2026-10-30 read that pull request's diff at `133e00f7`:
it carries the two-version matrix, the skip rejection, the journey's version
pin and the version-gated rows the lesson describes. Its reported run results
remain source-reported.

Maintainer review of oats-knowledge#234, later the same day, found #165 merged
at `94d212d9`, so the "open and unmerged" above is that earlier review's
reading. [awebai/oats-aweb#167](https://github.com/awebai/oats-aweb/pull/167),
merged at `26297493`, adds a real joined-team journey row (invite, accept,
connect, list, retire). Its jobs passed at aw 1.36.33 and 1.36.51 in run
41119385387, read by job conclusion only, so the invite limit above describes
#165's evidence, not #167's. The changelog still listed that work as
Unreleased: release and deployment stay unestablished. Not human acceptance.
