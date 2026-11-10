---
type: Decision
title: A client-created tmux server needs its own cgroup
description: When a client becomes the usual creator of the OATS tmux server on a systemd host, server placement must keep the agents outside the client's cgroup so a whole-cgroup kill does not take them down together.
about: [workstream/oats-direction]
id: dec-2173dc915b4f
tags: [runtime, clients, tmux, systemd, resource-isolation]
timestamp: 2026-10-27
---
# Coherence rule and rationale

When a client becomes the usual creator of the OATS tmux server on a
systemd host, place the server and its agents in a cgroup of their own,
separate from the client application's scope. A change to who starts a
server is also a change to the resource boundary it inherits; review that
boundary rather than treating server creation as an interchangeable caller.

The reason is a shared failure domain: systemd-oomd kills whole cgroups.
Leaving the server under the client application's scope puts the agents in
the same kill unit, so pressure that selects that scope can take them all
down together. Closing a viewer is not the only way a client can accidentally
own the lifetime of supposedly independent sessions.

The source reports that the existing rule associated with
[awebai/oats#915](https://github.com/awebai/oats/issues/915) places the server
separately only when its creator is inside a systemd service. The new
maintainer requirement extends that rationale to client-created servers;
retaining a service-only condition is not sufficient once the client is the
usual creator. The existing [runtime/viewer ownership decision](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
remains canonical for who owns lifecycle. This concept owns the additional
resource-placement consequence, not another viewer policy.

# Enforcement belongs in server creation

The elimination route is to enforce placement at server creation, with
regression coverage for both service and client creators. A reminder for
reviewers or a per-operator workaround cannot guarantee the inherited
resource boundary. Treat verification of the resulting placement as an
acceptance target, not as evidence this harvest obtained.

This requirement separates agents from the client's failure domain; it does
not promise per-agent cgroups, immunity from memory pressure or equivalent
mechanics on hosts without systemd. It grants no authority to alter a live
host or move existing processes during review.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md.

The note says a change that makes the client the usual server creator must
decide cgroup placement and names the whole-cgroup kill hazard. The proposal
states the stronger concrete requirement of a separate server cgroup. It is
promoted as the maintainer's coherence conclusion, not as a directly
human-accepted cgroup decision. The source cites the service-only rule at
`d5443cc3`; that implementation was not independently audited here. No
placement fix or runtime experiment is reported as completed by this
harvest.
