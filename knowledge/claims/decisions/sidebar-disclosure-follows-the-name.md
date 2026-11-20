---
type: Decision
title: Sidebar roots start collapsed behind a disclosure right after the name, and a row its lifecycle takes stays open
description: In the Desktop sidebar a row with children wears a chevron and the count of every row under it right after its name, so every name at a level starts at the same place; each section root with children starts collapsed in every window and nested parents start open; a row drawn as a pending spawn or a held home is always drawn open with no disclosure.
about: [system/oats-desktop]
kind: decision
id: dec-e071d489f772
supersedes: [dec-dd808302b7d3]
tags: [desktop, roster, sidebar, collapse, attention, accessibility, alignment]
timestamp: 2026-11-20
---

# The decision

This replaces [the 2026-11-19 decision](/claims/decisions/sidebar-roots-start-collapsed-lifecycle-rows-stay-open.md)
in one point: where the disclosure sits. The product owner asked on 2026-11-20: "we should put the toggle
arrow on the right of the instance name, so that all instance names look aligned on the left". Everything else
that decision set stands, and is restated here so this is the one home of the rule.

- **A disclosure on every row with children in its own section** (the main tree, the Background section,
  a deployment's part): a chevron, turned down while open, and the count of every row under it, **right after
  the name**, before the pin and New marks. A row with children and one without, at the same depth, start
  their names at the same place. A click on the mark opens or closes the row and opens nothing; the rest of
  the row behaves as before. The tree keys are unchanged and it adds no tab stop; the row's `aria-expanded`
  gives the state, and the count is said after the name.
- **Each section root with children starts collapsed** in every window. A row under a root starts open, so
  opening a root draws its group as it was. Choices are window state in memory per workspace; an explicit
  ask to see a row (Show in roster, a launch's instance, a spawn's reveal) opens its ancestors.
- **A row its lifecycle takes is always drawn open,** with no disclosure: a pending spawn, or a held home
  (setting up, retiring, a failed retire). A collapse chosen by hand is kept and applies again once the
  lifecycle is over.

# Why

The default collapse rests on
[the needs-input decision](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md):
a collapsed subtree rolls its waiting rows up onto the visible ancestor, and a lifecycle row's state takes
the line that roll-up uses, so those rows stay open.

The disclosure moved after the name because the reason for putting it first is gone. The 2026-11-19
decision put it before the name because the row tools (a pull request link, Start…) overlaid the row's end,
so a mark after a long name sat under a stopped row's Start…. Since slice 1 of the Desktop UI rework, an
instance row has no tools over its end: its acts are the context menu's. Only a pending spawn's row still has
tools, and such a row never wears a disclosure. The name ellipsizes before the mark, which does not shrink.
A future change that puts tools back over an instance row's end must place the disclosure again.

Rejected: keeping the mark before the name (names of rows with and without children would not line up,
which is the product owner's reason); putting it at the row's end (far from the name it qualifies, and where
tools would cover it if they return; this reason is the lead's report).

# Scope

The TUI's list still draws every row open. Lines between rows are out of scope here.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sidebar-collapsed-sibling-lines-lead, 2026-11-20; notes/sidebar-disclosure-after-name.md.

Acceptance: **source-reported**. The request is the product owner's words to the lead, in session, on
2026-11-20 (no issue), and **source-reported (relay at
[issuecomment-7035910764](https://github.com/oats-project/oats/pull/2003#issuecomment-7035910764))**: the lane
maintainer's green light on [oats-project/oats#2003](https://github.com/oats-project/oats/pull/2003) at head
`944c4047` reports that the change does what the product owner asked on 2026-11-20, quotes the request, says it
supersedes #1970's "before the name" placement on the product owner's word, and asks for this supersession as a
follow-up. The release lane's sign-off is at the same head
([issuecomment-7035923668](https://github.com/oats-project/oats/pull/2003#issuecomment-7035923668)), and the PR
merged on 2026-11-20 as `0219a555`.

Maintainer review of [oats-knowledge#430](https://github.com/oats-project/oats-knowledge/pull/430) checked
`0219a555`: `shell.mjs` appends the mark after the name and before the pin, the spoken count and New;
`shell.css` gives `.ctx-name` its ellipsis and `.ctx-disclosure` `flex: none`. The green light states that
instance rows have had no row tools since slice 1 (#1971) and that `.ctx-row-tools` is left only on spawn-job
rows. The real-browser layout and hit test (a long name with pin and New, three sidebar widths, three depths) is
the author's second review round's report; the green light did not repeat it.
