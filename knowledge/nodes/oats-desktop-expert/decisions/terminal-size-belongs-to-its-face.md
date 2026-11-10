---
type: Decision
title: A terminal font size belongs to the face it was chosen for
description: Keep terminal size choices and defaults per face rather than per host, because carrying a size across different font metrics changes the user's intended appearance.
about: [system/oats-desktop]
id: dec-746ac9ed659a
tags: [desktop, terminal, typography, preferences, native-fidelity]
timestamp: 2026-10-27
---
# Decision and rationale

The Desktop expert's recorded decision of 2026-10-27 is to keep an independent
terminal size choice for each supported face selection: bundled Inconsolata
and Omarchy's font in the terminals (fontconfig `monospace` on Linux, the
system monospace on Windows; on macOS the terminals keep Inconsolata). The
selected face supplies its own
default on every host: 15px for Inconsolata and 13px for Omarchy's face.
Changing size or resetting affects only the face in use; switching faces
must not carry the previous face's chosen size into the new one.

The reason is semantic, not just visual tuning: a size was chosen against a
particular face's metrics. A value that looked right for Inconsolata did not
express the same visual choice for JetBrains Mono. The source found that an
earlier font change had installed a smaller default but left an existing
15px preference in charge. A fresh-profile demonstration showed the new
13px default while the requesting user's upgraded profile still showed
15px. The [stored-preference verification lesson](../lessons/stored-preferences-can-hide-a-new-default.md)
owns that evidence gap.

The two sizes above record this calibration decision, not a universal
metric equivalence or an inventory of current implementation keys. Current
code remains authoritative for shipped behavior.

# Rejected alternatives

- **Ask the user to reset:** repairs one profile but leaves the product
  vulnerable to the same mistake on the next face switch.
- **Drop a stored 15 once during migration:** guesses whether that value
  expressed a deliberate preference and does not solve later switches.
- **Scale stored sizes by glyph advance ratios:** requires per-font metrics
  and makes the result less predictable to the user. Separate choices avoid
  pretending to infer equivalent intent from one number.
- **Choose the default by host alone:** the Omarchy-sized default can be too
  small when the user selects Inconsolata on that host. The meaningful
  dependency is the face, not the operating environment's name.

# Explicit refinement of the earlier terminal decision

This replaces the font/size-default part of the historical **13px system
monospace** choice recorded in the human-accepted
[native-terminal decision](design-direction-and-quality-bar.md#a-redesign-does-not-restyle-the-native-terminal).
It does not replace that decision's reason for rejecting mockup-driven
terminal restyling: keep xterm's default line-height policy, tmux-owned row
spacing, side gutters and absence of vertical inset. A face-specific size
calibration is not permission to reintroduce a transcript-style terminal.
The [per-theme stroke-weight calibration](per-theme-terminal-stroke-weight.md)
remains a separate decision.

**Human acceptance.** The product owner directed the change: Omarchy's
font with a smaller (13px) terminal default on Omarchy
([awebai/oats#1539](https://github.com/awebai/oats/pull/1539), 2026-10-26).
On 2026-10-27 they asked for the oversized-size fix and approved the running
result, as recorded on
[awebai/oats#1595](https://github.com/awebai/oats/pull/1595). On 2026-10-27
the product owner delegated the knowledge-record decision to the
maintainer's review of oats-knowledge#178, and that review accepted this
refinement of the earlier human-accepted rule on the strength of that
direction.

# Verification and scope

Enforce the chosen dependency in preference storage and regress face
switching, independent writes, per-face resets and the old stored-value
upgrade case. A unit test can prove those semantics, not a native visual
match. Compare actual terminal text and cursor behavior on the target
platform under the existing
[verification boundaries](../lessons/verification-judgment-for-privileged-surfaces.md).

The source's live evidence is one Omarchy environment, JetBrains Mono at
scale 2. It reports Windows and macOS test coverage only, not live visual
verification there. The decision applies to all hosts; that does not make
its visual calibration proven on all hosts or on every fontconfig face.

# Citations

Evidence: OKF proposal from oats-desktop-expert/omarchy-font-size-expert, 2026-10-27; notes/terminal-size-belongs-to-its-face.md; notes/a-stored-preference-hides-a-new-default.md.

The source identifies the earlier change in
[awebai/oats#1539](https://github.com/awebai/oats/pull/1539) and the correction
in [awebai/oats#1595](https://github.com/awebai/oats/pull/1595). It reports a
stored-15-to-13 correction, face-local size writes and reset, and in-place
resizing on a font switch. These are source-reported results, not tests or
implementation/acceptance audits performed by this harvest. At review
(2026-10-27) #1539 was merged; #1595 was approved for 0.69.2 but not yet
merged, so current code remains the authority on what has shipped.
