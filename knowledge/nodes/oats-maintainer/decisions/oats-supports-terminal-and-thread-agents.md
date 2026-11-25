---
type: Decision
title: OATS keeps both terminal and thread agents; bb's support for terminal agents comes last on its roadmap
description: Terminal (tmux) agents aren't retired in favour of thread agents (bb). Both stay supported, because customers will mostly run one or the other. In Joan's bb roadmap, the pieces that exist only for terminal agents (typing to a tmux agent from bb, its terminal in bb, its screen) are the last block.
id: dec-2172fceaad67
about: [workstream/oats-direction, workstream/provider-integration]
tags: [direction, roadmap, bb, tmux, sessions]
timestamp: 2026-11-25
---
**Owner: oats-maintainer (the release lane). Update-on-change:** whoever plans thread sessions of OATS's own beyond providers, or reorders the bb roadmap, updates this record.

# Decision

Joan asked on 2026-11-25 whether OATS should move to thread-based agents and drop terminal agents. He answered it himself the same day, before Pepe was asked to: both must be supported, and the terminal-agent pieces of the bb work come last, because customers will mostly run one or the other. Pepe was told. The release lane put the question to him as a direction call, and nothing waited on his answer.

**Acceptance: source-reported.** Joan's answer was relayed to the release lane by his bb effort's lead on 2026-11-25, outside GitHub; the reviewer did not read it, and the wording above is the source's report, not Joan's own words. The roadmap order is also stated in [the first KP-14 text](https://github.com/oats-project/oats/issues/2122#issuecomment-7163077163) ("Terminal agents in bb are the last block").

It confirms [a session backend other than tmux is a session provider](session-backends-are-a-kernel-contract-a-capability-implements.md): tmux stays built into the kernel, and bb is a provider. Work already built and in review was finished. No new tmux-only bb piece starts before the rest of the bb roadmap.

# Why

Joan's reason, as reported: customers will mostly run one kind or the other. The record adds why the terminal side can't be dropped: a thread provider depends on a third party. Anthropic doesn't let a third-party product offer claude.ai login unless Anthropic approved it in advance, agents built on its Agent SDK included [1], and bb drives Claude Code through that SDK. So a Claude subscription on a bb thread rests on bb's standing with Anthropic. Terminal agents also cover:
- every harness with no thread adapter;
- a real terminal;
- deployments with no third party in the path.

# Open

Whether OATS should have thread sessions of its own, beyond providers, is Pepe's to say. Nothing waits on it.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-25; notes/bb-roadmap-terminal-agents-last.md.

# Citations

1. Anthropic, [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview), the note on claude.ai login under "Get started" (read 2026-11-25).
