---
type: Decision
title: The bundled server ends with its app owner, without interrupting CLI children
description: An owner-only stdin pipe bounds the bundled server's lifetime across app crashes without claiming authority over another app's server or in-flight CLI work.
about: [system/oats-desktop]
id: dec-903fca1fe43f
tags: [desktop, server, ownership, process-lifetime, shutdown]
timestamp: 2026-10-08
---
# Decision and rationale

Decided 2026-10-08. The source records implementation and approval by both
maintainers in [awebai/oats#806](https://github.com/awebai/oats/pull/806).
The bundled server's lifetime belongs to the app that started it, not to a
best-effort quit callback. The app opts its server into an EOF watcher and
holds the write end of a stdin pipe that it neither writes nor ends while
owning the server. When that owner exits, including by crash or SIGKILL, the
OS closes its end and the server exits.

The decisive invariant is **exclusive ownership of the write end**. If it
leaks into another child, such as a PTY or detached multiplexer process, EOF
waits for that child and the server can outlive the app. The source's
pre-implementation probe found no inherited write end in plain, node-pty or
detached grandchildren and observed EOF after killing the owner. Preserve
that invariant when changing spawn plumbing; do not treat a normal-quit test
as evidence for it.

# Rejected alternatives

- **More quit-path cleanup:** a crash or SIGKILL skips it, so it cannot solve
  the orphaning that motivated the change.
- **Parent-PID polling:** reparenting differs across systemd subreapers and
  launchd, and polling adds a timer and detection delay.
- **`PR_SET_PDEATHSIG`:** it is Linux-only and unavailable through Node's
  process API; the chosen ownership mechanism must also work on macOS.
- **Replace an older own-kind server found on the port:** an HTTP response
  cannot distinguish an orphan from a server still owned by another installed
  app version or a development checkout. Report the version/ownership
  conflict accurately; never stop that server merely to make room.
- **Signal CLI children or kill the process group on server exit:**
  SIGINT, SIGTERM or SIGHUP during kernel worktree hooks interrupts and rolls
  back a spawn. Server cleanup must not destroy an operator's in-flight
  instance creation.

# Server death is not cancellation of kernel work

The lifetime exit sends no signal to in-flight CLI children and kills no
process group. The source tested server exit during `oats spawn`: the spawn
completed despite the closed output pipe. That experiment supports leaving
kernel work alone, not promising that Desktop retains a pending row or
receives the result after its server has gone. It is not a general guarantee
about every CLI's response to a closed pipe.

The later [non-cancellable file-output decision](noncancellable-kernel-work-unlinks-output-at-spawn.md)
adds crash-independent temporary-output cleanup for work such as the machine
recovery sweep. It does not replace this server's intentional owner-lifeline
pipe or broaden the server's shutdown authority.

This refines the ownership boundary in
[Workspace admission](privileged-workspace-admission.md) without authorizing
replacement of a server the app did not start. It also follows the separation
between [terminal viewers and session owners](terminal-viewers-not-session-owners.md).
The [verification lesson](../lessons/verification-judgment-for-privileged-surfaces.md)
keeps test-harness cleanup separate from application shutdown authority.

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-backlog, 2026-10-08; notes/698-server-owner-lifeline.md.

The proposal and note report the probes and approvals; this harvest did not
rerun them. The originating problem is
[awebai/oats#698](https://github.com/awebai/oats/issues/698).
