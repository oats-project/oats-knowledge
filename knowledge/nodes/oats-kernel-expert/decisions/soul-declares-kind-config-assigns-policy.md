---
type: Decision
title: Soul declares identity and where its capabilities come from; the workspace versions; the host supplies facts
description: A soul names each capability with a location and never a version and carries its slot payloads; the workspace pins package versions and declares defaults; oats-local.yaml holds host-only facts and spawn flags hold per-instance ones; packages never carry deployment targets or policy.
about: [system/oats-kernel]
id: dec-8d54cb3f5291
tags: [kernel, config, souls, workspace, provider-payloads, layers]
timestamp: 2026-09-20
---
# Rationale

**Origin (2026-07).** Decided 2026-07-11/13 by the founder: whatever is
*identity* travels with the soul; whatever is *deployment policy* lives with
the adopter. In its 2026-07 form the soul declared only a kind, and a scoped
configuration cascade assigned capabilities to global, family or soul
targets. The Portable Souls amendment (2026-09-14/20) moved the soul's
intrinsic needs into the soul; workspace model v2 (2026-09-23, 0.25.0) kept
that direction and removed the cascade entirely
([workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)).

**Where each fact lives now.**

- **The soul** (`soul.yaml`) says what it is and what it needs: its work
  mode, each capability **with where it comes from** (`here`, a member repo
  key, or `package`; never a version), `off` for a workspace default it
  refuses, its slot payloads, and optional version *floors*. What a soul
  needs to be itself is identity; letting the kernel or a deployment confer
  it by magic hid identity in the wrong place.
- **The workspace** (`oats-workspace.yaml`) owns the one list of versions
  (`packages:`), the defaults that fill choices a soul leaves open, members,
  stores and shared teams. The workspace proposes; the soul answers, and a
  soul's `<slot>: none` empties a slot the defaults filled.
- **The host** (`oats-local.yaml`) owns facts true only of this machine:
  absolute paths, state roots, clone locations, launch configurations,
  disabled souls. The workspace file refuses absolute paths, and a manifest
  may mark a setting `hostOnly` so no committed file can choose it. Personal
  preferences (which harness binary, which account) never live in committed
  files.
- **The spawn** (`--provider <cap> key=value`) owns facts true of one
  instance, such as a retained messaging seat; they are recorded on the
  instance.

**Manifests and packages never carry deployment targets.** Letting a package
select its own targets was rejected in 2026-07: reuse would carry deployment
policy. Under v2 a package ships capabilities and souls and nothing else; who
gets a capability is the soul's and the workspace's decision. Knowledge,
messaging and tasks remain exclusive slots; making every capability additive
was rejected because competing providers for one slot must stay explicit.

**Payloads are keyed by capability, and origins are recorded per leaf.** The
captured path's single flat operator bindings map was forwarded to every
provider; two providers each validating the other's keys made one
composition unreachable for any input, and the error landed on the innocent
slot. A shared flat input works only while every consumer ignores what it
does not own, and the collision shows only when both are exercised together.
v2 makes ownership structural (`settings.<cap>`, `--provider <cap>`); the
manifest's `binding.keys` is still shape-validated but no longer needed for
routing. The merged payload answers "what applies"; which layer set each leaf
is a separate question, answered by `OATS_SETTINGS_ORIGINS`, never by
re-reading the merged view. Diagnose a suspected input collision by ablation:
remove one key and watch which *other* component's verdict changes.

**Removed, with the reason: configuration templates and package policy.**
Classic packages could ship configuration that an adopter explicitly adopted,
synchronized byte-preservingly or ejected. The judgement then was that a
package update must never retarget agents at a distance ("acquired is not
active"; no live `extends`). v2 removes the question: packages carry no
policy, every capability is chosen in committed soul and workspace files
edited by review, and a version moves only when the workspace's `packages:`
line changes.

# Related

[Committed-only settings prevent deployment drift, not committed soul choice](committed-only-prevents-deployment-drift.md)
records the later source-reported design for restricting a setting to reviewed
sources without excluding soul payloads; it does not change this decision's
ownership rules or certify released support.

[Proven unmatched launch pins refuse fall-through; unchecked pins stay visible](/nodes/oats-kernel-expert/decisions/unmatched-launch-pins-refuse-fallthrough.md)
records why host launch intent needs a refusal, and why incomplete discovery
cannot establish the mismatch that authorizes it.

[Keep kernel responsibilities generic and capability runtimes complete](kernel-and-capability-responsibility.md);
[Integrity, origin and consent are different proofs](trust-approval-and-consent-boundaries.md);
[Operating OATS is capability content](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md).

# Current contracts

- [Current workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md#provider-payloads-have-three-homes)
- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md#soulyaml-v2)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge and agents/cli-dev/soul/knowledge @ 7838d3ca (config-shape-agent-types-and-injections, capability-packages, workspace-configs-over-subpackages, distribution-packages-config-profiles-and-requirements, official-capabilities-oats-core-setup-and-marketplace, capability-materialization-and-config-template-sync, marketplace-workmodes-runtime, operator-bindings-ownership, shared-provider-input-namespace-misattribution, provider-rows-resolve-at-their-own-lock-level).
