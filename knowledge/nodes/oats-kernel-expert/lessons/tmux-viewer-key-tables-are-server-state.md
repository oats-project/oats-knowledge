---
type: Lesson
title: A tmux viewer's key table is server state, not session state
description: Viewer-specific bindings need isolated table ownership and cleanup, while copy-mode and prefix precedence limit what a session key table can promise.
about: [system/oats-kernel]
kind: lesson
id: ins-2053d6926082
tags: [tmux, viewers, key-tables, ownership, integration-limits]
timestamp: 2026-10-10
---
# Lesson

A session's `key-table` selects a table; it does not own that table. The
source's tmux 3.7c experiments on isolated sockets found that tables survive
the death of the session that used them and disappear when their last binding
is removed. A working viewer can therefore hide both cross-viewer interference
and a server-lifetime resource leak.

# Isolate mutable bindings, not just sessions

A binding in a shared table affects every session that reads that table.
Clearing the table before installing one viewer's bindings also clears the
bindings other viewers rely on. Giving the viewer its own session does not
isolate either operation.

For viewer-specific behavior, use a table named for that viewer and remove
its bindings during viewer cleanup. Killing the viewer session alone is not
cleanup of its table. A deliberately shared, fixed table is different from a
private table whose contents a viewer is allowed to replace; do not give the
latter operations authority over the former.

This adds the server-scope and lifetime rationale to
[Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md).
That decision remains the canonical home for exact-source attachment,
scrollback and the locked viewer's explicit allow-list; this lesson does not
change Desktop's session-ownership policy.

# A custom table does not own every keystroke

Copy-mode precedence and the rejected default-key exclusion list and shared
mode-table edits are recorded in
[The viewer detach key is caller-chosen and has its own exit status](/nodes/oats-kernel-expert/decisions/viewer-detach-key-is-caller-chosen.md).
That accepted decision owns the grammar policy and its operator-configuration
limit; this lesson adds the separate prefix and table-lifetime findings.

Prefix handling is not an isolated workaround. The session prefix is
recognized before the custom table (and before mode dispatch), but leads to
the server-wide `prefix` table, undermining the viewer's locked-table boundary.

Conversely, leaving a session prefix enabled can swallow keys that a viewer
intends to pass through. The source observed `C-b` and its following key fail
to reach the pane despite the custom table. The observed setup required
`prefix None` as well as the custom table. Neither setting removes the
copy-mode precedence limit.

For another dispatch limit, see
[tmux's paste guess can bypass a key-table test](/nodes/oats-kernel-expert/lessons/tmux-paste-guess-bypasses-key-tables.md).
It records the version-qualified burst-input finding and why its fixture repair
does not authorize changing production paste policy; the ownership and prefix
rules above remain unchanged.

# Elimination route and verification limit

The structural fix for table interference is per-viewer table ownership;
cleanup belongs in the viewer lifecycle, not in an operator reminder. Pin it
with real-tmux regression coverage on an isolated server: two viewers with
different binding policies, both creation orders, continued operation of the
survivor after one closes, and removal of the closed viewer's table. Fake
tmux responses alone cannot prove server-global scope or table lifetime.

Exercise copy-mode dispatch under both mode-key settings, including a
mode-bound key and a key absent from the tested mode table. Regression tests
can prove behavior under that configuration; they cannot make arbitrary
operator mappings cease to exist. Preserve the reason for documenting the
limit rather than treating a default-table test as a universal guarantee.

The source also repeatedly observed a read trap on tmux 3.7c:
`list-keys -T <table>` returned empty output with status zero for a table
holding exactly one binding, while unfiltered `list-keys` showed it. The
reported test remedy was to read the unfiltered list and filter by its table
column. Keep a one-binding regression for this observation; an empty filtered
listing must not by itself be used as evidence that cleanup removed a table.
This harvest did not reproduce the behavior or establish its version range.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-attach-detach-key, 2026-10-09; notes/tmux-key-tables-are-server-global.md; notes/copy-mode-keys-win-over-the-viewer-table.md.

The proposal and notes report isolated-socket observations on tmux 3.7c and
the rejected alternatives above. The proposal names
[awebai/oats#856](https://github.com/awebai/oats/issues/856) and
[awebai/oats#858](https://github.com/awebai/oats/pull/858) as task context.
The harvest did not rerun those experiments, audit the implementation or
establish human acceptance; the lesson does not depend on a merge claim.
