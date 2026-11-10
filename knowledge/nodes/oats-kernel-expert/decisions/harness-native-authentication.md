---
type: Decision
title: Harness authentication is native and user-managed; OATS never handles credentials
description: Users authenticate their harness through its own mechanisms and OATS launches it in that native authenticated context; OATS never parses, copies, stores or wraps credentials, never imposes an API-key-only subset, and never swaps HOME or profiles to make isolation evidence pass.
about: [system/oats-kernel]
id: dec-a4a57f6dabe1
tags: [kernel, runtime, harnesses, authentication, credentials, boundaries]
timestamp: 2026-09-18
---
# Rationale

Accepted by the human 2026-09-18. A proposed OATS-hosted Pi SDK launcher
(part of the captured path, since removed) introduced an explicit auth-file
argument, an OATS-owned read-through credential store and an API-key-only
restriction. That would have put OATS in charge of credential selection,
formats and lifecycle, and would have excluded an already-authenticated OAuth
or subscription installation. The human rejected that responsibility split
for every harness: OATS must not require a new key, a different login method
or an OATS-managed credential layer to launch a harness the user has already
authenticated.

**The harness owns authentication.** Users log in and configure their harness
through its own supported mechanisms. OATS launches it with its normal native
authenticated context; credential resolution, helpers, OAuth refresh and
persistence are the harness's. OATS never parses, filters, copies, converts,
injects or stores harness credentials; never wraps a credential store or
creates an auth service; never asks users to supply secrets to OATS; never
adds an auth-file selector as a launch prerequisite; and preserves the user's
native profile selection. A launch configuration's `env` may reference a host
variable (`{ fromEnv: NAME }`), rendered as a reference and never a value.

Missing, expired or invalid authentication surfaces as the harness's own
failure for the user to resolve. OATS does not silently log in, repair
accounts, create keys, borrow identities or claim readiness from model
metadata.

**Composition and authentication are separate boundaries.** What OATS
composes into the home is OATS-controlled; authentication is
harness-controlled. Claude Code binds authentication to its config directory
(verified against 2.1.220, 2026-07-27), so any isolation that swaps HOME, the
config directory or a profile forces credential copying. Never change those
to a private surrogate to make resource-isolation evidence pass; if a
supported interface cannot preserve native authentication and a required
boundary together, name the limitation rather than reach for private APIs,
copied credentials or a wrapper.

Being logged into a harness establishes nothing about a messaging
principal's human, team or grants; harness authentication and external-service
authorisation are separate axes (see the
[messaging boundary](messaging-capability-owns-provider-behaviour.md)).

# Consequences

- Real execution acceptance uses a harness the operator has already
  authenticated normally; a test must never create, copy or reformat
  credentials to pass. In-memory fixtures are inert tests, not live readiness.
- Curating what a harness sees does not make OATS the owner of its
  authentication. The two were conflated once and the conflation was
  rejected; do not re-derive it from "OATS controls the launch".

# Related

[Harnesses start natively; OATS sandboxes nothing](harness-native-launch.md);
[Integrity, origin and consent are different proofs](trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current execution-targets.md](https://github.com/awebai/oats/blob/main/docs/execution-targets.md)
- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge and agents/cli-dev/soul/knowledge @ 7838d3ca (harness-native-authentication, claude-strict-launch-setting-sources).
