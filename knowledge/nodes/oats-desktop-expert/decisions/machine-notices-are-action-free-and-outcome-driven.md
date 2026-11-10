---
type: Decision
title: Desktop shows no session-resume sweep notice
description: Show no Desktop notice or summary for the session-resume sweep, explicitly superseding its app-scoped notice exception without changing recovery policy or deciding TUI presentation.
about: [system/oats-desktop]
id: dec-6177c7fc98e1
tags: [desktop, notifications, scope, recovery, truthfulness]
timestamp: 2026-10-27
---
# Desktop presentation supersession — 2026-10-27

The source reports that the product owner directed, through the Desktop lane
maintainer on 2026-10-27 for 0.69.2, that Desktop show **nothing about the
machine session-resume sweep**: no notice, grouped entry or summary in any
window. A failed sweep gets only a code-only log line; other sweep readings
produce no Desktop presentation. Removing the notice does not mean removing
recovery or treating an unshown outcome as success.

This explicitly supersedes this concept's earlier Desktop presentation
rules below. The app-scoped, action-free sticky kind existed for that notice
alone; the direction removes that exception rather than leaving a dormant
mechanism for future summaries. Notification entries again clear on workspace
or connection changes. A future machine-wide inert notice needs a new product
decision: the earlier scope rationale is design history, not standing
permission to restore the removed surface.

Preserve the removal as an intentional product choice, not an incidental
simplification a future implementation may reverse. The evidence supplies no
further product rationale; do not invent one. Context-bound
[async intent safety](../lessons/asynchronous-intent-and-truthful-outcomes.md)
is unchanged.

This decision changes **Desktop presentation only**. Sweep timing, eligibility
and recovery authority remain with the
[maintainer's recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md).
The source reports that the shared outcome reader still served the TUI at
capture, but this is neither a mandate to retain a TUI line nor a decision to
remove it. The historical outcome predicate below no longer governs Desktop.

# Historical rationale: scope follows what the notice can act on

The following records the superseded Desktop design, not an active app-scope
exception or a requirement to implement one.

The Desktop expert's earlier 2026-10-27 decision makes an inert machine-wide summary
app-scoped, not workspace-scoped. Clearing context-bound feedback when the
workspace or connection changes protects against acting on a replacement
context. Applying that clearing rule to a machine-wide recovery summary,
however, loses a still-relevant result on the first workspace switch.

Admit app scope only for a sticky notice with **no descriptor, activation
callback or buttons**. Such a notice survives workspace and connection
clears and leaves only on explicit dismissal or notification-center disposal.
Reject invalid combinations rather than silently stripping their actions.
An action is what binds the notice to a context: the narrow exception is safe
because an inert summary has nothing that can target the wrong workspace.

This explicitly narrows the source's earlier clear-every-entry behavior;
it does not weaken [async intent ownership](../lessons/asynchronous-intent-and-truthful-outcomes.md)
or make an action-bearing notice safe after a context change. Ordinary
context-bound entries retain their existing clearing behavior.

# Historical rationale: a sweep answer is not automatically a notice

Create a recovery notice only when a home was resumed, started fresh, is
blocked, or has a newly reportable refusal. Running or skipped homes,
unswept deployments and host warnings alone are quiet. Routine inventory or
readiness diagnostics already have the operator and roster surfaces; raising
them at every open trains people to dismiss the summary that should tell
them something happened to a home.

A standing refusal the kernel repeats is not news: report it once per
home/reason/code in a client run, and again only after that home recovers.
Resumes, fresh starts and blocked outcomes are events of their sweep, not
duplicates. Sweep-level host warnings are different from home outcomes: include each
once per client run in the next notice justified by a home. A quiet sweep
must not consume that once-only opportunity, because no warning was shown.
Receiving diagnostic data and presenting it to the person are distinct facts.

Rejected: showing a notice for every non-empty sweep response. It produces
persistent launch noise even when the response contains no home outcome.
Silence here is a presentation choice, not a claim that diagnostics vanished
or that a blocked session is ready for work. Preserve the existing
creation/readiness/success distinctions.

# Historical enforcement and evidence limits

These enforcement targets belonged to the earlier notice design; they do not
justify restoring it after the supersession above.

Validate app scope at the notification boundary and test invalid action
combinations, both context-change paths, dismissal and disposal. Test the
outcome predicate separately from rendering, including warning-only quiet
sweeps followed by a home outcome, duplicate refusals and recovery. These
are code/test enforcement routes, not a permanent manual notice checklist.

Evidence: OKF proposal from oats-desktop-expert/session-resume-desktop-expert,
2026-10-27; notes/machine-scoped-notice-survives-workspace-switch.md;
notes/resume-notice-only-for-home-outcomes.md.

The older note's opt-out examples are not part of this decision. The
decision retained here is outcome-driven presentation, not who may opt out,
when sweeps run or which homes the kernel may recover; those belong to the
[maintainer's recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md).
The source identifies
[awebai/oats#1564](https://github.com/awebai/oats/pull/1564), then unmerged, and
reports notification tests and a live launch notice. Grouping across
sweeps was unit-tested rather than proved live; this harvest did not audit or rerun the
implementation and makes no shipment or real-deployment recovery claim.

# Supersession evidence and limits

Evidence: OKF proposal from oats-desktop-expert/resume-notice-removal-expert,
2026-10-27; notes/desktop-shows-nothing-of-resume-sweep.md.

The product-owner direction is source-reported through the lane maintainer,
not an independently audited human exchange. The source identifies
[awebai/oats#1596](https://github.com/awebai/oats/pull/1596), unmerged when
proposed, as implementation evidence. Its reported source-evaluating tests
are the enforcement route for preserving recovery while removing its Desktop
presentation; the harvest did not audit or rerun them. No live verification,
merge or shipment is claimed. TUI presentation and cross-domain recovery
policy are not superseded by this Desktop-only record.
