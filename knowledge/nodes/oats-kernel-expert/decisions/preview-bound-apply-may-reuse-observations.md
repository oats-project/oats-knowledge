---
type: Decision
title: A preview-bound spawn apply may reuse observations
description: Spawn apply may reuse observations only when a valued preview-decision fence binds the result to what was confirmed, rather than granting observation reuse to writers generally.
about: [system/oats-kernel]
id: dec-0cf212c79a7c
tags: [kernel, spawn, preview, observations, cli, decision-fence]
timestamp: 2026-10-15
---
# Decision and rationale

The source reports LFX maintainer acceptance on 2026-10-15 of one exception to
the write-verb refusal of `--max-age`: spawn apply with
`--expect-decision <revision>` may reuse observations [1]. Without that flag,
or with it bare and binding no revision, the refusal remains.

An ordinary writer could persist a stale fact derived from a reused
observation. The [CLI-policy lesson](/nodes/oats-kernel-expert/lessons/per-command-enumerations-drift-from-the-dispatch.md)
records the concrete launch-preference risk: resolving a soul from an old
observation could persist a key the workspace no longer offers. That refusal
and its rationale are not withdrawn.

The preview-bound apply is different because the decision fence compares the
computed resolution with the revision confirmed in the preview. A mismatch
refuses with `E_DECISION_STALE`; reuse may lead to the confirmed decision or
to refusal, not to an unreviewed replacement. The accepted tradeoff is fidelity
to the confirmed decision, not proof that every observation is current. Do not
extend the exception to another writer merely because it has a preview or
shares flags: it needs the corresponding decision-binding argument.

# Contract boundaries worth preserving

Keep admission in the shared `--max-age` rule, not a second per-command flag
table. The reported feature name `spawn-apply-max-age` advertises the narrow
exception. The apply answer gains no `observation` block: Desktop decodes
closed shapes, and feature advertisement suffices to expose flag support.
The live grammar and answer schema belong in the repository's
[CLI contract](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md),
not a duplicate specification here.

This is observation reuse, not permission to reuse the harness-package gate's
answer between preview and apply or to move that gate after effects. The
[probe-cost lesson](/nodes/oats-kernel-expert/lessons/spawn-probe-cost-is-claude-telemetry-flush.md)
owns why those performance alternatives were rejected. Desktop's
[preview-derived deadline decision](/nodes/oats-desktop-expert/decisions/preview-bounded-spawn-outcomes.md)
concerns a different consequence of confirming a preview and remains unchanged.

The enforcement route is the shared admission rule plus regressions for a
valued matching fence, a stale fence, an absent or valueless fence, and other
writers' refusals. Preserve closed answer-shape coverage as well. The durable
knowledge is why this one writer is different, not a replacement for those
executable checks; this harvest does not certify their coverage.

# Refinement and evidence

This explicitly narrows the earlier lesson's account that observation reuse
was read-only and spawn apply observed live. It preserves that historical
account and the general writer refusal; it does not turn read-side flag
borrowing into valid contract design.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-spawn-resolution-speed, 2026-10-15; notes/preview-bound-apply-may-reuse-observations.md.

1. The source identifies decision K1 on
   [awebai/oats#1246](https://github.com/awebai/oats/issues/1246) and reports
   implementation merged in [#1259](https://github.com/awebai/oats/pull/1259).
   Maintainer acceptance and shipment are source-reported, not independently
   audited by this harvest. No separate human acceptance is established.
2. Checked by the knowledge maintainer at review of the harvest on
   2026-10-15. On #1246 the decision on K1 is signed as the LFX maintainer's:
   accepted behind the `spawn-apply-max-age` feature, the decision fence
   unchanged, the client passing `--max-age` only when the feature is
   advertised. This review did not establish it as a human acceptance. The
   merged #1259 (2026-10-15) admits the flag in the shared refusal rule,
   keeps `--max-age` refused on an apply without `--expect-decision` or with
   no value after it, and still refuses it through `--server`; its
   description states that the answer carries no `observation` block. The
   test assertions behind those cases were not read here.
