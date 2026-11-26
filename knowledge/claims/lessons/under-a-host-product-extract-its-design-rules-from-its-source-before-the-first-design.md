---
type: Lesson
title: Under a host product, extract the host's own design rules from its source before the first design
description: A prototype for screens inside bb used its own state colours, tables and visible keys. bb's source, read afterwards, uses one grey glyph for state, no tables, and shows keys only on a held modifier. Read the host first, with file and line for each rule.
about: [workstream/positioning]
kind: lesson
tags: [design, host-product, bb, research, extension]
timestamp: 2026-11-26
---

# Lesson

The person's rule for OATS inside bb was "bb's own UI, always; a user should not even feel like we
replaced those things". A clickable prototype went through twenty-one versions on his comments. It
used amber and green state dots, tables for lists and a key shown beside each act.

Only then was bb's source read for its design rules (a read-only extraction, every rule with its
file and line, marked as stated by the authors or observed in consistent code). It showed that inside
bb:

- state on a row is one grey glyph, and only failure is red;
- lists are hairline rows inside one bordered card, and bb's own table component has no user;
- a key is shown in a pill only while the modifier is held, or in a tooltip;
- every colour, radius and font is a theme token, never a literal value.

Each of the prototype's choices was one of the "ways a foreign screen gives itself away". The person
then ruled that the extension has no design of its own: it wears whatever theme the user has, and
brings clean elements only.

**The rule.** When screens will live inside another product, the first artefact is the extraction of
that product's design rules from its source: tokens, sizes, components and which is used for what,
text style, keys, what a plugin can and can't reach. Do it before the first sketch. Ask it of a
read-only probe with rules of evidence (no value that was not read in a file; where the host
disagrees with itself, show both). Then every design choice is either the host's or a named
departure the person decides.

**What the extraction also finds.** Where the host falls short of the person's own principle. bb has
a command registry and a palette but is pointer-led (hundreds of buttons against tens of commands,
no arrow keys in its sidebar). "Do as the host does" and "commands first" then pull apart, and the
person has to be shown that before he is shown a design.

Evidence: OKF proposal from oats-product-expert/bb-investigation-lead, 2026-11-26; notes/bb-lead-final-lessons-2026-11-26.md.
