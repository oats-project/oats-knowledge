---
type: Lesson
title: A mark swapped in place in a clipping flex line keeps one outer advance in both states, with no overhang, and its floor goes only on the kinds that carry it
description: The Desktop's Needs input glyph replaces a terminal tab's dot. It was cropped because its -5px "same advance as the dot" overhang became clippable once slice 3d moved the mark to the end of the tab's line. The fix needed three invariants together, and reviewers found two of them by measuring states and tab kinds the author's own probe did not.
about: [system/oats-desktop]
kind: lesson
id: ins-2845e1c083a0
tags: [lesson, desktop, css, tabs, needs-input, layout, verification]
timestamp: 2026-11-23
---

# The lesson

When a Desktop element is swapped for another in place (a terminal tab's status dot for the Needs input glyph), and it sits in a flex line that wraps and clips its overflow (the tab trigger), three things hold together:

1. **No overhang.** A negative margin that makes a wider mark advance like a narrower one is harmless only while something follows it on the line. Once CSS `order` puts it last, the overhang is clipped. Slice 3d ([oats-project/oats#2087](https://github.com/oats-project/oats/pull/2087)) moved the dot after the name, and the `margin-right: -5px` given for [oats-project/oats#558](https://github.com/oats-project/oats/issues/558) on the 12px glyph then cut the glyph's right 5px off in 78 of 360 measured tab states.
2. **One outer advance in both states.** Removing the overhang alone let a constrained name grow into the 5px the narrower dot left, and the glyph took them back. The name's visible tail then jumped each time an agent started or stopped waiting. One 12px slot fixes it: the 7px dot is centred in it, the glyph fills it.
3. **A floor change only for the kinds that carry the slot.** The slot's 5px belongs on the tab's floor (`--tab-min`) so the name keeps its budget. But that variable is shared by file, brain and view tabs, which have an icon and no slot, and raising it on every tab widened them too, so their strips fit fewer tabs. A `:has()` rule scopes the wider floor to tabs whose trigger holds the dot or the glyph, the same in either state.

# How to apply

- Measure the change's invariants, not the reported symptom: what must not move across the toggle, and who else reads each variable it touches. The author measured only "is the glyph clipped?". Review round 1 measured the name across the toggle, and round 2 measured the other tab kinds.
- A cheap proof outside the app: a static page that loads the worktree's real `theme.css` and `shell.css` over a local HTTP server, renders each state twice (dot, then glyph) and compares rectangles. Run it on main and on each earlier head too, so it is shown to catch each regression (main: 78 clipped; the first fix: 154 name moves; the final fix: 0).
- jsdom 29.1.1, the Desktop's test DOM, resolves a custom property set under `:has()`, so a per-kind floor stays testable in the jsdom tests.

# Elimination route

For this mark the rule is now code: the pinned CSS test in `packages/desktop/test/tab-needs-input.test.mjs` ("the glyph fills the dot's 12px slot") fails on main and on each earlier head of the fix, and the strip test expects 181px on a tab with a slot and 176px on one without. The lesson stays for any other mark toggled in place in a line that clips.

# Evidence

- [oats-project/oats#2105](https://github.com/oats-project/oats/pull/2105), merged as e0c8e500 on 2026-11-23: its description (the cause, the 360-state Chromium matrix with 78 clipped on main, 154 name moves at round 1's head and 0 at the final head, the jsdom 29.1.1 note), the three review rounds it records (round 1: the name's tail moved; round 2: the 181px floor widened file, brain and view tabs; round 3: approve), the release lane's sign-off and the product maintainer's green light (all verified at review). The static-page probe's local HTTP server is the source's report.
- Relates to [needs-input attention preserves liveness and recognition](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md), which left the terminal tab's mark out of its slice: this is that mark's geometry.
