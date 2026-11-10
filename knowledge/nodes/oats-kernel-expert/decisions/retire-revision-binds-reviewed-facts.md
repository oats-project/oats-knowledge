---
type: Decision
title: A retire revision binds reviewed facts, not selected exceptions
description: A retire revision covers the facts the caller reviews in every home, with code-derived field coverage and mutation tests replacing exception lists and untested claims of derivation.
about: [system/oats-kernel]
id: dec-68fac0fc7342
tags: [kernel, lifecycle, retire, freshness, verification]
timestamp: 2026-10-15
---
# Decision

The source reports agreement on 2026-10-13 by both maintainer sides and the
Desktop owner: bind the recorded work mode and the observed reading of
`work/` into every retire plan's revision, including the repository read from
Git where one exists. Do not bind them only where the observation differs
from what the mode would predict [1]. This refines the freshness side of
[exclusion, freshness and replay](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md);
it does not replace the whole-run claim or make a revision an exclusion lock.

# Why the exception list was rejected

The conditional rule missed the case where the observation followed the
record: changing the recorded mode could change the plan without changing
its revision. The source's matrix of recorded modes against objects at
`work/` found a guarded apply accepted under an earlier revision when the
work path was absent. The same gap was reported at an earlier release, not
only after the conditional rule was added. This is evidence of stale
reviewed facts being accepted, not a reported loss of work.

Adding the missing pairs to the conditional was rejected. It would move
fewer revisions at upgrade, but each new pair would extend the list and the
next omission would be found by accident. The accepted cost was a one-time
revision change for every home at upgrade. Preserve the revision's form,
return the fresh plan with `E_PLAN_STALE`, and replay a recorded outcome for
the same key before reading a new plan. Invalidating a plan is not permission
to discard its operation's receipt.

# Coverage is a property to test, not another hand-maintained list

Every fact presented as reviewed needs revision coverage. Enumerate from the
code what the plan reads and displays, marking each fact bound or unbound
with a reason. A fact deliberately left unbound because it moves on its own
must be named in the contract. A list of selected bound fields alone repeats
the exception-list failure in another form.

A claim that a value is bound through something it is derived from also needs
an adversarial check: change that value while keeping the claimed input fixed.
The source reports a child's agent name being treated as derivable from its
home even though it came from a separate soul file; two plans then differed
under one revision. Where the derivation cannot cheaply be established,
binding the value itself is preferable to relying on the assertion.

The code/test elimination route is revision construction backed by a
coverage-derived mutation test: rewrite each relevant input in turn and
check that a changed reviewed fact invalidates guarded apply. Exercise the
mode/observed-work matrix, not only the original failing pair. The residual
specification judgment belongs in the existing `plan-and-spec` practice:
when a value claims to cover what makes an apply safe, ask for its coverage
argument and the tests that can falsify it.

# Extra-tree refinement

The source reports extending the same rule on 2026-10-14 to each extra tree's
attached children and names that cannot be placed. The collection participates
in the revision even when empty. This explicitly supersedes the earlier
extra-tree choice to bind it only when present; it is the same rejected
exception pattern, not a separate freshness policy [2]. The earlier choice
is source-reported history, not an accepted concept being silently rewritten.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle, 2026-10-14; notes/a-plan-revision-binds-what-the-plan-shows-not-a-list-of-exceptions.md.

1. The note attributes the decision to [awebai/oats#1065](https://github.com/awebai/oats/issues/1065), comments 6136354062, 6136286638 and 6136293402; the coverage refinement to comment 6136837644 and the derivation counterexample to the fourth review round. The proposal reports implementation through [#1129](https://github.com/awebai/oats/pull/1129). Agreement, probes and implementation are source-reported, not independently audited here; maintainer-instance agreement is not inferred human acceptance.
2. The note attributes the extra-tree extension to [awebai/oats#964](https://github.com/awebai/oats/issues/964), comment 6172335286. The proposal names [#1186](https://github.com/awebai/oats/pull/1186) as the implementing PR, open at the checkpoint. This records the rationale and explicit supersession, not current shipment status.
3. Verified by the knowledge maintainer at review of the harvest on 2026-10-15. On [awebai/oats#1065](https://github.com/awebai/oats/issues/1065), comments 6136286638, 6136293402 and 6136354062 record the oats-expert side, the Desktop lane and the maintainer lane each choosing to bind the recorded work mode and the reading of `work/` in every home, and the first gives the rejection of adding only the missing pairs; comment 6136837644 extends the binding to the recorded repository and branch. #1065 is closed and [#1129](https://github.com/awebai/oats/pull/1129) merged on 2026-10-14. Comment 6172335286 on [awebai/oats#964](https://github.com/awebai/oats/issues/964) records the lifecycle lead superseding the earlier extra-tree choice at the rebase; #964 and [#1186](https://github.com/awebai/oats/pull/1186) were open at this review. These are instance and lane records, not evidence of human acceptance. The derivation counterexample, the mode/work matrix, the empty-collection binding and the implementation were not checked, and no release was checked.
