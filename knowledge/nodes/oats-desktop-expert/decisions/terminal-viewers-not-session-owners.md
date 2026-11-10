---
type: Decision
title: Terminal tabs are viewers, not session owners
description: Exact-source terminal viewers preserve native interaction and atomic redraws without owning durable sessions, changing other clients or silently switching agents.
about: [system/oats-desktop]
id: dec-14e550337fcf
tags: [desktop, terminal, viewers, tmux, ownership, integration-limits, synchronized-output]
timestamp: 2026-10-15
---
# Rationale

The operator should use the agent's actual terminal, not a reconstructed chat
with a second composer. **One input surface — the agent's own terminal input
line — was accepted as human direction on 2026-07-22**; a separate chat
composer is not to be reintroduced without an explicit new decision. An
in-app inter-agent chat sidebar was likewise explicitly deferred at the
founding decision (2026-07-17): the messaging layer stays the agents' channel,
the app is the human's window. A Desktop tab owns a viewer, not the durable
session.

A stale attach must fail closed rather than prefix-match another agent under
the old label. In local tmux, grouped sessions were rejected because they
share window membership: source death or navigation can reveal a sibling. An
independent exact-source linked-window viewer is necessary but not sufficient:
its client's destruction behavior must also be pinned, as the 2026-10-15
refinement below records. Restricting navigation must still preserve usable
scrollback, not install an inert key table.

Resource limits and reuse belong to the process that creates viewers and
PTYs. UI deduplication alone cannot bound reconnects or direct IPC calls.
Rejection should explain recovery rather than silently evicting another
terminal.

Herdr and remote targets need equivalent viewer guarantees through their
supported seams, not copied tmux internals. Closing a viewer, losing its
source or quitting Desktop must not become an operation on a sibling session.
Existing viewers must also survive a replacement of Desktop's own backend
server, because they attach to the session source, not to the server (see
[Workspace admission is privileged and transactional](privileged-workspace-admission.md)).

# Source death must end the viewer, not redirect its client

The 2026-10-15 finding corrects the assumption that linking only the exact
source window is enough. A viewer session inherits tmux's global
`detach-on-destroy`. With `off`, destroying its linked source window can
destroy the viewer session yet move its attached client to the most recently
used session. The old tab label then conceals a different agent receiving
the operator's keystrokes. Locking navigation and testing only default tmux
configuration do not establish identity preservation on source death.

Pin `detach-on-destroy on` on every created viewer session, without changing
the operator's global options or sessions. Audit inherited session options
that control client behavior on destruction, not just the key table and
prefix. The source's isolated two-viewer reproduction on Linux with tmux
3.7c moved the client to the other viewer with global `off`; a session-local
`on` made the client exit. This is scoped experimental evidence, not proof
for every tmux version or a reason to copy tmux settings into other backends.

The UI also needs the identity of the incarnation it opened: `createdAt`
qualified by deployment and session-server context, not only the name.
Automatic retirement reconciliation closes or rebinds a tab only when roster
evidence establishes that this incarnation is gone; a namesake must not
silently inherit it. Respect the roster's
[observation scope](filtered-roster-preserves-unasked-groups.md): an unasked
scope is not evidence of removal. This does not change explicit user closing
or the viewer's independence from a replacement Desktop backend server.

The enforcement route is to pin options in viewer creation and test source
destruction with two distinct viewers under non-default global settings,
asserting client exit and no sibling input. Pair that with tab-reconciliation
regressions for reused names and scoped roster evidence. The durable lesson
is why exact attachment alone was an incomplete guarantee; these checks
belong in code, not in an operator's configuration checklist.

# Keep a bound on remote reconnect fan-out

On 2026-10-08, keeping the open-terminal count limit (`MAX_TERMINALS`) was
accepted by oats-maintainer-pepe, as recorded in the source's note. Removing
it because reuse by target already protects local opens was rejected: reuse,
leases and source preflight do not bound the reconnect storm when many remote
tabs lose one link and retry on the same backoff. Each retry runs
`oats session inspect --server`, involving Node and SSH. At that decision,
the count was the only bound on that fan-out.

