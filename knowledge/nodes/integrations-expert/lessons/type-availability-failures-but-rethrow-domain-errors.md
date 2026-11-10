---
type: Lesson
title: Type availability failures for the operator, but rethrow domain errors untouched
description: When a knowledge or messaging provider wraps remote operations to produce typed, operator-friendly availability errors, the wrapper must catch only transport and unusable-source failures and let custody, confirmation, path and validation errors pass through with their original codes.
about: [workstream/provider-integration]
kind: lesson
id: ins-ad19c8e37b1a
tags: [lesson, integrations, errors, git, availability, custody]
timestamp: 2026-09-24
---

Learned 2026-09-24 while giving a knowledge provider typed errors for an
unreachable, missing or shallow Git base.

# Rule

A wrapper that turns clone, fetch, object-read and transport failures into
one typed availability error (with a reason such as timeout, auth, not-found
or shallow) must be narrow. Errors the provider already types for a
different reason, such as an owner or custody mismatch, a missing
confirmation, an escaping path, a base-selection error or a validation
failure, are rethrown as they are. The broad catch that made the first draft
simple also converted a custody mismatch into "base unavailable", which sent
the operator to the network when the real fault was authority.

The pattern that held:

- preflight locally configured sources before any clone, so a missing
  directory or a shallow clone is reported fast and without a network call;
- wrap only the operations that can fail for availability reasons, and only
  with the availability type;
- rethrow every domain error by code, and keep a test per domain code that
  asserts the code survives the wrapper.

# Why

Typed availability errors exist so readiness and setup can print one exact
remedy. A wrapper that absorbs domain errors defeats that purpose twice: the
remedy is wrong, and the provider's own qualification semantics (what counts
as an authority failure versus a transport failure) silently change under a
feature that was meant to be additive.

See also [a fallback the contract defines is a warning](/nodes/integrations-expert/lessons/a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md)
for the companion rule that readiness reports what the hook will do.
