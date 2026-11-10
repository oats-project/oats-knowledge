---
type: Reference
title: What a messaging provider must do to serve a resident through grants — the layer contract behind the served-identity decision
description: The obligations a messaging capability takes on when an instance may act as a durable resident identity through a scoped, expiring grant: lifecycle (mint from custody, verify the team, revoke idempotently, renew from the host), the identity meta key the kernel shows, the boundaries a served instance keeps, and the acceptance an integrator runs.
about: [workstream/provider-integration, workstream/messaging]
id: ref-e0a31275eb58
tags: [reference, integrations, messaging, identity, grants, contract, acceptance]
timestamp: 2026-09-24
---

Written 2026-09-24 by the node's owner as the OATS runtime input to the
messaging project's grant contract, generalised here to what any messaging
provider must satisfy. Provider-specific commands and scopes are the package
expert's facts.

# Lifecycle, on the host

- **Mint from custody, named explicitly.** The spawn hook mints a grant for the
  resident whose custody directory the host-local settings name; it never
  mutates custody state (such as a selected team) to make a spawn work, and it
  passes the intended team explicitly when the tool allows it.
- **Verify what came back.** The minted grant's team must equal the payload's
  team; on mismatch the hook revokes it and fails the spawn with nothing
  kept. The grant's identifier, expiry, scopes and the credential directory
  path go into meta.
- **Fail closed on prerequisites.** If a custody-class service the instance
  will need is not serving, the spawn fails with a typed diagnostic and a
  remedy before anything is minted.
- **Revoke at retire, idempotently, and report the truth**
  ([a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md)).
- **Renew from the host, never from the instance**: a launch hook mints a
  fresh grant into a fresh credential directory, persists the new meta,
  switches the locator for the launched process, and revokes the old grant;
  the kernel persists launch-hook meta so retire revokes the current grant.
  An instance cannot renew itself; on a terminal grant error it reports and
  stops, and the host restarts it.

# What the kernel sees

The provider emits a documented meta key, `identity`, at every event that
changes it: the mode (instance-lifetime or served resident), the alias and
team, the address or none, the resident's name or none, and for a served
resident the grant's identifier, expiry and scopes. The kernel copies it to
the roster and the instance inspection without interpreting it
([the served identity is a messaging-layer fact](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md);
the key's shape is in
[integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md)).

# What the served instance can and cannot do

- Can: everything a normal member does that its scopes allow — mail, chat,
  events, coordination, presence, contacts — through the credential locator
  the launch environment names.
- Cannot: mint, renew or revoke grants; join, leave or switch teams; rotate
  or publish keys; delete identities or workspaces; redelegate. The tool
  refuses these from a credential home, and the provider's brief says so.
- Scopes are a concrete list at mint, narrowable per soul or per spawn; a
  reviewer profile keeps its own liveness (presence) without coordination
  writes.

# Acceptance an integrator runs

On a scratch deployment with a disposable resident, against the real tool:
mint; the credential directory and meta; the launch environment; the roster
showing the served identity; whoami, inbox and a send through the grant, and
a reply received; the wake path into a launched session; retire revoking the
grant with the home removed; a wrong-team mint revoked and rolled back; a
concurrent second instance on the same resident; renewal at restart with the
old grant revoked; expiry mid-session surfaced as a typed error; least-scope
negatives; the no-key-copy check that the instance home never holds the
resident's long-lived keys; and encrypted send and receive through the
custody-attached grant, each path and direction read at the receiver
([a grant is proven per path at the receiver](/nodes/integrations-expert/lessons/a-grant-home-needs-a-custody-reference-for-encrypted-receive.md)).

# Citations

- Migrated from agents/oats-expert/soul/knowledge/inbox @ 26f2caef.
