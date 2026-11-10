---
type: Lesson
title: Intake consent does not predict auto-mode approval
description: Onboarding handoffs need actual scoped consent on record, but neither that consent nor suppressing intake questions guarantees Claude Code will permit consequential setup steps.
about: [workstream/operations]
kind: lesson
id: ins-6cacee08ba45
tags: [operator, onboarding, harnesses, consent, acceptance]
timestamp: 2026-11-03
---
# The bounded observation

In the source's 2026-11-02 newcomer trials, Claude Code auto mode refused
setup operations that had been included in an earlier intake approval.
In one run, private repository creation and harness trust were refused;
after the agent named each blocked change and the person explicitly agreed
to it, one retry of each was allowed. The newcomer typed no command.
A plugin installation was refused in one run and permitted in another.

This supports a narrow finding: **an intake yes did not reliably predict
execution approval, and the same campaign saw differing refusal behavior**.
The two successful retries are source-reported observations, not proof of
the classifier's internal reason, a guaranteed consent phrase, or a stable
contract that every refusal can be cleared by asking again. The exact Claude
Code version and model are absent from this capture. Its stated scope is
Claude Code on a Max account, Ubuntu 24.04; other harnesses and platforms were
not tested.

# Refinement: suppressing questions is not carrying consent (2026-11-03)

The source reports one later installer-style handoff that forbade further
consent questions. The agent skipped the intake round, leaving no recorded
human authorization naming the setup changes. Claude Code auto mode then
refused private repository creation, aweb signup and folder trust, and each
needed a separate person round. Other runs retained an intake round and still
encountered repository-creation refusals, but already had the person's named
choice to refer to.

This is one source-reported comparison on Ubuntu 24.04, not a controlled
measurement of the classifier's reasons or a universal three-versus-one
round saving. The capture supplies no exact harness version or model for
these later runs. It supports checking the consent content of the handoff,
not assuming that fewer initial questions mean fewer interruptions overall.

When designing a handoff, preserve one scoped consent round that names the
planned consequential changes if that consent has not already been given.
An installer prompt can carry the person's actual prior decision and its
scope; an instruction to ask nothing, or the fact that an installer was
started, cannot substitute for it. Never manufacture a yes to satisfy the
prompt. A consolidated intake is not a cap on required later approvals and
is not an execution-permission guarantee.

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-03; notes/installer-prompt-without-a-yes-meets-every-boundary.md.

# Consequence for onboarding design

Plan for a permission boundary at any consequential setup step, not just at
the steps refused in the last trial. Distinguish a pending approval prompt
from an outright refusal. Explain the specific effect and keep the person's
choice visible. A new, specific human authorization can be relevant only
where the harness's supported policy permits reconsideration of that act;
conversation does not itself override the tool's enforcement.

Do not turn this observation into a retry loop or a method for defeating a
classifier. Keep a remaining refusal as a named blocker and explain what
cannot work without that step. Do not hide the same operation in another
shell, script or window, change execution identity, or hand over a `!`
command as a bypass. Do not treat the UX goal of
[agent-run routine commands](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
as permission to ignore a required human act.

The scoped
[desktop-persistence handoff](/nodes/integrations-expert/lessons/desktop-persistence-apply-is-a-human-handoff.md)
remains intact. Its observation that one integration required a human apply
and this campaign's two allowed retries are not universal opposites: they
exercise different operations and unqualified classifier versions. This
lesson neither rewrites that integration's procedure nor authorizes replacing
its human handoff.

# Elimination route and evidence

Keep the concrete approval/refusal branches in the maintained
[getting-started skill](https://github.com/awebai/oats/blob/main/skills/oats-getting-started/SKILL.md),
with tests that preserve refusal handling and no-circumvention boundaries.
Cover installer handoffs both with and without actual prior scoped consent,
so suppressing questions cannot silently erase the consent step or fabricate
its answer. Rehearse through the actual newcomer harness after relevant
changes; static wording checks do not prove classifier behavior. The source reports
incorporating the lesson through
[awebai/oats#1705](https://github.com/awebai/oats/pull/1705).
This harvest checked the PR's description and changed paths, not a live
classifier or that implementation's full correctness.

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-02; notes/a-conversational-yes-passes-the-auto-mode-classifier.md.

Owner: oats-operator-expert. Recheck the observed behavior when the selected
harness, permission policy or onboarding steps change, and update or
supersede this dated finding rather than asserting that the previous trials
establish current permission.
