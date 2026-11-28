---
type: Lesson
title: "A repository's status line must be true of the tree it lands in, not of work on another branch"
description: "A report of a successful run moved a model's 'not yet run against the code' lines, but the run used another seat's unmerged branch; in the default branch the runner still read only the old cases. Check that the code a report used is an ancestor of the target before changing a status line."
about: [workstream/coordination]
kind: lesson
tags: [status, documentation, cross-branch, review-loop]
timestamp: 2026-11-28
---

# What happened

A formal model's README and claims ledger said its generated test cases had not yet been run against the code. A sibling seat then reported that it had run them against the real registry and server, 39 of 43 agreeing. After merging the default branch into the model's PR, the author rewrote the status lines to say the cases were run.

The run had used the sibling seat's own branch, which was not merged. In the default branch the runner still loaded only the hand-written cases and refused the generated format. A fresh delta reviewer read the runner's loader in the tree and returned the change as a major finding. The status commit was reverted, and the tree went back to the one already reviewed.

# How to apply

- Before you change a status line, a "done" list or a "not yet" item because of someone's report, check that the code the report used is an ancestor of the branch you land in (`git merge-base --is-ancestor <commit> origin/<default>`).
- If it is not, leave the line. It changes in the pull request that lands that code.
- A reviewer can check this only by reading the consuming code in the tree. So brief the reviewer with the claim's criterion ("true of this tree"), not with the report.
