---
type: Lesson
title: Configure against what the installed provider reads, not the grammar the kernel accepts or previews — and keep declared intent the provider does not yet honour
description: A setting has effect only if the installed provider's reader consumes it; the kernel's payload model and spawn preview are a writer's view that can carry no-op keys. Verify by observing provider behaviour, let the provider's own declared settings outrank guide text, and keep declared per-team intent in the workspace file while obtaining the effect by placement.
about: [workstream/operations]
kind: lesson
id: ins-9263823143cc
tags: [lesson, operator, provider, settings, versions, verification, workspace]
timestamp: 2026-09-23
---

Judgement formed 2026-09-23 by the OSS coordinator while correcting a rebuild
guide from intended grammar to what the shipped provider versions read.

# Rule

The authority for what a setting *does* is the reader inside the installed
provider — not the kernel that composes the payload, not the spawn preview
that displays it, and not the guide that describes it. Before relying on a
key, confirm that the provider version the deployment actually locks consumes
it. When guide text and the provider's own declared settings (its manifest)
disagree, the provider's declaration wins.

# Why

A deployment is assembled from independently versioned parts: a kernel and
the packages the workspace pins. The kernel merges a payload, forwards it
opaquely, prints it in the preview and records it in `instance.json` — and
the provider may still ignore a key, refuse it as undeclared, or read its
settings from a file of its own that the payload never touches. Three shapes
appeared in one rebuild round:

- A per-team block was kernel-merged, delivered and previewed, and the
  installed messaging provider did not read the key at all — it decided the
  team by which root it found on disk.
- A knowledge payload grammar shown in the guide was consumed by no shipped
  provider; the provider read its declaration from a file beside the soul and
  refused every unknown payload key.
- A guide claim about kernel behaviour shipped with no consumer of the field
  it described — schema validation of examples does not check that anything
  reads them.

The preview is honest about what the kernel *sent*; it cannot know what the
provider *reads*. Guides are written toward the intended grammar and can run
ahead of shipped providers for a release or more.

# What goes wrong

An operator who configures from the preview believes a setting is in force
because it appears in the merged payload, while the provider does something
else: an instance mints into the wrong team, a soul registers against a
default the operator thought overridden, or a spawn hook refuses the instance
for a key the guide told them to write. Refusal, where it exists, belongs to
the provider and arrives only at spawn. The mirror failure: trusting a guide
over the provider's declared settings and "fixing" a working deployment toward
a grammar nothing reads.

# Consequences

- **Check the pair, not the part.** Confirm the locked provider's declared
  settings before writing a key; treat the preview as evidence of delivery,
  never of effect.
- **Verify by behaviour.** After a spawn, look at what the provider did —
  which team it joined, which owner it recorded, which state root it wrote —
  not at what the payload said. This is what an acceptance run on a fresh rig
  exercises ([second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md)).
- **Keep declared intent that the provider does not yet honour.** Where the
  kernel delivers a per-team intent the installed provider ignores, leave the
  declared block in the workspace file: it documents intent and the next
  provider release picks it up without a workspace edit. Obtain the effect
  meanwhile through placement — see
  [messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md).
- **Do not invent keys.** A provider that refuses undeclared keys is doing you
  a favour; one that ignores them is not; neither produces the effect.
- Where a setting belongs is the second half:
  [place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).

For an upgrade's related but distinct sequencing judgment, see
[check the target provider's host requirements before sync](/nodes/oats-operator-expert/lessons/check-target-provider-host-requirements-before-sync.md):
current-lock checks do not establish that the host satisfies the next
provider's tool requirements.

# Routed

- Which keys a provider version honours → that package's expert. Rehearsing a
  kernel-plus-provider pair before a release → the integrations node. Why the
  kernel forwards payloads opaquely → the kernel node.

# Citations

- [workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md)
  (a slot payload may carry only the settings the provider's manifest
  declares; the provider refuses any other key).
- Rebuild round on kernel 0.25.5 with oats.okf 2.1.4 and oats.aweb 1.12.0,
  2026-09-23/24; original guide text in
  [`docs/rebuild-to-v2.md` at v0.25.9](https://github.com/awebai/oats/blob/v0.25.9/docs/rebuild-to-v2.md)
  §4 and §8b.
