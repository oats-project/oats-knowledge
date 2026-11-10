---
type: Lesson
title: Distinguish question routing from human approval authority
description: Source-reported product readings from 2026-11-02 distinguish question routing, teammate-plan approval, merge-review credit, the surface that accepts confirmation and human permission or consent, and a reported ADK revert corrects an earlier fix claim, without establishing uniform product authorization rules.
about: [workstream/positioning]
kind: lesson
id: ins-d54d82cdd1a1
tags: [research, consent, authorization, delegation, personal-agents]
timestamp: 2026-11-02
---
# Dated conclusion

When comparing agent coordination products, ask separately **who carries a
question** and **who is authorized to approve the resulting action**. An
agent's ability to route a permission request does not, by itself, establish
its authority to supply the human's confirmation. A broker interface alone
therefore says little about the approval boundary.

This is a bounded, source-reported research conclusion as of 2026-11-02,
not a universal rule that consent can never travel through an intermediary
or that authorized delegation is impossible.

# Evidence and limits

The initial captured note reported two first-party examples: Claude Code
agent-teams documentation routes permission prompts to the lead while denying
a teammate the ability to supply human permission or consent [1], and Google
ADK Python PR #6462 was described as fixing remote-peer confirmation [2].
**The latter fix claim is withdrawn by the source's later recency pass.**

## Correction: the ADK transport guard was reverted

In a later proposal on 2026-11-02, the source reports directly fetching PR
#6462 [2]. It reports a merge on 2026-08-17 (`9e9eaa6`) rejecting tool
confirmations arriving over A2A, followed by a revert on 2026-08-20
(`9a32eba`). Its account of the revert gives two reasons: rejecting that
transport also blocked legitimate human-in-the-loop confirmations, while
HTTP run endpoints that were unauthenticated by default left another path
open. Thus the attempted transport restriction was neither a sufficient
approver-identity check nor compatible with all legitimate confirmations.

This corrects the earlier example, not the question-versus-approval
principle. Do not cite that merged PR as a lasting consent fix without
checking the subsequent history. Equally, a reverted transport restriction
is not evidence that agent assertions constitute human authorization.
The retained lesson is to examine **the approving principal and the
executing endpoint's enforcement**, rather than infer either from the
transport used to carry a response.

The harvest inspected the captured proposal and note, not the live PR,
patch, endpoints or tests. The direct fetch is **source-reported**, not an
independent security audit. These inputs establish no current affected-version
range, exploitability assessment or resolution status beyond the reported
merge/revert history. They do not prove every relay unsafe or evaluate a
channel that preserves authenticated human authorization.

The knowledge maintainer's review of this correction, on 2026-11-02,
confirmed in the google/adk-python repository that commits `9e9eaa6`
(2026-08-17) and `9a32eba` (2026-08-20) exist and that the revert's message
gives both reasons above [2]. That checks the reported history, not the
current code, endpoint defaults or any later fix.

The same recency note attributes two further distinctions to Claude Code
documentation read on 2026-11-02: the auto-mode classifier treats another
agent's approval claim as untrusted, and a fired scheduled-task trigger
cannot itself supply approval or consent [3]. These are source-reported
documentation readings, not tested enforcement guarantees. The capture
supplies no precise page locators, versions or evaluation context for them;
use them as leads for checking authorization semantics, not proof of a
cross-product standard or of classifier accuracy.

The note's broader assertion that four labs gate the same consequential
action classes lacks captured contract detail. No equivalent default policy,
coverage or enforcement across those products is inferred here.

## Plan approval is a separate authority boundary

A later source-reported reading of the same Claude Code documentation [1],
also dated 2026-11-02, adds a distinction missing from a simple
agent-versus-human approval label. For experimental agent teams, it reports:

- with the teammate's permission mode unchanged, a plan-approval request
  can be approved automatically without lead review;
- when the human explicitly puts the teammate in plan mode, the lead
  approves the plan or returns it, rather than asking the human to approve it;
- a teammate still cannot approve a permission prompt or provide consent
  on the human's behalf.

These are documentation interpretations, not a runtime enforcement audit.
The captured note preserves passages, but the proposal warns that the fetch
path returns model summaries; this harvest does not certify their wording
as verbatim. Availability is experimental, not a stable cross-product default.

The reported example is enough to challenge an unqualified claim that no
product has a coordinating agent with plan-approval authority. It is not
evidence that an agent can supply human permission or consent. The source
found no such consent feature in its survey; the capture does not establish
an exhaustive market-wide prohibition. The broader presence of lead/worker
interfaces already belongs in the
[supervision-pattern lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md),
not in a second product register here.

