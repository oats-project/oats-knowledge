---
type: Lesson
title: bb mounts a plugin's side panel twice when a thread opens with the panel already shown
description: In bb-app 0.50.1, a thread that opens with bb's side panel already on a plugin's tab draws the panel and 40 to 400 ms later wraps it in one more element, which mounts the plugin's tab again; state held in the DOM is lost, and a check that opens something and reads at once fails now and then.
about: [workstream/provider-integration]
id: ins-d9feb3985a44
kind: lesson
tags: [bb, plugin, side-panel, remount, flaky-check, live-checks]
timestamp: 2026-11-22
---

# What was seen

bb remembers that its side panel was open and on which tab. When a thread's page then comes up with
the panel on a plugin's tab, bb first draws its tab strip and the content straight in the panel's
column, and 40 to 400 ms later puts both inside one more element. The plugin's tab is mounted again:
measured with a MutationObserver, in 4 or 5 of 28 opens at 1280 px wide, never at 390 px (no side
panel there).

# Why it matters

- Anything the plugin's tab holds in the DOM (an opened `<details>`, a scroll position, text typed
  in the first fraction of a second) is gone after the second mount. State worth keeping across it
  must live outside the DOM.
- A live check that opens a fold and reads its text at once reads empty text now and then. Two such
  scenes kept a repository's main red for hours and failed two unrelated PRs.

# The rule that came out of it

A check waits on the thing it reads (here: until the element holding both bb's tab strip and the
panel is the inner one, then until the text is there), never on a fixed delay, and prints what it
read when it fails. And a cause is not found until a wait on it is shown to change the outcome: the
first fix waited on bb's composer footer, which was always already there, and changed nothing; a
fresh reviewer measured it.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-22
   (oats-knowledge#457); notes/bb-remounts-its-side-panel-after-navigation.md. The measurement
   (bb-app 0.50.1, 4 or 5 of 28 opens at 1280 px, none at 390 px), the refuted first cause and the
   failed runs are the source's report: no GitHub record of them was found at maintainer review
   on 2026-11-22.
