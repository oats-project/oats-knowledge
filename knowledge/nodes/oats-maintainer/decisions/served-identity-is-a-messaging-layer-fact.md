---
type: Decision
title: The served identity is a messaging-layer fact the kernel binds and shows, never kernel vocabulary
description: A per-spawn choice between an instance-lifetime messaging identity and serving a durable resident through a grant travels through the existing provider payload with no new spawn flags; the kernel binds every provider fact in the spawn decision and shows the served principal on the roster, while the messaging capability owns every identity rule.
about: [workstream/oats-direction, system/oats-desktop, workstream/messaging]
id: dec-ae8d8a31d188
tags: [identity, messaging, provider-payload, spawn, kernel-boundary, desktop]
timestamp: 2026-09-24
---
# Decision

Proposed 2026-09-23 by the redesign lead in answer to a request from the OSS
coordinator, and **accepted 2026-09-24** by the lead under the human's
delegated release and decision authority. The request: every instance
creation should offer a messaging-identity choice — **local**, an
instance-lifetime identity with no durable address, minted at spawn and gone
at retire (the default); or **global**, where the instance *serves* a durable
resident identity that already exists, through a time- and scope-bounded
grant, so its mail and chat carry the resident's address.

The messaging capability had already recorded that "global at spawn" must
mean *serve a resident through a grant*, never *mint a new global identity
per instance*. That reading is adopted: the kernel never learns what a grant
is. It refines the kernel/capability split for messaging
([kernel supplies provider-neutral intent; the capability owns identity](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md))
and follows from the earlier ownership decision that the messaging capability,
not the kernel, owns identity
([runtime, messaging and viewers have separate owners](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)).

# Options considered

1. **Kernel spawn flags for identity and resident**, sugar over the provider
   payload plus an identity field in the bound spawn decision. Clear UX, but it
   puts a messaging-layer vocabulary on the kernel's forever-surface and every
   future messaging provider inherits it whether or not it has residents.
2. **No new flags; bind the payload.** The choice is expressed through the
   existing repeatable per-capability provider payload. The kernel binds the
   merged per-module payloads a spawn actually applied into the spawn decision,
   so a confirmed apply covers *every* provider fact, identity included, and
   the roster and inspection copy a documented messaging-layer meta key through
   without interpreting it.
3. **Desktop-only choice, kernel unchanged.** The Desktop forwards provider
   pairs; nothing binds them in the decision and nothing shows the served
   identity afterwards — the roster stays blind to who an instance acts as.

# Accepted: option 2

The vocabulary placement is the decision. "Identity", "resident" and "grant"
are words of the messaging layer; the kernel gains only provider-neutral
seams and never a CLI grammar for them.

- **No identity or resident spawn flags.** The Desktop shows an *Identity*
  select and a *Resident* field, prefilled from the spawn preview, and forwards
  them as provider pairs; its argument allowlist gains one generic provider
  rule, not identity-named rules.
- **The roster shows the served principal.** Status and inspection copy a
  documented messaging-layer meta key, `identity`, emitted by whichever
  capability is bound to the messaging layer, rendered as "acts as *address*
  via grant, expires *t*" or "alias *a* on *team*". Its shape is a
  messaging-layer contract in the integrations guide, so any messaging provider
  may emit it. This is "the principal this instance serves" — distinct from
  the soul, and compatible with a later definition-level design of principal
  references, delegations and assignments, which remains a separate decision.
- **The provider owns every identity rule**: resolving a resident, refusing a
  global mode without one, revoking a grant whose team differs from the
  payload's and failing the spawn with nothing kept, revoking and
  deregistering at retire, and reporting a failed revoke as a failure with the
  TTL note.

The kernel side is three provider-neutral seams (recorded in the kernel node
and the repository): the bound spawn decision carries the merged
per-module provider payloads exactly as the hook received them; launch-hook
meta is persisted, so retire revokes the grant that is actually live; and a
manifest may mark a settings key **host-only**, admitted only from the
host-local file ([the host-only rule](/nodes/integrations-expert/lessons/a-merged-provider-payload-cannot-enforce-host-only-keys.md)). No CLI grammar
grows, and a confirmed Desktop apply now binds every provider fact.

# Status

Shipped: the kernel half in 0.25.5–0.25.6, advertised to the Desktop as the
`served-identity` **feature** rather than a version number; the Desktop's
identity choice forwards provider pairs. Which version of the messaging
capability honours which part is that package expert's fact, not this
record's.

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/served-identity-is-a-messaging-layer-fact`, 2026-09-23, accepted 2026-09-24).
2. [integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md) (messaging-layer `identity` meta key, `hostOnly` settings) and [desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md) (`served-identity` feature) in awebai/oats.
