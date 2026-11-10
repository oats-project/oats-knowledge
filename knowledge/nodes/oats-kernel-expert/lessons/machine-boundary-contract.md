---
type: Lesson
title: The CLI as a machine boundary
description: A machine CLI owes one stdout envelope, honest failure classification and phase-aware refusals, stable typed codes, semantic exit status, deployment-independent explanations and tested remedies.
tags: [kernel, cli, contract, json, diagnostics, exit-status]
timestamp: 2026-11-05
---
# Lesson

Consolidated from CLI-contract reviews of 2026-07-24 → 2026-09-21. The
process boundary decision makes the CLI the only surface independent
consumers (Desktop, capability packages, other runtimes) may depend on. That
choice carries obligations the code cannot state about itself.

**Exactly one stdout envelope per run, with stable published codes.** The
guarantee is void unless the machine-aware boundary wraps the *whole* path —
dispatcher setup, trust checks, exceptions thrown before the normal report,
child processes that never start, and children's own stdout. Error codes are
contract: consumers depend on them, not on wording. The obligation the code
cannot state is its *scope*: a leak found in one command's dispatcher exists
in every command built the same way, so the elimination route is a
stdout-capture test that runs every command's failure paths under the
machine-readable mode and asserts one parseable envelope — not a per-command
fix. Where that test does not yet cover a command, the maintainer treats the
guarantee as unproven for it.

**A system error code is not a typed lifecycle refusal** (2026-10-10).
The source's stop-retire investigation encountered the same reporting gap
at three different sites: recursive removal, a home walk and a stop receipt
write. Raw `ENOTEMPTY` or `ENOENT` reached the client without saying what had
been preserved or whether hooks had run. A field called `code` did not make
the result part of the kernel's published refusal vocabulary [3]. The
lasting conclusion is that fixing each filesystem race and fixing error
classification are different scopes of work: another fallible site can
reopen the reporting gap even after these races are closed.

Classify system failures at the machine boundary without treating arbitrary
exception codes as domain refusals, and preserve the operation-phase facts
at the site that knows them. An errno alone cannot establish before-effect
refusal, completed cleanup or rollback. The elimination route is kernel
error classification plus CLI failure-injection tests for pre-hook,
post-hook and receipt-write failures, checking the envelope, exit status
and truthful preservation details. This is knowledge debt, not a new code
table or a claim that the repair has shipped; the kernel owner should update
this finding when that coverage and contract are established [3].

**An unclassified failure is not a diagnosis** (2026-10-13). The source's
remote-cache investigation found that the kernel's fallback called an
unrecognized Git failure `network`. That label sent investigation toward a
healthy network instead of the filtered cache's missing delta base. The
recorded decision keeps such a failure `unknown`, with Git's last diagnostic
line, rather than inventing a cause [4]. Preserve uncertainty explicitly;
a category should name evidence, not fill a required field with a plausible
explanation.

That diagnostic is still an [output channel](hook-and-error-channels-disclose.md):
retain useful evidence as one bounded line without control characters or URL
user information, not raw stderr. Classification can also decide recovery:
the [cache fetch decision](/nodes/oats-kernel-expert/decisions/cache-fetch-negotiates-before-one-whole-retry.md)
records why falsely matching authentication text inside an object id skips a
needed retry. The elimination route is the classifier and failure-path tests
for genuinely classified errors, unrecognized text and sanitized diagnostics;
this lesson is not a new reason-code table or a substitute for those tests.

**Exit status is part of the answer.** Any state that blocks apply blocks
preview with the same exit contract; only side effects differ, and the full
plan travels in the error details so a nonzero result loses nothing.
Automation reads exit codes, so a preview that exits clean on a held state
turns "planned" into "ready". Printing a failure is not failing, output
filtering is not side-effect control, and a locked entry is an obligation, not
a comment.

**Anything whose job is to explain the tool must work when the deployment is
broken.** Help, version and diagnostics either bypass deployment resolution
entirely or turn resolution failures into findings — the doctor model. Routing
help through capability dispatch meant a single unreadable lock in the old
scope chain made help itself fail, invisibly in isolated fixtures and only on
a real machine whose home scope carried a superseded shape.