## A coordinator conversation need not reach a worker's approval

A separate oversight investigation, also dated 2026-11-02, reports that
Claude Code Projects combines a coordinator conversation with worker threads,
but keeps approval prompts inside the worker's thread: an instruction to
proceed in the coordinator conversation does not answer that prompt [4].
This is a **source-reported documentation reading**, not a runtime test or
an independently checked product contract. That initial capture supplied no
precise Projects page locator; its secondary-sourced launch date is not used here.
A later verification pass supplies the documentation locator below [4], not
a measured model or outcome comparison.

This adds an approval-surface distinction to the earlier authority question:
a conversation may carry intent without reaching the prompt that accepts
confirmation. It does not show that authenticated authorization cannot be
relayed, nor that all products bind consent to the same thread. A coordinator
front and direct worker access can coexist; neither establishes better
oversight. The existing supervision lesson owns that outcome question.

## Project scope and overview are separate from approval authority

The verification source reports reading the Projects documentation [4] on
**2026-11-02**: a goal is optional, a project can receive an ongoing stream of
tasks, and its Overview pane tracks threads and includes a Pull requests tab.
This contradicts an unqualified description of coordinators as confined to
one finite goal or of the product as lacking a project overview. It does not
establish a dedicated per-epic interface or measured oversight benefit.

The same reading describes **single-user ownership**, no organization-level
project controls during the beta, and public-beta availability on Pro, Max
and Ultra rather than Team or Enterprise. These are dated, source-reported
documentation conditions, not tested enforcement or a permanent availability
register. They bound this product reading; they do not prove that no shipping
coordinator anywhere spans teams or a portfolio. A visible overview, an
open-ended work stream and multi-human authority are different properties.
The thread-local confirmation boundary above remains separate from all three.

## Merge-review credit is not human confirmation

A separate recency proposal, also dated 2026-11-02, reports a contrast between
GitHub Copilot approval settings and the Claude Code team's own development
policy [5, 6]:

- GitHub reportedly lets an administrator opt in to counting Copilot's
  approval toward required repository approvals, with configurable path
  scope. This describes review credit under a configured gate, not an agent
  supplying a human's consent.
- The Claude Code team reportedly varies required human review by change
  risk, including a low-risk path without human approval once automated
  checks pass, while not counting an agent review as a person's approval.
  This is a reported team policy, not a contract for every Claude product.

The proposer says it rechecked both primary pages on 2026-11-02. That check
is **source-reported**: the capture preserves no exact page URLs or full
policy text, and this harvest did not fetch the pages or test enforcement.
The note also reports conflicting GitHub documentation without identifying
the conflicting pages; this harvest cannot resolve their scope or freshness.
Use the contrast as a lead to verify the configured gate, not as a certified
availability/defaults register or a blanket assertion that agents may merge.
No reviewer model or approval-quality evaluation is established here.

This extends the plan-versus-consent distinction rather than correcting an
accepted claim that no vendor permits agent approval; this concept made no
such universal claim. Automated review credit, omission of human review for
a risk class, human confirmation and permission to execute a merge are
separate properties. A vendor policy difference does not establish which
policy produces safer or more correct changes.

## A review instruction's source revision is part of its trust boundary

A third verification pass on **2026-11-02** reports that GitHub Copilot code
review reads custom instructions from the **PR head branch** [7]. The source
obtained this through documentation search results; the claimed change date
came from a secondary release summary and is not retained as a verified
release boundary. The harvest did not fetch the page or run the product.

This is a product lead for testing whether a proposed change to instruction
files changes the criteria applied to that same proposal. Reading path-scoped
instructions does not itself establish that an owner authorized their content.
Check the loaded revision, who can change it, and the gate protecting changes
to the criteria. Do not infer sufficient protection from CODEOWNERS alone,
or assume that all review agents read the same branch. The captured pass
leaves the branch behavior of several other reviewers unresolved.

The source's reading of the Copilot approval announcement above [5] also
leaves **code-owner approval satisfaction** unresolved. Counting toward a
configured approval total is not evidence that every required-owner gate is
satisfied. The capture supplies neither a code-owner contract nor an
execution test that would resolve that question.

## Approval delegation has prior art outside code-review products

