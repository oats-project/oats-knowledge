---
type: Decision
title: A launcher's prompt is the person's session input, not agent mail
description: Deliver an explicitly entered launcher prompt through kernel session input rather than reclassifying it as agent mail, with no automatic retry and an attach path that preserves uncertainty.
about: [workstream/provider-integration, workstream/messaging]
id: dec-f5c1fd231298
tags: [integrations, launchers, session-input, messaging, trust, delivery]
timestamp: 2026-10-26
---
# Choice and rejected alternative

For the reported desktop launcher, a prompt explicitly typed by the person
is their turn in the selected agent's session. Deliver it through kernel
session input, not messaging-layer mail. The source reports agreement with
the OATS expert and lane maintainer on 2026-10-23, replacing the brief's
mail-based approach.

The rejected route changes the meaning of the text: a mail envelope makes
it external sender content rather than the person's direct harness input.
The harness's caution about received mail is appropriate; the launcher
should not disguise that envelope as a user turn. The source also reports
a cross-team refusal when the desktop-side identity tried to contact a
team-local target. The existing [identity reachability lesson](/nodes/oats-operator-expert/lessons/a-team-local-identity-is-reachable-only-inside-its-team.md)
owns that boundary; changing identities or team membership is not the
remedy for choosing the wrong delivery surface.

This decision applies to the person's explicitly entered launch-time text,
not to arbitrary mail, retrieved content or an agent-authored prompt. It
does not authorize relabeling those inputs as human instructions.

# Consequences of choosing terminal input

Session input is a terminal operation with no exactly-once delivery
receipt. Keep the launcher's behavior within that proof:

- Never automatically retry the prompt. A failed or uncertain attempt may
  already have affected the session; absence of a reassuring display is
  not proof that a second submission is safe.
- `verified: false` is not itself a delivery failure. The kernel's display
  check is not model acceptance, and the launcher must not convert it into
  a resend trigger.
- After a fresh start, wait a bounded time for `running: true` before the
  input attempt. This is a startup guard, not proof that the harness is
  idle or has accepted a turn.
- If the session is already waiting on the person, send nothing and attach
  so the person can answer the actual prompt.
- If sending fails, report the failure or uncertainty and attach anyway.
  Do not claim confirmed non-delivery when partial effects are possible.

The implementation's current input and inspect contract belongs in the
[kernel desktop CLI API](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md),
not in a second launcher protocol. The elimination route is explicit
single-attempt control flow with regression cases for delayed startup,
waiting-on-human state, unchanged display and send errors. The durable
knowledge is why mail was rejected and why retry would overstate the
receipt; [acknowledgement stages](/nodes/integrations-expert/lessons/acknowledgement-stage-must-match-receipt.md)
remain the canonical provider-proof lesson.

# Scope relative to Desktop product decisions

The [runtime/messaging/viewer split](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
already assigns input and attach to the kernel. This concept records how a
launcher uses those operations; it does not give the launcher session
ownership or authorize a second persistent Desktop chat composer.

Nor is this a general claim that humans can never address agents through
mail. The maintainer's [human-thread direction](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
has its own human-identity and trust contract and was deferred on
2026-10-26. That direction and the Desktop owner's
[one-input-surface decision](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)
are not superseded here.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy-oats-standard, 2026-10-26; notes/launcher-prompt-is-the-persons-turn.md.

The named note supports the rejected mail route, no-retry choice, bounded
startup wait and attach-on-error path. The waiting-on-human condition and
maintainer agreement are stated in the proposal. It identifies
awebai/oats-omarchy#19 as implementation evidence. These are source-reported
findings from one integration; the harvest did not audit that PR or test
session delivery. The note's suggestion to announce non-delivery on any
error is narrowed to truthful failure or uncertainty, consistent with its
own warning that input has no exactly-once guarantee.
