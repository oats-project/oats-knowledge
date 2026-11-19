---
type: Lesson
title: Classify a withheld CLI failure from its raw output before the secret scrub, and match the CLI's whole refusal
description: A provider that withholds a native CLI's failure output but names a known cause from it classifies the raw output before secrets are scrubbed, keeping only its fixed-vocabulary answer, and matches the refusal whole (the CLI's exit status for it, a whole line, the exact requested value, a bounded reason word); a scrub of an ordinary-word secret rewrites the sentence it reads, and a substring match fires inside wrapped server errors.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-771dc0ef593f
tags: [lesson, secrets, error-classification, aw, native-cli]
timestamp: 2026-11-19
---

# What was observed

`oats aweb setup --username <u>` withholds `aw init --new-account`'s output because it
handles credentials, and scrubs the username from it as a secret. To name an unavailable
username, setup matched aw's sentence `username "<u>" is not available (<reason>)` in
the scrubbed stderr. Two failures, shown against real aw 1.36.33 and 1.36.58 on loopback
services:

- A username that is an ordinary word was scrubbed out of aw's own words: `user` turned
  `username` into `<redacted>name`, and `taken` or `ken` rewrote the reason. Exactly
  those usernames fell back to the generic withheld failure.
- An unanchored match also fired when the same words came back inside a wrapped server
  error (`registry http 500: username "…" is not available (taken)`). Setup then
  promised "nothing was created", which a failed signup does not prove.

# Rule

- The classifier reads the **raw** output, before the scrub. Only its answer leaves:
  here a `classify` callback on the hook's command runner, returning a word from a
  fixed vocabulary. The raw text never reaches an error, a log or the result.
- It matches the CLI's refusal **whole**: the exit status the CLI gives that refusal
  (here aw's usage error, 2), a whole stderr line, the exact value the caller asked for
  (quoted as the CLI quotes it), and a reason bounded to one short snake_case word.
- Anything else keeps the generic withheld failure, with no outcome promised.
- Pin it against the real CLI at the floor and at the tested version, with a value that
  collides with the sentence's words and with the words inside a wrapped error.

This refines [hook failures and error messages are output channels](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md):
the caller knows its secret and scrubs it; classification comes before that scrub.

Evidence: OKF proposal from oats-engineering-expert/aweb-newcomer-findings-lead, 2026-11-19; notes/classify-before-scrubbing.md. Review round 1 of awebai/oats-aweb PR 286 (issue 285).

Verified by the knowledge maintainer at review on 2026-11-19 against [awebai/oats-aweb#286](https://github.com/awebai/oats-aweb/pull/286), open at review: commit 0a46d5a ("Review round 1") states both defects and the fix; at head 1855cdc, `usernameUnavailable` answers only for exit 2, a whole stderr line with the requested username quoted as aw quotes it, and a reason matching the bounded snake_case pattern, and the `classify` callback runs on the raw output before the scrub. The real-aw prose tests use the usernames `user`, `taken` and `ken` and a wrapped HTTP 500. The lane maintainer's green-light comment on that head records the same reading; it is not a human acceptance record, and the PR had not merged.
