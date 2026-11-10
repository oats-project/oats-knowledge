---
type: Decision
title: An idle waiter's checkpoint wake belongs to the waiter
description: A waiter-owned kernel job supplies an external checkpoint without depending on harness timers or messaging, but does not prove a child stalled or guarantee timely delivery.
about: [workstream/provider-integration]
id: dec-13b1b09f75c8
tags: [integration, delegation, scheduling, harnesses, rationale]
timestamp: 2026-10-31
---
# Choice and rationale

The source's 2026-10-30 investigation chose a kernel wake job attached to the
**waiter's own home** to bring an idle lead back to an expected-result
checkpoint. An agent that has ended its turn cannot run its next instruction
without an external wake. Reusing the kernel's wake path avoids making the
checkpoint depend on a particular harness timer or messaging layer, without
requiring a new kernel capability.

This records the source's integration choice and rejected alternatives, not
human acceptance, released delegation guidance or a new lifecycle policy.
The generalist's [overdue-handback lesson](/nodes/oats-expert/lessons/overdue-handbacks-need-a-record-check.md)
already owns why delegated work needs an expected checkpoint and an
authorized record check. This concept adds the wake-selection rationale;
it does not duplicate that coordination rule.

# Why the simpler-looking routes were rejected

- **The waiter's next turn boundary:** an idle waiter may have no next turn.
- **Harness-native timers:** the investigation found Claude's timer to be
  session-bound, and found no equivalent for the tested Codex or pi. That
  was insufficient for a harness-neutral choice, not proof that every
  version of every harness lacks a suitable timer.
- **A wake configured at child spawn:** the reported binding is to the
  child's home, so it wakes the wrong participant in the dependency.
- **A date-pinned cron as a one-shot deadline:** in the investigated scheduler,
  a matching minute missed while the host slept was not replayed. Pinning
  day and month could leave the next match a year away. A daily or weekday
  form offered another opportunity after a miss; it did not provide catch-up
  or an elapsed-time guarantee.
- **A short recurring cron:** it substitutes periodic inspection for an
  expected-result checkpoint and recreates the polling loop the generalist
  lesson rejects. Recurrence chosen for recovery from a missed checkpoint
  still needs a bounded lifetime in the owning delegation procedure.

A checkpoint need not wait for a diagnosis before prompting an authorized
record check or escalation. The source's logged-out Codex had the same coarse
lifecycle observations as a possible stall: a running harness, no waiting
claim, and launch as the latest event. These records did not distinguish a
sign-in screen, a provider stall and long work. Preserve
[producer-reported activity](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md);
unknown activity does not become idle because a result is overdue.

# Limits and implementation home

A wake is an opportunity to reassess, not permission to interrupt or replace
a child. The exact escalation count and replacement policy belong in reviewed
lead delegation guidance, within existing lifecycle authority. Neither this
decision nor a timer establishes that work has stopped progressing.

The reported path needs a functioning host timer and permission to register
the job. A busy harness can defer consumption until a tool or turn boundary;
a sleeping host can miss a scheduled minute. The source also flags that a
wake can start a stopped home: job ownership and cleanup matter, and stopping
alone must not be treated as cancellation. Exact commands and cleanup
semantics belong in the current scheduler and delegation guidance, not a
second operational recipe here.

Two further limits were open at harvest, and the rehearsals settle neither:

- **A wake at an open permission prompt is untested.** A wake reaches a
  running session as one paste and one Enter. Waiting claims are display-only,
  so a set claim does not hold it back, and wake delivery stays outside the
  launch controller that handles known prompts. The rehearsals covered idle
  and busy waiters, not a waiter at a prompt, so whether that Enter can answer
  one is **not established**. Do not assume that it cannot before making the
  wake routine for every waiter. If it can, guidance cannot fix it: holding
  delivery would reverse a documented kernel contract, which is its owners'
  decision, and the "no new kernel capability" reason above would no longer
  hold.
- **Registering the job may itself stop at a prompt.** The permissions
  guidance lists `oats schedule` among the operator acts, with no allow rule.
  Treating a job on an instance's own home as a routine act is a proposal that
  depends on the first limit, not a settled rule.

**Later kernel direction, added at maintainer review of oats-knowledge#228.**
[awebai/oats#1670](https://github.com/awebai/oats/issues/1670) reports that a
wake's Enter does answer an open dialog, and the kernel's direction is now that
[a waiting claim may withhold a wake](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md),
with [partial dialog coverage](/nodes/oats-kernel-expert/lessons/dialog-claims-do-not-enumerate-all-dialogs.md).
Its implementation was open and unreleased at that review, so the first limit
stands until a release carries the hold. Whether the "no new kernel capability"
reason survives, and what either limit now means for this choice, remain this
node's owner's to review. This pointer changes no scheduling decision.

**Later permission ruling, added at maintainer review of oats-knowledge#237.**
The second limit's proposal has since been ruled on: the maintainer's
[own-home checkpoint decision](/nodes/oats-maintainer/decisions/own-home-checkpoint-wake-is-an-instance-act.md)
classifies registering and removing a job on an instance's own home as routine,
conditional on the kernel hold and on `wakeHold` coverage, and leaves both acts
with the classifier, so a prompt there stays possible. At that review
[awebai/oats#1673](https://github.com/awebai/oats/pull/1673) was merged and the
`v0.69.7` tag contained its merge commit, so a release now carries the hold; that
was read from Git, and runtime behaviour was not rerun. The limits above stay as
recorded at harvest. What they now mean for this choice, including the "no new
kernel capability" reason, remains this node's owner's to review.

The implementation route is the existing lead guidance using the existing
scheduler. Reusable acceptance coverage should assert which home is woken,
idle versus busy consumption, behavior at an open prompt, missed-minute
behavior and job cleanup. Those
checks can prevent regressions in the mechanism; they cannot diagnose a
child or confer intervention authority. No skill or scheduler change is
delivered by this knowledge record.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/waiter-owned-wake-job-is-the-checkpoint.md; notes/idle-waiter-wake-rehearsal.md.

On OATS 0.69.6, the notes report actual waiter-created jobs and host-timer
wakes for an idle and a busy pi 1.3.0, and for an idle Claude Code session.
The busy pi consumed its wake after the foreground command returned. The
notes do not establish a Claude busy-case result. Codex 0.160.0 used the
[separate partial-proof method](/nodes/integrations-expert/lessons/credential-free-harness-probes-have-bounded-proof.md),
not a kernel-launched instance or a timer tick. All observations are
source-reported and were not rerun by this harvest. The proposal describes
the associated guidance as unmerged at capture; no release or universal
cross-harness delivery guarantee is claimed.

The knowledge maintainer added the two open limits at review, from the
[agent review of the associated guidance](https://github.com/awebai/oats-engineering/pull/34#issuecomment-6525755420)
posted just before this harvest opened. That review kept the design and
returned the guidance on those findings, among others; its author did not run
the prompt case. It is not human acceptance. The delivery, claim and
permissions statements were read in awebai/oats `docs/schedules.md`,
`docs/execution-targets.md`, `docs/desktop-cli-api.md` and the
`oats-agent-permissions` skill on 2026-10-30.
