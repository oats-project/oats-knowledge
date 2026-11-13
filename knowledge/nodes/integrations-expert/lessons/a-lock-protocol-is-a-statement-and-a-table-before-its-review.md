---
type: Lesson
title: A hook's lock protocol is written as one statement and a table of every exit before its review, and its cleanup failures fall under one leftovers rule
description: A file-lock protocol across spawn, take-over and retire took eighteen fresh review rounds because each round found another exit that misreported the holder or left a private file unreported. A one-line statement, a table of operation × read outcome with a test per cell, and one rule that every guarded step reports what it couldn't clean turn each finding into a break of a stated rule instead of a new edge.
about: [workstream/provider-integration]
kind: lesson
id: ins-67128cdc1b89
tags: [lesson, integrations, hooks, locking, compensation, review-loop, truthfulness]
timestamp: 2026-11-13
---

# The lesson

A messaging provider guards a shared identity with a lock file. Spawn creates it, an explicit
take-over replaces it, and retire and a failed spawn's rollback remove it. The fix for an
interleaving bug added one guard: rename the lock to a private name, inspect it, then act or put
it back, with no guard held across a CLI call. Each exit says truthfully whom it saw.

Fresh reviewers kept finding majors, round after round:
- an exit that named a holder seen before a later guarded read;
- a cleanup failure (the guard's own record, the moved-aside lock) that the exit didn't report;
  one of them left the guard held across a CLI call;
- unreadable lock bytes classified as another seat's instead of "unknown";
- a fix printed for a leftover that couldn't clear a readable lock.

Each was a real break, and patching them one by one didn't converge.

What converged:
- **One statement**, agreed by both sides of the contract before the loop: every read, replace
  and remove happens under the guard; no guard spans a CLI call; every exit after a CLI call
  names the holder as last read under the guard, or says unknown; every guarded step reports
  what it couldn't clean, and nothing runs after a step that left anything.
- **One stated limit**: a take-over after the last guarded read is not reported, because taking
  over a live seat is operator error.
- **A leftovers rule instead of case fixes**: every guarded step returns the private files it
  couldn't clean, each with its whole fix, and a non-empty list stops the operation.
- **A table**: one row per operation that touches the lock, one column per read outcome (ours,
  another, absent, unknown, refused, leftovers). Each cell names the test that pins it, in the
  PR and in the module's header.

With these, a finding is either a break of the statement, which gets fixed and a fresh round,
or an edge outside it, which falls under the limit and needs no round. The maintainer asked for
that classification before allowing more rounds. Every major from round 7 on was a break, not an
edge. Round 16 approved; round 17's majors were one break, fixed, and one gap already on main,
split out as its own fix; round 18 approved with one nit, fixed.

# How to apply

- For any hook protocol that coordinates through files and runs CLI calls between its steps,
  write the statement, the limit and the table into the spec before round 1. Agree the statement
  and the limit with the contract's two sides first, since they define what "truthful" means.
- Make cleanup failures a rule, not a list: one return shape for leftovers, and one stop.
- Treat "unknown" as an outcome of every read, including reads that never happened because an
  earlier step failed.
- Ask each round's reviewer to place each finding against the statement. That classification
  decides whether the loop continues.

Refines [a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md)
for a lock several instances share. Applies
[a text-pattern guard's exact contract is written before its first review](/claims/lessons/a-text-guards-contract-is-written-before-its-first-review.md)
to a concurrency protocol.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/aweb-container-followups-lead, 2026-11-13;
notes/lock-protocol-statement-and-table.md. Observed in
awebai/oats-aweb#260 (closes #236): 18 fresh review rounds, the statement and limit decided by
both sides of the contract, and the leftovers rule adopted after rounds 8 to 10. The round
counts and the per-round classification are source-reported by the developer and the lead. The
protocol relies on POSIX rename, link and exclusive create. Its behaviour on filesystems where
those aren't atomic is described in the package, not tested.

Maintainer review of oats-knowledge#377: the body of awebai/oats-aweb#260 records eighteen
rounds, each a fresh reviewer on the whole range, with rounds 1 to 13 each finding a path
outside the protocol until it was written as one statement and later as the table; the
five-part statement, the stated limit, and the operation × outcome table with a test named in
each cell; and the rounds 14 to 18 above. Both sides' approvals confirm the statement and limit
as decided. The maintainer's request for the classification and when the leftovers rule came
in are source-reported, not in the PR record.
