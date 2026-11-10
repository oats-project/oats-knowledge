---
type: Decision
title: Pre-adoption contracts are removed, not translated
description: While a configuration or integration shape has no external adopters, OATS removes the old shape with a pointed error naming the new spelling instead of shipping an auto-migrating shim; published commitments keep reader compatibility.
about: [workstream/oats-direction]
id: dec-892ed7083736
tags: [compatibility, config, packages, precedent]
timestamp: 2026-07-29
---
# Decision

Decided repeatedly with the founder between 2026-07-11 and 2026-07-29 and
applied each time a young contract changed shape: the 2026-07 pre-release
`workspace.yaml` *configuration file* (unrelated to, and not an ancestor of,
the `oats-workspace.yaml` Git-hosted workspace *definition* introduced
2026-09-20 — see [a workspace definition is not a package](/nodes/oats-maintainer/decisions/workspace-definition-is-not-a-package.md)),
the first global capability store, the `groups:` config
shape, `from: bundled`, and the transitional package-root lock. In every case
the old shape was **removed outright** — no discovery, no translation, no dual
reader — and the loader fails with a crisp error that names the replacement
spelling.

# Rationale

A shim keeps two contracts alive and hides which one is real; each later
change must then be designed against both. While the contract is young and
nobody outside the project depends on it, a pointed error is cheaper, honest,
and forces the documentation to describe one shape. The founder explicitly
chose simplicity over a versioned migration path for the unadopted
transitional lock ("no v3 format") because there was no external adoption to
preserve.

# The precedent is bounded

It applies only to shapes with **no supported adoption**. Published
commitments — immutable package tags, locks that shipped in a release, souls
that real deployments created — keep reader compatibility, and a compatibility
claim must be proven at the public boundary, not only in the loader (see
[compatibility and migration claims need proof](/nodes/oats-maintainer/stewardship/review-protocol.md)
and the kernel's
[evidence-bounded compatibility decision](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md)).
Where a supported migration exists it is all-or-nothing per scope — the
stewardship reason is that a residue container recreates the two-contracts
problem inside one file; the ruling itself (2026-07-29, superseding the
2026-07-26 residue envelope) is recorded once, in the kernel decision above.

Two corollaries: the removal error must be **orderable** — its remedy must not
depend on the very command the error blocks (edit the file first, then run
the command); and narrative documentation written for the replaced model must be
grepped sentence by sentence and re-verified, because prose describing the old
behaviour survives renames.

For the distinct case of a removed kernel error code still emitted within a
client's supported band, see
[retired kernel codes need no client list until required](/nodes/oats-maintainer/decisions/retired-kernel-codes-need-no-client-list-until-required.md).

# Rejected alternatives

- Auto-migrating loaders for pre-release shapes (rejected 2026-07-13 for the
  `groups:`→types change, and again for `from: bundled`).
- A versioned successor format for an unadopted transitional lock (rejected
  2026-07-29).
- Residue containers for partially convertible scopes — see the kernel's
  [evidence-bounded compatibility decision](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`architecture/workspace-config`, `decisions/config-shape-agent-types-and-injections`, `scoped-capability-store-and-templates`, `capability-materialization-and-config-template-sync`, 2026-07-11 → 2026-07-29) and agents/docs-expert/soul/knowledge @ 7838d3ca (`lessons/v1-lock-migration-no-residue`).
