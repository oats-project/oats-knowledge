---
type: Lesson
title: A plan that crosses into another project's contracts is read by the seat that owns those contracts before its security or migration steps count as designed, and a risk is named only against a stated trust boundary
description: In one cross-project plan, six steps that looked safe from the OATS side were wrong against aweb's contracts and were caught only by the seat that owns them, after two other reviewers had passed the same text; so the lead sends such a draft to the contract owner's seat first, asks it pointed questions about each assumption, treats "reviewed the parts about us" as no review of the rest, and asks the person for the product's trust boundary before calling shared authority a gap.
about: [workstream/coordination, workstream/messaging]
kind: lesson
tags: [cross-project, planning, review, contracts, identity, migration, aweb, assumptions]
timestamp: 2026-11-25
---
# What happened

A lead planned merging OATS into aweb. Its first draft was read by a maintainer
of the OATS contracts and by the seat that speaks for the hosted service. Each
read the parts about its own area and returned corrections. Neither owned
aweb's identity and client contracts, and both let these six steps through.
The seat that owns those contracts then overturned every one.

1. **"An agent running as the person's operating-system user cannot sign as the
   person."** False as a security guarantee. The keychain item is an encrypted
   backup behind a passphrase, the signer can hold the unlocked key across
   signatures, and the terminal checks only stop accidents. A person's yes that
   carries authority needs evidence for the exact act from an authenticator the
   person enrolled. A test on the person's own machine cannot establish the
   boundary.
2. **"Map each record's alias to the identity that held it."** A match against a
   current or archived alias, even a unique one, proves nothing about who held
   it when the record was written. A migration carries recorded identities,
   original aliases and unknown authors separately, and derives nothing.
3. **"After cutover, redirect old client calls, or refuse them with the upgrade
   step."** The client signs the audience, path, method and body, so a redirect
   changes what was signed, and an upgrade-only refusal breaks a released
   operation.
4. **"The automation's host has an identity chain ending at that person, so it
   acts for them."** An owning human is attribution. Acting for a person needs
   its own delegation contract; parsing a field grants nothing.
5. **"Every identity act is authorized by exactly one authority."** Each
   credential proves one fact, and one operation can need several: the parent's
   signature, the child's own proof, the namespace's authorization and the
   team's.
6. **"Team membership alone authorizes nothing sensitive."** False. A current
   team certificate with proof of its key already authorizes team-scoped
   coordination, satisfies the membership condition of a common inbound
   delivery policy, and gives access to the apps the team subscribes to.

# The opposite mistake, made the same day

Having learned what membership authorizes, the lead told its person twice that
a team controller key readable by worker agents on their host was "a present
custody gap". The person corrected it: the scope of trust is the server where
the agents run, so agents sharing a machine already share that authority by
design, and one creating an identity for another there adds no risk. The
contract owner's seat had said, correctly, what the key authorizes. Neither it
nor the lead had asked which boundary that authority is meant to be shared
within. That question belongs to the person who owns the product.

# What the lead does

- Before writing a security or migration step that rests on another project's
  contract, name the seat that owns that contract and ask it, with references
  requested, whether the assumption holds. Ask the assumption as a plain
  question ("can a process of the same user produce this signature today?"),
  not as a design to approve.
- Send the draft to that seat before the draft goes to the person as anything
  but a draft, and say so in the draft's review state.
- Read "I reviewed the sections that cite me" as exactly that. It is no review
  of the sections that cite someone else.
- When the owner's seat overturns a statement already given to the person, tell
  the person which statement was wrong, in the next report, before anything
  else.
- Record each of the owner's corrections with its authority beside the text it
  changed, so a later reader can tell the seat's reading from the lead's.
- Before calling anything a risk or a gap, state the product's trust boundary
  and who set it. A seat can say what a credential authorizes; whether sharing
  it inside a boundary is a defect is the person's call. Report "this key
  authorizes X and these processes can read it", and ask, instead of reporting
  a gap.

# Limits

One effort, one day, planning only: nothing was built or run, and the
contract-owning seat's findings were source readings against pinned commits,
not exercised journeys. The six cases are specific to aweb's identity, team and
client contracts as of that reading.

# Citations

Evidence: OKF proposal from oats-expert/oats-integration-coordinator,
2026-11-25; notes/protocol-seat-return-2026-11-25.md and
notes/protocol-seat-identity-flows-2026-11-25.md.
