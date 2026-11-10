---
type: Decision
title: Lost sessions resume locally through the kernel into their own conversation
description: Lost-session recovery is always on and retriggered by local loss, with a per-boot bound and proven harness selectors, while preserving the instance's conversation, user-owned prompt choices and local-only scope.
about: [workstream/oats-direction, system/oats-kernel]
id: dec-b629b2a252c9
tags: [runtime, recovery, lifecycle, clients, locality, supersession]
timestamp: 2026-10-30
---
# Direction and rationale

The 2026-10-27 direction is to recover a session lost to shutdown, reboot or
crash in **that instance incarnation's own harness conversation**, with the
settings it was launched with. Recovery belongs to one per-home kernel
primitive, reused by one machine-wide sweep of the deployments registry.
Desktop and TUI request the sweep on open and again when a status read shows
a local lost row, subject to the bounds below. The client does not implement
a second lifecycle or limit recovery to its open deployments. The registry
is the machine's deployment inventory; a client's open views are not.

**The sweep is local-only.** Opening a client on one machine is no evidence
that another machine lost its sessions and must not restart that machine's
agents. A server runs the sweep itself. This is a scope decision, not a
remote feature awaiting implementation.

Derive whether a session was lost or intentionally stopped from kernel
lifecycle evidence, rather than adding a second intent field to the instance
record. The design extends the existing exit marker with the harness exit
status and the stop receipt with the start identity it ended. Preserve the
reason for this choice: lifecycle evidence stays with the lifecycle that
produced it instead of creating parallel state on the stop path. Exact keys
and command names belong with implementation documentation; kernel-private
file formats are not a client contract.

