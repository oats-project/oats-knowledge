---
type: Decision
title: Removing a row's visible menu trigger must not remove its actions
description: Keep sidebar instance actions in the row's context menu without a visible ellipsis trigger, because a panel tied to an active terminal cannot serve rows with no terminal.
about: [system/oats-desktop]
id: dec-80f6afb7c6ef
tags: [desktop, interaction, accessibility, navigation, lifecycle]
timestamp: 2026-10-27
---
# Remove the trigger, not the action surface

The source reports product-owner direction on **2026-10-27** to remove the
visible ellipsis trigger from sidebar instance rows. The expert's corrected
design keeps the row's existing action menu as its **context menu**, opened
by right-click, Shift+F10 or the ContextMenu key. Removing repetitive chrome
must not remove the row's pointer or keyboard route to its actions.

This supersedes the source's same-day plan to move secondary acts into the
instance panel and fill remaining gaps in the palette. Review found that
the panel follows the active terminal tab: stopped, unknown, held or missing
rows without a terminal have no panel there. Forget would become unreachable,
and Stop or Retire on those rows could be left keyboard-only. Finding an
act drawn somewhere else was not proof that the surface existed for every
row that needed it.

Keep the rejected alternative explicit: do not re-home those acts in the
panel and palette merely because the visible menu trigger has gone. The
context menu preserves the row as the target and avoids building replacement
controls for an action surface that can remain available. The superseded
panel design was not an accepted concept in this base.

# Reachability includes the surface's preconditions

When removing a control, inventory **when** each proposed replacement
surface exists for the target, not only whether it contains the action.
Check rows without a terminal, not just the active instance. A secondary
recovery act especially needs a reachable path when the primary interaction
is unavailable; the [pending-lifecycle lesson](../lessons/pending-lifecycle-state-is-not-failure.md)
owns why Retire remains secondary rather than becoming a primary retry
prompt.

Keep action availability distinct from row navigation. The proposal keeps a
held menu's explanation in the existing leader status line rather than
repurposing the row's disabled state; previous/next navigation and stale
running rows must retain their own semantics. This is not permission to
weaken an individual action's hold or the kernel's fresh-plan requirements.

The [closed-panel decision](closed-panels-return-main-area-space.md) remains
unchanged: selecting an instance must not reopen a panel the operator chose
to close. Moving actions into that panel would not repair the missing-target
case even if it were open.

# Enforcement and evidence limits

Enforce reachability with interaction regressions for pointer and keyboard
context-menu opening on rows with and without terminal tabs. Include held
menus and row navigation so one disabled action does not disable unrelated
movement. These tests are the elimination route for the missing-surface
mistake; the durable knowledge is the rejected panel alternative and the
need to test a replacement surface's preconditions.

Evidence: OKF proposal from oats-desktop-expert/session-resume-desktop-expert,
2026-10-27; notes/secondary-retire-moves-to-the-panel.md.

The note's opening supersession corrects its older title and panel/palette
plan. Human direction to remove the trigger and the subsequent review are
source-reported, not independently audited human acceptance of every design
detail. The proposal identifies
[awebai/oats#1572](https://github.com/awebai/oats/pull/1572) as the corrected
implementation handed over for review. This harvest did not inspect that
implementation or run Desktop; no shipment or completed interaction test
is certified here.

Maintainer check (2026-10-27, review of oats-knowledge#168): awebai/oats#1572
merged 2026-10-27. Its description matches this decision: the visible
trigger is removed, the same menu opens as the row's context menu by
pointer and keyboard, a held menu explains itself in the leader's status
line without changing the row's own disabled meaning, and a missing row
keeps Forget. It also records the rejected panel relocation for the same
reason given here: the panel shows only the active terminal tab's instance,
so rows with no terminal would lose Forget and pointer access to Stop and
Retire. That description reports a review round that found the panel gap,
and tests for rows with no terminal tab. This review read the description
only; it did not inspect the code, rerun the tests or run Desktop.
