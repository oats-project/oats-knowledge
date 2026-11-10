---
type: Decision
title: Needs-input attention preserves liveness and roster recognition
description: A separate text-and-icon marker and collapsed-parent roll-up expose waiting agents without overloading liveness, reordering rows or displaying a stale elapsed time.
about: [system/oats-desktop]
id: dec-a1c653205b62
tags: [desktop, roster, attention, accessibility, liveness]
timestamp: 2026-10-30
---
# Decision and rationale

The Desktop expert recorded this design for the 2026-10-03 needs-input
sidebar effort. It applies the existing
[design direction](design-direction-and-quality-bar.md): situational
awareness across large, active teams. This is the source expert's recorded
design judgment, not evidence that the implementation shipped, passed live
verification or received explicit human acceptance of each visual choice.

- **Attention is separate from liveness.** Put a text-and-icon pill on the
  instance's name line, using the fixed label **Needs input**. Keep the dot's
  liveness meaning intact. Recolouring that dot was rejected because it both
  overloads an existing signal and leaves the distinction dependent on
  colour alone.
- **A collapsed subtree must not conceal a waiting agent.** Roll attention
  up to collapsed parents: a marker visible only on an expanded child fails
  the overview's purpose. This is a roll-up of descendant attention, not a
  claim that the parent itself is waiting.
- **Preserve recognition rather than sorting by urgency.** Do not move
  waiting rows to the top. Stable positions let the operator keep track of
  agents across refreshes; the marker attracts attention without making
  the roster move.
- **Separate durable wording from time-sensitive detail.** Keep elapsed
  time out of the painted row label. The source rejected a visible age
  because data-change-driven repainting can leave it stale even while time
  passes. Compute waited time when showing the hover card, alongside the
  reason. This does not promise a continuously ticking open card.
- **An attention claim must not override observed liveness or break the
  overview.** Gate the marker on Desktop's own running-state observation;
  malformed claims become unknown instead of failing the roster. The
  claims are display-only, not authority to act on an instance. Added at
  maintainer review of oats-knowledge#228: the kernel's later direction lets
  a claim [withhold an automated wake](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md),
  though it still authorizes nothing. Its implementation was open and
  unreleased at that review. No presentation rule here changes, and this
  node's owner has not reviewed it.

# Deliberate scope limit

The terminal tab dot was left unchanged in this slice. The source found that
adding live attention there needed a separate update path, rather than a
simple restyle of the existing dot. This is a scoped deferral, not a
permanent prohibition on tab attention. It does not supersede the separation
of attention and liveness above.

# Related

- [Known dialog-reporting gaps](known-dialog-reporting-gaps-use-home-provenance.md)
  explain a historical missing-emitter case separately from live attention;
  the reporting notice and an explicit attention claim can coexist.
- [Name-ordered rosters](roster-name-order-preserves-recognition.md) extend
  the recognition rationale to liveness and bundle placement, without
  changing this attention-marker design.
- [Agent-centered navigation](agent-centered-navigation.md) is the broader
  rationale for keeping the action target legible.
- [Identity and relationship legibility](../lessons/identity-and-relationship-legibility.md)
  owns the general stable-layout and colour-independent distinction rules.
- [Effective-colour accessibility](../lessons/effective-contrast-over-token-pairs.md)
  owns the contrast verification standard; a reported token-pair measurement
  is not a replacement for it.
- [CLI authority](standalone-product-and-cli-authority.md) owns the kernel
  model and feature-gating boundary. This concept does not duplicate the
  attention-field schema or producer contract.

# Citations

1. OKF input fa37da7c49b2c4e7779f222d9d69135b87adb69dd0dad01ba05792de408f1912 (note needs-input-marker-design.md).

The captured transcript windows contain startup material and the opening
brief, not the later design work or implementation verification. The design
choices and rejected alternatives above rely on the captured note.
