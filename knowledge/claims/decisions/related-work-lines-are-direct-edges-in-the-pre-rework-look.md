---
type: Decision
title: The sidebar draws lines only for related work, in the pre-rework look, each sibling link one direct edge, broken around an unrelated root
description: The Desktop's roster and palette draw a child's line to its parent and a top-level sibling's link only where the row carries related work, drawn as before the UI rework. Each sibling link joins a row to the sibling it records, never a star to a group root. An unrelated root between two joined ones carries no segment, and roots are never reordered to close the gap. Meaningful lines meet 3:1 contrast. It supersedes in part the Desktop rework's no-lineage-lines item (dec-7d36e6fb3bc1).
about: [system/oats-desktop]
id: dec-9b5c89b8c540
kind: decision
tags: [desktop, roster, sidebar, palette, lineage, siblings, related-work, accessibility, rejected-alternatives]
timestamp: 2026-11-20
---

# The decision

The product owner, 2026-11-20: "we should add lines if the instances have the same work flag, both at the
sibling and child level. If not, no lines", and "the sibling line should look exactly as it used to, joining the
paren'ts dots. And when you expand a pren'ts children, then it literally all just looks like it used to."
This restores line cues the Desktop rework had removed, for related work only.

**It supersedes in part** [the Desktop rework's design and UX direction](/nodes/oats-maintainer/decisions/desktop-rework-design-direction-is-joans-side.md)
(`dec-7d36e6fb3bc1`): the item "a same-work group is shown by indentation and spacing, with no lineage lines" (D26 in
the rework's spec). Indentation and spacing still group the rows; related work now also draws its lines. The rest of
that direction, and its delegation to Joan's side, stand. The line cues it had superseded in
[explicit sibling links on both ends](/nodes/oats-desktop-expert/decisions/sibling-relations-are-shown-apart-from-parentage.md)
(`dec-4098247f8e33`) and [parent-child lines require declared shared work](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
(`dec-97cfed58e463`) hold again, for related work only, as below.

- **A child's line** to its parent only where the child carries related work. **A sibling link** only from a
  top-level row whose related work is bound to its recorded sibling. No flag, an unknown host feature or a failed
  probe: no line.
- **Edges, not a star.** Each link joins the row to the one sibling it records (S to R, T to S), as
  [direct links on both ends](/nodes/oats-desktop-expert/decisions/sibling-relations-are-shown-apart-from-parentage.md)
  already requires: never every member drawn to the group's first root, which would show links nobody recorded.
- **An unrelated root between two joined roots** carries no dotted segment: the link breaks around it. The roster's
  order stays as it is (the effort lead's choice, green-lit by the lane maintainer).
- **Contrast:** a line that carries meaning uses its own stroke token at 3:1 against the surfaces it crosses
  (WCAG 1.4.11), in every theme and in derived host themes.
- **One rule** for the sidebar, the palette and the Terminal UI's order, in the shared client module, which reads
  the host's features and never trusts a host-sent stamp.

# Rejected alternatives

- **Reorder roots so joined ones sit together:** changes the shared roster order (spawn time, newest first), and
  would make rows move when a flag changes.
- **Draw the link past the unrelated root:** reads as if that root were joined too.

# Acceptance

The product owner gave this direction in session on 2026-11-20. The acceptance of the supersession is
**source-reported (relay at [oats-project/oats#2011, comment 7037907127](https://github.com/oats-project/oats/pull/2011#issuecomment-7037907127))**:
the lane maintainer's green light records that the change supersedes D26 in part on the product owner's own word,
and that Joan's side was told; the PR description quotes the same words. Checked at review.

Evidence: OKF proposal from oats-engineering-expert/sidebar-collapsed-sibling-lines-lead, 2026-11-20. Built in
oats-project/oats#2011, merged 2026-11-20 (`30aa9c53`); its visual evidence was a jsdom render in Chromium with the
shipped CSS, and a live Electron window was not checked.
