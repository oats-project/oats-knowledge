---
type: Decision
title: The wake broker marks mail read only after presenting it in the agent's own turn
description: Permit the wake broker to mark mail read only after accepted presentation in the agent's own turn, with recoverable message ids and bounded accepted inputs, preserving the rejection of invisible acknowledgement and hint-only wakes.
about: [workstream/oats-direction, workstream/messaging, workstream/provider-integration]
id: dec-0c60a8fdf4b7
tags: [messaging, runtime, recovery, wake, supersession]
timestamp: 2026-11-19
---

# Decision and rationale

On 2026-11-19, partially supersede
[runtime, messaging and viewer ownership](runtime-messaging-viewer-ownership.md)
(`dec-1328de872184`): replace its blanket rejection of a broker fetching or
acknowledging mail for an agent with rejection of **a broker that marks mail
read without presenting it in the agent's own turn**.

The purpose is to prevent the invisible loss of a read-marked message the
agent never saw. The old wording would reject session delivery even when it
presents the full event in the agent's own turn. Accepted presentation may
therefore authorize marking read under the conditions below; it never proves
that the agent completed the work.

A wake remains a hint for hint-only delivery modes, including the channel.
This narrowing concerns marking read; it does not change who fetches mail
(the agent, under its own identity), the kernel/messaging/viewer ownership
split, or the original recovery requirement of one live identity holder.
It applies to non-channel delivery paths generally, not only a bb backend.

# Four conditions

1. **Confirmed submission before marking read.** Accepted presentation means
   the kernel's session input returned `submitted: true`. If submission is
   false, uncertain or errored, nothing is marked read. A session provider
   returns `submitted: true` only on its runtime's confirmed acceptance; for
   bb, a dispatched tell qualifies and a queued tell never does.
2. **Recoverable event.** The presented event carries `message_id` and a
   Recovery line so the agent can recover the exact mail.
3. **Recovery teaching in every home.** Session-delivery instructions state
   that read state is not completion. Reconcile handling by `message_id`;
   an already handled id is a duplicate, not authorization to repeat work.
4. **Bounded accepted inputs.** At most one accepted input per mail and one
   turn per accepted input. A later presentation after a refused or queued
   input may be accepted; the agent deduplicates by `message_id`.

These are the decided acceptance conditions, not a certification of every
runtime's implementation. In particular, the [bb queued-tell
finding](/claims/lessons/bb-tell-answers-sent-in-ordinary-states-and-queued-drains-itself.md)
records that a queued tell can drain autonomously: a provider must reconcile
that behavior with these conditions rather than blindly retrying it. The
[bb restart finding](/claims/lessons/a-bb-restart-holds-broker-mail-but-strands-a-steered-wake.md)
also shows why acceptance and read state cannot stand for completed work.
Condition 1 matches the provider rule in [a session backend other than tmux
is a session provider](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)
(`dec-faf9af131d69`), decided the same day: a message the backend only
queued is not a submission, and in doubt the answer is "not submitted",
because a duplicate delivery is recoverable and a loss is not.

# Rejected alternatives

- **Keep the blanket prohibition on acknowledgement.** It would prohibit
  presentation-based session delivery rather than preserve the original
  protection against unseen consumption.
- **Mark read without presentation in the agent's own turn.** This recreates
  the original invisible-loss failure, even if transport delivery succeeded.
- **Count a queued tell as accepted presentation.** Queueing alone does not
  meet the confirmed-acceptance condition.

# Acceptance and evidence

The original decision was accepted on 2026-09-05 from the operator's
requests. Acceptance of this narrowing is **source-reported**, not
independently verified:

- **Pepe, 2026-11-19:** the source reports that product-maintainer agreed in
  thread `c7e66f8c` under Pepe's standing instruction that day to approve the
  bb work once correct.
- **Juan, 2026-11-19:** the source reports the oats-expert-juan maintainer
  call in thread `a72d4273`, followed by Juan's acceptance of bb contract r6,
  relayed by the team's aweb identity. No private message is quoted here.
- The source places the agreed narrowing in item 5 of decided bb contract
  r9, SHA-256 prefix `200a2b21fa95c8a9`. The contract and private threads were
  not read by this harvest; these locators identify the source's report.

The note reports session delivery in aw >= 1.36.21 (source-reported). At
maintainer review, awebai/aweb at `ecb9d825` was read: the broker's session
client returns `E_NOT_SUBMITTED` unless `oats session input` reports
`submitted: true`, and its comment says that means the bytes reached the
target and is never consumption [2]. The accepted [bb restart
finding](/claims/lessons/a-bb-restart-holds-broker-mail-but-strands-a-steered-wake.md)
read the same behaviour in aw 1.36.58. This is the motivating implementation,
not proof that every runtime meets the four conditions.

This refines, without superseding, [waiting claims may withhold an automated
keystroke but never authorize one](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md)
(`dec-fb8025c7cafd`). That decision's scope and input-safety limitations remain
its own; read acknowledgement does not grant input authority.

# Citations

1. Evidence: OKF proposal from oats-maintainer/product-maintainer-juan, 2026-11-19; notes/wake-broker-presentation-narrowing.md. The human acceptance, the private threads and bb contract r9 are source-reported.
2. [awebai/aweb at `ecb9d825`](https://github.com/awebai/aweb/blob/ecb9d825aa17/cli/go/wake/session/session.go), `cli/go/wake/session/session.go` (`Client.Input` and `ExecClient.Input`), read at maintainer review of oats-knowledge#420 on 2026-11-20.
