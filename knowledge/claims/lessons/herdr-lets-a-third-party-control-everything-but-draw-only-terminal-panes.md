---
type: Lesson
title: herdr 0.9.5 lets a third party control and report everything, but draw only terminal panes
description: By herdr's documentation and bundled API schema at 0.9.5, a tool or plugin can create, read, type into, wait on and close workspaces, tabs, panes and agents and report an agent's state, but its only interface is a terminal program in a pane or a popup; the sidebar takes custom tokens only where the person's own config names them and one agent view for the whole list, with no tree, no palette and no plugin-declared keys.
about: [workstream/positioning, workstream/provider-integration]
kind: lesson
tags: [herdr, plugin, socket-api, sidebar, third-party-runner, research]
timestamp: 2026-11-25
---

# What was read

herdr's documentation at tag v0.9.5 (Plugins, Socket API, Configuration, Agents, Agent
automation) and the API schema bundled in the 0.9.5 binary (`herdr api schema --json`,
protocol 22), on 2026-11-25. These are first-party claims: nothing was tried.

- **Control is wide.** 102 request methods; the `herdr` CLI wraps them and is the plugin
  API ("the entire Herdr CLI is the plugin API"). Create, list, focus, rename, move and close
  workspaces, tabs and panes; read a pane; send text, keys and input; wait for output; start a
  supported agent in a shell pane, prompt it, wait on its state; subscribe to lifecycle and
  agent-status events; show a notification.
- **Reporting is first class.** `pane report-agent` makes a pane an agent in state idle,
  working or blocked, and drives the dot, the roll-up, notifications and waits.
  `report-metadata` is display only: a title, a displayed name, the words for each state, and
  named tokens (32 per pane or workspace, 80 characters each).
- **Drawing is narrow.** Plugin v1 declares actions, event hooks, one-shot startup hooks,
  panes (overlay, popup, split, tab, zoomed) and link handlers. A pane is a terminal program;
  native non-terminal plugin interface and runtime registration of actions are outside v1.
- **The sidebar is the person's.** The Agents list is flat. A reported token appears only
  where the person's `config.toml` rows name it (`$name`); styling is in that config too.
  `agent.view.set` installs one filter and sort (by status, place, or any token) for the whole
  list, with one owner at a time, and it ends with the server.
- **Keys are the person's.** A plugin declares none; the person binds
  `[[keys.command]] type = "plugin_action"`. herdr has no command palette.

Not known from the documentation: what an action's `contexts` changes on screen, whether
actions appear in a menu or the Goto picker, what the schema's `command.invoke` does, and
which source wins when two report for one pane.

# Why it matters

A view of OATS inside another product is asked to use the host's own interface. In bb that is
web components a plugin can reuse. In herdr the host's own interface is rows, dots, toasts and
keys, and every screen is a terminal program, so the terminal client OATS already ships
(`oats tui`) is the natural screen, and what the sidebar shows depends on lines in the
person's own configuration. The rule for such a view stays the one recorded for bb:
[an OATS view inside a third-party runner reads the kernel's JSON verbs and never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md).

# Recheck

herdr is pre-1.0 and releases often: recheck against its current documentation before a
design rests on any line here.

# Citations

1. herdr documentation at v0.9.5, pages Plugins, Socket API, Configuration, Agents, Agent
   automation: `https://raw.githubusercontent.com/herdrdev/herdr/v0.9.5/docs/next/website/src/content/docs/` (retrieved 2026-11-25).
2. `herdr api schema --json`, herdr 0.9.5, protocol 22 (read 2026-11-25).
