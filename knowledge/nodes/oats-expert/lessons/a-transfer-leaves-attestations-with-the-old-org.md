---
type: Lesson
title: A repository transfer leaves its build attestations with the old organisation; put attestation verification in the move's inventory and scope the old-owner fallback to old versions
description: After a GitHub transfer, verifying an earlier release's attestation by repository or by the new owner gets a 404 and only the old owner finds it, so a move plan lists attestation verification among the redirect-dependent paths, verifies new releases by the new repository and old versions only by the old owner, pins each form to its workflow and tag, and tests the verify line's failure paths by failing each step.
about: [workstream/coordination]
kind: lesson
id: ins-5774905f4eb7
tags: [planning, migration, repositories, releases, attestations, supply-chain, verification, shell]
timestamp: 2026-11-04
---
# What a transfer does not carry

GitHub keeps a build-provenance attestation under the organisation where
it was made. A repository transfer moves the repository, its releases and
its redirects; it does not move the attestations of the releases already
made. After the move the source found that every verify form a redirect
would seem to cover failed for earlier releases: `gh attestation verify
--repo <old owner>/<name>` resolved through the redirect to the new
repository and got a 404, and so did `--repo <new owner>/<name>` and
`--owner <new owner>`. Only `--owner <old owner>` found the attestations
of the earlier releases.

The move plan had not listed attestations among what a transfer leaves
behind, and the rehearsal never ran a verify. The onboarding skill's
verify step therefore failed for every existing release on move day, and
no new install got the Desktop until the step was fixed. This is a path
the maintainer's rehearsal of the
[staged move](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)
did not exercise: "a transfer alone is invisible" held for clones, pins
and URLs, not for attestation verification.

# What a move plan does with it

- **Inventory it.** List attestation verification among the
  redirect-dependent paths a transfer must keep working, beside clones,
  pins and raw URLs, and run a real verify of an existing release in the
  rehearsal. The same move showed a second kind of missing entry, a
  hand-kept per-host file a consumer reads that no declaration feeds; that
  is the
  [read-source inventory lesson](/nodes/oats-expert/lessons/a-moves-inventory-follows-what-each-consumer-reads.md).
- **Two verify forms, each bounded.** Verify by the new repository first;
  fall back to the old owner **for old versions only**, the versions
  released before the transfer. Pin each form to its release workflow
  (`--signer-workflow`) and to the tag (`--source-ref`).
- **Reject the open-ended fallback.** A fallback that tries the old owner
  for any version makes the old organisation a second trust root for
  every future release: anyone who can attest under the old owner could
  pass the check for a release they did not build. Limiting the fallback
  to the versions that exist only there removes that.
- **Know what the fallback rests on.** The tool pins owner and repository
  by name, not by repository id, so the old-owner form is sound only while
  the old name is never reused. That is already the move's
  [coherence rule](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md#coherence-rule-never-recreate-a-transferred-name-at-the-old-owner);
  the attestation fallback is one more thing that rule protects.

# Test a verify line by failing each step, not by reading it

Two traps found in reviewing the fix are general to any shell verify line,
and neither is visible on a read:

- An ungrouped `… && A || B && echo OK` lets a failed earlier step (the
  checksum) fall through to the second verify `B` and print OK. Group the
  alternatives: `{ A || B; }`.
- On macOS 26, `sha256sum -c -` exits 0 on empty or malformed input (this
  harvest reproduced it on one host: exit 0 on empty and on malformed
  input, where `shasum -a 256 -c -` exits 1). So `grep <line> | sha256sum
  -c -` passes when the line is missing. Let grep's own status count.

Run the line with stand-in commands and fail each step in turn; a passing
run with every step succeeding proves nothing about the paths that matter.

Elimination route: the verify line's failure paths belong in a test that
runs the real line, which the fix in the OATS repository adds; the
planning rule (attestations in the move's inventory, the bounded fallback)
has no code home and lives here. What a scripted post-move check reads in
the first minute after a transfer is the separate
[empty-read lesson](/nodes/oats-expert/lessons/a-check-right-after-a-transfer-reads-an-empty-repository.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-11-04; notes/attestations-stay-with-the-old-org.md.

One move, one forge, observed on the day the OATS repositories moved. The
source reports reproducing the 404 forms and the passing old-owner forms
with `gh` on a released Desktop asset, and that a wrong workflow, signer
repository or tag fails the pinned forms. The fix is an open
[pull request](https://github.com/oats-project/oats/pull/1738) at harvest
time, not accepted knowledge; this harvest did not run the verify forms.
The `sha256sum` behaviour was checked on one macOS 26 host by this
harvest; the precedence trap is shell semantics.
