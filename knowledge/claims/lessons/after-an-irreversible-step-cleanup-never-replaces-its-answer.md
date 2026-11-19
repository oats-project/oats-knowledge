---
type: Lesson
title: After an irreversible step, a partial write or a failed cleanup never replaces the answer that reports it
description: Once a command has minted a live secret, a write that stops short must fail (not pass as success), and a cleanup that throws must not replace the "minted and live" answer with a generic error; cleanup returns whether it worked, the answer says what was left behind, and tests force the real OS failures rather than calling the message builder.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-d86aab9aa95f
tags: [lesson, secrets, invites, files, error-handling, testing]
timestamp: 2026-11-19
---

# What was observed

`oats aweb invite --out <file>` already created its file before the mint and reported
a write failure after it as "minted, not printed"
([reserve a minted secret's destination before the mint](reserve-a-minted-secrets-destination-before-the-mint.md)).
A later whole-change review forced real filesystem failures and found two ways that
answer still went missing:

- **A short write passed as success.** `writeSync` returns how many bytes it wrote, and
  may write fewer than it was given (a file-size limit, a full disk, a quota). The code
  ignored the count: the command answered `ok` with a truncated token file and a live
  invite.
- **A failed cleanup replaced the answer.** On a write failure, the code closed and
  unlinked the reserved file, then built the error. When the unlink threw (EACCES: the
  directory turned read-only), its error escaped instead. The caller saw the generic
  withheld failure: nothing said the invite was live, or which file was left.

Every earlier test had passed. They checked the message builder, or the failures that
come before the mint, never a real failure after it.

# Rule

- Write the secret with a call that writes every byte or fails, such as `writeFileSync`
  on the held descriptor, or loop and check the count. A short write is a failure, and
  takes the after-mint answer.
- Cleanup on a failure path returns whether it worked and never throws. The primary
  answer (the live invite and its non-secret id, or the mint's own error) always goes
  out. When the file could not be removed, the answer names it and says it may hold
  part of the secret.
- Test each failure path after an irreversible step by forcing the real OS failure: a
  file-size limit (RLIMIT_FSIZE, with SIGXFSZ ignored so the write fails instead of
  killing the process), or a directory made read-only during the step. Confirm that
  the tests fail on the old code.

Refines [reserve a minted secret's destination before the mint](reserve-a-minted-secrets-destination-before-the-mint.md) (ins-7c022c20ba3f): it adds what its "a write failure after the mint" bullet needs in order to hold. It is the command-side case of "claim only confirmed effects" in [a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md) (ins-c6200a56b377): there a cleanup's own report must be true; here a cleanup's failure must also not displace the answer it was guarding.

Evidence: OKF proposal from oats-engineering-expert/aweb-newcomer-findings-lead, 2026-11-19; notes/after-an-irreversible-act-cleanup-never-speaks-last.md. Review round 3 of awebai/oats-aweb PR 286 (issue 285); fixed in commit "Review round 3: write the whole token or fail, and keep the live-invite answer when cleanup fails", merged in 93974864.

Verified by the knowledge maintainer at review on 2026-11-19 against [awebai/oats-aweb#286](https://github.com/awebai/oats-aweb/pull/286), merged as 93974864: commit 371097a3 ("Review round 3") replaces `writeSync` with `writeFileSync` on the held descriptor, makes the cleanup return whether the unlink worked instead of throwing, makes the after-mint answer name a file it could not remove as one that may hold part of the token and should be deleted, and adds tests that run the hook under RLIMIT_FSIZE with SIGXFSZ ignored and make the output directory 0500 during the mint. The earlier after-mint test (commit f69ca113) called the message builder directly. That the new tests fail on the old code is the author's report.
