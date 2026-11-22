---
type: Lesson
title: A test fixture's spawn run from inside an instance home inherits the host tmux server's environment, so it can start the real harness against the real HOME
description: The kernel copies the environment of the tmux server the calling home records, so a fixture set up from an instance home launched the real Claude Code with the operator's HOME and PATH. Run fixture commands from /tmp under env -i, pin the stand-in harness by absolute path, and check one agent's /proc environ before going on.
id: ins-dd206509e363
about: [system/oats-desktop, system/oats-kernel]
kind: lesson
tags: [desktop, live-check, fixture, tmux, environment, harness, testing]
timestamp: 2026-11-22
---

# What happened

A Desktop developer built a live-check fixture: a private OATS_HOME_DIR, TMUX_TMPDIR and HOME, and 8 agents
meant to run a stand-in harness. It ran the fixture's spawns from its own instance home. The kernel copied the
environment of the tmux server that home records, which is the operator's (their PATH and HOME). So the 8 fixture
agents started the real Claude Code against the operator's real HOME. They sat at Claude's folder-trust prompt
for about 22 hours. No folder was trusted and nothing ran, but the operator's `~/.claude.json` gained the fixture's
folders as projects.

The same fixture's CDP driver also had no deadline and never exited after its screenshot, which hung the
developer's session for 22 hours. That is the bounded-command rule of
[Desktop live checks run headless](/claims/lessons/desktop-live-checks-run-headless-on-a-shared-host.md)
(`ins-092027700372`), broken by the script rather than by Electron.

# Why the kernel does this

This is the kernel's rule, not a bug. A session server is started with the user's login environment,
which OATS cannot read for a process whose HOME is not the user's (a fixture's private HOME). A creator
outside every instance then falls back to its own environment, so the fixture's private HOME and PATH reach
the panes. An instance never passes its own environment: it falls back to a copy of the global environment
of the server its home records, or is refused. Unsetting the instance's variables is not enough while the
command still runs from the instance home, because the kernel also identifies the caller by its working
directory.

# The lesson

- Run every fixture command from /tmp under `env -i`, with only the fixture's variables. Never run them from an
  instance home or a shell inside the operator's tmux.
- Pin the stand-in harness by absolute path (a launch config's `executable`).
- Before relying on the fixture, read one agent's `/proc/<pid>/environ` and check its HOME and its harness binary.
  Make that check a guard in the fixture script.
- Give a CDP driver a per-call and a per-run deadline, and make it exit after its last step, as well as wrapping it
  in `timeout`.

# Elimination route

The structural fix is a committed live-check fixture script for the Desktop that starts from /tmp under
`env -i`, pins the stand-in, and refuses to continue unless the `/proc` check passes. The repository had none
at review: each developer writes its own. Until one exists, this lesson is the guard.

# Citations

1. oats-project/oats at `76496c77`, `docs/execution-targets.md`, "The environment of the server and its panes"
   (a process whose HOME is not the user's cannot have its login environment read; a creator outside every
   instance falls back to its own environment, an instance to a copy of the server its home records, never its
   own), and `lib/core.mjs` `oatsSessionEnvironment`, `recordedServerEnvironment` and `callerInstance` (an
   instance home that encloses the working directory identifies the caller even with its variables unset).
2. [oats#2087](https://github.com/oats-project/oats/pull/2087) (Desktop UI rework slice 3d), its description's
   "Live fixture": the rebuilt fixture with a private HOME, OATS_HOME_DIR and TMUX_TMPDIR, the stand-in
   harness by absolute path, a guard that checked every agent's `/proc`, and the earlier fixtures ended by a
   host restart.
3. The incident itself (the real harness at the folder-trust prompt, the 22 hours, the `~/.claude.json`
   entries, the CDP driver that never exited) is source-reported: the slice 3d developer's report to the
   rework's lead, recorded in the proposer's notes. It is not on the PR.
