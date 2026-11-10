---
type: Decision
title: A retired 4.x seat is harvested from its recovery; a host harvest switch is not an opt-out, the soul's is
description: For a retired source only, the knowledge package ignores the removed 4.x harvest keys written by the host, spawn or workspace layer, because they never carried the soul's consent; the opt-out stays the recorded soul.yaml text, which no layer can mask, and a 4.x host harvest-off switch is not a privacy opt-out, since under 5.x the deployment's own act of writing a proposal and spawning a harvester is the consent. Live 4.x homes keep refusing, with the remedy to retire first.
about: [workstream/oats-direction, workstream/knowledge]
id: dec-5fa04fe0ab4f
tags: [knowledge, harvest, authority, consent, privacy, upgrade, okf]
timestamp: 2026-11-06
---
# Decision and acceptance evidence

The source reports that both directing humans' sides decided this on
2026-11-06, on the knowledge package's design for the retired-source
admission. **Not built at the time of the proposal.** The acceptance is
source-reported from the lane records the proposal names; this harvest read
neither them nor a package change.

A seat created under the package's 4.x line keeps the removed `harvest` key
in its record for good, and retiring it puts its notes in a recovery copy
whose record still carries the key. The 5.x harvester refused any removed
key from a non-soul layer, so every retired 4.x seat's notes had no route
to review, and the 5.0 upgrade's respawn route never carried them anywhere.

The decision:

- **Retired sources.** A removed key whose recorded origin is the host, the
  spawn or the workspace is ignored, as the manifest default already was.
  The admission is recorded in the private capture record, never in the PR.
- **Still refused:** a soul-origin removed key; a key with no recorded
  origin; and a soul `harvest:` value other than `off`. The last is a
  fail-closed addition so that a soul "on" masked by a host "off" is never
  admitted by the relaxation.
- **The opt-out is unchanged.** It is read from the recorded soul.yaml
  text, which no layer can mask. The removed-key check only ever protected
  record consistency; it never decided consent.
- **A 4.x host `harvest: off` is not an opt-out.** It declined 4.x's own
  machinery (capture and scheduled runs), which 5.x removed. Under 5.x
  nothing runs until someone in the deployment writes a proposal and spawns
  a harvester, and that act is the consent. In the case that raised the
  question the host switch had been a workaround for a spawn bug, not a
  privacy choice.
- **Live 4.x homes keep refusing**, with the remedy "retire, then propose
  from the recovery". This honours the upgrade nudge both sides had already
  accepted for 5.0.
- **A spawn preview cannot show this refusal**: preview runs no provider
  spawn hook. That is documented; a kernel preview phase for provider hooks
  is a separate, low-priority ask, not part of this decision.

This refines the knowledge package expert's record that
[an opt-out is a narrower control than a publication boundary](/nodes/oats-okf-expert/decisions/personal-data-exclusion-is-not-a-publication-guarantee.md):
the opt-out that counts is the soul's own declaration, and only that. It
keeps the custody line of
[source-independent knowledge custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md):
a recovery copy is source evidence, and reaching review from it still runs
through the same harvester and the same maintainer review.

# Rejected alternatives

- **Re-proposing from a fresh 5.x seat.** Its `Source:` line would name an
  instance that did not do the work, the notes would be copied by hand, and
  it multiplies spawns.
- **One rule for live and retired homes.** Not needed: a live home has the
  retire route, and relaxing it would admit a running 4.x seat the upgrade
  deliberately asked to retire.
- **A pre-check command.** A new command surface, when one rehearsal before
  the batch does the job.

Acceptance rule reported with the decision: the change is called fixed only
after a rehearsal on a real retired 4.x seat, on the released version.

# Rule for review

When a removed setting blocks an upgrade path, ask which check actually
protects the invariant. A rule that "protects" an opt-out it never decided
can be relaxed for the layers that did not decide it, provided the layer
that did decide it (here, the soul) stays fail-closed.

# Evidence

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-06; notes/a-4x-host-harvest-switch-is-not-an-opt-out.md.

# Citations

1. Source-reported decision of 2026-11-06 (design 796161f5, acceptances
   d516584f and 130acd23 in the proposal's words) for
   [oats-okf#125](https://github.com/oats-project/oats-okf/issues/125). Not
   independently verified; the design was reported as not yet built.
