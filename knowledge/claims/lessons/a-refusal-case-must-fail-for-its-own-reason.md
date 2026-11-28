---
type: Lesson
title: "A refusal test case must fail for exactly the rule it names, with an allowed neighbour one change away"
description: "Paired examples in a formal model all refused for expiry as well as for the rule under test, and generated refusals failed several premises at once; a single-fault guard and a one-change neighbour, checked by the generator, made each case able to tell an implementation that lacks the rule."
about: [workstream/coordination]
kind: lesson
tags: [testing, test-generation, formal-model, conformance]
timestamp: 2026-11-28
---

# What happened

A formal model's paired examples were meant to show that a change feed refuses a statement after a removal. The first review round found that every refused case had also expired, so an implementation with expiry and no feed would pass them. The second round found a witness whose clock was earlier than a change it had already applied. Every theorem was true, but the examples proved less than the rows claimed.

The model's test-case generator met the same problem: refusals that failed several checks at once agree with code that checks in any order, but they do not show that the named check exists. Requiring each generated refusal to fail exactly one premise exposed three model shapes where one fault implied another. Each was fixed by making the dependent check hold vacuously when its dependency fails.

# How to apply

- For each refused case, ask: "would an implementation that lacks this rule still refuse it?" If it would, the case tests something else.
- Make the generator check it, not the author: count the false checks (exactly one), give each refusal an allowed neighbour that differs in exactly one of setup, party or arguments, and refuse to write a case when another act on the same route allows the request.
- Keep the witnesses consistent with the model's own reading of its parameters, and prove that over all of them together rather than case by case.
