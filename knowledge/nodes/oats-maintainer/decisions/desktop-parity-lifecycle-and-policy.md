---
type: Decision
title: "Desktop parity: the design's semantics win where safe; where they imply authority OATS lacks, the UI tells the truth"
description: Five policy questions the Desktop redesign forced on the kernel, decided 2026-09-22 under delegated human authority — Remove retains and re-homes work, Stop is a recursive lifecycle action, membership and trust rows render only what the kernel established, child-spawn permission is enforced at the spawn route, automatic PR is ADE-owned — and the rule that the kernel's JSON is the Desktop's model.
about: [workstream/oats-direction, system/oats-desktop, system/oats-kernel]
id: dec-7d2ad3227906
tags: [decision, desktop-parity, lifecycle, retire, stop, enrollment, trust, signature, child-spawns, pull-request]
timestamp: 2026-09-22
---
# Decision

Decided 2026-09-22 by the **redesign lead**, under authority the human
delegated explicitly for these five questions, after the **Desktop engineer's**
parity plan named them as blockers: the accepted Desktop redesign promised
semantics the kernel did not yet have, and each was either a kernel change or
a UI claim that would be false.

One principle governs all five: **the design's semantics win where they are
safe; where they imply authority OATS does not have, the UI tells the truth
instead of inventing it.** Desktop renders these semantics and nothing
stronger, consistent with the CLI remaining authoritative for every mutation
([standalone product, CLI authority](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md)).

§5 records its **amended** form: the automatic-PR owner moved from "a
provider capability" to the ADE's workstation forge connection on the same
day, by human correction — see
[a forge connection is a workstation fact, not a capability](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md).
The kernel-side constraints these decisions create, and the Desktop rule for
rendering them, are recorded in the kernel and Desktop nodes, not here.

# 1. Remove retains work by default; the worktree outlives the home

The redesign's *Remove* deletes the **instance** and keeps its worktree,
branch and remote PR unless the operator explicitly opts to delete each.
Retirement at the time removed owned worktrees together with the home, and a
worktree that lives inside the instance home cannot survive the home's
deletion.

**Decision.** Adopt the design's default. Retirement gains a **retention
plan**: when the worktree is retained, the kernel **re-homes** it to a
deployment-level worktree root outside any instance home, records the move in
the retirement receipt, and only then removes the home. Branch and PR are
never touched unless the corresponding option is explicitly on. Deleting a
branch uses the **verified current ref of the worktree**, never the name
recorded at spawn ([preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md)).
"Has an open PR" is a warning when the forge connection can answer it and
`unknown` otherwise — never a silent "no PR". Fail-closed recovery when
preservation cannot be proven is unchanged.

*Rejected:* keeping the existing semantics and relabelling the UI — it makes
the design's central safety promise ("your work survives removing the agent")
false. *Rejected:* leaving the worktree in place under a deleted home path —
work would sit under a location that no longer exists as an operational
identity ([home versus work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md)).

# 2. Stop is a first-class, recursive lifecycle action

**Decision.** *Stop* stands beside *Retire*: it quiesces the session through
the same authority retirement uses, retains home, worktree, transcript and
launch configuration so that *Restart* is possible, and applies to children
by default with an opt-out that lists them. "Mid-task" in the confirmation is
**reported** activity (dirty files, a running operation); when the kernel
does not know, the text says unknown. Stop follows the plan-then-apply
shape with a plan revision and idempotency key, revalidated under the
lifecycle lock — the same discipline the other lifecycle mutations use, so a
stale plan cannot act on a changed roster.

*Rejected:* treating Stop as "close the viewer" — viewers are not session
owners ([terminal viewers are not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)),
so closing one proves nothing about the agent's state.

# 3. Membership and trust rows render only what the kernel established

