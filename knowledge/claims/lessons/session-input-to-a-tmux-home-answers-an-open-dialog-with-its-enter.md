---
type: Lesson
title: Session input to a tmux home is never refused for an open dialog, and its Enter answers the dialog
description: On a tmux home `oats session input` reports success while a harness dialog is open; the text is dropped and the Enter takes the dialog's default (a permission is approved, Claude's folder-trust dialog exits), where a session provider's home refuses the same input with E_SESSION_PROMPT_OPEN, so a composer for tmux agents must check for a prompt itself.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-9d9ee6837452
tags: [session-input, tmux, permission-prompt, bb, composer]
timestamp: 2026-11-25
---

# What was observed

The kernel's docs already say that tmux session input "takes no hold": it types whether or not a claim is set, "its
Enter can answer an open dialog", and `verified` is display observation only (`docs/desktop-cli-api.md`, "Input").
A probe measured what that means on each harness.

OATS 0.70.5, tmux 3.3a, pi 1.5.2 and Claude Code 2.1.328 as tmux agents in a disposable deployment, mock models.
`oats session input --home <h> --text-file <f> --json` answered `ok: true, submitted: true`, exit 0, in every case:

- Plain text and multi-line text: one submitted turn on both harnesses. Claude wraps an idle multi-line paste in a
  `<pasted_content>` block; the model still gets it as one user message.
- The agent in a turn: the harness queues the text itself (pi as "Steering", Claude as "Queued") and runs it as one
  later turn. `verified` was false on pi and true on Claude.
- A dialog open: nothing is refused. A pi extension's confirm took the Enter as its default "Yes" and the text never
  reached the model. A Claude permission prompt took the Enter as "1. Yes": the command ran, the text was lost. Claude's
  folder-trust dialog, whose default in this version is "No, exit", ended Claude. Only Claude's AskUserQuestion used the
  text, as the typed answer.
- `oats session inspect` showed `waitingOnYou` (reason `question` or `permission`) before the input for prompts inside a
  turn, and `null` for Claude's startup dialogs (theme, API key, folder trust).

# What it changes

- The documented warning is not theoretical: any client that types to a tmux agent for a person who does not see the
  pane can approve a command by sending any text.
- A session provider's home refuses the same input with `E_SESSION_PROMPT_OPEN` and sends nothing. A client that treats
  both backends alike must, until the kernel changes, read `waitingOnYou` first and refuse on a claim. That still races
  and misses the startup dialogs, which carry no claim
  ([dialog claims do not enumerate every dialog](/nodes/oats-kernel-expert/lessons/dialog-claims-do-not-enumerate-all-dialogs.md),
  `ins-1e2bce78d707`).
- The elimination route is in the kernel: refuse tmux session input on an open `permission` claim, as the scheduled
  wake already holds on one
  ([waiting claims may only withhold automated input](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md),
  `dec-fb8025c7cafd`). It is proposed for decision in
  [oats-project/oats#2125](https://github.com/oats-project/oats/issues/2125); when it is decided, this lesson is
  superseded or narrowed.
- Do not read `verified` as "the text was taken": it was true when a dialog swallowed the Enter.

# Related

- [An OATS view inside a third-party runner never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`) states that a provider's input never answers a pending prompt; this lesson shows the tmux path
  does.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/kp-parity-facts-probe, 2026-11-25;
   notes/tmux-session-input-answers-open-dialogs.md. Container probe on 2026-11-25 with mock models; its outputs are
   the source's report and were not reproduced at maintainer review.
2. Read at maintainer review, 2026-11-25: oats-project/oats `docs/desktop-cli-api.md` at `4cbf7eb` (tmux input takes no
   hold, `verified` is display only; a provider home's input refuses `E_SESSION_PROMPT_OPEN` with nothing sent);
   [oats-project/oats#2125](https://github.com/oats-project/oats/issues/2125), open, which reports the same probe and
   proposes the kernel refusal.
