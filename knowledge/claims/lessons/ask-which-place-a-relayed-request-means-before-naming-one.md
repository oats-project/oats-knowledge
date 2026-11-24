---
type: Lesson
title: Ask which place a relayed request means before answering with a named one
description: When a request reaches you through other agents with a vague place ('the pilot host', 'the server'), ask its author which place before answering with a concrete one: an answer's guess travels on as the requester's own words, and the next hop builds on it.
about: [workstream/coordination]
kind: lesson
id: ins-090f68803334
tags: [relay, requirements, hand-off]
timestamp: 2026-11-24
---

# What was observed (2026-11-23)

A release lane relayed a person's request to install a build on "the pilot host" for testing. The answer named one person's
laptop. That framing was carried on as the requester's: the laptop's owner was asked, and confused, about running it
for the other person, and a contract addition was justified partly by it. The requester had never named that host;
their own hosts were the obvious place.

# What follows

On a relayed request with an unnamed or vague place, the first reply asks the author (through the relay) which place,
and nothing is planned on a guess. A reply that must answer before that says "if X means <place>" explicitly.

Related: [an architecture decision relayed through several agents is an input until it is seen at its source](/claims/lessons/a-relayed-architecture-decision-is-an-input-until-seen-at-its-source.md),
the same failure for a relayed decision rather than a relayed place.

# Citations

1. The incident is source-reported from the proposer's coordination on 2026-11-23; no public record carries it.
2. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
