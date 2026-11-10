---
type: Roadmap
title: Reassess coordination across use cases before adaptive onboarding
description: Treat the current role model as a candidate rather than a design constraint, evaluate alternatives through research and real trials with human oversight central, and hold use-case-adaptive onboarding for the coordination outcome.
about: [workstream/oats-direction]
kind: direction
status: decided
decided-by: human
id: dec-ca48c1230aa1
tags: [coordination, direction, onboarding, human-oversight, research]
timestamp: 2026-11-02
---
**Owner: oats-maintainer. Update-on-change: whoever records a changed priority,
a coordination recommendation accepted by Pepe, or resolution of the adaptive
onboarding dependency updates this record in the same session, citing the
acceptance and explicitly recording any superseded decision.**

# Direction as of 2026-11-02

Pepe opened OATS's coordination model to redesign: the
maintainer/expert/developer/reviewer split is one candidate, not a constraint
on the investigation. Evaluate how agents coordinate and how humans interact
with each kind of agent across multi-person software projects, an individual's
application, and personal scheduled-agent workflows. Human oversight remains
central, and the kinds of agents must be clearly distinguishable to the human.

The source reports the concern behind the direction: the current split may
anthropomorphise agents and reproduce human-team habits that fit open-source
projects better than personal uses. Review must therefore test fitness for
those uses rather than defend the present roles merely because they are
established. This is permission to reconsider the model, not a finding that
all current roles are wrong or a decision selecting their replacement.

The recommendation must rest on deep research and trial setups actually run,
not only a paper design. The human-interaction question includes direct
threads to top-level agents versus an interface agent acting as the human's
intermediary; neither option was selected by this initial research mandate.
The later same-day [front-door direction](/nodes/oats-maintainer/decisions/front-door-routes-and-introduces.md)
selects intake routing and introductions for most workspaces while leaving
continued brokering open. It refines that question without selecting a
complete coordination model or resuming the threads build.

# Sequencing and dependency

The source reports this priority order:

1. Release and deploy the aweb fixes.
2. Polish onboarding and test it on virtual machines for both new and existing
   workspaces.
3. Follow with the coordination redesign, while its research proceeds in
   parallel with the earlier work.

The onboarding step that adapts a workspace's capabilities to its use case
waits on the coordination outcome. That dependency prevents committing an
adaptive setup to a role model that is itself being reconsidered; it does
not put all onboarding work on hold. These are priorities and a dependency,
not evidence that any release, deployment or VM trial has completed.

# What remains in force

The research reopening is not a supersession of operating decisions:

- [Coordination policy remains capability-owned](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md),
  not kernel or `oats.core` policy.
- The [threads direction and its 2026-10-26 deferral](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
  remain the record of that design. Reconsidering human interaction here does
  not resume the deferred build or replace the one-input-surface rule that
  remains in effect.
- [Optional, provider-neutral human attribution](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md)
  remains an accepted constraint, including unchanged no-human operation.
- Both sides still agree contract changes before build. The
  [onboarding review delegation](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md)
  is not replaced by this sequencing decision.

Those records hold until an accepted decision explicitly supersedes them.
The source reserves the decision on the coordination recommendation to Pepe;
a research mandate alone grants no implementation, release or authority
change. The later [template-delivery direction](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md#delivery-direction-templates-become-workspace-owned-capabilities-2026-11-02)
refines how the outcome reaches a workspace; the
[thread-inbox roadmap](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md#roadmap-refinement-the-humans-inbox-is-threads-2026-11-02)
follows coordination rather than becoming its prerequisite. Those linked
records own their source-reported acceptance and limits.

# Acceptance and evidence limits

Acceptance is **source-reported**: Pepe, directly to the release lane in its
session on 2026-11-02. The captured proposal and named note report the direction,
its rationale, research-and-trial requirement and sequencing. The private
session was not inspected; no independently readable human acceptance link
was supplied. This record certifies neither a chosen design nor completed
research, trials, implementation or rollout.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/coordination-is-open-for-rethink.md.
