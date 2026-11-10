---
type: Lesson
title: A client's sentence must hold at every producer of a kernel code
description: Audit a client-authored sentence separately from its outcome classification, because a shared kernel code can cover causes the first example does not.
about: [system/oats-desktop, system/oats-kernel]
kind: lesson
id: ins-2428b03a3b69
tags: [desktop, kernel, wording, contracts, verification]
timestamp: 2026-11-10
---
# A correct outcome can still have a false explanation

The source reports a start-refusal review in which every examined raise of
`E_INSTANCE_RETIRING` supported the no-launch outcome, but not the client's
explanation. The initial headline described an unfinished retirement. An
independent reviewer exercised a failed spawn's retained-directory cleanup
through the real kernel and client: it returned the same code even though no
retirement had begun. The client's headline then contradicted the kernel
line displayed beneath it.

The reported correction named both circumstances and left the kernel's own
line to identify which applied. The durable lesson is not a replacement
code table: an outcome audit and a wording audit answer different questions.
A sentence written around the case that brought a code to attention can
assert a cause that the broader code does not establish.

When adopting a code, check every producer for both the outcome promised to
the operator and the cause implied by the client's sentence. If a common
sentence cannot establish the cause, keep it at the shared meaning and
preserve the separately attributed detail. Do not read a code's name as proof
that its most obvious cause occurred.

This concerns **client-authored claims**, not an obligation to freeze the
kernel's sentences. [Kernel-text test ownership](kernel-text-tests-own-the-client-reading.md)
keeps that separate boundary. Where the meaning also depends on the answering
kernel's declaration, [gated wording](../decisions/gated-wording-travels-with-the-answer.md)
records why the decision must travel with the response. The
[confirmation lesson](asynchronous-intent-and-truthful-outcomes.md#confirmations-follow-effect-conditions-not-the-usual-case)
owns the same truthfulness question for a promise made before an act; this
one adds the audit for a sentence keyed to a shared refusal code.

# A documented discriminator is worded as data, with the family meaning as fallback

The source reports a second case of the same audit, 2026-11-10: the sync
sheet explained every `E_PACKAGE_INTEGRITY` as a moved tag or a branch,
while the kernel raises that code for several causes and tells them apart
with a documented `details.why` (the kernel side is
[the integrity-family decision](/nodes/oats-kernel-expert/decisions/declaration-checks-run-at-sync-under-the-integrity-family.md):
extend a family with a discriminator when no consumer needs a separate
code). A reading of the sync-time producers at the time found several
`why` values and several producers with no `why` at all.

The chosen reading: when a shared code discriminates its causes with a
documented `why`, the client words its sentence **per `why`, read as data**.
With no `why`, or a value the client does not know (a newer kernel), it keeps
the **family's general meaning**, which asserts no cause and gives only the
general remedy. It does not pick the most familiar cause, and it does not
recognize a cause by matching the kernel's prose: that rejection is already
recorded for [kernel unknown](../decisions/kernel-unknown-is-not-refined-by-a-client-probe.md)
and for [shared readers](../decisions/shared-readers-separate-client-terms-and-kernel-prose.md#keep-the-speaker-at-the-reading-boundary),
and it holds here too.

**Rejected: one cause-neutral sentence that only deletes the false cause.**
It is tempting because it is the smallest edit and it stops asserting the
wrong cause. It fails where the **remedy** differs per case: an edited lock
is fixed by removing its entry, a moved tag by changing the version, so a
sentence that keeps one remedy is still wrong for some producers. A true
explanation with a wrong remedy still misleads. The first section's rule
("keep it at the shared meaning") is therefore the fallback, not the
answer, whenever the kernel supplies a discriminator that the remedy depends
on.

The source also reports the design stance behind the data path: the
Desktop's shared reader passes on no `details` by design, and carrying `why`
is a narrow exception for one action, a validated short slug and nothing
else, in the way an earlier action carries one scalar from its own
`details`. It is not a general opening of `details` to the view. The code
shows only the outcome of that stance; this is where the stance is written
down.

# Elimination route

Keep producer-case coverage and client-rendering regressions in the
repository: include the distinct causes sharing a code, and challenge the
headline as well as the no-launch classification. The retained-cleanup case
is a regression input, not merely a permanent review reminder. Preserve
producer detail without pinning incidental relationships between its live
sentences.

Broad codes do not make executable prevention impossible. This remains
knowledge debt where those cases are absent; the Desktop expert changing the
reader should move the check into the regression suite. Semantic review still
asks whether newly added producers fit the sentence. No complete gate or
passing implementation test is established by this harvest.

For `E_PACKAGE_INTEGRITY` the source reports that this debt is paid in the
change itself: a root regression test drives each sync-time producer through
the real kernel and the Desktop's reader, passing with the per-`why` wording
and failing with it reverted. That is one code; the route above still
applies to every other shared code the Desktop words.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-start-refused-at-claim, 2026-10-30; notes/lesson-word-a-code-for-all-its-producers.md.

The source places this finding in work for
[awebai/oats#1666](https://github.com/awebai/oats/issues/1666). It is one
source-reported review case, not an independent reproduction, an exhaustive
audit of kernel codes, or evidence of shipment. The prevention route above
is harvest judgment; the note's claim that there is no code-level route is
not adopted.

That described the harvest. At maintainer review on 2026-10-30,
[awebai/oats#1668](https://github.com/awebai/oats/pull/1668) was merged as
`27dae302`, and its commits confirm the correction: the first head said the
instance had a retirement that had not finished, and `997e1f6a` widened that to
being retired or having cleanup to finish, naming the failed spawn's retained
cleanup. The reviewer's run through the real kernel and client remains
source-reported. The tests that PR changed pin the widened sentence but feed
it a retirement-worded refusal, so the retained-cleanup producer case above is
still owed as a regression input. A merge is not a release.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-sync-integrity-text, 2026-11-10; notes/sync-integrity-wording-per-why.md.

The per-`why` case is placed by the source in
[oats-project/oats#1765](https://github.com/oats-project/oats/issues/1765),
with the change in
[oats-project/oats#1816](https://github.com/oats-project/oats/pull/1816),
open and unmerged when proposed. The producer inventory, the no-`details`
reader policy, the regression test and its results are source-reported; this
harvest did not read the kernel, run the test or audit the reader. The `why`
values the source read are the kernel's documented ones at that commit, and
the lesson does not fix them: the current contract is the kernel's
`docs/packages.md`. One code and one client view; no release is claimed.
