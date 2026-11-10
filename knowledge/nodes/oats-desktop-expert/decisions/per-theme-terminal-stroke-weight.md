---
type: Decision
title: Calibrate terminal stroke weight per theme without changing cell geometry
description: Theme-specific stroke weight matches the native terminal reference without changing cell geometry or adding a user setting.
about: [system/oats-desktop]
id: dec-5a55431a2b7b
tags: [desktop, terminal, typography, themes, native-fidelity]
timestamp: 2026-10-03
---
# Decision and rationale

The Desktop expert's recorded decision of 2026-10-03 was to calibrate normal
terminal stroke weight by theme: White 475, Solarized 450 and Dark 400, with
bold remaining 700. The target was native-terminal fidelity to Ghostty with
macOS font thickening, not a general preference for heavier text.

The reason for separate weights is the
[measured polarity dependence](../lessons/terminal-weight-polarity-and-platform-scope.md):
the Chromium renderers tested produced thinner dark-on-light strokes than
light-on-dark strokes, whereas the Ghostty reference did not show that
variation. A single global adjustment would improve the light themes at the
expense of an already comparable dark theme.

Stroke weight belongs with theme appearance in this decision, not with
terminal geometry. Cell dimensions remained unchanged over the measured
weight range. This preserves the
[native-terminal geometry rule](design-direction-and-quality-bar.md): it is
not permission to change row spacing, cursor geometry or insets to match a
mockup. The numbers above record the calibration decision; current code is
the authority for shipped tokens.

# Alternatives rejected for this calibration

- **One heavier global default:** it over-thickened Dark while attempting to
  correct White. The measurement lesson records the size of that mismatch.
- **A user-facing weight setting:** the per-theme defaults reached the
  reference closely enough in the measured environment; extra configuration
  was not needed to meet the request. This was a preference for the smallest
  sufficient change, not a permanent prohibition on a setting.
- **Replacing WebGL with the DOM renderer:** the measured stroke coverage was
  essentially the same, so a renderer change would not solve the cause.
  WebGL was retained for its box-drawing glyphs.
- **Increasing `minimumContrastRatio`:** that changes colours rather than
  directly controlling stroke weight. It is not a substitute for weight
  calibration or for the separate
  [effective-colour accessibility bar](../lessons/effective-contrast-over-token-pairs.md).

# Scope

The calibration was measured on macOS Retina only. Follow the linked
measurement lesson before adapting it to another platform or pixel density;
do not treat these weights as universal native-terminal matches.

# Citations

1. Harvested 2026-10-03. OKF input 52ae035e267fc3fc2ba75e4b53bfe341946d81480e306ab1f4735a16e5f56332 (note per-theme-terminal-weight.md).
2. Shipped as awebai/oats#539 @ ce5ba76e (`--term-font-weight` per theme).
