---
type: Lesson
title: Claude Code's sandbox widens by exact entries across settings sources, with four traps for an agent's own tools
description: In bb's sandboxed modes Claude Code's sandbox allowances add up across settings sources, so a home's settings.local.json can widen a launcher's sandbox by exactly one host or path; but an allowWrite on a missing directory can't create it, git reaches the network only through proxy settings carried in GIT_* variables, a listed host resolving to the machine itself is refused, and aw reaches its registry through the host the service's discovery names.
about: [workstream/provider-integration]
kind: lesson
id: ins-56c00f906965
tags: [claude-code, sandbox, bb, aweb, okf, git, network]
timestamp: 2026-11-20
---

# What holds (Claude Code 2.1.328, as bb-app 0.50.1 runs it in auto and accept-edits)

- **Entries add up.** `sandbox.network.allowedDomains` and `sandbox.filesystem.allowWrite` from the
  home's `.claude/settings.local.json` join the launcher's own `--settings` sandbox block (user,
  project, local, --settings and policy are unioned); the home's entries never replace the
  launcher's. One host and one path in the file were enough for real `aw mail inbox`,
  `aw mail reply` and `oats instance attention` in a real-model turn, while other hosts and
  paths stayed blocked.
- **Trap 1: a missing directory.** An `allowWrite` on a directory that doesn't exist yet doesn't
  let the sandboxed process create it (mkdir: read-only file system). Create it before launch.
- **Trap 2: git's proxy.** The sandbox routes git, over https and ssh alike, through its proxy
  with `GIT_CONFIG_PARAMETERS` and `GIT_SSH_COMMAND`. A tool that strips every `GIT_*` variable
  before running git (oats.okf 6.2.0) loses the network inside the sandbox even with the host
  allowed. The allowlist itself does govern git (same host entry, port 443 or 22). The fix
  belongs in that tool: oats.okf's publication helper builds its git children's environment by
  dropping every `GIT_*` variable, and no change to keep the sandbox's proxy was recorded at
  review.
- **Trap 3: the machine itself.** The proxy refuses a listed host that resolves to loopback or to
  the machine's own address, so a service on the same machine is unreachable from the sandbox.
- **Trap 4: discovery, not DNS.** Inside the sandbox aw reaches its registry through the host the
  aweb service's discovery answer names (`registry_url`), not through DNS discovery or the public
  registry's name; only the certificate roster (`aw id team members`) needs it, not mail.

# What it changes

Whoever writes sandbox allowances for an OATS agent writes exact hosts and paths from recorded
deployment configuration, creates the directories first, records the registry host the service
advertises, and checks that the agent's tools keep the sandbox's proxy settings. That is the
decided rule for a provider's allowances in
[the session-provider contract](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)
(`dec-faf9af131d69`), whose exact shape it leaves open; these traps are input to that open point,
not its answer. Not probed under a managed policy that requires the sandbox.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-20;
   notes/bb-sandbox-blocks-aweb-and-events.md, notes/claude-sandbox-git-and-dirs.md. Container
   probes on 2026-11-19 and 2026-11-20 (bb-app 0.50.1, Claude Code 2.1.328, bubblewrap 0.8.0;
   mock model, and one real-model turn), each case with its settings file, command, exit code and
   the sandbox's violation lines. The probes are the source's report; they were not reproduced at
   maintainer review.
2. Claude Code's sandboxing documentation (code.claude.com/docs/en/sandboxing), read at
   maintainer review 2026-11-20: filesystem arrays set in several settings scopes are merged, not
   replaced.
3. oats.okf's `okf-publication.mjs` (as shipped with oats.okf-maintenance at review): its git
   environment filters out every variable matching `^GIT_` before adding its own.
