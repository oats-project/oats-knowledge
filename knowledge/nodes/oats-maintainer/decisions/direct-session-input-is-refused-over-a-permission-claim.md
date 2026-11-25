---
type: Decision
title: A permission claim refuses direct session input on a tmux home; a question claim does not
description: From OATS 0.70.8, `oats session input` to a tmux home whose session holds a `permission` claim is refused and types nothing, with no override. This narrows the 2026-10-30 rule that a waiting claim gates only the kernel's automated wake. A `question` claim, an agent's own needs-input and every other reason still take typed input.
about: [workstream/oats-direction]
id: dec-01f97bb63236
tags: [kernel, session-input, claims, input-safety, permission, rejected-alternatives]
timestamp: 2026-11-25
---
**Owner: oats-maintainer.** Decided by Pepe's side through the release lane, on the lane:product gate, for Joan's bb work (oats#2125; built in oats#2129; released in OATS 0.70.8). Juan's side was told.

# Decision

On a tmux home whose session holds a live claim with reason `permission`, `oats session input` is refused `E_SESSION_PROMPT_OPEN` and types nothing, as a session provider already refuses it. There is no override: the way to answer a permission prompt is to see it, in the agent's terminal or a client's own prompt card. The claim is read under the home's input lock, right before the paste.

Every other reason is typed to as before: `question`, `attention`, and a session whose dialog raised no claim.

# What it changes in a recorded decision

[Waiting claims may withhold an automated keystroke but never authorize one](/nodes/oats-kernel-expert/decisions/waiting-claims-may-only-withhold-automated-input.md) (2026-10-30) said its hold applied to the kernel's automated wake and "is not a new gate on direct `oats session input`". This decision makes one reason, `permission`, such a gate. The rest of that decision stands, and its failure direction is the reason for this one: the cost of doubt is a late or refused input, never an unseen approval.

The change rests on new evidence. A probe (OATS 0.70.5, Claude Code, a tmux home) sent an input while a permission prompt was open: the Enter chose "Yes", the command ran, and the answer said the input was verified ([session input to a tmux home answers an open dialog with its Enter](/claims/lessons/session-input-to-a-tmux-home-answers-an-open-dialog-with-its-enter.md), `ins-9d9ee6837452`, which this decision narrows for `permission`). An agent's or a script's input, and a client that sends through the command, could approve a command no person saw.

# Alternatives rejected

- **Refuse on `question` too.** An agent's own request for input must stay answerable by typing, and where a harness's question dialog takes the typed text as its answer, an input is a legitimate answer. A refusal for `question` comes back only per harness and per dialog where the Enter, not the text, is the answer, each with its own probe.
- **An override flag.** It would restore the unseen approval for whoever passes it.
- **A new error code.** The provider path already used `E_SESSION_PROMPT_OPEN` for this, and callers read it as "nothing was sent".

# What is left open, named

- **Claims that cannot be read.** The fix types where the session's claims cannot be read, which is never worse than before it. The 2026-10-30 decision holds a wake in that case, with its proof rule for a truncated log. Whether an input should refuse there too is oats#2131; one rule for a wake and an input is the coherent end.
- **A claim that outlives a refused dialog** refuses like a live one until it is cleared (oats#2132, the claim producers' side).
- **Dialogs that raise no claim**, and the moment between the read of the claims and the paste: the refusal narrows them and cannot close them.

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer, 2026-11-25; notes/maintainer-gate-lessons.md.
2. Read at maintainer review, 2026-11-25: the lane:product gate ([oats-project/oats#2125, comment 7158435312](https://github.com/oats-project/oats/issues/2125#issuecomment-7158435312)), the release lane's decision ([comment 7158444021](https://github.com/oats-project/oats/issues/2125#issuecomment-7158444021): `permission` refused with no override, `question` not as a blanket rule, the uncovered startup dialogs and race) and the scope narrowed to `permission` ([comment 7158459004](https://github.com/oats-project/oats/issues/2125#issuecomment-7158459004)); [oats-project/oats#2129](https://github.com/oats-project/oats/pull/2129), merged 2026-11-25 (the claim read under the per-home input lock, right before the paste); the [OATS v0.70.8 release notes](https://github.com/oats-project/oats/releases/tag/v0.70.8), published 2026-11-25; the open follow-ups [oats-project/oats#2131](https://github.com/oats-project/oats/issues/2131) and [#2132](https://github.com/oats-project/oats/issues/2132). The probe's outputs are the source's report and were not reproduced at review.
