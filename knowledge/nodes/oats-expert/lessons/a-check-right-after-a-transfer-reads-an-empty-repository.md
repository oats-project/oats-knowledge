---
type: Lesson
title: A check run within a minute of a transfer can read an empty repository; a post-move check refuses empty reads and retries, and a timed-out transfer call is read before it is repeated
description: Right after a GitHub transfer, git may answer 403 "repository disabled" for about a minute, so a scripted post-move check that compares an empty read passes or fails on nothing; make it treat no tags or no head as an error and retry, and read the repository's owner before repeating a transfer call that timed out.
about: [workstream/coordination]
kind: lesson
id: ins-441108e6bf63
tags: [planning, migration, repositories, verification, retries, tooling]
timestamp: 2026-11-04
---
# An empty read is not a result

On the largest repository of the move, the scripted post-move check ran
within a minute of the transfer. Git answered 403 "repository disabled".
The check counted zero tags and compared the head against empty output,
so whatever it printed meant nothing. A rerun a minute later passed with
every tag present.

The rehearsal had seen such 403s, but lasting seconds, on small
repositories, with a check that came later; the source reports that on a
large real repository the window was long enough to catch the check.
The danger is not the failure but the pass: a check that treats an empty
read as data can fail for no reason, or pass for no reason, and the
second is the one nobody looks at.

# How the check and the retry are written

- **Refuse empty reads.** A post-move check that finds no tags or no head
  does not compare; it reports the read as not yet available, waits and
  retries, and compares only once it has read something.
- **Read before repeating a transfer call.** The same day, the first
  transfer request timed out during a forge incident and its retry got a
  server error; nothing had moved, and the transfer went through once the
  incident cleared. A transfer call that times out may or may not have
  happened. Before posting it again, read the repository's owner and act
  on what it says.

Both belong in the move's own tool: the check command fails on empty reads
and retries, and the move command reads the owner before it posts again.
That tool is one task's; the lesson for any scripted repository move is
the one above. The move's stages and why the transfer travels alone are
the maintainer's
[staged move decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md);
what the transfer leaves behind for release verification is the
[attestation lesson](/nodes/oats-expert/lessons/a-transfer-leaves-attestations-with-the-old-org.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-11-04; notes/check-right-after-a-transfer-reads-empty.md.

One move, one forge, one empty read and one timed-out call, as the
maintainer's record of the run reports them to the source; this harvest
did not observe the transfer. The length of the window is the source's
estimate from one repository, not a measured bound.
