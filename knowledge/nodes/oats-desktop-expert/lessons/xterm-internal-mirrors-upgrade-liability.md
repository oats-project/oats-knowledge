---
type: Lesson
title: xterm upgrades must revalidate private reads and copied behavior
description: A major xterm upgrade can leave private reads and copied algorithms working syntactically but wrong semantically, so qualify those dependencies against the new version rather than trusting a green build.
about: [system/oats-desktop]
kind: lesson
id: ins-e008fea3c99e
tags: [desktop, terminal, xterm, upgrades, dependency-debt, verification]
timestamp: 2026-10-15
---
# Finding

The source's 2026-10-15 comparison of xterm 5.5 and 6.0 found that Desktop's
upgrade risk was not confined to public API changes. Private renderer reads
could still resolve, while a copied wheel-scroll algorithm could keep
running after an option it read disappeared. Neither syntactic survival nor
a green build establishes that the old behavior still means the same thing.

The investigation supplied three examples at OATS commit `dc199191`:

- Fit code read private `_core._renderService` state and called its clear
  method; those internals still existed in the inspected 6.0 bundle.
- The wheel-scroll copy of 5.5's `Viewport.getLinesScrolled` read
  `fastScrollModifier`, removed in 6.0. The copy could silently fall back to
  its default instead of producing a type or build failure.
- Scrollbar CSS targeted `.xterm-viewport`, whose viewport structure changed
  in 6.0; JavaScript type checking does not qualify that selector contract.

These are dated counterexamples, not a maintained map of every xterm
coupling. The source reports that its type/build checks did not flag them;
that does not mean tests or static checks can never catch this class. The
finding explains why the [synchronized-output decision](../decisions/terminal-viewers-not-session-owners.md#synchronized-redraws-without-session-ownership)
separated the immediate redraw fix from the major dependency upgrade.

# Upgrade judgment and elimination route

Before a major bump, discover the current private reads, copied dependency
algorithms and dependency-internal CSS selectors. Re-derive their assumptions
against the target version; do not treat an unchanged private member name or
a copied function that still runs as compatibility evidence. The old list
is a starting example, never proof that the next upgrade's inventory is
complete. Geometry and wheel-scroll behavior need consumer-level evidence,
not just successful imports or public-option type checks.

This is dependency debt. First prefer supported public APIs and remove
local copies when the dependency can own the behavior. Where a private
coupling remains necessary, isolate it behind a small adapter and protect
its actual consumer outcomes with tests against the installed dependency:
fit geometry, wheel-scroll modifiers/defaults and scrollbar behavior. A
static inventory check can expose new private references, but cannot prove
their semantics. These are elimination routes, not claims that such guards
already ship or that every private use has a public replacement.

The existing [keyboard lesson](keyboard-focus-and-action-ownership.md#linux-and-windows-terminal-chords-preserve-the-programs-input)
provides a related installed-dependency output guard; the
[shared-atlas lesson](gpu-restart-recovery-follows-shared-atlas-scope.md)
owns renderer recovery and its version-sensitive workaround. Any native
verification still follows the [operator-safety and bounded-experiment rules](verification-judgment-for-privileged-surfaces.md).

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-cursor-flicker, 2026-10-15; notes/xterm-internal-mirrors-upgrade-liability.md. The source reports a 5.5.0/6.0.0 typings comparison and inspection of both bundles and Desktop consumers. The proposal points to the [xterm 6 upgrade plan, awebai/oats#1194](https://github.com/awebai/oats/issues/1194#issuecomment-6187243856). This harvest did not repeat the comparison, run Desktop or establish that the upgrade has completed.
