---
type: Lesson
title: "A loopback service in a team container is reachable over SSH command channels, so allowing a port forward is convenience, not a boundary"
description: "With sshd's forwarding disabled, one SSH command channel per connection (stdio piped to the loopback port, multiplexed on a ControlMaster) carried a web app and its WebSockets for ten minutes with no drop; a forward limited by PermitOpen also works and refuses every other target, but the same key reaches those targets through a command channel either way."
about: [workstream/operations]
kind: lesson
id: ins-d25b54dbc215
tags: [container, ssh, sshd, forwarding, relay, websocket]
timestamp: 2026-11-19
---

# What was observed

A service that listens only on 127.0.0.1 inside a container with no published port, behind an sshd
whose config says `DisableForwarding yes` (the team image's `sshd_config`, used verbatim), was
reached from outside in two ways, with OpenSSH 9.2p1 on both ends.

**Command channels, config unchanged.** A local listener opens one `ssh` command channel per incoming
connection; the remote command pipes its stdio to the loopback port (the same one-line pipe the
container docs use as a ProxyCommand). The channels share one ControlMaster connection. Through it a
web app loaded, held two WebSockets for 10.5 minutes with 420 frames and no close, and a CLI worked.
A new connection cost about 25 ms (1 ms direct); a request on an established connection about 1 ms.
Two limits:

- sshd's default `MaxSessions 10` caps channels per SSH connection. Past it sshd logs
  `no more sessions`, and the ssh client falls back to a connection of its own: it still works, at
  about 250 ms. A relay that keeps at most 9 channels on the master and sends the rest straight to
  their own connection avoids the failed attempt.
- When the master exits, its channels end; new connections still work but each pays a full SSH
  connection until a master is started again.

**A forward limited to the port.** Replacing `DisableForwarding yes` with `AllowTcpForwarding local`
and `PermitOpen 127.0.0.1:<port>` makes `ssh -L` work, and every other target was refused
(`administratively prohibited`): sshd's own port, other loopback ports, the container's own network
address, another container. `PermitOpen` matches the host as written, so `localhost:<port>` and
`[::1]:<port>` are refused too. `DisableForwarding` also covered agent, X11, unix-socket and remote
forwarding, so the replacement has to deny each of those by name (`AllowAgentForwarding no`,
`X11Forwarding no`, `AllowStreamLocalForwarding no`, `PermitListen none`, `GatewayPorts no`).

**The restriction binds the forward, not the key.** With the same key, a command channel piped to
each refused target answered, under both configs. The key grants a shell as the container's user, so
`PermitOpen` narrows what a forward can reach and nothing else.

# What to do with it

Reaching a loopback service in a team container does not require a change to the image's sshd
config. Decide between the relay and a permitted forward on operator convenience and connection
cost, not on exposure: both expose exactly what the operator's key already reaches.

This fits the decision that [operators reach a Kubernetes team container through the existing SSH
execution target](/nodes/oats-maintainer/decisions/kubernetes-operator-access-uses-the-ssh-target.md):
a service behind that sshd is reachable over the same route, with no forwarding change.

Evidence: OKF proposal from oats-engineering-expert/bb-reach-clients-probe, 2026-11-19;
notes/ssh-command-channel-relay-vs-permitopen.md. Measured in trial containers on an internal Docker
network, not in the team image itself and without the docs' `docker exec` ProxyCommand hop in front.

# Citations

1. oats-project/oats `container/agent/sshd_config` at `6ddf5b75d66a` (`DisableForwarding yes`, no
   `MaxSessions` line, so sshd's default applies), read at maintainer review 2026-11-19.
2. oats-project/oats `docs/container.md` at `6ddf5b75d66a`: forwarding is disabled because OATS's
   ControlMaster multiplexing uses command/session channels, and the operator's `ProxyCommand` is a
   one-line stdio pipe to the container's sshd port. Read at maintainer review 2026-11-19.
