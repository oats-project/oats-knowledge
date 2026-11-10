---
type: Decision
title: A consumer filter takes the identity the kernel already reported
description: A Desktop-facing roster filter accepts the reported workspace key rather than reinterpreting a repository ref, because the consumer holds host identity and a member ref can resolve to a different key.
about: [system/oats-kernel, system/oats-desktop]
id: dec-a78c90479233
tags: [kernel, desktop, cli, identity, workspaces]
timestamp: 2026-10-15
---
# Decision and rejected alternative

For the Desktop-facing roster filter, accept the exact `workspace.key` the
consumer obtained from `oats status --json`, using `--workspace-key`, and
compare it with the registration's `workspaceKey`. Do not copy the
operator-facing `server list --workspace-ref` input merely because the two
verbs are adjacent. That operator input remains a separate contract.

The rejected ref form was not just inconvenient spelling. In the source's
account, a deployment whose local configuration names a member repository
can report the host's workspace key while parsing that member ref yields the
member's key. Re-canonicalizing the ref would therefore change the identity
being compared and filter out the intended registration. The ref parser also
refuses a bare canonical key, so it cannot even receive the value Desktop
already has.

The general design question is **which object does the consumer actually
hold across the boundary?** When a consumer returns an identity the kernel
already reported, accept that identity in its declared canonical form rather
than requiring the consumer to invent a reference that might resolve
elsewhere. This is a filter-design precedent, not permission for a caller to
turn a matching key into authorization or bypass another command's guards.

# Scope and enforcement

This is distinct from the [resolved-object containment lesson](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md):
that lesson establishes filesystem and instance identity; this decision keeps
a reported identity intact at a machine CLI boundary. The Desktop's
[filtered-roster decision](/nodes/oats-desktop-expert/decisions/filtered-roster-preserves-unasked-groups.md)
owns how a partial answer is combined with unasked groups. Neither policy is
redefined here.

The current flag grammar belongs in the repository's
[Desktop CLI contract](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md).
Protect this rationale with a producer-to-consumer round-trip regression
whose host and member keys differ: the reported key must select the intended
registration without ref parsing. This is an enforcement route, not a claim
that the harvest ran or verified such a test.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-desktop-queue-kernel, harvested 2026-10-15; notes/roster-filter-takes-workspace-key-not-ref.md.

The source dates the refinement to 2026-10-14 and cites
[awebai/oats#1124 comment 6169253976](https://github.com/awebai/oats/issues/1124#issuecomment-6169253976),
reports the implementation merged in [#1148](https://github.com/awebai/oats/pull/1148),
and reports reading registration and Desktop comparison behavior at
`34beaf2b`. Those agreement, implementation and code-reading claims are
source-reported, not independently audited by this harvest. The cited
refinement records the proposed shape; it is not presented as proof of both
maintainers' approval. See the separate
[exact-shape approval lesson](/nodes/oats-kernel-expert/lessons/contract-approval-does-not-carry-across-refinement.md).

Knowledge-maintainer review, 2026-10-15: the cited refinement comment states
both reasons recorded here (a member ref canonicalizes to the member's key,
and the ref parser refuses a bare key), and #1148 merged on 2026-10-14 with
both maintainer sides approving the `--workspace-key` shape. The repository's
contract states that keys are never parsed as references but not why; that
rationale is what this decision adds. This records maintainer-lane agreement,
not human acceptance.
