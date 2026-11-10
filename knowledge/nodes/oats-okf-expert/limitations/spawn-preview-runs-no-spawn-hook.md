---
type: Limitation
title: oats spawn --preview runs no spawn hook, so the harvester's source check only runs at apply
description: The kernel (0.69.x) runs no provider spawn hook in a spawn preview, so the harvester's source check runs only at apply, where a refusal rolls the spawn back and may leave the chosen name occupied as a messaging alias; the provider cannot make preview refuse, documents the fact, and keeps its read-only source check separate from the writing snapshot so a kernel spawn-preview phase would be cheap to adopt.
about: [system/oats-okf, system/oats-kernel]
kind: constraint
id: ins-563446aa83ed
tags: [limitation, okf, harvest, spawn, preview, kernel]
timestamp: 2026-11-06
---

# The limitation

Only launch hooks have a preview phase in the kernel (`launchPreview: true`,
`OATS_LAUNCH_PREVIEW=1`, must change nothing, same contribution). There is no
spawn equivalent: the kernel's configuration documentation (0.69.12) states
that a preview does not run the provider's spawn hook. For
`oats.okf-harvest` this means a spawn `--preview` of a harvester shows the
composition and passes, while the source check (`checkSource`) runs only when
the spawn is applied. A refusal there rolls the spawn back.

Observed in
[oats-okf issue 125](https://github.com/oats-project/oats-okf/issues/125):
`--preview` passed and the apply rolled back with `E_SOURCE` on a normally
retired 4.x seat. The question "preview passed but spawn refused" recurs with
every refused harvester spawn.

The real cost of finding a refusal only at apply is that a rolled-back
harvester spawn can still leave its messaging alias occupied, and the
proposer must then not reuse the name.

# What the provider does about it

- It cannot make preview refuse what its hook refuses; it documents the fact
  instead (README, the `okf-propose` and `knowledge-harvest` skills): preview
  shows composition, not the source check.
- It keeps the read-only `checkSource` separate from the writing
  `snapshotSource`, so a kernel spawn-preview hook phase would be cheap to
  adopt. That phase is asked for in
  [oats issue 1756](https://github.com/oats-project/oats/issues/1756); it is
  owned by the kernel lane and is not a dependency of the harvest work.
- A read-only pre-check command was considered and rejected for now (see the
  [retired 4.x seat decision](/nodes/oats-maintainer/decisions/a-retired-4x-seat-is-harvested-from-its-recovery.md),
  which also records that a preview cannot show the retired-source refusal);
  revisit it if rolled-back spawns keep leaving aliases occupied.

Evidence: OKF proposal from oats-okf-expert/oats-okf-expert-retired-4x-harvest,
2026-11-06; notes/spawn-preview-runs-no-hook.md.
