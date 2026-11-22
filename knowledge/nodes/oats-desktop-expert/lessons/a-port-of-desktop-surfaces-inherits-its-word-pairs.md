---
type: Lesson
title: A port of Desktop surfaces inherits its word pairs and shows them side by side
description: The Desktop names one state and several facts differently in the row and in the instance panel, which is invisible there because the row draws no word; a second client that adds visible words to a row or header and copies the panel word for word shows two words for one thing on one screen, so its standard must say which word wins per fact before screens are built.
about: [system/oats-desktop]
kind: lesson
id: ins-c1e226dfa414
tags: [desktop, wording, parity, port, instance-panel, roster, review]
timestamp: 2026-11-22
---

# The lesson

The Desktop is not uniform in its own words. A roster row shows its state as a
dot, with the state in visually hidden words for assistive technology
("running", "stopped" or "status unknown"); the instance panel's header says
"Running" with an age. A row's relation is named, again
only for assistive technology and in the command palette, "under <parent>"; the panel's Lineage section says "Parent", "Sibling" and
"Owning human". The panel says "instance of <soul>" and "Messaging ID". None of
this reads as a contradiction in the Desktop, because the row draws no state
word and no labelled facts: there is only one visible word per thing.

A second client of OATS that replicates these surfaces is likely to add words
the Desktop does not draw (the first port did): a state word beside the row's mark, and a row of labelled
facts over the agent's session. If it then copies the panel's wording exactly,
"use the Desktop's words" and "one word per thing" collide. A reader sees a
state called one thing in the tree and another in the panel beside it, and the
same four facts under two sets of labels.

# What to do

- When writing a wording standard for a port, list each fact that appears in
  more than one place (state, soul, parent, the person who started it, the
  messaging identity) and say which word wins in every place. "The Desktop's
  word" is not an answer where the Desktop has two.
- The same applies to an agent's name where the host has a title of its own for
  the session: decide whether the host's title or the instance name is shown,
  once, for the tree, the panel, the agent's page and every dialog.
- When reviewing a port, read the row, the header and the panel of one agent
  together on one screen, not each surface against its Desktop original. Parity
  checked surface by surface passes exactly the screens that disagree.

# Evidence

A critical read of a host plugin's rebuilt roster screens (November 2026):
with the panel open at desktop width, the tree and the session header said one
state word and the panel another, by a deliberate choice to keep the Desktop's
panel word; the header's fact labels and the panel's differed for all four
shared facts; and an agent was named by the host's session title in the tree
and by its instance name in the panel. Each surface matched its Desktop
original.

# Related

- [The owning human is the first Lineage fact of the instance panel](/claims/decisions/owning-human-is-a-lineage-fact-in-the-instance-panel.md)
  (`dec-ef3883f898b6`) is where the panel's "Owning human" label was decided.
- [An OATS view inside a third-party runner reads the kernel's JSON verbs](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`) fixes what such a port reads and shows; this lesson is about
  how its words are chosen.

# Citations

1. The Desktop's words, read at maintainer review on oats-project/oats main
   `24403e17` (2026-11-22): `packages/desktop/renderer/instance-tree-view.mjs`
   (`stateSpan`, the row's visually hidden state words),
   `packages/desktop/renderer/shell.mjs` and `renderer/palette.mjs` ("under
   <parent>"), `packages/desktop/renderer/context-panel.mjs` ("instance of",
   "Running · <age>", "Messaging ID", Lineage's "Owning human", "Parent",
   "Sibling"). These are the words at that revision, not a standing description;
   read the code for the current ones.
2. The port: the OATS plugin for bb, its roster change
   [oats-project/oats-bb#31](https://github.com/oats-project/oats-bb/pull/31)
   (open at review, head `09fd99a`), whose own row labels its facts "Soul",
   "Under / Started by" and "Identity". The screen-by-screen observations above
   are the source's report from its screenshot read.
