---
type: Decision
title: Sidebar roots start collapsed behind a disclosure before the name, and a row its lifecycle takes stays open
description: SUPERSEDED 2026-11-20 by the disclosure-after-the-name decision. Was: in the Desktop sidebar a row with children wears a chevron and the count of every row under it, first on its name line; each section root with children starts collapsed in every window and nested parents start open; a row drawn as a pending spawn or a held home is always drawn open with no disclosure, because its state leaves no room for the needs-input roll-up.
about: [system/oats-desktop]
kind: decision
id: dec-dd808302b7d3
tags: [desktop, roster, sidebar, collapse, attention, accessibility, superseded]
timestamp: 2026-11-19
status: superseded
---

**Superseded 2026-11-20** by [Sidebar roots start collapsed behind a disclosure right after the name](/claims/decisions/sidebar-disclosure-follows-the-name.md) (`dec-e071d489f772`), on the product owner's request of 2026-11-20 (source-reported): the disclosure now sits right after the name, because instance rows no longer carry row tools over their end. The rest of this decision stands and the new one carries it. Kept as the record of why the mark first went before the name.

# The decision

The product owner asked on 2026-11-19: "make the sidebar instance groups be toggable, and be toggled by
default. I.e. that an instance with children in the sidebar has an indicator that it has children, and an
option to toggle to expand the group to make it look as it dos today, but that by default you only see the
top level one". This supersedes the Redesign v3 parity rule "no disclosure arrows on rows" (pinned by a
roster test since oats-project/oats#137, held by no recorded decision); the lane maintainer asked, at its
green light on #1970, that the supersession be recorded here.

- **A disclosure on every row with children in its own section** (the main tree, the Background section,
  a deployment's part): a chevron, turned down while open, and the count of every row under it. A click
  on it opens or closes the row and opens nothing; the rest of the row behaves as before. The tree keys
  are unchanged and it adds no tab stop; the row's `aria-expanded` gives the state and the count is said
  after the name.
- **Each section root with children starts collapsed** in every window. A row under a root starts open,
  so opening a root draws its group as it was. Choices are window state in memory per workspace, as a
  collapse already was; an explicit ask to see a row (Show in roster, a launch's instance, a spawn's
  reveal) opens its ancestors.
- **A row its lifecycle takes is always drawn open,** with no disclosure: a pending spawn, or a held home
  (setting up, retiring, a failed retire). A collapse chosen by hand is kept and applies again once the
  lifecycle is over.

# Why

The default collapse rests on
[the needs-input decision](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md):
a collapsed subtree rolls its waiting rows up onto the visible ancestor. A lifecycle row's state takes its
meta line, the line the roll-up uses, so collapsing it, by default or by hand, would hide a waiting child
with no mark. The product owner chose to keep those rows open rather than redesign them to fit a roll-up
(rows never grow). This applies the needs-input decision to default collapse; it does not change it.

The disclosure sits before the name because the row tools (a pull request link, Start…) overlay the
row's end on hover and focus: a mark after a long name sat under a stopped row's Start…, so a click on
the chevron opened the Start dialog. DOM tests cannot see this; a real browser's hit test with the
shipped CSS did.

Rejected: a disclosure at the row's end (covered by the row tools); collapsing lifecycle rows with their
cue only in the hover card or description (a waiting agent hidden from the overview); starting nested
parents collapsed too (opening a root would no longer show the group as it was).

# Scope

The TUI's list is unchanged and still draws every row open: a divergence from the one shared roster
design, left for its own pass. Order, grouping and connectors are unchanged.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sidebar-collapsible-groups-lead, 2026-11-19; notes/sidebar-default-collapse-and-lifecycle-rows.md.

Acceptance: **source-reported**. The request is the product owner's message to their dispatcher on
2026-11-19 (no issue); the lifecycle choice is their answer to the lead's card after the fourth review
round. Implemented in [oats-project/oats#1970](https://github.com/oats-project/oats/pull/1970) (head
`3c524f5c`). Four whole-change review rounds on another model family found the lifecycle gaps (rounds 1
and 2) and the row-tools overlap (round 3, a Chromium hit test); the rounds and the hit-test measurement
are the PR's own report.

Maintainer review of [oats-knowledge#411](https://github.com/oats-project/oats-knowledge/pull/411) checked
oats-project/oats#1970: the lane maintainer's green light at `3c524f5c`
([issuecomment-7018262952](https://github.com/oats-project/oats/pull/1970#issuecomment-7018262952)) states
that the request replaces Redesign v3's "no disclosure arrows" and asks for this record; the release lane's
sign-off is at the same head
([issuecomment-7018276285](https://github.com/oats-project/oats/pull/1970#issuecomment-7018276285)), and the
PR merged on 2026-11-19 as `0ed1dc95`. The PR replaces the roster test's "no disclosure arrows on rows"
assertion, and [oats-project/oats#137](https://github.com/oats-project/oats/pull/137) is the Redesign v3
design-parity pass. The green light did not repeat the real-window hit test.
