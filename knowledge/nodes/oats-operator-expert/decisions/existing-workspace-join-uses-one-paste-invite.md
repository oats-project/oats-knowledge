---
type: Decision
title: Join an existing workspace with one invite, not team ensure
description: Choose one-paste invite onboarding for an existing workspace, reject team ensure because it can create a separate team, and revisit tokenless enrollment only if measured join friction warrants the service-side authority work.
about: [workstream/operations, workstream/messaging]
id: dec-360c4194160c
tags: [operator, onboarding, messaging, teams, rejected-alternative]
timestamp: 2026-11-03
---
# Decision and rationale

The operator's 2026-11-03 join-design decision is to reduce the existing
invite route to one paste: the teammate's agent supplies an invite, and the
joining person's agent uses the provider's invite-based setup. The provider
obtains the team and service from the invite and resolves the label; the
person should not have to carry a service URL or choose a label separately.
One paste is the chosen interaction target, not a measured total of all
onboarding actions or permission to expose the invite in agent conversation.

**Human direction is source-reported:** Pepe asked for the least work for
the joining person on 2026-11-03, relayed through the setup maintainer. The
capture reports the operator's resulting design and the messaging side's
answers; it does not establish that the human separately approved every
technical detail. The private relay was not independently inspected. This
applies the existing [newcomer-experience decision](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
without duplicating its consent, secret-entry or execution boundaries.

# Why the obvious ensure shortcut was rejected

The first design tried to reuse `aw team ensure` after the joiner's own
human login, as in new-workspace setup. The source's subsequent messaging-side
answer rejected that assumption: on the reported Cloud implementation,
workspace-team lookup is scoped by **owner organization and workspace-key
digest**, not by repository alone. Without an explicit organization, the
joiner's ensure can create a different team under their own account for the
same repository. Success would therefore conceal a split rather than prove
admission to the teammate's team. An explicit `--org` is not a general
joiner workaround: the reported ensure route requires that organization's
owner or admin authority.

Consequently, **existing-workspace onboarding must not run `aw team ensure`
as its join mechanism**. Finding the same repository and authenticating the
joining person do not establish authority to enter the existing team. Keep
new-team creation separate from joining a teammate's team. This is the
operator's rejected-route rationale, not a new specification of Cloud's
admission policy or a ban on the separate new-workspace setup route.

# Why tokenless enrollment was deferred

At the decision date, the source reports that the proposed tokenless path
was not buildable. The messaging side sketched two missing pieces: service
authority for a suitably entitled team member to enroll their own root into
an existing workspace binding, and a CLI operation to send the human invite.
Those are owner-side design requirements, not commands or permissions an
operator may assume exist.

The decision is to **measure the one-paste path first** and ask the messaging
owner to scope tokenless enrollment only if that path performs poorly against
the onboarding time goal. Do not reopen the authority design merely because
the new-workspace ensure route looks reusable. The capture reports no live
VM measurement of the one-paste path, so it establishes neither a time saving
nor attainment of the goal.

The earlier [human-login enrollment design](/nodes/integrations-expert/decisions/workspace-team-enrollment-by-human-login-superseded.md)
is already superseded by the [default-team decision](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md).
This operator decision neither revives that design nor adds human login to
spawn, mint, retire or wake. It leaves service admission and the optional
[human-attribution contract](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md)
with their owners.

# Enforcement and evidence limits

Keep executable instructions, invite inspection, version floors and refusal
handling in the maintained provider and getting-started skills, not in this
knowledge record. The [getting-started change](https://github.com/awebai/oats/pull/1726)
contains the join prohibition and a regression keeping ensure command lines
inside new-workspace setup. The [invite-only provider change](https://github.com/awebai/oats-aweb/pull/194)
is the implementation reference for avoiding hand-carried service and label
inputs. Its description and paths were inspected; it was open at harvest.
The guard's source check is not a live Cloud test, and neither a PR nor its
reported tests proves an installed release or a successful newcomer run.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-03; notes/join-design-least-for-the-joiner.md.

The note's opening design still recommends ensure conditionally; its later
same-day answer rejects that route. This record preserves the final decision
and why it changed, not the earlier proposal as current guidance. Messaging
implementation behavior remains source-reported; no private message is
quoted and no enrollment was attempted by this harvest.
