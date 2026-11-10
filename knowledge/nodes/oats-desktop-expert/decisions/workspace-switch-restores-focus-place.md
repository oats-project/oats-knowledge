---
type: Decision
title: Workspace switching restores the operator's place, not the transit control
description: Restore the last non-transit focus place in the arriving workspace while preserving explicit destinations and yielding to later operator action.
about: [system/oats-desktop]
id: dec-e183995aa712
tags: [desktop, workspaces, focus, navigation, rejected-alternatives]
timestamp: 2026-10-27
---
# Restore the place that made the switch useful

The source expert's decision dated 2026-10-27 answers a request to type
immediately after returning to a workspace. Remember the window's last
focus place there **outside transit surfaces**: the workspace list and its
heading, palette, dialogs, menus and listboxes are routes through the UI,
not the work place to restore.

This fills the cross-workspace question deliberately left separate by
[editor-group ownership](editor-group-layout-ownership.md). It does not
change which group owns a tab, close succession, or the distinction between
activating a tab and asking to type in it.

Restore a terminal place to its input, ready to type. Restore a roster row
by instance identity after the arriving roster paints. Restore a tab or page
control by identity; if the control is unavailable, use its region's landing
rather than leaving focus on the document body. The landing must belong to
the rebuilt arriving view, not a view about to be replaced.

# Why the obvious alternatives were rejected

- **Always focus the active terminal:** that overrides a remembered roster
  or page-control place. The user's last working control, not merely the
  active tab, determines the destination.
- **Read the active element at departure:** the workspace-list row used to
  leave has already displaced the useful focus. Saving that row reproduces
  the failure instead of remembering the place before transit.
- **Add per-workspace page/stage memory:** the source rejects this as part
  of this change; remembering focus is not permission to redesign page
  restoration.
- **Carry focus in the take-over layout descriptor:** the source rejects
  expanding that hand-off contract for local focus restoration. Keep the
  supplied layout's active-terminal focus instead.

# Intent and explicit destinations take precedence

A switch and its deferred focus arrival share one intent ticket. A later
operator action supersedes it, including while roster or page rebuilding is
pending. This applies [keyboard intent](../lessons/keyboard-focus-and-action-ownership.md)
and [async ownership](../lessons/asynchronous-intent-and-truthful-outcomes.md):
returning to a workspace may restore input, but delayed completion must not
steal it from a newer action.

Three boundaries are deliberate:

- A workspace step initiated with focus in the workspace list keeps focus
  in that list so the operator can keep browsing it. This is Desktop's own
  choice, not terminal-client parity.
- A switch made to reach its own destination, such as a Teams-board hand-off
  or followed view, is not followed by this competing restoration.
- A take-over bringing a layout retains that layout's focus behavior; it
  does not apply the window's remembered place over the supplied layout.

**Rationale correction (2026-10-27):** the earlier proposal misread the TUI's
list-focus rule as precedent. The follow-up reports that a TUI move which
opens a workspace hands focus to the instances list; focus stays in the
workspace list only when nothing opens. Do not use that precedent to justify
Desktop's different browsing choice or to change its behavior in the name of
parity. This corrects the attribution, not the Desktop exception. The separate
[wrap decision](agent-centered-navigation.md#desktop-workspace-moves-cycle-rather-than-report-an-end)
now aligns workspace moves without requiring identical focus destinations.

Protect these choices with arrival-path regressions covering the transit
control, missing identity, repaint ordering and a later user action during
an unfinished restore. Tests should enforce the behavior; this record
preserves why the destinations differ, not a second map of renderer helpers.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/workspace-switch-focus-expert, 2026-10-27; notes/workspace-switch-focus-place.md.

The source identifies [awebai/oats#1560](https://github.com/awebai/oats/pull/1560)
as the implementation proposal. The earlier capture cited the terminal
client's [Tabs contract](https://github.com/awebai/oats/blob/main/docs/tui.md#tabs)
as a list-focus precedent; that attribution is corrected above. At that
capture it reported developer review approval, with maintainer review and
live Electron evidence still pending. Those are
source-reported evidence limits, not shipment, human acceptance of every
exception, or live verification by this harvest. The decision record grants
no permission to run Desktop on the operator's machine.

Maintainer check (2026-10-27, review of oats-knowledge#153): awebai/oats#1560
merged 2026-10-27. Its description and the Desktop documentation on main
match the transit surfaces, identity and region-landing restoration, the
single intent ticket, the workspace-list exception, the explicit-destination
exception and the take-over layout's retained focus. The rejected page-memory
and layout-descriptor expansions remain source-reported. Live Electron
behavior was not checked by this review.

Evidence: OKF proposal from oats-desktop-expert/workspace-switch-focus-expert, 2026-10-27; notes/workspace-switch-focus-place.md; notes/live-desktop-fixture-without-agents.md.

The follow-up attributes the correction to the TUI developer's reading and
identifies [awebai/oats#1565](https://github.com/awebai/oats/pull/1565). It also
reports live click-switch, previous/next and wrap checks of #1560; roster-row
restoration was not exercised live. The [fixture lesson](../lessons/verification-judgment-for-privileged-surfaces.md#agent-free-fixtures-can-prove-desktop-input-arrival)
records that evidence's method and limits. Neither the TUI reading nor the
live results were independently reproduced by this harvest; they do not
establish live proof of every restoration path.
