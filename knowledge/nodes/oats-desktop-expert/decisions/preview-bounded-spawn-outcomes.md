---
type: Decision
title: Spawn deadlines follow the confirmed preview, not the request lifetime
description: Bind spawn work to the confirmed preview, isolate it from client hang-up, and use bounded targeted observation without weakening deadlines or typed compensation outcomes.
about: [system/oats-desktop]
id: dec-5c2d935d23b3
tags: [desktop, spawn, deadlines, transport, compensation, truthfulness, observations]
timestamp: 2026-10-15
---
# Decision and rationale

Decided by the Desktop expert on 2026-10-08 for worktree-hook spawns. The
source records maintainer agreement to preserve typed hook failures through
the kernel's spawn failure path and land the kernel and Desktop changes
together [1]. This is the Desktop request/deadline decision, not a second
specification of the kernel's hook transaction.

**Derive the apply deadline from the preview the operator confirmed.** On a
kernel declaring `worktree-event`, a non-empty preview `worktreeHooks` gives
an apply bound of 60 seconds + n × 30 minutes + 60 seconds, where n is the
number of hooks. The kernel bounds each hook at 30 minutes; the longer bound
therefore follows the confirmed work rather than a guess about how long a
spawn usually takes. Otherwise the apply bound remains 60 seconds.

**The transport owns that timer on these kernels.** At the deadline it sends
SIGTERM while continuing to read stdout, and escalates to SIGKILL only after
a grace period. The source reports a review finding that the built-in
`execFile` timeout lost the kernel's post-SIGTERM `E_INTERRUPTED` envelope.
A timer that discards the answer destroys the distinction between confirmed
rollback and an unknown outcome. Consume the kernel's final envelope; the
local timeout alone is not proof of compensation.

**Bound the response separately from the work.** The apply request returns
an outcome or `pending` within a window shorter than the IPC proxy's limit.
The broker retains the CLI, and the job follows `result` to its own absolute
deadline, preserved across a renderer reload. The request need not live as
long as the operation. This does not promise that a broker job survives
server death: [server lifetime](bundled-server-owner-lifetime.md) deliberately
leaves CLI children alone without guaranteeing receipt of their result.

Allow bounded concurrency across independent applies, while admitting only
one apply per workspace and soul. One long spawn must not monopolize every
workspace's apply capacity.

# A separate session does not remove spawn's deadline

The source records a 2026-10-15 maintainer decision [2]: a spawn apply is a
change and must run in its own process session in every client. Otherwise a
terminal's hang-up can reach the client's process group and interrupt
worktree hooks. This adds session isolation to the earlier deadline decision;
it does not replace that decision with the lifecycle apply/start rule that
a wait deadline ends only the wait.

**Spawn retains its preview-implied deadline signal.** A worktree-event
kernel can compensate after interruption and return `E_INTERRUPTED`; the
client must still read that answer and distinguish confirmed from unconfirmed
cleanup as below. The client's execution adapter must return the child so
the shared apply boundary can signal it. Moving spawn to a wait-only deadline
was explicitly left as a separate decision, not an incidental consequence of
sharing the process boundary.

This is deadline authority, not shutdown cancellation. If the client exits,
its timer no longer runs; the isolated spawn is left to the kernel's own
per-hook bound. Keep the [server-shutdown no-signal rule](bundled-server-owner-lifetime.md).
Session isolation alone does not prove completion after client death: the
[output-lifetime lesson](/nodes/oats-expert/lessons/outliving-a-client-needs-independent-output.md)
owns the remaining reader-dependency question. The proposal did not establish
a terminal-client spawn implementation.

Pin this distinction in process-boundary regressions: independent session
creation, a returned child, deadline TERM/grace/KILL behavior, and receipt of
the kernel's final envelope. Do not let a generic lifecycle timeout helper
silently remove spawn's intentional interruption policy.

# Reuse the confirmed preview and observe only the created deployment

The source's 2026-10-15 refinement [3] removes redundant reads without
removing prepare or weakening the decision fence. Previously, a 60-second
preview cache could expire while the operator typed a task, adding a second
live preview at prepare. Reuse the confirmed preview for the prepared
intent's lifetime (300 seconds in this decision): the kernel's valued
`--expect-decision` fence still refuses a mismatch with `E_DECISION_STALE`,
which the client presents as drifted. Skipping prepare was rejected because
prepare creates the intent record.

This is fidelity to the confirmed decision, not a claim of global freshness.
The kernel's [preview-bound observation exception](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md)
owns apply-side `--max-age` admission and feature gating; it is not a general
cache permission or permission to reuse the harness-package gate.

After a created apply, observe **only the spawned deployment**, immediately,
rather than queueing behind a full cycle over every deployment and a later
poll. Use a separate on-demand observer with no timer and no loop: the
background refresh remains the single recurring read loop. The chosen
on-demand bound is two slots overall; for each deployment one read runs and
one waits, and further requests coalesce onto the waiting read. This permits
targeted work without making every spawn an unbounded fan-out.

