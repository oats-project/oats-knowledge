---
type: Lesson
title: Tests of kernel text own the client's reading, not the kernel's sentences
description: Test the client's handling of live producer text without freezing relations between kernel sentences, and derive forbidden-text checks from the producer rather than copied wording.
about: [system/oats-desktop, system/oats-kernel]
kind: lesson
id: ins-71e808d1543d
tags: [desktop, testing, kernel, wording, integration]
timestamp: 2026-10-14
---
# Live text creates a dependency without a shared-file conflict

The source reports a root test that compared a kernel listing's problem
message with the kernel's refusal message. A concurrent kernel change gave
the listing different wording and moved its remedy into `fix`. The PRs
shared no file and merged textually, but their trial merge failed: the
client test had taken ownership of a relationship between two producer
sentences.

Test what the client does with each actual value supplied by the kernel:
decode it, preserve the appropriate text, attribute it, and carry the remedy.
Do not assert that two kernel messages remain equal or that live producer
prose equals a copied literal unless that equality is genuinely the contract
being tested by its owner. A text rewording can be legitimate even when it
breaks such an incidental assertion.

In the Desktop handover, identify the kernel modules imported by root tests,
including source-text reads. That lets the maintainer check pending producer
changes despite disjoint PR file lists. When requesting a kernel rewording,
inspect the client's tests that consume that source too. The general merge
policy remains in [maintainer review](/nodes/oats-maintainer/stewardship/review-protocol.md);
this is the consumer's evidence responsibility, not a new approval round.

# An absence check can drift while staying green

The second reported failure was a check that Desktop contained none of the
kernel's prose, using copied regex alternatives. A kernel rewording removed
most alternatives from the producer, so the test could no longer detect
copies of the current text. Reverting client code alone would not reveal
that the measuring vocabulary itself was stale.

Read the prohibited text from its owning constants in a root-level test,
where the kernel is available, rather than introducing a kernel dependency
into the Desktop-only install. Demonstrate that the checker rejects a
planted copy of those actual words. This applies the existing
[positive-control and real-boundary bar](verification-judgment-for-privileged-surfaces.md#the-bar-the-expert-holds-reviewers-to)
to the producer-text dependency; it is not a separate generic testing rule.
Keep illustrative fixture wording visibly illustrative, not an unofficial
copy of the producer's contract.

# Elimination route

Remove incidental cross-message equality assertions. Keep the live-value
client contract tests and owner-derived absence checker, with a positive
control, in the repository. Automated dependency-aware test selection and
combined-tree CI can remove manual discovery of these cross-PR dependencies;
no such complete gate is claimed delivered. What remains expert judgment is
which side owns a sentence's meaning and which assertion silently changes
that ownership. [Coupled landings](coupled-kernel-and-desktop-landings.md)
owns the separate case where a producer change would make the shipped client
actively wrong.

The complementary [client-wording audit](client-wording-must-hold-at-every-code-producer.md)
asks whether the client's own sentence holds across every producer of a code,
even when its outcome classification is correct; it does not freeze kernel
prose.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-REDACTED-desktop-queue, 2026-10-14; notes/a-root-test-on-live-kernel-text-holds-the-reader-not-the-kernels-sentences.md; notes/a-test-of-absence-reads-the-words-from-their-owner-and-has-a-positive-control.md.

The source reports the collision between
[awebai/oats#1080](https://github.com/awebai/oats/pull/1080) and
[#1058](https://github.com/awebai/oats/pull/1058) (comment 6137168555), and the
trim in [#1088](https://github.com/awebai/oats/pull/1088). The absence-test
finding concerns `packages/desktop/test/start-flag-ignored.test.mjs` following
[#961](https://github.com/awebai/oats/pull/961). These incidents and remedies
are source-reported; this harvest did not run or audit the tests and does not
claim that all proposed enforcement is already implemented.
