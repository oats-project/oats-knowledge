---
type: Lesson
title: Accessibility is proven on effective colours, not token pairs
description: Opacity, colour-mix foregrounds, raw fallbacks and JavaScript-owned theme fields create effective colours a token table never lists, so a passing token-pair check can ship failing text; the bar is an inventory of every shipped foreground against every surface it lands on.
about: [system/oats-desktop]
kind: lesson
id: ins-a21ca7d36411
tags: [desktop, accessibility, contrast, theming, wcag]
timestamp: 2026-07-24
---
# Discovery

Hand-picked token-pair WCAG checks passed while composited text failed
(2026-07-24). Four mechanisms create colours the token table never lists:
container or text opacity, `color-mix()` foregrounds, raw or fallback colour
declarations, and theme fields owned by JavaScript rather than CSS (the
terminal widget's palette). A source token can pass while the pixel the user
sees fails, and a JavaScript fallback bypasses any CSS-only inventory.

# Policy

- **Contrast is judged on the colour the user actually sees**, in both light
  and dark themes, for every foreground against every surface it can land on.
- **Opaque semantic foreground tokens only**; no text or container opacity
  as a way to make colour "quieter".
- **Raw, fallback and derived foreground declarations are rejected** in
  shipped sources.
- **Selection needs explicit foreground and background tokens**; a selection
  background alone proves nothing about the selected text.
- **Every new style source is brought into the inventory before it ships** —
  a new theme field, a third-party widget palette, a JavaScript-side colour.
  Visual review is not the gate; the automated inventory is.

# Why this is knowledge rather than a test

The enforcement exists as tests in the repository. What the tests do not say
is why the policy is opaque-tokens-only and why the inventory must span
JavaScript: the expert asks for effective-colour evidence in any theme or
accessibility review, and refuses a token-table screenshot as proof.

# Related

[Browser-owned state and accessibility under repaint](browser-owned-state-and-accessibility-under-repaint.md);
[Identity and relationships must stay legible under ambiguity](identity-and-relationship-legibility.md) (distinctions must not rely on colour alone);
[Explicit sibling links are shown on both ends and apart from parentage](/nodes/oats-desktop-expert/decisions/sibling-relations-are-shown-apart-from-parentage.md) (why a separated sibling line is meaningful rather than decorative).

# Current contracts

- [Current theme-contrast.test.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/test/theme-contrast.test.mjs)

# Citations

1. Migrated from agents/ux-designer/soul/knowledge @ 7838d3ca.
