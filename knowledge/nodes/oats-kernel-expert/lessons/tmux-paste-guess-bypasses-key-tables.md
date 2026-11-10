---
type: Lesson
title: tmux's paste guess can bypass a key-table test
description: Burst input can bypass every tmux key table and mask coverage, so disable paste guessing on private key-table test servers rather than changing production paste handling to fix CI.
about: [system/oats-kernel]
kind: lesson
id: ins-aaaaf261b8f7
tags: [tmux, viewers, key-tables, testing, compatibility]
timestamp: 2026-11-04
---
# Lesson

When a real-tmux viewer test changes cursor-key encoding across tmux versions,
first check whether its simulated keystrokes were handled as a paste. A passing
byte assertion need not prove that the viewer's key table ran.

The source's investigation on tmux 3.4 and 3.6 found that keys handled less than
`assume-paste-time` apart (default 1 ms) arm a paste guess: the second key arms
it and, from the third key of a continuing burst, input bypasses the session
key table, the prefix table and `Any` bindings. Sending a whole key sequence
with `send-keys` to an outer terminal can produce that burst at the inner
client. This is not the same as directly injecting input into the target pane.

The clock is when the server handles keys, not when a person presses them.
Buffered input or a stalled server can therefore reproduce the effect even
with separated key presses; spacing the test sender's calls is not a robust
way to prove key-table coverage.

# Version-dependent evidence

The source reports these observations on 2026-11-04:

| tmux tested | Guessed-paste behavior in the tested setup | Consequence |
| --- | --- | --- |
| 3.4 | Re-encodes the key for the pane; Up became `ESC [ A`. | Expected bytes could arrive without exercising the viewer table. |
| 3.6 | Forwards the terminal's raw bytes; Up became `ESC O A` from a terminal in keypad mode. | The same coverage hole also broke byte-exact cursor-key assertions. |
| 3.7c | Does not guess when the client terminal advertises bracketed paste (`Enbp`), as the outer tmux pane did. | That setup exercised the key tables instead. |

The source attributes the bracketed-paste check to the 3.7 change associated
with [tmux/tmux#5031](https://github.com/tmux/tmux/issues/5031). This is not a
claim that paste guessing disappeared for every terminal or that every earlier
release was tested. The investigation did not check 3.5a or macOS, or audit
Ubuntu's 3.6 patches; its upstream 3.6 build reproduced the reported CI bytes.

# Fix the fixture, not production paste policy

A test intended to exercise key tables should set `assume-paste-time 0` as a
global session option on **its own private tmux server**, inherited by the
viewer sessions it creates. Do not change the operator's server. Pair the
fixture setting with a mutation that drops a key in the viewer binding: the
assertion must fail when that binding is broken, not merely when pane bytes
happen to differ.

The source reports that a 3.4 mutation dropping the key after `C-b` exposed
only the first loss without the setting, but exposed every loss with it. It
also reports the bounded test file passing on 3.4, 3.6 and 3.7c after the
fixture change. These are source-reported results, not experiments rerun by
this harvest.

**Rejected as a CI repair:** setting `assume-paste-time 0` on production
viewer sessions. That also changes unbracketed-paste handling, which needs its
own behavior decision. In the investigated path, a guessed paste writes to
the pane; bypassing bindings does not itself grant tmux navigation or command
execution. The source reproduced raw-byte forwarding on stock 3.6 without
OATS tables and with a paused server receiving keys sent 100 ms apart. Thus
the buffered-input limitation is not solely a synthetic-test phenomenon, but
it also does not by itself invalidate the locked viewer's one-window boundary.
Do not turn a coverage repair into an unreviewed production policy change.

# Canonical boundaries and elimination route

This adds a separate dispatch limit to
[A tmux viewer's key table is server state, not session state](/nodes/oats-kernel-expert/lessons/tmux-viewer-key-tables-are-server-state.md).
That lesson retains table ownership, cleanup and prefix precedence. The
[caller-chosen detach-key decision](/nodes/oats-kernel-expert/decisions/viewer-detach-key-is-caller-chosen.md)
retains grammar, copy-mode and exit-status policy, and
[Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)
retains viewer ownership. None is superseded here.

The fixture remedy belongs in code, not a permanent manual testing checklist.
The source identifies `test/session-attach-detach-key.test.mjs` as the local
fix. Audit other burst-driving real-tmux tests for the same coverage hole;
where they intend to exercise key tables, put the option in shared private-server
setup and retain mutation-sensitive assertions across the relevant tmux
versions. That shared-fixture audit is an elimination route, not completed
coverage claimed by this proposal. Paste-behavior tests must remain able to
exercise the heuristic deliberately.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-tmux-2604-detach-key, 2026-11-04; notes/tmux-paste-guess-bypasses-key-tables.md.

The captured proposal and note report upstream-source reading, isolated-server
experiments, stock-tmux controls and mutation testing. The proposal names
[oats-project/oats#1735](https://github.com/oats-project/oats/issues/1735) and
[the fixture repair in #1737](https://github.com/oats-project/oats/pull/1737)
as investigation context. This harvest verified the captured note's hash, not
the runtime observations, implementation, CI, review or merge status. The
rejected production change is the source's rationale, not separately recorded
human acceptance or a universal support guarantee.
