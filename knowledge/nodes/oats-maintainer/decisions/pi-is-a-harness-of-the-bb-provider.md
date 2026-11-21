---
type: Decision
title: pi is a harness of the bb provider, and its launch, delivery and needs-input follow the kernel's rules, not bb's
description: bb agents run on pi as well as Claude Code (Codex dropped); for pi the provider passes three names through bb's project environment and nothing else, refuses a launch unless nothing in bb's pi can take the agent's mail, maps a failed bb thread to present or lost by whether its process lives so the kernel's resume cap still counts restarts, and the pi bridge raises needs-input through the existing question claim with its own mark.
about: [workstream/oats-direction, workstream/provider-integration, system/oats-kernel]
id: dec-3f9f26ddc697
tags: [bb, pi, sessions, backends, delivery, needs-input, contracts, rejected-alternatives]
timestamp: 2026-11-21
---
# Decision

Decided on 2026-11-21 by Pepe's side through the release lane, with Juan's
side informed, as amendments to
[the session-provider contract](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)
(`dec-faf9af131d69`). The direction (pi is required for bb agents, Codex is
dropped, every OATS feature works the same there) is Joan's, **source-reported**:
the effort's contract specialist relayed it, and the release lane decided the
contract points under
[Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
(`dec-155756953d6e`). The facts about bb and pi below come from the
specialist's container probes with a mock model; their canonical home is the
three accepted lessons under Related, where the parts checkable in bb's, pi's
and the provider's source were verified at their review. The probes
themselves were not reproduced at maintainer review.

**What was decided.**

- **Harnesses.** The bb provider runs Claude Code and pi. bb itself runs pi
  only unsandboxed, so
  [no sandboxed mode is offered](/nodes/oats-maintainer/decisions/a-harness-sandbox-is-not-a-boundary-unless-its-switch-is-out-of-reach.md)
  (`dec-375435ce318a`) holds unchanged.
- **The launch environment goes through bb, three names only.** bb stores a
  project's environment in its own database, so only the instance's name, its
  home and the composed search path go there: never a capability's or a launch
  configuration's environment, so no credential lands in bb. One bb project
  per home. The provider rewrites them at every launch and removes them only
  when the home's previous backend was bb, as for every other file it owns.
- **Delivery is a readiness fact of the bb server, and it refuses.** bb starts
  a hidden pi beside each thread's pi, which loads every user extension and
  which a project's environment does not reach; in the probe it took the
  agent's mail alone. So a pi launch is refused, never only warned about,
  unless nothing in bb's pi can hold the agent's mail stream. The preferred
  route is the bb server's own pi configuration, set by the operator or the
  team image through a host-only setting; the provider never sets it at a
  launch. The messaging capability's own check does not stand for bb's hidden
  processes.
- **A failed bb thread is present or lost by its process.** bb reports
  `error` after a failed model turn, for pi and for Claude Code alike. With
  the harness process alive, checked at each call, the session reads as
  present and input recovers it. With the process gone it reads as **lost**:
  its input is the kernel's resume, counted against the home's cap, and bb
  restarts the harness in the same conversation. A home OATS stopped is still
  refused before any provider call.
- **Needs-input for pi is the existing question claim.** The pi bridge holds
  it while a dialog an extension opened is open, in every pi home (tmux ones
  too). It tells its own claim by a mark it records, never by the claim's
  reason, and clears only that one. The kernel's answer on whether a wake
  holds for a pi home stays "unknown": the kernel cannot see whether the
  bridge is loaded, and moving it needs evidence that every pi dialog fires
  the event, extensions' own included.

# Why

Each point keeps a rule the kernel already owns from moving into the
provider's hands: what leaves the home (no credential in a third party's
database), who may listen for an agent's mail (one listener, checked before a
launch, since a second one marks mail read), who counts restarts (the kernel's
resume cap), and what a claim means (one producer, one claim, cleared by its
setter).

