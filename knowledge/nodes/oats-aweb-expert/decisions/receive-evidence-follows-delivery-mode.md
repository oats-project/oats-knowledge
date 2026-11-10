---
type: Decision
title: Health receive evidence follows the delivery mode
description: The health publisher uses matching live and fresh native-stream receipts or fail-closed broker readiness according to delivery mode, because neither a leftover file nor a missing inapplicable receipt proves receive health.
about: [system/oats-aweb]
id: dec-9945f142d81d
tags: [oats.aweb, health, receive, receipts, readiness]
timestamp: 2026-10-15
---

The 2026-10-15 publisher decision distinguishes a native stream from session
delivery before judging its evidence. A receipt file can survive a crash;
file existence is therefore insufficient. Conversely, session delivery opens
no native stream and produces no native receipt, so requiring one would
systematically leave those homes without applicable proof.

For native delivery, the reported rule requires the receipt to identify the
agent (did:key for local identities, stable did:aw for global identities),
name a positive live PID, and carry a heartbeat at most 90 seconds old and
no more than 5 seconds ahead. A matching receipt with failed liveness or
freshness is evidence of a stream down; an absent or different-identity
receipt supplies no proof for this agent.

The 90-second allowance was chosen from the producer's cadence: the source
reports 30-second server SSE keepalives and adapter receipt refreshes at most
every 30 seconds on successful reads, never on a timer. That suggests roughly
60 seconds between the observer and the last recorded heartbeat under those
conditions, with margin in the chosen threshold. A timer-only heartbeat
would conceal loss of stream reads. Revisit the threshold when the producer
cadence changes; the estimate is not an unconditional latency guarantee.

For session delivery, use broker readiness. The reported assessment treats
unverifiable broker states as problems or receive warnings, making ready
without those warnings the positive evidence for that delivery mode. Its
failure to verify must remain visible rather than becoming a healthy default.

This is the publisher's receive-health assessment, not proof that a particular
message reached or was processed by the model. The shared
[acknowledgement-stage lesson](/nodes/integrations-expert/lessons/acknowledgement-stage-must-match-receipt.md)
owns that distinction; the protocol's receipt contract stays on the protocol
side. The messaging capability owns this application of the evidence, under
the [kernel/provider boundary](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md).

Evidence: OKF proposal from oats-aweb-expert/oats-aweb-expert-agent-health-publisher, 2026-10-15; notes/native-receive-proof-receipt.md.

The note attributes the cadence to aweb documentation and keepalive code at
4636fb9f9 and the decision to the coordinating expert's receipt rules. These
are source-reported evidence, not an independently audited protocol contract
or an explicit human acceptance receipt. The producer contract and consumer
regressions should enforce identity, liveness, freshness and delivery-mode
classification rather than relying on this knowledge record as a specification.
