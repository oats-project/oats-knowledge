---
type: Decision
title: A session backend other than tmux is a session provider, a kernel contract that a capability implements
description: The kernel keeps tmux built in and gains a small session-provider contract (launch, inspect, input, stop, optionally a batch inspect and a readiness check) that a capability implements; bb is the first provider, in its own package repository. The kernel keeps receipts, authority, claims and the rule that a stop stays stopped.
about: [workstream/oats-direction, system/oats-kernel, workstream/provider-integration]
id: dec-faf9af131d69
tags: [kernel, sessions, backends, capabilities, contracts, bb, rejected-alternatives]
timestamp: 2026-11-20
---
# Decision

Decided on 2026-11-19 by Pepe's side and Juan's side together, as a contract
change before any merge, for the work that runs OATS agents as threads of bb,
a third-party product. Each side answered through its own `lane:product`
maintainer; Juan's side's answer was its maintainer's call on his instruction
to answer and bring him only objections. The agreement is source-reported:
the contract's revisions and both sides' answers were relayed between the
maintainers, and no forge record of them was read at review.

**Owner: oats-maintainer (`lane:product`). Update-on-change:** whoever
decides the open point below, or changes the contract, updates this record
or supersedes it, naming the change in the node log.

**The kernel gains a session-provider contract, and tmux stays built in.** A
capability declares `sessionProviders.<name>` in its manifest, naming four
commands (launch, inspect, input, stop) and optionally a batch inspect and a
readiness `check`. `oats spawn --backend <name>` resolves to the home's module
that declares it. The first provider is bb, in the package repository
oats-project/oats-bb, which holds the provider and pins bb's version with a
contract test on every bb surface it uses.

**What the kernel keeps, because a backend must not own it:** the receipts
and their authority check, lifecycle claims, the refusal codes and the JSON
shapes. Two rules are the kernel's alone:

- *A stop stays stopped.* The kernel records its own stop and refuses input,
  a scheduled wake and any client input to that home before calling the
  provider. This matters where the backend restarts on any message, as bb
  does.
- *The resume cap is the kernel's.* A resume that a mail or a notice
  triggers is counted and refused by the kernel's resume primitive before
  the provider's input is called, so input cannot bypass it
  ([lost sessions resume locally](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)).

**What a provider must hold to:**

- Status fields keep their meaning: it maps what the backend shows or
  answers unknown, never an inferred liveness
  ([reported, not inferred](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)).
- Input never answers a pending prompt of the backend, and a message the
  backend only queued is not a submission. In doubt the answer is "not
  submitted": a duplicate delivery is recoverable, a loss is not.
- It refuses, by name, any launch argument or environment entry it cannot
  carry, and any that would be silently ineffective. It never drops one.
- What identifies its session (the endpoint) stays on the host: status rows
  that leave the host carry the backend, the provider and an optional link,
  nothing more.

**One name, one meaning.** `sessionBackends` in the version answer stays the
kernel's built-ins. A backend a capability supplies is a session provider in
the manifest, the feature word and the inspect answer.

# Alternatives rejected

- **The backend coded in the kernel.** Rejected: provider behaviour belongs
  in a capability
  ([kernel responsibilities stay generic](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)),
  and a third-party CLI and its version would then move with kernel
  releases. The removal of the earlier second backend (Herdr, 0.31.0) showed
  the cost: its logic sat at every place the kernel touches a session, and
  removing it touched all of them. That removal has no recorded reason; it
  is not a decision against a second backend.
- **A broker-side or provider-side guard for "stopped".** Rejected: the
  messaging broker delivers on any successful input, so the kernel's refusal
  is the only guard that holds.
- **Letting a queued message count as submitted, with a test that it never
  answers a prompt.** Rejected: mail would be marked read before it is
  presented in the agent's turn, and a prompt never answered would lose it
  ([runtime, messaging and viewers](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)).
- **Readiness through a widened `binding`.** Rejected: `binding` is the slot
  providers' model and a session provider has no slot; an optional `check`
  command reuses the readiness answer instead.
- **A backend condition inside a `requires` row's `when`.** Rejected: an
  older kernel reads every `when` key as a setting and would silently skip
  the row. A sibling key is refused loudly by an older kernel.

# Who decides later changes (2026-11-20)

Changes to this contract that are part of Joan's bb work are decided by
Pepe's side, with the release lane giving its half, and Juan's side is told
of each one; see
[Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
(`dec-155756953d6e`). Releasing the first wire before the versioned one is
[allowed only behind a provider floor](/nodes/oats-maintainer/decisions/a-provider-wire-ships-before-its-version-only-behind-a-floor.md)
(`dec-687440ee8ef3`).

# Settled since this record

Open at this record: the exact shape of the sandbox allowances a provider
may write for OATS's own messaging and events. Its rule was decided: only the
provider, only exact hosts and paths derived from recorded configuration,
never more than the same launch gets on tmux.

That shape, and what a provider's sandboxed modes contain, were decided on
2026-11-20 within that rule (source-reported):
[a harness sandbox in a provider home is not a security boundary unless the agent cannot switch it off](/nodes/oats-maintainer/decisions/a-harness-sandbox-is-not-a-boundary-unless-its-switch-is-out-of-reach.md)
(`dec-375435ce318a`).

# Related

- [bb thread tell answers "sent" in ordinary states, and its "queued" drains by itself](/claims/lessons/bb-tell-answers-sent-in-ordinary-states-and-queued-drains-itself.md)
  (`ins-3f55359c0839`) observed that bb delivers a queued tell itself, and
  advised a provider not to read "queued" as not submitted unless it first
  withdraws the queued row. This contract decides the other way: "queued"
  is not a submission, and a possible duplicate is accepted over a loss.
  That lesson's withdrawal route is how a bb provider avoids the duplicate.
- [In a bb Claude thread a permission prompt becomes oats.core's claim, and a bb tell waits behind it](/claims/lessons/a-bb-permission-prompt-is-an-oats-claim-and-a-tell-waits-behind-it.md)
  (`ins-7265936fd6d8`) and
  [A bb restart holds wake-broker mail but strands a steered wake](/claims/lessons/a-bb-restart-holds-broker-mail-but-strands-a-steered-wake.md)
  (`ins-c046f24af7d0`) are the bb observations behind "input never answers
  a pending prompt" and "a stop stays stopped" (a bb thread restarts on the
  next tell).
- [A third-party server joins the team container by a derived image](/claims/decisions/a-third-party-server-joins-the-team-container-by-a-derived-image.md)
  (`dec-7cf925e711dd`) was waiting on this contract: at its review the
  contract was still undecided. Its owner updates it.

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer,
   2026-11-19; notes/bb-backend-direction.md. The contract's revisions and
   both sides' answers are source-reported.
2. [oats-project/oats#350](https://github.com/oats-project/oats/pull/350)
   (kernel: remove Herdr; tmux is the only session backend, 0.31.0), read at
   maintainer review 2026-11-19. Its description and commits list every
   session path the removal touched and state no reason for the removal.
   `version` advertises `sessionBackends: ["tmux"]` from that release.
3. [oats-project/oats#1985](https://github.com/oats-project/oats/issues/1985),
   read at maintainer review 2026-11-19. It is a follow-up of the bb team
   image PR, and it names the session-provider contract and the bb package
   repository as the end state. The repository oats-project/oats-bb exists
   ("OATS bb session-provider capability").
