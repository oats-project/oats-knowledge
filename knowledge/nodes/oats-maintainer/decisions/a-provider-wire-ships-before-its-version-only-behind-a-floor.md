---
type: Decision
title: A kernel may ship an unversioned provider wire before the versioned one, only behind a provider floor
description: The release lane doesn't hold OATS releases for the versioned session-provider wire. A release may carry the first, unversioned wire if its notes mark the wire experimental, every released provider floors OATS at the first kernel with the versioned wire, and no package row needing a provider floors at an older kernel.
about: [workstream/oats-direction]
id: dec-687440ee8ef3
tags: [release, session-provider, wire, floors, compatibility]
timestamp: 2026-11-20
---
**Owner: oats-maintainer (the release lane). Update-on-change:** when the first release with the versioned wire ships, whoever releases it records that here. From then on, only the floor in condition 2 still applies. A change to the wire plan supersedes this record.

# Decision

The session-provider kernel work lands in two steps: a first wire with no declared version (K1), then a versioned wire 1.3 that a provider must declare and the kernel enforces (K2). Both sides decided that what ships carries one wire version, and that a mismatch is refused naming both. The release lane decided on 2026-11-20 not to hold OATS releases between the two steps. A release may carry K1 on three conditions:

1. Its release notes say the provider wire is experimental and not stable until the versioned wire, and that no released provider speaks it.
2. Every released provider declares an OATS floor at the first kernel with the versioned wire, beside its declared wire. (Tightened below when the sandbox rules ship in a later release than the versioned wire.)
3. No package release declares a session-provider row (a `requires[].backends` row naming only session providers, or a provider capability) whose OATS floor is a kernel with only the unversioned wire.

# Refined 2026-11-20: when the sandbox rules ship after the versioned wire

The versioned wire (K2) may merge and ship before the provider sandbox rules it depends on (K3, the bb contract's D16 rules 3, 6 and 7). Until K3 ships, a home's sandbox is not yet the protection those rules describe. The release lane accepts K2 first on four conditions:

1. K2's PR says what is missing until K3.
2. Condition 2 above tightens: when K2 and K3 ship in different releases, every released provider floors OATS at the first release that carries K3, not the first with K2.
3. No docs offer the provider's sandboxed modes before K3 ships.
4. The release notes of a release with K2 and without K3 say so.

Why: a provider that floored at a K2-only kernel could start homes whose sandbox rules the kernel doesn't enforce yet. Moving the floor to K3 keeps every released provider-and-kernel pair whole, without holding K2 behind K3.

This refinement does not loosen the merge-order condition both sides hold on the first step's PR, [oats-project/oats#1991](https://github.com/oats-project/oats/pull/1991): the PR that first lets a sandboxed provider home exist carries D16 rule 3 (a module copy runs only on a digest recorded outside the home), or comes after it. A K2 that lets a sandboxed provider home exist therefore still carries rule 3 or merges after it, unless that condition is itself changed on the record (under [Joan's bb effort](joans-bb-effort-is-pre-approved-on-pepes-side.md), by Pepe's side through the release lane, with Juan's side told). The four conditions above govern what ships around K2 within that bound.

# Why

No released provider exists when the first wire ships. A kernel without a wire check still enforces a package's OATS floor, so condition 2 means no released kernel and released provider can disagree on the wire. Holding every release for the second step would tie the release line to work that isn't in review yet.

# Rejected

No OATS release between the two steps. It is cleaner only if the second step lands soon, and otherwise main holds unreleased kernel work for an unknown time.

# Applying it

The release lane checks condition 1 at the first wire's sign-off, and conditions 2 and 3 at each package release. For a session provider, "the kernel that lists session providers" in the bb contract's D11/D13 rollout-timing commitment means the first release with the versioned wire.

# What is checked and what is reported

[oats-project/oats#1991](https://github.com/oats-project/oats/pull/1991), the first step (K1), was read at maintainer review on 2026-11-20. It is open, carries no provider (a fixture provider stands in), names the provider wire it implements and has K2 stacked on it. The plan's two steps, the wire versions, the two sides' "one wire version in what ships" decision and the D11/D13 commitment are source-reported from the bb contract and the maintainers' exchange. They were not read at review. The release call itself is the release lane's own, made under the release authority in [one release lane and project lanes](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md) (`dec-1d2a5106b721`). For this bb work, [Joan's bb effort is pre-approved on Pepe's side](joans-bb-effort-is-pre-approved-on-pepes-side.md) (`dec-155756953d6e`) lets the release lane give Pepe's side's half of a contract decision. The conditions apply the [declared-floor rule](an-older-host-degrades-with-a-warning.md): a fallback ends only at a declared floor.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-20; notes/k1-k2-wire-release-call.md.
Maintainer review of oats-knowledge#424 (2026-11-20) read #1991, separated the checked facts from the source-reported ones, added the owner and its update-on-change rule, and stamped the id.
Maintainer review of oats-knowledge#434 (2026-11-20) recorded the K2-before-K3 refinement as the release lane's source-reported call, and bounded it by the D16 rule 3 merge-order condition read on #1991, which the proposal did not name.
