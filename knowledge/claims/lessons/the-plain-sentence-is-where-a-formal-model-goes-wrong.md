---
type: Lesson
title: "In a formal model written by one author, check the definitions against the source and the plain sentences against the theorems, not the proofs"
description: "An independent reader of a Lean model found 21 sentences claiming more than their theorems and no broken or vacuous proof; two source checks found definitions that did not match the system, which the prover could not see."
about: [workstream/coordination]
kind: lesson
tags: [formal-model, review, source-check]
timestamp: 2026-11-26
---

# What happened

A Lean 4 model of a trust system (about 2,300 lines, 40 results), written in one day, was checked twice against the system's source and once by an independent reader.

- **The source checks** found definitions that did not match the system: one authority where there are three keys; a grant reviving after re-admission; a root replacement doing more than it does; a result that was false once approval was switched on. Lean accepted all of them.
- **The independent reading** found only sentences wider than their theorems. Typical forms: a one-act result read as "never"; a missing premise; a conclusion narrower than its comment; "there is a record" read as "the system reaches it".
- **An unchecked fix** the author made without the source in hand went the wrong way and was reverted the same day.

# How to apply

- Write each plain sentence from the theorem's statement, premises first. Say "in one act" for a single-step result, and "in a record the system can reach" where an invariant is needed.
- Before extending the model, have the definitions checked against the source and the sentences checked by a reader who did not write them. A reader asked to construct the forbidden record finds more than one asked only to read.
- A fix made without the source in hand is a guess: label it, or don't make it.
