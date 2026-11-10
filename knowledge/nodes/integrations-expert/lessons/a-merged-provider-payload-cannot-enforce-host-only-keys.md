---
type: Lesson
title: Host-only settings are declared in the manifest and refused by the resolver, never enforced by the provider
description: A setting that must come only from the host (a custody directory, a minting root) is declared hostOnly in the capability manifest so the resolver, which still sees the layers, refuses it from every committed file and spawn flag; the provider's hook receives one merged payload and is the wrong place to police provenance.
about: [workstream/provider-integration]
kind: lesson
id: ins-2d787c59b183
tags: [lesson, integrations, settings, provenance, security, manifest, resolver, host-only]
timestamp: 2026-09-24
---

Learned 2026-09-24 while specifying a messaging provider whose resident-to-custody
map must never come from a committed file. This is the node's one home for the
host-only rule; other concepts link here instead of restating it.

# Rule

- A provider's settings reach its hook as **one merged payload**, layered
  from manifest defaults through the workspace, soul, host-local file and
  spawn flags. The hook reads its keys from that payload.
- A setting that is a **fact about the machine** (a custody directory, a
  minting root, a socket) is declared `hostOnly: true` on its manifest
  `settings` entry. The resolver then accepts it only from the deployment's
  `oats-local.yaml` `settings.<capability>` and refuses it in a committed
  workspace or soul file or a `--provider` flag (`E_WORKSPACE_SCHEMA`, reason
  `host-only-key`; see
  [capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)).
- The provider does not re-implement the check. `OATS_SETTINGS_ORIGINS` now
  tells a hook which layer set each leaf, which is useful for diagnostics and
  remedies, but refusal belongs where the layers are resolved: before any
  spawn, preview or readiness read has used the value.
- Declare hostOnly for every key whose value points at something a committed
  file must never be able to choose, and verify it with a resolver test that a
  workspace-file value is refused.

# Why

A committed workspace file that can point a spawn at a custody directory on
someone's machine is a way to make a spawn serve an identity it was never
meant to serve. Only the component that sees the layers can refuse it for
every consumer at once; the kernel already had the mechanism for reserved
keys, and extending it to a capability-declared attribute keeps the kernel
ignorant of what the key means.

# Consequences

- The messaging provider declares its minting roots and resident custody map
  hostOnly; operators place such keys in the host-local file only
  ([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)).
- The kernel's side of the rule (the host-only item of the served-identity
  decision) is
  [the served identity is a messaging-layer fact](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md).

# Citations

- Migrated from agents/oats-expert/soul/knowledge/inbox @ 26f2caef.
