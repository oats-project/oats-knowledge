---
type: Lesson
title: "bb accepts loopback and IP hosts as they are, and a DNS name only through BB_APP_URL set in the server's own data dir"
description: "bb-app 0.50.1 answers 403 to every request under a DNS name that is not in BB_APP_URL, while a loopback listener on any port needs no setting; bb-app config set writes the default data dir and still reports a reload, so with a server started on --data-dir it must run with BB_DATA_DIR set to that dir."
about: [workstream/provider-integration, workstream/operations]
kind: lesson
id: ins-15736e92c6e6
tags: [bb, reverse-proxy, https, websocket, configuration]
timestamp: 2026-11-19
---

# What was observed

bb-app 0.50.1, bound to 127.0.0.1, checks two things on what a client sends.

- **Host, on every request:** `localhost`, an IP literal, or the hostname of `BB_APP_URL`. Anything
  else is 403 `forbidden_host`, for the page, the API, the WebSocket and the `bb` CLI alike.
- **Origin, on API calls and WebSockets:** an allowed origin, or the origin the request itself names
  (Host, or X-Forwarded-Host with X-Forwarded-Proto) when that hostname is trusted. Else 403
  `forbidden_origin`.

So a listener at `http://127.0.0.1:<any port>` in front of bb (an SSH relay or forward) needs no
setting: page, WebSocket updates and CLI all worked. An HTTPS name in front needs
`BB_APP_URL=https://<name>[:port]`:

- Without it, a proxy that keeps Host gets 403 on everything. A proxy that rewrites Host to the
  loopback address serves the page, and every API call and the WebSocket are 403: a page that loads
  and is dead.
- With it, both proxy styles worked, WebSocket `/ws` on the same origin included, and the loopback
  listener kept working beside the name. A port in the URL works, and the same hostname on another
  port is accepted, so several servers can share one machine name with one port each. One
  `BB_APP_URL` per server.

**The trap.** With the server started as `bb-app --data-dir <dir>`, a plain
`bb-app config set BB_APP_URL <url>` writes the default data dir's `config.json`, prints
`Reloaded running bb server config.`, and changes nothing. Run with `BB_DATA_DIR=<dir>` it writes
`<dir>/config.json` and applies live, without a restart.

One CLI gap from a remote machine: `bb thread spawn --environment <path>` needs a host daemon on the
CLI's own machine (`Cannot reach local host daemon`); the same spawn without the flag works.

# What to do with it

When bb runs in a container and is reached by a name, set `BB_APP_URL` with the server's own data
dir in `BB_DATA_DIR`, and check the result with a request under that name rather than by the
command's message. A proxy in front must pass WebSocket upgrades and either keep Host or send
X-Forwarded-Host and X-Forwarded-Proto.

Evidence: OKF proposal from oats-engineering-expert/bb-reach-clients-probe, 2026-11-19;
notes/bb-origin-guard-and-config-data-dir.md. Measured in a container with a throwaway TLS reverse
proxy and a headless browser; the checks were also read in bb's source (the server's browser request
guard). Tailscale Serve itself was not run.
