---
type: Lesson
title: A fallback the contract defines is implemented in every path, readiness included, and is a warning, not a readiness problem
description: When the contract says an input degrades to a defined default, every code path that consumes the value (each identity mode, spawn, readiness, remedies) takes that default and warns; readiness derives the value exactly as spawn does, and a provider that blocks on a defined fallback, or implements it in one mode only, turns the kernel's warning into an outage.
about: [workstream/provider-integration]
kind: lesson
id: ins-7ea8b5bd68e3
tags: [integrations, readiness, fallback, contracts, warnings, identity]
timestamp: 2026-09-25
---

**Observed.** Two regressions in one provider release cycle (2026-09-25):

- The contract made an unmapped soul team label a discovery warning that
  resolves to the workspace's default team. The provider's spawn refused
  ("cannot determine target team for label …") and readiness answered
  needs-configuration for exactly that input. The kernel warned, the
  provider blocked, and an instance the contract said should run did not.
- The default-team rule (no configured team means the root's active team)
  was implemented for local identities, while the same change removed the
  older fallback from the global (session-grant) path and left a fatal there.
  A global-mode deployment that minted on the previous release stopped
  spawning, and global-mode readiness did not derive the team at all.

**Rules.**
- Read the contract's fallbacks as behaviour to implement, not as inputs to
  reject: take the default, and say so with a warning that names the input
  and the default used (`team-unmapped`, "using the default team …").
- List every code path that consumes the value (each identity mode, spawn,
  readiness, remedies) before changing where it comes from, and give each the
  contract's fallback. The source may differ per mode (the messaging root for
  local, the resident custody root for global); the rule does not. When you
  remove a fallback, say in the PR what replaces it for each mode.
- **Readiness follows spawn**: one shared derivation and one fixture, so the
  readiness answer predicts what spawn does. A readiness verdict that
  disagrees with spawn is worse than none: it sends the operator to the wrong
  remedy. For a check predicting a live consumer rather than spawn, see
  [readiness reads the setting source its consumer uses](/nodes/integrations-expert/lessons/readiness-reads-what-the-consumer-reads.md)
  for the captured-versus-current distinction; the fallback rule is unchanged.
- Readiness status is about operation, not configuration taste: ready when the
  instance can run on the fallback, with the improvement carried as a warning.
- Test the fallback with the real binary, the kernel's actual signal and the
  real credential root's shape (the key the root actually carries), not only
  the refusal path or a fixture's shape.
