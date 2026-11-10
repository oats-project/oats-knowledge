---
type: Decision
title: Manual execution keeps CLI authority and requires an informed press
description: When a Desktop verb gains an execution effect, preserve the CLI's manual-action authority and map informed confirmation to the kernel's explicit intent flag rather than adding a trust gate.
about: [system/oats-desktop]
id: dec-1302c5eb1b11
tags: [desktop, consent, cli-authority, triggers, trust]
timestamp: 2026-10-09
---
# Decision and rationale

The source records a 2026-10-09 maintainer decision, with the generalist
expert concurring: testing a capability trigger source remains available on
untrusted rows, but requires an informed second press [1]. This applies
[CLI authority](standalone-product-and-cli-authority.md), not a new Desktop
permission model.

Host automation trust consents to automatic runs; it is not the authority
for this manual action. The capability command is already runnable on the
host. The untrusted row is precisely where an operator needs to inspect the
result before granting automation trust. Hiding Test there would force a
blind trust decision and make Desktop narrower than the CLI. Conversely,
a familiar button must not silently acquire execution merely because a
kernel release expanded the verb behind it.

# Deliberateness follows the effect

For a capability-source Test, the inline confirmation states, in Desktop's
own words, whose command runs on this host, now, once, and shows the
parameters it receives. It explains that testing an untrusted trigger does
not trust or start it, and that a trigger assigned to another host is still
tested here. Opening, cancelling or escaping the confirmation sends no test;
confirming sends exactly one. Consent covers that manual run only, never
trusting, enabling or scheduling the trigger. A Test that only reads, such
as the pull-request trigger's, remains one click.

Raise a newly executable verb as a **kernel contract question before
inventing a UI workaround**. Here the concern led to explicit manual intent
in the CLI: without `--run-source`, the kernel refuses source execution.
Desktop's informed confirmation maps onto that flag, composed by the backend
rather than accepted as renderer-supplied argv. The kernel therefore enforces
the missing-intent boundary for every caller, not just this view. Feature
support still follows the CLI's declarations, not optimistic invocation.

This distinguishes the confirm's effects from the page's ordinary recorded
state reads; see [effect-bounded confirmations](../lessons/asynchronous-intent-and-truthful-outcomes.md).
Parameters and other source-supplied prose use
[attributed text](source-prose-is-an-attributed-quote.md), not Desktop's voice.

# Rejected alternatives

- **Withhold Test on untrusted rows:** introduces a Desktop-only gate where
  maintainers deliberately left manual execution available.
- **One-click execution relying on capability trust:** a click is less
  deliberate than a typed command, and its parameters can come from a
  trigger file the host has not admitted for automation.
- **Probe with an unflagged test before deciding to confirm:** the first
  press must send no test, and the row already identifies the trigger kind.
  A refusal is a backstop for stale state, not a discovery mechanism.

The elimination route for accidental execution is the kernel intent gate
plus transport-boundary regressions: no test on open/cancel/escape, exactly
one flagged test on confirm, and a source-run log that stays empty without
the flag but records one run with it. Preserve the authority and consent
rationale even when those regressions exist.

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, received 2026-10-09; notes/manual-action-trust-matches-cli.md.

1. The note records the manual-versus-automatic trust decision and its later
   extension to explicit CLI intent on 2026-10-09. The proposal associates
   the implementation with [awebai/oats#845](https://github.com/awebai/oats/pull/845)
   and [#850](https://github.com/awebai/oats/pull/850), and reports keyboard-only
   and kernel-backed checks of the no-run/one-run distinction. Maintainer
   agreement and test outcomes are source-reported, not independently
   audited or rerun by this harvest; maintainer aliases alone do not prove
   human acceptance. The earlier note still marks the Desktop PR pending;
   the later proposal supplies the final flag name and reported outcome.
