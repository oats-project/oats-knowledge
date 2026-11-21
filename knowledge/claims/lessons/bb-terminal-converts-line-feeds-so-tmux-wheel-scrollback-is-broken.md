---
type: Lesson
title: bb's terminal converts line feeds, so wheel scrollback of a tmux session inside bb is broken either way
description: bb 0.50.1 creates its terminal with xterm.js convertEol on; with tmux's mouse on, wheel scrolling in copy mode smears the screen, and with it off the wheel types Up arrows into the program. Copy mode by keys scrolls cleanly.
about: [workstream/provider-integration]
kind: lesson
id: ins-42194160ff36
tags: [bb, terminal, tmux, xterm, scrollback, limitation]
timestamp: 2026-11-21
---

# What holds

bb-app 0.50.1 creates the xterm.js terminal of its Terminal tab with `convertEol: true`, so a bare
line feed also returns the cursor to the first column. A tmux client attached inside that tab then
misdraws whatever tmux paints with a bare line feed followed by writes that rely on the column.
Seen: scrolling tmux's copy mode line by line with the wheel (tmux `mouse on`) leaves the old
position markers stacked down the right edge and blanks the start of those rows.

With tmux `mouse off`, bb's terminal sees a full-screen program and turns the wheel into arrow
keys: the wheel recalls shell history, or moves an agent's cursor, and scrolls nothing.
Shift+PageUp does nothing, because bb's own scrollback is empty under tmux.

Entering copy mode by keys and paging (prefix, `[`, PageUp) draws cleanly. `less` scrolled by line,
`top`, and a column drawn with cursor moves were not affected. A real agent's interface was not
tried.

# What it changes

- Do not promise wheel scrollback for a tmux-attached agent shown in bb's Terminal tab. Offer the
  keys, or keep the wheel out of the claim until bb changes.
- The fix is bb's (drop `convertEol` for its terminals), not a plugin's: a plugin cannot set
  terminal options.
- When a terminal shown through a third party's emulator looks corrupted, replay the bytes the
  host recorded through the same emulator with the suspect option on and off before blaming the
  program: it separates the stream from the renderer in minutes.

# Related

- [A bb plugin shows a terminal only from a plugin page or a thread header row](/claims/lessons/a-bb-plugin-shows-a-terminal-only-from-a-plugin-page-or-a-thread-header-row.md)
  (`ins-b6ee06e96533`) is how a plugin puts the tmux client in that tab.
- [A bb plugin command's shortcut does not fire from a focused terminal](/claims/lessons/a-bb-plugin-shortcut-does-not-fire-from-a-focused-terminal.md)
  (`ins-a9747a47bf12`) is another limit of the same terminal, settled the same way: by a run, not
  a reading.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-terminal-tmux-probe, 2026-11-21;
   notes/bb-terminal-converteol-smears-tmux-copy-mode.md. The trial (bb-app 0.50.1, tmux 3.3a,
   headless Chromium at 1280x800 and 390x800): the smear, the wheel as arrow keys with tmux's mouse
   off, the clean paging by keys, and the replay of the bytes bb recorded for the terminal
   (`bb terminal output --json`) through xterm.js 6.0.0 headless, smeared with `convertEol` on and
   correct with it off, are the source's report; review ran no bb.
2. get-bb/bb, read at maintainer review 2026-11-21:
   `apps/app/src/components/thread/terminal/ThreadTerminalView.tsx` creates its xterm.js
   `Terminal` with `convertEol: true` at `desktop-v0.50.1` (`a08e1165`), at `df9619d8`, and still
   on `main` at `35a03bbb`.
