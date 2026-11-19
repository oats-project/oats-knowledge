---
type: Decision
title: Pinned instances lead their machine's list, from a pin the kernel keeps in the home
description: A pin is a home fact every client reads (`oats instance pin on|off`, row `pinned: true`, feature instance-pin), shared by everyone who views that machine; the shared roster order puts a node whose subtree holds a pin first at every level, ahead of spawn time.
about: [system/oats-desktop, system/oats-kernel]
kind: decision
id: dec-3dfc98694b8d
tags: [desktop, tui, kernel, roster, ordering, pin, presentation]
timestamp: 2026-11-19
---

# The decision

The product owner asked on 2026-11-19: "we should also be able to pin instances at the top of their machine
list". On a two-question card in the lead's session the same day, the owner chose:

- **The pin is a kernel fact, not a Desktop preference.** It's recorded in the instance's home, like the
  Background placement (oats-project/oats#1579) and the colour, so the Desktop, the TUI and another machine's routed view all read the same pins.
  Rejected: a Desktop-local store keyed by instance. It's faster to build and needs no contract change, but
  the TUI and other machines wouldn't see the pins, and one roster would get two orders, which
  [the roster-order decision](/claims/decisions/rosters-order-by-spawn-time-newest-first.md) rejected.
- **Pinning a child lifts its whole group.** A node ranks as pinned when it, or a descendant in its
  cluster's tree, is pinned. So the group rises to the top of its machine section, and the path down to the
  pinned row rises among its siblings at each level. The tree stays intact.
  Rejected: pins that only reorder siblings, under which only top-level rows could reach the top.

# The order

This refines [Rosters order by spawn time, newest first](/claims/decisions/rosters-order-by-spawn-time-newest-first.md)
without replacing it. At every level that order applies (roots, clusters, one parent's children, sibling
lists), a pinned node comes first, then that order. Under one parent, the same-work split stays first because
it's structural, then the pin, then spawn time. Among pinned clusters, as among unpinned ones, a cluster
keeps its rank without pins (its first root), whichever of its members holds the pin. Pinning and unpinning
are the one act, besides adding or removing a row, that moves a row. They're a person's explicit act, so this
keeps [the rule that state never moves a row](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md).
The palette's own recency order is outside this decision, as it was outside the order this refines.

A client reads `pinned` only as exactly `true`, and only where the CLI (or, for a remote row, its own host)
lists `instance-pin`. Without the feature, nothing moves.

# Choices the request left open

These were decided by the lead and agreed with the lane maintainer and the other side of the contract:

- **No spawn flag and no soul key.** A pin is a person's choice about the view, not a role default. Either
  could be added later without a break.
- **A pin is shared** by everyone who views that machine. A per-viewer pin would be a new decision, not a
  bug fix.
- **Several pins sort by the existing order.** There is no manual ranking.

How a pin meets [the collapse-by-default rule](/claims/decisions/sidebar-roots-start-collapsed-lifecycle-rows-stay-open.md)
is not decided here. That rule's default (every section root with children starts collapsed) is the product
owner's, so an exception to it, such as starting open a root whose subtree holds a pin, needs the owner's
acceptance, cited, before it is recorded; agreement among agents does not change it.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sidebar-pinned-instances-lead, 2026-11-19;
notes/pin-is-a-kernel-fact-ranked-by-subtree.md.

The request and the owner's two choices are source-reported: the request was made in the owner's
dispatcher session (no issue), and the choices were made in the lead's session. The contract (verb, home
file `.oats-pinned.json`, row field, feature, routed relay of `true` only) was agreed by both sides through
the lane maintainer before it was built. The kernel half merged as
[oats-project/oats#1967](https://github.com/oats-project/oats/pull/1967) (squash a7473d55, main CI green).
The clients half is [oats-project/oats#1974](https://github.com/oats-project/oats/pull/1974), open at
`f26c58e4` when this was proposed; the lead's verification and the approving review rounds on another model
family are the source's report.

Maintainer review of [oats-knowledge#412](https://github.com/oats-project/oats-knowledge/pull/412) checked
oats-project/oats#1967, merged on 2026-11-19 as `a7473d55` with its checks green: `setInstancePin` records the
home's pin and its docs state the record `.oats-pinned.json`, the feature `instance-pin`, the row field
`pinned: true` (absent otherwise), no spawn flag or soul key, a pin shared by every viewer of the machine and
no manual ranking. It checked oats-project/oats#1974 at `f26c58e4`, open and unmerged at review: its body
gives the order under one parent as `drawingFirst || pinned || rosterOrder`, a node pinned when it or a
descendant is, and a cluster ranked by its head as without pins, and says it amends the roster-order
decision. The owner's request and two choices stay source-reported. At that head #1974 also starts open a
section root whose subtree holds a pin, by the lead's decision agreed with agents; this concept does not
record that exception (above).
