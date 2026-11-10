---
type: Decision
title: Protected launch mode is optional and servers-only, one customer per host unless declared, issuance ends at stop with short proofs and no nonce store, and the issuer runs off the agent hosts
description: Pepe's side's half of the soul launch authority design, decided 2026-11-10 on his delegation, so a protected launch mode is an option for servers with no laptop profile, hosts hold one customer unless sharing is declared, stop and retire end issuance with proofs of 300 s or less and no nonce store, revoke is the owner's call, and the issuer runs off the agent hosts and fails closed; Juan's side's half is still open.
about: [workstream/oats-direction]
id: dec-eb12b8ff073f
tags: [direction, launch, security, servers, contracts, two-sides]
timestamp: 2026-11-10
---
**Owner: oats-maintainer. Update-on-change: whoever learns Juan's side's half
of this design, the entitlement-reference field's shape, or that the launcher
has been built, updates this decision and records the supersession in the
node log.**

# Decision

The source reports that on 2026-11-10 Pepe's lane:product maintainer took
Pepe's side's four choices on the soul launch authority design, on Pepe's
direct answer that day to apply its best judgement on the open questions
([how that delegation is recorded](/nodes/oats-maintainer/stewardship/review-protocol.md#contract-agreement-stays-on-the-issue-through-implementation-2026-10-28)).
The questions come from Juan's side's design, awebai/aweb
`docs/design/soul-launch-authority.md` at `67992a15`, which asks how a
consumer can verify which soul, parent and runtime an agent was launched
under. Juan's side holds the other half of the decision.

1. **Protected launch mode is an option, for servers only.** There is no
   laptop profile. A laptop is the person's own machine; the mode exists to
   protect customer servers.
2. **One customer per host by default.** Sharing a host needs an explicit
   declaration, never an inference from equal entitlements or placement.
3. **Lifecycle ends issuance.** Stop ends issuance and the agent's proofs
   expire within 300 s or less. Retire is stop plus revocation of the team
   certificate and a notice to owners to drop their grants. Revoke is the
   owner's call, immediate at the owner's own fence. There is no nonce
   store: short proof lifetimes bound replay without one more piece of
   state to run.
4. **The issuer runs off the agent hosts**, run by Juan's side, and fails
   closed. Its availability target is set after measuring, not guessed.

# What follows

- The soul's entitlement-reference field is a contract for both sides. Its
  exact shape is decided on its issue before it is built, under the rule
  that [contract agreement stays on the issue](/nodes/oats-maintainer/stewardship/review-protocol.md#contract-agreement-stays-on-the-issue-through-implementation-2026-10-28).
- The launcher that applies the mode is lane:product work on Pepe's side.

# Rejected alternatives

- **A laptop profile**: it would put the mode where it protects nothing,
  since the laptop is already the person's own machine.
- **Shared hosts by default**: co-residency is a customer and data policy,
  so it is declared, not assumed.
- **A nonce store**: another stateful service to run, bought for a replay
  window that short proof lifetimes already bound.
- **An issuer on the agent hosts**: a compromised host would then issue its
  own proofs.

# Limits

This is one side's answer, recorded so that a future maintainer neither
re-asks these four questions nor contradicts them when the launcher or the
entitlement-reference field arrives. It is not the design: the design and
Juan's side's half stay with Juan's side's document, and nothing here
certifies an issuer, a launcher, a proof format or a measured availability
target. The delegation and the four choices are source-reported from the
session; this harvest read the cited design document at the cited revision
and confirmed it raises the protected launch mode, co-residency, lifecycle
and replay, laptop and issuer questions, not that the choices were posted to
or accepted by Juan's side.

# Citations

1. awebai/aweb `docs/design/soul-launch-authority.md` at `67992a15` (read at
   harvest 2026-11-10): the design that poses the questions.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-10; notes/soul-launch-authority-pepe-side-choices.md.
