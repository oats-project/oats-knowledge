---
type: Decision
title: A fixture's tmux directory preserves evidence of unfinished cleanup
description: A fixture's private tmux directory stays outside its removable base because relocating it inside would let base deletion hide an unended fixture and its surviving server.
about: [system/oats-kernel]
id: dec-cc3f5757e866
tags: [kernel, testing, tmux, cleanup, evidence]
timestamp: 2026-10-15
---
# Decision and rejected alternative

Fix a leftover by ending the fixture, not by relocating its private
`TMUX_TMPDIR` inside the fixture's base. The external directory is deliberate:
it leaves evidence for the root test run's leftover guard when a test deletes
its base without ending the fixture [1][2]. External here means outside that
fixture base, not permission to move it outside the test run's guarded scope.

Putting the tmux directory inside the base was rejected because recursive
base deletion would then erase both the fixture files and the socket. The
check would look clean while the server could remain alive. This applies the
existing finding that
[a missing tmux socket does not prove server exit](/nodes/oats-kernel-expert/lessons/missing-tmux-socket-does-not-prove-server-exit.md);
it does not create another liveness rule. In the reported fixture failures,
the surviving external directory was the leftover guard's visible signal of
an unended fixture, not a complete process-leak detector.

The source's 2026-10-14 measurement found four test files deleting their bases
without ending their fixtures. The correction was fixture teardown, not a
change to directory placement. The durable decision is to preserve the
failure signal rather than make a cleanup assertion green by deleting its
evidence.

# Enforcement and limits

Fixture lifecycle code and regression tests, not a remembered warning, should
own cleanup. Bind teardown to the test lifetime or explicitly end the fixture;
base removal alone is not teardown. A regression for the guard should
distinguish an unended fixture whose base was removed from one that was
properly ended, and clean up its own test server afterwards. This is an
elimination route, not a claim that the harvest verified such coverage.

The [nested-run path decision](/nodes/oats-kernel-expert/decisions/ssh-fixture-paths-preserve-nested-run-visibility.md)
protects the same guard from a different shortcut: moving work beyond its
observation scope. Current test rules belong in the repository's
[implementation documentation](https://github.com/awebai/oats/blob/main/docs/implementation.md),
under "Tests and gates"; this concept records why a tempting alternative
was rejected.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-env, 2026-10-15; notes/fixture-tmux-dir-stays-outside-its-base.md.

1. The captured proposal and named note report the measurement and rejected
   relocation during [awebai/oats#1025](https://github.com/awebai/oats/issues/1025)
   piece 2, with fixture repairs in
   [awebai/oats#1152](https://github.com/awebai/oats/pull/1152). Implementation,
   merge and test outcomes are source-reported; the harvest did not inspect
   the source work tree, replay the measurement or independently audit the PR.
   No explicit human acceptance is inferred.
2. Verified by the knowledge maintainer at review of the harvest.
   [awebai/oats#1152](https://github.com/awebai/oats/pull/1152) merged on
   2026-10-15; its description gives the measured cause (files that removed
   their fixture's base without ending it) and records the rejection of moving
   `TMUX_TMPDIR` inside the base because the outside leftover is the sign of an
   unended fixture. The repository's
   [implementation documentation](https://github.com/awebai/oats/blob/main/docs/implementation.md)
   now states the rule (the private directory is made beside the base, never
   inside it, and the root run fails on it) but not the rejected relocation,
   which is why that rationale is kept here. This establishes maintainer
   review of the merged PR, not human acceptance.
