---
type: Lesson
title: Keyboard policy follows actions and user intent
description: Focus intent, effective bindings and event ownership must agree without consuming native terminal or control input.
about: [system/oats-desktop]
kind: lesson
id: ins-92683497c350
tags: [desktop, keyboard, focus, keybindings, terminal]
timestamp: 2026-10-15
---
# Rationale

Learned 2026-07-25 to 2026-07-26 by the Desktop engineering role, from
three defects found in review of the first keybinding engine and terminal
tabs: tab restoration and close-fallback stole input focus from wherever
the operator was typing; an allowlisted sidebar toggle would have resolved,
on non-mac platforms, to the chord that is the tmux prefix inside the
terminal; and chords claimed at the window level were reaching the pty
first because the terminal wrote the control byte before the application
saw the event.

Activating a tab and asking to type in its terminal are different intentions. User jumps may focus input; restoration and background activation must not steal it. Structural tab traversal and focus recovery are not merely rebindable application shortcuts.

One effective action policy should govern displayed hints, explicit unbinds, keyboard dispatch and pointer affordances. A fallback keymap that resurrects an unbound action contradicts the user's choice. Terminal policy follows the action across rebindings, but every resolved chord still needs collision review against native control bytes.

Event ownership matters before dispatch: a late no-op after preventDefault still breaks a native control. Application shortcuts must neither consume ordinary typing nor send terminal bytes before claiming a chord. Unit policy checks and real input evidence serve different parts of this boundary.

Integration limitation (2026-07-26): `KeyboardEvent.key` reports the shifted character, so a default chord such as Mod+Shift+\ parses and round-trips yet never fires unless the engine aliases the shifted character (`|`) to its base key. Every default built on shifted punctuation needs that alias and a test that dispatches the real shifted event, not a parse round-trip.

# Linux and Windows terminal chords preserve the program's input

The source expert's 2026-10-14 decision makes the earlier collision-review
requirement concrete: an app chord may fire in a focused terminal on Linux
or Windows only if the installed xterm sends nothing for it, or if its output
remains available to the program through a plainer key. The recorded aliases
are Ctrl+3 to Esc, Ctrl+Tab to Tab, Ctrl+Shift+Tab to Shift+Tab, and
Ctrl+Shift+Alt+W to Ctrl+Alt+W. Ctrl+Shift+F6, the explicit leave-terminal
action, is the one deliberate exception to this input-preservation rule.

Plain Ctrl+letter, Alt+key, function keys and Ctrl+PgUp/PgDn otherwise belong
to the terminal program. App actions needed from a terminal use suitable
Ctrl+Shift+letter defaults: the reported sidebar, instance-panel and filter
choices are Ctrl+Shift+B, Ctrl+Shift+I and Ctrl+Shift+F. macOS retains its
Command-key policy. These are platform-scoped choices, not permission to
allow every similarly shaped chord or bypass collision review after a rebind.

The rejected alternative was an unexplained per-action allowlist: it left
other app actions unreachable from a Linux terminal without explaining which
input the application could safely claim. The first proposed replacement,
"no output", was also too strong: checking the installed xterm evaluator
exposed four already-allowed aliases with output. Preserving a plainer route
to those bytes, rather than pretending the chords emit nothing, explains the
tradeoff without silently changing the rule.

The elimination route for drift is the exact-output CI guard reported with
the decision: evaluate each allowlisted chord through the installed xterm's
own key evaluation and assert its expected output, including the aliases and
explicit exception. An upgrade that changes that output requires review;
a hand-maintained assumption that a chord is empty is not evidence. This
supplements, rather than replaces, real event-ownership and focus testing.
The current shortcut documentation owns the full binding table.

# Palette and Quick Open must be reachable from the terminal

The source expert reports a human-requested decision on 2026-10-15: use
Ctrl+Shift+K for the palette and Ctrl+Shift+P for Quick Open on Linux and
Windows, with both actions available from a focused terminal. Keep macOS's
⌘K/⌘P. The K/P pairing preserves one mental model across platforms, while
plain Ctrl+P remains available to the terminal program, including shell
history. Leaving Quick Open off the terminal allowlist was rejected because
it left the action unreachable where operators spend most of their time.
The source reports that both new defaults emit nothing under xterm.js 5.5;
this applies the input-preservation rule above, not a new exception to it.

The accepted compatibility cost is explicit: Ctrl+Shift+P changes from the
palette to Quick Open, with release-note disclosure of the reassignment. Keep
stored overrides rather than migrate them: action identities remain stable,
and an override is the user's choice. A stored binding that collides with a
new default is surfaced as a clash in the shortcuts editor, not silently
rewritten. The source reports a regression pinning that clash behavior.

Terminal eligibility follows the action, including a user's Quick Open
rebind; it is not limited to the new default chord. Consequently, a plain
Ctrl+letter override can take that key from the terminal program. The
reported choice was to document this consequence rather than special-case
Quick Open rebindings. This does not relax the collision-review requirement
or make such an override safe by default. Keep the binding table and exact
regressions in the repository; this record preserves the reachability and
user-choice tradeoffs.

# Related

[Workspace focus restoration](../decisions/workspace-switch-restores-focus-place.md) applies the intent rule to a deliberate return: remember the work place before transit, and yield to any later operator action.

For post-upgrade reports, first [establish the running Desktop's version](check-running-version-before-debugging-behaviour.md); a newly opened window can still be old code.

[Agent-centered navigation makes the action target legible](../decisions/agent-centered-navigation.md); [Terminal tabs are viewers, not session owners](../decisions/terminal-viewers-not-session-owners.md); [Async completion must still own the user's intent](asynchronous-intent-and-truthful-outcomes.md); [Browser-owned state and accessibility under repaint](browser-owned-state-and-accessibility-under-repaint.md).

# Current contracts

- [Current keybindings.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/keybindings.mjs)
- [Current terminal-tab.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/terminal-tab.mjs)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/shifted-punctuation-default-chords.md @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-linux-shell, 2026-10-14; notes/linux-terminal-shortcut-rule.md. The source reports maintainer acceptance before implementation and the exact-output guard in [awebai/oats#1160](https://github.com/awebai/oats/pull/1160), merged as `4f21918f`, against xterm.js 5.5.0. Acceptance, merge and test results are source-reported, not independently audited by this harvest. See [the current keyboard contract](https://github.com/awebai/oats/blob/main/packages/desktop/docs/desktop-keyboard.md).

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-linux-palette-keys, 2026-10-15; notes/palette-quick-open-linux-chords.md. The source reports the human request in [awebai/oats#1217](https://github.com/awebai/oats/issues/1217), maintainer-approved implementation in [#1221](https://github.com/awebai/oats/pull/1221) (`04b9a375`), and passing xterm-output and override-clash tests. Acceptance, merge and test results are source-reported, not independently audited by this harvest. The same proposal supplies the keyboard-contract link correction.
