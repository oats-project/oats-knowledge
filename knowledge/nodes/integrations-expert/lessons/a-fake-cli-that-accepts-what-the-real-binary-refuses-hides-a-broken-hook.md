---
type: Lesson
title: A fake CLI that accepts what the real binary refuses hides a broken hook — a provider that drives an external CLI is accepted on the whole lifecycle against the published binary
description: Fakes model the released tool's refusals and outputs; acceptance needs the whole lifecycle on the published binary, one version floor, and explicit control of the binary and state the rehearsal actually exercises.
about: [workstream/provider-integration]
kind: lesson
id: ins-cf384ff257b7
tags: [lesson, integrations, hooks, testing, fake-cli, rehearsal, acceptance, versioning]
timestamp: 2026-11-13
---

Learned 2026-09-23/24 across five review rounds of one messaging provider,
three of them opened by a live rehearsal on a real identity after every unit
suite was green, and confirmed on 2026-09-25 when a provider release minted
joined-team identities with a command the real CLI refuses under an external
identity home.

# Rule

1. **A fake models the real binary's refusals, not only its successes.** For
   the version it claims (state it in the test and in the PR), the fake
   rejects the flags and environment the real tool rejects, resolves inputs
   the way the real tool does, and prints output in the real shape. Every
   field a fake always populates is a branch the real tool can leave empty.
2. **Read the tool's admission surface, not only the diff.** When the tool
   admits only an exact allowlist of commands under a mode (the messaging CLI
   under an external identity home in the releases examined before aw
   1.36.43), find every command the provider runs in that mode on the allowlist
   in the released source at the floor version; if it is absent, use the
   admitted alternative the refusal names, or change the floor. Keep one
   real-binary test per such command that proves admission: the failure must
   be about the input, never about the policy. Do not project that allowlist
   onto newer releases: the source reports its removal at aw 1.36.43.
   [Explicit hook identity isolation](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)
   must hold even when the tool no longer refuses a foreign inherited home.
3. **The gate is the feature's whole lifecycle** (for a membership: join,
   send, read, leave) run against the published binary on a scratch
   deployment with a disposable identity, with its isolation limits made
   explicit (see the scratch-deployment boundary below). An admitted first
   command is not an operable identity: when a tool fix names one command, ask
   the tool's owner for the whole path before building on it. Run such gates
   only where the human designates, leave residue for the tool's owner to
   inspect, and report exact command/error pairs; never improvise cleanup
   through admin commands.
4. **The floor is the version where every step works, and it has one
   exported source.** The runtime gate, the readiness remedy and any docs
   example a test pins import the same constant (oats.aweb 1.16.1: `AW_MIN` in
   its binding-wire module, one floor for the client, custody attachment and
   the host wake daemon). Two literals drift the moment a placeholder floor
   becomes a published one.
5. **The rehearsal controls which binary runs.** State the release a fixture
   needs and put that binary first on PATH or call it by absolute path; a
   package's `node_modules/.bin` shim can shadow it. Record the version output
   in the rehearsal log. Install test-only tools into a prefix outside the
   repository: `npm install --prefix <repo>` saves them into the package's
   manifest and lock, and a capability must ship no dependency closure.
   A unit test controls the binaries a hook reaches in the same way, the
   kernel's CLI included. A hook that falls back to `oats` on PATH when the
   kernel locator is unset (in oats.aweb 1.42 the health host needs both
   `OATS_NODE_BIN` and `OATS_CLI_BIN`) reaches the host's real kernel from a
   test that leaves it unset: on a host that runs OATS the test can fail, and
   in CI, with no `oats` on PATH, it passes. Pin the kernel such a test
   reaches (a fake kernel through every locator variable the hook reads, or
   a PATH without `oats`). Read a failure seen only on a host that runs OATS
   as host leakage before you call it a regression.
6. **When the rehearsal finds a refusal the fake accepted, fix the fake in the
   same round as the hook**, naming the tool's source of truth in the test.

[Required real-binary tests must actually run](/nodes/integrations-expert/lessons/real-binary-tests-that-skip-give-no-cover.md):
install the floor and newer version being qualified, fail on skipped required
cases, and check that each version reached the intended behavior. The linked
lesson preserves why a green suite and then a matrix both missed that proof.

# Refusal classifiers need real-output evidence

