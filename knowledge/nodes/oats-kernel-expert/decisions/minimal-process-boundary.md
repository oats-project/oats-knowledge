---
type: Decision
title: A minimal process boundary avoids permanent private coupling
description: A structured public CLI lets independent consumers evolve without turning each private kernel function into a permanent API.
about: [system/oats-kernel]
id: dec-e3d6bc674cf0
tags: [kernel, cli, api, packages, compatibility, runtimes]
timestamp: 2026-07-26
---
# Rationale

Decided 2026-07-10 by the founder (standalone CLI as the single integration
point) and 2026-07-26 (package-runtime boundary). The process boundary was
chosen to survive kernel-internal refactors and module-loading changes.
Blessing a private-file import would keep the coupling while merely giving it
a public name. Raising an OATS version floor is not a substitute for making a
used kernel surface public: an independently released package must not import
private kernel files even by discovering the installation root.

**Runtime adapters ship zero operations.** They are glue — session events and
bootstrap — and every operation is a CLI command with a machine-readable mode,
so a non-JavaScript runtime shells out instead of importing. Splitting the CLI
and adapter into separate packages was deferred at first (version skew without
gain) and then done once the boundary made the split cheap.

The rejected alternative also exposed one-for-one wrappers around internal
lookup, registration and configuration functions. Higher-level operations
express the consumer need with fewer permanent commitments. Add a narrow
public seam only when a real consumer demonstrates the gap, then bind
compatibility claims to consumer evidence. Retired flags are actively rejected
so a stale consumer fails loudly rather than succeeding with changed
semantics.

The formal envelope, commands, dispatch environment and versioning rules
remain in the current contract below. Desktop owns the product consequences of
this choice; this node does not duplicate its succession decision.

# Related

[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
[The CLI as a machine boundary](../lessons/machine-boundary-contract.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (package-runtime-boundary-structured-cli, standalone-cli, distribution-packages-config-profiles-and-requirements).
