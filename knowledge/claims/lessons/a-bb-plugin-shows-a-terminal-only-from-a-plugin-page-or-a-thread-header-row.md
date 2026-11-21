---
type: Lesson
title: A bb plugin shows a terminal only from a plugin page or a thread header row, never from the sidebar or the overlay
description: In bb 0.50.1 a plugin opens bb's Terminal tab in two calls (create a terminal, then show it by id), and the second is accepted only from a plugin page (any terminal, no thread needed) or a thread header row (that thread's terminals); from the sidebar slot and the app overlay it answers false and leaves the command running unseen.
about: [workstream/provider-integration]
kind: lesson
id: ins-b6ee06e96533
tags: [bb, plugin, terminal, tmux, sidebar, experimental-api]
timestamp: 2026-11-21
---

# What holds

In bb-app 0.50.1 (plugin SDK 0.6.157) a plugin puts a command in bb's own Terminal tab with two
calls: `useSdk().terminals.create({ scope, start: { mode: "argv", argv }, cols, rows, title })`,
which is stable and starts the command at once, then
`useBbNavigate().experimental_openTerminal({ terminalId })`, which is experimental and takes a
terminal id, not a command.

Whether the second call is accepted depends on the slot that holds the hook, not on the route on
screen:

- **A plugin page** (`navPanel`): any terminal, including one scoped to a machine and a directory
  (`host_path`). No bb thread is needed. The tab then lives on the plugin's pages.
- **A thread header row**: only a terminal scoped to that thread.
- **The sidebar slot** (`experimental_threadList`) **and the app overlay**: always `false`, on the
  start screen, on a plugin page and on a thread, with either scope.

Tried with `tmux attach -t <session>` on a session that already existed: keys, reload, two tabs on
one session, colours, resize and a 390-pixel-wide screen all worked, and closing the tab left the
tmux session alive.

# What it changes

- **A sidebar row opens a terminal by navigating**, not by calling: it goes to a plugin page with
  the agent in the sub-path, and the page, on arrival, reuses a running terminal with the agent's
  title (`terminals.list`) or creates one, then shows it. The same code serves a reload and a link.
- **Never create where the show will be declined.** A declined call leaves the terminal running on
  no tab; for `tmux attach` that is a hidden client attached to the agent's session.
- **The plugin must say why nothing is there.** When the command exits (no such session, the
  session ended, a detach) bb removes the tab with no message, and the show call had answered
  `true` for a command that exited at once. Check the session before creating, and tell the person.
- A terminal command gets the login shell's PATH, not the one bb was started with: name `oats` by
  absolute path or make sure it is on the login PATH.

# Related

- [A bb plugin's openTab at mount is declined; retry until it is accepted](/claims/lessons/a-bb-plugins-opentab-at-mount-is-declined-retry-until-accepted.md)
  (`ins-ae07668867eb`) is the same shape of host call: a decline is a `false`, never a throw.
- [bb's terminal converts line feeds, so wheel scrollback of a tmux session inside bb is broken either way](/claims/lessons/bb-terminal-converts-line-feeds-so-tmux-wheel-scrollback-is-broken.md)
  (`ins-42194160ff36`) is the other limit found in the same trial.
- [The OATS view inside bb never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`) is the plugin this was tried for.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-terminal-tmux-probe, 2026-11-21;
   notes/bb-open-terminal-needs-a-surface-with-a-panel.md. The trial (bb-app 0.50.1, plugin SDK
   0.6.157, headless Chromium at 1280x800 and 390x800, tmux 3.3a): the call's answer per slot and
   scope, tmux's client list after each click, the tab removed without a message when the command
   exits, and the login-shell PATH, are the source's report; review ran no bb.
2. get-bb/bb at `desktop-v0.50.1` (`a08e1165`, plugin SDK 0.6.157), read at maintainer review
   2026-11-21: `packages/plugin-sdk/src/app-contract.ts` declares
   `experimental_openTerminal(options: { terminalId: string }): Promise<boolean>`;
   `docs/api_to_audit.md`, "Terminal navigation", says a thread surface accepts only that thread's
   terminals, the New thread screen its current scope and a plugin page any terminal, and that it
   resolves false on surfaces without a terminal panel, without naming the sidebar or the overlay.
   The source shows why they decline: `apps/app/src/lib/app-navigation-host.tsx` answers `false`
   by default and takes the handler from the nearest provider above the hook; only the thread view
   (`ThreadDetailView.tsx`, which renders the plugin thread header rows inside it and accepts only
   its thread's terminals), the New thread screen and the plugin page host supply `openTerminal`,
   and the app-level host (`AppFileExternalNavigationHost.tsx`) supplies only
   `openFileExternally`. Not run on a later bb.
