---
type: Decision
title: A manifest field that compensates for a provider package's contents is asked of the provider first
description: When a provider wants a kernel manifest field whose only job is to work around what its own package ships, ask whether the package can change before adding permanent contract surface under the closed schema; the pi skills-filter field was shaped, conditionally accepted and then closed as unneeded once the provider split its package.
about: [system/oats-kernel]
id: dec-448caa328fc8
tags: [kernel, manifests, packages, harness-packages, pi, rejected-alternatives, contract-surface]
timestamp: 2026-11-09
---
# Decision

**Rule:** when a capability provider asks the kernel for a manifest field
that compensates for the contents of the provider's own package, first ask
whether the provider package can change. A field under the closed capability
manifest schema (`additionalProperties: false`) is permanent contract
surface: every kernel from then on carries it, and the
[historical closed-validator rule](evidence-bounded-compatibility-and-migration.md)
makes its removal as costly as its addition. Contract surface is not added
for a stopgap that the provider's own packaging can remove.

**The case (2026-11-03).** The pi extension package a messaging provider
required bundled that provider's skills, and a plain `pi install` loaded
them machine-wide for that pi folder. The direction from the setup lane was
that the OATS-installed provider installs no machine-wide skills. The
kernel's spawn remedy for a missing pi package prints only the anchored
install argv, so a home following that remedy ended up with the unwanted
skills and the provider's readiness warning. The source instance, as lead,
shaped a kernel contract to close that gap at the setup lane's request [1].

**Outcome.** The product-maintainer side accepted the shape as written. The
other maintainer side (lane:juan) answered that the filter existed only
because of the package's contents, that the package split was already an
open provider decision, and that the field would be accepted only if the
split was declined [2]. The packaging route was taken instead: the closure
cites a provider change making its pi package ship with no bundled skills,
so a plain install would load none and the kernel's remedy is right as it
is. The contract was closed as unneeded, with the explicit reopen condition
that the packaging change fails to ship [3].

# The pre-agreed shape, if the field is ever needed

Recorded so it is not re-derived or re-debated. It was accepted by the
product-maintainer side and conditionally by the lane:juan side; nothing
was built, and no human acceptance is certified here.

- An optional `filter` on a **pi** harness package requirement row, allowed
  value exactly `{ "skills": [] }`: pi's own settings-entry form minus
  `source`, so the kernel renders it with no translation. Other resource
  kinds or patterns would be later, additive changes.
- Not allowed: an `extensions` filter (the kernel already refuses one on a
  required package, because it could not prove the capability still loads),
  and `filter` on a Claude row.
- A `filter` with any other value, or on a non-pi row, is a manifest
  problem that refuses the spawn, as an unsafe package spec does.
- The kernel renders the validated value into its remedy as a settings edit
  for the same pi folder, **after** the unchanged quoted, anchored install
  argv. No provider text is shown as a command.
- An installed, loadable package that lacks the filter is neither refused
  nor warned about: a missing filter loads extra resources but does not
  silently drop the capability, which is the loss the package gate exists
  to stop.
- No settings write at spawn, and no `compatibility.oats` raise by the
  consuming provider (see the
  [requires-row refinement](evidence-bounded-compatibility-and-migration.md#additive-contracts-need-the-actual-old-reader-failure-path)).

The shape carries a settings edit rather than an install flag because, on
pi 1.3.0 as the source tested it, no `pi install` flag sets a resource
filter and `pi install` over an existing filtered entry preserves the
entry's filter keys, so "edit, then install" and "install, then edit" both
end filtered. This is source-reported for pi 1.3.0 only.

# Rejected alternatives

- **A free-text install line from the manifest.** Loses the argv quoting and
  the resource-folder anchoring, cannot be a plan step, and puts provider
  text in the kernel's voice. The remedy stays kernel-rendered from a
  validated value.
- **The kernel writing the harness's settings at spawn.** Spawn verifies
  and never changes the harness's configuration; see
  [integrity, origin and consent are different proofs](trust-approval-and-consent-boundaries.md).
- **A `node -e` one-liner in the remedy.** Executable code in the operator's
  shell.
- **Refusing or warning when the filter is missing.** The missing filter is
  hygiene, not capability loss; refusing would break every existing
  plain-install pi home; and the provider's readiness warning already names
  the edit, so the kernel warning would duplicate it.
- **A general `{skills, prompts, themes}` filter with patterns.** Nothing
  needed it; a consumer would have to exist first.

# How to apply

The next request for a compensating kernel field gets the cheaper route
asked first: can the provider package change? Only if that route is
declined does the kernel consider the field, and then with the smallest
shape that the kernel can validate strictly and render without translation,
leaving existing deployments unchanged. This keeps the kernel
provider-neutral: the package and any filter come from the manifest, never
from kernel knowledge of one provider
([keep kernel responsibilities generic](kernel-and-capability-responsibility.md)).

# Related

[Package probes must see the configuration used by the launch](package-probes-must-see-the-launch-configuration.md)
is the neighbouring refusal of a second settings contract beside a package
requirement. In other nodes, the maintainer's
[provider-owned compatibility file](/nodes/oats-maintainer/decisions/tested-aw-is-published-by-oats-aweb-and-pinned-only-for-byot.md)
reaches the same conclusion for a provider fact under the closed schema, and
the integrations
[bundled-teaching refinement](/nodes/integrations-expert/decisions/installers-preserve-existing-tools-and-state.md)
prefers upstream packaging without the teaching, or a supported
manifest-level resource filter, to a provider-specific settings edit; this
decision took the first of those routes and kept the second as the
pre-agreed fallback.

# Citations

1. [awebai/oats#1717](https://github.com/awebai/oats/issues/1717), the
   contract proposal, read at harvest on 2026-11-09: the shape, the
   non-allowed cases, the remedy rendering, the no-refuse/no-warn choice,
   the rejected alternatives and the product-maintainer side's acceptance
   are stated in the issue body. The issue was posted under a team
   member's account by the proposing instance; the acceptance is an
   agent-lane record, not direct human acceptance.
2. [Comment 6602031416](https://github.com/awebai/oats/issues/1717#issuecomment-6602031416)
   on the same issue, read at harvest: the lane:juan answer accepting the
   shape only if the package split is declined, and the reasoning that the
   field would be permanent contract surface for a stopgap nobody uses.
3. [Comment 6615829619](https://github.com/awebai/oats/issues/1717#issuecomment-6615829619),
   read at harvest, closes the issue as unneeded because
   [awebai/aweb#89](https://github.com/awebai/aweb/pull/89) ships the pi
   package with no bundled skills, and says it reopens if that change does
   not ship. GitHub records the closure on 2026-11-03 and aweb#89 as merged
   on 2026-11-04; the proposal dates the outcome 2026-11-09. The published
   package's contents and the provider's follow-up were not inspected by
   this harvest.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-package-filter, 2026-11-09; notes/pi-skills-filter-declined-for-provider-split.md; notes/pi-filter-behaviour.md (settings-edit rationale only).
