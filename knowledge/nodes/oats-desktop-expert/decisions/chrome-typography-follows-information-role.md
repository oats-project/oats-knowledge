---
type: Decision
title: Desktop chrome uses sans names and role-based type hierarchy
description: Give primary names foreground sans at weight 600 and reserve monospace for secondary machine strings, using a short size-and-weight hierarchy instead of extra colours or uppercase labels.
about: [system/oats-desktop]
id: dec-d3a5f460c7ea
tags: [desktop, typography, hierarchy, design, accessibility]
timestamp: 2026-10-15
---
# Decision and rationale

The source reports that the product owner approved this hierarchy in the
2026-10-14 Teams and Setup mock review. In Desktop chrome, an instance, team,
soul or member repository's primary name uses the UI sans at weight 600 in
the foreground colour. Monospace is for secondary machine strings such as
paths, files, versions, commits, addresses and patterns, with muted colour.

The first layout still made important facts hard to distinguish: too many
roles had nearly the same visual weight. In the reviewed mocks, Inconsolata
names looked faint even at weight 600. Changing the name's role to sans,
rather than merely raising its mono weight, made it prominent. This is the
reported visual judgment for those mocks, not a universal measurement of
font rendering across platforms.

# The approved hierarchy

The accepted scale uses size, weight and the existing foreground/muted
contrast to make importance legible:

| Role | Size in px / weight |
| --- | --- |
| Screen title | 24 / 700 |
| Section | 18 / 650 |
| Team card title | 17 / 700 |
| Box title | 15 / 650 |
| Primary name or fact | 14 / 600, foreground |
| Body | 13 |
| Secondary text | 12, muted |

Secondary monospace is **1px larger than the corresponding sans step it
replaces**, because the bundled face sets small. It is not a rule that all
machine strings must be larger than body text.

Reject extra colours as a shortcut to prominence: they compete with the
calm visual language and create more contrast combinations to verify.
Avoid adding uppercase label treatments to compensate for a flat hierarchy.
Use the same information roles across screens rather than inventing a new
emphasis system for each one. The note also records that changing a shared
section-title style outside the reviewed screens was deferred, not implicitly
approved by these mocks.

# Boundary

This applies the [design quality bar](design-direction-and-quality-bar.md)
to **chrome, not the terminal**. The terminal keeps its own native geometry
and [theme-specific stroke calibration](per-theme-terminal-stroke-weight.md).
The related [polarity and platform finding](../lessons/terminal-weight-polarity-and-platform-scope.md)
is not evidence that the mock's faint-name judgment holds on every display.
Muted text must still meet the existing effective-colour accessibility bar;
this hierarchy does not waive that verification.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-teams-design, 2026-10-15; notes/teams-setup-design-direction.md.

The proposal and note report product-owner acceptance on 2026-10-14 and
implementation in [awebai/oats#1191](https://github.com/awebai/oats/pull/1191)
and [#1220](https://github.com/awebai/oats/pull/1220). Acceptance and shipment
are source-reported, not independently audited by this harvest. The scale
records the accepted design choice and its rationale, not a live CSS inventory.
