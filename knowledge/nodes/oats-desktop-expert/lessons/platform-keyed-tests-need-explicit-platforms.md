---
type: Lesson
title: Platform-keyed tests need explicit platforms and a native baseline
description: Pin platform-keyed policy cases independently of the host, and scope a platform failure with a whole-surface baseline on that OS rather than treating an in-process platform fake as native evidence.
about: [system/oats-desktop]
kind: lesson
id: ins-7f53b9fe442c
tags: [verification, testing, platform, keybindings, tui, ci]
timestamp: 2026-10-27
---
# One test name must not conceal two different suites

The source's 2026-10-27 macOS investigation found that store-level TUI tests
pinned a Linux platform, but loop-level tests inherited the host's platform.
The latter sent Linux navigation chords even when the host selected the
macOS keymap, where those chords were deliberately unbound. Linux-only PR
CI concealed the mismatch; a macOS run silently changed what the same
assertions exercised.

For tests of platform-keyed client policy, make the platform an explicit
fixture input. Use a stable default and separate explicit cases for each
intended variant, rather than conditional assertions that run only on that
host. In the reported fix, the default was Linux and the macOS help case
selected `platform: "darwin"`. Pinning a default alone does not create
macOS coverage: the explicit variant must run too.

The source rejected pinning only the already-failing cases because the next
loop test would inherit the same trap. Changing production bindings to
satisfy Linux-shaped assertions was also rejected: it would reverse the
intended macOS behavior instead of repairing the fixture. This lesson does
not choose bindings; the current keyboard contract remains authoritative.

# The reported file is a symptom, not the inventory

Before scoping a platform-specific client fix, baseline every test file of
that surface on the affected OS in authorized CI. The source reports that
the issue named one TUI file, but a macOS baseline of all 42 files found a
second failing file, including a real-process signal-name bug. Fixing only
the named file would have left that failure outside the investigation.

Discover the current surface inventory rather than preserve 42 as a test
count or keep a permanent filename list. This is the platform-diagnosis
application of the generalist's
[affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md),
not a second handback policy. Whole-surface coverage means the enumerated
tests ran; it does not prove every platform behavior.

Overriding `process.platform` in a Linux test process helped reproduce the
in-process keymap mismatch. It did not turn a spawned `oats tui` or tmux into
macOS processes. Separate injected-policy evidence from native-process
evidence: real child-process and OS behavior need the affected platform's
run, not a Linux fake relabelled as macOS verification. The generalist's
[reproducing-runtime lesson](/nodes/oats-expert/lessons/verify-host-bound-fixes-on-the-reproducing-host.md)
owns the broader cross-host verification judgment.

# Elimination route and limits

Put explicit platform selection in shared test fixtures and exercise the
intended policy variants on every host. Add a macOS TUI CI leg for the
native-process boundary. Until the relevant coverage exists, obtain a named
macOS run at the candidate head and state which files and boundaries it
covered. Check current CI coverage rather than treating the reported gap as
permanent. These are enforcement targets, not automation this harvest
claims has shipped.

The maintainer's
[pre-tag macOS rehearsal](/nodes/oats-maintainer/stewardship/release-traps.md#rehearse-changed-macos-tests-before-the-tag-2026-10-27)
is a separate release catch, not a substitute for diagnosing and verifying
the client change before handover. Existing
[native-effect isolation and operator-safety limits](verification-judgment-for-privileged-surfaces.md)
remain unchanged; a broader test inventory grants no broader local execution
permission.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/tui-macos-tests-expert, 2026-10-27; notes/tui-tests-pin-platform.md; notes/macos-baseline-all-tui-files.md.

The source identifies [awebai/oats#1608](https://github.com/awebai/oats/issues/1608),
the loop-test repair [#1610](https://github.com/awebai/oats/pull/1610),
the second-file repair [#1614](https://github.com/awebai/oats/pull/1614), and
the real-process finding [#1613](https://github.com/awebai/oats/issues/1613).
It reports nine reproduced loop-test failures and the whole-surface macOS
baseline. The PRs were open at proposal time; Windows was not checked.
These are source-reported observations, not test runs or an implementation
audit by this harvest, and establish neither shipment nor completed CI
coverage.
