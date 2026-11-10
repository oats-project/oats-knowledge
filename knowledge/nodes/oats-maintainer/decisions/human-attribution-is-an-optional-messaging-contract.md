---
type: Decision
title: Human attribution is an optional messaging-capability contract
description: Add human attribution through a provider-neutral messaging contract, default new onboarding to human-bound mode where supported, and preserve unchanged operation for capabilities and deployments without human identities.
about: [workstream/oats-direction, workstream/messaging, workstream/provider-integration]
id: dec-a636bc699391
tags: [messaging, human-identity, onboarding, compatibility, contracts]
timestamp: 2026-11-06
---
# Decision

On 2026-10-30, Pepe set the review bar for the onboarding redesign: a
messaging capability may provide human identities as well as agent
identities. When it does, an agent spawned by a human traces back to that
human identity, so OATS can show which human the agent belongs to. The
kernel and CLI consume that fact through a capability-neutral contract,
not a provider-specific integration.

Human-bound mode is the default for new onboarding where the messaging
capability supports it, **not a requirement for using OATS**. A capability
that supplies no human identities still works. Existing deployments with
no human bound keep working unchanged; they are not forced to re-onboard.
Optional attribution must not turn absence into a compatibility failure.
Onboarding skills and flows must teach the same design the contracts support.

# Why

Attribution makes the human behind an agent explicit without making one
messaging service part of the kernel's model. Requiring human identities
universally would exclude otherwise usable messaging capabilities and
break existing no-human deployments. A provider-specific shortcut would
also prevent a different capability from supplying equivalent functionality.
These are review constraints, not descriptions recoverable from code.

# What this preserves

- The [served-identity decision](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md)
  keeps identity rules in the messaging capability. Human attribution is an
  additional fact, not a replacement for the principal an instance serves
  or a decision to add provider vocabulary to kernel flags.
- The [default-team decision](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md)
  remains in force: no personal team, account-level team creation, a root
  consumed by OATS, and no human login in spawn, mint, retire or wake. The
  redesign adds provenance to that root rather than reviving the rejected
  human-login lifecycle path.
