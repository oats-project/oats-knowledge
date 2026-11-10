---
type: Decision
title: A provider-declared launch variable is the provider's to decide
description: A capability-declared launch variable omitted by both the hook payload and explicit launch configuration is removed at the launch boundary, because ambient sources are open-ended and provider-specific or tmux-only fixes cannot close the class; a name the kernel hands only to hooks is unset by the pane command for the same reason.
about: [system/oats-kernel]
id: dec-c9d3f2b2ea3a
tags: [kernel, capabilities, launch, environment, coherence]
timestamp: 2026-10-30
---
# Decision

For every launch a capability participates in, a variable it declares in its
manifest `environment` is that capability's to decide, not an ambient default
waiting to be inherited.

- The hook payload can supply its value for the launch.
- The launch configuration's `env` remains an explicit operator setting on
  that launch's own command, not an ambient value to remove.
- If neither supplies the declared name, the kernel removes it from the
  launch. Omission means absence, not permission to inherit another
  instance's choice.

The source reports this decision by both maintainer sides on 2026-10-14,
including agreement to the explicit launch-configuration exception. The
removal is execution-only: keep the persisted command unchanged, unset before
that launch's own assignments on every pane path (spawn, start, start in
place and restart), and introduce no new error code for this rule.

Checks consume that absence through the same launch-environment answer as the
launch. The [launch-check decision](/nodes/oats-maintainer/decisions/checks-use-the-launch-environment.md)
owns why checks and the process must agree; this concept owns the declared-name
omission rule, not a second environment model.

# Why the boundary is the launch

The reported failure was a channel-delivery harness inheriting
`AWEB_DELIVERY=session` from tmux and consequently receiving no channel wake.
The important discovery is not one variable or one server setup: ambient
values can come from a server, a session, a login shell or the process that
created them. That set is open-ended. Removing an omitted declared name at
the launch boundary handles those sources without teaching the kernel a
particular provider's defaults.

Rejected alternatives:

- **Emit an explicit provider default behind a consumer floor**, such as a
  channel value understood by a newer plugin. This fixes one provider and
  adds a plugin-version dependency instead of establishing the generic rule.
- **Strip declared names when creating the tmux server.** This expands the
  chosen contract, still misses a session value set by hand, and is
  unnecessary once the launch removes the name.
- **Change tmux arguments to stop launch values seeding the session.** The
  source's investigation corrected that diagnosis: the relevant
  `new-session` call did not pass `-e`, and window-specific values were
  already assignments on each window's command. An argument-only repair
  would not address the reported ambient path.

# Scope and enforcement

This is a rule for capability-declared names, not general environment
isolation or a reversal of [native harness configuration](harness-native-launch.md).
A shared Codex app-server started outside the launch retains its starter's
environment; this launch boundary cannot rewrite that process.

The [hook-input lesson](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)
remains the canonical rule for a hook's own inputs and child tools. Here the
kernel is protecting the launched harness, not taking over the hook's duty.

The elimination route is generic launch-boundary removal plus regression
coverage with disagreeing creator, server, session, payload and explicit
launch settings. Exercise the real launched process as well as the shared
check answer, including a broker-path launch followed by a channel-path
launch. Keep the rationale here so a future change does not replace that
boundary with one of the narrower fixes above.

# Hook-only reserved names take the same pane boundary (2026-10-30)

The boundary above also governs the opposite direction: a name the kernel
hands **only to hooks**, such as
[`OATS_HARNESS_EXECUTABLE`](hook-executable-is-the-pane-side-answer.md),
must not reach the harness. The source reports, from review of a
hook-only variable on real tmux on 2026-10-30, that **reserving the name
is not enough**. Reservation covers the launch configuration, the
environment OATS builds for a session it creates, and an automation's
child. A tmux server that already runs is none of those: a new window
inherits the server's and session's environment whatever the client's is,
so a value set there reaches the harness while the hook sees the right
one. The pane command is the one boundary that holds for every creator,
so a hook-only name is **unset there as well as reserved**.

This is consistent with rejecting a strip at server creation above: the
launch removes the name, and this section records why the launch must,
for a name the kernel itself hands to hooks. A test of the rule reads the
**actual harness pane**, not the hook's log, on a server seeded with the
name before the launch.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/hook-only-names-stop-at-the-pane.md.
The harvest read [oats-project/oats#1675](https://github.com/oats-project/oats/issues/1675)
and [implementation PR #1677](https://github.com/oats-project/oats/pull/1677),
merged on 2026-10-30, whose body reports the review finding that a value
on an existing tmux server reached the harness, the pane-command unset for
both names and a real-tmux test reading the harness pane; and
[PR #1690](https://github.com/oats-project/oats/pull/1690), merged on
2026-10-31, which removed the unread yolo variable and kept the
executable's pane handling. The review finding and tests are
source-reported; nothing was rerun at harvest, and no human acceptance is
certified.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-env, 2026-10-14; notes/declared-launch-variable-is-the-providers.md; notes/new-session-never-seeds-from-a-launch.md.

The proposal and notes attribute the decision to
[awebai/oats#1123](https://github.com/awebai/oats/issues/1123), comments
6168116963 and 6168302461, and the mechanism correction to comment 6168443110.
They report implementation merged in
[#1135](https://github.com/awebai/oats/pull/1135) at `08a66b75`; the proposal
also reports a private-tmux-server regression. These are source-reported
acceptance, implementation and test accounts, not independently verified
human acceptance or reproduced test results from this harvest.

Maintainer-verified citation (knowledge-maintainer review, 2026-10-14): on
awebai/oats#1123, comment 6168116963 proposes the removal rule and comment
6168302461 records the release lane's agreement to it ("decided by both
sides"); comment 6168443110 records the `new-session` correction and the
launch-configuration exception. awebai/oats#1135 merged on 2026-10-14 at
`08a66b75`. These are maintainer-lane decisions, not a separate human
acceptance record, and the regression tests were not rerun.
