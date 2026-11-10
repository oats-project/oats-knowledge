---
type: Decision
title: Closed panels return their space to the main area
description: Closing a sidebar or instance panel removes its entire footprint, and instance selection must not undo the user's choice to keep the panel closed.
about: [system/oats-desktop]
id: dec-3ad12665d1ba
tags: [desktop, navigation, panels, focus, accessibility, preferences]
timestamp: 2026-10-14
---
# Decision and rationale

The source expert's 2026-10-14 choice is that a hidden left sidebar or closed
instance panel takes **no width**: no remaining rail, strip or edge. Terminal
work benefits from the full main area and a calm surface. A residual rail
was rejected as visual noise, not retained as a discoverability compromise.

Reopening remains explicit and discoverable: each panel has its chord,
palette action and an icon button in the main area's top bar, with Show
sidebar at the start and Show instance panel at the end. Reserve their
insets outside the tab strip's scrollport so scrolling tabs do not displace
the recovery controls. The meaningful decision is reclaiming space without
losing access; the bar's pixel height is an implementation detail.

For instance details, open/closed is one per-machine UI preference in
localStorage, defaulting to closed. Only the user's toggle, show control or
panel close button changes it. Selecting an instance never opens the panel:
auto-opening spent terminal width again on every instance switch and undid
the user's chosen layout. This rule is deliberately scoped to instance
details; the Workspace stage's soul inspector retains open-on-select.

A closed panel must not hide the existence of Git changes. When its Git page
has changes, the Show instance panel control carries the same dot and an
accessible name that communicates the changes. Visual quiet is not an excuse
to remove status or make reopening a keyboard-only discovery task.

# Related

- [Agent-centered navigation](agent-centered-navigation.md) owns stable roster and palette-recency rationale.
- [Design direction and quality bar](design-direction-and-quality-bar.md) owns the calm, coherent and accessible design goal; this choice does not change native terminal geometry.
- [Keyboard policy](../lessons/keyboard-focus-and-action-ownership.md) owns terminal-safe chords; reclaiming panel space does not authorize consuming the program's keys.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-linux-shell, 2026-10-14. The source reports [awebai/oats#1187](https://github.com/awebai/oats/pull/1187), merged as `0660403c`, with both readers approving. This harvest records the expert's design rationale; it did not audit the implementation, reproduce the interaction or independently establish human acceptance.
