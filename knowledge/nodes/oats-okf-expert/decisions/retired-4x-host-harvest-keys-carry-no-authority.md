---
type: Decision
title: The package's retired 4.x source admission ignores non-soul removed harvest keys and decides the soul opt-out first
description: For a source resolved through its retirement recovery, the knowledge package ignores the removed 4.x keys `harvest`, `harvest-runtime` and `harvest-model` when the host, spawn or workspace recorded them, decides the opt-out first from the recorded soul.yaml text, keeps refusing live 4.x records and refuses any soul `harvest:` value other than `off`; the decision and its rationale are canonical in the oats-maintainer node.
about: [system/oats-okf]
id: dec-0b205612ea95
tags: [decision, okf, harvest, opt-out, retired-source, legacy, 4.x]
timestamp: 2026-11-06
---

# Canonical decision and acceptance evidence

The decision, its rationale and its rejected alternatives are recorded once,
in [a retired 4.x seat is harvested from its recovery](/nodes/oats-maintainer/decisions/a-retired-4x-seat-is-harvested-from-its-recovery.md).
In short, under 5.x the deployment's own act of writing a proposal and
spawning a harvester is the consent, and a 4.x host harvest switch declined
4.x's removed machinery, not the soul's notes. Read the rationale and the
rejected alternatives there; this concept does not restate them. It records
how the knowledge package carries the decision out, and the package-side
evidence for it.

The decision was taken on 2026-11-06 for
[oats-okf issue 125](https://github.com/oats-project/oats-okf/issues/125)
(a normally retired 4.0.5 seat in a 5.7.0 deployment: `--preview` passed and
the apply rolled back with `E_SOURCE` on the recorded 4.x harvest setting).
This package lane's source reports acceptance by both maintainer lanes, one
of them relayed through another instance. That acceptance is source-reported,
not independently verified, like the canonical concept's.

# What the package does

1. **Retired source, removed 4.x keys.** When the harvester's spawn hook
   resolves a source through its retirement recovery, a removed 4.x key in
   the copied record (`harvest`, `harvest-runtime`, `harvest-model`) whose
   recorded origin is the host, the spawn or the workspace carries no harvest
   authority and is ignored, exactly as a manifest default already was. A
   soul-origin key and a key with no recorded origin still refuse, as the
   canonical decision states.
2. **The only opt-out is the soul's, decided first.** `knowledge: { harvest:
   off }` is read from the recorded soul snapshot's `soul.yaml` text, before
   any record-key check. Nothing in an instance record, a note, a host or a
   spawn setting opts a soul out.
3. **Live 4.x records keep refusing.** The 5.0.0 refusal of a live record
   carrying explicit removed keys stands; the remedy is to retire the seat,
   then propose from the recovery.
4. **Fail closed on an unexpected soul value.** A soul `harvest:` value other
   than `off` refuses, live or retired. 4.x treated a soul `harvest: on` as
   "off, also reported", so a masked soul `on` must not pass as consent.
   How this text check must be anchored, and why its first draft would
   have refused every valid source, is in
   [a soul.yaml text check matches a key position](/nodes/oats-okf-expert/lessons/soul-yaml-text-check-anchors-to-a-key-position.md).

**Why the ordering keeps the opt-out safe.** The invariant "an opted-out
soul is never harvested" holds by construction because the hook decides the
opt-out first, from the `soul.yaml` text. The kernel's merged settings are
later-wins, so a host `harvest: on` can mask a soul `off` in the record, but
it cannot mask the soul file; 4.x defined its opt-out by the same text for
the same reason. The record-key refusal only ever protected record and 5.0
consistency ("a setting the source itself refuses"), not the opt-out, so
relaxing it for retired records cannot harvest an opted-out soul.

**The case that raised it.** The reporting deployment had set a host `off`
only to work around a spawn breakage
([issue 100](https://github.com/oats-project/oats-okf/issues/100)). Reading
that switch as an opt-out would strand the seats of
[issue 99](https://github.com/oats-project/oats-okf/issues/99) on a setting
nobody meant as privacy.

**Relations.** This applies the per-soul opt-out already recorded in
[personal-data exclusion is not a publication guarantee](/nodes/oats-okf-expert/decisions/personal-data-exclusion-is-not-a-publication-guarantee.md)
(the spawn checks apply to the recorded source and establish record
consistency, not authorship) to legacy records, adding how the check is
ordered and what the record keys never protected. Nothing is superseded.
Why the earlier "respawn under 5.0 first" route never reached a 4.x seat's
notes is in
[respawn never carried a 4.x seat's notes](/nodes/oats-okf-expert/lessons/respawn-never-carried-a-4x-seats-notes.md).
Why a spawn preview cannot show this refusal is in
[spawn --preview runs no spawn hook](/nodes/oats-okf-expert/limitations/spawn-preview-runs-no-spawn-hook.md).

# Status and evidence limits (2026-11-06)

The build is [PR 128](https://github.com/oats-project/oats-okf/pull/128)
(targeting 5.9.0), open on 2026-11-06: the decision is accepted, the
implementation is not yet accepted code. The canonical decision's acceptance
rule calls it fixed only after a rehearsal on a real retired 4.x seat on the
released version, which had not run. Until a release ships it, an installed
oats.okf refuses a retired 4.x record that carries explicit removed keys.

The gate reading is of oats.okf v5.8.0 (byte-identical to v5.7.0): the
opt-out from `soul.yaml` text precedes the record-key loop. The 4.0.5 README
states the opt-out is the soul's own `soul.yaml`, read there because merged
settings are later-wins. Current hook behaviour belongs to the package at
each release; this concept records the decision and its reasoning.

Evidence: OKF proposal from oats-okf-expert/oats-okf-expert-retired-4x-harvest,
2026-11-06; notes/host-harvest-off-is-not-an-opt-out.md;
notes/opt-out-check-precedes-record-keys.md.
