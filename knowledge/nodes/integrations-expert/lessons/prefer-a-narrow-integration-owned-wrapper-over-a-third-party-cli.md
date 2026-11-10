---
type: Lesson
title: Prefer a narrow integration-owned wrapper over a third-party CLI, and document its boundary as a support matrix
description: When a service's official CLI covers too little and third-party CLIs have unstable contracts, an integration owns a small JSON-first wrapper over the service's API with credentials from the environment and missing authentication surfaced early; its guide and skill state a support matrix (command-supported, human-only, not supported) and tell the agent to escalate rather than improvise outside it.
about: [workstream/provider-integration]
kind: lesson
id: ins-9fd1a7de2322
tags: [lesson, integrations, wrappers, cli, secrets, authentication, tasks, documentation, guardrails]
timestamp: 2026-07-10
---

Decided 2026-07-10 by the integrations expert for a tracker integration; the
reasoning generalises to any integration whose service has a usable API and an
inadequate command line.

# Rule

- **Own the surface.** Build a small command wrapper over the service's
  official API that exposes only the operations agents need and returns stable
  JSON. Do not depend on a third-party CLI's contract, and do not pull in a
  large SDK for a handful of calls when the platform's own HTTP client
  suffices.
- **Secrets live in the environment.** A personal API credential is read from
  an environment variable and never written into committed settings.
- **Surface a missing credential without blocking the spawn.** The kernel's
  `requires` rows describe host commands and harness packages, not
  environment variables, so an advisory spawn hook warns when the credential
  is absent and the wrapper's own auth command fails with an actionable
  message; the agent is told to stop and ask, not to guess.
- **Document the boundary, not only the commands.** The integration's guide,
  with the operational subset repeated in its skill, states: recipes for the
  common relationships (a project's issues, an issue or sub-issue in a
  project); where durable information lives (documents explain the work,
  issues execute it, comments record events, messaging carries conversation);
  a support matrix of command-supported, human-or-UI-only and not-yet-supported
  operations; and the guardrail that an unavailable operation escalates to a
  human, never an invented API call or a guessed flag.

# Why

A service's official CLI is written for humans and often covers a fraction of
the API; third-party CLIs cover more with contracts that change under you. A
wrapper the integration owns is versioned with it, tested against the API, and
narrow enough to review. Agents then fill documentation gaps by inference (if
issues have comments, surely documents do), and each wrong inference is a
failed call at best and a fabricated record at worst; the matrix makes the
wrapper's boundary a fact the agent can read. Keeping credentials out of
committed settings is the same rule as any host-owned fact
([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)).

# Consequences

- Package experts for tracker integrations own the wrapper's command
  vocabulary and matrix; this node owns the pattern.
- A review of an integration checks that no credential can reach a committed
  file through its settings, and that its skill says what to do when an
  operation is not in the matrix.

# Citations

- Migrated from agents/integrations-expert/soul/knowledge @ dade3270.
