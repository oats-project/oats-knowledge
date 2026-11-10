---
type: Decision
title: Waiting claims may withhold an automated keystroke but never authorize one
description: Kernel wake delivery may defer on waiting claims because uncertainty must cost a late wake rather than an unseen approval, without expiring the message or turning a display summary into an input gate.
about: [system/oats-kernel]
id: dec-fb8025c7cafd
tags: [kernel, wakes, claims, input-safety, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and rationale

The 2026-10-30 wake investigation selected a narrow change to the documented
display-only waiting-claim contract: **a claim may withhold an automated
keystroke, never authorize one**. A scheduled wake pastes text and presses
Enter; at an open dialog, Enter can answer the dialog instead of submitting
the message to the model. The intended failure direction is a late wake,
not an unseen approval.

This applies to the kernel's automated wake delivery. It is not a new gate
on direct `oats session input`, nor a guarantee about a messaging broker's
separate input path. Neither a missing claim nor clearing a claim establishes
that a session is safe to type into. The [coverage limitation](../lessons/dialog-claims-do-not-enumerate-all-dialogs.md)
remains part of this decision.

The rationale applies [observation reuse never authorizes](/nodes/oats-maintainer/decisions/observation-reuse-never-authorizes.md)
without copying its login-cache policy: stale evidence may delay an act,
but cannot create permission for it. It also preserves the structurally
no-input boundary of [report-only prompt recognition](report-only-prompt-recognition-may-use-derived-labels.md).

# Why the hold cannot reuse the display reader

A roster chooses one readable claim, preferring text. The investigation
found that an attention claim with text could hide a permission claim
without text. That is a useful display choice and an unsafe input decision.
The hold must consider **every live claim from every producer**, not only
the displayed summary.

Permission and question claims hold delivery; an unreadable or unknown
reason also holds. Excluding `attention` is valid only under the producer
rule that it never marks a screen an Enter answers. A closed reason enum
without that semantic rule would not protect the exclusion: the rate-limit
case exposed precisely that mistake.

An untrusted partial read is not proof of no claim. There is one important
bounded-read distinction: a retained tail containing the session boundary
can invalidate all earlier claims. Without that proof, a long-lived log
would eventually hold wakes forever merely by exceeding the read bound.
A torn row after the boundary can conceal a current claim and must hold;
a row invalidated by that boundary cannot. Preserve this proof obligation,
not a permanent byte-limit or parser inventory.

# Rejected alternatives and accepted cost

- **Expire and drop the message.** An initial bound ending in a discarded
  wake was withdrawn. Keep the wake pending without expiry and make the
  first-held time and reason inspectable. This is the smaller contract; the
  waiter's parent owns the checkpoint that can notice a stalled wait.
- **End a long hold by sending any key.** This converts deferral into delayed
  approval and defeats the decision, even if the original claim was stale.
- **Expect the held waiter to run its own fallback.** An idle waiter may need
  the very wake being withheld before it can act. Visibility must reach a
  person or another authorized observer; it does not itself authorize
  intervention or claim clearing.
- **Write a kernel claim to expose an unreadable hold on the roster.** That
  creates another lifecycle and clearing obligation. The recorded choice
  accepts that this rare case is visible in the schedule record, and in an
  event if it can be written, rather than inventing another waiting claim.
- **Add a closing event solely to mark release.** The schedule record owns
  current hold state; a second event lifecycle was not selected.

A stale claim can therefore delay a wake indefinitely. That is an explicit
cost, not a reason to add an automatic expiry later. A hold is a reason to
inspect, not proof that its original dialog is still open.

# Enforcement and evidence

Keep the withholding decision at the automated input boundary. Regression
coverage should exercise hidden permission claims, competing producers,
unknown and torn records, boundary-bearing versus boundary-free tails, and
repeated holds without a key or message loss. The enum's producer rule also
needs emitter cases: a screen that accepts Enter cannot be classified as
mere attention. Tests enforce the mechanism; they cannot eliminate
unreported dialogs or the read-to-input race.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-wake-holds-at-dialog, 2026-10-30; notes/a-claim-may-only-withhold-a-keystroke.md; notes/claude-rate-limit-menu-takes-a-wake.md.

The harvest read the [contract issue](https://github.com/awebai/oats/issues/1670),
including [the no-expiry correction](https://github.com/awebai/oats/issues/1670#issuecomment-6526118685)
and [the release-lane all-claims/partial-read conditions](https://github.com/awebai/oats/issues/1670#issuecomment-6526120968).
These are maintainer/agent decisions, not direct human acceptance of each
term. The [implementation PR](https://github.com/awebai/oats/pull/1673) was open
at `78858899d` when read; reported tests and live observations were not rerun.
This records design direction, not released behavior or universal protection.

The earlier [waiter-owned checkpoint decision](/nodes/integrations-expert/decisions/checkpoint-wake-belongs-to-the-waiter.md)
records the then-open prompt hazard, and the [Desktop attention design](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md)
records display-only claims. Their historical wording needs owner review
against this later kernel direction; this harvest does not edit or supersede
those other nodes or change their scheduling and presentation choices.

At maintainer review, `docs/desktop-cli-api.md` on main at `38509beaf` still
said claims are display-only, and the implementation PR was still open at the
same head. The maintainer added a forward pointer to this decision in each of
those two concepts; their rules and their owners' review are unchanged.