**A diagnostic that names a remedy is behaviour contract.** The refused
operation can be correct in every observable way while the sentence it prints
sends the operator into a loop, so the remedy text is under test like any
other behaviour and any "run X to fix this" is proven by running X. Remedies
also outlive the code that wrote them: a hint stored in a file keeps invoking
the old command shape after a new refusal narrows what that command accepts,
and the refusal's own tests cannot see stored strings — the review checks
every persisted remedy when a command's acceptance narrows.

**A refusal says what, not only where; one run instead of six.** On the
2026-09-21 second-operator gate three failures with three causes rendered as
one kernel template with the slot swapped: the operator saw *where* (slot,
capability, document key) but not *what*, and needed several runs plus the
adapter's source to learn a cause the provider had already made safe to
print. The acceptance criterion for any refusal path is that the operator
learns the cause on the first run. Every problem carries its attribution
(slot, capability, origin, the operator's document key) and a reason distinct
per cause; a bare unattributed refusal after selection is a kernel defect.
Free text from executable code still never becomes kernel prose: the kernel
relays a provider's answer as the provider's, marked as such (readiness
items), and invents none. A provider may declare its fixed refusal sentences
in its manifest (`binding.reasons`, bounded and validated); the kernel
matches nothing against them today.

**Identity keys are diagnostic vocabulary.** Every field that participates in
a comparison must be nameable by the refusals that use it and must protect
something; otherwise the message names the same target on both sides and the
key splits one operator-visible thing in two.

**A new mode is advertised before a consumer may call it** (2026-09-22). A
consumer talks to whatever CLI is installed, and an older CLI that ignores an
unknown flag runs the old command: `retire --plan` on it simply retires.
"Try it and see" is not detection for anything with side effects. So the
producer ships every new command or mode with a positive advertisement in
`oats version --json` (a `features[]` name, plus an API integer for a typed
payload), and consumers gate on the name, never on a version string or on
the call having worked; a missing feature makes the view unavailable, not
degraded to the old command. A destructive apply also carries the plan it was
shown: the kernel revalidates the plan revision (`E_PLAN_STALE`, fresh plan
attached, nothing done) and an idempotency key replays the recorded outcome
on retry. The Desktop engineer refused to wire removal until both existed;
shipping the semantics without the advertisement and the revision is not
shipping a GUI-safe verb.

# Internal storage can be an exported contract

The 2026-11-05 retire-retry design rejected putting new internal bookkeeping
in the existing pending marker: the source found that status relays that
object whole as `retirePending`, which Desktop consumes [6][7]. The reason for
using separate internal state was to avoid silently extending a client-read
shape, not a general preference for more files. A writer's “internal” label
does not establish a boundary when an outward reader passes its data through.

Before extending persisted state, trace its export path. Preserve an existing
wire shape by keeping new internal state separate, or deliberately change
the public contract with the required agreement. The elimination route is an
explicit projection at the serialization boundary where compatible, backed
by contract tests that seed internal-only fields and assert the published
shape. That is a proposed prevention route, not evidence such a projection
or regression already exists. A reminder to inspect readers is knowledge
debt until the boundary is enforced.

This retains the rejected placement and its compatibility rationale, not a
second description of status or a permanent retry-file lifecycle recipe.
[Pending lifecycle state is not evidence of failure](/nodes/oats-desktop-expert/lessons/pending-lifecycle-state-is-not-failure.md)
owns the client's separate interpretation question; the [retire-retry decision](../decisions/retire-hook-retry-stays-inside-authorizing-completion.md)
owns authorization and recovery scope.

# Related

[A routed preview preserves caller state and includes caller-only consequences](/nodes/oats-kernel-expert/decisions/routed-preview-preserves-caller-state.md)
applies preview/apply admission and feature-detection rules at the caller,
where a correct host preview must not become a saved route.

[Compatibility follows supported adoption](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md)
extends the tested-remedy obligation to upgrade guidance: a before-upgrade
check is proven on the outgoing releases, not only on the new diagnostic.

[A --repo that is not a repository key is refused with the key to pass, never with a Git remedy](/nodes/oats-kernel-expert/decisions/non-key-repo-refusal-names-the-key-never-a-git-remedy.md)
applies the tested-remedy obligation to the input a remedy is built from: a
remedy assumes a shape the input must actually have.

[Retire exclusion belongs to a whole-run claim, not a plan or retry key](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md)
separates exclusion from plan freshness and replay of an already recorded
outcome; neither existing guard serializes an in-flight retirement.

[The viewer detach key is caller-chosen and has its own exit status](/nodes/oats-kernel-expert/decisions/viewer-detach-key-is-caller-chosen.md)
records why opting into a keyboard exit preserves old status meanings and
requires host feature detection even for a printed attach command.

[A raw-mode terminal child does not protect its wrapper's whole lifetime](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md)
explains how a terminal signal during setup or teardown can bypass cleanup
and replace the command's semantic exit status.

[Retire plan notes are bounded summaries, not the full fact record](/nodes/oats-kernel-expert/decisions/retire-plan-notes-are-bounded-summaries.md)
records why a summary-size repair preserves full facts without silently
extending the plan's JSON shape.

[A minimal process boundary avoids permanent private coupling](../decisions/minimal-process-boundary.md);
[A refusal that needs the old bytes is a pre-commit gate](refusal-belongs-before-commit.md);
[Kernel supplies provider-neutral messaging inputs](../decisions/messaging-capability-owns-provider-behaviour.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current capabilities.md, readiness check](https://github.com/awebai/oats/blob/main/docs/capabilities.md#readiness-check-bindingcheck)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (json-mode-cli-contract, json-envelope-dispatch-boundary, usage-must-not-resolve-deployment-state, dry-run-exit-status-contract, diagnostic-remedies-are-contracts, retry-hint-sites-travel-in-packs, identity-key-fields-shape-the-diagnostic, provider-problem-reasons-cross-the-wire).
2. Migrated from agents/oats-expert/soul/knowledge/lessons/consumers-gate-on-advertised-features-never-on-optimistic-invocation.md @ 7838d3ca.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle-overlaps, 2026-10-10; notes/raw-errno-passes-as-a-kernel-code.md; notes/866-stop-overlapping-retire.md.

3. The named notes report the three-site pattern on OATS 0.50.0 at `ae9308b2`, attributed to [awebai/oats#866](https://github.com/awebai/oats/issues/866), [#891](https://github.com/awebai/oats/issues/891) and [#892](https://github.com/awebai/oats/issues/892), with an earlier related claim review in [#874](https://github.com/awebai/oats/issues/874). This harvest did not audit code or rerun the failures; it retains the cross-site design conclusion rather than the source-line inventory.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/partial-cache-have-lines-assume-unfiltered-history.md; notes/cache-fetch-negotiates-then-retries-whole.md.

4. The proposal and notes attribute the misleading `network` classification to [awebai/oats#1059](https://github.com/awebai/oats/issues/1059), with the repair attributed to [awebai/oats#1075](https://github.com/awebai/oats/pull/1075). The diagnostic-line bounds and maintainer agreement are reported by the proposal; this harvest did not reproduce the failure, audit sanitization or independently establish human acceptance.
5. Verified by the knowledge maintainer at review of the harvest on 2026-10-13. [awebai/oats#1059](https://github.com/awebai/oats/issues/1059) reports the unrecognized Git failure answered as `network` and the investigation it misdirected; [comment 6135851592](https://github.com/awebai/oats/issues/1059#issuecomment-6135851592) records the contract point as agreed by both maintainer sides: an unclassified failure is `unknown` with Git's last line, and the reason field gains no value. [awebai/oats#1075](https://github.com/awebai/oats/pull/1075), merged on 2026-10-13 with both maintainer sides approving the head that merged, states the diagnostic line's scrub (one bounded line, no control sequences, no URL user information) and the removal of object ids before classification. The comments are maintainer-lane records posted from the two maintainers' accounts, not evidence of human acceptance, and no release was checked.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-hook-failure, 2026-11-05; notes/status-relayed-marker-is-a-contract.md.

6. The note reports reading the whole-object relay at `8679dd165`. The description of [oats-project/oats#1748](https://github.com/oats-project/oats/pull/1748), read on 2026-11-05 while open at `109ac1a6ed9a4730c36a721edda464e86a4908c5`, corroborates keeping the marker and status shape unchanged by using separate internal retry state. This harvest did not inspect that implementation or run a contract regression; the placement rationale remains source-reported, not released behavior or independently established human acceptance.
7. Checked by the knowledge maintainer at review of the harvest on 2026-11-05: [oats-project/oats#1748](https://github.com/oats-project/oats/pull/1748) merged on 2026-11-05 at `109ac1a6ed9a4730c36a721edda464e86a4908c5`, the head cited above, and its description still lists the pending marker and status JSON's `retirePending` as unchanged contracts. The implementation was not inspected and no release was checked.
