---
type: Decision
title: A launch check judges the environment the launch will have
description: Launch checks share the launched process's environment model, disclose what they cannot establish, and never pass by silently substituting the spawner's account.
about: [workstream/oats-direction]
id: dec-53d4b9eb1583
tags: [coherence, launch, environment, readiness, trust]
timestamp: 2026-10-14
---
# Decision

The maintainer's source-reported decision of 2026-10-12 is that one function
answers which environment a launch will have, and every check about that
launch uses it. Folder trust, harness-package admission, readiness and the
remedies they print must agree with the process that will actually run.

The reason is not code reuse alone. A check can pass against one account's
configuration while the harness starts against another's. The reported
investigation found that a pane inherited its tmux session's environment,
while checks read the spawning process's environment. Agreement when a launch
configuration explicitly supplied the selector hid the other cases.

Rejected: falling back to the user's default configuration when the server
holds a selector; keeping the mismatch and merely saying that the checks
refer to the spawner. Neither establishes trust or package availability for
the launch.

# Unknown is not a passing check

A failed environment read remains visibly unknown or a refusal, according to
the operation's contract; it never becomes the spawner's value presented as
the launch's. Remedies name the environment they actually address.

The note explicitly revises an earlier term: a preview with no server does
**not** start the operator's login shell to discover the environment a future
server would get. That read executes personal code and can block. The preview
says what is not established and what it used instead; the actual start checks
its real environment. Likewise a scaffold-only operation checks the calling
process and identifies that source where it emits a warning or refusal.
Configuration references deliberately resolved from the spawner are not
silently reinterpreted by this decision.

# Related failure, decided in the kernel node

The 2026-10-14 proposal reports a channel-delivery launch inheriting a stale
`AWEB_DELIVERY=session` from tmux. Clearing it and restarting restored delivery.
It proposed that a provider-declared variable omitted from that launch's
payload be explicitly unset, rather than inherited. When that proposal was
harvested, the fix was still only proposed. It was decided the same day, and
the kernel node owns it: [a provider-declared launch variable is the
provider's to decide](/nodes/oats-kernel-expert/decisions/declared-launch-variable-is-the-providers.md).
This concept does not restate that rule. It still requires checks to read
the resulting absence through the same launch-environment answer.

The [hook-input lesson](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)
owns the separate rule about what a provider hook reads and passes to its own
tools. This decision concerns agreement between launch checks and the process
being checked, not a replacement for [native harness configuration](/nodes/oats-kernel-expert/decisions/harness-native-launch.md).

# Enforcement and evidence

The elimination route is a shared launch-environment resolver with regression
coverage where spawner, server, session and explicit launch settings disagree,
including unavailable-read and preview cases. The durable decision explains
why an independently reconstructed check environment is wrong; it is not a
permanent manual workaround for that defect.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-pepe, 2026-10-14; notes/a-check-reads-the-environment-the-launch-will-have.md.

The note attributes the decision and its preview qualification to
[awebai/oats#993](https://github.com/awebai/oats/issues/993), comments 6133064991
and 6134784443. The inherited-delivery incident and proposed unset rule are
in the proposal only, citing [#1123](https://github.com/awebai/oats/issues/1123).
These are source-reported decisions and observations; this harvest did not
reproduce the launches or independently establish acceptance.
