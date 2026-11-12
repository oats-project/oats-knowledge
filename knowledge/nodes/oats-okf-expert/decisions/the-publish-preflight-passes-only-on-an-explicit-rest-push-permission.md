---
type: Decision
title: The publish preflight reads REST `permissions.push` and passes only on an explicit true
description: The gh write check before a proposal's push is `gh api repos/<repo> --jq .permissions.push` and passes only on `true`, because GraphQL's `viewerPermission` is null under GitHub App authentication and a gate that lets an unstated permission through publishes half a proposal.
about: [system/oats-okf]
kind: decision
id: dec-3d462893fdbb
tags: [decision, okf, propose, publication, gh, github, permissions, preflight]
timestamp: 2026-11-12
---

# The decision

The preflight asks GitHub one question through `gh`: may this credential push to the base's repository. It reads the
REST repository object's `permissions.push`. `true` passes. `false` refuses as `no-write-permission`. Anything else
(null, empty, another shape) refuses as `gh-failed`. All three refuse before the attempt begins.

# What was tried first, and why it was wrong

The first build read `gh repo view --json viewerPermission` and refused only `READ` and `TRIAGE`. An unknown value
passed, so that a credential GitHub does not describe would not be refused by mistake. Review showed the cost: an
empty answer passes the gate, the branch is pushed, and the label call fails after publication has begun. That is
the half-published proposal the gate exists to prevent.

Accepting only `WRITE`, `MAINTAIN` and `ADMIN` from the same field is not the fix. GitHub documents
`viewerPermission` as null under GitHub App authentication, and `gh` prints it as an empty string. That rule would
refuse every App credential.

# The rule behind it

A gate before a step that cannot be undone passes only on a positive statement. An absent answer is a refusal with a
fixed reason, never a pass.

# Limits

- Not established: what `permissions.push` answers for a GitHub App installation token or a fine-grained token. A
  credential mode that carries one is rehearsed against GitHub before it is relied on.
- The field describes the credential's access to the repository. It does not prove that a narrowly scoped token may
  create a label or open a pull request.

# Evidence

- oats-okf pull request #154 (issue #148), third review round, 12 November 2026 [2]; approved at head 96399cd [3], not
  merged or released when this was proposed.
- Observed with gh 2.102.0 against GitHub on 12 November 2026, signed in as a user account. The field was `true` on a
  repository the account administers and `false` on a public repository it cannot write to; a missing repository,
  an invalid token and a signed-out configuration made the call fail.
- Evidence: OKF proposal from oats-okf-expert/okf-propose-preflight-lead, 12 November 2026;
  notes/write-preflight-reads-rest-permissions-push.md.
- Maintainer review (oats-okf-knowledge-maintainer-review-pr-376) checked the third-round finding, the approving
  review, and that `publishPreflight` at 96399cd passes only on `true`, refuses `false` as `no-write-permission` and
  anything else as `gh-failed`.

# Citations

1. GitHub GraphQL reference, `Repository.viewerPermission`: https://docs.github.com/en/graphql/reference/objects#repository
2. oats-okf #154, the third-round review that found the unknown-permission pass: https://github.com/oats-project/oats-okf/pull/154#pullrequestreview-5880153953
3. oats-okf #154, the approving review at head 96399cd: https://github.com/oats-project/oats-okf/pull/154#pullrequestreview-5880679098
