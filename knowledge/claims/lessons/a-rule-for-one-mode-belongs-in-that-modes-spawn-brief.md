---
type: Lesson
title: A rule for one mode belongs in that mode's spawn brief, not in the always-loaded inject, when it is needed at session start
description: When shortening a provider's inject, a rule that applies to one mode only (a grant seat, one delivery path) can live in the brief line the spawn hook writes for that mode, if it is needed at session start; the inject keeps a pointer and any rule the brief lacks. A rule needed later in the session stays always-loaded.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-7615bf2ddf86
tags: [instructions, condensation, injects, spawn-brief, messaging]
timestamp: 2026-11-13
---

# The lesson

A provider's inject is copied into every instance's always-loaded instructions, whatever mode
the instance runs in. Its spawn hook also writes a brief line into each instance's TASK.md, and
that line is mode-specific: it is written only for the mode the instance is in. A rule that
applies to one mode is pure cost in the inject for every instance in another mode. When the
hook's brief for that mode already carries the rule, the inject can drop it and keep a pointer
to the brief.

The brief is a sound home only under the load-coverage test of
[condensing instructions](/nodes/oats-expert/lessons/condensing-instructions-preserves-load-triggers.md):
the brief reaches the session through TASK.md, which the session reads at task start; the
composed instructions are reloaded after a compaction, but TASK.md is not imported into them, so
it is not reloaded with them. So the brief holds a rule needed at session start, or one the agent is sent back to by
a trigger the inject keeps. A rule needed at any moment later (a messaging loop, a recovery check
after an interrupted turn) stays in the inject even when it is mode-specific.

Compare the old paragraph with the brief sentence by sentence before dropping it. A rule the brief
lacks stays in the inject beside the pointer. When the inject's tests assert a rule that now lives
in the brief, check that the hook's own tests assert it on the real spawn output, and replace the
inject assertions with assertions on the pointer, so no protection is lost.

# Example

oats.aweb's inject carried a grant-seat paragraph (start with `aw whoami`, then the inbox and
pending chats; no workspace status or id show from the grant home; grant inspection from the custody;
report an unverified send). The grant seat's own Comms brief already carried each rule, and the
hook's tests pin the session-start and inspection rules on the real spawn output, so the inject kept a pointer and the `grant_*` report-and-stop rule, which
the brief lacked. The receive-path paragraph shrank to one sentence for the same reason: each
instance's brief names its own path. The Pi mail-recovery workaround stayed in the inject. It is
Pi-only, but it applies after any interrupted turn, and its test pins it as always-loaded. With
those cuts and every pinned sentence kept, the inject went from 635 to 465 words.

# Evidence and limits

Evidence: OKF proposal from oats-engineering-expert/aweb-inject-shorter-lead, 2026-11-13;
notes/grant-seat-rules-live-in-the-comms-brief.md.

One effort, [awebai/oats-aweb#266](https://github.com/awebai/oats-aweb/pull/266), with one
independent review round that traced every old rule to its new home and found nothing missing.
The PR had not merged when this was proposed. The word counts are that effort's, not a target.
At its head the grant brief also carries the unverified-send rule, but no hook test pins it: the
sentence-by-sentence check found it, the test check above would not have.
