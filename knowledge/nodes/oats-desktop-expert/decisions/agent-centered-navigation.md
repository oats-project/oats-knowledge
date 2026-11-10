---
type: Decision
title: Agent-centered navigation makes the action target legible
description: A stable roster and one authoritative inspection flow keep artifacts contextual and launch intent explicit.
about: [system/oats-desktop]
id: dec-1ac7c52a4b85
tags: [desktop, navigation, information-architecture, workspaces]
timestamp: 2026-10-30
---
# Rationale

The enduring navigation question is "which agent am I acting on?" A stable
roster answers it before a terminal, brain or file becomes the focus.
Artifacts supply context; they should not multiply into coequal product
domains or nested facet chrome. Two rules follow (decided 2026-07-24): an
artifact tab is scoped to the workspace that created it, so same-named
instances in different workspaces never share a tab; and when the last
artifact tab closes, navigation returns to the stage the operator came from
rather than leaving an empty artifact area.

The older Quick Open design usefully rejected a second spawn form, but its
selection-opens-spawn behavior is **superseded (2026-09-07)**. The current
accepted interaction makes selection, Enter and Quick Open inspect a soul;
Launch and Schedule are explicit actions. Preserve one authoritative flow
without treating browsing as permission to start work.

A redundant Instances destination once made a feature reachable while
contradicting the requested product shape. Prefer coherent reuse of the
existing roster to adding an overview merely to satisfy a technical
reachability finding.

# Recency belongs in the instance palette, not the roster

The source expert's 2026-10-14 refinement kept the roster stable while
making return to the previous agent fast: a flat Recent group led the palette,
followed by never-focused instances in tree order. That flat-group design is
**partially superseded (2026-10-19)** by the sidebar's tree ordered by subtree
recency. The source reports the human owner's request and direct confirmation
that a focused child lifts its ancestors and that independent runs re-form
after ordering. Preserve the tree while bringing the path to recent work
forward, rather than making recency and relationships competing views.

- **Rank by the latest focus anywhere in the subtree.** Apply this at every
  level: deployment sections, relation clusters, a cluster's roots and a
  parent's children. A child stays under its parent; its focus lifts the
  containing subtree relative to peers. Never-focused entries follow focused
  ones in the sidebar's stable order.
- **Order clusters and singles before forming display groups.** Each
  multi-member cluster is a group; each run of consecutive singles becomes
  an independent group in place. A previous independent run is not an
  indivisible sorting unit.
- **Order the full roster before applying a query.** Search projects that
  order; typing must not re-rank the surviving groups. This complements the
  [full-roster identity and ambiguity rule](../lessons/identity-and-relationship-legibility.md),
  rather than deriving relationships from search results.
- **Open on the first selectable row.** With an empty query, start at the
  top of the ordered tree: the root of the most recently focused path. With
  a query, select the first match in the projected order.

This opening rule **supersedes the previous-agent rule (2026-10-19)**, which
the 2026-10-14 refinement set and the earlier same-day tree refinement kept.
That rule selected the latest-focused listed instance other than the terminal
in front, or the latest-focused match for a query. Under tree order that row can sit mid-list, on a child or in a second group, making the
starting point seem arbitrary even when the order is correct. The source
reports the human owner's later request, relayed through the lane maintainer,
to start at the top instead. The accepted tradeoff is losing the palette-open
then Enter shortcut back to the previous agent; the cycle chord still moves
down from the top. Moving the previous agent to the first row instead would
break subtree-recency order. This supersedes opening selection, not the
ranking, regrouping or query-projection rules above.

Reject a flat Recent group ahead of this tree: once the whole list follows
recency, it repeats rows. Reject ranking each node only by its own focus: a
fresh child would remain below its stale parent's less-recent siblings,
contradicting the purpose of subtree ranking. Reject sorting an independent
run as one block: a just-focused single would remain trapped behind a stale
run. These are design tradeoffs, not interchangeable sorting implementations.

