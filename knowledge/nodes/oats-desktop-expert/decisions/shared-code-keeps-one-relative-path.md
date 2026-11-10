---
type: Decision
title: Shared Desktop code keeps one relative path in the repository and package
description: Preserve one source and one relative import path for shared client code, avoiding stale generated copies while making packaging boundaries explicit and testable.
about: [system/oats-desktop]
id: dec-90fac7a05891
tags: [desktop, packaging, shared-code, verification, rejected-alternatives]
timestamp: 2026-10-09
---
# Decision and status

On 2026-10-09 the Desktop expert selected direct relative imports for code
shared with another client: keep the shared directory beside the Desktop
source directory, and use `extraResources` to place it beside `app.asar` in
the installed app. A specifier such as `../client/x.mjs` then has the same
meaning in both layouts, with no generated copy between editing and loading.

This is the source expert's accepted outcome of a packaging spike, not a
claim that the extraction shipped. The cited spike was closed unmerged.
The source reports delegated maintainer conditions, not explicit human
acceptance. This choice concerns packaging shared client code; it neither
changes [CLI authority](standalone-product-and-cli-authority.md) nor decides
product succession or authorizes a second deployment model.

# Why this choice

The constraint was to avoid an intermediate step that could silently serve
stale code, while preserving a Desktop-only dependency install. One relative
path avoids a second source of truth and extra resolution machinery. The
rejected options were local tradeoffs for this package, not claims that
those tools are universally unsafe:

- **Copy into the app directory:** a stale copy can execute old code without
  an import error.
- **Git symlink:** asar refuses links escaping the package, with additional
  cross-platform behavior to account for.
- **Bundle into a generated vendor artifact:** adds a build product that can
  be left stale.
- **A `file:` dependency:** adds lockfile, npm-link and linked-dependency
  packaging behavior; renderer bare imports also require an import-map entry.
  That is more machinery than the chosen relative path.

# Conditions and fallback

Moving shipped code outside the app directory expands the release boundary.
The choice is incomplete unless both guards expand with it:

- Installer workflow path filters must cover the shared source. Otherwise a
  shared-only change can bypass installer verification entirely.
- The package inventory must follow the shipped import graph by reading
  files, not merely match sibling imports of the entry point. Missing
  transitive or out-of-directory modules must fail a regression test.

These are repository fixes, not permanent reminders in lieu of tests. The
source reports that seeded packaging breaks failed the graph-following test
and that packaged backend, collector and main-process graph loads passed.
That evidence supports the tested boundaries, not a proof that every possible
packaging failure will be loud.

The cost is code outside `app.asar`. If asar integrity or the
load-only-from-asar fuse is enabled, revisit the layout: the retained fallback
puts both directories inside the asar with their repository-relative shape.
It preserves their import relationship but changes packaged entry paths,
which is why it was not the first choice. Resource sealing is not evidence
that an asar-only policy is satisfied.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-tui-readers,
2026-10-09; notes/shared-home-packaging-mechanism.md;
notes/spike-verdict-extraction-first.md.

The source reports packaged Node graph loads on macOS arm64, macOS x64 under
Rosetta and Linux x64, strict deep codesign and resource-seal inclusion, and
inclusion in DEB, AppImage and ZIP artifacts in the
[unmerged spike](https://github.com/awebai/oats/pull/857), heads `3ee9ce7b`
and `f6d0ed7d`. These observations are recorded in Build Installers runs
[37977151392](https://github.com/awebai/oats/actions/runs/37977151392) and
[37978310828](https://github.com/awebai/oats/actions/runs/37978310828), not
independently rerun by this harvest.

The later verdict also reports a Linux packaged-shell launch. Its evidence
and limits have their canonical home in
[verification judgment](../lessons/verification-judgment-for-privileged-surfaces.md#linux-can-exercise-the-packaged-shell-in-ci).
No macOS window, AppImage-launcher or on-demand-view acceptance is inferred
from artifact inclusion or Node graph loads.
