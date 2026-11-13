---
type: Decision
title: Rosters order by spawn time, newest first, and keep recognition across state changes
description: The shared roster order (Desktop sidebar, TUI list, the palette's never-focused rows) is spawn time newest first, an unreadable time last, then name and identity; a bundle sits by its first root, so starts, stops and a new child still move no row.
about: [system/oats-desktop]
kind: decision
id: dec-a8a8bcade9c3
supersedes: [dec-555212bdd02a]
tags: [desktop, tui, roster, ordering, lineage, recognition]
timestamp: 2026-11-13
---

# The decision

The product owner asked on 2026-11-13 for agents to come up on the sidebar by spawn time, not
alphabetically: new to old, newest on top. This replaces the name order of
[Name-ordered rosters preserve recognition across state changes](/nodes/oats-desktop-expert/decisions/roster-name-order-preserves-recognition.md),
which said a roster sort change is a product decision for the human owner; this is that decision.

The rules, one comparator for every client that shares the roster's base order:

- **Spawn time, newest first,** at every level the order applied before: roots, a bundle by its first
  root in that order (so its newest root, never another member), the children of one parent (after the same-work split, those that draw their parent line first),
  sibling lists.
- **A row with no readable spawn time goes after every row with one,** never first: an unknown is not
  news.
- **Equal times fall back to name, then identity,** so the order is total and the same across polls and
  input orders.

# Why it keeps the earlier rationale

The superseded decision chose name order so starts, stops and a first child would not reprioritize the
agents the operator tracks. A spawn time never changes, so spawn order keeps that property: only adding
or removing rows changes the tree. Its rejections still hold: no liveness-driven order, no
multi-member-first grouping, state shown on the row rather than by moving it.

# Choices the request left open

These were decided by the lead, delegated with the request, and told to the owner (source-reported):

- **A bundle sits by its first root, not its newest member.** Ranking by the newest member would make a
  bundle jump to the top each time a child is spawned into it, the failure that bundle-by-root placement
  exists to prevent. The new child appears inside its bundle, first among its siblings.
- **Children are newest first too,** so one rule reads the same at every depth.
- **One order for every client of the shared roster** (the TUI's list and the palette's never-focused
  rows follow the sidebar). Rejected: a sidebar-only order beside a name-ordered TUI, two orders for one
  roster.

The palette's own recency projection, the deployment panel's running-first list and the graph view are
outside this decision.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sidebar-spawn-order-lead, 2026-11-13; notes/roster-orders-by-spawn-time.md.

Acceptance: **source-reported**. The request is the product owner's own message to their dispatcher on
2026-11-13 (no issue), a record the maintainer cannot read; the implementation PR's body relays the same
request. Implemented
in [oats-project/oats#1930](https://github.com/oats-project/oats/pull/1930) (head `c1901870`), open and
not yet merged at capture; one review round on another model family approved it. No contract changed:
the roster rows the clients read already carried `createdAt`.

Maintainer review of [oats-knowledge#379](https://github.com/oats-project/oats-knowledge/pull/379) checked
oats-project/oats#1930 at `c1901870`: its `rosterOrder` comparator orders by `createdAt` newest first, puts an
unparseable or missing time last and then falls back to name and `instanceId`; the PR was still open and
unmerged at review. The palette and TUI sharing the order is the PR's own statement.
