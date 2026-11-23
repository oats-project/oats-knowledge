---
type: Lesson
title: A hook that deletes credentials acts only when the kernel dispatched it, never in a directory it defaulted to
description: A lifecycle hook that removes or moves key material must prove it was dispatched (OATS_EVENT plus OATS_HOME and OATS_INSTANCE_HOME, absolute and equal) and refuse otherwise. A fallback to the current directory turns a hand-run into deleting whatever key sits there.
about: [workstream/provider-integration, system/oats-kernel]
kind: lesson
id: ins-89b71da9cb77
tags: [retire, hooks, credentials, cwd, hook-env, aweb]
timestamp: 2026-11-23
---

# Lesson

The oats-aweb retire hook took its home from `OATS_HOME`, falling back to the current directory. Once
#318 made a retire remove the home's `.aw` on success, running `oats-aweb.mjs retire` by hand
in a deployment root, a resident's custody or any directory with a `.aw` deleted that key, with no
aw call. The second reader reproduced it on the PR (awebai/oats-aweb#321); main had kept the key.
The first maintainer read missed it, because the fallback predated the change and only became
destructive with it.

- **The rule.** Before anything destructive, a hook checks that `OATS_EVENT` is its event and that
  `OATS_HOME` and `OATS_INSTANCE_HOME` are set, absolute, and the same directory. Otherwise it exits
  nonzero, touches nothing and calls nothing. The kernel sets all three from one home for every
  lifecycle hook (`lib/hook-env.mjs`), on every retire path from 0.70.0 on, so a real dispatch always
  passes.
- **The review check.** When a change makes an existing code path destructive, re-read how that
  path finds its target. A default that was harmless for a read becomes the bug once the path
  deletes.
- **The test.** No OATS variables; the event with no home; and two homes that differ. Each leaves
  every key byte-identical and runs no external command.

Related: [the kept-home decision](/claims/decisions/a-kept-home-holds-no-usable-credential-retire-removes-on-success-and-holds-aside-on-failure.md),
whose exit-0 removal made the fallback destructive.

# Citations

1. awebai/oats-aweb#321: the second reader's RETURN with its reproduction (the same command at the
   earlier main left `.aw`), and the fix's dispatch gate; merged 2026-11-23.
2. oats-project/oats `lib/hook-env.mjs` `lifecycleHookEnv`: sets `OATS_EVENT`, `OATS_INSTANCE_HOME`
   and `OATS_HOME` from one `home` (read on main, 2026-11-23).
