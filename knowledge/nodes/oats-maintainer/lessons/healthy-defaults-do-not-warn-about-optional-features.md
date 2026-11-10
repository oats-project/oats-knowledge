---
type: Lesson
title: Healthy defaults do not warn merely because an optional feature is off
description: Readiness warnings identify a fault or actionable consequence of a chosen configuration, not an invitation to enable an intentionally optional feature, because permanent warnings on healthy defaults train operators to ignore real problems.
about: [workstream/oats-direction]
kind: lesson
id: ins-0c4a716a3f07
tags: [readiness, review, defaults, operator-experience, warnings, start]
timestamp: 2026-11-10
---
# Preserve the meaning of a warning

When reviewing readiness or doctor output, ask what the operator can repair
without adopting an optional feature they deliberately left off. A healthy
default deployment should not carry a permanent warning merely because that
feature is disabled. Put the feature's disabled state in its own status and
documentation instead.

This is a review judgment about signal, not a preference for fewer messages:
a warning that never clears under a supported, healthy configuration teaches
operators to ignore the warnings that do require action. A test change from
an empty warning list to a warning on an otherwise healthy default fixture
is a reason to challenge the new requirement, not simply update the fixture.

The boundary is **intentionally unused**, not **broken**. A missing
prerequisite, a fault in an enabled feature or a fallback from a selected
configuration can still deserve a warning. The integration node's
[defined-fallback lesson](/nodes/integrations-expert/lessons/a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md)
remains canonical for honoring and reporting a contract's fallback; this
lesson does not suppress those diagnostics or change a supported baseline.

## A warning that fires on a supported route is dropped; only the real conflict is refused (2026-11-10)

The same judgment applies to a start warning, not only to readiness. In
review, a new warning has to name a state the person should change. If it
fires on a route the documentation supports, it is noise: refuse the actual
conflict, or say nothing. Narrowing such a warning to one class of spawns
was rejected too when the refusal already covered the conflicting case.

The source reports the case on oats-project/oats#1787: the change refuses a
Claude start when OATS itself sets a harness token and a `/login` credential
is also present, and it also warned on every other Claude start that found a
`/login` credential. Pepe's side kept the refusal and dropped the warning,
and Juan's side had already said dropping it was fine. Logging in with the
harness's own `/login` is a supported route, and the one most laptop users
take, so the warning would appear on nearly every start, carry no action the
person needed, and teach them to skip the kernel's warnings. The
[operator lesson on that login](/nodes/oats-operator-expert/lessons/claude-code-login-needs-the-approver-at-the-server.md)
owns what the route requires of the approver; this section only records why
its presence is not warned about.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-10; notes/no-standing-warning-on-a-supported-route.md. Read on the
forge at harvest: the decision comment
[oats-project/oats#1787, comment 6771655475](https://github.com/oats-project/oats/pull/1787#issuecomment-6771655475)
keeps the refusal, drops the always-on warning for the reasons above and
reports Juan's side's prior agreement; it presents itself as the lane
maintainer's posting on Pepe's delegation and is recorded as source-reported
(relay). The PR was open and unmerged at harvest; no implementation or
release is certified.

# Prevention and limits

Enforce the chosen distinction in provider readiness tests: keep the healthy
feature-off case quiet and retain cases for actionable faults. The semantic
question belongs in the maintainer's existing direction/review gate; an
assertion cannot decide whether a feature ought to be required. No test or
skill change is delivered by this lesson.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-31; notes/a-readiness-warning-must-be-clearable.md.

The source reports applying this rule in
[awebai/oats-aweb#168](https://github.com/awebai/oats-aweb/pull/168), returning
`7ef6f814` and resolving the objection at `4baea42e`. That is source-reported
review evidence, not an independently audited implementation, test run or
release. No new human acceptance or change to an existing human decision
is claimed.
