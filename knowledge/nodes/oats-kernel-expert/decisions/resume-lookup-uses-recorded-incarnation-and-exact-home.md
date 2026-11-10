---
type: Decision
title: Resume lookup uses the recorded incarnation and exact home
description: Resume conversation lookup uses recorded creation and start times with exact home cwd, because native receipts survive same-name respawns and a newest-conversation lookup is not a complete-history inventory.
about: [system/oats-kernel]
id: dec-1a981e699861
tags: [kernel, recovery, native-record, incarnation, evidence]
timestamp: 2026-10-27
---
# Decision and rationale

For resume conversation lookup, bound native records by the home's recorded
`createdAt` and the receipts' own `startedAt`, and require the conversation's
cwd to equal the instance home. The native-record receipts outlive retirement
and are reused by a same-name respawn. Their location therefore identifies a
pathname, not an incarnation; an otherwise valid receipt can belong to the
previous instance at that address.

Use recorded creation time rather than filesystem birth time for this
selection. The existing [pi fresh-home decision](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md)
records why birth time can be unavailable or unreliable. Its approximate
startup-nudge signal is not authority to choose a conversation for recovery.
This decision does not change that bridge heuristic or add a new kernel
history dependency to it.

Exact cwd equality is deliberate: a transcript started in `work/` is not the
instance's conversation, even though its path lies within the home. A helper
that accepts subdirectories answers a different question.

Likewise, selecting the newest eligible conversation does not require a
complete historical inventory. Do not reuse a complete-history query merely
because it already enumerates sessions: its completeness requirement and
within-home predicate are both wrong for this selection. This is a narrow
choice of query semantics, not permission to accept malformed receipts,
bypass native-record integrity checks or invent a missing conversation.

# Boundary and enforcement

The [maintainer's recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
already owns incarnation-bound recovery and the rejection of continue-latest
at a reused path. This concept adds the kernel lookup's evidence choices,
not a second recovery policy or permission to launch.

Enforce the predicates in the lookup and cover same-name respawns, old
receipts, unavailable birth time, exact-home versus work-directory cwd, and
newest-selection versus complete-inventory semantics in regressions. These
are enforcement targets, not coverage verified by this harvest. A selected
record alone does not prove that the harness can resume it.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/decision-resume-lookup-incarnation-uses-createdat.md.

The source identifies native-history and session-lookup code at `d5443cc3`,
within [awebai/oats#1559](https://github.com/awebai/oats/issues/1559). Receipt
retention and rejected query behavior are source-reported code-reading
findings; this harvest did not audit the implementation or exercise a
resume. The proposal explicitly leaves Codex resume unproven. No human
acceptance or change to the pi bridge's accepted approximation is inferred.
