---
type: Lesson
title: Search the recorded decisions for a behaviour's own words before giving a gate on changing it
description: Before a maintainer's gate on a change of behaviour, search accepted knowledge for the behaviour's own words, not only the contract text and the code. A change can be right on new evidence and still narrow a recorded decision without anyone saying so, and rebuild a case that decision had already settled.
about: [workstream/oats-direction]
kind: lesson
id: ins-864e2fd2dd02
tags: [lesson, direction-gate, knowledge, decisions, pr-review]
timestamp: 2026-11-25
---

Learned 2026-11-25, at the knowledge checkpoint after oats#2129 merged.

**What happened.** A probe showed that an input to a tmux agent could answer an open permission prompt. The fix, refusing such an input, went through the lane's gate, the deciders and four review rounds in a day. Nobody consulted accepted knowledge. It held a decision from four weeks earlier on the same claims, which said in so many words that the hold "is not a new gate on direct `oats session input`", and which had already settled what to do when a home's claims cannot be read (hold, with a proof rule for a truncated log).

**What it cost.** The change narrowed a recorded decision silently. And the case that decision had settled was built the other way: the fix types where the claims cannot be read. That case was already an open follow-up (oats#2131); that a recorded decision had settled it, and which way, was found only at the next checkpoint, after the release, and added to that follow-up.

**What to do.** At the gate, search the knowledge base for the behaviour's own nouns (here "waiting claim", "session input"), read the decisions that match, and name each one the change confirms, narrows or contradicts in the gate itself. A change that narrows a recorded decision says so where it is decided, and proposes the record with it.

See [a permission claim refuses direct session input on a tmux home](/nodes/oats-maintainer/decisions/direct-session-input-is-refused-over-a-permission-claim.md).

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer, 2026-11-25; notes/maintainer-gate-lessons.md. The review rounds are the source's report.
2. Read at maintainer review, 2026-11-25: [oats-project/oats#2131](https://github.com/oats-project/oats/issues/2131), opened before #2129 merged, and its [comment 7164343556](https://github.com/oats-project/oats/issues/2131#issuecomment-7164343556), posted after the v0.70.8 release, which names the 2026-10-30 decision and says the gate on #2125 should have named it.
