---
type: Lesson
title: Proposals are same-repository branches: the publication helper refuses a cross-repository PR, so there is no fork flow
description: The spec's fork-flow fallback for a host without branch-create was not built in 6.0 (the publication helper refuses a cross-repository PR, `E_PR_STATE`), and the reviewers approved its absence because one way to propose is simpler and keeps proposals where branch protection and the review trigger see them; such a host proposes through the operator form run from a host that has branch-create, and who gets branch-create stays each deployment's decision (D11).
about: [system/oats-okf, workstream/knowledge]
kind: lesson
id: ins-6b5209aace3e
tags: [lesson, okf, propose, publication, write-access, fork, d11]
timestamp: 2026-11-10
---

# The rule, and where it lives

The oats.okf README states the rule ("Give proposing hosts branch-create access"): proposals are branches of the
base repository itself, because the maintainer's publication helper refuses a PR whose `isCrossRepository` is not
false (`E_PR_STATE`). This lesson records why the alternative is gone, not the rule.

# The rejected alternative

The 6.0 spec offered a fork flow (`gh pr create --head <fork>:<branch>`) for a host whose account lacks
branch-create. The build did not implement it and the docs say so (oats-okf #131, "Known limits": "spec §7's 'or use
the fork flow' is not implemented"). The reviewers approved "no fork flow" as a contract point for two reasons: one
way to propose is the simpler shape, and a same-repository branch keeps proposals on the base repository, where
branch protection and the review trigger see them. Re-adding a fork flow means answering both, and widening the
helper's `isCrossRepository` refusal, not a docs change.

# What a host without branch-create does

Its push fails (`E_PUSH_UNCERTAIN`; the `cause` field is set only when Git prints a recognized client-side phrase,
so it may be absent). The deployment's person grants branch-create on the base, or an operator on a host that has it
runs the operator form, `oats okf propose --home <instance home> --soul <soul>` (README, "The operator form").

# Evidence

- oats-okf #131 (merged 10 November 2026): the body's proposing-hosts line and "Known limits: Forks". The
  contract point "no fork flow" was approved in
  [oats-expert-juan's review](https://github.com/oats-project/oats-okf/pull/131#issuecomment-6776644179), the
  [release lane's early read](https://github.com/oats-project/oats-okf/pull/131#issuecomment-6776659402) and
  [lane:setup's review](https://github.com/oats-project/oats-okf/pull/131#issuecomment-6776694291). These are agent
  reviews posted under their humans' accounts: approvals in review, not a human's own acceptance.
- The design's D11 row: `docs/design/2026-11-09-knowledge-base-by-subject.md` on the oats-okf branch
  `agents/kb-by-subject-okf-expert` (commit 9fa18f0), not on main.
- Maintainer check at acceptance (11 November 2026): those comments, the `isCrossRepository` refusal in the 6.0.2
  `okf-publication.mjs`, and the README's branch-create and operator-form sections.
- Backing note: none of the proposal's notes is specific to this lesson; it is the proposer's account of the 6.0
  build (proposal of 11 November 2026, live source kb-by-subject-okf-expert).
