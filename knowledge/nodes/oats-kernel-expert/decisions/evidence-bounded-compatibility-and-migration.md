---
type: Decision
title: Compatibility follows supported adoption, not every intermediate format
description: Supported adoption bounds compatibility, unrepresentable migrations refuse, and rollout gates and pre-upgrade checks must match the actual outgoing reader rather than assume every new declaration fails the same way.
about: [system/oats-kernel]
id: dec-3ab7a3c3e51f
tags: [kernel, compatibility, migration, locks, packages, manifests]
timestamp: 2026-11-09
---
# Rationale

Founder rulings of 2026-07-29 during the materialization redesign. An
intermediate implementation does not automatically become a permanent
compatibility obligation. Establish supported adoption before adding another
version, reader and migration subsystem; an unadopted transitional format is
revised in place rather than versioned, while genuinely supported historical
inputs are retained.

This is not permission to abandon published commitments because no local
consumer is visible. Reader compatibility and current authoring rules differ:
accepting an immutable legacy artifact does not endorse emitting that shape
today. Before choosing a discriminator for "old format", enumerate the actual
published artifacts it must accept. A field that is *optional* in the old
format cannot discriminate it; only a field that is *impossible* there can.
The intuitive "legacy spelling present ⇒ legacy" test would have stranded the
one immutable published package the compatibility existed to serve.

**A migration cannot invent a home for state its destination cannot
represent.** The founder chose whole-scope refusal over converting around
retained entries or creating a residue container. When a format has no place
to put something, the operation that would leave it behind refuses; never
claim an entry was retained unless the result can still resolve it. The
workspace model applied this in its strongest form (0.25.0): no converter and
no dual-schema reader; the previous kernel line keeps running its deployments
and an operator rebuilds on the new model
([pre-adoption contracts are removed, not translated](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)).
A lock written by 0.26.0 is unreadable by an earlier kernel, so every kernel
of a deployment moves together; the refusal (`E_LOCK_SCHEMA`) is the honest
outcome, never a repair.