This changes nothing in [transport simplicity](loopback-trust-boundary-and-transport-simplicity.md#transport-simplicity):
its one refresh in flight governs the recurring snapshot refresh, which keeps
it. The post-spawn reads are a separate, bounded path beside that cycle, run
out of process like it and never on the request path that carries keystrokes.

Stamp observations when they start; the newest start wins publication. An
older background cycle must not overwrite a newer post-spawn observation.
Only a successful observation that publishes satisfies the created answer's
observation wait; a failed, busy or kept result does not count as fresh
publication. Bound that wait to the smaller of five seconds and the time
remaining in the 50-second answer window. It does not extend the work's
preview-derived deadline or turn an unobserved row into a failed spawn.

On a created outcome, the renderer follows with an immediate read. Terminal
opening may reuse the roster answer that showed readiness only while it is
still the newest answer for the same workspace. Creation alone is not
attachment readiness; retain the [async outcome distinctions](../lessons/asynchronous-intent-and-truthful-outcomes.md).

A new backend-to-renderer push channel was rejected: the bounded wait gets
the desired improvement without another transport. A faster background
refresh was also rejected because it spends CPU on every deployment all the
time. This keeps [transport simplicity](loopback-trust-boundary-and-transport-simplicity.md#transport-simplicity)
and asynchronous collection, rather than moving synchronous roster work
onto input handling. The addition is a bounded on-demand read, not a second
refresh loop or a change to the existing session/deadline policy.

Enforce these choices in composition regressions: matching, stale and
expired preview cases; bounded/coalesced reads across deployments;
overlapping observations completed out of order; non-publishing results;
and a nearly exhausted answer window. Those are enforcement routes, not a
claim that this harvest audited their coverage. The
[latency lesson](../lessons/measure-spawn-latency-without-spawning.md) owns the
measurement method and the limits of the reported gains.

# A compensated failure is a known outcome

Gate this interpretation on the declared `worktree-event` feature, not a
version guess or a generic error. For `E_INTERRUPTED`,
`E_REQUIRED_HOOK_FAILED` and `E_HOOK_ENVIRONMENT_CONTRACT`, absence of
`details.unconfirmed` means the kernel confirmed compensation. Present a
refused spawn with no surviving created instance, not an unknown outcome.
This does not mean no effects occurred before rollback.

With `details.unconfirmed`, present a final notice that cleanup is owed and
Retire completes it; never re-apply that job with the same key. Do not infer
compensation from a missing marker on arbitrary `E_SPAWN_FAILED` answers:
older kernels made no such promise. The decision to keep the typed codes
preserves the evidence Desktop needs to tell these outcomes apart.

# Rejected alternatives

- **No timeout for hooked spawns:** it leaves an unbounded operation.
- **One long fixed timeout for every spawn:** a hung ordinary spawn consumes
  a slot for half an hour despite having no confirmed long-running hooks.
- **Hold the HTTP request open for the whole spawn:** sleep, reload and proxy
  limits can end the request while the kernel still works.
- **One backend-wide apply slot:** a single long hook blocks unrelated
  spawns. Per-workspace-and-soul exclusion is not global serialization.
- **Treat any unmarked generic spawn failure as rolled back:** it silently
  assigns a new compensation guarantee to kernels that never offered it.

# Related

[Nested deadlines](../lessons/nested-deadlines-must-let-the-inner-outcome-arrive.md)
extends the deadline-review judgment to intermediary waits on other routes;
it does not replace the short-response/retained-job choice above.

This applies [declared CLI feature authority](standalone-product-and-cli-authority.md)
and the separation of creation, readiness and success in
[truthful async outcomes](../lessons/asynchronous-intent-and-truthful-outcomes.md).
The kernel's reason for choosing the hook seam remains in
[Worktree setup is a capability hook](/nodes/oats-kernel-expert/decisions/worktree-setup-is-a-capability-hook.md).
Live implementation details belong in the
[Desktop CLI contract](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md).

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, 2026-10-08; notes/long-spawn-transport-decision.md.

1. The proposal identifies [awebai/oats#819](https://github.com/awebai/oats/pull/819)
   as the Desktop implementation following
   [#801](https://github.com/awebai/oats/pull/801), and
   [#802](https://github.com/awebai/oats/issues/802) as the originating issue.
   It reports a long hook returning `pending` before completion and a
   deadline-triggered interruption returning confirmed rollback. Maintainer
   agreement, merge status and live outcomes are source-reported, not
   independently audited or rerun by this harvest. The note predates merge;
   the proposal records the later choice to retain typed codes rather than
   the note's possible generic-error fallback.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-client-spawn, 2026-10-15; notes/spawn-apply-is-the-one-signalled-change.md.

2. The source identifies the maintainer's session-isolation and retained-deadline
   decision in [awebai/oats#855, comment 6191749055](https://github.com/awebai/oats/issues/855#issuecomment-6191749055),
   and reports implementation in [#1240](https://github.com/awebai/oats/pull/1240)
   at `60ca0ba1`, with a Changed release-note entry. Agreement, implementation
   and release-note disposition are source-reported; this harvest did not
   audit the implementation or reproduce signal behavior.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-client-spawn, 2026-10-15; notes/a-spawn-reads-only-what-it-changed.md.

3. The source identifies the investigation and the partner maintainer's K1/K2
   decisions in [awebai/oats#1246](https://github.com/awebai/oats/issues/1246),
   and reports the Desktop changes in [#1260](https://github.com/awebai/oats/pull/1260)
   and [#1263](https://github.com/awebai/oats/pull/1263), with kernel support
   in [#1259](https://github.com/awebai/oats/pull/1259). Acceptance,
   implementation and measurements are source-reported; no separate human
   acceptance receipt is established, and this harvest did not inspect those
   implementations or run Desktop.
4. Checked by the knowledge maintainer at review of the harvest on
   2026-10-15. The merged #1260 (2026-10-15) states prepare's 300-second
   reuse with the `--expect-decision` fence unchanged, the on-demand
   post-spawn observer with no timer or loop, newest-start publication, the
   created answer's wait of at most min(5 s, the remainder of the answer
   window, never past 50 s), and at most two post-spawn reads beside the
   cycle's own, one running and one waiting per deployment. It reports the
   decision as approved by the LFX maintainer. The merged #1263 (2026-10-15)
   passes `--max-age` on apply only where the kernel advertises
   `spawn-apply-max-age`. No separate human acceptance is established, and
   the tests these PRs name were not read or run here.
