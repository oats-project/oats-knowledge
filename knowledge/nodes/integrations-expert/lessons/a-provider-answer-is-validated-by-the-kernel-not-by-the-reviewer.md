---
type: Lesson
title: A document a provider writes for the kernel passes the kernel's own rule on the provider's stage; a reviewer reading a new key as a feature is how a strict wire breaks
description: Check answers, hook outputs and manifests are kernel-consumed documents; the provider's stage vendors the kernel's validator or shape rule and runs every produced document through it, a new key is a wire question before it is a feature, and manifest keys follow the kernel's grammar (operations are keyed by bare name; the kernel adds the layer).
about: [workstream/provider-integration]
kind: lesson
id: ins-b5a72b169b7d
tags: [integrations, kernel-contract, readiness, manifests, operations, review, testing]
timestamp: 2026-09-25
---

**Observed (2026-09-25), twice in one release.**

- A messaging provider added a teams block to its binding-check answer; the
  reviewer credited it as a readiness feature. The kernel's check decoder
  accepts only `status`, `problems` and `warnings` in `result`, so every
  readiness read of that provider's homes was relayed as unknown ("invalid
  binding data") for two provider releases, until the kernel's
  real-bundled-provider test caught it at mirror time.
- The same release declared its home operations as `messaging:teams`,
  `messaging:join`, `messaging:leave`. The manifest schema's key pattern
  refused them, the kernel answered `E_OPERATION_UNKNOWN` at the address it
  formed, and the Desktop, matching on the bare name, showed them as
  unsupported.

**Rules.**
- For every document a provider writes for the kernel, the provider's stage
  carries a vendored copy of the kernel's validator or shape rule and runs
  every produced document through it; a shape change on either side fails the
  stage, not the mirror.
- Reviewer: a new key in a kernel-consumed document is a wire question first.
  Find the consumer's decoder and confirm it accepts the key before crediting
  the feature. A view the kernel does not consume belongs in its own
  operation (here the provider's `teams` operation), not in the check answer.
- Key operations by their local name; the kernel composes `<layer>:<name>`
  from the manifest's `layer`. Documentation names both forms deliberately:
  the key in the manifest, the address in the CLI and the GUI. Keep a vendored
  schema's key pattern identical to the kernel's (`^[a-z][a-z0-9-]*$`) and
  never loosen it to accept a key that smuggles the layer in.
- The mirror PR's real-bundled-provider tests are the last guard; keep them,
  and treat their failure as a provider defect until proven otherwise.

The wire itself is described in
[capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
and summarised for providers in
[the kernel's provider readiness check wire](/nodes/integrations-expert/references/the-kernels-provider-readiness-check-wire.md).
