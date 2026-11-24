---
type: Lesson
title: A bb thread has no environment until its first turn starts
description: In bb-app 0.50.1 a thread gets its environment when its first turn starts, not at the spawn: a thread bb holds in line reads environmentId null, so anything that reasons from a thread's environment (a delete, a lookup by environment) must handle a thread with none.
about: [workstream/provider-integration]
kind: lesson
id: ins-df0e71efed42
tags: [bb, environment, retire]
timestamp: 2026-11-24
---

# What was observed (bb-app 0.50.1, oats-bb #62, 2026-11-23)

A17's retire deletes a home's bb environment so an unarchived thread cannot revive the agent. A home retired before
its first turn has a thread with `environmentId: null`: nothing to delete, and with the home kept, Unarchive plus a
message still starts the agent. bb also keeps ONE environment per home, shared by every thread of it, and
`bb environment delete` answers at once, refuses while a thread on it is unarchived, and tears down in about 7 s.

# What follows

The retire warns wherever any thread of the home is left without a deleted environment, the no-environment case
included; the case is named in oats-bb's docs and pinned in the held-turn contract test.

# Citations

1. oats-project/oats-bb#62 (A17, merged 2026-11-24): the retire hook's environment delete; bb's one environment per home, shared by the home's threads; bb's refusal to delete while a thread on the environment is unarchived.
2. oats-project/oats-bb `README.md` ("A thread has no environment yet", and the rule that the retire warns whenever a thread of the home is left without a deleted environment) and `docs/wire.md` (a thread row whose `environmentId` is null), read on main, 2026-11-24.
3. The delete's timing (answers at once, about 7 s to tear down) is source-reported from the proposer's probes against bb-app 0.50.1.
4. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
