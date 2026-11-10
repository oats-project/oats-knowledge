---
type: Lesson
title: Forge account attribution does not prove human authorship
description: When agents share a person's forge account, an author check establishes the account record, not human authorship or independent approval.
about: [workstream/provider-integration]
kind: lesson
id: ins-9a62122e4a5d
tags: [integrations, evidence, approval, identity, forge]
timestamp: 2026-10-29
---

# Verify the claim the record can support

On a host where agents use the person's forge credentials, a comment, review
or commit attributed to that account can have been written by an agent. The
source's acceptance-review investigation found an agent's relay under the
human's account. Checking the author login therefore could not distinguish
that relay from a statement written by the human.

An integration that verifies a cited record may establish that it exists
under the named account and contains the cited statement. **That is not proof
that the human typed it or independently approved the action.** If the record
presents itself as a relay, retain the acceptance as source-reported; do not
upgrade it to independently verified human acceptance. Absence of a relay
label does not make a shared-account record human-authored evidence either.

This matters across knowledge review, release sign-off and tracker approval:
stronger wording does not repair an evidence channel that both the person
and their agents can write. The
[operator's shared-credential decision](/nodes/oats-operator-expert/decisions/host-git-credentials-must-work-unattended.md)
already owns unattended credential availability and the person's sign-off
responsibility. This lesson neither reverses that decision nor claims that
all hosts share an account; it bounds what an integration can infer where
they do.

# Elimination route and authority boundary

If a workflow requires independently established human approval, its approval
mechanism needs a channel or credential boundary that agents cannot use to
speak as that human. Until that exists, expose the evidence limit rather
than inventing an author-login heuristic. Keep record verification and human
acceptance as distinct outcomes in the integration's review guidance and
regression tests; include an agent relay posted under the expected login as
a negative case for human-authorship inference.

The existing knowledge-review skill is the operational home for the citation
check, not a second procedure here. This harvest does not certify a protected
approval channel, change credentials, revoke earlier decisions, or waive any
human-acceptance requirement. A shared login is a reason to qualify evidence,
not a reason to bypass the gate that asks for it.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/okf-needs-human-removal-integrations-expert,
2026-10-29; notes/shared-github-account-weakens-author-checks.md.

The source reports the shared-account relay observed during knowledge review.
The harvest did not independently audit the external discussion or test a new
approval mechanism. The preserved finding is the mismatch between account
attribution and human authorship, not an assertion about who wrote every
record under that account.
