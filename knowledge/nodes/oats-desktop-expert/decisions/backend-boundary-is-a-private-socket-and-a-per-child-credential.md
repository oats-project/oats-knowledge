---
type: Decision
title: Desktop's backend boundary is a private socket and a per-child credential
description: Main reaches only a backend server it started itself, over a Unix socket in a directory private to the user and with a fresh secret for each server child on every request, because a loopback port proves nothing about who answers it; this supersedes the loopback bind of dec-28db07ceee3a for main and its server.
about: [system/oats-desktop]
id: dec-41a83f013dd4
tags: [desktop, security, trust-boundary, unix-socket, credential, lease, backend, supersession]
timestamp: 2026-11-13
---

# Decision

Shipped in oats-project/oats#1891 (with the follow-ups #1892 and #1893), in
0.69.18. It replaces, for Electron main and its backend server, the loopback
bind of [The loopback interface was Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md)
(`dec-28db07ceee3a`).

- **A private socket, never a network listener.** Main starts its own
  server at every launch and every replacement, on a Unix domain socket in a
  fresh directory owned by the user and closed to group and others (made by
  `mkdtemp`, then checked). The server opens no TCP port, and there is no TCP
  fallback: a socket path too long for the platform's limit is refused, with
  advice.
- **Main talks only to a server it started.** It never selects or reuses a
  server already running, and it sends a request only on the current
  generation's lease, which becomes ready on that child's own ready line and
  is revoked when the child exits or errors, on stop and at the *start* of a
  replacement.
- **A fresh credential for each server child.** A random secret goes to the
  child over a private pipe, never on argv, in the environment, in a URL, in
  a log or to the renderer. Every request, any method and any path, carries
  it, and it is checked before the request is parsed or its body read. No
  reply carries it. A server started by hand reads it from the operator's own
  file, which must be a private regular file of the user's. The docs call it
  "per-launch"; the rule is one secret per server child.
- **The CLI binary is chosen only through main's own file dialog.** Main
  saves the pick and the server reads it at each probe; no request names a
  binary.
- **The renderer never holds the secret.** It reaches the server only
  through main's IPC proxy. The development harness that serves a browser
  page has an inbound credential of its own and forwards with the backend's;
  it does not launder its callers into the backend.

The browser-facing guards (Host on every request, Origin on every
command-running route) stay, as defence in depth.

# Why

**What the boundary protects.** The backend runs the `oats` CLI for every
lifecycle action, reads workspace files and can type into agent terminals,
all as the Desktop's user. Main also executes the CLI path that a server
reply names. A request the server should not accept, or a reply main should
not trust, is therefore the user's authority.

**The threat model.** In scope: other OS users on the same machine, and
anything that can only speak HTTP to loopback (another local service's
request forgery, a container or sandbox that shares loopback, a helper that
sends raw requests without an Origin). Browser pages stay in scope and keep
their guards. Out of scope: a process running as the same user, which can
already read the app's memory and files and run `oats` itself, and root. A
compromised renderer already holds the IPC bridge; this change must not widen
what it can do, and it narrows one thing: the renderer can no longer name a
binary.

**Why loopback stopped being enough.** It had two holes under that model:

1. **Any local client passed.** The Host and Origin guards stop browser pages
   (DNS rebinding, cross-site requests). A client that sends no Origin and
   any Host it likes passed them, whichever user it ran as, and one route
   took a caller-supplied binary that became the app's CLI.
2. **A port once seen listening is no proof of who answers the next
   connection.** A request secret authenticates the client to the server,
   not the server to the client. After the child exits, or between kill and
   respawn in a replacement, another user can bind the same port, receive the
   next request with its secret, and answer it. Because main executes the CLI
   path a reply names, a forged reply is code execution as the user.

A directory only the user can enter closes both holes at the operating
system level, in both directions: another user can neither connect to the
socket nor bind one there.

