---
type: Lesson
title: Async completion must still own the user's intent
description: Background work preserves intent and separates creation, readiness and success; confirmations describe effect boundaries without suppressing unrelated reads or inventing stale-result state.
about: [system/oats-desktop]
kind: lesson
id: ins-9646baf4a439
tags: [desktop, async, intent, mutations, truthfulness]
timestamp: 2026-10-27
---
# Rationale

Learned 2026-07-24 to 2026-07-27 by the Desktop engineering and UX design
roles, from four defects in the first Spawn and Quick Open flows: a
periodic roster repaint rebuilt an open spawn form and submitted an empty
task; a consumed-once spawn preselect was cleared before the data it
applied to had loaded; a stale request's late rejection painted its error
over a newer selection because only the success path was guarded; and a
post-spawn terminal handoff fired on roster presence before the session was
attachable, surfacing as a blocking alert over a modal that looked stuck.

User state exists before any request: an open form, focus or text selection can be lost by a routine repaint even when nothing is in flight. Protect that state rather than equating idle networking with permission to rebuild the UI.

Loaded data is not necessarily current data. A current workspace generation also does not prove the original consumer remains mounted or that the same action still owns completion. Stale errors and cleanup can corrupt a newer result just as stale successes can. Independently superseding request classes need distinct ownership.

Creation, roster presence, attachment readiness and task completion are separate observations. Automated handoffs should fail quietly with a truthful recovery path, never target a replacement context.

Ignoring a stale response does not undo its mutation. Reconcile partial successes before retrying so a timeout or dismissed view does not create duplicate actions. A generation guard cannot substitute for transactional ownership of effects. Side-effecting pipelines (add a workspace, pick from a native picker, submit) are single-flight at the handler, not only through a disabled button: keyboard selection and synthetic clicks still reach a handler while it is busy.

**Close can arrive before mount settles** (2026-07-22 … 2026-07-23). A tab closed while its view or terminal was still mounting fell back to module-wide cleanup and blanked a healthy sibling tab, and a terminal closed during its pending open leaked an attached client. Whenever cleanup depends on a value an in-flight operation will produce, close waits for settle and then cleans up once with that mount's own disposer; a late resource arriving for a dead owner is released at once. Track what actually happened: a rejected mount and a fulfilled legacy mount both lack a disposer, but only the latter may use the module-wide fallback. Setup that needs cleanup (handlers, observers, focus) runs inside the lifecycle's ready callback, because code after `await start()` has no ordering with close. A tab key stays reserved until cleanup completes, and a reopen during that window waits on the reservation instead of being dropped.

# Confirmations follow effect conditions, not the usual case

Learned 2026-10-08: Retire of a leftover home from an interrupted spawn can
remove that spawn's branch when the worktree is actually removed and the
branch remains at its creation commit. The source reports that two plan
statements and a discard warning each promised branch preservation; two
verification returns were needed to find all three. A truthful final receipt
does not repair a false promise made when asking the operator to confirm.

For every sentence in a destructive confirmation, identify the kernel
condition under which it would be false. Distinguish conditional branch
cleanup from unrelated effects rather than combining objects into a blanket
assurance. The current kernel contract owns the exact cleanup rules; Desktop
must express those conditions without independently reimplementing them.

The elimination route is one shared presentation helper for statements about
the same object, used by the plan, confirmation and discard warning, with
regressions for both the effect and no-effect cases. Duplicating confident
wording at each surface invites drift even after the first instance is
fixed. Tests should assert that the surfaces agree on the conditional
meaning, not merely that each contains a reassuring sentence. The lesson is
the review stance and why shared derivation matters, not a substitute for
that code and test work.

For the request-side distinction between an interrupted request, confirmed
rollback and cleanup still owed, see
[Preview-bounded spawn outcomes](../decisions/preview-bounded-spawn-outcomes.md).

# Bound the confirm's effects, not unrelated observation

The capability-trigger review exposed a different way to overstate a
confirmation condition. The source translated a no-execution requirement
into a ban on status reads when opening the confirm. That stronger condition
withheld ordinary recorded history and introduced an unnecessary read
button. A page reading recorded state is not the confirmation running the
source. Name the prohibited effect precisely; do not turn it into a ban on
all activity nearby.

The same review tried to preserve a test result across a stale-page re-read.
That extra state introduced a race. An existing outcome already described
the case: on a kernel enforcing explicit source-run intent, an unflagged
stale press ran no source. Reuse that truthful no-run path rather than adding
result-retention state merely to keep a rare case visible. This is not a
rule to discard uncertain mutation outcomes: reconcile those as above.

The elimination route is an effect-level transport regression, not just a
handler assertion. Across every observed request, prove opening, cancelling
or escaping sends no test and no request carries execution intent; after
confirmation, prove exactly one flagged test. Pair the negative case with a
positive source-run control so a dead transport cannot pass it. The
[manual-action decision](../decisions/informed-manual-actions-match-cli-authority.md)
owns the consent and trust policy; the lesson here is to specify that policy
without accidentally designing extra controls or state.

# Related

The [Desktop sweep-notice decision](../decisions/machine-notices-are-action-free-and-outcome-driven.md)
records the 2026-10-27 removal of the recovery notice and its app-lifetime
exception. The earlier inert-summary rationale is historical, not permission
to restore the surface; context-bound intent ownership remains intact.

[Pending lifecycle state is not evidence of failure](pending-lifecycle-state-is-not-failure.md)
extends truthful outcomes to producer-reported held rows and per-apply
reconciliation after a later covering observation.

[Identity and relationships must stay legible under ambiguity](identity-and-relationship-legibility.md); [Keyboard policy follows actions and user intent](keyboard-focus-and-action-ownership.md); [Workspace admission is privileged and transactional](../decisions/privileged-workspace-admission.md); [Browser-owned state and accessibility under repaint](browser-owned-state-and-accessibility-under-repaint.md) (the repaint-barrier rules in detail).

# Current contracts

- [Current open-intent.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/open-intent.mjs)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge and agents/ux-designer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/async-mount-close-race.md and decisions/view-mount-disposer-contract.md @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, 2026-10-08; notes/long-spawn-transport-decision.md. The proposal reports the conditional branch-cleanup finding, repeated verification returns and a forced-interruption run whose retire reported `spawnCompensation`, associated with [awebai/oats#801](https://github.com/awebai/oats/pull/801) and [#819](https://github.com/awebai/oats/pull/819). These outcomes are source-reported, not rerun by this harvest; the shared-helper and regression guidance names the elimination route rather than asserting its implementation.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, received 2026-10-09. The proposal reports the overconstrained history read, stale-result race and existing no-run path in [awebai/oats#850](https://github.com/awebai/oats/pull/850). These review findings are supported by the proposal, not by the narrower manual-action backing note, and were not independently audited or rerun. No claim is made that every proposed regression is already implemented.

Evidence for the related notice supersession: OKF proposal from
oats-desktop-expert/resume-notice-removal-expert, 2026-10-27;
notes/desktop-shows-nothing-of-resume-sweep.md. The canonical decision above
retains its source-reported acceptance and implementation limits.
