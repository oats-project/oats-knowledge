---
type: Lesson
title: Terminal stroke-weight comparisons depend on polarity and platform
description: A macOS Retina comparison found polarity-dependent Chromium stroke coverage, so native-terminal calibration must control colours and remain scoped to the measured platform.
about: [system/oats-desktop]
kind: lesson
id: ins-5277d91a9f92
tags: [desktop, terminal, typography, measurement, macos, verification]
timestamp: 2026-10-03
---
# Discovery

A terminal that looks fainter need not have the wrong font, font size or
renderer. In the source's recorded 2026-10-03 comparison, dark-on-light
Inconsolata in Chromium was approximately 11% lighter in stroke coverage than
light-on-dark. Ghostty's measured coverage did not vary across the tested
colours. Comparing applications in different themes had therefore confounded
stroke-weight diagnosis with text polarity.

The comparison used Electron 43, xterm 5.5 with addon-webgl 0.18, bundled
Inconsolata-VF at 15px and device-pixel ratio 2 on macOS. The reference was
Ghostty with `font-thicken=true` and strength 160. Coverage was summed over
six identical text rows. These are the source's measured results for that
setup, not a cross-platform rendering invariant:

| Desktop theme | Coverage difference from Ghostty at weight 400 | At weight 450 | At weight 475 |
| --- | --- | --- | --- |
| White | −8.8% | −2.8% | +0.2% |
| Solarized | −4.9% | +1.2% | +4.3% |
| Dark | +2.7% | +9.2% | +12.3% |

In Ghostty's own light-on-blue colours, Desktop at weight 400 was already
within approximately 3% of the thickened reference. This is why a heavier
weight everywhere was the wrong remedy.

# What the comparison ruled out

- **A WebGL-only problem:** the DOM renderer's coverage was within 0.5% of
  WebGL, and the WebGL atlas did respond to variable weights. In this setup,
  each 25-point weight increment added approximately 3% coverage.
- **A cell-size change masquerading as weight:** measured cells stayed
  15×32 device pixels across weights 400–550.
- **A colour-management mismatch in the reference blue:** both applications
  produced the same pixel for the tested colour. The default
  `minimumContrastRatio` of 1 was not contributing a contrast adjustment.

These findings motivated the
[per-theme stroke-weight decision](../decisions/per-theme-terminal-stroke-weight.md).
They do not replace contrast testing: stroke coverage against a chosen
reference is not evidence of WCAG compliance.

# Platform boundary and how to use the finding

The notes explicitly bound the calibration to macOS Retina. Linux, Windows
and low-density displays were not measured; neither an equivalent visual
match nor a particular direction of error is established for them.

If a platform-specific weight complaint arrives, compare the same text,
font, size, foreground/background colours and pixel density against that
platform's native terminal before changing the defaults. Consider
platform-scoped calibration if the measurements warrant it rather than
moving the macOS values to compensate for an unmeasured environment. The
source's limitation note reports that cross-review treated this as a
non-blocking follow-up, not evidence that every platform had passed.

# Verification and elimination route

A source or unit test can pin a token but cannot establish a native visual
match. The durable regression route is a controlled renderer-comparison
fixture that records platform, runtime, font, pixel density, polarity,
coverage and cell dimensions, with a native reference on the target platform.
This is verification work for the existing `electron-live-verification`
skill, not permission to launch a packaged application on an operator's
machine; the
[privileged-surface verification boundaries](verification-judgment-for-privileged-surfaces.md)
still apply. Preserve the rationale and measurement scope here rather than
turning this lesson into a copy of a launch script.

# Citations

1. Harvested 2026-10-03. OKF input 0590885b914749481ead86e99a959cb92ae9dfa52483e81778c713b0a2ff2702 (note terminal-weight-is-polarity-dependent.md).
2. Harvested 2026-10-03. OKF input 341a6a23b424277e8154e002af7848c17420ea9de6e99f47fdeaa2adae414a0b (note terminal-weight-measured-macos-only.md).
