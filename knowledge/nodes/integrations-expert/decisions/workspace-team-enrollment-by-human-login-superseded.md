---
type: Decision
title: Superseded — enrolling a workspace's team through a human login on the host
description: SUPERSEDED 2026-09-26 by "a workspace has a default team; there is no personal team". Was: the design agreed with the messaging service for a zero-step team per workspace and for an entitled human joining a mapped team without a hand-carried token; implementation requirements, not released commands, and the integration composes them without changing its per-spawn path.
about: [workstream/provider-integration, workstream/messaging]
id: dec-9e864bbeb89a
tags: [decision, superseded, integrations, messaging, identity, admission, onboarding]
timestamp: 2026-09-24
---

**Superseded 2026-09-26** by [a workspace has a default team; there is no personal team](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md): there is no personal team, and a human login on the host is never in the provider's path. Kept as the record of what was agreed and why it was withdrawn; its "personal" wording is the old framing.

Agreed 2026-09-24 between the integrations lane and the messaging service's
coordination and protocol review, after a source-verified proposal from this
side. The service owns the verbs, response shapes and release floors; until
its implementation review fixes them, released integration guidance names
only commands that exist today.

# Context

Two product requirements were open against the messaging integration: R1, a
personal team per (person, workspace) that a logged-in person gets with no
further step and that converges across their machines; R2, a person entitled
to a shared team the workspace names joining from a fresh machine without a
token handed to them by hand. Neither existed as a service primitive. The
service's CLI had no human credential at all beyond a per-workspace team
API key; its hosted side had browser sessions and an OAuth authorization
server for connectors but no device flow; personal namespaces held exactly
one team; an idempotent get-or-create existed only for that one team; and
minting a spawn invite required team-key authority, which a certificate-
authenticated member identity is bridged into server-side.

# Decision

- **One prerequisite: a human CLI login** on the service's existing
  authorization server via device authorization, with its own audience
  (connector grants are not the human substrate), short-lived access and a
  revocable refresh token, stored host-only with owner-only permissions,
  a token-free status command, and server-side revocation on logout.
- **R1: an idempotent ensure of a workspace team in the person's own
  personal organization namespace**, using the namespace's existing
  multi-name model rather than a new authority. The team is bound to the
  full SHA-256 digest of the canonical workspace key; the default public
  label is a short prefix of that digest, never the workspace name, and a
  readable name is an explicit opt-in. Every ensure compares the stored
  binding and returns a typed conflict on mismatch, so two workspaces can
  never silently share a team. Remote-backed workspace keys converge across
  machines; local-only paths make no such promise. Ensure reuses the
  directory's existing identity, is idempotent on already-member, and never
  creates a second identity in an occupied directory.
- **R2: a token-free join for an entitled human** using the service's
  current write-access predicate (owning-organization owner or admin, or an
  explicit team admin or editor), then the existing invite and certificate
  issuance. No new admission policy object.
- **Both use the same shape**: a session-authorized mint of one single-use,
  short-expiry spawn invite, redeemed in place by the CLI, the way the CLI
  already handles worktree admission. The human never sees a token.
- **A certificate-authenticated member identity keeps its ability to mint
  per-spawn invites** without an admin role or API key; the integration's
  per-spawn path does not change.

# Why

It reuses two things that exist (the idempotent personal-team helper and
the spawn-invite model), follows the service's own admission ruling that
current write-capable access decides, keeps every human credential out of
agent homes and repositories, and lets the integration's readiness map each
refusal to one exact remedy instead of inferring entitlement from a
repository, a namespace, an email or an OS user.

# Consequences

- Until the login and verbs ship, the integration offers one guided setup
  step over existing primitives (a fresh hosted account with a username, a
  team API key, or an invite token) and reports needs-configuration with the
  remedy; its honest limits are one personal team per person, not per
  workspace, and a second machine still needs a token.
- When the verbs ship, readiness gains one code (not logged in) and setup
  runs the ensure; nothing else in the spawn path moves.
- Related: [a personal team per workspace needs a service primitive](/nodes/integrations-expert/lessons/a-team-per-workspace-needs-a-service-primitive.md)
  (the gap this decision closes) and
  [integration guidance names only verbs the target CLI exposes](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md)
  (why released guidance waits for the verbs).
