---
type: Lesson
title: The aweb-channel plugin takes mail in a Claude session started without --channels, and no turn sees it
description: Enabled at user scope, the plugin's MCP server starts in every Claude session that loads plugin MCP servers, flag or not; without `--channels plugin:aweb-channel@...` Claude injects nothing, yet the identity's mail is marked read. Any non-OATS start of Claude in an OATS home passes the flag or keeps the plugin off.
about: [workstream/messaging]
kind: lesson
id: ins-20bf859e7c6a
tags: [aweb, claude, channel, delivery, mail-loss]
timestamp: 2026-11-19
---

# What happened

A probe ran an OATS Claude Code home as a thread of another host app, which starts
Claude through the agent SDK with its own arguments. The aweb-channel plugin (1.8.3) was
enabled at user scope, and the thread's Claude was started without the `--channels`
flag. Its MCP server still ran as a child of that Claude. A mail sent to the home's alias
was marked read within a second, Claude's debug log showed no channel notification, and
no model request ever carried it. With the plugin disabled, the same delivery through an
outside bridge left the mail unread until the agent acted on it.

# What to do

- Any start of Claude for an OATS home other than OATS's own launch (another host app, a
  wrapper, a nested `claude -p` with a home's cwd) either passes
  `--channels plugin:aweb-channel@awebai-marketplace` or runs with the plugin disabled or
  not installed. There is no harmless middle state.
- With an outside deliverer (the host wake broker, a bridge), keep the plugin off for that
  Claude. A wake is only a hint to fetch, but the plugin marks the mail read first, so the
  unread inbox the woken agent reads no longer shows it.
- Diagnosing mail that was read but never answered: look for an
  `aweb-channel/<version>/dist/index.js` child under a Claude process started without the
  flag. The source reports that sessions run with `--strict-mcp-config` (which, by Claude
  Code's help, uses only the MCP servers given with `--mcp-config`) do not start it.

# Why it happens

The plugin acknowledges mail on delivery: it marks a mail read once its
`notifications/claude/channel` notification has been sent, and its own comment calls that
send the presentation of the mail to the agent. The acknowledgement follows the send, not
whether Claude acts on it, so a Claude started without the flag presents nothing and the
mail is still marked read. This is the invisible loss the
[runtime and messaging ownership decision](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
rules out for a proxy. It confirms that decision and changes nothing in it: each Claude
session needs exactly one identity holder that actually presents the mail.

Recheck with a newer plugin: if it learns to stay idle without the flag, this lesson is
superseded.

# Related

- [Runtime, messaging and viewers have separate owners; a wake is a hint, not consumption](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
- [An idle child may be an undelivered wake, not an idle agent](/nodes/oats-desktop-expert/lessons/idle-child-may-be-an-undelivered-wake.md)
- [aw's non-acking mail read is mail threads plus mail show](/claims/lessons/aw-non-acking-mail-read-is-threads-and-show.md): the read that shows a lost mail's `read_at` without acknowledging anything else.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-claude-thread-probe, 2026-11-19; notes/aweb-channel-plugin-consumes-without-channels-flag.md (Claude Code 2.1.328, aw 1.36.58, aweb-channel 1.8.3).
2. aweb-channel plugin source (1.7.11 as installed for Claude Code), read at review on 2026-11-19: mail is acknowledged on delivery (`mailAcknowledgment: "delivery"`, marked read once the channel notification is sent, per the code and its comment). The 1.8.3 behaviour is the proposer's observation.
3. OATS's own Claude launch passes `--channels plugin:aweb-channel@awebai-marketplace`, observed in this deployment's running sessions at review.
