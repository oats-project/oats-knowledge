---
type: Lesson
title: A CI watcher's exit is not the run's result
description: During a GitHub API incident, a watcher can fail while the run succeeds and the run summary can lead its job results, so reconcile the run and complete job list before reporting CI green.
about: [workstream/oats-direction]
kind: lesson
id: ins-84437bc31e20
tags: [ci, github, release, verification]
timestamp: 2026-10-30
---
# Two observations can disagree

The source reports two distinct failures of CI observation during a spell
of GitHub API 502 responses on 2026-10-30:

- `gh run watch --exit-status` exited 1 on an API error while the watched
  run succeeded. That exit described a failed observation, not failed tests.
- Another run read `completed/success` while its job list still contained
  three jobs without conclusions. Those jobs later all concluded success.
  The aggregate result alone was premature evidence for calling main green.

These are external-service observations a fresh OATS checkout cannot reveal.
They do not establish that every watcher failure is transient, that every
inconsistent run will succeed, or that the API always converges within a
particular time. The incident does not establish a root cause for the
run/job disagreement.

# Maintainer judgment

When a watcher fails, distinguish its transport/API error from a reported
workflow or job failure. Read back the identified run and its complete job
list through the API. If either read is unavailable or they disagree about
completion, report verification as incomplete rather than red or green on
that evidence alone. A later successful read may resolve the uncertainty;
there is no reason to rerun or alter the workflow merely because its observer
failed.

Do not call main green from the run's success summary while any job lacks
its own terminal conclusion. Read the job conclusions as results, not just
non-null fields: a failed job is not green because it finished, and skipped
or cancelled jobs retain the workflow's existing acceptance policy. Ensure
the job list is complete, including additional pages where applicable.

This applies the [target read-back rule](/nodes/oats-maintainer/lessons/verify-the-remote-ref-after-every-scripted-push.md)
to an API whose summary and detail can temporarily disagree; it adds a
specific observation limit, not a second general reporting rule. The
[PR-check lesson](/nodes/oats-maintainer/lessons/check-the-pr-check-not-only-the-authors-local-run.md)
still owns the separate requirement to inspect the runner's evidence rather
than substitute an author's local test result.

# Eliminate the manual trap

Put the distinction between observer error, incomplete evidence and CI
failure in CI-monitoring/reporting code. Test an API 502 followed by a
successful run, and a success summary paired with unfinished jobs; neither
should emit a false final verdict. Complete-job enumeration and a bounded
reconciliation that leaves unresolved evidence unknown are enforcement
targets, not automation delivered by this lesson. Until that is enforced,
retain the read-back check in maintainer review; this harvest changes no
skill, workflow or monitoring implementation.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-10-30; notes/gh-run-watch-can-exit-1-on-an-api-error.md.

The proposal identifies [run 41098299774](https://github.com/awebai/oats/actions/runs/41098299774)
for the watcher/API failure despite success, and
[run 41102605492](https://github.com/awebai/oats/actions/runs/41102605492)
for the premature aggregate success. Both are source-reported observations;
this harvest did not reproduce the API incident or independently recover
its transient responses. The run links locate the evidence, not a maintained
CI-status ledger.
