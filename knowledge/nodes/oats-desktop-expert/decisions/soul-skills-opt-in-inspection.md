---
type: Decision
title: A soul's own skills are an opt-in field of the soul inspection
description: Read a soul's own skills through an opt-in `inspect --soul --skills` field with bounded inline text, gated at the server by the authoritative host's features, and keep its unavailable, empty, failed and malformed answers distinct.
about: [system/oats-desktop]
id: dec-4c9751e72c18
tags: [desktop, souls, skills, inspection, feature-gating, latency, remote]
timestamp: 2026-10-30
---
# Decision and rationale

The source reports agreement on reading a soul's **own** skills, not the skills
its capabilities contribute. This extends the
[soul inspection decision](soul-instructions-own-and-composed.md)'s opt-in
boundary to a new field. It does not change that decision's text or its human
acceptance, and it claims no human acceptance of its own.

Use an opt-in `oats inspect --soul <name> --skills` field, not another reader. The
reported choice carries file text inline under a finite aggregate budget,
listing omitted files rather than pretending their text was read. Only the
page that needs it pays for the content, and a routed soul answers in one
call. Rejected alternatives:

- **Per-file reads:** enlarge the CLI surface and charge a routed round
  trip for each file.
- **A new `souls show` verb:** forks the established soul inspection surface
  and needs separate routing.
- **Desktop reading the soul directory:** cannot read a routed soul's local
  files and recreates the second model rejected by
  [CLI authority](standalone-product-and-cli-authority.md).

The `soul-skills` gate applies at the server boundary, not merely in the
renderer. Local use needs the CLI's declared feature; routed use also needs
`server-probe-features` and the held host roster row's declaration of
`soul-skills`. Otherwise the server drops the flag. A renderer request is
intent, not evidence of support; neither a version guess nor an optimistic
request followed by refusal supplies that evidence.

The view must distinguish unsupported reporting, a known empty list, a
reported listing failure and an unreadable contract. Reject a malformed
skills answer as a whole rather than display a plausible partial inventory;
this does not reject the rest of the soul inspection. Show an explanation
instead of guessing contents. The formal shapes, budget and UI sentences
belong in the current contract and tests, not a second knowledge
specification.

Skill names, descriptions and file contents remain the soul's words, never
Desktop-authored assertions. Apply the existing
[source-attribution decision](source-prose-is-an-attributed-quote.md), with
text or a strict file reader that admits no raw HTML, images or fetched
content. Spawn is the authority for which skills are the soul's own: reuse
its enumeration and pin inspection against its preview in a regression,
rather than maintain another discovery rule in Desktop. This is the
elimination route for inventory drift, not a code-layout map.

# What this decision leaves alone

This concept records the inspection contract, not the page layout. The
[human-accepted decision](soul-instructions-own-and-composed.md) records one
tree with two groups. The proposal would have rewritten that to add a Skills
group, and cited no human acceptance, so that text stands as accepted. The
Desktop has since changed the page again
([awebai/oats#1423](https://github.com/awebai/oats/pull/1423)). Changing the
recorded layout needs an explicit supersession that cites the human's
acceptance.

# Current contracts

- [Current docs/desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md) (`soul-skills`)

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-soul-skills, 2026-10-14.

For the skills extension, the proposal identifies contract agreement in
[awebai/oats#1144](https://github.com/awebai/oats/issues/1144) and reports the
kernel and Desktop changes merged in
[#1178](https://github.com/awebai/oats/pull/1178) and
[#1201](https://github.com/awebai/oats/pull/1201). No backing note was named.
Agreement, implementation and regression results are source-reported, not
independently audited by this harvest; no new human-acceptance receipt is
inferred.

Maintainer check, 2026-10-30: #1144 holds the proposed contract, its rejected
alternatives and the other lane's yes, posted by agents under their humans'
accounts. It relays the need as a human's and accepts no layout. #1178 and
#1201 are merged, and `soul-skills` is in the current contract document.
[awebai/oats#1183](https://github.com/awebai/oats/issues/1183), open at this
check, records one divergence the parity regression states: spawn follows a
symlinked `skills/` and inspection refuses it.
