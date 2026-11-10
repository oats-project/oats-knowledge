---
type: Decision
title: Preserve recovery authority until the outcome is proven
description: Partial failures must retain the identity and obligations needed for retry rather than mistaking plausible descriptors for completed cleanup.
about: [system/oats-kernel]
id: dec-1fe1a70600e5
tags: [kernel, rollback, lifecycle, spawn, retire, fail-closed]
timestamp: 2026-09-21
---
# Rationale

Decided 2026-07-27 during the spawn-rollback hardening reviews, on the
founder's fatal-versus-advisory distinction. A rollback that announces
incomplete external cleanup and then deletes its only retry identity converts
recoverable failure into permanent debt. Preserve the authority and evidence
needed to finish every outstanding category of work, not merely the loudest
failure.

A well-formed descriptor is insufficient: it may name no executable cleanup,
omit an obligation or describe stale configuration. Verify the outstanding
outcome actually occurred before destroying recovery state. Validation asks
*could this work*; verification asks *did it work* — only one of them can be
wrong in the direction that destroys data. An empty failure list is not proof
anything capable of reporting failure ran: a proof obligation of zero is not a
proof. A cleanup probe has three outcomes — absent, present, could-not-verify —
and mapping errors to empty output turns the third into the first. A path in a
message must be the located value, not a reconstruction, and a fail-closed
default needs one loud, explicit override or it is a trap.

**Writes to another live instance are commits.** Perform them after the last
fallible step, atomically, with compensation; the invariant is all-or-nothing —
the new agent live *and* the lineage recorded, or neither. A guarantee spans
producer and consumer: retaining recovery state helps nothing if the reader
does not recognize every way it can appear. Two code paths that owe the same
guarantee and agree today are a divergence that has not happened yet; find
every path that owes it before declaring it kept.

This does not require exporting every engine transaction as a public two-phase
handle. An outer command may journal its surrounding state while composing
ordinary atomic operations, preserving subsystem boundaries.

Retention is not a promise that debt cannot remain. An explicit operator
override transfers unresolved responsibility; it must not be reported as
observed external completion. Keep exact recovery recipes with the current
owning implementation, not in a generalized permission to delete state.

**Recovery derives truth from the object, not from spawn-time metadata**
(lesson 2026-09-21). Retirement
recovery reconstructed a worktree's branch from the metadata recorded at
spawn; a worktree that had legitimately switched branches during its task
could then never pass the recovery comparison, and the instance became
unretirable by the normal path even though nothing was unpreserved. The
refusal itself was fail-closed and *correct*: never edit the peer's metadata,
switch its branch or force-clean its home to make retirement pass — that is
exactly the unverified cleanup this decision forbids and it destroys the
evidence. Verify preservation by hand, record it, and leave the instance
retiring until recovery is corrected. The rule, now in the kernel: recovery derives the branch from the
worktree while it exists and falls back to recorded metadata only when the
worktree is gone, recording the drift as a typed observation. Whether a
worktree-mode instance may drift branches silently at all is a separate
decision, not a patch.

**Recovery proofs measure; recovery primitives fail catchably**
(2026-07-29 → 2026-09-05). Restoring a work tree's staged state once copied
every index row "because copying everything cannot lose anything"; on a real
index that was about 19,000 Git launches and read as a hang. Its safety was an
assumption about what the recovered clone held. The replacement asks the
destination once which staged objects it lacks, copies only those, and
re-checks the *whole* staged set before installing the index: measure,
repair, re-measure, then commit. That is stronger, not weaker, because it
holds however the clone was made. A proof set contains only what the
destination should hold: gitlink rows (mode 160000) name nested-repository
commits that are correctly absent there and are restored by another
mechanism, so including them makes the proof fail on every submodule.
Recovery code also must not use a primitive whose failure is a process
abort: Node 22's recursive `cpSync` dies on an unreadable directory with no
catch, `finally` or rollback running, so the kernel copies hostile trees with
its own hand-walked copy where `EACCES` is an ordinary error. The regression
for such a failure runs in a child process; in-process it takes the test
runner down instead of failing.

# Related

[Retire-hook retry stays inside the completion that was authorized](retire-hook-retry-stays-inside-authorizing-completion.md)
applies this proof obligation to bounded deferred retries and records why
later automatic retirement and cross-home attention claims were rejected.

[Retirement leftovers are reported as facts, not deletion verdicts](/nodes/oats-kernel-expert/decisions/retire-leftovers-are-facts-not-deletion-verdicts.md)
keeps commit reachability separate from preservation of uncommitted work and
records why leftover reporting uses information rather than a cleanup verdict.

[Home process scans state their visibility limit](/nodes/oats-kernel-expert/decisions/home-process-scan-has-an-explicit-visibility-limit.md)
distinguishes unreadable entries from failure of the scan itself;
[a missing tmux socket does not prove server exit](/nodes/oats-kernel-expert/lessons/missing-tmux-socket-does-not-prove-server-exit.md)
records why endpoint loss needs evidence about the work.

[Recovery completeness must be measured against the source, not Git's advertised refs](/nodes/oats-kernel-expert/lessons/recovery-completeness-needs-source-refs.md)
records a transport visibility trap in nested-repository preservation.
[Recovery preserves Git state across ref formats, not just paths](/nodes/oats-kernel-expert/decisions/recovery-preserves-git-state-across-ref-formats.md)
records the separate path/status blind spot and why comparison coverage must
match the copier's semantic preservation obligations.

[External knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md);
[A refusal that needs the old bytes is a pre-commit gate](../lessons/refusal-belongs-before-commit.md);
[A fail-closed guarantee is proven by its first real user](../lessons/fail-closed-mechanism-proven-by-first-user.md);
[Identity and location belong to the resolved object](../lessons/resolved-object-not-referring-string.md).

# Current contracts

- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge, agents/dev-coordinator/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (rollback-retain-retry-state, compose-atomic-engine-operations-with-an-outer-command-journal, cross-instance-writes-commit-last, single-implementation-guarantee, rollback-probes-argv-and-fail-closed, retire-recovery-uses-recorded-branch-not-checked-out-branch).
2. Migrated from agents/cli-dev/soul/knowledge/lessons/batch-existence-check-is-a-measurement.md, gitlink-rows-must-leave-the-proof-set.md, cpsync-aborts-on-unreadable-dirs.md, playbooks/test-process-aborting-regressions.md and agents/dev-coordinator/soul/knowledge/lessons/node-recursive-cpsync-can-bypass-javascript-cleanup.md @ 7838d3ca.
