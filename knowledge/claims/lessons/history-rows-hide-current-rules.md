---
type: Lesson
title: A skill's version-history rows carry current rules, so moving them out needs a row-by-row audit and a check of the open PRs
description: Before a skill's per-release table or upgrade sections move to docs, audit each row against the code for a rule that still holds and has no other home in the skill, keep that rule as a current sentence, grep the tests for pinned sentences, and check the open PRs that change the rule before restating it.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-8fce1e940662
tags: [lesson, skills, docs, review]
timestamp: 2026-11-19
---

# What was observed

The `/oats-aweb` skill carried a 13-row provider-version table and two host-upgrade
sections. Moving them to the package's `docs/provider-history.md` (awebai/oats-aweb
issue 285, PR 287) seemed like a plain move. But five of the moved facts were current
rules that nothing else in the skill said:

- `oats instance upgrade` moves a stopped home;
- where a grant seat gets its registry;
- `oats teams default` is the operator's decision, a sentence a test pinned;
- the 10-second wait for the custody's grant list;
- how a failed aw call is reported.

The author's audit found three of them, and a reviewer's row-by-row audit against the
code found the other two. A test that reads the skill pins the `oats teams default`
sentence; that it failed until the sentence got a current card is the author's report.

Then the second reader returned one restated rule, the grant seat's registry. It was
true on main, but an approved PR about to merge removed that behaviour.

# Rule

- For each row or paragraph you remove, ask: is this still how the code behaves, or
  what someone must do today? If it is, and no current card says it, keep it in the
  skill as a current sentence, without its version label.
- Grep the tests for sentences in the moved text before you move it.
- A restated rule is a claim about today's code. Check the open PRs that touch it
  before you write it.
- Link the history from the skill by URL: a home gets the skill, not the package's
  `docs/`.

Evidence: OKF proposal from oats-engineering-expert/aweb-newcomer-findings-lead, 2026-11-19; notes/history-rows-hide-current-rules.md. awebai/oats-aweb PR 287 (merged as 431b84e0): review round 1, and the second reader's return at dcc7d3a.

Verified by the knowledge maintainer at review on 2026-11-19 against [awebai/oats-aweb#287](https://github.com/awebai/oats-aweb/pull/287), merged as 431b84e0: the first commit (b5cf053c) keeps `oats instance upgrade`, the grant seat's registry and the `oats teams default` decision as current sentences; "Review round 1" (de8220d1) adds the 10-second grant-list wait and failed-call reporting from the moved 1.25.1 row; the second read's RETURN at dcc7d3a5 names the grant-seat registry sentence as behaviour that the approved, not yet merged awebai/oats-aweb#284 removes, and 6e1d17e0 replaces it. `test/resident-docs.test.mjs` at 431b84e0 checks that the skill says `oats teams default` is the operator's decision.
