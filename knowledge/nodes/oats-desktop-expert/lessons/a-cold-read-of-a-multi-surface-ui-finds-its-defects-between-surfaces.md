---
type: Lesson
title: A cold read of a multi-surface UI finds its defects between surfaces
description: When several builders each prove their own surface against one standard, the faults a fresh reader finds are where two surfaces meet on one screen (a name, a notice, a line before an act and after it), so read each image for whose agent every act belongs to and pair every before with its result.
about: [system/oats-desktop]
kind: lesson
id: ins-4b218774958a
tags: [desktop, review, verification, identity, screenshots]
timestamp: 2026-11-25
---

# The lesson

In a read of one frozen image set of a port of Desktop surfaces into a host
application, built by several developers against one written standard, the
serious findings were not inside any one surface. They were between surfaces:

- the host's own title of a thread and the agent's name in the panel beside it
  differed, and the line carrying Stop, Start and Restart sat under the host's
  title with no name of its own (an act on the wrong target);
- a dialog said one consequence before the act and another in its result;
- the same failure notice was drawn by three surfaces at once, each with its
  own Retry;
- two threads with the same state word gave opposite advice about typing in
  them;
- a result named three agents stopped while only the row of the one named in
  the dialog was held as "being read".

Each builder had checked its surface against the standard, and each surface
passed. Nobody had read one screen across surfaces.

This generalizes the last point of
[A port of Desktop surfaces inherits its word pairs](a-port-of-desktop-surfaces-inherits-its-word-pairs.md)
(`ins-c1e226dfa414`), where parity checked surface by surface passed the
screens that disagreed on words: the same blind spot holds for targets,
consequences and duplicated notices.

# What to do

- Read every image asking: which agent does each act on this screen belong
  to, and where does the screen say so? Exact target identity is checked per
  screen, not per component.
- Pair every "before" image with its result image and read the two lines
  together.
- Count how many times one fact (a state, a question, a failure) is on one
  screen, across panes.
- Where the host owns a title or a control beside ours (rename, archive,
  delete, its own composer), treat it as part of the screen: it can move the
  name away from the agent or act on the agent without our words.
- A finding that a fixture could explain is still reported, marked unsure: in
  this read one such finding was the fixture's, and making the scene true
  exposed a real flaw beside it. This keeps
  [A still shows where the scene left the page](a-still-shows-where-the-scene-left-the-page.md)
  (`ins-85caacf0ce26`): report a gap in proof, never nothing.

# Citations

1. The combined read of the bb plugin's image sets, 24 and 25 Nov 2026 (three
   looks; the reports are the probe's, kept by the effort's lead). Source-reported:
   no repository or scene was read, by the read's own rule.

Related: [A still shows where the scene left the page](a-still-shows-where-the-scene-left-the-page.md),
[A port of Desktop surfaces inherits its word pairs](a-port-of-desktop-surfaces-inherits-its-word-pairs.md).
