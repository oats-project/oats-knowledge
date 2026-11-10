---
type: Decision
title: A routed preview preserves caller state and includes caller-only consequences
description: Routed spawn preview requires advertised host support, keeps apply's caller-side refusals, adds consequences only the caller knows, and never turns a preview answer into a saved route.
about: [system/oats-kernel]
id: dec-562298d88f78
tags: [kernel, routing, preview, compatibility, state, feature-detection]
timestamp: 2026-10-14
---
# Decision and rationale

The source reports both maintainer sides' agreement on 2026-10-14 for routed
spawn preview: a preview must remain a preview on **both** sides of the
connection. A correct host preview is insufficient if the caller treats a
successful answer naming an instance as a completed spawn and records a
route. The source identifies that caller-side interpretation, not the host,
as the reported defect.

Preserve three boundaries:

- **Apply's caller-side refusals also govern preview.** An existing-route
  conflict, changed route or unsupported operation must not become an
  apparently ready plan just because the caller will not apply it. This is
  the existing [CLI exit-status rule](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
  applied before forwarding, not a separate admission policy.
- **Include what only the caller knows.** Return the host's preview with
  the caller's server and target context and a warning about a saved-route
  collision where appropriate. A plain relay, modeled on routed retirement
  planning, was rejected because the host cannot report the caller's local
  route consequence. Exactness means preserving the host's answer while
  adding those facts, not reconstructing the host's plan locally.
- **A preview answer never authorizes a route write.** This holds even
  when received through the apply path: the answer's meaning, not merely
  the requested flag, governs caller state. Conversely, do not print an
  actual spawn as a preview just because preview was requested. Reporting
  must remain truthful about what the host says happened.

# Advertised support is the forwarding gate

An older kernel can ignore an unknown preview flag and actually spawn.
Require the host's positive `spawn-preview-2` advertisement before sending
the preview request. Successful optimistic invocation or a guessed version
floor cannot establish safe forwarding. The version probe itself is not
forbidden; the refusal precedes the potentially effectful spawn request.

This is the routed-spawn application of the existing
[advertise-before-call rule](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md),
not a new general compatibility rule. Refusing every combination of
`--server` and `--preview` was kept only as the fallback had exact
forwarding proved impossible, and was not chosen: advertised support permits
exact forwarding without removing the useful operation from capable hosts.
The [compatibility decision](evidence-bounded-compatibility-and-migration.md)
remains canonical for supported-adoption and migration policy.

# Bound the no-state promise and enforce it in code

The source notes that SSH transport can open a control socket. Therefore
"saves no route or other state" is not a claim of zero filesystem or
transport effects. Preserve caller-owned persistent state; do not silently
promote a preview into local bookkeeping or promise that transport does
nothing at all.

The elimination route is the caller's admission and route-write boundary,
with tests for a byte-identical caller state before and after preview,
refusal before sending to an unadvertised host, caller-only warnings, and
preview answers received on the apply path. These are acceptance obligations,
not a claim of completed tests. The current command and envelope shapes
belong in the repository's
[server contract](https://github.com/awebai/oats/blob/main/docs/servers.md),
not a second specification here.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-REDACTED-kernel-bugs, 2026-10-14; notes/routed-preview-forwards-and-saves-nothing.md.

The proposal and note attribute the decision to
[awebai/oats#610](https://github.com/awebai/oats/issues/610), including
[comment 6169073092](https://github.com/awebai/oats/issues/610#issuecomment-6169073092),
and implementation to [#1147](https://github.com/awebai/oats/pull/1147).
Maintainer agreement and the repeated cross-version observations are
source-reported; the byte-identical test requirement is reported in the
proposal. This harvest did not inspect the discussions, reproduce the bug
or independently establish human acceptance. No merge or release is asserted.

Verified by the knowledge maintainer at review of the harvest on 2026-10-14.
On [awebai/oats#610](https://github.com/awebai/oats/issues/610), a direction
comment of 2026-10-14 states that a routed preview forwards to the host and
writes nothing locally, and names refusing `--preview` with `--server` as the
fallback only if forwarding cannot be made exact. One maintainer side's
proposal the same day (comment 6169068279) gives the caller-side refusals
before forwarding, the `spawn-preview-2` refusal before anything is sent and
its reason, the host's answer plus `server` and `target` with the one route
warning, and why a plain relay like routed retirement planning was rejected.
Comment 6169073092 accepts it as written and asks for the byte-identical test
of the caller's saved routes and files. The comments are maintainer-lane
records, not evidence of human acceptance;
[#1147](https://github.com/awebai/oats/pull/1147) was open at this review and
no implementation or release was checked.
