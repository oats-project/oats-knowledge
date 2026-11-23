---
type: Lesson
title: REST writes through awebai/oats, the old name of oats-project/oats, were carried on 2026-11-23, so the 307 on an old-name POST is not general
description: With gh 2.102.0, gh api POSTs with fields (open a PR, add a label) and a PUT (squash merge) to repos/awebai/oats/... succeeded and answered with oats-project URLs. That narrows the recorded 307-on-POST lesson, which was probed with an empty body against another repository. The safe rule still stands. REST also worked while gh's GraphQL refused with a rate limit.
about: [workstream/provider-integration, workstream/coordination]
kind: lesson
id: ins-dad8d757d459
tags: [lesson, github, gh, rename, redirect, rate-limit]
timestamp: 2026-11-23
---

# What was observed

On 2026-11-23, with gh 2.102.0:
- `gh pr create -R awebai/oats` refused with "GraphQL: API rate limit already exceeded", twice, while `gh api rate_limit` showed GraphQL quota left (most likely a secondary limit).
- `gh api repos/awebai/oats/pulls -f title=… -f head=… -f base=main -F body=@file` (POST) created the PR. Its `html_url` was under `oats-project/oats`.
- `gh api repos/awebai/oats/issues/<n>/labels -f 'labels[]=…'` (POST) applied the label.
- `gh api -X PUT repos/awebai/oats/pulls/<n>/merge -f merge_method=squash -f sha=<head>` merged at the pinned head.

# What it changes

[GitHub answers a renamed repository's old name with a 301 for reads and a 307 for writes](/claims/lessons/github-answers-a-renamed-repositorys-old-name-differently-for-reads-and-writes.md) says a REST POST to an old name gets a 307 that `gh api` does not follow. Its probe was an empty-body POST against `oats-knowledge`. Here, POSTs with fields and a PUT against `oats` were carried. So the 307 is not general to every write through an old name; which writes it hits is not established. Its rule (name the canonical repository in every write) is unchanged: a write that works today through an old name is still the risk that lesson describes.

# How to apply

- Keep writing to the canonical name.
- When gh's GraphQL refuses with a rate limit but `gh api rate_limit` shows quota left, the REST endpoints (`gh api`) can still open, label and merge a PR. Check the PR's head and verdicts first, and pin the merge to the agreed head with `sha=`.

# Evidence

- [oats-project/oats#2105](https://github.com/oats-project/oats/pull/2105): opened, labelled `lane:product` and squash-merged as e0c8e500 at its signed-off head feb9f36d on 2026-11-23 (verified at review). GitHub's record does not show which route the writes took: the old-name REST calls, the GraphQL refusals and the rate-limit reading are the source's report.
- At review, `gh api repos/awebai/oats` answered `oats-project/oats`: the old name still resolves for reads.