The palette uses the sidebar's relationship cues as recorded in
[Explicit sibling display](sibling-relations-are-shown-apart-from-parentage.md#one-relation-distinct-visual-and-accessible-readings).
The sidebar's [name-order decision](roster-name-order-preserves-recognition.md)
remains intact. This instance-switching choice does not supersede the
soul-inspection and explicit-launch flow above.

Reject reordering the sidebar roster by recency. It would make fast keyboard
switching compete with the spatial memory that makes the roster useful.
Selecting a tab instead reveals its roster row with only the necessary scroll,
without moving input focus. The palette answers "where was I just working?";
the stable roster still answers "which agent is this?".

Recency is bounded, per-machine UI state, persisted in localStorage and
scoped per workspace so it survives restart without leaking navigation
history between workspaces. It is never deployment state and is not written
to a deployment. This keeps one operator's navigation preference from becoming
an operational fact for other clients. The cap's exact value belongs in the
implementation, not a competing knowledge specification.

# Workspace switching moves between deployments

The workspace switcher is a **deployment switcher, not a repository filter**
(decided 2026-07-22): within one deployment the roster already groups by
repository, and the switcher moves between deployments. It appears only when
more than one workspace is watched, so a single-workspace setup carries no
extra chrome. This is the product side of the founder's 2026-07-26 intent that
Desktop gives **one operator view across the repositories of one workspace**,
with explicit instance relations making clusters visible without collapsing
repository ownership. What defines a workspace has since changed (a Git-hosted
workspace definition, and since Phase F a deployment directory whose facts come
only from the kernel); the consequence has not: the switcher never moves
between repositories inside one workspace.

## Desktop workspace moves cycle rather than report an end

The source reports human direction on **2026-10-27**, relayed by the lane
maintainer: Desktop's previous/next workspace actions wrap between the first
and last openable workspace rows. This explicitly supersedes the earlier
**No wrap** rule reported in the Desktop keyboard contract. An end message
made ordinary navigation look like an error when cycling offered an obvious
next destination. With only one openable workspace, do not move; give one
visible line explaining that there is no other workspace to show rather than
silently doing nothing.

The initial decision was Desktop-only: terminal-client wrapping was still
undecided, so sharing the step logic did not authorize silently changing the
other client. That open point is **resolved by the later 2026-10-27 decision**
reported by the same source: the human delegated the parity call, and the
expert chose wrapping in both Desktop and the TUI because one shared keymap
should give a workspace-move key one behavior across clients. This explicitly
supersedes the earlier requirement to leave the TUI unchanged pending that
call; it does not reverse Desktop wrapping or authorize unrelated shared
behavior changes. The [shared-client scope boundary](shared-terminal-opening-keeps-context-and-client-scope.md)
still holds: deliberate agreement, not helper reuse, permits the change.

Keep workspace moves distinct from the workspace list's own cursor. The
previous/next workspace actions cycle; Up/Down browsing inside the list still
stops at its ends in both clients. Cover that distinction and the one-workspace
case in client-level regressions, not only shared-helper tests.

Focus on arrival is a separate choice, recorded in
[Workspace switching restores the operator's place](workspace-switch-restores-focus-place.md).
Matching wrap behavior does not imply matching focus destinations: Desktop's
list-initiated move keeps list focus as a browsing choice, not TUI parity.
This wrapping decision changes neither palette ordering nor workspace tab order.

Evidence: OKF proposal from oats-desktop-expert/workspace-switch-focus-expert, 2026-10-27; notes/workspace-moves-wrap.md.

The source identifies [awebai/oats#1560](https://github.com/awebai/oats/pull/1560)
and the [Desktop keyboard contract](https://github.com/awebai/oats/blob/main/packages/desktop/docs/desktop-keyboard.md).
The superseded rule was not recorded in this base. Human direction and the
reported reversal are source evidence, not independently audited acceptance
or shipment; maintainer review and live Electron evidence were pending at
capture.

Maintainer check (2026-10-27, review of oats-knowledge#153): awebai/oats#1560
merged 2026-10-27; its description records the human's request for wrapping
and that terminal-client wrapping is undecided, and the Desktop keyboard
contract on main now documents the wrap and the one-workspace line. The
superseded No wrap rule carried no acceptance record in this base, and the
reversal is the same human's later direction. Live Electron behavior was not
checked by this review. This is the earlier decision's review, not a check of
the later TUI refinement.

Evidence: OKF proposal from oats-desktop-expert/workspace-switch-focus-expert, 2026-10-27; notes/workspace-moves-wrap.md; notes/workspace-switch-focus-place.md.

The follow-up proposal reports the delegated parity call and identifies
[awebai/oats#1565](https://github.com/awebai/oats/pull/1565), still under
maintainer review at capture, for TUI wrapping and the focus-comment
correction. Delegation and the later decision remain source-reported; this
harvest did not independently verify human acceptance, implementation or
shipment. The earlier capture's pending live evidence is updated only by the
source-reported, limited [fixture check](../lessons/verification-judgment-for-privileged-surfaces.md#agent-free-fixtures-can-prove-desktop-input-arrival),
not by a new live run in this harvest.

# Workspace tab order

The source reports product-owner direction on **2026-10-23** to order
Workspace's tabs **Souls, Capabilities, Teams, Setup**. This explicitly
supersedes the source-reported **2026-09-28 Teams-first** ordering. The
captured evidence names that replacement but supplies no further rationale
for the precise order; none is inferred here.

This changes the Workspace tab sequence, not the deployment-switcher model,
instance-palette ordering or explicit launch intent above. The
[workspace-defaults decision](workspace-defaults-show-scope-and-purpose.md)
records what leads the Capabilities tab. The earlier Teams-first direction
was never recorded as a concept in this base; its date is kept here so the
supersession stays explicit.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-capabilities-workspace-defaults, 2026-10-23; notes/capabilities-defaults-design.md.

The proposal identifies [awebai/oats#1489](https://github.com/awebai/oats/pull/1489)
as implementation evidence.

Maintainer check (2026-10-26, review of oats-knowledge#145): awebai/oats#1489,
merged 2026-10-23, records the product owner's 2026-10-23 request for this
order and states that it supersedes the 2026-09-28 Teams first order; Souls
stays the default tab. The superseded order was the same human's earlier
direction and carried no acceptance record in this base.

# Related

[Identity and relationships must stay legible under ambiguity](../lessons/identity-and-relationship-legibility.md);
[Keyboard policy follows actions and user intent](../lessons/keyboard-focus-and-action-ownership.md);
[One standalone Desktop product, no hidden operational kernel](standalone-product-and-cli-authority.md);
[Editor groups own layout and close succession](editor-group-layout-ownership.md);
[Closed panels return their space to the main area](closed-panels-return-main-area-space.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md)
- [Souls and capabilities in Desktop (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. Migrated from agents/ux-designer/soul/knowledge, agents/oats-desktop-engineer/soul/knowledge and agents/dev-coordinator/soul/knowledge @ 7838d3ca.
2. Founder-accepted direction 2026-07-26, "Desktop as the workspace view", carried in [Official OATS development runs on the architecture it offers adopters](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md).

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-linux-shell, 2026-10-14. The source identifies [awebai/oats#1158](https://github.com/awebai/oats/pull/1158) (`938837d0`) and [#1179](https://github.com/awebai/oats/pull/1179) (`b1e0ee0c`) for palette recency and roster reveal. These are source-reported implementation references, not independently audited shipment or human-acceptance receipts.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-palette-order, 2026-10-19; notes/palette-recency-tree-design.md.

For the partial supersession, the source reports the human owner's request
through the lane maintainer and direct confirmation of both ordering readings
on 2026-10-19. It identifies [awebai/oats#1383](https://github.com/awebai/oats/issues/1383)
for design and [PR #1385](https://github.com/awebai/oats/pull/1385) for the merged
implementation. Acceptance and shipment remain source-reported; this harvest
did not audit the implementation or run Desktop. Ordering and query-projection
regressions should enforce the decision; they do not replace its rationale.

Maintainer check (2026-10-19, review of oats-knowledge#133): awebai/oats#1383
records the owner's request and the subtree-recency, regrouping, query and
previous-agent rules; PR #1385, merged 2026-10-19, names the flat Recent group
as superseded. The superseded group carried no human-acceptance record.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-palette-order, 2026-10-19; notes/palette-opens-first-row.md.

For the later opening-selection supersession, the source reports the human
owner's request through the lane maintainer on 2026-10-19, with the loss of
previous-agent quick return stated and accepted. It identifies
[awebai/oats#1391](https://github.com/awebai/oats/issues/1391) and
[PR #1392](https://github.com/awebai/oats/pull/1392). These acceptance and merge
references remain source-reported, not independently audited by this harvest.
The previous-agent rule had human-confirmed direction, so this supersession
needed the human's acceptance; the maintainer check below records it. The
source reports a CI regression for opening selection, but no live Electron
or assistive-technology run. Such regressions enforce the behavior, not the
reason for choosing it.

Maintainer check (2026-10-30, review of oats-knowledge#135): the human owner's
acceptance is **source-reported (relay at
[awebai/oats#1392](https://github.com/awebai/oats/pull/1392#issuecomment-6266656161))**.
In that 2026-10-19 comment the lane maintainer reports the owner's direct
request and the owner's acceptance of losing previous-agent opening. It is an
agent's report, not the human's own record. awebai/oats#1391 states the same
change and tradeoff, PR #1392 merged on 2026-10-19, and the Desktop keyboard
contract on main documents first-row opening. Live Electron behavior was not
checked by this review.
