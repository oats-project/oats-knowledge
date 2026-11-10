---
type: Lesson
title: Fresh machines do not reset account history
description: First-time onboarding needs fresh service-account evidence as well as a fresh machine, followed by a second machine joining the same workspace, because existing accounts and single-machine trials hide different failures.
about: [workstream/operations]
kind: lesson
id: ins-3f91be2ec9da
tags: [operator, onboarding, acceptance, accounts, multi-machine]
timestamp: 2026-11-02
---
# The missing dimension of a clean trial

A new VM can still use an account that has already passed every first-use
server check. Conversely, a successful first-machine setup says nothing about
joining its workspace from a second machine. Treat machine state, service-side
account history and shared-workspace reuse as separate acceptance dimensions.

This is the operator's test-design refinement of
[second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md),
not a replacement for its independent-verifier, published-combination and
positive-enumeration gates. For a first-account route, start with both a fresh
machine and a genuinely new service account. Then test a second fresh machine
joining that **same** workspace and team; two unrelated new accounts do not
exercise shared-team collisions.

# What the campaign exposed

The 2026-11-02 onboarding VM campaign reports three distinct blind spots:

- A first human-verification check refused new accounts that already had
  agents. The intended setup order reached that state even though unit and
  documentation checks passed; a real account and the person's verification
  action exposed it.
- An invite operation failed after no-sign-in setup without an explicitly
  recorded root. Developer deployments with a recorded root missed the case.
- The second machine was offered an assistant name already held by the first
  machine's instance in their shared team.

These are source-reported examples explaining the test dimensions, not a
current defect register, a release-status claim or proof that all established
accounts hide all first-use failures. The source also reports that reissuing
an email verification link invalidated the earlier one: repeatedly restarting
setup is not a neutral observation of the original user's path.

# Put the checks in the acceptance system

Add new-account and same-workspace second-machine cases to the acceptance
matrix. Reproduce each discovered service-state, missing-root or name-collision
failure in the owning component's regression tests where possible. Retain the
real newcomer path for interactions those tests do not exercise. The knowledge
is why those dimensions are needed, not a second setup command recipe.

This does not supersede the
[local-messaging default for disposable coordination trials](/nodes/oats-operator-expert/decisions/disposable-trials-prefer-local-messaging.md).
Testing hosted first-use behavior is its explicit hosted-build exception;
it needs authorization and cleanup accounting for remote account state. A
local fixture cannot certify untested hosted checks, and deleting a VM does
not delete a hosted account. Preserve native harness authentication rather
than inventing replacement credentials to make a trial appear fresh.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-02; notes/fresh-accounts-find-what-dev-accounts-hide.md.

The capture identifies OATS 0.69.8, aw 1.36.51 and oats.aweb 1.33.0 for the
initial campaign. Its reported environment was Ubuntu 24.04 with Claude Code
on a Max account. This harvest did not rerun it or certify a released fix.
Future campaigns must name the combination actually exercised; a fresh-account
run alone does not establish parity across services, operating systems or
harnesses.
