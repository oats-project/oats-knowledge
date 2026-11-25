---
type: Lesson
title: In bb, service tiers belong to the provider, and a reasoning level a model does not list is silently dropped
description: bb-app 0.50.1 lists service tiers per provider (Claude Code default and fast, pi none), and a model row with no supportedServiceTiers takes every tier of its provider; bb accepts any reasoning level at spawn, but one the model does not list (or "default") starts Claude Code with no effort at all, and a spawn with none gets bb's own medium rather than the model's listed default. Nothing is remembered between spawns, and bb refuses an unlisted tier only at spawn, after a launch's first effects. Read bb's guides before reading meaning into its JSON, and check choices against bb's lists before anything starts.
about: [workstream/provider-integration]
kind: lesson
id: ins-695d9388afe1
tags: [bb, reasoning-level, service-tier, launch-choices, provider]
timestamp: 2026-11-25
---

# What was observed (bb-app 0.50.1, contract tests of oats-bb's launch choices)

- `bb provider list --json`: claude-code `serviceTiers` [default, fast]; pi none. `bb guide providers`: a model's `supportedServiceTiers` is "absent when the provider does not report tiers per model, in which case the model accepts every tier the provider lists". A first build read a row with no list as "no tiers", and would have refused Claude's fast mode, the only tier beyond the default. A review round caught it.
- `bb thread spawn --service-tier fast` on Claude starts it with fast mode on. An unlisted tier is refused by bb at the spawn, after the launch has already stopped the home's earlier thread and made its project.
- A level the model lists starts Claude Code with `--effort=<level>`. An unlisted level, or `default`, starts it with no effort at all, and nothing says so. A spawn with no level gets `--effort=medium`, not the list's `defaultReasoningEffort` (high).
- Nothing is remembered from one spawn of a project to the next.

# What to do

- Read `bb guide providers` and `bb guide json` before reading meaning into a bb JSON shape.
- A provider checks a chosen level and tier against bb's own lists (the model's where it has one, else the provider's) before anything starts, and the kernel records the choice, since bb won't remember it.

The kernel side of recording a choice is oats-project/oats#2141 (KP-14, `--launch-choice`, merged 2026-11-25). The provider's check is the elimination route; on 2026-11-25 it was on an oats-bb branch with no PR (citation 2).

# Citations

1. The decision KP-14 on oats-project/oats#2122 (comments 7163077163 to 7163175022, 2026-11-25): oats-bb refuses a level or tier the model does not list in `bb provider models` before anything starts; oats-project/oats#2141 builds the kernel's part.
2. oats-project/oats-bb branch `agents/kp14-launch-choices` at 8b86d52f (no PR, 2026-11-25): `README.md` ("Why the provider checks, by what bb does": `--effort=medium` with no level, no effort for an unlisted level or `default`, the `bb guide providers` passage on `supportedServiceTiers`, bb's spawn-time refusal of an unlisted tier, nothing remembered between spawns), pinned in `test/contract/contract.test.mjs` at bb-app 0.50.1; commit 8944646 ("a service tier is the provider's, as bb lists it", review r2) corrects the first build's reading. The probes' outcomes are source-reported from those contract tests.
3. Proposed in [oats-knowledge#481](https://github.com/oats-project/oats-knowledge/pull/481) by oats-engineering-expert/bb-backend-specialist, 2026-11-25; notes/bb-tiers-levels-facts.md.
