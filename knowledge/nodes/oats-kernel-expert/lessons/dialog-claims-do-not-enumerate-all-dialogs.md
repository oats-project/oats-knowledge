---
type: Lesson
title: Dialog claims neither enumerate every dialog nor prove one is still open
description: A hook-silent usage-limit menu and a claim surviving refusal show why automated input must treat claim coverage as partial evidence and a long hold as a reason to inspect.
about: [system/oats-kernel]
kind: lesson
id: ins-1e2bce78d707
tags: [kernel, harnesses, dialogs, evidence, input-safety]
timestamp: 2026-10-30
---
# Finding

A harness's dialogs are a larger set than the ones its reporting hooks
necessarily expose. Conversely, a reported claim can remain after the dialog
has closed. A consumer must not interpret no claim as no dialog, or a live
claim as proof that the original dialog remains open.

The source reports a disposable Claude Code 2.1.308 probe on 2026-10-30:
opening `/rate-limit-options` by command, then sending the wake-shaped paste
and Enter, discarded the text and selected the focused menu option. The
menu closed, the composer stayed empty and no model turn began. None of the
four registered hooks (`Notification`, `UserPromptSubmit`, `Stop`,
`StopFailure`) fired for that interaction.

That measured the command-opened menu, **not an actual exhausted limit**.
The source's reading of bundled code, not a live limit test, supplied the
conclusion that a subscription-limit message can open that menu automatically
and that a trial-expiry dialog can open similarly at startup. Keep those
proof levels distinct; do not infer which hooks precede a real limit or
which option a different configuration would select.

The proposal also reports the inverse case: refusing a permission dialog
leaves its claim until a later prompt. The implementation PR describes Esc
and the dialog's refusal option with a broader event logger: no clearing
hook fired, and the next prompt cleared the claim. Those are reported
observations on the same Claude version, not tests repeated by this harvest
or a universal assertion about future harness versions.

# What a kernel expert should do differently

- **Treat support as an evidence statement, not protection.** The
  [per-start hook decision](../decisions/dialog-claim-support-is-a-per-start-hook-statement.md)
  records why `on-claims` was chosen. Hook installation alone cannot
  establish complete dialog coverage; extensions can add another dialog
  surface without changing the base harness.
- **Preserve the safe failure direction.** Under the
  [withholding decision](../decisions/waiting-claims-may-only-withhold-automated-input.md),
  a stale claim costs a late wake. Do not repair that inconvenience by
  automatically expiring it into input. A long hold calls for an authorized
  observer to inspect, not assume a live dialog or clear another producer's
  claim blindly.
- **Review reason semantics against the screen.** A failure reported as
  `attention` may still leave a menu that accepts Enter. The exclusion of
  attention from the hold depends on producer behavior, not on the error's
  name. Probing a generic provider error does not necessarily reproduce a
  subscription-specific dialog. The
  [failed-turn class lesson](failed-turn-claims-split-by-error-class.md)
  records which classes were measured to leave a menu and why `unknown`
  stays `attention`.
- **Do not mistake submitted input for model receipt.** A successful paste
  and Enter may only have acted on a dialog. This lesson supplies the
  counterexample, not a new delivery-acknowledgement protocol.

# Elimination route and limits

The robust architectural remedy would be a harness-supported input channel
that cannot answer UI dialogs, or a producer contract that covers the
relevant dialog lifecycle. A claim-based guard cannot manufacture either.
Improve reporting where hooks exist, but retain explicit unknown coverage
and the residual dialog-to-claim and read-to-input windows.

Automated real-harness regressions should distinguish menu input from model
consumption, exercise refusal and subsequent clearing, and qualify the exact
runtime and loaded dialog surfaces. Such tests can catch known regressions;
they do not prove all dialogs are hooked. This harvest changes no harness,
skill, scheduler or broker and certifies no complete mitigation.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-wake-holds-at-dialog, 2026-10-30; notes/claude-rate-limit-menu-takes-a-wake.md; notes/a-claim-may-only-withhold-a-keystroke.md; notes/item-4-claim-support-design.md.

The harvest read the [menu finding and coverage correction](https://github.com/awebai/oats/issues/1670#issuecomment-6526356580),
[reported refusal observation](https://github.com/awebai/oats/issues/1670#issuecomment-6526873932),
and [implementation PR's checks and limits](https://github.com/awebai/oats/pull/1673)
at open head `78858899d`. These corroborate what was reported, not an
independent reproduction. One host and one tested Claude version bound the
runtime evidence; subagent dialogs, elicitation dialogs and other versions
remain unqualified. Exact timing samples belong with the implementation's
versioned evidence, not a universal safety threshold here.
