---
type: Lesson
title: Claude Code applies a home's .claude/settings.local.json env inside a bb thread, so launch env need not pass through bb
description: With bb's own machine and project env empty, a Claude Code thread bb starts in an OATS home applies the env block of the home's settings.local.json to its process, its Bash tool and its hooks; so a launcher can keep launch env in the 0700 home rather than in bb's unauthenticated database, as long as the thread's cwd is the home and no secret goes in the file.
about: [workstream/provider-integration]
kind: lesson
id: ins-8f8b3e02860c
tags: [bb, claude-code, launch-env, settings, secrets]
timestamp: 2026-11-19
---

# What was observed

bb-app 0.50.1 starts a thread's Claude Code (2.1.328) through the agent SDK with cwd = the
thread's environment and setting sources user, project and local. With `bb machine env list`
empty (global and project), a home whose `.claude/settings.local.json` holds
`"env": {OATS_INSTANCE, OATS_INSTANCE_HOME, AWEB_IDENTITY_HOME}`:

- the thread's Bash tool printed all three values;
- every hook saw them, and oats.core's hooks acted on them (a waiting claim was written);
- the Claude process's own `/proc` environ did not show them: Claude applies settings env in
  process, so read it through its children.

# What it changes

- A launcher that runs OATS homes as bb threads writes the launch env into the home's
  settings.local.json (0600, in the 0700 home) instead of `bb machine env set`, which stores it in
  bb's database behind an API with no login.
- It holds only while the thread's cwd is exactly the home (the bb project rooted there).
- No secret-valued entry goes into the file: a secret-sourced entry refuses the launch, as
  [the session-provider contract](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)
  (`dec-faf9af131d69`) requires of an entry a provider cannot carry. Account
  credentials stay bb's (in a container, the bb server's own environment, which every thread's
  Claude inherits and bb stores nowhere).
- OATS's launch hooks still run before the bb launch (oats.core's waiting-marker directory), or
  question and permission claims degrade.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-backend-specialist, 2026-11-20;
   notes/claude-settings-local-env-under-bb.md. Container probes on 2026-11-19 with a mock model
   (bb-app 0.50.1, Claude Code 2.1.328): a hook log and a Bash call's output carried the three
   values with bb's env empty; a team-container probe showed a token set only in bb's server
   environment reaching each thread's Claude. The probes and their outputs are the source's
   report; they were not reproduced at maintainer review.
