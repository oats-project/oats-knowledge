---
type: Decision
title: Background is presentation, not identity or lifecycle
description: Background is an instance-owned presentation choice with a soul default, not identity or lifecycle policy; ancestor-based client placement avoids inherited state and a separate presentation record survives restarts.
about: [workstream/oats-direction]
id: dec-baa2c00637e1
tags: [clients, presentation, lifecycle, configuration, rejected-alternatives]
timestamp: 2026-10-27
---
# Decision and rationale

The 2026-10-27 direction keeps **background** strictly about where clients
list an instance. A background instance still spawns, starts, attaches,
messages and retires like any other. Placement must not become an identity,
policy or lifecycle distinction.

The selected shape is a soul default with a per-spawn override, recorded in
a kernel-owned presentation file with the home and changeable later through
a CLI operation. Reuse the agreed colour feature's presentation-state shape
rather than invent a new kind of state; the
[presentation coherence ruling](/nodes/oats-maintainer/stewardship/presentation-features-reuse-one-contract.md)
owns that comparison. Keep it outside `instance.json`:
the source reports that start and restart rewrite that record, whereas a
presentation choice must survive those operations. Exact key, filename and
command spellings belong to the implementation contract, not this decision.

There is **no workspace or host default and no inheritance at spawn**.
Each instance retains its own value. A background ancestor's subtree follows
that ancestor's placement in the client; this is a projection of ancestry,
not a copy of the parent's value into each child. Future maintainers must not
solve a placement requirement by introducing inherited state.

This applies the [separate runtime, messaging and viewer ownership](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
without changing those owners. It is not permission for arbitrary UI layouts
in soul definitions: the [threaded-interaction decision](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md#coherence-rules-that-hold-whatever-is-built)
keeps panels and custom views client-side. A background declaration carries a
shared semantic distinction, not a panel specification or messaging policy.

# Rejected alternatives and boundaries

- **Put the flag in the instance record.** Start/restart rewriting would
  couple presentation persistence to lifecycle record updates.
- **Add a workspace default.** It was not requested and would be difficult
  to remove later. The selected scope also excludes a host default.
- **Inherit at spawn.** Client placement can follow ancestors without
  changing each descendant's own value; inheritance would conflate those
  two meanings.

The [shared-soul rollout gate](/nodes/oats-maintainer/stewardship/release-traps.md#shared-soul-keys-wait-for-every-reader)
and the [package-soul gate](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-souls-new-key-is-a-package-wide-rollout-decision-2026-10-27)
own when this new declaration may enter a soul, and the
[background-defaults decision](/nodes/oats-maintainer/decisions/background-defaults-are-for-okf-services-not-oats-maintainers.md)
owns which souls take it. Client-specific
section, control and attention rendering belongs to the Desktop node; its
[attention decision](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md)
already explains why collapsed content must not hide a waiting agent. This
record does not add a competing sidebar design or change connector meaning.

Enforce the presentation-only boundary and persistence in the mechanism and
regression tests, including restart and descendants with independent values.
Those are enforcement targets, not proof supplied by this harvest.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/background-instances-gate.md.

The source reports bilateral contract agreement on
[awebai/oats#1579](https://github.com/awebai/oats/issues/1579), identifying
comments 6441887900 and 6441920300, and a direct product-owner decision on
2026-10-27 for subtree placement and no workspace or host default. The note's
earlier separate-tree/rejected-child-placement wording is qualified by its
later dated product-owner decision: the subtree follows its ancestor in the
client while each child's own value stays unchanged. Its pending header is
not a second acceptance receipt.

The colour precedent is source-reported as
[awebai/oats#1421](https://github.com/awebai/oats/issues/1421). Only the proposal
and captured note were used as source evidence; no private correspondence or
external contract discussion was audited. The source says the work is still
being built. Preserve the selected shape and rejected alternatives, not
final-contract, implementation, release or live-behavior certainty.

The 2026-10-30 review read both cited comments on GitHub. 6441887900 is the
other maintainer side's yes to the contract, naming no inheritance, no
workspace default and a flag outside `instance.json`. 6441920300 presents
itself as the source's lane relaying the product owner's decisions on subtree
placement and on no workspace or host default: a relay, not the human's own
record. The "still being built" line above is out of date: `docs/desktop-cli-api.md`
at `cea30878` describes the flag, soul and off-by-default layers and the
later CLI change. The review read those docs and did not run the feature.
