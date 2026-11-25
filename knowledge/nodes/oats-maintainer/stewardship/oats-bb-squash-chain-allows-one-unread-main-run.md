---
type: Decision
title: In oats-bb, the next squash waits for main green, except that one main run may be unread when the head is main plus the PR
description: oats-bb's merges form a chain in which each squash waits for main's own CI run. One exception: the next squash may go while main's previous run is still running, when its head contains main exactly, every check at that head is green, at most one main run is unread, and that run is still read before the squash after.
id: dec-79d8a492c088
about: [workstream/oats-direction, workstream/provider-integration]
tags: [stewardship, merge, ci, oats-bb, chain]
timestamp: 2026-11-25
---
**Owner: oats-maintainer (the release lane).**

# Decision

oats-bb lands its PRs in a chain. A squash merges only when its head contains main exactly, every check at that head is green, and main's own run on the previous merge has been read. On 2026-11-24 the release lane allowed one exception, at the bb effort's lead's request. A squash need not wait for main's run when **all** of these hold:

1. The head contains main exactly at the squash (`--match-head-commit`), and the squash's tree equals the head's.
2. Every check that ran at that head is green.
3. At most one main run is unread: squash N+1 may go while main runs on N, and N+2 waits for N's result.
4. Main's run is still read. If it goes red, both chains (plugin and provider) stop.

A head that is behind main does not qualify. It is updated, and the wait applies as before.

The exception concerns main's own CI run only. A verdict the release lane asked for is still waited for at the head ([a reader or a gate asked for is waited for](/nodes/oats-maintainer/stewardship/a-verdict-asked-for-is-waited-for.md)), and the release lane's sign-off keeps its four gates ([how the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md)). This rule refines that merge practice for oats-bb and contradicts neither.

# Why

The plugin and container workflows filter by the same paths on PRs and on main. The provider workflow runs on every main push, but on PRs only for its own paths, and rule 3 keeps the last main run read. So a head equal to main plus the PR has been tested as it will land. Waiting for main as well costs about 25 minutes per link and adds no evidence.

# How to apply

Before asking a lane to wait for main's run, check these four conditions. On 2026-11-25 the release lane put a wait on oats-bb#104 that this rule did not call for, and withdrew it when setup-maintainer pointed to the rule [1]. Hence this record.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-25; notes/oats-bb-chain-one-unread-main-run.md. The rule's setting on 2026-11-24 (by mail, at the bb effort's lead's request) is source-reported; the 2026-11-25 case and the workflow filters were checked at review against [1]–[3].

# Citations

1. [oats-bb#104](https://github.com/oats-project/oats-bb/pull/104): the release lane's merge condition on main's run ([issuecomment-7171443613](https://github.com/oats-project/oats-bb/pull/104#issuecomment-7171443613)), withdrawn under this rule ([issuecomment-7171471799](https://github.com/oats-project/oats-bb/pull/104#issuecomment-7171471799)); merged at `dadc21a2` as `4ccaf45a`.
2. oats-bb's workflows at `4ccaf45a`: `plugin.yml` and `container.yml` use the same path filters on `pull_request` and on `push` to main; `provider.yml` filters paths on `pull_request` only and runs on every push to main.
3. oats-bb tag `v0.5.1` (2026-11-25) points to `563e53a0`.
