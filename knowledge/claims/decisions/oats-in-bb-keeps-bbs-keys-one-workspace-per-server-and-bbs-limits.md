---
type: Decision
title: OATS inside bb uses bb's own keys, one workspace per bb server, and accepts what bb cannot give
description: Joan decided, from the parity matrix's list of what bb's plugin surface cannot or need not give, that the plugin gets bb-native keys and a palette of its own but no leader key, shows one workspace per bb server, and records bb's remaining limits as limits; bb itself stays unchanged.
about: [workstream/provider-integration, workstream/oats-direction]
id: dec-175993d33a27
kind: decision
tags: [bb, plugin, parity, keyboard, palette, workspaces, limits, rejected-alternatives]
timestamp: 2026-11-21
---

# The decision

The acceptance criterion for OATS inside bb is that every OATS feature a person uses is there, one
to one, with a great experience. The parity matrix judged against it listed what bb's plugin
surface cannot give or gives at a cost. Joan decided each group, on one card, on 2026-11-21:

1. **Keys and palette: bb-native.** The plugin gets the Desktop's plain keys in its own tree, its
   lifecycle acts as plugin commands whose shortcuts a person rebinds in bb's Keyboard settings,
   keys in its own forms, a shortcuts sheet, and a palette of its own (bb's palette takes a plugin's
   static commands only: no row per agent or soul). It gets **no leader key** and none of the
   Desktop's global keyboard model.
2. **One bb per workspace.** The plugin shows one deployment; there is no list of workspaces in it.
   bb's server switcher is the nearest thing.
3. **bb's limits are accepted as stated limits**, each recorded with the nearest thing bb has: no
   terminal for an agent bb runs, no region focus across bb's regions, no font-family choice, no
   mark on bb's own panel button, no status line, and bb's server listening without a login.

# Why

A trial in a running bb showed a leader key on a chord the terminal encodes reaches everywhere,
bb's terminal included, only through a content script that takes the chord from the shell or
editor in that terminal; as an ordinary plugin command it does not reach from the terminal (only a
chord no terminal encodes gets out that way). Taking a key from a person's shell was
judged worse than not having the leader. A list of workspaces would put several trust groups behind
one bb server that has no login. And bb itself is not to be changed for this.

# What it means for later work

"One to one" has named, dated exceptions: a later reader should not reopen them as gaps, and should
not build a content script that captures keys. A new limit found later goes to the person the same
way: stated with the nearest thing, never dropped silently.

# Acceptance

**Decision by Joan, 2026-11-21**, the person the effort is for. The acceptance is
**source-reported**: it reached the specialist by message from the effort's lead, taken on a card
built from the parity matrix (version 3) and recorded in the matrix's version 4. No GitHub record
of it was found at maintainer review. A later instance does not reopen these exceptions on its
own; a change to them needs Joan's acceptance, cited.

# Related

- [A bb plugin command's shortcut does not fire from a focused terminal; a capture-phase content script does](/claims/lessons/a-bb-plugin-shortcut-does-not-fire-from-a-focused-terminal.md)
  (`ins-a9747a47bf12`): the trial behind "no leader key". It is why a key that reaches the
  terminal costs the person that chord in their shell and editor.
- [The OATS plugin for bb asks for bb's full mode on every spawn, without a control](/claims/decisions/the-bb-plugin-asks-for-full-mode-on-every-spawn-without-a-control.md)
  (`dec-0850fbbbe808`): another of Joan's decisions on the plugin, taken the same way.
- [An OATS view inside a third-party runner reads the kernel's JSON verbs and never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`): the plugin these exceptions are for.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-21
   (oats-knowledge#455); notes/bb-parity-joans-three-decisions.md. The parity matrix, the card,
   the options and the relay are the source's report; the matrix is not on GitHub.
2. The leader-key trial in bb-app 0.50.1 is the trial recorded in `ins-a9747a47bf12`, whose bb
   source reading was verified at its own review. What bb's palette and server do (static plugin
   commands only; no login) is the source's report and was not re-read at this review.
