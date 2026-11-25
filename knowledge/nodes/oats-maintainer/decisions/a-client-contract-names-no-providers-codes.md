---
type: Decision
id: dec-7ca15e8fec0e
title: A client contract over a provider's answer keys on the presence of an error, never on one provider's codes
description: Where a client's decoder admits or refuses part of a capability provider's answer because something went wrong, the rule keys on the presence of an error (`error` non-null), never on a provider's error codes; `error` stays the provider's opaque word, and a client words only the codes it knows. Decided on both sides for the messaging:mail answer (oats#2138); naming oats.aweb's codes was rejected.
about: [workstream/oats-direction]
tags: [contracts, decoder, provider, desktop, mail, coherence]
timestamp: 2026-11-25
---
**Owner: oats-maintainer.** Decided by Pepe's side and Juan's side together on [oats-project/oats#2138](https://github.com/oats-project/oats/issues/2138); the one text of the decision is [comment 7162099672](https://github.com/oats-project/oats/issues/2138#issuecomment-7162099672), and Juan's side agreed to the same opaque text in [7162101344](https://github.com/oats-project/oats/issues/2138#issuecomment-7162101344).

# Decision

When a client's contract admits a shape from a capability provider's answer only because something went wrong (an empty value, a missing part), the condition is the presence of an error (`error` non-null), never a list of one provider's error codes. The provider's `error` stays opaque: the client words the codes it knows and shows any other as given.

The safety that a list of codes seems to give comes from a separate condition: nothing acts on such an entry. A client words it from the fields that stay required (for mail, `team` and `error`), and never addresses, sends from, replies as or matches on the empty values.

First applied to `messaging:mail`: on an `identities[]` entry, `alias` and `identity` may be `""` only where `error` is non-null; with `error: null` an empty one is refused; `team` is never empty; `mailApi` stays 1, because the rule only widens what a reader admits.

# Why

A capability may have more than one provider (another messaging layer, another session provider). A client rule that names one provider's codes ties every later provider to that vocabulary, and the decoder would have to change each time the provider adds a code. The mail decoder already treated `error` as "the provider's word for it, opaque" before this decision.

# Rejected

- **Naming the provider's codes** (`identity-missing`, `identity-unreadable`). This was posted once as Pepe's side's text on the issue and then superseded: it ties other providers to oats.aweb's words.
- **A placeholder value from the provider.** It makes up a value a client could show or match as if it were real. An empty string beside an error that says the identity couldn't be read is the truth.

# See also

- [A detail added to a contract on the provider side must widen every closed client decoder in the same step](/claims/lessons/a-contract-detail-must-widen-closed-client-decoders.md): the other side of a closed decoder.
- [The kernel–provider contract grows by announced features and provider floors](a-provider-contract-grows-by-feature-and-floor.md).

# What is checked and what is reported

Built as [oats-project/oats#2139](https://github.com/oats-project/oats/pull/2139) (merged 2026-11-25): `packages/client/mail-contract.mjs` `identity()`, the rule stated for every messaging provider in `docs/desktop-cli-api.md` ("Mail, `mailApi: 1`"), and tests that admit an error the client doesn't know and refuse an empty value with `error: null`. The provider's half (oats.aweb pinning its shape and documenting the same rule) is the setup lane's, and is not checked here.

Evidence: OKF proposal from oats-maintainer/product-maintainer, 2026-11-25; notes/client-contracts-name-no-provider-codes.md.
