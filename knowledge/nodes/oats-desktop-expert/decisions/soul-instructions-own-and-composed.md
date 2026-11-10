---
type: Decision
title: A soul's page shows its own AGENTS.md and the composed one, read through a flagged field of the soul inspection
description: The soul page reads the soul's own instructions and the AGENTS.md a spawn would write, separating the soul's part from every injected part; the composed text is an opt-in field of `inspect --soul` because its cost is paid only where it is shown, and routed souls needed the host to report its own features.
about: [system/oats-desktop]
id: dec-ee04677e36d5
tags: [desktop, souls, instructions, composition, feature-gating, latency, remote]
timestamp: 2026-10-08
---
# Decision and rationale

Accepted 2026-10-07/08 (human direction, maintainer contract decisions).
Shipped in awebai/oats#768 and #792; the kernel read is #751; the routed
follow-up is #795 (kernel) and #797 (Desktop).

**What the page shows.** The capability page already reads what a capability
injects. A soul's page needed the same for what the soul tells its instances.
The human asked for *both* the soul's own AGENTS.md and the AGENTS.md a new
instance gets once capabilities apply, "making it very clear" which part is
whose. The Instructions section is one tree with two groups. "This soul" holds
the soul's own AGENTS.md. "Instance" holds AGENTS.md "after spawn, with
injects": the composed document, made of parts. The soul's part is headed
**From this soul**; every other part is headed **Injected by …**, with Open
capability for capability parts. The header text carries the distinction, not
colour alone. Wording was cut twice for length at the human's request: a
long label plus parenthetical read as clutter in a 220px nav.

**Why a flagged field, not a new command and not always-on.** The maintainer
rejected a new command: the soul's view is `inspect --soul`, and spawn preview
is about one spawn's options. The composition must be spawn's own, read-only,
so it costs a scratch materialization, about +0.7 s per inspect. Always-on
would charge every soul inspection, including ones that never show
instructions (the sidebar inspector, schedules, cache refreshes). So it is an
opt-in flag that only the soul page sends. Measured through the app, it adds
56–97 ms to a read of about 220 ms, so no separate parallel read was built.
The answer gives the soul body and each block as contiguous ranges into one
text, so the Desktop never re-parses markers to tell parts apart.

**Why routed souls needed more.** The Desktop gates on features, never on
versions ([CLI authority](standalone-product-and-cli-authority.md)). A remote
host's features were checked only inside the kernel's `--server` routing, and
the roster the Desktop polls never runs the host's version probe. So the
Desktop could not know whether a remote host composes. Two shortcuts were
rejected:
- *Send the flag and retry without it on refusal:* it branches on an error
  instead of a declared capability, and costs two SSH round trips on every
  uncached visit.
- *Probe on demand or persist routed probes:* that is probing on every poll,
  or written, stale and partial state.

The accepted design has the host report its own features in its status
answer, relayed by the roster as `probe.features`. Anything that is not an
array is unknown, and unknown means not supported. Hosts too old to report
read as unknown until they upgrade: a self-healing false negative, never a
false positive.

# Related

- [One standalone Desktop product](standalone-product-and-cli-authority.md):
  feature gating, and the kernel as the only source of deployment facts.
- [Browser-owned state and accessibility under repaint](../lessons/browser-owned-state-and-accessibility-under-repaint.md):
  the section is one long-lived controller, so a refresh keeps selection,
  focus and scroll.
- [Kernel-composed instructions are executable surface](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md):
  what the composed text is, from the kernel's side.
- [A soul's own skills are an opt-in field of the soul inspection](soul-skills-opt-in-inspection.md):
  the same opt-in boundary applied to a later field; it changes nothing here.

# Current contracts

- [Current docs/desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md) (`soul-composed-instructions`, `server-probe-features`)
- [Current soul-instructions.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/soul-instructions.mjs)

# Citations

1. Human direction 2026-10-07 (show both, clearly separated) and 2026-10-08 (shorter group wording).
2. Maintainer contract decisions 2026-10-07 (extend `inspect --soul`, one composer, opt-in flag) and 2026-10-08 (hosts report their own features; additive; no on-demand probing).
3. awebai/oats#751, #768, #792, #795, #797 (all merged).
