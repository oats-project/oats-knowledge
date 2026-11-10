---
type: Decision
title: A souls.disabled entry that names no soul is diagnosed by doctor, never refused, although it fails open
description: A stale host disabled-soul entry is reported only by oats doctor, reusing the launch-pin check's matching rule, per-entry proof boundary and nearest-soul ranking; spawn refusal and the team typo guard were rejected, and the fail-open cost is accepted and documented.
about: [system/oats-kernel]
id: dec-91fbec07c6aa
tags: [kernel, configuration, discovery, diagnostics, doctor, spawn]
timestamp: 2026-11-09
---
# Decision and rationale

A host's `souls.disabled` list keeps named souls off a machine. An entry
that names no offered soul, after a rename or a removed pin, is **reported
only by `oats doctor`**: a `disabled-soul-unmatched` problem row carrying
the nearest offered souls, or a `disabled-soul-unchecked:` information line
when the source that could hold the soul was not read. Spawn, `oats souls`
and readiness do not change [1, 2, 3].

The decision was taken knowing what it leaves: such an entry **fails
open**. The soul it was meant to keep off spawns again, silently, until
someone runs doctor. A stale `souls.launch` key fails closed, because
[a proven unmatched launch pin refuses the fall-through launches](/nodes/oats-kernel-expert/decisions/unmatched-launch-pins-refuse-fallthrough.md).
That asymmetry is deliberate, not an oversight: the cost of failing open is
accepted and handled by documentation, which tells operators to run
`oats doctor` after any soul rename or removal [3, 5]. A future instance that
finds the two lists behaving differently should not "fix" the difference
without reopening this decision.

The check reuses the launch-pin check's discipline rather than adding a
second mechanism [1, 2]:

- **Spawn's exact matching rule.** An entry matches when an offered soul's
  bare name or qualified name equals it; a disabled soul still counts as
  offered. The check never guesses what a non-matching entry meant.
- **A per-entry proof boundary.** An entry absent from the read is reported
  as unmatched only when the source that could hold it was read; otherwise
  it is unchecked and said so. The boundary follows the entry's possible
  source, exactly as for launch pins: a bare or member-qualified entry stays
  unchecked while a member is unconfirmed or a member's or external soul
  failed to read; a package-qualified entry stays unchecked while that
  package is declared but unlocked or one of its souls failed to read; every
  entry is unchecked in the standalone view of an unreadable host.
- **The same nearest-soul ranking**, offered as qualified names because
  each one is a valid entry that names exactly one soul.

The codes are lowercase, like the other doctor rows that refuse nothing: an
`E_` code would read as a refusal [1, 2].

# Rejected alternatives

- **Refusing at spawn while an unmatched entry exists.** This is what the
  launch-pin check does, and it was rejected here. The kernel cannot tell
  which soul a stale disabled entry was meant for, so a refusal would have
  to block every spawn on the machine, including over an entry whose soul
  was simply removed, which is harmless. Refusing only souls whose names
  are near the entry is the typo guess the launch-pin decision already
  rejected. It would also be a new refusal of configuration accepted
  today, which this effort stopped short of [1, 2].
- **Reusing the team-key typo guard** (the existing unknown-team-soul
  warning). It has no proof boundary, so one unconfirmed member would turn
  every bare entry into a false warning. It gives no nearest soul. Team keys
  are always qualified while disabled entries may be bare. And it would put
  a machine-local list into readiness, where it does not belong [1, 2].
- **Adding the row to `oats souls` as well.** Doctor only: the goal named
  doctor, and the `oats souls --json` problems list has readers [1, 2, 3].

**Left open, as a separate decision.** If enforcement is later wanted, the
cheapest form identified is a spawn warning naming the entry when the
spawned soul is one of its nearest suggestions. The lead's options and one
product side's acceptance recorded that this is not part of this decision;
the other side's acceptance does not mention it [1, 2, 3].

# Generality

The pattern applies to any future check of a host-local list of soul names:
diagnose by spawn's own matching rule, with a per-entry proof boundary and
a visible unchecked state, and refuse only when the kernel can tell which
launch is at risk. The launch-pin check refuses because it can bound the
launches that would fall through; the disabled-soul check cannot bound
anything, so it diagnoses.

# Related

[Proven unmatched launch pins refuse fall-through; unchecked pins stay visible](/nodes/oats-kernel-expert/decisions/unmatched-launch-pins-refuse-fallthrough.md)
owns the proof boundary this check applies and the refusal it does not
copy; this decision confirms and applies it without superseding it.
[A local schedule's soul check reuses spawn](/nodes/oats-kernel-expert/decisions/local-schedule-soul-check-reuses-spawn.md)
is the other case of checking soul names through spawn's own rule rather
than a second resolver.
[The host supplies host-only facts](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)
owns where `souls.disabled` lives, not this diagnostic policy.
[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
owns typed refusals and tested remedies. The repository's
[configuration documentation](https://github.com/oats-project/oats/blob/main/docs/configuration.md)
owns the current row shape, information prefix and remedy text; the
documentation wins where they differ.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-stale-disabled-soul,
2026-11-09; notes/stale-disabled-entry-diagnosed-not-refused.md.

1. The lead's options comment on
   [oats-project/oats#1772, comment 6752681350](https://github.com/oats-project/oats/issues/1772#issuecomment-6752681350),
   2026-11-09, gives the three options, the recommendation, the matching
   rule, the proof boundary by entry source, the lowercase-code reason, the
   doctor-only choice and the deferred spawn warning. Read by the
   harvester; it says what is recorded here.
2. One product side's acceptance of option A, with the codes and
   doctor-only, is on
   [comment 6752696226](https://github.com/oats-project/oats/issues/1772#issuecomment-6752696226),
   2026-11-09, and names the spawn warning as a separate decision. The
   record presents itself as an agent relaying its side; the harvester read
   it at the link. Acceptance is **source-reported (relay)**, not verified
   human acceptance.
3. The other product side's acceptance of option A is on
   [comment 6752700850](https://github.com/oats-project/oats/issues/1772#issuecomment-6752700850),
   2026-11-09. It adds the fail-open point and asks that the configuration
   documentation and the pin-removal steps tell operators to run doctor
   after any rename or removal. Also an agent relay, read at the link:
   **source-reported (relay)**.
4. The source identifies
   [oats-project/oats#1776](https://github.com/oats-project/oats/pull/1776)
   at `6ca2f649a4c67a61ab78a09a8a5d5b41f1fed1f8` as the implementation, open
   and CI-green at proposal time; the harvester confirmed it open at that
   head on 2026-11-09. This harvest did not inspect the implementation or
   run its tests, and certifies no merge, release, deployment or human
   acceptance. No existing decision is superseded.
5. Checked by the knowledge maintainer at review on 2026-11-09: the three
   comments of citations 1 to 3 exist on oats-project/oats#1772 and say what
   is recorded here; the two acceptances were posted from two different
   maintainer accounts and remain **source-reported (relay)**. Pull request
   #1776 was open and unmerged at the cited head, and its
   `docs/configuration.md` change states that a stale entry fails open and
   tells operators to run `oats doctor` after any rename or removal. That
   documentation reaches the repository's main branch only if #1776 merges;
   no implementation audit, test run or release is certified.
