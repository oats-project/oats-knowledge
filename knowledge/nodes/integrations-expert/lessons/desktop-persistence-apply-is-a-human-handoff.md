---
type: Lesson
title: Desktop persistence apply is a human handoff, not a classifier workaround
description: Agent-assisted desktop setup separates plan and check from the person's persistence-changing act, respects harness refusals, and limits each chosen option to its own effects.
about: [workstream/provider-integration, system/oats-desktop]
kind: lesson
id: ins-76cdf7bfe1e3
tags: [integrations, desktop, persistence, consent, harnesses]
timestamp: 2026-10-26
---
# The refusal changes the integration's handoff

In a reported 2026-10-23 Omarchy trial, Claude Code's auto-mode classifier
refused an agent-run `setup --apply --yes` as unauthorized persistence. The
setup would leave key bindings, executable launchers or update hooks behind.
The source treated that refusal as correct, not an obstacle to evade.

For this class of agent-assisted desktop setup, design the documented path
around an explicit human act: the agent runs the permitted plan and check,
then supplies the exact apply or remove command for the person to run, or a
menu action the person chooses. Do not instruct the agent to add `--yes` to
get persistence changes through a refusal, or seek a different invocation
that hides the same effects. A noninteractive flag is not consent.

This is a scoped setup lesson, **not evidence that every coding agent or
Claude Code version can never execute any authorized operator command**.
The generalist's [operator-authority lesson](/nodes/oats-expert/lessons/run-tty-free-one-liners-for-the-present-operator.md)
remains intact: a present operator's request can authorize a permitted,
TTY-free act, but it does not override a safety refusal. The observed
classifier behavior is bounded to one reported version, whose exact number
was not supplied.

# A selection authorizes only its own effects

The same trial found that choosing an agent-key option also changed an
unrelated desktop shortcut. A person selecting one option has not chosen
every setup feature. Narrow the apply to what that selection needs, and
make those effects visible before the act. The proposal reports an
option-scoped apply fix in awebai/oats-omarchy#21.

The durable lesson is the mismatch between a small visible choice and a
broad persistence writer. The elimination route is explicit effect scoping
in the writer, regression tests that unrelated bindings and hooks remain
unchanged, and setup documentation that preserves the agent-to-human
handoff. Knowledge alone must not stand in for that implementation.

The [post-confirmation validation lesson](/nodes/integrations-expert/lessons/config-validation-belongs-after-confirmation.md)
continues to govern freshness and guarded writes after the person confirms.
Neither narrow scope nor a human click proves that the resulting config is
valid. [Host-install consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)
is likewise separate from package trust.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy-oats-standard, 2026-10-26; notes/agents-cannot-apply-desktop-persistence.md.

The refusal and its interpretation come from the named note; the collateral
shortcut change and fix come from the proposal. The proposal identifies
awebai/oats-omarchy#19, #20 and #21 as implementation context. These are
source-reported observations from one integration, not a classifier
specification or an independently reproduced desktop trial. This harvest
performed no live apply and certifies no implementation test result.