**Why the secret as well as the socket.** The socket proves the peer is the
same user, not that it is this generation of this Desktop's server. The
per-child secret binds each request to one server: a replacement never
learns its predecessor's secret, and a request on a revoked lease can never
reach the successor. It also keeps a hand-started server closed to anything
that cannot read the operator's token file.

**Why the reprobe route lost its body** rather than keeping a binary field
behind the credential: the renderer reaches every route through main's
proxy, so the credential does not separate the renderer from main.

# Rejected alternatives

- **Keep TCP and add only the request secret.** This was the first design;
  the socket was rejected then as a larger change that proves only "same
  user". An adversarial design review showed that port liveness is not peer
  identity (hole 2 above), and the socket was chosen.
- **Mutual HMAC challenge-response over TCP:** a bespoke protocol with replay
  questions, where the OS already gives private sockets.
- **Main never trusts executable paths from replies:** partial; every other
  reply would stay forgeable and feed a privileged window.
- **Pinning the peer's uid from the kernel's TCP table:** racy and
  Linux-only.
- **TCP for tests and a socket in production:** two transports, with the
  tests off the production path.
- **The secret on argv or in the environment:** both are readable more
  widely than a pipe, and the environment is inherited by the server's
  children.
- **One secret per app launch:** a replaced server's secret would stay valid
  at its successor.
- **Restarting the server on each CLI pick:** heavier, and drops held state,
  for what a choice file read at each probe does.
- **Reusing or replacing a server found already running:** a foreign server
  could only fail the secret, or receive it; the
  [owner-lifetime decision](bundled-server-owner-lifetime.md) already
  refuses to stop one to make room.

# Acceptance and supersession

`dec-28db07ceee3a` was decided with the founder. The release lane's sign-off
on oats-project/oats#1891 (2026-11-12) required that the knowledge update
cite Pepe's own words before it merges. Acceptance of this supersession is
**source-reported (relay at
<https://github.com/oats-project/oats/pull/1891#issuecomment-6856731215>)**:
on 2026-11-13 the lane:product maintainer reports asking Pepe directly
whether the backend moves from loopback TCP to a private socket with a
per-launch credential, replacing the earlier accepted decision, with its
recommendation "yes", and Pepe answering "For the rest do what you think is
best". The maintainer records that answer as Pepe's acceptance, for Pepe's
side, of the private socket in a private directory plus the per-child
credential, superseding `dec-28db07ceee3a`. The acceptance is a delegation to
that recommendation, reported by the maintainer, not a sentence of Pepe's
own about the design.

Superseded: that decision's "bind loopback only, and make the loopback
interface itself the trust boundary", and its "remote use is the operator's
own SSH port-forward" (there is no port to forward; do not expose the
socket). Still in force there: the Host and Origin guards, a proxy inherits
the boundary and never launders it, navigation and outbound fetch inside the
privileged window, workspace-derived strings as hostile input, client paths
as selectors and never authority, and transport simplicity.

# Lessons from building it

- [A generation check at response headers does not cover the body](../lessons/a-generation-check-at-headers-does-not-cover-the-body.md)
- [Keep a secret out of a server's replies at its single reply writer](../lessons/secret-exclusion-at-the-reply-writer.md)

# Current contracts

- [docs/desktop.md, "Security posture"](https://github.com/oats-project/oats/blob/main/docs/desktop.md#security-posture)

# Citations

1. OKF proposal from oats-desktop-expert/desktop-backend-boundary-knowledge-expert, 2026-11-13; notes/desktop-backend-private-socket-boundary.md. Re-judged from the closed proposal oats-project/oats-knowledge#368, the effort's design record and its two adversarial design reviews (source-reported, not on GitHub), and the code on oats main at eb815d43d.
2. Implementation: oats-project/oats#1891, merged as 7c1b15b7f; #1892 (8087d69c4) and #1893 (2244907f).
3. Acceptance relay: <https://github.com/oats-project/oats/pull/1891#issuecomment-6856731215>; release-lane sign-off: <https://github.com/oats-project/oats/pull/1891#issuecomment-6811836468>.
