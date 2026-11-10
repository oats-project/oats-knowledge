---
type: Lesson
title: Real-pi opening races need an executed CI gate
description: The opening-task deadlock escaped a green host-model suite while real-pi tests skipped, so bridge-hold changes need version-qualified real-runtime evidence until CI actually exercises the claimed lifecycle.
about: [system/oats-kernel]
kind: lesson
id: ins-5d70a2b8fa48
tags: [kernel, pi, testing, ci, knowledge-debt, compatibility]
timestamp: 2026-10-16
---
# An existing test file is not an executed gate

The opening-task investigation found two independent blind spots: the
PiHost model did not represent pi's changed run-start lifecycle, and the
real-pi test file was not exercised by CI on that lifecycle. The real runner
had also stopped matching pi 1.x transcripts after a system-role entry was
introduced. Green model tests therefore hid both a stale model and a stale
measurement harness while the bridge shipped a real deadlock.

This is the kernel expert's pi-specific verification debt, not a second
copy of the general [host-bound verification lesson](/nodes/oats-expert/lessons/verify-host-bound-fixes-on-the-reproducing-host.md).
The behavior that needs independent evidence is the actual runtime's
opening-run lifecycle, not just the bridge logic under a model's assumptions.

# Dated gap and elimination route

**As reported on 2026-10-16**, CI resolved pi 0.80.3 through the messaging
extension's peer dependency, so `opening-task-real-pi.test.mjs` skipped there.
The source reports a non-blocking follow-up on the fix's review to run a
current pi in CI; it does not report that gate implemented.

**Owner: oats-kernel-expert.** When dependency resolution, skip conditions or
CI coverage changes, the instance changing that reality must update this
record in the same session and explicitly supersede the dated gap. Do not
assume the old resolved version remains current without checking it.

The elimination route is a CI job that actually executes the real-pi file
against the current lifecycle and the other pi lines whose compatibility is
claimed. Make skip outcomes visible rather than counting them as coverage.
Keep transcript assertions compatible with the runtime's recorded messages,
and update PiHost whenever pi changes the lifecycle being modeled. Preserve
a failing old-bridge control so a model or runner that no longer exposes the
race cannot silently become the only evidence again. These are test/CI
repairs, not a permanent manual-check policy or a claim of completed coverage.

# Temporary evidence boundary

Until that gate exists, qualify a bridge-hold change with the real-pi file
against each pi line it claims. The source's working isolation method used
npm installations in temporary prefixes with the `@earendil-works/*` sibling
packages pinned to the same version. Its unpinned pi 1.1.0 install instead
pulled 1.3.0 siblings and failed to load: a top-level version alone did not
establish the runtime under test. Treat that as a version-scoped toolchain
finding, not a permanent dependency-resolution guarantee.

For interactive claims, include a TUI check rather than treating SDK success
as interactive evidence. The reported check used an extension-registered
stub provider, `PI_OFFLINE=1` and a private tmux socket. Use only authorized,
bounded fixtures with teardown; this lesson grants no permission to alter an
operator's installation or session. The general [real-terminal observation
lesson](/nodes/oats-expert/lessons/real-terminal-waits-prove-the-observed-state.md)
owns the measurement discipline. For this race, the [opening-task lesson](pi-bridge-holds-must-not-wait-for-their-own-run.md)
identifies the crucial assertion: agent activity or a welcome turn is not
proof that the opening user message arrived.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-opening-deadlock,
2026-10-16; notes/pi-run-active-before-before-agent-start.md.

The source reports the fixed bridge passed the real-pi file on pi 1.1.0,
1.2.0 and 1.3.0 and the expanded host-model tests; the old bridge failed the
new pi-1.2+ model cases. It identifies the investigation and follow-up through
[awebai/oats#1322](https://github.com/awebai/oats/issues/1322) and
[#1324](https://github.com/awebai/oats/pull/1324). The runner repair, resolved
CI dependency, Linux-only SDK/TUI probes and package-pinning failure remain
source-reported. This harvest did not run pi, inspect implementation CI or
certify compatibility beyond those reported versions and checks.

Verified by the knowledge maintainer at review of the harvest, 2026-10-16, by
reading [awebai/oats#1324](https://github.com/awebai/oats/pull/1324) and its
discussion; nothing was run and CI configuration was not inspected. Its
description reports the real-pi file 15/15 on pi 1.1.0, 1.2.0 and 1.3.0, each
installed from npm into a temporary prefix with its `@earendil-works`
dependencies pinned to the same version. It reports that CI's pi is 0.80.3, so
the real-pi file skips there. It also reports the private-socket tmux check
with an extension-registered stub model and `PI_OFFLINE=1`, and the runner
repair for pi 1.x transcripts. A maintainer lane's review lists the CI job with
a pi 1.2 or later as a non-blocking follow-up. Whether that job exists after
2026-10-16 is the dated gap's owner's to record.
