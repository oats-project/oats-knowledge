---
type: Lesson
title: A y/n status line that takes keys while it waits can't be made safe case by case; Stop, Start and Restart keep their dialogs
description: The Desktop rework's one-line y/n confirmations produced a major in every review round (re-asks, IME composing, modifiers, lost outcomes, held-key auto-repeat), and were cut; a future design must start from "only a fresh, deliberate keypress after the question is visible counts".
id: ins-0965b04155b1
about: [system/oats-desktop]
kind: lesson
tags: [desktop, status-line, confirmation, keyboard, consent, lifecycle]
timestamp: 2026-11-20
---

# What happened

The client redesign moved Stop, Start and Restart confirmations from dialogs to one line in a status
bar ("Stop X and its 3 children? y stop · n keep it"). Round after round, review found another way an
unrelated keystroke could stop an agent: a stale-plan re-ask landing on the person's next y; IME composing keys
and lone modifiers not counting as "moved on"; an outcome lost under a newer question; held-key
auto-repeat supplying consent across the plan read. Simplifying the rule (ask once, straight after the
press, never re-ask) removed most of it, but not auto-repeat. The lead cut the feature: the status line
carries keys and messages only, and the dialogs stay (informed-manual-actions and the parity policy
kept).

# The lesson

Keystroke consent in a surface that otherwise takes typing is a whole design, not a widget. A later
attempt should get its own spec and start from "only a fresh, deliberate keypress made after the
question is visible counts (no repeats, no composing, no modifiers)", with an escape that never
defaults to yes.

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-20; oats-project/oats PR 1986 (slice 4); notes/status-line-yn-consent-cut.md.
