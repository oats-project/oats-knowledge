---
type: Lesson
title: macOS installers — what ad-hoc signing fixes and what it cannot
description: Disabling signing ships a linker-signed, unsealed bundle that Gatekeeper calls damaged; a complete ad-hoc signature fixes that class without any certificate, but only Developer ID plus notarization removes the warning, and release gates must verify the published artifact.
about: [system/oats-desktop]
kind: lesson
id: ins-4b8895d270b0
tags: [desktop, release, macos, signing, gatekeeper, distribution]
timestamp: 2026-07-25
---
# Discovery

The first public macOS installers (2026-07-25) were rejected by Gatekeeper as
"damaged" even though the build was green and the checksum matched. The cause
was not corruption: disabling signing in the packager leaves only the linker's
partial ad-hoc signature on the main executable, with no sealed resources and
unsigned nested helpers. Strict deep verification fails, and the user cannot
open the app at all. The cross-built second architecture carried no signature
whatsoever.

# Decision

**A complete ad-hoc signature is the right default for an unsigned
open-source distribution.** The packager's ad-hoc identity signs every nested
helper and framework and seals resources with no certificate, keychain or
secret involved, so it is safe to run on public CI and on fork pull requests.
It turns "damaged, cannot open" into the ordinary unidentified-developer
prompt.

**Ad-hoc signing does not remove the Gatekeeper warning, and nothing short of
Developer ID signing plus notarization will.** Anyone proposing to "fix the
macOS warning" without Apple credentials is proposing the impossible; the
honest product answer is documentation of the right-click-Open path. Do not
represent ad-hoc as more than it is.

**The no-secrets posture is what makes signing on fork PRs safe.** The
packager skips signing on pull-request builds unless explicitly forced; forcing
it is correct only because there is nothing to leak. This setting must never
be copied into a workflow that holds real signing credentials.

# Traps that persist

- Any bundle mutation must happen before signing, never after; a
  post-signing tweak (a permission bit, a helper copy) breaks the seal.
- A structural pre-check for the bundle's resource seal gives a clearer
  failure than the signing tool's own phrasing, and costs nothing.
- Release gates verify the **published** artifact re-downloaded from the
  release, not the build log: the defect was discovered on a public asset
  with a correct checksum.
- Published assets are never overwritten; a broken release is superseded by a
  fresh patch release.

# Related

[Verification judgment for Desktop's privileged surfaces](verification-judgment-for-privileged-surfaces.md) (packaged launch smoke belongs in CI);
[One standalone Desktop product, no hidden operational kernel](../decisions/standalone-product-and-cli-authority.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md) (installation and troubleshooting)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
