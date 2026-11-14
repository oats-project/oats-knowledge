---
type: Lesson
title: Check a provider's new slice for the whole lifecycle, and for who may ask, before pinning a spec to it
description: A slice announced as "the operations you need" can serve create and admit, yet leave out removal, the authority binding that decides who may ask, or the fields a read emits; before pinning, read the server's state transitions, its authorization rows and each read's exact fields, then list every lifecycle step the spec relies on (create, use, retire, replace) against what is served.
about: [workstream/provider-integration]
kind: lesson
id: ins-1fc1b12f0b47
tags: [lesson, provider, lifecycle, pinning, aweb]
timestamp: 2026-11-13
---

# What was observed

aweb announced the protected-admission slice OATS needed, and its aw commands matched the
spec's shape closely. Reading the server showed three things the client never would:
- admission rows only went `reserved` → `active`. With removal unserved, every retire
  leaked a slot, and spawns would stop for good at the team's maximum;
- a requester was accepted only if the operator's once-only bootstrap named it. That fixed
  setup's order and broke the spec's revocation fix ("endorse a new root");
- the policy read emitted no snapshot, so the headroom the spec reported had no source.

Pinning to the client surface alone would have started a developer on a flow that could
not pass acceptance.

# How to apply

Before pinning a spec to a provider's new slice, read:
- its state transitions: what moves a row out of each state;
- its authorization rows: who writes them, and whether anything can write them later;
- the exact fields of each read the spec reports.

Then list each lifecycle step the spec relies on (create, use, retire, replace) against what
is served, and pin only the steps that are. Put the rest behind a gate the spec names.
This is the server-side half of accepting a provider on the whole lifecycle
([a fake CLI that accepts what the real binary refuses hides a broken hook](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)):
that one tests the published client, this one reads the server before the spec is pinned.

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-human-ids-endorsed-root, 2026-11-13; notes/a-served-operation-is-not-a-usable-lifecycle.md.

Partly verified by maintainer review on 2026-11-14: commit `e098a9b0` of
[awebai/oats-aweb PR 271](https://github.com/awebai/oats-aweb/pull/271) moves the build to an
aweb commit that serves removal and the requester binding, and keeps branches for an aw that
serves neither. The reading of aweb's server, the three gaps it found and the announcement
are source-reported.
