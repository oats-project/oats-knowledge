---
type: Lesson
title: A refusal names a destructive remedy only for a target it has verified
description: A refusal must name its whole fix, but when the fix is removal by hand the command first proves the path is what the remedy assumes (a lock directory, by existence and name); and a caller that swallows a refusal to serve stale data carries the refusal's fix in its stale reason.
about: [system/oats-okf]
kind: lesson
id: ins-d176620c4b6c
tags: [lesson, okf, locks, refusals, error-messages, unlock]
timestamp: 2026-11-12
---

# The rule

The package's refusals name their whole fix: the command to run, with the real values (the rule oats-okf #143 states
for its lock refusals). That rule has a limit. When
the fix is something the operator does by hand and cannot undo (remove a directory), the refusal is an instruction
that will be followed literally, on whatever path the operator typed. So the command proves the target is what the
remedy assumes before it names the remedy, and answers something harmless otherwise.

For `oats okf unlock` this means three answers for a `--lock` path with no readable owner record: no such path
(`E_NOT_FOUND`, nothing to release), a path that is not a directory named `*.okf-lock` or `*.lock` (`E_USAGE`, no
remedy), and only for a directory named as the package names its locks, `E_LOCKED` with the hand removal. A mistyped `--lock` that names the base itself
must never be told "remove the lock directory by hand".

# The second face: a swallowed refusal

A caller that catches a refusal in order to degrade (a consult read that meets a held host cache lock and serves
the last fetched commit) replaces the refusal's text with its own. If the lock can never clear by itself, as with a
lock whose owner is another host, the operator meets the stuck lock only on that path, and the fix written into the
refusal is never shown. The degraded answer's reason must carry the refusal's fix, not only "busy".

# Why

Both were found by an independent review of the change that added the explicit release of a lock owned by another
host (oats-okf #142; pull request #143, merged 2026-11-12), not by its author or its tests. The
first draft printed the hand-removal advice for every path without an owner record, and left the cache-lock path
saying "host cache lock is busy". The author had applied "a refusal names its whole fix" as the whole rule. A test
now passes the base's own path as `--lock` and asserts no removal advice, and another asserts the stale reason
carries the release command.

# How to apply

When writing or reviewing a refusal: ask what the operator does if they follow it literally on a wrong argument.
If that is destructive, verify the target first. Then search for callers that catch the refusal's code and check
what they say instead.

Related: [a --repo that is not a repository key is refused with the key to pass, never with a Git remedy](/nodes/oats-kernel-expert/decisions/non-key-repo-refusal-names-the-key-never-a-git-remedy.md)
(the kernel's case of a remedy that must not be built from a wrong input) and [a client's sentence must hold at every
producer of a kernel code](/nodes/oats-desktop-expert/lessons/client-wording-must-hold-at-every-code-producer.md) (the
same audit from the caller's side).

Evidence: OKF proposal from oats-okf-expert/oats-okf-followups-okf-expert, 2026-11-12; notes/lock-refusal-must-not-advise-removing-an-unverified-path.md.
The review history and both corrections were verified by the knowledge maintainer against the PR record and the merged
commits (citations below).

# Citations

1. oats-okf issue #142: https://github.com/oats-project/oats-okf/issues/142
2. oats-okf PR #143, review-loop record (round 1 asked for both corrections): https://github.com/oats-project/oats-okf/pull/143#issuecomment-6828336392
3. oats-okf commit 7804eeb0c7 (the `E_NOT_FOUND`/`E_USAGE` answers, the cache-lock `STALE` reason, the test passing the base as `--lock`) and commit 1ae4502e5f (the test of the `STALE` reason's release command), merged in PR #143.
