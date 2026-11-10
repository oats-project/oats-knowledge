---
type: Decision
title: Teams in the messaging provider: the workspace's default team, explicit join and leave, one local identity per joined team
description: Agreed 2026-09-25 on the human's priority: every instance lives in the workspace's default team; a soul's team labels only make wider teams eligible; joining is a spawn choice or one idempotent command at any time, leaving is the same command or automatic when eligibility disappears on live evidence; each joined team is a further local identity the provider records and revokes at retire; clarified 2026-11-03: a joined team that becomes the exact live default is not eligibility loss, and only respawn moves the primary identity.
about: [workstream/provider-integration, system/oats-desktop, workstream/messaging]
id: dec-2d28a5b061fa
tags: [decision, integrations, messaging, teams, identity, lifecycle, desktop]
timestamp: 2026-11-03
---

Agreed 2026-09-25 between the integrations lane and the framework lead on the
human's stated priority ("a team for the workspace's agents by default; an instance joins the teams its soul names, at spawn
or during its life, matching the workspace; seamless, inside the messaging
capability; kernel changes welcome"), refined the same day to "default is
the workspace's default team only; joining is explicit" (renamed from
"personal team" on 2026-09-26 by the human's directive: [a workspace has a default team; there is no personal team](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md)). The kernel half is the
framework's agreed teams contract (its design record of the same date); this
concept records the provider half and the facts the design rests on.

# Context

A soul named one team label; the kernel merged that one label's workspace
entry into the provider payload; the provider minted one team-scoped identity
for it; an instance was in one team for life, chosen at spawn. The messaging
service's released client showed, read at source by its owner: a team-scoped
(local) identity is one team by construction, since joining refuses an
occupied identity directory; hosted teams refuse member-global invites; a
session grant home carries one team id; address deletion exists only under a
customer-controlled namespace's controller key. The human's default for
identity scope is local, with global an explicit choice.

# Decision

- **Default: the workspace's default team only.** Every instance is minted
  into the workspace's default team: the team of the root identity the
  deployment holds (a configured team, else the root's active team). A soul's labels do
  not join anything by themselves.
- **Eligible teams come from the kernel**, beside the settings, never inside
  them: the ordered list of the soul's labels with the mapped team id and
  that label's payload, computed live for a home (the soul commit the
  deployment currently resolves and the workspace's current messaging), and
  shown in spawn preview and inspect. An unmapped label is a discovery
  warning the provider reports, not an error.
- **Joining is explicit and idempotent**: a spawn setting naming labels, or
  the provider's own verbs at any time, from inside the home or with the
  home named, for a human, another agent or the instance itself. A label
  outside the eligible set is refused, naming the eligible ones. The
  default team cannot be left. All three verbs (list, join, leave) answer
  one JSON document (defaultTeam, primary, eligible with joined flags, joined
  with identity home, receive mode (`native` or `poll`) and time, unmapped)
  and are also declared as home operations so the Desktop drives them
  through the operations contract.
- **Leaving** is the same verb, and automatic at every launch for a joined
  team that is no longer eligible, but only when the kernel marks the
  eligible list as live (`OATS_TEAMS_SOURCE=live`); on a recorded fallback,
  when the workspace could not be observed, the provider keeps every
  membership and warns (`teams-unverified`), so an offline host never costs
  an instance a membership. The provider never joins on its own and never
  leaves a membership it did not create. A joined team becoming the exact
  live default is not eligibility loss for this cleanup; see the dated
  clarification below.
- **One local identity per joined team**, minted the way the primary is
  (the person's root mints a local invite, the instance joins in a fresh
  identity directory beside its primary), recorded in the instance's
  provider meta and revoked one by one at retire. Sending as a joined team
  is the client's identity-home selection, shown once in the provider's
  inject. Receiving for a joined team was by polling in the first release;
  the primary identity never leaves the harness's native channel to gain
  live receive: the host wake broker streams only the explicitly listed
  joined identities, disjoint from the native primary, with no runtime
  control authority for them. (Shipped in oats.aweb 1.15 and current in
  1.16.1: joined teams receive live through the broker where the runtime
  supports it, an external-delivery home registers every identity, and
  readiness warns per joined team that stays poll-only.) Global instance identities stay an
  explicit, non-default scope: under a hosted namespace nothing the root
  holds can release a retired identity's address.
- **Readiness** reports, per home and per soul: the default team, eligible against
  joined, unmapped, and poll-only joined teams, each with its remedy.

# Default-team moves are not membership loss — 2026-11-03

A configuration change that makes an already-joined team the live default
must not silently remove that membership at the home's next start or
restart. Keep the joined membership when **both its label and team id**
match the live default. Keep the primary identity in its original team,
warn about the changed default, and name deliberate respawn as the way to
move that primary identity.

The source reports the failure behind this clarification: a default team
is not eligible to join, so applying the ordinary ineligible-team cleanup
to that row removed the very membership the configuration had promoted.
Configuration classification had been mistaken for an instruction to
change a running home's membership. Restart is not consent to migrate an
identity; lifecycle synchronization must distinguish those acts.

This reconciles the existing default-cannot-be-left rule with automatic
cleanup; it does not replace explicit join/leave or freeze all memberships:

- A matching label with a changed team id is a different team, not a reason
  to preserve the old row. Other genuinely ineligible joined teams still
  follow the live-evidence cleanup rule.
- Unavailable live team data still means keep memberships and warn, not
  infer eligibility loss.
- Retirement still releases the kept joined identity. Keeping it at launch
  is not an exemption from cleanup at retirement.

The requirement is **source-reported**: on 2026-11-03 the setup maintainer
relayed the counterpart maintainer side's requirement by mail. The
[setup-lane review](https://github.com/awebai/oats-aweb/pull/190#issuecomment-6605635953)
corroborates the keep-until-respawn rationale and exact-label/exact-id
boundary, but identifies itself as an agent maintainer's review, not a
human's own acceptance. The private mail was not inspected. This
clarification does not supersede the earlier human-accepted team model or
change who selects the default.

Enforce the distinction in lifecycle synchronization and regression cases,
not just guidance: cover the exact-default row, a changed id, genuinely
lost eligibility, unavailable live data, side-effect-free preview, retained
receive registration across delivery modes, and release at retire. The
source reports added review cases; neither the implementation nor its tests
were rerun for this harvest. The cited PR was open and unmerged when checked
on 2026-11-03, so this records rationale, not a release or migration result.
Applying the same question to an upgrade is a review criterion, not evidence
that every upgrade path has been tested.

Shared task-team selection has its own
[maintainer-owned decision](/nodes/oats-maintainer/decisions/tasks-team-is-a-workspace-setting.md);
this clarification does not choose task destinations or rewrite that
record's historical risk analysis.

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-03; notes/a-default-team-move-never-changes-a-running-home.md.

# Consequences

- Provider release: the first workspace-model-only release carries all of
  it; the kernel half lands in the major that already changes the file
  formats; the sync-driven reconcile of live homes is a later kernel minor
  the provider needs nothing new for.
- What the service still owed changed setup and readiness, never spawn: a team
  per workspace created by its owner outside OATS, a token-free join for an
  entitled person, and delivery for several identity homes per home (the
  last shipped with the broker's multi-identity registration).
- See [a global instance identity leaves a permanent address behind](/nodes/integrations-expert/lessons/a-global-instance-identity-leaves-a-permanent-address-behind.md)
  for the identity-scope reasoning, and
  [the superseded human-login enrollment design](/nodes/integrations-expert/decisions/workspace-team-enrollment-by-human-login-superseded.md)
  for the service-side design this composes.
