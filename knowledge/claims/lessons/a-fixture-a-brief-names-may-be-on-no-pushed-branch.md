---
type: Lesson
title: "A provider fixture a brief names may be on no pushed branch: check it exists, else pin the shape from the provider's code at a commit"
description: "A decoder fix's brief (oats issue 2138) named another effort's recorded fixture as the shape to test, but no pushed branch of its repository held it; the provider's own code at its default branch gave the same shape, citable at a commit."
id: ins-1c15ab0975ee
about: [workstream/coordination, workstream/provider-integration]
kind: lesson
tags: [briefs, fixtures, evidence, contracts]
timestamp: 2026-11-25
---

# What happened

The issue and the brief for a decoder fix cited a fixture in oats-bb as the provider's recorded
answer. Neither oats-bb's `main` nor any of its pushed branches held the file: it lived in that
effort's unpushed work. The test pinned the shape from the provider's code instead (oats-aweb
`identityRows` in its mail read), and the PR said so.

# The lesson

A "recorded fixture" from another effort may be local to that effort. Check that it exists where the
brief says before planning a test around it. Where it doesn't, the provider's code at a pushed commit
is the next-best evidence, and it can be cited. Say the substitution in the PR, so the second reader
doesn't look for the fixture.

Relates to: [a detail added to a contract must widen closed client decoders](/claims/lessons/a-contract-detail-must-widen-closed-client-decoders.md) (it asks for a fixture from the provider's real answer).

# Citations

1. oats-project/oats issue 2138 (names the fixture `plugin/test/fixtures/mail/mail-identity-missing.json`
   in oats-bb) and PR 2139 (merged 2026-11-25; its Evidence section records the substitution).
2. oats-project/oats-bb, checked at review: no branch of the 118 then pushed holds a file of that name.
3. awebai/oats-aweb at a035ebdd: `identityRows` in `oats-package/capabilities/oats-aweb/lib/mail-read.mjs`
   writes `alias` and `identity` as `''` for an identity it could not read.

Evidence: OKF proposal from oats-engineering-expert/mail-identity-decoder-lead, 2026-11-25; oats-project/oats issue 2138 and PR 2139; notes/fixture-named-in-a-brief-may-be-unpublished.md.
