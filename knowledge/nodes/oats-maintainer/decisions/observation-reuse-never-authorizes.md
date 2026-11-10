---
type: Decision
title: Display observation reuse reports; it never authorizes
description: Reuse a login observation only for display, keep host-execution decisions live, and accept bounded display staleness rather than putting secret-derived values in reuse keys.
about: [workstream/oats-direction]
id: dec-cc79dc759528
tags: [performance, observations, authorization, privacy, rejected-alternatives]
timestamp: 2026-10-29
---
# Decision and rationale

The source reports bilateral agreement on 2026-10-29 to reuse the GitHub
login observation under `--max-age` for `status` and `workspace status`
reporting only. A displayed automation placement may reflect that reused
fact; the decision whether an automation runs on this host must not.

The reason is the shared boundary: placement logic serves both display and
execution. A cache added to make a read cheaper can silently become stale
authorization when an execution caller reaches the same logic. A revoked
token or changed account must not retain permission to run merely because
a previous display read populated the cache.

Schedule ticks, trigger execution and runs must obtain the live login for
host-execution decisions. Passing `--max-age` does not relax that boundary:
`trigger poll` may reuse remote heads, but not the login used to decide
whether it may act here. This is not a prohibition on all reuse anywhere in
an execution command; it separates reusable observations from the live fact
that authorizes execution.

# Privacy versus display freshness

For this reuse key, retain no token value or secret-derived value, including
a digest. The key may record which token-variable **names** are set and
non-secret context, not their values. Keep the concrete key-input inventory
with the implementation rather than copying it here.

The accepted cost is explicit: changing only a token's value can leave the
reported login stale for up to `--max-age`. That tradeoff is acceptable only
because the reused fact is display-only; execution still observes live.

The source records two rejected alternatives:

- **Hash the token values into the key.** Even a one-way digest would place
  secret-derived material in the reuse store to gain at most the bounded
  display-freshness interval. The decision rejects that privacy cost rather
  than treating a digest as non-secret merely because it is not the token.
- **Do not reuse; start the login query asynchronously.** The reported
  comparison saved about 150 ms wall time and no CPU, versus roughly 750 ms
  wall and 400 ms CPU per tick for reuse, while still making one GitHub call
  every five seconds per Desktop. These are source-reported decision inputs,
  not reproduced benchmarks or a general rejection of asynchronous work.

# Review and enforcement boundary

For a new cache in a read path, ask whether any execution or authorization
path consumes the cached fact. If it does, keep the act-authorizing
observation live and pin that separation with a regression: prepopulate the
reused login, then prove the action path still makes the live query, including
when `--max-age` is supplied. The other side required that act-path test as
a condition of agreement. A display-only assertion without such a test does
not protect a shared caller boundary.

Prefer separate reporting and execution observation policies in the owning
code, with tests enforcing the boundary, rather than relying on reviewer
memory. The source reports the regression was added; this harvest has not
executed or independently inspected it. This record preserves the reason
and accepted staleness/privacy tradeoff, not a second cache implementation.

The kernel's [preview-bound spawn-apply exception](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md)
is a different, explicitly justified reuse decision: its valued decision
fence binds apply to what was confirmed. This display-login rule neither
withdraws that exception nor extends it to unfenced automation authorization.
The [app-owned reader decision](/nodes/oats-maintainer/decisions/no-cli-rewrite-app-owned-reader.md)
retains the request-freshness and installation-change contract. The
[profiling lesson](/nodes/oats-expert/lessons/profile-read-waits-before-designing-concurrency.md)
explains how the expensive wait was found, not permission to cache it.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe, 2026-10-29; notes/observation-reuse-never-authorizes.md.

The source identifies the [reuse proposal](https://github.com/awebai/oats/issues/1630#issuecomment-6500978620)
and [other-side agreement requiring the act-path test](https://github.com/awebai/oats/issues/1630#issuecomment-6501015544),
and reports implementation in [awebai/oats#1655](https://github.com/awebai/oats/pull/1655).
These are source-provided locators, not independently audited acceptance,
implementation, release or benchmark receipts from this harvest. The
agreement is reported between maintainer sides, not invented direct human
approval of each term. No existing human-accepted direction is replaced.

Checked by the knowledge maintainer at review on 2026-10-29: the reuse
proposal states display-only use, live login for every execution decision
whatever `--max-age`, head-only reuse for `trigger poll`, and no token value in
the key, not even as a digest; the other side's reply calls the act-path test
required; #1655 is merged. The asynchronous-only comparison figures come from
the source note and were not found in those comments; the regression's content
was not inspected.
