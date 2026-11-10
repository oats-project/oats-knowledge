---
type: Decision
title: Kernel supplies provider-neutral messaging inputs; the capability owns identity, membership, transport and qualification
description: The kernel selects the messaging slot, copies the module, runs its hooks with the merged payload and the soul's teams in the environment, and relays its readiness answer; the selected capability resolves identities, joins teams, delivers and reports, and that state never becomes an OATS user database.
about: [system/oats-kernel, workstream/messaging]
id: dec-98797dfccd59
tags: [kernel, messaging, capabilities, contract, qualification]
timestamp: 2026-09-16
---
# Rationale

Decided 2026-09-16 by the redesign lead; the boundary survived the removal of
the captured path unchanged in substance. It refines the
[kernel/capability split](kernel-and-capability-responsibility.md) for the
messaging slot and complements the
[runtime/messaging/viewer ownership decision](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md).

**Kernel responsibility.** Select the slot's provider, copy it into the home,
and give its hooks, commands and readiness check generic inputs: the merged
provider payload with per-leaf origins, the instance and soul identity, the
workspace, and the soul's teams in the environment. Version any missing
*generic* input explicitly rather than invent a provider-specific one. Retain
non-secret choices and credential *references* only, never credential values,
and never claim that mutable membership or access is frozen. The kernel never
joins a team itself; a declared team is not proof of enrolment.

**Capability responsibility.** Resolve native human and agent identities with
native credential facilities; provision or reuse teams and reconcile
membership; provide transport and wake delivery; report provider-specific
receipts and readiness. These mechanisms and any mapping state belong to the
capability and must not become an OATS user database or hosted control plane.
Read-only checks never provision; explicit setup or lifecycle actions may,
when their own preconditions admit them, and admission to setup is not a claim
of completed enrolment. Readiness is established separately afterwards.

# Rejected

- Embedding the provider's account, team or API logic in the kernel.
- A parallel OATS messaging subsystem.
- A unified permissions API: catalog visibility, live-instance visibility,
  contact and history are separate grants that need not share one native API.
  Verify the actual mechanism for each; contact is not permission to read
  history.

# Qualification discipline

- A missing field in one CLI response is not proof of a missing backend
  capability; investigate the adapter's supported resolution and APIs first
  and escalate only a concrete unavoidable gap.
- Never substitute an OS user, an agent alias or a guessed identity; the
  responsible human's identity is never inferred.
- Fixture or configuration success is never a privacy claim.
- Being authenticated to a harness establishes nothing about a messaging
  principal ([native authentication](harness-native-authentication.md)).
- **A source defect can wear a configuration error** (2026-09-20). When a
  provider requires a declaration the workspace or soul never published, no
  operator input can make the slot ready. When a maintainer predicts a
  readiness failure and the run stops earlier, in the provider's reading of
  the declaration, stop adding operator inputs and read what the source must
  declare; report it as a source defect with the exact predicate that failed.

# Related

[Keep kernel responsibilities generic and capability runtimes complete](kernel-and-capability-responsibility.md);
[The CLI as a machine boundary](../lessons/machine-boundary-contract.md).

# Current contracts

- [Current layers.md, the communication contract](https://github.com/awebai/oats/blob/main/docs/layers.md#the-communication-contract)
- [Current capabilities.md, readiness check](https://github.com/awebai/oats/blob/main/docs/capabilities.md#readiness-check-bindingcheck)
- [Knowledge and messaging capability contract](https://github.com/awebai/oats/blob/main/docs/design/2026-09-16-knowledge-capability-contract.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (messaging-capability-contract-boundary, source-declaration-requirement-without-payload).
2. [Messaging capability contract boundary (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-16-messaging-capability-contract.md).
