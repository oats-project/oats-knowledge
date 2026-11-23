---
type: Lesson
title: "A retired agent still in the Desktop's sidebar is the Desktop computer's saved route, not something left on the server"
description: "An agent spawned from a Desktop onto a server and later retired on the server by another instance keeps a 'gone from <server>' row on the Desktop's computer; the server's kernel is clean, and the fix is `oats server forget` on the Desktop's computer (the row's Forget…), not more retiring on the server."
about: [workstream/operations, system/oats-desktop]
kind: lesson
tags: [desktop, remote-servers, saved-routes, retire, diagnosis]
timestamp: 2026-11-23
---

# What happened

A person asked to "kill" two agents they still saw as rows in the Desktop's sidebar, four days
after both had been retired on the server by another instance. The first diagnosis looked only
at the server: `oats status`, homes, tmux windows, retirement claims and the messaging roster
were all clean, so nothing there could be killed.

The rows came from the Desktop's computer. When a Desktop spawns an agent onto a registered
server, that computer writes a saved route (`~/.oats/remote/<server>/<instance>.json`). A retire
run on the server by anything else cleans the server only; nothing on the server can remove
the client's file. The client's `oats server roster --json` then lists the row with
`savedRoute: true, missingRemotely: true`, which the Desktop draws as "gone from <server>" with
a Forget… act (docs/servers.md, docs/desktop.md, #1131).

`oats server forget <server> --instance <name> --json` on the Desktop's computer answered
`forgotten: true` for each, and the rows went (OATS 0.70.5).

# What to do

When a person says a retired agent still shows in their Desktop:

- Find the computer the Desktop runs on (on the server, the `oats session attach` viewers'
  ssh client address names it), and read its `oats server roster --json`: rows with
  `missingRemotely: true` are the answer.
- Forget them there, or have the person use the row's Forget…; only that computer's file goes.
- Do not look for a "half retired" state on the server once its status no longer lists the agent.
