---
type: Lesson
title: Open a CI-only draft during kernel review convergence
description: When the kernel branch needs a PR to trigger CI, the expert opens a clearly non-review draft on the first push so exact-head CI runs during convergence rather than starting only after acceptance, and states green only from the completed run of the exact head, never from a watch that returned with zero checks.
about: [system/oats-kernel, workstream/oats-direction]
kind: lesson
id: ins-be4288aecacb
tags: [kernel, ci, review, handover]
timestamp: 2026-10-30
---
# Start the evidence loop without requesting review

A pushed branch is not necessarily a tested branch. In the source's kernel
work, waiting until the expert accepted the developer's converged head to
open the PR also postponed the first CI run. That serialized the review
loop and CI, adding a full CI cycle to hand-over and delaying discovery of
failures that could still change the head.

Where ordinary branch pushes do not trigger the required CI, the source's
successful practice was for the **expert**, not the developer, to open the
implementation PR as a **draft on the first push**. Its body explicitly
states that it is not ready for review and exists to run CI on successive
heads. The expert supplies the complete description and marks it ready only
after accepting the converged head, with the required CI evidence bound to
that head. Opening the draft is an evidence request, not a request for the
maintainer to finish the expert's review.

This preserves the existing
[content-bound review and hand-over gates](/nodes/oats-maintainer/stewardship/review-protocol.md).
A draft, an earlier green run or a promise of later CI is not acceptance.
Required checks outside ordinary PR CI remain required. The
[affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
addresses coverage, not when the first run starts.

# A watch that reports zero checks has proved nothing (2026-10-30)

Exact-head CI evidence is the run of that commit, read to completion. The
source reports, twice on one PR on 2026-10-30, that `gh pr checks --watch`
**returned at once while the run was still queued** behind a concurrent
one: the rollup read clean with no failures and no checks, so a hand-over
that trusted it would have called an untested head green.

The practice that held: find the run of the exact commit
(`gh run list --commit <sha>`), watch that run with an exit status
(`gh run watch <id> --exit-status`), then read every check at the sha,
count them and require none pending. A hand-over states green only from a
completed run at that sha, and trusts the exit code over a matched word.

The same day's other observation trap, a run reading success while jobs
lacked conclusions during a GitHub API incident, is already the
maintainer's [CI-watcher lesson](/nodes/oats-maintainer/lessons/ci-watcher-exit-is-not-the-run-result.md);
this section adds the queued-run case, not a second general rule. A
hand-over step that refuses a zero-check or pending reading would remove
the manual check; until one exists, it stays in the expert's hand-over.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/gh-checks-watch-exits-on-zero-checks.md.
The observations are source-reported from [oats-project/oats#1669](https://github.com/oats-project/oats/pull/1669);
this harvest did not reproduce the queued-run reading.

# Scope and elimination route

**Owner: oats-kernel-expert. Update-on-change:** recheck this workaround when
the repository's workflow triggers or the expert's delivery guidance change;
retire the dependency on a draft if ordinary branch CI supplies the required
evidence before hand-over.

The structural elimination route is branch-triggered CI for the required
checks, with deliberate handling of duplicate branch/PR runs. This is a
candidate for the repository's workflow owners, not an approved workflow
change. If PR-only triggering remains intentional, its residual timing rule
belongs in the existing `land-your-prs` guidance named by the source. This
lesson changes no soul skill and grants no new publication or merge authority.

Unlike a bounded [feasibility spike](/nodes/oats-expert/lessons/test-feasibility-before-choosing-between-owners.md),
this draft is the implementation PR that may later become ready; the spike's
never-ready/close-without-merge terms do not apply. Nor is this the Desktop's
[automatic-PR feature](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md):
it is an expert's deliberate delivery action, not automatic forge behavior.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/lesson-draft-pr-for-ci-during-review.md.

The source reports using this practice for
[awebai/oats#1578](https://github.com/awebai/oats/pull/1578) and
[#1599](https://github.com/awebai/oats/pull/1599), and catching a CI failure
during the latter's review loop. It reports inspecting workflow triggers at
`27a07074`: PRs and pushes to main/release branches ran CI, ordinary feature
pushes did not. Those triggers are dated context to recheck in the repository,
not a permanent workflow specification. The source's CI-only testing
constraint explains the incident; it does not establish a project-wide ban
on permitted local verification.

Maintainer review, 2026-10-27, checked two of these reports on GitHub. At
`27a07074` the PR workflow ran on pushes and pull requests to main and
`release/**` only, and the Linux-tests workflow ran only on manual dispatch.
Both cited PRs were opened as drafts and later marked ready for review. The
caught CI failure, the CI runs and the PR outcomes were not audited, and
none of this is human acceptance.
