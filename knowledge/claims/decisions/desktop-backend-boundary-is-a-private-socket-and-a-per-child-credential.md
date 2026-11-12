---
type: Decision
title: The Desktop backend's boundary is a private socket and a per-child credential, not the loopback interface
description: Main starts its own backend server, always, on a Unix socket inside a mkdtemp 0700 directory, hands each server child a fresh 32-byte secret over fd 3 that every request must carry, and talks to it only through a generation lease; no TCP listener, no server reuse, and the CLI binary is chosen only through main's own file dialog.
about: [system/oats-desktop]
kind: decision
tags: [desktop, security, trust-boundary, unix-socket, credential, lease, backend]
timestamp: 2026-11-12
---

# The decision

Since [oats-project/oats#1891](https://github.com/oats-project/oats/pull/1891) (merged 2026-11-12 as 7c1b15b7f), the boundary between the Desktop's main process and its backend server (`packages/desktop/server/oats-web.mjs`) is no longer the loopback interface:

- **A private socket.** Main starts its own server at every launch, on a Unix domain socket at `<mkdtemp 0700 dir>/s`. The directory is under a private `$XDG_RUNTIME_DIR` on Linux, else the system temp directory. The server opens no TCP port and refuses `--port`.
  - A socket path over 103 bytes (macOS's `sun_path` limit) is refused with advice. There is no TCP fallback.
  - Main never selects or reuses a server it did not start.
- **A per-child credential.** Each server child gets `randomBytes(32)` (base64url, 43 characters) over its fd 3 (`--token-fd 3`). It is never on argv, in the environment, a URL, a log or the renderer.
  - Every request carries the credential as a bearer token in its Authorization header, checked in constant time before the target is parsed or the body read. There is no exempt route.
  - A server started by hand reads the secret from a 0600 regular file of the user's own, opened `O_NOFOLLOW|O_NONBLOCK` and checked by `fstat` on that descriptor. That file is never served.
  - No reply carries the credential (see [Keep a secret out of a server's replies at its single reply writer](/claims/lessons/secret-exclusion-at-the-reply-writer.md)).
- **A generation lease.** The client (`backend-client.mjs`) sends only on the current lease, `{generation, child, socketPath, secret, ready}`.
  - A lease is ready only on its own child's stdout ready line. It is revoked on exit, error, stop and at the start of a replacement.
  - See [A generation check at response headers does not cover the body](/claims/lessons/a-generation-check-at-headers-does-not-cover-the-body.md).
- **The CLI binary comes only from main's file dialog.** Main writes the pick atomically to `userData/oats-cli-choice.json`, which the server reads at each probe (`--cli-choice`). `POST /api/cli/reprobe` takes `{}` or an empty body.
- **The renderer never holds the secret.** It reaches the server only through main's IPC proxy. The dev harness has an inbound token of its own and forwards with the backend's credential.

The Host guard on every request and the Origin guard on POSTs stay as they were.

# Why

**The threat model.** Other OS users on the machine, and anything that can only speak HTTP to loopback, are in scope. A same-user process is out of scope: it can already run anything as the user. Under that model the loopback bind had two holes.

1. **Any local client passed.** A client that sends no `Origin` got through, and so did another OS user. The Host and Origin guards stop browser pages (DNS rebinding, CSRF), not local processes. The reprobe route took a caller-supplied absolute `bin` that became the app's CLI.
2. **A port the client once saw listening is no proof of who answers the next connection.**
   - A request secret authenticates the client to the server, not the server to the client.
   - After the child exits, or between kill and respawn in a replace, another OS user can bind the same loopback port. That user receives the next request, its secret included, and answers it.
   - Main executes the CLI path named in the server's `/api/cli` reply (`terminal-io.mjs`, main's deployments list), so a forged reply is code execution as the user.
   - A directory with mode 0700 stops other uids from connecting or binding there. That is an OS-level fix for both directions.

**Why per child rather than per launch:** a replacement server never learns its predecessor's secret, and the predecessor never learns its successor's.

**Why the reprobe route lost its body** instead of keeping `{bin}` behind the credential: the renderer reaches every route through main's IPC proxy, so the credential does not separate the renderer from main.

# Rejected alternatives

- **Mutual HMAC over TCP:** a bespoke protocol, where the OS already gives private sockets.
- **Never trusting exec paths from replies:** partial; every other reply stays forgeable.
- **Pinning the peer uid through `/proc/net/tcp`:** racy and Linux-only.
- **Two transports (TCP for tests, a socket in production):** the tests would run off the production path.
- **The secret in the environment or on argv:** both are readable more widely than a pipe.
- **Restarting the server on each CLI pick:** heavier than a choice file read at each probe.

# What stays from the loopback decision

This decision refines [The loopback interface is Desktop's trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md) (`dec-28db07ceee3a`). It replaces that decision's "bind loopback only, and make the loopback interface itself the trust boundary" for main and its server. The rest of it still holds:
- the Host guard on every request, and the Origin guard on command-running routes;
- a proxy inherits the boundary and never launders it;
- navigation and outbound fetch inside the privileged window;
- workspace-derived strings as hostile input;
- client paths as selectors, never authority;
- transport simplicity.

The dev harness still listens on loopback, and those rules apply to it.

# Citations

1. Spec and design reviews: OKF proposal from oats-engineering-expert/oats-engineering-expert-desktop-backend-auth, 2026-11-12; notes/port-liveness-is-not-peer-identity.md.
2. Implementation: oats-project/oats#1891, merged as 7c1b15b7f, with docs/desktop.md "Security posture".