- The [human-identity custody condition](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md#coherence-rules-that-hold-whatever-is-built)
  still requires agreement with the messaging side before code signs as a
  human. This attribution decision does not resume the deferred threads UI
  or settle signing-key custody.

# Attribution consent is a human choice, not terminal work (2026-11-02)

The source reports Pepe's further direction on 2026-11-02, relayed by the
release-lane maintainer in mail `bc0b1bc6`: agents execute onboarding and
attribution commands; the person's acts are clicks, logins and answers.
**Acceptance is source-reported**, not independently verified from that
private relay. The [newcomer acceptance decision](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
owns the general onboarding direction and its secret-entry, login and
shell-capturing-install exceptions; this section adds its attribution-design
consequence rather than creating a second onboarding procedure.

Human binding and steward approval are not reasons to ask the person to type
commands. Design required consent as a click or login: the agent performs the
permitted setup operation and the person makes the identity-owning choice.
The account-claim flow, where an agent requests the claim and the person
clicks a verification link, is the source's model. Documentation should name
the setup expert as the executor rather than leave a bare command addressed
to the person.

A design needing the human's own signing key goes to the release lane before
implementation; an agent must not take custody of that key to satisfy the
no-typing goal. This strengthens the existing before-build custody review,
not a grant to sign as the human or a settled key-storage design. Consent,
identity authority and execution permission remain different requirements.

This direction does not supersede native authentication, the scoped
[desktop-persistence handoff](/nodes/integrations-expert/lessons/desktop-persistence-apply-is-a-human-handoff.md)
or a harness refusal. The [auto-mode finding](/nodes/oats-operator-expert/lessons/intake-consent-does-not-predict-auto-mode-approval.md)
rejects a general guarantee that a conversational yes permits a retry.
Implement the intended consent flow and executor wording in the owning
provider and setup guidance, with acceptance coverage; knowledge is not an
execution workaround. No implementation or rollout is certified here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-02; notes/agents-run-every-command.md.

# Opt-in is strict: what review checks (2026-11-05)

On 2026-11-05 the directing human restated the compatibility half of this
decision to the release lane, with emphasis: the human-ID work must stay
compatible with the current way of running OATS for people who do not want
human IDs. Acceptance is **source-reported**: Pepe, directly to the release
lane in session; no public record was cited and none was read here. This
does not change the decision above; it sharpens what the release lane
checks when reviewing the implementation.

A deployment that does not opt in to human attribution behaves exactly as
before, on upgrade and after it:

- no new readiness item, prompt, cloud request or required setting appears
  for it;
- no existing home is re-signed or re-attached;
- every new guard and refusal introduced for attribution fires only on a
  deployment that opted in.

Tests pin each of these, and a live run of the feature includes a control
deployment without human IDs. A design that changes something for every
deployment, opted in or not, is a decision for the humans, not a review fix
the lane can accept or make. The general principle covers any identity or
attribution feature added to an existing messaging provider: a deployment
already running keeps its existing path until it chooses the new one. This
does not change the new-onboarding default above: human-bound mode stays
the default for new onboarding wherever the capability supports it.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-05; notes/human-ids-are-opt-in.md. No implementation, test or
live run was inspected by this harvest.

# The steward bind may use a scoped, immediately ended aw login (2026-11-05)

The messaging provider's rule since oats.aweb 1.15.0 is that agent-facing
text never tells anyone to run `aw auth login`, because an agent enrolled
under whichever account logged in last is a custody failure. On 2026-11-05
the directing human accepted one narrow exception, for the human-ID steward
bind only. Acceptance is **source-reported**: Pepe, directly to the release
lane in session ("go for it" to the proposed design); no public record was
cited and none was read here. The ban stays for everything else, and the
[default-team decision](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md)'s
rule of no human login in spawn, mint, retire or wake is untouched: the
steward bind is none of those.

The exception is a login scoped to team admission only, which the person
approves by link, and which sits beside three guards: a check that the
logged-in account is the person's, an expected-account assertion on the
global identity initialization that follows, and an immediate logout. The
agent runs every command; the person's part stays a link, consistent with
the consent direction above.

Why this and not the alternative: the grant is narrower and shorter-lived
than a pasted team API key, which stays valid until someone revokes it. The
ban's reason, enrollment under the wrong account, is covered by the account
check and the expected-account assertion. The accepted residue is that other
agents of the same OS user share the grant for the seconds it exists; that
was judged acceptable because those agents can already read the deployment's
identity keys. **Rejected:** keeping the ban intact and pasting a key once
per host.

The exact flag names, scope string and command order are the provider's
contract and belong to its own release record, not here. Widening this
exception to another step, or dropping any of the three guards, reopens the
ban's reason and needs the deciding human again.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-05; notes/steward-bind-may-use-a-scoped-aw-login.md. The 1.15.0
rule and the design's guards are source-reported; this harvest did not read
the provider's release notes or run the flow.

# Scope and acceptance of the original direction

This records direction, not a completed contract or implementation. At
capture the contract was undecided and nothing was built. Both sides must
decide the contract before implementation; the
[onboarding effort's lane arrangement](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#onboarding-redesign-delegation-2026-10-30)
owns release coordination and the
[release-only review decision](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md)
owns review. Wire fields, custody mechanics and provider commands are not
specified by this concept.

Acceptance is **source-reported**: Pepe, directly to the release lane in
session on 2026-10-30. The public
[brief of record, awebai/oats#1665](https://github.com/awebai/oats/issues/1665)
was read during harvest on 2026-10-30. It confirms that the publishing agent
reports this human direction, including optional human identities,
provider-neutral contracts and backwards compatibility. That is
**source-reported (relay at the brief)**, not verified human authorship.
No private session or implementation was audited.

# Citations

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-30; notes/onboarding-redesign-juans-side-builds.md.
