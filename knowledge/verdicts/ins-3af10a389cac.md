---
type: Verdict
title: "Duplicate: Hashing a copy an agent can write and then running it is a race; run a copy the agent cannot reach"
description: The proposed lesson restates what the human-accepted sandbox decision already records, so it was not accepted and the decision stays its one canonical home.
verdict: duplicate
claim-type: Lesson
claim-title: Hashing a copy an agent can write and then running it is a race; run a copy the agent cannot reach
claim-description: A kernel that checks a module copy inside an agent-writable home by hashing it and then runs it from there can be beaten by a process swapping the file between the hash and the run, for the whole of node's start-up and of the command; OATS instead keeps its own copy of a provider home's modules outside the home and runs only that.
title-hash: 6e62f634742e401d
canonical: dec-375435ce318a
reason: The decision's "The kernel runs its own copy" section already records the race (3 of 11 inspects), its window (start-up and the whole run), the kernel's own copy outside the home, the hook path into it and the earlier finding it closed, and its coherence rules state the general rule (a check of something the checked party can write, then its use, is a race; ask for a copy it cannot write). The proposal adds only the copy's on-disk path, which the repository documents.
pr: https://github.com/oats-project/oats-knowledge/pull/448
decided-by: knowledge maintainer
decided-on: 2026-11-21
---

The proposed lesson (never accepted, so it has no path in the base) is a duplicate of
[a harness sandbox in a provider home is not a security boundary unless the agent cannot switch it off](/nodes/oats-maintainer/decisions/a-harness-sandbox-is-not-a-boundary-unless-its-switch-is-out-of-reach.md)
(`dec-375435ce318a`), sections "The kernel runs its own copy" and "Coherence rules a maintainer applies".
A later proposal with new evidence says `reconsiders: ins-3af10a389cac`.
