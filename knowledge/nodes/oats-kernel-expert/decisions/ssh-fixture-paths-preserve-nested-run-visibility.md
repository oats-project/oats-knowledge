---
type: Decision
title: Shorten SSH fixture paths without moving nested runs beyond the guard
description: SSH socket pressure is handled in fixture path budgets rather than by lowering the runner's relocation threshold, because a nested run must remain visible to its outer leftover guard.
about: [system/oats-kernel]
id: dec-8d6fd471b0d0
tags: [kernel, testing, ssh, containment, cleanup]
timestamp: 2026-10-15
---
# Decision and rejected alternative

Shorten the SSH-bearing fixture's own path rather than changing the test
runner's temporary-directory placement to solve a socket-path failure. The
source's 2026-10-15 decision retained the runner's 20-character relocation
threshold and rejected lowering it to 12 characters [1]. The numbers identify
the rejected change; they are not a second specification of today's runner.

With the lower threshold, the runner's own nested test would put its run
under `/tmp` instead of inside the outer run's per-file directory. That
would hide the nested run's leftovers from the outer guard and break the
fixture-parent marker check. A shorter socket path would therefore buy a
green SSH setup by weakening what the cleanup gate can observe. Preserve
nested-run containment while spending fewer path bytes inside each fixture.

This is the same evidence-preservation rationale as
[keeping a fixture's tmux directory outside its removable base](/nodes/oats-kernel-expert/decisions/fixture-tmux-directory-preserves-cleanup-evidence.md),
not a blanket preference for shorter paths or a ban on redesigning the
runner. A future placement change needs evidence that nested leftovers remain
observable rather than assuming that successful socket creation proves the
whole test arrangement sound.

# Accepted limitation and enforcement

The reported solution used shorter fixture prefixes and a short home suffix.
Its socket budget held when the run parent's resolved path was at most 12
characters, covering the reported Linux and macOS `/tmp` arrangements. This
is a limit of that measured arrangement, not a universal SSH limit or a
promise for arbitrary temporary-directory roots. Under an over-budget
`TMPDIR`, the source reports that the kernel warns and runs SSH without
connection reuse, and the test run's warnings guard fails visibly. The
accepted tradeoff was a visible path-budget failure rather than moving a
nested run out of the guard's reach.

The current byte arithmetic, fixture naming and runner rule belong in the
repository's [implementation documentation](https://github.com/awebai/oats/blob/main/docs/implementation.md),
under "Tests and gates", and its tests. Keep those values there rather than
maintaining a competing table here. When a fixture gains an SSH control
socket, its path-budget checks should exercise the resolved temporary root;
runner regressions should retain the nested fixture-parent marker and leftover
visibility checks. These code/test checks are the prevention route. This
harvest neither changes the runner nor certifies present regression coverage.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-env, 2026-10-15; notes/ssh-socket-budget-prefixes-not-runner.md.

1. The captured proposal and named note attribute the rejection and accepted
   limit to the developer's hand-back for
   [awebai/oats#1025](https://github.com/awebai/oats/issues/1025) piece 2 and
   [awebai/oats#1152](https://github.com/awebai/oats/pull/1152). The proposal
   reports CI path failures and a green macOS run after shortening fixture
   paths. These are source-reported observations, not independently audited
   CI, implementation or acceptance receipts; no explicit human acceptance
   is inferred.
2. Checked by the knowledge maintainer at review of the harvest. The
   repository's
   [implementation documentation](https://github.com/awebai/oats/blob/main/docs/implementation.md)
   after [awebai/oats#1152](https://github.com/awebai/oats/pull/1152) (merged
   2026-10-15) keeps the 20-character relocation to `/tmp`, states the
   resolved-parent limit of 12 characters with the warning failure beyond it,
   and names `test/left-behind.test.mjs` as pinning the rule with nested runs.
   The rejection of the lower threshold itself appears in neither the PR nor
   the docs; it rests on the source's note.
