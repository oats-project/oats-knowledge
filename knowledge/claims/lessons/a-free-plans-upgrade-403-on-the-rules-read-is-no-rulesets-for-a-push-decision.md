---
type: Lesson
title: For a direct-push decision, the rules read's plan-upgrade 403 counts as no rulesets
description: A private repository on a plan without rulesets answers `rules/branches/<b>` with 403 "Upgrade to GitHub Pro or make this repository public"; a setup skill deciding whether it may push straight to the default branch counts that as 0 rules, with the classic read still deciding classic protection, while oats okf's protection report keeps reading it as unknown.
about: [workstream/operations]
kind: lesson
id: ins-c1ffa404a770
tags: [lesson, github, branch-protection, rulesets, onboarding, getting-started, setup]
timestamp: 2026-11-20
---

# The lesson

The getting-started skill counted any failure of either protection read as a guarded branch. On a private repository
whose plan has no rulesets, the rules read answers 403 "Upgrade to GitHub Pro or make this repository public to enable
this feature.", while the classic read (`branches/<b> --jq .protected`) succeeds with `false`. The skill therefore
opened a pull request that the person, the repository's only pusher, had to merge.

That 403 is a statement about the plan, not about the caller's permissions: a plan without rulesets has no rulesets
to enforce. For a decision to push straight to a default branch, it counts as 0 rules. Every other failure (a 404 Not
Found, any other 403, an unreachable API) stays unknown and still takes a pull request, and so do more than one
collaborator, classic protection and a refused push.

This refines [GitHub branch-protection reads answer in three ways](/nodes/oats-okf-expert/lessons/github-branch-protection-reads-answer-in-three-ways.md)
(`ins-805976e4ce00`) for push decisions only. That lesson's `unknown` for the plan 403 stays right for `oats okf
bases`, which reports protection and decides no push.

# Check the sibling skill first

oats.setup's `oats-workspace-config` ("Change a shared file", check 5) already stated this rule, so the getting-started
skill had drifted from it. When a skill misreads an API answer, look for a sibling skill that already records the rule
before treating the fix as a new decision. Then pin both texts in one test so they can't drift apart again.

# Evidence

- OKF proposal from oats-engineering-expert/getting-started-hosted-findings-lead, 2026-11-20; notes/free-plan-upgrade-403-means-no-rulesets-for-a-push-decision.md.
- Source-reported (the proposer's notes, and the body of oats-project/oats#2008): a hosted regression VM run of the
  getting-started skill on 2026-11-19 (OATS 0.69.20), in which `.protected` printed `false` and the rules read
  answered the 403 above; and Pepe's yes to the fix, given in the lead's session on 2026-11-20.
- Verified by the maintainer review on 2026-11-20 at oats-project/oats `bcffcd23`, the merge of
  [oats-project/oats#2008](https://github.com/oats-project/oats/pull/2008) on 2026-11-20: the getting-started skill's
  step 7 counts the upgrade 403 as 0 and sends every other failure of either read to a pull request;
  `oats-workspace-config`'s "Change a shared file" check 5 states the same rule; and a test in
  `test/getting-started-steward.test.mjs` asserts both texts.
