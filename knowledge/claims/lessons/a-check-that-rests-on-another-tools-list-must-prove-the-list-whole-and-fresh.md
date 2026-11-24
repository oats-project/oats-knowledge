---
type: Lesson
title: A check that refuses by another tool's list must first prove that list whole and fresh
description: Refusing what a list does not contain is only sound where the list is what the consumer resolves against, complete for that id and current; read the consumer's own resolution code first, and where the list can be partial or stale, warn instead of refuse, and end every refusal with the way out.
about: [workstream/provider-integration]
kind: lesson
id: ins-c84ccbd2834d
tags: [validation, bb, pi, false-refusal]
timestamp: 2026-11-24
---

# What was observed (oats-bb #65, bb-app 0.50.1, pi 1.5.2, 2026-11-23)

The pi model check refused an id `bb provider models pi` did not list. Two review rounds found majors: the list is a
SUBSET of what bb's resolvePiModel accepts (dated ids are held back; pi's `enabledModels` narrows it, and bb keeps the
set its pi started with), and bb's server serves a list fetched up to 60 s ago, or any age when its refresh fails,
with no error. Each would refuse a model bb runs; reading bb's code (host.js resolvePiModel, the catalog store) settled
them faster than review rounds did.

# What follows

The check refuses only where the list is provably whole for that id (no enabledModels, configuration older than bb's
start, not a dated id) and the configuration has not changed in the last 90 s; otherwise it warns. Each refusal ends
"(if you just added it to pi, try again in a minute)", and the remaining wrong-refusal cases are named in the docs.
A soul's real model (a bare id one provider serves) is pinned as passing in both set-ups.

# Citations

1. oats-project/oats-bb#65 (merged 2026-11-24): the check mirrors bb-app 0.50.1's `resolvePiModel`; "not listed" refuses only where the list is whole for the id (no `enabledModels`, settings older than bb's start, no home `.pi`, no dated id); the review table's round-1 major on a stale `enabledModels`; the soul's bare model pinned as passing in both set-ups.
2. oats-project/oats-bb `README.md` (the refusal texts ending "try again in a minute", and the two remaining wrong-refusal cases) and `docs/wire.md` (bb's 60 s list, the 90 s window), and `pi-config.mjs` `LIST_AGE_MS = 90_000`, read on main, 2026-11-24.
3. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
