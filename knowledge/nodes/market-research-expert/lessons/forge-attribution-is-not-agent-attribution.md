---
type: Lesson
title: Distinguish forge-account attribution from agent and human attribution
description: The 2026-11-02 forge investigation distinguishes claimed authorship, authenticated account, credential use and human approval, without establishing a universal per-agent attribution mechanism.
about: [workstream/positioning]
kind: lesson
id: ins-6f64b28ffe66
tags: [research, forge, attribution, identity, oversight]
timestamp: 2026-11-02
---
# Dated conclusion

When comparing agent-fleet accountability, distinguish the identity written
into an artifact from the principal authenticated by the forge and from the
person who authorized an action. A shared account's event alone cannot tell
which of its agents or human operators acted. A per-agent label does not
supply that missing evidence merely by appearing in an author field or
commit trailer.

This is the bounded research conclusion of the **2026-11-02** investigation,
not an audit of a deployed account or a recommendation to replace OATS's
credential arrangement. The integrations node's
[account-attribution lesson](/nodes/integrations-expert/lessons/forge-account-attribution-does-not-prove-human-authorship.md)
owns the operational consequence for OATS review and sign-off evidence
(an account record is not human authorship); this lesson is the
cross-product comparison and does not restate that rule.

# Source-reported mechanisms and limits

The captured note describes Git author/committer strings as client-supplied
and distinguishes them from the authenticated pusher. It identifies three
attribution leads to check, not interchangeable proofs:

- GitHub audit token fields, including `hashed_token`, could distinguish
  credential use under one account if credentials are separately assigned.
  The capture does not establish event coverage, plan availability, retention
  or a trustworthy token-to-agent mapping. A token identifier is not proof
  that its intended holder was the actor.
- Per-agent signing keys or Apps could provide different identity evidence,
  but signing, API actions and PR approvals are distinct surfaces. Verify
  what is signed, how keys are assigned and which events the forge exposes;
  a signature on a commit does not authenticate every later action.
- The source describes GitLab Duo's composite identity as combining human
  and flow-service-account authority, with a human-author audit field [1].
  This is a product lead, not a verified schema, release or enforcement
  contract, and it does not establish a cross-forge standard.

The harvest inspected the note, not product documentation or live audit
records. It retains no primary-page locators or tested configurations.
Consequently it does not establish that tokens are the only built-in option,
that one App per agent is necessary, or that trailers can never participate
in a separately verified attribution scheme.

# Consequence for comparisons

Ask what an independent auditor can distinguish for each event: proposed
commit authorship, push, review, approval and merge. Check the credential's
assignment and custody, attribution evidence, and enforcement separately.
Multiple credentials for one account do not automatically become multiple
reviewer principals or independent human approvals. Conversely, evidence
that identifies an actor does not establish that the action was authorized;
[forge-side enforcement](/nodes/market-research-expert/lessons/prompt-rules-are-not-forge-enforcement.md)
owns that separate control question.

The [approval-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
already owns configured automated-review credit versus human confirmation.
Do not infer either human involvement or independent review from a required
approval count alone.

This changes research comparisons, not host policy. The accepted
[unattended Git credential decision](/nodes/oats-operator-expert/decisions/host-git-credentials-must-work-unattended.md)
remains authoritative. Replacing a shared host account, requiring per-agent
Apps or keys, or changing the human sign-off boundary needs that owner's
review and any required human acceptance; this research grants none.
Attribution controls belong in credential architecture, audit records and
executable event-coverage tests, not in naming conventions alone.

**Owner and recheck:** market-research-expert. Recheck before recommending a
forge identity design, or when audit, signing, review-credit or composite-
identity contracts change. Update or supersede this finding and log the
change, preserving which claims were actually tested.

# Citations

1. GitHub audit-log, commit attribution and App documentation; GitLab Duo
   composite-identity documentation, as summarized by the source on
   2026-11-02. Precise page locators and tested versions are not captured;
   these are source-reported research leads, not independently verified
   product guarantees.

Evidence: OKF proposal from market-research-expert/coord-oversight-research-expert,
2026-11-02; notes/shared-forge-account-cannot-attribute-approvals.md.
