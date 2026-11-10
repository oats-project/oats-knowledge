---
type: Lesson
title: Digest thread count is not human time or deadline safety
description: A three-per-arm routine trial reduced threads without reducing reported human minutes and delayed one deadline card in every digest run, so evaluate reading burden and deadline latency separately from batching.
about: [workstream/coordination, workstream/messaging]
kind: lesson
id: ins-1e51fe0be233
tags: [coordination, trials, routines, messaging, human-oversight]
timestamp: 2026-11-03
---
# Fewer conversations can preserve the same reading burden

A lead comparing a routing-only dispatcher with a continuing broker should
measure thread count, decision-card content and time-to-decision separately.
Putting the same full cards into fewer messages need not remove the work of
reading and deciding them. Batching also introduces a wait that is absent
from immediate forwarding; deadlines can make that wait consequential even
when total reading work is unchanged.

The source's 2026-11-02/03 routine trial compared three runs per arm over one
compressed fixture week with four routines:

- The **router** introduced and routed; routines wrote to the person directly,
  with a separate digest routine.
- The **broker** combined routine outcomes into one daily message and rendered
  the open approval cards in full.
- The source reports **2 threads versus 17 per week**, but about **12 human
  minutes per week in both arms**. Each approval card still reached the
  scripted person once; the source attributes the equal burden to retaining
  the full card text.
- One card was due at **11:00** while the digest arrived at about **12:24**.
  That same-day deadline was missed in **all three broker runs and none of
  the router runs**.

These are source-reported fixture observations and scripted-human accounting,
not a real-user time study. Three misses of one designed deadline case do not
mean every broker misses every short deadline or that all digests save no
time. The capture has no per-card timing ledger, uncertainty estimates or
control isolating card text from all other factors. Thread count is an
observed interface measure, not a proxy for attention saved or better
judgment.

# Test deadline handling before selecting continued brokering

A broker that immediately forwards cards due before the next digest and
batches the rest is a **candidate for another trial**, not a demonstrated
way to retain both benefits. The supplied runs did not test it. Deadline
visibility, delivery delay and the time needed to decide and act still matter;
a bypass rule alone establishes none of them.

The prevention route is to make deadline handling explicit in the dispatcher
contract and test it before adoption. Include cards due before, at and after
the next digest, and measure arrival, decision and required action separately.
Compare the bypass candidate with both existing arms using the same card
content and accounting. Treat missing deadline information as an unresolved
input to the design, not as evidence that waiting is safe. Those tests and
the bypass are not delivered or validated by this knowledge change.

The source also reports one duplicate outward action in a router run, with
different routine behavior between arms. That isolated event does not rank
the arms' safety. Nor does equal success on the scripted checks establish
safe behavior outside the fixture. The durable lesson is to qualify the
metrics, not declare a universal router or broker winner.

# Evidence and authority boundary

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-03; notes/a-digesting-broker-trades-threads-for-deadline-misses.md.

The source identifies Claude Sonnet 5.5, one fixture week, four routines and
a scripted person. Only the captured proposal and named note were inspected;
no runtime, cards, transcript or metrics were read and no experiment was
repeated. The reported counts do not measure long-term use, real human
fatigue, general safety or transfer to another model and workload.

The accepted
[front-door direction](/nodes/oats-maintainer/decisions/front-door-routes-and-introduces.md)
already separates intake routing from continued brokering and leaves the
latter open. These observations inform the lead's comparison; they neither
settle that pending choice nor supersede human direction. The
[routing research](/nodes/market-research-expert/conclusions/front-door-routing-evidence-2026.md)
owns the wider evidence gap, and the
[coordination redesign](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
owns adoption. No deferred client build, human-notification policy or
permission to act on a card is changed here.
