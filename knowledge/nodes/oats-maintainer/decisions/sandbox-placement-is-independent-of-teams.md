---
type: Decision
title: A sandbox places the souls it lists, independent of teams, and admits only the capabilities a reviewed sync applied
description: Sandbox and team are separate, composable primitives. A sandbox lists its souls, has no team, and derives its capabilities from those souls; a soul's new capability is refused until an operator-authorized sync applies it. The effort's implementation is led by Juan's side; Pepe's side builds the GUI.
about: [workstream/oats-direction]
id: dec-58f7ead58a9d
tags: [sandboxes, teams, placement, capabilities, contracts, rejected-alternatives, ownership]
timestamp: 2026-11-20
---
# Decision

Taken 2026-11-20 by Pepe, after talking with Juan, and agreed by both sides'
contract voices; Juan's side reported his approval of the capabilities rule
(see Acceptance). It replaces the v1 coupling in the sandboxes design record
(oats-project/oats `docs/design/2026-11-19-sandboxes.md`, r4d on main
e591af0a, "Placement"), where a sandbox named one team and a soul ran in it
because its resolved default team was that team.

- **Five separate decisions:** team (membership and messaging), sandbox (the
  runtime boundary), placement (which sandbox a soul may run in), identity
  (who an instance acts as) and authority (what it may do). Each is declared
  and checked on its own; neither team nor sandbox is derived from the other.
  One team per sandbox is v1's provider limit (teamctl), not the model's.
- **Placement is the sandbox's own list.**
  - `sandboxes.<id>.souls` in the workspace file says which souls may run
    there. A sandbox has no `team`.
  - A soul's team still comes only from the workspace's `souls:` entries.
  - A soul may be eligible in several sandboxes. An explicit selector picks
    among them (`--sandbox`, or a schedule's `sandbox:`), never a host's
    local file.
- **Capabilities are derived, not listed.**
  - Each sandbox admits what its listed souls' resolved compositions need,
    at the lock's versions. An optional `excludeCapabilities` refuses some
    outright; a capability is never stripped to make a spawn pass.
  - Admission is recorded per (sandbox, soul), by capability id and source,
    and widens only through a successful, operator-authorized sync apply of
    the plan revision that shows the change.
  - A spawn or tick needing anything else is refused before anything is
    minted. Loading a capability grants nothing: egress, credentials and
    grants stay the limits.
- **Messaging is aweb policy, independent of placement.** Credential files
  are only a sandbox-wide bridge in v1. Per-identity secrets go through aweb
  Secrets grants, to the runner job's environment only (designed; the
  provider is pending). Long-lived resident identities stay on the host until
  aweb has revocable remote delegation.
- **Ownership:** Juan's side leads the record and the kernel work from the
  hand-over. Pepe's side builds the GUI once the JSON the Desktop reads is
  settled. Contracts are still decided by both sides.

# Why

- Coupling the sandbox to a team made isolation and communication one choice:
  one team could never span sandboxes, and one sandbox could never hold two
  teams. Juan's side had defined them as composable, and Pepe's earlier
  guidance had caused the coupling.
- A declared capability list per sandbox restates every soul's needs. It
  drifts with each soul, package or default change, and the drift surfaces as
  failed scheduled runs. Choosing the souls is already the explicit, reviewed
  act, and the lock pins the versions. So the "nothing new runs unseen"
  property comes from the applied-plan gate, not from a second list. What
  such a gate must name to be buildable is the lesson
  [an approval gate needs a carrier, a fence, a commit point and a revision scope](/claims/lessons/an-approval-gate-needs-a-carrier-a-fence-a-commit-point-and-a-revision-scope.md)
  (`ins-b226f680795a`).

# Rejected alternatives

- **A required `capabilities` ceiling per sandbox (`[]` permits none):**
  agreed briefly in an r5 draft, then replaced for the drift above.
- **An optional `capabilities` list defaulting to everything:** it admits new
  capabilities unseen.
- **Showing a capability change in sync's plan only:** members track their
  latest commit, so a change can reach a tick with no sync. The gate has to be
  enforced at the spawn.
- **A host's local file choosing among eligible sandboxes (an r5 draft):** it
  let a machine's file decide a placement, which only the shared workspace
  decides.
- **A `team:` alias of a `souls:` entry's `default`:** two spellings of one
  key in a closed schema.
- **A sandbox that gets an automatic team:** stays rejected; the sandbox lists
  its souls without a team.
- Left out, not rejected: moving the soul-to-team assignment into `teams:`
  entries, or renaming the `souls:` key, is a separate compatibility question
  outside this decision.

# Acceptance

Source-reported: Pepe's direction, given directly to his side's maintainer
(the proposer) on 2026-11-20; Juan's agreement, including his go-ahead on the
capabilities rule, relayed by his side's maintainer. The r5 record on branch
`agents/sandbox-architecture-lead-record-r5` (d7e2f2eb, unmerged on
2026-11-20) states these decisions as "decided 2026-11-20 by both sides".
Once r5 merges, the record is the authority for the contract details; this
concept keeps the direction, the rejected alternatives and the ownership,
which the record does not carry.

Evidence: OKF proposal from oats-maintainer/product-maintainer, 2026-11-20
(oats-knowledge#441); notes/sandbox-direction-reopened.md,
notes/sandbox-delta-r5.md; the sandboxes record at e591af0a (r4d) and
d7e2f2eb (r5).
