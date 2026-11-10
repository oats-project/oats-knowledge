---
type: Decision
title: Version baseline digests independently of baseline authority
description: Separate digest evolution from the baseline version that gates lifecycle authority, preserving legacy comparisons without rewriting spawn-time evidence.
about: [system/oats-kernel]
id: dec-568ffb6c05dd
tags: [kernel, baseline, digest, compatibility, lifecycle, retire]
timestamp: 2026-10-09
---
# Decision

The spawn baseline's digest algorithm has its own version, selected by
`digestVersion`, independently of the baseline's structural and authority
version. Evolve the digest by adding a version beside the old algorithms,
not by changing what an existing version means.

The source records this decision on 2026-10-08 and reports agreement with
`oats-maintainer-pepe` as an internal, additive change. That agreement is
source-reported; this harvest does not independently establish it or infer
human acceptance from the maintainer alias.

# Rationale

The baseline version does more than select a digest representation: it gates
authority used for runtime endpoints at start, directory-home retirement and
provider exclusions when a home is disposable. Bumping that version merely
to improve a digest would invalidate the existing baselines for those checks,
turning a comparison improvement into start and retirement refusals.

An absent `digestVersion` therefore denotes the legacy algorithm, frozen
byte for byte, rather than unknown provenance. An unrecognized value cannot
establish an unchanged tree. New spawns use the current digest version;
existing baselines retain the interpretation under which they were captured.
This preserves a comparison, not a claim that the legacy algorithm is free
of blind spots.

# Rejected alternatives and accepted cost

- **Bump the baseline's own version:** unnecessarily removes the authority
  that existing baselines supply to lifecycle operations.
- **Treat every absent digest version as unknown:** introduces a recovery
  copy attempt for existing baselines rather than preserving their known
  interpretation. A mandatory copy is fallible and can refuse retirement;
  this is not a cost-free compatibility fallback.
- **Rewrite stored baselines with the new digest:** destroys the evidence of
  the tree at spawn under the algorithm that observed it. Recomputing from
  today's tree cannot recreate that observation.

The accepted cost is that an instance captured under the legacy algorithm
keeps that algorithm's known limits until respawn. This decision does not
retroactively repair legacy evidence or authorize an unknown digest version
to match.

# Related

- [Retire Git reads preserve the spawn baseline's configuration semantics](/nodes/oats-kernel-expert/decisions/retire-git-reads-preserve-baseline-semantics.md) owns the separate configuration-comparability decision. Digest versioning does not change that read profile or perform its required transition.
- [Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md) owns the general rule that unknown evidence is not proof of completed preservation.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-09; notes/decision-baseline-digest-versioned-apart.md.

The proposal and note identify [awebai/oats#829](https://github.com/awebai/oats/pull/829)
for [#660](https://github.com/awebai/oats/issues/660) and
[#661](https://github.com/awebai/oats/issues/661) as the implementation
context. Implementation, merge and approval history were not independently
audited by this harvest.

Verified by the knowledge maintainer at review of the harvest: awebai/oats#829
merged on 2026-10-08, closing #660 and #661, with APPROVE verdicts from both
maintainers posted on the PR. Its description records the digest's own
version beside an unchanged baseline version because that version also gates
runtime authority, directory-home authority and the provider disposable-home
exclusions, the legacy digest frozen byte for byte for a baseline without the
field, an unknown value matching nothing, and rewriting existing baselines as
out of scope because they keep their evidence. The missing-version-as-unknown
alternative rests on the source's note alone.
