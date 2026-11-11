---
type: Lesson
title: A tested-aw bump rests on aw's own tag-to-tag diff, not on a relayed change list
description: Before oats.aweb records a new tested aw, read the aw source paths oats.aweb consumes across every tag from the old tested release to the new one, and write the release note from that; a change list relayed with the request is someone's selection and can miss what reaches oats.aweb.
about: [system/oats-aweb, workstream/provider-integration]
kind: lesson
id: ins-264b2558ea7c
tags: [oats.aweb, aw-version, tested-bound, release-notes, wake-broker, review]
timestamp: 2026-11-11
---

# What was observed

Moving oats.aweb's tested aw from 1.36.56 to 1.36.58 (awebai/oats-aweb#213), the request
came with three upstream changes taken from aweb's release notes: a Go toolchain bump, unused
wake-broker settings documented as ignored with `aw wake deregister`'s help text changed, and
registry 401/403 answers refused instead of served from cache. Each of those checked out, and
none reaches oats.aweb (the third is in the server's AWID library, not in aw). The release note
first said so and stopped there.

An adversarial review that diffed the two tag trees found two more changes, both first shipped
in aw-v1.36.58 and both in the broker oats.aweb drives and reads:

- the stream phase `quarantined` (a refused stream, stopped for good) became `refused`: never
  admitted, retried every 1 to 15 minutes with the identity re-read from disk, with new `cause`
  and `next_attempt_at` fields in `aw wake status`;
- the broker's lock became an OS file lock that a broker from an earlier aw does not hold, so the
  old broker must be stopped before the new one starts.

oats.aweb's readiness did not know the new phase. It still failed closed (aw marks the whole
target not admitted, so readiness gives `wake-stream-unavailable` with its general message), but
the release note would otherwise have told operators that nothing changed.

# Rule

- **Diff what oats.aweb consumes, tag to tag.** List the commits on the aw paths oats.aweb runs or
  parses (the CLI commands it calls, the wake broker and its status JSON, the identity and team
  commands) across `aw-v<old-tested>..aw-v<new-tested>`, every intermediate release included, and
  find which tag first shipped each change (`git tag --contains`). aweb's CHANGELOG is a poor
  index: at `aw-v1.36.58` its newest aw release-preparation section is aw 1.36.49, later changes
  sit under one shared Unreleased section, and most commits in the range touch no CLI path.
- **Check a vocabulary oats.aweb hard-codes** against the new release's source: a phase, state or
  error-code list that the provider matches on (here the broker's stream phases) can change without
  any test failing, because the provider's unknown-value path still fails closed.
- **Write the release note from that diff**, naming for each change what oats.aweb does with it,
  and quote the message readiness actually prints, tested with the status as the new aw reports it
  (aggregate and per-stream fields together), not one field changed in isolation.
- **CI's real-aw run is the behaviour evidence, not the release note's.** A green matrix proves the
  journeys pass; it does not prove that the note says what changed.

# Elimination route

The vocabulary check could be code: a test that compares the provider's hard-coded lists (such as
readiness's stream phases) with the values the tested aw defines would fail when they drift,
instead of the provider failing closed in silence. Fixing only the `refused` phase does not do
that ([awebai/oats-aweb#214](https://github.com/awebai/oats-aweb/issues/214), open on
2026-11-11). Until such a test exists, the tag-to-tag diff is the only check.

# How it relates

This refines [the suite's real-aw pins age with the installed client](/nodes/oats-aweb-expert/lessons/real-aw-pins-age-with-the-installed-client.md):
a pin is a fact about one client version, and so is every value the provider matches on. The
coupling of the tested bound to required real-client jobs is owned by
[newer-than-tested warnings follow the service's release authority](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md);
the bound's public file by
[the tested aw version is published by oats.aweb](/nodes/oats-maintainer/decisions/tested-aw-is-published-by-oats-aweb-and-pinned-only-for-byot.md).
The note written this way is what a kernel release that moves the oats.aweb pin carries forward, as
[a provider pin carries its upgrade consequences into the kernel release](/nodes/oats-maintainer/lessons/provider-pin-upgrade-notes-belong-in-the-kernel-release.md)
requires.

# Citations

1. [awebai/oats-aweb#213](https://github.com/awebai/oats-aweb/pull/213), opened 2026-11-11, head
   6f7dec0: its CHANGELOG entry, and its body's account of the two review rounds.
2. aweb tags `aw-v1.36.56` (e3a1d9f) and `aw-v1.36.58` (679d500): `cli/go/wake/stream.go`'s
   `StreamPhase` constants at each tag; commit 177a9a40 (the OS file lock) is contained in
   aw-v1.36.58 and not in aw-v1.36.57.

Maintainer review of oats-knowledge#359 on 2026-11-11 checked these points in aweb and oats.aweb:
- the `StreamPhase` constants at `aw-v1.36.56`, `aw-v1.36.57` and `aw-v1.36.58`;
- the refused retry window (1 to 15 minutes) in `cli/go/run/streampolicy.go` at `aw-v1.36.58`;
- 177a9a40's tag containment;
- that the registry 401/403 change touches only `awid/` and `server/`;
- the CHANGELOG's sections at `aw-v1.36.58`;
- readiness's `STREAM_PHASES` and its general not-admitted message at oats-aweb 6f7dec0.

The review rounds and the reproduction of readiness's message are source-reported. #213 was open
and unmerged at review.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-aweb-tested-1-36-58, 2026-11-11; notes/tested-aw-bump-reads-the-tag-diff-not-the-relayed-notes.md.
