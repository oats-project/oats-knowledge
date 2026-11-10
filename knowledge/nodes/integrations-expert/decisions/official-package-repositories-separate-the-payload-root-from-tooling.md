---
type: Decision
title: Official package repositories separate the distributed payload root from repository tooling, and every resource resolves inside that root
description: A package repository keeps everything the kernel copies under one payload root that carries the distribution manifest, and everything else (schemas, scripts, tests, workflows, the package expert's soul) outside it; the integrity digest covers the payload only, a Git or catalog reference reads the payload root, and every manifest-named resource resolves beneath it or the integrity check is meaningless.
about: [workstream/provider-integration]
id: dec-17ae1d7577a0
tags: [decision, integrations, packaging, payload-root, distribution, integrity, paths]
timestamp: 2026-07-28
---

Decided 2026-07-28 by the integrations expert when the kernel's contained
package root contract landed; the resource-containment rule dates from
2026-07-11. Still the layout under the workspace model, where a package pinned
by tag or Git reference is read from that root.

# Decision

- **One payload root per package repository**, holding the distribution
  manifest, the capability directories with their manifests and skills, any
  declared configuration profiles, and the licence. That subtree is what the
  kernel copies and what the integrity digest hashes.
- **Repository tooling stays outside it**: schema copies, validation and sync
  scripts, tests, workflows, the repository's own package descriptor, and the
  package expert's soul. None of it is installed.
- **Runtime content never hardcodes the payload directory's name**; resource
  paths inside the payload are payload-relative.
- **The repository root is not a package root.** A reference to the
  repository root without a payload manifest fails as an invalid package,
  which is the proof that the separation holds.
- **Every resource the manifest names resolves inside the root.** Hooks,
  commands, skill directories and injections resolve to real paths beneath the
  real package root; a relative path that climbs out, or a symlink whose
  target lies outside, is refused. Shared code is vendored into the package.

# Why

The kernel copies bytes and hashes what it copies. Anything a package needs at
runtime must be inside the hashed tree, and anything that must not ship
(fixtures, a soul's knowledge, workflow secrets) must be outside it; a single
root makes both properties checkable by a listing. If a manifest could point
outside the tree, a locked package would execute bytes the digest never
covered, and a later change to them would be invisible to every check: the
kernel's trust model keeps integrity, origin and consent as separate proofs
([trust, approval and consent boundaries](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)),
and an escaping path silently defeats the first. The official catalog's
mirror depends on the same boundary: the framework's bundled copy is a
byte-for-byte mirror of the payload root at the published tag
([a provider release is mirrored and pinned in one PR](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)).

# Consequences

- Sibling packages developed together reference each other by their payload
  roots, not their repository roots.
- Tests include negative fixtures: a manifest at the wrong level, and a
  manifest path that escapes the root, are both refused.
- Rehearsing a provider against a pre-release head pins the repository by Git
  reference and full commit, and the kernel reads the payload root from it.

# Related

[Capability-local helper copies need a behavioral parity test](capability-local-copies-need-parity-tests.md)
records why small shared helpers are copied into each separately composed
capability and compared by test. Package-payload containment alone does not
make a sibling capability a runtime dependency.

# Citations

- Migrated from agents/integrations-expert/soul/knowledge @ dade3270.
