---
type: Decision
title: Retire's lineage repair falls back on any atomic-write failure
description: Retire's lineage repair tries atomic replacement but falls back in place on any failure, preserving the legacy write's outcome rather than adding a new retirement refusal.
about: [system/oats-kernel]
id: dec-9b824fb9a582
tags: [kernel, lifecycle, retire, lineage, atomicity, compatibility]
timestamp: 2026-10-30
---
# Decision and rationale

For retirement's repair of another home's lineage record, try atomic
replacement first. **On any failure of that attempt, use the existing
in-place write; if that write fails too, its failure is the answer.** The
kernel expert selected this tradeoff on 2026-10-30 under a maintainer
constraint to preserve existing answers. It is source-selected design, not
human acceptance.

Atomic replacement protects concurrent readers from a torn record, but it
needs operations the old in-place write did not: creating a private file
beside the record and renaming it into place. A writable record can live in
a directory that refuses either operation, or on a disk without room for a
second copy. Refusing retirement solely because this new path fails would
turn a reader-protection improvement into a new failure after retirement's
hooks have already run. A full disk is also when an operator may need to
retire work to free space.

The chosen compatibility boundary is therefore the old write's outcome,
not unconditional success. Unlike [best-effort stop-intent recording](/nodes/oats-kernel-expert/decisions/stop-intent-recording-is-before-termination-and-best-effort.md),
this decision does **not** swallow failure of the fallback write. Nor does
it bypass independent preservation or cleanup gates. The shared rationale
is to avoid adding a bookkeeping-only obstacle to the act; the error
handling remains specific to each write.

# Rejected alternatives and accepted costs

- **Refuse when atomic replacement fails.** That introduces failure causes
  the previous repair did not have, even where the original write would
  still succeed.
- **Fall back only for `EACCES` and `EPERM`.** An error-code allowlist misses
  `ENOSPC`, `EIO` and other failures of the atomic attempt. Narrowing the
  catch this way breaks the same compatibility choice; permission failures
  are examples, not the definition of the fallback boundary.
- **Replace every record with mode `0o644`.** A constant would widen a
  `0600` record and narrow a `0664` one. Preserve the existing record's exact
  mode instead of inheriting the current writer's defaults. If that mode
  cannot be read, the atomic helper refuses rather than guesses; in this
  lineage-repair context that refusal reaches the in-place fallback.

The deliberate residual is a torn-read window when the fallback is needed.
Atomic replacement also does not make the repair's read-modify-write a
transaction or eliminate lost updates. The founder-accepted [bounded live
lineage decision](/nodes/oats-kernel-expert/decisions/bounded-live-lineage.md)
already accepts last-writer and partial multi-record splice costs; none of
those boundaries is superseded here.

The source also accepts that replacement can change file ownership, replace
rather than follow a symlinked record, and drop extended attributes or ACLs.
Its justification is that these are not record shapes the kernel creates or
metadata it relies on. That is a source-reported assumption bounding this
design, **not** a promise of full metadata preservation or a general license
to discard metadata in other writers.

# Why the trust writer has the opposite answer

[The trust writer refuses metadata it cannot preserve](/nodes/oats-kernel-expert/decisions/trust-writer-refuses-unpreserved-metadata.md)
rejects an in-place rewrite: there the write is the requested act, and the
harness's own trust dialog is a supported alternative to the refusing
writer. Here the repair is bookkeeping inside retirement, with no
corresponding alternate act to complete that repair. Preserve the different
failure tradeoffs rather than unifying the writers around either blanket
refusal or blanket fallback.

# Enforcement and evidence limits

Enforce this in the shared record writer and the lineage-repair fallback,
with regression tests that distinguish private-file creation from rename
failure, include non-permission errors, preserve exact modes and propagate
the fallback write's own failure. Tests should also retain the known
read-modify-write limitation rather than treating atomic bytes as serialized
updates. This rationale explains what those tests protect; the current
writer inventory belongs in code, not this concept.

Evidence: OKF proposal from oats-kernel-expert/session-lifecycle-followups-kernel-expert, 2026-10-30; notes/atomic-record-write-falls-back-on-any-failure.md.

The proposal reports injected `ENOSPC`, `EIO`, refused-rename and
fallback-failure tests, plus a base-versus-head lineage comparison. No real
full disk was filled. These results were not rerun or independently audited
by the harvester.

Status at maintainer review, 2026-10-30: GitHub records #1664 merged at the
head the harvest read, so the design is on `main`. That is the merge record,
not a release and not human acceptance of this tradeoff. The lost update
remains open as [awebai/oats#1663](https://github.com/awebai/oats/issues/1663).
The review read the merged lineage repair and confirmed that it runs after the
retire hooks, falls back on any atomic failure and propagates the in-place
write's failure. Nothing was rerun.

# Citations

1. [awebai/oats#1660](https://github.com/awebai/oats/issues/1660), read at harvest on 2026-10-30: reports the torn-read risk in lineage repair and mode drift in other record writes, and asks for atomic writes retaining the record's mode.
2. [awebai/oats#1664](https://github.com/awebai/oats/pull/1664), read at harvest on 2026-10-30 at `98febda71aa8ca663182455c0c9629d859f1d25d`: its description corroborates the any-failure fallback, exact-mode rationale, mode-read refusal reaching fallback, metadata costs and remaining lost-update limitation. It was open with no published reviews when checked. Description and reported tests are source evidence, not maintainer acceptance, a release or an independently reproduced filesystem guarantee.
3. [awebai/oats#1664](https://github.com/awebai/oats/pull/1664) and [awebai/oats#1663](https://github.com/awebai/oats/issues/1663), read at maintainer review on 2026-10-30: #1664 merged as `03a434a0d9deacf12ed712ca37234c30dd637845` from head `98febda71aa8ca663182455c0c9629d859f1d25d`, and #1663 open. The merged `lib/core.mjs` was read, not run.