A fake can conceal a classifier that **never matches**, not only a hook that
accepts too much. In the source's 2026-10-30 joined-team spawn/retire rehearsal,
the provider expected an identity-home path in a refusal; real aw identified
the identity instead. The fake printed the path the code expected, so unit
tests stayed green while the real match failed at both aw 1.36.33 and 1.36.51.
The failure was conservative: retirement stopped and kept the key. These are
source-reported observations, not runs repeated by this harvest.

For a refusal match that decides whether a key may go, require a real-binary
case that reaches the refusal and proves the intended classification actually
fires. A successful lifecycle run that never reaches that branch is not this
proof. Keep negative cases for misleading paths, unrelated prose and unknown
errors; do not make a dead exact match pass by weakening it to a substring
search. The existing [cleanup and key-retention rule](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md)
owns when a key-independent handoff is permissible and why unknown failures
remain fatal.

**A precise text match is not a stable machine contract.** The source reports
that aw's owner did not guarantee stderr wording and that no suitable error
code existed at capture. Treat such a match as temporary compatibility debt,
not a permanent parser contract or a universal rule that stderr is always
unstable. The elimination route is a documented structured error code, such
as a code in a JSON error, with tests for its semantics. Until that exists,
exercise the refusal classifier against the real supported binaries and keep
the fake aligned with observed output. This lesson certifies neither a new
error-code API nor shipment of the reported fix.

