---
type: Decision
title: The loopback interface was Desktop's trust boundary; its browser-facing rules stand
description: SUPERSEDED IN PART 2026-11-13 - main and its backend now meet over a private socket with a per-child credential, not a loopback bind. Still in force - because Desktop's backend can type into live agent terminals, it guards Host on every request and Origin on every command-running route, treats navigation, fetch and workspace strings in the privileged window as part of the boundary, and keeps polling over push transport.
about: [system/oats-desktop]
id: dec-28db07ceee3a
tags: [desktop, security, trust-boundary, loopback, transport, renderer, superseded-in-part]
timestamp: 2026-11-13
---
**Superseded in part 2026-11-13** by [Desktop's backend boundary is a private socket and a per-child credential](backend-boundary-is-a-private-socket-and-a-per-child-credential.md),
with Pepe's acceptance source-reported (relay at
<https://github.com/oats-project/oats/pull/1891#issuecomment-6856731215>).
Superseded: the first paragraph of the Decision below (the loopback bind as
the boundary, and remote use by SSH port-forward). Everything else here
still holds, and applies to the development harness, which still listens on
loopback. Kept as the record of why loopback was chosen.

# Context

Decided with the founder on 2026-07-17 for the browser-panel predecessor and
re-affirmed unchanged when Desktop succeeded the panel (2026-07-24). The
backend process reads agent sessions and delivers keystrokes into them. Any
page that can reach it can therefore act as the operator inside every agent
on the machine. That single fact shapes the whole boundary.

# Decision

**Superseded 2026-11-13 (see the note above):** ~~Bind loopback only, and
make the loopback interface itself the trust boundary. Remote use is the
operator's own SSH port-forward, never a public bind.~~ What stands from this
paragraph, and is now stronger: Desktop is not a network product and must not
grow into one by convenience; its backend has no network listener at all.

**The Host guard covers every request, not only mutations.** A hostile page
can DNS-rebind its own hostname to the loopback address and read through GET
routes; same-origin policy does not help because the attacker owns that
origin. The first guard covered only POSTs because GETs were "just roster
reads"; the moment file-serving GET routes existed, that assumption became a
workspace-file leak (2026-07-22).

**Anything that runs a command is a mutation behind the Origin guard.** A GET
route that spawns a child process on cache miss is a CSRF fan-out surface on a
fixed loopback port: `no-cors` GETs omit Origin, so a per-route Origin check
is not a defence. Model such routes as POSTs, and coalesce concurrent misses so
trusted callers cannot multiply the same process either (2026-07-27).

**A proxy in front of the server inherits the boundary; it never launders
it.** A development or harness proxy that rewrote Host and Origin to the
upstream loopback authority so its requests would pass was a blocker: it
turned the guard into a formality for anyone who could reach the proxy. The
proxy validates the inbound Host itself and forwards the browser's real
Origin. Note that a naive port-strip mangles bare IPv6 loopback hosts.

**Inside the privileged window, navigation and outbound fetch are part of the
boundary.** Rendered content (markdown, transcripts) can carry links: deny
same-window navigation, not merely `window.open`, or a remote page inherits
the preload bridge. A privileged fetch proxy must compare the *resolved*
origin against the loopback origin rather than the input shape — WHATWG URL
resolves `//host/x` and `/\host/x` to another host. A sanitiser decides which
markup survives but not how surviving anchors navigate; raw-HTML anchors
bypass the markdown renderer, so every surviving link is normalised after
sanitising.

**Workspace-derived strings are hostile input inside the privileged window.**
Paths, names, `instance.json` fields and catalog ids come from workspaces
Desktop observes but does not own (reviews of 2026-07-24 … 2026-07-25). They
enter the DOM by assignment — `textContent`, `dataset`, `value`,
`createElement` — never by interpolation into markup attributes or CSS
selectors. A text-context escape that handles `& < >` does not escape quotes,
so an escaped value in an attribute position still breaks out. A selector
built from a name throws on metacharacters or matches the wrong node, and a
module-local binding can silently shadow the global escaper. Such strings are
also coerced before they key a sort or a grouping. A throw inside a render
loop is availability loss for the whole view: one malformed instance record
once blanked the entire roster. The elimination route is an escaper that also
escapes quotes, plus a regression that renders a hostile path and asserts no
extra element and no `on*` attribute. Until that exists, reviewers look for
escaped values in attribute positions.

**Client-supplied paths are selectors, never authority.** Path-shaped input
from the renderer selects among server-computed, admitted roots; see
[Workspace admission is privileged and transactional](privileged-workspace-admission.md)
for how those roots are admitted and held. When a shared snapshot gains a
producer of lower trust, audit every consumer, not only the new producer's
shape (2026-09-05): host-supplied remote roster rows merged into the same
snapshot the file guard enumerates turned remote `home` strings into
admitted local read roots, so a host could choose what the local Desktop
served. Remote rows never grant access to local files.

# Transport simplicity

Reading the agent through its real terminal transport — whichever target
type (local multiplexer, herdr, remote via the installed CLI) — was chosen
over a runtime-specific chat protocol because it is identical across agent
runtimes and needs no runtime cooperation. Push transport (WebSockets/SSE)
was deferred deliberately in favour of polling; the deferral stands until
polling demonstrably chafes. Anyone proposing push must show the chafing.

Polling must never block input (2026-07-23). The single-threaded server also
carries keystrokes, so a synchronous roster collection on a request path put
a poll's several hundred milliseconds in front of a key press; solo medians
looked fine while humans felt the tail. Slow collection runs out of process
and requests are served from a snapshot refreshed in the background, with one
refresh in flight at a time. Benchmark under concurrent load, not solo.

# Rejected alternatives

- A public or LAN bind "for convenience" — rejected: the process types into
  terminals.
- Per-route Origin checks on GETs — rejected: `no-cors` GETs omit Origin.
- Blocklisting bad URL shapes — rejected: check the resolved origin.
- Trusting the sanitiser alone for links — rejected: navigation behaviour is a
  second decision after markup survival.
- Reusing a text-context escape for attributes or selectors — rejected: it
  does not escape quotes or selector syntax; assign workspace data to DOM
  properties instead.

# Related

[Desktop's backend boundary is a private socket and a per-child credential](backend-boundary-is-a-private-socket-and-a-per-child-credential.md) (supersedes this decision's loopback bind);
[One standalone Desktop product, no hidden operational kernel](standalone-product-and-cli-authority.md);
[Terminal tabs are viewers, not session owners](terminal-viewers-not-session-owners.md);
[Verification judgment for Desktop's privileged surfaces](../lessons/verification-judgment-for-privileged-surfaces.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md) (security section)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/snapshot-collection-off-thread.md and agents/cli-dev/soul/knowledge/lessons/remote-roster-widens-local-file-guard.md @ 7838d3ca.
