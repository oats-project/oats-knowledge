---
type: Lesson
title: When the target repository does not exist yet, build on a staging branch of an existing one and move the history with a tree-id proof
description: Work whose repository still waits on a decision can be built, reviewed and verified on a branch of an existing repository that is never merged there, then moved with its history; the move is proven by the two trees having the same git tree id, and only the changes the new place needs are reviewed again.
about: [workstream/coordination]
kind: lesson
id: ins-df69f1883ea6
tags: [staging, repository, history, verification, parallel-work]
timestamp: 2026-11-20
---

# What happened

A plugin was specified while its repository was still to be created by another lane. Waiting
would have idled two developers for most of a day. The lead directed a staging branch instead:
a top-level directory on a branch of an existing repository, never merged there and with no pull
request there. The specifier committed the pinned files (the contract between the parts, the
model's types, the fixtures) as the branch's base, two developers built from it in parallel, each
ran its review loop, and the specifier verified their heads and fast-forwarded the staging branch.
When the repository existed, one developer rewrote the history under the new directory on top of
the repository's first commit, and it landed there as an ordinary pull request.

# What made it safe

- **A branch gives a review range.** A scratch directory has no commits to review and no head to
  verify; do not build there.
- **The move is proven, not reviewed again.** The directory's tree after the rewrite and the
  verified tree on staging have the same git tree id: one command each, and every reviewer of
  the move checked it for itself. Only the commits the new place needs (paths, the README, the
  workflow, packaging) get a fresh review.
- **Say on the branch itself that it is staging:** a first paragraph in its README that it is
  never merged where it sits, so nobody opens a pull request for it there.
- **Rewriting loses commit signatures; sign-offs are kept.** Say so in the pull request.
- **The new place can break what staging hid.** Here the new repository had no ignore file of its
  own (the old repository's root one had covered the directory), and the users' install route had
  never run; both were found by the move's review.

# Related

- The move keeps to
  [a new official repository's code lands only through reviewed PRs](/nodes/oats-maintainer/stewardship/new-repository-code-lands-by-pr.md)
  (`dec-a630448f5b8c`): the rewritten history went on the repository's seed commit as a pull
  request, not pushed as its main.
- [Prove a package by the install route its users take](/claims/lessons/prove-a-package-by-the-install-route-its-users-take.md)
  (`ins-1829d19b2559`) is the install fault the move's review found.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-20;
   notes/bb-plugin-slots-probe-findings.md.
2. awebai/oats branch `agents/bb-plugin-specialist-staging` at `9ebb09c7`, read at maintainer
   review 2026-11-20: its `bb-plugin` tree is `18ea8930`, and its head commit is signed.
3. [oats-project/oats-bb#1](https://github.com/oats-project/oats-bb/pull/1), merged 2026-11-20 as
   `f4b3fbf`, read at maintainer review 2026-11-20: `5488487:plugin` is the same tree `18ea8930`;
   `5488487` merges the rewritten history onto the seed commit `4870c86a`; the 31 rewritten
   commits carry no signature and each keeps its `Signed-off-by`; `3f47d30` adds `plugin/.gitignore`, which the old repository's root
   ignore file had covered, and the git-install fix. That waiting would have idled the developers,
   and who directed the staging branch, are the source's report.