**Audit output consumers, not just the phrase known to have changed.** The
source's first wording-based audit reported no text dependency; the real
rehearsal disproved it the same day. Start from reads of tool output and trace
which consumers classify it, rather than treating an unsuccessful search for
one diagnostic phrase as a clean audit. The durable finding is that blind
spot and its elimination route, not a second reference for aw's output format.
The source's second audit lists eight other text matches in
[awebai/oats-aweb#167](https://github.com/awebai/oats-aweb/pull/167), left in
place until the error code exists. That list is dated 2026-10-30: start an
audit from it, not in place of one.

# An early-deciding reader needs split-output evidence

**Delivery in chunks is part of output shape.** A fake that prints a whole
line in one write can hide a reader that accepts a prefix as the complete
value. In the source's 2026-11-02 version-gate review, the reader returned at
the first match so it could terminate a CLI that subsequently waited on an
update check. Output split as `aw 1.36.33` then `-rc.1` let a prerelease pass
the release floor; a split inside another prerelease suffix truncated the
version used for a daemon comparison. The single-write fake passed every
test. These are source-reported failures from one provider and one CLI.

The rejected shortcut is deciding on a regex prefix, not early return
itself. When a reader resolves before EOF, require evidence that the token
is complete: a delimiter defined by the output grammar has arrived, or the
stream has closed. Then validate the whole token. A chunk boundary proves
neither completion nor validity; an unterminated last line becomes complete
at close, not merely because the currently buffered prefix parses.

The elimination route is complete-token framing and whole-value parsing in
the reader, enforced by executable regressions. Give the fake modes that
split before and inside an optional suffix, end without a newline, and emit
a non-conforming token. Check both the decision and process cleanup on these
paths; the [hang-with-child lesson](/nodes/integrations-expert/lessons/a-fake-that-hangs-must-have-a-child.md)
owns descendant-lifetime coverage. The source reports fixes and tests in
[awebai/oats-aweb#172](https://github.com/awebai/oats-aweb/pull/172) at
`0e3f332`; this harvest did not rerun them. Remembering the failure is not a
substitute for the framing fix or for real-binary lifecycle acceptance.

# Scratch-deployment boundary

**Before choosing a scratch deployment to prove a line, ask which state the
command reads and writes.** Relocating a deployment isolates only the state actually
placed or redirected there. It does not by itself isolate a per-user service,
machine-managed settings, inherited `PATH`, or a running daemon. Read the
selected release's state lookup, not only its command usage, before choosing
the rehearsal environment.

The source's 2026-10-12 report corrected its earlier assumption that a scratch
deployment could show only a missing scheduler. Another lead's probes instead
observed an installed, active scheduler across three published kernel versions,
despite isolating the deployment and registry. The source did not run those
scheduler probes itself. The durable finding is the mistaken isolation
assumption, not a claim about where every version stores a scheduler unit.

A rehearsal record names the branch actually exercised and the branch left
unrun. Reading installed status proves neither the missing-state branch nor a
fresh installation. An operator-only step needs the operator's run; otherwise
state that it was inspected in source, not executed. Do not replace missing
real-binary evidence with a fake or infer permission to change the host just
to manufacture the other branch.

## A small composition probe still has host-side cleanup

The source's 2026-10-28 rehearsal on released OATS **0.69.4** used a local
bare Git workspace containing only the candidate package pinned at a full
commit OID, no member repositories, and `messaging` and `tasks` defaults set
to `none`. Onboarding from that workspace synced and locked the package;
a spawn preview followed by a `--no-launch` spawn exercised the packaged
soul's composition without minting a messaging identity. This is a useful
way to avoid unrelated repository and identity setup when those surfaces
are outside the proof. The result is limited to one directory-mode soul
with no providers, not a guarantee for every package or proof of a launched
harness or the feature's whole lifecycle.

Even that small probe wrote outside its scratch tree: onboarding registered
the deployment in the host's per-user deployment list. The reported cleanup
was to retire the instance, run `oats deployments remove <dir>`, then delete
the scratch tree from a working directory outside it. Deleting only the tree
would leave the host registration behind. The observed `removed: true`
tombstone was not failed cleanup or a reason to hand-edit the list; the
[registry population lesson](/nodes/oats-expert/lessons/registry-population-needs-user-path-coverage.md)
owns why explicit removal must survive automatic addition. This refines the
rehearsal's cleanup accounting, not authority to change unrelated host state.

The generalist's [runner-isolation lesson](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md)
already owns prevention of personal-state writes in tests. Apply it when
turning this probe into reusable real-kernel coverage: isolate host storage
through supported controls and assert registration/removal as well as
composition, rather than treating removal of the temporary directory as the
teardown assertion. No such regression implementation is certified here.

## Elimination route

Where supported state control can make both branches reproducible, put that
control in real-binary regression tests. That is the elimination route for a
specific coverage gap; the review judgment is to expose any remaining limit
rather than equate a temporary directory with a clean host. This refines the
rehearsal gate, not the operator's separate
[configuration-placement judgment](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).

# A migration must exercise the consumer's event model

A provider migration that expects kernel-triggered work needs evidence from
that consumer, not just successful changes in the external service. The
source's 2026-10-29 review of a parked-PR migration found that a remove-label,
close, reopen recipe had passed adversarial review and lead verification
without checking whether the kernel could observe the transition. A later
package-expert reading of the kernel exposed the gap: the inspected polling
model could miss a close and reopen between polls. Forge success alone would
not establish a new trigger event.

Extend the rehearsal question from **which binary and state?** to **which
observation makes the downstream work eligible?** For a transition inferred
across polls, the intermediate state must be recorded by a successful,
complete observation before the next change. A time delay or a successful
but incomplete fetch is not that evidence. Check the consumer's reported
event separately from completion of the work it starts.

Include deduplication and retained-worker capacity in that investigation:
a new external change need not create a new eligible key or free a worker
slot. Do not clear deduplication history to manufacture a passing rerun;
use the supported lifecycle and event paths within their existing authority.
This lesson grants no authority to retire retained homes or mutate live PRs.

The elimination route is an executable migration rehearsal against the
selected kernel, with consumer observations as assertions. Regression cases
should include transitions entirely between polls, failed or incomplete
polls, already-seen events and occupied capacity, plus a positive case that
actually produces the intended work. Exact status fields, fetch caps and
commands belong in the kernel contract and the package's migration guidance,
not a second versioned recipe here. The reported investigation inspected
OATS 0.69.2/0.69.5 and live status fields; **the revised migration was not run
live**, and source inspection is not acceptance of the recipe.

# Why

A green unit suite against a fake is a proof about the fake: in the rounds
that taught this, the fake accepted flags and environment the tool refuses,
printed one-line JSON where the tool prints an indented document, answered
every revoke with success, and admitted a command the tool's identity-home
policy refused. The reviewer's general form of the defect is in the
maintainer's protocol
([a test that agrees with the code is not evidence](/nodes/oats-maintainer/stewardship/review-protocol.md));
the rehearsal is the outsider stance applied to a provider
([second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md)).

For timeout and interruption coverage, the related
[hang-with-child lesson](/nodes/integrations-expert/lessons/a-fake-that-hangs-must-have-a-child.md)
explains why the fake must also model descendants and why every caller needs
its own cleanup evidence.

For package-kernel compatibility, [prove where the floor refuses](/nodes/integrations-expert/lessons/package-kernel-floors-need-released-refusal-probes.md):
a released-reader probe distinguishes a successful lock from discovery and
composition failures, rather than inferring protection from the floor's intent.

For a missing harness login, [credential-free partial probes](/nodes/integrations-expert/lessons/credential-free-harness-probes-have-bounded-proof.md)
can exercise the real TUI's input path and particular sandbox operations.
They leave authenticated launch, host-timer delivery and real-provider work
unproven; they do not replace this lifecycle gate.

For observer-induced transitions, [validate the measurement itself](/nodes/integrations-expert/lessons/a-measurement-must-not-change-the-state-under-test.md):
a real CLI read can also acknowledge what it displays and contaminate the
state being tested. The linked lesson records the source-reported rehearsal
failure and its limits, rather than a universal command recipe.

# Consequences

- A provider PR that touches a hook calling an external tool carries a
  rehearsal record (what was spawned, on which identity and binary, which live
  behaviours were exercised, what was cleaned up) or it is returned.
- A reviewer checks `git diff package.json package-lock.json` on every
  provider release.
- Facts learned about the tool's behaviour are the package expert's
  ([oats-aweb-expert](/nodes/oats-aweb-expert/index.md)); the discipline is
  this node's.

# Citations

- Evidence: OKF proposal from integrations-expert/aweb-1-42-pin-fixes-lead, 2026-11-13; notes/hook-tests-reach-host-oats-cli.md. Maintainer review of oats-knowledge#384 read [oats-project/oats#1932](https://github.com/oats-project/oats/pull/1932) at `7faec682` and its first commit `30c78732` (the oats.aweb 1.42.0 mirror): `lib/health-host.mjs` uses `OATS_NODE_BIN` with `OATS_CLI_BIN`, else `oats` on PATH; the retire hook clears its attention claim only when that kernel's `version --json` lists `waiting-on-you`, and warns "oats.aweb attention claim could not be cleared" when that kernel's clear does not answer ok; the cited test's hook runner inherits the host's PATH and sets no kernel locator. The host failure on OATS 0.69.18 and the CI pass are source-reported; that PR's CI was still running at review, and no fix to the test is certified here.
- Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-11-02; notes/a-reader-that-stops-early-meets-split-output.md. The split-output failures and their repair are source-reported; no independent implementation, CI or release verification is claimed.
- Maintainer review of oats-knowledge#234, 2026-10-30, read [awebai/oats-aweb#167](https://github.com/awebai/oats-aweb/pull/167) and its diff, and [#165](https://github.com/awebai/oats-aweb/pull/165) with its correction comment. The fix keeps the whole-refusal match with exit 2 and adds only this home's own name. The journey jobs failed at aw 1.36.33 and 1.36.51 before it (run 41117898173) and passed after it (run 41119385387), read by job conclusion only. It merged at `26297493` and the changelog still listed it as Unreleased, so shipment stays uncertified. The tool owner's statement appears there only as the source's report, and one approving review says it did not re-check each of the eight other matches. Not human acceptance.
- Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/a-fake-that-prints-what-the-code-expects.md. The refusal mismatch, failed wording-based audit and tool-owner statement are source-reported; this harvest did not rerun the reported fixes or independently verify the owner's statement.
- Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/real-binary-tests-that-skip-give-no-cover.md; notes/aw-1-36-43-selection-order.md. The CI execution gap and removal of the external-home allowlist are source-reported; this harvest did not rerun them or establish real invite acceptance on aw 1.36.51.
- Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/a-check-can-change-what-it-checks.md. The linked measurement lesson preserves the source-reported observation and version limit; no rehearsal was rerun by this harvest.
- Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/prove-a-harness-you-cannot-log-in-to.md; notes/idle-waiter-wake-rehearsal.md. The linked partial-proof finding is source-reported and does not certify authenticated end-to-end execution.

- Evidence: OKF proposal from integrations-expert/okf-needs-human-removal-integrations-expert, 2026-10-29; notes/poller-triggers-need-an-observed-state-change.md. The missed-observation finding and kernel/status inspection are source-reported; neither the revised migration nor its proposed regression coverage was executed by this harvest.
- Evidence: OKF proposal from integrations-expert/cloner-rehearsal-integrations-expert, 2026-10-28; notes/package-soul-rehearsal-scratch-workspace.md. The package-soul composition and deployment-list cleanup results are source-reported from one run on OATS 0.69.4, not independently reproduced by this harvest.
- Evidence: OKF proposal from integrations-expert/integrations-expert-developer-skill-lines, 2026-10-12; notes/a-scratch-deployment-does-not-isolate-host-state.md. Scheduler results are source-reported observations from another lead, not independently reproduced by the source or this harvest.
- Migrated from agents/integrations-expert/soul/knowledge @ dade3270.
- Migrated from agents/oats-expert/soul/knowledge/inbox @ 26f2caef (the tool facts went to the messaging package expert).
