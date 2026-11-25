---
type: Lesson
title: herdr restarts recognised agents by itself after a server restart, outside OATS's records
description: By herdr's documentation at 0.9.5, after a server restart herdr re-runs in each restored pane the resume command its integration reported (pi --session, claude --resume), on by default; a session provider over herdr must own that command or have it switched off, or an agent comes back without its OATS launch and a home OATS stopped runs again.
about: [workstream/provider-integration, system/oats-kernel]
kind: lesson
tags: [herdr, session-provider, resume, restore, stop-stays-stopped, research]
timestamp: 2026-11-25
---

# What was read

herdr's documentation at tag v0.9.5 ("Session state and restore", "Add Herdr support to your
agent", "Socket API", "Agent automation"), on 2026-11-25, against the session-provider
contract in `docs/capabilities.md`. First-party claims: nothing was tried.

- **herdr resumes agents itself.** A server restart ends every pane's process. herdr then
  restores the layout and, where an integration reported a session reference, runs the
  agent's own resume command in the pane (`pi --session <id>`, `claude --resume <id>`). It is
  on by default (`[session] resume_agents_on_restore`), for all panes at once.
- **For an OATS agent in such a pane** that is a harness started again with none of the
  launch's environment, arguments or briefing, and started even where the kernel recorded a
  stop. That a stop stays stopped is the kernel's rule
  ([a session backend other than tmux is a session provider](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)).
- **A reporter can attach its own resume command** (`resume_argv`): the first word a plain
  command on `PATH`, at most 64 arguments and 8 KiB, no apostrophe. It takes precedence over
  herdr's built-in one while the same source and agent hold the pane. Whether a second source
  can hold a pane that herdr's own integration reports for is not known.

Other lines that bear on mapping the provider's verbs:

- `agent.prompt` refuses a blocked agent (`agent_blocked`) and sends nothing, which is the
  contract's `E_SESSION_PROMPT_OPEN`.
- A successful input acknowledges "queue admission, not command execution", and a timeout
  does not prove nothing was sent: weaker than the contract's "submitted only when dispatched".
- `workspace.create`, `tab.create` and `pane.split` take a directory and an environment but
  no command. A command arrives by typing at the shell, by `agent.start` (a fixed list of
  agent kinds), or by `layout.apply` with an argv.
- A pane moved to another workspace gets a new public pane id, so a pane id alone is a weak
  endpoint.
- herdr does not look inside a tmux session running in a pane: it sees `tmux`.

# History that bears on it

OATS shipped `--backend herdr` in 0.22.2 and removed it in 0.31.0; the reason is not
recorded. Its release notes record two costs: herdr's protocol moved under it (20 to 22),
and a launch typed into a pane before its shell was ready arrived cut (0.30.3). The name
`herdr` is reserved in the session-provider manifest.

# Citations

1. herdr documentation at v0.9.5, pages Session state and restore, Add Herdr support to your
   agent, Socket API, Agent automation, Agents:
   `https://raw.githubusercontent.com/herdrdev/herdr/v0.9.5/docs/next/website/src/content/docs/` (retrieved 2026-11-25).
2. OATS `docs/capabilities.md` (Session providers), `docs/release-notes/v0.30.3.md`,
   `docs/release-notes/v0.31.0.md`.
