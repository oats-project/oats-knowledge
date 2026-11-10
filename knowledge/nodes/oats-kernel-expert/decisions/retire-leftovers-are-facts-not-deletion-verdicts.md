---
type: Decision
title: Retirement leftovers are reported as facts, not deletion verdicts
description: Commit reachability cannot establish preservation of uncommitted work, so leftover listings report bounded facts rather than declaring recovery copies or retained worktrees redundant or safe to delete.
about: [system/oats-kernel]
id: dec-9ec3b1ca7b06
tags: [kernel, retire, recovery, diagnostics, contract, preservation]
timestamp: 2026-10-09
---
# Decision and rationale

The 2026-10-08/09 retirement review chose factual reporting for recovery
copies and retained worktrees, not labels such as "unique", "redundant" or
"safe to delete" [1]. A retention decision is not a later disposal verdict.

Commit reachability answers a bounded question: whether commits are reachable
from refs in the source repository. It does not establish that uncommitted
or untracked contents have been preserved elsewhere. A listing can report
reachability and the uncommitted classes it knows about; combining them into
"redundant" discards the distinction on which preservation depends. Nor does
the existence of a recovery copy prove that no other copy of its bytes exists.

This matters beyond wording. A future disposal operation that trusts the
listing's conclusion would turn a partial observation into permission to
delete work. Keep the facts and their limits visible rather than exporting
such a conclusion. This is a specific application of
[preserving recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md),
not a new deletion authorization.

# Why the information belongs in diagnostics

The source reports that both maintainers agreed to documentation and
`oats doctor` information lines during stabilization [1]. The placement was
chosen for its semantics and compatibility, not because every existing
output collection was interchangeable:

- **Information, not warnings.** A leftover is not itself a fault. The
  information collection was already free text, whereas the warnings
  collection had a documented shape for hook events.
- **Not the retirement plan.** A plan concerns the instance being retired;
  these leftovers belong to already-retired instances. Adding them would
  change a Desktop-facing contract as well as mix two subjects.
- **Not a new status payload in this change.** Status rows with a new JSON
  key were treated as a new surface and deferred, rather than smuggled into
  the stabilization repair.

These are the reasons for the reviewed scope, not a permanent prohibition on
an explicitly reviewed future status or disposal interface. The disposal verb
was deferred together with its planned guards [2]; a plan recorded on an
issue is not a reviewed disposal contract, and none is promoted here.
Current output shapes and inspection/restoration steps belong in the
[repository's lifecycle documentation](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md),
not in a second operational recipe.

# Unknown is an honest observation

The listing must not execute a repository-selected program merely to make
its answer look complete. The source identifies declining Git status where
content filters are configured, and declining reads of submodule worktrees,
as applications of that boundary [1]. Report the affected fact as unknown
and explain why rather than weakening the observer to obtain a value.

The general helper-free observation policy and its Git-version limits remain in
[Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md).
Declining a filtered status here does not contradict
[Retire Git reads preserve the spawn baseline's configuration semantics](/nodes/oats-kernel-expert/decisions/retire-git-reads-preserve-baseline-semantics.md),
whose recorded residual lets a repository-named filter run during
retirement's own status. Retirement compares against a stored spawn baseline
and must keep its semantics; a leftover listing has no baseline to stay
comparable with, so it can decline [2]. Do not unify the two in either
direction on the strength of this decision, which neither replaces those
policies nor certifies every listing implementation as inert.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-09; notes/decision-retire-leftovers-facts-not-conclusions.md and notes/plan-703.md.

1. The proposal and decision note supply the decision, rejected placements and source-attributed agreement by both maintainers during the 2026-10-08/09 review of [awebai/oats#703](https://github.com/awebai/oats/issues/703), with documentation in [#813](https://github.com/awebai/oats/pull/813) and doctor information in [#836](https://github.com/awebai/oats/pull/836). The plan note supplies the earlier alternatives; its example still used a "unique" label, which the later decision explicitly rejects. The harvest did not inspect acceptance messages or independently audit implementation or merge history; the attribution is not proof of human acceptance. No current issue state or approval of the deferred disposal plan is inferred.

2. Verified by the knowledge maintainer at review of the harvest. The plan comment on [awebai/oats#703](https://github.com/awebai/oats/issues/703) of 2026-10-08 records the scope as agreed by both maintainers: documentation, then doctor information lines with no new key and the retirement plan untouched, with status rows carrying a new key and a dispose verb deferred as new surfaces. A correction on the issue the same day withdraws the plan's "unique by definition" sentence: a retire that retains the worktree leaves the same uncommitted bytes in the recovery copy and in the retained worktree, so what holds is only that they are in no commit. [#813](https://github.com/awebai/oats/pull/813) merged on 2026-10-08 and [#836](https://github.com/awebai/oats/pull/836) on 2026-10-09, each with APPROVE verdicts from both maintainers posted on the PR. #836's description records the facts-never-conclusions rule with a test asserting the three labels are absent, the declined status under a configured content filter, never entering submodules, and that doctor declines filters where retirement cannot because doctor has no baseline. The repository's `docs/desktop-cli-api.md` documents doctor's warnings as the capability-warning shape and its information as lines. The verdicts establish maintainer review of those PRs, not human acceptance of this concept; the reasons given for rejecting the warnings and plan placements rest on the source's note.
