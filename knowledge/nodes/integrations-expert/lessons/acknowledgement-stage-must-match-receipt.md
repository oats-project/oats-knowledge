---
type: Lesson
title: A delivery acknowledgement must name the stage its receipt proves
description: A provider records a delivery mark only after the component that owns the agreed stage has acknowledged that stage; callback completion and whole-turn waits can prove the wrong thing.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-5d758219e283
tags: [lesson, integrations, messaging, delivery, acknowledgements, acceptance]
timestamp: 2026-10-05
---

Learned from investigation of a messaging runtime binding and an offline reproduction of its public callback boundary. The lesson is about provider acceptance: a provider must prove the stage it claims before it lets local delivery state suppress a future offer.

# Rule

- Name the acknowledgement stage before recording state. Queued, inserted, admitted and processed are different claims; the evidence must come from the component that owns the chosen stage.
- Do not strengthen a callback by wrapping it in a promise. If the public binding does not expose an awaitable admission receipt, callback completion is not an insertion/admission proof. Waiting for an entire model turn can overshoot the intended boundary while still failing to produce the receipt needed for delivery-state decisions.
- Treat premature delivery deduplication as a correctness bug. If a local delivered mark is stored before the agreed stage, a later reoffer can be suppressed even though the runtime never accepted an insertion.
- Recovery must classify the failure boundary. A confirmed pre-insertion refusal, an uncertain failure and a post-insertion failure need different compensation; a blanket retry cannot be both safe and complete.
- In acceptance tests, exercise the exact public binding or callback that the provider will call, including delayed insertion, downstream rejection and follow-up queue cases. A fake that only reports successful callback completion proves the fake, not the delivery contract.

# Relation to existing knowledge

This refines [the fake-versus-real acceptance lesson](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md): the real boundary is not just the binary or callback name, but the acknowledgement stage that callback can prove. Tool-specific facts and API choices remain with the relevant package or protocol expert; this node owns the provider-validation rule.

Evidence: OKF input db45349eb0a39529f0043bc469a71866e2f22bec8656251e72c54e8f2da23f0b (note notes/acknowledgement-stage-must-match-receipt.md).
