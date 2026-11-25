---
type: Lesson
title: Claude Code fires no hook when a person interrupts a turn, so a hook-built turn record needs a time bound
description: Claude Code 2.1.332 fires UserPromptSubmit for a launch prompt and Stop at a turn's end, but after an interrupt (Esc), during a tool call or while thinking, it fires neither Stop nor its later idle_prompt notice. A turn record built from hooks therefore shows a turn-start that never ends; OATS reads a Claude turn-start older than 30 minutes as unknown rather than working.
about: [system/oats-kernel]
kind: lesson
id: ins-30e966a998fb
tags: [claude-code, hooks, activity, turn]
timestamp: 2026-11-25
---

# What was observed (Claude Code 2.1.332, a scratch home on a private tmux socket)

- **The launch prompt:** a launch with the task file as its prompt fired SessionStart, then UserPromptSubmit, then Stop.
- **A normal turn's end:** Stop, then `idle_prompt` about 60 s later.
- **After Esc during a foreground tool call** ("Interrupted · What should Claude do instead?"): no Stop and no Notification in 15 minutes. The same after Esc while still thinking.
- **StopFailure** fires on an API error's end (Claude Code 2.1.78 and later).

The kernel's `activity` field (feature `status-activity`) therefore reads a Claude turn-start older than 30 minutes as `null`. Its cost: a long uninterrupted Claude turn also reads null from 30 minutes on.

# What to do

Don't expect a hook for an interrupted Claude turn. Bound any state built from Claude's hooks by time, and re-probe on a Claude Code upgrade.

# Citations

1. oats-project/oats#2130 (KP-5, merged 2026-11-25): the probes at Claude Code 2.1.332 (launch prompt, baseline Stop then `idle_prompt` a minute later, no hook in 15 minutes after Esc during a tool call or while thinking) and the 30-minute `null` reading with its cost; feature `status-activity`.
2. oats-project/oats#2134 (KP-5, merged 2026-11-25): the hook-to-record table (`StopFailure` from Claude Code 2.1.78), "An interrupt (Esc) fires no hook", and a real Claude Code 2.1.332 session leaving `turn-start` standing after a prompt then Esc.
3. Proposed in [oats-knowledge#481](https://github.com/oats-project/oats-knowledge/pull/481) by oats-engineering-expert/bb-backend-specialist, 2026-11-25; notes/kp6-launch-model-lessons.md.
