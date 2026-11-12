---
type: Lesson
title: A guard against deployment specifics in a public repository checks shapes, never a list of the names
description: A committed deny-list of a deployment's host names, people's handles or private project names publishes them, even hashed, because short names reverse with a dictionary in seconds. In the repository, guard only a generic shape (an owner's home path against an allow-list of invented owners) and leave named specifics to review; a personal deny-list for a pre-PR search stays outside the repository and its notes.
about: [workstream/coordination, system/oats-kernel]
kind: lesson
id: ins-991c1f04cebb
tags: [privacy, guard, tests, deployment-specifics, review]
timestamp: 2026-11-12
---

# The lesson

An effort that replaced deployment specifics in the clients' examples and fixtures
(owners' home paths, real machine names, a private repository, a client project's name)
also wanted a test so they could not come back. The first version of that test failed on a
list of the known specifics, stored as truncated unsalted SHA-256 hashes so that the test
itself would not name them.

The lane's maintainer had it removed before review, for three reasons that hold for any such
list:

- **Hashes of short names don't hide them.** Machine names, handles and project names are a
  few letters long, and a dictionary reverses their hashes in seconds. A public repository
  holding the hashes effectively publishes the names.
- **The list says which names are sensitive.** It points a reader at exactly what the
  deployment wanted kept out.
- **It ties the product to one deployment.** The list holds one deployment's names, and only
  someone with that deployment's knowledge can maintain it.

The test that went to review checks one generic shape: a home directory (`/Users/<x>`, `/home/<x>`,
or Claude's encoded `-Users-<x>-`) fails unless its owner `<x>` is on a short allow-list of
invented owners (`alex`, `user`, …). It needs no real name, and it catches the commonest leak,
a pasted path from someone's machine. Machine names and private repositories have no generic
shape, so review catches them.

A branch pushed to a public remote is published even before a PR exists. A force-push leaves
the old commit reachable by its id, so settle what a guard contains before its first push.

# How to apply

- Allow-list the invented, never deny-list the real.
- A deny-list of real names, for your own search before a PR, lives outside the repository and
  outside notes and knowledge. Hand it to a helper by message.

This refines the elimination route in
[design records name no deployment specifics](/nodes/oats-expert/lessons/design-records-name-no-deployment-specifics.md),
which proposes a lint over "a deny-list of the deployment's host names, the humans' names and
absolute-path patterns". Committed to the repository, the first two parts publish what they
guard. Only the path pattern belongs in the repository.

# Evidence and limits

Evidence: OKF proposal from oats-engineering-expert/neutral-fixtures-lead, 2026-11-12;
notes/hashed-deny-lists-publish-short-names.md. The maintainer's correction came by mail
during the effort (source-reported). The hash list was pushed on a branch, never in a PR or
on main (source-reported).

Verified by maintainer review on 2026-11-12: the guard that went to review is
[oats-project/oats PR 1910](https://github.com/oats-project/oats/pull/1910), merged on
2026-11-12. Its `packages/neutral-examples.test.mjs` checks home paths only, against an
allow-list of invented owners, and its file comment leaves machine names and private
repositories to review. The PR body and the lane maintainer's approval at its head say there
is no list of real names in the repository, hashed or not, and none of the PR's commits holds
hashing code or a hash literal.

The accepted lesson's [elimination route](/nodes/oats-expert/lessons/design-records-name-no-deployment-specifics.md#elimination-route)
now points here.
