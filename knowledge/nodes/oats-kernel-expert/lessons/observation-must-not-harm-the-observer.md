---
type: Lesson
title: Code that observes another agent's tree must not be able to harm the observer
description: Observing a tree someone else works in is a security boundary; Git reads must be helper-free (repo-local config and lazy fetch both run executables) and non-writing, signals need verified PIDs, and untrusted entries are never followed or read blocking.
about: [system/oats-kernel, system/oats-desktop]
kind: lesson
id: ins-5b4696448a96
tags: [kernel, security, git, process, observation, desktop]
timestamp: 2026-10-08
---
# Lesson

Learned 2026-07-22 (Desktop file viewers) and 2026-09-22 (the kernel's
instance Git observation and bounded-custody process kills). The tree being
observed is worked in by an agent, and anything that agent can write is input
to the observer. A "read-only" label on the observing code is a claim to
prove, not a property it has by default.

**Git on a tree you do not own.** Argument vectors stop injection; they do
nothing about Git's own configured helpers. Repo-local config can name an
external diff, a textconv driver, an fsmonitor or hooks, all of which run
executables (a diff driver's output even becomes the patch), and `status`
refreshes the index, which is a write. The instance Git observation API therefore
disables helpers explicitly, does not inherit the caller's Git environment or
global config, takes no optional locks, derives an index revision without
writing, diffs against the captured object id rather than a moving ref, and
re-verifies after the read: HEAD, index or file content that moved during the
read is refused with the fresh observation (`E_STALE_OBSERVATION`), because a
consumer's own generation guards cannot detect an internally inconsistent
result.

**Lazy fetch is another helper path** (2026-10-08). A missing object in a
promisor repository can turn an ordinary Git read into an implicit fetch:
repository-selected transport or credential helpers run as the observer, and
fetched objects are written into the observed repository. Disabling
fsmonitor, hooks and external diff does not close that path. The source
reported reproducing it on Git 2.55 with a configured promisor remote and a
missing staged blob: the recovery copier's object read ran the remote's
configured executable.

Use `GIT_NO_LAZY_FETCH=1` in the Git environments that observe or copy another
agent's state; Git honors it from 2.44 [2]. The deliberate cost is a
missing-object failure (or retirement refusal) for a genuine partial clone,
rather than executing helpers or fetching over the network. The environment
variable was chosen over `--no-lazy-fetch` to avoid rejecting every command
on older Git that does not recognize the option; where Git ignores the
variable (before 2.44), however, this protection is **not enforced**. CLI compatibility is
not proof of helper-free observation. Eliminate the path in the observing
and copying code, not a consumer wrapper, and guard it with the hostile
promisor/missing-object regression case, as
[awebai/oats#809](https://github.com/awebai/oats/pull/809) did [2].

**Retirement reads have a distinct compatibility constraint.** The observation
API's isolation profile is not a universal replacement for lifecycle Git reads. See
[Retire Git reads preserve the spawn baseline's configuration semantics](/nodes/oats-kernel-expert/decisions/retire-git-reads-preserve-baseline-semantics.md)
for the deliberate global-configuration distinction and its filter-driver
residual. The observation API's isolation remains unchanged.

**Never signal an unverified PID.** A failed spawn reports `pid: 0`, and
signalling `-0` addresses the caller's own process group: a timeout kill on a
machine without `git` would have killed the operator's shell, multiplexer
session or the Desktop backend. Every group signal goes through one helper
that refuses anything but a positive safe integer; three copies of the kill
line had drifted within a day. The failed spawn is the common case on the
path that kills, so the test covers the `ENOENT` shape, not only the happy
timeout.

**Untrusted entries are neither followed nor read blocking.** An untracked
symlink is shown as its link text, never followed out of the tree, and a FIFO
or device is never opened for reading. Today the observation gets both from
Git (untracked content is read through `diff --no-index`, which prints a
symlink's target; `status` does not list FIFOs); a hand-written reader would
have to `lstat` first.

**Probe the producer from the consumer's side.** The helper and PID defects
were both found by the consumer, with an inert helper, a `git` shim or a
recording `process.kill`, before wiring the producer, and the consumer
refused to compensate in its wrapper. That is the right division: a wrapper
cannot fix what the producer executes.

# Related

[Resource limits do not prove bounded or incremental reconciliation](/nodes/oats-kernel-expert/decisions/resource-limits-do-not-prove-incremental-work.md)
records the separate acceptance distinction between a protective cap,
algorithmic memory/work behavior and continued progress.

[Cache fetch negotiates before one whole-pack retry](/nodes/oats-kernel-expert/decisions/cache-fetch-negotiates-before-one-whole-retry.md)
records a separate consequence of disabling lazy fetch in a filtered remote
cache and why the repair preserves that prohibition rather than enabling it.

[Recovery copies preserve work, not repository-local Git behavior](/nodes/oats-kernel-expert/decisions/recovery-copies-do-not-inherit-local-git-config.md)
applies the helper-execution concern to configuration left for a later operator.

[Identity and location belong to the resolved object](resolved-object-not-referring-string.md);
[Hook failures and error messages are output channels](hook-and-error-channels-disclose.md);
[The loopback interface is Desktop's trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md).

# Current contracts

- [Current desktop-cli-api.md, instance Git state](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current instance-git.mjs](https://github.com/awebai/oats/blob/main/lib/instance-git.mjs)
- [Current process-group.mjs](https://github.com/awebai/oats/blob/main/lib/process-group.mjs)

# Citations

Evidence: OKF proposals from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08; notes/lesson-lazy-fetch-is-a-helper-path.md and notes/decision-retire-git-read-profile.md.

1. Migrated from agents/oats-expert/soul/knowledge/lessons/read-only-git-observation-is-a-security-boundary.md, never-signal-a-pid-you-did-not-verify.md and agents/oats-desktop-engineer/soul/knowledge/lessons/untrusted-worktree-entries-lstat-before-reading.md @ 7838d3ca.
2. [awebai/oats#809](https://github.com/awebai/oats/pull/809), merged 2026-10-08: sets `GIT_NO_LAZY_FETCH=1` for retire's Git reads and the instance Git observation, documents the Git 2.44 floor, and adds the promisor reproducer as regression tests that skip on older Git. Verified by the knowledge maintainer at review of the harvest.