**Removal first requires a bound on reconnect attempts in flight.** That is
a new mechanism, not deletion of a redundant constant. This applies the
creating-process resource rule above rather than granting the UI ownership
of sessions.

The retained limit was 200, raised from 20 at Pepe's request on 2026-10-04.
Twenty was a choice, not a measured resource threshold. The cited Linux,
tmux 3.7 measurements found about 24 MB in tmux for 200 viewers plus about
5 MB per client, with no idle CPU reported. Those scoped measurements
supported retaining the higher allowance; they are not a cross-platform
capacity guarantee or a substitute for bounding concurrent reconnect work.

# Synchronized redraws without session ownership

The source expert's 2026-10-14 choice is **synchronized output end to end**
for Desktop's tmux viewers. A redraw can hide the cursor, draw, then restore
and position it. If transport delivery splits those bytes across a paint,
the terminal can show the intermediate hidden cursor or partial drawing.
DOM assertions and a successful final frame do not prove atomic terminal
painting. This is a native-fidelity issue, not a reason to change
[cell geometry](design-direction-and-quality-bar.md).

The source's tmux 3.7c investigation found that xterm.js did not receive
automatic `sync` feature detection. The viewer client therefore requests
`sync` explicitly; the terminal must also honor DEC 2026 begin/end markers.
Either half alone is insufficient. The chosen `-T sync` path is gated to
tmux 3.2 or later rather than breaking the supported 3.0 baseline. Keep the
feature client-local: server-wide `terminal-features` would change other
clients, including the operator's own, and violate the viewer's scope.

Because xterm 5.5 ignored mode 2026, the chosen bridge holds a marked block
and delivers it to xterm in one write, with a safety flush so an unfinished
block cannot hold the display indefinitely. This is a stopgap, not a second
permanent renderer: retire the hold when the consumer uses xterm 6's native
2026 handling. Reject timer-coalescing of all output: it adds latency yet
still permits splits wider than the timer. Reject an opt-in CLI flag with
no identified consumer need. The major xterm upgrade was deliberately
separated from the fix because it also touches fit, scrollbar and WebGL
behavior near other work. The [internal-mirror upgrade lesson](../lessons/xterm-internal-mirrors-upgrade-liability.md)
explains why a green build alone cannot qualify that upgrade.

The evidence establishes a split-redraw mechanism and remedy, not its
frequency on a real remote link. The source reports that explicit `sync`
changed observed keystroke redraws from unwrapped to wrapped, and that
replaying deliberately split recorded redraws exposed intermediate states
on xterm 5.5 but not on xterm 6's synchronized keystroke redraws. The
proposal additionally reports that the Desktop bridge avoided those states.
Local and idle loopback samples do not establish remote exposure. The
2026-10-14 proposal reported the implementation PRs as pending; the dated
status update below replaces that pending account, not the limits of the
experiment. No universal claim about all tmux/xterm versions follows. The
regression route is split-stream replay through the consumer write path,
rather than repeating unbounded live captures.

## Lease boundaries preserve unshown output

The 2026-10-15 refinement makes the hold a lease-local display obligation,
not disposable latency. Bytes outside a `?2026h`…`?2026l` block go straight
to xterm. Each lease gets a fresh hold; wherever that lease's data stops
(exit, failed readiness, reconnect or close), flush its held bytes before
showing the ended or reconnect state. Drop held bytes only after the
terminal is disposed, and let no timer outlive the tab. Otherwise a cleanup
that appears to reduce latency can discard the last redraw: those bytes
have not been shown at all.

The `-T sync` version check must fail closed with an anchored parse. A false
yes makes an older tmux reject `-T`, preventing attachment; a false no only
loses synchronization and retains the pre-fix viewing behavior. That
asymmetry favors declining the optimization when version evidence is not
recognized, not searching arbitrary output for a plausible version.

These invariants belong in regressions, not only in this decision: exercise
lease termination with held output through the real write/state path,
assert ordering and timer cleanup, and keep both viewers' version decisions
on a shared table including unrecognized input. Native xterm 6 support
remains the architectural route for retiring the hold.

## Bridge status — 2026-10-15

Owner: **oats-desktop-expert**. Whoever changes the bridge, version gate or
native-support migration updates this dated status in the same session.

