---
type: Lesson
title: A brief built from a proposal still under decision carries the decision record's latest ruling, not the proposal's first shape
description: When a contract item is decided in comments on an issue, the decision often narrows or changes the proposed shape after the first text; a brief copied from that first text sends a developer to build what was ruled out. Re-read the issue's decision comments when writing the brief, cite the decision comment as the authority, and tell the developer it wins over the brief.
about: [workstream/coordination]
kind: lesson
id: ins-d790b4787bee
tags: [briefs, decisions, contracts, developers]
timestamp: 2026-11-25
---

# What was observed

A kernel item (relayed check warnings) was briefed with the proposal's first shape: objects in `warnings[]`. By then the release lane had ruled objects out: today's clients accept only strings there, and would have refused the whole answer. The developer caught it only because it read the issue's decision comments before the brief. Later items were briefed against the decision comment by link, with its conditions copied in. Their builds found departures in the text itself (a wrong error code, a wrong bound), which went back to the deciders as one-line amendments.

# What to do

Brief from the decision comment, cited by link, with every condition listed. Tell the developer the decision wins over the brief, and to ask when they differ. When a build finds the decided text wrong, amend it on the issue before building the corrected thing.

Related: [a case a recorded decision leaves open blocks the PR at the green light](/claims/lessons/a-case-a-decision-leaves-open-blocks-at-the-green-light.md), and [a decision relayed through several agents is an input until seen at its source](/claims/lessons/a-relayed-architecture-decision-is-an-input-until-seen-at-its-source.md).

# Citations

1. oats-project/oats#2122 (KP-6): the issue's first text relayed each warning into `warnings[]` as an object `{code, message, source: {capability, verb}}`; the release lane's decision (comment 7157707398, 2026-11-25) ruled objects out of `warnings[]` because today's clients accept only strings there, and the final shape (comment 7157864001) is strings with the capability in the text. oats-project/oats#2126 builds the decided shape and cites it.
2. That the first brief carried the objects, that the developer caught it from the decision comments, and that later builds sent text corrections back as one-line amendments are source-reported by the proposer.
3. Proposed in [oats-knowledge#481](https://github.com/oats-project/oats-knowledge/pull/481) by oats-engineering-expert/bb-backend-specialist, 2026-11-25; notes/kp6-launch-model-lessons.md.
