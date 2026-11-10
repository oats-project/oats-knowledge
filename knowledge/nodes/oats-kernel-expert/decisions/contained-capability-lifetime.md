---
type: Decision
title: Capability resources must outlive package staging
description: A package is a transport and review unit and a capability is the behaviour; an explicit payload boundary and a complete, contained copy of each capability keep discarded staging and neighbouring paths from becoming runtime authority.
about: [system/oats-kernel]
id: dec-63a6f2f6d55f
tags: [kernel, packages, capabilities, materialization, integrity]
timestamp: 2026-07-29
---
# Rationale

Accepted 2026-07-29 by the founder (materialization redesign), building on
the payload-root decision of 2026-07-28; the workspace model keeps both. A
package is an atomic transport and review unit; a capability is the
behaviour an instance runs. Confusing the two leaves commands or skills
pointing into staging that disappears after the fetch.

**Copy the complete capability, contained.** Each capability is materialized
whole (manifest, `bin/`, injects, skills) into the instance's own module
directory, and hooks run from that copy. A package-only dependency is not a
durable capability dependency. Fail on an unrepresentable resource instead of
silently borrowing a mutable neighbouring path. The defect that forced this
(2026-07-27): a capability declared its skills as work-tree-relative paths, so
a fresh worktree spawned an instance whose instructions named skills that
were never composed — missing *manifests* failed closed while missing
*resources* failed open. "Declared nothing" and "declared three, none exist"
must never collapse to the same empty result.

**An explicit payload boundary separates distributed behaviour from
development content.** A package lives under `oats-package/` and lists its
capability directories in `oats-package.json`; everything else in the
repository (owner souls, CI, member-tier `capabilities/` for people working on
the package) stays out of the package's integrity. This is more reliable than
a growing blacklist of development folders, and it is why a repository can be
a member and a package publisher without the two tiers collapsing.

**Catalog resolution is authoritative.** Resolving a package id never falls
back to a bundled or local legacy source: a silent fallback recreates old
state and grants trust nobody declared.

The cost is stricter authoring. Keep layout rules in the package contract;
this decision records why containment and resource lifetime matter together.

# Related

[Integrity, origin and consent are different proofs](trust-approval-and-consent-boundaries.md);
[Keep kernel responsibilities generic and capability runtimes complete](kernel-and-capability-responsibility.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current workspaces.md, member tier vs package tier](https://github.com/awebai/oats/blob/main/docs/workspaces.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge and agents/cli-dev/soul/knowledge @ 7838d3ca (capability-materialization-and-config-template-sync, oats-package-repository-payload-root, package-payload-root-contract, work-tree-relative-capability-skills-fail-open).
