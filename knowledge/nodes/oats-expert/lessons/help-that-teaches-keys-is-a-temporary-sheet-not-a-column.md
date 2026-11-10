---
type: Lesson
title: Help that teaches keys is a temporary sheet on the prefix, not an always-on column
description: Anything "always on" that exists to teach the keys steals the width the content needs; in a keyboard-first client the help panel is off by default and opens as a small temporary sheet on the prefix key, and the human reversed an always-on help column in one comment round.
about: [workstream/coordination]
kind: lesson
id: ins-45e3b839fc25
tags: [design, redesign, keyboard, help, layout, panels, prototype]
timestamp: 2026-10-27
---
# Discoverability drawn as furniture costs the content its space

A keyboard-first client needs to teach its keys, and the easy answer is a
right-hand column that always lists them. The source's first interactive
round drew that column in both clients. The human reversed it in the
following comment round: the right panel is off by default and opens as a
small, temporary sheet on the prefix key. Removing the column returned about
a third of the terminal frame's main width to the content; the source's
lesson from the human is that **anything "always on" whose job is to teach
the keys steals the space the content needs**.

# Rule

- Help is a **sheet**, not a column: it opens on the prefix, lists the keys
  available where the user is, and closes when a key is pressed or the
  prefix is released. A pinned mode may exist as a preference; it is not the
  default.
- The same test applies to any permanent chrome whose purpose is teaching
  rather than doing: a legend, a shortcut bar, a persistent hint row. Ask
  what content the space would otherwise show; if the answer is "the
  content", the teaching element is temporary.
- Dropping the column does not drop discoverability: the prefix is the one
  key to learn, and the sheet teaches the rest at the moment it is needed.

# How this relates to neighbouring records

The Desktop expert's
[closed panels return their space to the main area](/nodes/oats-desktop-expert/decisions/closed-panels-return-main-area-space.md)
is the same stance for Desktop's sidebar and instance panel, with the
reopening controls it requires; this lesson records that the stance held for
a help panel too, across both clients of a redesign, and is the lead's
lesson from a review round, not a Desktop design authority. The redesign's
method is
[inventory then one shared design](/nodes/oats-expert/lessons/inventory-then-one-shared-design-for-a-cross-client-redesign.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/ui-ux-redesign-expert, 2026-10-27;
notes/round2-choices.md; notes/round2-direction.md.

One effort, one human, a prototype and not a product, source-reported: the
human's direction and the width recovered are the source's account of its
review comments and its own build; this harvest read neither. The direction
is a review comment on a prototype, not a recorded product decision, and it
supersedes nothing in either client's accepted records.
