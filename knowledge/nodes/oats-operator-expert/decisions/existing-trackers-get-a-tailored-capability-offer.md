---
type: Decision
title: Existing trackers get a tailored capability offer
description: After onboarding defers an existing tracker with tasks none, the setup expert offers a workspace-owned tasks capability shaped by how the person uses that tracker rather than silently abandoning integration or selecting a generic provider.
about: [workstream/operations]
id: dec-b0565c3fe62e
tags: [operator, onboarding, tasks, adoption, human-direction]
timestamp: 2026-11-03
---
# Accepted direction

**Acceptance: source-reported.** Pepe directed the source's onboarding
campaign on 2026-11-03 to offer projects with GitHub issues or another
existing tracker a tasks capability built for their use. The source records
this direction in its campaign note; the private session was not inspected
and this acceptance is not independently verified.

The setup expert first examines how the person works: labels, states, who
files and closes work, and what agents may do. It then offers to build a
workspace-owned capability with the person. The point is to adapt agent
operation to an existing workflow, not make that workflow conform to a
catalog integration merely because one is available.

# Separate onboarding from tailoring

The accepted
[onboarding tracker exception](/nodes/oats-maintainer/decisions/messaging-and-task-coordination-are-separate-choices.md)
already owns the selection rule: detecting an existing tracker leads to
`tasks: none`, not a second task system or a claim of completed integration.
This decision adds the follow-through. Onboarding defers the tracker-specific
question; the setup expert makes the tailored-capability offer in the
workspace-tailoring step (`oats-tailor-workspace`). Leaving the slot empty
is an intermediate state, not the end of the conversation.

Rejected as the only answer: shipping or pinning a generic catalog provider.
A catalog provider may be considered later, but it does not replace learning
the person's operating model. Also rejected: leaving `tasks: none` silently,
so the existing tracker never receives an integration offer. Neither
rejection authorizes building, composing or using a capability without the
person's chosen scope.

The existing
[partial-surface lesson](/nodes/oats-operator-expert/lessons/tracker-integrations-are-partial-surfaces.md)
still applies: make the agent-operated and human-owned boundaries explicit,
and do not imply that connection grants every operation the tracker exposes.
This decision does not widen an existing provider's authority or change the
separation between messaging and task coordination.

# Delivery and evidence boundary

The offer and workflow discovery belong in the maintained workspace-tailoring
guidance, with acceptance coverage for an existing-tracker onboarding that
reaches the offer without claiming the tracker is already integrated. This
records direction and rationale, not a delivered capability, tested tracker
contract or new implementation recipe. No existing human decision is
superseded.

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-03; notes/tracker-gets-a-tailored-capability.md.
