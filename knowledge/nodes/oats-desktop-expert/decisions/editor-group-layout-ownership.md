---
type: Decision
title: Editor groups own layout and close succession
description: Persistent groups preserve ordered work and focus better than temporary per-tab split slots or unrelated global recency.
about: [system/oats-desktop]
id: dec-dde08ef8d2a9
tags: [desktop, layout, editor-groups, focus, accessibility]
timestamp: 2026-07-27
---
# Rationale

Decided 2026-07-27 by the Desktop engineering role, on human feedback
about the first shipped split: a phantom empty chrome row under the tabs,
the split vanishing on tab switch, and new tabs not opening into the
current split. The fix was a model change, not a patch — splits became
editor groups with the semantics VS Code users already know.

The rejected split model (the per-tab "pending slot" arrangement of the
first shipped split, replaced by this decision) attached a temporary arrangement to a tab, so changing tabs could dissolve the layout. Persistent groups instead own ordered work and an active member. New work follows the focused group; the first split preserves existing current-workspace terminal tabs and intentionally focuses the new empty group.

Closing work should select a neighboring group member rather than an unrelated recent terminal. One real semantic tab control per item, with per-group navigation, avoids duplicated or phantom chrome and preserves accessibility.

Group ownership within a layout does not by itself decide restoration across workspace switches. The separate [workspace focus-place decision](workspace-switch-restores-focus-place.md), dated 2026-10-27, now addresses that question without changing group ownership or close succession. Verify version-specific behavior in the maintained Desktop contract.

# Related

[Agent-centered navigation makes the action target legible](agent-centered-navigation.md); [Keyboard policy follows actions and user intent](../lessons/keyboard-focus-and-action-ownership.md).

# Current contracts

- [Current split-layout.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/split-layout.mjs)
- [Current shell.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/shell.mjs)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
