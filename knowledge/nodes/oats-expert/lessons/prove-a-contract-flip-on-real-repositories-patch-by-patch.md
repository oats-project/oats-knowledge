---
type: Lesson
title: Prove a contract flip on the real repositories, one patch at a time, as well as on a state matrix
description: A synthetic state matrix shows which states pass; serving the real repositories from local bare copies under both owners and applying the real patches in order shows how an old client degrades step by step, proves the patches as written, and writes to no remote.
about: [workstream/coordination]
kind: lesson
id: ins-1d1545f72950
tags: [planning, migration, contracts, verification, rehearsal, repositories, evidence]
timestamp: 2026-10-30
---
# A matrix answers "which states"; a replay answers "what each step does"

For a change to declared strings that every member repository carries, the
natural proof is a matrix: every combination of flipped and unflipped
members against the old and the bridge client. The source built one with a
few small members and it answered its question. It could not answer the
one the lead needs: what the real souls experience at each real step.

Replaying the real patches, in the order they will land, over the real
repositories showed what the matrix had no way to show. The old client
degraded in steps: spawns kept working while some members still carried the
old key, then every soul was refused at the last patch. The lock stayed
byte-identical throughout, which is the fact a flip gate rests on. And
because the patches were applied with `git am`, the proof covered the
patches as written, not a hand re-creation of their intent.

Ask for both. The matrix bounds the state space; the replay is the
evidence a gate and a release note are written from.

# The harness, so the proof writes nowhere

- Serve each real repository from a local bare clone, under **both**
  owners' URLs, by rewriting the remote URLs to the bare copies for the
  run. Nothing reaches a remote.
- Isolate the Git configuration (an isolated home and a dedicated global
  config), so the run neither reads nor writes the host's.
- Turn commit signing off in anything scripted: a host whose commits sign
  with a hardware or agent-held key stalls the replay.
- Run the deployment sync first. A spawn that fails for want of a lock
  reads as a finding and is not one.

[Real proof boundaries](/nodes/oats-expert/lessons/real-proof-boundaries-preserve-fixture-isolation.md)
owns the general rule of which boundary must be real and which isolation
must remain; this lesson is its application to a repository contract
change, where the content and the patches are real and the remotes are
not. The move itself and its stages are the maintainer's
[org-move decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-10-30; notes/prove-a-flip-on-real-content.md.

One effort: eight patches over ten repositories, one old client and one
bridge, as the source reports them. The step-wise degradation is specific
to that flip's patch order; the lesson is to replay the real order, not
that every flip degrades in these steps. This harvest did not run the
replay. The bridge's own
[pull request](https://github.com/awebai/oats/pull/1679) reports the same
eight-patch result; it was unmerged at maintainer review, and no declared
string has been flipped, so this is a rehearsal, not a completed move.
What the real transfer later taught, beyond what any rehearsal of the
content showed, is in
[the attestation lesson](/nodes/oats-expert/lessons/a-transfer-leaves-attestations-with-the-old-org.md)
and
[the empty-read lesson](/nodes/oats-expert/lessons/a-check-right-after-a-transfer-reads-an-empty-repository.md).
