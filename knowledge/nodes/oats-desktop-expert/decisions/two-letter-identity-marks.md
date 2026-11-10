---
type: Decision
title: Identity marks show a two-letter abbreviation, never a first initial
description: One deterministic, roster-independent rule turns a soul, capability or workspace name into two glyphs, because namespaced names made first-initial marks collide; overlapping mark stacks overlap by 1px so no letter hides.
about: [system/oats-desktop]
id: dec-46cd46917b96
tags: [desktop, identity, marks, roster, legibility, accessibility]
timestamp: 2026-10-08
---
# Decision and rationale

Accepted 2026-10-07 by human direction (chosen from three options), merged in
awebai/oats#768. Soul, capability and workspace marks used the first letter of
the name. Names in a real workspace share namespace prefixes (`oats-…`,
`oats.…`), so most marks read the same letter: in the workspace that prompted
this, 9 of 14 souls showed "O". A mark that does not tell agents apart fails
its one job, which is fast recognition in rows and in name-less stacks.

**The rule** (one grammar app-wide):

1. Drop a package qualifier: keep what follows the last `/` or `--`.
2. Split into words on every run of non-letter, non-digit characters.
3. With three or more words, drop the first (a leading namespace word).
4. Take the first character of each of the first two words; a one-word name
   gives its first two characters.
5. Uppercase. A mark is never more than two glyphs: when uppercasing grows a
   character (`ß` → `SS`), each selected character keeps its first glyph.
   No letters or digits at all gives `?`.

`oats-desktop-expert` → DE, `oats-kernel-developer` → KD,
`<package>--knowledge-harvester` → KH, `oats.aweb` → OA. In the motivating
workspace this gave 13 distinct marks of 14. The remaining collision
(`oats-expert` / `oats-operator-expert`, both OE) was accepted: the adjacent
name is authoritative and the mark stays decorative (`aria-hidden`), as
[Identity and relationships must stay legible](../lessons/identity-and-relationship-legibility.md)
requires.

**Rejected:**
- *Strip the prefix the roster's names share.* The same soul would get
  different marks in different views and as the roster changes, which breaks
  recognition across refreshes.
- *Colour only, no letter.* Calmest, but name-less stacks (a capability's
  "Used by", a team's members) would then say almost nothing.
- *A mark declared in the soul definition.* Best long-term control, but a
  kernel contract change. Deferred, not refused.

# Consequence: stacks no longer overlap

Two glyphs fill a 20–22px tile. Stacks that slid each tile under the next by
5–6px hid the second letter, the very collision the change removed. Stacks now
overlap by 1px, and the tile's surface-coloured border still separates them.
Any future stacked-mark site must not overlap more than about 1px. Font size
may drop by at most 1px at a site; tile sizes stay.

# Related

- [Identity and relationships must stay legible under ambiguity](../lessons/identity-and-relationship-legibility.md):
  the label is not the identity, and stable layout preserves recognition.
- [Accessibility is proven on effective colours](../lessons/effective-contrast-over-token-pairs.md):
  mark colours are unchanged by this decision.

# Current contracts

- [Current identity-marks.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/identity-marks.mjs)

# Citations

1. Human direction 2026-10-07, choosing the two-letter option over colour-only and a declared mark.
2. awebai/oats#768 (merged), including the expert-approved 1px stack overlap and the `ß` amendment.
