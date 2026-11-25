---
type: Lesson
title: A second bb on one host needs its host-daemon port told to bb's CLI; the server URL does not carry it
description: bb's CLI finds the local host daemon by BB_HOST_DAEMON_PORT alone (default 38887), never from BB_SERVER_URL, so a provider that targets a bb on non-default ports must pass the port on every call; whether a daemon belongs to a server is proven only by its /status hostId being a connected host in that server's bb host list.
about: [workstream/provider-integration]
kind: lesson
id: ins-73e09b75c27b
tags: [bb, provider, multi-instance, host-daemon]
timestamp: 2026-11-24
---

# What was observed (bb-app 0.50.1, 2026-11-23)

Two bb-apps run side by side under one user with their own `--data-dir`, `--server-port` and `--host-daemon-port`.
But `bb project create` (and `bb thread spawn`, the only other command that reads it) aimed at the second server with
no `BB_HOST_DAEMON_PORT` fails: `host_not_found` when another bb's daemon holds 38887 (nothing is created in either
bb), "Cannot reach local host daemon" when none does. With the port set, the same call lands in the right bb only.
`bb host list` lists the SERVER's hosts whatever the port, so it cannot confirm the port; the daemon's own `/status`
(`hostId`, `serverUrl`) plus the server's host list together prove a daemon is that server's.

# What follows

oats.bb carries `settings.oats.bb.hostDaemonPort` (contract A23, oats-bb #57): host-only, passed on every bb call,
an inherited `BB_HOST_DAEMON_PORT` stripped so a caller's port is never paired with another bb's server, and readiness
checks the daemon's serverUrl and that its hostId is a connected host of the configured server. One bb per workspace
on one host means setting `server` and `hostDaemonPort` per workspace.

Through oats-bb v0.5.0 a real kernel refused `hostDaemonPort` alone, because the manifest's `daemon` default reached the provider as a setting; oats-bb#98 (merged 2026-11-25) dropped that default. See [a capability's manifest default reaches its provider as if the deployment had set it](/claims/lessons/a-manifest-default-reaches-the-provider-as-if-the-deployment-set-it.md).

# Citations

1. oats-project/oats-bb#57 (A23, merged 2026-11-23): bb's CLI finds the host daemon by `BB_HOST_DAEMON_PORT` alone, never from `BB_SERVER_URL`; "Host not found" or "Cannot reach local host daemon" at `bb project create`; readiness proves the daemon at the port is a connected host of the configured server (its `/status` and the server's `bb host list`).
2. oats-project/oats-bb `README.md` (`hostDaemonPort`, "two bbs on one host") and `docs/wire.md`, read on main, 2026-11-24.
3. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
