---
type: Decision
title: A workspace front door routes and introduces without mandatory brokering
description: For most workspaces, keep an always-alive intake agent that finds or starts the owner and introduces the human, without requiring every later message to pass through it.
about: [workstream/oats-direction]
id: dec-a68592f7f2d9
tags: [coordination, human-interaction, routing, direction]
timestamp: 2026-11-02
---
# Direction and rationale

The source reports Pepe's direction on **2026-11-02**: most workspaces should
have one always-alive front-door agent that accepts the human's requests,
knows the coordination layout and live instances, and delegates to the right
owner or starts one. It tells the human whom to talk to next or who will
come asking.

The reason is to remove the burden of knowing the lane map before asking for
work. The intake agent **routes and introduces**; it need not remain between
the human and every owner after the introduction. Whether it also digests
what the agents need and acts as a continuing broker remains open for trials.
Do not turn this direction into a mandatory relay for all messages.

This selects an intake direction within the
[coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md),
not a complete replacement role model. “Most workspaces” is not a universal
requirement, and the evidence names no exhaustive exception list. Always-alive
is the intended role continuity, not an uptime guarantee or a newly granted
lifecycle authority.

# Review consequences and limits

- Separate finding the owner from mediating the subsequent conversation.
  The human can work directly with the introduced owner; front-door routing
  does not make the intake agent the owner of every effort.
- Keep that direct interaction compatible with the
  [deferred threads design and later inbox vision](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md).
  This decision does not resume the deferred build or change the current
  input-surface rule.
- Apply the [capability-owned coordination boundary](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md).
  This direction supplies no new permission to spawn, approve work, act as the
  human or retire unrelated agents; existing authority and contract gates hold.
- Treat the [routing research](/nodes/market-research-expert/conclusions/front-door-routing-evidence-2026.md)
  as evidence to assess implementation choices, not proof of this direction's
  performance. Human acceptance and measured outcome advantage are different
  claims.

**Owner: oats-maintainer. Update-on-change:** record an accepted change to the
front-door direction or a decision on continued brokering here in the same
session, citing acceptance and explicitly superseding any changed decision.
Do not infer either from a trial result alone.

# Acceptance and evidence

Acceptance is **source-reported**: Pepe in the coordination-rethink lead's
session on 2026-11-02, relayed to the source maintainer by that lead in mail
83131d00 that day. Neither the session nor the mail was inspected. The source
reports pre-trial direction, not a finished design or completed deployment.
No independent human-authorship, trial or availability claim is made.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/front-door-agent-routes.md.
