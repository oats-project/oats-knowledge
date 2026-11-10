---
type: Decision
title: Runtime, messaging and viewers have separate owners; a wake is a hint, not consumption
description: The kernel owns execution lifecycle, the messaging capability owns identity and delivery, viewers are clients; the wake broker never fetches or acknowledges mail for an agent, and recovery means a fresh receipt with one identity holder.
about: [workstream/oats-direction, workstream/messaging, workstream/provider-integration]
id: dec-1328de872184
tags: [integrations, messaging, runtime, recovery, ownership]
timestamp: 2026-09-05
---
# Decision

Accepted 2026-09-05 from the operator's runtime and migration requests and
the joint implementation with the messaging capability's owners. Under the
official-capabilities redesign the parties are the **kernel** and the
**messaging capability** (not "OATS versus a product"), but the split is
unchanged:

- The kernel owns execution lifecycle — launch, session receipts, inspection,
  input and attach.
- The messaging capability owns identity, delivery policy and any per-host
  wake service.
- Desktop and terminal tabs are **clients** of those operations; a host
  session must continue when every viewer closes
  ([viewers are not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)).

# Rejected alternatives and why

- **Harness-native messaging channels in the kernel.** Rejected: terminal
  input already wakes any harness that has a terminal. If a native channel is
  ever justified, it belongs to the messaging capability, keeping the kernel
  runtime-neutral ([kernel responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).
- **A broker that fetches or acknowledges mail on the agent's behalf.**
  Rejected: a wake is a *hint* to the instance to fetch work under its own
  identity. A message consumed by proxy is exactly the invisible loss that
  made polling unsafe; submission is not consumption, and qualification checks
  the actual fetch/reply path
  ([adoption evidence](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md)).
- **Replaying a saved launch command as "restart".** Rejected: it proves
  nothing about who holds the identity. Recovery of a standing seat is a fresh
  supported execution receipt with **exactly one live identity holder**, a
  supported binding and a preserved rollback path.
- **OATS as a second custodian of host credentials.** Rejected: remote hosts
  are reached through the operator's existing SSH configuration; the server
  registry stores no keys.

# Related

[Parent-child lines require declared shared work, not inferred organisation](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
records the 2026-10-27 source-reported direction: clients render a shared-work
declaration, while capabilities own when a team's process sets it. The kernel
and oats.core describe the mechanism neutrally, not a required organisation.

[Lost sessions resume locally through the kernel into their own conversation](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
records the 2026-10-27 recovery direction: clients request a local-machine
sweep through the kernel, not remote restarts or a second lifecycle. It
preserves the execution-receipt and identity-holder requirements above.

[A client-created tmux server needs its own cgroup](/nodes/oats-maintainer/decisions/client-created-tmux-server-needs-its-own-cgroup.md)
records the resource-placement consequence when a client becomes the usual
server creator on a systemd host; agents must not share the client's kill
scope merely because it launched their server.

[A client reads reported host facts but may check its own local tool](/nodes/oats-maintainer/decisions/client-local-tools-and-reported-host-facts.md)
records the cross-client distinction: a host's viewer capabilities come from
that host's kernel, while a client-owned local viewer may check its own tool
under an explicit cross-owner test. This applies the ownership split rather
than permitting a second deployment model.

[Working and idle are producer-reported facts, not terminal heuristics](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)
records the 2026-10-26 source-reported activity contract, not yet built or
released at proposal time: producers observe turns, the kernel records the
fact and clients do not infer it from terminal output.

[A human addresses a long-lived agent through threads that are aweb conversations](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
(deferred on 2026-10-26, nothing built) would apply this split to
human-to-agent threads: the messaging capability owns
the conversations and the interaction kind, Desktop is a client that reads
through a capability verb and never consumes mail for the agent.

# Current contracts

Mechanics live with the code and move with it: `docs/execution-targets.md`,
`docs/integrations.md`, `docs/servers.md` in
[awebai/oats](https://github.com/awebai/oats).

# Citations

1. Migrated from agents/lead/soul @ 7838d3ca (`knowledge/operating-boundaries`, 2026-09-05; the AGENTS.md identity-handover clause).
