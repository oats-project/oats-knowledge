---
type: Lesson
title: A hidden row's mark sits beside the disclosure control, never as a bare mark after the parent's state word and never in the control's place
description: When a folded parent in a port's roster must show that a row inside it needs a person, the mark goes next to the chevron; a bare mark after the parent's state word reads as the parent's own state, and a mark in the chevron's place removes the only sign that the row opens.
about: [system/oats-desktop]
kind: lesson
id: ins-09681339d6de
tags: [desktop, sidebar, tree, needs-input, accessibility, port]
timestamp: 2026-11-25
---

# The lesson

Three placements of "a folded child needs a person" were built and read in
turn in one roster, the bb plugin's port of the Desktop roster:

1. **A bare mark after the parent's state word** ("Lost (!) · soul"). It
   read as the parent's own state: in a roster where every row said "Lost",
   the one with the mark read as "this Lost is the one that matters". A
   person opens the parent and never sees the child that asks.
2. **The chevron takes the mark's colour.** Nothing reads as the parent's
   state, and the row still shows that it opens. But the signal is a few
   pixels of colour alone: easy to miss, and nothing for a person who cannot
   tell colours. Acceptable for a failed or unreachable child, too faint for
   a child that asks.
3. **The mark in the chevron's place.** The needs-input disc is findable
   without colour. But the chevron is gone, so the row no longer shows that
   it opens, and the first fault returns by another road: the mark that on
   every other row means "this agent needs you" now stands on the parent. For
   a failed child the result was two plain dots side by side, which nobody
   can read.

# What to do

- Keep the disclosure control where it is in every state of the row, and put
  the hidden row's mark next to it, on whichever side of the name the client
  draws its disclosure.
- The hidden row's mark is the same mark that row carries when visible, so
  it has a shape and not only a colour.
- Never put a bare mark after the parent's state word. A roll-up that shares
  the parent's line must say in words that it is about rows below, or it
  reads as the parent's state.

# Scope

This was observed in a port, not in the Desktop, and supersedes no Desktop
decision. In the Desktop the disclosure sits right after the name
([Sidebar roots start collapsed behind a disclosure right after the name](/claims/decisions/sidebar-disclosure-follows-the-name.md),
`dec-e071d489f772`, human-accepted), and a collapsed parent rolls up its
waiting rows
([Needs-input attention preserves liveness and roster recognition](../decisions/needs-input-preserves-liveness-and-recognition.md),
`dec-a1c653205b62`) as the attention icon with the words "N below", which
take the row's second line in place of its detail text. That roll-up is
worded, so it does not read as the parent's own state; the failure above is
the bare mark. A port that copies the Desktop's design keeps its words.

# Citations

1. The combined read of the bb plugin's image sets, 24 and 25 Nov 2026:
   placement 1 in the first set, 2 in the second, 3 in the delta set.
   Source-reported; the third placement was open at capture.
2. [oats-project/oats-bb#85](https://github.com/oats-project/oats-bb/pull/85),
   open at maintainer review on 2026-11-25: its description says a closed
   parent carries the mark of a hidden row that needs a person, and its
   review notes record a lead's read of 24 Nov that moves a folded parent's
   mark onto the chevron as a later change (placement 3).
3. The Desktop's roll-up, read at maintainer review on oats-project/oats main
   `73da4592` (2026-11-25): `packages/desktop/renderer/shell.mjs`
   (`needsInputMark`, and the row's second line replaced by it). These are
   the words at that revision, not a standing description.

Related: [Agent-centered navigation](../decisions/agent-centered-navigation.md),
[A cold read of a multi-surface UI finds its defects between surfaces](a-cold-read-of-a-multi-surface-ui-finds-its-defects-between-surfaces.md).