# Coherence rules a maintainer applies

- A provider state that the provider itself would recover from is mapped to
  the kernel's **lost**, never to **present**, when the harness process is
  gone: a recovery the kernel does not count is a restart loop nobody sees.
- A condition that guards against a fact is withdrawn when a pinned test shows
  the fact is otherwise, and the text says the reason is the fact. Two of the
  release lane's own conditions went this way within a day (the machine-wide
  delivery variable reaches only processes bb runs; a message to a failed
  thread is not lost, bb restarts the harness).
- A readiness item whose failure loses mail refuses the launch.
- Before a proposed key on a JSON answer is routed to the deciders, read the
  documented shape of the object it would sit in and how the clients read it.

# Rejected alternatives

- **Refusing input to a failed thread whose process is gone.** First decided,
  so that a message that goes nowhere never reads as sent. Withdrawn: bb in
  fact restarts the harness and runs the turn, and the refusal would have cost
  the conversation (a fresh start).
- **Reading such a thread as present and allowing input.** Restarts would be
  uncounted: every wake and every mail would restart a home that keeps dying.
- **Setting the delivery variable machine-wide from the provider.** It changes
  every pi bb runs on that server, other projects' included; it is the
  operator's choice, and the docs say so.
- **Telling the bridge's claim by its reason.** A second pi in the home (a
  nested one, a subagent's) would clear a live pi's claim.
- **Passing the launch environment whole through bb.** A harness credential
  would be stored in bb's database.

Exact keys, error codes, file names and the amendment numbers belong to the
contract text and the repository's documentation.

# Acceptance

The contract points are **source-reported**: decided by the release lane,
which gives Pepe's side's half for Joan's bb work under `dec-155756953d6e`,
with Juan's side informed. For the needs-input item the release lane's
sign-off on oats-project/oats#2071 says the PR "builds bb contract A12(5) as
decided", and checks the mark, the dead holder's clear and `wakeHold` staying
`unknown`: **source-reported (relay at
[the sign-off](https://github.com/oats-project/oats/pull/2071#issuecomment-7067908352))**,
checked at maintainer review of oats-knowledge#454 on 2026-11-21. No public
record of the launch-environment, delivery and failed-thread items was read;
they rest on the source's report. Nothing in `dec-faf9af131d69` is
overturned: these points add to its provider rules, and that record points
here.

# Related

- [A pi thread in bb's error state keeps its pi process](/claims/lessons/a-pi-thread-in-bb-error-keeps-its-process.md)
  (`ins-52e46d38a7a2`): the observation behind "present while the process
  lives".
- [In bb, project env reaches only the thread's pi](/claims/lessons/bb-project-env-reaches-the-thread-pi-not-the-catalog-pi.md)
  (`ins-59e913a97d98`): the hidden catalog pi and the env scopes behind the
  three names and the delivery readiness fact.
- [pi's ui_prompt_start and ui_prompt_end events can carry a needs-input claim](/claims/lessons/pi-ui-prompt-events-can-carry-needs-input.md)
  (`ins-a83809fd36d4`): the events the bridge's question claim rides on.

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer,
   2026-11-21; notes/bb-backend-direction.md. The probes and the release
   lane's answers are the source's report. The needs-input part is built in
   oats-project/oats#2071 (merged 2026-11-21), which the source read in full
   under `packages/pi/extension/`; the provider part was not yet merged when
   this was written.
2. [oats-project/oats#2071](https://github.com/oats-project/oats/pull/2071),
   read at maintainer review 2026-11-21 (merged 2026-11-21): its description
   states the question claim (producer `oats.pi`, reason `question`), the mark
   by which the bridge tells its own claim, and `wakeHold` for a pi home
   staying `unknown`; the release lane's
   [sign-off](https://github.com/oats-project/oats/pull/2071#issuecomment-7067908352)
   relays A12(5) as decided. The code was not read at review.