The 2026-09-22 answer read "Enrol" as workspace member admission with a
receipt and "signed by" as a verified Git signature or nothing. Workspace
model v2 and the removal of package approval (0.26.0) changed the facts
underneath, and the rows followed them: the readiness row is **`member`** —
the soul's repository confirmed by the reciprocal membership discovery,
`not-applicable` in a standalone view, `unknown` when the workspace cannot be
read — and there is no trusted/signed row at all. Each bound provider's own
binding check is relayed verbatim as **`providers`**. What stands is the
principle: a catalog URL, a repository owner or a byte hash is never a signer
([integrity, origin and consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)),
"Skip" never renders `pass`, and "policy allows child spawns" renders from
the **enforced** policy (§4) with its origin.

*Rejected:* letting membership or trust rows render from weaker facts so the
design's cards look complete — they would assert a state nobody established.

# 4. Child-spawn permission is enforced by the spawn route

**Decision.** "Allow child spawns" is a captured per-instance policy the
**kernel's spawn route enforces**: a spawn that names the instance as parent
is refused with a configuration-attributed reason naming the parent's policy
when that policy is off. The default follows the soul's declaration and is
overridable at spawn; the effective policy is recorded in the instance
metadata and in the resolution. It is a **lifecycle-authority claim, not an
OS sandbox**, and the UI says so — a child spawned by other means is not
prevented, only unauthorised by this route.

*Rejected:* a UI-only toggle with no enforcement — it would be a permission
the operator believes in and nothing honours.

# 5. Automatic PR — default off, first pushed commit, draft; owner is the ADE (amended 2026-09-22)

**Decision.** "Open PR automatically" is **default off** and recorded at spawn
as an intent. *Amended the same day* after human correction: the owner is the
**ADE** (Desktop) through the workstation's forge connection — not a
capability and not the kernel — so its reach is stated in the UI (only while
the Desktop runs and is connected). The trigger is the **first non-empty
commit pushed** to the instance's branch: the ADE observes pushes; OATS never
commits or pushes on the operator's behalf. It opens the PR as a **draft**
against the selected base, titled from the opening instruction, idempotently
updates the same PR on later pushes, and records the PR identity in the
instance's typed lifecycle events. Publishing (undrafting) is a human action.
A prompt that asks the model to open a PR is not this feature and is not
labelled as such.

Rationale and the rejected first draft (a forge *capability* with a kernel
dispatch contract) are in
[a forge connection is a workstation fact](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md).

# Also confirmed

- The prototype's illustrative provider names generate no kernel work; the
  provider chooser lists the runtimes the CLI reports, nothing else.
- The Knowledge and Tasks frames stay excluded by human direction; their
  navigation entries state unavailability rather than hiding.

# The kernel's JSON is the Desktop's model (2026-09-24)

When the Desktop was rebuilt for workspace model v2 the human ruled "not
adapt — natively built for it": every shown fact comes from the kernel's JSON
outputs, the Desktop parses no deployment file, every mutation is a kernel
verb, and UI capabilities are gated on the kernel's reported **features, not
versions**. A missing fact is kernel work, never a Desktop-side parser. The
0.24 readers were removed, not extended, and no 0.24 maintenance line was
kept ([release judgement](/nodes/oats-maintainer/stewardship/release-traps.md)).

# Consequences

- **Kernel:** retention plan and worktree re-homing in retirement, a stop
  route, an enforced child-spawn policy and typed lifecycle events — each as
  its own reviewed change; Desktop slices that depend on one wait for it
  rather than simulating it.
- **Program:** forge connections are ADE/workstation integrations, not
  capabilities.
- **Desktop:** renders these semantics and nothing stronger — unknown is shown
  as unknown ([async intent and truthful outcomes](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md)).

# Current contracts

- [desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md) (lifecycle plans, retire retention, `childSpawns`, readiness)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/desktop-parity-lifecycle-and-policy`, 2026-09-22; `decisions/desktop-is-built-for-workspace-v2`, 2026-09-24).
2. [Desktop Phase F boundary](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-24-desktop-phase-f-boundary.md) (design record).
