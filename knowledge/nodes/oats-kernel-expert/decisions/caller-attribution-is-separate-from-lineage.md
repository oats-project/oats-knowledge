---
type: Decision
title: Caller attribution is separate from explicit lineage
description: Ambient instance context may inform descriptive caller attribution because it gates no authority, while lineage still requires explicit intent.
about: [system/oats-kernel]
id: dec-87f4e384619e
tags: [kernel, spawn, attribution, lineage, trust, rejected-alternatives]
timestamp: 2026-10-18
---
# Decision and rationale

The maintainer decision published in [awebai/oats#1371](https://github.com/awebai/oats/issues/1371)
on 2026-10-18 separates two questions: who appears to have invoked a spawn,
and how the resulting instance should relate to others. Requested topology
cannot establish the actor. Inferring origin from a child or attached relation
misattributes a person's explicit relationship choice to an instance; it also
labels an instance's unrelated spawn as operator-origin. That relation-derived
classifier was rejected for answering the wrong question.

The chosen trade permits valid same-deployment instance context to inform
`spawnOrigin`, solely as descriptive attribution. A human shell inheriting
that context is consequently labelled instance-origin. The two published
maintainer verdicts for [PR #1372](https://github.com/awebai/oats/pull/1372)
accept that ambiguity because the field is informational and gates no
authority. They do not claim to authenticate the human or agent at the
keyboard. No caller-selectable origin flag was introduced: a chosen label
would not establish who invoked the action either.

# Why this does not relax explicit lineage

[Bounded live lineage](bounded-live-lineage.md) rejects ambient context as an
implicit parent source precisely because a human shell can inherit an alive
instance's context. That remains the reason to require explicit relationship
intent. The same uncertainty is tolerable in a descriptive label and
intolerable as an automatic edge or authorization proof. Do not remove the
attribution classifier as a contradiction of the lineage decision, or reuse
its answer as a lineage or permission oracle.

Invalid or inconsistent caller context falls back to operator attribution.
It must not manufacture an edge or refuse an otherwise valid spawn: a
best-effort label must not become an admission gate. Explicit lineage,
attached ownership and the child-spawn policy retain their own contracts.

# Limits that future changes must preserve

- **History keeps its recorded meaning.** Reclassifying old origins from
  current lineage would substitute today's graph for the evidence and
  semantics recorded at creation. The new attribution meaning applies to new
  homes; existing recorded values remain historical facts.
- **Remote readers relay host attribution.** Reading a remote row does not
  authenticate or forward the initiating caller's identity to that host.
  The decision adds no remote identity-forwarding promise.
- **Execution context need not identify the outer initiator.** Hooks and
  operations receive the target home's instance context. A future capability
  spawning there would inherit that attribution even when a human initiated
  the outer action. Preserve this limit when extending those flows; do not
  infer the outer actor from the descriptive label. The review raises this
  as a future case, not evidence that a capability already spawns there.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-upgrade-fixes, 2026-10-18. No backing notes were named.

1. [Maintainer decision, awebai/oats#1371](https://github.com/awebai/oats/issues/1371), published 2026-10-18, supplies the motivating misattribution, attribution-only scope and rejected relation-derived origin.
2. [First maintainer verdict](https://github.com/awebai/oats/pull/1372#issuecomment-6246630975) and [second maintainer verdict](https://github.com/awebai/oats/pull/1372#issuecomment-6246648809), both published 2026-10-18, accept the inherited-shell cost and distinguish attribution from explicit lineage and policy. The second records the hook/operation context limit. These are maintainer verdicts; no separate human-acceptance receipt is inferred.
3. [PR #1372](https://github.com/awebai/oats/pull/1372) is recorded merged on 2026-10-18 as `cae03461541f358254feae518840e49ff3163f74`. The harvest checked the issue, both verdicts and merge metadata, but did not audit the implementation or rerun its tests. This decision refines the earlier attribution wording without superseding the human-accepted explicit-only lineage decision.

# Current contracts

- [Current spawn-origin contract](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md#spawn-origin)
- [Current spawning and coordinating contract](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md#spawning-and-coordinating-with-other-agents)