The same pass reports **time-bounded ServiceNow Delegates that can approve
on a person's behalf**, and Okta governance delegates [8]. ServiceNow support
came from documentation in search results; Okta was researcher-read. These
are dated, source-reported prior-art leads, not independently checked
contracts. They are enough to challenge an unqualified claim that no tool
supports approval deputies, but not to establish equivalent delegation in a
forge or a policy suitable for OATS.

The note separately describes Entra entitlement-management alternate
approvers as a **timeout/non-response fallback**, not an absence-aware deputy
[8]. Compare delegated approval authority, assignment-only substitution and
non-response escalation separately. For any proposed deputy mechanism,
check the delegating principal, action scope, validity period and revocation,
not just the presence of a substitute's name. This investigation establishes
no exhaustive forge absence, common cross-product contract or measured
benefit from delegation; it adopts no new approval policy.

# Consequence for comparisons, not an OATS policy change

Compare the question-delivery path, plan-review decision, required-review
credit, the surface that accepts human confirmation and the executing tool's
enforcement separately. Record automatic plan approval separately from an
actual lead-agent review. Distinguish a model's assertion of approval from
whatever authorization evidence the product actually accepts; do not infer
that either a direct thread or a parent-agent relay proves the latter.
The [supervision-pattern lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md)
owns the separate question of whether an interface improves human outcomes.

The source suggests changing OATS question and approval handling. That is
not a decision of this research node and is not adopted here. The accepted
[coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
remains open, and [optional human attribution](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md)
is not superseded or made mandatory. This concept changes no operating
instruction, approval requirement or implementation contract. Any enforcement
change belongs in the owning capability's reviewed authorization design and
tests, not in a knowledge-only workaround.

**Owner and recheck:** market-research-expert. Recheck when Claude Code agent
teams leave experimental status, the cited vendor contracts or team review
policies change, Projects leaves beta or reaches Team/Enterprise,
approval-quality evidence becomes available, review-instruction source
contracts change, Copilot documents code-owner approval satisfaction,
versioned deputy contracts become available, or a proposed OATS approval
primitive provides a readable contract and enforcement evidence.
Update or supersede this dated finding and log the change; retain unknown
behavior as unknown until then.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. [Claude Code agent teams](https://code.claude.com/docs/en/agent-teams),
   source reading dated 2026-11-02.
2. Google ADK Python, [PR #6462](https://github.com/google/adk-python/pull/6462),
   source-reported direct reading dated 2026-11-02; merge/revert dates and
   commit identifiers above are supplied by the recency proposal and were
   confirmed against the repository's commit history in review.
3. Claude Code auto-mode classifier and scheduled-task documentation,
   source-reported reading dated 2026-11-02; precise page locators absent
   from the captured evidence.
4. [Claude Code Projects documentation](https://code.claude.com/docs/en/claude-projects),
   source-reported reading on 2026-11-02. The verification pass supplies this
   locator and reported scope/overview/availability details; neither pass
   constitutes a runtime test or an independent page check by this harvest.
5. GitHub Copilot approval announcement, dated 2026-10-28 by the source;
   source-reported primary-page recheck on 2026-11-02. Exact page locator
   absent from the capture.
6. Claude Code team's review-policy account, dated 2026-10-15 by the source;
   source-reported primary-page recheck on 2026-11-02. Exact page locator
   absent from the capture; a team policy, not a universal product guarantee.
7. GitHub Copilot code-review custom-instructions documentation, read through
   search results by the verification source on 2026-11-02; precise page
   locator and tested configuration absent from the capture.
8. ServiceNow Delegates documentation (search-result reading), Okta governance
   delegates and Entra entitlement-management alternate approvers
   (researcher-read), as reported on 2026-11-02. Precise page locators,
   product versions and full authorization contracts are not captured.

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/consent-must-not-be-relayed-between-agents.md
(initial claim and later recency correction).

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/coordination-products-have-coordinating-agents.md.

Evidence: OKF proposal from market-research-expert/coord-oversight-research-expert,
2026-11-02; notes/concierge-front-with-thread-bound-consent-is-mainstream.md.

Merge-review refinement:

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/human-consent-agent-approval-split-2026.md.

Evidence for the Projects scope refinement: OKF proposal from
market-research-expert/coord-claims-verification-expert, 2026-11-02;
notes/claude-projects-coordinator-is-goalless-and-single-user.md.

Evidence for the instruction-source and deputy refinements: OKF proposal from
market-research-expert/coord-claims-verification-expert, 2026-11-02;
notes/review-agent-instructions-branch-decides-owner-control.md;
notes/approval-deputies-exist-outside-forges.md.
