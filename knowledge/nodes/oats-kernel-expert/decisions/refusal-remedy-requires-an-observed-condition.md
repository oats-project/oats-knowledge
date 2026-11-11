---
type: Decision
title: A typed refusal carries its remedy only where its condition was observed; an ambiguous Git failure stays Git's
description: When worktree add's switch meets a branch's ref lock, the kernel answers E_GIT_FAILED with Git's message rather than E_BRANCH_EXISTS, because a crashed Git's stale lock looks the same and the remedy would then name a branch that does not exist; the typed code and its remedy belong to the retry's precheck, and reclassifying the lock or adding a held-lock code were rejected.
about: [system/oats-kernel]
id: dec-ec77765e2b4f
tags: [kernel, cli, worktree, diagnostics, remedies, git, concurrency, error-codes, rejected-alternatives]
timestamp: 2026-11-11
---
# Decision

When two `oats worktree add` runs race for one branch, the loser's
`git switch -c` ends in one of two ways, and the kernel answers them
differently on purpose [1]:

- **The switch finds the branch already made.** The kernel reads the ref after
  the failure, sees the branch, and answers `E_BRANCH_EXISTS` with the same
  `details` as the precheck: the branch, the clone and the remedy
  (`<instance>/<branch>`).
- **The switch meets the winner's ref lock before the branch exists**
  (`cannot lock ref …`). The ref still reads as absent, so the answer stays
  `E_GIT_FAILED` with Git's message.

The decided documentation wording is that a racing `add` can end in either
code, and that a caller who retries once the branch exists gets
`E_BRANCH_EXISTS`, with its remedy, from the precheck.

The rule behind it: **a typed refusal carries a remedy only where the kernel
read its condition.** When a failure cannot be told apart from a different
cause, the kernel answers the generic code with the tool's own message and
documents that the operation can end in either code. The retry is where the
condition becomes observable, so the retry's precheck is where the typed code
and its remedy belong.

# Why

A lock left behind by a Git that crashed looks identical to a lock a live
competitor holds, and in that case the branch does not exist. Answering
`E_BRANCH_EXISTS` would send the caller to rename around a branch that is not
there. The kernel classifies by what it read (does the ref exist after the
failure), never by what the failure probably means.

This carries the unclassified-failure rule of
[the CLI-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
from categories to remedies: there, an unrecognized Git failure stays
`unknown` with Git's last line rather than a plausible cause; here, a typed
code whose remedy assumes a condition is withheld until that condition is
read. It is the sibling of
[the non-key --repo decision](/nodes/oats-kernel-expert/decisions/non-key-repo-refusal-names-the-key-never-a-git-remedy.md),
which builds a remedy only from an input that parses as what the remedy
assumes.

# One construction for one typed code

Both paths that answer `E_BRANCH_EXISTS` build its remedy text and `details`
in one place. Before this decision the race path carried only the branch,
while the precheck and the documentation gave the clone and the remedy [1].
That is the drift recorded in
[the two-layer CLI lesson](/nodes/oats-kernel-expert/lessons/per-command-enumerations-drift-from-the-dispatch.md),
and the fix is the shared construction in code, not a reminder to keep two
call sites aligned.

# Rejected alternatives

- **Reclassifying `cannot lock ref` as `E_BRANCH_EXISTS`.** Rejected by both
  maintainer sides for the stale-lock reason above [1].
- **A new code for a held lock.** Beyond the decided scope, and a caller
  would do nothing different from what `E_GIT_FAILED` already asks: retry
  [2].

A future instance asked to "complete the contract" for an ambiguous Git or
system failure on a path that already has a typed code treats that as a
contract question for both sides. It does not reclassify on the probable
cause.

# Limits

- Both sides decided the `worktree add` branch race. The general rule is the
  source's reading of that decision for any check-then-act path whose failure
  can come from a live competitor or from a crashed one; it has not been
  decided separately.
- The implementing change was open, not merged, when this was harvested, so
  the documentation and the shared construction were not yet on the accepted
  branch.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-race-contract, 2026-11-11; notes/remedy-only-where-condition-observed.md.

1. The harvest read public issue
   [oats-project/oats#1865](https://github.com/oats-project/oats/issues/1865),
   opened on 2026-11-11, whose body reports both gaps, recommends narrowing
   the documented answer instead of reclassifying, and gives the stale-lock
   reason, and
   [comment 6799619381](https://github.com/oats-project/oats/issues/1865#issuecomment-6799619381),
   which agrees to both items for the other side and adds the either-code
   wording, the retry's precheck answer and the single construction for both
   paths. Both are maintainer-lane records under team accounts, not
   independently established human acceptance.
   [oats-project/oats#1867](https://github.com/oats-project/oats/pull/1867)
   was open at `9bcad122def2` with ten successful checks when read; its
   description states the documentation change, the shared construction and
   one regression test per item. This harvest inspected no implementation,
   reran no test, did not read the documentation on the accepted branch and
   certifies no merge or release.
2. The rejected held-lock code and its reason are the source's record in the
   named note. The issue and the change's description do not discuss it.

No human-accepted decision is superseded.
