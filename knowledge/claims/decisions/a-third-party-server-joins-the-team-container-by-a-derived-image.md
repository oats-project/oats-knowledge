---
type: Decision
title: "A third-party server joins the team container by a derived image, with its switch in the base supervisor"
description: "The team image stays the image every team trusts: an optional third-party server (bb the first) ships in a derived image built from it, turned on by one fixed switch the base supervisor refuses without the binary, stays on loopback, and does not take the agents down when it fails."
about: [workstream/operations]
kind: decision
id: dec-7cf925e711dd
tags: [container, team-image, supervisor, bb, trust, opt-in]
timestamp: 2026-11-19
---
**Owner: oats-engineering-expert. Update-on-change:** whoever merges, reshapes or abandons
oats-project/oats#1984, or decides the session-provider contract that will use this server, updates
this decision and records any supersession in the claims log.

# The decision

The source reports that on 2026-11-19 the owner of the team image (Juan's side, through its
maintainer) and the effort that wanted a bb server inside a team container agreed how an optional
third-party server joins the container, by mail between the two, before anything was built. The
agreement is source-reported. The shape below is implemented in oats-project/oats#1984, which was
open, unmerged and on hold at review.

1. **The base image carries none of it.** The server's package goes in a derived image built `FROM`
   a reviewed team image, adding only that one pinned dependency (no lifecycle script, no OS
   package). The base is what every team trusts and is reviewed as such; a team that does not opt
   in carries no third-party closure, even dormant. The doubled build and acceptance are accepted.
2. **The supervisor change lives in the base, behind one fixed switch.** A Compose fragment sets
   one environment entry; nothing else about the server is configurable. The switch set on an
   image without the binary refuses at start, naming the derived image: an opt-in that silently
   starts nothing is a misconfiguration to see, not to tolerate. An image cannot turn the switch
   on by itself: acceptance refuses a container that has it without the fragment.
3. **It listens on loopback only, and acceptance proves it.** With the fragment, acceptance reads
   every listening socket of the container's network namespace and refuses anything beyond
   loopback except sshd's port. The operator reaches the server over the existing SSH route
   ([command channels, no sshd change](/claims/lessons/a-loopback-service-is-reachable-over-ssh-command-channels.md)).
4. **Its failure does not take the team down.** The server starts before the agents, and a start
   that is not ready in time is fatal. After a good start an exit is reported and the supervisor
   restarts it with a backoff, while the broker, sshd and the agents keep running: not every agent
   is meant to run through it, so a crash in an optional server must not restart every agent. (The
   session-provider contract that will put agents on it was still undecided at review.)
5. **The stop budget is pinned by a test.** The server is stopped after host run has stopped the
   agents, and one test adds the kernel's drain to the largest final-cleanup budget and holds the
   sum inside the container's stop grace, so a later change to any one timeout cannot overrun it.

# Rejected

- **The package in the base image, started only on opt-in.** One image to review and publish, but
  every team would carry a third-party closure whose control API has no login.
- **Taking the container down on any exit of the server**, as for the wake broker. Right only if
  every agent in the container ran through that server.
- **A published port, a non-loopback bind, a permitted SSH port forward or a network sidecar** to
  reach it: each widens what reaches an API with no login, or changes a pinned security setting
  for no boundary.

# Limits

This records the shape and why. The supervisor's code, the fragment and the acceptance checks are
in the repository and are the truth about themselves. The decision was taken between the image's
owner's maintainer and the effort's specialist by mail, and is source-reported: no forge record of
it was read at review, and the image owners' read of the change is reported in #1984's body, not
recorded on the PR by that side. The change was open and unmerged at review, held by a `hold`
comment until both sides decide the session-provider contract. No human acceptance is recorded here,
and the decision supersedes nothing.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-19;
notes/third-party-server-in-a-derived-image.md.

# Citations

1. oats-project/oats pull request 1984 at `f81858abf`: `container/agent-bb/`, `container/agent/supervisor.mjs`,
   `container/agent/accept.mjs`, `docs/container.md` ("A bb server for the team"). Read at maintainer
   review 2026-11-19: the derived `FROM ${AGENT_IMAGE}` image, the one-entry fragment
   (`AGENT_BB: "1"`), the supervisor's refusal without `bb-app` and its restart after readiness,
   acceptance's loopback check over `/proc/net/tcp` and `tcp6` (sshd's 2222 excepted) and its refusal
   of `AGENT_BB` without the fragment, and the test "the stop budget stays inside the container's
   grace".
