---
type: Lesson
title: Engineering layer neutrality needs package-side checks
description: Use the package's own bounded neutrality check rather than importing the kernel test harness; retire the duplicate manual grep but retain the consumer guard until all pinnable releases are covered.
about: [workstream/oats-direction]
kind: lesson
id: ins-7f7e7e829903
tags: [review, capabilities, composition, ci, release]
timestamp: 2026-10-29
---
**Owner: oats-maintainer. Update-on-change: whoever changes the enforcement
boundary or the consumer-guard removal condition updates this lesson and
records the supersession in the node log.**

# A green package check can miss a downstream instruction constraint

The source reports a maintainer coherence rule for `oats.engineering`:
expert, developer, code-review and maintainer guidance must compose with
any knowledge or messaging layer, including none. Their injects and skills
therefore defer harvest and communication duties to the selected layer;
they do not prescribe a particular provider's command. Core OATS operations
are not excluded by this rule.

The reason is composition, not vocabulary preference. Putting a knowledge
provider's inspection command inside the definition of finished work makes
that provider an undeclared prerequisite for an otherwise general role.
The [capability-owned coordination decision](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)
keeps team policy out of neutral core mechanisms; this lesson addresses the
other boundary, where the selected engineering policy must still avoid
assuming a different optional layer's implementation.

On 2026-10-28 the source reports that OATS's `test/capabilities.test.mjs`
checked this neutrality against the engineering mirrors, while the package's
own CI and validation did not. A finished-work instruction naming
`oats okf status` passed package review and reached engineering 1.17.0, but
broke 0.69.4 release preparation and required a package patch. Green package
CI therefore was not evidence that the later mirror-and-pin gate would pass.
This is a dated coverage gap, not a permanent inventory of either CI system.

# Package enforcement retires the temporary grep (2026-10-29)

Prefer one layer-owned definition and layer-neutral references to it rather
than an engineering copy of a provider-specific procedure. The 2026-10-28
lesson offered two prevention routes and kept a manual provider-command
search as a temporary guard. This section explicitly supersedes that
interim guidance, not the neutrality rule or the historical failure above.

The source reports that [awebai/oats-engineering#33](https://github.com/awebai/oats-engineering/pull/33),
merged on 2026-10-29, puts the bounded check in the package's own test/CI
gate: `\baw\b` and `\boats okf\b` in injects and `SKILL.md` files, together
with the reviewer's no-layer fallback. For package PRs covered by that gate,
the separate manual grep is retired. The two patterns do not detect every
provider assumption; semantic neutrality review remains in the maintainer's
existing review guidance. This is neither a universal provider-command ban
nor a reason to remove unrelated release checks.

The chosen prevention route is a package-local validator applying the same
bounded rule. Running OATS's mirror test from package CI was rejected because
that test imports `@awebai/oats/core`, pulling the kernel's whole install
into the package's test environment. The lesson is the dependency-cost
tradeoff and the rejected route, not a second inventory of the validator.

# Why the consumer guard remains

Having the rule in both the package validator and OATS's mirror test is a
deliberate transitional duplication. The package check protects new
candidates; it does not retroactively validate older releases that OATS can
still pin. Remove OATS's copy only once **every engineering release OATS can
pin has passed the package-side check**. A merge of the package validator
alone does not satisfy that condition.

While both copies remain, a future capability deliberately tied to one
layer would need an explicit exemption in both. This is a consequence of
the two enforcement sites, not permission to weaken neutrality for the
existing general roles. The exit condition belongs to this engineering-rule
transition, not to all consumer compatibility or wire-validation tests.

The generalist's [cross-capability composed review](/nodes/oats-expert/lessons/rule-changes-need-cross-capability-composed-review.md)
owns planning the wider read and routing contradictions. This lesson adds
the package-versus-consumer enforcement gap; it does not duplicate that
planning rule or redefine [release ordering](/nodes/oats-maintainer/stewardship/release-traps.md).

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-28; notes/engineering-capabilities-name-no-layer-command.md.

The source identifies [awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28)
as the introduction and [#32](https://github.com/awebai/oats-engineering/pull/32)
as the 1.17.2 correction. The ruling, CI coverage, release-prep failure and
repair are source-reported; the original harvest did not inspect those
repositories or reproduce their checks.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-10-29; notes/package-ci-cannot-run-oats-mirror-test.md.

The update's proposal reports #33 merged as `7a079d99`, with green CI and
parity to the bounded mirror rule. The named note supports the rejected
kernel-harness route and the condition for removing the consumer copy.
These are source-reported observations and rationale: this harvest did not
inspect the implementation repositories or rerun their tests. It does not
establish that every pinnable release is covered, that OATS's guard can
already be removed, or that a release or deployed home has picked up the
change. This knowledge edit delivers no test, skill or deployment change.

Maintainer verification at review (2026-10-29): awebai/oats-engineering#33
is merged as `7a079d99` with its `validate-and-test` check passing; its
validator applies the two patterns to injects and skills and checks the
reviewer's no-layer fallback, and its comments keep semantic neutrality a
review obligation. At review, no engineering tag contained that commit (the
latest was v1.17.2), so no pinnable release had yet passed the package-side
check and the consumer guard's removal condition was unmet.
