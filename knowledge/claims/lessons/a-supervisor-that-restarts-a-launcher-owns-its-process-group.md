---
type: Lesson
title: "A supervisor that restarts a launcher must own its process group, or a killed launcher's children hold the ports"
description: "In the team image, killing bb's launcher with SIGKILL left its server and host daemon alive on their ports, reparented to the init process, so every restart failed; spawning the launcher as a process-group leader and killing what is left of the group before a restart made the restart work."
about: [workstream/operations, workstream/provider-integration]
kind: lesson
id: ins-c1d338d6de91
tags: [container, supervisor, process-group, restart, bb]
timestamp: 2026-11-19
---

# What was observed

The team image's supervisor was given one more child: a third-party launcher (`bb-app` 0.50.1) that
starts a server and a host daemon as its own children, each on a fixed loopback port. The design
said: after a good start, restart it when it exits.

A SIGTERM to the launcher stops its children in order, and a restart works. A SIGKILL to the
launcher (what an OOM kill or an operator's `kill -9` does) leaves its server and daemon running,
reparented to the container's init, still answering on their ports. The next launcher then refuses
to start because another server already answers, and no restart can ever succeed. A unit test with
a single fake child does not show this: only the real image did.

# What worked

The supervisor spawns that one child `detached`, so it leads a process group of its own, and when
the launcher ends, however it ended, it sends SIGKILL to what is left of the group before the
restart. The group's id stays reserved while a member lives, so the signal reaches only what the
launcher left. The other children are spawned as before. After a `kill -9` the launcher's tree went
from 15 processes to 1 within a second and the server was ready again 10 seconds later; a thread
that existed before the kill was listed idle and took a new message.

One thing was still seen to outlive a killed launcher there: its own lookups of provider versions
(`npm view`), until the lookup fails or times out. They hold no port.

# What to do with it

When a spec says "restart it if it exits" about a child that is itself a launcher of long-lived
processes, ask for a real kill -9 of the launcher in the real image before accepting it, and expect
the answer to be a process group (or the launcher's own reaping) rather than a retry loop. The same
reasoning makes a status that answers before the child is started a refusal, when the status names
no process: it can only be someone else's.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-19;
notes/restart-needs-process-group.md. Observed by the change's developer in the real team image
with a mock model; the observation, its counts and timings are source-reported (#1984's body gives
the same). The fix and its test were read at maintainer review.

# Citations

1. oats-project/oats pull request 1984 at `f81858abf` (open, unmerged at review):
   `container/agent/supervisor.mjs` (bb alone spawned `detached`; `process.kill(-pid, "SIGKILL")` on
   its group when it closes, before any restart) and the test "what a killed bb launcher leaves on
   bb's ports is removed before the restart", read at maintainer review 2026-11-19.
2. The same revision's `docs/container.md`, "When it fails": the restart after bb ends, and the
   version lookups seen to outlive a killed bb.
