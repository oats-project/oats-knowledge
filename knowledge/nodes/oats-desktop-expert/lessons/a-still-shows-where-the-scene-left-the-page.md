---
type: Lesson
title: A still shows where the scene left the page, not the state its name claims
description: A live-check image is taken after the scene's steps, so focus on the wrong control or two themes in two loading states can be the script's doing; read the scene before reporting such a mark as a defect, and report instead that the image does not prove the rule.
about: [system/oats-desktop]
kind: lesson
id: ins-85caacf0ce26
tags: [desktop, verification, screenshots, focus, review]
timestamp: 2026-11-22
---

# The lesson

A screenshot from a scripted scene records the page after every step the scene
ran before the shot. In a read of one set, a destructive confirmation was
pictured with the focus on the destructive button, which looked like a broken
"focus starts on Cancel" rule. The scene had asserted the initial focus, then
pressed Tab three times to walk the focus order, and only then taken the image.
In the same set the light and the dark image of one "loading" scene showed two
different states: the read had finished in one run and not in the other.

# What to do

- Before reporting focus, scroll position, an open disclosure or a loading
  state from a still as a defect, read the scene's steps up to the shot.
- If the steps explain the mark, report it as a gap in proof ("the image does
  not show the initial focus; the scene's check asserts it"), not as a defect
  and not as nothing.
- When specifying scenes, take the image a name promises before any step that
  moves focus or waits, and take both themes from the same settled state.

# Citations

1. The focus case, read at maintainer review in the bb plugin's scene
   `plugin/container/scenes/patterns.mjs` (oats-project/oats-bb main `48e021c`,
   and the same at [#31](https://github.com/oats-project/oats-bb/pull/31)'s head
   `09fd99a`): the confirmation scene checks the focus starts on Cancel, presses
   Tab three times to walk the focus order (ending on the act), and only then
   takes the `confirm-before` image. The two-themes loading case is the
   source's report from its screenshot read.
2. Related: [Blocked live verification needs an owned handback](blocked-live-verification-needs-an-owned-handback.md)
   (what automated evidence leaves unproven) and
   [Desktop live checks run headless on a shared host](/claims/lessons/desktop-live-checks-run-headless-on-a-shared-host.md)
   (how the images are taken).
