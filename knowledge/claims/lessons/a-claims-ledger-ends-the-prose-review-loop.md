---
type: Lesson
title: "For a proved or tested spec, a claims ledger ends the prose review loop; fixing each reading's findings does not"
description: "Independent readings of a formal model's prose kept finding 6 to 12 new overclaims a round in sentences nobody had listed, while the result rows stayed clean. Listing every non-row sentence with what makes it true, cutting retellings, and deleting before rewording made the findings converge."
about: [workstream/coordination]
kind: lesson
tags: [review-loop, formal-model, documentation, convergence]
timestamp: 2026-11-28
---

# What happened

A Lean model of a trust system had a table of result rows, each naming its theorem, and explanatory prose around it. From the fourth independent reading on, the rows were clean, but every reading found 6 to 12 new overclaims in the prose. They were in different sentences each time: summaries, "in short" lists, and words like "the fewest" or "never" written from what the author meant rather than from the definitions. One act a summary forgot was enough to make it false.

Three rules made the loop converge:
- every theorem's doc opens with a plain restatement of its statement, premises first and with no headline;
- every other sentence about the model gets a line in a claims ledger naming the definition, act, result, source or assumption that makes it true, or it is cut;
- a finding is fixed by deleting before rewording. If a definition, restatement or row already carries the sentence's content, the sentence goes. Otherwise it becomes a near-literal reading of the definition. Nothing new is added.

With the ledger, readers check a finite list and look only for sentences outside it. In later rounds the findings fell to minor ones, and most were in sentences written to fix the round before.

# How to apply

- Use this for any spec, model or design document with a proved or tested core and a narrative around it.
- Put a build check behind the ledger where you can: here, a name check failed the build when the prose cited a name that does not exist.
- A cited theorem must connect to what it is cited for. A prover checks that a proof is correct, not that the statement says what the citation needs: one existential theorem held for every key, because its witness was an unrelated record and its hypotheses were never used.