**Historical rule (2026-09-21): a closed manifest validator makes every new
manifest field a hard floor bump.** Earlier kernels reject the whole manifest
at load, not just the new feature. Ship the kernel that reads the field first; providers
that declare it floor on that kernel; never publish a provider release with a
field its floor kernel cannot load. The mirror image governs removal: a field
the kernel stops using is kept in the schema as tolerated-and-ignored
(`helperInjection`, hook `inputs` since 0.26.0), because deleting it would
reject every manifest that still carries it.
Its load-rejection premise is qualified, not overturned, by
[the 2026-11-03 old-reader finding](#additive-contracts-need-the-actual-old-reader-failure-path)
below.

**Partly superseded, 2026-10-08:**
[Unknown hook events are forward-tolerant unless required](forward-tolerant-hook-events.md)
introduces one exception from OATS 0.49.0: a non-required hook event name may
be unknown without rejecting the capability. Declaration validation stays
strict. Other new manifest fields and unknown required events still need a
kernel that supports them. Pre-0.49.0 kernels still reject every unknown
event, so provider floors and upgrading every composing host before adoption
remain necessary; this is not retroactive compatibility.

## Additive contracts need the actual old-reader failure path

**Dated qualification, 2026-11-03:** the historical closed-manifest-loader
premise above must not be read as a universal current runtime guarantee.
The source's investigation for the
[committed-only setting decision](committed-only-prevents-deployment-drift.md)
reports two different boundaries on the then-installed OATS **0.69.9** [5]:

- A workspace root key unknown to that kernel (`tasks:` in this case) is
  refused by runtime workspace validation before a spawn or provider hook
  can use it. The rollout choice was to state the kernel prerequisite in
  the release's Upgrade guidance and adopt the workspace key only after
  that kernel is available (narrowed below: running on every reading
  deployment, not merely released). A provider warning that the old kernel might
  silently ignore this workspace key addresses a path that cannot reach
  the provider.
- An unknown manifest settings flag such as `committedOnly` is not protected
  by that workspace check. The source reports no runtime manifest-schema
  validation in this reader and concludes that the flag is ignored rather
  than enforced. A provider relying on the restriction still needs an
  enforcing kernel in its compatibility range; merely loading the manifest
  is not evidence of protection. Provider-side authoring validation may
  separately need the updated schema.

**Further review refinement, 2026-11-03:** kernel availability alone is not
that workspace's adoption gate. Every deployment reading the workspace must
**run** a kernel advertising the new key's feature in `oats version --json`
`features`. The review rejected guidance to raise a workspace kernel floor:
`oats-workspace.yaml` has no such field in the reviewed contract, so that
instruction named no action an operator could take [6]. State the actual
per-deployment prerequisite, not a fictional workspace setting or merely the
existence of a supporting release.

The same review corrected the operational consequence: an unknown workspace
root key stops resolve and spawn, including spawn preview, on the refusing
deployment; it does **not** by itself stop an existing home's ordinary start.
The source reports that the live-team read falls back to the home's recorded
teams when the workspace is unreadable, while removed-team-key errors are
re-thrown. This is not a guarantee that every start succeeds, nor permission
to treat recorded teams as a successful live workspace read. The reviewer
probe and the proposer's source check at `3885ca029` establish only the
reported **0.69-series** case; earlier released readers were not reproduced.
Keep that limit when describing rollout urgency rather than extrapolating a
schema refusal to every lifecycle operation [6].

This qualifies the descriptive loader premise, **not** the obligation to
support declared features or preserve published commitments. It makes no
claim about when the historical behavior changed, all older kernels, all
manifest fields, or unknown hook-event handling. The named runtime check and
source inspection were reported by the proposer, not reproduced here.

The decision-changing lesson is to distinguish **cannot reach the provider**
from **can load but lacks enforcement** before selecting a rollout gate or
compatibility warning. The schema inventory itself is repository-owned.
The [released-reader boundary lesson](/nodes/integrations-expert/lessons/package-kernel-floors-need-released-refusal-probes.md)
already owns the general proof discipline. Eliminate assumptions with
regressions against the intended floor and older reader, checking rejection
and actual enforcement separately. For a workspace-key rollout, also assert
resolve/spawn refusal and existing-home start behavior independently, and
check that the published upgrade instruction names an available operator
action. No such cross-version or release-guidance matrix is certified by
this harvest.

**Requires-row refinement, 2026-11-09:** the same reader boundary covers an
additive key on a `requires` row. The source reports, from reading kernel
v0.68.0 and the then-current main, that runtime schema validation covers
only the four declaration files (workspace, membership, soul, local), that
capability manifests are not schema-validated at runtime, and that the
harness-package requirement loop reads named fields only. An unknown key on
a requires row is therefore inert on kernels 0.68.0–0.69.9: it is neither
refused nor acted on. By itself it does not force a `compatibility.oats`
raise; a provider that wants the new behaviour guaranteed raises its own
floor, as the historical rule still requires for behaviour it relies on.
The trap is on the repository side: the oats repository's own validate
step checks the vendored provider mirror manifests against the closed
schema, so a mirror refresh carrying the new key must land **after** the
kernel change that adds the key to the schema, or the repository's CI
fails on a manifest the runtime would have accepted. The runtime leniency
and the repository strictness are different gates; sequence against the
strict one. This is a source read, not a run of any released binary, and
it says nothing about a kernel that later adds a runtime manifest
validator [7]. The repository's validate step already catches a premature
refresh; the lesson is the ordering, not a new check. The decision this
refinement served was
[closed before anything was built](compensating-manifest-fields-are-asked-of-the-provider-first.md).

**A kernel upgrade is separable from a provider floor** (2026-09-19). A
release note that pins a new provider version invites the reading that
upgrading the kernel means adopting that provider. The pin is the pairing the
release was *qualified with*; the provider's floor is a statement about the
provider, not an upper bound on older ones; what a deployment runs is what
its lock pins. Whether the kernel can move alone is decided by every pinned
capability's declared `compatibility.oats` range and by any separately
versioned consumer with its own kernel band (a Desktop client's band usually
bites first). Separating them turns one blocked all-or-nothing migration into
a cheap reversible step plus a deliberate one.

# Upgrade instructions share the compatibility boundary

**A check before an upgrade must run on the version being left** (lesson
reported 2026-10-12–13). When a kernel change turns a previously silent
condition into a refusal, distinguish the operator's before-upgrade check
from the after-upgrade diagnostic. The latter may use the new diagnostic;
the former must use only commands and output available on the supported
releases being left. Run the actual pre-upgrade check on those released
binaries with both affected and unaffected fixtures. Reading the new code,
or merely finding the old output field in source, is not execution evidence.

The source reports that the initial upgrade guidance for the launch-key
refusal pointed at `oats doctor`, although the diagnostic for unmatched keys
was itself part of the change. The released doctor could therefore appear
clean precisely where the upgrade would introduce a refusal. The replacement
kept the new doctor as the after-upgrade step and supplied a before-upgrade
comparison in operator language plus a script using already-released output.
The named note reports running that script against released 0.51.0 and
0.52.0 kernels with matching and non-matching keys [3]. These are
source-reported results, not runs reproduced by this harvest.

The rejected alternatives in this case were a backport release solely to
supply the check, and guidance that required upgrading before the operator
could discover the problem. The former adds an intermediate release to what
should be a check of existing deployments; the latter defeats the purpose
of a before-upgrade check. This is not a general prohibition on backports.

**Elimination route:** keep the concrete published check executable and test
it against the supported outgoing release binaries, asserting both affected
and unaffected outcomes. Such release-documentation regression coverage can
catch the wrong diagnostic or output assumption; this lesson preserves why
the old-release side belongs in that test matrix. It does not claim that an
automated gate has shipped or replace the kernel's own refusal tests.

# Related

[A partial catalog remains an answer in both CLI forms](partial-catalog-remains-an-answer.md)
applies this compatibility boundary to diagnostic visibility: exposing more
problems does not by itself authorize a stream or exit-status migration.

[A refusal that needs the old bytes is a pre-commit gate](../lessons/refusal-belongs-before-commit.md);
[Pre-adoption contracts are removed, not translated](/nodes/oats-maintainer/decisions/clean-contract-precedent.md).

# Current contracts

- [Current packages.md, lock v3](https://github.com/awebai/oats/blob/main/docs/packages.md#lock-v3)
- [Current capabilities.md, manifest](https://github.com/awebai/oats/blob/main/docs/capabilities.md#manifest)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge, agents/dev-coordinator/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (mixed-scope-migration-refuses-whole, replace-unadopted-transitional-formats-in-place, legacy-capability-root-discriminator, guided-official-migration-shape, kernel-upgrade-separable-from-provider-floor, provider-problem-reasons-cross-the-wire).
2. [OATS 0.26.0 release notes](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.26.0.md).
3. The proposal and named note attribute the upgrade-guidance correction to
   [awebai/oats#989](https://github.com/awebai/oats/issues/989), comment
   6133085132, on 2026-10-12, and the released-version runs to 2026-10-13.
   The proposal additionally identifies
   [awebai/oats#1020](https://github.com/awebai/oats/pull/1020) as the review
   context. Maintainer agreement and test outcomes are source-reported; this
   harvest did not independently audit those reviews, release tags or runs.
4. Verified by the knowledge maintainer at review of the harvest on
   2026-10-13. On awebai/oats#989 the release-lane decision of 2026-10-12
   asked for a notes step that ran `oats doctor` before upgrading; the kernel
   lead's specification answered that the 0.52 doctor cannot report these
   keys and proposed a check from output the released kernels already give;
   and comment 6133085132 accepts that correction. The first wording was
   therefore corrected at the specification stage and never reached
   published notes. The accepted wording makes the after-upgrade doctor run
   the upgrade step and offers the before-upgrade check as one sentence in
   the operator's words, with the script after it. awebai/oats#1020 merged
   on 2026-10-13 with both maintainer sides approving the head that merged;
   its release-notes entry carries that wording and names 0.51.0 and 0.52.0
   for the script. The threads record a trial of the script on 0.51.0 and a
   check that the output field has that form at both release tags, the kind
   of evidence this lesson calls insufficient. The 0.52.0 run, the affected
   and unaffected fixtures and both rejected alternatives appear in neither
   thread and rest on the source's note alone, which this review did not
   read.

5. [The 2026-11-03 contract record](https://github.com/awebai/oats/issues/1719#issuecomment-6603147412), read at harvest, reports the 0.69.9 unknown-workspace-key check, the absence of runtime manifest-schema validation, the rejected provider warning and the kernel-first adoption order. It corroborates the source's report, not an independent runtime test or direct human acceptance. The associated [PR #1721](https://github.com/awebai/oats/pull/1721) was open at `3885ca029dcb454b78c3f6a967ccb127259171e8` when checked; no feature release or new upgrade diagnostic is certified here.

6. The [second-reader return](https://github.com/awebai/oats/pull/1721#issuecomment-6603829587), [product-lane delta approval](https://github.com/awebai/oats/pull/1721#issuecomment-6604134267) and [second-reader delta approval](https://github.com/awebai/oats/pull/1721#issuecomment-6604145043), read at harvest on 2026-11-03, corroborate the rejected workspace-floor instruction and the correction excluding ordinary start from the schema-refusal warning. These are agent review records, not direct human acceptance or independent runtime reproduction. PR #1721 is now recorded merged at `0da94ee00bf6e489b6f3f0b858733cceb9d66543`; this updates citation 5's earlier open-status observation, not a release or deployment receipt. The exact fallback exception and 0.69-series limit rest on the captured proposal and note; no implementation code or cross-version probe was audited here.

7. [awebai/oats#1717](https://github.com/awebai/oats/issues/1717), read at
   harvest on 2026-11-09, states under "Existing deployments" that kernels
   0.68.0 to 0.69.9 ignore the key because capability manifests are not
   schema-checked at runtime and the requirements loop reads named fields,
   that no `compatibility.oats` raise is needed, and that the mirror
   refresh must follow the schema change because the repository's validate
   step is strict. It is the proposing instance's own public record and
   corroborates the note's content, not an independent runtime test.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-package-filter, 2026-11-09; notes/requires-rows-not-runtime-validated.md (requires-row refinement only).

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-tasks-slot-payload, 2026-11-03; notes/new-workspace-root-key-fails-loudly-on-old-kernels.md (dated loader-premise qualification, rollout rationale, and later per-deployment gate and ordinary-start refinement).

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-setup, 2026-10-08; notes/forward-tolerant-hook-events.md (partial supersession only).

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/upgrade-check-runs-on-the-released-version.md (upgrade-check refinement only).
