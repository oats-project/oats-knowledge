---
type: Decision
title: The Desktop's agent view never guesses what is on the agent's input line; a question's card stays until the agent clears it
description: A numbered answer types `<id>: <option>` only after main reads the viewer pane as not in a tmux mode (fail closed, remote tabs disabled), and the card is never hidden on a guess that the answer was sent: only the agent's `board ask --clear` removes it.
id: dec-78e0d9d8bc24
about: [system/oats-desktop]
kind: decision
tags: [desktop, agent-view, board, terminal, input, tmux, copy-mode, fail-closed]
timestamp: 2026-11-20
---

# The decision

The agent view (contract D30 v4: an agent's facts and numbered questions around its terminal)
answers by typing into the agent's own terminal, the one input surface
([terminal viewers are not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)). Two rules:

- **Type only on a proved-safe pane.** The renderer asks main through the existing `termWrite`
  call with an option (no new exposed preload key, same arity). Main reads `#{pane_in_mode}` on
  the viewer's anchored target, behind the same principal, authorize and lease guard. Only a read
  of "0" types. Copy mode (`E_TERM_IN_MODE`) and an unreadable mode (`E_TERM_MODE_UNKNOWN`) type
  nothing and say why. A remote viewer has no local pane to read, so its numbers are disabled with
  a line telling the person to type the answer. The read and the write are back to back but still
  two steps: the docs say that gap remains.
- **No guess about the input line.** No optimistic hide on Enter, no "answer pending" state, no
  refusal of a second press. A card stays until the agent clears the question. After a press an
  informational note ("typed on the input line: press Enter in the terminal") shows, ended by the
  next terminal input other than focus or mouse reports.

# Why

The Desktop sees keystrokes, not the harness's line editor. Each Opus review round found a new major
in the answer path: a scrolled-back pane's copy mode ate the `q` of `q1:`, so a bare digit landed;
then an answer cleared with Backspace or Esc, followed by any Enter, hid a question the agent never
got. After the second of those majors the lead simplified instead of patching: the only true signal
that an answer arrived is the agent clearing the question. Even the simplified note was erased by
tmux focus reports the moment it showed (a later round's minor), which is why only focus and mouse
reports are ignored.

Rejected: leaving copy mode for the person (moves their view without their key); tracking Enter,
Ctrl+C and Ctrl+U to infer a cleared line (every editor clears differently); typing on remote tabs
without a mode read (would break fail-closed). A remote kernel reporting the pane's mode is
follow-up work (oats-project/oats issue 2029).

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-20; oats-project/oats PR 2024 (Opus review rounds posted on the PR); notes/redesign-desktop-first-is-cheaper.md.
