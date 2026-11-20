---
type: Lesson
title: "Verifying a new CI workflow in a shared repository includes what it does to other pull requests"
description: "A workflow added to a repository several lines of work share ran on every pull request and failed on branches cut before its directory existed, and the tests it was meant to protect ran in no workflow on the default branch; read a new workflow's triggers against every other open branch, and ask who runs each test file today."
about: [workstream/coordination, workstream/provider-integration]
kind: lesson
id: ins-c4cc5ca83f85
tags: [ci, workflows, paths-filter, verification, shared-repository]
timestamp: 2026-11-20
---

# What happened

A change added a workflow to a repository that three lines of work share (an image, a plugin and a provider): it builds an image from the
pull request's head and runs an acceptance. The specifier verified it by reading its permissions,
its pinned actions and its steps, and by its green run. It merged.

A later pull request in that repository touched only another line of work's directory. The new workflow
ran on it anyway, because it had no paths filter, and failed, because it builds from the pull
request's head and that branch had been cut before the workflow's directory existed. The sibling
workflow in the same repository had a paths filter; the new one had not copied it.

Fixing it showed a second gap: the unit tests that guard the image ran in no workflow on the
default branch. They had been written to run under another line of work's test command, which had not
merged yet.

# What to do

When verifying a workflow, beside what it does on its own pull request:

- On which pull requests and pushes does it run? Read its triggers against every other open
  branch of the repository, including ones older than the files it needs.
- What does it take from the head it checks out, and what happens when that is missing?
- For each test file the change adds: which workflow runs it on the default branch today, not once
  some other change has merged?
- A test that pins a paths filter compares the whole trigger block: a check by prefix passes when a
  path is appended.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-20;
notes/new-workflow-in-a-shared-repository.md.
Maintainer review of oats-knowledge#444 (2026-11-20) read the cited oats-bb pull requests: #2's workflow had no paths filter while plugin.yml had one, the container workflow failed on #5's first head and passed after a merge of main, and #6 added the filter, the unit-test step and the whole-trigger-block test after a review round that found a prefix check. It corrected "the next pull request" (#3 and #4 came first and passed) and "three efforts" (#6 names the image, the plugin and the provider as parts of one effort). The specifier's verification route is the source's report.

# Citations

1. oats-project/oats-bb pull request 2 (the workflow as landed), pull request 5 (where it failed),
   pull request 6 (the fix: the filter, the unit-test step, the test of the whole trigger block).
