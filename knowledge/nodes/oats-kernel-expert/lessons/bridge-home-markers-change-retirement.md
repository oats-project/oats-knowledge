---
type: Lesson
title: A bridge's home marker is retirement state, not harmless bookkeeping
description: Home bookkeeping needs separate work-retention and copy-permission decisions; avoiding an undeclared bridge marker prevents needless recovery, but classifying a kernel file as a receipt does not keep sensitive bytes out of recovery storage.
about: [system/oats-kernel]
kind: lesson
id: ins-b010cb8c2e4e
tags: [kernel, runtime, bridges, retirement, baseline, credentials]
timestamp: 2026-10-27
---
# Lesson and rationale

Do not treat a runtime bridge's marker in an instance home as free internal
bookkeeping. In the reported pi fresh-home investigation, a marker intended
only to remember a start would also change the kernel's retirement decision.
The marker was rejected, not shipped as a new lifecycle contract.

Retirement compares home contents with the spawn baseline. A new marker
outside the kernel-receipt and declared capability-disposable exclusions
becomes changed home content. Even a helper, reviewer or failed launch that
produced no useful work can then require a recovery copy, which diagnostics
subsequently report. The bridge's small convenience imposes a retention cost
on every home where that marker remains.

This is not a claim that every non-kernel write changes retirement: a
capability can declare disposable home roots through
`retirement.disposable.home`. The relevant constraint is that the runtime
bridge is not a capability and has no such declaration route. Choosing a
hidden name does not create an exemption; top-level `.oats-*` names are
reserved for kernel entries and capabilities' exact names.

The design lesson is to derive the bridge's per-home signal from state the
runtime already maintains outside the home, rather than create an
undeclared home marker. This governs bridge-owned bookkeeping, not the
instance's legitimate task knowledge or a prohibition on all native harness
writes. The [pi fresh-home decision](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md)
applies it without duplicating this retirement rationale.

# Refinement: work classification is not copy permission (2026-10-27)

The launch-environment verifier exposed a second question for a new kernel
home file: **is it work, and may it leave the home?** A kernel receipt
exclusion answers the first question only. It keeps bookkeeping updates
from being treated as task work; it does not prevent a recovery copy made
for another reason from carrying that file out of the home.

The source reports that review caught precisely this gap: classifying the
verifier's files as receipts still let its key travel into recovery storage.
For kernel files holding key material or credential-derived comparison
material, exclude the bytes from the recovery copy **and** from that copy's
verification. The copier and verifier must agree about the intended
preservation set; otherwise verification can demand the very private bytes
that the copy must omit. The [launch-value verification decision](/nodes/oats-kernel-expert/decisions/launch-value-verification-is-private-and-best-effort.md)
explains the keyed-digest and best-effort-write rationale separately.

This extends the earlier retention lesson; it does not authorize new bridge
markers, arbitrary exclusions or rewriting old baselines. Kernel receipt
classification and permission to export a file are independent decisions,
not two names for disposable state.

Enforce the chosen copy boundary in the recovery copier and its verifier,
with a regression that forces recovery for legitimate work while private
kernel material is present, then checks that the work is preserved and the
private material is absent. A receipt-only/no-recovery test cannot exercise
that leak. This is the elimination route, not a claim that the harvest ran
such a test.

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/decision-start-env-record-is-a-keyed-digest.md. The source
attributes the finding and correction to review of
[awebai/oats#1578](https://github.com/awebai/oats/pull/1578); this harvest did
not audit the implementation or reproduce a copy. No human acceptance is
inferred.

# Elimination route and limit

A reviewed declaration path for runtime bridges could make disposal intent
explicit. Alternatively, a lifecycle regression could prove that bridge
startup and restart bookkeeping leave the retirement home digest unchanged,
separately from deliberate task writes. The proposal records both routes as
deferred for this one-bridge repair; this lesson is a guard until enforcement
exists, not evidence that either route is implemented or approved.

Do not solve the symptom by broadening digest exclusions informally or
rewriting old baselines. The [independent digest-version decision](/nodes/oats-kernel-expert/decisions/baseline-digests-have-an-independent-version.md)
protects the meaning of spawn-time evidence. Likewise, an avoidable recovery
copy is not a later deletion authorization: [leftover diagnostics report
facts, not disposal verdicts](/nodes/oats-kernel-expert/decisions/retire-leftovers-are-facts-not-deletion-verdicts.md).

# Related

- [Kernel and capability responsibilities](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md) owns the generic-seam boundary; a bridge does not acquire capability authority by writing into a home.
- [Home and work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md) owns the operational-home boundary; this lesson adds the rejected marker's retention consequence, not a new work-mode grant.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-fresh-state, 2026-10-15; notes/fresh-home-signal.md.

The source attributes the marker rejection to review of
[awebai/oats#1251](https://github.com/awebai/oats/issues/1251), with the repair
in [#1254](https://github.com/awebai/oats/pull/1254). The note records the
initial review finding; the proposal qualifies its kernel-receipts-only
wording with capability-disposable exclusions and supplies the deferred
elimination routes. The investigation and reported merge were not
independently reproduced or audited by this harvest; no human acceptance
is inferred.

Verified by the knowledge maintainer at review of the harvest, 2026-10-15,
by reading [awebai/oats#1254](https://github.com/awebai/oats/pull/1254) and
its discussion, and the capability documentation at `990cc76b`; nothing was
run. The pull request, merged on 2026-10-15 at `990cc76b`, records that its
first review round rejected the bridge's home marker because retirement
would keep a recovery copy of every started pi home and top-level `.oats-*`
names belong to the kernel and capabilities; the merged bridge writes nothing
in the home, and a test checks that a fresh home is left byte-for-byte
unchanged. The capability documentation at that commit defines
`retirement.disposable.home` as a capability manifest declaration of hidden
top-level home entries. The verdicts establish maintainer review, not human
acceptance.
