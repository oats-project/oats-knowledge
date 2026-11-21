---
type: Lesson
title: A bb plugin command's shortcut does not fire from a focused terminal; a capture-phase content script does
description: In bb 0.50.1 a plugin command's default shortcut never fires while bb's terminal has the focus if the terminal can encode the chord. Only a trusted content script listening in the capture phase, or a chord the terminal cannot encode, reaches the plugin ahead of the program.
about: [workstream/provider-integration]
kind: lesson
id: ins-a9747a47bf12
tags: [bb, plugin, keyboard, terminal, verification]
timestamp: 2026-11-21
---

# What was tried

In bb-app 0.50.1 (plugin SDK 0.6.157), with trusted keys from a headless Chromium and a raw-mode
byte reader running in bb's Terminal tab:

- A command registered with `app.commands.register` and a `defaultShortcut` of Ctrl+Space or
  Ctrl+X runs from the sidebar, the composer and plugin pages. With the terminal focused it does
  not: the program receives `00` or `18`, and then the next key. The key reaches the page, but
  the terminal consumes every chord it can encode before the event reaches the `window` listener
  bb dispatches from. bb's own Ctrl+J went to the program the same way.
- Chords the terminal cannot encode get out. A command on Ctrl+Shift+Space ran from the focused
  terminal and the program received nothing.
- A listener that `app.contentScripts.register` adds on `window` in the capture phase, calling
  `preventDefault()` and `stopImmediatePropagation()`, takes the key in every focus place, ahead
  of bb and of the program in the terminal.

# What follows

- A plugin key that must work everywhere, the terminal included, needs the content-script route
  or a chord no terminal encodes. The content-script route costs the person that chord in their
  shell and editor, and it also acts while a bb modal is open, where bb turns its own bindings
  off: the plugin checks for a modal itself.
- A bb thread row calls `preventDefault` on Space, so a Ctrl+Space command is dead while a row has
  the focus. A default equal to one of bb's own is left unbound, and bb's keyboard settings say so.
- A reading of bb's source had concluded that plugin commands fire with a terminal focused, from
  the command's context rule. The rule allows it; the event never arrives. A claim about keyboard
  reach in an app with an embedded terminal is settled by a run with a program reading keys.
- The capture-phase order and the terminal's key handling are in no contract of the plugin SDK:
  re-run the trial on each bb version the plugin supports.

# Related

- [Prove a package by the install route its users take](/claims/lessons/prove-a-package-by-the-install-route-its-users-take.md)
  (`ins-1829d19b2559`) is the same lesson for packaging: a check that reads the author's tree is
  settled only by the route users take.
- [The OATS view inside bb never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`) is the plugin this was tried for.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-reach-try-probe, 2026-11-21;
   notes/host-shortcut-does-not-reach-a-plugin-from-a-focused-terminal.md. The trial's key logs
   and the bytes the program received are the source's report; review ran no bb.
2. get-bb/bb at `desktop-v0.50.1` (`a08e1165`, plugin SDK 0.6.157), read at maintainer review
   2026-11-21: `apps/app/src/hooks/usePluginCommandBindings.ts` gives a plugin command that does
   not target the composer the rule `all: [mainSurface], none: [modalOpen]`, so a focused
   terminal does not exclude it; `apps/app/src/components/commands/AppCommandProvider.tsx`
   dispatches bindings from a bubble-phase `window` keydown listener that skips an event whose
   default was prevented; `apps/app/src/lib/plugin-command-keybindings.ts` sets a plugin
   default that collides with another binding to no shortcut, and the keyboard settings list
   the conflict. The thread row's handling of Space is the source's report.
