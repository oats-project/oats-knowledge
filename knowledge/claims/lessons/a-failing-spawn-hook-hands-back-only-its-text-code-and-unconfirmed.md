---
type: Lesson
title: A failing spawn hook hands its caller only its text, the code and whether the rollback was confirmed
description: When a required spawn hook fails, the spawn's refusal carries the hook's warning text, E_REQUIRED_HOOK_FAILED (or E_HOOK_ENVIRONMENT_CONTRACT) and a hooks-only receipt with `unconfirmed: true` when the rollback could not confirm its effects; the hook's structured meta does not reach the answer. Evidence a design settles authority on must use what the kernel already projects, or name a new hook-output contract.
about: [system/oats-kernel, workstream/provider-integration]
kind: lesson
id: ins-f5c73b7ba1c5
tags: [kernel, hooks, errors, contracts, design-review]
timestamp: 2026-11-20
---

# What happened

On 2026-11-19, a design record for sandboxes specified that a provider's refusal in
its spawn hook would carry a flag (`seatConsumed: false`), and that the host would
release a delivered identity on seeing it. Both sides had decided it. A fresh
reviewer then traced the kernel at oats main `4ee389bb`, and found the flag had no
way to reach the host:

- **The hook runner** parses a failing hook's last stdout line. It keeps that
  line's `meta` in the run's results, for the spawn's compensation, and uses its
  `warning` as the failure text.
- **The refusal** is `E_REQUIRED_HOOK_FAILED` (or `E_HOOK_ENVIRONMENT_CONTRACT`).
  Its details are only a hooks receipt: for each spawn hook that ran, capability,
  ok, required and `log: null`, plus `contract` for an environment-contract
  failure. They add `unconfirmed: true` when the spawn's rollback could not
  confirm its effects (a quarantined home included). The kernel's spawn-refusal
  detail table selects exactly that, so no meta goes into the answer.

The record was changed to use what the kernel already projects. A required hook's
failure without `unconfirmed` proves the home is gone, so no home holds what the hook
was given, and the host may revoke it. With `unconfirmed: true`, it keeps the
identity. Both sides decided the change, with a test pinned for each case.

# The lesson

Before a design makes a provider's refusal carry evidence that another act
settles on, trace the carrier from the hook's output to the answer the consumer
actually receives (the kernel's hook runner, its refusal-detail table, and any
routing in between). Use the code and the rollback's `unconfirmed` if they suffice.
Otherwise the design adds a hook-output contract, decided by both sides like any
other contract.

The refusal's exact details are documented in the kernel's
[spawn errors table](https://github.com/oats-project/oats/blob/main/docs/desktop-cli-api.md#spawn-errors)
(`E_REQUIRED_HOOK_FAILED`: `{hooks}`, plus `unconfirmed: true`, paths only). That
table is the authority for the shape; what this lesson adds is the check to make
before a design relies on anything else reaching the consumer. Stating in the
reference page that a failing spawn hook's `meta` goes to compensation only, never
to the answer, is the route that would retire this lesson.

This refines [a provider's spawn refusal reaches clients as its
text](/nodes/oats-maintainer/lessons/a-provider-refusal-reaches-clients-as-text.md)
(`ins-7a9351bfd994`): the text reaches the client, and the structured output does not.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sandbox-architecture-lead,
2026-11-20; notes/sandbox-design-constraints-found.md.

- Verified by the maintainer review on 2026-11-20 at oats-project/oats `4ee389bb`:
  the failure path of the hook runner in `lib/core.mjs` (the last stdout line's
  `meta` kept in the results, its `warning` taken as the detail); the spawn's
  required-hook refusal there, whose receipt carries none of a hook's output; the
  `SPAWN_REFUSAL_DETAILS` table in `lib/errors.mjs` (`hookReceipt`: `hooks` and
  `unconfirmed` only); and `unconfirmed: true` for a quarantined home.
- Verified in the sandboxes record, oats-project/oats#2012 (open, unmerged):
  `seatConsumed: false` at `9496ed89`, dropped by `c87fa6a9` ("fix the round-4
  delta read's findings") for the r4d release rule, unchanged at `cbc25894`. That
  both sides decided the change and that two further delta reads approved it are
  the PR's and the source's report.
