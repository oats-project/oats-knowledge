---
type: Lesson
title: Signal tests must contain even regressed cleanup
description: Run real-process signal tests only on disposable CI runners or inside an isolated Linux PID namespace, and keep every signal target test-owned even when the code under test regresses.
about: [system/oats-desktop]
kind: lesson
id: ins-c2ffc4fbe116
tags: [verification, operator-safety, testing, signals, process-groups, tui, ci]
timestamp: 2026-10-28
---
# A test-owned child can acquire a foreign parent

The source reports that a TUI panel trial on an operator host killed the
user's systemd manager and the agents it supervised. The keeper had been
reparented to that host subreaper before its shell started; signalling its
then-current parent targeted the manager, not the intended test process.
Starting the keeper did not make its eventual parent a test-owned target.

This changes verification judgment, not just the keeper implementation:
contain the behavior of the **old or regressed code**, including its cleanup.
A fixed main branch cannot make a reproduction against old bytes safe. A
private tmux socket, a stand-in process, or a test header without a CI-only
warning is not a signal-containment boundary.

# Human direction and execution boundary

The proposal and named note attribute this direction to the operator,
relayed through the Desktop lane maintainer on **2026-10-28**: tests that run
the panel keeper or signal a real `oats tui`, tmux or control client must
never target the operator's real session. Use CI runners; local reproduction
requires an isolated PID namespace. Preserve that restriction for stand-ins
as well when they exercise the same signalling path.

Use a disposable CI runner, not the operator's session under a CI label.
The source's Linux reproduction used `unshare --user --pid --fork --mount-proc`
so the test had its own namespace init and process view. The test and its
signal-capable descendants must actually run inside that boundary; if it
cannot be established, do not fall back to the host. This is a
process-signalling boundary, not isolation of filesystem writes,
credentials or resource consumption. Existing
[operator-safety and native-effect restrictions](verification-judgment-for-privileged-surfaces.md#operator-machine-safety-is-part-of-verification-judgment)
and [fixture isolation](/nodes/oats-expert/lessons/real-proof-boundaries-preserve-fixture-isolation.md)
remain in force; the namespace is no new permission to launch Electron or
relax lifetime and output bounds.

The Linux namespace/subreaper proof is not portable macOS evidence. The
source reports that its subreaper regression skips on macOS, where this
Linux mechanism is unavailable. Obtain native macOS evidence on CI, with
skips distinguished from executed coverage, as required by the existing
[platform-baseline lesson](platform-keyed-tests-need-explicit-platforms.md).

# Own every possible signal target, including during failure

A test may signal only processes it started. When a reparenting regression
needs a subreaper, create a test-owned one rather than borrow the host's.
In the reported successful fixture, a subreaper using
`PR_SET_CHILD_SUBREAPER` led its own process group. Cleanup terminated the
owned group **before releasing a gate that could wake a waiting child**.
The first reviewed cleanup would instead have left a live keeper available
for adoption by the host's subreaper if the keeper script regressed.

The durable requirement is ownership through the whole failure path, not
faith in one `finally` block: keep signal-capable descendants in the owned
containment, terminate them before releasing their blocking gates, and
verify teardown. A process-group kill is a cleanup mechanism, not permission
to target unrelated groups or a replacement for the namespace/runner
boundary. Do not generalize one successful fixture to arbitrary detached
descendants or every failure mode.

The existing [mutation-proof bar](verification-judgment-for-privileged-surfaces.md#the-bar-the-expert-holds-reviewers-to)
already requires a regression to fail without its fix. Apply it **inside
the isolation boundary**: run the new test against the old script and
observe the intended failure, then show that the fixed script passes. Never
use the operator host as the negative control.

# Elimination route and evidence

Fix unsafe target selection in the product and encode test-owned targets,
ordered group teardown and the regressed-script control in the repository's
harness and CI. The source identifies the keeper repair and fixture changes
in [awebai/oats#1618](https://github.com/awebai/oats/pull/1618), following
[incident #1615](https://github.com/awebai/oats/issues/1615). Isolation belongs
in the executable test-launch boundary; a remembered warning or a file
header is not enforcement. This harvest does not claim that every launch
path now enforces it.

Evidence: OKF proposal from oats-desktop-expert/tui-macos-tests-expert, 2026-10-28; notes/never-sigkill-panel-on-operator-host.md.

The source reports old-script failure and fixed-script success inside the
namespace, Linux CI executing the subreaper case, and a passing macOS panel
run with the Linux-only case skipped. The incident, human direction, repair
and results are source-reported, not independently audited or rerun by this
harvest. They establish neither full host containment nor universal
cross-platform coverage.
