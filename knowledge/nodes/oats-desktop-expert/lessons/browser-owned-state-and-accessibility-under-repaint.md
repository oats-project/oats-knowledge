---
type: Lesson
title: Browser-owned state and accessibility under repaint
description: Rebuilding DOM while the browser owns state inside it — a live selection, an unsubmitted form, a modal's focused control — breaks copy, typing and keyboard containment; declared modality is not containment, and two integration limits shape copy in the terminal surface.
about: [system/oats-desktop]
kind: lesson
id: ins-37a30a6d6a17
tags: [desktop, accessibility, focus, selection, repaint, xterm, tmux, electron]
timestamp: 2026-07-25
---
# Lesson

Desktop repeatedly broke copy, typing and keyboard containment without a
single logic error: a polling view rebuilt DOM while the browser owned state
inside it. The three states are an in-progress text selection, an unsubmitted
form, and the focused control of a modal dialog. Learned 2026-07-25 across
transcript, spawn-form and shortcuts-editor defects.

# Rules

**Declared modality is not containment.** `aria-modal="true"` plus a focus
trap attached to the overlay does nothing once a rerender removes the focused
control and `document.activeElement` falls to `<body>`: the next Tab starts
outside the overlay and reaches controls behind it. A dialog that rebuilds
rows must restore focus by a stable key, fall back to a sibling on the same
row when the exact control legitimately vanished, and finally to a fixed
dialog control — so focus can never land outside. A dialog that cannot
guarantee this is not modal, whatever its attributes say.

**A live selection or an open form is a repaint barrier.** Background
repaints defer while a non-collapsed selection is anchored inside the surface
or a form holds unsubmitted input; the skipped frame retries later. Idle
networking is not permission to rebuild the UI (see
[Async completion must still own the user's intent](asynchronous-intent-and-truthful-outcomes.md)).

**Colour alone must not carry a distinction** (parent vs sibling, active vs
stale); see
[Identity and relationships must stay legible under ambiguity](identity-and-relationship-legibility.md)
and
[Accessibility is proven on effective colours, not token pairs](effective-contrast-over-token-pairs.md).

# Integration limitations that shape copy

- **Electron renderers have no working Copy/Paste/Select-All shortcuts on
  macOS without an application menu carrying the edit role**, plus a context
  menu offering Copy for selected text. Missing copy in a new window is a
  menu problem before it is a rendering problem.
- **A terminal viewer whose multiplexer runs mouse mode forwards plain drags
  to the multiplexer**, so no local terminal selection forms and Copy has
  nothing to copy. Mouse mode is kept because wheel scrollback depends on it.
  The accepted escape hatch is the terminal's modifier-forced local
  selection (Option-drag on macOS, Shift-drag elsewhere); the multiplexer's
  own copy-mode cannot reach the system clipboard without an OSC 52 path,
  which the terminal surface does not add. An empty DOM selection is normal
  for the terminal surface — the terminal keeps its selection internally — so
  it is not evidence that copy is broken.

# Elimination route

Focus-restoration and repaint-barrier defects each have regression tests in
the repository, which is where the mechanics belong. The knowledge is the
stance: browser-owned state outranks a fresh frame, and modality is a
behaviour to prove, not an attribute to declare.

# Related

[Keyboard policy follows actions and user intent](keyboard-focus-and-action-ownership.md);
[Terminal tabs are viewers, not session owners](../decisions/terminal-viewers-not-session-owners.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md) (troubleshooting: selecting text in a terminal tab)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
