---
type: Decision
title: No GitHub account means assisted signup, not local-only onboarding
description: Help a newcomer create a GitHub account in their browser rather than add a local-only onboarding route, preserving one workspace hosting model and the attested Desktop path.
about: [workstream/operations]
id: dec-5be70c8edb16
tags: [operator, onboarding, github, workspace-hosting, human-direction]
timestamp: 2026-11-03
---
# Accepted direction

**Acceptance: source-reported.** Pepe directed the onboarding campaign in the
source's session on 2026-11-03 to prompt a newcomer without a GitHub account
to create one and to install the CLI for them. The proposal and named note
report this direction; the session was not independently read, so acceptance
is not labelled verified.

Keep GitHub as the single workspace host for the guided onboarding path.
Discover whether the person has an account in the consolidated intake. If
not, help them reach GitHub's sign-up page in their own browser; they create
the account there, with account details kept out of the conversation. The
agent installs missing `gh` with the other tools covered by the person's
scoped approval, then starts the usual device-login flow. Do not stop at
an unexplained missing-account prerequisite or replace it with a second
hosting route.

# Why this route was chosen

The source reports that a newcomer trial stopped because onboarding had no
path for someone without a GitHub account. The accepted trade-off is a browser
signup step for the person in exchange for one hosting model and access to
the attested Desktop path, rather than branching the product experience.

The considered alternatives were:

- **A local-only workspace host with TUI-only onboarding.** Rejected because
  it adds a second hosting model to maintain and loses the Desktop path. The
  source's stated constraint at the decision date was that the Desktop's
  attested download needed a GitHub login.
- **Hosting the workspace on aweb.** Rejected because that workspace-hosting
  option did not exist in the source's account at the decision date. This is
  not a claim that aweb lacks hosted messaging or teams.

These are the reported reasons for the onboarding choice, not a new audit of
Desktop distribution or a timeless claim about provider availability. A future
change to those constraints calls for an explicit decision review, not silent
replacement of the accepted route.

# Scope and implementation boundary

This refines the existing
[newcomer-experience decision](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
without superseding it. The person still completes required account and login
actions; the browser-step trade-off is not a measured promise of exactly one
visit or no further human interaction. The
[intake-consent lesson](/nodes/oats-operator-expert/lessons/intake-consent-does-not-predict-auto-mode-approval.md)
remains authoritative: a consolidated yes is not a guarantee of later tool
approval and does not override a refusal.

The choice concerns guided workspace hosting, not local messaging for
disposable trials. It also leaves the
[private-workspace disclosure decision](/nodes/oats-operator-expert/decisions/private-member-requires-a-private-workspace-host.md)
and [unattended Git credential decision](/nodes/oats-operator-expert/decisions/host-git-credentials-must-work-unattended.md)
unchanged. Signup and device-login commands belong in the maintained onboarding
and Git setup skills, not a second procedure in this node.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-03; notes/no-github-account-gets-one.md.

The reported trial and human direction support the decision and its rationale;
this harvest did not run onboarding or verify the reported implementation.
