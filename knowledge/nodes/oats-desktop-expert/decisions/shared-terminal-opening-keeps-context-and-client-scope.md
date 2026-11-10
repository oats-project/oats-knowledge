---
type: Decision
title: Shared terminal opening keeps invocation context and client scope
description: Interpret attach outcomes with the facts that give them meaning, add a client-specific action without changing another client's menu, and preserve both kernel refusal texts.
about: [system/oats-desktop]
id: dec-8e79f784e862
tags: [desktop, terminal, shared-code, contracts, rejected-alternatives]
timestamp: 2026-10-14
---
# Three choices for a shared terminal-opening boundary

The source records agreement on 2026-10-13 for the second client's terminal
opening. The durable choice is not an inventory of attach helpers: it is
which information and behavior may be shared without inventing meaning or
changing the first client accidentally.

1. **Interpret a status with its invocation context.** Return a semantic
   outcome rather than make every client compare numbers. In the reported
   kernel contract, status 20 means detachment by a key only for a keyed
   attach, and 255 means a link failure only for a routed attach. A
   status-only function assigns meaning where the producer has not promised
   it. Exporting constants alone leaves the interpretation duplicated in
   callers. Preserve unknown when the necessary context does not establish
   a meaning; the current status table belongs in the kernel contract.
2. **Share eligibility without expanding another client's action list.**
   The new `openAct` was placed beside `instanceActs`, not inserted into its
   `acts`: Desktop draws its menu from that list, so an additive shared verb
   would change Desktop in a move promised to preserve behavior. Derive the
   new answer from the existing eligibility result so precedence is written
   once. A later deliberate menu change is different from incidental API
   reuse.
3. **Keep a failed preflight's remedy beside its message.** The shared
   attributed renderer consumes both kernel texts. Dropping the envelope's
   `fix` before that boundary forces a client either to lose the remedy or
   reconstruct the producer's answer. This is the concrete composition
   choice; the general timing rule for checking an earlier spec against its
   built neighbor remains in
   [consumer-spec verification](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md).

# Deliberate limits

An attach's stderr can contain kernel, tmux and SSH prose. The decision did
not invent attribution by parsing those words: kernel-origin lines need a
producer mark before a client can distinguish them. That is a producer-side
elimination route, not proof that the limitation is permanent. Command
quoting for a person to paste was outside the chosen surface, not a general
ban on such a feature.

This complements [terminal viewers](terminal-viewers-not-session-owners.md),
which owns session and viewer authority, and
[shared terms and kernel prose](shared-readers-separate-client-terms-and-kernel-prose.md),
which owns presentation. It does not decide terminal-product permission.

# Enforcement

Keep invocation-context cases in the shared outcome tests, and verify the
existing client's action list stays unchanged when adding an action for a
new caller. Exercise preflight-to-renderer composition with both message and
remedy. These are repository protections for the choices, not a second API
specification or a claim that every case already has coverage.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-partner-desktop-queue, 2026-10-14; notes/4a-what-the-shared-home-gives-a-client-that-opens-an-agent.md.

The source identifies [awebai/oats#855](https://github.com/awebai/oats/issues/855)
(comments 6137903269, 6137979565 and 6137988436), reports agreement, and reports
[#1094](https://github.com/awebai/oats/pull/1094) merged as `d983c6ea` on
2026-10-13. These are source-reported decisions and delivery evidence, not an
independent audit or test run by this harvest. The follow-up
[#1096](https://github.com/awebai/oats/issues/1096) is not evidence here that
all Desktop call sites have already been consolidated.