The source reports that #1195 (`74251518`) and #1196 (`dc199191`) shipped in
0.56.0. It separately reports that the kernel parse is anchored while
Desktop's is not, with #1215 aligning them on a shared table. The
fail-closed rule above is therefore the required behavior, not a claim that
both shipped parsers already satisfy it. This update does not establish
completion of #1215 or of the xterm 6 retirement route (#1194). Shipment and
implementation details are source-reported, not independently audited.

# Integration limitations discovered (2026-07-23 … 2026-07-25)

- **tmux `-t` targets prefix-match unless anchored.** With stale roster data
  an unanchored attach can land a viewer — and the operator's keystrokes — in
  a *different* agent's similarly named window instead of failing. Exact
  anchored targets fail loudly. Not every subcommand accepts anchors (viewer
  option setting is the known exception, safe only because Desktop-created
  viewer names are unique and random), and `display-message` does not fail
  closed on a missing target but answers from a default context; reads that
  must fail closed use subcommands that error.
- **Alternate-screen TUIs keep their scrollback in the multiplexer**, so the
  terminal widget cannot compensate for a disabled wheel binding; locking a
  key table means provisioning an explicit allow-list, not pointing at an
  absent table.
- **The terminal widget emits a plain carriage return for Enter regardless of
  Shift** and does not speak the extended keyboard protocols real terminals
  use, so a Shift+Enter newline must be translated locally to the runtime's
  raw-linefeed newline alias — and the whole chord suppressed across every
  key event phase, or the widget's own keypress path still submits.
- **A newline sent as keys is an Enter press** (2026-07-22). Multi-line text
  delivered with `send-keys` submits, or lets a shell execute, line by line.
  Pastes and any whole-text payload go through a multiplexer buffer as one
  bracketed paste (`load-buffer`, then `paste-buffer -p`); only ordinary
  keydown bytes use `send-keys`.

# Related

[Identity and relationships must stay legible under ambiguity](../lessons/identity-and-relationship-legibility.md);
[Keyboard policy follows actions and user intent](../lessons/keyboard-focus-and-action-ownership.md);
[Browser-owned state and accessibility under repaint](../lessons/browser-owned-state-and-accessibility-under-repaint.md) (copy in a mouse-mode viewer);
[The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md).

# Current contracts

- [Current tmux-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/tmux-target.mjs)
- [Current herdr-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/herdr-target.mjs)
- [Current remote-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/remote-target.mjs)
- [Current terminal-owner-leases.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/terminal-owner-leases.md)

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-retired-tabs, 2026-10-15; notes/viewer-detach-on-destroy-rebinds-tabs.md. The note supports the tmux reproduction and session-local remedy; the incarnation reconciliation rule comes from the proposal. The source associates these with [awebai/oats#1237](https://github.com/awebai/oats/issues/1237) and reports fixes in [#1238](https://github.com/awebai/oats/pull/1238) and [#1252](https://github.com/awebai/oats/pull/1252). This harvest did not rerun the reproduction or audit implementation and merge claims.

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/multiline-send-bracketed-paste.md @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-backlog, 2026-10-08; notes/628-terminal-count-stays.md. The source records the acceptance and measurements associated with [awebai/oats#628](https://github.com/awebai/oats/issues/628); this harvest did not independently reproduce them.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-cursor-flicker, 2026-10-14; notes/cursor-flicker-split-redraw-cause.md. Investigation: [awebai/oats#1193](https://github.com/awebai/oats/issues/1193); proposed fixes: [#1195](https://github.com/awebai/oats/pull/1195) and [#1196](https://github.com/awebai/oats/pull/1196); native-support retirement route: [#1194](https://github.com/awebai/oats/issues/1194). Measurements, review and implementation status are source-reported, not independently reproduced or audited. Exact hidden-cursor counts are omitted because the proposal and note disagree; the note supports the mechanism, not the proposal's bridge-result count.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-cursor-flicker, 2026-10-15; notes/sync-gate-lease-and-version-gate.md. The follow-up reports shipment of the two fixes above and identifies [#1215](https://github.com/awebai/oats/issues/1215) as the parser-alignment work. It supports the lease-flush rationale and asymmetric version-gate failure cost; this harvest did not audit the fixes, release or follow-up completion.
