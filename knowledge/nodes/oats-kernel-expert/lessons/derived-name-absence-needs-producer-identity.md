---
type: Lesson
title: A derived name's absence proves nothing unless it is the producer's name
description: Lost-receipt recovery must establish the producer's actual instance-name derivation before freeing a schedule slot, because a lookup under another spelling can miss a live run.
about: [system/oats-kernel]
kind: lesson
id: ins-007f312b995b
tags: [kernel, schedules, recovery, identity, custody, testing]
timestamp: 2026-11-03
---
# Finding

The source's 2026-11-03 schedule review found a false-absence proof in
lost-receipt recovery. Reconcile looked for a home using a name derived
from the job's agent string. Finding none was treated as evidence that the
spawn had launched nothing, allowing the attempt to be marked failed and
the slot freed. But spawn derives the run name from the resolved soul's
stem; package-qualified and member-qualified inputs need not produce the
same spelling as concatenating the original agent string.

The reported repro therefore allowed a real home to exist under spawn's
name while recovery searched a different name. Freeing the slot could
admit an overlapping run. The proposal reports a review repro and tests,
not an observed production overlap. Widening local schedule acceptance
exposed this assumption; the note reports that workspace jobs naming
package souls were already susceptible.

The lasting finding is not the current naming formula. It is that an
absence query can succeed at the wrong identity and still be useless as
proof. Unlike a read error, this mistake can look like a clean negative
answer.

# Recovery choice and rejected shortcut

Establish that the lookup names the producer's intended instance before
using absence to release custody. If that derivation cannot be established,
retain the attempt and slot and answer unknown. The source chose explicit
operator clearing for that unresolved case rather than silently recording
launch failure. An override transfers unresolved responsibility; it is not
proof that no run exists.

**Adopting any home with the same purpose/minute suffix was rejected.**
That widens the match beyond the intended soul and trades a false absence
for possible adoption of unrelated work. A convenient suffix does not
supply the missing producer identity.

The existing [recovery-authority decision](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md)
owns retention under uncertainty. This lesson adds the wrong-name negative
lookup, not a second generic cleanup policy. It is also distinct from
[missing endpoint evidence](/nodes/oats-kernel-expert/lessons/missing-tmux-socket-does-not-prove-server-exit.md):
here the lookup may be healthy but addressed to an identity the producer
never used.

# Eliminate the proof mismatch

Keep producer and recovery on one authoritative naming/identity derivation,
or retain unknown where equivalence cannot be proved. Regression coverage
should lose the spawn receipt while leaving the produced home alive, then
exercise recovery with the supported qualified and unqualified name forms.
It must not free a slot merely because a different derived spelling is
absent, and must not adopt a different soul's home with a matching suffix.
The source points to the repair and tests in the implementation PR below;
this harvest did not verify coverage or create a new naming contract.

The general method for reviewing widened inputs already lives in
[enumerating the guarantees a lifted refusal held up](/nodes/oats-expert/lessons/enumerate-what-a-removed-behaviour-held-up.md).
Apply it to every consumer of the accepted soul name, not only the add-time
validator. The associated
[schedule save-check decision](/nodes/oats-kernel-expert/decisions/local-schedule-soul-check-reuses-spawn.md)
owns why the input set was widened without replacing spawn's resolver.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-local-schedule-soul,
2026-11-03; notes/derived-name-absence-is-not-proof.md;
notes/local-schedule-save-check-and-reconcile.md.

The source attributes the hazard to a reviewer's real-CLI repro and tests
and identifies [awebai/oats#1715](https://github.com/awebai/oats/pull/1715)
at `d2b3f093c0c937ffcc3ad552876a42e0830e4430` as the repair, open at
proposal time. Those findings and the reported repair remain source-reported;
this harvest did not read an uncaptured repro script, inspect the
implementation or rerun it. No production incident, human acceptance,
merged fix or complete recovery guarantee is asserted.
