---
type: Lesson
title: Desktop live checks run headless on a shared host, with an owned CDP port, a private environment and a bounded command
description: An Electron Desktop under --ozone-platform=headless, driven over CDP on a port it reports, replaces Xvfb. Unset the calling instance's env, pin the harness by absolute path, time-bound every command, and leave tmux teardown to the operator. Three DOM-test traps it catches.
id: ins-092027700372
about: [system/oats-desktop]
kind: lesson
tags: [desktop, electron, live-check, cdp, headless, testing, jsdom]
timestamp: 2026-11-20
---

# Recipe

- `--ozone-platform=headless`, CDP on loopback with `--remote-debugging-port=0` (attach to the port it
  reports), inside a `systemd-run --user` unit, with a private HOME, OATS_HOME_DIR and a short
  TMUX_TMPDIR. Developers asked for an Xvfb install (sudo) when this already worked.
- Unset the calling instance's environment (OATS_INSTANCE, OATS_INSTANCE_HOME, TMUX, TMUX_PANE,
  AWEB_IDENTITY_HOME, PI_*): the kernel refuses to create a session server from inside an instance.
- Pin the fixture's harness by absolute path (a launch config's `executable`). A bare `claude`
  resolves on the pane's login PATH and starts the real binary.
- Wrap every command in a timeout, and never wait on an Electron in the foreground. One developer's
  session hung for almost four hours on one command and had to be replaced.
- Set `Emulation.setDeviceMetricsOverride` before `Page.captureScreenshot`, or the capture hangs.
- Agents can't tear down tmux servers (a guard), private ones included. Leave a cleanup line for the
  operator, and stop the fixture's agents with `oats instance stop`.
- npm 11 skips electron's and esbuild's install scripts: run node_modules/electron/install.js by hand.
- Fixed CDP ports are shared: two developers attached to a third's test Electron on a fixed port and
  drove it.

# Traps the live tier catches

- jsdom doesn't apply `[hidden]` when a rule like `.x { display:flex }` wins, so a DOM test passes
  while both panels show. Keep `[hidden] { display:none !important }` in such sections.
- jsdom drops a CSS shorthand holding `var()`: pin those from the rule text. The unit tier has no
  layout, so narrow-pane geometry is a CDP measurement.
- A repaint loop (a focused control rebuilt, then re-focused, then re-selecting its tab) showed up
  only live, as 500 to 650 roster reads a second. Key repaints by content.

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-20; reports from the rework's developers (slices 3a, 3b, 4, 2b, 3c and the agent view); notes/desktop-live-check-and-test-traps.md.
