---
type: Lesson
title: Claude Code's sandbox does not confine its file tools to the home; one setting and one deny close the routes, and only managed settings close the shell's way out
description: In bb's sandboxed modes (Claude Code 2.1.328, bb-app 0.50.1) the sandbox confines shell commands only; the Write and Edit tools write anywhere outside the home unless `permissions.blockWritesOutsideWorkingDirectories` is set, bb pre-allows an MCP tool that moves the thread's working directory out of the home, a rewritten ~/.bashrc runs unsandboxed later, and only Claude's managed settings stop a command from leaving the sandbox.
about: [workstream/provider-integration]
kind: lesson
id: ins-b1e1a922381d
tags: [claude-code, sandbox, bb, security-boundary, permissions]
timestamp: 2026-11-20
---

# What was observed (container probes, mock model, one run per case; auto rows had the classifier approving)

- **The OS sandbox binds shell commands, not the file tools.** With only deny rules for home paths, Claude's Write and
  Edit tools wrote every target outside the home: the deployment's configuration, the session receipt, the lock, a module
  file, a sibling home, `~/.bashrc` and `~/.profile`. Auto asked nobody; accept-edits prompted once per write. Sandboxed
  shell commands were refused on all of them.
- **A rewritten `~/.bashrc` runs unsandboxed** at the thread's next shell command, without `dangerouslyDisableSandbox`:
  the OS user's home is an execution path out of the sandbox.
- **bb pre-allows `mcp__bb-bridge__update_environment_directory`.** Called with any directory, it moves the next turn's
  working directory there with no prompt, the home's settings stop loading, and sandboxed commands then write outside the
  home. A `permissions.deny` naming the tool removes it.
- **No deny pattern means "everything outside the home"**: `Edit(//**)` denies the home too, and `allow` never overrides
  `deny`. The default-deny form exists: `permissions.blockWritesOutsideWorkingDirectories: true`, honoured from the
  home's settings.local.json in both modes, leaves the home writable and closes the file tools' routes (symlinked
  directories and NotebookEdit included). It does not limit shell commands or MCP tools.
- **The way out stays open**: bb starts Claude with `allowUnsandboxedCommands: true`; nothing a provider can write
  overrides it; only Claude's managed settings did.
- `git commit` in a linked worktree fails in a sandboxed mode: objects and refs live in the clone outside the home.

# What follows

A provider that sandboxes writes both closing entries (the block setting and the deny of the move tool) and pins
the list of MCP tools bb pre-allows at every bump; it never calls the sandboxed modes a boundary. In OATS these probes
are the evidence behind "the sandbox holds the shell only" in
[a harness sandbox in a provider home is not a security boundary unless the agent cannot switch it off](/nodes/oats-maintainer/decisions/a-harness-sandbox-is-not-a-boundary-unless-its-switch-is-out-of-reach.md)
(`dec-375435ce318a`): bb homes run in full mode only, and what lifts that is that decision's later amendment with
its three conditions, not a probe alone. This lesson keeps the harness's exact keys and routes, which the decision
leaves to the contract and the provider's documentation; it complements
[Claude Code's sandbox widens by exact entries](/claims/lessons/claude-codes-sandbox-widens-by-exact-entries-but-has-four-traps.md)
(`ins-56c00f906965`) and supersedes nothing.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-20 (oats-knowledge#448);
   notes/bb-file-tools-not-confined-to-home.md, notes/claude-sandbox-switch-closes-only-from-managed-settings.md,
   notes/claude-sandbox-deny-rules-bind-tools-only-as-edit-deny.md. The container probes (bb-app 0.50.1, Claude Code
   2.1.328, mock model, one run per case) are the source's report; they were not reproduced at maintainer review.
2. Checked at maintainer review 2026-11-21: oats-project/oats-bb#8 (merged 2026-11-21) writes
   `permissions.blockWritesOutsideWorkingDirectories: true` and a deny of `mcp__bb-bridge__update_environment_directory`
   behind the full-mode-only refusal; its contract test against bb-app 0.50.1 and Claude Code 2.1.328 records bb
   pre-allowing exactly that one MCP tool, the Write tool refused outside the working directories by the switch, a
   command that asks to run outside the sandbox writing past every rule, and a sandboxed agent unable to stage or
   commit in a linked worktree. The `.bashrc` route, `allowUnsandboxedCommands: true` and the managed-settings result
   are the source's report.
