---
type: Lesson
title: A detail added to a contract on the provider side must widen every closed client decoder in the same step
description: The Desktop's mail decoder refuses a whole answer with an unknown key, so the provider's "additive" field (identities[].unreadableConversations) would have hidden all mail; a contract detail is additive only to a lenient reader.
id: ins-3672a4d3d397
about: [workstream/provider-integration, system/oats-desktop]
kind: lesson
tags: [contract, decoder, provider, desktop, mail, compatibility]
timestamp: 2026-11-20
---

# What happened

While building the mail read ahead of its contract decision, details were filled within the contract on
the provider side (oats.aweb's `messaging:mail`): new optional fields and new error codes. The Desktop's
mail sheet decodes the answer with a closed shape on purpose, so an untrusted provider can't smuggle in
fields. A review round found that the provider's new field would make the sheet refuse every answer.

# The lesson

"Additive" depends on the reader. When a contract gains any field or code, check every consumer's
decoder in the same change (closed shapes, allowlists of error codes such as the client's own-code
list), and pin it with a fixture from the provider's real answer. Redact real home paths from captured
answers first: the repository refuses them in fixtures.

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-20; awebai/oats-aweb PR 299; oats-project/oats PRs 1999 and 2000; notes/contract-details-widen-closed-decoders.md.
