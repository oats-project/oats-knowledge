---
type: Lesson
title: A transfer rehearsal must check what the forge returns and keeps per owner, not only that operations succeed through the old name
description: A rehearsal that proves every operation succeeds through a redirected old name misses tools that compare the new name the forge returns and state the forge keeps per owner, so before a move inventory what each consumer reads, including hand-kept host files and returned URLs, and change the consumers that will break before transferring.
about: [workstream/oats-direction, workstream/coordination]
kind: lesson
id: ins-70dd2b076899
tags: [migration, repositories, rehearsal, planning, stewardship]
timestamp: 2026-11-04
---
# What the rehearsal proved, and what it did not

The rehearsal behind the
[staged move decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)
transferred real throwaway repositories and ran every operation OATS
performs through the **old** name: sync, spawn, onboarding, clones on old
remotes, pushes, issues, PRs, REST writes, every pin type, Actions with
secrets, and the harvester's and trigger's `gh` reads. All of it passed,
and the rehearsal concluded that a transfer alone is invisible to OATS and
only changing declared strings breaks anything. That conclusion held for the
operations it ran, not for every consumer.

The rehearsal had asked one question: *does the operation succeed through
the old name?* It had not asked two others:

- **What does a tool do with the new name the forge returns?** A redirect
  makes the call succeed, but the response names the new owner. A tool that
  compares that response with the name it was given sees a mismatch.
- **What does the forge keep per owner rather than per repository?** A
  transfer moves what belongs to the repository. Anything stored under the
  organisation stays there, and a lookup by the repository's new identity
  finds nothing.

Both bit on the day of the real transfer (2026-11-04):

- **Build attestations stayed with the old organisation**, so verifying any
  earlier release against either repository name failed and onboarding
  stopped installing the Desktop. The mechanics and the two-signer,
  version-gated verify form are the generalist's
  [attestation lesson](/nodes/oats-expert/lessons/a-transfer-leaves-attestations-with-the-old-org.md).
  The maintainer's part of it: the rehearsal had named attestation as a
  limit it could not exercise, and the plan deferred the verify-instruction
  change to the first new-owner release. A limit the rehearsal names is a
  consumer to change **before** the transfer, not after.
- **OKF harvest publication compared the PR URL GitHub returned with the
  repository it was given**, which came from a hand-kept per-host binding
  file, so every harvest from a host still bound to the old owner was
  called uncertain. The incident and its read-source rule are canonical in
  the generalist's
  [read-source inventory lesson](/nodes/oats-expert/lessons/a-moves-inventory-follows-what-each-consumer-reads.md);
  the package fix is
  [oats-okf#123](https://github.com/oats-project/oats-okf/issues/123).
  The maintainer's part of it: the rehearsal had recorded that the
  harvester's `gh` calls work through the old name and compare no
  repository strings. Reads do; publication does not.

# The lesson

In any move that changes an identity the forge redirects, inventory **what
each consumer reads**, not only what each operation does:

- the strings the project declares, which the move plan already lists;
- **hand-kept host files** that name the identity and that no command
  writes or checks, inventoried by what each consumer reads and who writes
  it, as the
  [read-source inventory lesson](/nodes/oats-expert/lessons/a-moves-inventory-follows-what-each-consumer-reads.md)
  sets out;
- **values the forge returns**, URLs above all, wherever a tool compares
  them with what it sent;
- **state the forge keeps per owner** rather than per repository, so that a
  lookup by the repository's new identity returns nothing for the past.

For each, decide before the transfer whether it moves with the repository,
needs a bridge, or needs its consumer changed first. A rehearsal that only
shows operations succeeding cannot settle these; a rehearsal that reads the
responses and lists what lives under the old owner can.

A consequence for the staged move itself: a string that nothing in the
bridge compares, but that some consumer does, is not protected by the
bridge and may have to move ahead of the bridge's gate. That is why the
knowledge-store binding moved before the string flip
([open state of the decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)).

# Elimination route

Comparisons of forge-returned URLs should accept the canonical name GitHub
returns for a redirected repository, or compare canonical identities; that
fix is the owning package's. Host files that name a moved identity should
be written or checked by a command, so a move can list them. Neither is
delivered by this lesson; until they are, the inventory above is the
planning rule. The package fix was decided on 2026-11-06 as
[publication proven by the forge read-back](/nodes/oats-maintainer/decisions/publication-is-proven-by-the-forge-readback.md),
reported not yet built at that date.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/haiku-oats-migration-maintainer,
2026-11-04; notes/transfer-rehearsal-result.md;
notes/attestations-stay-with-the-old-owner.md;
notes/harvest-publication-compares-the-pr-url-literally.md.

The rehearsal's scope and the two breakages are source-reported from one
move of seven repositories on one forge. The attestation fix
[oats#1738](https://github.com/oats-project/oats/pull/1738) was read as
merged; the publication issue was read as open; this harvest did not run a
verify, a harvest or a transfer. The per-host binding edits are the source's
report. A new-owner release's attestation form is unproven until the next
release.
