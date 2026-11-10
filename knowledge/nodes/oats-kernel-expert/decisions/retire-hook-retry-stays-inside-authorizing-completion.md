---
type: Decision
title: Retire-hook retry stays inside the completion that was authorized
description: Retry hook-only retirement debt within the bounded deferred completion, not a later automatic actor, and expose unfinished cleanup through doctor rather than cross-home claims.
about: [system/oats-kernel]
id: dec-8fa7c5b09c05
tags: [kernel, retire, lifecycle, recovery, authority, rejected-alternatives]
timestamp: 2026-11-05
---
# Decision and rationale

On 2026-11-05 both maintainer sides selected bounded retry inside a deferred
self-retire's own completion, paired with an actionable doctor problem [1][2][6].
**The retry remains part of the act that was authorized.** It does not give a
later scheduler, kernel start or resume sweep new permission to retire a home.
This applies [preserve recovery authority until the outcome is proven](preserve-authority-until-cleanup-is-proven.md)
and the [whole-run lifecycle claim](retire-exclusion-is-a-whole-run-claim.md),
without changing either decision's proof or exclusion requirements.

Limit automatic retry to a quarantine whose outstanding debt consists only
of retire hooks that the ordinary quarantine retry can rerun and prove clean.
Use that existing retirement operation under its whole-run claim on each
attempt, retaining the home and its authority until cleanup is proven. The
selected backoff is three further attempts, with roughly 1, 5 and 15 minute
waits after failures, not an unlimited recovery service. A worktree retained
solely so those hooks can be retried is a consequence of hook debt, not a
second independent debt category that should disqualify every worktree home.

The reason for the narrow scope is operational, not just implementation
convenience: transient provider calls may recover without new judgment;
Git, directory or unpreserved-work debt often needs a person. Repeating those
failures would merely keep competing lifecycle acts blocked longer. A plain
retire already has a caller to receive its failure and remedy; deferred
self-retirement is the path whose caller has gone away.

# Why bounded retry also needs an operator-visible problem

A long outage can outlast the completion. The selected `retire-incomplete`
doctor problem exposes unfinished cleanup through the existing problem form,
with the exact located retire command and the capability whose hook failed
last. A half-retired home can retain identity and external obligations; that
is a diagnostic problem, not merely a retained-copy information line.
Preserve doctor's existing problem/exit semantics rather than inferring an
exit code from the word “problem.” Each retry must leave its own hook-outcome
trace in the existing event vocabulary; a record ending at the first attempt
cannot explain later recovery work. The [retire-warning decision](retire-warnings-preserve-event-meaning-and-reader-bounds.md)
applies that requirement to advisory warnings and records why extending the
vocabulary deliberately is preferable to silently widening an existing kind's
meaning.

Rejected alternatives:

- **Retry on a later tick, kernel start or resume sweep.** That would introduce
  another automatic destructive actor after the authorizing act ended. The
  sweep already skips homes with retirement owed; retry must not invert that
  rule.
- **Write an attention claim on the parent.** That creates a cross-home write
  and a clearing obligation across every retire path, and cannot reach a
  parentless instance. This is the same lifecycle cost rejected by the
  [waiting-claim decision](waiting-claims-may-only-withhold-automated-input.md),
  not a prohibition on every authorized cross-home operation.
- **Retry without the doctor problem.** Finite retry alone leaves a long
  outage with only passive failure indicators; it does not resolve the
  visibility gap that motivated the change.

# Refinements and their acceptance limit

The proposing maintainer side posted two later narrowings [3][4]:

- Report when the last retry can **start**, as a lower bound, not when it will
  finish. Hook duration is not bounded, so bounded attempt count and backoff
  do not establish a wall-clock completion deadline.
- Do not diagnose a failed outcome whose home has already gone as an open
  retirement. Removal follows proof or an explicit force transfer of debt;
  a retry remedy naming a nonexistent home would be false. Historical status
  and currently actionable cleanup are different questions.

The implementation account also excludes running or unknown retirements and
live spawns from the actionable doctor problem [5]. This is not permission to
infer failure from a pending marker; the [Desktop lesson](/nodes/oats-desktop-expert/lessons/pending-lifecycle-state-is-not-failure.md)
retains that boundary and owns presentation.

The two narrowing comments record the proposing side's agreement and invite
objection; no answering acceptance appeared in the issue comments read for
this harvest. Retain them as source-selected direction, **not bilateral
approval of the refined shape**. The [contract-refinement agreement rule](../lessons/contract-approval-does-not-carry-across-refinement.md)
remains unchanged. No human-accepted decision is superseded.

# Enforcement and evidence limits

Enforcement belongs in the common quarantine retry and authoritative ownership
checks under the claim, not in a second cleanup engine. Regression targets are
hook-only eligibility, retained work needed for hook retry, proof before
removal, changed pending ownership during a wait, finite attempts, per-attempt
history, and truthful doctor remedies for actionable versus historical state.
The source reports implementation and mutation tests; this harvest did not
run them or audit the implementation. Keeping retry bookkeeping out of the
client-relayed pending marker applies the [CLI-boundary lesson](../lessons/machine-boundary-contract.md#internal-storage-can-be-an-exported-contract).

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-hook-failure, 2026-11-05; notes/retire-hook-failure-design.md.

1. [First-side option A and conditions](https://github.com/oats-project/oats/issues/1747#issuecomment-6657598800), posted 2026-11-05 under `josep-reyero`; read at harvest.
2. [Other-side agreement and additions](https://github.com/oats-project/oats/issues/1747#issuecomment-6657625251), posted 2026-11-05 under `juanre`; read at harvest. These are maintainer-lane records, not independently established human acceptance.
3. [Last-attempt-start narrowing](https://github.com/oats-project/oats/issues/1747#issuecomment-6657679007), read at harvest; proposing-side agreement only.
4. [Home-gone narrowing](https://github.com/oats-project/oats/issues/1747#issuecomment-6657777391), read at harvest; proposing-side agreement only.
5. [Implementation PR #1748](https://github.com/oats-project/oats/pull/1748) was open at `109ac1a6ed9a4730c36a721edda464e86a4908c5` when read on 2026-11-05. Its description corroborates the selected mechanism and reports tests; it does not prove release or deployment. This concept records design rationale, not a current implementation inventory.
6. Verified by the knowledge maintainer at review of the harvest on 2026-11-05. On [oats-project/oats#1747](https://github.com/oats-project/oats/issues/1747), comments 6657598800 and 6657625251 exist under `josep-reyero` and `juanre` and record option A with the conditions and additions summarized above. Comments 6657679007 and 6657777391 exist under `josep-reyero`, carry only the proposing side's agreement and invite objection. [oats-project/oats#1748](https://github.com/oats-project/oats/pull/1748) merged on 2026-11-05 at `109ac1a6ed9a4730c36a721edda464e86a4908c5`, the head read at harvest. These are maintainer-lane records, not evidence of human acceptance. No implementation audit or release was checked.
