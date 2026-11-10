---
type: Decision
title: The viewer detach key is caller-chosen and has its own exit status
description: An opt-in per-viewer key preserves harness input and legacy exit meanings, while a narrow grammar and positive feature detection prevent unsafe silent fallback.
about: [system/oats-kernel]
id: dec-3d168e47bd99
tags: [kernel, terminal, tmux, compatibility, exit-status, feature-detection]
timestamp: 2026-10-10
---
# Decision and rationale

The source records the `oats session attach --detach-key` decision as agreed
by both maintainer sides on 2026-10-09, with the `C-h` exclusion agreed in
review on 2026-10-10. This record preserves the choices and rejected
alternatives, not a second specification of the flag. Maintainer agreement
is source-reported; it is not evidence of separate human acceptance.

## The caller chooses; the kernel does not reserve a default key

No key is unused by every harness. A fixed kernel detach key would take
input away from agents even when their callers had not asked for it. The
key is therefore opt-in and bound per viewer. A plain attach retains its
lack of a keyboard exit; adding a default exit, even only on a tty, changes
existing callers' behaviour and needs a separate decision.

The binding must not alter shared copy-mode tables to make a chosen key
win everywhere. Those tables affect other sessions on the server. This
applies the existing [viewer-not-session-owner boundary](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md),
including its requirement to preserve multiplexer scrollback, rather than
granting the caller control over other viewers.

## A deliberate leave gets a new status, not a new meaning for zero

The source's tmux 3.7c probes found status 0 both when a client detached and
when its window ended. The chosen answer for leaving by the requested key
is **20**; existing status meanings do not move. The binding marks its own
viewer session so that the kernel can distinguish that action from an
otherwise clean client exit.

Rejected alternatives:

- **Detach becomes 0; window end gets the new code.** Then 0 means different
  things depending on the flag. An older kernel that ignores the flag can
  return legacy success, which the caller would misread as a deliberate
  leave. Assigning the new outcome a new status avoids reinterpreting old
  success as proof of the new action.
- **Infer the action from the viewer session still existing.** Another
  client can detach this client too; continued session existence does not
  establish that the requested key was used.
- **Use `detach-client -E`.** It runs the operator's shell; it is not a
  suitable mechanism for conveying the viewer's outcome.

The accepted cost is that a successful deliberate leave is nonzero for
shell constructs such as `set -e` and `&&`. Conversely, 0 is not promoted
to proof that the window ended: the source also observed a signal-stopped
plain attach answering 0, and preserving that path was deliberate. The
[terminal-child signal lesson](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md)
already owns the outcome-before-cleanup ordering and its regression route;
this decision does not widen plain attach's signal handling.

## Start with a closed grammar; document the remaining key conflicts

Accepting every name tmux can bind was rejected. Its vocabulary includes
wildcards and mouse events, aliases whose meaning depends on tmux version,
and names that can be the beginning of terminal response sequences. The
initial policy instead admits a narrow set of Control chords, lowercase
alphanumeric Meta chords, and F1–F12 with at most one modifier. The exact
spelling and set belong in the current contract.

The exclusions preserve the reasons for that narrow start: `C-i` and `C-m`
are Tab and Enter aliases before tmux 3.5; `C-h` can be the byte a terminal
sends for Ctrl+Backspace or Backspace; and Meta forms such as `M-[`, `M-]`
and `M-\` can begin terminal control sequences. The `C-h` exclusion was
added before release rather than accepting it and later breaking callers.
A closed accepted set can be widened compatibly; narrowing it withdraws
previously accepted input. These observations motivate the policy, not a
proof that every terminal emits every accepted chord distinctly.

The grammar deliberately does **not** decide whether the harness consumes
the key. That choice remains the caller's. Nor does it exclude every key
bound by tmux's default copy-mode tables: copy mode takes precedence, but
its tables are operator-configurable server state. Freezing one version's
defaults into the grammar would still give no guarantee, while the key can
work after leaving copy mode. Documentation of that limit was chosen over
both a misleading exclusion list and modifications to shared mode tables.

## Route only to an advertised implementation, even when printing

An older host kernel can ignore an unknown flag and open a viewer without
the requested exit. Successful invocation is therefore not evidence of
support. The routed form requires the host's positive
`session-attach-detach-key` advertisement before sending the flag, including
under `--print`: a printed command must not silently lose the requested
behaviour when run on that host.

This is the detach-specific reason for applying the existing
[CLI machine-boundary rule](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md),
not a new general feature-detection policy. Broader changes to other
missing-feature refusals are outside this decision.

# Current contracts

- [Execution targets](https://github.com/awebai/oats/blob/main/docs/execution-targets.md)
- [Servers](https://github.com/awebai/oats/blob/main/docs/servers.md)

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-attach-detach-key, 2026-10-10; notes/detach-exit-status-is-a-new-code.md; notes/detach-key-grammar.md; notes/copy-mode-keys-win-over-the-viewer-table.md.

The proposal attributes the agreement to
[awebai/oats#856, comment 6088933687](https://github.com/awebai/oats/issues/856#issuecomment-6088933687),
and implementation to [awebai/oats#858](https://github.com/awebai/oats/pull/858),
reported merged at `c18c700f` on 2026-10-10 after both maintainer sides'
review. It reports that the first consumer's lead confirmed the interface
before implementation. The named notes report tmux 3.7c probes on
2026-10-09 and 2026-10-10, and the later `C-h` decision supersedes the
initial note's inclusion of that key. This harvest did not rerun those
experiments or independently audit the implementation and approval history.

Verified by the knowledge maintainer at review of the harvest, 2026-10-10,
by reading the issue, the pull request and the repository's docs at
`c18c700f`; nothing was run. On
[awebai/oats#856](https://github.com/awebai/oats/issues/856) both
maintainer sides answered on 2026-10-09: one recommends a caller-chosen,
opt-in key because a fixed key is taken from every agent's input and no
single key is free in every harness, and keeps a default exit as a separate
call; the other agrees on terms that add a key table per viewer, the
feature name and a refusal, never a silent drop, for a host without it.
[awebai/oats#858](https://github.com/awebai/oats/pull/858) merged on
2026-10-10 at `c18c700f`, with APPROVE verdicts from both maintainers bound
to its final head. Its description gives status 20 for a leave by the key,
tmux answering 0 for a detach and for a window that ended, the mark the
binding sets, 0 for an `oats` stopped by HUP, TERM or INT, and the
`set -e` cost. One verdict on the earlier head raised `C-h` as a question
to settle before release, because a closed grammar can be widened later but
not narrowed; a later commit refuses it and both final verdicts name that.
The docs listed under Current contracts state the grammar, the refused
names with their reasons, the copy-mode limit and the probe under
`--print`; the open follow-up on the other refusals is undecided.

Neither the issue nor the pull request records the three rejected status
alternatives above, or the first consumer's confirmation: those rest on the
source's notes alone. The verdicts establish maintainer review of the pull
request, not human acceptance.