Harness-specific resume arguments belong beside the harness's launch
arguments. Reuse the frozen launch recipe and launch hooks for the same
settings, not an independently replayed command. This applies the existing
[kernel/capability boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)
and [native-launch decision](/nodes/oats-kernel-expert/decisions/harness-native-launch.md).
The [runtime ownership decision](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
still requires a supported execution receipt and one live identity holder;
resuming a conversation does not bypass those requirements.

# Always on, continuous and bounded per boot

The product-owner direction reported on 2026-10-27 makes lost-session
recovery **always on**: no setting, preference or flag opts out. Stopping an
instance through OATS is the explicit intent record that keeps it down.
Only **lost** sessions are eligible; stopped and exited sessions stay down.
The lack of an opt-out is deliberate, not a missing setting for a future
maintainer to add.

Recovery is not limited to client startup. A later status read showing a
local lost row also triggers the sweep, with one sweep in flight, a minimum
interval and the machine lock. Continuous triggering does not mean an
unbounded restart loop: **the kernel caps automatic resumes of each home
per boot**, refusing further automatic recovery for that home once the cap
is reached. A harness that repeatedly gets killed must not restart forever.
This bound is what makes continuous, always-on recovery acceptable without
an opt-out; throttling a sweep alone does not bound the number of restarts.
Nor does it settle a repeated observation: the lesson that
[continuous triggers must account for every input](/nodes/oats-expert/lessons/continuous-triggers-account-for-every-input.md)
covers that gap.

The cap and the sweep interval are implementation-review parameters, not
fixed constants in this decision. Preserve the per-home, per-boot bound and
its refusal behavior when reviewing those values.

Maintainer review correction, 2026-10-30: the proposal said the refusal
lasted until the next boot. The contract agreed afterwards on
[awebai/oats#1567](https://github.com/awebai/oats/issues/1567#issuecomment-6440072509),
and the kernel at `cea30878`, go further: a sweep's refusal answers that loss,
so the next boot does not retry it automatically. The cap still counts per
boot, and a person's explicit resume still brings the session back.

# Launch-environment fidelity

The later 2026-10-27 ruling makes the same-launch-settings promise concrete:
**resume must not silently launch with changed resolved launch-environment
values**. Reusing the same recipe is insufficient when a reference resolves
to a different value. This extends the [launch-check environment decision](/nodes/oats-maintainer/decisions/checks-use-the-launch-environment.md)
across starts rather than letting a check of today's environment stand in
for evidence about the previous launch.

- An unresolved `{fromEnv}` reference refuses the start. The source reports
  this refusal already applies to every start; it is not a resume-only rule.
- Record a per-home keyed digest (HMAC) of each resolved value at every
  start, in kernel-private storage, and compare it only at resume. A changed
  value refuses resume. Retain the digest, never the value, and keep it out
  of `instance.json`. The choice detects changed resolutions without keeping
  their potentially sensitive contents as recovery state. The kernel's
  [launch-value decision](/nodes/oats-kernel-expert/decisions/launch-value-verification-is-private-and-best-effort.md)
  owns the rejected plain-hash and fail-start alternatives. Ordinary
  Start/Restart remain fresh and never compare.

A session started by hand outside OATS resumes through its OATS launch.
**Never capture or replay the process's argv** to reconstruct an ad-hoc
launch; custom commands belong in launch configuration. Recovery preserves
the declared launch, not an arbitrary command discovered in a process. The
kernel's [execution-only selector decision](/nodes/oats-kernel-expert/decisions/resume-selector-and-notice-are-execution-only.md)
owns the separate persistence boundary for transient resume arguments.

This records a comparison of resolved launch values, not proof that every
ambient process variable is identical. Enforce the comparison at the launch
boundary and cover missing references, changed values, ordinary starts and
configured custom launches in regressions. These are review targets, not
test results.

**Not settled here: a resume with no usable comparison record.** The kernel
([awebai/oats#1578](https://github.com/awebai/oats/pull/1578)) resumes such a
home with one warning: a home last started by an earlier kernel, or one whose
record belongs to another start or does not read. The source's reason is
that refusing would stop the first reboot after an upgrade from bringing
existing instances back. The source itself calls this a qualification of the
same-settings promise and cites no human acceptance of it, so this record
does not adopt it. Read it as what the kernel does, not as an accepted
exception: a change to the promise needs that human's acceptance, cited. It
is no waiver of a detected change, an unresolved reference or any independent
recovery eligibility, lifecycle or identity check, and no claim that every
resume ran under matching values.

# Conversation and prompt boundaries

Find the conversation through native runtime records filtered to the
instance incarnation, not merely its pathname. A resumed conversation gets
one line explaining the resume, asserting only what holds for every
instance. If there is no conversation to resume, start fresh from the
briefing. The universal-text constraint is already owned by
[kernel-composed instructions](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md),
not a new assumption about knowledge files or capability presence.

The maintainer's revision-2 gate adds two safeguards:

- **No unproven resume selector ships.** A harness selector needs an
  end-to-end proof; until then that harness takes the fresh-start path with
  a named reason. Selecting an apparently suitable native record is not
  evidence that the harness actually resumes it.
- **Resume-time confirmation and cost choices belong to the user.** Recognize
  the dialog and report the resume as blocked; never answer it or suppress
  it through undocumented harness internals. Always-on recovery is not
  permission to accept a cost choice. This is a known limit of unattended
  resume, not a prompt-bypass requirement. The kernel's
  [report-only recognition decision](/nodes/oats-kernel-expert/decisions/report-only-prompt-recognition-may-use-derived-labels.md)
  owns how the dialog is recognised.

The existing [pi fresh-home signal](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md)
is a prompt heuristic with stated limits, not authority to select a recovery
conversation. Likewise, [a missing tmux socket does not prove server exit](/nodes/oats-kernel-expert/lessons/missing-tmux-socket-does-not-prove-server-exit.md):
this recovery direction does not turn an unreachable endpoint into proof
that a second harness may start.

# Explicit partial supersession

For **lost sessions only**, this direction supersedes the earlier repository
documentation rule that every start opens a fresh harness conversation.
Ordinary **Start and Restart remain fresh**. The source identifies the old
rule in `docs/desktop-instance-start.md` at `a5961dfa` and reports no recorded
rationale for it. This is a deliberate exception, not a silent change to all
start behavior; the harvest did not independently establish the old rule's
acceptance history.

The later **2026-10-27 always-on refinement** explicitly supersedes this
concept's earlier once-on-client-open trigger with open-plus-status-driven
sweeps. It also supersedes the source's earlier gate proposal for an opt-out
setting; that setting was not an accepted rule in this base. Local-only
scope, incarnation-bound conversation selection, the one-line notice, fresh
fallback and ordinary Start/Restart semantics remain unchanged.

# Rejected alternatives

- **Continue the latest conversation at this path.** A reused instance path
  can select an earlier incarnation's conversation.
- **Have OATS choose the conversation ID at launch.** The source reports
  that a harness clear operation can create another ID and that Codex cannot
  take an OATS-chosen ID. A launch-time choice is therefore not a stable,
  cross-harness record of the conversation to recover.
- **Record a separate intent field when stopping.** Rejected in favor of
  deriving the distinction from the existing lifecycle receipts above.
- **Let each client recover only deployments it has open.** That confuses
  view state with the machine's recovery scope and leaves other local work
  out of the sweep.
- **Resume remote servers when a client opens.** A local client event is not
  evidence of loss or recovery intent on another machine.

# Acceptance and evidence limits

The source reports a human request and a direction-gate design on
2026-10-27. It records that the lane's human, after receiving the
maintainer's recommendations for local-only scope, the one-line notice and
fresh fallback, delegated those choices to the maintainer; the maintainer
then selected them. This is source-reported delegated acceptance, not an
independently audited conversation or direct human specification of every
mechanism.

For the later refinement on the same date, the source reports that the
product owner directed always-on recovery to the lead and then directly
confirmed that direction to the source maintainer. The source also records
the continuous trigger and per-boot safeguard, plus its revision-2 selector
and prompt rulings. Keep the explicit human direction distinct from the
maintainer's implementation-gate conclusions; this harvest did not
independently audit the correspondence. The note's earlier startup-only and
opt-out passages are historical and superseded by its later dated direction
change, not concurrent requirements.

The acceptance of this supersession is recorded at maintainer review on
2026-10-30 as **source-reported**: the product owner, 2026-10-27, in private
correspondence with the lead and the source maintainer, which the review
could not read. It is neither verified nor the human's own words. The review
also found the same direction relayed by the source's lane on
[awebai/oats#1567](https://github.com/awebai/oats/issues/1567), where the other
side of that contract confirmed the sweep triggers and the per-boot guard.
The proposal cites neither record; they corroborate the report and are not
the human's own record.

The launch-environment refinement is attributed by the source to the
product owner's 2026-10-27 direction and the maintainer's ensuing rulings.
This is source-reported acceptance, not independently audited private
correspondence or proof that the human specified every digest mechanism. The
2026-10-30 review found the same attribution on the
[source's review of awebai/oats#1578](https://github.com/awebai/oats/pull/1578#issuecomment-6442098368):
the direction is the product owner's note on custom launches plus the
source's own rulings. The proposal does not cite that record; it corroborates
the report and is not the human's own record. The refusal of a changed value
applies the accepted same-settings promise rather than relaxing it, so the
review kept it. Neither the proposal nor that record reports the human
accepting the warning for a home with no record, so the review removed it as
policy; see [the section above](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md#launch-environment-fidelity).

The source reports a harness resume-cost dialog as the concrete reason for
the prompt ruling. This record does not certify a particular harness version
or a universal absence of documented suppression controls.

At both earlier proposal checkpoints nothing was built; at the
launch-environment checkpoint the source reported work in progress. This
record preserves the chosen shape, scope and rejected alternatives, not a release claim, verified
recovery behavior, fixed retry/interval values or a fixed CLI spelling.

# Citations

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md.

The source identifies its design and gate correspondence and code at
`d5443cc3` as context. Only the captured proposal and named note were used as
source evidence; this harvest did not read the correspondence, audit the
implementation repository or exercise any harness resume behavior.

The 2026-10-30 review read [awebai/oats#1567](https://github.com/awebai/oats/issues/1567)
and `lib/session-resume.mjs` at `cea30878` on GitHub; it did not run the code.

Evidence for the launch-environment refinement: OKF proposal from
oats-maintainer/polaris-oats-maintainer-kernel, 2026-10-27;
notes/session-resume-gate.md. The note's final launch-environment paragraph
and the proposal supply the changed-value refusal, keyed-digest choice,
legacy warning and configured-launch boundary. The missing-reference rule
is reported as already implemented, not independently verified here.

The 2026-10-30 review also read [awebai/oats#1578](https://github.com/awebai/oats/pull/1578),
`lib/start-env.mjs` and `docs/execution-targets.md` at `cea30878`. They match
the refusals, the resume-only comparison, the typed-command boundary and the
no-record warning, whose scope is wider than the proposal's pre-feature
homes. The review did not run the code.
