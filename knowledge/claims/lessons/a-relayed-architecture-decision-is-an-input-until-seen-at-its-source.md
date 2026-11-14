---
type: Lesson
title: An architecture decision relayed through several agents is an input, not a decision, until it is seen at its source
description: A brief that hands the lead a person's architecture decision through a chain of agents can be wrong at the first hop; record each human decision with its provenance and hop count, and before a contract round built on a multi-hop relay is treated as settled or a developer starts on it, see the person's own message or record, or get it from the agent that relayed it first.
about: [workstream/coordination]
kind: lesson
id: ins-bc71b372bebe
tags: [lesson, provenance, relay, contract, coordination]
timestamp: 2026-11-11
---

# What was observed

An effort's brief carried a person's architecture decision through four hops: a
provider's coordinator, the other side's expert, the lead's maintainer, the brief. The
two sides agreed a contract on it over three revisions, and a developer built its first
slices. The same day the provider relayed that the person had approved no architecture;
others were still writing it up. The two sides' yes was a yes to the relay, so it fell
with it. The cost was a partial build and a day of contract work, both kept as a record,
none of it landable.

# Rule

- Record each human decision in the spec with its provenance: who said it, in which
  message, through how many hops ("source-reported" until seen at the source).
- For a decision the plan can't survive without (an architecture, a contract premise)
  that reached the lead through more than one hop, get the source before a developer
  launches: the person's own record, or the first relaying agent's. Read-only planning
  and probes may go ahead on the relay.
- When a relay is retracted, treat the contract as not agreed, stop the build at a clean
  point, keep everything, and ask the task giver whether to hold or retire.

This does not add a reconfirmation round for a decision the person's own agent relays
in the decided form: the review protocol keeps trusting that, and treats any other relay
as a proposal ([how the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md),
"a yes on first reading is not a decision"). A multi-hop relay is not that form; this
lesson says what to do before building on one. It carries the relayed-word safeguard
(a relayed yes grants no tag) from safeguards to the plan's premise.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-human-ids-endorsed-root, 2026-11-14; notes/a-relayed-architecture-decision-is-not-the-decision.md.

The relay, its four hops, its retraction on 2026-11-11 and the cost are source-reported;
no record of them was read at review.
